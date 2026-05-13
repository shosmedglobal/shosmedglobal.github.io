// ============================================================================
// SHOS Med — transactional email templates
// ----------------------------------------------------------------------------
// Two emails are sent server-side via Resend (from welcome@shosmed.com):
//
//   1. Welcome + verification (combined)
//      Sent automatically by the `onUserCreated` Auth trigger when a new
//      account is created. Contains a primary "Verify your email" CTA at
//      the top, a personal founder greeting, and three path-specific
//      next-step links so the user has somewhere to go right away.
//
//   2. Verification-only resend
//      Sent by the `resendVerification` callable when the user clicks the
//      "Resend email" button in the dashboard banner. Stripped-down version
//      focused on getting the verify CTA in front of them again.
//
// Both templates are inlined HTML (no external CSS / fonts) so they render
// reliably across Gmail / Outlook / Apple Mail / mobile clients. Brand
// colors hard-coded to match the site (#CF5B2E orange, #FFF7ED cream,
// #0F172A navy).
// ============================================================================

const BRAND = {
  accent:   '#CF5B2E',
  cream:    '#FFF7ED',
  navy:     '#0F172A',
  gray700:  '#334155',
  gray500:  '#64748B',
  gray200:  '#E5E7EB',
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// ---------- shared layout chrome (header / footer) ----------
function shell({ title, preheader, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; background:#F4F4F5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color:${BRAND.navy};">
  <span style="display:none; font-size:1px; color:#fff; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${escapeHtml(preheader || '')}</span>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F4F4F5;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; width:100%; background:#FFFFFF; border-radius:14px; overflow:hidden; box-shadow:0 4px 20px rgba(15,23,42,0.06);">
        <!-- Header -->
        <tr><td style="background:${BRAND.navy}; padding:26px 32px; text-align:left;">
          <span style="display:inline-block; font-size:18px; font-weight:700; color:#FFFFFF; letter-spacing:0.5px;">SHOS Med</span>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 36px 28px;">${bodyHtml}</td></tr>

        <!-- Footer -->
        <tr><td style="padding:22px 36px 32px; border-top:1px solid ${BRAND.gray200}; font-size:12px; color:${BRAND.gray500}; line-height:1.6;">
          <p style="margin:0 0 8px;">SHOS Med LLC &middot; Your bridge to medical education in Europe and career success in the US.</p>
          <p style="margin:0;">
            <a href="https://shosmed.com" style="color:${BRAND.accent}; text-decoration:none;">shosmed.com</a> &nbsp;&middot;&nbsp;
            <a href="mailto:contact@shosmed.com" style="color:${BRAND.accent}; text-decoration:none;">contact@shosmed.com</a> &nbsp;&middot;&nbsp;
            <a href="https://www.linkedin.com/company/shos-med/" style="color:${BRAND.accent}; text-decoration:none;">LinkedIn</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ---------- 1. Welcome + verification (combined) ----------
function welcomeEmailHtml({ name, path, verifyLink }) {
  const firstName = (name || '').split(' ')[0] || 'there';
  const isStudent = path === 'student';

  const nextSteps = isStudent
    ? [
        { label: 'Browse the residency match pathway',  url: 'https://shosmed.com/students.html' },
        { label: 'Read the USMLE Step 1 guide for IMGs', url: 'https://shosmed.com/blog/usmle-step-1-pass-fail-img-2026.html' },
        { label: 'Meet your physician mentors',          url: 'https://shosmed.com/mentors.html' },
      ]
    : [
        { label: "Try free QBank questions",                 url: 'https://shosmed.com/qbank.html' },
        { label: 'Read the LF3 entrance exam breakdown',      url: 'https://shosmed.com/blog/lf3-entrance-exam-what-is-on-it.html' },
        { label: 'See how to apply to Charles University',    url: 'https://shosmed.com/applicants.html' },
      ];

  const stepsHtml = nextSteps.map(s => `
    <tr><td style="padding:6px 0;">
      <a href="${escapeHtml(s.url)}" style="color:${BRAND.accent}; text-decoration:none; font-weight:600; font-size:15px;">${escapeHtml(s.label)} &rarr;</a>
    </td></tr>`).join('');

  const intro = isStudent
    ? 'You signed up looking ahead to your US residency match — we built SHOS Med specifically for IMGs walking this exact path.'
    : "You signed up to learn about Charles University and the European medical school path — exactly what we built SHOS Med for.";

  const body = `
    <h1 style="font-size:24px; line-height:1.3; margin:0 0 8px; color:${BRAND.navy}; font-weight:700;">Welcome to SHOS Med, ${escapeHtml(firstName)}.</h1>
    <p style="font-size:15px; line-height:1.65; color:${BRAND.gray700}; margin:0 0 22px;">${intro}</p>

    <!-- Verify CTA box -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.cream}; border-radius:10px; margin:0 0 28px;">
      <tr><td style="padding:22px 24px;">
        <p style="margin:0 0 4px; font-size:13px; font-weight:700; color:#92400E; text-transform:uppercase; letter-spacing:0.6px;">First, verify your email</p>
        <p style="margin:0 0 16px; font-size:14px; color:${BRAND.gray700}; line-height:1.55;">Click below to confirm this is really your address. Takes one tap.</p>
        <a href="${escapeHtml(verifyLink)}" style="display:inline-block; background:${BRAND.accent}; color:#FFFFFF; text-decoration:none; padding:12px 28px; border-radius:50px; font-weight:600; font-size:15px;">Verify my email</a>
        <p style="margin:14px 0 0; font-size:12px; color:${BRAND.gray500};">Or paste this link into your browser:<br><span style="word-break:break-all; color:${BRAND.gray500};">${escapeHtml(verifyLink)}</span></p>
      </td></tr>
    </table>

    <h2 style="font-size:16px; margin:0 0 12px; color:${BRAND.navy}; font-weight:700;">What to do next</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;">
      ${stepsHtml}
    </table>

    <p style="font-size:14px; line-height:1.65; color:${BRAND.gray700}; margin:24px 0 6px;">Questions? Just reply to this email — it goes straight to me.</p>
    <p style="font-size:14px; line-height:1.65; color:${BRAND.gray700}; margin:0;">&mdash; Eli, SHOS Med</p>`;

  return shell({
    title: 'Welcome to SHOS Med',
    preheader: `Hi ${firstName}, welcome to SHOS Med — verify your email and we'll get you started.`,
    bodyHtml: body,
  });
}

function welcomeEmailText({ name, path, verifyLink }) {
  const firstName = (name || '').split(' ')[0] || 'there';
  const intro = path === 'student'
    ? 'You signed up looking ahead to your US residency match.'
    : 'You signed up to learn about Charles University and the European medical school path.';

  const steps = path === 'student'
    ? [
        'Residency match pathway: https://shosmed.com/students.html',
        'USMLE Step 1 guide for IMGs: https://shosmed.com/blog/usmle-step-1-pass-fail-img-2026.html',
        'Meet your physician mentors: https://shosmed.com/mentors.html',
      ]
    : [
        'Try free QBank questions: https://shosmed.com/qbank.html',
        'LF3 entrance exam breakdown: https://shosmed.com/blog/lf3-entrance-exam-what-is-on-it.html',
        'How to apply to Charles University: https://shosmed.com/applicants.html',
      ];

  return `Welcome to SHOS Med, ${firstName}.

${intro}

FIRST, VERIFY YOUR EMAIL:
${verifyLink}

WHAT TO DO NEXT:
${steps.map(s => '• ' + s).join('\n')}

Questions? Just reply to this email — it goes straight to me.

— Eli, SHOS Med
shosmed.com · contact@shosmed.com`;
}

// ---------- 2. Verification-only resend ----------
function verificationEmailHtml({ name, verifyLink }) {
  const firstName = (name || '').split(' ')[0] || 'there';
  const body = `
    <h1 style="font-size:22px; line-height:1.3; margin:0 0 8px; color:${BRAND.navy}; font-weight:700;">Verify your email</h1>
    <p style="font-size:15px; line-height:1.65; color:${BRAND.gray700}; margin:0 0 22px;">Hi ${escapeHtml(firstName)} — click below to confirm this is really your address. The link is good for 24 hours.</p>

    <p style="margin:0 0 14px;">
      <a href="${escapeHtml(verifyLink)}" style="display:inline-block; background:${BRAND.accent}; color:#FFFFFF; text-decoration:none; padding:12px 28px; border-radius:50px; font-weight:600; font-size:15px;">Verify my email</a>
    </p>

    <p style="margin:18px 0 6px; font-size:12px; color:${BRAND.gray500};">Or paste this link into your browser:</p>
    <p style="margin:0; font-size:12px; color:${BRAND.gray500}; word-break:break-all;">${escapeHtml(verifyLink)}</p>

    <p style="font-size:13px; color:${BRAND.gray500}; line-height:1.6; margin:24px 0 0;">If you didn't try to sign up for SHOS Med, you can safely ignore this email.</p>`;

  return shell({
    title: 'Verify your email — SHOS Med',
    preheader: 'Click to confirm your email address — link is good for 24 hours.',
    bodyHtml: body,
  });
}

function verificationEmailText({ name, verifyLink }) {
  const firstName = (name || '').split(' ')[0] || 'there';
  return `Hi ${firstName},

Click below to verify your email address (link is good for 24 hours):
${verifyLink}

If you didn't try to sign up for SHOS Med, you can safely ignore this email.

— SHOS Med
shosmed.com`;
}

module.exports = {
  welcomeEmailHtml,
  welcomeEmailText,
  verificationEmailHtml,
  verificationEmailText,
};
