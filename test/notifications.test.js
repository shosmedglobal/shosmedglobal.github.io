/**
 * Tests for the admin notification emails sent when a message or booking
 * arrives (functions/emails.js adminAlertHtml / adminAlertText, used by the
 * onMessageCreated / onBookingCreated triggers).
 *
 * Run:  node test/notifications.test.js
 *
 * Why this exists (2026-10-26): a contact message reached the admin Inbox
 * with no email. The only mail path ran in the visitor's browser
 * (Web3Forms), the dashboard's own contact form sent nothing, and bookings
 * sent nothing. These emails now come from a server trigger instead.
 *
 * Everything in them is typed into a public web form, so the main thing
 * under test is that it is rendered as text and never as markup.
 */
const path = require('path');
const emails = require(path.join(__dirname, '..', 'functions', 'emails.js'));

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''));
}

const INBOX = 'https://shosmed.com/dashboard.html?view=admin';
const msg = over => Object.assign({
  kind: 'message', name: 'Rayan Khan', email: 'rkhan@example.com',
  lines: [['Subject', 'Schedule a Free Consultation'], ['Category', 'Book a Service'], ['Signed in', 'no']],
  body: 'I\'d like to discuss requirements for universities.', inboxUrl: INBOX,
}, over);

// ------------------------------------------------------------- content
{
  const h = emails.adminAlertHtml(msg());
  const t = emails.adminAlertText(msg());
  check('1a HTML names the sender and their email', h.includes('Rayan Khan') && h.includes('rkhan@example.com'));
  check('1b HTML carries the message body', h.includes('discuss requirements'));
  check('1c HTML lists subject and category', h.includes('Schedule a Free Consultation') && h.includes('Book a Service'));
  check('1d HTML links to the admin inbox', h.includes(INBOX));
  check('1e HTML says replies reach the sender', h.includes('rkhan@example.com') && /Replying to this email/.test(h));
  check('1f plain text covers the same ground',
    t.includes('New message from Rayan Khan') && t.includes('Subject: Schedule a Free Consultation')
    && t.includes('discuss requirements') && t.includes(INBOX), t.slice(0, 120));
  check('1g a booking reads as a booking', emails.adminAlertHtml(msg({ kind: 'booking' })).includes('New booking request')
    && emails.adminAlertText(msg({ kind: 'booking' })).startsWith('New booking request'));
}

// --------------------------------------------- everything is escaped
{
  const nasty = {
    name: '<script>alert("x")</script>',
    email: '"onmouseover="alert(1)',
    body: 'Hi <b>there</b> & "quotes" <img src=x onerror=alert(1)>',
    lines: [['Subject', '</td><script>alert(2)</script>']],
  };
  const h = emails.adminAlertHtml(msg(nasty));
  const liveTags = h.replace(/&lt;[^&]*&gt;/g, '');     // ignore anything already escaped
  check('2a no script tag survives', !/<script/i.test(liveTags), (liveTags.match(/<script[^>]*>/i) || [])[0]);
  check('2b no img/onerror survives', !/<img/i.test(liveTags) && !/onerror=/i.test(liveTags));
  check('2c body HTML shows as text', h.includes('&lt;b&gt;there&lt;/b&gt;') && !h.includes('<b>there</b>'));
  check('2d ampersands escaped', h.includes('&amp;'));
  check('2e a quote in a value cannot break out of an attribute', !h.includes('"onmouseover="'));
  check('2f table markup cannot be closed early', !liveTags.includes('</td><script'));
  check('2g the text version is left as typed (no markup to escape)',
    emails.adminAlertText(msg(nasty)).includes('<b>there</b>'));
}

// ------------------------------------------------- tidy rows / missing data
{
  const sparse = emails.adminAlertHtml(msg({
    lines: [['Subject', 'Hello'], ['Category', ''], ['Timezone', null], ['Status', undefined]],
  }));
  check('3a empty values are left out, not shown blank',
    sparse.includes('Hello') && !sparse.includes('Timezone') && !sparse.includes('Status'));
  const anon = emails.adminAlertHtml(msg({ name: '', email: '', body: '' }));
  check('3b a message with no name still renders', anon.includes('Someone') && anon.includes(INBOX));
  // The shared footer always has one mailto (contact@shosmed.com); a sender
  // link would be a second one.
  const mailtos = h => (h.match(/mailto:/g) || []).length;
  check('3c no sender email: no sender mailto link (footer one only)',
    mailtos(anon) === 1 && mailtos(emails.adminAlertHtml(msg())) === 2, [mailtos(anon), mailtos(emails.adminAlertHtml(msg()))]);
  check('3d an empty body renders no quote block', !anon.includes('border-left:3px solid'));
  const textAnon = emails.adminAlertText(msg({ name: '', email: '', body: '' }));
  check('3e text version copes with no name or email', textAnon.startsWith('New message from Someone')
    && !textAnon.includes('<>'), textAnon.slice(0, 60));
  check('3f no lines at all still produces an email',
    emails.adminAlertHtml(msg({ lines: [] })).includes(INBOX));
}

console.log(`notifications: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
