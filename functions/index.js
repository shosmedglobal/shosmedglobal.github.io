const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const emails = require('./emails');

admin.initializeApp();
const db = admin.firestore();

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
      prices = await stripe.prices.list({
        lookup_keys: [tier],
        active: true,
        limit: 1,
      });
    } catch (err) {
      console.error('Stripe prices.list failed:', err.type, err.code, err.message);
      throw new functions.https.HttpsError(
        'internal',
        `Stripe API error during price lookup: ${err.message}`
      );
    }

    console.log(`Found ${prices.data.length} prices for lookup_key "${tier}"`);
    if (!prices.data.length) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        `No active Stripe price found for lookup_key "${tier}". Set the lookup_key on the price in the Stripe dashboard.`
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
      console.error('Stripe checkout.sessions.create failed:', err.type, err.code, err.message);
      throw new functions.https.HttpsError(
        'internal',
        `Stripe API error creating checkout session: ${err.message}`
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

    if (event.type !== 'checkout.session.completed') {
      return res.status(200).send('ignored');
    }

    const session = event.data.object;
    const uid = session.metadata && session.metadata.firebase_uid;
    const tier = session.metadata && session.metadata.tier;
    if (!uid || !tier) {
      console.error('Missing metadata on session', session.id, session.metadata);
      return res.status(200).send('ignored: missing metadata');
    }
    const tierConfig = TIERS[tier];
    if (!tierConfig) {
      console.error('Unknown tier in webhook:', tier);
      return res.status(200).send('ignored: unknown tier');
    }

    // Idempotency — if we've already recorded this exact session for this user,
    // skip. Stripe occasionally replays events; this prevents expiry from being
    // pushed forward repeatedly.
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    const existing = userDoc.exists
      && userDoc.data().payments
      && userDoc.data().payments[`${tierConfig.field}-stripe-session`];
    if (existing === session.id) {
      console.log('Already processed:', session.id);
      return res.status(200).send('already processed');
    }

    const paymentsUpdate = {
      [tierConfig.field]: 'paid',
      [`${tierConfig.field}-purchased-at`]: admin.firestore.FieldValue.serverTimestamp(),
      [`${tierConfig.field}-stripe-session`]: session.id,
      [`${tierConfig.field}-amount`]: (session.amount_total || 0) / 100,
    };
    if (tierConfig.plan) {
      paymentsUpdate[`${tierConfig.field}-plan`] = tierConfig.plan;
    }
    if (tierConfig.expiryDays) {
      const expiry = new Date(Date.now() + tierConfig.expiryDays * 24 * 60 * 60 * 1000);
      paymentsUpdate[`${tierConfig.field}-expires-at`] =
        admin.firestore.Timestamp.fromDate(expiry);
    }

    try {
      await userRef.set({ payments: paymentsUpdate }, { merge: true });
      console.log(`Granted ${tier} to user ${uid} (session ${session.id})`);
      return res.status(200).send('ok');
    } catch (err) {
      console.error('Failed to update user:', err);
      return res.status(500).send('database update failed');
    }
  });


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
        subject: 'Welcome to SHOS Med — verify your email',
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
        subject: 'Verify your email — SHOS Med',
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

  // 1) Delete Auth user (no-op-tolerant: ignore "not found")
  try {
    await admin.auth().deleteUser(targetUid);
    summary.authDeleted = true;
  } catch (err) {
    if (err.code !== 'auth/user-not-found') {
      console.error('[deleteUser] auth.deleteUser failed:', err);
      throw new functions.https.HttpsError('internal', err.message);
    }
  }

  // 2) Delete known sub-collections under users/{uid}/...
  //    We don't need a recursive-delete tool here — the well-known
  //    sub-collections are qbankData and qbankTests.
  const userRef = db.collection('users').doc(targetUid);
  for (const sub of ['qbankData', 'qbankTests']) {
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
    // Non-fatal: Auth was already deleted, user can't log in regardless.
  }

  console.log('[deleteUser]', targetUid, summary);
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
