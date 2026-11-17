/**
 * Chemistry review batch 3, focused follow-up after the scientific reread.
 *
 * Two sentence replacements in display Q46 / chem-167 and nothing else:
 *   1. the main explanation describes the daughter nucleus instead of saying
 *      the parent "loses" mass and atomic number units;
 *   2. option A's feedback gives the electron a small but nonzero rest mass
 *      and compares it with a helium-4 nucleus by mass NUMBER.
 *
 * All-or-nothing: each anchor must match exactly once, the surrounding text
 * must be untouched, and every other record in the bank must be byte-identical,
 * or nothing is written.
 *
 *   node scripts/apply-chem-review-batch3-followup.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QFILE = path.join(ROOT, 'questions.json');
const TARGET = 'chem-167';
const L = 'ABCD';

const EDITS = [
  ['In α decay, the parent nucleus loses 4 mass units and 2 atomic number units.',
   'In alpha decay, the daughter nucleus has a mass number 4 lower and an atomic number 2 lower than the parent nucleus.'],
  ['An electron has negligible mass and a charge of −1, not the mass 4 and charge +2 of a helium nucleus.',
   'An electron has a small but nonzero rest mass and charge −1; a helium-4 nucleus has mass number 4 and charge +2.']
];

const problems = [];
const fail = m => problems.push(m);

const raw = fs.readFileSync(QFILE, 'utf8');
const data = JSON.parse(raw);
const BEFORE = JSON.parse(raw);
const q = data.chemistry.find(r => r.id === TARGET);
if (!q) { console.error(TARGET + ' is not in the bank'); process.exit(1); }
const was = JSON.parse(JSON.stringify(q));

for (const [from, to] of EDITS) {
  const n = q.explanation.split(from).length - 1;
  if (n !== 1) { fail(`anchor matched ${n} times, expected 1 -> "${from.slice(0, 70)}"`); continue; }
  q.explanation = q.explanation.replace(from, () => to);
}

// ---------------------------------------------------------------- post-checks
if (q.question !== was.question) fail('the stem changed');
if (JSON.stringify(q.options) !== JSON.stringify(was.options)) fail('the options changed');
if (q.correct !== was.correct) fail('the answer letter moved');
if (L[q.correct] !== 'B') fail('the key should be B');

const exp = q.explanation;
for (const [from, to] of EDITS) {
  if (exp.indexOf(from) >= 0) fail(`old sentence still present -> "${from.slice(0, 70)}"`);
  if (exp.split(to).length - 1 !== 1) fail(`new sentence should appear once -> "${to.slice(0, 70)}"`);
}
// the two replacements are the only textual change
let rebuilt = was.explanation;
for (const [from, to] of EDITS) rebuilt = rebuilt.replace(from, () => to);
if (rebuilt !== exp) fail('something other than the two sentences changed');

// everything the follow-up must preserve
const KEEP = [
  '<h4>Correct Answer: B. Alpha decay</h4>',
  'An α particle consists of 2 protons and 2 neutrons (a helium-4 nucleus, He-4).',
  'Among the usual alpha, beta and gamma decay emissions, alpha particles have the largest rest mass',
  '<strong>A. Beta decay:</strong> Beta-minus decay emits an electron from the nucleus as a neutron converts into a proton.',
  '<strong>C. Gamma decay:</strong>',
  '<strong>D. Positron emission:</strong>',
  'An alpha particle is a helium-4 nucleus: two protons and two neutrons.',
  "<p class='exp-key'>Bottom Line: Alpha particle = He-4 nucleus (2p + 2n); reduces mass number by 4 and atomic number by 2.</p>"
];
for (const k of KEEP) if (exp.indexOf(k) < 0) fail(`text that should have survived is missing -> "${k.slice(0, 70)}"`);

const pts = exp.match(/<ul>([\s\S]*?)<\/ul>/);
if (!pts || (pts[1].match(/<li>/g) || []).length !== 5) fail('should still carry five educational points');
if (pts && pts[0] !== (was.explanation.match(/<ul>[\s\S]*?<\/ul>/) || [])[0]) fail('the educational points changed');
if ((exp.match(/Bottom Line:/g) || []).length !== 1) fail('should have exactly one Bottom Line');
if ((exp.match(/<h4>/g) || []).length !== 3) fail('should have exactly three h4 headings');
if ((exp.match(/<p><strong>[ABCD]\./g) || []).length !== 3) fail('should have three distractor paragraphs');
for (let i = 0; i < 4; i++) {
  if (i === q.correct) continue;
  const want = '<strong>' + L[i] + '. ' + q.options[i] + ':</strong>';
  if (exp.split(want).length - 1 !== 1) fail(`the ${L[i]} heading should match its option exactly once`);
}
for (const t of ['p', 'strong', 'em', 'ul', 'li', 'h4', 'sub', 'sup']) {
  const o = (exp.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
  const c = (exp.match(new RegExp('</' + t + '>', 'g')) || []).length;
  if (o !== c) fail(`<${t}> ${o} open vs ${c} close`);
}
// counting tags cannot see a doubled pair such as "</p></p><p><p>"
if (/<\/p>\s*<\/p>/.test(exp)) fail('doubled </p>');
if (/<p(?: class='[^']*')?>\s*<p[ >]/.test(exp)) fail('doubled <p>');
let depth = 0;
for (const m of exp.match(/<p(?: class='[^']*')?>|<\/p>/g) || []) {
  depth += m === '</p>' ? -1 : 1;
  if (depth < 0 || depth > 1) { fail('paragraph nesting is wrong'); break; }
}
if (depth !== 0) fail('unbalanced paragraphs');
if (exp.indexOf('—') >= 0) fail('em dash');
if (/[‘’“”]/.test(exp)) fail('curly quote');
if (/<table/.test(exp)) fail('unexpected table');

// nothing else in the bank moved
if (JSON.stringify(BEFORE.biology) !== JSON.stringify(data.biology)) fail('biology changed');
for (let i = 0; i < BEFORE.chemistry.length; i++) {
  const a = BEFORE.chemistry[i], b = data.chemistry[i];
  if (a.id !== b.id) { fail('chemistry order changed at index ' + i); break; }
  if (a.id === TARGET) continue;
  if (JSON.stringify(a) !== JSON.stringify(b)) fail(a.id + ': changed but is not the target');
}
if (data.biology.length !== 629 || data.chemistry.length !== 485) fail('bank counts changed');

// ---------------------------------------------------------------- write
if (problems.length) {
  console.error('NOT WRITTEN. ' + problems.length + ' problem(s):');
  problems.forEach(p => console.error('  - ' + p));
  process.exit(1);
}
fs.writeFileSync(QFILE, JSON.stringify(data, null, 2) + '\n');
console.log('chem-167 (display Q46): 2 sentences replaced, nothing else changed.');
console.log('  1. main explanation : daughter nucleus described instead of the parent "losing" units');
console.log('  2. option A feedback: electron given a small but nonzero rest mass, compared by mass number');
