'use strict';
/* rules.test.js — the Firestore rules, enforced, not read.
 * ---------------------------------------------------------------------------
 * Every check here is a real Firestore request carrying a real Auth-emulator
 * ID token, so the rules engine decides the outcome. A rule that merely looks
 * right in the file is not a control; a rule that returns 403 is.
 *
 * Three things are being proven:
 *
 *   1. The contact-message create path is actually closed. It used to be
 *      `allow create: if true`, which let anyone holding the public Firebase
 *      config write into the admin inbox. Moving validation into a Cloud
 *      Function would have achieved nothing if this stayed open.
 *
 *   2. An administrator address only counts once somebody has proved they
 *      hold the mailbox. An unverified token bearing an admin address must be
 *      refused.
 *
 *   3. Server-owned fields on a user document stay server-owned. The
 *      resend-verification limit is stored on the user's own document, so if
 *      the owner could write it the limit would be advisory.
 *
 * Run:
 *   firebase emulators:start --project demo-shos --only auth,firestore,functions
 *   node test/emulator/rules.test.js
 */

const isolation = require('../../functions/test-isolation');

const PROJECT = process.env.GCLOUD_PROJECT || 'demo-shos';
process.env.GCLOUD_PROJECT = PROJECT;
process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';

try { isolation.assertIsolated(); }
catch (err) { console.error('\n' + err.message + '\n'); process.exit(1); }

const admin = require('../../functions/node_modules/firebase-admin');
const fs = require('fs');
const path = require('path');

const AUTH = 'http://' + process.env.FIREBASE_AUTH_EMULATOR_HOST;
const IDT = AUTH + '/identitytoolkit.googleapis.com/v1';
const FS = 'http://' + process.env.FIRESTORE_EMULATOR_HOST
  + '/v1/projects/' + PROJECT + '/databases/(default)/documents';

admin.initializeApp({ projectId: PROJECT });
const db = admin.firestore();

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) passed++;
  else failures.push(name + (detail ? '  [' + detail + ']' : ''));
}

const PW = 'TestPassword!2026';

async function jpost(url, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body || {}) });
  return { status: r.status, json: await r.json().catch(function () { return null; }) };
}
async function signUp(email) {
  const r = await jpost(IDT + '/accounts:signUp?key=demo',
    { email, password: PW, returnSecureToken: true });
  return { idToken: r.json.idToken, uid: r.json.localId };
}
async function signIn(email) {
  const r = await jpost(IDT + '/accounts:signInWithPassword?key=demo',
    { email, password: PW, returnSecureToken: true });
  return r.json || {};
}

/* A Firestore REST call made AS A USER. The emulator evaluates rules for any
   request carrying a user ID token; a request with no credentials at all is
   treated as the owner and bypasses them, which is why every call below
   carries a token. */
async function asUser(token, method, pathname, body) {
  const r = await fetch(FS + pathname, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
  });
  return r.status;
}
const DENIED = function (s) { return s === 403; };
const OK = function (s) { return s >= 200 && s < 300; };

async function wipe() {
  await fetch(AUTH + '/emulator/v1/projects/' + PROJECT + '/accounts', { method: 'DELETE' });
  await fetch('http://' + process.env.FIRESTORE_EMULATOR_HOST
    + '/emulator/v1/projects/' + PROJECT + '/databases/(default)/documents', { method: 'DELETE' });
}

async function main() {
  await wipe();

  // -----------------------------------------------------------------------
  // 0. The rules engine is actually deciding. If a known-denied write came
  //    back OK, every check below would be meaningless.
  // -----------------------------------------------------------------------
  const stranger = await signUp('stranger@example.com');
  const otherUid = 'some-other-users-uid';
  const touchOther = await asUser(stranger.idToken, 'PATCH',
    '/users/' + otherUid + '?updateMask.fieldPaths=visitCount',
    { fields: { visitCount: { integerValue: '1' } } });
  check('0a rules are being enforced (a stranger cannot write another user doc)',
    DENIED(touchOther), 'status ' + touchOther);

  // -----------------------------------------------------------------------
  // 1. The contact-message create path is closed.
  // -----------------------------------------------------------------------
  const msgBody = {
    fields: {
      name: { stringValue: 'Direct Writer' },
      email: { stringValue: 'direct@example.com' },
      body: { stringValue: 'written straight into Firestore' },
      status: { stringValue: 'new' },
    },
  };
  const signedInCreate = await asUser(stranger.idToken, 'POST',
    '/messages?documentId=rules_probe_1', msgBody);
  check('1a a signed-in client cannot create a message directly',
    DENIED(signedInCreate), 'status ' + signedInCreate);

  const stored = await db.collection('messages').get();
  check('1b nothing was written', stored.size === 0, 'size=' + stored.size);

  // The function is the way in, and it still works for an anonymous visitor
  // (proved in account-flows.test.js). Here we only prove the door is shut.
  const rulesText = fs.readFileSync(path.join(__dirname, '..', '..', 'firestore.rules'), 'utf8');
  check('1c the rule says so in the file too',
    /match \/messages\/\{id\}[\s\S]{0,900}allow create: if false;/.test(rulesText));

  // -----------------------------------------------------------------------
  // 2. An admin address must be verified to count.
  // -----------------------------------------------------------------------
  const adminAcct = await signUp('eli@shosmed.com');
  const unverifiedAdmin = await signIn('eli@shosmed.com');
  await db.collection('messages').doc('seed_1').set({ name: 'seed', status: 'new' });

  const readUnverified = await asUser(unverifiedAdmin.idToken, 'GET', '/messages/seed_1');
  check('2a an unverified admin address cannot read the inbox',
    DENIED(readUnverified), 'status ' + readUnverified);

  await admin.auth().updateUser(adminAcct.uid, { emailVerified: true });
  const verifiedAdmin = await signIn('eli@shosmed.com');
  const readVerified = await asUser(verifiedAdmin.idToken, 'GET', '/messages/seed_1');
  check('2b a verified admin address can read the inbox',
    OK(readVerified), 'status ' + readVerified);

  const readByStranger = await asUser(stranger.idToken, 'GET', '/messages/seed_1');
  check('2c an ordinary user cannot read the inbox',
    DENIED(readByStranger), 'status ' + readByStranger);

  // -----------------------------------------------------------------------
  // 3. Server-owned fields on the user's OWN document.
  // -----------------------------------------------------------------------
  const me = await signUp('owner@example.com');
  await db.collection('users').doc(me.uid).set({ email: 'owner@example.com', visitCount: 1 });

  const ownVisit = await asUser(me.idToken, 'PATCH',
    '/users/' + me.uid + '?updateMask.fieldPaths=visitCount',
    { fields: { visitCount: { integerValue: '7' } } });
  check('3a normal self-tracking writes still work', OK(ownVisit), 'status ' + ownVisit);

  const SERVER_OWNED = [
    ['verifySendWindow', { mapValue: { fields: { count: { integerValue: '0' } } } },
      'the resend limit would be advisory if the owner could reset it'],
    ['emailDeliveryStatus', { stringValue: 'delivered' }, 'delivery evidence is the provider’s to state'],
    ['emailDeliveryPermanent', { booleanValue: false }, 'same'],
    ['emailCorrectedByAdmin', { booleanValue: true }, 'an audit fact, not a user field'],
    ['emailSuppressed', { booleanValue: false }, 'clearing your own suppression is the point of it'],
    ['emailSuppressedReason', { stringValue: 'complaint' }, 'the provider states this, not the user'],
    // `payments` is the field that actually decides entitlement. Every
    // reader of paid access computes it from this array through
    // SHOSAccess.qbankActive / payments.qbankAccessActive, client and server
    // alike, so this is the write that would matter. An earlier draft of this
    // test probed a `qbankAccess` field instead and reported a hole: nothing
    // reads that name, so writing it grants nothing.
    ['payments', { mapValue: { fields: { 'exam-bank': { stringValue: 'paid' } } } },
      'paid access must come from Stripe, never from the buyer'],
    ['role', { stringValue: 'admin' }, 'self-promotion'],
  ];
  for (const [field, value, why] of SERVER_OWNED) {
    const s = await asUser(me.idToken, 'PATCH',
      '/users/' + me.uid + '?updateMask.fieldPaths=' + field,
      { fields: { [field]: value } });
    check('3b the owner cannot write ' + field + ' (' + why + ')', DENIED(s), 'status ' + s);
  }

  // -----------------------------------------------------------------------
  // 4. The address-keyed collections are not a lookup service.
  // -----------------------------------------------------------------------
  await db.collection('emailDelivery').doc('someone@example.com')
    .set({ address: 'someone@example.com', status: 'bounced', permanent: true });
  await db.collection('contactRateLimit').doc('ip_1_2_3_4').set({ count: 3, startedAt: Date.now() });
  await db.collection('adminAuditLog').doc('op_1').set({ uid: 'x' });

  const readDelivery = await asUser(me.idToken, 'GET', '/emailDelivery/someone@example.com');
  check('4a a user cannot read delivery records (they are keyed BY address, '
    + 'so reading them would answer "does this person get mail from you")',
    DENIED(readDelivery), 'status ' + readDelivery);

  const readLimit = await asUser(me.idToken, 'GET', '/contactRateLimit/ip_1_2_3_4');
  check('4b a user cannot read rate-limit counters', DENIED(readLimit), 'status ' + readLimit);

  const writeLimit = await asUser(me.idToken, 'PATCH',
    '/contactRateLimit/ip_1_2_3_4?updateMask.fieldPaths=count',
    { fields: { count: { integerValue: '0' } } });
  check('4c a user cannot reset their own rate-limit counter',
    DENIED(writeLimit), 'status ' + writeLimit);

  const readAudit = await asUser(me.idToken, 'GET', '/adminAuditLog/op_1');
  check('4d a user cannot read the audit log', DENIED(readAudit), 'status ' + readAudit);

  const adminReadAudit = await asUser(verifiedAdmin.idToken, 'GET', '/adminAuditLog/op_1');
  check('4e a verified admin can read the audit log', OK(adminReadAudit), 'status ' + adminReadAudit);

  const adminWriteAudit = await asUser(verifiedAdmin.idToken, 'PATCH',
    '/adminAuditLog/op_1?updateMask.fieldPaths=uid',
    { fields: { uid: { stringValue: 'tampered' } } });
  check('4f not even an admin can rewrite the audit log from a client',
    DENIED(adminWriteAudit), 'status ' + adminWriteAudit);

  // -----------------------------------------------------------------------
  // 5. The admin list in the rules file matches the one in code.
  //    Rules cannot import JavaScript, so this duplication cannot be removed
  //    and has to be held in place by a test instead.
  // -----------------------------------------------------------------------
  const identity = require('../../functions/identity');
  const inRules = (rulesText.match(/function isAdmin\(\)[\s\S]*?\n    \}/) || [''])[0];
  const addrs = (inRules.match(/'[^']+@[^']+'/g) || []).map(function (s) {
    return s.replace(/'/g, '').toLowerCase();
  }).sort();
  const inCode = identity.ADMIN_EMAILS.map(function (s) { return s.toLowerCase(); }).sort();
  check('5a the rules admin list matches functions/identity.js',
    JSON.stringify(addrs) === JSON.stringify(inCode),
    'rules=' + addrs.join(',') + ' code=' + inCode.join(','));
  check('5b the rules require a verified address',
    /email_verified'?,? ?(false|true)?\)? == true|email_verified == true/.test(inRules)
    || /get\('email_verified', false\) == true/.test(inRules), inRules.slice(0, 120));

  console.log('\n' + '='.repeat(60));
  console.log('rules: ' + passed + ' passed, ' + failures.length + ' failed');
  for (const f of failures) console.log('\n  FAIL ' + f);
  console.log('='.repeat(60));
  process.exit(failures.length ? 1 : 0);
}

main().catch(function (err) {
  console.error('\nHARNESS ERROR:', (err && err.stack) || err);
  process.exit(2);
});
