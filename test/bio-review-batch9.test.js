/**
 * Verifies the RESULT of the batch 9 biology review in questions.json.
 *
 *   node test/bio-review-batch9.test.js
 *
 * The review asked for focused checks on the existing framework rather than a
 * new one, so this reuses the batch 8 suite's shape: scope and keys, the
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
// NOTE: chemistry review batch 3 (chem-123..chem-181) was approved after this
// suite was written. Those 59 ids were pruned from its untouched fixture and
// are swept by test/chem-review-batch3.test.js instead.
// NOTE: chemistry review batch 2 (chem-63..chem-122) was approved after this
// suite was written, so those 60 ids were pruned from its untouched fixture and
// the counts below were stepped down. Chemistry batch 2 has its own suite.
// NOTE: chemistry review batch 4 (chem-182..chem-241) landed after this suite
// was written, so those 60 ids were pruned from its untouched fixture and the
// counts below were stepped down. The sweep still covers every chemistry record
// that no reviewed pack owns.
'use strict';
// NOTE: chemistry batch 5 (chem-242..chem-301) pruned 60 ids from this suite's
// untouched fixture on 17 November 2026; the counts below were stepped to match.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch9-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch9-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch9-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/bio-batch9-edits-a.js'),
  require('../scripts/bio-batch9-edits-b.js'),
  require('../scripts/bio-batch9-edits-c.js'),
  require('../scripts/bio-batch9-edits-d.js'),
  require('../scripts/bio-batch9-edits-e.js')
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

// The answer-letter sequence the review itself asserts (A=15, B=16, C=17, D=12).
const KEYS = {};
idmap.asserted_letters.split('').forEach((c, i) => { KEYS[i + 1] = c; });

const KEEP = idmap.keep_unchanged_per_review;     // Q5 Q13 Q20 Q45 Q46 Q49 Q53
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
  ok(tally.A === 15 && tally.B === 16 && tally.C === 17 && tally.D === 12,
    `asserted tally is A=${tally.A} B=${tally.B} C=${tally.C} D=${tally.D}, the review prints A=15 B=16 C=17 D=12`);
}
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  ok(!!BY[id], `Q${n}: ${id} is missing from the bank`);
  if (!BY[id]) continue;
  ok(LETTER[BY[id].correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[BY[id].correct]}, the review asserts ${KEYS[n]}`);
  ok(BY[id].correct === before[id].correct, `Q${n} (${id}): the answer key moved during the pass`);
  ok(BY[id].options.length === 4, `Q${n} (${id}): expected four options`);
}
// the seven KEEP items must be byte-identical to the before-fixture
ok(KEEP.length === 7, `the review names ${KEEP.length} KEEP items, expected 7`);
for (const id of KEEP) {
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `${id} (Q${qnum(id)}): the review says KEEP UNCHANGED but it changed`);
}
// the other 53 must all have changed
{
  let edited = 0;
  for (const id of IDS) if (text(BY[id]) !== text(before[id])) edited++;
  ok(edited === 53, `${edited} of the 60 items changed, expected 53`);
  ok(EDITS.length === 53, `the apply script carries ${EDITS.length} specs, expected 53`);
}
// the span ids the export omits must not have been touched
for (const id of idmap.absent_already_reviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: a previously approved item was modified`);
for (const id of idmap.absent_still_unreviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: outside this export but modified`);
ok(idmap.major_rewrites.join() === 'Q1,Q22,Q34', 'the idmap should record Q1, Q22 and Q34 as the major rewrites');

// ===========================================================================
section('2. The presentation the review told us to preserve');

// "All items already have educational material and a Bottom Line. Preserve
//  their individual teaching and presentation." Nine items carry a table in
//  place of a bullet list; the review names table changes for exactly those.
const TABLE_IDS = ['bio-473', 'bio-478', 'bio-481', 'bio-486', 'bio-489', 'bio-492', 'bio-498', 'bio-511', 'bio-514'];
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const e = BY[id].explanation;
  ok(/<h4>Key Educational Points:<\/h4>/.test(e), `Q${n} (${id}): the educational-point heading is missing`);
  ok(/class='exp-key'>Bottom Line:/.test(e), `Q${n} (${id}): the Bottom Line is missing`);
  ok((e.match(/class='exp-key'>Bottom Line:/g) || []).length === 1, `Q${n} (${id}): expected exactly one Bottom Line`);
  const hasTable = /<table/.test(e);
  ok(hasTable === TABLE_IDS.includes(id), `Q${n} (${id}): a table was ${hasTable ? 'added' : 'removed'}`);
  // a bullet block that existed must keep its length; none was reshaped
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  const mb = before[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  ok(!!m === !!mb, `Q${n} (${id}): the shape of the educational-point block changed`);
  if (m && mb) {
    const now = (m[1].match(/<li>/g) || []).length;
    const was = (mb[1].match(/<li>/g) || []).length;
    ok(now === was, `Q${n} (${id}): point count moved from ${was} to ${now}; the review asked not to reshape these blocks`);
  }
}
ok(TABLE_IDS.length === 9, `expected 9 tables in the pack, the list has ${TABLE_IDS.length}`);
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
  ok(paired >= 180, `only ${paired} paired removal checks, expected the review's full list`);
}
// A later follow-up pass (section 10) replaced some of batch 9's own wording.
// Those ids are listed here so the derived checks below skip them, and each
// superseded passage is asserted absent, so the exemption cannot hide a
// half-applied edit.
// bio-501 needs no entry: the follow-up replaced a paragraph batch 9 never
// touched, so no derived check below refers to it.
const SUPERSEDED = new Set(['bio-475 stem', 'bio-491 explanation', 'bio-495 explanation',
  'bio-509 explanation', 'bio-509 heading']);
const supersededText = [];
// Two edits extend their anchor rather than replacing it (the review asks for
// an extra sentence in Q25 and Q50), so the anchor survives in the new text.
let extended = 0;
for (const spec of EDITS) {
  const q = BY[spec.id];
  for (const [from, to] of spec.explanation || []) {
    if (SUPERSEDED.has(spec.id + ' explanation') && !q.explanation.includes(to)) {
      supersededText.push([spec.id, to]);
    } else {
      ok(q.explanation.includes(to), `Q${spec.q} (${spec.id}): replacement text missing: ${to.slice(0, 60)}`);
      if (to.includes(from)) extended++;
      else ok(!q.explanation.includes(from), `Q${spec.q} (${spec.id}): replaced text still present: ${from.slice(0, 60)}`);
    }
    ok(before[spec.id].explanation.includes(from), `Q${spec.q} (${spec.id}): the anchor was not in the before-fixture: ${from.slice(0, 60)}`);
  }
  if (spec.stemFull) {
    if (SUPERSEDED.has(spec.id + ' stem') && q.question !== spec.stemFull) supersededText.push([spec.id, spec.stemFull]);
    else ok(q.question === spec.stemFull, `Q${spec.q} (${spec.id}): stem does not match the supplied replacement`);
  }
  if (spec.explanationFull) ok(q.explanation === spec.explanationFull, `Q${spec.q} (${spec.id}): explanation does not match the full replacement`);
  for (const [i, t] of spec.optionFull || []) ok(q.options[i] === t, `Q${spec.q} (${spec.id}): option ${LETTER[i]} does not match the supplied text`);
  for (const h of spec.keepHeadings || []) {
    if (SUPERSEDED.has(spec.id + ' heading') && !q.explanation.includes(h)) supersededText.push([spec.id, h]);
    else ok(q.explanation.includes(h), `Q${spec.q} (${spec.id}): heading lost: ${h}`);
  }
}
ok(extended === 2, `${extended} edits extend their anchor instead of replacing it, expected 2 (Q25 and Q50)`);
// exactly the six passages the follow-up rewrote, and no others
ok(supersededText.length === 5, `${supersededText.length} batch 9 passages were superseded, expected 5`);
for (const [id, to] of supersededText) ok(!text(BY[id]).includes(to), `${id}: a superseded passage is back`);

// ===========================================================================
section('4. The three major rewrites and the named repairs');

const PRESENT = [
  // Q1 (bio-473), major rewrite
  ['bio-473', 'Mitochondrial genes and translation machinery show clear relationships to those of bacteria'],
  ['bio-473', 'formed a lasting association with an ancestral host cell'],
  ['bio-473', 'They are integrated parts of the cell, not independently living bacteria'],
  ['bio-473', '<th>Evidence</th><th>What it teaches</th>'],
  ['bio-473', 'New mitochondria arise from pre-existing organelles'],
  // Q22 (bio-494), major rewrite
  ['bio-494', 'Which statement correctly compares whole-organism polyploidy in humans and plants?'],
  ['bio-494', 'Extra complete chromosome sets usually severely disrupt human embryonic development'],
  ['bio-494', 'the normal presence of polyploid cells in certain adult tissues'],
  ['bio-494', 'bread wheat has six chromosome sets'],
  ['bio-494', 'normal human liver cells and megakaryocytes provide examples'],
  ['bio-494', 'Autopolyploidy involves additional sets from one species'],
  // Q34 (bio-506), major rewrite
  ['bio-506', 'When comparing targeted gene testing with broad genomic testing'],
  ['bio-506', 'Targeted testing examines selected genes, while broad genomic testing examines many genes or genome-wide patterns'],
  ['bio-506', 'Exome sequencing focuses mainly on protein-coding regions'],
  ['bio-506', 'a chromosomal microarray primarily assesses gains and losses of DNA'],
  ['bio-506', 'Both fall within genetic testing'],
  // the other items the review singles out for particular attention
  ['bio-478', 'The lac repressor remains active and keeps transcription strongly repressed'],
  ['bio-478', 'Loss of glucose inactivates the lac repressor'],
  ['bio-478', 'Strongly repressed; very low basal expression'],
  ['bio-478', 'repression does not mean that absolutely no transcript is ever made'],
  ['bio-489', 'Which combination of findings is more characteristic of Patau syndrome'],
  ['bio-489', 'their features can overlap'],
  ['bio-489', 'Single transverse palmar crease'],
  ['bio-502', 'X<sup>D</sup>Y father'],
  ['bio-502', 'each son has a 50% chance of being affected'],
  ['bio-502', 'X-linked hypophosphatemia is an example'],
  ['bio-504', 'the significance of an HTT repeat expansion depends in part on its repeat length'],
  ['bio-504', 'GINA provides certain health-insurance and employment protections but does not itself cover life, disability or long-term-care insurance'],
  ['bio-521', 'How is this joint classified?'],
  ['bio-521', 'A fibrous joint is therefore not automatically synonymous with a synarthrosis'],
  ['bio-521', 'ball-and-socket joints such as the shoulder and hip allow movement in several planes'],
  ['bio-534', 'Prostaglandin E2 (PGE2)'],
  ['bio-534', 'importantly in endothelial cells of brain blood vessels'],
  ['bio-535', 'NKCC2 carries sodium, potassium and chloride from the tubular fluid into the cell'],
  ['bio-535', 'The basolateral Na+/K+-ATPase maintains the sodium gradient'],
  ['bio-535', 'Urea also contributes to the medullary gradient'],
  // the targeted repairs across the rest of the pack
  ['bio-474', 'Some of the earliest widely accepted stromatolite evidence'],
  ['bio-474', 'does not necessarily date the origin of life'],
  ['bio-475', 'Which sequence is consistent with a proposed origin-of-life model'],
  ['bio-475', 'the historical order remains uncertain'],
  ['bio-476', 'Why are alkaline hydrothermal environments considered a possible setting'],
  ['bio-476', 'small mineral pores may help concentrate reactants'],
  ['bio-479', 'This E. coli attenuation mechanism depends on transcription and translation occurring together'],
  ['bio-480', 'In the classic E. coli F-plasmid system'],
  ['bio-480', 'These categories are not mutually exclusive'],
  ['bio-481', 'Typical origin of transferred DNA'],
  ['bio-482', 'Many R plasmids can spread between bacteria by conjugation'],
  ['bio-483', 'Composite transposons can carry genes'],
  ['bio-484', 'transformed living rough Streptococcus pneumoniae into virulent smooth bacteria'],
  ['bio-486', 'In negative transcriptional regulation of a bacterial gene'],
  ['bio-486', 'A repressor binds regulatory DNA and reduces transcription'],
  ['bio-487', 'transfer begins at an origin within the integrated F sequence'],
  ['bio-488', '5p− means loss of material from the short arm of chromosome 5'],
  ['bio-490', 'Some individuals, particularly those with mosaicism, retain ovarian function'],
  ['bio-491', 'a common chromosomal cause of primary testicular insufficiency'],
  ['bio-493', 'a structurally altered chromosome produced by a translocation'],
  ['bio-495', 'one homolog with a pericentric inversion'],
  ['bio-496', 'Survival varies, and some affected children live for years'],
  ['bio-497', 'In the common Robertsonian 14;21 form'],
  ['bio-497', 'typically has 45 chromosomes and no extra copy of that material'],
  ['bio-498', 'rapid tests for selected chromosome abnormalities may return in a few days'],
  ['bio-499', 'CVS is not defined by avoiding culture in every case'],
  ['bio-500', 'The variants may be the same or different'],
  ['bio-501', 'restricted to an appropriate amount rather than eliminated from nutrition'],
  ['bio-503', 'a breakpoint can sometimes disrupt a gene or its regulation'],
  ['bio-505', 'usually supports normal growth and development'],
  ['bio-507', 'Which scenario most strongly supports performing a karyotype'],
  ['bio-508', 'Survival is unrelated to inherited differences among the lizards'],
  ['bio-509', 'By chance, the founders carry an allele for an inherited trait'],
  ['bio-510', 'Migration followed by reproduction between two populations'],
  ['bio-511', 'In the standard comparison of selection patterns'],
  ['bio-511', 'Increased spread or two peaks can develop'],
  ['bio-512', 'ornament may persist despite potential costs'],
  ['bio-514', 'geographic separation does not guarantee speciation'],
  ['bio-515', 'diversification of a lineage into multiple species associated with different ecological roles'],
  ['bio-516', 'offspring of first cousins have an expected F of 1/16'],
  ['bio-517', 'its genetic effects depend on the trait and reproductive assumptions'],
  ['bio-523', 'In a typical human vertebral column'],
  ['bio-525', 'In the broader classification, all ribs without their own direct sternal attachment are false ribs (8-12)'],
  ['bio-526', 'loss of bone tissue and deterioration of bone structure'],
  ['bio-527', 'During the usual indirect healing of a long-bone fracture'],
  ['bio-527', 'The stages overlap rather than occurring as completely separate events'],
  ['bio-530', 'collecting-duct water permeability is low'],
  ['bio-531', 'plasma osmolality of 310 mOsm/kg'],
  ['bio-532', 'reduced sodium-chloride delivery to the macula densa'],
  ['bio-532', '→ (renin) →'],
  ['bio-533', 'Birds and many terrestrial reptiles excrete mainly uric acid'],
  ['bio-536', 'Hypertonic dehydration involves proportionally greater loss of water than salt']
];
for (const [id, s] of PRESENT) {
  ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): expected "${s.slice(0, 70)}"`);
}
// pack-wide: the absolutes and errors the review names must not survive
const ABSENT = [
  '70S', 'Lynn Margulis', 'simian crease', 'Simian crease', '45,XO', 'cretinism', 'Aicardi syndrome',
  'only viable monosomy', 'Median ~10 days', 'Median survival is approximately 7–10 days',
  'unique to prokaryotes', 'Attenuation cannot occur in eukaryotes', 'one migrant per generation',
  'Only disruptive selection increases variance', 'the most common sex chromosome disorder in males',
  'loss of calcium from bones', 'Renin is the rate-limiting step', 'low sodium in the distal tubule',
  'hyperosmolarity', 'partial hydatidiform mole', '100% penetrance', 'carries the HD gene',
  'three or more organ systems', 'Angiotensinogen (renin) Angiotensin I'
];
for (const s of ABSENT) {
  const hits = IDS.filter(id => text(BY[id]).includes(s));
  ok(hits.length === 0, `"${s}" survives in ${hits.join(', ')}`);
  const had = IDS.filter(id => text(before[id]).includes(s));
  ok(had.length > 0, `"${s}" was not in the before-fixture, so its removal check is vacuous`);
}

// ===========================================================================
section('5. Stems, options and headings stay in sync');

// the follow-up pass in section 10 renamed one further option, Q37's A
const FOLLOWUP_OPT = new Set(['37:0']);

for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id], b = before[id];
  const changed = q.question !== b.question;
  ok(changed === STEM_CHANGED.includes(n),
    `Q${n} (${id}): stem ${changed ? 'changed but was not on the list' : 'is unchanged but the review replaces it'}`);
  for (let i = 0; i < 4; i++) {
    const oc = q.options[i] !== b.options[i];
    ok(oc === (OPT_CHANGED.has(n + ':' + i) || FOLLOWUP_OPT.has(n + ':' + i)),
      `Q${n} (${id}) option ${LETTER[i]}: ${oc ? 'changed unexpectedly' : 'unchanged but the review renames it'}`);
  }
}
ok(STEM_CHANGED.length === 22, `${STEM_CHANGED.length} stem replacements, the review lists 22`);
ok(OPT_CHANGED.size === 14, `${OPT_CHANGED.size} option renames, the review lists 14`);
ok(Object.keys(idmap.option_renames).length === 9, 'the review spreads the 14 option changes across 9 questions');
for (const key of OPT_CHANGED) {
  const [n, i] = key.split(':').map(Number);
  ok(!/\.$/.test(BY[MAP[n]].options[i]), `Q${n} option ${LETTER[i]}: trailing period does not match the option style`);
}
// the 14 renamed options, pinned verbatim
const NEW_OPTIONS = [
  ['bio-473', 3, 'Mitochondrial genes and translation machinery show clear relationships to those of bacteria'],
  ['bio-478', 1, 'Loss of glucose inactivates the lac repressor'],
  ['bio-478', 3, 'The lac repressor remains active and keeps transcription strongly repressed'],
  ['bio-486', 2, 'A repressor binds regulatory DNA and reduces transcription'],
  ['bio-494', 0, 'Extra complete chromosome sets usually severely disrupt human embryonic development, but can be tolerated in many plant species'],
  ['bio-496', 1, 'Single transverse palmar crease and Brushfield spots on the iris'],
  ['bio-506', 0, 'Targeted testing examines the entire genome, while broad genomic testing examines only one gene'],
  ['bio-506', 1, 'Targeted testing examines selected genes, while broad genomic testing examines many genes or genome-wide patterns'],
  ['bio-506', 2, 'Targeted and broad genomic testing always examine exactly the same DNA regions'],
  ['bio-506', 3, 'Broad genomic testing can only use cancer tissue, not blood samples'],
  ['bio-521', 0, 'A fibrous joint'],
  ['bio-521', 1, 'A cartilaginous joint'],
  ['bio-533', 3, 'Birds and many terrestrial reptiles excrete mainly uric acid'],
  ['bio-534', 2, 'Prostaglandin E2 (PGE2)']
];
ok(NEW_OPTIONS.length === 14, 'expected 14 pinned option replacements');
for (const [id, i, nowText] of NEW_OPTIONS) {
  ok(BY[id].options[i] === nowText, `${id} (Q${qnum(id)}): option ${LETTER[i]} does not match the review's replacement`);
  ok(before[id].options[i] !== nowText, `${id} (Q${qnum(id)}): option ${LETTER[i]} already read this way, so the check is vacuous`);
}
// the 22 new stems, each pinned and each different from before
ok(STEM_CHANGED.length === new Set(STEM_CHANGED).size, 'the stem list repeats a display number');
for (const n of STEM_CHANGED) {
  const id = MAP[n];
  const spec = EDITS.find(s => s.id === id);
  ok(!!spec && !!spec.stemFull, `Q${n} (${id}): no supplied stem replacement`);
  if (spec && spec.stemFull && !SUPERSEDED.has(id + ' stem')) {
    ok(BY[id].question === spec.stemFull, `Q${n} (${id}): stem does not match the supplied text`);
    ok(before[id].question !== spec.stemFull, `Q${n} (${id}): the stem already read this way, so the check is vacuous`);
  }
  ok(BY[id].question.trim().length > 20, `Q${n} (${id}): stem looks truncated`);
}
// every keyed-answer heading must be the option text in full
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const q = BY[id];
  const m = q.explanation.match(/<h4>Correct Answer: ([^<]*)<\/h4>/);
  ok(!!m, `Q${n} (${id}): no correct-answer heading`);
  if (!m) continue;
  const head = m[1].replace(new RegExp('^' + LETTER[q.correct] + '\\. '), '').trim();
  const label = q.options[q.correct].replace(/<[^>]*>/g, '').trim();
  ok(head === label, `Q${n} (${id}): answer heading "${head.slice(0, 50)}" is not option ${LETTER[q.correct]} in full`);
}
// every distractor heading must be the option text in full, except five
// pre-existing headings that expand or abbreviate it; those are pinned here so
// they cannot drift into a genuine mismatch.
const PARAPHRASED = {
  'bio-490:0': '47,XXX (Triple X syndrome)',
  'bio-490:1': '47,XXY (Klinefelter syndrome)',
  'bio-490:3': '46,XX (normal female)',
  'bio-530:2': 'Decreases GFR by constricting the afferent arteriole',
  'bio-531:2': 'Suppression of the RAAS'
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
ok(paraphrased === 5, `${paraphrased} paraphrased distractor headings, expected the 5 documented ones`);

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
// Q3's A and B feedback labels were swapped before the pass; each must now
// carry its own option's content
{
  const q = BY['bio-475'], b = before['bio-475'];
  // the pre-pass A and B headings carried no trailing colon, so the baseline
  // grab must not require one
  const grab = (rec, i, lax) => {
    const head = lax ? '(?:(?!</strong>)[\\s\\S])*?' : '(?:(?!</strong>)[\\s\\S])*?:';
    const m = rec.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ' + head + '</strong>([\\s\\S]*?)</p>'));
    return m ? m[1].replace(/<[^>]*>/g, '').trim() : '';
  };
  ok(/reverses the first two steps/.test(grab(b, 1, true)) && /Protobionts are structures/.test(grab(b, 0, true)),
    'bio-475 (Q3): the before-fixture should show the swapped A and B labels, or this check is vacuous');
  ok(/Polymers are placed before their monomers/.test(grab(q, 0)), 'bio-475 (Q3): option A feedback does not describe option A');
  ok(/Protocells are placed before the organic building blocks/.test(grab(q, 1)), 'bio-475 (Q3): option B feedback does not describe option B');
}

// ===========================================================================
section('7. Structural invariants and clean rendering');

for (const id of IDS) {
  const q = BY[id];
  const e = q.explanation;
  ok(!/—/.test(text(q)), `Q${qnum(id)} (${id}): em dash in student-facing text`);
  ok(!/[‘’“”]/.test(text(q)), `Q${qnum(id)} (${id}): curly quote; the bank uses straight quotes`);
  for (const t of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub', 'em', 'table', 'tr', 'td', 'th']) {
    const open = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const close = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(open === close, `Q${qnum(id)} (${id}): <${t}> ${open} open vs ${close} close`);
  }
  ok(!/<p>\s*<\/p>|<li>\s*<\/li>|<tr>\s*<\/tr>/.test(e), `Q${qnum(id)} (${id}): empty element`);
  ok(!/\.\.|\s\.<\/p>/.test(e.replace(/\.\.\./g, '…')), `Q${qnum(id)} (${id}): truncated sentence`);
  ok(!/\s{2,}/.test(q.question), `Q${qnum(id)} (${id}): double space in the stem`);
  ok(!/&times;|&amp;|&lt;p&gt;/.test(e), `Q${qnum(id)} (${id}): escaped markup or an entity the bank does not use`);
  ok(!/\^/.test(q.question), `Q${qnum(id)} (${id}): literal caret notation in the stem`);
}
// each table is well formed: every row has the same number of cells as its header
for (const id of TABLE_IDS) {
  const m = BY[id].explanation.match(/<table class='exp-table'>([\s\S]*?)<\/table>/);
  ok(!!m, `${id} (Q${qnum(id)}): the table is missing`);
  if (!m) continue;
  const rows = [...m[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)]
    .map(r => (r[1].match(/<t[hd][\s>]/g) || []).length);
  ok(rows.length >= 2, `${id} (Q${qnum(id)}): the table has only ${rows.length} row(s)`);
  ok(new Set(rows).size === 1, `${id} (Q${qnum(id)}): ragged table, cells per row: ${rows.join(',')}`);
}
// the genotype superscripts in Q30 and the restored RAAS arrows in Q56
ok((BY['bio-502'].explanation.match(/<sup>/g) || []).length === 11, 'bio-502 (Q30): expected the supported superscript formatting for both crosses');
ok(!/XDY|XdXd|XAXA|XaY/.test(BY['bio-502'].explanation), 'bio-502 (Q30): a genotype is still written without superscripts');
ok(/angiotensinogen → \(renin\) → angiotensin I → \(ACE\) → angiotensin II/.test(BY['bio-532'].explanation),
  'bio-532 (Q56): the RAAS cascade arrows are missing');
// the chemical symbols the pack relies on
for (const [id, s] of [['bio-531', 'mOsm/kg'], ['bio-484', 'CaCl₂'], ['bio-533', 'uric acid'], ['bio-488', '5p−']]) {
  ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): expected the symbol "${s}" to render as a character`);
}

// ===========================================================================
section('8. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
ok(drift === 0, `${drift} out-of-scope biology items changed`);
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] && untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry items changed; this review touches biology only`);
ok(Object.keys(untouched.biology).length === 483, `untouched biology hash count is ${Object.keys(untouched.biology).length}, expected 483`);
ok(Object.keys(untouched.biology).length + 60 + 26 + IDS.length === 629, 'fixtures do not partition the biology bank');
// Chemistry review batch 1 owns 58 chemistry ids (chem-1..chem-18,
// chem-20..chem-36, chem-38..chem-60), so this sweep covers the 248 chemistry
// items no reviewed chemistry batch owns; those 58 are checked by
// test/chem-review-batch1.test.js.
ok(Object.keys(untouched.chemistry).length === 188, 'untouched chemistry hash count unexpected');

// ===========================================================================
section('9. The cross-item consistency the review demands');

// Q26/Q27: one account of timing, risk and turnaround
for (const id of ['bio-498', 'bio-499']) {
  ok(!/0\.1–0\.3%|0\.5–1%/.test(BY[id].explanation), `${id} (Q${qnum(id)}): a fixed procedure-risk figure survives`);
  ok(/small procedure-related|Small procedure-related/.test(BY[id].explanation), `${id} (Q${qnum(id)}): expected the qualified risk wording`);
  ok(/acetylcholinesterase/.test(BY[id].explanation), `${id} (Q${qnum(id)}): expected the open-neural-tube-defect wording`);
}
ok(/depends on the laboratory analysis/.test(BY['bio-498'].explanation), 'bio-498 (Q26): expected the turnaround qualifier');
ok(/The time needed for results depends on the test performed/.test(BY['bio-499'].explanation), 'bio-499 (Q27): expected the turnaround qualifier');
// Q16/Q17/Q24: one trisomy prognosis and terminology
for (const id of ['bio-488', 'bio-489', 'bio-496']) {
  ok(!/simian|Simian/.test(BY[id].explanation), `${id} (Q${qnum(id)}): "simian crease" survives`);
  ok(!/Median ~|Median survival/.test(BY[id].explanation), `${id} (Q${qnum(id)}): a fixed median-survival figure survives`);
}
for (const id of ['bio-488', 'bio-496']) {
  ok(/variable survival|Survival varies/.test(BY[id].explanation), `${id} (Q${qnum(id)}): expected the qualified prognosis wording`);
}
// Q54/Q59: low permeability rather than literally impermeable
for (const id of ['bio-530', 'bio-535']) {
  ok(/low water permeability|water permeability is low|largely impermeable/.test(BY[id].explanation),
    `${id} (Q${qnum(id)}): expected the qualified permeability wording`);
  ok(!/is impermeable to water/.test(BY[id].explanation), `${id} (Q${qnum(id)}): an absolute impermeability claim survives`);
}
// Q55/Q56: the same macula densa signal
for (const id of ['bio-531', 'bio-532']) {
  ok(/macula densa/.test(BY[id].explanation), `${id} (Q${qnum(id)}): expected the macula densa signal`);
}
// Q36/Q37: drift described as chance sampling, not selection
ok(/unrelated to inherited differences/.test(BY['bio-508'].question), 'bio-508 (Q36): the stem should state that survival was random with respect to inherited traits');
ok(/By chance, the founders carry/.test(BY['bio-509'].question), 'bio-509 (Q37): the stem should state the chance sampling');
for (const id of ['bio-508', 'bio-509']) {
  ok(!/Amish/.test(text(BY[id])), `${id} (Q${qnum(id)}): a named-community claim survives in the teaching text`);
}
// Q1/Q22: no leftover claim that mitochondrial genomes are universally circular
ok(!/circular/.test(BY['bio-473'].explanation), 'bio-473 (Q1): a circular-genome claim survives');

// ===========================================================================
section('10. The focused follow-up correction pass');

// Five items got a second, localised pass: Q3's stem, one distractor paragraph
// each in Q19, Q23 and Q29, Q23's pericentric point and Bottom Line, and Q37's
// option A renamed with its heading. No other stem or option text moved.
const FOLLOWUP = [
  ['bio-475', ['Which sequence is consistent with a proposed origin-of-life model in which self-replicating molecules arise before membrane-enclosed protocells?'],
    ['organic building blocks form first, self-replicating molecules develop next']],
  ['bio-491', ['Some individuals with Klinefelter syndrome have very mild or no obvious symptoms',
    'Small testes, impaired fertility and the other findings in A are characteristic, although their presence and severity vary.'],
  ['it is NOT a completely normal phenotype', 'diagnosed only during infertility workup']],
  ['bio-495', ['An inversion rearranges a segment within a chromosome; it does not automatically add a whole chromosome.',
    'Pericentric inversion = includes the centromere; crossing over within the inversion loop can produce chromatids with duplications and deletions',
    'increasing the risk of pregnancy loss or an affected child'],
  ['trisomy arises from nondisjunction', 'includes centromere →', 'often leading to inviable offspring']],
  ['bio-501', ['PKU is an autosomal recessive disorder caused by disease-causing variants in both copies of the PAH gene. It can affect either sex.',
    'not to provide the hormone treatment proposed in this option'],
  ['X-linked disorders preferentially affect males', 'PKU is autosomal recessive, NOT X-linked']],
  ['bio-509', ['<strong>A. Natural selection favoring the inherited trait:</strong>'],
    ['Natural selection favoring polydactyly']]
];
ok(FOLLOWUP.length === 5, `the follow-up pass covers ${FOLLOWUP.length} items, expected 5`);
for (const [id, present, gone] of FOLLOWUP) {
  for (const s of present) ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): follow-up text missing: ${s.slice(0, 60)}`);
  // some of these strings were introduced by batch 9 itself, so the pre-batch-9
  // fixture is not their baseline; section 3 already proves they were present
  // before this pass by counting the superseded passages.
  for (const s of gone) ok(!text(BY[id]).includes(s), `${id} (Q${qnum(id)}): superseded text still present: ${s.slice(0, 60)}`);
}
// Q3's new stem no longer spells out the whole sequence
ok(BY['bio-475'].question === 'Which sequence is consistent with a proposed origin-of-life model in which self-replicating molecules arise before membrane-enclosed protocells?',
  'bio-475 (Q3): the stem does not match the follow-up text');
ok(!/building blocks form first/.test(BY['bio-475'].question), 'bio-475 (Q3): the stem still reveals the full sequence');
// Q37's option and its heading agree, and the feedback paragraph was left alone
ok(BY['bio-509'].options[0] === 'Natural selection favoring the inherited trait',
  'bio-509 (Q37): option A does not match the follow-up text');
ok(BY['bio-509'].explanation.includes('<strong>A. ' + BY['bio-509'].options[0] + ':</strong>'),
  'bio-509 (Q37): option A and its distractor heading disagree');
ok(/The stem specifies that the founders carried the allele by chance/.test(BY['bio-509'].explanation),
  'bio-509 (Q37): option A\'s feedback paragraph should have been left unchanged');
ok(!/polydactyly/i.test(text(BY['bio-509'])), 'bio-509 (Q37): a polydactyly reference survives');
// scope: only these five items differ from the batch 9 commit
{
  const FIVE = ['bio-475', 'bio-491', 'bio-495', 'bio-501', 'bio-509'];
  const B9_STEMS = { 'bio-475': 'Which sequence is consistent with a proposed origin-of-life model in which self-replicating molecules arise before membrane-enclosed protocells?' };
  for (const id of FIVE) {
    const spec = EDITS.find(s => s.id === id);
    const baseline = B9_STEMS[id] || (spec && spec.stemFull) || before[id].question;
    ok(BY[id].question === baseline, `${id} (Q${qnum(id)}): the stem moved during the follow-up`);
    ok(BY[id].correct === before[id].correct, `${id} (Q${qnum(id)}): the key moved during the follow-up`);
  }
  // only Q37's option A moved; the other four items' options are as batch 9 left them
  for (const id of ['bio-475', 'bio-491', 'bio-495', 'bio-501']) {
    for (let i = 0; i < 4; i++) {
      const spec = EDITS.find(s => s.id === id);
      const renamed = (spec && (spec.optionFull || []).some(([j]) => j === i));
      if (!renamed) ok(BY[id].options[i] === before[id].options[i], `${id} option ${LETTER[i]}: changed during the follow-up`);
    }
  }
  for (let i = 1; i < 4; i++) ok(BY['bio-509'].options[i] === before['bio-509'].options[i], `bio-509 option ${LETTER[i]}: changed during the follow-up`);
}

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
