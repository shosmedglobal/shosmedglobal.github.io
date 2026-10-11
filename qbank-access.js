/**
 * QBank access: the single rule for "can this person use the QBank right now?"
 *
 * Used by the dashboard, qbank.html, qbank.js, practice-exam.html and the
 * admin panel, and mirrored server-side in functions/payments.js
 * (qbankAccessActive) — test/qbank-access.test.js checks the two agree.
 *
 * Access record (users/{uid}.payments):
 *   exam-bank             'paid' once purchased or granted
 *   exam-bank-plan        'full-access' (bought) | 'admin-granted' (complimentary)
 *   exam-bank-expires-at  when it ends; ABSENT means it never ends
 *
 * Rules:
 *   - Admins and reviewers always have access (staff).
 *   - No 'paid' flag -> no access.
 *   - 'paid' with no expiry date -> unlimited (admin grants made without a
 *     duration, and any legacy record from before expiry was enforced).
 *   - 'paid' with an expiry in the future -> active, with days remaining.
 *   - 'paid' with an expiry in the past -> expired: the person drops to the
 *     free tier. Nothing is deleted — their progress, test history and
 *     completed mock exams stay in place and come back if they renew.
 *
 * Expiry is judged when access is read; no job rewrites anyone's record.
 */
(function (root) {
  const DAY = 24 * 60 * 60 * 1000;

  function toMs(v) {
    if (v == null || v === '') return null;
    if (typeof v === 'number') return v;
    if (typeof v.toMillis === 'function') return v.toMillis();          // Firestore Timestamp
    if (typeof v.seconds === 'number') return v.seconds * 1000;          // raw Timestamp shape
    if (typeof v._seconds === 'number') return v._seconds * 1000;
    if (typeof v.__ts === 'number') return v.__ts;                       // test fixtures
    const t = Date.parse(v);
    return isNaN(t) ? null : t;
  }

  /**
   * @param {object} payments  users/{uid}.payments
   * @param {{nowMs?: number, isStaff?: boolean}} [opts]
   * @returns {{active, state, unlimited, expiresAtMs, daysLeft, complimentary, label}}
   *   state: 'staff' | 'active' | 'expired' | 'none'
   */
  function qbankState(payments, opts) {
    const o = opts || {};
    const now = typeof o.nowMs === 'number' ? o.nowMs : Date.now();
    if (o.isStaff) {
      return { active: true, state: 'staff', unlimited: true, expiresAtMs: null, daysLeft: null,
        complimentary: false, label: 'Staff access' };
    }
    const p = payments || {};
    if (p['exam-bank'] !== 'paid') {
      return { active: false, state: 'none', unlimited: false, expiresAtMs: null, daysLeft: null,
        complimentary: false, label: 'No access' };
    }
    const complimentary = p['exam-bank-plan'] === 'admin-granted';
    const expiresAtMs = toMs(p['exam-bank-expires-at']);
    if (expiresAtMs == null) {
      return { active: true, state: 'active', unlimited: true, expiresAtMs: null, daysLeft: null,
        complimentary, label: complimentary ? 'Complimentary' : 'Purchased' };
    }
    const active = expiresAtMs > now;
    // Days remaining, rounded up: an expiry later today reads as "1 day left",
    // never "0 days left" while access still works.
    const daysLeft = Math.ceil((expiresAtMs - now) / DAY);
    return {
      active,
      state: active ? 'active' : 'expired',
      unlimited: false,
      expiresAtMs,
      daysLeft,
      complimentary,
      label: active
        ? (complimentary ? 'Complimentary' : 'Purchased')
        : (complimentary ? 'Complimentary — ended' : 'Purchased — ended'),
    };
  }

  function qbankActive(payments, opts) { return qbankState(payments, opts).active; }

  /** Add months to a timestamp, clamping day-of-month (31 Jan + 1 month = 28/29 Feb). */
  function addMonths(fromMs, months) {
    const d = new Date(fromMs);
    const day = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + months);
    d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
    return d.getTime();
  }

  /**
   * New expiry when access is bought or granted. Renewing early never costs
   * days: the extension starts from the current expiry when it is still in
   * the future, otherwise from now.
   */
  function extendExpiry(currentExpiry, nowMs, days) {
    const cur = toMs(currentExpiry);
    const base = cur != null && cur > nowMs ? cur : nowMs;
    return base + days * DAY;
  }

  function formatEndDate(ms, locale) {
    return ms == null ? '' : new Date(ms).toLocaleDateString(locale || 'en-US',
      { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const api = { DAY, toMs, qbankState, qbankActive, addMonths, extendExpiry, formatEndDate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SHOSAccess = api;
})(typeof window !== 'undefined' ? window : globalThis);
