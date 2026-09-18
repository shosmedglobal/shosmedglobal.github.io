'use strict';
// ============================================================================
// Stripe → Firestore payment recording.
//
// Two stores are written for every successful checkout:
//
//   transactions/{checkoutSessionId}   the payment LEDGER. One doc per Stripe
//                                      Checkout Session. Source of truth for
//                                      revenue and paying-user counts (see
//                                      revenue-stats.js at the site root).
//   users/{uid}.payments.<field>       the ENTITLEMENT record the rest of the
//                                      app already reads (QBank unlock, etc.).
//                                      Schema unchanged from before.
//
// Idempotency: the ledger doc ID *is* the Checkout Session ID, and both
// writes happen inside one Firestore transaction that first checks the
// ledger doc does not exist. A redelivered webhook, a concurrent duplicate,
// an `async_payment_succeeded` following `completed`, or a reconciliation
// run over an already-recorded session all resolve to 'duplicate' and
// change nothing.
//
// Deliberately free of firebase-admin / stripe imports: FieldValue and
// Timestamp are injected so test/payments.test.js can drive this with an
// in-memory Firestore.
// ============================================================================

const LEDGER = 'transactions';

function sessionEmail(session) {
  return (session.customer_details && session.customer_details.email)
    || session.customer_email
    || '';
}

function paymentIntentId(pi) {
  if (!pi) return null;
  return typeof pi === 'string' ? pi : (pi.id || null);
}

/**
 * Decide whether a Checkout Session should grant a purchase.
 * Returns { ok: true, uid, tier, tierConfig } or { ok: false, reason }.
 *
 * `paid` grants and is revenue. `no_payment_required` (a 100% promo code)
 * grants the service but is recorded with that status, so it is never
 * counted as revenue. Anything else — `unpaid` (async method still
 * pending), an open/expired session — is not a purchase yet.
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
  const tierConfig = TIERS[tier];
  if (!tierConfig) return { ok: false, reason: 'unknown_tier' };
  return { ok: true, uid, tier, tierConfig };
}

/**
 * Record a completed Checkout Session. Safe to call any number of times for
 * the same session.
 *
 * deps: { TIERS, FieldValue, Timestamp, source, eventId? }
 * returns { result: 'recorded' | 'duplicate' | 'ignored', reason?, sessionId }
 */
async function recordCheckoutSession(db, session, deps) {
  const { TIERS, FieldValue, Timestamp } = deps;
  const sessionId = session && session.id;
  const c = classifySession(session, TIERS);
  if (!c.ok) return { result: 'ignored', reason: c.reason, sessionId };

  const { uid, tier, tierConfig } = c;
  const field = tierConfig.field;
  // Stripe's own creation time, not "now": a reconciliation run days later
  // must not move the purchase date or push a QBank expiry forward.
  const purchasedMs = (session.created || Math.floor(Date.now() / 1000)) * 1000;

  const ledgerRef = db.collection(LEDGER).doc(sessionId);
  const userRef = db.collection('users').doc(uid);

  const ledgerDoc = {
    sessionId,
    uid,
    email: sessionEmail(session),
    tier,
    field,
    amountTotal: typeof session.amount_total === 'number' ? session.amount_total : 0, // cents
    currency: String(session.currency || 'usd').toLowerCase(),
    paymentStatus: session.payment_status,
    livemode: session.livemode === true,
    paymentIntentId: paymentIntentId(session.payment_intent),
    amountRefunded: 0,
    refundStatus: 'none',
    purchasedAt: Timestamp.fromMillis(purchasedMs),
    recordedAt: FieldValue.serverTimestamp(),
    source: deps.source || 'webhook',
  };
  if (deps.eventId) ledgerDoc.stripeEventId = deps.eventId;

  // Entitlement fields: same names and meaning as before this ledger existed.
  const paymentsUpdate = {
    [field]: 'paid',
    [`${field}-purchased-at`]: Timestamp.fromMillis(purchasedMs),
    [`${field}-stripe-session`]: sessionId,
    [`${field}-amount`]: ledgerDoc.amountTotal / 100,
  };
  if (tierConfig.plan) paymentsUpdate[`${field}-plan`] = tierConfig.plan;
  if (tierConfig.expiryDays) {
    paymentsUpdate[`${field}-expires-at`] =
      Timestamp.fromMillis(purchasedMs + tierConfig.expiryDays * 24 * 60 * 60 * 1000);
  }

  return db.runTransaction(async (tx) => {
    const existing = await tx.get(ledgerRef);
    if (existing.exists) return { result: 'duplicate', sessionId };
    tx.set(ledgerRef, ledgerDoc);
    tx.set(userRef, { payments: paymentsUpdate }, { merge: true });
    return { result: 'recorded', sessionId };
  });
}

/**
 * Apply a Stripe Charge's refund state to the matching ledger entry.
 *
 * Idempotent by construction: it writes Stripe's cumulative
 * `amount_refunded` as an absolute value (never adds to it), and refuses to
 * move it backwards, so a replayed or out-of-order `charge.refunded` event
 * cannot double-count or undo a refund.
 *
 * A FULL refund also marks the entitlement `refunded` — but only when the
 * user's entitlement still points at this very session, so it can never
 * revoke a later repurchase or an admin grant.
 *
 * returns { result: 'refund_applied' | 'refund_unchanged' | 'unmatched' | 'ignored', ... }
 */
async function applyChargeRefund(db, charge, deps) {
  const { FieldValue } = deps;
  const pi = paymentIntentId(charge && charge.payment_intent);
  if (!pi) return { result: 'ignored', reason: 'no_payment_intent' };
  const refunded = typeof charge.amount_refunded === 'number' ? charge.amount_refunded : 0;

  const q = await db.collection(LEDGER).where('paymentIntentId', '==', pi).limit(5).get();
  if (q.empty) {
    // Not ours, or the purchase itself has not been recorded yet.
    // reconcileStripePayments re-reads refund state from Stripe, so
    // nothing is lost by acknowledging here.
    return { result: 'unmatched', paymentIntentId: pi };
  }

  const outcomes = [];
  for (const doc of q.docs) {
    const out = await db.runTransaction(async (tx) => {
      const snap = await tx.get(doc.ref);
      const t = snap.data() || {};
      const prev = typeof t.amountRefunded === 'number' ? t.amountRefunded : 0;
      if (refunded <= prev) return { result: 'refund_unchanged', sessionId: doc.id };

      const full = refunded >= (t.amountTotal || 0);

      // Firestore transactions need every read before the first write, so
      // the entitlement is read here, ahead of the ledger update.
      let userRef = null;
      let revokeEntitlement = false;
      if (full && t.uid && t.field) {
        userRef = db.collection('users').doc(t.uid);
        const userSnap = await tx.get(userRef);
        const payments = (userSnap.exists && userSnap.data().payments) || {};
        revokeEntitlement = payments[`${t.field}-stripe-session`] === doc.id;
      }

      tx.set(doc.ref, {
        amountRefunded: refunded,
        refundStatus: full ? 'refunded' : 'partially_refunded',
        refundUpdatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });

      if (revokeEntitlement) {
        tx.set(userRef, {
          payments: {
            [t.field]: 'refunded',
            [`${t.field}-refunded-at`]: FieldValue.serverTimestamp(),
          },
        }, { merge: true });
      }
      return { result: 'refund_applied', sessionId: doc.id, amountRefunded: refunded, full };
    });
    outcomes.push(out);
  }
  const applied = outcomes.some(o => o.result === 'refund_applied');
  return { result: applied ? 'refund_applied' : 'refund_unchanged', outcomes };
}

/**
 * Route a verified Stripe event. Throws only on storage failure, so the
 * webhook can answer 500 and let Stripe retry (safe: everything above is
 * idempotent).
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

module.exports = {
  LEDGER,
  classifySession,
  recordCheckoutSession,
  applyChargeRefund,
  handleStripeEvent,
};
