/**
 * Tests for the store's call-to-action buttons in dashboard.html.
 *
 * Run:  node test/store-cta.test.js
 *
 * A store button is dead in three different ways, none of which shows up
 * until a real customer clicks it:
 *
 *   1. data-tier names a tier that does not exist in functions/index.js, so
 *      createCheckoutSession throws invalid-argument.
 *   2. The tier exists but its priceKey has no matching lookup_key on an
 *      active Stripe Price, so checkout fails with "No active Stripe price
 *      found for lookup_key ...". Stripe is not reachable from a unit test,
 *      so what is checked here is that every priceKey the store can reach is
 *      one of the keys the catalogue is known to carry.
 *   3. A contact-form shortcut writes a <select> value that is not one of
 *      that select's <option>s, so the form silently opens with nothing
 *      chosen.
 *
 * Everything is parsed out of the real sources — add a button to
 * dashboard.html and it is tested automatically.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8');
const indexSrc = fs.readFileSync(path.join(ROOT, 'functions', 'index.js'), 'utf8');
const TIERS = new Function(indexSrc.match(/const TIERS = (\{[\s\S]*?\n\});/)[0] + '\nreturn TIERS;')();

// lookup_keys that exist on an active Price in the live Stripe catalogue.
// Verified against the account on 2026-11-02; a new priceKey must be created
// in Stripe and added here in the same change.
const STRIPE_LOOKUP_KEYS = new Set([
  'full-access', 'strategy-session', 'mentorship-addon', 'apply-lf3', 'application-addon',
]);

// createCheckoutSession asks Stripe for `tierConfig.priceKey || tier`, so a
// tier without a priceKey is looked up under its own name.
const lookupKey = tier => TIERS[tier].priceKey || tier;

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail === undefined ? '' : '  -> ' + JSON.stringify(detail)));
}

// ------------------------------------------------- every checkout button
// Any element carrying .stripe-pay is wired to the delegated handler, which
// reads data-tier and calls createCheckoutSession with it.
const payButtons = html.match(/<a[^>]*class="[^"]*stripe-pay[^"]*"[^>]*>/g) || [];
check('there are checkout buttons to test', payButtons.length >= 4, payButtons.length);

payButtons.forEach(tag => {
  const tier = (tag.match(/data-tier="([^"]*)"/) || [, null])[1];
  const label = (tag.match(/id="([^"]+)"/) || [, tag.slice(0, 60)])[1];
  // An empty data-tier is legitimate on the two "buy a single add-on"
  // buttons: they stay inert until the <select> fills the tier in, and the
  // handler returns early on a falsy tier.
  if (tier === '') {
    check(`${label}: inert button is disabled until a tier is chosen`,
      /aria-disabled="true"/.test(tag) && /pointer-events:none/.test(tag), tag);
    return;
  }
  check(`${label}: data-tier is present`, tier !== null, tag);
  if (tier === null) return;
  check(`tier "${tier}" exists in functions/index.js`, Object.hasOwn(TIERS, tier));
  if (!TIERS[tier]) return;
  check(`tier "${tier}" resolves to a live Stripe lookup_key`,
    STRIPE_LOOKUP_KEYS.has(lookupKey(tier)), lookupKey(tier));
});

// --------------------------------------- every tier a <select> can supply
// The add-on selects write their value straight onto a button's data-tier,
// so an option value is a checkout tier just as much as a data-tier is.
['applicantTierSelect', 'addonTierSelect'].forEach(id => {
  const block = html.match(new RegExp(`<select id="${id}"[\\s\\S]*?</select>`));
  check(`${id} exists`, !!block);
  if (!block) return;
  (block[0].match(/<option value="([^"]+)"/g) || []).forEach(opt => {
    const tier = opt.match(/value="([^"]+)"/)[1];
    check(`${id} option "${tier}" is a real tier`, Object.hasOwn(TIERS, tier));
    if (TIERS[tier]) {
      check(`${id} option "${tier}" resolves to a live Stripe lookup_key`,
        STRIPE_LOOKUP_KEYS.has(lookupKey(tier)), lookupKey(tier));
    }
  });
});

// ------------------------------------------ contact-form shortcut buttons
// An onclick that sets #contactCategory or #contactService must write a
// value that select actually offers, or the form opens blank.
function optionValues(id) {
  const block = html.match(new RegExp(`<select id="${id}"[\\s\\S]*?</select>`));
  return new Set((block ? block[0].match(/<option value="([^"]*)"/g) || [] : [])
    .map(o => o.match(/value="([^"]*)"/)[1]));
}
const categories = optionValues('contactCategory');
const services = optionValues('contactService');
check('contactCategory has options', categories.size > 1, [...categories]);
check('contactService has options', services.size > 1, services.size);

for (const m of html.matchAll(/getElementById\('(contactCategory|contactService)'\)[^;]*?\.value\s*=\s*'([^']*)'/g)) {
  const [, sel, value] = m;
  if (value === '') continue;                       // clearing the select
  const allowed = sel === 'contactCategory' ? categories : services;
  check(`${sel} shortcut value "${value}" is an option`, allowed.has(value), [...allowed].slice(0, 12));
}
// The same assignment written through a local variable, which is how the
// registration card and the overview CTA do it.
for (const m of html.matchAll(/var (\w+)\s*=\s*document\.getElementById\('(contactCategory|contactService)'\);[^<]*?\1\.value\s*=\s*'([^']*)'/g)) {
  const [, , sel, value] = m;
  const allowed = sel === 'contactCategory' ? categories : services;
  check(`${sel} shortcut value "${value}" is an option`, allowed.has(value), [...allowed].slice(0, 12));
}

// ------------------------------- Entrance Exam Registration card (store)
// Registering for the exam is the first step for a US/Canada applicant, so
// the card sits above the Step 1/2/3 grid, not under it.
const cardAt = html.indexOf('class="lf3-reg-card"');
const gridAt = html.indexOf('id="qbankPricingGrid"');
const addonsAt = html.indexOf('>Full Application Support<');
check('5a the registration card exists', cardAt !== -1);
check('5b it sits above the 3-step pricing grid', cardAt !== -1 && cardAt < gridAt, [cardAt, gridAt]);
check('5c it sits above the Step 3 add-on list', cardAt !== -1 && cardAt < addonsAt, [cardAt, addonsAt]);

const card = cardAt === -1 ? '' : html.slice(cardAt - 400, html.indexOf('</div>', html.indexOf('lf3-reg-actions')) + 400);
check('5d the green CTA buys Apply for LF3 at the $199 tier',
  /class="btn btn-small btn-apply-lf3 stripe-pay" data-tier="apply-lf3-service"/.test(card));
check('5e the green CTA names its price', /Apply for LF3 &mdash; \$199/.test(card));
check('5f Contact Us is still there, beside it',
  /lf3-reg-actions[\s\S]*?>Contact Us</.test(card));
check('5g Contact Us opens the booking form on the right service',
  /c\.value='booking'/.test(card) && /s\.value='entrance-exam-registration'/.test(card));
check('5h the category is set before the service, or the handler clears it',
  card.indexOf("c.value='booking'") < card.indexOf("s.value='entrance-exam-registration'"));

// The copy carries the three things that make the offer legible: who LF3 is,
// what SHOS Med's standing is, and that the exam fee is not the $199.
check('5i names the faculty in full',
  /Third Faculty of Medicine \(LF3\), Charles University, Prague/.test(card));
check('5j states the representative status',
  /authorized United States and Canada representative/.test(card));
check('5k separates the LF3 exam fee from the $199 service fee',
  /examination fee is set by LF3 and paid separately/.test(card));
check('5l does not claim SHOS Med sets or scores the exam',
  /written, administered and scored by LF3/.test(card));

// The styles the card and its green button depend on must exist, or the
// card renders as unstyled markup.
const css = fs.readFileSync(path.join(ROOT, 'dashboard.css'), 'utf8');
// Matched at the start of a line so a selector that survives only inside the
// mobile @media block (indented) does not count as defined.
['.lf3-reg-card', '.lf3-reg-body', '.lf3-reg-badge', '.lf3-reg-note',
 '.lf3-reg-actions', '.btn-apply-lf3'].forEach(sel => {
  check(`6 ${sel} is defined in dashboard.css`,
    css.split('\n').some(line => line.startsWith(sel + ' {') || line.startsWith(sel + ',')));
});
// .btn-small:hover would otherwise repaint the green button in the orange
// accent, so the green hover rule has to come after it.
check('6a the green hover rule wins over .btn-small:hover',
  css.indexOf('.btn-apply-lf3:hover') > css.indexOf('.btn-small:hover'));

console.log(`store-cta: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
