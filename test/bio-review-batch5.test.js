/**
 * Verifies the RESULT of the batch 5 biology review in questions.json.
 *
 *   node test/bio-review-batch5.test.js
 *
 * The review asked for proportionate checks rather than a new testing
 * framework for prose edits, so this mirrors the narrower batch 4 suite:
 * scope and keys, the four repeated educational-point blocks, the claims the
 * review named, the rewrite and the eight substantial repairs, renamed
 * options kept in sync with their headings, and the structural invariants
 * that catch a half-applied edit. Every "gone" check is paired with a check
 * that the string really was in the before-fixture, so a typo cannot pass.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch5-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch5-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch5-idmap.json'), 'utf8'));

const BY = Object.fromEntries(data.biology.map(q => [q.id, q]));
const MAP = idmap.map;
const IDS = Object.values(MAP);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const qnum = id => Object.keys(MAP).find(n => MAP[n] === id);

const KEYS = {
  1: 'D', 2: 'C', 3: 'D', 4: 'D', 5: 'C', 6: 'C', 7: 'D', 8: 'C', 9: 'D', 10: 'C',
  11: 'C', 12: 'D', 13: 'C', 14: 'D', 15: 'D', 16: 'D', 17: 'C', 18: 'D', 19: 'C', 20: 'D',
  21: 'D', 22: 'B', 23: 'B', 24: 'C', 25: 'B', 26: 'B', 27: 'B', 28: 'B', 29: 'B', 30: 'B',
  31: 'B', 32: 'A', 33: 'B', 34: 'C', 35: 'C', 36: 'D', 37: 'B', 38: 'B', 39: 'B', 40: 'C',
  41: 'B', 42: 'B', 43: 'B', 44: 'B', 45: 'B', 46: 'C', 47: 'C', 48: 'B', 49: 'B', 50: 'B',
  51: 'C', 52: 'D', 53: 'B', 54: 'B', 55: 'B', 56: 'A', 57: 'B', 58: 'C', 59: 'B', 60: 'B',
};

// Items the review said needed no change at all.
const NO_CHANGE = ['bio-198', 'bio-218', 'bio-251'];

// ===========================================================================
section('1. Scope and keys');

ok(data.biology.length === 629, `biology count ${data.biology.length}`);
ok(data.chemistry.length === 485, `chemistry count ${data.chemistry.length}`);
ok(IDS.length === 60 && new Set(IDS).size === 60, 'idmap is not 60 distinct ids');
ok(Object.keys(before).length === 60, 'before-fixture is not 60 items');
for (const id of idmap.skipped_already_reviewed) ok(!IDS.includes(id), `${id} should be skipped as already reviewed`);
for (const id of idmap.skipped_not_in_export) ok(!IDS.includes(id), `${id} should be skipped as absent from the export`);
for (const [n, id] of Object.entries(MAP)) {
  ok(!!BY[id], `Q${n}: ${id} missing from the bank`);
  if (!BY[id]) continue;
  ok(LETTER[BY[id].correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[BY[id].correct]}, review asserts ${KEYS[n]}`);
  ok(BY[id].correct === before[id].correct, `Q${n} (${id}): key index changed`);
  ok(BY[id].options.length === 4, `Q${n} (${id}): ${BY[id].options.length} options`);
}
for (const id of NO_CHANGE) {
  ok(IDS.includes(id), `${id} should be in the pack`);
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `${id}: the review asked for no change, but it was modified`);
}
// 57 of the 60 were edited
const edited = IDS.filter(id => text(BY[id]) !== text(before[id]));
ok(edited.length === 57, `${edited.length} items changed, expected 57`);

// ===========================================================================
section('2. The four repeated educational-point blocks');

// Q1-Q5 digestion, Q16-Q24 renal, Q33-Q41 immunology, Q42-Q49 embryology:
// exactly 31 items, named by the review.
const BLOCKS = {
  'Digestion involves mechanical breakdown (chewing, peristalsis)': [1, 2, 3, 4, 5],
  'The nephron is the functional unit of the kidney': [16, 17, 18, 19, 20, 21, 22, 23, 24],
  'Innate immunity provides rapid, non-specific defense': [33, 34, 35, 36, 37, 38, 39, 40, 41],
  'Human embryonic development proceeds through cleavage': [42, 43, 44, 45, 46, 47, 48, 49],
};
let blockItems = 0;
for (const [needle, nums] of Object.entries(BLOCKS)) {
  blockItems += nums.length;
  for (const n of nums) {
    const id = MAP[n];
    ok(before[id].explanation.includes(needle), `Q${n} (${id}): the generic block was not in the before-fixture`);
    ok(!BY[id].explanation.includes(needle), `Q${n} (${id}): generic educational block still present`);
  }
}
ok(blockItems === 31, `block groups cover ${blockItems} items, review says 31`);
// and no other item in the pack carries any of them either
for (const id of IDS) {
  for (const needle of Object.keys(BLOCKS)) {
    ok(!BY[id].explanation.includes(needle), `Q${qnum(id)} (${id}): carries a generic block`);
  }
}
// every item in the pack has a plausible number of points
for (const id of IDS) {
  const m = BY[id].explanation.match(/Key Educational Points:<\/h4><ul>(.*?)<\/ul>/s);
  ok(!!m, `Q${qnum(id)} (${id}): no educational-point block`);
  if (!m) continue;
  const c = (m[1].match(/<li>/g) || []).length;
  ok(c >= 3 && c <= 6, `Q${qnum(id)} (${id}): ${c} educational points, expected 3 to 6`);
}

// ===========================================================================
section('3. Claims the review asked to remove');

const GONE = [
  ['bio-192', 'Only proteases are secreted as zymogens'],
  ['bio-193', 'A. Cecum:'],
  ['bio-194', 'This alkaline environment'],
  ['bio-195', 'nutrient-rich, deoxygenated blood'],
  ['bio-196', 'The trachea, bronchi and bronchioles form the conducting zone'],
  ['bio-197', 'Surfactant is only produced in quantity late in gestation'],
  ['bio-199', 'not to lung inflation'],
  ['bio-200', 'This is the opposite of the Bohr effect'],
  ['bio-200', 'hyperventilating patients may feel lightheaded'],
  ['bio-201', 'It prevents the lungs from completely collapsing'],
  ['bio-201', 'Retaining this air prevents alveolar collapse'],
  ['bio-202', 'High blood CO₂ levels detected by central chemoreceptors'],
  ['bio-202', 'severe COPD'],
  ['bio-203', 'accessory rather than primary during quiet breathing'],
  ['bio-204', 'there is no strong stimulus to hyperventilate'],
  ['bio-204', 'silent killer'],
  ['bio-205', 'no physiological or clinical significance'],
  ['bio-206', 'eventually reaching filtration equilibrium'],
  ['bio-206', '(~15 mmhg)'],
  ['bio-207', 'This obligatory reabsorption occurs regardless of the body'],
  ['bio-208', 'ADH opens aquaporins in the collecting duct'],
  ['bio-208', 'The collecting duct final concentration of urine'],
  ['bio-209', 'approximates renal plasma flow (RPF), not GFR'],
  ['bio-210', 'Parasympathetic innervation to the kidney is minimal'],
  ['bio-211', 'because transport carriers are saturated'],
  ['bio-211', 'hyperfiltration) due to osmotic effects'],
  ['bio-213', 'virtually all filtered bicarbonate in the PCT'],
  ['bio-213', 'CO2 is not excreted into the urine'],
  ['bio-214', 'autoregulatory mechanisms to preserve GFR'],
  ['bio-215', 'ADH does stimulate UT-A1, promoting urea reabsorption'],
  ['bio-216', '120 million vs'],
  ['bio-217', 'Inner hair cells are the true auditory receptors'],
  ['bio-219', 'sustained constant-velocity rotation stops being sensed'],
  ['bio-219', 'affect the middle ear rather than the inner ear'],
  ['bio-220', 'C. Cylindrical lens:</strong> Convex lenses are used for hyperopia'],
  ['bio-221', 'remains relatively unchanged throughout life'],
  ['bio-221', 'a static gel in the posterior segment'],
  ['bio-222', 'Meniere disease affect vestibular function'],
  ['bio-223', 'closure of Na⁺ channels'],
  ['bio-224', 'Produce antibodies (humoral immunity) but do not directly kill infected cells.'],
  ['bio-225', 'b cells undergo class switching'],
  ['bio-226', 'and chemotaxis of immune cells'],
  ['bio-228', 'Mhc class i molecules'],
  ['bio-228', 'C. CD8 co-receptor:</strong> Directly kill virus-infected'],
  ['bio-229', 'Fever, redness, swelling, and pain'],
  ['bio-231', 'A. IgG and macrophages:</strong> Phagocytic cells that engulf'],
  ['bio-232', 'HIV integrates its RNA genome'],
  ['bio-232', 'below 200 cells/μL'],
  ['bio-233', 'IFN-γ'],
  ['bio-233', 'RNase L that degrade viral RNA'],
  ['bio-234', '24–36 hours before'],
  ['bio-235', 'in response to lh.'],
  ['bio-236', 'cervical pregnancy'],
  ['bio-237', 'Testosterone and inhibin are both produced in significant quantities by the testes'],
  ['bio-238', 'voice deepening at puberty'],
  ['bio-239', 'produced exclusively by the trophoblast'],
  ['bio-239', 'specific to pregnancy'],
  ['bio-239', 'uniquely produced by embryonic trophoblast'],
  ['bio-240', '>40 IU/L'],
  ['bio-241', 'Digest the corona radiata'],
  ['bio-242', 'All humans have approximately the same number of melanocytes'],
  ['bio-244', 'lost the gulonolactone oxidase gene'],
  ['bio-245', 'very much alive and mitotically active'],
  ['bio-246', '(megaloblasts/macrocytes)'],
  ['bio-246', 'but no neurological damage'],
  ['bio-248', 'are not stored significantly'],
  ['bio-248', 'daily supplementation due to inability to store them'],
  ['bio-249', 'It does not cause night blindness'],
  ['bio-249', 'in alcoholics'],
  ['bio-250', 'refeldin'],
  ['bio-250', 'polymerase gamma'],
  ['bio-255', 'isotonic at ~0.9% NaCl'],
  ['bio-255', 'specific to plant cells'],
  ['bio-256', 'None (down gradient)'],
];
for (const [id, s] of GONE) {
  ok(text(before[id]).includes(s), `${id}: "${s.slice(0, 60)}" was not in the before-fixture (check the assertion, not the data)`);
  ok(!text(BY[id]).includes(s), `Q${qnum(id)} (${id}): still contains "${s.slice(0, 60)}"`);
}

// ===========================================================================
section('4. The major rewrite and the eight substantial repairs');

const PRESENT = [
  ['bio-193', 'Proximal colon, particularly the cecum and ascending colon'],
  ['bio-193', 'main site of water and electrolyte absorption'],
  ['bio-202', 'An increase in H⁺ near central chemoreceptors in the medulla'],
  ['bio-204', 'carboxyhemoglobin from oxyhemoglobin'],
  ['bio-204', 'Breathlessness or rapid breathing can occur'],
  ['bio-207', 'about two-thirds of filtered water'],
  ['bio-211', 'reabsorption no longer keeps pace with filtration'],
  ['bio-233', 'Type I interferons'],
  ['bio-241', 'Help sperm penetrate the extracellular material surrounding the oocyte'],
  ['bio-248', 'B12 can be stored for years'],
  ['bio-250', 'Golgi-dependent processing and sorting'],
  ['bio-250', 'A mutation prevents newly synthesized secretory proteins from leaving'],
];
for (const [id, s] of PRESENT) {
  ok(text(BY[id]).includes(s), `Q${qnum(id)} (${id}): missing "${s.slice(0, 60)}"`);
}
// the Q57 rewrite must keep the organelle table and the other three options
ok(BY['bio-250'].explanation.includes("<table class='exp-table'>"), 'bio-250: organelle table lost');
for (const i of [0, 2, 3]) {
  ok(BY['bio-250'].options[i] === before['bio-250'].options[i], `bio-250: option ${LETTER[i]} should be unchanged`);
}

// ===========================================================================
section('5. Renamed options stay in sync with their headings');

const words = s => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;|&#\d+;/g, ' ')
  .replace(/[^a-z0-9% ]/gi, ' ').trim().toLowerCase().split(/\s+/).filter(Boolean);
const isSub = (small, big) => { let j = 0; for (const w of small) { while (j < big.length && big[j] !== w) j++; if (j === big.length) return false; j++; } return true; };

for (const id of IDS) {
  const q = BY[id];
  const key = q.correct;
  // the correct-answer heading must name the keyed option
  const head = q.explanation.match(/<h4>Correct Answer:([^<]*)<\/h4>/);
  ok(!!head, `Q${qnum(id)} (${id}): no correct-answer heading`);
  if (head) {
    ok(isSub(words(head[1]).filter(w => w !== LETTER[key].toLowerCase()), words(q.options[key])),
       `Q${qnum(id)} (${id}): correct-answer heading does not match option ${LETTER[key]}`);
  }
  // each wrong option needs its own heading that matches its text
  for (let i = 0; i < 4; i++) {
    if (i === key) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ([^<]*?):</strong>'));
    ok(!!m, `Q${qnum(id)} (${id}): no feedback heading for option ${LETTER[i]}`);
    if (m) ok(isSub(words(m[1]), words(q.options[i])),
              `Q${qnum(id)} (${id}): heading "${m[1]}" does not match option ${LETTER[i]} "${q.options[i]}"`);
  }
}
// the five renamed options
const RENAMED = [['bio-193', 0], ['bio-193', 3], ['bio-202', 3], ['bio-211', 3], ['bio-241', 1], ['bio-250', 1]];
for (const [id, i] of RENAMED) {
  ok(BY[id].options[i] !== before[id].options[i], `${id}: option ${LETTER[i]} should have been renamed`);
}

// ===========================================================================
section('6. Every distractor has its own relevant feedback');

for (const id of IDS) {
  const q = BY[id];
  const bodies = [];
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. [^<]*?:</strong>([\\s\\S]*?)</p>'));
    if (!m) continue;
    const body = m[1].replace(/<[^>]*>/g, '').trim();
    ok(body.length >= 80, `Q${qnum(id)} (${id}): option ${LETTER[i]} feedback is only ${body.length} characters`);
    bodies.push(body);
  }
  ok(new Set(bodies).size === bodies.length, `Q${qnum(id)} (${id}): two distractors share the same feedback`);
}

// ===========================================================================
section('7. Structural invariants and clean rendering');

const PAIRED = ['p', 'ul', 'li', 'strong', 'em', 'h4', 'table', 'tr', 'th', 'td', 'sub', 'sup', 'caption'];
for (const id of IDS) {
  const q = BY[id];
  const e = q.explanation;
  ok(e.includes('<h4>Why the other choices are wrong:</h4>'), `Q${qnum(id)} (${id}): no "why the other choices are wrong" section`);
  ok(e.includes('<h4>Key Educational Points:</h4>'), `Q${qnum(id)} (${id}): no educational-points heading`);
  ok(/<p class='exp-key'>Bottom Line: /.test(e), `Q${qnum(id)} (${id}): no Bottom Line`);
  ok(!e.includes('—') && !q.question.includes('—'), `Q${qnum(id)} (${id}): contains an em dash`);
  ok(!/<li>\s*<\/li>|<p>\s*<\/p>|<strong>\s*<\/strong>/.test(e), `Q${qnum(id)} (${id}): empty element`);
  // a lowercase first word after a feedback heading is the signature of the
  // mangled copied sentences this review asked to repair
  ok(!/<strong>[A-D]\. [^<]*?:<\/strong>\s*[a-z]/.test(e), `Q${qnum(id)} (${id}): a distractor feedback starts lowercase`);
  for (const t of PAIRED) {
    const open = (e.match(new RegExp('<' + t + '(?=[\\s>])', 'g')) || []).length;
    const close = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(open === close, `Q${qnum(id)} (${id}): <${t}> ${open} open vs ${close} close`);
  }
  // no sentence fragment left where a paragraph was trimmed
  ok(!/\.\.|\s\.<\/p>/.test(e), `Q${qnum(id)} (${id}): truncated sentence`);
}

// ===========================================================================
section('8. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
ok(drift === 0, `${drift} out-of-scope biology items changed`);
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry items changed; this review touches biology only`);
for (const id of idmap.skipped_already_reviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: a previously approved item was modified`);
// 569 unowned + the 60 in this pack = 629
ok(Object.keys(untouched.biology).length === 569, `untouched biology hash count is ${Object.keys(untouched.biology).length}, expected 569`);
ok(Object.keys(untouched.biology).length + IDS.length === 629, 'fixtures do not partition the biology bank');

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
