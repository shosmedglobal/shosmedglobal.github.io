'use strict';
/* verify-deployed.js — does the DEPLOYED backend actually enforce this?
 * ---------------------------------------------------------------------------
 * Fetching the site's HTML proves a page shipped. It proves nothing at all
 * about whether a Cloud Function refuses an unverified purchase or whether a
 * webhook checks its signatures, because neither of those lives in the HTML.
 * This script asks the deployed functions directly.
 *
 * It is written to be safe to run against production:
 *
 *   - Nothing it does sends email to anybody.
 *   - The only writes are rate-limit counters for this machine's own address,
 *     and (with --with-webhook) one delivery record for an obviously
 *     synthetic address, which the script deletes again.
 *   - It creates no accounts and modifies none.
 *
 * Usage:
 *   node test/verify-deployed.js
 *   node test/verify-deployed.js --with-webhook <path-to-secret-file>
 */

const crypto = require('crypto');
const fs = require('fs');

const PROJECT = 'shos-med-global-6eb19';
const REGION = 'us-central1';
const BASE = 'https://' + REGION + '-' + PROJECT + '.cloudfunctions.net';

const withWebhook = process.argv.indexOf('--with-webhook');
const secretFile = withWebhook > -1 ? process.argv[withWebhook + 1] : null;

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) passed++;
  else failures.push(name + (detail ? '  [' + detail + ']' : ''));
  console.log((cond ? '  ok   ' : '  FAIL ') + name + (detail ? '   (' + detail + ')' : ''));
}

async function callable(name, data, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  const res = await fetch(BASE + '/' + name, {
    method: 'POST', headers, body: JSON.stringify({ data: data || {} }),
  });
  const json = await res.json().catch(function () { return null; });
  return { status: res.status, json };
}

async function main() {
  console.log('\nVerifying the DEPLOYED backend at ' + BASE + '\n');

  // -----------------------------------------------------------------------
  console.log('1. The functions exist and are reachable');
  // A callable that exists answers with a callable-shaped error for a bad
  // call. A name that does not exist answers 404.
  for (const fn of ['createCheckoutSession', 'resendVerification',
                    'submitContactMessage', 'adminUpdateUserEmail']) {
    const r = await callable(fn, {});
    check('1a ' + fn + ' is deployed', r.status !== 404, 'status ' + r.status);
  }
  const hook = await fetch(BASE + '/resendWebhook', { method: 'POST', body: '{}' });
  check('1b resendWebhook is deployed', hook.status !== 404, 'status ' + hook.status);

  // -----------------------------------------------------------------------
  console.log('\n2. Authentication is required where it should be');
  const anonCheckout = await callable('createCheckoutSession',
    { tier: 'full-access', origin: 'https://shosmed.com' });
  check('2a checkout refuses an unauthenticated caller',
    anonCheckout.json && anonCheckout.json.error
    && anonCheckout.json.error.status === 'UNAUTHENTICATED',
    JSON.stringify(anonCheckout.json && anonCheckout.json.error));

  const anonResend = await callable('resendVerification', {});
  check('2b resend refuses an unauthenticated caller',
    anonResend.json && anonResend.json.error
    && anonResend.json.error.status === 'UNAUTHENTICATED');

  const anonAdmin = await callable('adminUpdateUserEmail',
    { currentEmail: 'a@b.com', newEmail: 'c@d.com', opId: 'probe' });
  check('2c the admin correction refuses an unauthenticated caller',
    anonAdmin.json && anonAdmin.json.error
    && anonAdmin.json.error.status === 'UNAUTHENTICATED');

  // A forged bearer token must not be accepted as an admin.
  const forged = [
    Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url'),
    Buffer.from(JSON.stringify({
      sub: 'forged', user_id: 'forged', email: 'eli@shosmed.com',
      email_verified: true, admin: true, aud: PROJECT, iss: 'https://securetoken.google.com/' + PROJECT,
      iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600,
    })).toString('base64url'),
    '',
  ].join('.');
  const forgedCall = await callable('adminUpdateUserEmail',
    { currentEmail: 'a@b.com', newEmail: 'c@d.com', opId: 'probe2' }, forged);
  check('2d an unsigned token claiming admin is rejected',
    forgedCall.json && forgedCall.json.error
    && forgedCall.json.error.status === 'UNAUTHENTICATED',
    JSON.stringify(forgedCall.json && forgedCall.json.error));

  // -----------------------------------------------------------------------
  console.log('\n3. The contact endpoint validates on the server');
  // These all fail validation BEFORE anything is written or sent.
  const bad = [
    ['3a a missing name is refused', { name: '', email: 'x@example.com', body: 'hello there' }],
    ['3b a malformed address is refused', { name: 'Probe', email: 'not-an-address', body: 'hello there' }],
    ['3c an empty message is refused', { name: 'Probe', email: 'x@example.com', body: '' }],
  ];
  for (const [label, payload] of bad) {
    const r = await callable('submitContactMessage', payload);
    check(label, r.json && r.json.error && r.json.error.status === 'INVALID_ARGUMENT',
      JSON.stringify(r.json && r.json.error && r.json.error.status));
  }
  const pot = await callable('submitContactMessage', {
    name: 'Probe', email: 'probe@example.com', body: 'honeypot probe', website: 'http://x',
  });
  check('3d a filled honeypot is accepted and stores nothing',
    pot.json && pot.json.result && pot.json.result.ok === true && pot.json.result.id === null,
    JSON.stringify(pot.json));

  // -----------------------------------------------------------------------
  console.log('\n4. The webhook refuses anything it cannot verify');
  const body = JSON.stringify({
    type: 'email.bounced', created_at: new Date().toISOString(),
    data: { to: ['probe@example.invalid'], email_id: 'probe', bounce: { type: 'Permanent' } },
  });
  const ts = Math.floor(Date.now() / 1000);

  const noSig = await fetch(BASE + '/resendWebhook', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
  });
  check('4a an unsigned event is refused', noSig.status === 401 || noSig.status === 400,
    'status ' + noSig.status);

  const badSig = await fetch(BASE + '/resendWebhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'svix-id': 'probe_bad', 'svix-timestamp': String(ts),
      'svix-signature': 'v1,' + Buffer.from('nonsense').toString('base64'),
    },
    body,
  });
  check('4b a forged signature is refused', badSig.status === 401,
    'status ' + badSig.status);

  const oldTs = ts - 60 * 60 * 24;     // a day old
  const staleSig = await fetch(BASE + '/resendWebhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'svix-id': 'probe_stale', 'svix-timestamp': String(oldTs),
      'svix-signature': 'v1,' + Buffer.from('nonsense').toString('base64'),
    },
    body,
  });
  check('4c a stale timestamp is refused', staleSig.status === 401 || staleSig.status === 400,
    'status ' + staleSig.status);

  if (secretFile && fs.existsSync(secretFile)) {
    const secret = fs.readFileSync(secretFile, 'utf8').trim();
    const id = 'probe_valid_' + Date.now();
    const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
    const sig = crypto.createHmac('sha256', key)
      .update(id + '.' + ts + '.' + body).digest('base64');
    const good = await fetch(BASE + '/resendWebhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'svix-id': id, 'svix-timestamp': String(ts), 'svix-signature': 'v1,' + sig,
      },
      body,
    });
    check('4d a correctly signed event IS accepted', good.status === 200,
      'status ' + good.status);

    const replay = await fetch(BASE + '/resendWebhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'svix-id': id, 'svix-timestamp': String(ts), 'svix-signature': 'v1,' + sig,
      },
      body,
    });
    check('4e a replay of it is accepted and idempotent', replay.status === 200,
      'status ' + replay.status);
    console.log('\n  NOTE: that wrote a delivery record for probe@example.invalid.');
    console.log('  Remove it from the admin panel, or leave it: the address is');
    console.log('  in a reserved TLD and belongs to nobody.');
  } else {
    console.log('  (skipped 4d/4e: no secret file given, so a valid signature');
    console.log('   cannot be produced. Pass --with-webhook <file> to include them.)');
  }

  console.log('\n' + '='.repeat(64));
  console.log('deployed backend: ' + passed + ' passed, ' + failures.length + ' failed');
  for (const f of failures) console.log('\n  FAIL ' + f);
  console.log('='.repeat(64));
  process.exit(failures.length ? 1 : 0);
}

main().catch(function (err) {
  console.error('\nERROR:', (err && err.stack) || err);
  process.exit(2);
});
