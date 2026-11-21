'use strict';
/* The Free Resources view used to carry a fixed "Free Resources" heading,
   which only repeated the sidebar item the reader had just clicked. The
   heading now names the open tab. Two things can break that: the heading and
   a tab label drifting apart, and the Study Plan's subject tabs, which share
   the .resource-tab class, retitling a view they have nothing to do with. */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'dashboard.html'), 'utf8');

let passed = 0;
const failures = [];
function check(name, cond) {
  if (cond) passed++;
  else failures.push(name);
}

const view = (() => {
  const a = html.indexOf('id="viewResources"');
  const b = html.indexOf('VIEW: STORE', a);
  return html.slice(a, b);
})();

// ---------------------------------------------------------------------------
// 1. The heading exists, inside the view, above the tabs.
// ---------------------------------------------------------------------------
check('1a heading element', html.includes('<h1 id="resourcesTitle">'));
check('1b heading is in the resources view', view.includes('id="resourcesTitle"'));
check('1c heading precedes the tab rows',
  view.indexOf('id="resourcesTitle"') < view.indexOf('id="applicantResourceTabs"'));
check('1d the old fixed heading is gone', !html.includes('<h1>Free Resources</h1>'));
check('1e the old subtitle is gone', !html.includes('id="resourcesDesc"'));

// ---------------------------------------------------------------------------
// 2. The first tab names both halves of what its panel holds: the exam
//    section and the seven numbered application steps.
// ---------------------------------------------------------------------------
check('2a first tab renamed', html.includes('data-tab="examGuides">Entrance Exam &amp; How to Apply<'));
check('2b the vaguer old label is gone', !html.includes('Entrance Exam &amp; Application<'));
check('2c the card does not repeat the view heading',
  !view.includes('>How to Apply</h3>'));
check('2c2 its panel really does hold the route',
  view.includes('Register for the entrance exam')
  && view.includes('Enroll and start'));
check('2c3 the eligibility callout sits above the card, under the tabs',
  view.indexOf('You need a high school diploma to start at LF3.') <
  view.indexOf('class="dash-card"'));
check('2c4 the prep sentence comes before the exam table',
  view.indexOf('Prepare with the') < view.indexOf('Biology (30 MCQ)'));
// The exam's shape was a card of its own above the steps. It is now inside
// step 4, which is where a reader meets the exam in the route.
check('2d step 4 names the faculty',
  view.includes('Take the exam of the Third Faculty of Medicine (LF3)'));
check('2d2 the exam table moved into the steps',
  view.includes('Biology (30 MCQ) + Chemistry (30 MCQ)'));
check('2d3 the table sits inside step 4',
  view.indexOf('Biology (30 MCQ)') > view.indexOf('Take the exam of the Third Faculty')
  && view.indexOf('Biology (30 MCQ)') < view.indexOf('Send your documents to the Third Faculty'));
check('2d4 no leftover exam card above the steps',
  !view.includes('>LF3 Entrance Exam</h3>'));
const steps = (view.match(/>[1-7]<\/span>\n\s+(Register|Apply|Pay|Take|Send|Before|Enroll)/g) || []);
check('2e seven numbered steps are present', steps.length === 7);

// The heading is written from the label, so the default heading in the markup
// has to match the tab that is active in the markup.
const activeTab = view.match(/<button class="resource-tab active" data-tab="examGuides">([^<]+)<\/button>/);
const defaultHeading = html.match(/<h1 id="resourcesTitle">([^<]+)<\/h1>/);
check('2f default heading matches the active tab',
  !!activeTab && !!defaultHeading && activeTab[1] === defaultHeading[1]);

// ---------------------------------------------------------------------------
// 3. The heading follows the tab, and only the tabs that own this view.
// ---------------------------------------------------------------------------
check('3a there is a setter', html.includes('function setResourcesTitle(tab)'));
check('3b it reads the tab label', html.includes("heading.textContent = tab.textContent.trim()"));
check('3c clicking a tab calls it', html.includes('setResourcesTitle(tab);'));
check('3d only the two resource rows drive it',
  html.includes("const RESOURCE_TAB_ROWS = ['applicantResourceTabs', 'studentResourceTabs'];"));
check('3e rows outside that list are ignored',
  html.includes("if (!row || RESOURCE_TAB_ROWS.indexOf(row.id) === -1) return;"));
check('3f the study plan subject tabs are such a row',
  html.includes('data-sp-tab="chemistry"') && !html.includes('data-sp-tab="chemistry" data-tab'));
check('3g switching applicant/residency retitles too',
  html.includes('const activeResourceRow = isStudent ? studentResourceTabs : applicantResourceTabs;'));

// ---------------------------------------------------------------------------
// 4. The source-of-truth notice closes the view rather than opening it.
// ---------------------------------------------------------------------------
check('4a notice still present', view.includes('Always verify with the official source.'));
check('4b it sits after the last panel',
  view.indexOf('Always verify with the official source.') > view.indexOf('id="tabImgTips"'));
check('4c it is outside the panels, so every tab shows it',
  view.lastIndexOf('resource-panel') < view.indexOf('Always verify with the official source.'));

// ---------------------------------------------------------------------------
// 5. Every inline script still parses. A heading rewrite that throws would
//    take the whole dashboard with it.
// ---------------------------------------------------------------------------
let blocks = 0;
let parseError = null;
for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  try {
    new Function(m[1]);
    blocks++;
  } catch (e) {
    parseError = e.message;
  }
}
check('5a inline scripts parse', parseError === null);
check('5b both script blocks checked', blocks === 2);

// ---------------------------------------------------------------------------
// 6. Headings and titles in this tab name the faculty in full. Body text
//    keeps LF3, which by then the reader has been told the meaning of.
// ---------------------------------------------------------------------------
const TITLES = [
  'You need a high school diploma to start at the Third Faculty of Medicine (LF3).',
  'Pay the Third Faculty of Medicine (LF3) application fee',
  'Take the exam of the Third Faculty of Medicine (LF3)',
  'Send your documents to the Third Faculty of Medicine (LF3)',
  '<h4>Third Faculty of Medicine (LF3) <span class="faculty-badge">Prague</span></h4>',
  '>Third Faculty of Medicine (LF3) Tuition</h3>',
];
for (const t of TITLES) check('6a title spelled out: ' + t.slice(0, 48), view.includes(t));
check('6b no title says LF3 on its own',
  !view.includes('Pay the LF3 application fee')
  && !view.includes('Send LF3 your documents')
  && !view.includes('>LF3 Tuition</h3>'));
check('6c the card title is not doubled',
  !view.includes('Third Faculty of Medicine (LF3) - Third Faculty of Medicine'));
check('6d body text still uses the short form',
  view.includes('both written to the LF3 exam scope'));

// ---------------------------------------------------------------------------
console.log('resources-heading: ' + passed + ' passed, ' + failures.length + ' failed');
for (const f of failures) console.log('\n  FAIL ' + f);
process.exit(failures.length ? 1 : 0);
