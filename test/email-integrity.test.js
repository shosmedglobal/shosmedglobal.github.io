'use strict';
/* The server-side email logic, exercised without a server.
 *
 * Signature checking and bounce classification are the two places where
 * being wrong is expensive and a live test is impossible: you cannot ask a
 * real mailbox to hard-bounce on demand, and you must not find out in
 * production that an unsigned POST is accepted. Both are pure functions in
 * functions/email-integrity.js precisely so they can be run here.
 *
 * The scenario this file cares about most is number 11 on the brief: a late
 * bounce for an address someone has since corrected away from must not be
 * read as a problem with the new address.
 */

const path = require('path');
const crypto = require('crypto');
const I = require(path.join(__dirname, '..', 'functions', 'email-integrity.js'));

let passed = 0;
const failures = [];
function check(name, cond) {
  if (cond) passed++;
  else failures.push(name);
}

// ---------------------------------------------------------------------------
// 1. Webhook signatures. An endpoint that writes delivery verdicts must not
//    believe anybody who can find its URL.
// ---------------------------------------------------------------------------
const SECRET_RAW = crypto.randomBytes(24).toString('base64');
const SECRET = 'whsec_' + SECRET_RAW;
const NOW = 1764200000000;                       // fixed clock for the tests

function sign(id, tsSeconds, body, secret) {
  const key = Buffer.from(String(secret || SECRET).replace(/^whsec_/, ''), 'base64');
  return 'v1,' + crypto.createHmac('sha256', key)
    .update(id + '.' + tsSeconds + '.' + body, 'utf8').digest('base64');
}

const BODY = JSON.stringify({ type: 'email.delivered', data: { to: ['a@example.com'] } });
const TS = Math.floor(NOW / 1000);
const GOOD = { secret: SECRET, id: 'msg_1', timestamp: String(TS), body: BODY, nowMs: NOW };

check('1a a correctly signed request is accepted',
  I.verifySvixSignature(Object.assign({}, GOOD, { signatureHeader: sign('msg_1', TS, BODY) })).ok === true);

check('1b a tampered body is rejected',
  I.verifySvixSignature(Object.assign({}, GOOD, {
    body: BODY.replace('delivered', 'bounced'),
    signatureHeader: sign('msg_1', TS, BODY)
  })).ok === false);

check('1c a different event id is rejected',
  I.verifySvixSignature(Object.assign({}, GOOD, {
    id: 'msg_2', signatureHeader: sign('msg_1', TS, BODY)
  })).ok === false);

check('1d the wrong secret is rejected',
  I.verifySvixSignature(Object.assign({}, GOOD, {
    signatureHeader: sign('msg_1', TS, BODY, 'whsec_' + crypto.randomBytes(24).toString('base64'))
  })).ok === false);

check('1e an unsigned request is rejected',
  I.verifySvixSignature(Object.assign({}, GOOD, { signatureHeader: '' })).ok === false);

check('1f a captured old request is rejected (replay window)',
  I.verifySvixSignature(Object.assign({}, GOOD, {
    timestamp: String(TS - 3600),
    signatureHeader: sign('msg_1', TS - 3600, BODY)
  })).reason === 'stale-timestamp');

check('1g a future timestamp is rejected too',
  I.verifySvixSignature(Object.assign({}, GOOD, {
    timestamp: String(TS + 3600),
    signatureHeader: sign('msg_1', TS + 3600, BODY)
  })).ok === false);

check('1h several signatures (secret rotation) still verify',
  I.verifySvixSignature(Object.assign({}, GOOD, {
    signatureHeader: 'v1,AAAA ' + sign('msg_1', TS, BODY)
  })).ok === true);

check('1i no secret configured means no',
  I.verifySvixSignature(Object.assign({}, GOOD, { secret: '', signatureHeader: 'x' })).reason === 'no-secret');

check('1j a raw Buffer body verifies the same as the string',
  I.verifySvixSignature(Object.assign({}, GOOD, {
    body: Buffer.from(BODY, 'utf8'),
    signatureHeader: sign('msg_1', TS, BODY)
  })).ok === true);

check('1k a signature of the wrong length does not throw',
  I.verifySvixSignature(Object.assign({}, GOOD, { signatureHeader: 'v1,short' })).ok === false);

// ---------------------------------------------------------------------------
// 2. Classification. The permanent/transient split decides whether we ever
//    tell someone their address is wrong, so a full mailbox must not be
//    confused with a non-existent one.
// ---------------------------------------------------------------------------
function ev(type, extra) {
  return Object.assign({
    type: type,
    created_at: '2026-11-27T10:00:00.000Z',
    data: { to: ['Person@Example.COM'], email_id: 'em_1' }
  }, extra || {});
}

check('2a sent is sent, not delivered', I.classifyResendEvent(ev('email.sent')).status === 'sent');
check('2b delivered is delivered', I.classifyResendEvent(ev('email.delivered')).status === 'delivered');
check('2c a delay is a delay', I.classifyResendEvent(ev('email.delivery_delayed')).status === 'delayed');

const hard = I.classifyResendEvent({
  type: 'email.bounced', created_at: '2026-11-27T10:00:00.000Z',
  data: { to: ['a@b.com'], email_id: 'em_2', bounce: { type: 'Permanent', subType: 'General' } }
});
check('2d a permanent bounce is permanent', hard.status === 'bounced' && hard.permanent === true);

const soft = I.classifyResendEvent({
  type: 'email.bounced', created_at: '2026-11-27T10:00:00.000Z',
  data: { to: ['a@b.com'], email_id: 'em_3', bounce: { type: 'Transient', subType: 'MailboxFull' } }
});
check('2e a full mailbox is a delay, not a wrong address',
  soft.status === 'delayed' && soft.permanent === false);

const bare = I.classifyResendEvent({
  type: 'email.bounced', created_at: '2026-11-27T10:00:00.000Z',
  data: { to: ['a@b.com'], email_id: 'em_4' }
});
check('2f a bounce with no detail is treated as permanent',
  bare.status === 'bounced' && bare.permanent === true);

const failed = I.classifyResendEvent(ev('email.failed'));
check('2g our own send failure never blames the recipient',
  failed.status === 'failed' && failed.permanent === false);

const spam = I.classifyResendEvent(ev('email.complained'));
check('2h a spam complaint suppresses without calling the address wrong',
  spam.status === 'suppressed' && spam.permanent === false);

check('2i the recipient is lower-cased for keying',
  I.classifyResendEvent(ev('email.delivered')).recipient === 'person@example.com');
check('2j an unmodelled event is ignored rather than guessed at',
  I.classifyResendEvent({ type: 'email.opened', data: {} }) === null);
check('2k junk in, null out', I.classifyResendEvent(null) === null);

// ---------------------------------------------------------------------------
// 3. Ordering. Webhooks retry and overtake each other, so provider time
//    decides, not arrival order.
// ---------------------------------------------------------------------------
check('3a the first event always lands', I.shouldReplaceStatus(null, { status: 'sent', atMs: 10 }));
check('3b a newer event replaces an older one',
  I.shouldReplaceStatus({ status: 'sent', atMs: 10 }, { status: 'delivered', atMs: 20 }));
check('3c an older event arriving late does NOT overwrite a newer one',
  !I.shouldReplaceStatus({ status: 'delivered', atMs: 20 }, { status: 'bounced', atMs: 10 }));
check('3d a timestamp-less event is only taken when we hold nothing',
  I.shouldReplaceStatus(null, { status: 'sent', atMs: null }) &&
  !I.shouldReplaceStatus({ status: 'sent', atMs: 5 }, { status: 'bounced', atMs: null }));
check('3e an empty incoming changes nothing', !I.shouldReplaceStatus({ status: 'sent' }, null));

// ---------------------------------------------------------------------------
// 4. THE one that matters. A hard bounce belongs to an ADDRESS, never to an
//    account, so correcting the address must clear the accusation.
// ---------------------------------------------------------------------------
const BOUNCED_OLD = { address: 'applicant1234@gmail.ocm', status: 'bounced', permanent: true, atMs: 1 };

check('4a the bounce applies while that address is still the one on file',
  I.addressLooksUndeliverable(BOUNCED_OLD, 'applicant1234@gmail.ocm') === true);
check('4b after the correction it says nothing about the new address',
  I.addressLooksUndeliverable(BOUNCED_OLD, 'applicant1234@gmail.com') === false);
check('4c case and padding do not defeat the comparison',
  I.addressLooksUndeliverable(BOUNCED_OLD, '  APPLICANT1234@GMAIL.OCM ') === true);
check('4d a delay never accuses the address',
  I.addressLooksUndeliverable({ address: 'a@b.com', status: 'delayed', permanent: false }, 'a@b.com') === false);
check('4e our own send failure never accuses the address',
  I.addressLooksUndeliverable({ address: 'a@b.com', status: 'failed', permanent: false }, 'a@b.com') === false);
check('4f a spam complaint is not an undeliverable address',
  I.addressLooksUndeliverable({ address: 'a@b.com', status: 'suppressed', permanent: false }, 'a@b.com') === false);
check('4g no evidence means no accusation',
  I.addressLooksUndeliverable(null, 'a@b.com') === false);
check('4h an unverified account is not a bounced one: nothing here reads verification',
  !/verified/i.test(require('fs').readFileSync(
    path.join(__dirname, '..', 'functions', 'email-integrity.js'), 'utf8')
    .split('function addressLooksUndeliverable')[1].split('\n}')[0]));

// ---------------------------------------------------------------------------
// 5. Rate limiting. The browser countdown is a courtesy; this is the control
//    that holds when the endpoint is called directly in a loop.
// ---------------------------------------------------------------------------
const WIN = { max: 5, windowMs: 3600000 };
let log = null;
let allowed = 0;
for (let i = 0; i < 8; i++) {
  const r = I.rateLimitWindow(log, NOW + i * 1000, WIN);
  if (r.allowed) { allowed++; log = r.next; }
}
check('5a exactly five get through in one window', allowed === 5);
check('5b the sixth is refused with a wait',
  I.rateLimitWindow(log, NOW + 9000, WIN).allowed === false &&
  I.rateLimitWindow(log, NOW + 9000, WIN).retryAfterMs > 0);
check('5c the window reopens afterwards',
  I.rateLimitWindow(log, NOW + 3600001, WIN).allowed === true);
check('5d a missing log is not an error', I.rateLimitWindow(undefined, NOW, WIN).allowed === true);
check('5e a forged future window does not grant extra sends',
  I.rateLimitWindow({ startedAt: NOW + 999999, count: 5 }, NOW, WIN).allowed === false);

// ---------------------------------------------------------------------------
// 6. Address keys, used as Firestore document ids.
// ---------------------------------------------------------------------------
check('6a normalised', I.addressKey('  A@B.COM ') === 'a@b.com');
check('6b a slash is refused rather than silently mangled', I.addressKey('a/b@c.com') === null);
check('6c empty is refused', I.addressKey('') === null && I.addressKey(null) === null);

// ---------------------------------------------------------------------------
// 7. The wiring in index.js that these helpers exist for.
// ---------------------------------------------------------------------------
const fs = require('fs');
const idx = fs.readFileSync(path.join(__dirname, '..', 'functions', 'index.js'), 'utf8');

// Deliberately NOT the token claim. A token is a snapshot good for an hour,
// so a tab opened before a correction still carries the old address and the
// old email_verified. Checkout reads the account live.
check('7a checkout reads verification from the account, not from the token',
  /identity\.liveAccount\(context\.auth\.uid\)/.test(idx) &&
  /!account\.email \|\| !account\.emailVerified/.test(idx) &&
  idx.indexOf('verify-email-required') > 0);
check('7a2 and it no longer trusts the token claim for that decision',
  !/context\.auth\.token\.email_verified !== true/.test(idx));
check('7a3 the receipt address is the one just read, not the token\u2019s',
  /customer_email: account\.email/.test(idx) &&
  !/customer_email: context\.auth\.token\.email/.test(idx));
check('7b the gate sits before any Stripe work',
  idx.indexOf('verify-email-required')
    < idx.indexOf('const stripe = stubStripe ? localStripeStub() : Stripe(secret)'));
check('7c resend is rate limited on the server',
  idx.includes('integrity.rateLimitWindow') && idx.includes('resource-exhausted'));
check('7d the admin correction exists and is admin-gated',
  idx.includes('exports.adminUpdateUserEmail') &&
  /adminUpdateUserEmail[\s\S]{0,1200}requireAdmin\(context\)/.test(idx));
check('7e it never asserts verification',
  /updateUser\(target\.uid, \{ email: newEmail, emailVerified: false \}\)/.test(idx));
check('7f it refuses to merge on a conflict',
  idx.includes('nothing was merged'));
check('7g it is idempotent by opId', idx.includes("db.collection('adminAuditLog').doc(opId)"));
check('7h it writes an audit record', /writeAudit\('applied'/.test(idx));
check('7i it does not touch Stripe', /action: 'none'/.test(idx) && !/stripe\.customers\.update/.test(idx));
check('7j the webhook verifies before it parses',
  idx.indexOf('verifySvixSignature') < idx.indexOf('JSON.parse(req.rawBody'));
check('7k the webhook is idempotent per event id',
  idx.includes("db.collection('emailEvents').doc(String(eventId))"));
check('7l suppressed addresses are kept out of later automated mail',
  /integrity\.isSuppressed\(rec\)/.test(idx));
check('7l2 the webhook keeps delivery history and suppression apart',
  /integrity\.mergeDeliveryRecord\(existing, parsed\)/.test(idx));
check('7m a corrected address can still be mailed (force)',
  /force: true/.test(idx));

const rules = fs.readFileSync(path.join(__dirname, '..', 'firestore.rules'), 'utf8');
check('7n the resend rate-limit window is not owner-writable',
  /!\('verifySendWindow' in d\)/.test(rules));
check('7o the delivery verdict is not owner-writable',
  /!\('emailDeliveryStatus' in d\)/.test(rules));
check('7p the audit log is not client-writable',
  /match \/adminAuditLog\/\{opId\} \{[\s\S]{0,120}allow write: if false;/.test(rules));
check('7q delivery records keyed by address are admin-read only',
  /match \/emailDelivery\/\{address\} \{[\s\S]{0,120}allow read:  if isAdmin\(\);/.test(rules));

// ---------------------------------------------------------------------------
console.log('email-integrity: ' + passed + ' passed, ' + failures.length + ' failed');
for (const f of failures) console.log('\n  FAIL ' + f);
process.exit(failures.length ? 1 : 0);
