/**
 * SHOS Med product / service catalog: which audience each thing belongs to.
 *
 * One place that answers "is this a Med School or a Residency product?" for
 * the Admin Panel. Kept consistent with the rest of the site by
 * test/admin-audience.test.js, which fails if any of these drift apart:
 *   - functions/index.js TIERS          (every Stripe-purchasable product)
 *   - contact-booking.js SERVICE_TYPES  (every bookable service + its name)
 *   - contact-modal.js REASONS          (every public contact-form reason)
 *   - dashboard.html Store sections     (which section offers each product)
 *
 * Audiences:
 *   'med-school'  Med School Applicants   (Store: "Med School Application Plans")
 *   'residency'   Residency Applicants    (Store: "Residency Application Plans")
 *   'shared'      offered to both; never assigned to one audience automatically
 * A key that is not listed is UNCLASSIFIED: callers show it and flag it,
 * never drop it or guess.
 *
 * A payment's audience comes from the product it bought (the ledger's `tier`,
 * fixed at purchase time) — never from the buyer's current profile path, so
 * changing someone's path never moves their revenue between audiences.
 */
(function (root) {
  const AUDIENCES = {
    'med-school': { label: 'Med School Applicants', short: 'Med School' },
    'residency':  { label: 'Residency Applicants',  short: 'Residency' },
  };

  // Stripe checkout tiers (functions/index.js TIERS) and bookable services
  // (contact-booking.js SERVICE_TYPES). `stripe: true` marks the ones a
  // customer can pay for online today.
  const PRODUCTS = {
    // ---- Med School Application
    'full-access':                { name: 'Full QBank Access', audience: 'med-school', stripe: true },
    'full-qbank':                 { name: 'Full QBank Access', audience: 'med-school' },
    'apply-lf3-service':          { name: 'Apply for LF3', audience: 'med-school' },
    'mock-exam-interview':        { name: 'Mock Exam + Interview', audience: 'med-school' },
    'life-in-prague':             { name: 'Life in Prague', audience: 'med-school' },
    'applicant-mentor':           { name: '1-on-1 Mentor Session (applicant)', audience: 'med-school' },
    // Only offered in the Store's Med School section (decision 2026-09-18).
    'entrance-exam-registration': { name: 'Entrance Exam Registration (US & Canada)', audience: 'med-school' },

    // ---- Residency Application
    'strategy-session':           { name: 'Strategy Session', audience: 'residency', stripe: true },
    'mentorship-lor':             { name: 'Letter of Rec Coaching', audience: 'residency', stripe: true },
    'mentorship-program-list':    { name: 'Program List Guidance', audience: 'residency', stripe: true },
    'mentorship-research':        { name: 'Research Strategy', audience: 'residency', stripe: true },
    'mentorship-cv':              { name: 'Personal Statement Review', audience: 'residency', stripe: true },
    'mentorship-mock-interview':  { name: 'Mock Interview Session', audience: 'residency', stripe: true },
    'mentorship-eras':            { name: 'ERAS CV Review', audience: 'residency', stripe: true },
    'usmle-step-review':          { name: 'USMLE Step Review', audience: 'residency', stripe: true },

    // ---- Shared: stays in the Overview unless its audience is known
    // another way (decision 2026-09-18).
    'free-consultation':          { name: 'Free Strategy Call', audience: 'shared' },
  };

  // Public contact-form reasons (contact-modal.js REASONS). New messages
  // store the reason key; older messages are matched on the exact subject.
  // null = general enquiry with no audience ("Unassigned").
  const CONTACT_REASONS = {
    'consultation':              { subject: 'Schedule a Free Consultation', audience: 'shared' },
    'apply-lf3':                 { subject: 'Apply to LF3 (Charles University)', audience: 'med-school' },
    'entrance-exam':             { subject: 'Entrance Exam Registration', audience: 'med-school' },
    'mentorship':                { subject: 'Residency Mentorship Inquiry', audience: 'residency' },
    'mentorship-lor':            { subject: 'Match Mentorship: Letter of Rec Coaching', audience: 'residency' },
    'mentorship-program-list':   { subject: 'Match Mentorship: Program List Guidance', audience: 'residency' },
    'mentorship-cv':             { subject: 'Match Mentorship: Personal Statement Review', audience: 'residency' },
    'mentorship-mock-interview': { subject: 'Match Mentorship: Mock Interview Session', audience: 'residency' },
    'mentorship-eras':           { subject: 'Match Mentorship: ERAS CV Review', audience: 'residency' },
    'mentorship-research':       { subject: 'Match Mentorship: Research Strategy', audience: 'residency' },
    'applicant-mentor':          { subject: 'Applicant 1-on-1 Mentor Session', audience: 'med-school' },
    'mock-exam':                 { subject: 'Mock Entrance Exam + Interview', audience: 'med-school' },
    'life-in-prague':            { subject: 'Life in Prague Onboarding', audience: 'med-school' },
    'board-review':              { subject: 'USMLE Board Review Inquiry', audience: 'residency' },
    'submit-match':              { subject: 'Add Me to Recent Match Outcomes', audience: 'residency' },
    'partnership':               { subject: 'Partnership Inquiry', audience: null },
    'general':                   { subject: 'General Question', audience: null },
  };

  const own = (o, k) => typeof k === 'string' && Object.prototype.hasOwnProperty.call(o, k);

  /** 'med-school' | 'residency' | 'shared' | null (unclassified) */
  function productAudience(key) {
    return own(PRODUCTS, key) ? PRODUCTS[key].audience : null;
  }
  function productName(key) {
    return own(PRODUCTS, key) ? PRODUCTS[key].name : (key || 'Unknown product');
  }

  /**
   * Classify a ledger transaction, booking or message for the audience views.
   * Returns { audience, kind }:
   *   audience  'med-school' | 'residency' | null   (null = Overview only)
   *   kind      'med-school' | 'residency' | 'shared' | 'unassigned' | 'unclassified'
   */
  function classify(audience, knownKey) {
    if (audience === 'med-school' || audience === 'residency') return { audience, kind: audience };
    if (audience === 'shared') return { audience: null, kind: 'shared' };
    return { audience: null, kind: knownKey ? 'unassigned' : 'unclassified' };
  }

  function transactionAudience(t) {
    const tier = t && t.tier;
    return classify(productAudience(tier), false);
  }

  function bookingAudience(b) {
    const key = b && b.serviceType;
    return classify(productAudience(key), false);
  }

  const REASON_BY_SUBJECT = {};
  Object.keys(CONTACT_REASONS).forEach(k => { REASON_BY_SUBJECT[CONTACT_REASONS[k].subject] = k; });

  function messageReasonKey(m) {
    if (!m) return null;
    if (own(CONTACT_REASONS, m.reasonKey)) return m.reasonKey;
    const subject = typeof m.subject === 'string' ? m.subject.trim() : '';
    return own(REASON_BY_SUBJECT, subject) ? REASON_BY_SUBJECT[subject] : null;
  }

  function messageAudience(m) {
    const key = messageReasonKey(m);
    if (!key) return { audience: null, kind: 'unassigned' };
    return classify(CONTACT_REASONS[key].audience, true);
  }

  const KIND_LABELS = {
    'med-school': 'Med School',
    'residency': 'Residency',
    'shared': 'Shared',
    'unassigned': 'Unassigned',
    'unclassified': 'Unclassified',
  };

  const api = {
    AUDIENCES, PRODUCTS, CONTACT_REASONS, KIND_LABELS,
    productAudience, productName,
    transactionAudience, bookingAudience, messageAudience, messageReasonKey,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SHOSCatalog = api;
})(typeof window !== 'undefined' ? window : globalThis);
