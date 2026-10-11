/**
 * Tests for QBank access expiry: the rule itself, renewals, and the
 * 30-day / 7-day reminder schedule.
 *
 * Run:  node test/qbank-access.test.js
 *
 * Covers the production modules:
 *   qbank-access.js        the rule the website and admin panel use
 *   functions/payments.js  the server's copy of the rule (checked to agree),
 *                          renewal maths, and which reminder is due
 *
 * Decisions these tests pin down (2026-10-11):
 *   - 'paid' with no expiry never ends (admin grants without a duration,
 *     and any record from before expiry was enforced).
 *   - When access ends the person drops to the free tier. Nothing is
 *     deleted; renewing brings it all back.
 *   - Renewing early adds to the time already held, never replaces it.
 *   - Two reminders per access period: 30 days out and 7 days out.
 */
const path = require('path');
const ROOT = path.join(__dirname, '..');
const ACCESS = require(path.join(ROOT, 'qbank-access.js'));
const P = require(path.join(ROOT, 'functions', 'payments.js'));

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''));
}

const NOW = Date.parse('2026-10-11T12:00:00Z');
const DAY = 86400000;
const paid = over => Object.assign({ 'exam-bank': 'paid', 'exam-bank-plan': 'full-access' }, over);
const state = (p, over) => ACCESS.qbankState(p, Object.assign({ nowMs: NOW }, over));

// =============================================================== the rule
{
  check('1a no access record', state({}).state === 'none' && state({}).active === false);
  check('1b access record but not paid', state({ 'exam-bank': 'refunded' }).active === false);
  check('1c paid, no expiry -> never ends', (() => {
    const s = state(paid());
    return s.active && s.unlimited && s.daysLeft === null && s.label === 'Purchased';
  })(), state(paid()));
  check('1d paid, expiry in the future -> active with days left',
    state(paid({ 'exam-bank-expires-at': { __ts: NOW + 10 * DAY } })).daysLeft === 10);
  check('1e paid, expiry in the past -> expired, not active', (() => {
    const s = state(paid({ 'exam-bank-expires-at': { __ts: NOW - DAY } }));
    return s.state === 'expired' && s.active === false && /ended/.test(s.label);
  })());
  check('1f expiry later today still counts as a day left', (() => {
    const s = state(paid({ 'exam-bank-expires-at': { __ts: NOW + 3600000 } }));
    return s.active === true && s.daysLeft === 1;
  })());
  check('1g the moment it expires, access stops',
    state(paid({ 'exam-bank-expires-at': { __ts: NOW } })).active === false);
  check('1h complimentary grant with no duration never ends', (() => {
    const s = state({ 'exam-bank': 'paid', 'exam-bank-plan': 'admin-granted' });
    return s.active && s.unlimited && s.complimentary && s.label === 'Complimentary';
  })());
  check('1i complimentary grant with a duration does end',
    state({ 'exam-bank': 'paid', 'exam-bank-plan': 'admin-granted', 'exam-bank-expires-at': { __ts: NOW - DAY } }).active === false);
  check('1j staff always have access, whatever the record says',
    state(paid({ 'exam-bank-expires-at': { __ts: NOW - 999 * DAY } }), { isStaff: true }).active === true);
  check('1k expiry is read, never rewritten: the same record reads differently later',
    state(paid({ 'exam-bank-expires-at': { __ts: NOW + DAY } })).active === true
    && ACCESS.qbankState(paid({ 'exam-bank-expires-at': { __ts: NOW + DAY } }), { nowMs: NOW + 2 * DAY }).active === false);
  // Firestore Timestamps, plain millis and ISO strings all read the same.
  const forms = [
    { __ts: NOW + 5 * DAY },
    { toMillis: () => NOW + 5 * DAY },
    { seconds: (NOW + 5 * DAY) / 1000, nanoseconds: 0 },
    NOW + 5 * DAY,
    new Date(NOW + 5 * DAY).toISOString(),
  ];
  check('1l every stored date format is understood',
    forms.every(f => state(paid({ 'exam-bank-expires-at': f })).daysLeft === 5),
    forms.map(f => state(paid({ 'exam-bank-expires-at': f })).daysLeft));
}

// ============================= website and server must agree on the rule
{
  const cases = [
    {}, { 'exam-bank': 'refunded' }, paid(),
    paid({ 'exam-bank-expires-at': { __ts: NOW + DAY } }),
    paid({ 'exam-bank-expires-at': { __ts: NOW - DAY } }),
    paid({ 'exam-bank-expires-at': NOW + 60 * DAY }),
    paid({ 'exam-bank-expires-at': new Date(NOW - 60 * DAY).toISOString() }),
    { 'exam-bank': 'paid', 'exam-bank-plan': 'admin-granted' },
    { 'exam-bank': 'paid', 'exam-bank-plan': 'admin-granted', 'exam-bank-expires-at': { __ts: NOW - 1 } },
  ];
  const disagree = cases.filter(c =>
    ACCESS.qbankActive(c, { nowMs: NOW }) !== P.qbankAccessActive(c, NOW));
  check('2a the site rule and the server rule agree on every case', disagree.length === 0, disagree);
}

// ===================================================== renewing / extending
{
  const days = 180;
  check('3a renewing with time left adds to it (no days lost)',
    ACCESS.extendExpiry({ __ts: NOW + 20 * DAY }, NOW, days) === NOW + 20 * DAY + days * DAY);
  check('3b renewing after it ended starts from today',
    ACCESS.extendExpiry({ __ts: NOW - 20 * DAY }, NOW, days) === NOW + days * DAY);
  check('3c a first purchase starts from today',
    ACCESS.extendExpiry(null, NOW, days) === NOW + days * DAY);
  check('3d the server does the same maths', [
    [{ __ts: NOW + 20 * DAY }], [{ __ts: NOW - 20 * DAY }], [null],
  ].every(([cur]) => ACCESS.extendExpiry(cur, NOW, days) === P.extendExpiry(cur, NOW, days)));
  check('3e adding months keeps the day of month', (() => {
    const jan31 = Date.parse('2027-01-31T00:00:00Z');
    const plus1 = new Date(ACCESS.addMonths(jan31, 1));
    const plus3 = new Date(ACCESS.addMonths(jan31, 3));
    return plus1.getMonth() === 1 && plus3.getMonth() === 3 && plus3.getDate() === 30;
  })(), [new Date(ACCESS.addMonths(Date.parse('2027-01-31T00:00:00Z'), 1)).toDateString()]);
}

// ============================================ which reminder is due, if any
{
  const due = (p, at) => P.dueReminderStage(p, at == null ? NOW : at);
  const end = d => paid({ 'exam-bank-expires-at': { __ts: NOW + d * DAY } });
  check('4a 60 days out: nothing yet', due(end(60)) === null);
  check('4b 30 days out: the 30-day notice', due(end(30)) === 30);
  check('4c 20 days out and the 30-day notice already sent: nothing', (() => {
    const p = end(20); p['exam-bank-reminder-30-sent'] = { __ts: NOW - 10 * DAY };
    return due(p) === null;
  })());
  check('4d 7 days out, 30 already sent: the 7-day notice', (() => {
    const p = end(7); p['exam-bank-reminder-30-sent'] = { __ts: NOW - 23 * DAY };
    return due(p) === 7;
  })());
  check('4e both already sent: nothing', (() => {
    const p = end(3);
    p['exam-bank-reminder-30-sent'] = { __ts: NOW - 27 * DAY };
    p['exam-bank-reminder-7-sent'] = { __ts: NOW - 4 * DAY };
    return due(p) === null;
  })());
  check('4f someone who starts inside 7 days gets the 30-day notice first, then the 7-day one', (() => {
    const p = end(5);
    const first = due(p);
    p['exam-bank-reminder-30-sent'] = { __ts: NOW };
    return first === 30 && due(p) === 7;
  })());
  check('4g unlimited access is never reminded', due(paid()) === null);
  check('4h already expired: no reminder', due(end(-1)) === null);
  check('4i no access: no reminder', due({}) === null);
  check('4j complimentary access WITH a duration is reminded too',
    due({ 'exam-bank': 'paid', 'exam-bank-plan': 'admin-granted', 'exam-bank-expires-at': { __ts: NOW + 30 * DAY } }) === 30);
  check('4k running the job twice on the same day sends nothing the second time', (() => {
    const p = end(30);
    const first = due(p);
    p[`exam-bank-reminder-${first}-sent`] = { __ts: NOW };
    return first === 30 && due(p) === null;
  })());
}

// ======================= renewal through the webhook (the real write path)
(async () => {
  const FieldValue = { serverTimestamp: () => ({ __serverTimestamp: true }), delete: () => ({ __delete: true }) };
  const Timestamp = { fromMillis: ms => ({ __ts: ms }) };
  const TIERS = { 'full-access': { field: 'exam-bank', plan: 'full-access', expiryDays: 180 } };

  function db(seed) {
    const store = new Map(Object.entries(seed || {}));
    const merge = (a, b) => {
      const o = Object.assign({}, a);
      for (const [k, v] of Object.entries(b)) {
        if (v && v.__delete) { delete o[k]; continue; }
        o[k] = (v && typeof v === 'object' && !v.__ts && !v.__serverTimestamp && !Array.isArray(v) && o[k] && typeof o[k] === 'object')
          ? merge(o[k], v) : v;
      }
      return o;
    };
    return {
      store,
      collection: col => ({ doc: id => ({ key: col + '/' + id }) }),
      async runTransaction(fn) {
        const writes = [];
        const tx = {
          async get(r) { const d = store.get(r.key); return { exists: !!d, data: () => d && JSON.parse(JSON.stringify(d)) }; },
          set(r, data, o) { writes.push([r.key, data, o]); },
        };
        const res = await fn(tx);
        writes.forEach(([k, d, o]) => store.set(k, o && o.merge && store.get(k) ? merge(store.get(k), d) : merge({}, d)));
        return res;
      },
    };
  }
  const session = (id, createdMs) => ({
    id, object: 'checkout.session', mode: 'payment', status: 'complete', payment_status: 'paid',
    livemode: true, amount_total: 9900, currency: 'usd', created: Math.floor(createdMs / 1000),
    customer_details: { email: 'b@x.test' }, payment_intent: 'pi_' + id,
    metadata: { firebase_uid: 'u1', tier: 'full-access' },
  });
  const deps = { TIERS, FieldValue, Timestamp, now: () => NOW };

  // First purchase.
  const d1 = db();
  await P.recordCheckoutSession(d1, session('cs_live_first0000001', NOW), deps);
  const p1 = d1.store.get('users/u1').payments;
  check('5a first purchase ends 180 days from today', p1['exam-bank-expires-at'].__ts === NOW + 180 * DAY, p1['exam-bank-expires-at']);

  // Renewing with 20 days left: the new period is added on top.
  const d2 = db({ 'users/u1': { payments: paid({
    'exam-bank-expires-at': { __ts: NOW + 20 * DAY },
    'exam-bank-reminder-30-sent': { __ts: NOW - 5 * DAY },
    'exam-bank-reminder-7-sent': { __ts: NOW - 1 * DAY },
  }) } });
  await P.recordCheckoutSession(d2, session('cs_live_renew00000001', NOW), deps);
  const p2 = d2.store.get('users/u1').payments;
  check('5b renewing early adds to the days already held',
    p2['exam-bank-expires-at'].__ts === NOW + 20 * DAY + 180 * DAY, p2['exam-bank-expires-at']);
  check('5c a renewal clears both reminder flags, so the new period gets its own',
    !('exam-bank-reminder-30-sent' in p2) && !('exam-bank-reminder-7-sent' in p2), Object.keys(p2));
  check('5d after renewing, no reminder is due', P.dueReminderStage(p2, NOW) === null);

  // Renewing after a lapse starts fresh from today.
  const d3 = db({ 'users/u1': { payments: paid({ 'exam-bank-expires-at': { __ts: NOW - 30 * DAY } }) } });
  await P.recordCheckoutSession(d3, session('cs_live_lapsed000001', NOW), deps);
  check('5e renewing after it ended starts a fresh 180 days',
    d3.store.get('users/u1').payments['exam-bank-expires-at'].__ts === NOW + 180 * DAY);
  check('5f access is live again straight away',
    P.qbankAccessActive(d3.store.get('users/u1').payments, NOW) === true);

  // A one-off service (no expiry) is unaffected by any of this.
  const d4 = db();
  const s = session('cs_live_oneoff000001', NOW);
  s.metadata.tier = 'mentorship-x';
  await P.recordCheckoutSession(d4, s, { TIERS: Object.assign({ 'mentorship-x': { field: 'mentorship-x', plan: null, expiryDays: null } }, TIERS), FieldValue, Timestamp, now: () => NOW });
  const p4 = d4.store.get('users/u1').payments;
  check('5g a service with no duration gets no expiry and no reminder flags',
    !('mentorship-x-expires-at' in p4) && !Object.keys(p4).some(k => k.includes('reminder')), Object.keys(p4));

  console.log(`qbank-access: ${passed} passed, ${failures.length} failed`);
  if (failures.length) {
    console.log();
    failures.forEach(f => console.log('  FAIL ' + f));
    process.exit(1);
  }
})();
