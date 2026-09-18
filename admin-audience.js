/**
 * Admin Panel audience logic: Overview / Med School / Residency views.
 *
 * Pure functions over data the dashboard already loads (users from
 * listAllUsers, the Stripe payment ledger, bookings, messages). No Firestore
 * access and no DOM, so test/admin-audience.test.js runs the exact code the
 * Admin Panel runs.
 *
 * The four separate concepts shown for a person:
 *   role      applicant | admin | reviewer        (staff never counted as applicants)
 *   path      what they CHOSE: Med school | Residency | Not selected
 *             (+ "Both" / "from purchase" when purchases show more)
 *   purchases what they PAID FOR, from the ledger only (actual amounts,
 *             currency, refunds). A complimentary grant is never a purchase.
 *   access    what they can USE right now (QBank: Purchased / Complimentary /
 *             Staff / None). Access is not payment and payment is not access.
 *
 * Audience membership needs evidence: a chosen path, a purchase from that
 * audience, or (Med School) QBank access. Someone with no path and no
 * purchases stays in the Overview only. Someone with evidence for both
 * audiences appears in both views and is counted once in the Overview.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./revenue-stats.js'), require('./product-catalog.js'));
  } else {
    root.SHOSAdmin = factory(root.SHOSRevenue, root.SHOSCatalog);
  }
})(typeof window !== 'undefined' ? window : globalThis, function (REV, CAT) {
  const VIEWS = ['overview', 'med-school', 'residency'];
  const DAY = 24 * 60 * 60 * 1000;

  function toMs(v) {
    if (v == null || v === '') return null;
    if (typeof v === 'number') return v;
    if (typeof v.toMillis === 'function') return v.toMillis();
    if (typeof v.seconds === 'number') return v.seconds * 1000;
    if (typeof v.__ts === 'number') return v.__ts;
    const t = Date.parse(v);
    return isNaN(t) ? null : t;
  }

  function roleOf(email, cfg) {
    const e = String(email || '').toLowerCase();
    if ((cfg.adminEmails || []).map(x => x.toLowerCase()).includes(e)) return 'admin';
    if ((cfg.reviewerEmails || []).map(x => x.toLowerCase()).includes(e)) return 'reviewer';
    return 'applicant';
  }

  function purchaseStatus(t) {
    if (t.livemode !== true) return 'Test mode';
    if (t.paymentStatus === 'no_payment_required') return 'No charge';
    if (t.paymentStatus !== 'paid') return 'Not paid';
    if (t.refundStatus === 'refunded') return 'Refunded';
    if (t.refundStatus === 'partially_refunded') return 'Partially refunded';
    return 'Paid';
  }

  function toPurchase(t) {
    const cls = CAT.transactionAudience(t);
    return {
      id: t.id || t.sessionId,
      tier: t.tier,
      name: CAT.productName(t.tier),
      audience: cls.audience,            // 'med-school' | 'residency' | null
      kind: cls.kind,                    // + 'shared' | 'unclassified'
      amountTotal: typeof t.amountTotal === 'number' ? t.amountTotal : 0,
      amountRefunded: typeof t.amountRefunded === 'number' ? t.amountRefunded : 0,
      netCents: REV.netCents(t),
      currency: String(t.currency || '').toLowerCase(),
      status: purchaseStatus(t),
      qualifies: REV.qualifiesAsRevenue(t),
      purchasedAtMs: toMs(t.purchasedAt),
    };
  }

  /**
   * QBank access — read from the entitlement exactly as the site enforces it
   * (payments['exam-bank'] === 'paid'). Nothing here changes access.
   */
  function qbankAccess(user, role, txnById) {
    if (role === 'admin' || role === 'reviewer') {
      return { state: 'staff', label: 'Staff access', active: true };
    }
    const p = (user && user.payments) || {};
    if (p['exam-bank'] !== 'paid') return { state: 'none', label: 'No access', active: false };
    if (p['exam-bank-plan'] === 'admin-granted') {
      return { state: 'complimentary', label: 'Complimentary', active: true };
    }
    const t = txnById[p['exam-bank-stripe-session']];
    if (t && t.refundStatus === 'refunded') {
      return { state: 'purchased', label: 'Purchased — refunded, access still on', active: true, refundedButActive: true };
    }
    return { state: 'purchased', label: 'Purchased', active: true };
  }

  function pathLabel(path) {
    if (path === 'applicant') return 'Med school';
    if (path === 'student') return 'Residency';
    return 'Not selected';
  }

  /**
   * Build one record per account from the listAllUsers rows + ledger.
   * cfg: { adminEmails, reviewerEmails }
   */
  function buildPeople(users, transactions, cfg) {
    const txnById = {};
    const byUid = {};
    (transactions || []).forEach(t => {
      txnById[t.id || t.sessionId] = t;
      if (t.uid) (byUid[t.uid] = byUid[t.uid] || []).push(t);
    });
    return (users || []).map(u => {
      const role = roleOf(u.email, cfg);
      const purchases = (byUid[u.id] || []).map(toPurchase)
        .sort((a, b) => (b.purchasedAtMs || 0) - (a.purchasedAtMs || 0));
      const access = qbankAccess(u, role, txnById);
      const bought = aud => purchases.some(p => p.audience === aud && p.status !== 'Test mode');
      const isApplicant = role === 'applicant';
      const med = isApplicant && (u.path === 'applicant' || bought('med-school')
        || access.state === 'purchased' || access.state === 'complimentary');
      const res = isApplicant && (u.path === 'student' || bought('residency'));
      let derived;
      if (med && res) derived = 'Both';
      else if (med) derived = u.path === 'applicant' ? 'Med school' : 'Med school (from purchase/access)';
      else if (res) derived = u.path === 'student' ? 'Residency' : 'Residency (from purchase)';
      else derived = 'Not selected';
      const paying = aud => purchases.some(p => p.qualifies && (aud === 'any' || p.audience === aud));
      return {
        id: u.id,
        name: u.name || u.displayName || '',
        email: u.email || '',
        role,
        path: u.path || null,
        pathLabel: pathLabel(u.path),
        derivedPath: derived,
        audiences: { 'med-school': med, 'residency': res },
        purchases,
        access,
        paying: { any: paying('any'), 'med-school': paying('med-school'), 'residency': paying('residency') },
        createdAtMs: toMs(u.createdAtMs != null ? u.createdAtMs : u.createdAt),
        visitCount: typeof u.visitCount === 'number' ? u.visitCount : 0,
        hasFirestoreDoc: u.hasFirestoreDoc !== false,
        raw: u,
      };
    });
  }

  function inView(person, view) {
    if (person.role !== 'applicant') return false;
    if (view === 'overview') return true;
    return !!person.audiences[view];
  }

  // ------------------------------------------------------------ periods
  const PERIODS = {
    all:   { label: 'All time' },
    month: { label: 'This month' },
    '30d': { label: 'Last 30 days' },
  };
  function periodStart(period, nowMs) {
    if (period === 'month') { const d = new Date(nowMs); return new Date(d.getFullYear(), d.getMonth(), 1).getTime(); }
    if (period === '30d') return nowMs - 30 * DAY;
    return null;
  }

  /**
   * Revenue and paying customers for a view and period, from the ledger.
   * A payment falls in the period of its PURCHASE date; its refunds (Stripe
   * cumulative figure) are subtracted from that same payment.
   */
  function revenueSummary(transactions, opts) {
    const view = opts.view || 'overview';
    const start = periodStart(opts.period || 'all', opts.nowMs);
    const exclude = { excludeEmails: opts.excludeEmails || [], excludeUids: opts.excludeUids || [] };
    const inPeriod = (transactions || []).filter(t => start == null || (toMs(t.purchasedAt) || 0) >= start);
    const byAud = aud => inPeriod.filter(t => CAT.transactionAudience(t).audience === aud);
    const unclassified = inPeriod.filter(t => CAT.transactionAudience(t).audience == null);
    const scoped = view === 'overview' ? inPeriod : byAud(view);
    const main = REV.summarizeRevenue(scoped, exclude);
    const refunded = scoped
      .filter(t => t.livemode === true && t.paymentStatus === 'paid')
      .filter(t => !(exclude.excludeUids.includes(t.uid)))
      .filter(t => !(t.email && exclude.excludeEmails.map(e => e.toLowerCase()).includes(String(t.email).toLowerCase())))
      .reduce((s, t) => s + (String(t.currency).toLowerCase() === 'usd' ? Math.min(t.amountRefunded || 0, t.amountTotal || 0) : 0), 0);
    const out = {
      payingCustomers: main.payingUsers,
      revenueCents: main.revenueCents,
      revenueByCurrency: main.revenueByCurrency,
      refundedCents: refunded,
      transactionsCounted: main.transactionsCounted,
    };
    if (view === 'overview') {
      out.subtotals = {
        'med-school': REV.summarizeRevenue(byAud('med-school'), exclude).revenueCents,
        'residency': REV.summarizeRevenue(byAud('residency'), exclude).revenueCents,
        unclassified: REV.summarizeRevenue(unclassified, exclude).revenueCents,
      };
      out.unclassifiedCount = REV.summarizeRevenue(unclassified, exclude).transactionsCounted;
    }
    return out;
  }

  /** Everything the summary cards need for one view. */
  function viewStats(view, people, transactions, opts) {
    const applicants = people.filter(p => inView(p, view));
    const staff = people.filter(p => p.role !== 'applicant');
    const rev = revenueSummary(transactions, Object.assign({ view }, opts, {
      excludeUids: staff.map(p => p.id).concat(opts.excludeUids || []),
    }));
    const stats = {
      view,
      applicants: applicants.length,
      staff: staff.length,
      notSelected: people.filter(p => p.role === 'applicant' && !p.audiences['med-school'] && !p.audiences.residency).length,
      revenue: rev,
    };
    if (view === 'med-school' || view === 'overview') {
      stats.qbank = {
        purchased: applicants.filter(p => p.access.state === 'purchased').length,
        complimentary: applicants.filter(p => p.access.state === 'complimentary').length,
      };
    }
    return stats;
  }

  // --------------------------------------------------- table filtering
  const FILTERS = {
    overview: [
      ['all', 'All applicants'], ['paying', 'Paying customers'], ['not-paying', 'No purchases'],
      ['path-med', 'Path: Med school'], ['path-res', 'Path: Residency'], ['path-none', 'Path: Not selected'],
      ['staff', 'Staff & reviewers'],
    ],
    'med-school': [
      ['all', 'All med-school applicants'], ['paying', 'Paying customers'],
      ['access-purchased', 'QBank: Purchased'], ['access-complimentary', 'QBank: Complimentary'],
      ['access-none', 'QBank: No access'],
    ],
    residency: [
      ['all', 'All residency applicants'], ['paying', 'Paying customers'], ['not-paying', 'No purchases yet'],
    ],
  };

  function filterPeople(people, view, opts) {
    const q = String((opts && opts.query) || '').trim().toLowerCase();
    const f = (opts && opts.filter) || 'all';
    const payingKey = view === 'overview' ? 'any' : view;
    return people.filter(p => {
      if (view === 'overview' && f === 'staff') { if (p.role === 'applicant') return false; }
      else if (!inView(p, view)) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.email.toLowerCase().includes(q)) return false;
      switch (f) {
        case 'paying': return p.paying[payingKey];
        case 'not-paying': return !p.paying[payingKey];
        case 'path-med': return p.path === 'applicant';
        case 'path-res': return p.path === 'student';
        case 'path-none': return !p.path;
        case 'access-purchased': return p.access.state === 'purchased';
        case 'access-complimentary': return p.access.state === 'complimentary';
        case 'access-none': return p.access.state === 'none';
        default: return true;
      }
    });
  }

  /** Purchases to show for a person in a view (audience views show their own). */
  function purchasesInView(person, view) {
    return view === 'overview' ? person.purchases : person.purchases.filter(p => p.audience === view);
  }

  // ------------------------------------------------------------- export
  function csvTable(people, view) {
    const headers = ['Name', 'Email', 'Role', 'Chosen path', 'Audience(s)', 'Signed up',
      'Purchases (after refunds)', 'Paying customer'];
    if (view !== 'residency') headers.push('QBank access');
    headers.push('Visits', 'User ID');
    const date = ms => (ms ? new Date(ms).toISOString().slice(0, 10) : '');
    const rows = people.map(p => {
      const aud = [p.audiences['med-school'] && 'Med School', p.audiences.residency && 'Residency'].filter(Boolean).join(' + ');
      // Test-mode checkouts are not real purchases; the on-screen table hides
      // them too.
      const purchases = purchasesInView(p, view).filter(x => x.status !== 'Test mode').map(x =>
        `${x.name} — ${x.status} (${(x.netCents / 100).toFixed(2)} ${x.currency.toUpperCase()})`).join('; ');
      const row = [p.name, p.email, p.role, p.pathLabel, aud || '—', date(p.createdAtMs),
        purchases || 'None', p.paying[view === 'overview' ? 'any' : view] ? 'Yes' : 'No'];
      if (view !== 'residency') row.push(p.access.label);
      row.push(p.visitCount, p.id);
      return row;
    });
    return { headers, rows };
  }

  // ------------------------------------------------ bookings & messages
  function itemInView(cls, view) {
    return view === 'overview' || cls.audience === view;
  }
  function bookingInView(b, view) { return itemInView(CAT.bookingAudience(b), view); }
  function messageInView(m, view) { return itemInView(CAT.messageAudience(m), view); }

  const OPEN_BOOKING = new Set(['inquiry', 'pending_payment', 'paid', 'confirmed']);
  function upcomingBookings(bookings, view, nowMs, days) {
    const today = new Date(nowMs); today.setHours(0, 0, 0, 0);
    const end = today.getTime() + (days || 14) * DAY;
    return (bookings || [])
      .filter(b => bookingInView(b, view) && OPEN_BOOKING.has(b.status) && b.preferredDate)
      .map(b => Object.assign({ _dateMs: Date.parse(b.preferredDate + 'T12:00:00') }, b))
      .filter(b => !isNaN(b._dateMs) && b._dateMs >= today.getTime() && b._dateMs <= end)
      .sort((a, b) => a._dateMs - b._dateMs);
  }

  /** Short list of things an admin should look at, per view. */
  function attentionItems(ctx) {
    const view = ctx.view;
    const items = [];
    const msgs = (ctx.messages || []).filter(m => messageInView(m, view));
    const newMsgs = msgs.filter(m => m.status === 'new').length;
    if (newMsgs) items.push({ key: 'messages-new', count: newMsgs, label: 'new message' + (newMsgs === 1 ? '' : 's'), target: 'inbox' });
    if (view === 'overview') {
      const unassigned = (ctx.messages || []).filter(m => m.status !== 'resolved' && CAT.messageAudience(m).audience == null).length;
      if (unassigned) items.push({ key: 'messages-unassigned', count: unassigned, label: 'open message' + (unassigned === 1 ? '' : 's') + ' not tied to an audience', target: 'inbox' });
    }
    const awaiting = (ctx.bookings || []).filter(b => bookingInView(b, view) && (b.status === 'inquiry' || b.status === 'pending_payment')).length;
    if (awaiting) items.push({ key: 'bookings-awaiting', count: awaiting, label: 'booking request' + (awaiting === 1 ? '' : 's') + ' awaiting a reply', target: 'bookings' });
    if ((view === 'overview' || view === 'med-school') && ctx.openReports) {
      items.push({ key: 'reports', count: ctx.openReports, label: 'QBank question report' + (ctx.openReports === 1 ? '' : 's') + ' to review', target: view === 'overview' ? 'view:med-school' : 'reports' });
    }
    const people = (ctx.people || []).filter(p => inView(p, view));
    if (view !== 'residency') {
      const refundedActive = people.filter(p => p.access.refundedButActive).length;
      if (refundedActive) items.push({ key: 'refunded-access', count: refundedActive, label: 'refunded QBank purchase' + (refundedActive === 1 ? '' : 's') + ' with access still on', target: 'filter:access-purchased' });
    }
    if (view === 'overview') {
      const unc = (ctx.transactions || []).filter(t => REV.qualifiesAsRevenue(t) && CAT.transactionAudience(t).audience == null).length;
      if (unc) items.push({ key: 'unclassified', count: unc, label: 'payment' + (unc === 1 ? '' : 's') + ' for a product not assigned to an audience', target: null });
    }
    return items;
  }

  /** Per-service sales for an audience view (qualifying payments only). */
  function servicesBreakdown(transactions, view, opts) {
    const start = periodStart(opts.period || 'all', opts.nowMs);
    const exU = new Set(opts.excludeUids || []);
    const exE = new Set((opts.excludeEmails || []).map(e => e.toLowerCase()));
    const rows = {};
    (transactions || []).forEach(t => {
      if (!REV.qualifiesAsRevenue(t)) return;
      if (exU.has(t.uid) || (t.email && exE.has(String(t.email).toLowerCase()))) return;
      if (start != null && (toMs(t.purchasedAt) || 0) < start) return;
      const cls = CAT.transactionAudience(t);
      if (view !== 'overview' && cls.audience !== view) return;
      const key = t.tier + '|' + String(t.currency).toLowerCase();
      const r = rows[key] || (rows[key] = { tier: t.tier, name: CAT.productName(t.tier), kind: cls.kind, currency: String(t.currency).toLowerCase(), count: 0, netCents: 0 });
      r.count++;
      r.netCents += REV.netCents(t);
    });
    return Object.values(rows).sort((a, b) => b.netCents - a.netCents || a.name.localeCompare(b.name));
  }

  /** Recent live purchases for a view (includes refunded ones, labelled). */
  function recentPurchases(people, transactions, view, limit) {
    const byUid = {};
    people.forEach(p => { byUid[p.id] = p; });
    return (transactions || [])
      .filter(t => t.livemode === true && t.paymentStatus === 'paid')
      .filter(t => { const p = byUid[t.uid]; return !p || p.role === 'applicant'; })
      .map(t => Object.assign(toPurchase(t), { uid: t.uid, email: t.email, person: byUid[t.uid] || null }))
      .filter(p => view === 'overview' || p.audience === view)
      .sort((a, b) => (b.purchasedAtMs || 0) - (a.purchasedAtMs || 0))
      .slice(0, limit || 8);
  }

  /** "Users who completed a QBank test in the last 30 days" from history docs. */
  function recentTestTakers(historiesByUid, nowMs) {
    const since = nowMs - 30 * DAY;
    return Object.keys(historiesByUid || {}).filter(uid =>
      (historiesByUid[uid] || []).some(t => { const ms = toMs(t && t.date); return ms != null && ms >= since && ms <= nowMs + DAY; }));
  }

  return {
    VIEWS, PERIODS, FILTERS,
    toMs, roleOf, qbankAccess, buildPeople, inView, purchasesInView,
    periodStart, revenueSummary, viewStats, filterPeople, csvTable,
    bookingInView, messageInView, upcomingBookings, attentionItems,
    servicesBreakdown, recentPurchases, recentTestTakers,
  };
});
