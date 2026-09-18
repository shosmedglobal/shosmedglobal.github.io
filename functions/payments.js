'use strict';
// ============================================================================
// Stripe → Firestore payment recording.
//
// Two stores:
//
//   transactions/{checkoutSessionId}   the payment LEDGER. One doc per Stripe
//                                      Checkout Session. Source of truth for
//                                      Paying Users / Total Revenue (see
//                                      revenue-stats.js at the site root).
//                                      Written only by Cloud Functions.
//
//   users/{uid}.payments.<field>       the ENTITLEMENT record the rest of the
//                                      app reads (QBank unlock, etc.). Its
//                                      shape and the rules for writing it are
//                                      exactly what the webhook did before
//                                      the ledger existed.
//
// Behaviour contract
// ------------------
// Webhook (checkout.session.completed / async_payment_succeeded):
//   - Grants only complete + paid sessions ('no_payment_required', i.e. a
//     100% promo code, also grants — it is recorded but never revenue).
//   - Writes the ledger doc AND the legacy entitlement fields, unchanged:
//     `<field>-purchased-at` = server time, QBank expiry = now + 180 days.
//   - If the entitlement already carries this session ID (a purchase the
//     pre-ledger webhook recorded), only the ledger doc is added.
//
// Reconciliation (admin backfill):
//   - Writes the ledger doc. NEVER writes an access-controlling entitlement
//     (ACCESS_FIELDS, i.e. QBank) — access stays exactly as it is.
//   - For other services, fills the entitlement only if the user has no
//     record for that service at all; an existing record is never changed.
//
// Refunds (charge.refunded, and refund state found during reconciliation):
//   - Ledger only. Full refund  -> refundStatus 'refunded', net 0: the
//                                  payment leaves Total Revenue, and the
//                                  buyer leaves Paying Users unless they
//                                  have another qualifying payment.
//                  Partial refund -> refundStatus 'partially_refunded';
//                                  revenue counts amountTotal - amountRefunded.
//   - Entitlements are never changed by a refund. Revoking access after a
//     refund stays a deliberate admin action (Grant/Revoke), as before.
//
// Idempotency: the ledger doc ID is the Checkout Session ID. Recording runs
// in one Firestore transaction that reads the ledger doc (and the user doc)
// before writing anything, and does nothing if the ledger doc exists. So a
// webhook retry, concurrent duplicate deliveries, a second event type for
// the same session, and any number of reconciliation runs all converge on a
// single ledger entry. Refund amounts are Stripe's cumulative figure written
// as an absolute value and never moved backwards, so replays and
// out-of-order refund events cannot double-count.
//
// Deliberately free of firebase-admin / stripe imports: FieldValue,
// Timestamp and the clock are injected, so test/payments.test.js drives this
// module directly against an in-memory Firestore.
// ============================================================================

const LEDGER = 'transactions';

// Entitlement fields that gate product access. Only the live webhook may
// write these (as it always has). Reconciliation and refunds never do.
const ACCESS_FIELDS = new Set(['exam-bank']);

const CHECKOUT_SESSION_ID_RE = /^cs_(live|test)_[A-Za-z0-9]{8,200}$/;
const RECONCILE_ALLOWED_KEYS = new Set(['dryRun', 'sessionIds', 'sinceDays']);
const MAX_SESSION_IDS = 100;

function sessionEmail(session) {
  return (session.customer_details && session.customer_details.email)
    || session.customer_email
    || '';
}

function idOf(ref) {
  if (!ref) return null;
  return typeof ref === 'string' ? ref : (ref.id || null);
}

function now(deps) {
  return typeof deps.now === 'function' ? deps.now() : Date.now();
}

/**
 * Decide whether a Checkout Session represents a purchase.
 * Returns { ok: true, uid, tier, tierConfig } or { ok: false, reason }.
 */
function classifySession(session, TIERS) {
  if (!session || session.object !== 'checkout.session') {
    return { ok: false, reason: 'not_a_checkout_session' };
  }
  if (session.mode !== 'payment') return { ok: false, reason: 'not_one_time_payment' };
  if (session.status !== 'complete') return { ok: false, reason: 'session_not_complete' };
  if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
    return { ok: false, reason: 'payment_not_completed' };
  }
  const uid = session.metadata && session.metadata.firebase_uid;
  const tier = session.metadata && session.metadata.tier;
  if (!uid || !tier) return { ok: false, reason: 'missing_metadata' };
  const tierConfig = Object.prototype.hasOwnProperty.call(TIERS, tier) ? TIERS[tier] : null;
  if (!tierConfig) return { ok: false, reason: 'unknown_tier' };
  return { ok: true, uid, tier, tierConfig };
}

// The entitlement write, byte-for-byte the shape the pre-ledger webhook
// produced. `purchasedAt` is the only input that varies by caller.
function entitlementUpdate(session, tierConfig, purchasedAt, deps) {
  const field = tierConfig.field;
  const update = {
    [field]: 'paid',
    [`${field}-purchased-at`]: purchasedAt,
    [`${field}-stripe-session`]: session.id,
    [`${field}-amount`]: (session.amount_total || 0) / 100,
  };
  if (tierConfig.plan) update[`${field}-plan`] = tierConfig.plan;
  if (tierConfig.expiryDays) {
    update[`${field}-expires-at`] =
      deps.Timestamp.fromMillis(now(deps) + tierConfig.expiryDays * 24 * 60 * 60 * 1000);
  }
  return update;
}

/**
 * Record a Checkout Session in the ledger (and, per the contract above, the
 * entitlement). Safe to call any number of times for the same session.
 *
 * deps: { TIERS, FieldValue, Timestamp, now?, source: 'webhook'|'reconcile', eventId? }
 * returns { result: 'recorded' | 'duplicate' | 'ignored', reason?, sessionId, entitlement? }
 */
async function recordCheckoutSession(db, session, deps) {
  const { TIERS, FieldValue, Timestamp } = deps;
  const source = deps.source === 'reconcile' ? 'reconcile' : 'webhook';
  const sessionId = session && session.id;
  const c = classifySession(session, TIERS);
  if (!c.ok) return { result: 'ignored', reason: c.reason, sessionId };

  const { uid, tier, tierConfig } = c;
  const field = tierConfig.field;
  const stripeCreatedMs = (session.created || Math.floor(now(deps) / 1000)) * 1000;

  const ledgerRef = db.collection(LEDGER).doc(sessionId);
  const userRef = db.collection('users').doc(uid);

  const ledgerDoc = {
    sessionId,
    uid,
    email: sessionEmail(session),
    tier,
    field,
    amountTotal: typeof session.amount_total === 'number' ? session.amount_total : 0, // minor units
    currency: String(session.currency || '').toLowerCase(),
    paymentStatus: session.payment_status,
    livemode: session.livemode === true,
    paymentIntentId: idOf(session.payment_intent),
    amountRefunded: 0,
    refundStatus: 'none',
    purchasedAt: Timestamp.fromMillis(stripeCreatedMs),
    recordedAt: FieldValue.serverTimestamp(),
    source,
  };
  if (deps.eventId) ledgerDoc.stripeEventId = deps.eventId;

  return db.runTransaction(async (tx) => {
    // ---- reads (all of them, before any write)
    const ledgerSnap = await tx.get(ledgerRef);
    const userSnap = await tx.get(userRef);

    if (ledgerSnap.exists) return { result: 'duplicate', sessionId };

    const payments = (userSnap.exists && (userSnap.data() || {}).payments) || {};
    let entitlement;
    let update = null;
    if (source === 'webhook') {
      if (payments[`${field}-stripe-session`] === sessionId) {
        entitlement = 'already_present';   // recorded by the pre-ledger webhook
      } else {
        entitlement = 'granted';
        update = entitlementUpdate(session, tierConfig, FieldValue.serverTimestamp(), deps);
      }
    } else if (ACCESS_FIELDS.has(field)) {
      entitlement = 'unchanged_access_product';
    } else if (Object.prototype.hasOwnProperty.call(payments, field)) {
      entitlement = 'unchanged_existing_record';
    } else {
      entitlement = 'filled_missing_service_record';
      // Historical purchase: stamp Stripe's time, not today's.
      update = entitlementUpdate(session, tierConfig, Timestamp.fromMillis(stripeCreatedMs), deps);
    }

    // ---- writes
    tx.set(ledgerRef, ledgerDoc);
    if (update) tx.set(userRef, { payments: update }, { merge: true });
    return { result: 'recorded', sessionId, entitlement };
  });
}

/**
 * Apply a Stripe Charge's cumulative refund state to the matching ledger
 * entry. Ledger only — entitlements are never touched (see contract).
 *
 * returns { result: 'refund_applied' | 'refund_unchanged' | 'unmatched' | 'ignored', ... }
 */
async function applyChargeRefund(db, charge, deps) {
  const { FieldValue } = deps;
  const pi = idOf(charge && charge.payment_intent);
  if (!pi) return { result: 'ignored', reason: 'no_payment_intent' };
  const refunded = typeof charge.amount_refunded === 'number' ? charge.amount_refunded : 0;

  const q = await db.collection(LEDGER).where('paymentIntentId', '==', pi).limit(5).get();
  if (q.empty) {
    // Not ours, or the purchase has not been recorded yet. Reconciliation
    // reads refund state straight from Stripe when it records a session,
    // so acknowledging here loses nothing.
    return { result: 'unmatched', paymentIntentId: pi };
  }

  const outcomes = [];
  for (const doc of q.docs) {
    outcomes.push(await db.runTransaction(async (tx) => {
      const snap = await tx.get(doc.ref);          // read first
      const t = snap.data() || {};
      const prev = typeof t.amountRefunded === 'number' ? t.amountRefunded : 0;
      // Never move backwards: a stale or replayed event carries an equal or
      // smaller cumulative figure.
      if (refunded <= prev) return { result: 'refund_unchanged', sessionId: doc.id };
      const full = refunded >= (t.amountTotal || 0);
      tx.set(doc.ref, {
        amountRefunded: refunded,
        refundStatus: full ? 'refunded' : 'partially_refunded',
        refundUpdatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      return { result: 'refund_applied', sessionId: doc.id, amountRefunded: refunded, full };
    }));
  }
  const applied = outcomes.some(o => o.result === 'refund_applied');
  return { result: applied ? 'refund_applied' : 'refund_unchanged', outcomes };
}

/**
 * Route a signature-verified Stripe event. Throws only on storage failure,
 * so the webhook can answer 500 and let Stripe retry (safe: idempotent).
 */
async function handleStripeEvent(db, event, deps) {
  switch (event.type) {
    case 'checkout.session.completed':
    // Delayed payment methods complete with payment_status 'unpaid' and
    // succeed later; card payments are already 'paid' at completion.
    case 'checkout.session.async_payment_succeeded':
      return recordCheckoutSession(db, event.data.object,
        Object.assign({}, deps, { source: 'webhook', eventId: event.id }));
    case 'charge.refunded':
      return applyChargeRefund(db, event.data.object, deps);
    default:
      // Includes async_payment_failed and checkout.session.expired:
      // nothing was bought, so nothing is recorded.
      return { result: 'ignored', reason: 'unhandled_event_type' };
  }
}

// ============================================================================
// Reconciliation (admin backfill)
// ============================================================================

/**
 * Admin gate for reconcileStripePayments. Requires a signed-in caller whose
 * token email is on the admin list AND verified — an unverified token email
 * is only a claim, not proof of owning the mailbox.
 * Returns null if allowed, else { code, message } for an HttpsError.
 */
function checkReconcileCaller(auth, adminEmails) {
  if (!auth || !auth.uid) return { code: 'unauthenticated', message: 'Sign in required.' };
  const token = auth.token || {};
  const email = String(token.email || '').toLowerCase();
  if (!email || !adminEmails.has(email)) return { code: 'permission-denied', message: 'Admin only.' };
  if (token.email_verified !== true) {
    return { code: 'permission-denied', message: 'Admin email must be verified to reconcile payments.' };
  }
  return null;
}

/**
 * Validate the client request. The client may only choose WHICH Stripe
 * sessions to look at and whether to write; every fact that gets recorded
 * (amount, currency, email, uid, tier, paid state) is read from Stripe
 * server-side. Unknown keys are rejected outright so a caller cannot even
 * appear to supply an amount or email.
 * Returns { ok: true, dryRun, sessionIds|null, sinceDays } or { ok: false, message }.
 */
function parseReconcileRequest(data) {
  const d = data == null ? {} : data;
  if (typeof d !== 'object' || Array.isArray(d)) return { ok: false, message: 'Request must be an object.' };
  const unknown = Object.keys(d).filter(k => !RECONCILE_ALLOWED_KEYS.has(k));
  if (unknown.length) return { ok: false, message: 'Unsupported field(s): ' + unknown.join(', ') };

  if ('dryRun' in d && typeof d.dryRun !== 'boolean') return { ok: false, message: 'dryRun must be a boolean.' };
  const dryRun = d.dryRun !== false;           // default: dry run

  let sessionIds = null;
  if ('sessionIds' in d) {
    if (!Array.isArray(d.sessionIds)) return { ok: false, message: 'sessionIds must be an array.' };
    if (d.sessionIds.length > MAX_SESSION_IDS) return { ok: false, message: `At most ${MAX_SESSION_IDS} sessionIds per run.` };
    const bad = d.sessionIds.filter(id => typeof id !== 'string' || !CHECKOUT_SESSION_ID_RE.test(id));
    if (bad.length) return { ok: false, message: 'Malformed sessionId(s): ' + bad.map(String).join(', ') };
    sessionIds = Array.from(new Set(d.sessionIds));
  }
  if (!dryRun && (!sessionIds || sessionIds.length === 0)) {
    return { ok: false, message: 'A write run must name the sessionIds reviewed in a dry run.' };
  }

  let sinceDays = 365;
  if ('sinceDays' in d) {
    if (!Number.isInteger(d.sinceDays) || d.sinceDays < 1 || d.sinceDays > 730) {
      return { ok: false, message: 'sinceDays must be an integer from 1 to 730.' };
    }
    sinceDays = d.sinceDays;
  }
  return { ok: true, dryRun, sessionIds, sinceDays };
}

/**
 * Verify a Checkout Session fetched from Stripe (with payment_intent and
 * payment_intent.latest_charge expanded) before it may enter the ledger.
 * Every check uses Stripe's data or Firebase Auth — nothing client-supplied.
 * Returns { ok: true, uid, tier, tierConfig, charge } or { ok: false, reason }.
 */
function verifySessionForReconcile(session, authUser, TIERS) {
  const c = classifySession(session, TIERS);
  if (!c.ok) return c;
  if (session.livemode !== true) return { ok: false, reason: 'test_mode' };
  if (session.payment_status !== 'paid') return { ok: false, reason: 'no_payment_collected' };

  const pi = session.payment_intent;
  if (!pi || typeof pi !== 'object') return { ok: false, reason: 'payment_intent_not_expanded' };
  if (pi.status !== 'succeeded') return { ok: false, reason: 'payment_intent_not_succeeded' };
  if (pi.livemode !== true) return { ok: false, reason: 'test_mode' };
  if (pi.amount_received !== session.amount_total) return { ok: false, reason: 'amount_mismatch' };
  if (String(pi.currency).toLowerCase() !== String(session.currency).toLowerCase()) {
    return { ok: false, reason: 'currency_mismatch' };
  }
  const meta = pi.metadata || {};
  // Sessions created by createCheckoutSession put metadata on the session;
  // if the PaymentIntent also carries a UID, it must agree.
  if (meta.firebase_uid && meta.firebase_uid !== c.uid) return { ok: false, reason: 'uid_mismatch' };

  if (!authUser) return { ok: false, reason: 'uid_not_in_firebase_auth' };
  const stripeEmail = sessionEmail(session).toLowerCase();
  if (!stripeEmail || stripeEmail !== String(authUser.email || '').toLowerCase()) {
    return { ok: false, reason: 'email_mismatch_needs_manual_review' };
  }
  const charge = pi.latest_charge && typeof pi.latest_charge === 'object' ? pi.latest_charge : null;
  return Object.assign({}, c, { ok: true, charge });
}

/**
 * Verify + (optionally) record Stripe sessions. The caller fetches sessions
 * from Stripe; `getAuthUser(uid)` resolves a Firebase Auth user or null.
 * `reportUnpaid` includes non-purchases in the report (true when the admin
 * asked for specific session IDs).
 */
async function reconcileSessions(db, sessions, opts, deps) {
  const { dryRun, getAuthUser, reportUnpaid } = opts;
  const report = [];
  for (const s of sessions) {
    const pi = s.payment_intent && typeof s.payment_intent === 'object' ? s.payment_intent : null;
    const charge = pi && pi.latest_charge && typeof pi.latest_charge === 'object' ? pi.latest_charge : null;
    const entry = {
      sessionId: s.id,
      created: s.created ? new Date(s.created * 1000).toISOString() : null,
      amountTotal: s.amount_total,
      currency: s.currency,
      livemode: s.livemode === true,
      status: s.status,
      paymentStatus: s.payment_status,
      stripeEmail: sessionEmail(s),
      uid: (s.metadata && s.metadata.firebase_uid) || null,
      tier: (s.metadata && s.metadata.tier) || null,
      amountRefunded: (charge && charge.amount_refunded) || 0,
    };

    const pre = classifySession(s, deps.TIERS);
    if (!pre.ok) {
      if (reportUnpaid) report.push(Object.assign(entry, { action: 'skip', reason: pre.reason }));
      continue;
    }
    const authUser = await getAuthUser(pre.uid);
    const v = verifySessionForReconcile(s, authUser, deps.TIERS);
    if (!v.ok) {
      report.push(Object.assign(entry, { action: 'skip', reason: v.reason }));
      continue;
    }

    const [ledgerSnap, userSnap] = await Promise.all([
      db.collection(LEDGER).doc(s.id).get(),
      db.collection('users').doc(v.uid).get(),
    ]);
    const payments = (userSnap.exists && (userSnap.data() || {}).payments) || {};
    entry.inLedger = ledgerSnap.exists;
    entry.userEntitlement = Object.prototype.hasOwnProperty.call(payments, v.tierConfig.field)
      ? payments[v.tierConfig.field] : null;
    entry.userEntitlementSession = payments[`${v.tierConfig.field}-stripe-session`] || null;

    if (dryRun) {
      entry.action = entry.inLedger ? 'already_recorded' : 'would_record';
    } else {
      const r = await recordCheckoutSession(db, s, Object.assign({}, deps, { source: 'reconcile' }));
      entry.action = r.result;               // 'recorded' | 'duplicate'
      if (r.entitlement) entry.entitlement = r.entitlement;
      if (v.charge && v.charge.amount_refunded > 0) {
        const rr = await applyChargeRefund(db,
          Object.assign({}, v.charge, { payment_intent: pi.id }), deps);
        entry.refund = rr.result;
      }
    }
    report.push(entry);
  }
  return report;
}

module.exports = {
  LEDGER,
  ACCESS_FIELDS,
  classifySession,
  recordCheckoutSession,
  applyChargeRefund,
  handleStripeEvent,
  checkReconcileCaller,
  parseReconcileRequest,
  verifySessionForReconcile,
  reconcileSessions,
};
