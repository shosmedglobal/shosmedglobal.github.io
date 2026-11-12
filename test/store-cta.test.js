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
const addonsAt = html.indexOf('>Application Support<');
check('5a the registration card exists', cardAt !== -1);
check('5b it sits above the 3-step pricing grid', cardAt !== -1 && cardAt < gridAt, [cardAt, gridAt]);
check('5c it sits above the Step 3 add-on list', cardAt !== -1 && cardAt < addonsAt, [cardAt, addonsAt]);

const card = cardAt === -1 ? '' : html.slice(cardAt - 400, html.indexOf('</div>', html.indexOf('lf3-reg-actions')) + 400);
check('5d the green CTA buys the $199 registration tier',
  /class="btn btn-small btn-apply-lf3 stripe-pay" data-tier="apply-lf3-service"/.test(card));
check('5e the green CTA names its price', /Register for the Exam &middot; \$199/.test(card));
check('5f Contact Us is still there, beside it',
  /lf3-reg-actions[\s\S]*?>Contact Us</.test(card));
check('5g Contact Us opens the booking form on the right service',
  /c\.value='booking'/.test(card) && /s\.value='entrance-exam-registration'/.test(card));
check('5h the category is set before the service, or the handler clears it',
  card.indexOf("c.value='booking'") < card.indexOf("s.value='entrance-exam-registration'"));

// What the $199 buys is a seat at the entrance exam, not an application
// service. The copy has to say that, say where the exam is sat, and not
// imply the fee reaches further than the exam.
check('5i names the faculty in full',
  /Third Faculty of Medicine \(LF3\), Charles University, Prague/.test(card));
check('5j names the programme before the faculty, not as a trailing clause',
  card.indexOf('six-year English-taught MD programme') < card.indexOf('Third Faculty of Medicine'));
check('5k states the representative status',
  /authorized representative for the United States and Canada/.test(card));
check('5p the $199 is stated as registering for the exam',
  /\$199 registers you to sit the entrance examination/.test(card));
check('5q says the $199 is the whole cost of sitting the exam',
  /full cost of the examination, with nothing further to pay/.test(card));
// Where the exam is held can change, so the copy must not name a location.
check('5q2 the card names no exam location',
  !/held (in|outside)/.test(card) && !/travel to Prague/.test(card),
  (card.match(/.{0,30}(held (in|outside)|travel to Prague).{0,30}/g) || []));
check('5r tuition is named as the faculty fee, not part of the $199',
  /the faculty then charges tuition/.test(card));
check('5s document help is secondary, not the product',
  /lf3-reg-note[\s\S]*?documents LF3 requires/.test(card));
check('5t the card never calls the $199 an application service',
  !/Apply for LF3/.test(card) && !/application submission/.test(card),
  (card.match(/.{0,30}Apply for LF3.{0,30}/g) || []));

// The same $199 tier is sold in three other places. All of them have to call
// it the same thing, or the buyer sees one name here and another on the
// receipt. (The Stripe product name itself is set in the Stripe dashboard and
// is not checkable from here.)
const PRODUCT_NAME = 'LF3 Entrance Exam Registration';
check('5u the Step 3 add-on uses the product name',
  new RegExp('<span>' + PRODUCT_NAME + '</span>').test(html));
check('5v both tier selects use the product name',
  (html.match(new RegExp('<option value="apply-lf3-service">' + PRODUCT_NAME, 'g')) || []).length === 2,
  (html.match(/<option value="apply-lf3-service">[^<]*/g) || []));
check('5w nothing in the store still says "Apply for LF3"',
  !/>Apply for LF3/.test(storeMarkupForName()),
  (storeMarkupForName().match(/.{0,20}>Apply for LF3.{0,20}/g) || []));
function storeMarkupForName() {
  const a = html.indexOf('id="viewStore"');
  const b = html.indexOf('<!-- ========== VIEW:', a + 10);
  return html.slice(a, b === -1 ? html.length : b);
}

// The Step 3 add-on blurb is written twice, once in the dashboard and once on
// the public applicants.html. They have to say the same thing, and neither may
// name where the exam is held, because that can change.
function addonBlurb(src) {
  const at = src.indexOf('<span>' + PRODUCT_NAME + '</span>');
  if (at === -1) return null;
  const m = src.slice(at).match(/<p class="addon-desc">([\s\S]*?)<\/p>/);
  return m ? m[1] : null;
}
const dashBlurb = addonBlurb(html);
const pubBlurb = addonBlurb(fs.readFileSync(path.join(ROOT, 'applicants.html'), 'utf8'));
check('5z1 the dashboard add-on has a blurb', !!dashBlurb);
check('5z2 the public add-on has a blurb', !!pubBlurb);
check('5z3 the two blurbs are identical', dashBlurb === pubBlurb, [dashBlurb, pubBlurb]);
// Pinned verbatim: this wording was chosen by the client. Unlike the card,
// it does name where the exam is held; that is deliberate, so the card's own
// no-location rule (5q2) is not applied to it.
const APPROVED_BLURB = 'Registers you to sit the LF3 entrance examination, held outside the '
  + 'Czech Republic, for the 6-year English-taught MD at Charles University, Third Faculty '
  + 'of Medicine. Guidance on the documents the faculty requires is included.';
[['dashboard.html', dashBlurb], ['applicants.html', pubBlurb]].forEach(([f, b]) => {
  check(`5z4 ${f} add-on blurb is the approved wording`, b === APPROVED_BLURB, b);
});

// The other files that render this product's name to a customer.
const SIBLINGS = ['applicants.html', 'contact-booking.js', 'product-catalog.js', 'success.html'];
SIBLINGS.forEach(f => {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  check(`5x ${f} uses the product name`, src.includes(PRODUCT_NAME), null);
  check(`5y ${f} no longer calls it "Apply for LF3"`,
    !/'Apply for LF3'|>Apply for LF3</.test(src),
    (src.match(/.{0,24}Apply for LF3.{0,24}/g) || []));
});

// House style: no em dashes in copy a customer reads. Price labels use the
// middle dot the pricing cards already use ("total · 6 months access").
check('5l the card copy has no em dash', !card.includes('—') && !card.includes('&mdash;'),
  (card.match(/.{0,30}(—|&mdash;).{0,30}/g) || []).slice(0, 3));
const storeStart = html.indexOf('id="viewStore"');
const storeEnd = html.indexOf('<!-- ========== VIEW:', storeStart + 10);
const storeMarkup = html.slice(storeStart, storeEnd === -1 ? html.length : storeEnd);
check('5m no em-dash price labels anywhere in the store',
  !/&mdash;\s*\$/.test(storeMarkup) && !/—\s*\$/.test(storeMarkup),
  (storeMarkup.match(/.{0,24}(—|&mdash;)\s*\$.{0,10}/g) || []).slice(0, 5));

// The add-on buttons read the price back off the chosen option's label, so
// the separator they split on has to be the one the labels use.
check('5n the add-on buttons split on the separator the labels use',
  (html.match(/label\.split\(\/\[\u2014\u00b7\]\/\)/g) || []).length === 2,
  (html.match(/label\.split\([^)]*\)/g) || []));

// The Med School path opens on the registration card: the "Store" heading
// and the "Med School Application Plans" intro were removed as redundant.
check('5o the applicant store opens with the registration card',
  html.indexOf('id="storeApplicantServices"') < cardAt
  && !html.includes('Med School Application Plans')
  && !html.includes('Browse and purchase services'));

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
