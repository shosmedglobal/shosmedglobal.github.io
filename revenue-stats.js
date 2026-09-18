/**
 * Revenue + paying-user aggregation over the Stripe payment ledger.
 *
 * The ledger is the Firestore collection `transactions/{checkoutSessionId}`,
 * written only by Cloud Functions (stripeWebhook + reconcileStripePayments;
 * see functions/payments.js). One document per Stripe Checkout Session, so a
 * payment can never appear twice.
 *
 * Shared by dashboard.html (admin stat tiles) and test/payments.test.js, so
 * the tests exercise the exact code the dashboard runs.
 *
 * A transaction counts toward revenue only if ALL of these hold:
 *   - livemode === true            (Stripe test-mode purchases excluded)
 *   - paymentStatus === 'paid'     (unpaid / pending / $0 promo excluded)
 *   - net amount > 0               (amountTotal minus amountRefunded;
 *                                   a full refund drops it out entirely)
 *   - buyer is not an excluded (admin/internal) account
 * Failed, expired and incomplete checkouts never reach the ledger at all.
 */
(function (root) {
  function netCents(t) {
    const total = typeof t.amountTotal === 'number' ? t.amountTotal : 0;
    const refunded = typeof t.amountRefunded === 'number' ? t.amountRefunded : 0;
    return Math.max(0, total - refunded);
  }

  function qualifiesAsRevenue(t) {
    return !!t
      && t.livemode === true
      && t.paymentStatus === 'paid'
      && typeof t.amountTotal === 'number'
      && netCents(t) > 0;
  }

  /**
   * @param {Array<object>} transactions  ledger docs (plain objects)
   * @param {{excludeEmails?: string[], excludeUids?: string[]}} [opts]
   * @returns {{payingUsers: number, revenueCents: number,
   *            revenueByCurrency: Object<string, number>,
   *            transactionsCounted: number}}
   *   revenueCents is USD — every SHOS Med Stripe price is in USD. Any other
   *   currency is reported separately in revenueByCurrency rather than being
   *   summed into a dollar figure it does not belong in.
   */
  function summarizeRevenue(transactions, opts) {
    const o = opts || {};
    const excludeEmails = new Set((o.excludeEmails || []).map(e => String(e).toLowerCase()));
    const excludeUids = new Set(o.excludeUids || []);
    const payingUids = new Set();
    const revenueByCurrency = {};
    let transactionsCounted = 0;

    (transactions || []).forEach(t => {
      if (!qualifiesAsRevenue(t)) return;
      if (excludeUids.has(t.uid)) return;
      if (t.email && excludeEmails.has(String(t.email).toLowerCase())) return;
      const cur = String(t.currency || 'usd').toLowerCase();
      revenueByCurrency[cur] = (revenueByCurrency[cur] || 0) + netCents(t);
      if (t.uid) payingUids.add(t.uid);
      transactionsCounted++;
    });

    return {
      payingUsers: payingUids.size,
      revenueCents: revenueByCurrency.usd || 0,
      revenueByCurrency,
      transactionsCounted,
    };
  }

  function formatUsd(cents) {
    const c = Math.round(cents || 0);
    return '$' + (c / 100).toLocaleString('en-US', {
      minimumFractionDigits: c % 100 ? 2 : 0,
      maximumFractionDigits: 2,
    });
  }

  const api = { summarizeRevenue, qualifiesAsRevenue, netCents, formatUsd };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SHOSRevenue = api;
})(typeof window !== 'undefined' ? window : globalThis);
