'use strict';
/* identity.js — who is an administrator, and what is actually true right now.
 * ---------------------------------------------------------------------------
 * Two problems this fixes.
 *
 * 1. The admin list existed twice: ADMIN_EMAILS (a Set) and MOCK_ADMIN_EMAILS
 *    (an array), with the same four addresses maintained independently and
 *    used by different functions. Two copies of an authorization rule is one
 *    copy too many: the day they diverge, the divergence IS the vulnerability,
 *    and nothing in the code would notice. There is now one list, here.
 *
 * 2. Admin rights were granted on the strength of an email STRING in a token.
 *    An email address is an identifier, not a credential. The address alone
 *    becomes a credential only once somebody has proved they control the
 *    mailbox, which is precisely what email_verified records. So an
 *    unverified, self-entered address can no longer grant administrator
 *    access, even if the string matches.
 *
 * On staleness: an ID token is a snapshot, valid for up to an hour. Its
 * email and email_verified claims describe the account as it was when the
 * token was minted, not as it is now. For a decision that merely reads data
 * that is fine. For a decision with consequences — taking money, granting
 * access — it is not, because a session opened before a change still carries
 * the old answer. liveAccount() goes and asks.
 */

const admin = require('firebase-admin');

/* The one list. Adding an administrator means adding an address here, and
   here only. firestore.rules keeps its own copy because rules cannot import
   JavaScript; the test suite asserts the two match, which is the only
   defence available against that particular duplication. */
const ADMIN_EMAILS = [
  'eli@shosmed.com',
  'contact@shosmed.com',
  'privacy@shosmed.com',
  'elizolotov@gmail.com',
];

const ADMIN_SET = new Set(ADMIN_EMAILS.map(function (e) { return e.toLowerCase(); }));

const REVIEWER_EMAILS = ['jana.fauknerova@lf3.cuni.cz'];

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function isAdminEmail(email) {
  return ADMIN_SET.has(normalizeEmail(email));
}

function isReviewerEmail(email) {
  return REVIEWER_EMAILS.indexOf(normalizeEmail(email)) !== -1;
}

/* A server-set custom claim is the strongest signal available: only the
   Admin SDK can write it, so it cannot be spoofed from a client at all. It is
   checked first, and the verified-address list is the fallback that keeps the
   existing four accounts working without a migration. */
function hasAdminClaim(token) {
  return !!(token && (token.admin === true || token.role === 'admin'));
}

/* The predicate. Returns a reason string on refusal and null on success, so
   callers can log WHY without having to reconstruct it. */
function adminRefusal(context) {
  if (!context || !context.auth) return 'unauthenticated';
  const token = context.auth.token || {};
  if (hasAdminClaim(token)) return null;
  if (!isAdminEmail(token.email)) return 'not-an-admin-address';
  // The address matches. Now: has anyone proved they own that mailbox?
  if (token.email_verified !== true) return 'admin-address-not-verified';
  return null;
}

function isAdminContext(context) {
  return adminRefusal(context) === null;
}

/* Throws the HttpsError an admin-only callable should throw. `httpsError` is
   passed in rather than imported so this module stays independent of the
   functions SDK version and remains unit-testable without it.

   The messages are deliberately specific for the one failure that would
   otherwise look like a bug: an administrator whose own address is
   unverified would see a flat "Admin only." and have no idea why. Telling
   them exactly what to do is not a disclosure risk, because they have
   already proved they hold an admin session. */
function requireAdmin(context, httpsError) {
  const refusal = adminRefusal(context);
  if (!refusal) return;
  if (refusal === 'unauthenticated') {
    throw httpsError('unauthenticated', 'Sign in required.');
  }
  if (refusal === 'admin-address-not-verified') {
    throw httpsError(
      'permission-denied',
      'This administrator address has not been verified. Open the dashboard, '
      + 'confirm the address from the email we send, then try again.'
    );
  }
  throw httpsError('permission-denied', 'Admin only.');
}

/* What is true NOW, read from Firebase Auth rather than from the token the
   caller happens to be holding. Use this before anything irreversible.

   Returns { uid, email, emailVerified, disabled }. Throws if the account is
   gone, which is itself the right answer for a caller about to act on it. */
async function liveAccount(uid) {
  const rec = await admin.auth().getUser(uid);
  return {
    uid: rec.uid,
    email: rec.email || '',
    emailVerified: rec.emailVerified === true,
    disabled: rec.disabled === true,
    providers: (rec.providerData || []).map(function (p) { return p.providerId; }),
  };
}

module.exports = {
  ADMIN_EMAILS,
  REVIEWER_EMAILS,
  normalizeEmail,
  isAdminEmail,
  isReviewerEmail,
  hasAdminClaim,
  adminRefusal,
  isAdminContext,
  requireAdmin,
  liveAccount,
};
