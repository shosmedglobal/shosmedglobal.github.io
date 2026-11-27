/* email-integrity.js — the decidable parts of "can we reach this person?"
 * ---------------------------------------------------------------------------
 * Pure functions only: no Firebase, no network, no clock of their own. That
 * is deliberate. Webhook signature checking and bounce classification are
 * exactly the logic that must be right and that nobody can test against a
 * live mailbox, so they live here where a plain `node` run can exercise them.
 *
 * Two distinctions this module exists to keep straight, because conflating
 * them is how an account gets wrongly written off:
 *
 *   VERIFICATION is about the PERSON: did someone open the link in that
 *   mailbox? Only Firebase answers it.
 *
 *   DELIVERY is about the MESSAGE: did the provider accept it, hand it over,
 *   or give up? Only Resend answers it.
 *
 * An unverified account is not a bounced one. A message accepted for sending
 * is not a delivered one. Nothing here ever collapses those.
 */
'use strict';

const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Webhook signature. Resend signs with Svix: the signed payload is
// "<id>.<timestamp>.<body>", HMAC-SHA256 with the base64 secret that follows
// the "whsec_" prefix, and the header may carry several space-separated
// "v1,<sig>" values during a secret rotation.
// ---------------------------------------------------------------------------
function verifySvixSignature(opts) {
  const o = opts || {};
  const secret = o.secret;
  const id = o.id;
  const timestamp = o.timestamp;
  const body = o.body;                        // EXACT bytes, as received
  const header = o.signatureHeader;
  const nowMs = typeof o.nowMs === 'number' ? o.nowMs : Date.now();
  const toleranceMs = typeof o.toleranceMs === 'number' ? o.toleranceMs : 5 * 60 * 1000;

  if (!secret) return { ok: false, reason: 'no-secret' };
  if (!id || !timestamp || !header) return { ok: false, reason: 'missing-headers' };
  if (body === null || body === undefined) return { ok: false, reason: 'no-body' };

  // Replay window. Without this, a signature stays valid forever and a
  // captured request can be fired again at any time.
  const tsSeconds = Number(timestamp);
  if (!isFinite(tsSeconds)) return { ok: false, reason: 'bad-timestamp' };
  const driftMs = Math.abs(nowMs - tsSeconds * 1000);
  if (driftMs > toleranceMs) return { ok: false, reason: 'stale-timestamp' };

  const key = Buffer.from(String(secret).replace(/^whsec_/, ''), 'base64');
  const signed = String(id) + '.' + String(timestamp) + '.' +
    (Buffer.isBuffer(body) ? body.toString('utf8') : String(body));
  const expected = crypto.createHmac('sha256', key).update(signed, 'utf8').digest('base64');

  const offered = String(header).split(' ')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => (part.indexOf(',') !== -1 ? part.slice(part.indexOf(',') + 1) : part));

  const expectedBuf = Buffer.from(expected, 'utf8');
  for (const candidate of offered) {
    const candidateBuf = Buffer.from(candidate, 'utf8');
    // Length check first: timingSafeEqual throws on a mismatch, and the
    // length of a base64 SHA-256 digest is not a secret.
    if (candidateBuf.length !== expectedBuf.length) continue;
    if (crypto.timingSafeEqual(candidateBuf, expectedBuf)) return { ok: true };
  }
  return { ok: false, reason: 'signature-mismatch' };
}

// ---------------------------------------------------------------------------
// Delivery vocabulary. "unknown" is a real answer and the default one: we
// have no evidence either way until the provider gives us some.
// ---------------------------------------------------------------------------
const DELIVERY_STATES = ['unknown', 'sent', 'delivered', 'delayed', 'bounced', 'failed', 'suppressed'];

/* Maps a Resend webhook event onto our own vocabulary.
 *
 * The permanent/transient split is the one that matters. A mailbox that is
 * full, or a server that is briefly refusing, is not a wrong address, and
 * treating it as one would hound a real applicant to "correct" an address
 * that was right all along. Only a permanent recipient failure is allowed
 * to set `permanent`. */
function classifyResendEvent(event) {
  const e = event || {};
  const data = e.data || {};
  const type = String(e.type || '');
  const recipients = Array.isArray(data.to) ? data.to : (data.to ? [data.to] : []);
  const recipient = recipients.length ? String(recipients[0]).trim().toLowerCase() : '';
  const messageId = data.email_id || data.id || '';
  const atMs = Date.parse(e.created_at || data.created_at || '') || null;

  let status = null;
  let permanent = false;

  switch (type) {
    case 'email.sent':
      status = 'sent'; break;
    case 'email.delivered':
      status = 'delivered'; break;
    case 'email.delivery_delayed':
      status = 'delayed'; break;
    case 'email.complained':
      // A spam complaint is not a delivery failure: it arrived, and they
      // did not want it. Stop sending, but never call the address wrong.
      status = 'suppressed'; permanent = false; break;
    case 'email.bounced': {
      const b = data.bounce || {};
      const kind = String(b.type || b.bounceType || '').toLowerCase();
      const sub = String(b.subType || b.subtype || '').toLowerCase();
      // Explicitly transient wins; otherwise a bounce with no detail is
      // treated as permanent, which is what a bounce normally is.
      if (kind === 'transient' || kind === 'soft' || sub === 'mailboxfull') {
        status = 'delayed'; permanent = false;
      } else {
        status = 'bounced'; permanent = true;
      }
      break;
    }
    case 'email.failed':
      // Our side: bad API call, quota, suspended domain. Nothing about the
      // recipient, so this must never mark an address as bad.
      status = 'failed'; permanent = false; break;
    default:
      return null;                                  // event we do not model
  }

  return { status, permanent, recipient, messageId, atMs, type };
}

/* Should this event replace what we already hold for the address?
 *
 * Ordering is by the provider's own timestamp, never by arrival order:
 * webhooks are retried and overtake each other, and a delayed bounce
 * arriving after a later delivery must not overwrite it. An event with no
 * usable timestamp is only accepted when we hold nothing at all. */
function shouldReplaceStatus(existing, incoming) {
  if (!incoming || !incoming.status) return false;
  if (!existing || !existing.status) return true;
  const prevAt = typeof existing.atMs === 'number' ? existing.atMs : null;
  const nextAt = typeof incoming.atMs === 'number' ? incoming.atMs : null;
  if (nextAt === null) return prevAt === null;
  if (prevAt === null) return true;
  return nextAt >= prevAt;
}

/* Does the evidence justify telling this person their address cannot
 * receive mail?
 *
 * Three conditions, all required. The address the evidence is about must be
 * the address currently on the account: a bounce logged against an old,
 * mistyped address says nothing about the corrected one, and that is the
 * single most important thing this function prevents. */
function addressLooksUndeliverable(record, currentEmail) {
  if (!record || !currentEmail) return false;
  if (!record.permanent) return false;
  if (record.status !== 'bounced') return false;
  const subject = String(record.address || '').trim().toLowerCase();
  return subject !== '' && subject === String(currentEmail).trim().toLowerCase();
}

// ---------------------------------------------------------------------------
// Fixed-window rate limiting, for resend-verification and similar.
// A client-side countdown is a courtesy; this is the control.
// ---------------------------------------------------------------------------
function rateLimitWindow(log, nowMs, opts) {
  const o = opts || {};
  const max = o.max || 5;
  const windowMs = o.windowMs || 60 * 60 * 1000;
  const prev = log || {};
  const startedAt = typeof prev.startedAt === 'number' ? prev.startedAt : 0;
  const count = typeof prev.count === 'number' ? prev.count : 0;

  if (!startedAt || nowMs - startedAt >= windowMs) {
    return { allowed: true, next: { startedAt: nowMs, count: 1 }, remaining: max - 1, retryAfterMs: 0 };
  }
  if (count >= max) {
    return {
      allowed: false,
      next: { startedAt, count },
      remaining: 0,
      retryAfterMs: Math.max(0, startedAt + windowMs - nowMs)
    };
  }
  return { allowed: true, next: { startedAt, count: count + 1 }, remaining: max - count - 1, retryAfterMs: 0 };
}

/* Normalised key for an address used as a Firestore document id. Firestore
 * ids may not contain "/" and may not be "." or ".."; an email cannot
 * produce those, but the guard is cheap and the failure would be silent. */
function addressKey(email) {
  const s = String(email == null ? '' : email).trim().toLowerCase();
  if (!s || s.indexOf('/') !== -1 || s === '.' || s === '..') return null;
  return s;
}

module.exports = {
  verifySvixSignature,
  classifyResendEvent,
  shouldReplaceStatus,
  addressLooksUndeliverable,
  rateLimitWindow,
  addressKey,
  DELIVERY_STATES
};

// ---------------------------------------------------------------------------
// Delivery history and address suppression are two different facts, and
// conflating them loses both.
//
// "The last message to this address was delivered" is a fact about a MESSAGE.
// It is time-ordered, and the newest event wins.
//
// "Do not send to this address" is a fact about the ADDRESS. It is sticky: a
// spam complaint or a hard bounce establishes it, and a later successful
// delivery does NOT retract it. Somebody who reported us as spam and then
// received a transactional receipt has not withdrawn the complaint, and
// quietly resuming marketing to them because one message landed is how a
// sending domain gets itself blocklisted.
//
// Before this split, both lived in a single `status` field ordered purely by
// timestamp, so any later email.delivered silently cleared a complaint. The
// suppression check in sendEmail also only ever looked for a hard bounce,
// which meant a complaint suppressed nothing at all.
// ---------------------------------------------------------------------------

/* Does this event establish that we should stop sending to the address?
 * Only two things do: a spam complaint, and a permanent recipient failure.
 * A transient bounce, a delay, a provider-side failure and a delivery are
 * all silent here. */
function suppressionFromEvent(parsed) {
  if (!parsed) return null;
  if (parsed.status === 'suppressed') {
    return { reason: 'complaint', atMs: parsed.atMs || null };
  }
  if (parsed.status === 'bounced' && parsed.permanent === true) {
    return { reason: 'hard-bounce', atMs: parsed.atMs || null };
  }
  return null;
}

/* Build the patch to write for an address, given what we hold and what just
 * arrived. Returns null when the event changes nothing.
 *
 * A complaint deliberately does NOT move `status`: the message it concerns
 * was delivered, and overwriting the delivery history with a complaint would
 * lose the delivery. It sets the suppression fields and nothing else. */
function mergeDeliveryRecord(existing, parsed) {
  if (!parsed || !parsed.status) return null;
  const prev = existing || {};
  const patch = {};
  let changed = false;

  const suppression = suppressionFromEvent(parsed);
  const isComplaint = suppression && suppression.reason === 'complaint';

  // --- the message fact: newest wins, complaints abstain ---
  if (!isComplaint && shouldReplaceStatus(prev, parsed)) {
    patch.status = parsed.status;
    patch.permanent = !!parsed.permanent;
    patch.atMs = parsed.atMs || Date.now();
    patch.lastEventType = parsed.type;
    patch.lastMessageId = parsed.messageId || null;
    changed = true;
  }

  // --- the address fact: once set, it stays set ---
  if (suppression && prev.suppressed !== true) {
    patch.suppressed = true;
    patch.suppressedReason = suppression.reason;
    patch.suppressedAtMs = suppression.atMs || Date.now();
    changed = true;
  }

  return changed ? patch : null;
}

/* The question sendEmail asks before sending anything that is not forced.
 * Reads the sticky flag, and still honours the older record shape (a
 * permanent bounce recorded before the split) so nothing that was suppressed
 * yesterday starts receiving mail again today. */
function isSuppressed(record) {
  if (!record) return false;
  if (record.suppressed === true) return true;
  return record.permanent === true && record.status === 'bounced';
}

module.exports.suppressionFromEvent = suppressionFromEvent;
module.exports.mergeDeliveryRecord = mergeDeliveryRecord;
module.exports.isSuppressed = isSuppressed;
