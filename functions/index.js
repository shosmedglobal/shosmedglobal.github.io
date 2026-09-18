const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const emails = require('./emails');
const payments = require('./payments');
const fs = require('fs');
const path = require('path');

admin.initializeApp();
const db = admin.firestore();

// ============================================================================
// Mock-exam private data cache.
// The full exam JSONs (with correct answers + explanations) live in
// functions/exam-data/, which is bundled with the function code and not
// deployed to Firebase Hosting. Loaded lazily on first call.
// ============================================================================
const MOCK_ADMIN_EMAILS = [
  'eli@shosmed.com',
  'contact@shosmed.com',
  'privacy@shosmed.com',
  'elizolotov@gmail.com',
];
const MOCK_REVIEWER_EMAILS = ['jana.fauknerova@lf3.cuni.cz'];
const _examCache = {};
function loadExam(year) {
  if (_examCache[year]) return _examCache[year];
  const file = path.join(__dirname, 'exam-data', `mock-exam-${year}.json`);
  if (!fs.existsSync(file)) throw new functions.https.HttpsError('not-found', `Mock exam ${year} does not exist.`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  _examCache[year] = data;
  return data;
}
let _examConfigCache = null;
function loadExamConfig() {
  if (_examConfigCache) return _examConfigCache;
  const file = path.join(__dirname, 'exam-data', 'config.json');
  if (!fs.existsSync(file)) throw new functions.https.HttpsError('not-found', 'exam-data/config.json missing');
  _examConfigCache = JSON.parse(fs.readFileSync(file, 'utf8'));
  return _examConfigCache;
}

// Tier → Firestore field mapping. Keep in sync with the existing
// users/{uid}.payments schema used by qbank.js and dashboard admin tools.
//
// QBank "full-access" tier:
//   - Price: $99 (set in Stripe Dashboard, not here)
//   - Duration: 180 days = 6 months from purchase date.
//     The Stripe webhook below computes expiry as
//     `Date.now() + 180 * 24 * 60 * 60 * 1000` and writes
//     payments['exam-bank-expires-at'] to Firestore. qbank.html
//     auto-locks access when that timestamp passes.
const TIERS = {
  'full-access': {
    field: 'exam-bank',
    plan: 'full-access',
    expiryDays: 180,             // ← 6 months exactly
  },
  'strategy-session': {
    field: 'strategy-session',
    plan: null,
    expiryDays: null,            // one-time purchase, no expiry
  },
  // Note: an 'apply-lf3' tier used to live here as a placeholder, but it
  // was never wired to a real Stripe button — the "Apply for LF3" CTA on
  // the site is a contact-form modal (data-contact-modal="apply-lf3"),
  // not Stripe checkout. If/when that becomes a paid product, add the
  // tier back here AND add a `data-tier="apply-lf3"` button.

  // ---- Match Mentorship à la carte add-ons (Step 3 on the Residency
  // path). One-time purchases, no plan and no expiry — same shape as
  // 'strategy-session'. Sold individually from the Store card in
  // dashboard.html via the shared .stripe-pay handler.
  //
  // The keys below deliberately reuse the canonical service IDs already
  // defined in contact-booking.js (SERVICES) and contact-modal.js, so a
  // booking and a payment for the same service share one identifier. Do
  // not invent parallel names here.
  //
  // PRICING: all seven Match Mentorship add-ons are $99, so they share a
  // SINGLE Stripe Price via `priceKey`. Only one product/price has to
  // exist in Stripe — lookup_key `mentorship-addon` — instead of seven.
  // `field` stays per-service, so Firestore still records exactly which
  // service a student bought and the admin panel can reconcile a payment
  // against its booking.
  //
  // If one of these ever needs a different amount, create a second Stripe
  // Price with its own lookup_key and point that service's `priceKey` at
  // it. Nothing else has to change.
  //
  // IMPORTANT: `mentorship-addon` must exist as the `lookup_key` on an
  // ACTIVE Price in Stripe. createCheckoutSession resolves the price by
  // lookup_key; if it is missing, checkout fails with "No active Stripe
  // price found for lookup_key ...". Amounts live in Stripe, never here.
  'mentorship-lor': {            // Letter of Rec Coaching
    field: 'mentorship-lor', priceKey: 'mentorship-addon', plan: null, expiryDays: null,
  },
  'mentorship-program-list': {   // Program List Guidance
    field: 'mentorship-program-list', priceKey: 'mentorship-addon', plan: null, expiryDays: null,
  },
  'mentorship-research': {       // Research Strategy
    field: 'mentorship-research', priceKey: 'mentorship-addon', plan: null, expiryDays: null,
  },
  'mentorship-cv': {             // Personal Statement Review
    field: 'mentorship-cv', priceKey: 'mentorship-addon', plan: null, expiryDays: null,
  },
  'mentorship-mock-interview': { // Mock Interview Session
    field: 'mentorship-mock-interview', priceKey: 'mentorship-addon', plan: null, expiryDays: null,
  },
  'mentorship-eras': {           // ERAS CV Review
    field: 'mentorship-eras', priceKey: 'mentorship-addon', plan: null, expiryDays: null,
  },
  'usmle-step-review': {         // USMLE Step Review (per session)
    field: 'usmle-step-review', priceKey: 'mentorship-addon', plan: null, expiryDays: null,
  },
};

const ALLOWED_ORIGINS = new Set([
  'https://shosmed.com',
  'https://www.shosmed.com',
  'https://shosmedglobal.github.io',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
]);

exports.createCheckoutSession = functions
  .runWith({ secrets: ['STRIPE_SECRET_KEY'] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'You must be signed in to make a purchase.'
      );
    }

    const tier = data && data.tier;
    const tierConfig = TIERS[tier];
    if (!tierConfig) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        `Unknown tier: ${tier}`
      );
    }

    // Diagnostic: confirm a secret is loaded and report its prefix (never log
    // the full value). Helps spot empty/wrong-mode/wrong-type keys.
    const secret = process.env.STRIPE_SECRET_KEY || '';
    const keyPrefix = secret.slice(0, 8);
    const keyLen = secret.length;
    console.log(`createCheckoutSession invoked: tier=${tier}, uid=${context.auth.uid}, keyPrefix=${keyPrefix}, keyLen=${keyLen}`);
    if (!secret || !secret.startsWith('sk_')) {
      console.error('STRIPE_SECRET_KEY is missing or malformed');
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Stripe secret key is not configured correctly on the server.'
      );
    }

    const stripe = Stripe(secret);

    let prices;
    try {
      // Resolve by the tier's shared priceKey when it has one (all the
      // Match Mentorship add-ons point at 'mentorship-addon'), otherwise
      // by the tier name itself — which keeps 'full-access' and
      // 'strategy-session' working exactly as before.
      prices = await stripe.prices.list({
        lookup_keys: [tierConfig.priceKey || tier],
        active: true,
        limit: 1,
      });
    } catch (err) {
      // Log the full Stripe error server-side for debugging, but never
      // return raw Stripe error strings to the client — they can contain
      // price IDs, account IDs, and integration hints that don't belong
      // in an unauthenticated browser-visible error message.
      console.error('Stripe prices.list failed:', err.type, err.code, err.message);
      throw new functions.https.HttpsError(
        'internal',
        'Could not look up the price for this product. Please try again or contact support.'
      );
    }

    console.log(`Found ${prices.data.length} prices for lookup_key "${tier}"`);
    if (!prices.data.length) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        `No active Stripe price found for lookup_key "${tierConfig.priceKey || tier}". Set the lookup_key on the price in the Stripe dashboard.`
      );
    }

    const requestedOrigin = data && data.origin;
    const origin = ALLOWED_ORIGINS.has(requestedOrigin)
      ? requestedOrigin
      : 'https://shosmed.com';

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{ price: prices.data[0].id, quantity: 1 }],
        customer_email: context.auth.token.email,
        client_reference_id: context.auth.uid,
        metadata: {
          firebase_uid: context.auth.uid,
          tier,
        },
        success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/dashboard.html?cancelled=1`,
        allow_promotion_codes: true,
      });
    } catch (err) {
      // Same reasoning as the price-lookup branch above — full error
      // server-side, generic message client-side.
      console.error('Stripe checkout.sessions.create failed:', err.type, err.code, err.message);
      throw new functions.https.HttpsError(
        'internal',
        'Could not start the checkout session. Please try again or contact support.'
      );
    }

    console.log(`Created checkout session ${session.id} for uid=${context.auth.uid}, tier=${tier}`);
    return { url: session.url };
  });

exports.stripeWebhook = functions
  .runWith({ secrets: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'] })
  .https.onRequest(async (req, res) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // All recording logic — the payment ledger, entitlement fields,
    // refunds, and idempotency — lives in payments.js. Handled events:
    //   checkout.session.completed
    //   checkout.session.async_payment_succeeded
    //   charge.refunded
    // Every other type is acknowledged and ignored. Each of those three
    // must be enabled on the webhook endpoint in the Stripe Dashboard.
    try {
      const outcome = await payments.handleStripeEvent(db, event, paymentDeps());
      console.log(`[stripeWebhook] ${event.type} ${event.id} ->`, JSON.stringify(outcome));
      return res.status(200).send(outcome.result);
    } catch (err) {
      // Storage failure: answer 500 so Stripe retries. Safe, because
      // recording is idempotent on the Checkout Session ID.
      console.error(`[stripeWebhook] ${event.type} ${event.id} failed:`, err);
      return res.status(500).send('database update failed');
    }
  });

function paymentDeps() {
  return {
    TIERS,
    FieldValue: admin.firestore.FieldValue,
    Timestamp: admin.firestore.Timestamp,
  };
}


// ============================================================================
// Transactional email — Resend
// ----------------------------------------------------------------------------
// Sends branded HTML email via the Resend API
// (https://resend.com — 3000 emails/month free).
//
// Requires a Firebase secret named RESEND_API_KEY:
//   firebase functions:secrets:set RESEND_API_KEY
//
// Sender domain: send.shosmed.com (Resend subdomain setup).
// Using a subdomain isolates transactional-email reputation from the root
// domain and — critically — avoids conflicting with the existing Google
// Workspace MX records at @. SPF + DKIM + MX records all live at the
// `send` subdomain (see Resend dashboard / DNS audit).
//
// Reply-To still points to contact@shosmed.com so user replies land in
// the Google Workspace inbox.
//
// If the API key isn't set, sendEmail() returns gracefully (logs + skips)
// so signups never break because of email infrastructure issues.
// ============================================================================
// Verified domain in Resend is shosmed.com (root). The `send` subdomain
// only hosts the bounce/SPF infrastructure — sending happens from the root.
const EMAIL_FROM = 'SHOS Med <welcome@shosmed.com>';
const EMAIL_REPLY_TO = 'contact@shosmed.com';

async function sendEmail({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not configured — skipping send to', to);
    return { skipped: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [to],
        subject,
        html,
        text,
        reply_to: EMAIL_REPLY_TO,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('[email] Resend API error', res.status, errText);
      return { ok: false, status: res.status, error: errText };
    }
    const body = await res.json();
    console.log('[email] sent to', to, 'id=', body.id);
    return { ok: true, id: body.id };
  } catch (err) {
    console.error('[email] send failed:', err);
    return { ok: false, error: err.message };
  }
}

// Helper: load the Firestore profile (if any) so we can personalize.
async function loadProfile(uid) {
  try {
    const snap = await db.collection('users').doc(uid).get();
    return snap.exists ? snap.data() : {};
  } catch (_) {
    return {};
  }
}

// ----------------------------------------------------------------------------
// onUserCreated: Auth trigger — fires automatically when a new user signs up
// via email/password, Google, or any other Firebase Auth method. Sends the
// combined welcome + verification email. Wraps everything in try/catch so a
// transient Resend outage never breaks the signup flow.
// ----------------------------------------------------------------------------
exports.onUserCreated = functions
  .runWith({ secrets: ['RESEND_API_KEY'] })
  .auth.user()
  .onCreate(async (user) => {
    if (!user.email) {
      console.log('[onUserCreated] no email on user', user.uid, '— skipping');
      return;
    }
    try {
      const verifyLink = await admin.auth().generateEmailVerificationLink(user.email, {
        url: 'https://shosmed.com/dashboard.html',
      });
      const profile = await loadProfile(user.uid);
      const name = profile.name || user.displayName || '';
      const path = profile.path || 'applicant';

      const result = await sendEmail({
        to: user.email,
        subject: 'Welcome to SHOS Med (please verify your email)',
        html: emails.welcomeEmailHtml({ name, path, verifyLink }),
        text: emails.welcomeEmailText({ name, path, verifyLink }),
      });

      if (result.ok) {
        await db.collection('users').doc(user.uid).set(
          { welcomeEmailSentAt: admin.firestore.FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    } catch (err) {
      // CRITICAL: never throw here — signup must succeed even if email fails.
      console.error('[onUserCreated] email send failed for', user.uid, err);
    }
  });

// ----------------------------------------------------------------------------
// resendVerification: callable from the dashboard's "Resend email" button.
// Generates a fresh verification link and sends the streamlined verify-only
// template. Returns { alreadyVerified: true } if the user already verified.
// ----------------------------------------------------------------------------
exports.resendVerification = functions
  .runWith({ secrets: ['RESEND_API_KEY'] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
    }
    let authUser;
    try {
      authUser = await admin.auth().getUser(context.auth.uid);
    } catch (err) {
      throw new functions.https.HttpsError('not-found', 'User not found.');
    }
    if (!authUser.email) {
      throw new functions.https.HttpsError('failed-precondition', 'No email on file.');
    }
    if (authUser.emailVerified) {
      return { success: true, alreadyVerified: true };
    }

    try {
      const verifyLink = await admin.auth().generateEmailVerificationLink(authUser.email, {
        url: 'https://shosmed.com/dashboard.html',
      });
      const profile = await loadProfile(authUser.uid);
      const name = profile.name || authUser.displayName || '';

      const result = await sendEmail({
        to: authUser.email,
        subject: 'Verify your email | SHOS Med',
        html: emails.verificationEmailHtml({ name, verifyLink }),
        text: emails.verificationEmailText({ name, verifyLink }),
      });
      if (!result.ok && !result.skipped) {
        throw new functions.https.HttpsError('internal', result.error || 'Email send failed.');
      }
      return { success: true };
    } catch (err) {
      console.error('[resendVerification] failed:', err);
      if (err instanceof functions.https.HttpsError) throw err;
      throw new functions.https.HttpsError('internal', err.message);
    }
  });


// ============================================================================
// Admin user listing
// ----------------------------------------------------------------------------
// Returns every Firebase Auth user (which is the source of truth for "who
// signed in") joined with their Firestore profile if one exists. Required
// because the admin dashboard's previous direct Firestore query
//   db.collection('users').orderBy('createdAt', 'desc').get()
// silently excluded:
//   (a) Auth users with no Firestore doc (mid-flow signup failures, console-
//       added accounts, accounts created before the Firestore-write step
//       existed),
//   (b) Firestore docs missing the `createdAt` field (Firestore .orderBy
//       excludes documents that don't have the order-by field).
//
// Auth-listed users now appear in the admin even before they re-sign-in to
// trigger the backfill in auth.js.
// ============================================================================
const ADMIN_EMAILS = new Set([
  'eli@shosmed.com',
  'contact@shosmed.com',
  'privacy@shosmed.com',
  'elizolotov@gmail.com',
]);

// ----------------------------------------------------------------------------
// deleteUser: admin-only. Deletes a user from both Firebase Auth AND their
// Firestore profile (plus all sub-collections) so admins can clean up
// orphans / test accounts / mistaken signups from the dashboard.
//
// Safety guards:
//   - Caller must be admin (email in ADMIN_EMAILS).
//   - Cannot delete another admin account (would be an irreversible foot-gun).
//   - Cannot delete self (separate flow — sign-out + Firebase console).
// ----------------------------------------------------------------------------
exports.deleteUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
  }
  const callerEmail = (context.auth.token && context.auth.token.email) || '';
  if (!ADMIN_EMAILS.has(callerEmail.toLowerCase())) {
    throw new functions.https.HttpsError('permission-denied', 'Admin only.');
  }
  const targetUid = data && data.uid;
  if (!targetUid || typeof targetUid !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Missing target uid.');
  }
  if (targetUid === context.auth.uid) {
    throw new functions.https.HttpsError('failed-precondition', 'Cannot delete your own account from here.');
  }

  // Verify target isn't another admin (we never want one admin to be
  // able to delete another via a UI mis-click).
  try {
    const target = await admin.auth().getUser(targetUid);
    const targetEmail = (target.email || '').toLowerCase();
    if (targetEmail && ADMIN_EMAILS.has(targetEmail)) {
      throw new functions.https.HttpsError('failed-precondition', 'Cannot delete an admin account.');
    }
  } catch (err) {
    // If the user doesn't exist in Auth, we still try the Firestore cleanup
    // below — but we don't fail loudly because cleanup-of-the-missing is OK.
    if (err.code !== 'auth/user-not-found' && !(err instanceof functions.https.HttpsError)) {
      console.warn('[deleteUser] getUser check skipped:', err.message);
    } else if (err instanceof functions.https.HttpsError) {
      throw err;
    }
  }

  const summary = { authDeleted: false, firestoreDocDeleted: false, subcolsDeleted: 0 };
  // Track auth failure so we can decide whether Firestore-only cleanup
  // is enough. If auth.deleteUser succeeds OR the user was already gone,
  // this stays null. Any other error goes here — we still attempt the
  // Firestore cleanup below (an orphan doc-only cleanup is legitimate)
  // and surface the auth error at the end so the caller knows.
  let authError = null;

  // 1) Delete Auth user (tolerant of "not found" AND "invalid-uid" —
  //    the latter happens when the row is a pure Firestore orphan.)
  try {
    await admin.auth().deleteUser(targetUid);
    summary.authDeleted = true;
  } catch (err) {
    if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-uid') {
      // No auth account to delete. Continue to Firestore cleanup — this
      // is the "orphan doc" case and admin explicitly wants it gone.
      console.log('[deleteUser] no auth account for', targetUid, '(' + err.code + ') — cleaning up Firestore only');
    } else {
      // Something else went wrong (rate limit, permission, network).
      // Record it, keep going with Firestore cleanup, and surface the
      // detail at the end. Do NOT throw here — the admin still wants
      // the Firestore doc gone.
      authError = { code: err.code || 'unknown', message: err.message || String(err) };
      console.error('[deleteUser] auth.deleteUser failed:', targetUid, authError);
    }
  }

  // 2) Delete known sub-collections under users/{uid}/...
  //    We don't need a recursive-delete tool here — the well-known
  //    sub-collections are qbankData, qbankTests, mockExamAttempts,
  //    studyNotes, studyHighlights.
  const userRef = db.collection('users').doc(targetUid);
  for (const sub of ['qbankData', 'qbankTests', 'mockExamAttempts', 'studyNotes', 'studyHighlights']) {
    try {
      const snap = await userRef.collection(sub).get();
      if (!snap.empty) {
        const batch = db.batch();
        snap.docs.forEach((d) => batch.delete(d.ref));
        await batch.commit();
        summary.subcolsDeleted += snap.size;
      }
    } catch (err) {
      console.warn('[deleteUser] sub-collection delete failed for', sub, err.message);
    }
  }

  // 3) Delete the user doc itself
  try {
    const doc = await userRef.get();
    if (doc.exists) {
      await userRef.delete();
      summary.firestoreDocDeleted = true;
    }
  } catch (err) {
    console.error('[deleteUser] firestore doc delete failed:', err);
    // If both Firestore and Auth failed, surface the Firestore error to
    // the caller (auth error might just be a side-effect of a broken
    // deploy — but Firestore failing means the admin has no way to
    // remove this row).
    if (authError) {
      throw new functions.https.HttpsError('unknown',
        'Both Auth and Firestore delete failed. Auth: ' + authError.code + ' — ' + authError.message +
        '. Firestore: ' + (err.code || 'unknown') + ' — ' + (err.message || String(err)));
    }
  }

  console.log('[deleteUser]', targetUid, summary);

  // If auth delete failed but Firestore cleanup succeeded, tell the
  // caller — the admin still needs to know the Auth account survived
  // and may need to be removed manually via the Firebase Console.
  if (authError) {
    throw new functions.https.HttpsError('unknown',
      'Firestore cleaned up (' + summary.subcolsDeleted + ' subdocs removed), but the Auth account could NOT be deleted: ' +
      authError.code + ' — ' + authError.message +
      '. Remove it manually via Firebase Console → Authentication → Users.');
  }

  return { success: true, ...summary };
});


exports.listAllUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
  }
  const callerEmail = (context.auth.token && context.auth.token.email) || '';
  if (!ADMIN_EMAILS.has(callerEmail.toLowerCase())) {
    throw new functions.https.HttpsError('permission-denied', 'Admin only.');
  }

  try {
    // Pull every Auth user (paginated, max 1000 per page).
    const allAuthUsers = [];
    let pageToken = undefined;
    do {
      const result = await admin.auth().listUsers(1000, pageToken);
      allAuthUsers.push(...result.users);
      pageToken = result.pageToken;
    } while (pageToken);

    // Batch-fetch matching Firestore profiles (10 per `in` query — Firestore limit).
    const profilesByUid = {};
    for (let i = 0; i < allAuthUsers.length; i += 10) {
      const slice = allAuthUsers.slice(i, i + 10).map((u) => u.uid);
      const snap = await db
        .collection('users')
        .where(admin.firestore.FieldPath.documentId(), 'in', slice)
        .get();
      snap.forEach((doc) => {
        profilesByUid[doc.id] = doc.data();
      });
    }

    // Merge: Auth is the source of truth for existence + email + signup time;
    // Firestore enriches with name, path, payments, etc.
    const users = allAuthUsers.map((u) => {
      const profile = profilesByUid[u.uid] || {};
      // Prefer explicit profile fields; fall back to Auth metadata.
      const createdAtMs =
        (profile.createdAt && profile.createdAt.toMillis && profile.createdAt.toMillis()) ||
        (u.metadata && u.metadata.creationTime && Date.parse(u.metadata.creationTime)) ||
        null;
      const lastSignInMs =
        (u.metadata && u.metadata.lastSignInTime && Date.parse(u.metadata.lastSignInTime)) ||
        null;
      // Pass through visit-tracking fields the admin table displays.
      const lastVisitMs =
        (profile.lastVisitAt && profile.lastVisitAt.toMillis && profile.lastVisitAt.toMillis()) ||
        null;
      return {
        id: u.uid,
        email: profile.email || u.email || '',
        name: profile.name || u.displayName || '',
        path: profile.path || null,
        payments: profile.payments || {},
        createdAtMs,                              // ms since epoch (always set)
        lastSignInMs,                             // for debug / future use
        visitCount: profile.visitCount || 0,     // sessions on the site
        lastVisitAt: lastVisitMs,                 // ms since epoch; null if never tracked
        emailVerified: !!u.emailVerified,
        disabled: !!u.disabled,
        providers: (u.providerData || []).map((p) => p.providerId),
        hasFirestoreDoc: !!profilesByUid[u.uid],  // surfaces orphans in the UI
      };
    });

    // Newest first by default — UI may re-sort.
    users.sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
    return { users };
  } catch (err) {
    console.error('listAllUsers failed:', err);
    throw new functions.https.HttpsError('internal', err.message);
  }
});


// Cleanup orphan Firestore profile docs — /users/{uid} documents whose
// matching Firebase Auth account no longer exists (deleted manually, or
// via the dashboard's Delete button before the multi-step deleteUser
// flow existed).
//
// Why this is safe:
//   - Admin-only (same allowlist as deleteUser / listAllUsers).
//   - Touches ONLY Firestore (Auth users are untouched).
//   - Only deletes docs whose UID is verifiably absent from Auth.
//     Auth is enumerated FIRST and compared in-memory; we never delete
//     a doc whose Auth status we failed to confirm.
//   - Returns a summary with the deleted UIDs so the caller can audit.
//
// Idempotent — running twice with no new orphans is a no-op.
exports.cleanupOrphanUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
  }
  const callerEmail = (context.auth.token && context.auth.token.email) || '';
  if (!ADMIN_EMAILS.has(callerEmail.toLowerCase())) {
    throw new functions.https.HttpsError('permission-denied', 'Admin only.');
  }

  try {
    // 1) Enumerate every Auth UID (paginated).
    const authUidSet = new Set();
    let pageToken = undefined;
    do {
      const result = await admin.auth().listUsers(1000, pageToken);
      result.users.forEach(u => authUidSet.add(u.uid));
      pageToken = result.pageToken;
    } while (pageToken);

    // 2) Scan /users and identify orphans.
    const snap = await db.collection('users').get();
    const orphanRefs = [];
    snap.forEach(doc => {
      if (!authUidSet.has(doc.id)) {
        orphanRefs.push({ ref: doc.ref, uid: doc.id, email: (doc.data() || {}).email || '' });
      }
    });

    if (orphanRefs.length === 0) {
      return { success: true, deletedCount: 0, orphans: [] };
    }

    // 3) Delete known sub-collections first (qbankData, qbankTests) so we
    //    don't leave dangling sub-docs.
    let subDocsDeleted = 0;
    for (const o of orphanRefs) {
      for (const sub of ['qbankData', 'qbankTests']) {
        try {
          const subSnap = await o.ref.collection(sub).get();
          if (!subSnap.empty) {
            const batch = db.batch();
            subSnap.docs.forEach(d => batch.delete(d.ref));
            await batch.commit();
            subDocsDeleted += subSnap.size;
          }
        } catch (err) {
          console.warn('[cleanupOrphanUsers] sub-collection delete failed for', sub, 'of', o.uid, err.message);
        }
      }
    }

    // 4) Delete the orphan user docs (batched, 500 max per batch).
    for (let i = 0; i < orphanRefs.length; i += 500) {
      const batch = db.batch();
      orphanRefs.slice(i, i + 500).forEach(o => batch.delete(o.ref));
      await batch.commit();
    }

    const summary = {
      success: true,
      deletedCount: orphanRefs.length,
      subDocsDeleted,
      orphans: orphanRefs.map(o => ({ uid: o.uid, email: o.email })),
    };
    console.log('[cleanupOrphanUsers]', summary);
    return summary;
  } catch (err) {
    console.error('cleanupOrphanUsers failed:', err);
    throw new functions.https.HttpsError('internal', err.message);
  }
});

// ============================================================================
// reconcileStripePayments
// ----------------------------------------------------------------------------
// Admin-only backfill: brings the payment ledger (transactions/*) in line
// with what Stripe actually charged. Covers payments made before the ledger
// existed and any webhook delivery that was missed.
//
// Two-step by design (mirrors the dashboard's confirm-then-act tools):
//   1. { dryRun: true }  (default) — reads Stripe, writes NOTHING, and returns
//      every paid Checkout Session with its verification details and whether
//      it is already in the ledger.
//   2. { dryRun: false, sessionIds: [...] } — records exactly the sessions the
//      admin reviewed in step 1. Each one is re-fetched from Stripe and
//      re-verified at write time.
//
// Safety:
//   - Stripe is the source of truth: a session is only recorded if Stripe
//     reports it complete + paid, it carries our firebase_uid/tier metadata,
//     the UID exists in Firebase Auth, and Stripe's customer email matches
//     that Auth account's email. Anything else is reported as a skip.
//   - Recording goes through payments.recordCheckoutSession, the same
//     idempotent path the webhook uses, so a session already in the ledger
//     is a no-op. Running this twice cannot double-count.
//   - Refund state is read from the session's charge and applied with the
//     same absolute-value logic as the charge.refunded webhook.
// ============================================================================
const CHECKOUT_SESSION_ID_RE = /^cs_(live|test)_[A-Za-z0-9]{8,200}$/;

exports.reconcileStripePayments = functions
  .runWith({ secrets: ['STRIPE_SECRET_KEY'], timeoutSeconds: 300 })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
    }
    const callerEmail = (context.auth.token && context.auth.token.email) || '';
    if (!ADMIN_EMAILS.has(callerEmail.toLowerCase())) {
      throw new functions.https.HttpsError('permission-denied', 'Admin only.');
    }

    const dryRun = !(data && data.dryRun === false);
    const requestedIds = Array.isArray(data && data.sessionIds) ? data.sessionIds : null;
    if (!dryRun && (!requestedIds || requestedIds.length === 0)) {
      throw new functions.https.HttpsError('invalid-argument',
        'A write run must name the sessionIds reviewed in a dry run.');
    }
    if (requestedIds) {
      if (requestedIds.length > 100) {
        throw new functions.https.HttpsError('invalid-argument', 'At most 100 sessionIds per run.');
      }
      const bad = requestedIds.filter(id => typeof id !== 'string' || !CHECKOUT_SESSION_ID_RE.test(id));
      if (bad.length) {
        throw new functions.https.HttpsError('invalid-argument', 'Malformed sessionId(s): ' + bad.join(', '));
      }
    }
    const sinceDays = Math.min(Math.max(parseInt((data && data.sinceDays) || 365, 10) || 365, 1), 730);

    const secret = process.env.STRIPE_SECRET_KEY || '';
    if (!secret.startsWith('sk_')) {
      throw new functions.https.HttpsError('failed-precondition', 'Stripe secret key is not configured.');
    }
    const stripe = Stripe(secret);
    const EXPAND = ['payment_intent.latest_charge'];

    // ---- 1. Pull sessions from Stripe
    const sessions = [];
    try {
      if (requestedIds) {
        for (const id of requestedIds) {
          sessions.push(await stripe.checkout.sessions.retrieve(id, { expand: EXPAND }));
        }
      } else {
        const gte = Math.floor(Date.now() / 1000) - sinceDays * 24 * 60 * 60;
        for await (const s of stripe.checkout.sessions.list({
          created: { gte },
          limit: 100,
          expand: EXPAND.map(e => 'data.' + e),
        })) {
          sessions.push(s);
        }
      }
    } catch (err) {
      console.error('[reconcile] Stripe read failed:', err.type, err.code, err.message);
      throw new functions.https.HttpsError('internal', 'Could not read checkout sessions from Stripe.');
    }

    // ---- 2. Verify each one and (optionally) record it
    const deps = Object.assign(paymentDeps(), { source: 'reconcile' });
    const report = [];
    for (const s of sessions) {
      const charge = s.payment_intent && typeof s.payment_intent === 'object'
        ? s.payment_intent.latest_charge : null;
      const entry = {
        sessionId: s.id,
        created: s.created ? new Date(s.created * 1000).toISOString() : null,
        amountTotal: s.amount_total,
        currency: s.currency,
        livemode: s.livemode === true,
        status: s.status,
        paymentStatus: s.payment_status,
        stripeEmail: (s.customer_details && s.customer_details.email) || s.customer_email || '',
        uid: (s.metadata && s.metadata.firebase_uid) || null,
        tier: (s.metadata && s.metadata.tier) || null,
        amountRefunded: (charge && typeof charge === 'object' && charge.amount_refunded) || 0,
      };

      const c = payments.classifySession(s, TIERS);
      if (!c.ok) {
        // Unpaid / expired / foreign sessions are expected in a scan and
        // are only worth reporting when the admin asked for them by ID.
        if (requestedIds) report.push(Object.assign(entry, { action: 'skip', reason: c.reason }));
        continue;
      }

      let authEmail = '';
      try {
        authEmail = (await admin.auth().getUser(c.uid)).email || '';
      } catch (_) {
        report.push(Object.assign(entry, { action: 'skip', reason: 'uid_not_in_firebase_auth' }));
        continue;
      }
      entry.authEmail = authEmail;
      if (authEmail.toLowerCase() !== entry.stripeEmail.toLowerCase()) {
        report.push(Object.assign(entry, { action: 'skip', reason: 'email_mismatch_needs_manual_review' }));
        continue;
      }

      const [ledgerSnap, userSnap] = await Promise.all([
        db.collection(payments.LEDGER).doc(s.id).get(),
        db.collection('users').doc(c.uid).get(),
      ]);
      const userPayments = (userSnap.exists && userSnap.data().payments) || {};
      entry.inLedger = ledgerSnap.exists;
      entry.userEntitlement = userPayments[c.tierConfig.field] || null;
      entry.userEntitlementSession = userPayments[`${c.tierConfig.field}-stripe-session`] || null;

      if (dryRun) {
        entry.action = entry.inLedger ? 'already_recorded' : 'would_record';
      } else {
        const r = await payments.recordCheckoutSession(db, s, deps);
        entry.action = r.result; // 'recorded' | 'duplicate'
        if (charge && typeof charge === 'object' && charge.amount_refunded > 0) {
          const rr = await payments.applyChargeRefund(db,
            Object.assign({}, charge, { payment_intent: s.payment_intent.id }), deps);
          entry.refund = rr.result;
        }
      }
      report.push(entry);
    }

    const summary = {
      dryRun,
      scanned: sessions.length,
      sinceDays: requestedIds ? null : sinceDays,
      sessions: report,
    };
    console.log('[reconcile]', callerEmail, JSON.stringify(summary));
    return summary;
  });

// ============================================================================
// submitMockExam
// ----------------------------------------------------------------------------
// Server-side scoring for mock exams. Closes the previous "answer keys are
// in a public JSON" hole — the private JSONs live in functions/exam-data/
// and are only readable here. The client sends the user's raw picks; we
// grade, write the attempt with admin privileges, and return the score +
// the correct-answer map + the explanations (only after submission).
//
// Access checks:
//   • Signed in
//   • User is allowed to attempt this year (paid / free-year / admin / reviewer)
//   • Attempt does not already exist (one-shot rule — admin bypass only)
//
// Input:  { year: "2022", answers: { "1": "B", "2": "C", ... } }
// Output: { score: {correct, total, bioCorrect, bioTotal, chemCorrect, chemTotal},
//           correctAnswers: { "1": "B", ... },
//           explanations:   { "1": "…", ... },
//           finishedAt: ISO string }
// ============================================================================
exports.submitMockExam = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be signed in to submit a mock exam.');
  }
  const uid = context.auth.uid;
  const email = ((context.auth.token && context.auth.token.email) || '').toLowerCase();
  const year = data && String(data.year || '').trim();
  const answers = (data && typeof data.answers === 'object' && data.answers) || {};
  if (!/^\d{4}$/.test(year)) {
    throw new functions.https.HttpsError('invalid-argument', 'Bad year.');
  }

  const cfg = loadExamConfig();
  const yearMeta = (cfg.years || []).find(y => y.year === year);
  if (!yearMeta || yearMeta.status !== 'available') {
    throw new functions.https.HttpsError('failed-precondition', 'That year is not currently available.');
  }

  // Access check: admin, reviewer, free year, or paid.
  const isAdmin = MOCK_ADMIN_EMAILS.includes(email);
  const isReviewer = MOCK_REVIEWER_EMAILS.includes(email);
  const isFree = year === cfg.freeYear;
  let isPaid = false;
  if (!isAdmin && !isReviewer && !isFree) {
    const snap = await db.collection('users').doc(uid).get();
    const p = snap.exists ? (snap.data() || {}) : {};
    isPaid = !!(p.payments && p.payments['exam-bank'] === 'paid');
    if (!isPaid) {
      throw new functions.https.HttpsError('permission-denied',
        'This mock exam requires QBank Full Access ($99). Purchase it from the dashboard store.');
    }
  }

  // One-shot rule — non-admins cannot resubmit.
  const attemptRef = db.collection('users').doc(uid).collection('mockExamAttempts').doc(year);
  const existing = await attemptRef.get();
  if (existing.exists && !isAdmin) {
    throw new functions.https.HttpsError('already-exists',
      'You have already taken this exam. Admin can grant a retake.');
  }

  // Grade against the private answer key.
  const exam = loadExam(year);
  let correct = 0, bioCorrect = 0, chemCorrect = 0, bioTotal = 0, chemTotal = 0;
  const correctAnswers = {};
  const explanations = {};
  exam.forEach(q => {
    if (!q || !q.id) return;
    const section = q.section || 'Chemistry';
    if (section === 'Biology') bioTotal++; else chemTotal++;
    correctAnswers[q.id] = q.correct;
    explanations[q.id] = q.explanation || '';
    const userPickRaw = answers[q.id];
    const userPick = userPickRaw != null ? String(userPickRaw).trim().toUpperCase() : null;
    const truth = q.correct != null ? String(q.correct).trim().toUpperCase() : null;
    if (userPick && truth && userPick === truth) {
      correct++;
      if (section === 'Biology') bioCorrect++; else chemCorrect++;
    }
  });

  const score = { correct, total: exam.length, bioCorrect, bioTotal, chemCorrect, chemTotal };

  // Persist. Admin-write via admin SDK bypasses Firestore rules that
  // otherwise deny direct owner writes. Server timestamps only.
  const now = admin.firestore.FieldValue.serverTimestamp();
  const startedAtMs = data && Number(data.startedAtMs);
  const startedAt = startedAtMs && startedAtMs > 0
    ? admin.firestore.Timestamp.fromMillis(startedAtMs)
    : null;
  await attemptRef.set({
    year,
    finishedAt: now,
    startedAt: startedAt || now,
    answers,
    score,
    submittedByCf: true,   // sentinel — the client cannot forge attempts that lack this
  }, { merge: existing.exists });

  return {
    score,
    correctAnswers,
    explanations,
    finishedAt: new Date().toISOString(),
    year,
  };
});

// ============================================================================
// getMockExamReview
// ----------------------------------------------------------------------------
// Returns the correct answers + explanations for an ALREADY-completed
// attempt, so the review view can render post-submit even after a page
// refresh (no answer key ever lands in the client until an attempt is
// on record). Owner (of the attempt) or admin only.
//
// Input:  { year: "2022", uid?: "targetUid" }   // uid required for admin view-as
// Output: { correctAnswers, explanations }
// ============================================================================
exports.getMockExamReview = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
  }
  const year = data && String(data.year || '').trim();
  if (!/^\d{4}$/.test(year)) {
    throw new functions.https.HttpsError('invalid-argument', 'Bad year.');
  }
  const callerUid = context.auth.uid;
  const callerEmail = ((context.auth.token && context.auth.token.email) || '').toLowerCase();
  const isAdmin = MOCK_ADMIN_EMAILS.includes(callerEmail);
  const isReviewer = MOCK_REVIEWER_EMAILS.includes(callerEmail);
  const targetUid = (data && data.uid) ? String(data.uid) : callerUid;
  if (targetUid !== callerUid && !isAdmin && !isReviewer) {
    throw new functions.https.HttpsError('permission-denied', 'You can only review your own attempts.');
  }
  const attemptRef = db.collection('users').doc(targetUid).collection('mockExamAttempts').doc(year);
  const attempt = await attemptRef.get();
  if (!attempt.exists) {
    // Reviewers/admins may view questions before an attempt exists; regular
    // owners must have submitted first.
    if (!isAdmin && !isReviewer) {
      throw new functions.https.HttpsError('failed-precondition', 'No attempt on record for that year.');
    }
  }
  const exam = loadExam(year);
  const correctAnswers = {};
  const explanations = {};
  exam.forEach(q => {
    if (!q || !q.id) return;
    correctAnswers[q.id] = q.correct;
    explanations[q.id] = q.explanation || '';
  });
  return { correctAnswers, explanations, year };
});
