/**
 * Tests for Stripe payment recording + admin revenue aggregation.
 *
 * Run:  node test/payments.test.js
 *
 * Motivating defect (2026-09-17):
 *   Steven Kottaras paid $99 for Program List Guidance, but the admin
 *   dashboard showed 0 Paying Users / $0 Total Revenue. The aggregation only
 *   counted users/{uid}.payments['exam-bank'] and priced it from a hardcoded
 *   table, so Strategy Session and every Match Mentorship add-on were
 *   invisible no matter what Stripe charged. The webhook also had no refund
 *   handling, ignored payment_status, and its idempotency check was a
 *   non-transactional read.
 *
 * What runs here is the production code, not a copy:
 *   functions/payments.js   webhook dispatch, ledger + entitlement writes,
 *                           refunds, idempotency
 *   revenue-stats.js        the aggregation dashboard.html renders
 *   functions/index.js      the real TIERS table (parsed out of the source,
 *                           so a tier added there is tested automatically)
 *
 * Firestore is an in-memory fake that models the two behaviours this code
 * depends on: optimistic-concurrency transactions (conflicting commits
 * retry, so concurrent duplicate deliveries really race) and the rule that
 * a transaction must do all reads before any write.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const payments = require(path.join(ROOT, 'functions', 'payments.js'));
const revenue = require(path.join(ROOT, 'revenue-stats.js'));

const indexSrc = fs.readFileSync(path.join(ROOT, 'functions', 'index.js'), 'utf8');
const TIERS = new Function(indexSrc.match(/const TIERS = (\{[\s\S]*?\n\});/)[0] + '\nreturn TIERS;')();

// ============================================================ Firestore fake
const FieldValue = { serverTimestamp: () => ({ __serverTimestamp: true }) };
const Timestamp = { fromMillis: ms => ({ __ts: ms, toMillis: () => ms }) };

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v) && !v.__ts && !v.__serverTimestamp;
}
function deepMerge(target, src) {
  const out = Object.assign({}, target);
  for (const [k, v] of Object.entries(src)) {
    out[k] = isPlainObject(v) && isPlainObject(out[k]) ? deepMerge(out[k], v) : v;
  }
  return out;
}

function makeDb() {
  const store = new Map();   // "col/id" -> { data, version }
  const stats = { commits: 0, retries: 0 };

  function ref(col, id) {
    const key = col + '/' + id;
    return {
      id, key,
      async get() {
        const e = store.get(key);
        return { id, exists: !!e, data: () => (e ? JSON.parse(JSON.stringify(e.data)) : undefined), ref: this };
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
                if (!key.startsWith(col + '/')) continue;
                if (e.data[field] === value) {
                  const id = key.slice(col.length + 1);
                  docs.push({ id, ref: ref(col, id), data: () => JSON.parse(JSON.stringify(e.data)) });
                }
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
      const reads = new Map();   // key -> version seen
      const writes = [];
      let wrote = false;
      const tx = {
        async get(r) {
          if (wrote) throw new Error('Firestore transactions require all reads to be executed before all writes.');
          const e = store.get(r.key);
          reads.set(r.key, e ? e.version : 0);
          await Promise.resolve(); // yield, so concurrent transactions interleave
          return { id: r.id, exists: !!e, data: () => (e ? JSON.parse(JSON.stringify(e.data)) : undefined) };
        },
        set(r, data, opts) { wrote = true; writes.push([r.key, data, opts]); },
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
  function all(col) {
    return [...store].filter(([k]) => k.startsWith(col + '/')).map(([k, e]) => Object.assign({ id: k.slice(col.length + 1) }, e.data));
  }
  function get(col, id) { const e = store.get(col + '/' + id); return e ? e.data : undefined; }
  return { collection, runTransaction, all, get, stats, _store: store };
}

const deps = { TIERS, FieldValue, Timestamp };

// ======================================================== Stripe fixtures
const STEVEN = { uid: 'Rh6vpWhzQ5TDbIYvyZ0MOIx0Qh03', email: 'stevenkottaras@gmail.com' };
const T0 = 1789000000; // fixed Stripe `created` (seconds)

function session(over) {
  return Object.assign({
    id: 'cs_live_a1B2c3D4e5F6g7H8steven',
    object: 'checkout.session',
    mode: 'payment',
    status: 'complete',
    payment_status: 'paid',
    livemode: true,
    amount_total: 9900,
    currency: 'usd',
    created: T0,
    customer_email: STEVEN.email,
    customer_details: { email: STEVEN.email },
    payment_intent: 'pi_steven_001',
    metadata: { firebase_uid: STEVEN.uid, tier: 'mentorship-program-list' },
  }, over || {});
}
function evt(type, object, id) {
  return { id: id || 'evt_' + Math.random().toString(36).slice(2), type, data: { object } };
}
function charge(over) {
  return Object.assign({ object: 'charge', id: 'ch_steven_001', payment_intent: 'pi_steven_001', amount: 9900, amount_refunded: 0, refunded: false }, over || {});
}
const ADMIN_EMAILS = ['eli@shosmed.com', 'contact@shosmed.com', 'privacy@shosmed.com', 'elizolotov@gmail.com'];
const totals = db => revenue.summarizeRevenue(db.all('transactions'), { excludeEmails: ADMIN_EMAILS });

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

(async () => {
  // ------------------------------------------------ 1. successful $99 payment
  await test('successful payment', async () => {
    const db = makeDb();
    const r = await payments.handleStripeEvent(db, evt('checkout.session.completed', session(), 'evt_1'), deps);
    check('1a completed+paid is recorded', r.result === 'recorded', r);

    const t = db.get('transactions', 'cs_live_a1B2c3D4e5F6g7H8steven');
    check('1b ledger doc keyed by Checkout Session ID', !!t);
    check('1c ledger amount is Stripe amount in cents', t && t.amountTotal === 9900, t && t.amountTotal);
    check('1d ledger has uid/tier/field/email', t && t.uid === STEVEN.uid && t.tier === 'mentorship-program-list'
      && t.field === 'mentorship-program-list' && t.email === STEVEN.email, t);
    check('1e ledger records livemode + paid + payment intent', t && t.livemode === true
      && t.paymentStatus === 'paid' && t.paymentIntentId === 'pi_steven_001', t);
    check('1f ledger purchasedAt is Stripe creation time', t && t.purchasedAt.__ts === T0 * 1000, t && t.purchasedAt);
    check('1g ledger stores the Stripe event id', t && t.stripeEventId === 'evt_1');

    const p = (db.get('users', STEVEN.uid) || {}).payments || {};
    check('1h entitlement marked paid', p['mentorship-program-list'] === 'paid', p);
    check('1i entitlement links the session', p['mentorship-program-list-stripe-session'] === 'cs_live_a1B2c3D4e5F6g7H8steven');
    check('1j entitlement amount in dollars (schema unchanged)', p['mentorship-program-list-amount'] === 99);
    check('1k one-time add-on gets no expiry', !('mentorship-program-list-expires-at' in p));

    const s = totals(db);
    check('1l dashboard: 1 paying user', s.payingUsers === 1, s);
    check('1m dashboard: revenue 9900 cents', s.revenueCents === 9900, s);
    check('1n dashboard renders $99', revenue.formatUsd(s.revenueCents) === '$99', revenue.formatUsd(s.revenueCents));
  });

  await test('QBank expiry derives from Stripe time, not processing time', async () => {
    const db = makeDb();
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session({
      id: 'cs_live_qbankQBANKqbank01', metadata: { firebase_uid: 'u_q', tier: 'full-access' },
    })), deps);
    const p = db.get('users', 'u_q').payments;
    check('1o QBank writes exam-bank field', p['exam-bank'] === 'paid' && p['exam-bank-plan'] === 'full-access', p);
    check('1p QBank expiry = Stripe created + 180 days',
      p['exam-bank-expires-at'].__ts === (T0 + 180 * 86400) * 1000, p['exam-bank-expires-at']);
  });

  // ---------------------------------------------- 2. duplicate webhook delivery
  await test('duplicate delivery', async () => {
    const db = makeDb();
    const e = evt('checkout.session.completed', session(), 'evt_dup');
    const a = await payments.handleStripeEvent(db, e, deps);
    const before = JSON.stringify(db.get('users', STEVEN.uid));
    const b = await payments.handleStripeEvent(db, e, deps);
    check('2a first delivery recorded', a.result === 'recorded', a);
    check('2b redelivery of the same event is a duplicate', b.result === 'duplicate', b);
    check('2c redelivery leaves user record untouched', JSON.stringify(db.get('users', STEVEN.uid)) === before);

    const c = await payments.handleStripeEvent(db,
      evt('checkout.session.async_payment_succeeded', session(), 'evt_other'), deps);
    check('2d different event, same session -> duplicate', c.result === 'duplicate', c);

    const r = await payments.recordCheckoutSession(db, session(), Object.assign({ source: 'reconcile' }, deps));
    check('2e reconciliation over a webhook-recorded session -> duplicate', r.result === 'duplicate', r);

    check('2f still exactly one ledger doc', db.all('transactions').length === 1, db.all('transactions').length);
    const s = totals(db);
    check('2g revenue not double-counted', s.revenueCents === 9900 && s.payingUsers === 1, s);
  });

  await test('concurrent duplicate deliveries', async () => {
    const db = makeDb();
    const e = evt('checkout.session.completed', session(), 'evt_race');
    const results = await Promise.all([1, 2, 3, 4, 5].map(() => payments.handleStripeEvent(db, e, deps)));
    const recorded = results.filter(r => r.result === 'recorded').length;
    check('2h five simultaneous deliveries -> exactly one recorded', recorded === 1, results.map(r => r.result));
    check('2i the fake genuinely raced (transactions retried)', db.stats.retries > 0, db.stats);
    check('2j one ledger doc after the race', db.all('transactions').length === 1);
    check('2k revenue after the race is $99', totals(db).revenueCents === 9900, totals(db));
  });

  // ------------------------------------------- 3. failed / incomplete payments
  await test('failed and incomplete payments', async () => {
    const db = makeDb();
    const cases = [
      ['3a completed but unpaid (async pending)', evt('checkout.session.completed', session({ payment_status: 'unpaid' }))],
      ['3b async payment failed', evt('checkout.session.async_payment_failed', session({ payment_status: 'unpaid' }))],
      ['3c session expired (abandoned)', evt('checkout.session.expired', session({ status: 'expired', payment_status: 'unpaid' }))],
      ['3d session still open', evt('checkout.session.completed', session({ status: 'open', payment_status: 'unpaid' }))],
      ['3e missing firebase metadata', evt('checkout.session.completed', session({ metadata: {} }))],
      ['3f unknown tier', evt('checkout.session.completed', session({ metadata: { firebase_uid: STEVEN.uid, tier: 'nope' } }))],
      ['3g subscription-mode session', evt('checkout.session.completed', session({ mode: 'subscription' }))],
      ['3h payment_intent.payment_failed', evt('payment_intent.payment_failed', { object: 'payment_intent', id: 'pi_x' })],
    ];
    for (const [name, e] of cases) {
      const r = await payments.handleStripeEvent(db, e, deps);
      check(name + ' -> ignored', r.result === 'ignored', r);
    }
    check('3i nothing written to the ledger', db.all('transactions').length === 0, db.all('transactions'));
    check('3j no entitlement granted', !db.get('users', STEVEN.uid));
    const s = totals(db);
    check('3k dashboard stays 0 / $0', s.payingUsers === 0 && s.revenueCents === 0, s);

    // Delayed method: pending at completion, then succeeds -> counted once.
    const ok = await payments.handleStripeEvent(db,
      evt('checkout.session.async_payment_succeeded', session({ payment_status: 'paid' })), deps);
    check('3l async success after pending is recorded', ok.result === 'recorded', ok);
    check('3m and counted once', totals(db).revenueCents === 9900, totals(db));
  });

  // ------------------------------------------------------------- 4. refunds
  await test('full refund', async () => {
    const db = makeDb();
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session()), deps);
    const r = await payments.handleStripeEvent(db,
      evt('charge.refunded', charge({ amount_refunded: 9900, refunded: true }), 'evt_ref1'), deps);
    check('4a refund applied', r.result === 'refund_applied', r);
    const t = db.get('transactions', 'cs_live_a1B2c3D4e5F6g7H8steven');
    check('4b ledger marked refunded', t.refundStatus === 'refunded' && t.amountRefunded === 9900, t);
    check('4c original amount preserved for audit', t.amountTotal === 9900);
    const s = totals(db);
    check('4d fully refunded payment drops out of revenue', s.revenueCents === 0, s);
    check('4e and the buyer is no longer a paying user', s.payingUsers === 0, s);
    check('4f entitlement marked refunded', db.get('users', STEVEN.uid).payments['mentorship-program-list'] === 'refunded');

    const again = await payments.handleStripeEvent(db,
      evt('charge.refunded', charge({ amount_refunded: 9900, refunded: true }), 'evt_ref1'), deps);
    check('4g replayed refund event changes nothing', again.result === 'refund_unchanged', again);
    check('4h revenue still 0 after replay', totals(db).revenueCents === 0);
  });

  await test('partial refund and out-of-order events', async () => {
    const db = makeDb();
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session()), deps);
    await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 2500 })), deps);
    let s = totals(db);
    check('4i partial refund nets out: 9900 - 2500 = 7400', s.revenueCents === 7400, s);
    check('4j partially refunded buyer is still paying', s.payingUsers === 1, s);
    check('4k partial refund keeps the entitlement', db.get('users', STEVEN.uid).payments['mentorship-program-list'] === 'paid');
    check('4l ledger says partially_refunded',
      db.get('transactions', 'cs_live_a1B2c3D4e5F6g7H8steven').refundStatus === 'partially_refunded');

    await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 5000 })), deps);
    check('4m second partial refund uses Stripe cumulative total (not +=)', totals(db).revenueCents === 4900, totals(db));

    const late = await payments.handleStripeEvent(db, evt('charge.refunded', charge({ amount_refunded: 2500 })), deps);
    check('4n stale out-of-order refund event cannot move refunds backwards', late.result === 'refund_unchanged'
      && totals(db).revenueCents === 4900, [late, totals(db)]);
  });

  await test('refund edge cases', async () => {
    const db = makeDb();
    const u = await payments.handleStripeEvent(db, evt('charge.refunded', charge({ payment_intent: 'pi_unknown', amount_refunded: 100 })), deps);
    check('4o refund for an unrecorded payment is acknowledged, not invented', u.result === 'unmatched'
      && db.all('transactions').length === 0, u);

    // User bought, then bought again; refunding the FIRST must not revoke the second.
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session({ id: 'cs_live_firstFIRSTfirst01', payment_intent: 'pi_1' })), deps);
    await payments.handleStripeEvent(db, evt('checkout.session.completed', session({ id: 'cs_live_secondSECONDsec02', payment_intent: 'pi_2', created: T0 + 60 })), deps);
    await payments.handleStripeEvent(db, evt('charge.refunded', charge({ payment_intent: 'pi_1', amount_refunded: 9900, refunded: true })), deps);
    const p = db.get('users', STEVEN.uid).payments;
    check('4p refunding an older purchase leaves the newer entitlement paid', p['mentorship-program-list'] === 'paid'
      && p['mentorship-program-list-stripe-session'] === 'cs_live_secondSECONDsec02', p);
    const s = totals(db);
    check('4q revenue counts only the unrefunded purchase', s.revenueCents === 9900 && s.payingUsers === 1, s);
  });

  // ------------------------------------------------ test mode + $0 promo code
  await test('test mode and free checkouts', async () => {
    const db = makeDb();
    const t = await payments.handleStripeEvent(db, evt('checkout.session.completed',
      session({ id: 'cs_test_testTESTtest01', livemode: false })), deps);
    check('5a test-mode session is recorded (audit trail)', t.result === 'recorded', t);
    check('5b but excluded from revenue', totals(db).revenueCents === 0 && totals(db).payingUsers === 0, totals(db));

    const f = await payments.handleStripeEvent(db, evt('checkout.session.completed',
      session({ id: 'cs_live_promoPROMOpromo01', payment_status: 'no_payment_required', amount_total: 0,
        metadata: { firebase_uid: 'u_promo', tier: 'mentorship-eras' } })), deps);
    check('5c 100% promo grants the service', f.result === 'recorded'
      && db.get('users', 'u_promo').payments['mentorship-eras'] === 'paid', f);
    check('5d but is not revenue and not a paying user', totals(db).revenueCents === 0 && totals(db).payingUsers === 0);
  });

  // ------------------------------------------------ 6. dashboard totals
  await test('dashboard totals', () => {
    const tx = (o) => Object.assign({ livemode: true, paymentStatus: 'paid', currency: 'usd', amountRefunded: 0 }, o);
    const ledger = [
      tx({ uid: STEVEN.uid, email: STEVEN.email, amountTotal: 9900 }),               // counted
      tx({ uid: 'u2', email: 'b@x.com', amountTotal: 9900 }),                         // counted
      tx({ uid: 'u2', email: 'b@x.com', amountTotal: 9900 }),                         // same user, 2nd purchase
      tx({ uid: 'u3', email: 'c@x.com', amountTotal: 9900, amountRefunded: 9900 }),   // full refund
      tx({ uid: 'u4', email: 'd@x.com', amountTotal: 9900, amountRefunded: 1900 }),   // partial -> 8000
      tx({ uid: 'u5', email: 'e@x.com', amountTotal: 9900, livemode: false }),        // test mode
      tx({ uid: 'u6', email: 'f@x.com', amountTotal: 9900, paymentStatus: 'unpaid' }), // not paid
      tx({ uid: 'u7', email: 'Eli@ShosMed.com', amountTotal: 9900 }),                 // admin (case-insensitive)
      tx({ uid: 'u8', email: 'staff-alias@x.com', amountTotal: 9900 }),               // admin by uid
      tx({ uid: 'u9', email: 'g@x.com', amountTotal: 0, paymentStatus: 'no_payment_required' }),
      tx({ uid: 'u10', email: 'h@x.com', amountTotal: 5000, currency: 'eur' }),       // non-USD
    ];
    const s = revenue.summarizeRevenue(ledger, { excludeEmails: ADMIN_EMAILS, excludeUids: ['u8'] });
    check('6a paying users = distinct buyers with net > 0 (Steven, u2, u4, u10)', s.payingUsers === 4, s);
    check('6b USD revenue = 9900 + 9900 + 9900 + 8000', s.revenueCents === 37700, s);
    check('6c non-USD kept out of the dollar total', s.revenueByCurrency.eur === 5000, s.revenueByCurrency);
    check('6d formatting with cents', revenue.formatUsd(12345) === '$123.45', revenue.formatUsd(12345));
    check('6e formatting thousands', revenue.formatUsd(123400) === '$1,234', revenue.formatUsd(123400));
    check('6f empty ledger -> 0 / $0', JSON.stringify(revenue.summarizeRevenue([])) ===
      JSON.stringify({ payingUsers: 0, revenueCents: 0, revenueByCurrency: {}, transactionsCounted: 0 }));

    // The expected production state after backfill: only Steven's payment.
    const only = revenue.summarizeRevenue([tx({ uid: STEVEN.uid, email: STEVEN.email, amountTotal: 9900 })],
      { excludeEmails: ADMIN_EMAILS });
    check('6g Steven alone -> 1 paying user, $99', only.payingUsers === 1 && revenue.formatUsd(only.revenueCents) === '$99', only);
  });

  // ------------------------------------------------ TIERS coverage
  await test('every sellable tier records', async () => {
    for (const tier of Object.keys(TIERS)) {
      const db = makeDb();
      const r = await payments.handleStripeEvent(db, evt('checkout.session.completed',
        session({ id: 'cs_live_tier' + tier.replace(/[^A-Za-z0-9]/g, '') + 'X1', metadata: { firebase_uid: 'u', tier } })), deps);
      check('7 tier ' + tier + ' is recorded and counted', r.result === 'recorded' && totals(db).revenueCents === 9900, r);
    }
  });

  console.log(`payments: ${passed} passed, ${failures.length} failed`);
  if (failures.length) {
    console.log();
    failures.forEach(f => console.log('  FAIL ' + f));
    process.exit(1);
  }
})();
