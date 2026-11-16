/**
 * Verifies the RESULT of the batch 2 biology review in questions.json.
 *
 *   node test/bio-review-batch2.test.js
 *
 * This test does not run the apply scripts and does not read them. It compares
 * the live questions.json against:
 *
 *   test/fixtures/bio-review-batch2-before.json     the 63 items as they were
 *   test/fixtures/bio-review-batch2-untouched.json  hashes of everything else
 *
 * Every "superseded claim is gone" check is paired with a check that the claim
 * really was in the before-fixture. Without that pairing a typo in a GONE
 * string would pass silently and prove nothing.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';

const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch2-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch2-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch2-idmap.json'), 'utf8'));

const BY = Object.fromEntries(data.biology.map(q => [q.id, q]));

let checks = 0, failures = 0;
function ok(cond, msg) {
  checks++;
  if (!cond) { failures++; console.error('  FAIL ' + msg); }
}
function section(name) { console.log('\n' + name); }
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;

// The letter each displayed question must still key to, per the review.
const KEYS = {
  1: 'A', 2: 'D', 3: 'B', 4: 'A', 5: 'C', 6: 'C', 7: 'A', 8: 'C', 9: 'C', 10: 'B',
  11: 'B', 12: 'B', 13: 'B', 14: 'C', 15: 'B', 16: 'C', 17: 'A', 18: 'C', 19: 'D', 20: 'B',
  21: 'B', 22: 'B', 23: 'D', 24: 'B', 25: 'B', 26: 'B', 27: 'C', 28: 'D', 29: 'C', 30: 'B',
  31: 'A', 32: 'B', 33: 'B', 34: 'B', 35: 'A', 36: 'B', 37: 'C', 38: 'B', 39: 'B', 40: 'B',
  41: 'D', 42: 'B', 43: 'B', 44: 'A', 45: 'A', 46: 'D', 47: 'B', 48: 'C', 49: 'B', 50: 'C',
  51: 'A', 52: 'C', 53: 'D', 54: 'C', 55: 'C', 56: 'C', 57: 'C', 58: 'B', 59: 'B', 60: 'C',
};

const MAP = idmap.map;
// bio-216 (cones) was a KEEP item for this review, but review batch 5
// subsequently edited it, so it is now that batch's test's responsibility and
// cannot be asserted unchanged here. bio-366 (Hardy-Weinberg assumptions) is
// the same case one batch later: batch 7 edited it, so it belongs to that
// batch's test now.
const HANDED_OFF = ['bio-216', 'bio-366'];
const KEPT_BY_REVIEW = new Set(idmap.keep_unchanged);
const KEEP = new Set(idmap.keep_unchanged.filter(id => !HANDED_OFF.includes(id)));
const EDITED = Object.values(MAP).filter(id => !KEPT_BY_REVIEW.has(id)).concat(['bio-294']);

// ===========================================================================
section('1. Structure');

ok(data.biology.length === 629, `biology count is ${data.biology.length}, expected 629`);
ok(data.chemistry.length === 485, `chemistry count is ${data.chemistry.length}, expected 485`);
ok(new Set(data.biology.map(q => q.id)).size === 629, 'duplicate biology ids');
for (const [n, id] of Object.entries(MAP)) ok(!!BY[id], `Q${n}: ${id} missing from questions.json`);
ok(EDITED.length === 53, `expected 53 edited records, map yields ${EDITED.length}`);
for (const q of data.biology) {
  ok(Array.isArray(q.options) && q.options.length === 4, `${q.id}: not 4 options`);
  ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3, `${q.id}: bad correct index`);
  ok(typeof q.explanation === 'string' && q.explanation.length > 50, `${q.id}: explanation missing or tiny`);
}

// ===========================================================================
section('2. Answer keys unchanged');

for (const [n, id] of Object.entries(MAP)) {
  const q = BY[id];
  if (!q) continue;
  ok(LETTER[q.correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[q.correct]}, review asserts ${KEYS[n]}`);
  ok(q.correct === before[id].correct, `Q${n} (${id}): correct index changed from the before-fixture`);
}
ok(BY['bio-294'].correct === before['bio-294'].correct, 'bio-294: correct index changed');

// ===========================================================================
section('3. Superseded claims removed (each paired with a before-check)');

// [id, string that must be gone]
const GONE = [
  // Q1 filler distractors and off-topic points
  ['bio-97', 'is a different evolutionary concept'],
  ['bio-97', 'Evidence for evolution comes from multiple independent sources'],
  // Q2 oogenesis timing
  ['bio-303', 'completes meiosis I at ovulation'],
  ['bio-303', 'Fetal life through puberty'],
  ['bio-303', 'is the accepted explanation for the rising rate of nondisjunction'],
  ['bio-303', 'completes meiosis i at ovulation'],
  // Q3 restriction point conflation, CDC25, cancer statistic
  ['bio-298', 'At the G1/S transition (restriction point)'],
  ['bio-298', 'G1/S restriction point'],
  ['bio-298', 'CDC25'],
  ['bio-298', 'over 50% of human cancers'],
  // Q5 crude leg mnemonic
  ['bio-625', '10+ = crustacean or myriapod'],
  ['bio-625', 'two body segments'],
  // Q6 abundance-only explanation, gas ranking, dipole rule
  ['bio-323', 'because of its sheer atmospheric abundance'],
  ['bio-323', 'with no dipole moment'],
  ['bio-323', 'CH₄ > N₂O > fluorinated gases'],
  ['bio-323', 'has zero greenhouse effect'],
  // Q7 allosteric = noncompetitive, denaturation = irreversible
  ['bio-450', 'This describes non-competitive (allosteric) inhibition'],
  ['bio-450', 'This describes irreversible inhibition'],
  ['bio-450', 'Non-competitive inhibition decreases Vmax but Km stays the same'],
  // Q8 absolutes and the snRNA roll-call
  ['bio-267', 'Intron retention would produce a nonfunctional protein in most cases'],
  ['bio-267', 'U1, U2, U4, U5, U6'],
  ['bio-267', 'The central dogma of molecular biology describes information flow'],
  // Q10 and Q11 filler
  ['bio-105', 'is a different evolutionary concept'],
  ['bio-105', 'Evidence for evolution comes from multiple independent sources'],
  ['bio-266', 'The central dogma of molecular biology describes information flow'],
  // Q13 specialist framing and the implausible option
  ['bio-252', 'The Golgi apparatus will undergo apoptosis'],
  ['bio-252', 'distinct and non-overlapping functions'],
  ['bio-252', 'I-cell disease (mucolipidosis II), in which enzymes destined for lysosomes'],
  // Q14 over-narrow range
  ['bio-579', 'Correct Answer: 64-72 days'],
  ['bio-579', 'the follicular or luteal phase of the female menstrual cycle'],
  ['bio-579', 'the development time of individual sperm is 64-72 days'],
  // Q15 stem blurring pump with permeability
  ['bio-453', 'primarily maintained by which mechanism'],
  // Q16 C3/C4/CAM
  ['bio-385', 'C3, C4, and CAM plants have different strategies'],
  // Q17 numerical claims
  ['bio-135', 'Over 95% of human multi-exon genes'],
  ['bio-135', '38,000 different mRNA variants'],
  ['bio-135', 'over 100,000 different proteins'],
  ['bio-135', 'It acts after transcription, on the pre-mRNA'],
  ['bio-135', 'all alternatively spliced mRNAs still require a poly-A tail'],
  // Q18 mild sickling, G6PD
  ['bio-293', 'mild sickling that impairs the malaria parasite without causing disease'],
  ['bio-293', 'G6PD deficiency'],
  ['bio-293', 'drive the population toward homozygosity'],
  // Q19 shift = reassortment between subtypes
  ['bio-75', 'Reassortment of genome segments between different influenza subtypes'],
  ['bio-75', 'Viruses are obligate intracellular parasites'],
  ['bio-75', 'Antigenic shift (reassortment) causes pandemics'],
  // Q20 absolutes
  ['bio-330', 'All cells in a multicellular organism contain the same DNA'],
  ['bio-330', 'Every cell in the body (except gametes) receives the same 46 chromosomes'],
  ['bio-330', 'have identical genomes but express very different sets of genes'],
  // Q21 hematocrit as proof of production
  ['bio-542', 'An elevated hematocrit (>54% in males) indicates polycythemia, an increased number of RBCs'],
  // Q22 allostery = cooperativity = multimeric
  ['bio-342', 'Allosteric enzymes typically display which type of kinetics?'],
  ['bio-342', 'Allosteric enzymes possess multiple subunits and exhibit cooperativity'],
  ['bio-342', 'describe simple, single-subunit enzymes'],
  ['bio-342', 'Linear kinetics with constant velocity'],
  ['bio-342', 'activators shift the curve left, inhibitors shift it right'],
  ['bio-342', 'haemoglobin shows the same cooperative behaviour'],
  // Q23 two historical totals, shortening doubling time
  ['bio-620', 'The global human population has grown from approximately 1 billion in 1800'],
  ['bio-620', 'The doubling time shortened dramatically'],
  ['bio-620', 'demographic transition'],
  ['bio-620', '10.4 billion'],
  ['bio-620', 'characterized by an accelerating rate of increase'],
  // Q24 and its twin: all recognition sequences palindromic
  ['bio-141', 'Cut DNA at specific palindromic recognition sequences'],
  ['bio-141', 'The central dogma of molecular biology describes information flow'],
  ['bio-294', 'Cut DNA at specific palindromic recognition sequences'],
  ['bio-294', 'The central dogma of molecular biology describes information flow'],
  // Q25 bone impermeable to diffusion
  ['bio-333', 'mineralised bone is impermeable to diffusion'],
  // Q27 platelets as cells
  ['bio-332', "its 'cells' include erythrocytes, leukocytes, and platelets"],
  // Q29 Monera as current classification
  ['bio-440', '<td>Peptidoglycan</td>'],
  ['bio-440', 'The five-kingdom system classifies life into Monera'],
  // Q30 universal budding, conidia, Coccidioides
  ['bio-591', 'Budding (asexual) primarily'],
  ['bio-591', 'Coccidioides'],
  ['bio-591', 'Remember: "mold in the cold, yeast in the heat" for dimorphic fungi'],
  // Q31 lipophilicity required, "millions of times", filler distractors
  ['bio-86', 'is incorrect for this question'],
  ['bio-86', 'millions of times higher'],
  ['bio-86', 'lipophilicity (accumulation in fatty tissues rather than excretion)'],
  ['bio-86', 'Only about 10% of energy is transferred between trophic levels'],
  // Q32 control group definition
  ['bio-441', 'A proper control group receives no treatment'],
  // Q35 kingdom as most inclusive
  ['bio-616', 'from the most inclusive (Kingdom, containing the most organisms)'],
  ['bio-616', 'it is typically defined as a group of organisms that can interbreed'],
  // Q36 universal start codon
  ['bio-269', 'universal start codon'],
  ['bio-269', 'The central dogma of molecular biology describes information flow'],
  // Q38 unique to angiosperms, off-topic points
  ['bio-113', 'Double fertilization is unique to angiosperms'],
  ['bio-113', 'Plant transport occurs through xylem'],
  ['bio-113', 'endosperm (3n) simultaneously'],
  // Q39 archaeal walls, penicillin/lysozyme same mechanism
  ['bio-254', 'Archaea have pseudopeptidoglycan or S-layer proteins instead'],
  ['bio-254', 'penicillin and lysozyme act on Bacteria but not on Archaea'],
  ['bio-254', 'the target of antibiotics like penicillin and lysozyme'],
  // Q40 anaerobic ATP exclusively glycolytic, Krebs stops
  ['bio-263', 'ATP production in anaerobic conditions comes exclusively from glycolysis'],
  ['bio-263', 'the Krebs cycle slows or stops'],
  ['bio-263', 'The sole purpose of lactate fermentation'],
  ['bio-263', 'its sole purpose is to regenerate'],
  // Q41 ectotherms cannot hold a constant temperature
  ['bio-529', 'cannot generate sufficient internal heat to maintain a constant body temperature'],
  ['bio-529', 'lizards are poikilotherms whose body temperature fluctuates with the environment'],
  ['bio-529', 'regardless of external conditions'],
  // Q42 D2 plant-derived
  ['bio-243', 'Ergocalciferol (D2) is the plant-derived form obtained from diet'],
  ['bio-243', 'is the plant-derived form of vitamin D'],
  ['bio-243', 'Calcidiol is the storage form'],
  // Q43 amphotericin B as bacterial-membrane example
  ['bio-314', 'amphotericin B'],
  ['bio-314', 'Beta-lactams act only on actively growing cells'],
  ['bio-314', 'Bacterial resistance via beta-lactamase enzymes'],
  // Q44 segmental artery omitted from the sequence
  ['bio-212', 'Correct Answer: A) Renal artery → interlobar artery'],
  ['bio-212', 'ADH (from posterior pituitary) increases water reabsorption'],
  // Q45 Pax7 as a canonical MRF
  ['bio-611', 'These are <strong>myogenic regulatory factors (MRFs)</strong>'],
  ['bio-611', 'Thomson factors'],
  // Q46 all cells same genome, cleavage excludes specialization
  ['bio-119', 'All cells in an organism contain the same genome'],
  ['bio-119', 'does not involve cellular specialization'],
  ['bio-119', 'Spermatogenesis produces four functional sperm from each primary spermatocyte'],
  // Q47 claims about all chromosomes / transposons
  ['bio-310', 'The bacterial chromosome alone does not encode the sex pilus'],
  ['bio-310', 'they do not encode the sex pilus'],
  ['bio-310', 'bacterial DNA is accidentally packaged in phage particles, not transferred via a pilus'],
  // Q48 benign / mildest framing, four major species, primaquine
  ['bio-405', 'benign tertian malaria'],
  ['bio-405', 'four major human Plasmodium species'],
  ['bio-405', 'primaquine'],
  ['bio-405', 'It produces the mildest form of malaria'],
  // Q49 inorganic gases, Pasteur, sugars and lipids
  ['bio-319', 'synthesized from inorganic gases'],
  ['bio-319', 'Spontaneous generation was disproven by Pasteur'],
  ['bio-319', 'amino acids, sugars, lipids'],
  ['bio-319', 'an oxidising atmosphere would have destroyed the products'],
  // Q50 sexual reproduction option, filler, "any deviation proves"
  ['bio-95', 'Sexual reproduction'],
  ['bio-95', 'is a different evolutionary concept'],
  ['bio-95', 'any deviation from expected frequencies indicates that one or more evolutionary forces are acting'],
  // Q51 bronchodilation, sodium-selective channel, serotonin mix
  ['bio-173', 'bronchodilation'],
  ['bio-173', 'causing sodium influx and depolarization'],
  ['bio-173', "90% of the body's serotonin"],
  ['bio-173', 'is the sole neurotransmitter for voluntary skeletal muscle activation'],
  // Q53 ALL primates, no cellulose digestion
  ['bio-557', 'none have the specialized cellulose-digesting systems found in ruminants'],
  ['bio-557', 'All primates share forward-facing eyes'],
  ['bio-557', 'grasping hands with opposable digits'],
  // Q54 peripheral nerves via the neural tube, entire nervous system
  ['bio-326', 'the nervous system (brain, spinal cord, peripheral nerves) via the neural tube'],
  ['bio-326', 'the entire nervous system are ectodermal in origin'],
  ['bio-326', '<td>GI tract lining, lungs, liver, pancreas, thyroid</td>'],
  // Q55 ATP synthesis stops, ETC at maximum speed, NAD+ as allosteric regulator
  ['bio-423', 'ATP synthesis stops'],
  ['bio-423', 'the ETC runs at maximum speed'],
  ['bio-423', 'regulated allosterically by ATP, ADP, and NAD+'],
  ['bio-423', 'the therapeutic window is essentially absent'],
  // Q56 normal mother, carrier female
  ['bio-466', 'Affected father × normal mother'],
  ['bio-466', 'carrier female'],
  // Q57 type II far less numerous
  ['bio-331', 'far less numerous'],
  ['bio-331', "filtration in Bowman's capsule of the kidney"],
  // Q58 lambda scope, every gene dormant, no phage cycle
  ['bio-312', 'The phage genes remain dormant'],
  ['bio-312', 'does not accurately describe any phage cycle'],
  ['bio-312', 'In the lysogenic cycle of a bacteriophage, the viral DNA:'],
  ['bio-312', 'The phage genes stay dormant'],
  // Q59 8% of meioses
  ['bio-566', 'occurs in 8% of meioses'],
  ['bio-566', 'Recombination frequency (%) = genetic distance in centiMorgans (cM)'],
  ['bio-566', 'inherited together 92% of the time'],
  // Q60 unconditional first arrival
  ['bio-230', 'are the first phagocytes to arrive'],
  ['bio-230', 'Monocytes/macrophages arrive later and persist longer.</p>'],
  ['bio-230', 'Innate immunity provides rapid, non-specific defense'],
  ['bio-230', '60–70% of circulating white blood cells'],
];

for (const [id, str] of GONE) {
  const q = BY[id], b = before[id];
  if (!q || !b) { ok(false, `${id}: not found for GONE check`); continue; }
  // 3a: the claim must actually have been present before, or the check is vacuous
  ok(text(b).includes(str), `${id}: GONE string was NOT in the before-fixture, so the check proves nothing: "${str.slice(0, 70)}"`);
  // 3b: and it must be gone now
  ok(!text(q).includes(str), `${id}: superseded text still present: "${str.slice(0, 70)}"`);
}

// ===========================================================================
section('4. Replacement content present');

const PRESENT = [
  ['bio-97', 'Gene flow transfers alleles between populations'],
  ['bio-97', 'Drift requires only a finite population, not isolation'],
  ['bio-97', 'fixation (100%) or loss (0%)'],
  ['bio-303', 'completes meiosis I shortly before ovulation'],
  ['bio-303', 'potentially for decades'],
  ['bio-303', 'not the single established explanation'],
  ['bio-298', 'Cyclin E-CDK2 therefore promotes progression from G1 into S phase'],
  ['bio-298', 'inhibitors such as p21 and p27'],
  ['bio-281', 'Assume the two genes assort independently, each shows complete dominance'],
  ['bio-281', 'complete dominance at each gene and no interaction between the two genes'],
  ['bio-625', 'adult terrestrial arthropod'],
  ['bio-625', 'major arthropod group'],
  ['bio-625', '<caption>Typical adult characteristics</caption>'],
  ['bio-625', 'four pairs of walking legs and no antennae'],
  ['bio-323', 'absorbs outgoing infrared radiation'],
  ['bio-323', 'mainly amplifies this warming as a feedback'],
  ['bio-323', 'not a significant direct greenhouse gas'],
  ['bio-450', 'is not another name for the kinetic category'],
  ['bio-450', 'denaturation and irreversible inhibition are not the same thing'],
  ['bio-450', 'Pure noncompetitive inhibition lowers Vmax'],
  ['bio-450', 'the substrate concentration giving half the maximum rate'],
  ['bio-267', 'the 3&prime; end of most pre-mRNAs is cleaved and a poly(A) tail is added'],
  ['bio-267', 'Splicing removes introns and joins exons'],
  ['bio-105', 'Punctuated equilibrium describes a pattern in the fossil record'],
  ['bio-105', 'Genetic assimilation describes a phenotype'],
  ['bio-105', 'It requires ecological opportunity'],
  ['bio-266', 'All four base percentages add up to 100%'],
  ['bio-252', 'In a cell that cannot add these tags'],
  ['bio-252', 'The enzymes are redirected to mitochondria'],
  ['bio-252', 'does not supply a mitochondrial targeting signal'],
  ['bio-252', 'Peroxisomal catalase breaks down hydrogen peroxide'],
  ['bio-579', 'About 2-2.5 months'],
  ['bio-579', 'roughly 64 to 74 days'],
  ['bio-579', 'before further maturation in the epididymis'],
  ['bio-453', 'Which mechanism uses ATP to maintain the sodium and potassium concentration gradients'],
  ['bio-453', 'comes mostly from K⁺ leaving through leak channels'],
  ['bio-385', 'The oxygen released during photosynthesis comes from water'],
  ['bio-135', 'which can take place during or after transcription'],
  ['bio-135', 'spliced as 1-2-3-4 in one cell type'],
  ['bio-293', 'protection against severe malaria and usually do not have sickle cell disease'],
  ['bio-293', 'partial rather than complete immunity'],
  ['bio-75', 'Which mechanism can produce antigenic shift in influenza A viruses?'],
  ['bio-75', 'Reassortment of RNA genome segments when distinct influenza A viruses infect the same cell'],
  ['bio-75', 'Not every reassortment produces one'],
  ['bio-75', 'animal origin begins infecting humans'],
  ['bio-330', 'Most nucleated somatic cells in a person contain essentially the same genome'],
  ['bio-330', 'does not routinely delete unused genes'],
  ['bio-542', 'reduced plasma volume, as in dehydration'],
  ['bio-542', 'Among the listed options, polycythemia best fits an elevated hematocrit'],
  ['bio-342', 'positive substrate cooperativity'],
  ['bio-342', 'Sigmoidal (S-shaped) curve'],
  ['bio-342', 'allosteric without being cooperative'],
  ['bio-342', 'no saturation plateau'],
  ['bio-620', 'increases by 3% each year'],
  ['bio-620', '1,000: after one year there are 1,030'],
  ['bio-620', 'the doubling time is constant'],
  ['bio-141', 'Cut DNA at or near specific recognition sequences'],
  ['bio-141', 'not all recognition sequences are palindromic'],
  ['bio-141', 'reads the same in the 5&prime; to 3&prime; direction on each of the two complementary strands'],
  ['bio-294', 'Cut DNA at or near specific recognition sequences'],
  ['bio-294', 'not all recognition sequences are palindromic'],
  ['bio-333', 'Fluid-filled canaliculi provide routes for diffusion'],
  ['bio-332', 'cell fragments rather than complete cells'],
  ['bio-440', 'Using the traditional five-kingdom classification system'],
  ['bio-440', 'Variable; peptidoglycan in bacteria'],
  ['bio-440', 'Monera is a historical grouping'],
  ['bio-591', 'commonly reproduce by budding'],
  ['bio-591', 'some yeasts divide by fission'],
  ['bio-591', 'not a rule that holds for every dimorphic fungus'],
  ['bio-86', 'retain a contaminant taken in from their food faster than they eliminate it'],
  ['bio-86', 'methylmercury binds strongly to proteins in tissues'],
  ['bio-86', 'Bioaccumulation is the build-up of a substance within a single organism'],
  ['bio-441', 'a no-fertilizer control group provides a useful baseline'],
  ['bio-616', 'Among the ranks listed in the choices, kingdom is the most inclusive'],
  ['bio-616', 'The biological species concept defines it'],
  ['bio-269', 'the usual start codon'],
  ['bio-269', 'does not necessarily start translation'],
  ['bio-269', 'Look the mRNA CODON up in a codon table'],
  ['bio-113', 'characteristic of angiosperms'],
  ['bio-113', 'maternal ovule integuments'],
  ['bio-113', 'in the same reproductive process'],
  ['bio-254', 'Archaeal cell surfaces are variable'],
  ['bio-254', 'Lysozyme, an antibacterial enzyme'],
  ['bio-254', '80S ribosomes in the cytosol'],
  ['bio-263', 'phosphocreatine can also regenerate ATP without oxygen'],
  ['bio-263', 'Aerobic metabolism continues during intense exercise'],
  ['bio-263', 'not proof that oxygen has run out'],
  ['bio-529', 'Homeotherm and poikilotherm describe how stable its body temperature is'],
  ['bio-529', 'An animal is described on both axes separately'],
  ['bio-243', 'previtamin D3'],
  ['bio-243', 'UV-exposed fungi, including mushrooms and yeast'],
  ['bio-243', 'main circulating form, and the one measured'],
  ['bio-314', 'the polymyxins, such as colistin'],
  ['bio-314', 'most effective against actively growing bacteria'],
  ['bio-314', 'one resistance mechanism among several'],
  ['bio-212', 'segmental artery'],
  ['bio-212', 'interlobular (cortical radiate)'],
  ['bio-212', 'Filtrate takes a different route'],
  ['bio-611', 'transcription factors involved in skeletal-muscle development'],
  ['bio-611', 'not one of the canonical myogenic regulatory factors'],
  ['bio-611', 'not equivalent to a totipotent zygote'],
  ['bio-119', 'Most nucleated somatic cells in an organism share essentially the same genome'],
  ['bio-119', 'some specification can begin during this period'],
  ['bio-119', 'Determination commits a cell to a fate'],
  ['bio-310', 'classic F-plasmid conjugation system'],
  ['bio-310', 'Other conjugation systems exist in bacteria'],
  ['bio-310', 'generalized transduction'],
  ['bio-405', 'it can still cause severe illness, so it should not be thought of as harmless'],
  ['bio-405', 'classic patterns rather than something guaranteed in every patient'],
  ['bio-319', 'from simple starting materials'],
  ['bio-319', 'methane is itself an organic compound'],
  ['bio-319', 'not by itself the same thing as a strongly reducing mixture'],
  ['bio-95', 'Which condition violates the assumptions of the standard Hardy-Weinberg equilibrium model?'],
  ['bio-95', 'Migration from a population with different allele frequencies'],
  ['bio-95', 'without by itself changing the frequencies of the alleles p and q'],
  ['bio-95', 'can indicate that one or more assumptions are not met'],
  ['bio-173', 'These receptors are cation channels'],
  ['bio-173', 'Most postganglionic sympathetic neurons use norepinephrine'],
  ['bio-173', 'not universally excitatory'],
  ['bio-557', 'Which combination of features is typical of primates'],
  ['bio-557', 'overlapping visual fields and hands adapted for grasping'],
  ['bio-557', 'colobine monkeys'],
  ['bio-326', 'The neural crest gives rise to much of the peripheral nervous system'],
  ['bio-326', 'most of the dermis is mesodermal'],
  ['bio-326', 'Not every tissue within those organs is endodermal'],
  ['bio-423', 'without passing through ATP synthase'],
  ['bio-423', 'electron transport and oxygen consumption can increase'],
  ['bio-423', 'glycolysis can still make ATP'],
  ['bio-466', 'carrier daughter'],
  ['bio-466', 'mother who is neither affected nor a carrier'],
  ['bio-466', 'assumes an equal chance of a son or a daughter'],
  ['bio-331', 'Type II pneumocytes are more numerous but cover much less surface area'],
  ['bio-331', 'the type II pneumocytes, which secrete surfactant, are cuboidal'],
  ['bio-331', 'cell count and surface coverage are not the same thing'],
  ['bio-312', 'bacteriophage lambda'],
  ['bio-312', 'while some phage genes remain expressed'],
  ['bio-312', 'Active capsid production is not the defining feature'],
  ['bio-312', 'some phages do exactly that'],
  ['bio-566', 'about 92% of gametes from the heterozygote'],
  ['bio-566', 'not the proportion of meioses containing a crossover'],
  ['bio-566', 'two crossovers between the loci can restore a parental combination'],
  ['bio-230', 'most abundant leukocytes in healthy adult blood'],
  ['bio-230', 'recruited FROM THE BLOOD'],
  ['bio-230', 'resident tissue macrophages are already present and can respond immediately'],
  ['bio-230', 'usually early recruits rather than always the first cells on the scene'],
];

for (const [id, str] of PRESENT) {
  const q = BY[id];
  if (!q) { ok(false, `${id}: not found for PRESENT check`); continue; }
  ok(text(q).includes(str), `${id}: replacement text missing: "${str.slice(0, 70)}"`);
}

// ===========================================================================
section('4b. The targeted follow-up pass (Q8, Q17, Q19, Q39, Q44, Q45, Q58)');

// Same discipline as section 3: each "gone" is paired with a check that it was
// present in the first pass, which for this pass means present in the current
// file's history rather than in the before-fixture, so the pairing is done
// against the text the first pass produced, recorded here explicitly.
const FOLLOWUP_GONE = [
  // Q8: ordering implication, and introns "removed from mature mRNA"
  ['bio-267', 'Most mature mRNAs then receive'],
  ['bio-267', 'Introns are removed from mature mRNA by the spliceosome'],
  ['bio-267', 'Only exons are retained and joined together in the final mRNA'],
  // Q17: blanket 3' claim and the alternative-polyadenylation aside
  ['bio-135', 'does nothing to the 3&prime; end'],
  ['bio-135', 'Selecting between alternative polyadenylation sites'],
  ['bio-135', 'a post-transcriptional process that occurs during or after transcription'],
  ['bio-135', 'producing the wrong isoform'],
  // Q19: the last categorical "shift results from segment exchange"
  ['bio-75', 'Antigenic shift is not produced by mutation within one genome: it results from'],
  ['bio-75', 'Shift arises from exchange of whole genome segments'],
  // Q39: "establish only that the organism is a prokaryote"
  ['bio-254', 'establish only that the organism is a prokaryote'],
  ['bio-254', 'only establish that the organism is prokaryotic'],
  ['bio-254', 'show only that the organism is a prokaryote'],
  // Q44: renal artery dividing first into interlobar arteries
  ['bio-212', 'the renal artery first divides into interlobar arteries'],
  // Q58: the old option A and its heading
  ['bio-312', 'Immediately lyses the host cell'],
  ['bio-312', 'even there lysis is not immediate'],
  ['bio-312', '<li>In the lysogenic cycle, phage DNA integrates'],
  // Q45: editorial deletion
  ['bio-611', 'a harder extension rather than the main point of the question'],
];
for (const [id, str] of FOLLOWUP_GONE) {
  ok(!text(BY[id]).includes(str), `${id}: follow-up did not remove: "${str.slice(0, 70)}"`);
}

const FOLLOWUP_PRESENT = [
  ['bio-267', 'During processing, the 3&prime; end of most pre-mRNAs is cleaved and a poly(A) tail is added, supporting mRNA stability and export.'],
  ['bio-267', 'Introns are normally removed from pre-mRNA, and the remaining exons are joined to form mature mRNA.'],
  ['bio-135', 'Alternative splicing determines which RNA segments are retained in the mature mRNA, whereas polyadenylation adds the poly(A) tail.'],
  ['bio-135', 'an RNA-processing step that can occur during or after transcription'],
  ['bio-135', 'as occurs in some forms of beta-thalassemia'],
  ['bio-75', 'The mechanism tested here is reassortment'],
  ['bio-75', 'A frameshift changes a gene&rsquo;s reading frame and usually disrupts the resulting protein.'],
  ['bio-75', 'It does not describe the reassortment of intact RNA genome segments.'],
  ['bio-254', 'Circular chromosomes and 70S ribosomes are common features of prokaryotes, but they do not distinguish Bacteria from Archaea.'],
  ['bio-212', 'The renal artery first divides into segmental arteries, which branch into interlobar arteries that run between the renal pyramids.'],
  ['bio-312', 'Directs production of new phages followed by host-cell lysis'],
  ['bio-312', 'This describes the lytic cycle: phage DNA is replicated, viral components are assembled, and the host cell is then lysed.'],
  ['bio-312', 'In lambda lysogeny, phage DNA integrates into the host chromosome'],
];
for (const [id, str] of FOLLOWUP_PRESENT) {
  ok(text(BY[id]).includes(str), `${id}: follow-up text missing: "${str.slice(0, 70)}"`);
}

// Q39's replacement sentence is the same in all three places it was asked for:
// main explanation, educational points and Bottom Line.
{
  const e = BY['bio-254'].explanation;
  const n = (e.match(/Circular chromosomes and 70S ribosomes are common features of prokaryotes/g) || []).length;
  ok(n === 3, `bio-254: the agreed sentence appears ${n} times, expected 3 (main, points, Bottom Line)`);
}
// Q58's option A is now a true description of the lytic cycle, and still wrong
// for this stem, so the item keeps exactly one defensible answer.
{
  const q = BY['bio-312'];
  ok(q.correct === 1, 'bio-312: key moved off B');
  ok(/lambda/i.test(q.question), 'bio-312: stem no longer names lambda');
  ok(!/Immediately/i.test(q.options.join(' ')), 'bio-312: "immediately" survives in an option');
}
// Q45: the deletion must not have left an empty bullet behind
ok(!/<li>\s*<\/li>/.test(BY['bio-611'].explanation), 'bio-611: empty <li> left by the deletion');
ok((BY['bio-611'].explanation.match(/<li>/g) || []).length === 3,
   'bio-611: expected 3 educational points after deleting the fourth');

// ===========================================================================
section('5. The three substantial rewrites and the Q13 reframe');

// Q22: the question now asks about cooperativity, with four distinct curve shapes
{
  const q = BY['bio-342'];
  ok(/positive substrate cooperativity/.test(q.question), 'bio-342: stem does not state cooperativity');
  ok(q.options[1] === 'Sigmoidal (S-shaped) curve', 'bio-342: option B is not the sigmoidal curve');
  ok(new Set(q.options).size === 4, 'bio-342: options not distinct');
  ok(!/Allosteric enzymes possess multiple subunits/.test(q.explanation), 'bio-342: old equivalence survives');
}
// Q23: a defined model, not two historical totals
{
  const q = BY['bio-620'];
  ok(/3% each year/.test(q.question), 'bio-620: stem does not define the model');
  ok(!/billion/.test(text(q)), 'bio-620: historical population totals survive somewhere');
  ok(q.options[3] === 'Exponential growth with a J-shaped curve', 'bio-620: option D wrong');
}
// Q50: letter C kept, content replaced
{
  const q = BY['bio-95'];
  ok(q.correct === 2, 'bio-95: key is no longer C');
  ok(/Migration/.test(q.options[2]), 'bio-95: option C does not concern migration');
  ok(!/Sexual reproduction/.test(text(q)), 'bio-95: sexual-reproduction option survives');
  ok(/p&sup2;, 2pq and q&sup2;/.test(q.explanation), 'bio-95: genotype frequencies not distinguished from allele frequencies');
}
// Q13: mechanism supplied in the stem, disease demoted to an example
{
  const q = BY['bio-252'];
  ok(/Mannose-6-phosphate tags normally help direct/.test(q.question), 'bio-252: mechanism not in the stem');
  ok(!/I-cell disease/.test(q.question), 'bio-252: stem still requires the disease name');
  ok(/I-cell disease \(mucolipidosis II\) is a named example/.test(q.explanation), 'bio-252: disease not retained as an example');
}

// ===========================================================================
section('6. Items the review said to keep, and everything else, unchanged');

for (const id of KEEP) {
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `${id}: KEEP item was modified`);
}
// the two near-duplicates that were NOT the matched record must also be untouched
for (const id of ['bio-513', 'bio-583']) {
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `${id}: unmatched near-duplicate was modified`);
}
// bio-285 is the item bio-95 now closely resembles. Review batch 6 has since
// edited bio-285 (its Q21), so it is that batch's test's responsibility and was
// handed off out of this batch's untouched fixture.
ok(untouched.biology['bio-285'] === undefined, 'bio-285 should have been handed off to the batch 6 fixture');
// bio-366 was a KEEP item here; review batch 7 (its Q23) has since corrected it
ok(JSON.stringify(BY['bio-366']) !== JSON.stringify(before['bio-366']), 'bio-366: expected the batch 7 corrections');
ok(untouched.biology['bio-366'] === undefined, 'bio-366 should have been handed off to the batch 7 fixture');

let drifted = 0;
for (const q of data.biology) {
  if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drifted++; console.error('  FAIL biology ' + q.id + ' changed but was not in scope'); }
}
checks++; if (drifted) failures++;
ok(drifted === 0, `${drifted} out-of-scope biology items changed`);

let chemDrift = 0;
for (const q of data.chemistry) {
  if (untouched.chemistry[q.id] !== hash(q)) { chemDrift++; console.error('  FAIL chemistry ' + q.id + ' changed'); }
}
ok(chemDrift === 0, `${chemDrift} chemistry items changed; this review touches biology only`);
// This sweep covers the items no reviewed batch owns. When a later batch is
// approved, its ids are removed from this fixture and become that batch's
// test's responsibility, so the two sweeps partition the bank rather than
// overlapping. Batch 3 took 60 ids (bio-62..bio-128 minus batch 2's seven),
// batch 4 took 59 and batch 5 took 59 new ones (its 60th, bio-216, was
// already in this batch's own fixture as a KEEP item).
ok(Object.keys(untouched.biology).length === 63, 'untouched biology hash count unexpected');
// 63 unowned + 60 (batch 3) + 59 (batch 4) + 59 (batch 5) + 60 (batch 6)
// + 59 (batch 7; its 60th, bio-366, was already in this batch's own fixture as
// a KEEP item) + 60 (batch 8) + 60 (batch 9) + 60 (batch 10) + 26 (batch 11)
// + the 63 in this batch's own fixture = 629
ok(Object.keys(untouched.biology).length + 60 + 59 + 59 + 60 + 59 + 60 + 60 + 60 + 26 + Object.keys(before).length === 629,
   `fixtures do not partition the biology bank: ${Object.keys(untouched.biology).length} + 60 (batch 3) + 59 (batch 4) + 59 (batch 5) + 60 (batch 6) + 59 (batch 7) + 60 (batch 8) + 60 (batch 9) + 60 (batch 10) + 26 (batch 11) + ${Object.keys(before).length}`);

// ===========================================================================
section('7. Internal consistency of every edited item');

const BANNED = [
  'is a different evolutionary concept',
  'is incorrect for this question',
  'refers to a different ecological concept',
  'important for exam success',
  'CORRECTION',
  'TEACHING.',
  'OPTIONAL',
  'the review',
  'reviewer',
];

for (const id of EDITED) {
  const q = BY[id];
  if (!q) continue;
  const blob = text(q);

  // no em dash anywhere in student-facing copy (house style)
  ok(!blob.includes('—'), `${id}: em dash in student-facing text`);

  // no reviewer/meta language leaked into the explanation
  for (const bad of BANNED) ok(!blob.includes(bad), `${id}: reviewer or filler language present: "${bad}"`);

  // balanced tags for every paired tag we use
  for (const tag of ['p', 'ul', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'h4', 'caption', 'sub', 'sup', 'i']) {
    const open = (q.explanation.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
    const close = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    ok(open === close, `${id}: <${tag}> unbalanced (${open} open, ${close} close)`);
  }

  // every table row must have the same cell count as its header row
  const tables = q.explanation.match(/<table[\s\S]*?<\/table>/g) || [];
  for (const t of tables) {
    const rows = t.match(/<tr>[\s\S]*?<\/tr>/g) || [];
    if (!rows.length) continue;
    const width = (rows[0].match(/<t[hd]>/g) || []).length;
    for (const r of rows) {
      const n = (r.match(/<t[hd]>/g) || []).length;
      ok(n === width, `${id}: ragged table row (${n} cells, header has ${width})`);
    }
  }

  // the "Correct Answer:" heading must name the keyed option, not another one
  const head = (q.explanation.match(/<h4>Correct Answer:([^<]*)<\/h4>/) || [])[1];
  if (head) {
    const keyed = q.options[q.correct].replace(/<[^>]*>/g, '').trim();
    const norm = s => s.replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/[^a-z0-9]/gi, '').toLowerCase();
    ok(norm(head).includes(norm(keyed)) || norm(keyed).includes(norm(head).replace(/^[a-d]\)?/, '')),
       `${id}: answer heading "${head.trim().slice(0, 60)}" does not name keyed option "${keyed.slice(0, 60)}"`);
  }

  // Each non-keyed option should have a distractor heading that agrees with it.
  // Many headings shorten the option ("D. Increasing activation energy" for
  // "Increasing the activation energy of the reaction"), which is fine. What is
  // not fine is a heading that says something the option does not: the whole
  // point of renaming an option is that its explanation gets renamed too. So
  // the heading's words must appear in the option, in order, as a subsequence.
  const words = s => s.replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/[^a-z0-9% ]/gi, ' ')
    .trim().toLowerCase().split(/\s+/).filter(Boolean);
  const isSubsequence = (small, big) => {
    let j = 0;
    for (const w of small) {
      while (j < big.length && big[j] !== w) j++;
      if (j === big.length) return false;
      j++;
    }
    return true;
  };
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const label = q.options[i].replace(/<[^>]*>/g, '');
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ([^<]*?):?</strong>'));
    if (!m) continue;                 // some items head distractors differently
    const shown = m[1];
    ok(isSubsequence(words(shown), words(label)),
       `${id}: option ${LETTER[i]} is "${label.slice(0, 50)}" but its explanation is headed "${shown.slice(0, 50)}"`);
  }
}

// ===========================================================================
section('8. Educational points address the question they sit under');

// the three generic blocks the review asked to replace, wherever they appear
// in an edited item
const FILLER = [
  'The central dogma of molecular biology describes information flow',
  'Natural selection acts on phenotypic variation within populations',
  'Evidence for evolution comes from multiple independent sources',
  'Energy flows one way through ecosystems',
  'Plant transport occurs through xylem',
  'Innate immunity provides rapid, non-specific defense',
  'The nervous system is divided into the CNS',
  'Human embryonic development proceeds through cleavage',
  'Viruses are obligate intracellular parasites',
];
for (const id of EDITED) {
  const q = BY[id];
  if (!q) continue;
  for (const f of FILLER) ok(!q.explanation.includes(f), `${id}: cross-topic educational point survives: "${f}"`);
}

// and every edited item should still carry a takeaway or a points list
for (const id of EDITED) {
  const q = BY[id];
  if (!q) continue;
  ok(/exp-key|Key Educational Points/.test(q.explanation), `${id}: no educational points and no takeaway`);
}

// ===========================================================================
console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
