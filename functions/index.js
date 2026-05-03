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

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const prices = await stripe.prices.list({
      lookup_keys: [tier],
      active: true,
      limit: 1,
    });
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

    const session = await stripe.checkout.sessions.create({
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
