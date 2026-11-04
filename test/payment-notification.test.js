/**
 * Tests for the admin notification sent when a payment is recorded.
 *
 * Run:  node test/payment-notification.test.js
 *
 * Motivating defect (2026-11-03):
 *   A customer paid $99 for Mock Interview Session. Stripe delivered
 *   checkout.session.completed, the webhook recorded the ledger row and
 *   granted access — and nobody was told. Nothing in the codebase emailed
 *   on a payment; the only notification had ever been whatever Stripe's own
 *   account settings sent, and on that day they sent nothing.
 *
 * What runs here is the production code: buildPaymentAlert and
 * PRODUCT_LABELS are the ones functions/index.js uses, and the TIERS table
 * and the site's product catalogue are parsed out of their own sources, so
 * a tier added in one place and not the other fails this file.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// functions/index.js calls firebase-functions at load, so give it the config
// those calls expect before requiring it.
process.env.GCLOUD_PROJECT = process.env.GCLOUD_PROJECT || 'shos-med-global-6eb19';
const fns = require(path.join(ROOT, 'functions', 'index.js'));
const buildPaymentAlert = fns._buildPaymentAlert;
const PRODUCT_LABELS = fns._PRODUCT_LABELS;

const indexSrc = fs.readFileSync(path.join(ROOT, 'functions', 'index.js'), 'utf8');
const TIERS = new Function(indexSrc.match(/const TIERS = (\{[\s\S]*?\n\});/)[0] + '\nreturn TIERS;')();

const catalogSrc = fs.readFileSync(path.join(ROOT, 'product-catalog.js'), 'utf8');
const PRODUCTS = new Function(catalogSrc.match(/const PRODUCTS = (\{[\s\S]*?\n  \});/)[0]
  .replace('const PRODUCTS = ', 'return ') )();

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail === undefined ? '' : '  -> ' + JSON.stringify(detail).slice(0, 220)));
}

// A ledger row exactly as functions/payments.js writes one.
const row = (over) => Object.assign({
  sessionId: 'cs_live_test123',
  uid: 'Rh6vpWhzQ5TDblYvyZ0MOIx0Qh03',
  email: 'buyer@example.com',
  tier: 'mentorship-mock-interview',
  field: 'mentorship-mock-interview',
  amountTotal: 9900,
  currency: 'usd',
  paymentStatus: 'paid',
  livemode: true,
  paymentIntentId: 'pi_test',
  amountRefunded: 0,
  refundStatus: 'none',
  source: 'webhook',
}, over);

// ------------------------------------------------- the ordinary purchase
const a = buildPaymentAlert(row());
check('1a a live webhook payment produces an alert', !!a);
check('1b it goes to the shared inbox', a && a.to === 'contact@shosmed.com', a && a.to);
check('1c the subject names the product and the amount',
  a && a.subject === '[SHOS] Payment: Mock Interview Session — $99.00', a && a.subject);
check('1d replying reaches the customer', a && a.replyTo === 'buyer@example.com');
check('1e it is rendered as a payment, not a message',
  a && a.payload.kind === 'payment', a && a.payload.kind);
const labels = a ? Object.fromEntries(a.payload.lines) : {};
check('1f the body names the product', labels.Product === 'Mock Interview Session', labels);
check('1g the body gives the amount', labels.Amount === '$99.00', labels);
check('1h the body gives the customer', labels.Customer === 'buyer@example.com', labels);
check('1i the body carries the Stripe session id', labels['Stripe session'] === 'cs_live_test123', labels);
check('1j a live payment is not labelled as a test', !('Mode' in labels), labels);

// ------------------------------------------------------- what is skipped
// Reconciliation backfills historical payments into the same collection.
// Mailing those would fire a burst of notices about months-old purchases.
check('2a a reconciliation backfill is not mailed',
  buildPaymentAlert(row({ source: 'reconcile' })) === null);
check('2b a row with no source is not mailed',
  buildPaymentAlert(row({ source: undefined })) === null);
check('2c a missing document is not mailed', buildPaymentAlert(null) === null);

// ------------------------------------------------------------ edge cases
const t = buildPaymentAlert(row({ livemode: false }));
check('3a a test-mode payment is still mailed', !!t);
check('3b ... and says so in the subject', t && t.subject.includes('[TEST]'), t && t.subject);
check('3c ... and says so in the body',
  t && Object.fromEntries(t.payload.lines).Mode === 'TEST — not a real payment');

const free = buildPaymentAlert(row({ amountTotal: 0 }));
check('4a a 100% promo code is still mailed', !!free);
check('4b ... and is not reported as a $0.00 sale with no explanation',
  free && Object.fromEntries(free.payload.lines).Amount.includes('no charge'),
  free && Object.fromEntries(free.payload.lines).Amount);

const anon = buildPaymentAlert(row({ email: null }));
check('5a a session with no email still produces an alert', !!anon);
check('5b ... with no broken Reply-To', anon && anon.replyTo === undefined);
check('5c ... and says the email is missing',
  anon && Object.fromEntries(anon.payload.lines).Customer === '(no email on the session)');

const unknown = buildPaymentAlert(row({ tier: 'something-new' }));
check('6a an unknown tier still produces an alert', !!unknown);
check('6b ... naming the raw tier rather than "undefined"',
  unknown && unknown.subject.includes('something-new'), unknown && unknown.subject);

// ---------------------------------------------------- amounts and labels
check('7a non-USD keeps its currency code',
  buildPaymentAlert(row({ amountTotal: 12345, currency: 'eur' }))
    .subject.includes('123.45 EUR'));
check('7b cents are not dropped',
  buildPaymentAlert(row({ amountTotal: 19999 })).subject.includes('$199.99'));

// ------------------------------------------------- the three sources agree
// A tier that can be paid for must have a label here, or the email would
// name a raw key like "mentorship-eras" to the person reading it.
Object.keys(TIERS).forEach(tier => {
  check(`8a tier "${tier}" has a product label`, !!PRODUCT_LABELS[tier]);
  if (PRODUCTS[tier]) {
    check(`8b tier "${tier}" label matches the site catalogue`,
      PRODUCT_LABELS[tier] === PRODUCTS[tier].name,
      { functions: PRODUCT_LABELS[tier], site: PRODUCTS[tier].name });
  }
});
check('8c the label map invents no tier that does not exist',
  Object.keys(PRODUCT_LABELS).every(k => k in TIERS),
  Object.keys(PRODUCT_LABELS).filter(k => !(k in TIERS)));

// ----------------------------------------------- the trigger is deployable
// Compared against onBookingCreated, a trigger already deploying today, so
// this does not depend on what shape firebase-functions returns.
check('9a onPaymentRecorded is exported like the triggers that already deploy',
  !!fns.onPaymentRecorded && typeof fns.onPaymentRecorded === typeof fns.onBookingCreated,
  typeof fns.onPaymentRecorded);
check('9b it is wired to the ledger collection, not to users',
  /functions\s*\n?\s*\.runWith\(\{ secrets: \['RESEND_API_KEY'\] \}\)\s*\n?\s*\.firestore\.document\('transactions\/\{sessionId\}'\)/
    .test(indexSrc));
check('9c it fires on create only, so a refund update does not re-mail',
  /\.firestore\.document\('transactions\/\{sessionId\}'\)\s*\n\s*\.onCreate\(/.test(indexSrc));
check('9d it asks for the Resend secret',
  /\.runWith\(\{ secrets: \['RESEND_API_KEY'\] \}\)[\s\S]{0,120}transactions\/\{sessionId\}/.test(indexSrc));
// The handler must never throw: the payment is already taken and access
// already granted, and a thrown error makes Firestore retry the trigger.
check('9e the handler swallows send failures',
  /\[onPaymentRecorded\] notification failed for/.test(indexSrc));

// The email template must know this kind, or the heading silently falls
// back to "New message" on a payment.
const emailsSrc = fs.readFileSync(path.join(ROOT, 'functions', 'emails.js'), 'utf8');
check('10a the alert template has a payment heading',
  /payment:\s*'New payment'/.test(emailsSrc));
const emailsMod = require(path.join(ROOT, 'functions', 'emails.js'));
const html = emailsMod.adminAlertHtml(a.payload);
const text = emailsMod.adminAlertText(a.payload);
check('10b the HTML says "New payment"', html.includes('New payment'), html.slice(0, 120));
check('10c the text says "New payment"', text.startsWith('New payment'), text.slice(0, 60));
check('10d the HTML carries the product and amount',
  html.includes('Mock Interview Session') && html.includes('$99.00'));
check('10e the text carries the product and amount',
  text.includes('Mock Interview Session') && text.includes('$99.00'));

console.log(`payment-notification: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
