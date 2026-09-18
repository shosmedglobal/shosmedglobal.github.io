/**
 * Tests for Stripe payment recording, reconciliation and admin revenue
 * aggregation.
 *
 * Run:  node test/payments.test.js
 *
 * Motivating defect (2026-09-17):
 *   A customer paid $99 for Program List Guidance, but the admin dashboard
 *   showed 0 Paying Users / $0 Total Revenue. The aggregation only counted
 *   users/{uid}.payments['exam-bank'] and priced it from a hardcoded table,
 *   so Strategy Session and every Match Mentorship add-on were invisible no
 *   matter what Stripe charged.
 *
 * What runs here is the production code, not a copy:
 *   functions/payments.js   webhook dispatch, ledger + entitlement writes,
 *                           refunds, idempotency, reconciliation gate and
 *                           Stripe verification
 *   revenue-stats.js        the aggregation dashboard.html renders
 *   functions/index.js      the real TIERS table (parsed out of the source,
 *                           so a tier added there is tested automatically)
 *
 * The one deliberate copy is LEGACY_WEBHOOK_ENTITLEMENT below: the
 * entitlement-building code of the pre-ledger webhook, kept verbatim so the
 * QBank regression tests can prove the new code writes the identical record.
 *
 * Firestore is an in-memory fake modelling the two behaviours this code
 * depends on: optimistic-concurrency transactions (conflicting commits
 * retry, so concurrent duplicate deliveries genuinely race) and the rule
 * that a transaction must perform every read before its first write.
 *
 * Fixture values (names, amounts, IDs) are test data only. Nothing in the
 * production modules refers to a specific customer or amount.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const payments = require(path.join(ROOT, 'functions', 'payments.js'));
const revenue = require(path.join(ROOT, 'revenue-stats.js'));

const indexSrc = fs.readFileSync(path.join(ROOT, 'functions', 'index.js'), 'utf8');
const TIERS = new Function(indexSrc.match(/const TIERS = (\{[\s\S]*?\n\});/)[0] + '\nreturn TIERS;')();
const ADMIN_EMAILS = new Set(new Function(
  indexSrc.match(/const ADMIN_EMAILS = new Set\((\[[\s\S]*?\])\);/)[0].replace('const ADMIN_EMAILS = ', 'return ')
)());

// ============================================================ Firestore fake
const FieldValue = { serverTimestamp: () => ({ __serverTimestamp: true }) };
const Timestamp = {
  fromMillis: ms => ({ __ts: ms }),
  fromDate: d => ({ __ts: d.getTime() }),
};

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v) && !('__ts' in v) && !v.__serverTimestamp;
}
function deepMerge(target, src) {
  const out = Object.assign({}, target);
  for (const [k, v] of Object.entries(src)) {
    out[k] = isPlainObject(v) && isPlainObject(out[k]) ? deepMerge(out[k], v) : v;
  }
  return out;
}
const clone = v => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));

function makeDb(seed) {
  const store = new Map();   // "col/id" -> { data, version }
  const stats = { commits: 0, retries: 0 };
  Object.entries(seed || {}).forEach(([key, data]) => store.set(key, { data: clone(data), version: 1 }));

  function ref(col, id) {
    const key = col + '/' + id;
    return {
      id, key,
      async get() {
        const e = store.get(key);
        return { id, exists: !!e, data: () => clone(e && e.data) };
      },
      async set(data, opts) { write(key, data, opts); },
    };
  }
  function write(key, data, opts) {
    const e = store.get(key);
    const next = opts && opts.merge && e ? deepMerge(e.data, data) : deepMerge({}, data);
    store.set(key, { data: next, version: (e ? e.version : 0) + 1 });
  }
  function collection(col) {
    return {
      doc: id => ref(col, id),
      where(field, op, value) {
        if (op !== '==') throw new Error('fake supports == only');
        return {
          limit: n => ({
            async get() {
              const docs = [];
              for (const [key, e] of store) {
                if (!key.startsWith(col + '/') || e.data[field] !== value) continue;
                const id = key.slice(col.length + 1);
                docs.push({ id, ref: ref(col, id), data: () => clone(e.data) });
                if (docs.length >= n) break;
              }
              return { empty: docs.length === 0, docs };
            },
          }),
        };
      },
    };
  }
  async function runTransaction(fn) {
    for (let attempt = 0; attempt < 10; attempt++) {
      const reads = new Map();
      const writes = [];
      const tx = {
        async get(r) {
          if (writes.length) throw new Error('Firestore transactions require all reads to be executed before all writes.');
          const e = store.get(r.key);
          reads.set(r.key, e ? e.version : 0);
          await Promise.resolve(); // yield so concurrent transactions interleave
          return { id: r.id, exists: !!e, data: () => clone(e && e.data) };
        },
        set(r, data, opts) { writes.push([r.key, data, opts]); },
      };
      const result = await fn(tx);
      const conflict = [...reads].some(([k, v]) => ((store.get(k) || {}).version || 0) !== v);
      if (conflict) { stats.retries++; continue; }
      writes.forEach(([k, d, o]) => write(k, d, o));
      stats.commits++;
      return result;
    }
    throw new Error('transaction contention');
  }
  const all = col => [...store].filter(([k]) => k.startsWith(col + '/'))
    .map(([k, e]) => Object.assign({ id: k.slice(col.length + 1) }, clone(e.data)));
  const get = (col, id) => clone((store.get(col + '/' + id) || {}).data);
  return { collection, runTransaction, all, get, stats };
}

const NOW = 1790000000000;            // fixed processing clock (ms)
const deps = { TIERS, FieldValue, Timestamp, now: () => NOW };

// ======================================================== legacy reference
// Entitlement construction from the pre-ledger stripeWebhook in
// functions/index.js (commit 88bbdcd and earlier), verbatim apart from the
// injected clock and admin.firestore.* → injected FieldValue/Timestamp.
function LEGACY_WEBHOOK_ENTITLEMENT(session, tierConfig, nowMs) {
  const paymentsUpdate = {
    [tierConfig.field]: 'paid',
    [`${tierConfig.field}-purchased-at`]: FieldValue.serverTimestamp(),
    [`${tierConfig.field}-stripe-session`]: session.id,
    [`${tierConfig.field}-amount`]: (session.amount_total || 0) / 100,
  };
  if (tierConfig.plan) {
    paymentsUpdate[`${tierConfig.field}-plan`] = tierConfig.plan;
  }
  if (tierConfig.expiryDays) {
    const expiry = new Date(nowMs + tierConfig.expiryDays * 24 * 60 * 60 * 1000);
    paymentsUpdate[`${tierConfig.field}-expires-at`] = Timestamp.fromDate(expiry);
  }
  return paymentsUpdate;
}
// The site's QBank gate, as written in qbank.js / qbank.html / dashboard.html.
const hasQbankAccess = userDoc => !!(userDoc && userDoc.payments && userDoc.payments['exam-bank'] === 'paid');

// ======================================================== Stripe fixtures
const BUYER = { uid: 'uid_buyer_0001', email: 'buyer@example.com' };
const T0 = 1789000000;                // Stripe `created` (seconds)

function session(over) {
  return Object.assign({
    id: 'cs_live_programList000001',
    object: 'checkout.session',
    mode: 'payment',
    status: 'complete',
    payment_status: 'paid',
    livemode: true,
    amount_total: 9900,
    currency: 'usd',
    created: T0,
    customer_email: BUYER.email,
    customer_details: { email: BUYER.email },
    payment_intent: 'pi_programList000001',
    metadata: { firebase_uid: BUYER.uid, tier: 'mentorship-program-list' },
  }, over || {});
}
const qbankSession = over => session(Object.assign({
  id: 'cs_live_qbankFullAccess0001',
  payment_intent: 'pi_qbankFullAccess0001',
  metadata: { firebase_uid: BUYER.uid, tier: 'full-access' },
}, over || {}));

// A session as reconcile receives it from Stripe: PaymentIntent + charge expanded.
function expanded(s, piOver, chargeOver) {
  const pi = Object.assign({
    id: s.payment_intent, object: 'payment_intent', status: 'succeeded', livemode: s.livemode,
    amount_received: s.amount_total, currency: s.currency, metadata: {},
    latest_charge: Object.assign({ id: 'ch_' + s.payment_intent, object: 'charge', payment_intent: s.payment_intent,
      amount: s.amount_total, amount_refunded: 0, refunded: false, paid: true, status: 'succeeded' }, chargeOver || {}),
  }, piOver || {});
  return Object.assign({}, s, { payment_intent: pi });
}
function evt(type, object, id) {
  return { id: id || 'evt_' + Math.random().toString(36).slice(2), type, data: { object } };
}
function charge(over) {
  return Object.assign({ object: 'charge', id: 'ch_pl_1', payment_intent: 'pi_programList000001',
    amount: 9900, amount_refunded: 0, refunded: false }, over || {});
}
const authOf = users => async uid => users[uid] || null;
const totals = db => revenue.summarizeRevenue(db.all('transactions'), { excludeEmails: [...ADMIN_EMAILS] });

// ================================================================= harness
let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''));
}
async function test(name, fn) {
  try { await fn(); } catch (e) { failures.push(name + '  -> threw: ' + (e && e.stack || e)); }
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

(async () => {
  // ======================================= A. Program List Guidance product
  await test('A program list guidance', async () => {
    const db = makeDb();
    const r = await payments.handleStripeEvent(db, evt('checkout.session.completed', session(), 'evt_pl'), deps);
    check('A1 completed + paid is recorded', r.result === 'recorded' && r.entitlement === 'granted', r);

    const t = db.get('transactions', 'cs_live_programList000001');
    check('A2 ledger doc keyed by Checkout Session ID', !!t);
    check('A3 ledger amount = Stripe amount_total (minor units)', t && t.amountTotal === 9900, t);
    check('A4 ledger currency from Stripe', t && t.currency === 'usd', t);
    check('A5 ledger uid/tier/field/email', t && t.uid === BUYER.uid && t.tier === 'mentorship-program-list'
      && t.field === 'mentorship-program-list' && t.email === BUYER.email, t);
    check('A6 ledger livemode/paid/payment intent', t && t.livemode === true && t.paymentStatus === 'paid'
      && t.paymentIntentId === 'pi_programList000001', t);
    check('A7 ledger purchasedAt is Stripe creation time', t && t.purchasedAt.__ts === T0 * 1000, t && t.purchasedAt);

    const u = db.get('users', BUYER.uid);
    check('A8 service record is exactly the legacy webhook shape', same(u.payments,
      LEGACY_WEBHOOK_ENTITLEMENT(session(), TIERS['mentorship-program-list'], NOW)), u.payments);
    check('A9 buying Program List does NOT touch QBank fields',
      Object.keys(u.payments).every(k => !k.startsWith('exam-bank')), Object.keys(u.payments));
    check('A10 buying Program List does NOT grant QBank access', hasQbankAccess(u) === false);

    const s = totals(db);
    check('A11 counted in Paying Users', s.payingUsers === 1, s);
    check('A12 counted in Total Revenue at the amount Stripe charged', s.revenueCents === 9900, s);
    check('A13 renders as $99', revenue.formatUsd(s.revenueCents) === '$99', revenue.formatUsd(s.revenueCents));
  });

  // =================================== B. QBank regression (existing product)
  await test('B qbank webhook unchanged', async () => {
    const db = makeDb();
    const r = await payments.handleStripeEvent(db, evt('checkout.session.completed', qbankSession(), 'evt_qb'), deps);
    const u = db.get('users', BUYER.uid);
    const legacy = LEGACY_WEBHOOK_ENTITLEMENT(qbankSession(), TIERS['full-access'], NOW);
    check('B1 QBank purchase recorded', r.result === 'recorded' && r.entitlement === 'granted', r);
    check('B2 QBank entitlement identical to the pre-ledger webhook, field for field', same(u.payments, legacy),
      { now: u.payments, legacy });
    check('B3 QBank access granted', hasQbankAccess(u) === true);
    check('B4 purchased-at stays server time (legacy)', u.payments['exam-bank-purchased-at'].__serverTimestamp === true);
    check('B5 expiry stays processing time + 180 days (legacy)',
      u.payments['exam-bank-expires-at'].__ts === NOW + 180 * 86400000, u.payments['exam-bank-expires-at']);
    check('B6 plan stays full-access', u.payments['exam-bank-plan'] === 'full-access');
    const s = totals(db);
    check('B7 QBank purchase counted too', s.payingUsers === 1 && s.revenueCents === 9900, s);
  });

  await test('B qbank pre-ledger purchase redelivered', async () => {
    // A QBank purchase the OLD webhook recorded (no ledger doc exists), with
    // an admin-edited expiry. Stripe redelivers the event after deploy.
    const legacy = LEGACY_WEBHOOK_ENTITLEMENT(qbankSession(), TIERS['full-access'], NOW - 86400000);
    legacy['exam-bank-expires-at'] = { __ts: 1999999999999 }; // manually extended
    const db = makeDb({ ['users/' + BUYER.uid]: { email: BUYER.email, payments: legacy } });
    const before = db.get('users', BUYER.uid);
    const r = await payments.handleStripeEvent(db, evt('checkout.session.completed', qbankSession()), deps);
    check('B8 old purchase gains a ledger entry', r.result === 'recorded' && !!db.get('transactions', 'cs_live_qbankFullAccess0001'), r);
    check('B9 but its entitlement is left exactly as it was', same(db.get('users', BUYER.uid), before)
      && r.entitlement === 'already_present', r);
  });

  await test('B qbank never modified by reconcile or refunds', async () => {
    // Reconcile a QBank session that is in Stripe but not the ledger.
    const users = { [BUYER.uid]: { uid: BUYER.uid, email: BUYER.email } };
    const seedPayments = { 'exam-bank': 'paid', 'exam-bank-plan': 'admin-granted' };
    const db = makeDb({ ['users/' + BUYER.uid]: { email: BUYER.email, payments: seedPayments } });
    const before = db.get('users', BUYER.uid);
    const rep = await payments.reconcileSessions(db, [expanded(qbankSession())],
      { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('B10 reconcile records the QBank payment in the ledger', rep[0].action === 'recorded', rep);
    check('B11 reconcile leaves QBank access untouched', same(db.get('users', BUYER.uid), before)
      && rep[0].entitlement === 'unchanged_access_product', rep[0]);

    // Reconcile when the user has NO QBank entitlement: still never granted.
    const db2 = makeDb({ ['users/' + BUYER.uid]: { email: BUYER.email } });
    await payments.reconcileSessions(db2, [expanded(qbankSession())], { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('B12 reconcile never grants QBank access, even if missing', hasQbankAccess(db2.get('users', BUYER.uid)) === false);

    // Full refund of a webhook-granted QBank purchase.
    const db3 = makeDb();
    await payments.handleStripeEvent(db3, evt('checkout.session.completed', qbankSession()), deps);
    const granted = db3.get('users', BUYER.uid);
    await payments.handleStripeEvent(db3, evt('charge.refunded', charge({ payment_intent: 'pi_qbankFullAccess0001',
      amount_refunded: 9900, refunded: true })), deps);
    check('B13 full refund does NOT change QBank access (unchanged behaviour)',
      same(db3.get('users', BUYER.uid), granted) && hasQbankAccess(db3.get('users', BUYER.uid)));
    check('B14 but the refunded QBank payment leaves revenue', totals(db3).revenueCents === 0 && totals(db3).payingUsers === 0, totals(db3));
  });

  await test('B qbank and program list together', async () => {
    const db = makeDb();
    await payments.handleStripeEvent(db, evt('checkout.session.completed', qbankSession()), deps);
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session()), deps);
    const u = db.get('users', BUYER.uid);
    check('B15 both entitlements present side by side', u.payments['exam-bank'] === 'paid'
      && u.payments['mentorship-program-list'] === 'paid', u.payments);
    const s = totals(db);
    check('B16 one buyer of two products = 1 paying user', s.payingUsers === 1, s);
    check('B17 revenue = sum of both payments', s.revenueCents === 19800, s);
  });

  // ============================================== C. duplicate delivery
  await test('C duplicates', async () => {
    const db = makeDb();
    const e = evt('checkout.session.completed', session(), 'evt_dup');
    const a = await payments.handleStripeEvent(db, e, deps);
    const snap = JSON.stringify([db.get('users', BUYER.uid), db.all('transactions')]);
    const b = await payments.handleStripeEvent(db, e, deps);
    check('C1 first delivery recorded', a.result === 'recorded', a);
    check('C2 same event redelivered -> duplicate', b.result === 'duplicate', b);
    const c = await payments.handleStripeEvent(db, evt('checkout.session.async_payment_succeeded', session()), deps);
    check('C3 different event, same session -> duplicate', c.result === 'duplicate', c);
    const users = { [BUYER.uid]: { uid: BUYER.uid, email: BUYER.email } };
    const rec = await payments.reconcileSessions(db, [expanded(session())], { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('C4 reconcile after webhook -> duplicate', rec[0].action === 'duplicate', rec);
    const dry = await payments.reconcileSessions(db, [expanded(session())], { dryRun: true, getAuthUser: authOf(users) }, deps);
    check('C5 dry run reports already_recorded', dry[0].action === 'already_recorded' && dry[0].inLedger === true, dry);
    check('C6 nothing changed by any repeat', JSON.stringify([db.get('users', BUYER.uid), db.all('transactions')]) === snap);
    check('C7 revenue counted once', totals(db).revenueCents === 9900 && totals(db).payingUsers === 1, totals(db));
  });

  await test('C reconcile first, then webhook', async () => {
    const users = { [BUYER.uid]: { uid: BUYER.uid, email: BUYER.email } };
    const db = makeDb();
    await payments.reconcileSessions(db, [expanded(session())], { dryRun: false, getAuthUser: authOf(users) }, deps);
    const w = await payments.handleStripeEvent(db, evt('checkout.session.completed', session()), deps);
    check('C8 webhook after reconcile -> duplicate', w.result === 'duplicate', w);
    const r2 = await payments.reconcileSessions(db, [expanded(session())], { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('C9 second reconcile run -> duplicate', r2[0].action === 'duplicate', r2);
    check('C10 one ledger doc, counted once', db.all('transactions').length === 1 && totals(db).revenueCents === 9900);
  });

  await test('C concurrent deliveries', async () => {
    const db = makeDb();
    const e = evt('checkout.session.completed', session(), 'evt_race');
    const results = await Promise.all([1, 2, 3, 4, 5].map(() => payments.handleStripeEvent(db, e, deps)));
    check('C11 five simultaneous deliveries -> exactly one recorded',
      results.filter(r => r.result === 'recorded').length === 1, results.map(r => r.result));
    check('C12 the fake genuinely raced (transactions retried)', db.stats.retries > 0, db.stats);
    check('C13 revenue after the race counted once', totals(db).revenueCents === 9900, totals(db));
  });

  await test('C concurrent deliveries with no entitlement write', async () => {
    // When the entitlement is already present (pre-ledger purchase) or is an
    // access product under reconcile, the transaction writes only the ledger
    // doc. Then nothing but the transactional ledger read can detect the
    // race — this case isolates it.
    const legacy = LEGACY_WEBHOOK_ENTITLEMENT(qbankSession(), TIERS['full-access'], NOW);
    const db = makeDb({ ['users/' + BUYER.uid]: { email: BUYER.email, payments: legacy } });
    const results = await Promise.all([1, 2, 3, 4].map(() =>
      payments.handleStripeEvent(db, evt('checkout.session.completed', qbankSession()), deps)));
    check('C14 racing ledger-only writes -> exactly one recorded',
      results.filter(r => r.result === 'recorded').length === 1, results.map(r => r.result));

    const users = { [BUYER.uid]: { uid: BUYER.uid, email: BUYER.email } };
    const db2 = makeDb();
    const rec = await Promise.all([1, 2, 3].map(() => payments.reconcileSessions(db2, [expanded(qbankSession())],
      { dryRun: false, getAuthUser: authOf(users) }, deps)));
    check('C15 racing QBank reconcile runs -> exactly one recorded',
      rec.filter(r => r[0].action === 'recorded').length === 1, rec.map(r => r[0].action));
  });

  // ==================================== D. failed / incomplete payments
  await test('D failed and incomplete', async () => {
    const db = makeDb();
    const cases = [
      ['D1 completed but unpaid (async pending)', evt('checkout.session.completed', session({ payment_status: 'unpaid' }))],
      ['D2 async payment failed', evt('checkout.session.async_payment_failed', session({ payment_status: 'unpaid' }))],
      ['D3 session expired / abandoned', evt('checkout.session.expired', session({ status: 'expired', payment_status: 'unpaid' }))],
      ['D4 session still open', evt('checkout.session.completed', session({ status: 'open', payment_status: 'unpaid' }))],
      ['D5 missing firebase metadata', evt('checkout.session.completed', session({ metadata: {} }))],
      ['D6 unknown tier', evt('checkout.session.completed', session({ metadata: { firebase_uid: BUYER.uid, tier: 'nope' } }))],
      ['D7 prototype-name tier', evt('checkout.session.completed', session({ metadata: { firebase_uid: BUYER.uid, tier: 'constructor' } }))],
      ['D8 subscription-mode session', evt('checkout.session.completed', session({ mode: 'subscription' }))],
      ['D9 payment_intent.payment_failed', evt('payment_intent.payment_failed', { object: 'payment_intent', id: 'pi_x' })],
    ];
    for (const [name, e] of cases) {
      const r = await payments.handleStripeEvent(db, e, deps);
      check(name + ' -> ignored', r.result === 'ignored', r);
    }
    check('D10 nothing in the ledger', db.all('transactions').length === 0);
    check('D11 no entitlement written', !db.get('users', BUYER.uid));
    check('D12 dashboard stays 0 / $0', totals(db).payingUsers === 0 && totals(db).revenueCents === 0);
    const ok = await payments.handleStripeEvent(db, evt('checkout.session.async_payment_succeeded', session()), deps);
    check('D13 async success after pending is recorded once', ok.result === 'recorded' && totals(db).revenueCents === 9900, ok);
  });

  // ============================================================ E. refunds
  await test('E full refund', async () => {
    const db = makeDb();
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session()), deps);
    const granted = db.get('users', BUYER.uid);
    const r = await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 9900, refunded: true }), 'evt_r1'), deps);
    const t = db.get('transactions', 'cs_live_programList000001');
    check('E1 refund applied', r.result === 'refund_applied', r);
    check('E2 ledger: refundStatus refunded, amountRefunded = Stripe cumulative', t.refundStatus === 'refunded' && t.amountRefunded === 9900, t);
    check('E3 original amount preserved for audit', t.amountTotal === 9900);
    check('E4 full refund leaves Total Revenue', totals(db).revenueCents === 0, totals(db));
    check('E5 and Paying Users (no other qualifying payment)', totals(db).payingUsers === 0, totals(db));
    check('E6 service record untouched by refund', same(db.get('users', BUYER.uid), granted));
    const again = await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 9900, refunded: true }), 'evt_r1'), deps);
    check('E7 replayed refund changes nothing', again.result === 'refund_unchanged' && totals(db).revenueCents === 0, again);
  });

  await test('E partial refunds', async () => {
    const db = makeDb();
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session()), deps);
    await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 2500 })), deps);
    check('E8 partial refund nets out: 9900 - 2500', totals(db).revenueCents === 7400, totals(db));
    check('E9 partially refunded buyer still a paying user', totals(db).payingUsers === 1);
    check('E10 ledger says partially_refunded', db.get('transactions', 'cs_live_programList000001').refundStatus === 'partially_refunded');
    await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 5000 })), deps);
    check('E11 cumulative figure is absolute, not added', totals(db).revenueCents === 4900, totals(db));
    const stale = await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 2500 })), deps);
    check('E12 stale out-of-order event cannot move refunds backwards',
      stale.result === 'refund_unchanged' && totals(db).revenueCents === 4900, [stale, totals(db)]);
    await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 9900, refunded: true })), deps);
    check('E13 partial then full -> refunded, 0 revenue', totals(db).revenueCents === 0
      && db.get('transactions', 'cs_live_programList000001').refundStatus === 'refunded', totals(db));
  });

  await test('E refund edge cases', async () => {
    const db = makeDb();
    const u = await payments.handleStripeEvent(db, evt('charge.refunded', charge({ payment_intent: 'pi_unknown', amount_refunded: 100 })), deps);
    check('E14 refund for an unrecorded payment is acknowledged, nothing invented', u.result === 'unmatched'
      && db.all('transactions').length === 0, u);
    const n = await payments.handleStripeEvent(db, evt('charge.refunded', charge({ payment_intent: null })), deps);
    check('E15 refund without payment intent ignored', n.result === 'ignored', n);

    // Reconcile a session Stripe already shows as partially refunded.
    const users = { [BUYER.uid]: { uid: BUYER.uid, email: BUYER.email } };
    const rep = await payments.reconcileSessions(db, [expanded(session(), {}, { amount_refunded: 4000 })],
      { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('E16 reconcile applies Stripe refund state at write time', rep[0].refund === 'refund_applied'
      && totals(db).revenueCents === 5900, [rep[0], totals(db)]);
  });

  // ================================ F. test mode, $0 promo, currency
  await test('F test mode / promo / currency', async () => {
    const db = makeDb();
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session({ id: 'cs_test_testModeSession01', livemode: false })), deps);
    check('F1 test-mode webhook payment excluded from revenue', totals(db).revenueCents === 0 && totals(db).payingUsers === 0, totals(db));
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session({ id: 'cs_live_promoFreeSession01',
      payment_status: 'no_payment_required', amount_total: 0, metadata: { firebase_uid: 'uid_promo', tier: 'mentorship-eras' } })), deps);
    check('F2 100% promo grants the service', db.get('users', 'uid_promo').payments['mentorship-eras'] === 'paid');
    check('F3 but is neither revenue nor a paying user', totals(db).revenueCents === 0 && totals(db).payingUsers === 0);
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session({ id: 'cs_live_euroSession000001',
      currency: 'eur', amount_total: 9000, metadata: { firebase_uid: 'uid_eu', tier: 'mentorship-lor' } })), deps);
    const s = totals(db);
    check('F4 EUR payment recorded in its own currency', db.get('transactions', 'cs_live_euroSession000001').currency === 'eur');
    check('F5 EUR not summed into the dollar total', s.revenueCents === 0 && s.revenueByCurrency.eur === 9000, s);
  });

  // ===================== G. reconciliation: verified from Stripe, admin only
  await test('G reconcile verification', async () => {
    const users = { [BUYER.uid]: { uid: BUYER.uid, email: BUYER.email } };
    const v = (s, u) => payments.verifySessionForReconcile(s, u === undefined ? users[BUYER.uid] : u, TIERS);
    check('G1 genuine paid live session verifies', v(expanded(session())).ok === true, v(expanded(session())));
    const bad = [
      ['G2 PaymentIntent not expanded', session(), 'payment_intent_not_expanded'],
      ['G3 PaymentIntent not succeeded', expanded(session(), { status: 'requires_payment_method' }), 'payment_intent_not_succeeded'],
      ['G4 amount received differs from session total', expanded(session(), { amount_received: 100 }), 'amount_mismatch'],
      ['G5 currency differs', expanded(session(), { currency: 'eur' }), 'currency_mismatch'],
      // Each livemode check tested on its own (the other side set live), so
      // one cannot mask the absence of the other.
      ['G6 test-mode session', expanded(session({ id: 'cs_test_x00000000000', livemode: false }), { livemode: true }), 'test_mode'],
      ['G7 test-mode payment intent', expanded(session(), { livemode: false }), 'test_mode'],
      ['G8 unpaid session', expanded(session({ payment_status: 'unpaid' })), 'payment_not_completed'],
      ['G9 $0 promo session', expanded(session({ payment_status: 'no_payment_required' })), 'no_payment_collected'],
      ['G10 payment intent uid disagrees', expanded(session(), { metadata: { firebase_uid: 'someone_else' } }), 'uid_mismatch'],
    ];
    for (const [name, s, reason] of bad) {
      const r = v(s);
      check(name + ' -> ' + reason, r.ok === false && r.reason === reason, r);
    }
    const noUser = v(expanded(session()), null);
    check('G11 uid not in Firebase Auth', noUser.ok === false && noUser.reason === 'uid_not_in_firebase_auth', noUser);
    const other = v(expanded(session()), { uid: BUYER.uid, email: 'different@example.com' });
    check('G12 Stripe email differs from account email', other.ok === false && other.reason === 'email_mismatch_needs_manual_review', other);
    const caseOk = v(expanded(session({ customer_details: { email: 'BUYER@Example.com' } })));
    check('G13 email compare is case-insensitive', caseOk.ok === true, caseOk);
  });

  await test('G reconcile dry run and write', async () => {
    const users = { [BUYER.uid]: { uid: BUYER.uid, email: BUYER.email } };
    const db = makeDb();
    const dry = await payments.reconcileSessions(db, [expanded(session())], { dryRun: true, getAuthUser: authOf(users) }, deps);
    check('G14 dry run reports would_record', dry[0].action === 'would_record' && dry[0].inLedger === false, dry);
    check('G15 dry run writes nothing', db.all('transactions').length === 0 && !db.get('users', BUYER.uid));

    const rep = await payments.reconcileSessions(db, [expanded(session())], { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('G16 write run records', rep[0].action === 'recorded', rep);
    check('G17 ledger source = reconcile', db.get('transactions', 'cs_live_programList000001').source === 'reconcile');
    check('G18 missing service record filled (non-QBank)', rep[0].entitlement === 'filled_missing_service_record'
      && db.get('users', BUYER.uid).payments['mentorship-program-list'] === 'paid', rep[0]);
    check('G19 backfilled record dated at Stripe purchase time',
      db.get('users', BUYER.uid).payments['mentorship-program-list-purchased-at'].__ts === T0 * 1000);
    check('G20 reconciled payment counted', totals(db).payingUsers === 1 && totals(db).revenueCents === 9900, totals(db));

    // Existing service record is never overwritten by reconcile.
    const existing = { 'mentorship-program-list': 'paid', 'mentorship-program-list-stripe-session': 'cs_live_other' };
    const db2 = makeDb({ ['users/' + BUYER.uid]: { email: BUYER.email, payments: existing } });
    const before = db2.get('users', BUYER.uid);
    const rep2 = await payments.reconcileSessions(db2, [expanded(session())], { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('G21 existing service record left unchanged', same(db2.get('users', BUYER.uid), before)
      && rep2[0].entitlement === 'unchanged_existing_record', rep2[0]);

    // Unverifiable sessions are reported and never written.
    const db3 = makeDb();
    const rep3 = await payments.reconcileSessions(db3, [
      expanded(session({ id: 'cs_live_mismatchEmail0001', customer_details: { email: 'x@evil.test' }, customer_email: 'x@evil.test' })),
      expanded(session({ id: 'cs_live_amountMismatch001' }), { amount_received: 1 }),
    ], { dryRun: false, getAuthUser: authOf(users) }, deps);
    check('G22 unverifiable sessions skipped with a reason', rep3.every(e => e.action === 'skip' && e.reason), rep3);
    check('G23 and nothing written for them', db3.all('transactions').length === 0 && !db3.get('users', BUYER.uid));

    // Scans omit non-purchases; explicit ID requests report them.
    const open = expanded(session({ id: 'cs_live_openSession000001', status: 'open', payment_status: 'unpaid' }));
    const scan = await payments.reconcileSessions(makeDb(), [open], { dryRun: true, getAuthUser: authOf(users) }, deps);
    const byId = await payments.reconcileSessions(makeDb(), [open], { dryRun: true, reportUnpaid: true, getAuthUser: authOf(users) }, deps);
    check('G24 scan omits unpaid sessions', scan.length === 0, scan);
    check('G25 explicit request reports why it was skipped', byId.length === 1 && byId[0].reason === 'session_not_complete', byId);
  });

  await test('G reconcile caller gate', () => {
    const call = (auth) => payments.checkReconcileCaller(auth, ADMIN_EMAILS);
    const admin = [...ADMIN_EMAILS][0];
    check('G26 unauthenticated denied', (call(null) || {}).code === 'unauthenticated');
    check('G27 non-admin denied', (call({ uid: 'u', token: { email: 'buyer@example.com', email_verified: true } }) || {}).code === 'permission-denied');
    check('G28 admin email but UNVERIFIED denied', (call({ uid: 'u', token: { email: admin, email_verified: false } }) || {}).code === 'permission-denied');
    check('G29 admin email, verified flag missing, denied', (call({ uid: 'u', token: { email: admin } }) || {}).code === 'permission-denied');
    check('G30 verified admin allowed', call({ uid: 'u', token: { email: admin, email_verified: true } }) === null);
    check('G31 admin match is case-insensitive', call({ uid: 'u', token: { email: admin.toUpperCase(), email_verified: true } }) === null);
  });

  await test('G reconcile request parsing', () => {
    const p = payments.parseReconcileRequest;
    const def = p(undefined);
    check('G32 default is a dry run', def.ok && def.dryRun === true && def.sessionIds === null && def.sinceDays === 365, def);
    check('G33 empty object is a dry run', p({}).dryRun === true);
    check('G34 write without sessionIds rejected', p({ dryRun: false }).ok === false);
    check('G35 write with empty sessionIds rejected', p({ dryRun: false, sessionIds: [] }).ok === false);
    check('G36 write with ids accepted', p({ dryRun: false, sessionIds: ['cs_live_programList000001'] }).ok === true);
    check('G37 client-supplied amount rejected', p({ sessionIds: ['cs_live_programList000001'], amount: 9900 }).ok === false);
    check('G38 client-supplied email rejected', p({ email: 'buyer@example.com' }).ok === false);
    check('G39 client-supplied uid rejected', p({ uid: BUYER.uid }).ok === false);
    check('G40 malformed session id rejected', p({ sessionIds: ['pi_123'] }).ok === false);
    check('G41 non-string session id rejected', p({ sessionIds: [42] }).ok === false);
    check('G42 >100 ids rejected', p({ sessionIds: Array.from({ length: 101 }, (_, i) => 'cs_live_' + String(i).padStart(10, '0')) }).ok === false);
    check('G43 dryRun must be boolean ("false" string is not a write)', p({ dryRun: 'false' }).ok === false);
    check('G44 duplicate ids collapsed', same(p({ sessionIds: ['cs_live_programList000001', 'cs_live_programList000001'] }).sessionIds,
      ['cs_live_programList000001']));
    check('G45 sinceDays bounds enforced', p({ sinceDays: 0 }).ok === false && p({ sinceDays: 731 }).ok === false && p({ sinceDays: 30 }).sinceDays === 30);
  });

  // =================================================== H. dashboard totals
  await test('H dashboard totals', () => {
    const tx = o => Object.assign({ livemode: true, paymentStatus: 'paid', currency: 'usd', amountRefunded: 0 }, o);
    const adminEmail = [...ADMIN_EMAILS][0];
    const ledger = [
      tx({ uid: 'a', email: 'a@x.com', amountTotal: 9900 }),                          // counted
      tx({ uid: 'b', email: 'b@x.com', amountTotal: 9900 }),                          // counted
      tx({ uid: 'b', email: 'b@x.com', amountTotal: 4900 }),                          // same buyer again
      tx({ uid: 'c', email: 'c@x.com', amountTotal: 9900, amountRefunded: 9900 }),    // full refund
      tx({ uid: 'd', email: 'd@x.com', amountTotal: 9900, amountRefunded: 1900 }),    // partial -> 8000
      tx({ uid: 'e', email: 'e@x.com', amountTotal: 9900, livemode: false }),         // test mode
      tx({ uid: 'f', email: 'f@x.com', amountTotal: 9900, paymentStatus: 'unpaid' }), // not paid
      tx({ uid: 'g', email: adminEmail.toUpperCase(), amountTotal: 9900 }),           // admin by email
      tx({ uid: 'h', email: 'alias@x.com', amountTotal: 9900 }),                      // admin by uid
      tx({ uid: 'i', email: 'i@x.com', amountTotal: 0, paymentStatus: 'no_payment_required' }),
      tx({ uid: 'j', email: 'j@x.com', amountTotal: 5000, currency: 'eur' }),         // non-USD
      tx({ uid: 'k', email: 'k@x.com', amountTotal: 9900, currency: undefined }),     // no currency
    ];
    const s = revenue.summarizeRevenue(ledger, { excludeEmails: [...ADMIN_EMAILS], excludeUids: ['h'] });
    check('H1 paying users = distinct buyers with net > 0 (a, b, d, j)', s.payingUsers === 4, s);
    check('H2 USD revenue = 9900 + 9900 + 4900 + 8000', s.revenueCents === 32700, s);
    check('H3 non-USD kept separate', same(s.revenueByCurrency, { usd: 32700, eur: 5000 }), s.revenueByCurrency);
    check('H4 payment with no currency is not assumed USD', !('undefined' in s.revenueByCurrency) && s.transactionsCounted === 5, s);
    check('H5 cents formatting', revenue.formatUsd(12345) === '$123.45' && revenue.formatUsd(123400) === '$1,234');
    check('H6 empty ledger -> 0 / $0', same(revenue.summarizeRevenue([]),
      { payingUsers: 0, revenueCents: 0, revenueByCurrency: {}, transactionsCounted: 0 }));
  });

  // ============================================ I. every sellable tier
  await test('I every tier', async () => {
    for (const tier of Object.keys(TIERS)) {
      const db = makeDb();
      const r = await payments.handleStripeEvent(db, evt('checkout.session.completed',
        session({ id: 'cs_live_tier' + tier.replace(/[^A-Za-z0-9]/g, '') + '00', metadata: { firebase_uid: 'u', tier } })), deps);
      const u = db.get('users', 'u');
      check('I tier ' + tier + ': recorded, counted, legacy-shaped', r.result === 'recorded'
        && totals(db).revenueCents === 9900
        && same(u.payments, LEGACY_WEBHOOK_ENTITLEMENT(session({ id: r.sessionId }), TIERS[tier], NOW)), [r, u && u.payments]);
      check('I tier ' + tier + ': QBank access only for the QBank tier',
        hasQbankAccess(u) === (TIERS[tier].field === 'exam-bank'));
    }
  });

  console.log(`payments: ${passed} passed, ${failures.length} failed`);
  if (failures.length) {
    console.log();
    failures.forEach(f => console.log('  FAIL ' + f));
    process.exit(1);
  }
})();
