// ===== SHOS Med - Contact Modal =====
// Self-contained modal for "Contact us" / "Schedule a call" / "Apply to LF3" CTAs.
// Any element with [data-contact-modal="<reason-key>"] opens the modal with that
// subject preselected. Submissions are (a) saved to Firestore (admin dashboard)
// via submitContactForm() in contact-booking.js, AND (b) emailed to the notification
// inbox via Web3Forms if an access key is configured.
//
// One-time setup to enable email notifications:
//   1. Sign up at https://web3forms.com/ with contact@shosmed.com
//   2. Verify the email via the link they send
//   3. Copy your access key and paste it into WEB3FORMS_ACCESS_KEY below
//
// Without the access key the modal still works - submissions save to Firestore
// and appear in the admin dashboard - but no email notification is sent.

(function () {
  'use strict';

  // ===== Config =====
  const WEB3FORMS_ACCESS_KEY = '7939ec4d-0010-4354-bde0-7388287aa0ed';
  const NOTIFICATION_EMAIL   = 'contact@shosmed.com';
  const MESSAGE_MAX_LENGTH   = 500;  // Character limit for message body

  // Subject options shown in the modal dropdown.
  // `category` maps to CONTACT_CATEGORIES in contact-booking.js so the admin
  // dashboard can filter these messages correctly.
  const REASONS = {
    'consultation':              { subject: 'Schedule a Free Consultation',                category: 'booking' },
    'apply-lf3':                 { subject: 'Apply to LF3 (Charles University)',           category: 'booking' },
    'entrance-exam':             { subject: 'Entrance Exam Registration',                  category: 'booking' },
    'mentorship':                { subject: 'Residency Mentorship Inquiry',                category: 'booking' },
    'mentorship-lor':            { subject: 'Match Mentorship: Letter of Rec Coaching',    category: 'booking' },
    'mentorship-program-list':   { subject: 'Match Mentorship: Program List Guidance',     category: 'booking' },
    'mentorship-cv':             { subject: 'Match Mentorship: CV & Personal Statement',   category: 'booking' },
    'mentorship-mock-interview': { subject: 'Match Mentorship: Mock Interview Session',    category: 'booking' },
    'mentorship-eras':           { subject: 'Match Mentorship: ERAS Application Strategy', category: 'booking' },
    'board-review':              { subject: 'USMLE Board Review Inquiry',                  category: 'booking' },
    'submit-match':              { subject: 'Add Me to Recent Match Outcomes',             category: 'general',
                                   placeholder: "Tell us: medical school + grad year, residency program + match year, fellowship if any, and where to send your photo. We'll reply within 48 hours." },
    'partnership':               { subject: 'Partnership Inquiry',                         category: 'partnership' },
    'general':                   { subject: 'General Question',                            category: 'general' }
  };

  const REASON_ORDER = [
    'consultation', 'apply-lf3', 'entrance-exam', 'mentorship',
    'mentorship-lor', 'mentorship-program-list', 'mentorship-cv',
    'mentorship-mock-interview', 'mentorship-eras', 'board-review',
    'submit-match', 'partnership', 'general'
  ];

  // ===== Styles (scoped with .shos-cm- prefix) =====
  const CSS = `
    .shos-cm-backdrop {
      position: fixed; inset: 0;
      background: rgba(27, 33, 55, 0.6);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      display: none;
      align-items: center; justify-content: center;
      z-index: 10000;
      padding: 16px;
      opacity: 0;
      transition: opacity .22s ease-out;
    }
    .shos-cm-backdrop.open { display: flex; opacity: 1; }

    .shos-cm-box {
      background: #fff;
      width: 100%;
      max-width: 500px;
      max-height: calc(100vh - 32px);
      overflow-y: auto;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.1);
      padding: 32px;
      position: relative;
      transform: translateY(20px) scale(.98);
      opacity: 0;
      transition: transform .28s cubic-bezier(.4,0,.2,1), opacity .22s ease-out;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .shos-cm-backdrop.open .shos-cm-box {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    .shos-cm-x {
      position: absolute; top: 14px; right: 16px;
      background: none; border: 0;
      width: 32px; height: 32px;
      font-size: 24px; line-height: 1;
      color: #A3A09B;
      cursor: pointer;
      border-radius: 8px;
      transition: all .2s ease;
    }
    .shos-cm-x:hover { color: #1B2137; background: #F5F4F2; }

    .shos-cm-header { margin-bottom: 20px; padding-right: 24px; }
    .shos-cm-header h3 {
      font-family: 'Playfair Display', 'Georgia', serif;
      font-size: 1.6rem;
      color: #1B2137;
      margin: 0 0 6px;
      line-height: 1.2;
    }
    .shos-cm-header p {
      color: #6E6B66;
      font-size: 0.92rem;
      margin: 0;
      line-height: 1.5;
    }

    .shos-cm-field { margin-bottom: 14px; }
    .shos-cm-field label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: #3A3835;
      margin-bottom: 6px;
      letter-spacing: 0.01em;
    }
    .shos-cm-field input,
    .shos-cm-field select,
    .shos-cm-field textarea {
      width: 100%;
      padding: 11px 14px;
      border: 1px solid #D4D1CC;
      border-radius: 10px;
      font: inherit;
      font-size: 0.95rem;
      color: #1B2137;
      background: #FAFAF9;
      box-sizing: border-box;
      transition: all .2s ease;
    }
    .shos-cm-field textarea {
      resize: vertical;
      min-height: 90px;
      font-family: inherit;
    }
    .shos-cm-char-count {
      display: block;
      text-align: right;
      font-size: 0.75rem;
      color: #9CA3AF;
      margin-top: 4px;
      font-weight: 500;
    }
    .shos-cm-char-count.warn { color: #F59E0B; }
    .shos-cm-char-count.over { color: #DC2626; font-weight: 600; }
    .shos-cm-field input:focus,
    .shos-cm-field select:focus,
    .shos-cm-field textarea:focus {
      outline: none;
      border-color: #CF5B2E;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(207, 91, 46, 0.12);
    }
    .shos-cm-field select {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%236E6B66' d='M6 8L0 0h12z'/></svg>");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 36px;
    }

    /* Honeypot - hidden from users, visible to bots */
    .shos-cm-botcheck {
      position: absolute !important;
      left: -9999px;
      opacity: 0;
      pointer-events: none;
    }

    .shos-cm-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 22px;
      flex-wrap: wrap;
    }
    .shos-cm-btn {
      padding: 11px 22px;
      border-radius: 10px;
      border: 0;
      font: inherit;
      font-weight: 600;
      font-size: 0.92rem;
      cursor: pointer;
      transition: all .2s ease;
      font-family: inherit;
    }
    .shos-cm-btn-primary {
      background: #CF5B2E;
      color: #fff;
      box-shadow: 0 2px 6px rgba(207, 91, 46, 0.25);
    }
    .shos-cm-btn-primary:hover:not(:disabled) {
      background: #A84823;
      box-shadow: 0 4px 12px rgba(207, 91, 46, 0.35);
      transform: translateY(-1px);
    }
    .shos-cm-btn-primary:disabled {
      background: #A3A09B;
      box-shadow: none;
      cursor: wait;
    }
    .shos-cm-btn-ghost {
      background: transparent;
      color: #6E6B66;
    }
    .shos-cm-btn-ghost:hover { background: #F5F4F2; color: #1B2137; }

    .shos-cm-status {
      margin-top: 14px;
      font-size: 0.88rem;
      min-height: 20px;
      line-height: 1.5;
    }
    .shos-cm-status.ok    { color: #2D8659; }
    .shos-cm-status.err   { color: #DC2626; }

    .shos-cm-fallback {
      margin-top: 14px;
      padding-top: 14px;
      border-top: 1px solid #E7E5E2;
      font-size: 0.82rem;
      color: #6E6B66;
      text-align: center;
    }
    .shos-cm-fallback a { color: #CF5B2E; font-weight: 600; }
    .shos-cm-fallback a:hover { text-decoration: underline; }

    @media (max-width: 540px) {
      .shos-cm-box { padding: 24px 20px; border-radius: 14px; }
      .shos-cm-header h3 { font-size: 1.35rem; }
      .shos-cm-actions { justify-content: stretch; }
      .shos-cm-btn { flex: 1; text-align: center; }
    }
  `;

  // ===== HTML =====
  function buildOptionsHtml() {
    return REASON_ORDER.map(key => {
      const r = REASONS[key];
      return `<option value="${key}">${r.subject}</option>`;
    }).join('');
  }

  const HTML = `
    <div id="shosContactModal" class="shos-cm-backdrop" role="dialog" aria-modal="true" aria-labelledby="shosCmTitle" aria-hidden="true">
      <div class="shos-cm-box">
        <button type="button" class="shos-cm-x" id="shosCmClose" aria-label="Close dialog">&times;</button>
        <div class="shos-cm-header">
          <h3 id="shosCmTitle">Get in touch</h3>
          <p>We'll reply within 48 hours. All consultations are free.</p>
        </div>
        <form id="shosCmForm" novalidate>
          <div class="shos-cm-field">
            <label for="shosCmSubject">What is this about?</label>
            <select id="shosCmSubject" name="subject" required>${buildOptionsHtml()}</select>
          </div>
          <div class="shos-cm-field">
            <label for="shosCmName">Your name</label>
            <input type="text" id="shosCmName" name="name" autocomplete="name" required>
          </div>
          <div class="shos-cm-field">
            <label for="shosCmEmail">Your email</label>
            <input type="email" id="shosCmEmail" name="email" autocomplete="email" required>
          </div>
          <div class="shos-cm-field">
            <label for="shosCmBody">Message</label>
            <textarea id="shosCmBody" name="body" rows="4" required maxlength="${MESSAGE_MAX_LENGTH}"
                      placeholder="A sentence or two about what you'd like to discuss."></textarea>
            <span class="shos-cm-char-count" id="shosCmCharCount">0 / ${MESSAGE_MAX_LENGTH}</span>
          </div>
          <input type="checkbox" name="botcheck" class="shos-cm-botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="shos-cm-actions">
            <button type="button" class="shos-cm-btn shos-cm-btn-ghost" id="shosCmCancel">Cancel</button>
            <button type="submit" class="shos-cm-btn shos-cm-btn-primary" id="shosCmSubmit">Send message</button>
          </div>
          <p class="shos-cm-status" id="shosCmStatus" role="status" aria-live="polite"></p>
          <p class="shos-cm-fallback">
            Prefer email? Reach us at <a href="mailto:${NOTIFICATION_EMAIL}">${NOTIFICATION_EMAIL}</a>
          </p>
        </form>
      </div>
    </div>
  `;

  // ===== State =====
  let _lastFocus = null;

  function injectOnce() {
    if (document.getElementById('shosContactModal')) return;

    // Inject styles
    const style = document.createElement('style');
    style.setAttribute('data-shos-contact-modal', '');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject HTML
    const wrap = document.createElement('div');
    wrap.innerHTML = HTML.trim();
    document.body.appendChild(wrap.firstElementChild);

    wireModalControls();
    wireSubmit();
    wireCharCounter();
  }

  function wireCharCounter() {
    const textarea = document.getElementById('shosCmBody');
    const counter  = document.getElementById('shosCmCharCount');
    if (!textarea || !counter) return;

    function updateCounter() {
      const len = textarea.value.length;
      counter.textContent = len + ' / ' + MESSAGE_MAX_LENGTH;
      counter.classList.remove('warn', 'over');
      if (len > MESSAGE_MAX_LENGTH * 0.9) counter.classList.add('warn');
      if (len >= MESSAGE_MAX_LENGTH)      counter.classList.add('over');
    }
    textarea.addEventListener('input', updateCounter);
    updateCounter();
  }

  function openModal(reasonKey) {
    injectOnce();
    const modal  = document.getElementById('shosContactModal');
    const select = document.getElementById('shosCmSubject');
    const status = document.getElementById('shosCmStatus');

    if (reasonKey && REASONS[reasonKey]) {
      select.value = reasonKey;
    } else {
      select.selectedIndex = 0;
    }

    // Per-reason placeholder hint in the message field
    const bodyField = document.getElementById('shosCmBody');
    if (bodyField) {
      const reason = REASONS[reasonKey];
      bodyField.placeholder = (reason && reason.placeholder) ||
        "A sentence or two about what you'd like to discuss.";
    }

    status.textContent = '';
    status.className = 'shos-cm-status';

    // Reset char counter
    const counter = document.getElementById('shosCmCharCount');
    if (counter) {
      counter.textContent = '0 / ' + MESSAGE_MAX_LENGTH;
      counter.classList.remove('warn', 'over');
    }

    _lastFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const nameField = document.getElementById('shosCmName');
      if (nameField) nameField.focus();
    }, 120);
  }

  function closeModal() {
    const modal = document.getElementById('shosContactModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (_lastFocus && typeof _lastFocus.focus === 'function') {
      _lastFocus.focus();
    }
  }

  function wireModalControls() {
    const modal = document.getElementById('shosContactModal');
    document.getElementById('shosCmClose').addEventListener('click', closeModal);
    document.getElementById('shosCmCancel').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  async function saveToFirestore(payload) {
    if (typeof submitContactForm !== 'function') return false;
    try {
      const res = await submitContactForm(payload);
      return !!(res && res.success);
    } catch (err) {
      console.error('[contact-modal] Firestore save failed:', err);
      return false;
    }
  }

  async function sendEmail(payload) {
    if (!WEB3FORMS_ACCESS_KEY) return null;  // not configured
    try {
      const data = new FormData();
      data.append('access_key', WEB3FORMS_ACCESS_KEY);
      data.append('subject',    '[SHOS Web] ' + payload.subject);
      data.append('from_name',  'SHOS Med Website');
      data.append('name',       payload.name);
      data.append('email',      payload.email);
      data.append('replyto',    payload.email);
      data.append('message',
        'Subject: ' + payload.subject + '\n' +
        'From: '    + payload.name + ' <' + payload.email + '>\n' +
        '-----\n' +
        payload.body
      );
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();
      return !!json.success;
    } catch (err) {
      console.error('[contact-modal] Web3Forms failed:', err);
      return false;
    }
  }

  function wireSubmit() {
    const form      = document.getElementById('shosCmForm');
    const submitBtn = document.getElementById('shosCmSubmit');
    const status    = document.getElementById('shosCmStatus');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const reasonKey = form.subject.value;
      const reason    = REASONS[reasonKey] || REASONS.general;
      const name      = form.name.value.trim();
      const email     = form.email.value.trim();
      const body      = form.body.value.trim();
      const botCheck  = form.botcheck.checked;

      // Honeypot: bots check it, humans don't see it
      if (botCheck) {
        closeModal();
        return;
      }

      if (!name || !email || !body) {
        status.textContent = 'Please fill in all fields.';
        status.className   = 'shos-cm-status err';
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        status.textContent = 'Please enter a valid email address.';
        status.className   = 'shos-cm-status err';
        return;
      }

      if (body.length > MESSAGE_MAX_LENGTH) {
        status.textContent = 'Message is too long. Please keep it under ' + MESSAGE_MAX_LENGTH + ' characters.';
        status.className   = 'shos-cm-status err';
        return;
      }

      submitBtn.disabled   = true;
      submitBtn.textContent = 'Sending…';
      status.textContent   = '';
      status.className     = 'shos-cm-status';

      const payload = {
        name, email,
        category: reason.category,
        subject:  reason.subject,
        body:     body
      };

      const [firestoreSaved, emailSent] = await Promise.all([
        saveToFirestore(payload),
        sendEmail(payload)
      ]);

      // Success if EITHER channel succeeded (defense in depth)
      // - emailSent === null means email isn't configured yet (not a failure)
      const deliveredToSomeone = firestoreSaved || emailSent === true;

      if (deliveredToSomeone) {
        status.textContent = 'Thanks, ' + name.split(' ')[0] + '. We received your message and will reply within 48 hours.';
        status.className   = 'shos-cm-status ok';
        form.reset();
        setTimeout(closeModal, 2400);
      } else {
        status.textContent = 'Sorry, something went wrong. Please email us directly at ' + NOTIFICATION_EMAIL + '.';
        status.className   = 'shos-cm-status err';
      }

      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send message';
    });
  }

  // ===== Auto-wire triggers =====
  // Any click on an element with [data-contact-modal] opens the modal.
  // The attribute value (e.g. "consultation") preselects the matching subject.
  function wireGlobalTriggers() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-contact-modal]');
      if (!trigger) return;
      e.preventDefault();
      const reason = trigger.getAttribute('data-contact-modal') || 'general';
      openModal(reason);
    });
  }

  // ===== Public API =====
  window.openContactModal  = openModal;
  window.closeContactModal = closeModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      wireGlobalTriggers();
    });
  } else {
    wireGlobalTriggers();
  }
})();
