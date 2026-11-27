/* account-email.js — verification state and self-service email correction.
 * ---------------------------------------------------------------------------
 * Loaded after auth.js, so `firebase`, `auth` and `db` already exist.
 *
 * Three jobs, all of them about one fact: the address on the account may be
 * wrong, and the person who owns the account is the only one who can prove
 * otherwise by opening the mailbox.
 *
 *   1. Change the address WITHOUT sending anything to the old one.
 *      Firebase's updateEmail() mails a revert link to the previous address,
 *      which is useless when the previous address was a typo, and it changes
 *      the account before anyone has proved the new mailbox exists.
 *      verifyBeforeUpdateEmail() does the opposite: it mails the PROPOSED
 *      address and only swaps the account over when that link is clicked.
 *      That is the whole reason this flow uses it.
 *
 *   2. Keep users/{uid}.email in step with Firebase Auth. Auth is the source
 *      of truth and the swap above happens outside this browser (possibly on
 *      another device), so the profile is reconciled on load rather than at
 *      the moment of the change.
 *
 *   3. Re-authenticate when Firebase insists, without losing the typed
 *      address.
 *
 * Nothing here marks anything verified. Only Firebase does that, only when a
 * link in a real inbox is opened.
 */
(function (global) {
  'use strict';

  function fb() { return global.firebase; }
  function currentUser() {
    var f = fb();
    return f && f.auth().currentUser;
  }

  /* Which sign-in methods this account actually has. Decides whether a
     re-auth means "ask for the password" or "open the Google popup". */
  function providers(user) {
    return ((user && user.providerData) || [])
      .map(function (p) { return p && p.providerId; })
      .filter(Boolean);
  }

  function hasPassword(user) { return providers(user).indexOf('password') !== -1; }
  function hasGoogle(user) { return providers(user).indexOf('google.com') !== -1; }

  /* Re-authenticate. `password` is only consulted for password accounts.
     Returns { ok: true } or { ok: false, code, message }. */
  async function reauthenticate(password) {
    var f = fb();
    var user = currentUser();
    if (!user) return { ok: false, code: 'no-user', message: 'Please sign in again.' };
    try {
      if (hasPassword(user)) {
        if (!password) {
          return { ok: false, code: 'need-password', message: 'Enter your password to continue.' };
        }
        var cred = f.auth.EmailAuthProvider.credential(user.email, password);
        await user.reauthenticateWithCredential(cred);
      } else if (hasGoogle(user)) {
        await user.reauthenticateWithPopup(new f.auth.GoogleAuthProvider());
      } else {
        return { ok: false, code: 'unsupported',
                 message: 'This account uses a sign-in method we cannot re-check here. Please email contact@shosmed.com.' };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, code: (err && err.code) || 'unknown', message: friendly(err) };
    }
  }

  /* Deliberately vague about whether an address already has an account
     behind it. "That address is already registered" is an account-existence
     oracle for anybody who can reach a signed-in session. */
  function friendly(err) {
    var code = (err && err.code) || '';
    if (code === 'auth/email-already-in-use' || code === 'auth/account-exists-with-different-credential') {
      return 'We cannot move this account to that address. If that address is already yours, sign in with it instead, or email contact@shosmed.com and we will sort it out.';
    }
    if (code === 'auth/invalid-email') return 'That does not look like a valid email address.';
    if (code === 'auth/requires-recent-login') return 'For your security, confirm it is you before changing the address.';
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential'
        || code === 'auth/invalid-login-credentials') return 'That password is not right.';
    if (code === 'auth/too-many-requests') return 'Too many attempts. Please wait a few minutes and try again.';
    if (code === 'auth/network-request-failed') return 'Network problem. Check your connection and try again.';
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return 'The Google window closed before it finished. Please try again.';
    }
    if (code === 'auth/popup-blocked') return 'Your browser blocked the Google window. Allow popups and try again.';
    if (code === 'auth/operation-not-allowed') {
      return 'This change is not enabled on the account. Please email contact@shosmed.com.';
    }
    return 'Something went wrong. Please try again, or email contact@shosmed.com.';
  }

  /* Ask Firebase to mail the PROPOSED address. The account keeps its current
     email, its UID, its password and everything attached to it until that
     link is opened. `continueUrl` is where the person lands afterwards and
     must be an absolute URL on our own origin: an attacker-supplied return
     address is how this kind of flow gets abused. */
  async function requestEmailChange(newEmail, password, continuePath) {
    var user = currentUser();
    if (!user) return { ok: false, message: 'Please sign in again.' };

    var target = global.SHOSEmailTypo
      ? global.SHOSEmailTypo.normalize(newEmail)
      : String(newEmail || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) {
      return { ok: false, message: 'Please enter a valid email address.' };
    }
    if (user.email && target.toLowerCase() === user.email.toLowerCase()) {
      return { ok: false, message: 'That is already the address on this account.' };
    }

    var settings = { url: safeContinueUrl(continuePath), handleCodeInApp: false };

    async function attempt() {
      await user.verifyBeforeUpdateEmail(target, settings);
    }

    try {
      await attempt();
      return { ok: true, sentTo: target };
    } catch (err) {
      if (err && err.code === 'auth/requires-recent-login') {
        var re = await reauthenticate(password);
        if (!re.ok) return { ok: false, needsReauth: true, code: re.code, message: re.message };
        try {
          await attempt();
          return { ok: true, sentTo: target };
        } catch (err2) {
          return { ok: false, code: err2 && err2.code, message: friendly(err2) };
        }
      }
      return { ok: false, code: err && err.code, message: friendly(err) };
    }
  }

  /* Same-origin only, and only paths we recognise. A continue URL is a
     redirect we are asking Google to perform on our behalf, so it is not a
     place to pass through whatever arrived in the query string. */
  var CONTINUE_PATHS = {
    dashboard: 'dashboard.html',
    qbank: 'qbank.html',
    mock: 'practice-exam.html',
    store: 'dashboard.html?view=store',
    verify: 'verify-email.html'
  };
  function safeContinueUrl(key) {
    var path = CONTINUE_PATHS[key] || CONTINUE_PATHS.dashboard;
    return global.location.origin + '/' + path;
  }

  /* Firebase Auth is the source of truth for the address. The profile doc is
     a copy, and the swap can land in a different browser, so reconcile on
     load instead of trusting the moment of change. Returns true when it
     actually wrote something. */
  async function syncProfileEmail(user, dbRef) {
    var u = user || currentUser();
    // auth.js declares `db` with const, which creates a global LEXICAL
    // binding and never a property of window, so global.db is undefined
    // from here. Take what the caller passes, else make our own handle.
    var database = dbRef || (fb() && fb().firestore());
    if (!u || !u.uid || !u.email || !database) return false;
    try {
      var ref = database.collection('users').doc(u.uid);
      var snap = await ref.get();
      var stored = snap.exists ? (snap.data() || {}).email : null;
      if (stored && String(stored).toLowerCase() === u.email.toLowerCase()) return false;
      await ref.set({
        email: u.email,
        emailUpdatedAt: fb().firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      return true;
    } catch (e) {
      // Never fatal. A stale copy in the profile is a reporting problem, not
      // a sign-in problem, and the next load tries again.
      console.warn('[account-email] profile email sync skipped:', e && e.message);
      return false;
    }
  }

  /* Pull fresh state from the server. getIdToken(true) matters as much as
     reload(): the email_verified claim inside the token is what a Cloud
     Function sees, and it does not change just because reload() did. */
  async function refreshVerification() {
    var user = currentUser();
    if (!user) return { signedIn: false, verified: false };
    try {
      await user.reload();
      var fresh = currentUser();
      if (fresh) await fresh.getIdToken(true);
      return {
        signedIn: true,
        verified: !!(fresh && fresh.emailVerified),
        email: (fresh && fresh.email) || ''
      };
    } catch (e) {
      return { signedIn: true, verified: !!user.emailVerified, email: user.email || '',
               error: friendly(e) };
    }
  }

  global.SHOSAccountEmail = {
    providers: providers,
    hasPassword: hasPassword,
    hasGoogle: hasGoogle,
    reauthenticate: reauthenticate,
    requestEmailChange: requestEmailChange,
    syncProfileEmail: syncProfileEmail,
    refreshVerification: refreshVerification,
    safeContinueUrl: safeContinueUrl,
    friendly: friendly,
    CONTINUE_PATHS: CONTINUE_PATHS
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = global.SHOSAccountEmail;
  }
})(typeof window !== 'undefined' ? window : globalThis);
