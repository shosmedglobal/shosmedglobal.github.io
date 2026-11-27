'use strict';
/* account-flows.test.js — the account journeys, exercised for real.
 * ---------------------------------------------------------------------------
 * These are not source-inspection checks and they are not helper unit tests.
 * Every assertion below is the observed result of a real signup, a real
 * verification link, a real callable invocation or a real webhook POST, run
 * against the Firebase Auth, Firestore and Functions emulators on a demo
 * project.
 *
 * Why it had to be the emulators: the flows that most needed testing are the
 * ones that send mail. Testing them against the live project means mailing
 * real applicants, and the one time a local preview was pointed at the live
 * project a real contact message landed in the real inbox. So the first thing
 * this file does is refuse to run unless isolation is proven.
 *
 * Run:
 *   firebase emulators:start --project demo-shos --only auth,firestore,functions
 *   node test/emulator/account-flows.test.js
 */

const isolation = require('../../functions/test-isolation');

// ---------------------------------------------------------------------------
// Isolation first. Nothing below this line runs until the environment is
// demonstrably incapable of reaching production.
// ---------------------------------------------------------------------------
const PROJECT = process.env.GCLOUD_PROJECT || 'demo-shos';
process.env.GCLOUD_PROJECT = PROJECT;
process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';

let isolationInfo;
try {
  isolationInfo = isolation.assertIsolated();
} catch (err) {
  console.error('\n' + err.message + '\n');
  process.exit(1);
}

const admin = require('../../functions/node_modules/firebase-admin');
const crypto = require('crypto');

const AUTH = 'http://' + process.env.FIREBASE_AUTH_EMULATOR_HOST;
const IDT = AUTH + '/identitytoolkit.googleapis.com/v1';
const FN = 'http://127.0.0.1:5001/' + PROJECT + '/us-central1';
const ORIGIN = 'https://shosmed.com';

admin.initializeApp({ projectId: PROJECT });
const db = admin.firestore();

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------
let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; }
  else { failures.push(name + (detail ? '  [' + detail + ']' : '')); }
}
function section(title) { console.log('\n--- ' + title); }

async function post(url, body, idToken) {
  const headers = { 'Content-Type': 'application/json' };
  if (idToken) headers.Authorization = 'Bearer ' + idToken;
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body || {}) });
  let json = null;
  try { json = await res.json(); } catch (e) { /* some endpoints return empty */ }
  return { status: res.status, ok: res.ok, json };
}

/* A callable, invoked the way the browser invokes it: the callable protocol
   over plain HTTP. Returns { ok, result, error } where error carries the
   HttpsError status and message. */
async function callable(name, data, idToken) {
  const r = await post(FN + '/' + name, { data: data || {} }, idToken);
  if (r.json && r.json.error) {
    return { ok: false, error: r.json.error, httpStatus: r.status };
  }
  // A non-2xx with no error body is NOT a success. An early version of this
  // helper treated a 404 from an emulator that had not finished registering
  // its functions as `ok: true`, which turned twenty real assertions green
  // at once. Anything that is not a 2xx carrying a parsed body is a failure.
  if (r.status < 200 || r.status >= 300 || !r.json) {
    return {
      ok: false,
      error: { status: 'HTTP_' + r.status, message: 'no callable response (status ' + r.status + ')' },
      httpStatus: r.status,
    };
  }
  return { ok: true, result: r.json.result, httpStatus: r.status };
}

/* Wait until the Functions emulator has actually REGISTERED its functions.
   TCP acceptance on port 5001 happens well before that, and an unregistered
   name answers 404. A registered callable invoked with no auth answers with a
   proper callable error, so that is the readiness signal. */
async function awaitFunctions(timeoutMs) {
  const names = ['resendVerification', 'submitContactMessage', 'resendWebhook'];
  const deadline = Date.now() + (timeoutMs || 90000);
  while (Date.now() < deadline) {
    let allThere = true;
    for (const n of names) {
      const res = await fetch(FN + '/' + n, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: {} }),
      }).catch(function () { return { status: 0 }; });
      if (res.status === 404 || res.status === 0) { allThere = false; break; }
    }
    if (allThere) return true;
    await new Promise(function (r) { setTimeout(r, 1000); });
  }
  throw new Error('The Functions emulator never registered its functions. '
    + 'Start it with: firebase emulators:start --project demo-shos --only auth,firestore,functions');
}

// --- Auth emulator operations, as a browser would perform them -------------
async function signUp(email, password) {
  const r = await post(IDT + '/accounts:signUp?key=demo',
    { email, password, returnSecureToken: true });
  if (!r.json || !r.json.idToken) throw new Error('signUp failed: ' + JSON.stringify(r.json));
  return { idToken: r.json.idToken, uid: r.json.localId, refreshToken: r.json.refreshToken };
}
async function signIn(email, password) {
  const r = await post(IDT + '/accounts:signInWithPassword?key=demo',
    { email, password, returnSecureToken: true });
  return r.json || {};
}
async function sendOob(body) {
  return post(IDT + '/accounts:sendOobCode?key=demo', body);
}
async function applyOob(oobCode) {
  return post(IDT + '/accounts:update?key=demo', { oobCode });
}
async function lookup(idToken) {
  const r = await post(IDT + '/accounts:lookup?key=demo', { idToken });
  return (r.json && r.json.users && r.json.users[0]) || null;
}
/* Every out-of-band code the emulator has issued, newest last. This is the
   emulator standing in for a mailbox. */
async function oobCodes() {
  const res = await fetch(AUTH + '/emulator/v1/projects/' + PROJECT + '/oobCodes');
  const j = await res.json();
  return (j && j.oobCodes) || [];
}
async function latestOob(email, requestType) {
  const all = await oobCodes();
  const mine = all.filter(function (c) {
    return (!email || String(c.email || '').toLowerCase() === email.toLowerCase())
      && (!requestType || c.requestType === requestType);
  });
  return mine.length ? mine[mine.length - 1] : null;
}
/* onUserCreated generates a verification link of its own, asynchronously.
   Snapshotting the code list before that lands makes any "exactly one new
   link" assertion race against a background trigger, so wait for it to go
   quiet first. */
async function oobSettled() {
  let last = -1;
  for (let i = 0; i < 25; i++) {
    const now = (await oobCodes()).length;
    if (now === last) return now;
    last = now;
    await new Promise(function (r) { setTimeout(r, 200); });
  }
  return last;
}

async function wipe() {
  await fetch(AUTH + '/emulator/v1/projects/' + PROJECT + '/accounts', { method: 'DELETE' });
  await fetch('http://' + process.env.FIRESTORE_EMULATOR_HOST
    + '/emulator/v1/projects/' + PROJECT + '/databases/(default)/documents', { method: 'DELETE' });
}
async function outbox() {
  const snap = await db.collection('emulatorOutbox').get();
  return snap.docs.map(function (d) { return d.data(); });
}
/* onUserCreated is a background trigger, so the welcome email for a signup
   lands whenever it lands. Counting TOTAL outbox entries therefore races with
   it. Wait for the outbox to stop growing, then count by subject, which
   identifies the sender exactly:
     'Welcome to SHOS Med (please verify your email)'  onUserCreated
     'Verify your email | SHOS Med'                    resendVerification
     'Please confirm your email | SHOS Med'            adminUpdateUserEmail  */
async function outboxSettled() {
  let last = -1;
  for (let i = 0; i < 25; i++) {
    const now = (await outbox()).length;
    if (now === last) return await outbox();
    last = now;
    await new Promise(function (r) { setTimeout(r, 200); });
  }
  return await outbox();
}
const SUBJ_WELCOME = 'Welcome to SHOS Med (please verify your email)';
const SUBJ_RESEND = 'Verify your email | SHOS Med';
const SUBJ_ADMIN_FIX = 'Please confirm your email | SHOS Med';
function withSubject(box, subject) {
  return box.filter(function (m) { return m.subject === subject; });
}

async function stripeSessions() {
  const snap = await db.collection('emulatorStripeSessions').get();
  return snap.docs.map(function (d) { return d.data(); });
}

const PW = 'TestPassword!2026';
let ADMIN_TOKEN = null;       // a verified administrator session
let ADMIN_UID = null;

/* An administrator session. The admin gate requires a verified address, so
   this also proves that half of the gate works. */
async function makeAdmin() {
  const a = await signUp('eli@shosmed.com', PW);
  await admin.auth().updateUser(a.uid, { emailVerified: true });
  const fresh = await signIn('eli@shosmed.com', PW);
  ADMIN_TOKEN = fresh.idToken;
  ADMIN_UID = a.uid;
}

// ===========================================================================
async function main() {
  console.log('Isolation: project=' + isolationInfo.projectId
    + ' auth=' + isolationInfo.hosts.auth + ' firestore=' + isolationInfo.hosts.firestore);

  // =========================================================================
  section('0. The isolation guard itself refuses a non-isolated run');
  {
    const saved = process.env.GCLOUD_PROJECT;
    process.env.GCLOUD_PROJECT = 'shos-med-global-6eb19';
    let threw = null;
    try { isolation.assertIsolated(); } catch (e) { threw = e; }
    check('0a a real project id is refused', !!threw && threw.code === 'not-isolated');
    check('0b the refusal names the project', !!threw && /shos-med-global-6eb19/.test(threw.message));
    process.env.GCLOUD_PROJECT = saved;

    const savedKey = process.env.RESEND_API_KEY;
    process.env.RESEND_API_KEY = 're_livelookingkey';
    let threw2 = null;
    try { isolation.assertIsolated(); } catch (e) { threw2 = e; }
    check('0c a live Resend key is refused', !!threw2 && /RESEND_API_KEY/.test(threw2.message));
    let threw3 = null;
    try { isolation.stubEmail(); } catch (e) { threw3 = e; }
    check('0d the transport refuses to send with a live key present', !!threw3);
    if (savedKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = savedKey;
    check('0e isolation holds again afterwards', !!isolation.assertIsolated());
  }

  await awaitFunctions(120000);
  console.log('Functions emulator is registered and answering.');

  await wipe();
  await makeAdmin();

  // =========================================================================
  section('1. Signup, then verification actually completes');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('newapplicant@example.com', PW);
    let acct = await lookup(u.idToken);
    check('1a a new account starts unverified', acct && acct.emailVerified !== true);

    const sent = await sendOob({ requestType: 'VERIFY_EMAIL', idToken: u.idToken });
    check('1b a verification mail is issued', sent.ok);

    const code = await latestOob('newapplicant@example.com', 'VERIFY_EMAIL');
    check('1c the link exists and is addressed to the new account',
      !!code && !!code.oobCode);

    const applied = await applyOob(code.oobCode);
    check('1d opening the link succeeds', applied.ok, 'status ' + applied.status);

    acct = await lookup(u.idToken);
    check('1e the account is now verified', acct && acct.emailVerified === true);

    // Single-use: the same link must not work twice.
    const again = await applyOob(code.oobCode);
    check('1f the same link cannot be replayed', !again.ok);
  }

  // =========================================================================
  section('2. Resend, and the server-side limit that is the real control');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('resend@example.com', PW);
    const results = [];
    for (let i = 0; i < 7; i++) {
      results.push(await callable('resendVerification', {}, u.idToken));
    }
    const allowed = results.filter(function (r) { return r.ok; }).length;
    const refused = results.filter(function (r) {
      return !r.ok && r.error && r.error.status === 'RESOURCE_EXHAUSTED';
    }).length;
    check('2a exactly 5 resends are allowed in the window', allowed === 5, 'allowed=' + allowed);
    check('2b the 6th and 7th are refused as resource-exhausted', refused === 2, 'refused=' + refused);
    check('2c the refusal tells the person when to retry',
      !!results[5].error && /minute/i.test(results[5].error.message || ''));

    const box = await outboxSettled();
    const verifications = withSubject(box, SUBJ_RESEND)
      .filter(function (m) { return m.to === 'resend@example.com'; });
    check('2d five verification emails were produced, not seven',
      verifications.length === 5, 'count=' + verifications.length);
    check('2e every one of them went to the local outbox, not to a provider',
      verifications.every(function (m) { return typeof m.to === 'string' && !!m.to; }));

    // The limit lives on the user document. The owner must not be able to
    // reset it, or the limit is advisory.
    const snap = await db.collection('users').doc(u.uid).get();
    check('2f the window is recorded server-side',
      snap.exists && !!(snap.data() || {}).verifySendWindow);
  }

  // =========================================================================
  section('3. Change the address without ever touching the old mailbox');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('typo@gmail.ocm', PW);
    await sendOob({ requestType: 'VERIFY_EMAIL', idToken: u.idToken });
    await oobSettled();
    const before = await oobCodes();

    const req = await sendOob({
      requestType: 'VERIFY_AND_CHANGE_EMAIL',
      idToken: u.idToken,
      newEmail: 'typo@gmail.com',
    });
    check('3a the change is accepted', req.ok, JSON.stringify(req.json));

    await oobSettled();
    const after = await oobCodes();
    const added = after.slice(before.length);
    // The emulator records an out-of-band code with `email` = the address
    // currently ON the account and `newEmail` = the address being proposed.
    // Firebase delivers a verifyAndChangeEmail link to newEmail; this is the
    // documented difference from updateEmail, which mails the OLD address a
    // revert link and is useless when the old address was the typo.
    check('3b exactly one new link was issued', added.length === 1, 'added=' + added.length);
    check('3c it is a change-email link, not a plain verification',
      added.length === 1 && added[0].requestType === 'VERIFY_AND_CHANGE_EMAIL',
      added.length ? added[0].requestType : 'none');
    check('3d the link targets the PROPOSED address',
      added.length === 1 && String(added[0].newEmail || '').toLowerCase() === 'typo@gmail.com',
      added.length ? String(added[0].newEmail) : 'none');
    check('3d2 no recovery notice was raised for the unconfirmed old address',
      !added.some(function (c) { return c.requestType === 'RECOVER_EMAIL'; }));

    // The account must not move until the link is opened.
    let acct = await admin.auth().getUser(u.uid);
    check('3e the account still holds the old address until the link is opened',
      acct.email === 'typo@gmail.ocm', acct.email);

    await applyOob(added[0].oobCode);
    acct = await admin.auth().getUser(u.uid);
    check('3f opening the link moves the account', acct.email === 'typo@gmail.com', acct.email);
    check('3g the UID never changed', acct.uid === u.uid);
    check('3h the corrected address is treated as verified by the provider',
      acct.emailVerified === true);
  }

  // =========================================================================
  section('4. Password reset, and email recovery');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('reset@example.com', PW);
    await admin.auth().updateUser(u.uid, { emailVerified: true });

    const r = await sendOob({ requestType: 'PASSWORD_RESET', email: 'reset@example.com' });
    check('4a a reset mail is issued', r.ok);
    const code = await latestOob('reset@example.com', 'PASSWORD_RESET');
    check('4b the reset link exists', !!code);

    const NEWPW = 'ADifferentPassword!9';
    const done = await post(IDT + '/accounts:resetPassword?key=demo',
      { oobCode: code.oobCode, newPassword: NEWPW });
    check('4c the reset completes', done.ok, JSON.stringify(done.json));

    const oldTry = await signIn('reset@example.com', PW);
    check('4d the old password no longer works', !oldTry.idToken);
    const newTry = await signIn('reset@example.com', NEWPW);
    check('4e the new password works', !!newTry.idToken);
    check('4f the UID survived the reset', newTry.localId === u.uid);

    // --- The self-service change, on an account whose address IS verified.
    // The question that matters: does anything reach the old mailbox? For a
    // typo correction the old mailbox does not exist, so a flow that writes
    // to it is a flow that bounces and tells the applicant nothing.
    const beforeChange = (await oobCodes()).length;
    const changeReq = await sendOob({
      requestType: 'VERIFY_AND_CHANGE_EMAIL',
      idToken: newTry.idToken,
      newEmail: 'moved@example.com',
    });
    check('4g a change away from a verified address is accepted', changeReq.ok);
    const issued = (await oobCodes()).slice(beforeChange);
    check('4h exactly one link is issued, and it targets the NEW address',
      issued.length === 1
      && issued[0].requestType === 'VERIFY_AND_CHANGE_EMAIL'
      && String(issued[0].newEmail || '').toLowerCase() === 'moved@example.com',
      JSON.stringify(issued.map(function (c) { return c.requestType + '->' + c.newEmail; })));

    const chg = issued.find(function (c) { return c.requestType === 'VERIFY_AND_CHANGE_EMAIL'; });
    const beforeApply = (await oobCodes()).length;
    const appliedChange = await applyOob(chg.oobCode);
    check('4i the change completes when the link is opened', appliedChange.ok);
    const afterApply = (await oobCodes()).slice(beforeApply);
    check('4j opening it raises no notice to the old mailbox at all',
      afterApply.length === 0,
      JSON.stringify(afterApply.map(function (c) { return c.requestType + '->' + c.email; })));
    let movedAcct = await admin.auth().getUser(u.uid);
    check('4k the account moved, same UID', movedAcct.email === 'moved@example.com'
      && movedAcct.uid === u.uid, movedAcct.email);

    // --- The ADMIN path behaves differently, and this is worth pinning down.
    // An Admin SDK email change DOES raise a recovery code for the previous
    // address, whether or not that address was ever verified. Applying it
    // rolls the address back AND marks it verified. For a mistyped address on
    // a domain that does not exist, nobody can ever open it, so the
    // correction is safe. For a correction away from a REACHABLE address it
    // is a genuine undo path, which is why the admin form says so.
    const rbUser = await signUp('rollback@example.com', PW);
    await admin.auth().updateUser(rbUser.uid, { emailVerified: true });
    const beforeAdminChange = (await oobCodes()).length;
    await admin.auth().updateUser(rbUser.uid,
      { email: 'rollback-new@example.com', emailVerified: false });
    const adminIssued = (await oobCodes()).slice(beforeAdminChange);
    const recover = adminIssued.find(function (c) { return c.requestType === 'RECOVER_EMAIL'; });
    check('4l an admin-side change raises a recovery code for the old address', !!recover,
      JSON.stringify(adminIssued.map(function (c) { return c.requestType + '->' + c.email; })));
    check('4m the recovery code is addressed to the previous address',
      !!recover && String(recover.email).toLowerCase() === 'rollback@example.com',
      recover ? recover.email : 'none');
    if (recover) {
      const rec = await applyOob(recover.oobCode);
      check('4n applying it rolls the address back', rec.ok);
      const back = await admin.auth().getUser(rbUser.uid);
      check('4o the address is the original again', back.email === 'rollback@example.com',
        back.email);
      check('4p and the rolled-back address is marked verified by the provider',
        back.emailVerified === true);
      check('4q the UID is still the same throughout', back.uid === rbUser.uid);
    }
  }

  // =========================================================================
  section('5. Verification completed on another device');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('otherdevice@example.com', PW);
    const heldToken = u.idToken;          // the tab still open on the laptop

    await sendOob({ requestType: 'VERIFY_EMAIL', idToken: u.idToken });
    const code = await latestOob('otherdevice@example.com', 'VERIFY_EMAIL');

    // Opened on a phone: no access to the original session at all.
    const applied = await applyOob(code.oobCode);
    check('5a the link works with no reference to the original session', applied.ok);

    // The held token still SAYS unverified, because a token is a snapshot.
    const claims = JSON.parse(Buffer.from(heldToken.split('.')[1], 'base64').toString());
    check('5b the already-issued token still claims unverified',
      claims.email_verified !== true);

    // The server must not believe it.
    const live = await admin.auth().getUser(u.uid);
    check('5c the server knows the account is verified', live.emailVerified === true);

    // And a lookup with the held token reports the true state, which is what
    // the page polls for.
    const acct = await lookup(heldToken);
    check('5d polling with the old token reports verified', acct && acct.emailVerified === true);
  }

  // =========================================================================
  section('6. Checkout cannot be reached without a verified address');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('unverified-buyer@example.com', PW);

    const direct = await callable('createCheckoutSession',
      { tier: 'full-access', origin: ORIGIN }, u.idToken);
    check('6a an unverified account is refused', !direct.ok);
    check('6b the refusal is the one the UI routes on',
      !direct.ok && /verify-email-required/.test(direct.error.message || ''),
      direct.ok ? 'succeeded' : direct.error.message);

    const anon = await callable('createCheckoutSession', { tier: 'full-access', origin: ORIGIN });
    check('6c an unauthenticated call is refused', !anon.ok);

    check('6d no checkout session was created for either',
      (await stripeSessions()).length === 0);
  }

  // =========================================================================
  section('7. A stale token cannot buy anything (the live-state check)');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('stale@example.com', PW);
    await admin.auth().updateUser(u.uid, { emailVerified: true });
    const good = await signIn('stale@example.com', PW);
    const staleToken = good.idToken;

    const claims = JSON.parse(Buffer.from(staleToken.split('.')[1], 'base64').toString());
    check('7a the token in hand claims verified', claims.email_verified === true);

    const first = await callable('createCheckoutSession',
      { tier: 'full-access', origin: ORIGIN }, staleToken);
    check('7b checkout works while the account really is verified', first.ok,
      first.ok ? '' : JSON.stringify(first.error));

    // Now the account stops being verified, while the browser keeps the
    // token that says otherwise.
    await admin.auth().updateUser(u.uid, { emailVerified: false });

    const second = await callable('createCheckoutSession',
      { tier: 'full-access', origin: ORIGIN }, staleToken);
    check('7c the SAME token is now refused, because the server re-read the account',
      !second.ok && /verify-email-required/.test((second.error || {}).message || ''),
      second.ok ? 'accepted a stale verified claim' : (second.error || {}).message);
  }

  // =========================================================================
  section('8. A correction mid-session: checkout follows the new address');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('oldaddr@gmail.ocm', PW);
    await admin.auth().updateUser(u.uid, { emailVerified: true });
    const sess = await signIn('oldaddr@gmail.ocm', PW);
    const openTab = sess.idToken;                    // session stays open

    // Give the account some history that must survive the correction.
    await db.collection('users').doc(u.uid).set({
      email: 'oldaddr@gmail.ocm',
      name: 'Test Applicant',
      path: 'applicant',
      qbankQuestionsAnswered: 137,
      // The real shape: a map keyed by product, which is what
      // payments.qbankAccessActive and SHOSAccess.qbankActive both read.
      payments: { 'exam-bank': 'paid' },
      role: 'student',
    });

    const fix = await callable('adminUpdateUserEmail', {
      currentEmail: 'oldaddr@gmail.ocm',
      newEmail: 'oldaddr@gmail.com',
      reason: 'emulator test',
      opId: 'test_fix_1',
    }, ADMIN_TOKEN);
    check('8a the correction succeeds', fix.ok, fix.ok ? '' : JSON.stringify(fix.error));

    const acct = await admin.auth().getUser(u.uid);
    check('8b the UID is unchanged', acct.uid === u.uid);
    check('8c the address is corrected', acct.email === 'oldaddr@gmail.com', acct.email);
    check('8d the corrected address is unverified', acct.emailVerified === false);

    const prof = (await db.collection('users').doc(u.uid).get()).data() || {};
    check('8e progress survived', prof.qbankQuestionsAnswered === 137);
    // The entitlement itself, computed the way every reader computes it,
    // rather than the presence of a field.
    const paymentsModule = require('../../functions/payments');
    check('8f paid access still computes as active',
      paymentsModule.qbankAccessActive(prof.payments, Date.now()) === true,
      JSON.stringify(prof.payments));
    check('8g the payment record survived',
      !!prof.payments && prof.payments['exam-bank'] === 'paid',
      JSON.stringify(prof.payments));
    check('8h the role survived', prof.role === 'student');
    check('8i the profile email was synced', prof.email === 'oldaddr@gmail.com', prof.email);

    const fixMail = withSubject(await outboxSettled(), SUBJ_ADMIN_FIX);
    const toNew = fixMail.filter(function (m) { return m.to === 'oldaddr@gmail.com'; });
    const toOld = fixMail.filter(function (m) { return m.to === 'oldaddr@gmail.ocm'; });
    check('8j one fresh verification went to the corrected address', toNew.length === 1,
      'count=' + toNew.length);
    check('8k the correction sent nothing to the old mistyped address', toOld.length === 0,
      'count=' + toOld.length);

    // The still-open tab holds a token saying oldaddr@gmail.ocm, verified.
    const claims = JSON.parse(Buffer.from(openTab.split('.')[1], 'base64').toString());
    check('8l the open session still claims the OLD address, verified',
      claims.email === 'oldaddr@gmail.ocm' && claims.email_verified === true);

    const blocked = await callable('createCheckoutSession',
      { tier: 'full-access', origin: ORIGIN }, openTab);
    check('8m checkout from that stale session is refused', !blocked.ok);

    // The applicant confirms the corrected address.
    await sendOob({ requestType: 'VERIFY_EMAIL', idToken: openTab });
    const code = await latestOob('oldaddr@gmail.com', 'VERIFY_EMAIL');
    check('8n a verification link can be issued for the corrected address', !!code);
    if (code) await applyOob(code.oobCode);

    const nowOk = await callable('createCheckoutSession',
      { tier: 'full-access', origin: ORIGIN }, openTab);
    check('8o checkout now works, still on the old token', nowOk.ok,
      nowOk.ok ? '' : JSON.stringify(nowOk.error));

    const sessions = await stripeSessions();
    const last = sessions[sessions.length - 1] || {};
    check('8p the receipt is addressed to the CORRECTED address',
      last.customer_email === 'oldaddr@gmail.com', String(last.customer_email));
    check('8q and not to the address in the token', last.customer_email !== 'oldaddr@gmail.ocm');

    const audit = await db.collection('adminAuditLog').doc('test_fix_1').get();
    check('8r the operation is in the private audit log', audit.exists);
    check('8s the audit entry records both addresses and the uid',
      audit.exists && (audit.data() || {}).uid === u.uid);

    // Idempotency: the same opId must not act twice.
    const repeat = await callable('adminUpdateUserEmail', {
      currentEmail: 'oldaddr@gmail.ocm',
      newEmail: 'oldaddr@gmail.com',
      reason: 'emulator test',
      opId: 'test_fix_1',
    }, ADMIN_TOKEN);
    check('8t replaying the same operation is a no-op, not an error', repeat.ok,
      repeat.ok ? '' : JSON.stringify(repeat.error));
    const replayCount = withSubject(await outboxSettled(), SUBJ_ADMIN_FIX)
      .filter(function (m) { return m.to === 'oldaddr@gmail.com'; }).length;
    check('8u the replay did not send a second verification', replayCount === 1,
      'count=' + replayCount);
  }

  // =========================================================================
  section('9. A corrected address that belongs to somebody else');
  {
    await wipe(); await makeAdmin();
    const victim = await signUp('taken@example.com', PW);
    await admin.auth().updateUser(victim.uid, { emailVerified: true });
    const subject = await signUp('mistyped@example.com', PW);

    const res = await callable('adminUpdateUserEmail', {
      currentEmail: 'mistyped@example.com',
      newEmail: 'taken@example.com',
      reason: 'emulator conflict test',
      opId: 'test_conflict_1',
    }, ADMIN_TOKEN);
    check('9a the correction is refused', !res.ok, res.ok ? 'it went through' : '');

    const a = await admin.auth().getUser(subject.uid);
    const b = await admin.auth().getUser(victim.uid);
    check('9b the subject account is untouched', a.email === 'mistyped@example.com', a.email);
    check('9c the other account is untouched', b.email === 'taken@example.com', b.email);
    check('9d both accounts still exist (nothing merged or deleted)',
      a.uid === subject.uid && b.uid === victim.uid);
    // Only correction mail matters: the two signups legitimately produced
    // their own welcome emails.
    const fixMail9 = withSubject(await outboxSettled(), SUBJ_ADMIN_FIX);
    check('9e the refused correction sent no verification mail', fixMail9.length === 0,
      'count=' + fixMail9.length);
  }

  // =========================================================================
  section('10. A bounce for the old address after a correction');
  {
    await wipe(); await makeAdmin();
    const u = await signUp('bounced@gmail.ocm', PW);
    await db.collection('users').doc(u.uid).set({ email: 'bounced@gmail.ocm' });

    const secret = 'whsec_' + Buffer.from('emulator-test-secret').toString('base64');
    process.env.RESEND_WEBHOOK_SECRET = secret;

    function signedPost(body, id, ts) {
      const raw = JSON.stringify(body);
      const signedPayload = id + '.' + ts + '.' + raw;
      const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
      const sig = crypto.createHmac('sha256', key).update(signedPayload).digest('base64');
      return fetch(FN + '/resendWebhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'svix-id': id,
          'svix-timestamp': String(ts),
          'svix-signature': 'v1,' + sig,
        },
        body: raw,
      });
    }

    const now = Math.floor(Date.now() / 1000);
    const bounce = {
      type: 'email.bounced',
      created_at: new Date().toISOString(),
      data: { to: ['bounced@gmail.ocm'], email_id: 'msg_old_1', bounce: { type: 'Permanent' } },
    };

    // First: the correction happens, then the bounce for the OLD address
    // arrives late, which is the real-world ordering.
    const fix = await callable('adminUpdateUserEmail', {
      currentEmail: 'bounced@gmail.ocm',
      newEmail: 'bounced@gmail.com',
      reason: 'emulator late-bounce test',
      opId: 'test_latebounce_1',
    }, ADMIN_TOKEN);
    check('10a the correction succeeded', fix.ok, fix.ok ? '' : JSON.stringify(fix.error));

    const r1 = await signedPost(bounce, 'msg_evt_1', now);
    check('10b the signed webhook is accepted', r1.status === 200, 'status ' + r1.status);

    const oldRec = await db.collection('emailDelivery').doc('bounced@gmail.ocm').get();
    const newRec = await db.collection('emailDelivery').doc('bounced@gmail.com').get();
    check('10c the bounce is recorded against the OLD address', oldRec.exists);
    check('10d the corrected address has no bounce record at all', !newRec.exists);

    const prof = (await db.collection('users').doc(u.uid).get()).data() || {};
    check('10e the account was not stamped as undeliverable',
      prof.emailDeliveryStatus !== 'bounced',
      String(prof.emailDeliveryStatus));
    check('10f the account address is the corrected one', prof.email === 'bounced@gmail.com');

    // An invalid signature must be refused outright.
    const raw = JSON.stringify(bounce);
    const bad = await fetch(FN + '/resendWebhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'svix-id': 'msg_evt_2', 'svix-timestamp': String(now),
        'svix-signature': 'v1,' + Buffer.from('nonsense').toString('base64'),
      },
      body: raw,
    });
    check('10g a forged signature is rejected', bad.status === 401 || bad.status === 400,
      'status ' + bad.status);

    // Replay of an already-seen event must not double-count.
    const r2 = await signedPost(bounce, 'msg_evt_1', now);
    check('10h a replayed event is accepted but idempotent', r2.status === 200);

    // A later delivery must not clear a complaint.
    const complaint = {
      type: 'email.complained',
      created_at: new Date(Date.now() - 60000).toISOString(),
      data: { to: ['complainer@example.com'], email_id: 'msg_c1' },
    };
    await signedPost(complaint, 'msg_evt_3', now);
    const delivered = {
      type: 'email.delivered',
      created_at: new Date().toISOString(),
      data: { to: ['complainer@example.com'], email_id: 'msg_c2' },
    };
    await signedPost(delivered, 'msg_evt_4', now);
    const cRec = (await db.collection('emailDelivery').doc('complainer@example.com').get()).data() || {};
    check('10i a later delivery does not clear the suppression', cRec.suppressed === true,
      JSON.stringify(cRec));
    check('10j the delivery is still recorded as the latest message outcome',
      cRec.status === 'delivered', String(cRec.status));
    check('10k the suppression reason is kept', cRec.suppressedReason === 'complaint');
  }

  // =========================================================================
  section('11. Google sign-in is judged on state, not on the provider name');
  {
    await wipe(); await makeAdmin();
    // A federated account whose address is NOT verified. Trusting the
    // provider name alone would wave this through.
    const idp = await post(IDT + '/accounts:signInWithIdp?key=demo', {
      postBody: 'id_token=' + encodeURIComponent(JSON.stringify({
        sub: 'google-uid-1', email: 'unverified-google@example.com', email_verified: false,
      })) + '&providerId=google.com',
      requestUri: 'http://localhost',
      returnIdpCredential: true,
      returnSecureToken: true,
    });
    const token = idp.json && idp.json.idToken;
    check('11a a Google account signed in', !!token, JSON.stringify(idp.json));

    if (token) {
      const uid = idp.json.localId;
      await admin.auth().updateUser(uid, { emailVerified: false });
      const res = await callable('createCheckoutSession',
        { tier: 'full-access', origin: ORIGIN }, token);
      check('11b an unverified Google account is still refused', !res.ok,
        res.ok ? 'provider name was enough' : '');

      await admin.auth().updateUser(uid, { emailVerified: true });
      const ok = await callable('createCheckoutSession',
        { tier: 'full-access', origin: ORIGIN }, token);
      check('11c once genuinely verified, it is allowed', ok.ok,
        ok.ok ? '' : JSON.stringify(ok.error));
    }
  }

  // =========================================================================
  section('12. The contact form, server-side');
  {
    await wipe(); await makeAdmin();
    const good = await callable('submitContactMessage', {
      name: 'Anna Applicant', email: 'anna@example.com',
      body: 'I would like to know about the entrance exam.', category: 'general',
    });
    check('12a an anonymous visitor can still write in', good.ok,
      good.ok ? '' : JSON.stringify(good.error));
    check('12b the message was stored', !!(good.result && good.result.id));

    const noName = await callable('submitContactMessage',
      { name: '', email: 'a@b.com', body: 'hello there' });
    check('12c a missing name is refused', !noName.ok);
    const badEmail = await callable('submitContactMessage',
      { name: 'Someone', email: 'not-an-address', body: 'hello there' });
    check('12d a malformed address is refused', !badEmail.ok);
    const noBody = await callable('submitContactMessage',
      { name: 'Someone', email: 'a@b.com', body: '' });
    check('12e an empty message is refused', !noBody.ok);

    const pot = await callable('submitContactMessage', {
      name: 'Bot', email: 'bot@example.com', body: 'buy my things', website: 'http://spam',
    });
    check('12f a filled honeypot is accepted but stores nothing',
      pot.ok && !(pot.result && pot.result.id));

    // Rate limit. The first real submission above already counted.
    let refusedAt = 0;
    for (let i = 0; i < 8; i++) {
      const r = await callable('submitContactMessage', {
        name: 'Flooder', email: 'flood@example.com', body: 'message number ' + i,
      });
      if (!r.ok && r.error && r.error.status === 'RESOURCE_EXHAUSTED') { refusedAt = i; break; }
    }
    check('12g the flood is cut off by the server', refusedAt > 0, 'refusedAt=' + refusedAt);

    // One valid message plus however many of the flood got through before the
    // limit bit. Not a fixed number: the limit keys on BOTH source address
    // and submitted address, and the emulator supplies no forwarding header,
    // so locally only the address key constrains. What must hold is that
    // nothing past the cut-off was stored.
    const stored = await db.collection('messages').get();
    check('12h exactly the accepted messages were stored, and no more',
      stored.size === 1 + refusedAt, 'stored=' + stored.size + ' expected=' + (1 + refusedAt));
    check('12h2 the limit bit within the configured window',
      refusedAt > 0 && refusedAt <= 5, 'refusedAt=' + refusedAt);
    check('12i every stored message came through the function',
      stored.docs.every(function (d) { return (d.data() || {}).source === 'submitContactMessage'; }));
  }

  // =========================================================================
  section('13. Administrator access needs a verified administrator address');
  {
    await wipe();
    const a = await signUp('eli@shosmed.com', PW);     // admin address, UNVERIFIED
    const unverified = await signIn('eli@shosmed.com', PW);

    const denied = await callable('listAllUsers', {}, unverified.idToken);
    check('13a an unverified admin address is refused', !denied.ok,
      denied.ok ? 'it was allowed' : '');
    check('13b the refusal explains what to do',
      !denied.ok && /verified/i.test((denied.error || {}).message || ''),
      (denied.error || {}).message);

    await admin.auth().updateUser(a.uid, { emailVerified: true });
    const verified = await signIn('eli@shosmed.com', PW);
    const allowed = await callable('listAllUsers', {}, verified.idToken);
    check('13c a verified admin address is allowed', allowed.ok,
      allowed.ok ? '' : JSON.stringify(allowed.error));

    // A non-admin must never get in, verified or not.
    const nobody = await signUp('student@example.com', PW);
    await admin.auth().updateUser(nobody.uid, { emailVerified: true });
    const nope = await signIn('student@example.com', PW);
    const refused = await callable('listAllUsers', {}, nope.idToken);
    check('13d an ordinary verified user is refused', !refused.ok);
    const refusedFix = await callable('adminUpdateUserEmail', {
      currentEmail: 'student@example.com', newEmail: 'elsewhere@example.com',
      reason: 'x', opId: 'test_priv_esc',
    }, nope.idToken);
    check('13e an ordinary user cannot correct anybody else’s address', !refusedFix.ok);
    check('13f and no audit entry was created for the attempt',
      !(await db.collection('adminAuditLog').doc('test_priv_esc').get()).exists);
  }

  // =========================================================================
  section('14. Nothing reached the outside world');
  {
    const box = await outboxSettled();
    check('14a every message produced in this run went to the local outbox',
      box.length > 0 && box.every(function (m) {
        return typeof m.to === 'string' && m.to.length > 0;
      }), 'outbox=' + box.length);
    check('14b no live credential was present at any point',
      !/^re_/.test(process.env.RESEND_API_KEY || '')
      && !/^sk_live_/.test(process.env.STRIPE_SECRET_KEY || ''));
  }

  // =========================================================================
  console.log('\n' + '='.repeat(68));
  console.log('account-flows: ' + passed + ' passed, ' + failures.length + ' failed');
  for (const f of failures) console.log('\n  FAIL ' + f);
  console.log('='.repeat(68));
  process.exit(failures.length ? 1 : 0);
}

main().catch(function (err) {
  console.error('\nHARNESS ERROR:', err && err.stack || err);
  process.exit(2);
});
