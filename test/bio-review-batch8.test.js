/**
 * Verifies the RESULT of the batch 8 biology review in questions.json.
 *
 *   node test/bio-review-batch8.test.js
 *
 * The review asked for the existing validation tools and a before/after diff
 * rather than a new framework for prose edits, so this reuses the batch 7
 * suite's shape: scope and keys, the presentation bands the review told us to
 * preserve, the claims it asked to remove, the two substantial rewrites and the
 * named repairs, stems and options in sync with their headings, per-distractor
 * feedback, and the structural invariants that catch a half-applied edit.
 *
 * Section 3 is generated from the apply script's own `gone` lists, and every
 * one of those strings is also asserted to have been present in the
 * before-fixture, so a typo cannot pass vacuously.
 *
 * The review explicitly forbids a minimum feedback length, so section 6 checks
 * only for truncation, duplication and wrong-option attachment, not for size.
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
// NOTE: chemistry batch 6 (chem-302..chem-361) pruned 60 ids from this suite's
// untouched fixture on 18 November 2026; the counts below were stepped to match.
// NOTE: chemistry batch 5 (chem-242..chem-301) pruned 60 ids from this suite's
// untouched fixture on 17 November 2026; the counts below were stepped to match.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch8-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch8-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch8-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/bio-batch8-edits-a.js'),
  require('../scripts/bio-batch8-edits-b.js'),
  require('../scripts/bio-batch8-edits-c.js'),
  require('../scripts/bio-batch8-edits-d.js'),
  require('../scripts/bio-batch8-edits-e.js')
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

// The answer-letter sequence the review itself asserts (A=4, B=31, C=21, D=4).
const KEYS = {};
idmap.asserted_letters.split('').forEach((c, i) => { KEYS[i + 1] = c; });

const KEEP = idmap.keep_unchanged_per_review;           // Q6 Q7 Q28 Q29 Q48 Q55
const STEM_CHANGED = idmap.stem_replacements.map(s => Number(s.slice(1)));
const OPT_CHANGED = new Set(Object.entries(idmap.option_renames)
  .map(([q, letter]) => Number(q.slice(1)) + ':' + LETTER.indexOf(letter)));

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
  ok(tally.A === 4 && tally.B === 31 && tally.C === 21 && tally.D === 4,
    `asserted tally is A=${tally.A} B=${tally.B} C=${tally.C} D=${tally.D}, the review prints A=4 B=31 C=21 D=4`);
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

// ===========================================================================
section('2. The presentation bands the review told us to preserve');

// "Q1-Q18 have educational points but no Bottom Line; Q19-Q33 have both;
//  Q34-Q55 have a Bottom Line but no educational-point block; Q56-Q60 have
//  both. Do not add missing blocks."
for (let n = 1; n <= 60; n++) {
  const id = MAP[n];
  const e = BY[id].explanation;
  const b = before[id].explanation;
  const wantPoints = n <= 33 || n >= 56;
  const wantBottom = n >= 19;
  ok(/<h4>Key Educational Points:<\/h4>/.test(e) === wantPoints,
    `Q${n} (${id}): educational-point block ${wantPoints ? 'is missing' : 'was added'}`);
  ok(/class='exp-key'>Bottom Line:/.test(e) === wantBottom,
    `Q${n} (${id}): Bottom Line ${wantBottom ? 'is missing' : 'was added'}`);
  // and neither block count was forced to a uniform shape
  ok(/<h4>Key Educational Points:<\/h4>/.test(b) === wantPoints, `Q${n} (${id}): the before-fixture does not match the review's presentation map`);
  ok(/class='exp-key'>Bottom Line:/.test(b) === wantBottom, `Q${n} (${id}): the before-fixture does not match the review's Bottom Line map`);
  if (wantPoints) {
    const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
    ok(!!m, `Q${n} (${id}): malformed educational-point block`);
    if (m) {
      const count = (m[1].match(/<li>/g) || []).length;
      const was = (before[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/)[1].match(/<li>/g) || []).length;
      ok(count === was, `Q${n} (${id}): point count moved from ${was} to ${count}; the review asked not to reshape these blocks`);
    }
  }
}
// exactly one correct-answer heading and one distractor heading per item
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
  ok(paired >= 150, `only ${paired} paired removal checks, expected the review's full list`);
}
// every supplied replacement is present and its predecessor is gone. A few
// edits extend their anchor rather than replacing it (the review asks for one
// extra sentence, the egg source in Q3), so for those the anchor is
// expected to survive inside the new text; their number is pinned so the
// exemption cannot quietly grow.
// A later follow-up pass (section 10) replaced some of batch 8's own wording.
// Those ids are listed here so the derived checks below skip them, and each
// superseded passage is asserted absent, so the exemption cannot hide a
// half-applied edit.
const SUPERSEDED = new Set(['bio-413 explanation', 'bio-452 explanation', 'bio-470 explanation',
  'bio-471 explanation', 'bio-471 option']);
const supersededText = [];
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
  if (spec.stemFull) ok(q.question === spec.stemFull, `Q${spec.q} (${spec.id}): stem does not match the supplied replacement`);
  for (const [i, t] of spec.optionFull || []) {
    if (SUPERSEDED.has(spec.id + ' option') && q.options[i] !== t) supersededText.push([spec.id, t]);
    else ok(q.options[i] === t, `Q${spec.q} (${spec.id}): option ${LETTER[i]} does not match the supplied text`);
  }
  for (const h of spec.keepHeadings || []) ok(q.explanation.includes(h), `Q${spec.q} (${spec.id}): heading lost: ${h}`);
}
ok(extended === 1, `${extended} edits extend their anchor instead of replacing it, expected 1 (Q3's egg source)`);
// exactly the five passages the follow-up rewrote, and no others
ok(supersededText.length === 5, `${supersededText.length} batch 8 passages were superseded, expected 5`);
for (const [id, to] of supersededText) ok(!text(BY[id]).includes(to), `${id}: a superseded passage is back`);

// ===========================================================================
section('4. The two substantial rewrites and the named repairs');

const PRESENT = [
  // Q38 (bio-446), the first flagged rewrite
  ['bio-446', 'became long-term partners inside an ancestral host cell'],
  ['bio-446', 'retained a reduced genome, while many genes were lost or transferred to the host nucleus'],
  ['bio-446', 'depend on numerous proteins encoded by nuclear genes'],
  ['bio-446', 'Membrane folding is one proposed contribution'],
  ['bio-446', 'Viruses do not have the cellular respiratory machinery of bacteria'],
  ['bio-446', 'Lipid compartments can assemble spontaneously'],
  ['bio-446', 'Chloroplasts trace their ancestry to cyanobacteria'],
  // Q59 (bio-471), the second flagged rewrite
  ['bio-471', 'In simple laboratory models of protobionts (protocell-like compartments)'],
  ['bio-471', 'They reproduce by coordinated DNA replication and binary fission'],
  ['bio-471', 'Lipid vesicles and coacervate droplets can concentrate or retain some substances'],
  ['bio-471', 'does not necessarily imply the actively regulated homeostasis of a modern cell'],
  ['bio-471', 'A complete DNA genome and ribosomes are not required for a simple compartment model'],
  ['bio-471', 'Some model compartments can grow and physically divide'],
  ['bio-471', 'Modern oxidative phosphorylation requires an organized electron transport system'],
  ['bio-471', 'Coacervates are droplets formed by separation into different liquid phases'],
  ['bio-471', 'Proteinoid microspheres are another laboratory model of cell-like organization'],
  ['bio-471', 'Simple compartments can create distinct internal chemistry'],
  // the other substantial repairs the review singles out
  ['bio-409', 'often inconspicuous lateral knob'],
  ['bio-409', 'usually detected in urine'],
  ['bio-409', 'An operculum is a lid-like opening'],
  ['bio-409', 'The major pathology results from inflammation around retained eggs'],
  ['bio-415', 'NADH itself does not cross the inner mitochondrial membrane'],
  ['bio-415', 'Two cytosolic NADH'],
  ['bio-415', 'bypassing Complex I and yielding less ATP'],
  ['bio-415', 'total substrate-level yield from a completely oxidised glucose'],
  ['bio-420', 'depending on the enzyme isoform'],
  ['bio-420', 'provided NAD⁺ is regenerated'],
  ['bio-421', 'converting pyruvate to lactate'],
  ['bio-422', 'Combining ADP and inorganic phosphate requires an energy source'],
  ['bio-424', 'one FAD-linked electron pair, which must not be counted as NADH'],
  ['bio-463', 'a region of ectoderm thickens to form the neural plate'],
  ['bio-463', 'these developmental processes can overlap in time'],
  ['bio-468', 'In the classic Oparin-Haldane model'],
  ['bio-468', 'it did not establish the exact composition of Earth'],
  ['bio-469', 'glycine and alanine'],
  ['bio-469', 'later analyses of archived experiments revealed a wider range of products'],
  ['bio-470', 'proposed advantage for the later evolution of DNA-based genomes'],
  ['bio-472', 'Their boundaries were made from proteinoid material'],
  ['bio-472', 'it did not create living cells or demonstrate a self-replicating genome'],
  ['bio-445', 'Homologous regions are corresponding regions inherited from a common ancestral sequence'],
  ['bio-445', 'Convergence can affect molecular sequences as well as anatomy'],
  // the targeted one- and two-sentence repairs
  ['bio-406', 'Sexual reproduction of the parasite occurs in felids, not rats'],
  ['bio-406', 'oocysts in food, water or soil contaminated by cat faeces'],
  ['bio-407', 'West and Central Africa'],
  ['bio-407', 'eastern and southern Africa'],
  ['bio-407', 'making vaccine development difficult'],
  ['bio-408', 'The eggs are shed in the feces of a person carrying an adult T. solium tapeworm'],
  ['bio-410', 'relatively chlorine-tolerant'],
  ['bio-410', 'fever can occur'],
  ['bio-413', 'ordinarily do not survive passage through the stomach'],
  ['bio-413', 'Not all protozoan parasites have a cyst stage'],
  ['bio-414', 'Brugia species'],
  ['bio-416', '4 H⁺ per pair of electrons from one NADH'],
  ['bio-416', 'Of the electron-transfer complexes I–IV, Complex II does not pump protons'],
  ['bio-417', 'low passive permeability to protons'],
  ['bio-418', 'Oligomycin blocks ATP synthase and can secondarily slow electron transport'],
  ['bio-419', 'during arousal from hibernation'],
  ['bio-425', 'it can also form paired regions and double-stranded molecules'],
  ['bio-426', 'Standard base in DNA'],
  ['bio-426', 'Cytosine can lose an amino group and become uracil'],
  ['bio-427', 'ribose 5-phosphate is an example'],
  ['bio-428', 'Base stacking, sequence, length and solution conditions'],
  ['bio-429', 'Excess uric acid can contribute to gout'],
  ['bio-430', 'A 5\' end can carry a phosphate or a hydroxyl group'],
  ['bio-431', 'releases pyrophosphate'],
  ['bio-432', 'They are not required for a single-stranded nucleic acid'],
  ['bio-433', 'Peptide bonds join amino acids in proteins'],
  ['bio-436', 'molecular shape also affects migration'],
  ['bio-437', 'The end labels are reversed for this base order'],
  ['bio-438', 'would be one product predicted by the conservative model'],
  ['bio-439', 'The base is present in both a nucleoside and a nucleotide'],
  ['bio-442', 'radius and surface properties of the tube'],
  ['bio-443', 'mainly present as ammonium'],
  ['bio-443', 'reducing nitrate through a series of intermediates'],
  ['bio-444', 'Delayed density-dependent effects'],
  ['bio-447', 'the two variants need not be identical'],
  ['bio-448', 'These routes converge at coenzyme Q'],
  ['bio-449', 'Swells; may undergo hemolysis'],
  ['bio-451', 'older estimate for complete aerobic glucose oxidation'],
  ['bio-452', 'the largest pressure drop is across the arterioles'],
  ['bio-454', 'inadequate insulin secretion'],
  ['bio-455', 'mixed micelles'],
  ['bio-456', 'instructions for producing antigens'],
  ['bio-456', 'Often long-lasting; duration varies'],
  ['bio-457', 'old and new segments mixed within each strand'],
  ['bio-459', 'xerophthalmia'],
  ['bio-460', 'random fertilization adds further variation among offspring'],
  ['bio-461', 'the F factor is integrated into the chromosome'],
  ['bio-464', 'AIDS-defining illness'],
  ['bio-465', 'kidney resistance to ADH']
];
for (const [id, s] of PRESENT) {
  ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): expected "${s.slice(0, 70)}"`);
}
// pack-wide: the absolutes the review names must not survive anywhere in it
const ABSENT = [
  'Lynn Margulis', '70S', 'circular DNA', 'over 20 amino acids', 'genetically unique',
  'IV fluids must be isotonic', 'Only the homozygous recessive genotype',
  'most common parasitic intestinal infection worldwide', 'the most efficient method',
  'is the only route to ATP under anaerobic conditions', 'no role in gene transfer',
  'Blocking any single complex stops the entire chain', 'absolutely requires the proton-motive force',
  'most plausible protocell membrane model', 'Proteinoids are not true proteins'
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
ok(STEM_CHANGED.length === 9, `${STEM_CHANGED.length} stem replacements, the review lists 9`);
ok(OPT_CHANGED.size === 3, `${OPT_CHANGED.size} option renames, the review lists 3`);
// the nine new stems, pinned verbatim
const NEW_STEMS = {
  'bio-413': 'Which stage of Entamoeba histolytica is usually responsible for infection after ingestion of contaminated food or water?',
  'bio-415': 'Approximately how many ATP molecules can a human cell with functioning mitochondria obtain from the complete aerobic oxidation of one glucose molecule?',
  'bio-419': 'Uncoupling protein 1 (UCP1) in brown adipose tissue generates heat by:',
  'bio-426': 'Which base is a standard component of RNA but not a standard component of DNA?',
  'bio-443': 'In the nitrogen cycle, which biological process converts atmospheric N₂ into ammonia that can be incorporated into organic compounds?',
  'bio-460': 'Visible connections between homologous chromosomes resulting from crossing over during meiosis are called:',
  'bio-461': 'During F-plasmid-mediated conjugation in E. coli, which structure helps establish contact between a donor and a recipient cell?',
  'bio-470': 'The RNA world hypothesis proposes that early evolving systems relied on RNA for functions now divided among DNA, RNA and proteins. Which property of RNA supports this hypothesis?',
  'bio-471': 'In simple laboratory models of protobionts (protocell-like compartments), which feature illustrates compartmentalization?'
};
ok(Object.keys(NEW_STEMS).length === 9, 'expected nine pinned stems');
for (const [id, stem] of Object.entries(NEW_STEMS)) {
  ok(BY[id].question === stem, `${id} (Q${qnum(id)}): stem does not match the review's replacement`);
  ok(before[id].question !== stem, `${id} (Q${qnum(id)}): the stem already read this way, so the check is vacuous`);
}
// the three renamed options, pinned verbatim
const NEW_OPTIONS = [
  ['bio-408', 0, 'Larval cysts in undercooked pork', 'Adult worms in undercooked pork'],
  ['bio-445', 1, 'High DNA sequence similarity across many independent homologous regions', 'Similar DNA nucleotide sequences'],
  // Q59's option B was renamed again by the follow-up pass in section 10
  ['bio-471', 1, 'They reproduce by coordinated DNA replication and binary fission', 'They can reproduce through binary fission']
];
for (const [id, i, now, was] of NEW_OPTIONS) {
  ok(BY[id].options[i] === now, `${id} (Q${qnum(id)}): option ${LETTER[i]} does not match the review's replacement`);
  ok(before[id].options[i] === was, `${id} (Q${qnum(id)}): option ${LETTER[i]} did not read "${was}" before the pass`);
  ok(!/\.$/.test(BY[id].options[i]), `${id} option ${LETTER[i]}: trailing period does not match the option style`);
}
// Q37's renamed option is the keyed one, so its answer heading had to move too
ok(BY['bio-445'].explanation.includes('<h4>Correct Answer: High DNA sequence similarity across many independent homologous regions</h4>'),
  'bio-445 (Q37): the correct-answer heading was not synchronised with the renamed option');
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
        // punctuation is stripped so a heading can abbreviate an option that
        // continues past it with a comma ("... uracil" vs "... uracil, making")
        const words = s => s.replace(/<[^>]*>/g, '').toLowerCase().replace(/[,;:.]+(?=\s|$)/g, '').split(/\s+/).filter(Boolean);
        const headWords = words(m[1]);
        const optWords = words(label);
        let j = 0;
        for (const w of headWords) { const k = optWords.indexOf(w, j); if (k === -1) { j = -1; break; } j = k + 1; }
        ok(j !== -1, `Q${n} (${id}): heading "${m[1].slice(0, 50)}" is not an abbreviation of option ${LETTER[i]} "${label.slice(0, 50)}"`);
      }
    }
  }
}

// ===========================================================================
section('6. Every distractor has its own feedback, none truncated or duplicated');

// The review forbids an arbitrary minimum length ("A short explanation that
// identifies the actual misconception is better than padded text"), so the
// floor here is only low enough to catch a truncated paragraph.
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
    ok(body.length >= 40, `Q${n} (${id}) option ${LETTER[i]}: feedback is only ${body.length} characters, which reads as truncated`);
    ok(/[.!?]$/.test(body), `Q${n} (${id}) option ${LETTER[i]}: feedback does not end in a full stop`);
    paras.push(body);
  }
  for (let a = 0; a < paras.length; a++) {
    for (let b = a + 1; b < paras.length; b++) {
      ok(paras[a] !== paras[b], `Q${n} (${id}): two distractors share the same feedback`);
    }
  }
}
// the items whose distractors shared or copied text before the pass
const WAS_DUPLICATED = [['bio-413', 2, 3], ['bio-425', 2, 3], ['bio-433', 1, 3], ['bio-439', 0, 1]];
for (const [id, i, j] of WAS_DUPLICATED) {
  const q = BY[id], b = before[id];
  const grab = (rec, k) => {
    const m = rec.explanation.match(new RegExp('<strong>' + LETTER[k] + '\\. (?:(?!</strong>)[\\s\\S])*?:</strong>([\\s\\S]*?)</p>'));
    return m ? m[1].replace(/<[^>]*>/g, '').trim() : null;
  };
  ok(grab(b, i) === grab(b, j), `${id}: options ${LETTER[i]} and ${LETTER[j]} were not duplicates before the pass, so this check is vacuous`);
  ok(grab(q, i) !== grab(q, j), `${id}: options ${LETTER[i]} and ${LETTER[j]} still share feedback`);
}
// the three paragraphs that were copied verbatim out of their main explanation
const WAS_COPIED = [['bio-409', 0], ['bio-413', 0], ['bio-416', 0]];
for (const [id, i] of WAS_COPIED) {
  const q = BY[id];
  const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. (?:(?!</strong>)[\\s\\S])*?:</strong>([\\s\\S]*?)</p>'));
  ok(!!m, `${id}: no feedback paragraph for option ${LETTER[i]}`);
  if (!m) continue;
  const body = m[1].replace(/<[^>]*>/g, '').trim();
  const main = q.explanation.split('<h4>Why the other choices are wrong:</h4>')[0].replace(/<[^>]*>/g, '');
  ok(!main.includes(body), `${id} (Q${qnum(id)}) option ${LETTER[i]}: feedback is still a verbatim copy of the main explanation`);
  ok(body.length >= 100, `${id} (Q${qnum(id)}) option ${LETTER[i]}: repaired feedback is only ${body.length} characters`);
}

// ===========================================================================
section('7. Structural invariants and clean rendering');

for (const id of IDS) {
  const q = BY[id];
  const e = q.explanation;
  ok(!/—/.test(text(q)), `Q${qnum(id)} (${id}): em dash in student-facing text`);
  ok(/<h4>Correct Answer:/.test(e), `Q${qnum(id)} (${id}): no correct-answer heading`);
  ok(/<h4>Why the other choices are wrong:<\/h4>/.test(e), `Q${qnum(id)} (${id}): no distractor heading`);
  for (const t of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub', 'em', 'table', 'tr', 'td', 'th']) {
    const open = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const close = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(open === close, `Q${qnum(id)} (${id}): <${t}> ${open} open vs ${close} close`);
  }
  ok(!/<p>\s*<\/p>|<li>\s*<\/li>/.test(e), `Q${qnum(id)} (${id}): empty element`);
  // a deliberate ellipsis (Q30's "...sugar-phosphate..." backbone sketch) is
  // not a truncation, so collapse ellipses before looking for a stray ".."
  ok(!/\.\.|\s\.<\/p>/.test(e.replace(/\.\.\./g, '…')), `Q${qnum(id)} (${id}): truncated sentence`);
  ok(!/\s{2,}/.test(q.question), `Q${qnum(id)} (${id}): double space in the stem`);
  ok(q.question.trim().length > 20, `Q${qnum(id)} (${id}): stem looks truncated`);
  ok(!/&times;|&amp;|&lt;p&gt;/.test(e), `Q${qnum(id)} (${id}): escaped markup or an HTML entity the bank does not use`);
}
// the tables the review named, and the one this pass added
const TABLE_IDS = ['bio-415', 'bio-418', 'bio-426', 'bio-427', 'bio-434', 'bio-435', 'bio-443', 'bio-447', 'bio-449', 'bio-454', 'bio-456'];
for (const id of TABLE_IDS) ok(/<table class='exp-table'>/.test(BY[id].explanation), `${id} (Q${qnum(id)}): the table is missing`);
{
  let tables = 0;
  for (const id of IDS) tables += (BY[id].explanation.match(/<table/g) || []).length;
  ok(tables === TABLE_IDS.length, `${tables} tables in the pack, expected ${TABLE_IDS.length}`);
}
// Q10's new accounting table and Q20's relabelled columns
ok(/<th>Source<\/th><th>Approximate ATP<\/th>/.test(BY['bio-415'].explanation), 'bio-415 (Q10): the ATP accounting table is missing its header');
ok(/<td><strong>about 30 or 32<\/strong><\/td>/.test(BY['bio-415'].explanation), 'bio-415 (Q10): the accounting total is missing');
ok(!/<th>Found in DNA<\/th>/.test(BY['bio-426'].explanation), 'bio-426 (Q20): the table still uses the unqualified column label');
// the subscripts and superscripts the pack relies on must stay real markup
for (const id of IDS) ok(!/\^|_\{/.test(BY[id].question), `${id} (Q${qnum(id)}): literal caret or brace notation in the stem`);
ok(/H<sub>2<\/sub>O/.test(BY['bio-420'].explanation), 'bio-420 (Q15): the subscript markup was lost');

// ===========================================================================
section('8. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
ok(drift === 0, `${drift} out-of-scope biology items changed`);
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] && untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry items changed; this review touches biology only`);
ok(Object.keys(untouched.biology).length === 423, `untouched biology hash count is ${Object.keys(untouched.biology).length}, expected 423`);
ok(Object.keys(untouched.biology).length + 60 + 60 + 26 + IDS.length === 629, 'fixtures do not partition the biology bank');
// Chemistry review batch 1 owns 58 chemistry ids (chem-1..chem-18,
// chem-20..chem-36, chem-38..chem-60), so this sweep covers the 248 chemistry
// items no reviewed chemistry batch owns; those 58 are checked by
// test/chem-review-batch1.test.js.
ok(Object.keys(untouched.chemistry).length === 128, 'untouched chemistry hash count unexpected');

// ===========================================================================
section('9. The cross-item consistency the review demands');

// Q10/Q42: one ATP estimate for complete oxidation
for (const id of ['bio-415', 'bio-451']) ok(BY[id].explanation.includes('30-32'), `${id} (Q${qnum(id)}): expected the shared 30-32 ATP estimate`);
ok(!BY['bio-451'].explanation.includes('30-38'), 'bio-451 (Q42): the old 30-38 range is back');
// Q11/Q16/Q40: enzyme-bound FAD rather than free FADH2 entering Complex II
for (const id of ['bio-416', 'bio-421', 'bio-448']) {
  ok(/enzyme-bound FAD|FAD bound within succinate dehydrogenase/.test(BY[id].explanation),
    `${id} (Q${qnum(id)}): expected the enzyme-bound FAD description`);
  ok(!/FADH₂ donates electrons to Complex II|hands electrons to ubiquinone at Complex II|delivers them to the ETC at Complex II/.test(BY[id].explanation),
    `${id} (Q${qnum(id)}): free FADH₂ still enters Complex II here`);
}
// Q15/Q18: the succinyl-CoA step yields ATP or GTP, not GTP alone
ok(BY['bio-420'].explanation.includes('or ATP from ADP and inorganic phosphate'), 'bio-420 (Q15): expected the ATP/GTP isoform wording');
for (const s of ['1 ATP or GTP', '2 ATP/GTP equivalents']) ok(BY['bio-424'].explanation.includes(s), `bio-424 (Q18): expected "${s}"`);
ok(!/1 GTP|2 GTP/.test(BY['bio-424'].explanation), 'bio-424 (Q18): a GTP-only yield survives');
// Q21/Q33: 5' attachment is common, not definitional
ok(BY['bio-427'].explanation.includes('In common nucleotides such as AMP'), 'bio-427 (Q21): expected the scoped phosphate-position wording');
ok(BY['bio-439'].explanation.includes('commonly at the 5\' carbon'), 'bio-439 (Q33): expected the scoped phosphate-position wording');
// Q32/Q47: the same definition of the conservative and dispersive models
for (const id of ['bio-438', 'bio-457']) {
  ok(BY[id].explanation.includes('conservative model'), `${id} (Q${qnum(id)}): an all-new duplex should be named as the conservative model's product`);
  ok(/mixed within each strand|mixtures of old and new DNA segments within each strand/.test(BY[id].explanation),
    `${id} (Q${qnum(id)}): expected the dispersive model defined as mixing within each strand`);
}
// Q1/Q5/Q13/Q14: no absolute that the review replaced with a scoped claim
ok(BY['bio-406'].explanation.includes('only definitive host'), 'bio-406 (Q1): the felid-only life cycle claim the review kept is missing');
ok(/nonbloody diarrhoea, bloating and malabsorption; fever can occur/.test(BY['bio-410'].explanation), 'bio-410 (Q5): expected the scoped symptom claim');
ok(BY['bio-419'].explanation.includes('UCP1 does not inhibit any electron transport chain complex'), 'bio-419 (Q14): expected UCP1-specific wording');

// ===========================================================================
section('10. The narrow follow-up correction pass');

// Four items got a second, localised pass: two educational points in Q8, one
// distractor paragraph each in Q43 and Q58, and Q59's option B renamed with
// its heading. No stem moved and no other option text moved.
const FOLLOWUP = [
  ['bio-413', ['Excystation releases trophozoites, the active form. They are fragile outside the host and ordinarily do not survive passage through the stomach after ingestion.',
    'Trophozoites may remain in the intestinal lumen or invade the colonic wall. Invasive infection can cause flask-shaped ulcers and amoebic dysentery, and may spread to the liver to form an abscess.'],
  ['these may stay in the intestinal lumen or invade the wall', 'Trophozoites invade the colonic wall causing amoebic dysentery with flask-shaped ulcers']],
  ['bio-452', ['Venous pressure is much lower than aortic pressure. Venous return is driven by a pressure gradient toward the right atrium'],
    ['much lower than aortic pressure (~2-10 mmHg)']],
  ['bio-470', ['This reverses the standard base distinction: RNA uses uracil, whereas DNA uses thymine.',
    'supported by RNA\'s ability to carry genetic information and catalyze reactions'],
  ['The chemical difference that matters for this hypothesis is RNA\'s 2\'-OH group']],
  ['bio-471', ['<strong>B. They reproduce by coordinated DNA replication and binary fission:</strong>'],
    ['Reproduction by coordinated DNA replication and binary fission, as in modern bacteria']]
];
ok(FOLLOWUP.length === 4, `the follow-up pass covers ${FOLLOWUP.length} items, expected 4`);
for (const [id, present, gone] of FOLLOWUP) {
  for (const s of present) ok(text(BY[id]).includes(s), `${id} (Q${qnum(id)}): follow-up text missing: ${s.slice(0, 60)}`);
  for (const s of gone) {
    ok(!text(BY[id]).includes(s), `${id} (Q${qnum(id)}): superseded text still present: ${s.slice(0, 60)}`);
  }
}
// the two educational points Q8 replaced, pinned verbatim and in order
{
  const pts = [...BY['bio-413'].explanation
    .match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/)[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);
  ok(pts.length === 5, `bio-413 (Q8): ${pts.length} educational points, expected 5`);
  ok(pts[2] === 'Excystation releases trophozoites, the active form. They are fragile outside the host and ordinarily do not survive passage through the stomach after ingestion.',
    'bio-413 (Q8): educational point 3 does not match the follow-up text');
  ok(pts[3] === 'Trophozoites may remain in the intestinal lumen or invade the colonic wall. Invasive infection can cause flask-shaped ulcers and amoebic dysentery, and may spread to the liver to form an abscess.',
    'bio-413 (Q8): educational point 4 does not match the follow-up text');
  ok(pts[0].startsWith('The cyst is the infective stage') && pts[4].startsWith('In E. histolytica and Giardia'),
    'bio-413 (Q8): the points the follow-up leaves alone have moved');
}
// Q59's option and its heading agree, and the keyed option is still C
ok(BY['bio-471'].options[1] === 'They reproduce by coordinated DNA replication and binary fission',
  'bio-471 (Q59): option B does not match the follow-up text');
ok(BY['bio-471'].explanation.includes('<strong>B. ' + BY['bio-471'].options[1] + ':</strong>'),
  'bio-471 (Q59): option B and its distractor heading disagree');
ok(LETTER[BY['bio-471'].correct] === 'C', 'bio-471 (Q59): the key moved off C');
ok(BY['bio-471'].explanation.includes('Some model compartments can grow and physically divide'),
  'bio-471 (Q59): option B\'s feedback paragraph should have been left alone');
// scope: only these four items differ from the batch 8 commit, and no stem moved
{
  const FOUR = ['bio-413', 'bio-452', 'bio-470', 'bio-471'];
  // three of the four had their stems replaced by batch 8 itself, so the
  // baseline is that pass's pinned stem, not the pre-batch-8 fixture
  for (const id of FOUR) {
    const baseline = NEW_STEMS[id] || before[id].question;
    ok(BY[id].question === baseline, `${id} (Q${qnum(id)}): the stem moved during the follow-up`);
  }
  for (let i = 0; i < 4; i++) {
    ok(BY['bio-413'].options[i] === before['bio-413'].options[i], `bio-413 option ${LETTER[i]}: changed during the follow-up`);
    ok(BY['bio-452'].options[i] === before['bio-452'].options[i], `bio-452 option ${LETTER[i]}: changed during the follow-up`);
    ok(BY['bio-470'].options[i] === before['bio-470'].options[i], `bio-470 option ${LETTER[i]}: changed during the follow-up`);
  }
  for (const id of FOUR) ok(BY[id].correct === before[id].correct, `${id} (Q${qnum(id)}): the key moved during the follow-up`);
}
// no curly quotes crept in from the review text
for (const id of IDS) ok(!/[‘’“”]/.test(text(BY[id])), `${id} (Q${qnum(id)}): curly quote; the bank uses straight quotes`);

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
