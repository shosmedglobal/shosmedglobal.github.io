/**
 * Tests for how exponents and indices are presented in question content.
 *
 * Run:  node test/sup-sub-presentation.test.js
 *
 * A reader reported that the superscripts in the SI-unit question looked
 * detached from the units they belong to. Nothing in the card layout
 * separated them: the option row is a flex container, but its children are
 * the letter circle and one text span, so the row's gap never falls between
 * a unit and its exponent, and the measured horizontal distance between a
 * base and its exponent was 0 everywhere.
 *
 * The separation was vertical and came from the browser defaults, which no
 * stylesheet overrode: `font-size: smaller` makes an exponent 0.83em and
 * `vertical-align: super` lifts it roughly 0.46em above the baseline, which
 * puts a glyph that large clear of the top of its own base letter. The lift
 * is a fraction of the surrounding font size, so the same formula sat at a
 * different height in an option, a keyed heading and a Key Concept.
 *
 * The fix is one scoped rule in style.css. This file guards it, and guards
 * the thing that must NOT happen: the bank text is not rewritten to work
 * around a presentation problem.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const CSS = read('style.css');

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail === undefined ? '' : '  [got: ' + JSON.stringify(detail) + ']'));
}

/* ------------------------------------------------- 1. the rule itself */

const CONTAINERS = ['.quiz-mainbox', '#reviewContainer', '.exam-app', '#qviewOverlay'];
const block = CSS.slice(CSS.indexOf(':is(.quiz-mainbox'));

check('1a style.css carries a scoped sup/sub rule', CSS.indexOf(':is(.quiz-mainbox') >= 0);
for (const c of CONTAINERS) {
  check('1b the rule covers ' + c, block.indexOf(c) >= 0);
}
check('1c it applies to both sup and sub', /:is\(sup,\s*sub\)/.test(block));
check('1d the exponent gets one relative size', /font-size:\s*0\.72em/.test(block));
check('1e it is taken out of the line box', /line-height:\s*0/.test(block));
check('1f it is offset by position, not by the UA super/sub shift',
  /position:\s*relative/.test(block) && /vertical-align:\s*baseline/.test(block));
check('1g a multi-character exponent cannot split', /white-space:\s*nowrap/.test(block));

const supTop = block.match(/sup\s*\{\s*top:\s*(-?[\d.]+)em/);
const subBottom = block.match(/sub\s*\{\s*bottom:\s*(-?[\d.]+)em/);
check('1h a superscript is raised', supTop && parseFloat(supTop[1]) < 0, supTop && supTop[1]);
check('1i a subscript is lowered', subBottom && parseFloat(subBottom[1]) < 0, subBottom && subBottom[1]);
check('1j the raise is a fraction of the base font, not a fixed pixel count',
  supTop && /em/.test(supTop[0]) && subBottom && /em/.test(subBottom[0]));

/* The offsets must stay smaller than the glyph, or the exponent floats off
   its base again, which is the defect this rule exists to fix. The browser
   default that caused the report was 0.46em. */
check('1k the raise is smaller than the default that caused the report',
  supTop && Math.abs(parseFloat(supTop[1])) < 0.46, supTop && supTop[1]);

/* ------------------------------------------- 2. the rule stays scoped */

/* The marketing pages set footnote daggers in <sup> with their own inline
   sizes and offsets. An unscoped element rule would move those too. */
const unscoped = CSS.match(/^\s*(sup|sub)\s*(,\s*(sup|sub)\s*)?\{/m);
check('2a style.css has no unscoped sup/sub element rule', !unscoped, unscoped && unscoped[0]);

for (const page of ['applicants.html', 'lf3.html']) {
  const src = read(page);
  check('2b ' + page + ' uses <sup> for footnotes', /<sup/.test(src));
  check('2c ' + page + ' is outside every container the rule names',
    CONTAINERS.every(c => src.indexOf(c.replace(/^[.#]/, '')) < 0));
}

/* ------------------------------------- 3. the containers really exist */

check('3a .quiz-mainbox is the QBank card wrapper', /class="quiz-mainbox"/.test(read('qbank.html')));
check('3b #reviewContainer is the end-of-quiz review', /id="reviewContainer"/.test(read('qbank.html')));
check('3c .exam-app is the practice exam', /class="exam-app"/.test(read('practice-exam.html')));
check('3d #qviewOverlay is the admin question viewer', /id="qviewOverlay"/.test(read('dashboard.html')));

/* --------------------------------- 4. the pages actually get the file */

for (const page of ['qbank.html', 'dashboard.html', 'practice-exam.html']) {
  const m = read(page).match(/<link rel="stylesheet" href="style\.css([^"]*)"/);
  check('4a ' + page + ' links style.css', !!m);
  check('4b ' + page + ' versions that link so the rule reaches returning readers',
    m && /^\?v=/.test(m[1]), m && m[1]);
}

/* ------------------- 5. this was fixed in CSS, not by rewriting text */

const physics = JSON.parse(read('questions-physics.json')).physics;
const q5 = physics.find(r => r.id === 'phys-65');
check('5a the SI-unit question is still in the bank', !!q5);
check('5b its options still carry real superscript markup', q5 && JSON.stringify(q5.options) === JSON.stringify([
  'kg·m<sup>2</sup>·s<sup>−2</sup>',
  'kg·m·s<sup>−2</sup>',
  'kg·m<sup>2</sup>·s<sup>−1</sup>',
  'kg·m<sup>−1</sup>·s<sup>−2</sup>'
]), q5 && q5.options);
check('5c its exponents use a real minus, not a hyphen',
  q5 && q5.options.every(o => !/<sup>-/.test(o)));
check('5d no option was flattened to plain text', q5 && q5.options.every(o => /<sup>/.test(o)));

/* A text workaround would show up as the markup disappearing from the banks
   in bulk. These are the counts at the time the rule was added. */
const counts = {};
for (const f of ['questions.json', 'questions-physics.json']) {
  const raw = read(f);
  counts[f] = { sup: (raw.match(/<sup>/g) || []).length, sub: (raw.match(/<sub>/g) || []).length };
}
check('5e questions.json keeps its 357 superscripts and 409 subscripts',
  counts['questions.json'].sup === 357 && counts['questions.json'].sub === 409, counts['questions.json']);
check('5f questions-physics.json keeps its 667 superscripts and 651 subscripts',
  counts['questions-physics.json'].sup === 667 && counts['questions-physics.json'].sub === 651,
  counts['questions-physics.json']);

/* ------------------------------ 6. the card design is left as it was */

const qcss = read('qbank.css');
const optRule = qcss.slice(qcss.indexOf('.quiz-option {'), qcss.indexOf('.quiz-option:hover'));
check('6a the option row still separates the letter from the text with one gap',
  /gap:\s*14px/.test(optRule), optRule.match(/gap:[^;]*/));
check('6b the letter circle is still 32px and does not shrink',
  /width:\s*32px/.test(qcss) && /flex-shrink:\s*0/.test(qcss));
check('6c the new rule changes no spacing of its own',
  !/margin/.test(block) && !/padding/.test(block) && !/\bgap:/.test(block));

console.log('sup-sub-presentation: ' + passed + ' passed, ' + failures.length + ' failed');
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
