'use strict';
/* The public application guide is the page we want ranking for "how to apply
   to Charles University medical school", so two classes of mistake matter
   more here than anywhere else on the site: a figure that contradicts the
   faculty's own pages, and a product link that strands a logged-out reader
   somewhere other than the thing the article promised them.

   Every number below was read off the faculty's published pages on
   2026-11-21: 3LFEN-818 (how to apply), 3LFEN-819 (entrance exam),
   3LFEN-817 (General Medicine), 3LFEN-652 (admitted students). When the
   cycle rolls over, these are the assertions that should fail first. */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const ARTICLE = 'blog/charles-university-lf3-application-guide.html';
const html = read(ARTICLE);

let passed = 0;
const failures = [];
function check(name, cond) {
  if (cond) passed++;
  else failures.push(name);
}

const visible = html
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ');

// ---------------------------------------------------------------------------
// 1. The facts, against the faculty's own pages.
// ---------------------------------------------------------------------------
// Deliberately no calendar dates: section 8 asserts their absence. These
// are the facts that hold across cycles.
const FACTS = [
  ['CZK 2,000', 'faculty admission fee'],
  ['CZK 440,000', 'annual tuition'],
  ['CZK 1,050', 'school-leaving certificate recognition fee'],
  ['60 multiple-choice questions', 'exam length'],
  ['30 Biology and 30 Chemistry', 'exam split'],
  ['10-minute interview', 'oral part'],
  ['90 students', 'intake'],
  ['25 applicants', 'cap on exam remission'],
];
for (const [fact, why] of FACTS) {
  check('1 states ' + why + ' (' + fact + ')', visible.includes(fact));
}

// Figures that would be wrong. A stale cycle is the likeliest way this page
// starts lying, so the previous cycle's dates are named explicitly.
const WRONG = [
  ['April 30th 2026', 'last cycle deadline'],
  ['May 2026', 'last cycle exam window'],
  ['2026/2027 entry', 'last cycle'],
  ['CZK 1050 ', 'unformatted recognition fee'],
  ['$90', 'the admission fee is quoted in CZK, not a stale dollar figure'],
  ['requires the MCAT', 'LF3 does not require the MCAT'],
];
for (const [bad, why] of WRONG) {
  check('1b does not say "' + bad + '" (' + why + ')', !visible.includes(bad));
}

// ---------------------------------------------------------------------------
// 2. Vaccination timing. The faculty says before practical training in the
//    FIRST study year. The dashboard said year 2, which is the error this
//    article exists partly to stop repeating.
// ---------------------------------------------------------------------------
check('2a vaccination timing is the first study year',
  visible.includes('before you start your practical training in the first study year'));
check('2b does not repeat the year-2 claim',
  !/clinical rotations in Year 2/i.test(visible));
check('2c names both vaccines',
  visible.includes('hepatitis B and measles'));

// ---------------------------------------------------------------------------
// 3. Routes and money. An applicant must be able to tell the faculty's fee
//    from ours, and must not think the $199 covers the CZK 2,000.
// ---------------------------------------------------------------------------
check('3a both routes are explained', visible.includes('Direct to the faculty')
  && visible.includes('Through a representative'));
check('3b no SHOS price is quoted, so none can go stale',
  !/\$199|\$149|\$99|\$69/.test(visible));
check('3b2 the only dollar figure is the tuition conversion',
  (visible.match(/\$[\d,]+/g) || []).every(x => x === '$20,000'));
check('3c the registration link points at the Store, through sign-up',
  html.includes('href="../signup.html?redirect=store"'));
check('3d the faculty fee is named as separate',
  visible.includes("The faculty's CZK 2,000 fee is separate"));
check('3e both ways to pay the faculty fee are offered',
  visible.includes('You can pay Charles University directly')
  && visible.includes('we can take care of it for you'));
check('3f the agreed sentence about the listing is used verbatim',
  visible.includes('LF3 lists SHOS Med as a representative for Canada and the United States'));
check('3f2 the other agency is acknowledged',
  visible.includes('another agency covering both countries'));
check('3f3 both routes are open to US and Canadian applicants',
  visible.includes('both routes are open to you'));
check('3g the waiver criteria are linked',
  html.includes('https://www.lf3.cuni.cz/3LFEN-818.html#5'));

// Store prices this article quotes must match the store itself.
const dash = read('dashboard.html');
check('3h $199 matches the store', dash.includes('Register for the Exam &middot; $199'));
check('3i $149 matches the store', /\$149/.test(dash));
check('3j $99 QBank price matches the store',
  dash.includes('Full QBank Access') && /\$99/.test(dash));

// ---------------------------------------------------------------------------
// 4. Documents table: three waves, each with where it goes.
// ---------------------------------------------------------------------------
check('4a three-column headings', html.includes('>When<') && html.includes('>What to prepare<')
  && html.includes('>Where it goes<'));
check('4b transcript must show teaching hours',
  visible.includes('the number of hours taught'));
check('4c apostille / superlegalisation named',
  /Apostille/.test(visible) && /superlegalisation/i.test(visible));
check('4d the Study Division address is given', visible.includes('Ruská 87'));
check('4e final-year students are addressed',
  visible.includes('still in your final year'));
check('4f foreign-education assessment explained',
  visible.includes('Proof of education'));
check('4g visa guide linked', html.includes('czech-student-visa-us-canada-medical-students-2026.html'));
check('4h cost guide linked', html.includes('charles-university-tuition-2026-cost-breakdown.html'));

// ---------------------------------------------------------------------------
// 5. The two product links, with the exact wording asked for, plus the
//    faculty's own sample paper so the article is not only selling.
// ---------------------------------------------------------------------------
check('5a qbank link uses the agreed wording',
  visible.includes('Try 40 free LF3 biology and chemistry questions'));
check('5b the mock is named as a SHOS mock, not a past paper',
  visible.includes('Our full-length SHOS LF3 mock exams'));
check('5b2 the closing copy is the agreed wording',
  visible.includes('Start with 40 free LF3 practice questions: 20 biology and 20 chemistry, each with an explanation.')
  && visible.includes("When you're ready to practice pacing, take a free 60-question SHOS mock exam under a two-hour timer."));
check('5b3 the primary action is the questions, the mock is secondary',
  /class="btn btn-primary"[^>]*data-shos-cta="qbank-footer">Try 40 free questions</.test(html)
  && /data-shos-cta="mock-footer"[^>]*>Take the free timed mock</.test(html));
check('5c qbank link points at the qbank', html.includes('href="../qbank.html?v=20260423a"'));
check('5d mock link points at the mock', html.includes('href="../practice-exam.html"'));
check('5e free allowance matches the product (40, 20+20)',
  visible.includes('40 free') && visible.includes('20 of each'));
check('5f full access is described without a price that will drift',
  visible.includes('Full access opens the rest of the bank'));
check('5g mock length and timing match the product',
  visible.includes('60 questions against a two-hour timer'));
// Cycle labels were removed from the copy on purpose: they date the page
// and have to be re-edited every year. The article says "the first one is
// free", which stays true whichever cycle freeYear points at.
check('5h the free mock is described without a cycle label',
  visible.includes('The first one is free with an account'));
check('5i no mock cycle labels in the copy',
  !/20\d\d\/20\d\d mock/.test(visible));

const cfg = JSON.parse(read('data/mock-exams/config.json'));
check('5j the free mock really is 2021/2022',
  (cfg.years.find(y => y.year === cfg.freeYear) || {}).label === '2021/2022');
check('5k four mocks exist', cfg.years.length === 4);
check('5l mock duration matches the article',
  cfg.years.every(y => y.durationMinutes === 120 && y.questionCount === 60));
check('5m the faculty sample paper is linked',
  html.includes('3LFEN-819-version1-eng_2025_test.pdf'));
check('5n the answer key is linked',
  html.includes('3LFEN-819-version1-ec_test_key_2025.pdf'));
check('5o the official syllabus is linked',
  html.includes('syllabus_chemistry_biology_physics.pdf'));
check('5p mocks are described as SHOS mock exams, not official papers',
  visible.includes('SHOS LF3 mock exam') && !visible.includes('official past paper'));

// ---------------------------------------------------------------------------
// 6. A logged-out reader must survive the auth detour. The allowlist is the
//    only thing standing between a product link and the dashboard.
// ---------------------------------------------------------------------------
for (const f of ['signup.html', 'login.html']) {
  const s = read(f);
  check('6a ' + f + ' has the destination resolver', s.includes('function shosAuthDest(search)'));
  check('6b ' + f + ' allows qbank', s.includes("if (want === 'qbank') return 'qbank.html"));
  check('6c ' + f + ' allows the mock', s.includes("if (want === 'mock') return 'practice-exam.html'"));
  check('6d ' + f + ' defaults to the dashboard', s.includes("return 'dashboard.html';"));
  check('6e ' + f + ' uses it for the cached-auth shortcut',
    s.includes('window.location.replace(shosAuthDest(window.location.search))'));
  check('6f ' + f + ' keeps the param on the switch link',
    s.includes("a.getAttribute('href').split('?')[0] + qs"));
}
const login = read('login.html');
check('6g login sends sign-ins to the destination, never a hardcoded page',
  login.includes('window.location.href = redirectTo;')
  && !/window\.location\.href = 'dashboard\.html'/.test(login)
  && !/window\.location\.replace\('dashboard\.html'\)/.test(login));
check('6h login carries intent into signup when no account exists',
  login.includes("'signup.html' + window.location.search"));
const practice = read('practice-exam.html');
check('6i the mock auth gate carries the destination',
  practice.includes('login.html?redirect=mock') && practice.includes('signup.html?redirect=mock'));
check('6j the qbank gate carries the destination',
  read('qbank.html').includes("signup.html?redirect=qbank"));

// ---------------------------------------------------------------------------
// 7. Discoverability: canonical, sitemap, inbound links, crawlable HTML.
// ---------------------------------------------------------------------------
check('7a self-referencing canonical',
  html.includes('<link rel="canonical" href="https://shosmed.com/' + ARTICLE + '">'));
check('7b unique title', /<title>How to Apply to Charles University&#39;s|<title>How to Apply to Charles University's/.test(html));
check('7c has a meta description', /<meta name="description" content=".{80,}">/.test(html));
check('7d indexable', html.includes('index,follow'));

const sitemap = read('sitemap.xml');
check('7e in the sitemap', sitemap.includes('https://shosmed.com/' + ARTICLE));
check('7f sitemap entry is high priority',
  /charles-university-lf3-application-guide\.html<\/loc>\s*<lastmod>[^<]+<\/lastmod>\s*<changefreq>[^<]+<\/changefreq>\s*<priority>0\.9<\/priority>/.test(sitemap));

// lf3.html deliberately absent: the callout that linked the guide from the
// overview page was removed at the user's request (it broke the page in half).
const INBOUND = ['community.html', 'blog/index.html',
                 'blog/lf3-entrance-exam-what-is-on-it.html',
                 'blog/applying-to-charles-university.html'];
for (const f of INBOUND) {
  check('7g linked from ' + f,
    read(f).includes('charles-university-lf3-application-guide.html'));
}
const commHtml = read('community.html');
const grid = commHtml.slice(commHtml.indexOf('<div class="blog-article-grid">'),
                            commHtml.indexOf('</div>', commHtml.indexOf('blog-read-link')));
check('7h the guide is the first card in the grid',
  grid.indexOf('charles-university-lf3-application-guide.html') >= 0
  && grid.indexOf('charles-university-lf3-application-guide.html')
     < grid.indexOf('lf3-entrance-exam-what-is-on-it.html'));
check('7h2 the card is tagged Applying',
  /charles-university-lf3-application-guide\.html"[\s\S]{0,200}?<div class="blog-tag">Applying<\/div>/.test(commHtml));

// The inbound links must be real anchors, not script-built, or a crawler
// never sees them.
for (const f of INBOUND) {
  check('7i ' + f + ' links it with a plain <a href>',
    new RegExp('<a[^>]+href="[^"]*charles-university-lf3-application-guide\\.html').test(read(f)));
}

// ---------------------------------------------------------------------------
// 8. Structured data and house style.
// ---------------------------------------------------------------------------
const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const types = ld['@graph'].map(n => n['@type']);
check('8a BlogPosting', types.includes('BlogPosting'));
check('8b HowTo', types.includes('HowTo'));
check('8c FAQPage', types.includes('FAQPage'));
check('8d BreadcrumbList', types.includes('BreadcrumbList'));
const faq = ld['@graph'].find(n => n['@type'] === 'FAQPage');
check('8e FAQ has at least four questions', faq.mainEntity.length >= 4);
check('8f every FAQ has an answer',
  faq.mainEntity.every(q => q.acceptedAnswer && q.acceptedAnswer.text.length > 40));
const howto = ld['@graph'].find(n => n['@type'] === 'HowTo');
check('8g HowTo has the full route', howto.step.length >= 6);
check('8h no em dashes in visible copy', !visible.includes('—'));
check('8i the verification date is shown', visible.includes('21 November 2026'));
// The page carries no calendar dates or cycle labels: it is written to stay
// correct across admission cycles, and the faculty's own pages are linked
// for the dates that move. A year creeping back in is the regression.
const YEARY = visible.replace('21 November 2026', '');
check('8j no admissions-cycle label in the copy', !/20\d\d\/20\d\d entry/.test(YEARY));
check('8k no calendar dates in the copy',
  !/\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) 20\d\d/.test(YEARY));
check('8l no bare year in the title', !/<title>[^<]*20\d\d/.test(html));
check('8m the dates live behind the faculty link instead',
  visible.includes('The faculty publishes the current dates here'));

// ---------------------------------------------------------------------------
console.log('apply-guide-article: ' + passed + ' passed, ' + failures.length + ' failed');
for (const f of failures) console.log('\n  FAIL ' + f);
process.exit(failures.length ? 1 : 0);
