const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();
const db = admin.firestore();

// Tier → Firestore field mapping. Keep in sync with the existing
// users/{uid}.payments schema used by qbank.js and dashboard admin tools.
const TIERS = {
  'full-access': {
    field: 'exam-bank',
    plan: 'full-access',
    expiryDays: 180,
  },
  'strategy-session': {
    field: 'strategy-session',
    plan: null,
    expiryDays: null,
  },
  'apply-lf3': {
    field: 'apply-lf3',
    plan: null,
    expiryDays: null,
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
      return {
        id: u.uid,
        email: profile.email || u.email || '',
        name: profile.name || u.displayName || '',
        path: profile.path || null,
        payments: profile.payments || {},
        createdAtMs,                              // ms since epoch (always set)
        lastSignInMs,                             // for debug / future use
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
