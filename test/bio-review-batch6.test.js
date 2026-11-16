/**
 * Verifies the RESULT of the batch 6 biology review in questions.json.
 *
 *   node test/bio-review-batch6.test.js
 *
 * The review asked for proportionate checks rather than a new testing
 * framework for prose edits, so this mirrors the batch 5 suite: scope and
 * keys, the seven repeated educational-point blocks across the 14 named
 * items, the claims the review asked to remove, the three major rewrites and
 * the targeted repairs, renamed options kept in sync with their headings, and
 * the structural invariants that catch a half-applied edit. Every "gone"
 * check is paired with a check that the string really was in the
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
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch6-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch6-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch6-idmap.json'), 'utf8'));

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

// The answer-letter sequence the review itself asserts (A=2, B=38, C=18, D=2).
const KEYS = {
  1: 'C', 2: 'B', 3: 'B', 4: 'B', 5: 'D', 6: 'C', 7: 'C', 8: 'B', 9: 'C', 10: 'C',
  11: 'C', 12: 'B', 13: 'B', 14: 'B', 15: 'B', 16: 'B', 17: 'A', 18: 'B', 19: 'B', 20: 'B',
  21: 'C', 22: 'C', 23: 'B', 24: 'B', 25: 'C', 26: 'B', 27: 'B', 28: 'C', 29: 'B', 30: 'B',
  31: 'B', 32: 'B', 33: 'A', 34: 'B', 35: 'D', 36: 'B', 37: 'B', 38: 'B', 39: 'C', 40: 'C',
  41: 'C', 42: 'B', 43: 'B', 44: 'B', 45: 'C', 46: 'B', 47: 'C', 48: 'B', 49: 'B', 50: 'B',
  51: 'C', 52: 'B', 53: 'B', 54: 'B', 55: 'B', 56: 'B', 57: 'C', 58: 'B', 59: 'C', 60: 'B',
};

// Items the review said to leave alone.
const NO_CHANGE = ['bio-271', 'bio-279', 'bio-283'];

// Q55-Q59 carry no Bottom Line in this block; the review called adding one
// optional. Q60 gained the sentence the review supplied with its rewrite.
const NO_BOTTOM_LINE = ['bio-336', 'bio-337', 'bio-338', 'bio-339', 'bio-340'];

// ===========================================================================
section('1. Scope and keys');

ok(data.biology.length === 629, `biology count ${data.biology.length}`);
ok(data.chemistry.length === 485, `chemistry count ${data.chemistry.length}`);
ok(IDS.length === 60 && new Set(IDS).size === 60, 'idmap is not 60 distinct ids');
ok(Object.keys(before).length === 60, 'before-fixture is not 60 items');
for (const id of idmap.absent_already_reviewed) ok(!IDS.includes(id), `${id} should be absent: already reviewed`);
for (const id of idmap.absent_still_unreviewed) ok(!IDS.includes(id), `${id} should be absent: not in the export`);

// the review's own letter tally
const tally = { A: 0, B: 0, C: 0, D: 0 };
for (const n of Object.keys(MAP)) tally[KEYS[n]]++;
ok(tally.A === 2 && tally.B === 38 && tally.C === 18 && tally.D === 2,
   `letter tally ${JSON.stringify(tally)}, review says A=2 B=38 C=18 D=2`);
ok(idmap.asserted_letters === Object.keys(MAP).sort((a, b) => +a - +b).map(n => KEYS[n]).join(''),
   'idmap asserted_letters disagrees with this suite');

for (const [n, id] of Object.entries(MAP)) {
  ok(!!BY[id], `Q${n}: ${id} missing from the bank`);
  if (!BY[id]) continue;
  ok(LETTER[BY[id].correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[BY[id].correct]}, review asserts ${KEYS[n]}`);
  ok(BY[id].correct === before[id].correct, `Q${n} (${id}): key index changed`);
  ok(BY[id].options.length === 4, `Q${n} (${id}): ${BY[id].options.length} options`);
  ok(BY[id].id === before[id].id, `Q${n} (${id}): id changed`);
}
for (const id of NO_CHANGE) {
  ok(IDS.includes(id), `${id} should be in the pack`);
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `Q${qnum(id)} (${id}): the review said KEEP UNCHANGED, but it was modified`);
}
// 57 of the 60 were edited
const edited = IDS.filter(id => text(BY[id]) !== text(before[id]));
ok(edited.length === 57, `${edited.length} items changed, expected 57`);

// ===========================================================================
section('2. The seven repeated educational-point blocks');

// The review named exactly 14 items whose generic blocks had to go:
// Q2, Q3, Q7-Q10, Q37, Q38, Q40, Q42, Q43, Q47, Q49, Q54.
const BLOCKS = {
  'Photosynthesis converts light energy to chemical energy in two stages': [2, 3],
  'The central dogma of molecular biology describes information flow': [7, 8, 9, 10],
  'Bacteria are prokaryotes lacking membrane-bound organelles': [37, 38, 42],
  'Natural selection acts on phenotypic variation within populations': [43, 49],
  'Viruses are obligate intracellular parasites consisting of nucleic acid': [40],
  'Energy flows one way through ecosystems': [47],
  'The nervous system is divided into the CNS': [54],
};
let blockItems = 0;
const BLOCK_NUMS = new Set();
for (const [needle, nums] of Object.entries(BLOCKS)) {
  blockItems += nums.length;
  for (const n of nums) {
    BLOCK_NUMS.add(n);
    const id = MAP[n];
    ok(before[id].explanation.includes(needle), `Q${n} (${id}): the generic block was not in the before-fixture`);
    ok(!BY[id].explanation.includes(needle), `Q${n} (${id}): generic educational block still present`);
  }
}
ok(blockItems === 14, `block groups cover ${blockItems} items, review names 14`);
ok([...BLOCK_NUMS].sort((a, b) => a - b).join(',') === '2,3,7,8,9,10,37,38,40,42,43,47,49,54',
   'the replaced-block item list is not the 14 the review names');
// and no other item in the pack carries any of them either
for (const id of IDS) {
  for (const needle of Object.keys(BLOCKS)) {
    ok(!BY[id].explanation.includes(needle), `Q${qnum(id)} (${id}): carries a generic block`);
  }
}
// each of the 14 replacements has exactly the three supplied points
for (const n of BLOCK_NUMS) {
  const m = BY[MAP[n]].explanation.match(/Key Educational Points:<\/h4><ul>(.*?)<\/ul>/s);
  const c = m ? (m[1].match(/<li>/g) || []).length : 0;
  ok(c === 3, `Q${n} (${MAP[n]}): ${c} educational points, review supplies 3`);
}
// every item in the pack has a plausible number of points; the other 46 keep
// their individual blocks, which the review said not to trim to three
for (const id of IDS) {
  const m = BY[id].explanation.match(/Key Educational Points:<\/h4><ul>(.*?)<\/ul>/s);
  ok(!!m, `Q${qnum(id)} (${id}): no educational-point block`);
  if (!m) continue;
  const c = (m[1].match(/<li>/g) || []).length;
  ok(c >= 3 && c <= 6, `Q${qnum(id)} (${id}): ${c} educational points, expected 3 to 6`);
}
let individual = 0;
for (const id of IDS) if (!BLOCK_NUMS.has(+qnum(id))) individual++;
ok(individual === 46, `${individual} items keep an individual block, review says 46`);

// ===========================================================================
section('3. Claims the review asked to remove');

const GONE = [
  ['bio-257', 'the primary determinant of fluidity at physiological temperature'],
  ['bio-257', 'have no significant effect on membrane fluidity'],
  ['bio-257', 'Integral (transmembrane) proteins span the lipid bilayer'],
  ['bio-257', 'do not create its fluidity'],
  ['bio-259', 'Photosynthesis will be significantly reduced because chlorophyll reflects green light'],
  ['bio-259', 'minimal ATP and NADPH'],
  ['bio-259', 'mostly reflected'],
  ['bio-259', 'absorption minimum'],
  ['bio-260', 'by fermentation anaerobically'],
  ['bio-261', 'NAD+ is an electron donor to the chain'],
  ['bio-261', 'FADH2 donates its electrons to Complex II'],
  ['bio-261', 'Anaerobic cells fall back on substrate-level phosphorylation'],
  ['bio-262', 'and no ATP is made'],
  ['bio-262', 'halts the ETC at its first step'],
  ['bio-262', 'weight-loss drug'],
  ['bio-264', 'allowing rotation, then resealing'],
  ['bio-265', 'The lagging strand is oriented 3'],
  ['bio-265', 'It is not part of normal cellular DNA replication'],
  ['bio-265', 'challenged the original'],
  ['bio-268', 'In prokaryotes, the sigma factor'],
  ['bio-268', 'subunits in prokaryotes'],
  ['bio-268', 'sigma dissociates'],
  ['bio-268', 'does not have a proofreading function'],
  ['bio-268', '1 error per 10,000 nucleotides'],
  ['bio-270', 'Bottom Line: Stop codons: UAA, UAG, UGA.'],
  ['bio-272', 'silencing the gene epigenetically'],
  ['bio-272', 'it activates gene expression'],
  ['bio-272', '~20,000 genes'],
  ['bio-272', 'DNA methylation = silencing'],
  ['bio-272', 'marking it for degradation by the 26S proteasome. This regulates'],
  ['bio-273', 'backbone amino and carboxyl groups'],
  ['bio-273', 'R groups are not responsible for it'],
  ['bio-274', 'Low Kₘ = high affinity'],
  ['bio-274', 'A low Kₘ indicates high apparent affinity'],
  ['bio-275', '<tr><td>Noncompetitive</td>'],
  ['bio-275', 'A noncompetitive inhibitor binds to an allosteric site'],
  ['bio-275', 'Non-competitive inhibitors bind an allosteric site'],
  ['bio-278', 'Degeneracy is NOT ambiguity'],
  ['bio-278', 'each codon specifies only one amino acid'],
  ['bio-280', 'conclusively demonstrates'],
  ['bio-280', 'the parent must be homozygous dominant'],
  ['bio-280', 'cannot be heterozygous'],
  ['bio-280', 'Key concept: a testcross reveals'],
  ['bio-284', 'both parental alleles segregate independently'],
  ['bio-284', 'All offspring would be pink only if'],
  ['bio-285', 'If mating is random and the population is large, allele frequencies remain stable.'],
  ['bio-285', 'The absence of mutation keeps the allele pool stable'],
  ['bio-285', 'is the signal that some evolutionary process is at work'],
  ['bio-286', 'so none are affected, although half are carriers'],
  ['bio-286', 'not 50% of all children'],
  ['bio-287', 'Half the daughters being color blind would require the mother to be a carrier'],
  ['bio-287', 'since she needs a recessive allele from each parent'],
  ['bio-288', '25% affected, 50% carriers, 25% unaffected'],
  ['bio-288', 'This option does not match the expected Mendelian ratio'],
  ['bio-289', 'there is no carrier state'],
  ['bio-289', 'Autosomal dominant traits appear in every generation'],
  ['bio-289', 'What proportion of offspring will be affected?'],
  ['bio-290', 'Nondisjunction = failure of chromosome separation during meiosis'],
  ['bio-290', 'an entire extra copy of chromosome 21 (trisomy), most commonly'],
  ['bio-291', 'determines male sex'],
  ['bio-291', 'regardless of the number of X chromosomes'],
  ['bio-291', 'The extra X is inactivated, so these individuals have one Barr body'],
  ['bio-292', 'X-inactivation ensures only one X chromosome remains active per cell'],
  ['bio-292', 'transcriptionally silent heterochromatin'],
  ['bio-292', 'How many Barr bodies would be observed in the cells'],
  ['bio-295', '900 is the value of 2q'],
  ['bio-295', '200 carriers would imply'],
  ['bio-296', 'The Philadelphia chromosome results from a reciprocal translocation'],
  ['bio-296', 'the first clear success of targeted cancer therapy'],
  ['bio-296', 'monosomy X (45,X), the loss of a sex chromosome'],
  ['bio-299', 'ensures all chromosomes are properly attached'],
  ['bio-299', 'which prevents aneuploidy'],
  ['bio-299', 'prevents premature anaphase entry'],
  ['bio-300', '92 chromosomes would represent a doubling'],
  ['bio-301', 'During anaphase I, homologous chromosomes separate and move to opposite poles'],
  ['bio-302', 'This is actually a correct statement'],
  ['bio-302', 'Replication itself does not generate genetic diversity'],
  ['bio-302', 'produces identical copies of each chromosome'],
  ['bio-304', 'Three is not the product of any standard meiotic division'],
  ['bio-304', 'three polar bodies and one ovum result'],
  ['bio-306', 'oncogenes are their mutated, overactive forms'],
  ['bio-306', 'Only ONE mutant allele is sufficient'],
  ['bio-306', 'recessive, need both alleles affected'],
  ['bio-306', 'recessive, and generally requiring both alleles'],
  ['bio-307', 'Which of the following structures allows bacteria to adhere to surfaces'],
  ['bio-307', 'not the primary structures for surface adhesion'],
  ['bio-307', 'It is not involved in surface adhesion or biofilm formation'],
  ['bio-308', 'Archaea do not stain reliably with the Gram stain'],
  ['bio-308', 'using heat or detergent to penetrate the waxy coat'],
  ['bio-309', 'Direct transfer via sex pilus (F plasmid)'],
  ['bio-309', 'conjugation requires direct contact through a sex pilus'],
  ['bio-309', 'Conjugation requires physical contact between bacteria'],
  ['bio-311', 'Viruses contain either DNA or RNA, never both simultaneously'],
  ['bio-311', 'Viruses are always smaller than bacteria, not larger'],
  ['bio-311', 'obligate intracellular parasites that require host cell machinery'],
  ['bio-311', 'lytic cycle (immediate reproduction and cell lysis)'],
  ['bio-313', 'transcription of new virions'],
  ['bio-313', 'is why HIV infection is lifelong and not cleared'],
  ['bio-313', 'main replicative enzyme in prokaryotic DNA replication'],
  ['bio-315', 'attach to the cell membrane at different points'],
  ['bio-315', 'Since bacteria are haploid and DNA replication is faithful'],
  ['bio-315', 'Result: two identical daughter cells'],
  ['bio-316', 'though it could still experience genetic drift'],
  ['bio-316', 'This is a passive, non-directed process'],
  ['bio-316', 'overproduction of offspring'],
  ['bio-316', 'eliminating harmful ones over generations'],
  ['bio-317', 'Darwin fundamentally disagreed with Lamarck'],
  ['bio-317', 'De Vries added the concept'],
  ['bio-317', 'Modern genetics confirms that acquired somatic changes are not inherited'],
  ['bio-318', 'there is no ongoing exchange of alleles'],
  ['bio-318', 'Both reduce genetic diversity and can raise'],
  ['bio-320', '70S'],
  ['bio-320', 'Free-living prokaryotes that were engulfed by ancestral eukaryotic cells'],
  ['bio-320', 'now-disfavored'],
  ['bio-320', 'independent division'],
  ['bio-320', "the outer from the host's phagocytic vesicle"],
  ['bio-321', 'The remaining ~90% is lost as heat'],
  ['bio-321', 'could barely support a second trophic level'],
  ['bio-321', 'movement, growth, and maintenance'],
  ['bio-321', 'ecological pyramid'],
  ['bio-322', 'Eutrophication of a lake caused by agricultural runoff'],
  ['bio-322', 'Oxygen is consumed by the decomposers, not by the algae themselves'],
  ['bio-322', 'Clear water is actually an indicator of a healthy'],
  ['bio-322', 'Eutrophication follows a fixed sequence'],
  ['bio-324', 'First stone tools'],
  ['bio-324', 'first to leave africa and use fire'],
  ['bio-324', 'Brain Size'],
  ['bio-324', 'earliest known member'],
  ['bio-325', 'successfully phased out CFC production'],
  ['bio-325', 'the primary driver of the greenhouse effect'],
  ['bio-325', 'Keep the two problems separate'],
  ['bio-327', 'The lining of the gastrointestinal tract, the liver, and the pancreas are derived'],
  ['bio-327', 'do not give rise to the GI lining or associated organs'],
  ['bio-328', 'It does not produce skeletal muscle, bone, blood, or kidneys'],
  ['bio-328', 'gives rise to the placenta and extraembryonic membranes'],
  ['bio-329', 'Failure of apoptosis in digit separation leads to syndactyly'],
  ['bio-329', 'driven by active transport of ions and water'],
  ['bio-329', 'orderly and non-inflammatory'],
  ['bio-335', 'Astrocytes are the most abundant CNS glia'],
  ['bio-335', 'derive from the monocyte-macrophage lineage'],
  ['bio-335', 'taking no part in myelination'],
  ['bio-336', 'the inhibitor structurally resembles the substrate'],
  ['bio-336', 'A competitive inhibitor resembles the substrate'],
  ['bio-336', 'affinity appears lower'],
  ['bio-337', 'Because these enzymes feed the citric acid cycle'],
  ['bio-338', 'the pattern for noncompetitive inhibition'],
  ['bio-338', 'describes mixed inhibition, where the inhibitor can bind'],
  ['bio-339', 'They require cofactors such as NAD+'],
  ['bio-339', 'coupled to nucleoside triphosphate hydrolysis'],
  ['bio-339', 'requirement for a nucleoside triphosphate to drive bond formation'],
  ['bio-339', '<div style='],
  ['bio-340', 'while NADP+ is used in anabolic pathways'],
  ['bio-340', 'critically, neural tube defects'],
  ['bio-340', 'passes its electrons straight to ubiquinone'],
  ['bio-341', 'The enzyme has higher affinity for substrate B'],
  ['bio-341', 'inversely related'],
  ['bio-341', 'hexokinase'],
];
for (const [id, s] of GONE) {
  ok(text(before[id]).includes(s), `Q${qnum(id)} (${id}): "${s.slice(0, 55)}" was not in the before-fixture, so the GONE check is vacuous`);
  ok(!text(BY[id]).includes(s), `Q${qnum(id)} (${id}): still contains "${s.slice(0, 55)}"`);
}

// ===========================================================================
section('4. The three major rewrites and the targeted repairs');

const PRESENT = [
  // Q3 green light
  ['bio-259', 'Green light can support photosynthesis, although chlorophyll a and b absorb it less strongly'],
  ['bio-259', 'can reach chloroplasts deeper inside the leaf'],
  ['bio-259', 'Wavelength alone does not determine the photosynthetic rate'],
  // Q49 human evolution
  ['bio-324', 'traditionally associated with Oldowan stone tools'],
  ['bio-324', 'does not prove that it was the first toolmaker'],
  ['bio-324', 'it is not established as the first stone-tool maker'],
  // Q60 Km
  ['bio-341', 'Half-maximal reaction rate is reached at a lower concentration of substrate B'],
  ['bio-341', 'Kₘ reflects both binding and catalytic steps'],
  ['bio-341', 'not generally identical to the substrate-binding dissociation constant'],
  // the targeted repairs the review singled out for rechecking
  ['bio-257', 'A cis double bond puts a kink'],
  ['bio-261', 'NAD+ accepts electrons to become NADH'],
  ['bio-261', 'FAD accepts electrons rather than donating them'],
  ['bio-265', 'The lagging-strand template runs 5'],
  ['bio-265', 'reads its DNA template 3'],
  ['bio-268', 'In bacteria, the sigma factor'],
  ['bio-268', 'backtracking and cleaving the transcript'],
  ['bio-280', 'an Aa parent can produce an all-dominant sample by chance'],
  ['bio-286', 'some carriers can also have bleeding symptoms'],
  ['bio-288', '50% unaffected carriers, and 25% unaffected non-carriers'],
  ['bio-288', 'GIVEN that the child is unaffected'],
  ['bio-289', 'What proportion of their children is expected to inherit the H allele?'],
  ['bio-295', '900 equals pq × 10,000'],
  ['bio-295', '4,200 would be 42% of the population'],
  ['bio-296', 'shortened derivative chromosome 22'],
  ['bio-300', 'temporarily contains 92 chromosomes during anaphase'],
  ['bio-301', 'In anaphase II, sister chromatids separate'],
  ['bio-306', 'abnormally activated or overexpressed versions of these genes'],
  ['bio-308', 'can still stain Gram-positive or Gram-negative'],
  ['bio-311', 'Viruses lack ribosomes and depend on host cells for protein synthesis'],
  ['bio-311', '<em>Chlamydia</em>'],
  ['bio-315', 'organized partitioning of the chromosome copies'],
  ['bio-320', 'Bacteria that established endosymbiotic relationships with ancestral host cells'],
  ['bio-321', 'detrital'],
  ['bio-322', 'respire continuously'],
  ['bio-325', 'also act as greenhouse gases'],
  ['bio-327', 'thymic epithelium'],
  ['bio-328', 'most bone and cartilage'],
  ['bio-329', 'water follows by osmosis'],
  ['bio-335', 'yolk-sac myeloid precursors'],
  ['bio-336', 'PURE noncompetitive'],
  ['bio-337', 'pentose phosphate pathway'],
  ['bio-338', 'quadrant-III intersection'],
  ['bio-339', 'translocases (EC 7)'],
  ['bio-340', 'NADPH supplies reducing power'],
];
for (const [id, s] of PRESENT) {
  ok(text(BY[id]).includes(s), `Q${qnum(id)} (${id}): missing "${s.slice(0, 60)}"`);
}
// the Q3 rewrite keeps four options and the Q49 rewrite keeps all four intact
ok(BY['bio-259'].options.length === 4, 'bio-259: option count changed');
for (let i = 0; i < 4; i++) {
  ok(BY['bio-324'].options[i] === before['bio-324'].options[i], `bio-324: option ${LETTER[i]} should be unchanged`);
}
// the Q49 comparison table keeps only the four short associations
const t49 = BY['bio-324'].explanation.match(/<table class='exp-table'>[\s\S]*?<\/table>/);
ok(!!t49, 'bio-324: comparison table lost');
if (t49) ok((t49[0].match(/<tr>/g) || []).length === 5, 'bio-324: table is not a header plus four rows');

// ===========================================================================
section('5. Stems, options and headings stay in sync');

// The review names 13 definite stem changes plus two minimal ones (Q14's
// Michaelis-Menten assumption, Q45's previously uninhabited island).
// Q13 is not on the review's stem list, but the wording it tells us to replace
// ("backbone amino and carboxyl groups") sits in the stem itself.
const STEM_CHANGED = [1, 3, 5, 9, 12, 13, 14, 25, 28, 37, 45, 48, 49, 51, 52, 60];
for (const n of Object.keys(MAP)) {
  const id = MAP[n];
  const changed = BY[id].question !== before[id].question;
  ok(changed === STEM_CHANGED.includes(+n),
     `Q${n} (${id}): stem ${changed ? 'changed' : 'unchanged'}, expected the opposite`);
}
ok(STEM_CHANGED.length === 16, `${STEM_CHANGED.length} stem changes listed, expected 16`);

// Definite option-text changes: Q3 A-D, Q36 B, Q40 A and C, Q46 B, Q60 B.
const OPT_CHANGED = new Set(['3:0', '3:1', '3:2', '3:3', '36:1', '40:0', '40:2', '46:1', '60:1']);
let optCount = 0;
for (const n of Object.keys(MAP)) {
  const id = MAP[n];
  for (let i = 0; i < 4; i++) {
    const changed = BY[id].options[i] !== before[id].options[i];
    if (changed) optCount++;
    ok(changed === OPT_CHANGED.has(`${n}:${i}`),
       `Q${n} (${id}): option ${LETTER[i]} ${changed ? 'changed' : 'unchanged'}, expected the opposite`);
  }
}
ok(optCount === 9, `${optCount} options changed, expected 9`);

// Heading-abbreviation rule: a heading's words must appear in the option's
// words, in order.
const words = s => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;|&#\d+;/g, ' ')
  .replace(/[^a-z0-9% ]/gi, ' ').trim().toLowerCase().split(/\s+/).filter(Boolean);
const isSub = (small, big) => { let j = 0; for (const w of small) { while (j < big.length && big[j] !== w) j++; if (j === big.length) return false; j++; } return true; };

for (const id of IDS) {
  const q = BY[id];
  const key = q.correct;
  const head = q.explanation.match(/<h4>Correct Answer:([^<]*)<\/h4>/);
  ok(!!head, `Q${qnum(id)} (${id}): no correct-answer heading`);
  if (head) {
    ok(isSub(words(head[1]).filter(w => w !== LETTER[key].toLowerCase()), words(q.options[key])),
       `Q${qnum(id)} (${id}): correct-answer heading does not match option ${LETTER[key]}`);
  }
  for (let i = 0; i < 4; i++) {
    if (i === key) continue;
    // a heading may contain <sub>/<sup> markup, so do not stop at the first '<'
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ((?:(?!</strong>)[\\s\\S])*?):</strong>'));
    ok(!!m, `Q${qnum(id)} (${id}): no feedback heading for option ${LETTER[i]}`);
    if (m) ok(isSub(words(m[1]), words(q.options[i])),
              `Q${qnum(id)} (${id}): heading "${m[1]}" does not match option ${LETTER[i]} "${q.options[i]}"`);
  }
}

// ===========================================================================
section('6. Every distractor has its own relevant feedback');

for (const id of IDS) {
  const q = BY[id];
  const bodies = [];
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. (?:(?!</strong>)[\\s\\S])*?:</strong>([\\s\\S]*?)</p>'));
    ok(!!m, `Q${qnum(id)} (${id}): no feedback paragraph for option ${LETTER[i]}`);
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
  const hasBL = /<p class='exp-key'>Bottom Line: /.test(e);
  if (NO_BOTTOM_LINE.includes(id)) {
    ok(!/exp-key/.test(before[id].explanation), `Q${qnum(id)} (${id}): expected no Bottom Line in the before-fixture either`);
    ok(!hasBL, `Q${qnum(id)} (${id}): a Bottom Line was added; Q55-Q59 have none in this block`);
  } else {
    ok(hasBL, `Q${qnum(id)} (${id}): no Bottom Line`);
  }
  ok(!e.includes('—') && !q.question.includes('—') && !q.options.join('').includes('—'),
     `Q${qnum(id)} (${id}): contains an em dash`);
  ok(!/<li>\s*<\/li>|<p>\s*<\/p>|<strong>\s*<\/strong>|<div[^>]*>\s*<\/div>/.test(e), `Q${qnum(id)} (${id}): empty element`);
  // a lowercase first word after a feedback heading is the signature of a
  // mangled copied sentence
  ok(!/<strong>[A-D]\. [^<]*?:<\/strong>\s*[a-z]/.test(e), `Q${qnum(id)} (${id}): a distractor feedback starts lowercase`);
  for (const t of PAIRED) {
    const open = (e.match(new RegExp('<' + t + '(?=[\\s>])', 'g')) || []).length;
    const close = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(open === close, `Q${qnum(id)} (${id}): <${t}> ${open} open vs ${close} close`);
  }
  ok(!/\.\.|\s\.<\/p>/.test(e), `Q${qnum(id)} (${id}): truncated sentence`);
  ok(!/\s{2,}/.test(q.question), `Q${qnum(id)} (${id}): double space in the stem`);
}
// Q60 gained the Bottom Line the review supplied with its rewrite
ok(/<p class='exp-key'>Bottom Line: Lower Kₘ means/.test(BY['bio-341'].explanation), 'bio-341: the supplied Bottom Line is missing');
ok(!/exp-key/.test(before['bio-341'].explanation), 'bio-341: expected no Bottom Line before the rewrite');

// ===========================================================================
section('8. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
ok(drift === 0, `${drift} out-of-scope biology items changed`);
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry items changed; this review touches biology only`);
for (const id of idmap.absent_already_reviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: a previously approved item was modified`);
for (const id of idmap.absent_still_unreviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: outside this export but modified`);
ok(Object.keys(untouched.biology).length === 509, `untouched biology hash count is ${Object.keys(untouched.biology).length}, expected 509`);
ok(Object.keys(untouched.biology).length + 60 + IDS.length === 629, 'fixtures do not partition the biology bank');
ok(Object.keys(untouched.chemistry).length === 485, 'untouched chemistry hash count unexpected');

// ===========================================================================
section('9. The narrow follow-up correction pass');

// Eight items got a second, localised pass: a distractor feedback body or a
// single educational point rewritten, with stems, options, keys and headings
// untouched. Each entry pins the replacement text as PRESENT, the text it
// replaced as GONE, and the option heading as still intact. The pair is
// complementary on the same paragraph, so a typo in one half is caught by the
// other rather than passing vacuously.
const FOLLOWUP = [
  ['bio-268', '<strong>B. Termination of transcription:</strong>',
    ["Bacterial transcription can end through an intrinsic RNA-hairpin mechanism or a Rho-dependent mechanism",
      "Sigma factor's principal role is recognizing a promoter so that transcription can begin."],
    ['Transcription termination in prokaryotes occurs by two mechanisms', 'Rho-independent termination uses a GC-rich hairpin loop']],
  ['bio-280', '<strong>A. Heterozygous:</strong>',
    ['An Aa × aa cross gives each offspring a 50% chance of showing the dominant phenotype.',
      'Such a sample supports AA without proving it; the strength of that support depends on how many offspring were observed.',
      '<li>Any finite all-dominant sample can arise from a heterozygous parent by chance; this becomes less likely as the number of offspring increases.</li>'],
    ['the conclusion is only probabilistic', 'small all-dominant litter', 'strong evidence for AA rather than proof of it']],
  ['bio-289', null,
    ['<li>An Hh × hh cross gives each child a 50% chance of inheriting the H allele.</li>'],
    ['gives 1/2 affected offspring']],
  ['bio-315', '<strong>A. Binary fission produces four daughter cells:</strong>',
    ['Binary fission is one cell division that produces two daughter cells. Replicated chromosomal DNA is partitioned between them.'],
    ['Each daughter cell receives a copy of the single circular chromosome', 'The process yielding four cells from one starting cell is meiosis']],
  ['bio-320', null,
    ['<li>During evolution, many ancestral endosymbiont genes were lost, while others were transferred to the nucleus.'],
    ['Most of the original endosymbiont genes have since moved to the nuclear genome', '70S']],
  ['bio-322', '<strong>A. Increased biodiversity at all trophic levels:</strong>',
    ['Excess nutrients may initially increase algal growth, but severe eutrophication can reduce biodiversity.',
      'favoring organisms that tolerate low oxygen',
      '<li>Severe oxygen depletion can create a hypoxic "dead zone", as occurs seasonally in parts of the Gulf of Mexico and the Baltic Sea.</li>'],
    ['Eutrophication actually decreases biodiversity, not increases it', 'the ecosystem collapses', 'The result is a hypoxic dead zone']],
  ['bio-324', '<strong>A. Australopithecus afarensis:</strong>',
    ['It includes Lucy, whose fossil is about 3.2 million years old.', 'whose name means "handy man"'],
    ['the species that includes the famous Lucy fossil']],
  ['bio-328', '<strong>C. Endoderm:</strong>',
    ['Endoderm supplies most of the epithelial lining of the digestive and respiratory tracts',
      'those are mesodermal derivatives'],
    ['It does not give rise to muscles, bones, blood, or kidneys']]
];
// The follow-up pass promised not to touch these stems, and section 5 only
// pins which stems differ from the before-fixture, not their exact wording, so
// the eight stems are pinned verbatim here.
const FOLLOWUP_STEMS = {
  'bio-268': 'In bacteria, the sigma factor of RNA polymerase is essential for:',
  'bio-280': 'A testcross is performed by crossing an organism showing a dominant phenotype with a homozygous recessive organism. If ALL offspring show the dominant phenotype, the tested parent is most likely:',
  'bio-289': 'Huntington’s disease is autosomal dominant. An affected heterozygous father (Hh) and an unaffected mother (hh) have children. What proportion of their children is expected to inherit the H allele?',
  'bio-315': 'Bacterial binary fission differs from eukaryotic mitosis in that:',
  'bio-320': 'The endosymbiotic theory proposes that mitochondria and chloroplasts originated from:',
  'bio-322': 'Severe nutrient enrichment of a lake from agricultural runoff can lead to which outcome?',
  'bio-324': 'Which early Homo species has a name meaning handy man and is traditionally associated with Oldowan stone tools?',
  'bio-328': 'Which germ layer gives rise to skeletal muscle, cardiac muscle, most bone and cartilage, blood, and the kidneys?'
};
ok(FOLLOWUP.length === 8, `the follow-up pass covers ${FOLLOWUP.length} items, expected 8`);
for (const [id, stem] of Object.entries(FOLLOWUP_STEMS)) {
  ok(BY[id].question === stem, `Q${qnum(id)} (${id}): stem changed during the follow-up pass`);
}
// Section 5 pins every option that batch 6 did not rename against the
// before-fixture. Of these eight items only Q46's option B was renamed, so it
// is the one option text that needs pinning here.
ok(BY['bio-320'].options[1] === 'Bacteria that established endosymbiotic relationships with ancestral host cells',
  'bio-320: option B changed during the follow-up pass');
for (const [id, heading, present, gone] of FOLLOWUP) {
  const q = BY[id];
  const n = qnum(id);
  if (heading) ok(q.explanation.includes(heading), `Q${n} (${id}): option heading lost: ${heading}`);
  for (const s of present) ok(q.explanation.includes(s), `Q${n} (${id}): follow-up text missing: ${s.slice(0, 60)}`);
  for (const s of gone) ok(!q.explanation.includes(s), `Q${n} (${id}): replaced text still present: ${s.slice(0, 60)}`);
  // the follow-up changed prose only; stems are pinned by section 5 against the
  // before-fixture, so here it is enough to re-check the key
  ok(LETTER[q.correct] === KEYS[n], `Q${n} (${id}): key moved during the follow-up pass`);
}

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
