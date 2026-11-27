'use strict';
/* test-isolation.js — the wall between a local test run and the real world.
 * ---------------------------------------------------------------------------
 * This file exists because of a specific mistake: a local preview was pointed
 * at the live Firebase project, a contact form was exercised against it, and a
 * real message landed in the real inbox. Nothing in the code stopped it,
 * because nothing in the code knew the difference.
 *
 * The rule here is that isolation must be PROVEN, not assumed. A test run does
 * not get to proceed because it looks local; it proceeds because the project
 * id is a `demo-` project (which the Firebase emulators refuse to connect to
 * any real backend for), the emulator host variables are set, and no live
 * credential is anywhere in the environment. If any of that is missing the run
 * stops with a message naming what is missing.
 *
 * The failure mode this is built against is the quiet one: a test that passes
 * while silently talking to production, or an email that is "sent" during a
 * test and actually arrives. Both of those are worse than a test that refuses
 * to start, so this module fails loudly and early.
 */

// Shapes that mean "this is a real credential for a real service". Matching
// one of these during an emulated run is a hard stop, not a warning: the only
// reason a live key would be present is that someone wired the wrong env file,
// and that is exactly the accident this guards.
const LIVE_CREDENTIALS = [
  { name: 'RESEND_API_KEY', live: /^re_/i, why: 'a real Resend API key sends real email' },
  { name: 'STRIPE_SECRET_KEY', live: /^sk_live_/i, why: 'a live Stripe key moves real money' },
];

function projectId() {
  return process.env.GCLOUD_PROJECT
    || process.env.GOOGLE_CLOUD_PROJECT
    || (function () {
      try { return JSON.parse(process.env.FIREBASE_CONFIG || '{}').projectId || ''; }
      catch (e) { return ''; }
    })()
    || '';
}

/* A `demo-` prefix is not a naming convention, it is a switch: the Firebase
   emulator suite treats such a project as having no cloud counterpart and
   will not reach out to one even if credentials are lying around. */
function isDemoProject() {
  return /^demo-/.test(projectId());
}

function emulatorHosts() {
  return {
    firestore: process.env.FIRESTORE_EMULATOR_HOST || '',
    auth: process.env.FIREBASE_AUTH_EMULATOR_HOST || '',
  };
}

/* True when this code is running inside the Functions emulator. Used to decide
   whether outbound calls go to a stub. Deliberately does NOT consider the
   project id: a real project running in the emulator is still the emulator,
   and we still must not send mail from it. */
function isEmulated() {
  if (process.env.FUNCTIONS_EMULATOR === 'true') return true;
  const h = emulatorHosts();
  return !!(h.firestore || h.auth);
}

/* Call this at the top of every local test entry point. Returns a description
   of the isolation on success; throws with the exact deficiency on failure. */
function assertIsolated(opts) {
  const need = (opts && opts.require) || ['firestore', 'auth'];
  const problems = [];

  if (!isDemoProject()) {
    problems.push(
      'project id is "' + (projectId() || '(unset)') + '", which is not a demo- project. '
      + 'Set GCLOUD_PROJECT=demo-shos so the emulators cannot reach a real backend.'
    );
  }

  const hosts = emulatorHosts();
  for (const key of need) {
    if (!hosts[key]) {
      problems.push(
        'the ' + key + ' emulator host is not set (expected '
        + (key === 'auth' ? 'FIREBASE_AUTH_EMULATOR_HOST' : 'FIRESTORE_EMULATOR_HOST')
        + '), so SDK calls would go to production.'
      );
    }
  }

  for (const c of LIVE_CREDENTIALS) {
    const v = process.env[c.name] || '';
    if (v && c.live.test(v)) {
      problems.push(c.name + ' holds a live credential (' + c.why + '). Unset it for local runs.');
    }
  }

  if (problems.length) {
    const err = new Error(
      'Refusing to run: local test isolation is not in place.\n'
      + problems.map(function (p, i) { return '  ' + (i + 1) + '. ' + p; }).join('\n')
      + '\nNo test is worth a message sent to a real person.'
    );
    err.code = 'not-isolated';
    throw err;
  }

  return { projectId: projectId(), hosts: hosts };
}

/* Should an outbound email go to a stub instead of Resend? Yes whenever we are
   emulated. The separate throw below covers the case where someone is emulated
   AND holding a live key, which is a configuration error rather than a mode. */
function stubEmail() {
  if (!isEmulated()) return false;
  const key = process.env.RESEND_API_KEY || '';
  if (key && /^re_/i.test(key)) {
    throw new Error(
      '[test-isolation] A live Resend API key is present inside the emulator. '
      + 'Refusing to send, and refusing to pretend. Unset RESEND_API_KEY.'
    );
  }
  return true;
}

/* Same question for Stripe. A live key inside the emulator is a hard stop; a
   test key is still stubbed, because even test-mode calls leave records in the
   real Stripe account and need network access the test run should not need. */
function stubStripe() {
  if (!isEmulated()) return false;
  const key = process.env.STRIPE_SECRET_KEY || '';
  if (key && /^sk_live_/i.test(key)) {
    throw new Error(
      '[test-isolation] A live Stripe secret key is present inside the emulator. '
      + 'Refusing to create a session against it.'
    );
  }
  return true;
}

module.exports = {
  projectId,
  isDemoProject,
  isEmulated,
  emulatorHosts,
  assertIsolated,
  stubEmail,
  stubStripe,
  LIVE_CREDENTIALS,
};
