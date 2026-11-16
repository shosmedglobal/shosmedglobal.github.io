/**
 * Verifies the RESULT of the batch 10 biology review in questions.json.
 *
 *   node test/bio-review-batch10.test.js
 *
 * The review asked for proportionate checks on the existing framework rather
 * than a new one, so this reuses the batch 9 suite's shape: scope and keys, the
 * presentation the review told us to preserve, the claims it asked to remove,
 * the three major rewrites and the named repairs, stems and options in full
 * agreement with their headings, exactly one relevant feedback section per
 * distractor, and the structural invariants that catch a half-applied edit.
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
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch10-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch10-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch10-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/bio-batch10-edits-a.js'),
  require('../scripts/bio-batch10-edits-b.js'),
  require('../scripts/bio-batch10-edits-c.js'),
  require('../scripts/bio-batch10-edits-d.js'),
  require('../scripts/bio-batch10-edits-e.js'),
  require('../scripts/bio-batch10-edits-f.js')
);

const BY = Object.fromEntries(data.biology.map(q => [q.id, q]));
const MAP = Object.fromEntries(Object.entries(idmap.map).map(([k, v]) => [String(k).replace(/^Q/, ''), v]));
const IDS = Object.values(MAP);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const qnum = id => Object.keys(MAP).find(n => MAP[n] === id);
const words = s => s.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9%+\-−→ ]+/g, ' ').trim().split(/\s+/).filter(Boolean);

// The answer-letter sequence the review itself asserts (A=16, B=13, C=15, D=16).
const KEYS = {};
idmap.asserted_letters.split('').forEach((c, i) => { KEYS[i + 1] = c; });

const KEEP = idmap.keep_unchanged_per_review;     // Q5 Q9 Q29 Q36 Q43 Q45
const STEM_CHANGED = idmap.stem_replacements.map(s => Number(s.slice(1)));
const OPT_CHANGED = new Set();
for (const [q, letters] of Object.entries(idmap.option_renames)) {
  for (const L of letters) OPT_CHANGED.add(Number(q.slice(1)) + ':' + LETTER.indexOf(L));
}

// ===========================================================================
section('1. Scope, counts and the answer keys');

ok(data.biology.length === 629, `biology count is ${data.biology.length}, expected 629`);
ok(data.chemistry.length === 485, `chemistry count is ${data.chemistry.length}, expected 485`);
ok(IDS.length === 60, `the map has ${IDS.length} items, expected 60`);
ok(new Set(IDS).size === 60, 'the map repeats an id');
ok(Object.keys(before).length === 60, 'the before-fixture should hold 60 items');
ok(idmap.asserted_letters.length === 60, 'the asserted answer sequence should have 60 letters');

{
  const tally = { A: 0, B: 0, C: 0, D: 0 };
  idmap.asserted_letters.split('').forEach(c => { tally[c]++; });
  ok(tally.A === 16 && tally.B === 13 && tally.C === 15 && tally.D === 16,
    `asserted tally is A=${tally.A} B=${tally.B} C=${tally.C} D=${tally.D}, the review prints A=16 B=13 C=15 D=16`);
}
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  ok(!!BY[id], `Q${n}: ${id} is missing from the bank`);
  if (!BY[id]) continue;
  ok(LETTER[BY[id].correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[BY[id].correct]}, the review asserts ${KEYS[n]}`);
  ok(BY[id].correct === before[id].correct, `Q${n} (${id}): the answer key moved during the pass`);
  ok(BY[id].options.length === 4, `Q${n} (${id}): expected four options`);
}
// the six KEEP items must be byte-identical to the before-fixture
ok(KEEP.length === 6, `the review names ${KEEP.length} KEEP items, expected 6`);
for (const id of KEEP) {
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `${id} (Q${qnum(id)}): the review says KEEP UNCHANGED but it changed`);
}
ok(['Q5', 'Q9', 'Q29', 'Q36', 'Q43', 'Q45'].map(q => idmap.map[q]).join() === KEEP.join(),
  'the KEEP ids do not match the review\'s display numbers Q5, Q9, Q29, Q36, Q43, Q45');
// the other 54 must all have changed
{
  let edited = 0;
  for (const id of IDS) if (text(BY[id]) !== text(before[id])) edited++;
  ok(edited === 54, `${edited} of the 60 items changed, expected 54`);
  ok(EDITS.length === 54, `the apply script carries ${EDITS.length} specs, expected 54`);
}
// the span ids the export omits must not have been touched
for (const id of idmap.absent_already_reviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: a previously approved item was modified`);
for (const id of idmap.absent_still_unreviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: outside this export but modified`);
ok(idmap.major_rewrites.join() === 'Q12,Q13,Q37', 'the idmap should record Q12, Q13 and Q37 as the major rewrites');

// ===========================================================================
section('2. The presentation the review told us to preserve');

// "Keep each existing educational-point block and Bottom Line. All 60 have
//  both. Preserve the number of educational points in each item." Only Q56
//  carries a table, and the review names a table change for exactly that item.
const TABLE_IDS = ['bio-598'];
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const e = BY[id].explanation;
  ok(/<h4>Key Educational Points:<\/h4>/.test(e), `Q${n} (${id}): the educational-point heading is missing`);
  ok(/class='exp-key'>Bottom Line:/.test(e), `Q${n} (${id}): the Bottom Line is missing`);
  ok((e.match(/class='exp-key'>Bottom Line:/g) || []).length === 1, `Q${n} (${id}): expected exactly one Bottom Line`);
  const hasTable = /<table/.test(e);
  ok(hasTable === TABLE_IDS.includes(id), `Q${n} (${id}): a table was ${hasTable ? 'added' : 'removed'}`);
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  const mb = before[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  ok(!!m, `Q${n} (${id}): malformed educational-point block`);
  ok(!!mb, `Q${n} (${id}): the before-fixture has no bullet point block, so the count check is vacuous`);
  if (m && mb) {
    const now = (m[1].match(/<li>/g) || []).length;
    const was = (mb[1].match(/<li>/g) || []).length;
    ok(now === was, `Q${n} (${id}): point count moved from ${was} to ${now}; the review asked to preserve it`);
  }
}
for (const id of IDS) {
  const e = BY[id].explanation;
  ok((e.match(/<h4>Correct Answer:/g) || []).length === 1, `${id} (Q${qnum(id)}): expected exactly one correct-answer heading`);
  ok((e.match(/<h4>Why the other choices are wrong:<\/h4>/g) || []).length === 1, `${id} (Q${qnum(id)}): expected exactly one distractor heading`);
}

// ===========================================================================
section('3. Claims the review asked to remove, and the replacements');

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
  ok(paired >= 200, `only ${paired} paired removal checks, expected the review's full list`);
}
// every supplied replacement is present and its predecessor is gone. A few
// edits extend their anchor rather than replacing it (the review asks for an
// extra sentence), so the anchor survives inside the new text there.
let extended = 0;
for (const spec of EDITS) {
  const q = BY[spec.id];
  for (const [from, to] of spec.explanation || []) {
    ok(q.explanation.includes(to), `Q${spec.q} (${spec.id}): replacement text missing: ${to.slice(0, 60)}`);
    if (to.includes(from)) extended++;
    else ok(!q.explanation.includes(from), `Q${spec.q} (${spec.id}): replaced text still present: ${from.slice(0, 60)}`);
    ok(before[spec.id].explanation.includes(from), `Q${spec.q} (${spec.id}): the anchor was not in the before-fixture: ${from.slice(0, 60)}`);
  }
  if (spec.stemFull) ok(q.question === spec.stemFull, `Q${spec.q} (${spec.id}): stem does not match the supplied replacement`);
  if (spec.explanationFull) ok(q.explanation === spec.explanationFull, `Q${spec.q} (${spec.id}): explanation does not match the full replacement`);
  for (const [i, t] of spec.optionFull || []) ok(q.options[i] === t, `Q${spec.q} (${spec.id}): option ${LETTER[i]} does not match the supplied text`);
  for (const h of spec.keepHeadings || []) ok(q.explanation.includes(h), `Q${spec.q} (${spec.id}): heading lost: ${h}`);
}
ok(extended >= 1 && extended <= 6, `${extended} edits extend their anchor instead of replacing it, expected a handful`);

// ===========================================================================
section('4. The three major rewrites and the named repairs');

const PRESENT = [
  // Q12 (bio-549), major rewrite
  ['bio-549', 'The name Homo habilis, meaning "handy man," reflects its traditional association'],
  ['bio-549', 'Manufacture of Oldowan stone tools'],
  ['bio-549', 'stone-tool evidence predates its known fossil record'],
  ['bio-549', 'An association with tools does not prove that a species invented them'],
  ['bio-549', 'not securely identified as the first stone-tool maker'],
  // Q13 (bio-550), major rewrite
  ['bio-550', 'Which statement about Homo erectus is incorrect?'],
  ['bio-550', 'Fossil evidence shows dispersal beyond Africa'],
  ['bio-550', 'Its average brain size was about 1400 cm3, matching that of modern humans'],
  ['bio-550', 'Its body proportions included relatively long legs and shorter arms than earlier hominins'],
  ['bio-550', 'although individual fossils vary widely'],
  ['bio-550', 'Tool traditions varied by place and time'],
  // Q37 (bio-576), major rewrite
  ['bio-576', 'purple pigment is produced only when at least one dominant allele is present at each'],
  ['bio-576', '3 purple : 1 white'],
  ['bio-576', '1 purple : 3 white'],
  ['bio-576', 'The remaining 7/16 lack a dominant allele at one or both loci'],
  ['bio-576', 'at least one dominant allele is required at each locus'],
  // the serum/fibrinogen distinction the review singles out
  ['bio-547', 'Plasma retains fibrinogen, whereas serum is collected after clotting and is depleted of fibrinogen'],
  ['bio-547', 'Serum is not devoid of every clotting factor'],
  ['bio-538', 'not every clotting factor disappears'],
  // human-evolution qualifications
  ['bio-548', 'it is not established as the first stone-tool maker'],
  ['bio-551', 'Many people with ancestry outside Africa carry roughly 1-2% Neanderthal-derived DNA'],
  ['bio-551', 'Migration back into Africa and subsequent gene flow'],
  ['bio-552', 'older than an overlying volcanic layer dated to approximately 233,000 years ago'],
  ['bio-553', 'An advantage of a trait does not by itself establish why the trait first evolved'],
  ['bio-554', 'This comparison is not a claim that each species directly evolved into the next'],
  ['bio-555', 'they are not four exclusive stages assigned to four successive species'],
  ['bio-556', 'Homo sapiens evolved in Africa and later spread to other continents, with some interbreeding'],
  // the shared Labrador mechanism in Q28/Q35
  ['bio-567', 'This is recessive epistasis: ee masks the effect of the B locus on coat color'],
  ['bio-567', 'mainly yellow/red pheomelanin'],
  ['bio-574', 'ee prevents production of black/brown eumelanin in the hair'],
  // the Q38 approximation and the Q40 polar-body assumptions
  ['bio-577', 'Using the simplified approximation that 1 cM corresponds to 1% recombination'],
  ['bio-577', 'Multiple crossovers can make the observed recombination percentage underestimate map distance'],
  ['bio-580', 'in which meiosis is completed and the first polar body also divides'],
  ['bio-580', 'without that division the usual schematic count is two'],
  // Q41 placenta distractors
  ['bio-581', 'Serving as the main site of red blood cell production throughout fetal life'],
  ['bio-581', 'Serving as the main site of T-lymphocyte maturation'],
  ['bio-581', 'small numbers of blood cells can cross between the circulations'],
  // Q48 fungal biology, Q50 thin smear, Q56 classification table
  ['bio-589', 'Mucorales'],
  ['bio-589', 'many dermathophyte'.replace('thophyte', 'tophyte infections do not fluoresce')],
  ['bio-589', 'the last does not infect hair'],
  ['bio-592', 'a thin smear preserves the intact red cells needed to see this'],
  ['bio-592', 'fever can be irregular'],
  ['bio-592', 'merozoites released from the liver then invade red blood cells'],
  ['bio-598', 'Many invasive stages move by gliding'],
  ['bio-598', 'they are not four equivalent modern evolutionary divisions'],
  // the remaining targeted repairs
  ['bio-537', 'serum sodium does not necessarily rise'],
  ['bio-539', 'Which statement about mature human red blood cells'],
  ['bio-540', 'tissue-invasive helminths'],
  ['bio-543', 'In a healthy adult, where is erythropoietin'],
  ['bio-544', 'PT assesses the extrinsic and common pathways; aPTT assesses the intrinsic and common pathways'],
  ['bio-545', 'a disease-causing variant in F8'],
  ['bio-545', 'mild disease can have a normal aPTT'],
  ['bio-558', 'It is fully assembled by pachytene of prophase I'],
  ['bio-558', 'sister-chromatid cohesion'],
  ['bio-559', 'for example during DNA repair'],
  ['bio-560', 'In a primary spermatocyte, one homologous chromosome pair fails to separate'],
  ['bio-561', 'selected oocytes resume meiosis after puberty'],
  ['bio-562', 'Most cases of free trisomy 21 result from an error in maternal meiosis'],
  ['bio-563', '16 equally likely combinations of parental gametes'],
  ['bio-564', 'can also occur by chance from Aa x aa'],
  ['bio-565', 'Map distance and recombination percentage are not interchangeable over long intervals'],
  ['bio-569', 'Hemolytic disease of the fetus and newborn caused by maternal anti-D antibodies'],
  ['bio-569', 'it does not erase established sensitization'],
  ['bio-570', 'some genes escape inactivation'],
  ['bio-571', 'two Z chromosomes (ZZ)'],
  ['bio-572', '47,XX,+21'],
  ['bio-572', 'commonly compatible with live birth'],
  ['bio-573', 'with complete dominance and no epistasis'],
  ['bio-578', 'about 36 hours after the start of the LH surge'],
  ['bio-582', 'It is not the principal source of circulating progesterone during the luteal phase'],
  ['bio-585', 'Inner hair cells release neurotransmitter onto auditory nerve fibers'],
  ['bio-587', 'does not identify the <em>Candida</em> species with certainty'],
  ['bio-587', 'esophageal candidiasis is an AIDS-defining illness'],
  ['bio-588', 'neither is specific on its own'],
  ['bio-590', 'is now classified as <em>P. rubens</em>'],
  ['bio-593', 'about 1-5 days to become infective'],
  ['bio-594', 'ventral adhesive disc'],
  ['bio-595', 'it can rarely occur in <em>E. dispar</em>'],
  ['bio-596', 'East and southeastern Africa'],
  ['bio-597', 'lack an externally projecting flagellum'],
  ['bio-599', 'about <strong>12-30 per side</strong>'],
  ['bio-600', 'a widespread soil-transmitted intestinal roundworm'],
  ['bio-601', 'immature worms migrate through the circulation and develop in the liver'],
  ['bio-602', 'Routine stool examination often misses pinworm']
];
for (const [id, s] of PRESENT) {
  ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): expected "${s.slice(0, 70)}"`);
}
// pack-wide: the absolutes and errors the review names must not survive
const ABSENT = [
  'leads to hypernatremia', 'plasma minus clotting factors', 'Serum = Plasma minus Fibrinogen',
  'first known stone tool production', 'NAACP', 'Zygomycetes', 'pathognomonic',
  'the only viable monosomy in humans', '45,X0', '47,XX+21', 'never mix directly',
  'Sandflies are the exclusive vector', 'Non-motile (gliding)', 'approximately 800 million people',
  'the most common intestinal protozoan pathogen worldwide', 'aflatoxins', 'swimmer\'s itch',
  'requiring primaquine for radical cule'.replace('cule', 'cure'), 'the mildest scenario',
  'Approximately 95% of trisomy 21 cases', 'Each crossover event produces two recombinant',
  'two identical sex chromosomes (ZZ)', 'Each tool industry reflects increased cognitive ability',
  'Parental types are always more frequent', 'Congenital TORCH infections'
];
for (const s of ABSENT) {
  const hits = IDS.filter(id => text(BY[id]).includes(s));
  ok(hits.length === 0, `"${s}" survives in ${hits.join(', ')}`);
  const had = IDS.filter(id => text(before[id]).includes(s));
  ok(had.length > 0, `"${s}" was not in the before-fixture, so its removal check is vacuous`);
}

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
ok(STEM_CHANGED.length === 23, `${STEM_CHANGED.length} stem replacements, the review lists 23`);
ok(OPT_CHANGED.size === 14, `${OPT_CHANGED.size} option renames, the review lists 14`);
ok(Object.keys(idmap.option_renames).length === 10, 'the review spreads the 14 option changes across 10 questions');
for (const key of OPT_CHANGED) {
  const [n, i] = key.split(':').map(Number);
  ok(!/\.$/.test(BY[MAP[n]].options[i]), `Q${n} option ${LETTER[i]}: trailing period does not match the option style`);
}
// the 14 renamed options, pinned verbatim
const NEW_OPTIONS = [
  ['bio-547', 1, 'Plasma retains fibrinogen, whereas serum is collected after clotting and is depleted of fibrinogen'],
  ['bio-549', 3, 'Manufacture of Oldowan stone tools'],
  ['bio-550', 0, 'Fossil evidence shows dispersal beyond Africa'],
  ['bio-550', 1, 'Its average brain size was about 1400 cm3, matching that of modern humans'],
  ['bio-550', 3, 'Its body proportions included relatively long legs and shorter arms than earlier hominins'],
  ['bio-551', 0, 'Many people with ancestry outside Africa carry roughly 1-2% Neanderthal-derived DNA'],
  ['bio-556', 2, 'Homo sapiens evolved in Africa and later spread to other continents, with some interbreeding with other hominin groups'],
  ['bio-558', 0, 'It is fully assembled by pachytene of prophase I, stabilizing homolog pairing and supporting crossing over'],
  ['bio-561', 2, 'Primary oocytes arrest in prophase I before birth; selected oocytes resume meiosis after puberty, while sperm production normally begins at puberty'],
  ['bio-576', 2, '3 purple : 1 white'],
  ['bio-576', 3, '1 purple : 3 white'],
  ['bio-581', 2, 'Serving as the main site of red blood cell production throughout fetal life'],
  ['bio-581', 3, 'Serving as the main site of T-lymphocyte maturation'],
  ['bio-589', 3, 'Mucorales']
];
ok(NEW_OPTIONS.length === 14, 'expected 14 pinned option replacements');
for (const [id, i, nowText] of NEW_OPTIONS) {
  ok(BY[id].options[i] === nowText, `${id} (Q${qnum(id)}): option ${LETTER[i]} does not match the review's replacement`);
  ok(before[id].options[i] !== nowText, `${id} (Q${qnum(id)}): option ${LETTER[i]} already read this way, so the check is vacuous`);
}
// Q13 retains C exactly, Q37 retains A and B exactly, Q41 retains A and B exactly
for (const [id, i] of [['bio-550', 2], ['bio-576', 0], ['bio-576', 1], ['bio-581', 0], ['bio-581', 1]]) {
  ok(BY[id].options[i] === before[id].options[i], `${id} (Q${qnum(id)}): option ${LETTER[i]} should have been retained exactly`);
}
// the 23 new stems, each pinned and each different from before
ok(STEM_CHANGED.length === new Set(STEM_CHANGED).size, 'the stem list repeats a display number');
for (const n of STEM_CHANGED) {
  const id = MAP[n];
  const spec = EDITS.find(s => s.id === id);
  ok(!!spec && !!spec.stemFull, `Q${n} (${id}): no supplied stem replacement`);
  if (spec && spec.stemFull) {
    ok(BY[id].question === spec.stemFull, `Q${n} (${id}): stem does not match the supplied text`);
    ok(before[id].question !== spec.stemFull, `Q${n} (${id}): the stem already read this way, so the check is vacuous`);
  }
  ok(BY[id].question.trim().length > 20, `Q${n} (${id}): stem looks truncated`);
}
// every keyed-answer heading must be the option text in full
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id];
  const m = q.explanation.match(/<h4>Correct Answer: ([^<]*(?:<(?!\/h4>)[^<]*)*)<\/h4>/);
  ok(!!m, `Q${n} (${id}): no correct-answer heading`);
  if (!m) continue;
  const head = m[1].replace(new RegExp('^' + LETTER[q.correct] + '\\. '), '').trim();
  const label = q.options[q.correct].trim();
  ok(head === label, `Q${n} (${id}): answer heading "${head.slice(0, 50)}" is not option ${LETTER[q.correct]} in full`);
}
// every distractor heading must be the option text in full, except two
// pre-existing headings that abbreviate it; those are pinned here so they
// cannot drift into a genuine mismatch.
const PARAPHRASED = {
  'bio-537:3': 'Directly increases GFR',
  'bio-562:3': 'Placental filtering'
};
let paraphrased = 0;
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id];
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ((?:(?!</strong>)[\\s\\S])*?):</strong>'));
    ok(!!m, `Q${n} (${id}): no "${LETTER[i]}. ..." distractor heading`);
    if (!m) continue;
    const key = id + ':' + i;
    if (PARAPHRASED[key]) {
      ok(m[1] === PARAPHRASED[key], `Q${n} (${id}) option ${LETTER[i]}: the documented paraphrase heading changed to "${m[1].slice(0, 50)}"`);
      paraphrased++;
      continue;
    }
    const hw = words(m[1]), ow = words(q.options[i]);
    const missing = hw.filter(w => !ow.includes(w));
    ok(missing.length === 0,
      `Q${n} (${id}): heading "${m[1].slice(0, 50)}" does not agree with option ${LETTER[i]} "${q.options[i].replace(/<[^>]*>/g, '').slice(0, 50)}" (extra: ${missing.join(' ')})`);
  }
}
ok(paraphrased === 2, `${paraphrased} paraphrased distractor headings, expected the 2 documented ones`);

// ===========================================================================
section('6. Exactly one relevant feedback section per distractor');

for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id];
  const paras = [];
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const heads = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
    ok(heads === 1, `Q${n} (${id}): ${heads} headings for option ${LETTER[i]}, expected exactly 1`);
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. (?:(?!</strong>)[\\s\\S])*?:</strong>([\\s\\S]*?)</p>'));
    ok(!!m, `Q${n} (${id}): no feedback paragraph for option ${LETTER[i]}`);
    if (!m) continue;
    const body = m[1].replace(/<[^>]*>/g, '').trim();
    ok(body.length >= 40, `Q${n} (${id}) option ${LETTER[i]}: feedback is only ${body.length} characters, which reads as truncated`);
    ok(/[.!?]$/.test(body), `Q${n} (${id}) option ${LETTER[i]}: feedback does not end in a full stop`);
    paras.push(body);
  }
  for (let a = 0; a < paras.length; a++) {
    for (let b = a + 1; b < paras.length; b++) {
      ok(paras[a] !== paras[b], `Q${n} (${id}): two distractors share the same feedback`);
    }
  }
  ok(paras.length === 3, `Q${n} (${id}): found ${paras.length} distractor paragraphs, expected 3`);
}

// ===========================================================================
section('7. Structural invariants and clean rendering');

for (const id of IDS) {
  const q = BY[id];
  const e = q.explanation;
  ok(!/—/.test(text(q)), `Q${qnum(id)} (${id}): em dash in student-facing text`);
  ok(!/[‘’“”]/.test(text(q)), `Q${qnum(id)} (${id}): curly quote; the bank uses straight quotes`);
  for (const t of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub', 'em', 'i', 'table', 'tr', 'td', 'th']) {
    const open = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const close = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(open === close, `Q${qnum(id)} (${id}): <${t}> ${open} open vs ${close} close`);
  }
  ok(!/<p>\s*<\/p>|<li>\s*<\/li>|<tr>\s*<\/tr>/.test(e), `Q${qnum(id)} (${id}): empty element`);
  ok(!/\.\.|\s\.<\/p>/.test(e.replace(/\.\.\./g, '…')), `Q${qnum(id)} (${id}): truncated sentence`);
  ok(!/\s{2,}/.test(q.question), `Q${qnum(id)} (${id}): double space in the stem`);
  ok(!/&times;|&lt;p&gt;/.test(e), `Q${qnum(id)} (${id}): escaped markup the bank does not use`);
  ok(!/\^/.test(q.question), `Q${qnum(id)} (${id}): literal caret notation in the stem`);
}
// the one table in the pack is well formed
for (const id of TABLE_IDS) {
  const m = BY[id].explanation.match(/<table class='exp-table'>([\s\S]*?)<\/table>/);
  ok(!!m, `${id} (Q${qnum(id)}): the table is missing`);
  if (!m) continue;
  const rows = [...m[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(r => (r[1].match(/<t[hd][\s>]/g) || []).length);
  ok(rows.length === 5, `${id} (Q${qnum(id)}): the table has ${rows.length} rows, expected a header plus four groups`);
  ok(new Set(rows).size === 1, `${id} (Q${qnum(id)}): ragged table, cells per row: ${rows.join(',')}`);
}
// the allele superscripts and the markup the pack relies on
ok(/I<sup>A<\/sup>/.test(BY['bio-546'].explanation), 'bio-546 (Q9): the ABO allele superscripts were lost');
ok(/I<sup>A<\/sup>/.test(BY['bio-568'].explanation), 'bio-568 (Q29): the ABO allele superscripts were lost');
ok(/<i>A<\/i>&#8209;<i>B<\/i>&#8209;/.test(BY['bio-573'].question), 'bio-573 (Q34): the A-B- genotype markup was lost');
ok(/<i>E<\/i>&#8209;<i>B<\/i>&#8209;/.test(BY['bio-574'].question), 'bio-574 (Q35): the E-B- genotype markup was lost');
for (const [id, s] of [['bio-581', 'O₂'], ['bio-587', 'cells/μL'], ['bio-550', '1400 cm3']]) {
  ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): expected the symbol "${s}" to render as a character`);
}

// ===========================================================================
section('8. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
ok(drift === 0, `${drift} out-of-scope biology items changed`);
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry items changed; this review touches biology only`);
ok(Object.keys(untouched.biology).length === 569, `untouched biology hash count is ${Object.keys(untouched.biology).length}, expected 569`);
ok(Object.keys(untouched.biology).length + IDS.length === 629, 'fixtures do not partition the biology bank');
ok(Object.keys(untouched.chemistry).length === 485, 'untouched chemistry hash count unexpected');

// ===========================================================================
section('9. The cross-item consistency the review demands');

// Q2/Q10: one account of serum versus plasma
for (const id of ['bio-538', 'bio-547']) {
  ok(!/plasma minus clotting factors|Plasma minus Fibrinogen/.test(BY[id].explanation),
    `${id} (Q${qnum(id)}): the "serum is plasma minus clotting factors" shorthand survives`);
  ok(/fibrinogen/i.test(BY[id].explanation), `${id} (Q${qnum(id)}): expected the fibrinogen-based distinction`);
}
// Q28/Q35: the same Labrador pigment mechanism
for (const id of ['bio-567', 'bio-574']) {
  ok(/pheomelanin/.test(BY[id].explanation), `${id} (Q${qnum(id)}): expected the pheomelanin explanation`);
  ok(!/no pigment is deposited/.test(BY[id].explanation), `${id} (Q${qnum(id)}): the "no pigment" claim survives`);
  ok(/masks the (effect|coat-color effect)/.test(BY[id].explanation), `${id} (Q${qnum(id)}): expected masking of the B-locus effect`);
}
// Q27/Q38: map distance and recombination percentage are not interchangeable
for (const id of ['bio-565', 'bio-577']) {
  ok(!/>50 cM|1 cM = 1%/.test(BY[id].explanation), `${id} (Q${qnum(id)}): a hard cM threshold or equality survives`);
}
// Q12/Q13/Q17/Q18: no toolmaker-first or intelligence-ranking claims
for (const id of ['bio-549', 'bio-554', 'bio-555']) {
  ok(!/first known stone tool|increased cognitive ability|species succession/.test(BY[id].explanation),
    `${id} (Q${qnum(id)}): a toolmaker-first or cognitive-ranking claim survives`);
}
// Q33: consistent karyotype notation with commas
ok(/47,XX,\+21|47,XY,\+21/.test(BY['bio-572'].explanation), 'bio-572 (Q33): expected comma notation for trisomy 21');
ok(/47,XX,\+13|47,XY,\+13/.test(BY['bio-572'].explanation), 'bio-572 (Q33): expected comma notation for trisomy 13');
// Q46/Q47/Q48: fungal identification qualified rather than asserted
for (const id of ['bio-587', 'bio-588', 'bio-589']) {
  ok(/not identify|neither is specific|do not fluoresce/.test(BY[id].explanation),
    `${id} (Q${qnum(id)}): expected a qualification of diagnostic specificity`);
}
// Q52/Q53: Giardia described by attachment rather than coating
for (const id of ['bio-594', 'bio-595']) {
  ok(!/coating (the )?intestinal villi/.test(BY[id].explanation), `${id} (Q${qnum(id)}): the "coating villi" mechanism survives`);
}

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
