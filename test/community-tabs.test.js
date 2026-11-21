'use strict';
/* The community page splits its content by audience: a reader applying to
   medical school and a reader preparing for the US match want different
   things, and before this split they were interleaved in one list.
   These checks guard the split itself, not the prose, so an article added
   later cannot quietly land in both panels or in neither. */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'community.html'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'community.css'), 'utf8');

let passed = 0;
const failures = [];
function check(name, cond) {
  if (cond) passed++;
  else failures.push(name);
}

// A panel's markup, from its opening div to the next panel or the section end.
function panel(id) {
  const open = html.indexOf('id="panel-' + id + '"');
  if (open < 0) return '';
  const start = html.lastIndexOf('<div', open);
  // panels are siblings; the next one starts at the next id="panel-
  const nextPanel = html.indexOf('id="panel-', open + 10);
  const end = nextPanel < 0
    ? html.indexOf('</section>', open)
    : html.lastIndexOf('<!--', nextPanel);
  return html.slice(start, end);
}

const MED = panel('medschool');
const RES = panel('residency');

// ---------------------------------------------------------------------------
// 1. Two tabs, named for the two audiences, not for content types.
// ---------------------------------------------------------------------------
check('1a exactly two tabs', (html.match(/class="community-tab[ "]/g) || []).length === 2);
check('1b medical school tab', html.includes('data-tab="medschool">Medical School<'));
check('1c residency tab', html.includes('data-tab="residency">Residency &amp; USMLE<'));
check('1d no Blog & Articles tab', !html.includes('data-tab="blog"'));
check('1e no separate Q&A tab', !html.includes('data-tab="forum"'));
check('1f medical school is the default', html.includes('class="community-tab active" id="tab-medschool"'));

// ---------------------------------------------------------------------------
// 2. Both panels exist and the default one is the visible one.
// ---------------------------------------------------------------------------
check('2a medschool panel', MED.length > 0);
check('2b residency panel', RES.length > 0);
check('2c medschool panel active', MED.includes('class="community-panel active"'));
check('2d residency panel starts hidden', RES.includes('hidden'));
check('2e panels are tabpanels', (html.match(/role="tabpanel"/g) || []).length === 2);
check('2f tablist present', html.includes('role="tablist"'));
check('2g tabs are tabs', (html.match(/role="tab"/g) || []).length === 2);
check('2h one tab selected', (html.match(/aria-selected="true"/g) || []).length === 1);

// ---------------------------------------------------------------------------
// 3. Every article sits in exactly one panel, on the right side of the split.
// ---------------------------------------------------------------------------
const MED_ARTICLES = [
  // the hub article for the applying cluster, first card in the panel
  'blog/charles-university-lf3-application-guide.html',
  'blog/lf3-entrance-exam-what-is-on-it.html',
  'blog/mcat-vs-charles-university-entrance-exam.html',
  'blog/applying-to-charles-university.html',
  'blog/charles-university-tuition-2026-cost-breakdown.html',
  'blog/czech-student-visa-us-canada-medical-students-2026.html',
];
const RES_ARTICLES = [
  'blog/usmle-step-1-pass-fail-img-2026.html',
  'blog/from-acceptance-to-residency.html',
];

for (const href of MED_ARTICLES) {
  check('3a ' + href + ' is in the medical school panel', MED.includes(href));
  check('3b ' + href + ' is not also in residency', !RES.includes(href));
}
for (const href of RES_ARTICLES) {
  check('3c ' + href + ' is in the residency panel', RES.includes(href));
  check('3d ' + href + ' is not also in medical school', !MED.includes(href));
}

const allCards = (html.match(/class="blog-article-card"/g) || []).length;
check('3e every article card is accounted for',
  allCards === MED_ARTICLES.length + RES_ARTICLES.length);
check('3f medical school panel holds six',
  (MED.match(/class="blog-article-card"/g) || []).length === 6);
check('3f2 the application guide is the first card in the panel',
  MED.indexOf('charles-university-lf3-application-guide.html')
  < MED.indexOf('lf3-entrance-exam-what-is-on-it.html'));
check('3g residency panel holds two',
  (RES.match(/class="blog-article-card"/g) || []).length === 2);

// Each linked article exists on disk, so a split never strands a dead card.
for (const href of MED_ARTICLES.concat(RES_ARTICLES)) {
  check('3h ' + href + ' exists', fs.existsSync(path.join(ROOT, href)));
}

// ---------------------------------------------------------------------------
// 4. The questions moved into the panels. A reader asking about the match
//    should not have to read past entrance exam questions to find them.
// ---------------------------------------------------------------------------
check('4a medschool questions', (MED.match(/class="qa-card"/g) || []).length === 3);
check('4b residency questions', (RES.match(/class="qa-card"/g) || []).length === 2);
check('4c every question is in a panel',
  (html.match(/class="qa-card"/g) || []).length === 5);
check('4d med panel asks about the entrance exam',
  MED.includes('What subjects are on the Charles University'));
check('4e med panel asks about student life',
  MED.includes('What is it really like studying medicine'));
check('4f med panel asks about cost',
  MED.includes('How much does it cost to study medicine'));
check('4g residency panel asks about matching',
  RES.includes('Can international medical graduates'));
check('4h residency panel asks about Step 1 timing',
  RES.includes('When should I start studying for USMLE Step 1'));
check('4i each panel heads its questions',
  (html.match(/Common Questions/g) || []).length === 2);
check('4j each panel offers a way to ask',
  (html.match(/data-contact-modal="consultation"[^>]*>Ask us directly/g) || []).length === 2);

// The answers carry Question/Answer microdata; splitting them must not drop it.
check('4k question microdata intact',
  (html.match(/itemtype="https:\/\/schema\.org\/Question"/g) || []).length === 5);
check('4l answer microdata intact',
  (html.match(/itemtype="https:\/\/schema\.org\/Answer"/g) || []).length === 5);
check('4m the page still declares an FAQPage', html.includes('"@type": "FAQPage"'));

// ---------------------------------------------------------------------------
// 5. The topic chip says the topic. Repeating the tab's own name in every
//    chip would make the chips useless.
// ---------------------------------------------------------------------------
const chips = (html.match(/<div class="blog-tag">([^<]+)<\/div>/g) || [])
  .map(s => s.replace(/<[^>]+>/g, ''));
check('5a one chip per card', chips.length === allCards);
check('5b chips are not all the same', new Set(chips).size >= 4);
check('5c no chip just repeats a tab name',
  !chips.includes('Medical School') && !chips.includes('Residency & USMLE'));
check('5d the cost article is chipped Cost', MED.includes('<div class="blog-tag">Cost</div>'));
check('5e the visa article is chipped Visa', MED.includes('<div class="blog-tag">Visa</div>'));
check('5f the cost question is no longer filed under entrance exams',
  MED.includes('<span class="post-category">Cost &amp; Tuition</span>'));

// ---------------------------------------------------------------------------
// 6. Deep links. Another page should be able to send a reader straight to
//    the residency half.
// ---------------------------------------------------------------------------
check('6a a hash opens a tab', html.includes("showCommunityTab((location.hash || '').replace('#', ''), false)"));
check('6b clicking a tab writes the hash', html.includes("history.replaceState(null, '', '#' + name)"));
check('6c hashchange is handled', html.includes("addEventListener('hashchange'"));
check('6d switching toggles aria-selected', html.includes("setAttribute('aria-selected', 'true')"));
check('6e switching toggles hidden', html.includes('panel.hidden = false'));

// ---------------------------------------------------------------------------
// 7. Styles the new markup depends on, and the cache key that ships them.
// ---------------------------------------------------------------------------
check('7a panel-qa rule exists', /\.panel-qa\s*\{/.test(css));
check('7b panel-qa is separated by a rule', /\.panel-qa\s*\{[^}]*border-top/.test(css));
check('7c sparse grid rule exists', /\.blog-article-grid--sparse\s*\{/.test(css));
check('7d the thin panel uses it', RES.includes('blog-article-grid--sparse'));
check('7e the full panel does not', !MED.includes('blog-article-grid--sparse'));
check('7f stylesheet cache key was bumped',
  /community\.css\?v=20261121-tabs/.test(html));
check('7g no stale stylesheet key', !html.includes('community.css?v=20260902-xss'));

// ---------------------------------------------------------------------------
// 8. House style.
// ---------------------------------------------------------------------------
const visible = html
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, ' ');
check('8a no em dashes in visible copy', !visible.includes('—'));

// ---------------------------------------------------------------------------
console.log('community-tabs: ' + passed + ' passed, ' + failures.length + ' failed');
for (const f of failures) console.log('\n  FAIL ' + f);
process.exit(failures.length ? 1 : 0);
