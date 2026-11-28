'use strict';
/* account-hardening.test.js — the shape of the fixes, so they cannot quietly
 * come undone.
 * ---------------------------------------------------------------------------
 * These are STRUCTURAL checks, not functional ones. The behaviour is proved
 * in test/emulator/, against real signups and real rules; what this file does
 * is stop a later edit from reinstating a pattern that was removed on purpose.
 * Each check names the thing that went wrong, because a guard whose reason is
 * forgotten is a guard somebody deletes to make a test pass.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) passed++;
  else failures.push(name + (detail === undefined ? '' : '  [got: ' + JSON.stringify(detail) + ']'));
}

const idx = read('functions/index.js');
const identity = require(path.join(ROOT, 'functions', 'identity.js'));
const rules = read('firestore.rules');
const authjs = read('auth.js');
const signup = read('signup.html');
const contactjs = read('contact-booking.js');

// ---------------------------------------------------------------------------
// 1. One admin list.
//    It used to exist twice, as ADMIN_EMAILS (a Set) and MOCK_ADMIN_EMAILS
//    (an array), with identical contents maintained independently. Two copies
//    of an authorization rule is one too many: the day they diverge, the
//    divergence is the vulnerability, and nothing notices.
// ---------------------------------------------------------------------------
check('1a identity.js holds the list', Array.isArray(identity.ADMIN_EMAILS)
  && identity.ADMIN_EMAILS.length >= 1);
check('1b index.js does not declare a second literal list',
  !/const (ADMIN_EMAILS|MOCK_ADMIN_EMAILS) = (new Set\(\[|\[)\s*\n\s*'/.test(idx));
check('1c index.js takes both names from identity.js',
  /const MOCK_ADMIN_EMAILS = identity\.ADMIN_EMAILS/.test(idx)
  && /const ADMIN_EMAILS = new Set\(identity\.ADMIN_EMAILS\)/.test(idx));

const rulesAdmin = (rules.match(/function isAdmin\(\)[\s\S]*?\n    \}/) || [''])[0];
const rulesAddrs = (rulesAdmin.match(/'[^']+@[^']+'/g) || [])
  .map(s => s.replace(/'/g, '').toLowerCase()).sort();
check('1d the rules copy matches, since rules cannot import JavaScript',
  JSON.stringify(rulesAddrs) === JSON.stringify(identity.ADMIN_EMAILS.map(s => s.toLowerCase()).sort()),
  { rules: rulesAddrs, code: identity.ADMIN_EMAILS });

// ---------------------------------------------------------------------------
// 2. An email address is an identifier, not a credential.
//    Admin rights were granted on a matching string in a token. For any
//    listed address with no account behind it, anyone could have signed up
//    with it, never verified it, and held full admin.
// ---------------------------------------------------------------------------
check('2a the code path requires a verified address or a server-set claim',
  /email_verified !== true/.test(require('fs').readFileSync(
    path.join(ROOT, 'functions', 'identity.js'), 'utf8'))
  && typeof identity.adminRefusal === 'function');
check('2b an unverified admin address is refused',
  identity.adminRefusal({ auth: { token: { email: identity.ADMIN_EMAILS[0], email_verified: false } } })
    === 'admin-address-not-verified');
check('2c a verified admin address is accepted',
  identity.adminRefusal({ auth: { token: { email: identity.ADMIN_EMAILS[0], email_verified: true } } })
    === null);
check('2d a server-set claim is accepted on its own',
  identity.adminRefusal({ auth: { token: { email: 'nobody@example.com', admin: true } } }) === null);
check('2e a non-admin address is refused however verified',
  identity.adminRefusal({ auth: { token: { email: 'student@example.com', email_verified: true } } })
    === 'not-an-admin-address');
check('2f no auth at all is refused', identity.adminRefusal({}) === 'unauthenticated');
check('2g the rules require email_verified too',
  /email_verified', false\) == true/.test(rulesAdmin), rulesAdmin.slice(0, 160));
check('2h every admin-gated callable goes through the one gate',
  (idx.match(/requireAdmin\(context\)/g) || []).length >= 4,
  (idx.match(/requireAdmin\(context\)/g) || []).length);

// ---------------------------------------------------------------------------
// 3. The contact-form bypass.
//    `allow create: if true` let anyone holding the public Firebase config
//    write unlimited documents into the admin inbox, each firing a
//    notification email. Both halves must stay closed together.
// ---------------------------------------------------------------------------
check('3a the direct create path is closed in the rules',
  /match \/messages\/\{id\}[\s\S]{0,1200}allow create: if false;/.test(rules));
check('3b the client no longer writes to messages',
  !/collection\('messages'\)\.add/.test(contactjs));
check('3c the client calls the function instead',
  /submitContactMessage/.test(contactjs) && /cloudfunctions\.net/.test(contactjs));
check('3d the function validates name, address and body',
  /Please tell us your name/.test(idx)
  && /Please enter a valid email address/.test(idx)
  && /Please write your message/.test(idx));
check('3e it rate limits on more than one key, because a source address can '
  + 'be absent or shared',
  /const limitKeys = \[\]/.test(idx) && /'addr_' \+ emailKey/.test(idx) && /'ip_' \+ ipKey/.test(idx));
check('3f the counters are server-owned',
  /match \/contactRateLimit\/\{key\}[\s\S]{0,200}allow read, write: if false;/.test(rules));
check('3g the honeypot answers success so a bot learns nothing',
  /if \(d\.website\) return \{ ok: true, id: null \};/.test(idx));

// ---------------------------------------------------------------------------
// 4. Checkout must not trust a token snapshot.
//    An ID token is valid for up to an hour, so a tab opened before an
//    address was corrected still presents the old address and the old
//    email_verified claim.
// ---------------------------------------------------------------------------
check('4a checkout reads the account live',
  /account = await identity\.liveAccount\(context\.auth\.uid\)/.test(idx));
check('4b and refuses on the live answer',
  /!account\.email \|\| !account\.emailVerified/.test(idx));
check('4c the token claim is no longer the gate',
  !/context\.auth\.token\.email_verified !== true/.test(idx));
check('4d the receipt goes to the address just read',
  /customer_email: account\.email/.test(idx)
  && !/customer_email: context\.auth\.token\.email/.test(idx));

// ---------------------------------------------------------------------------
// 5. Delivery history and address suppression are different facts.
//    They shared one time-ordered field, so a later delivery silently
//    cleared a spam complaint, and the send-time check only ever looked for a
//    hard bounce, so a complaint suppressed nothing.
// ---------------------------------------------------------------------------
const integrity = require(path.join(ROOT, 'functions', 'email-integrity.js'));
check('5a the merge helper exists', typeof integrity.mergeDeliveryRecord === 'function');
check('5b a complaint sets suppression', (function () {
  const p = integrity.mergeDeliveryRecord(null,
    { status: 'suppressed', permanent: false, atMs: 1000, type: 'email.complained' });
  return !!p && p.suppressed === true && p.suppressedReason === 'complaint';
})());
check('5c a complaint does NOT overwrite the delivery status', (function () {
  const p = integrity.mergeDeliveryRecord({ status: 'delivered', atMs: 500 },
    { status: 'suppressed', permanent: false, atMs: 1000, type: 'email.complained' });
  return !!p && p.status === undefined;
})());
check('5d a later delivery does NOT clear a suppression', (function () {
  const p = integrity.mergeDeliveryRecord(
    { status: 'delivered', atMs: 500, suppressed: true, suppressedReason: 'complaint' },
    { status: 'delivered', permanent: false, atMs: 9000, type: 'email.delivered' });
  return !!p && p.suppressed === undefined && p.status === 'delivered';
})());
check('5e a hard bounce suppresses', (function () {
  const p = integrity.mergeDeliveryRecord(null,
    { status: 'bounced', permanent: true, atMs: 1000, type: 'email.bounced' });
  return !!p && p.suppressed === true && p.suppressedReason === 'hard-bounce';
})());
check('5f a transient bounce does not', (function () {
  const p = integrity.mergeDeliveryRecord(null,
    { status: 'delayed', permanent: false, atMs: 1000, type: 'email.bounced' });
  return !!p && p.suppressed === undefined;
})());
check('5g a provider-side failure never blames the recipient', (function () {
  const p = integrity.mergeDeliveryRecord(null,
    { status: 'failed', permanent: false, atMs: 1000, type: 'email.failed' });
  return !!p && p.suppressed === undefined;
})());
// Three different events arrive as a suppression and they mean different
// things to whoever reads the admin panel. Collapsing them would turn "the
// provider already had this address on its list" into "they reported us".
function reasonFor(type, extra) {
  const ev = Object.assign({
    type: type, created_at: new Date().toISOString(),
    data: Object.assign({ to: ['x@example.com'], email_id: 'm' }, extra || {}),
  });
  const s = integrity.suppressionFromEvent(integrity.classifyResendEvent(ev));
  return s && s.reason;
}
check('5h1 a complaint reads as a complaint', reasonFor('email.complained') === 'complaint');
check('5h2 a provider suppression is labelled as its own thing',
  reasonFor('email.suppressed') === 'provider-suppression', reasonFor('email.suppressed'));
check('5h3 a permanent bounce reads as a hard bounce',
  reasonFor('email.bounced', { bounce: { type: 'Permanent' } }) === 'hard-bounce');
check('5h4 a transient bounce suppresses nothing',
  reasonFor('email.bounced', { bounce: { type: 'Transient' } }) === null);
check('5h5 an event we do not model is ignored rather than guessed at',
  integrity.classifyResendEvent({ type: 'email.opened', data: { to: ['x@example.com'] } }) === null);

check('5h the send-time check reads the sticky flag',
  /integrity\.isSuppressed\(rec\)/.test(idx));
check('5h6 the account mirror only moves the status when the merge moved it',
  /if \(patch && patch\.status\) \{/.test(idx)
  && !/emailDeliveryStatus: parsed\.status/.test(idx));
check('5h7 the account mirror carries the sticky suppression',
  /stamp\.emailSuppressed = true/.test(idx)
  && /stamp\.emailSuppressedReason = suppression\.reason/.test(idx));
check('5h8 and never writes it back to false',
  !/emailSuppressed = false/.test(idx) && !/emailSuppressed: false/.test(idx));
check('5h9 the new mirror fields are server-owned in the rules',
  /!\('emailSuppressed' in d\)/.test(rules)
  && /!\('emailSuppressedReason' in d\)/.test(rules));
check('5h10 the admin panel carries the flag through',
  /suppressed: u\.emailSuppressed === true/.test(read('admin-audience.js'))
  && /suppressedReason: u\.emailSuppressedReason/.test(read('admin-audience.js')));
check('5i a complaint is enough to stop sending',
  integrity.isSuppressed({ suppressed: true, suppressedReason: 'complaint' }) === true);
check('5j records written before the split still suppress',
  integrity.isSuppressed({ permanent: true, status: 'bounced' }) === true);
check('5k an ordinary delivery does not suppress',
  integrity.isSuppressed({ status: 'delivered' }) === false);

// ---------------------------------------------------------------------------
// 6. Account enumeration on the public forms.
//    "No account found with this email" answered, for any address somebody
//    cared to type, whether that person has an account here. The matching
//    "incorrect password" confirmed it from the other side.
// ---------------------------------------------------------------------------
check('6a a missing account and a wrong password say the same thing',
  /'auth\/user-not-found': 'Incorrect email or password\. Please try again\.'/.test(authjs)
  && /'auth\/wrong-password': 'Incorrect email or password\. Please try again\.'/.test(authjs));
check('6b the old disclosure is gone',
  !/No account found with this email/.test(authjs));

// ---------------------------------------------------------------------------
// 7. Logging.
//    Recipient addresses were written to Cloud Logging on every send, and the
//    Stripe key prefix announced test-vs-live mode on every checkout.
// ---------------------------------------------------------------------------
check('7a no recipient address in the send log',
  !/console\.log\('\[email\] sent to', to/.test(idx));
check('7b the send log says accepted, not delivered',
  /accepted for sending/.test(idx) && !/\[email\] sent to/.test(idx));
check('7c no key prefix or length in the checkout log',
  !/keyPrefix=\$\{keyPrefix\}/.test(idx) && !/const keyPrefix = secret\.slice/.test(idx));
check('7d no sender address in the message-created log',
  !/'\[onMessageCreated\]', snap\.id, 'from', m\.email/.test(idx));
check('7e no recipient address in the expiry-reminder log',
  !/notice -> \$\{email\}/.test(idx));
check('7f no admin address in the reconcile log',
  !/console\.log\('\[reconcile\]', context\.auth\.token\.email/.test(idx));
check('7g verification links are still never logged',
  !/console\.(log|warn|error)\([^)]*verifyLink/.test(idx));

// ---------------------------------------------------------------------------
// 8. Password strength at signup.
//    Firebase's default is six characters and nothing else. This is user
//    experience rather than a control, and the comment in the page says so,
//    because the REST endpoint will still accept six characters until the
//    project-level policy is switched on.
// ---------------------------------------------------------------------------
check('8a the field asks for at least 10', /minlength="10"/.test(signup));
check('8b the placeholder matches the rule', /At least 10 characters/.test(signup));
check('8c the submit path enforces it', /password\.length < 10/.test(signup));
check('8d it rejects a password containing the email local part',
  /password\.toLowerCase\(\)\.indexOf\(local\)/.test(signup));
check('8e it rejects obvious weak words', /'letmein'/.test(signup));
check('8f the page is honest that this is not the control',
  /not a control/.test(signup) && /password policy/.test(signup));
check('8g existing accounts are untouched (signup only)',
  !/signInWithEmailAndPassword[\s\S]{0,400}password\.length < 10/.test(signup));

// ---------------------------------------------------------------------------
// 9. Test isolation exists and is load-bearing.
// ---------------------------------------------------------------------------
const isolation = require(path.join(ROOT, 'functions', 'test-isolation.js'));
check('9a a non-demo project is refused', (function () {
  const saved = process.env.GCLOUD_PROJECT;
  process.env.GCLOUD_PROJECT = 'shos-med-global-6eb19';
  let threw = false;
  try { isolation.assertIsolated(); } catch (e) { threw = e.code === 'not-isolated'; }
  if (saved === undefined) delete process.env.GCLOUD_PROJECT;
  else process.env.GCLOUD_PROJECT = saved;
  return threw;
})());
check('9b a live Resend key is refused', (function () {
  const savedP = process.env.GCLOUD_PROJECT;
  const savedK = process.env.RESEND_API_KEY;
  process.env.GCLOUD_PROJECT = 'demo-shos';
  process.env.RESEND_API_KEY = 're_looks_live';
  let threw = false;
  try { isolation.assertIsolated(); } catch (e) { threw = /RESEND_API_KEY/.test(e.message); }
  if (savedP === undefined) delete process.env.GCLOUD_PROJECT; else process.env.GCLOUD_PROJECT = savedP;
  if (savedK === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = savedK;
  return threw;
})());
check('9c the live code path is unaffected when not emulated', (function () {
  const saved = { f: process.env.FUNCTIONS_EMULATOR, a: process.env.FIREBASE_AUTH_EMULATOR_HOST,
                  s: process.env.FIRESTORE_EMULATOR_HOST };
  delete process.env.FUNCTIONS_EMULATOR;
  delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
  delete process.env.FIRESTORE_EMULATOR_HOST;
  const stubbed = isolation.stubEmail();
  if (saved.f !== undefined) process.env.FUNCTIONS_EMULATOR = saved.f;
  if (saved.a !== undefined) process.env.FIREBASE_AUTH_EMULATOR_HOST = saved.a;
  if (saved.s !== undefined) process.env.FIRESTORE_EMULATOR_HOST = saved.s;
  return stubbed === false;
})());
check('9d the Firestore statics come from the modular entry point, which the '
  + 'emulator does not proxy and v13 does not remove',
  /require\('firebase-admin\/firestore'\)/.test(idx)
  && !/admin\.firestore\.FieldValue/.test(idx)
  && !/admin\.firestore\.FieldPath/.test(idx));


// ---------------------------------------------------------------------------
// 10. The admin booking card interpolates nothing attacker-controlled raw.
//     Bookings are created by anonymous visitors under a rule that validates
//     no fields, so every value on the document is a string an outsider
//     chose. The status badge used to interpolate `bk.status` unescaped into
//     BOTH a class attribute and element text, and the price string was
//     built by concatenation and dropped in raw. Verified in isolation: the
//     shipped template executed three separate payloads, the fixed one
//     executed none.
// ---------------------------------------------------------------------------
const dash = read('dashboard.html');
// There are three `card.innerHTML = ` templates in this file. Pick the
// booking one by looking for its own header class, not by taking the first
// match, which is the inbox card and would make every check below pass
// against the wrong template.
const bookingCard = (function () {
  let i = -1;
  while ((i = dash.indexOf('card.innerHTML = `', i + 1)) !== -1) {
    const window_ = dash.slice(i, i + 200);
    if (window_.includes('booking-card-header')) {
      const end = dash.indexOf('card.addEventListener', i);
      return dash.slice(i, end === -1 ? i + 3000 : end);
    }
  }
  return '';
})();
check('10a the status badge escapes its attribute',
  /status-\$\{escapeAttr\(bk\.status \|\| 'unknown'\)\}/.test(bookingCard));
check('10b the status badge escapes its text',
  /\$\{escapeHtml\(String\(bk\.status \|\| 'unknown'\)\.replace/.test(bookingCard));
check('10c a booking with no status no longer throws on render',
  !/\$\{bk\.status\.replace/.test(bookingCard) && /bk\.status \|\| 'unknown'/.test(bookingCard));
check('10d the price is escaped at the point of use',
  /\$\{escapeHtml\(priceStr\)\}/.test(bookingCard) && !/<span class="booking-price">\$\{priceStr\}/.test(bookingCard));
check('10e a missing price reads as text, not "$undefined"',
  /bk\.price == null \|\| bk\.price === ''/.test(dash));
const rawInterp = (bookingCard.match(/\$\{bk\.[A-Za-z.]+\}/g) || []);
check('10f no bk.* value is interpolated without an escaper',
  rawInterp.length === 0, JSON.stringify(rawInterp));
check('10g the intake answers were already escaped',
  /intakeHtml \+= [^\n]*escapeHtml\(label\)[^\n]*escapeHtml\(val\)/.test(dash));

// ---------------------------------------------------------------------------
// 11. Verification comes before the free questions, not just before a
//     purchase. Everything a new account can do now sits behind a confirmed
//     address, because progress, receipts and password resets all travel by
//     email and an unconfirmed address is a string somebody typed.
// ---------------------------------------------------------------------------
const qbank = read('qbank.html');
const exam = read('practice-exam.html');
const verify = read('verify-email.html');
const emailsSrc = read('functions/emails.js');

check('11a the question bank requires a confirmed address',
  /authUser\.emailVerified !== true/.test(qbank)
  && /verify-email\.html\?next=qbank/.test(qbank));
check('11b it re-reads the account first, so a confirmation done on a phone counts',
  /await authUser\.reload\(\)/.test(qbank) && /auth\.currentUser/.test(qbank));
check('11c the mock exam requires it too',
  /user\.emailVerified !== true/.test(exam)
  && /verify-email\.html\?next=mock/.test(exam));
check('11d and re-reads before bouncing anybody',
  /await user\.reload\(\)/.test(exam));

// The server half. The QBank gate is a product gate and not a secret, since
// questions.json is a static file; the mock exams are only ever handed out by
// these callables, so the check there is a real control.
check('11e the mock exam callables check the account, not the token',
  /async function requireVerifiedEmail\(context\)/.test(idx)
  && /identity\.liveAccount\(context\.auth\.uid\)/.test(idx));
check('11f submitMockExam calls it',
  /submitMockExam[\s\S]{0,400}await requireVerifiedEmail\(context\)/.test(idx));
check('11g getMockExamReview calls it',
  /getMockExamReview[\s\S]{0,600}await requireVerifiedEmail\(context\)/.test(idx));
check('11h it refuses with the code the pages route on',
  /requireVerifiedEmail[\s\S]{0,700}'verify-email-required'/.test(idx));

// The page must not offer a way around itself while unverified.
check('11i the continue button starts hidden',
  /id="veContinue"[^>]*hidden>/.test(verify));
check('11j and is revealed only when verification succeeds',
  /\$\('veContinue'\)\.hidden = false;/.test(verify));
check('11k the copy no longer promises the questions straight away',
  !/free 40 practice questions straight away/.test(verify)
  && /unlocks the free 40 practice questions/.test(verify));
check('11l the outline button is legible on this white card',
  /\.auth-card \.btn-outline \{[\s\S]{0,160}color:#0F172A;/.test(verify));

// ---------------------------------------------------------------------------
// 12. The email itself.
// ---------------------------------------------------------------------------
check('12a the personal sign-off is gone',
  !/goes straight to me/.test(emailsSrc) && !/Cheers,<br>Eli/.test(emailsSrc));
check('12b replying is still invited', /Questions\? Just reply to this email\./.test(emailsSrc));
check('12c the header carries the logo',
  /<img src="https:\/\/shosmed\.com\/assets\/shos-logo-full-white\.png"/.test(emailsSrc));
check('12d it is an absolute URL, because an email has no page to be relative to',
  !/<img src="assets\//.test(emailsSrc));
check('12e it has alt text, since most inboxes block images by default',
  /alt="SHOS Med"/.test(emailsSrc));
check('12f it has explicit width and height, which several clients require',
  /width="180" height="69"/.test(emailsSrc));
// Most inboxes block remote images, so the blocked state is the common one.
// Styling the img itself is what makes clients render the alt text as a white
// wordmark instead of unstyled dark text on a navy bar, which is invisible.
check('12g the blocked-image fallback is styled to stay legible',
  /alt="SHOS Med"[\s\S]{0,400}color:#FFFFFF;[\s\S]{0,120}font-weight:700;/.test(emailsSrc));
check('12h the fallback has a font stack of its own',
  /alt="SHOS Med"[\s\S]{0,500}font-family:/.test(emailsSrc));

// ---------------------------------------------------------------------------
console.log('account-hardening: ' + passed + ' passed, ' + failures.length + ' failed');
for (const f of failures) console.log('\n  FAIL ' + f);
process.exit(failures.length ? 1 : 0);
