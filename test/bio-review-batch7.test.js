/**
 * Verifies the RESULT of the batch 7 biology review in questions.json.
 *
 *   node test/bio-review-batch7.test.js
 *
 * The review asked for the existing validation tools and a before/after diff
 * rather than a new framework for prose edits, so this reuses the batch 6
 * suite's shape: scope and keys, the nine repeated educational-point blocks,
 * the claims the review asked to remove, the rewrites and targeted repairs,
 * stems and options in sync with their headings, and the structural invariants
 * that catch a half-applied edit.
 *
 * Section 3 is generated from the apply script's own `gone` lists, and every
 * one of those strings is also asserted to have been present in the
 * before-fixture, so a typo cannot pass vacuously.
 *
 * Automated checks establish structure and consistency, not biological
 * accuracy; the science comes from the review itself.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch7-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch7-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch7-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/bio-batch7-edits-a.js'),
  require('../scripts/bio-batch7-edits-b.js'),
  require('../scripts/bio-batch7-edits-c.js'),
  require('../scripts/bio-batch7-edits-d.js'),
  require('../scripts/bio-batch7-edits-e.js')
);

const BY = Object.fromEntries(data.biology.map(q => [q.id, q]));
// the idmap keys are "Q1".."Q60"; normalise to bare numbers
const MAP = Object.fromEntries(Object.entries(idmap.map).map(([k, v]) => [String(k).replace(/^Q/, ''), v]));
const IDS = Object.values(MAP);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const qnum = id => Object.keys(MAP).find(n => MAP[n] === id);

// The answer-letter sequence the review itself asserts (A=2, B=32, C=25, D=1).
const KEYS = {};
idmap.asserted_letters.split('').forEach((c, i) => { KEYS[i + 1] = c; });

const KEEP = idmap.keep_unchanged_per_review;                     // Q31 Q32 Q52 Q54 Q55 Q60
const STEM_CHANGED = idmap.stem_replacements.map(s => Number(s.slice(1)));
const OPT_CHANGED = new Set(Object.entries(idmap.option_renames)
  .map(([q, letter]) => Number(q.slice(1)) + ':' + LETTER.indexOf(letter)));
const GENERIC_Q = idmap.generic_point_blocks.map(s => Number(s.slice(1)));  // Q42..Q50

// ===========================================================================
section('1. Scope and keys');

ok(data.biology.length === 629, `biology count is ${data.biology.length}, expected 629`);
ok(data.chemistry.length === 485, `chemistry count is ${data.chemistry.length}, expected 485`);
ok(IDS.length === 60, `the map has ${IDS.length} items, expected 60`);
ok(new Set(IDS).size === 60, 'the map repeats an id');
ok(Object.keys(before).length === 60, 'the before-fixture should hold 60 items');
ok(idmap.asserted_letters.length === 60, 'the asserted answer sequence should have 60 letters');
{
  const tally = {};
  for (const c of idmap.asserted_letters) tally[c] = (tally[c] || 0) + 1;
  ok(tally.A === 2 && tally.B === 32 && tally.C === 25 && tally.D === 1,
    `asserted key distribution is ${JSON.stringify(tally)}, the review states A=2 B=32 C=25 D=1`);
}
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  ok(!!BY[id], `Q${n}: ${id} is missing from questions.json`);
  if (!BY[id]) continue;
  ok(LETTER[BY[id].correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[BY[id].correct]}, the review asserts ${KEYS[n]}`);
  ok(LETTER[before[id].correct] === KEYS[n], `Q${n} (${id}): the key moved during this pass`);
  ok(BY[id].options.length === 4, `Q${n} (${id}): should have four options`);
}
// the review says these six are unchanged
for (const id of KEEP) {
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `${id} (Q${qnum(id)}): a KEEP UNCHANGED item was modified`);
}
ok(KEEP.length === 6, `the review names ${KEEP.length} KEEP items, expected 6`);
{
  const edited = IDS.filter(id => text(BY[id]) !== text(before[id]));
  ok(edited.length === 54, `${edited.length} items changed, expected 54`);
  for (const id of edited) ok(!KEEP.includes(id), `${id}: a KEEP item is among the edited`);
  ok(EDITS.length === 54, `the apply script holds ${EDITS.length} specs, expected 54`);
  const specIds = EDITS.map(s => s.id);
  ok(new Set(specIds).size === 54, 'the apply script targets an id twice');
  for (const s of EDITS) ok(MAP[s.q] === s.id, `Q${s.q}: the spec says ${s.id}, the idmap says ${MAP[s.q]}`);
}
// bio-366 was batch 2's Q9, kept unchanged there and corrected here
ok(idmap.handed_off_from_batch2.join() === 'bio-366', 'the idmap should record the bio-366 handoff');
ok(text(BY['bio-366']) !== text(before['bio-366']), 'bio-366: expected the batch 7 corrections');

// ===========================================================================
section('2. The repeated photosynthesis educational-point block');

const GENERIC = 'Photosynthesis converts light energy to chemical energy in two stages';
const GENERIC2 = 'C3, C4, and CAM plants have different strategies for carbon fixation';
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const e = BY[id].explanation;
  const had = before[id].explanation.includes(GENERIC);
  if (GENERIC_Q.includes(n)) {
    ok(had, `Q${n} (${id}): expected the generic block in the before-fixture`);
    ok(!e.includes(GENERIC) && !e.includes(GENERIC2), `Q${n} (${id}): the generic point block is still there`);
  } else {
    ok(!had, `Q${n} (${id}): the generic block was not expected here before the pass`);
  }
}
ok(GENERIC_Q.length === 9, `the review names ${GENERIC_Q.length} generic blocks, expected 9`);
{
  let generic = 0;
  for (const id of IDS) if (BY[id].explanation.includes(GENERIC)) generic++;
  ok(generic === 0, `${generic} items still carry the generic photosynthesis block`);
}
// each replacement has exactly three points; Q53 has the supplied five
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const m = BY[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  ok(!!m, `Q${n} (${id}): no educational-point block`);
  if (!m) continue;
  const count = (m[1].match(/<li>/g) || []).length;
  if (GENERIC_Q.includes(n)) ok(count === 3, `Q${n} (${id}): ${count} replacement points, expected 3`);
  else ok(count >= 3 && count <= 6, `Q${n} (${id}): ${count} educational points, expected 3 to 6`);
}
ok((BY['bio-397'].explanation.match(/<li>/g) || []).length === 5, 'bio-397 (Q53): expected the supplied five-point block');
// the review says not to add Bottom Lines to this export
for (const id of IDS) ok(!/exp-key/.test(BY[id].explanation), `${id} (Q${qnum(id)}): a Bottom Line was added`);

// ===========================================================================
section('3. Claims the review asked to remove');

{
  let paired = 0;
  for (const spec of EDITS) {
    const q = BY[spec.id];
    const b = before[spec.id];
    for (const s of spec.gone || []) {
      ok(text(b).includes(s), `Q${spec.q} (${spec.id}): "${s.slice(0, 60)}" was not in the before-fixture, so its removal check is vacuous`);
      ok(!text(q).includes(s), `Q${spec.q} (${spec.id}): removed claim is still present: ${s.slice(0, 60)}`);
      paired++;
    }
  }
  ok(paired >= 120, `only ${paired} paired removal checks, expected the review's full list`);
}
// A later follow-up pass (section 9) replaced some of batch 7's own wording.
// Those strings are listed here so the derived checks below skip them, and
// each is asserted absent, so the exemption cannot hide a half-applied edit.
const SUPERSEDED = new Set([
  'bio-347 explanation', 'bio-367 explanation', 'bio-383 explanation', 'bio-392 explanation',
  'bio-349 stem', 'bio-373 stem'
]);
const supersededText = [];
for (const spec of EDITS) {
  const q = BY[spec.id];
  for (const [from, to] of spec.explanation || []) {
    const skip = SUPERSEDED.has(spec.id + ' explanation') && !q.explanation.includes(to);
    if (skip) { supersededText.push([spec.id, to]); continue; }
    ok(q.explanation.includes(to), `Q${spec.q} (${spec.id}): replacement text missing: ${to.slice(0, 60)}`);
    ok(!q.explanation.includes(from), `Q${spec.q} (${spec.id}): replaced text still present: ${from.slice(0, 60)}`);
  }
  if (spec.explanationFull) ok(q.explanation === spec.explanationFull, `Q${spec.q} (${spec.id}): explanation does not match the full replacement`);
  if (spec.stemFull && !SUPERSEDED.has(spec.id + ' stem')) ok(q.question === spec.stemFull, `Q${spec.q} (${spec.id}): stem does not match the supplied replacement`);
  for (const [i, t] of spec.optionFull || []) ok(q.options[i] === t, `Q${spec.q} (${spec.id}): option ${LETTER[i]} does not match the supplied text`);
}
// exactly the four explanation passages the follow-up rewrote, and no others
ok(supersededText.length === 4, `${supersededText.length} batch 7 passages were superseded, expected 4`);
for (const [id, to] of supersededText) ok(!BY[id].explanation.includes(to), `${id}: a superseded passage is back`);

// ===========================================================================
section('4. The rewrite and the named repairs');

const PRESENT = [
  // Q53, the one full-item rewrite
  ['bio-397', 'Correct Answer: B. Brachialis'],
  ['bio-397', 'Brachialis is a major flexor of the elbow'],
  ['bio-397', 'whether the forearm is pronated, supinated or in the neutral position'],
  ['bio-397', 'Triceps brachii extends the elbow'],
  ['bio-397', 'It inserts on the distal radius, not the ulna'],
  ['bio-397', 'It does not cross the elbow and is not an elbow flexor'],
  // Q45, the substantial explanation rewrite
  ['bio-389', 'one molecule of 3-phosphoglycerate (3-PGA) and one molecule of 2-phosphoglycolate'],
  ['bio-389', 'returns much of its carbon to the Calvin cycle'],
  ['bio-389', 'Pheophytin is a chlorophyll-related pigment without the central magnesium ion'],
  ['bio-389', 'Photorespiratory metabolism can produce hydrogen peroxide'],
  ['bio-389', 'not a mechanism that directly forces stomata open'],
  // the other substantial repairs
  ['bio-349', 'annulus fibrosus'],
  ['bio-349', 'nucleus pulposus at the centre of an intervertebral disc is a different'],
  ['bio-349', 'articular hyaline cartilage lacks one as well'],
  ['bio-358', 'new variants also occur'],
  ['bio-358', 'A son receives his X chromosome from his mother and his Y from his father'],
  ['bio-361', 'Myotonic dystrophy type 1'],
  ['bio-361', 'not by a characteristic expanding repeat'],
  ['bio-362', 'Mitochondrial DNA is ordinarily transmitted through the mother'],
  ['bio-362', 'argues against mitochondrial inheritance'],
  ['bio-373', 'Under the assumptions stated in the stem'],
  ['bio-373', 'sexual selection'],
  ['bio-378', 'which does not activate PKA as cAMP does'],
  ['bio-378', 'blockade of adenosine receptors'],
  ['bio-379', 'cation channel permeable to Na⁺ and K⁺'],
  ['bio-379', 'GABA_A-mediated anion conductance is usually inhibitory in mature neurons'],
  ['bio-380', 'impair normal switch-off'],
  ['bio-383', 'RTKs are cell-surface receptors with intracellular kinase domains'],
  ['bio-383', 'rapid, nongenomic actions'],
  ['bio-384', 'The adaptor Grb2 recruits SOS, a guanine-nucleotide exchange factor'],
  ['bio-384', 'Ras is a GTPase and does not phosphorylate Raf'],
  ['bio-401', 'The trachea is an airway connecting the larynx to the main bronchi'],
  ['bio-401', 'The duodenum is the first part of the small intestine'],
  ['bio-401', 'voluntary oral phase'],
  // targeted single corrections
  ['bio-343', 'Citrate binds through noncovalent interactions'],
  ['bio-344', 'thymidylate (dTMP)'],
  ['bio-345', 'In pure noncompetitive inhibition'],
  ['bio-347', 'connective tissue proper'],
  ['bio-348', 'atrial and ventricular activation normally occur in sequence'],
  ['bio-350', 'Smoking damages cilia and impairs mucociliary clearance'],
  ['bio-351', 'embryonic yolk-sac myeloid precursors'],
  ['bio-352', 'Collagen arranged in many directions resists forces from several directions'],
  ['bio-353', 'its epithelium is simple cuboidal'],
  ['bio-354', 'osteoblast-lineage cells, including osteocytes'],
  ['bio-355', 'Potentially damaging heat or cold also activates nociceptors'],
  ['bio-356', 'reduced penetrance'],
  ['bio-357', 'Cc × Cc cross'],
  ['bio-359', 'sickle cell trait'],
  ['bio-360', 'heterozygous females can also have low factor levels'],
  ['bio-363', 'oculocutaneous albinism type 1'],
  ['bio-364', 'compatible with autosomal or Y-linked inheritance'],
  ['bio-365', 'Option A combines complete penetrance with variable expressivity'],
  ['bio-366', 'negative assortative mating can instead favour heterozygosity'],
  ['bio-367', 'Large populations under strong directional selection'],
  ['bio-368', 'some Old Order Amish communities'],
  ['bio-369', 'partial protection against severe falciparum malaria'],
  ['bio-370', '64% equals 1 − p<sup>2</sup>'],
  ['bio-371', 'counteract divergence caused by drift or by different local selective pressures'],
  ['bio-372', 'prolonged hunting, disease or habitat loss'],
  ['bio-376', 'preformed dimer'],
  ['bio-377', 'conventional (calcium-dependent) protein kinase C'],
  ['bio-381', 'ligand-gated cation channels that conduct Na⁺ and K⁺'],
  ['bio-382', 'persistent activation'],
  ['bio-386', 'chloroplast stroma'],
  ['bio-387', 'bicarbonate (HCO₃⁻)'],
  ['bio-388', 'linear electron flow'],
  ['bio-390', 'mainly as malic acid in vacuoles'],
  ['bio-391', 'Cyclic electron flow routes electrons from photosystem I back'],
  ['bio-392', 'PEP carboxylase adds bicarbonate (HCO₃⁻) to PEP'],
  ['bio-393', 'consumes protons on the stromal side'],
  ['bio-394', 'accessory antenna pigment'],
  ['bio-395', 'the lateral meniscus is more nearly circular'],
  ['bio-400', 'posterior part of the medial surface of the lateral femoral condyle'],
  ['bio-402', 'weakness or paralysis of the corresponding hemidiaphragm'],
  ['bio-403', 'useful clinical clue']
];
for (const [id, s] of PRESENT) {
  ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): missing "${s.slice(0, 60)}"`);
}
// the Q53 rewrite must not leave the old biceps teaching anywhere in the item
for (const s of ['primary flexor of the forearm', 'supraglenoid tubercle', 'radial tuberosity']) {
  ok(!text(BY['bio-397']).includes(s), `bio-397 (Q53): old biceps teaching survives: ${s}`);
}
ok(BY['bio-397'].options[1] === 'Brachialis', 'bio-397 (Q53): option B should read Brachialis');
ok(before['bio-397'].options[1] === 'Biceps brachii', 'bio-397 (Q53): expected Biceps brachii before the rewrite');

// ===========================================================================
section('5. Stems, options and headings stay in sync');

for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id], b = before[id];
  const changed = q.question !== b.question;
  ok(changed === STEM_CHANGED.includes(n),
    `Q${n} (${id}): stem ${changed ? 'changed but was not on the list' : 'is unchanged but the review replaces it'}`);
  for (let i = 0; i < 4; i++) {
    const oc = q.options[i] !== b.options[i];
    ok(oc === OPT_CHANGED.has(n + ':' + i),
      `Q${n} (${id}) option ${LETTER[i]}: ${oc ? 'changed unexpectedly' : 'unchanged but the review renames it'}`);
  }
}
ok(STEM_CHANGED.length === 20, `${STEM_CHANGED.length} stem replacements, the review lists 20`);
ok(OPT_CHANGED.size === 7, `${OPT_CHANGED.size} option renames, the review lists 7`);
// no renamed option keeps a trailing period the bank's option style does not use
for (const key of OPT_CHANGED) {
  const [n, i] = key.split(':').map(Number);
  ok(!/\.$/.test(BY[MAP[n]].options[i]), `Q${n} option ${LETTER[i]}: trailing period does not match the option style`);
}
// every option's heading must still match its text
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id];
  for (let i = 0; i < 4; i++) {
    const label = q.options[i].replace(/<[^>]*>/g, '');
    if (i === q.correct) {
      const m = q.explanation.match(/<h4>Correct Answer: ([^<]*)<\/h4>/);
      ok(!!m, `Q${n} (${id}): no correct-answer heading`);
      if (m) {
        const head = m[1].replace(new RegExp('^' + LETTER[i] + '\\. '), '').trim();
        ok(head === label || label.includes(head) || head.includes(label),
          `Q${n} (${id}): answer heading "${head.slice(0, 50)}" does not match option ${LETTER[i]} "${label.slice(0, 50)}"`);
      }
    } else {
      const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ((?:(?!</strong>)[\\s\\S])*?):</strong>'));
      ok(!!m, `Q${n} (${id}): no "${LETTER[i]}. ..." distractor heading`);
      if (m) {
        const headWords = m[1].replace(/<[^>]*>/g, '').toLowerCase().split(/\s+/).filter(Boolean);
        const optWords = label.toLowerCase().split(/\s+/).filter(Boolean);
        let j = 0;
        for (const w of headWords) { const k = optWords.indexOf(w, j); if (k === -1) { j = -1; break; } j = k + 1; }
        ok(j !== -1, `Q${n} (${id}): heading "${m[1].slice(0, 50)}" is not an abbreviation of option ${LETTER[i]} "${label.slice(0, 50)}"`);
      }
    }
  }
}

// ===========================================================================
section('6. Every distractor has its own relevant feedback');

for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id];
  const paras = [];
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. (?:(?!</strong>)[\\s\\S])*?:</strong>([\\s\\S]*?)</p>'));
    ok(!!m, `Q${n} (${id}): no feedback paragraph for option ${LETTER[i]}`);
    if (!m) continue;
    const body = m[1].replace(/<[^>]*>/g, '').trim();
    // Q52 (bio-396) is a KEEP item and the review says its short option A
    // feedback is adequate and must not be inflated to meet a length rule.
    const exempt = id === 'bio-396' && i === 0;
    ok(exempt || body.length >= 80, `Q${n} (${id}) option ${LETTER[i]}: feedback is only ${body.length} characters`);
    if (exempt) ok(body.length < 80, 'bio-396 option A: the documented short-feedback exception is no longer needed');
    paras.push(body);
  }
  for (let a = 0; a < paras.length; a++) {
    for (let b = a + 1; b < paras.length; b++) {
      ok(paras[a] !== paras[b], `Q${n} (${id}): two distractors share the same feedback`);
    }
  }
}
// the items whose feedback was copied from the main explanation are repaired
const WAS_COPIED = [['bio-344', 0], ['bio-349', 1], ['bio-353', 0], ['bio-361', 0], ['bio-362', 3],
  ['bio-364', 0], ['bio-364', 1], ['bio-366', 3], ['bio-394', 0], ['bio-394', 1],
  ['bio-401', 0], ['bio-401', 2], ['bio-402', 2]];
for (const [id, i] of WAS_COPIED) {
  const q = BY[id];
  const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. (?:(?!</strong>)[\\s\\S])*?:</strong>([\\s\\S]*?)</p>'));
  ok(!!m, `${id}: no feedback paragraph for option ${LETTER[i]}`);
  if (!m) continue;
  const body = m[1].replace(/<[^>]*>/g, '').trim();
  const main = q.explanation.split('<h4>Why the other choices are wrong:</h4>')[0].replace(/<[^>]*>/g, '');
  ok(!main.includes(body), `${id} (Q${qnum(id)}) option ${LETTER[i]}: feedback is still a verbatim copy of the main explanation`);
  ok(body.length >= 120, `${id} (Q${qnum(id)}) option ${LETTER[i]}: repaired feedback is only ${body.length} characters`);
}

// ===========================================================================
section('7. Structural invariants and clean rendering');

for (const id of IDS) {
  const q = BY[id];
  const e = q.explanation;
  ok(!/—/.test(text(q)), `Q${qnum(id)} (${id}): em dash in student-facing text`);
  ok(/<h4>Correct Answer:/.test(e), `Q${qnum(id)} (${id}): no correct-answer heading`);
  ok(/<h4>Why the other choices are wrong:<\/h4>/.test(e), `Q${qnum(id)} (${id}): no distractor heading`);
  ok(/<h4>Key Educational Points:<\/h4>/.test(e), `Q${qnum(id)} (${id}): no educational-point heading`);
  for (const t of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub', 'em', 'table']) {
    const open = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const close = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(open === close, `Q${qnum(id)} (${id}): <${t}> ${open} open vs ${close} close`);
  }
  ok(!/<p>\s*<\/p>|<li>\s*<\/li>/.test(e), `Q${qnum(id)} (${id}): empty element`);
  ok(!/\.\.|\s\.<\/p>/.test(e), `Q${qnum(id)} (${id}): truncated sentence`);
  ok(!/\s{2,}/.test(q.question), `Q${qnum(id)} (${id}): double space in the stem`);
  ok(q.question.trim().length > 20, `Q${qnum(id)} (${id}): stem looks truncated`);
}
// the one table in the pack is Q27's Hardy-Weinberg table and it survived
ok((BY['bio-370'].explanation.match(/<table/g) || []).length === 1, 'bio-370 (Q27): the genotype table is missing');
// the superscripts the review asked to keep readable
ok(/X<sup>h<\/sup>Y/.test(BY['bio-360'].question), 'bio-360 (Q17): the stem should use the bank\'s superscript formatting');
ok(!/\^/.test(BY['bio-360'].question), 'bio-360 (Q17): literal carets in the stem');

// ===========================================================================
section('8. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
ok(drift === 0, `${drift} out-of-scope biology items changed`);
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] && untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry items changed; this review touches biology only`);
for (const id of idmap.absent_already_reviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: a previously approved item was modified`);
for (const id of idmap.absent_still_unreviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: outside this export but modified`);
ok(Object.keys(untouched.biology).length === 363, `untouched biology hash count is ${Object.keys(untouched.biology).length}, expected 363`);
ok(Object.keys(untouched.biology).length + 60 + 60 + 60 + 26 + IDS.length === 629, 'fixtures do not partition the biology bank');
// Chemistry review batch 1 owns 58 chemistry ids (chem-1..chem-18,
// chem-20..chem-36, chem-38..chem-60), so this sweep covers the 427 chemistry
// items no reviewed chemistry batch owns; those 58 are checked by
// test/chem-review-batch1.test.js.
ok(Object.keys(untouched.chemistry).length === 427, 'untouched chemistry hash count unexpected');

// ===========================================================================
section('9. The narrow follow-up correction pass');

// Eight items got a second, localised pass. Only Q6 and Q30 changed their
// stems; everything else is a distractor feedback body or one educational
// point. Each entry pins the replacement as PRESENT, the superseded text as
// GONE, and the option heading as intact. The pair is complementary on the
// same passage, so a typo in one half is caught by the other.
const FOLLOWUP = [
  ['bio-347', '<strong>B. Mast cell:</strong>',
    ['Mast-cell granules contain histamine and proteoglycans.',
      'Heparin is a sulfated glycosaminoglycan attached to a protein core within these proteoglycans.'],
    ['heparin, itself a proteoglycan']],
  ['bio-349', null,
    ['and the central disc of the pubic symphysis?'],
    ['fibrocartilaginous disc of the pubic symphysis']],
  ['bio-360', '<strong>A. None:</strong>',
    ["Every daughter receives her father's X<sup>h</sup>, and each has a 50% chance of also inheriting her mother's X<sup>h</sup>.",
      'The expected proportion with two altered alleles is therefore 1/2, not zero.',
      '<li>Among daughters, the expected genotypes are 50% X<sup>h</sup>X<sup>h</sup> and 50% X<sup>H</sup>X<sup>h</sup>.</li>'],
    ['If none of the daughters were affected', 'Daughters are therefore half carriers and half affected']],
  ['bio-362', null,
    ['<li>An affected person may inherit the variant from a parent with symptoms or from a parent who has not expressed the condition; alternatively, the variant may arise as a new mutation.</li>'],
    ['Every affected individual has at least one affected parent']],
  ['bio-367', '<strong>A. Large populations with high genetic diversity:</strong>',
    ['because selection, migration and other processes can still change them.</p>'],
    ['Drift is simply not the dominant force here']],
  ['bio-373', null,
    ['In a population initially in Hardy-Weinberg equilibrium, with both alleles present'],
    ['In a simple population-genetics model, individuals preferentially mate']],
  ['bio-383', null,
    ['<li>Cell-surface receptors signal through intracellular proteins, second messengers, or both. Some responses are rapid, while others change gene expression over longer periods.</li>'],
    ['which act within seconds to minutes through second messengers']],
  ['bio-392', '<strong>A. Phosphoenolpyruvate (PEP):</strong>',
    ['In C4 and CAM plants, PEP carboxylase adds bicarbonate (HCO₃⁻) to PEP, forming oxaloacetate',
      'In the Calvin cycle, RuBisCO instead adds CO₂ to RuBP.'],
    ['is the CO2 acceptor molecule used by PEP carboxylase', 'the two enzymes do not act on the same inorganic-carbon substrate']]
];
ok(FOLLOWUP.length === 8, `the follow-up pass covers ${FOLLOWUP.length} items, expected 8`);
// only Q6 (bio-349) and Q30 (bio-373) may have changed their stems in this pass
const FOLLOWUP_STEM_IDS = ['bio-349', 'bio-373'];
const FOLLOWUP_STEMS = {
  'bio-349': 'Which type of cartilage forms the annulus fibrosus of intervertebral discs and the central disc of the pubic symphysis?',
  'bio-373': 'In a population initially in Hardy-Weinberg equilibrium, with both alleles present, individuals begin preferentially mating with others of the same genotype at a particular locus. Assume equal reproductive contributions and no selection, mutation, migration or drift. What is the expected effect of this positive assortative mating?'
};
for (const [id, stem] of Object.entries(FOLLOWUP_STEMS)) {
  ok(BY[id].question === stem, `Q${qnum(id)} (${id}): stem does not match the follow-up replacement`);
}
for (const [id, heading, present, gone] of FOLLOWUP) {
  const q = BY[id];
  const n = qnum(id);
  if (heading) ok(q.explanation.includes(heading), `Q${n} (${id}): option heading lost: ${heading}`);
  for (const s of present) ok(text(q).includes(s), `Q${n} (${id}): follow-up text missing: ${s.slice(0, 60)}`);
  for (const s of gone) ok(!text(q).includes(s), `Q${n} (${id}): replaced text still present: ${s.slice(0, 60)}`);
  // the pass promised not to touch keys or option texts, and only two stems
  ok(LETTER[q.correct] === KEYS[n], `Q${n} (${id}): key moved during the follow-up pass`);
  for (let i = 0; i < 4; i++) {
    const expected = OPT_CHANGED.has(Number(n) + ':' + i)
      ? EDITS.find(s => s.id === id).optionFull.find(([j]) => j === i)[1]
      : before[id].options[i];
    ok(q.options[i] === expected, `Q${n} (${id}) option ${LETTER[i]}: text changed during the follow-up pass`);
  }
  if (!FOLLOWUP_STEM_IDS.includes(id)) {
    const spec = EDITS.find(s => s.id === id);
    const expectedStem = spec && spec.stemFull ? spec.stemFull : before[id].question;
    ok(q.question === expectedStem, `Q${n} (${id}): stem changed although only Q6 and Q30 may change`);
  }
}
// the Q6 stem must no longer give the answer away
ok(!/fibrocartilag/i.test(BY['bio-349'].question), 'bio-349 (Q6): the stem still names the answer');

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
