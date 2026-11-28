const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const emails = require('./emails');
const payments = require('./payments');
const integrity = require('./email-integrity');
const identity = require('./identity');
const isolation = require('./test-isolation');
// Imported from the firestore entry point rather than reached for as
// FieldValue. The namespaced statics are the legacy surface:
// they are absent under the Functions emulator, which proxies the main
// firebase-admin module, and they were removed outright in firebase-admin
// v13. Taking them from here means the same code runs locally, runs in
// production, and survives the next major version.
const { FieldValue, FieldPath, Timestamp } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

admin.initializeApp();
const db = admin.firestore();

// A confirmed address, read from the account rather than from the token.
// Same reasoning as the checkout gate: a token is a snapshot good for up to
// an hour, so a tab opened before the address was confirmed still carries the
// old answer, in both directions. An administrator or a reviewer is exempt
// from nothing here; the exemption they have is on CONTENT, further down.
async function requireVerifiedEmail(context) {
  let account;
  try {
    account = await identity.liveAccount(context.auth.uid);
  } catch (err) {
    throw new functions.https.HttpsError(
      'unauthenticated', 'Your account could not be read. Please sign in again.');
  }
  if (!account.email || !account.emailVerified) {
    throw new functions.https.HttpsError('failed-precondition', 'verify-email-required');
  }
}

// Admin authorization, in one place. Membership of the list is necessary but
// no longer sufficient: the address must also be verified, because an
// unverified address is a string somebody typed, not a mailbox anyone has
// proved they hold. A server-set custom claim satisfies it outright.
function requireAdmin(context) {
  identity.requireAdmin(context, function (code, message) {
    return new functions.https.HttpsError(code, message);
  });
}

// ============================================================================
// Mock-exam private data cache.
// The full exam JSONs (with correct answers + explanations) live in
// functions/exam-data/, which is bundled with the function code and not
// deployed to Firebase Hosting. Loaded lazily on first call.
// ============================================================================
// Authorization is defined once, in ./identity.js. These are aliases kept so
// the mock-exam code below reads the same as it always did; they are NOT a
// second copy of the list.
const MOCK_ADMIN_EMAILS = identity.ADMIN_EMAILS;
const MOCK_REVIEWER_EMAILS = identity.REVIEWER_EMAILS;
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

  // ---- Application Support à la carte (Step 3 on the Med School
  // path). One-time purchases, no plan and no expiry — same shape as the
  // Match Mentorship add-ons above.
  //
  // Apply for LF3 is $199 and has its own Stripe Price (lookup_key
  // 'apply-lf3'). The other three are $99 and share ONE Price
  // (lookup_key 'application-addon'), the same way the residency add-ons
  // share 'mentorship-addon'. They are kept separate from the residency
  // $99 Price so a med-school buyer's receipt does not read
  // "Match Mentorship Add-On".
  //
  // LF3 Application Fee Payment deliberately does NOT share
  // 'application-addon'. Roughly $91 of its $149 is the faculty's 2,000 CZK
  // admission fee passing through us, not revenue, so it needs its own line
  // in Stripe reporting. Sharing a Price would make the two impossible to
  // separate at reconciliation or at tax time. It was $99 until 2026-11-18;
  // the amount lives on the Stripe Price, so a repricing never touches this
  // file beyond the comments.
  //
  // Every lookup key here must exist on an ACTIVE Price in Stripe or checkout
  // fails at click time with "No active Stripe price found for lookup_key".
  'apply-lf3-service': {         // Apply for LF3 — $199
    field: 'apply-lf3-service', priceKey: 'apply-lf3', plan: null, expiryDays: null,
  },
  'mock-exam-interview': {       // Mock Interview + Feedback
    field: 'mock-exam-interview', priceKey: 'application-addon', plan: null, expiryDays: null,
  },
  'life-in-prague': {            // Life in Prague
    field: 'life-in-prague', priceKey: 'application-addon', plan: null, expiryDays: null,
  },
  'applicant-mentor': {          // 1-on-1 Mentor Session (applicant)
    field: 'applicant-mentor', priceKey: 'application-addon', plan: null, expiryDays: null,
  },
  // Sold only to applicants who already hold 'apply-lf3-service'. The store
  // enforces that in the UI; this map stays permissive so an admin can still
  // record the purchase manually for someone who registered off-site.
  // NOTE the two different identifiers here, which must not be conflated:
  //   the TIER KEY 'lf3-application-fee' is ours. It is the Firestore
  //     entitlement field, the ledger `tier` and the product-catalog.js key.
  //     Renaming it would orphan every purchase already recorded, so it is
  //     fixed forever.
  //   the PRICE KEY is Stripe's lookup_key, and is free to change. It moved to
  //     'lf3-application-fee-v2' on 2026-11-18 with the repricing: Stripe
  //     keeps a lookup_key attached to a price even after that price is
  //     archived, so the retired $99 price still holds the original
  //     'lf3-application-fee' and it cannot be reused.
  'lf3-application-fee': {       // LF3 Application Fee Payment — $149
    field: 'lf3-application-fee', priceKey: 'lf3-application-fee-v2', plan: null, expiryDays: null,
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

    // A purchase creates a receipt, an access grant and a support
    // relationship, and every one of them travels by email. An unverified
    // address is one we have no evidence can receive any of it.
    //
    // This gate is on STARTING A NEW PURCHASE only. Access already bought
    // is untouched: the entitlement lives on the user doc and is read
    // elsewhere, so an existing customer with an unconfirmed address keeps
    // everything they paid for and is merely asked to confirm it.
    //
    // Read it from Firebase Auth, NOT from the ID token. A token is a
    // snapshot that stays valid for up to an hour, so a browser tab opened
    // before an address was corrected still presents the OLD email and the
    // OLD email_verified claim. Taking money on the strength of that
    // snapshot is exactly how a receipt and an access grant go to an address
    // nobody can read. So ask Firebase what is true now.
    let account;
    try {
      account = await identity.liveAccount(context.auth.uid);
    } catch (err) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Your account could not be read. Please sign in again.'
      );
    }
    if (!account.email || !account.emailVerified) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'verify-email-required'
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

    // The uid is the diagnostic that matters: it identifies the account
    // without putting anybody's address in Cloud Logging. The key prefix and
    // length used to be logged here as a configuration aid; they said
    // test-vs-live mode out loud on every single checkout, which is a detail
    // about our payment setup that a log reader has no need for.
    const secret = process.env.STRIPE_SECRET_KEY || '';
    const stubStripe = isolation.stubStripe();
    console.log(`createCheckoutSession invoked: tier=${tier}, uid=${context.auth.uid}`);
    if (!stubStripe && (!secret || !secret.startsWith('sk_'))) {
      console.error('STRIPE_SECRET_KEY is missing or malformed');
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Stripe secret key is not configured correctly on the server.'
      );
    }

    const stripe = stubStripe ? localStripeStub() : Stripe(secret);

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
        // The address verified a moment ago, not whatever the token held.
        customer_email: account.email,
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
    FieldValue: FieldValue,
    Timestamp: Timestamp,
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

async function sendEmail({ to, subject, html, text, replyTo, force }) {
  // Under the emulator the transport is swapped for an outbox collection, so
  // nothing leaves the machine. Everything above the transport — suppression,
  // the message index — still runs, because that is the part worth testing.
  const stubbed = isolation.stubEmail();
  const apiKey = process.env.RESEND_API_KEY;
  if (!stubbed && !apiKey) {
    // No recipient in this line: a missing API key is a configuration fact
    // and says nothing about who we were writing to.
    console.warn('[email] RESEND_API_KEY not configured — skipping send');
    return { skipped: true };
  }

  // Never keep firing automated mail at an address the provider has told us
  // is permanently dead. Every such send is another hard bounce counted
  // against the sending domain, which is how a reputation gets wrecked for
  // everybody's receipts. `force` exists for the one case that must still
  // go out: a verification sent to a NEWLY corrected address.
  if (!force) {
    try {
      const key = integrity.addressKey(to);
      if (key) {
        const snap = await db.collection('emailDelivery').doc(key).get();
        const rec = snap.exists ? snap.data() : null;
        // A spam complaint counts here too, not just a hard bounce. Before
        // the suppression split this only looked for a bounce, so somebody
        // who reported us kept receiving mail.
        if (integrity.isSuppressed(rec)) {
          console.warn('[email] suppressed —', (rec && rec.suppressedReason) || 'previous hard bounce');
          return { skipped: true, suppressed: true };
        }
      }
    } catch (err) {
      // A failed lookup must not stop the mail. Sending is the default.
      console.warn('[email] suppression check skipped:', err.message);
    }
  }
  try {
    const payload = {
      from: EMAIL_FROM,
      to: [to],
      subject,
      html,
      text,
      // Admin notifications reply straight to the person who wrote in;
      // everything else replies to the shared inbox.
      reply_to: replyTo || EMAIL_REPLY_TO,
    };
    let body;
    if (stubbed) {
      body = { id: 'stub_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) };
      await db.collection('emulatorOutbox').doc(body.id).set({
        to: to,
        subject: subject || '',
        text: String(text || '').slice(0, 4000),
        replyTo: payload.reply_to,
        force: !!force,
        at: FieldValue.serverTimestamp(),
      });
    } else {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error('[email] Resend API error', res.status, errText);
        return { ok: false, status: res.status, error: errText };
      }
      body = await res.json();
    }
    // "Accepted for sending" is the whole of what just happened. Whether it
    // was DELIVERED is a different fact that only a webhook event settles,
    // so this line must not claim it.
    console.log('[email] accepted for sending id=', body.id);
    // Index the message so a later webhook event can be attributed to an
    // address and a subject without trusting anything in the event payload
    // beyond its signature.
    try {
      const key = integrity.addressKey(to);
      if (body.id && key) {
        await db.collection('emailMessages').doc(String(body.id)).set({
          address: key,
          subject: subject || '',
          sentAt: FieldValue.serverTimestamp()
        }, { merge: true });
      }
    } catch (err) {
      console.warn('[email] message index write skipped:', err.message);
    }
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
          { welcomeEmailSentAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      }
    } catch (err) {
      // CRITICAL: never throw here — signup must succeed even if email fails.
      console.error('[onUserCreated] email send failed for uid=', user.uid, err);
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

    // Server-enforced limit. The 60-second countdown in the browser is a
    // courtesy to the person; this is the thing that holds when somebody
    // calls the endpoint directly in a loop.
    const limitRef = db.collection('users').doc(context.auth.uid);
    let verdict;
    try {
      verdict = await db.runTransaction(async (tx) => {
        const snap = await tx.get(limitRef);
        const log = snap.exists ? (snap.data() || {}).verifySendWindow : null;
        const r = integrity.rateLimitWindow(log, Date.now(), { max: 5, windowMs: 60 * 60 * 1000 });
        if (r.allowed) tx.set(limitRef, { verifySendWindow: r.next }, { merge: true });
        return r;
      });
    } catch (err) {
      console.error('[resendVerification] rate-limit transaction failed:', err);
      verdict = { allowed: true };            // never lock someone out on our bug
    }
    if (!verdict.allowed) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        'Too many verification emails requested. Try again in ' +
        Math.ceil(verdict.retryAfterMs / 60000) + ' minutes.'
      );
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
const ADMIN_EMAILS = new Set(identity.ADMIN_EMAILS);

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
  requireAdmin(context);
  const callerEmail = (context.auth.token && context.auth.token.email) || '';
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
  requireAdmin(context);
  const callerEmail = (context.auth.token && context.auth.token.email) || '';

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
        .where(FieldPath.documentId(), 'in', slice)
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
  requireAdmin(context);
  const callerEmail = (context.auth.token && context.auth.token.email) || '';

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
//   1. { dryRun: true }  (DEFAULT) — reads Stripe, writes NOTHING, and
//      returns every paid Checkout Session with its verification result and
//      whether it is already in the ledger.
//   2. { dryRun: false, sessionIds: [...] } — records exactly the sessions
//      the admin reviewed. Each is re-fetched from Stripe and re-verified at
//      write time; a write run cannot scan.
//
// All logic lives in payments.js (tested in test/payments.test.js):
//   checkReconcileCaller      signed in + admin email + email_verified
//   parseReconcileRequest     only dryRun / sessionIds / sinceDays accepted;
//                             any other key (an amount, an email…) is rejected
//   verifySessionForReconcile Stripe says complete + paid + live, the
//                             PaymentIntent succeeded for the same amount and
//                             currency, the UID exists in Auth, and Stripe's
//                             email matches that account
//   reconcileSessions         records through the same idempotent path as the
//                             webhook; never writes QBank access
// ============================================================================
exports.reconcileStripePayments = functions
  .runWith({ secrets: ['STRIPE_SECRET_KEY'], timeoutSeconds: 300 })
  .https.onCall(async (data, context) => {
    const denied = payments.checkReconcileCaller(context.auth, ADMIN_EMAILS);
    if (denied) throw new functions.https.HttpsError(denied.code, denied.message);

    const req = payments.parseReconcileRequest(data);
    if (!req.ok) throw new functions.https.HttpsError('invalid-argument', req.message);

    const secret = process.env.STRIPE_SECRET_KEY || '';
    if (!secret.startsWith('sk_')) {
      throw new functions.https.HttpsError('failed-precondition', 'Stripe secret key is not configured.');
    }
    const stripe = Stripe(secret);
    const EXPAND = ['payment_intent.latest_charge'];

    // ---- 1. Read sessions from Stripe (the only source of payment facts)
    const sessions = [];
    try {
      if (req.sessionIds) {
        for (const id of req.sessionIds) {
          sessions.push(await stripe.checkout.sessions.retrieve(id, { expand: EXPAND }));
        }
      } else {
        const gte = Math.floor(Date.now() / 1000) - req.sinceDays * 24 * 60 * 60;
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

    // ---- 2. Verify each against Stripe + Firebase Auth, then (optionally) record
    const report = await payments.reconcileSessions(db, sessions, {
      dryRun: req.dryRun,
      reportUnpaid: !!req.sessionIds,
      getAuthUser: async (uid) => {
        try { return await admin.auth().getUser(uid); } catch (_) { return null; }
      },
    }, paymentDeps());

    const summary = {
      dryRun: req.dryRun,
      scanned: sessions.length,
      sinceDays: req.sessionIds ? null : req.sinceDays,
      sessions: report,
    };
    console.log('[reconcile] by uid=', context.auth.uid, JSON.stringify(summary));
    return summary;
  });

// ============================================================================
// onMessageCreated / onBookingCreated
// ----------------------------------------------------------------------------
// Emails the shared inbox whenever a contact message or a booking request is
// saved, so nothing sits in the admin Inbox unnoticed.
//
// Why a server trigger rather than the browser: the public contact modal used
// to be the only thing sending mail (via Web3Forms, from the visitor's
// browser), the dashboard's own contact form sent nothing at all, and
// bookings sent nothing. A Firestore trigger fires for every path, cannot be
// skipped by an ad blocker or a closed tab, and never tells the visitor the
// message went through when it did not.
//
// Reply-To is the person who wrote in, so replying from any mail client
// answers them directly. Cost: the existing Resend free tier, same as the
// welcome email.
// ============================================================================
const NOTIFY_TO = 'contact@shosmed.com';
const ADMIN_INBOX_URL = 'https://shosmed.com/dashboard.html?view=admin';

// Readable labels for the stored category code.
const MESSAGE_CATEGORY_LABELS = {
  'booking': 'Book a Service',
  'content-question': 'Content / Academic Question',
  'technical-issue': 'Technical Issue',
  'billing': 'Billing & Payments',
  'partnership': 'Partnership Inquiry',
  'general': 'General Question',
};

exports.onMessageCreated = functions
  .runWith({ secrets: ['RESEND_API_KEY'] })
  .firestore.document('messages/{messageId}')
  .onCreate(async (snap) => {
    const m = snap.data() || {};
    try {
      const result = await sendEmail({
        to: NOTIFY_TO,
        replyTo: m.email || undefined,
        subject: `[SHOS] ${m.subject || 'New message'} — ${m.name || 'website visitor'}`,
        html: emails.adminAlertHtml({
          kind: 'message', name: m.name, email: m.email, body: m.body, inboxUrl: ADMIN_INBOX_URL,
          lines: [
            ['Subject', m.subject],
            ['Category', MESSAGE_CATEGORY_LABELS[m.category] || m.category],
            ['Signed in', m.userId ? 'yes' : 'no'],
          ],
        }),
        text: emails.adminAlertText({
          kind: 'message', name: m.name, email: m.email, body: m.body, inboxUrl: ADMIN_INBOX_URL,
          lines: [
            ['Subject', m.subject],
            ['Category', MESSAGE_CATEGORY_LABELS[m.category] || m.category],
            ['Signed in', m.userId ? 'yes' : 'no'],
          ],
        }),
      });
      // The document id is enough to find the message in the admin panel.
      // The sender address does not need to be in Cloud Logging to do that.
      console.log('[onMessageCreated]', snap.id,
        result && result.ok ? 'notified' : (result && result.skipped ? 'skipped (no API key)' : 'FAILED'));
    } catch (err) {
      // Never throw: the message is already saved, and a retry storm would
      // only duplicate emails.
      console.error('[onMessageCreated] notification failed for', snap.id, err);
    }
    return null;
  });

exports.onBookingCreated = functions
  .runWith({ secrets: ['RESEND_API_KEY'] })
  .firestore.document('bookings/{bookingId}')
  .onCreate(async (snap) => {
    const b = snap.data() || {};
    try {
      const when = [b.preferredDate, b.preferredTime].filter(Boolean).join(' ');
      const lines = [
        ['Service', b.serviceName || b.serviceType],
        ['Price', typeof b.price === 'number' ? (b.price === 0 ? 'Free' : '$' + b.price) : ''],
        ['Preferred', when],
        ['Timezone', b.timezone],
        ['Status', b.status],
      ];
      // Intake answers, when the service asks any.
      Object.entries(b.intakeAnswers || {}).forEach(([k, v]) => {
        if (v) lines.push([k, String(v)]);
      });
      const payload = {
        kind: 'booking', name: b.name, email: b.email, body: b.sessionGoal, inboxUrl: ADMIN_INBOX_URL, lines,
      };
      const result = await sendEmail({
        to: NOTIFY_TO,
        replyTo: b.email || undefined,
        subject: `[SHOS] Booking: ${b.serviceName || b.serviceType || 'service'} — ${b.name || 'website visitor'}`,
        html: emails.adminAlertHtml(payload),
        text: emails.adminAlertText(payload),
      });
      console.log('[onBookingCreated]', snap.id, b.serviceType, result && result.ok ? 'notified' : 'not sent');
    } catch (err) {
      console.error('[onBookingCreated] notification failed for', snap.id, err);
    }
    return null;
  });

// ============================================================================
// onPaymentRecorded
// ----------------------------------------------------------------------------
// Emails the shared inbox whenever a payment lands. Until this existed, a
// purchase made straight from the Store reached nobody: the webhook recorded
// the ledger row and granted access silently, and the only notification was
// whatever Stripe's own account settings happened to send. A payment on
// 3 Nov 2026 was processed correctly and went unnoticed for exactly that
// reason.
//
// Why a Firestore trigger on the ledger rather than a send inside the
// webhook: the webhook must answer Stripe quickly and must not fail because
// an email provider is down, and Stripe retries a non-2xx response, which
// would duplicate the mail. The ledger doc is written once per checkout
// session (its ID is the doc ID), so onCreate fires exactly once per payment,
// retries and duplicate deliveries included.
//
// Only webhook-sourced rows are mailed. `reconcileStripePayments` backfills
// historical payments into the same collection, and mailing those would send
// a burst of notices about purchases from months ago.
// ============================================================================

// Customer-facing product names, keyed by the tier in TIERS. Kept in step
// with PRODUCTS in product-catalog.js at the repo root, which the site uses;
// functions/ is deployed on its own and cannot import it.
// test/payment-notification.test.js fails if the two ever disagree.
const PRODUCT_LABELS = {
  'full-access': 'Full QBank Access',
  'apply-lf3-service': 'LF3 Entrance Exam Registration',
  'lf3-application-fee': 'LF3 Application Fee Payment',
  'mock-exam-interview': 'Mock Interview + Feedback',
  'life-in-prague': 'Life in Prague',
  'applicant-mentor': '1-on-1 Mentor Session (applicant)',
  'strategy-session': 'Strategy Session',
  'mentorship-lor': 'Letter of Rec Coaching',
  'mentorship-program-list': 'Program List Guidance',
  'mentorship-research': 'Research Strategy',
  'mentorship-cv': 'Personal Statement Review',
  'mentorship-mock-interview': 'Mock Interview Session',
  'mentorship-eras': 'ERAS CV Review',
  'usmle-step-review': 'USMLE Step Review',
};

/** Minor units to a displayable amount: 9900 USD -> "$99.00". */
function formatAmount(minorUnits, currency) {
  const n = typeof minorUnits === 'number' ? minorUnits : 0;
  const code = String(currency || 'usd').toUpperCase();
  const sign = code === 'USD' ? '$' : '';
  return sign + (n / 100).toFixed(2) + (sign ? '' : ' ' + code);
}

/**
 * Builds the notification for one ledger row. Pure, so the test can assert
 * the wording and the skip rules without Firestore or an email provider.
 * Returns null when this row must not be mailed.
 */
function buildPaymentAlert(t, opts) {
  const o = opts || {};
  if (!t || t.source !== 'webhook') return null;   // reconciliation backfill
  const product = PRODUCT_LABELS[t.tier] || t.tier || 'Unknown product';
  const amount = formatAmount(t.amountTotal, t.currency);
  const free = !t.amountTotal;
  const test = t.livemode !== true;
  const lines = [
    ['Product', product],
    ['Amount', free ? amount + ' (no charge — full promo code)' : amount],
    ['Customer', t.email || '(no email on the session)'],
    ['Tier', t.tier],
    ['Stripe session', t.sessionId],
  ];
  if (test) lines.unshift(['Mode', 'TEST — not a real payment']);
  const payload = {
    kind: 'payment',
    name: t.email || 'A customer',
    email: t.email || undefined,
    inboxUrl: o.inboxUrl || ADMIN_INBOX_URL,
    lines,
  };
  return {
    to: o.to || NOTIFY_TO,
    replyTo: t.email || undefined,
    subject: `[SHOS]${test ? ' [TEST]' : ''} Payment: ${product} — ${amount}`,
    payload,
  };
}

exports.onPaymentRecorded = functions
  .runWith({ secrets: ['RESEND_API_KEY'] })
  .firestore.document('transactions/{sessionId}')
  .onCreate(async (snap) => {
    const t = snap.data() || {};
    const alert = buildPaymentAlert(t);
    if (!alert) {
      console.log('[onPaymentRecorded]', snap.id, 'not mailed (source=' + t.source + ')');
      return null;
    }
    try {
      const result = await sendEmail({
        to: alert.to,
        replyTo: alert.replyTo,
        subject: alert.subject,
        html: emails.adminAlertHtml(alert.payload),
        text: emails.adminAlertText(alert.payload),
      });
      console.log('[onPaymentRecorded]', snap.id, t.tier,
        result && result.ok ? 'notified' : (result && result.skipped ? 'skipped (no API key)' : 'FAILED'));
    } catch (err) {
      // Never throw: the payment is already recorded and access already
      // granted. A retry storm would only duplicate the mail.
      console.error('[onPaymentRecorded] notification failed for', snap.id, err);
    }
    return null;
  });

// Exported for the test; not part of the deployed callable surface.
exports._buildPaymentAlert = buildPaymentAlert;
exports._PRODUCT_LABELS = PRODUCT_LABELS;

// ============================================================================
// qbankExpiryReminders
// ----------------------------------------------------------------------------
// Daily check for QBank access that is about to end. Sends two emails per
// access period: 30 days before and 7 days before. Which one (if any) is due
// is decided by payments.dueReminderStage, and a flag on the user record
// stops the same stage going out twice. Renewing clears those flags, so the
// next period gets its own pair.
//
// Only access with an expiry date is considered: admin grants made without a
// duration never end, so there is nothing to warn about.
//
// Cost: one Cloud Scheduler job (Google allows three free per account) and
// email through the existing Resend free tier — same path as the welcome
// email, no new spend.
// ============================================================================
exports.qbankExpiryReminders = functions
  .runWith({ secrets: ['RESEND_API_KEY'], timeoutSeconds: 300 })
  .pubsub.schedule('every day 09:00')
  .timeZone('UTC')
  .onRun(async () => {
    const now = Date.now();
    let scanned = 0, sent = 0, failed = 0;
    try {
      const snap = await db.collection('users').where('payments.exam-bank', '==', 'paid').get();
      for (const doc of snap.docs) {
        scanned++;
        const u = doc.data() || {};
        const stage = payments.dueReminderStage(u.payments, now);
        if (!stage) continue;
        const email = u.email;
        if (!email) {
          console.warn('[qbankExpiryReminders] no email on', doc.id, '- skipped');
          continue;
        }
        const expMs = payments.toMs(u.payments['exam-bank-expires-at']);
        const daysLeft = Math.ceil((expMs - now) / (24 * 60 * 60 * 1000));
        const endDate = new Date(expMs).toLocaleDateString('en-US',
          { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
        const subject = daysLeft <= 7
          ? `Your QBank access ends in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`
          : 'Your QBank access ends in a month';
        const result = await sendEmail({
          to: email,
          subject,
          html: emails.qbankExpiryHtml({ name: u.name, daysLeft, endDate }),
          text: emails.qbankExpiryText({ name: u.name, daysLeft, endDate }),
        });
        if (result && result.ok) {
          // Flag first-and-only-once per stage, so a later run this week
          // does not email the same person again.
          await doc.ref.set({
            payments: { [`exam-bank-reminder-${stage}-sent`]: FieldValue.serverTimestamp() },
          }, { merge: true });
          sent++;
          console.log(`[qbankExpiryReminders] ${stage}-day notice -> uid=${doc.id} (ends ${endDate})`);
        } else {
          // No flag written: the next daily run retries.
          failed++;
          console.error('[qbankExpiryReminders] send failed for uid=', doc.id, result && result.error);
        }
      }
    } catch (err) {
      console.error('[qbankExpiryReminders] run failed:', err);
      throw err;                                  // surfaces in the Cloud Scheduler log
    }
    console.log(`[qbankExpiryReminders] checked ${scanned} with access; sent ${sent}; failed ${failed}`);
    return null;
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
  await requireVerifiedEmail(context);
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
  const isAdmin = identity.isAdminContext(context);
  const isReviewer = MOCK_REVIEWER_EMAILS.includes(email);
  const isFree = year === cfg.freeYear;
  let isPaid = false;
  if (!isAdmin && !isReviewer && !isFree) {
    const snap = await db.collection('users').doc(uid).get();
    const p = snap.exists ? (snap.data() || {}) : {};
    // Access must be current: 'paid' with no expiry never ends, 'paid' with
    // an expiry stops at that moment (payments.qbankAccessActive).
    isPaid = payments.qbankAccessActive(p.payments, Date.now());
    if (!isPaid) {
      const ended = p.payments && p.payments['exam-bank'] === 'paid';
      throw new functions.https.HttpsError('permission-denied', ended
        ? 'Your QBank access has ended. Renew from the dashboard store to take this mock exam again.'
        : 'This mock exam requires QBank Full Access ($99). Purchase it from the dashboard store.');
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
  const now = FieldValue.serverTimestamp();
  const startedAtMs = data && Number(data.startedAtMs);
  const startedAt = startedAtMs && startedAtMs > 0
    ? Timestamp.fromMillis(startedAtMs)
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
  await requireVerifiedEmail(context);
  const callerEmail = ((context.auth.token && context.auth.token.email) || '').toLowerCase();
  const isAdmin = identity.isAdminContext(context);
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
  // Answers and explanations are paid content: once access ends they lock,
  // and come back on renewal. The attempt itself is never deleted, and the
  // free-year exam stays reviewable on the free tier.
  if (!isAdmin && !isReviewer) {
    const cfg = loadExamConfig();
    if (year !== cfg.freeYear) {
      const snap = await db.collection('users').doc(callerUid).get();
      const p = snap.exists ? (snap.data() || {}) : {};
      if (!payments.qbankAccessActive(p.payments, Date.now())) {
        throw new functions.https.HttpsError('permission-denied',
          'Your QBank access has ended. Renew from the dashboard store to see your answers and explanations again.');
      }
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


// ============================================================================
// ADMIN: correct the email address on an existing account
// ----------------------------------------------------------------------------
// For the case this was written for: an applicant typed a domain that does
// not exist, the welcome-and-verify mail hard bounced, and nobody can reach
// them. They cannot fix it themselves, because the self-service flow needs a
// signed-in session and they may never have had one.
//
// What this deliberately does NOT do:
//   - It never merges or deletes accounts. If the destination address
//     already belongs to someone, it stops and says so, without disclosing
//     anything about that other account.
//   - It never marks the new address verified. An admin correcting a typo
//     is evidence about spelling, not evidence that the applicant owns the
//     mailbox. The account comes out UNVERIFIED and a fresh verification
//     goes to the new address.
//   - It never touches Stripe. Historical transactions and a deliberately
//     different billing contact are both legitimate; they are reported,
//     not rewritten.
//
// Everything else survives, because updateUser() mutates in place: same
// UID, same password hash, same providers, same custom claims, same
// Firestore document and all its subcollections, so progress, exam
// attempts, purchases and entitlements are untouched.
//
// Idempotent by `opId`. A repeated call with the same opId returns the
// first result rather than sending a second email.
// ============================================================================
exports.adminUpdateUserEmail = functions
  .runWith({ secrets: ['RESEND_API_KEY'] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Sign in required.');
    }
    requireAdmin(context);
    const callerEmail = ((context.auth.token && context.auth.token.email) || '').toLowerCase();

    const currentEmail = String((data && data.currentEmail) || '').trim().toLowerCase();
    const newEmail = String((data && data.newEmail) || '').trim().toLowerCase();
    const reason = String((data && data.reason) || '').slice(0, 500);
    const opId = String((data && data.opId) || '').slice(0, 120);

    if (!currentEmail || !newEmail) {
      throw new functions.https.HttpsError('invalid-argument', 'Both addresses are required.');
    }
    if (currentEmail === newEmail) {
      throw new functions.https.HttpsError('invalid-argument', 'The two addresses are the same.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      throw new functions.https.HttpsError('invalid-argument', 'The new address is not a valid email address.');
    }
    if (!opId) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing opId (needed to make retries safe).');
    }

    const auditRef = db.collection('adminAuditLog').doc(opId);

    // --- replay: a retried click must not send a second email -------------
    const prior = await auditRef.get();
    if (prior.exists) {
      const p = prior.data() || {};
      if (p.outcome === 'applied' || p.outcome === 'conflict' || p.outcome === 'already-applied') {
        return Object.assign({ replayed: true }, p.result || {});
      }
    }

    async function writeAudit(outcome, result, extra) {
      try {
        await auditRef.set(Object.assign({
          action: 'admin.updateUserEmail',
          outcome: outcome,
          byUid: context.auth.uid,
          byEmail: callerEmail,
          reason: reason,
          at: FieldValue.serverTimestamp(),
          result: result || {}
        }, extra || {}), { merge: true });
      } catch (err) {
        console.error('[adminUpdateUserEmail] audit write failed:', err.message);
      }
    }

    // --- locate the account, by the exact address given -------------------
    let target = null;
    try {
      target = await admin.auth().getUserByEmail(currentEmail);
    } catch (err) {
      if (err.code !== 'auth/user-not-found') {
        console.error('[adminUpdateUserEmail] lookup failed:', err.code);
        throw new functions.https.HttpsError('internal', 'Could not look up that account.');
      }
    }

    if (!target) {
      // Maybe an earlier run already did it. Recognising that is the
      // difference between a safe retry and a confusing "not found".
      let moved = null;
      try {
        moved = await admin.auth().getUserByEmail(newEmail);
      } catch (e) { /* genuinely absent */ }
      if (moved) {
        const res = {
          ok: true, alreadyApplied: true, uid: moved.uid,
          email: moved.email, emailVerified: !!moved.emailVerified
        };
        await writeAudit('already-applied', res,
          { uid: moved.uid, fromEmail: currentEmail, toEmail: newEmail });
        return res;
      }
      await writeAudit('not-found', { ok: false, notFound: true },
        { fromEmail: currentEmail, toEmail: newEmail });
      throw new functions.https.HttpsError('not-found',
        'No account uses that address. Nothing was changed, and no account was created.');
    }

    if (data && data.expectedUid && data.expectedUid !== target.uid) {
      throw new functions.https.HttpsError('failed-precondition',
        'That address belongs to a different account than expected. Nothing was changed.');
    }

    // --- destination conflict ---------------------------------------------
    let holder = null;
    try {
      holder = await admin.auth().getUserByEmail(newEmail);
    } catch (e) { /* free */ }
    if (holder && holder.uid !== target.uid) {
      await writeAudit('conflict', { ok: false, conflict: true, uid: target.uid },
        { uid: target.uid, fromEmail: currentEmail, toEmail: newEmail, conflictUid: holder.uid });
      throw new functions.https.HttpsError('already-exists',
        'Another account already uses the corrected address. Nothing was changed and nothing was merged. ' +
        'Decide what should happen to the two accounts before retrying.');
    }

    // --- apply --------------------------------------------------------------
    await writeAudit('started', { uid: target.uid },
      { uid: target.uid, fromEmail: currentEmail, toEmail: newEmail,
        beforeVerified: !!target.emailVerified });

    try {
      await admin.auth().updateUser(target.uid, { email: newEmail, emailVerified: false });
    } catch (err) {
      await writeAudit('failed', { ok: false, stage: 'auth', code: err.code });
      if (err.code === 'auth/email-already-exists') {
        throw new functions.https.HttpsError('already-exists',
          'Another account already uses that address. Nothing was changed.');
      }
      throw new functions.https.HttpsError('internal', 'Could not update the account.');
    }

    // Profile copy. A failure here leaves the account correct and the
    // report stale, which is recoverable; it must not undo the Auth change.
    let profileSynced = false;
    try {
      await db.collection('users').doc(target.uid).set({
        email: newEmail,
        emailUpdatedAt: FieldValue.serverTimestamp(),
        emailCorrectedByAdmin: callerEmail
      }, { merge: true });
      profileSynced = true;
    } catch (err) {
      console.error('[adminUpdateUserEmail] profile sync failed:', err.message);
    }

    // Fresh verification, to the NEW address. `force` because the OLD
    // address may be suppressed and that must not block this one; the
    // suppression record is keyed by address, so the new one is unaffected.
    let emailQueued = false;
    let emailId = null;
    try {
      const verifyLink = await admin.auth().generateEmailVerificationLink(newEmail, {
        url: 'https://shosmed.com/dashboard.html'
      });
      const profile = await loadProfile(target.uid);
      const who = profile.name || target.displayName || '';
      const sent = await sendEmail({
        to: newEmail,
        subject: 'Please confirm your email | SHOS Med',
        html: emails.verificationEmailHtml({ name: who, verifyLink: verifyLink }),
        text: emails.verificationEmailText({ name: who, verifyLink: verifyLink }),
        force: true
      });
      emailQueued = !!sent.ok;
      emailId = sent.id || null;
    } catch (err) {
      console.error('[adminUpdateUserEmail] verification send failed:', err.message);
    }

    // What exists on the billing side, reported and not touched.
    let stripe = { inspected: true, action: 'none', transactions: 0 };
    try {
      const tx = await db.collection('transactions').where('uid', '==', target.uid).limit(50).get();
      stripe.transactions = tx.size;
      stripe.note = tx.size
        ? 'Historical transactions left exactly as they are. The billing contact in Stripe was not changed: it may differ on purpose.'
        : 'No transactions on this account.';
    } catch (err) {
      stripe = { inspected: false, action: 'none', error: err.message };
    }

    const result = {
      ok: true,
      uid: target.uid,                 // unchanged, by construction
      fromEmail: currentEmail,
      toEmail: newEmail,
      emailVerified: false,            // never asserted by an admin edit
      profileSynced: profileSynced,
      verificationQueued: emailQueued, // accepted for sending, NOT delivered
      verificationMessageId: emailId,
      stripe: stripe
    };
    await writeAudit('applied', result,
      { uid: target.uid, fromEmail: currentEmail, toEmail: newEmail });
    return result;
  });


// ============================================================================
// Resend delivery webhook
// ----------------------------------------------------------------------------
// Turns "we handed it to Resend" into knowledge of what happened to the
// message. Delivery is tracked per ADDRESS, never per account, and that is
// what stops a late bounce for a mistyped address being read as a problem
// with the corrected one.
//
// Setup (none of it deployable from here):
//   1. firebase functions:secrets:set RESEND_WEBHOOK_SECRET     <- whsec_...
//   2. Resend dashboard -> Webhooks -> add the deployed URL, subscribed to
//      email.sent, email.delivered, email.delivery_delayed,
//      email.bounced, email.complained, email.failed
// Until both exist this endpoint answers 503 and changes nothing.
// ============================================================================
exports.resendWebhook = functions
  .runWith({ secrets: ['RESEND_WEBHOOK_SECRET'] })
  .https.onRequest(async (req, res) => {
    if (req.method !== 'POST') { res.status(405).send('Method not allowed'); return; }

    // Trimmed on the way in. A signing secret gets pasted into a console
    // field or piped from a file, and both pick up stray whitespace.
    // Node's base64 decoder happens to skip it, so this is belt and
    // braces rather than a fix, but a secret that differs from what was
    // pasted by one invisible character is a bad afternoon.
    const secret = (process.env.RESEND_WEBHOOK_SECRET || '').trim();
    if (!secret) {
      console.warn('[resendWebhook] RESEND_WEBHOOK_SECRET not configured');
      res.status(503).send('Not configured');
      return;
    }

    const check = integrity.verifySvixSignature({
      secret: secret,
      id: req.get('svix-id') || req.get('webhook-id'),
      timestamp: req.get('svix-timestamp') || req.get('webhook-timestamp'),
      signatureHeader: req.get('svix-signature') || req.get('webhook-signature'),
      body: req.rawBody
    });
    if (!check.ok) {
      // Deliberately terse to the caller. A detailed rejection is a free
      // oracle for anyone probing the endpoint.
      console.warn('[resendWebhook] rejected:', check.reason);
      res.status(401).send('Invalid signature');
      return;
    }

    let event;
    try {
      event = JSON.parse(req.rawBody.toString('utf8'));
    } catch (err) {
      res.status(400).send('Bad JSON');
      return;
    }

    const eventId = req.get('svix-id') || req.get('webhook-id');
    const parsed = integrity.classifyResendEvent(event);
    if (!parsed) { res.status(200).send('Ignored'); return; }

    // Retries are normal and expected. Claiming the event id first makes
    // the handler run at most once per event.
    const seenRef = db.collection('emailEvents').doc(String(eventId));
    try {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(seenRef);
        if (snap.exists) throw new Error('duplicate');
        tx.set(seenRef, {
          type: parsed.type,
          address: parsed.recipient || null,
          messageId: parsed.messageId || null,
          at: FieldValue.serverTimestamp()
        });
      });
    } catch (err) {
      if (err.message === 'duplicate') { res.status(200).send('Already handled'); return; }
      console.error('[resendWebhook] dedupe failed:', err.message);
      res.status(500).send('Retry');
      return;
    }

    // Prefer the address recorded when the message was sent over the one in
    // the payload: it is the address we actually addressed.
    let address = parsed.recipient;
    if (parsed.messageId) {
      try {
        const m = await db.collection('emailMessages').doc(String(parsed.messageId)).get();
        if (m.exists && (m.data() || {}).address) address = m.data().address;
      } catch (e) { /* fall back to the payload */ }
    }
    const key = integrity.addressKey(address);
    if (!key) { res.status(200).send('No recipient'); return; }

    const ref = db.collection('emailDelivery').doc(key);
    let patch = null;
    try {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const existing = snap.exists ? snap.data() : null;
        // mergeDeliveryRecord keeps two things apart: the latest MESSAGE
        // outcome, which is time-ordered and can move in any direction, and
        // whether the ADDRESS is suppressed, which is sticky and is never
        // cleared by a later delivery.
        patch = integrity.mergeDeliveryRecord(existing, parsed);
        if (!patch) return;                       // older or redundant event
        const write = Object.assign({}, patch, {
          address: key,
          updatedAt: FieldValue.serverTimestamp(),
        });
        tx.set(ref, write, { merge: true });
      });
    } catch (err) {
      console.error('[resendWebhook] delivery write failed:', err.message);
      res.status(500).send('Retry');
      return;
    }

    // Mirror onto the account ONLY while this is still the address on it.
    // The match is the safeguard: a bounce for an address somebody has
    // since corrected away from will not match, so it cannot taint the new
    // one.
    try {
      const q = await db.collection('users').where('email', '==', key).limit(5).get();
      const stamp = {
        emailDeliveryAddress: key,
        emailDeliveryAt: FieldValue.serverTimestamp()
      };
      // Only move the message status when the merge actually moved it. The
      // mirror used to stamp parsed.status unconditionally, which meant a
      // later email.delivered overwrote a complaint and the admin panel
      // forgot it, even though the delivery record kept it.
      if (patch && patch.status) {
        stamp.emailDeliveryStatus = patch.status;
        stamp.emailDeliveryPermanent = !!patch.permanent;
      }
      // Suppression is sticky here too, and is never written back to false.
      const suppression = integrity.suppressionFromEvent(parsed);
      if (suppression) {
        stamp.emailSuppressed = true;
        stamp.emailSuppressedReason = suppression.reason;
      }
      await Promise.all(q.docs.map(function (d) { return d.ref.set(stamp, { merge: true }); }));
    } catch (err) {
      console.warn('[resendWebhook] account mirror skipped:', err.message);
    }

    res.status(200).send('OK');
  });

// ============================================================================
// localStripeStub: the Stripe client used when running under the emulator.
//
// Even Stripe's own test mode is a real account on a real network, and a
// local test run has no business reaching it: it needs credentials to be
// present, it leaves records behind, and it fails when offline. The stub
// answers the two calls createCheckoutSession makes, shaped exactly as the
// real client shapes them, so the code under test takes the same path.
//
// It is unreachable in production: isolation.stubStripe() is false unless the
// process is inside the Functions emulator, and it throws outright if a live
// key is present there.
// ============================================================================
function localStripeStub() {
  return {
    prices: {
      list: async function (args) {
        const key = (args && args.lookup_keys && args.lookup_keys[0]) || 'unknown';
        return { data: [{ id: 'price_stub_' + key, lookup_key: key }] };
      },
    },
    checkout: {
      sessions: {
        create: async function (args) {
          const id = 'cs_stub_' + Date.now();
          // Record exactly what the real client would have been asked to
          // charge, so a test can assert WHICH address the receipt would
          // have gone to rather than taking the function's word for it.
          try {
            await db.collection('emulatorStripeSessions').doc(id).set({
              customer_email: (args && args.customer_email) || null,
              client_reference_id: (args && args.client_reference_id) || null,
              metadata: (args && args.metadata) || {},
              at: FieldValue.serverTimestamp(),
            });
          } catch (e) { /* a test convenience, never a failure path */ }
          return {
            id: id,
            url: 'https://stripe.test.invalid/checkout/' + id,
            customer_email: args && args.customer_email,
            client_reference_id: args && args.client_reference_id,
            metadata: (args && args.metadata) || {},
          };
        },
      },
    },
  };
}

// ============================================================================
// submitContactMessage: the only way a contact message gets into Firestore.
//
// It used to be a direct client write, with `allow create: if true` on the
// messages collection and a hidden honeypot field in the form as the only
// defence. A honeypot filters careless bots; it is not a control. Anybody
// holding the public Firebase config — which is public by design, it ships in
// every page — could write unlimited documents into that collection from a
// console, and each one fires onMessageCreated, which sends mail. The cost of
// that was real and was paid in sending reputation.
//
// So validation and the rate limit now live here, on the server, and the rule
// that permitted the direct write is `create: if false`. Moving the check
// without closing the old path would have left the bypass in place and just
// added a second door, which is why both halves ship together.
//
// It stays callable WITHOUT authentication on purpose: a prospective
// applicant who has not signed up is precisely who the contact form is for.
// ============================================================================
const CONTACT_LIMITS = { max: 5, windowMs: 60 * 60 * 1000 };

function callerIpKey(context) {
  const req = context && context.rawRequest;
  const headers = (req && req.headers) || {};
  const fwd = headers['x-forwarded-for'] || '';
  const raw = String(fwd).split(',')[0].trim() || (req && req.ip) || '';
  if (!raw) return null;
  // A Firestore document id may not contain "/", and IPv6 addresses are full
  // of colons. Flatten to something plainly safe rather than trusting the
  // shape of whatever arrived in a header.
  const key = raw.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 60);
  return key || null;
}

// No secrets bound: this function stores the message and returns. The
// notification email is sent by onMessageCreated, which has the key it needs.
exports.submitContactMessage = functions.https.onCall(async (data, context) => {
    const d = data || {};

    // A person cannot fill in a field they cannot see. Answer with success so
    // a bot learns nothing from the difference.
    if (d.website) return { ok: true, id: null };

    const name = String(d.name || '').trim().slice(0, 200);
    const email = String(d.email || '').trim().slice(0, 200);
    const body = String(d.body || '').trim().slice(0, 5000);
    const subject = String(d.subject || '').trim().slice(0, 300);
    const category = String(d.category || 'general').trim().slice(0, 60);

    if (name.length < 2) {
      throw new functions.https.HttpsError('invalid-argument', 'Please tell us your name.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      throw new functions.https.HttpsError('invalid-argument', 'Please enter a valid email address.');
    }
    if (body.length < 5) {
      throw new functions.https.HttpsError('invalid-argument', 'Please write your message.');
    }

    // Rate limit on TWO keys, and a refusal on either one is a refusal.
    //
    // Source address alone is not enough. It can be absent entirely (the
    // emulator supplies no forwarding header, which silently disabled the
    // whole limit and was caught only because a test flooded it), it is
    // shared by everyone behind one NAT, and it is the easiest thing here for
    // a determined sender to rotate. The submitted address is always present,
    // so it always constrains.
    //
    // A transaction per key, because two simultaneous submissions that both
    // read a count of 4 would otherwise both write 5.
    const limitKeys = [];
    const ipKey = callerIpKey(context);
    if (ipKey) limitKeys.push('ip_' + ipKey);
    const emailKey = integrity.addressKey(email);
    if (emailKey) limitKeys.push('addr_' + emailKey.replace(/[^a-z0-9]/g, '_').slice(0, 80));

    for (const key of limitKeys) {
      const ref = db.collection('contactRateLimit').doc(key);
      const verdict = await db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const r = integrity.rateLimitWindow(
          snap.exists ? snap.data() : null, Date.now(), CONTACT_LIMITS);
        if (r.allowed) tx.set(ref, r.next, { merge: true });
        return r;
      });
      if (!verdict.allowed) {
        throw new functions.https.HttpsError(
          'resource-exhausted',
          'That is a lot of messages in a short time. Please wait a little, '
          + 'or write to contact@shosmed.com directly.'
        );
      }
    }

    const doc = {
      userId: (context.auth && context.auth.uid) || null,
      name: name,
      email: email,
      category: category,
      subject: subject,
      body: body,
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
      repliedAt: null,
      adminNotes: '',
      source: 'submitContactMessage',
    };
    // Contact-form reason identifier (contact-modal.js REASONS key), used by
    // the admin panel to assign the message to an audience. Only a short
    // lowercase key is accepted; anything else is simply not stored.
    if (typeof d.reasonKey === 'string' && /^[a-z0-9-]{1,40}$/.test(d.reasonKey)) {
      doc.reasonKey = d.reasonKey;
    }

    const written = await db.collection('messages').add(doc);
    return { ok: true, id: written.id };
  });
