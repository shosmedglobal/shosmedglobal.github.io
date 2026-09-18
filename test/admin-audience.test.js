/**
 * Tests for the Admin Panel's Overview / Med School / Residency views.
 *
 * Run:  node test/admin-audience.test.js
 *
 * Runs the production modules (admin-audience.js, product-catalog.js,
 * revenue-stats.js) on fixture data. Fixture names and amounts are test data
 * only; nothing in the production code refers to a specific customer.
 *
 * Also checks the product catalog stays consistent with the real sources:
 * Stripe tiers (functions/index.js), bookable services (contact-booking.js),
 * contact-form reasons (contact-modal.js) and the Store's two sections
 * (dashboard.html).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const A = require(path.join(ROOT, 'admin-audience.js'));
const CAT = require(path.join(ROOT, 'product-catalog.js'));
const REV = require(path.join(ROOT, 'revenue-stats.js'));

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''));
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const CFG = { adminEmails: ['admin@shos.test'], reviewerEmails: ['reviewer@shos.test'] };
const NOW = Date.parse('2026-09-18T12:00:00Z');
const DAY = 86400000;

// ----------------------------------------------------------------- fixtures
const users = [
  // Residency buyer (Program List Guidance), no QBank at all.
  { id: 'u_res', name: 'Rhea Resident', email: 'rhea@x.test', path: 'student', payments: {
    'mentorship-program-list': 'paid', 'mentorship-program-list-stripe-session': 'cs_res' } },
  // Med-school buyer of QBank.
  { id: 'u_med', name: 'Max Medic', email: 'max@x.test', path: 'applicant', payments: {
    'exam-bank': 'paid', 'exam-bank-plan': 'full-access', 'exam-bank-stripe-session': 'cs_med' } },
  // Complimentary QBank (admin-granted), no payment.
  { id: 'u_comp', name: 'Cora Comp', email: 'cora@x.test', path: 'applicant', payments: {
    'exam-bank': 'paid', 'exam-bank-plan': 'admin-granted' } },
  // Bought from both audiences; profile says residency.
  { id: 'u_both', name: 'Bo Both', email: 'bo@x.test', path: 'student', payments: {} },
  // Path not selected, no purchases.
  { id: 'u_none', name: 'Nia None', email: 'nia@x.test', path: null, payments: {} },
  // Path not selected, but bought a residency service -> residency by evidence.
  { id: 'u_evid', name: 'Eve Evidence', email: 'eve@x.test', path: null, payments: {} },
  // Refunded QBank purchase; access left on (refunds never revoke).
  { id: 'u_ref', name: 'Ray Refund', email: 'ray@x.test', path: 'applicant', payments: {
    'exam-bank': 'paid', 'exam-bank-plan': 'full-access', 'exam-bank-stripe-session': 'cs_ref' } },
  // Staff.
  { id: 'u_admin', name: 'Ada Admin', email: 'ADMIN@shos.test', path: 'applicant', payments: {} },
  { id: 'u_rev', name: 'Rev Viewer', email: 'reviewer@shos.test', path: null, payments: {} },
];
const tx = o => Object.assign({ livemode: true, paymentStatus: 'paid', currency: 'usd',
  amountRefunded: 0, refundStatus: 'none', purchasedAt: { __ts: NOW - 3 * DAY } }, o);
const txns = [
  tx({ id: 'cs_res', uid: 'u_res', email: 'rhea@x.test', tier: 'mentorship-program-list', field: 'mentorship-program-list', amountTotal: 9900 }),
  tx({ id: 'cs_med', uid: 'u_med', email: 'max@x.test', tier: 'full-access', field: 'exam-bank', amountTotal: 9900 }),
  tx({ id: 'cs_both1', uid: 'u_both', email: 'bo@x.test', tier: 'full-access', field: 'exam-bank', amountTotal: 9900, purchasedAt: { __ts: NOW - 40 * DAY } }),
  tx({ id: 'cs_both2', uid: 'u_both', email: 'bo@x.test', tier: 'mentorship-eras', field: 'mentorship-eras', amountTotal: 9900 }),
  tx({ id: 'cs_evid', uid: 'u_evid', email: 'eve@x.test', tier: 'mentorship-lor', field: 'mentorship-lor', amountTotal: 9900, amountRefunded: 2500, refundStatus: 'partially_refunded' }),
  tx({ id: 'cs_ref', uid: 'u_ref', email: 'ray@x.test', tier: 'full-access', field: 'exam-bank', amountTotal: 9900, amountRefunded: 9900, refundStatus: 'refunded' }),
  tx({ id: 'cs_unc', uid: 'u_none', email: 'nia@x.test', tier: 'future-product', field: 'future-product', amountTotal: 5000 }),
  tx({ id: 'cs_test', uid: 'u_res', email: 'rhea@x.test', tier: 'strategy-session', amountTotal: 9900, livemode: false }),
  tx({ id: 'cs_staff', uid: 'u_admin', email: 'admin@shos.test', tier: 'strategy-session', amountTotal: 9900 }),
];
const people = A.buildPeople(users, txns, CFG);
const P = id => people.find(p => p.id === id);
const opts = { period: 'all', nowMs: NOW, excludeEmails: CFG.adminEmails };
const stats = v => A.viewStats(v, people, txns, opts);
const ids = arr => arr.map(p => p.id).sort();

// =========================================== 1. the residency Program List buyer
{
  const r = P('u_res');
  check('1a role applicant, chosen path Residency', r.role === 'applicant' && r.pathLabel === 'Residency');
  check('1b purchase shows as "Program List Guidance — Paid"', r.purchases.some(p => p.name === 'Program List Guidance' && p.status === 'Paid'), r.purchases);
  check('1c counted as a paying customer (residency + overall)', r.paying.residency && r.paying.any);
  check('1d NOT a med-school member, NOT paying there', !r.audiences['med-school'] && !r.paying['med-school']);
  check('1e QBank access is "No access" — separate from being a paying customer', r.access.state === 'none' && r.paying.any);
  check('1f test-mode purchase listed as Test mode, not revenue', r.purchases.find(p => p.id === 'cs_test').status === 'Test mode');
  check('1g appears in Residency view', A.filterPeople(people, 'residency', {}).some(p => p.id === 'u_res'));
  check('1h does NOT appear in Med School view', !A.filterPeople(people, 'med-school', {}).some(p => p.id === 'u_res'));
  check('1i appears in Overview', A.filterPeople(people, 'overview', {}).some(p => p.id === 'u_res'));
}

// ================================================ 2. QBank purchase + access
{
  const m = P('u_med');
  check('2a QBank buyer access = Purchased', m.access.state === 'purchased' && m.access.label === 'Purchased');
  check('2b QBank buyer in Med School view and paying there', m.audiences['med-school'] && m.paying['med-school']);
  check('2c QBank buyer not in Residency view', !m.audiences.residency);
  check('2d building the view never mutates the access record',
    same(users.find(u => u.id === 'u_med').payments, { 'exam-bank': 'paid', 'exam-bank-plan': 'full-access', 'exam-bank-stripe-session': 'cs_med' }));
}

// =========================================== 3. complimentary access is not revenue
{
  const c = P('u_comp');
  check('3a complimentary access labelled Complimentary', c.access.state === 'complimentary' && c.access.label === 'Complimentary');
  check('3b complimentary user has no purchases', c.purchases.length === 0);
  check('3c complimentary user is NOT a paying customer', !c.paying.any && !c.paying['med-school']);
  check('3d complimentary user IS a med-school member (evidence: access)', c.audiences['med-school']);
  const med = stats('med-school');
  // Access comes from the access record, not the ledger: u_both paid for QBank
  // (ledger) but the fixture gives them no access record, so they are not
  // counted as having access. Purchased = u_med + u_ref.
  check('3e med QBank tile splits Purchased vs Complimentary', med.qbank.purchased === 2 && med.qbank.complimentary === 1, med.qbank);
}

// ======================================== 4. customer who bought from both
{
  const b = P('u_both');
  check('4a in both audience views', b.audiences['med-school'] && b.audiences.residency);
  check('4b path shows Both', b.derivedPath === 'Both');
  check('4c paying in each audience', b.paying['med-school'] && b.paying.residency);
  const ov = stats('overview'), med = stats('med-school'), res = stats('residency');
  check('4d counted ONCE in Overview paying customers',
    ov.revenue.payingCustomers === 5, ov.revenue.payingCustomers);           // res, med, both, evid, unc-buyer(nia)
  check('4e med revenue includes their QBank payment only', med.revenue.revenueCents === 9900 + 9900, med.revenue);
  check('4f residency revenue includes their ERAS payment only', res.revenue.revenueCents === 9900 + 9900 + 7400, res.revenue);
  check('4g audience subtotals + unclassified add up to the Overview total',
    ov.revenue.subtotals['med-school'] + ov.revenue.subtotals.residency + ov.revenue.subtotals.unclassified === ov.revenue.revenueCents, ov.revenue);
  check('4h each transaction counted once overall', ov.revenue.transactionsCounted === 6, ov.revenue);
}

// ============================ 5. revenue by PRODUCT, not by current profile path
{
  // Move the residency buyer's profile to med-school: their revenue must stay residency.
  const moved = users.map(u => u.id === 'u_res' ? Object.assign({}, u, { path: 'applicant' }) : u);
  const pp = A.buildPeople(moved, txns, CFG);
  const res = A.viewStats('residency', pp, txns, opts), med = A.viewStats('med-school', pp, txns, opts);
  check('5a changing path does not move revenue out of Residency', res.revenue.revenueCents === stats('residency').revenue.revenueCents);
  check('5b ...nor into Med School', med.revenue.revenueCents === stats('med-school').revenue.revenueCents);
  check('5c the person still shows in Residency (purchase evidence) and now Med School (path)',
    pp.find(p => p.id === 'u_res').audiences.residency && pp.find(p => p.id === 'u_res').audiences['med-school']);
}

// ====================== 6. unknown paths and unclassified records stay visible
{
  const n = P('u_none');
  check('6a no path, no classified purchase -> Overview only', !n.audiences['med-school'] && !n.audiences.residency);
  check('6b listed under Path: Not selected', A.filterPeople(people, 'overview', { filter: 'path-none' }).some(p => p.id === 'u_none'));
  check('6c no-path buyer of a residency service joins Residency by evidence', P('u_evid').audiences.residency && P('u_evid').derivedPath === 'Residency (from purchase)');
  const ov = stats('overview');
  check('6d unclassified product revenue shown as its own subtotal', ov.revenue.subtotals.unclassified === 5000 && ov.revenue.unclassifiedCount === 1, ov.revenue);
  check('6e unclassified purchase named, flagged, not dropped', n.purchases[0].kind === 'unclassified' && n.purchases[0].name === 'future-product');
  const items = A.attentionItems({ view: 'overview', people, transactions: txns, messages: [], bookings: [] });
  check('6f Overview "needs attention" flags the unclassified payment', items.some(i => i.key === 'unclassified' && i.count === 1), items);
  check('6g unclassified revenue excluded from both audience views',
    stats('med-school').revenue.revenueCents + stats('residency').revenue.revenueCents === ov.revenue.revenueCents - 5000);
}

// ========================================= 7. refunds (full and partial)
{
  const r = P('u_ref');
  check('7a fully refunded QBank buyer is not a paying customer', !r.paying.any);
  check('7b ...but access is unchanged and flagged', r.access.state === 'purchased' && r.access.refundedButActive === true);
  check('7c purchase status reads Refunded', r.purchases[0].status === 'Refunded');
  check('7d partially refunded purchase counts net (9900-2500)', P('u_evid').purchases[0].netCents === 7400 && P('u_evid').purchases[0].status === 'Partially refunded');
  const ov = stats('overview');
  check('7e refunds deducted and reported for the period', ov.revenue.refundedCents === 9900 + 2500, ov.revenue);
  const items = A.attentionItems({ view: 'med-school', people, transactions: txns });
  check('7f refunded-but-active access raised for review', items.some(i => i.key === 'refunded-access' && i.count === 1), items);
}

// ========================================== 8. staff are separate from applicants
{
  check('8a admin email (case-insensitive) = admin role', P('u_admin').role === 'admin');
  check('8b reviewer = reviewer role', P('u_rev').role === 'reviewer');
  check('8c staff in no audience view', !['overview', 'med-school', 'residency'].some(v => A.filterPeople(people, v, {}).some(p => p.role !== 'applicant')));
  check('8d staff listed under the Staff filter', same(ids(A.filterPeople(people, 'overview', { filter: 'staff' })), ['u_admin', 'u_rev']));
  check('8e staff purchase excluded from revenue', stats('residency').revenue.revenueCents === 27200 && !stats('overview').revenue.revenueByCurrency.eur);
  check('8f applicant count excludes staff', stats('overview').applicants === 7, stats('overview').applicants);
  check('8g staff have Staff access, not a QBank purchase', P('u_admin').access.state === 'staff');
}

// ============================================ 9. periods
{
  const all = stats('med-school').revenue.revenueCents;
  const last30 = A.viewStats('med-school', people, txns, Object.assign({}, opts, { period: '30d' })).revenue.revenueCents;
  check('9a Last 30 days excludes the 40-day-old payment', all - last30 === 9900, { all, last30 });
  check('9b This month starts on the 1st', A.periodStart('month', NOW) === new Date(2026, 8, 1).getTime());
  check('9c All time has no start', A.periodStart('all', NOW) === null);
}

// =========================================== 10. view switching has no stale state
{
  const seq = ['overview', 'med-school', 'residency', 'overview', 'residency', 'med-school'];
  const first = {};
  let stable = true;
  seq.forEach(v => {
    const s = JSON.stringify([stats(v), ids(A.filterPeople(people, v, {}))]);
    if (first[v] && first[v] !== s) stable = false;
    first[v] = first[v] || s;
  });
  check('10a every view gives identical results however you arrive at it', stable);
  check('10b views differ from each other', first.overview !== first['med-school'] && first['med-school'] !== first.residency);
  check('10c med view never contains a residency-only person', A.filterPeople(people, 'med-school', {}).every(p => p.audiences['med-school']));
  check('10d residency view never contains a med-only person', A.filterPeople(people, 'residency', {}).every(p => p.audiences.residency));
}

// ========================================== 11. search and filters
{
  check('11a search by name', same(ids(A.filterPeople(people, 'overview', { query: 'rhea' })), ['u_res']));
  check('11b search by email, case-insensitive', same(ids(A.filterPeople(people, 'overview', { query: 'MAX@X' })), ['u_med']));
  check('11c search respects the view', A.filterPeople(people, 'med-school', { query: 'rhea' }).length === 0);
  check('11d med filter QBank Complimentary', same(ids(A.filterPeople(people, 'med-school', { filter: 'access-complimentary' })), ['u_comp']));
  check('11e residency Paying customers', same(ids(A.filterPeople(people, 'residency', { filter: 'paying' })), ['u_both', 'u_evid', 'u_res']));
  check('11f residency No purchases yet excludes buyers', A.filterPeople(people, 'residency', { filter: 'not-paying' }).every(p => !p.paying.residency));
  check('11g every view has an "all" filter', A.VIEWS.every(v => A.FILTERS[v][0][0] === 'all'));
}

// ============================================== 12. export
{
  const med = A.csvTable(A.filterPeople(people, 'med-school', {}), 'med-school');
  const res = A.csvTable(A.filterPeople(people, 'residency', {}), 'residency');
  check('12a med export includes a QBank access column', med.headers.includes('QBank access'));
  check('12b residency export has no QBank column', !res.headers.includes('QBank access'));
  check('12c export rows only for the view', res.rows.length === A.filterPeople(people, 'residency', {}).length);
  const resRow = res.rows.find(r => r[1] === 'rhea@x.test');
  check('12d residency export shows the Program List purchase, paid', /Program List Guidance — Paid \(99\.00 USD\)/.test(resRow[6]) && resRow[7] === 'Yes', resRow);
  const bothRow = res.rows.find(r => r[1] === 'bo@x.test');
  check('12e residency export lists only residency purchases', !/QBank/.test(bothRow[6]), bothRow);
  check('12f export leaves out test-mode checkouts', !/Test mode/.test(resRow[6]) && !/Strategy Session/.test(resRow[6]), resRow);
}

// ============================================ 13. bookings & messages
{
  const bookings = [
    { id: 'b1', serviceType: 'mentorship-program-list', status: 'inquiry', preferredDate: '2026-09-20' },
    { id: 'b2', serviceType: 'apply-lf3-service', status: 'confirmed', preferredDate: '2026-09-25' },
    { id: 'b3', serviceType: 'free-consultation', status: 'inquiry', preferredDate: '2026-09-19' },
    { id: 'b4', serviceType: 'mystery-service', status: 'confirmed', preferredDate: '2026-09-21' },
    { id: 'b5', serviceType: 'strategy-session', status: 'completed', preferredDate: '2026-09-22' },
    { id: 'b6', serviceType: 'mentorship-lor', status: 'confirmed', preferredDate: '2026-12-01' },
  ];
  const inV = v => bookings.filter(b => A.bookingInView(b, v)).map(b => b.id);
  check('13a residency bookings', same(inV('residency'), ['b1', 'b5', 'b6']));
  check('13b med-school bookings', same(inV('med-school'), ['b2']));
  check('13c shared (Free Strategy Call) stays in Overview only', inV('overview').includes('b3') && !inV('residency').includes('b3') && !inV('med-school').includes('b3'));
  check('13d unknown service stays in Overview only, labelled Unclassified', inV('overview').includes('b4') && CAT.bookingAudience(bookings[3]).kind === 'unclassified');
  const up = A.upcomingBookings(bookings, 'overview', NOW, 14).map(b => b.id);
  check('13e upcoming = open, dated, next 14 days, soonest first', same(up, ['b3', 'b1', 'b4', 'b2']), up);
  check('13f upcoming respects the view', same(A.upcomingBookings(bookings, 'residency', NOW, 14).map(b => b.id), ['b1']));

  const messages = [
    { id: 'm1', reasonKey: 'mentorship-program-list', subject: 'Something renamed', status: 'new' },
    { id: 'm2', subject: 'Apply to LF3 (Charles University)', status: 'new' },          // legacy: exact subject
    { id: 'm3', subject: 'Schedule a Free Consultation', status: 'new' },                // shared
    { id: 'm4', subject: 'hello there', category: 'general', status: 'read' },          // free text
    { id: 'm5', reasonKey: 'not-a-reason', subject: 'General Question', status: 'new' }, // bad key -> subject
  ];
  const mv = v => messages.filter(m => A.messageInView(m, v)).map(m => m.id);
  check('13g reason key wins over subject wording', CAT.messageAudience(messages[0]).audience === 'residency');
  check('13h legacy message matched on exact subject', CAT.messageAudience(messages[1]).audience === 'med-school');
  check('13i shared reason never auto-assigned', CAT.messageAudience(messages[2]).kind === 'shared' && !mv('residency').includes('m3') && !mv('med-school').includes('m3'));
  check('13j free-text message Unassigned, Overview only', CAT.messageAudience(messages[3]).kind === 'unassigned' && same(mv('overview'), ['m1', 'm2', 'm3', 'm4', 'm5']));
  check('13k invalid reason key falls back to subject', CAT.messageAudience(messages[4]).kind === 'unassigned');
  const att = A.attentionItems({ view: 'overview', people, transactions: txns, messages, bookings, openReports: 2 });
  const byKey = k => (att.find(i => i.key === k) || {}).count;
  check('13l attention: new messages', byKey('messages-new') === 4, att);
  check('13m attention: open messages not tied to an audience (m3 shared, m4, m5)', byKey('messages-unassigned') === 3, att);
  check('13n attention: bookings awaiting reply', byKey('bookings-awaiting') === 2, att);
  check('13o attention: question reports point to Med School', att.find(i => i.key === 'reports').target === 'view:med-school');
  const resAtt = A.attentionItems({ view: 'residency', people, transactions: txns, messages, bookings, openReports: 2 });
  check('13p residency attention has no QBank reports', !resAtt.some(i => i.key === 'reports' || i.key === 'refunded-access'), resAtt);
}

// ============================================ 14. services + recent purchases
{
  const svc = A.servicesBreakdown(txns, 'residency', opts);
  check('14a residency services list Program List Guidance with its revenue',
    svc.some(s => s.name === 'Program List Guidance' && s.count === 1 && s.netCents === 9900), svc);
  check('14b residency services exclude QBank', !svc.some(s => s.tier === 'full-access'));
  check('14c services exclude staff and test purchases', !svc.some(s => s.tier === 'strategy-session'), svc);
  const rp = A.recentPurchases(people, txns, 'residency', 10);
  check('14d recent residency purchases, newest first, no staff/test', rp.every(p => p.audience === 'residency') && !rp.some(p => p.id === 'cs_staff' || p.id === 'cs_test'), rp.map(p => p.id));
  check('14e recent med purchases include the refunded one, labelled', A.recentPurchases(people, txns, 'med-school', 10).some(p => p.id === 'cs_ref' && p.status === 'Refunded'));
}

// ============================================== 15. QBank activity metric
{
  const hist = {
    a: [{ date: new Date(NOW - 2 * DAY).toISOString() }],
    b: [{ date: new Date(NOW - 45 * DAY).toISOString() }],
    c: [],
    d: [{ date: 'garbage' }, { date: new Date(NOW - 29 * DAY).toISOString() }],
  };
  check('15a users who completed a test in the last 30 days', same(A.recentTestTakers(hist, NOW).sort(), ['a', 'd']));
}

// ============================================ 16. real ledger shape (Steven-style)
{
  // The production ledger doc stores purchasedAt as a Firestore Timestamp.
  const prodLike = [{ id: 'cs_live_x', uid: 'uX', email: 'x@y.test', tier: 'mentorship-program-list', field: 'mentorship-program-list',
    amountTotal: 9900, currency: 'usd', paymentStatus: 'paid', livemode: true, amountRefunded: 0, refundStatus: 'none',
    purchasedAt: { toMillis: () => NOW - DAY } }];
  const pp = A.buildPeople([{ id: 'uX', email: 'x@y.test', name: 'X', path: 'student', payments: { 'mentorship-program-list': 'paid' } }], prodLike, CFG);
  const ov = A.viewStats('overview', pp, prodLike, opts), res = A.viewStats('residency', pp, prodLike, opts), med = A.viewStats('med-school', pp, prodLike, opts);
  check('16a Overview: 1 paying customer, $99, residency subtotal $99, med $0',
    ov.revenue.payingCustomers === 1 && ov.revenue.revenueCents === 9900 && ov.revenue.subtotals.residency === 9900 && ov.revenue.subtotals['med-school'] === 0, ov.revenue);
  check('16b Residency: 1 / $99', res.revenue.payingCustomers === 1 && res.revenue.revenueCents === 9900);
  check('16c Med School: 0 / $0', med.revenue.payingCustomers === 0 && med.revenue.revenueCents === 0);
  check('16d This month includes it', A.viewStats('residency', pp, prodLike, Object.assign({}, opts, { period: 'month' })).revenue.revenueCents === 9900);
}

// ===================================== 17. catalog consistency with the real site
{
  const indexSrc = fs.readFileSync(path.join(ROOT, 'functions', 'index.js'), 'utf8');
  const TIERS = new Function(indexSrc.match(/const TIERS = (\{[\s\S]*?\n\});/)[0] + '\nreturn TIERS;')();
  Object.keys(TIERS).forEach(t => check('17a Stripe tier classified: ' + t,
    ['med-school', 'residency'].includes(CAT.productAudience(t)) && CAT.PRODUCTS[t].stripe === true));
  Object.keys(CAT.PRODUCTS).filter(k => CAT.PRODUCTS[k].stripe).forEach(k =>
    check('17b catalog Stripe product exists in TIERS: ' + k, !!TIERS[k]));

  const cb = fs.readFileSync(path.join(ROOT, 'contact-booking.js'), 'utf8');
  const services = {};
  for (const m of cb.matchAll(/'([a-z0-9-]+)':\s*\{\s*name:\s*'([^']+)',[^}]*category:\s*'([a-z]+)'/g)) services[m[1]] = { name: m[2], category: m[3] };
  check('17c found the SERVICE_TYPES table', Object.keys(services).length >= 15, Object.keys(services).length);
  const CAT_MAP = { applicant: 'med-school', student: 'residency', consultation: 'shared' };
  Object.entries(services).forEach(([k, s]) => {
    check('17d service classified: ' + k, !!CAT.productAudience(k));
    check('17e service name matches: ' + k, CAT.productName(k) === s.name, [CAT.productName(k), s.name]);
    if (CAT_MAP[s.category]) check('17f service audience matches its category: ' + k, CAT.productAudience(k) === CAT_MAP[s.category]);
  });

  const cm = fs.readFileSync(path.join(ROOT, 'contact-modal.js'), 'utf8');
  const reasons = {};
  for (const m of cm.matchAll(/'([a-z0-9-]+)':\s*\{\s*subject:\s*'([^']+)'/g)) reasons[m[1]] = m[2];
  check('17g contact reasons: same keys', same(Object.keys(reasons).sort(), Object.keys(CAT.CONTACT_REASONS).sort()), Object.keys(reasons));
  Object.entries(reasons).forEach(([k, subj]) => check('17h reason subject matches: ' + k, CAT.CONTACT_REASONS[k] && CAT.CONTACT_REASONS[k].subject === subj));

  // The Store's two sections must offer only their own audience's products.
  const dash = fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8');
  const sec = (id, next) => dash.slice(dash.indexOf('id="' + id + '"'), next ? dash.indexOf('id="' + next + '"') : undefined);
  const medSec = sec('storeApplicantServices', 'storeStudentServices');
  const resSec = dash.slice(dash.indexOf('id="storeStudentServices"'), dash.indexOf('id="viewContact"'));
  const keysIn = s => [...s.matchAll(/(?:data-tier|value)="([a-z0-9-]+)"/g)].map(m => m[1]).filter(k => CAT.PRODUCTS[k] || TIERS[k]);
  keysIn(medSec).forEach(k => check('17i Store med section product is med-school: ' + k, CAT.productAudience(k) === 'med-school'));
  keysIn(resSec).forEach(k => check('17j Store residency section product is residency: ' + k, CAT.productAudience(k) === 'residency'));
  check('17k Store sections found', keysIn(medSec).length >= 1 && keysIn(resSec).length >= 7, [keysIn(medSec), keysIn(resSec)]);
}

console.log(`admin-audience: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
