/**
 * Verifies the RESULT of the batch 3 biology review in questions.json.
 *
 *   node test/bio-review-batch3.test.js
 *
 * Checks the live file against:
 *   test/fixtures/bio-review-batch3-before.json     the 60 items as they were
 *   test/fixtures/bio-review-batch3-untouched.json  hashes of everything else
 *
 * Every "superseded claim is gone" check is paired with a check that the claim
 * really was in the before-fixture, so a typo in a GONE string fails loudly
 * instead of passing vacuously.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';

const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch3-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch3-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch3-idmap.json'), 'utf8'));

const BY = Object.fromEntries(data.biology.map(q => [q.id, q]));
const MAP = idmap.map;
const IDS = Object.values(MAP);

let checks = 0, failures = 0;
function ok(cond, msg) { checks++; if (!cond) { failures++; console.error('  FAIL ' + msg); } }
function section(name) { console.log('\n' + name); }
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const qnum = id => Object.keys(MAP).find(n => MAP[n] === id);

const KEYS = {
  1: 'C', 2: 'C', 3: 'B', 4: 'A', 5: 'C', 6: 'D', 7: 'C', 8: 'A', 9: 'A', 10: 'B',
  11: 'D', 12: 'D', 13: 'D', 14: 'D', 15: 'C', 16: 'C', 17: 'D', 18: 'A', 19: 'B', 20: 'B',
  21: 'D', 22: 'D', 23: 'B', 24: 'B', 25: 'D', 26: 'C', 27: 'D', 28: 'B', 29: 'B', 30: 'D',
  31: 'A', 32: 'B', 33: 'D', 34: 'C', 35: 'B', 36: 'A', 37: 'A', 38: 'D', 39: 'C', 40: 'C',
  41: 'A', 42: 'C', 43: 'C', 44: 'C', 45: 'C', 46: 'A', 47: 'C', 48: 'A', 49: 'A', 50: 'C',
  51: 'B', 52: 'B', 53: 'C', 54: 'A', 55: 'A', 56: 'A', 57: 'C', 58: 'B', 59: 'A', 60: 'B',
};

// ===========================================================================
section('1. Structure and scope');

ok(data.biology.length === 629, `biology count is ${data.biology.length}, expected 629`);
ok(data.chemistry.length === 485, `chemistry count is ${data.chemistry.length}, expected 485`);
ok(IDS.length === 60, `idmap has ${IDS.length} entries, expected 60`);
ok(new Set(IDS).size === 60, 'idmap contains a duplicate id');
for (const [n, id] of Object.entries(MAP)) ok(!!BY[id], `Q${n}: ${id} missing from questions.json`);
// the pack is bio-62..bio-128 minus the seven already reviewed in batch 2
for (const id of idmap.skipped_already_reviewed) ok(!IDS.includes(id), `${id} should have been skipped: it was reviewed in batch 2`);
for (const q of data.biology) {
  ok(Array.isArray(q.options) && q.options.length === 4, `${q.id}: not 4 options`);
  ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3, `${q.id}: bad correct index`);
}

// ===========================================================================
section('2. Answer keys unchanged');

for (const [n, id] of Object.entries(MAP)) {
  const q = BY[id];
  if (!q) continue;
  ok(LETTER[q.correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[q.correct]}, review asserts ${KEYS[n]}`);
  ok(q.correct === before[id].correct, `Q${n} (${id}): correct index changed from the before-fixture`);
}

// ===========================================================================
section('3. The six reused generic educational-point blocks are gone');

// Opening sentence of each of the six blocks the review identified.
const GENERIC_OPENERS = [
  'Bacteria are prokaryotes lacking membrane-bound organelles',
  'Viruses are obligate intracellular parasites consisting of nucleic acid',
  'Energy flows one way through ecosystems',
  'Natural selection acts on phenotypic variation within populations',
  'Plants alternate between haploid (gametophyte) and diploid (sporophyte) generations',
  'Human embryonic development proceeds through cleavage, gastrulation',
];
// each opener must have been present somewhere in the before-fixture, or the
// sweep below proves nothing
for (const opener of GENERIC_OPENERS) {
  const wasThere = IDS.filter(id => before[id].explanation.includes(opener)).length;
  ok(wasThere > 0, `generic opener was never in the before-fixture, so this check is vacuous: "${opener}"`);
}
for (const id of IDS) {
  for (const opener of GENERIC_OPENERS) {
    ok(!BY[id].explanation.includes(opener), `Q${qnum(id)} (${id}): generic educational block survives: "${opener.slice(0, 50)}"`);
  }
}
// the two factual errors the review flagged inside those blocks
for (const id of IDS) {
  ok(!BY[id].explanation.includes('the rest is lost as heat through cellular respiration'),
     `Q${qnum(id)} (${id}): "rest is lost as heat" survives`);
  ok(!BY[id].explanation.includes('lysogenic cycle (genome integration as prophage with delayed lysis)'),
     `Q${qnum(id)} (${id}): lysogeny-as-delayed-lysis survives`);
}

// ===========================================================================
section('4. Placeholder distractor feedback is gone');

const PLACEHOLDERS = [
  'is incorrect for this question',
  'is a different evolutionary concept',
  'refers to a different ecological concept',
  'important for exam success',
  'which specifically matches the definition or concept described in the question stem',
];
for (const p of PLACEHOLDERS) {
  const wasThere = IDS.filter(id => before[id].explanation.includes(p)).length;
  ok(wasThere > 0, `placeholder phrase was never in the before-fixture: "${p}"`);
}
for (const id of IDS) {
  for (const p of PLACEHOLDERS) {
    ok(!BY[id].explanation.includes(p), `Q${qnum(id)} (${id}): placeholder feedback survives: "${p}"`);
  }
}

// Q21 must now have feedback for A, B and C (it had only C before).
{
  const e = BY['bio-83'].explanation;
  for (const L of ['A', 'B', 'C']) ok(new RegExp('<strong>' + L + '\\.').test(e), `Q21 (bio-83): no feedback for option ${L}`);
  ok(!before['bio-83'].explanation.includes('<strong>A.'), 'Q21: before-fixture already had A feedback, check is vacuous');
}
// Q50's three distractor explanations must now be distinct from each other.
{
  const e = BY['bio-117'].explanation;
  const paras = [...e.matchAll(/<strong>([A-D])\.[^<]*<\/strong>([^]*?)<\/p>/g)].map(m => m[2].trim());
  ok(paras.length >= 3, `Q50 (bio-117): only ${paras.length} distractor paragraphs found`);
  ok(new Set(paras).size === paras.length, 'Q50 (bio-117): two distractor explanations are identical');
  ok(before['bio-117'].explanation.split('It generally antagonizes the growth-promoting effects of gibberellins and auxins.').length - 1 >= 2,
     'Q50: before-fixture did not actually contain the duplicated sentence, check is vacuous');
}
// no item anywhere in the pack may have two identical distractor paragraphs
for (const id of IDS) {
  const paras = [...BY[id].explanation.matchAll(/<strong>([A-D])\.[^<]*<\/strong>([^]*?)<\/p>/g)].map(m => m[2].trim()).filter(t => t.length > 20);
  ok(new Set(paras).size === paras.length, `Q${qnum(id)} (${id}): duplicated distractor explanation text`);
}

// ===========================================================================
section('5. Superseded claims removed (each paired with a before-check)');

const GONE = [
  ['bio-62', 'they are susceptible to beta-lactam antibiotics'],
  ['bio-62', 'peptidoglycan-like components'],
  ['bio-62', 'Mycoplasma is the smallest free-living bacterium'],
  ['bio-63', 'stains ALL bacteria purple'],
  ['bio-63', 'Safranin does not affect Gram-positive bacteria'],
  ['bio-64', 'which is released upon bacterial lysis'],
  ['bio-64', 'vaccine adjuvant'],
  ['bio-66', 'Direct transfer via pilus (F plasmid)'],
  ['bio-68', 'Phage infection triggers the bacterial SOS response'],
  ['bio-69', 'It lacks the enzymes catalase and superoxide dismutase'],
  ['bio-69', 'Neither'],
  ['bio-69', 'determines a bacterium'],
  ['bio-70', 'flagella are not the primary adhesion structures'],
  ['bio-71', 'Enzymatic destruction of antibiotics'],
  ['bio-72', 'Conjugation requires the F plasmid (fertility factor) in the donor cell'],
  ['bio-72', 'the only horizontal gene transfer mechanism'],
  ['bio-73', 'Which component of the HIV virion is the target'],
  ['bio-73', 'enzyme class known as protease inhibitors'],
  ['bio-74', 'host cells do not possess RNA-dependent RNA polymerase'],
  ['bio-76', 'They are exclusively associated with mammals'],
  ['bio-76', 'Prions challenge the central dogma'],
  ['bio-77', 'Direct translation of viral DNA into coat proteins would occur'],
  ['bio-77', 'persist silently in the host'],
  ['bio-78', 'the clinically used drugs for influenza virus release are neuraminidase inhibitors'],
  ['bio-78', 'clinically used anti-influenza drugs target neuraminidase'],
  ['bio-79', 'two identical copies of single-stranded positive-sense RNA'],
  ['bio-79', 'are unique in possessing reverse transcriptase'],
  ['bio-80', 'Phages do not acquire envelopes because bacteria lack the membrane systems'],
  ['bio-80', 'Myoviridae'],
  ['bio-81', 'Class III (dsRNA)'],
  ['bio-81', 'They replicate in the nucleus using host or viral DNA polymerases'],
  ['bio-82', 'insertion of this proviral DNA'],
  ['bio-83', 'The remaining 90% is lost as heat'],
  ['bio-83', 'energy pyramids are always upright'],
  ['bio-84', 'making it the slowest of the major nutrient cycles'],
  ['bio-85', 'Secondary producer'],
  ['bio-87', 'preventing competitive exclusion; their loss causes cascading effects'],
  ['bio-88', 'can take hundreds to thousands of years to reach a climax community'],
  ['bio-89', 'Two species competing for the same limited resource cannot stably coexist'],
  ['bio-89', 'sympatric species evolve to exploit different resources'],
  ['bio-90', 'Lightning can also fix small amounts of nitrogen abiotically'],
  ['bio-90', 'irreversibly inhibited by oxygen'],
  ['bio-91', 'algal blooms that block light to submerged vegetation'],
  ['bio-93', 'river courses change as a result'],
  ['bio-93', 'Bottom-up regulation'],
  ['bio-94', 'Tertiary productivity'],
  ['bio-94', 'NPP = GPP − Respiration'],
  ['bio-98', 'Convergent structures</em> is a different'],
  ['bio-100', 'unrelated species that occupy similar environments'],
  ['bio-100', 'divergent evolution produces homologous structures'],
  ['bio-101', 'provides the raw material for natural selection'],
  ['bio-102', 'non-random sample of the original gene pool'],
  ['bio-103', 'occurs after mating has taken place'],
  ['bio-104', 'which molecule is most commonly used as a molecular clock'],
  ['bio-104', 'rRNA genes are ideal molecular clocks'],
  ['bio-107', 'making it the opposite of auxin in function'],
  ['bio-107', 'loosening cellulose microfibrils'],
  ['bio-108', '<td>High</td>'],
  ['bio-108', 'much higher affinity for CO₂ than RuBisCO'],
  ['bio-109', 'forming continuous tubes'],
  ['bio-109', 'root pressure, and capillary action'],
  ['bio-110', 'about 3 CO₂ molecules per second'],
  ['bio-110', 'G<sub>3</sub>P'],
  ['bio-111', 'is the only gaseous plant hormone'],
  ['bio-111', 'produced primarily in root tips'],
  ['bio-112', 'a band of suberin'],
  ['bio-114', 'Osmotic pressure gradient created by sugar loading'],
  ['bio-114', 'ATP-dependent H+/sucrose cotransporters'],
  ['bio-115', 'Photoperiodism in plants, such as flowering in response to day length'],
  ['bio-115', 'the ratio at dawn determines whether a plant flowers'],
  ['bio-116', 'reversed membrane orientation'],
  ['bio-116', 'the plasma membrane or its invaginations do house photosynthetic machinery'],
  ['bio-117', 'It generally antagonizes the growth-promoting effects'],
  ['bio-118', 'Ectoderm forms the outer structures (skin)'],
  ['bio-120', 'fourth germ layer'],
  ['bio-120', 'hematopoietic stem cells in the bone marrow'],
  ['bio-121', 'up to the 8-cell stage in humans'],
  ['bio-121', 'Multipotent cells are restricted to a single lineage'],
  ['bio-122', 'Specify the anterior-posterior body axis and identity of body segments'],
  ['bio-123', 'The placenta and extraembryonic membranes'],
  ['bio-123', 'the yolk sac in mammals is a vestigial structure'.replace('the', 'The')],
  ['bio-124', 'Apoptosis plays its developmental role later'],
  ['bio-124', 'Apoptosis is not pathological'],
  ['bio-125', 'avoids the ethical concerns'],
  ['bio-125', 'Fusing an enucleated egg cell with a somatic cell nucleus'],
  ['bio-126', 'particularly Sonic hedgehog, Shh, and noggin/chordin) that induce'],
  ['bio-127', 'Slow divisions with extended G1 and G2 phases'],
  ['bio-127', 'This phase continues until the mid-blastula transition.'],
  ['bio-128', "5' position of cytosine"],
  ['bio-128', 'Silences gene expression by promoting chromatin condensation'],
];

for (const [id, str] of GONE) {
  const q = BY[id], b = before[id];
  if (!q || !b) { ok(false, `${id}: not found for GONE check`); continue; }
  ok(text(b).includes(str), `${id}: GONE string was NOT in the before-fixture, so the check proves nothing: "${str.slice(0, 70)}"`);
  ok(!text(q).includes(str), `${id}: superseded text still present: "${str.slice(0, 70)}"`);
}

// ===========================================================================
section('6. Replacement content present');

const PRESENT = [
  ['bio-62', 'beta-lactams are not effective treatment for tickborne rickettsial diseases'],
  ['bio-62', 'dividing pathogenic chlamydiae produce a limited peptidoglycan ring'],
  ['bio-62', 'no cell-wall target to inhibit'],
  ['bio-63', 'Both Gram-positive and Gram-negative bacteria initially take up the crystal-violet stain'],
  ['bio-63', 'the darker crystal violet they have retained masks it'],
  ['bio-64', 'lipid A is its principal toxic component'],
  ['bio-64', 'outer-membrane vesicles, so lysis is not required'],
  ['bio-65', 'new cells are produced at roughly the rate at which cells die'],
  ['bio-66', 'this is generalized transduction'],
  ['bio-66', 'one example rather than the universal mechanism'],
  ['bio-67', 'Rifamycins are not protein-synthesis inhibitors at all'],
  ['bio-68', 'Phage infection does not generally trigger sporulation'],
  ['bio-69', 'Oxidative damage and inactivation of oxygen-sensitive metabolic enzymes'],
  ['bio-69', 'some have catalase, superoxide dismutase, or other defences'],
  ['bio-69', 'not by a universal absence of catalase and superoxide dismutase'],
  ['bio-70', 'short, hair-like surface appendages'],
  ['bio-70', 'Biofilm growth can increase antibiotic tolerance without requiring acquired resistance genes'],
  ['bio-71', 'Enzymatic inactivation of the drug is one of four major resistance mechanisms'],
  ['bio-72', 'classic F⁺ to F⁻ conjugation system'],
  ['bio-72', 'does not have to carry a free F plasmid'],
  ['bio-73', 'A drug inhibits HIV protease'],
  ['bio-73', 'Cleavage of viral polyprotein precursors into functional proteins'],
  ['bio-73', 'the polyproteins are that enzyme&rsquo;s substrate'],
  ['bio-74', 'the human cell does not supply the polymerase'],
  ['bio-76', 'templated protein misfolding without a nucleic-acid genome'],
  ['bio-76', 'A requirement for a bacterial host describes bacteriophages'],
  ['bio-77', 'DNA is never translated directly'],
  ['bio-77', 'not every phage gene is silent'],
  ['bio-78', 'assembly and budding at the membrane still occur'],
  ['bio-79', 'need not be identical to each other'],
  ['bio-79', 'not a reversal that invalidates the central dogma'],
  ['bio-80', 'enveloped phages do exist'],
  ['bio-80', 'contractile-tailed phages'],
  ['bio-81', 'Selected Baltimore groups'],
  ['bio-81', 'poxviruses replicate in the cytoplasm'],
  ['bio-82', 'once it is integrated it is called a provirus'],
  ['bio-83', 'rule of thumb rather than a fixed efficiency'],
  ['bio-83', 'pyramids of standing biomass or of numbers can be inverted'],
  ['bio-84', 'N₂ makes up about 78% of the atmosphere'],
  ['bio-85', 'secretes digestive enzymes onto dead organic matter'],
  ['bio-85', 'Primary producer (autotroph)'],
  ['bio-87', 'out of proportion to its abundance'],
  ['bio-88', 'not the compulsory first organisms in every case'],
  ['bio-89', 'Two species occupying the same ecological niche cannot coexist indefinitely'],
  ['bio-89', 'does not establish that two species have identical niches'],
  ['bio-90', 'Plants do not perform the nitrogenase reaction themselves'],
  ['bio-91', 'not a compulsory step in every one'],
  ['bio-92', 'mirror image of the relationship described in the stem'],
  ['bio-93', 'riverside trees recover'],
  ['bio-93', 'Bottom-up control'],
  ['bio-94', 'Gross primary productivity (GPP)'],
  ['bio-94', 'R<sub>a</sub>'],
  ['bio-96', 'persists even if the populations later come back into contact'],
  ['bio-98', 'Analogous structures acquire a similar function independently'],
  ['bio-99', 'The heterozygote term carries a factor of 2'],
  ['bio-100', 'distantly related species'],
  ['bio-100', 'the forelimb bones underneath them are homologous'],
  ['bio-101', 'ultimate source of new alleles'],
  ['bio-101', 'They arise regardless of need'],
  ['bio-102', 'survival was unrelated to the alleles being considered'],
  ['bio-102', 'The sampling is random; it is the <em>result</em> that is unrepresentative'],
  ['bio-103', 'acts after fertilization'],
  ['bio-103', 'some prezygotic barriers act after mating but before fertilization'],
  ['bio-104', 'calibrated using independent timing evidence'],
  ['bio-104', 'estimate with uncertainty rather than an exact date'],
  ['bio-106', 'Water is split at photosystem II, by the oxygen-evolving complex'],
  ['bio-106', 'PSII acts before PSI in linear electron flow'],
  ['bio-107', 'not simply the opposite of auxin'],
  ['bio-108', 'C4 plants such as maize'],
  ['bio-108', 'PEP carboxylase uses bicarbonate'],
  ['bio-109', 'water passes between tracheids through pits'],
  ['bio-109', 'xylem tissue as a whole also contains living cells'],
  ['bio-110', 'Glyceraldehyde-3-phosphate (G3P)'],
  ['bio-110', 'immediate stable products'],
  ['bio-111', 'gaseous hormone among the classical plant hormones'],
  ['bio-111', 'can become autocatalytic'],
  ['bio-112', 'localized lignified band'],
  ['bio-112', 'blocks apoplastic bypass'],
  ['bio-114', 'A hydrostatic pressure gradient generated by sugar loading'],
  ['bio-114', 'the cotransporter itself does not hydrolyse ATP'],
  ['bio-115', 'red-light pulse during the night'],
  ['bio-115', 'Cryptochromes detect blue and UV-A light'],
  ['bio-116', 'intermembrane-space side and return to the matrix'],
  ['bio-117', 'water follows by osmosis'],
  ['bio-118', 'the epiblast during gastrulation'],
  ['bio-120', 'cranial sensory placodes contribute neurons'],
  ['bio-121', 'embryo-derived supporting tissues, including trophoblast'],
  ['bio-121', 'maternal component, which no embryonic cell produces'],
  ['bio-122', 'Specify regional identity along the anterior-posterior body axis'],
  ['bio-122', 'they do not by themselves establish the axis'],
  ['bio-123', 'contributes the trophoblast component of the chorion and of the fetal placenta'],
  ['bio-123', 'it is not merely vestigial'],
  ['bio-124', 'normal and essential part of development'],
  ['bio-124', 'Monozygotic twinning involves separation of one early embryo'],
  ['bio-125', 'does not require deriving the cells from an embryo'],
  ['bio-125', 'Transferring a somatic-cell nucleus into an enucleated egg'],
  ['bio-126', 'BMP antagonists such as noggin and chordin'],
  ['bio-126', 'patterning the ventral part of the neural tube'],
  ['bio-127', 'Cell divisions accompanied by substantial growth'],
  ['bio-127', 'features of frog and some other animal embryos'],
  ['bio-128', 'carbon 5 of the cytosine base'],
  ['bio-128', 'Reduces transcription by promoting a less accessible chromatin state'],
  ['bio-128', 'within the body of a gene, does not carry the same meaning'],
];

for (const [id, str] of PRESENT) {
  ok(text(BY[id]).includes(str), `${id}: replacement text missing: "${str.slice(0, 70)}"`);
}

// ===========================================================================
section('6b. The targeted correction pass (16 items)');

// Paired as elsewhere: each "gone" names text the FIRST batch-3 pass produced,
// recorded here explicitly so a stale string cannot pass vacuously.
const FOLLOWUP_GONE = [
  ['bio-64', 'Endotoxin specifically refers to the lipid A component'],
  ['bio-70', 'property of the community rather than inherited resistance'],
  ['bio-72', 'has nothing to do with conjugation'],
  ['bio-72', 'Conjugation specifically requires the F plasmid'],
  ['bio-72', 'Conjugation is a plasmid-mediated, pilus-dependent process'],
  ['bio-74', 'its genome can be read as mRNA as soon as it enters the cell'],
  ['bio-76', 'consisting solely of a misfolded form of the prion protein'],
  ['bio-76', 'inducing normal PrPᶜ proteins to refold'],
  ['bio-77', 'which is how lysogenic conversion can give the bacterium new properties'],
  ['bio-79', 'Orthomyxoviridae'],
  ['bio-79', 'reassortment (antigenic shift)'],
  ['bio-79', 'reversing the central dogma'],
  ['bio-82', 'inserting the proviral DNA into the host cell chromosome'],
  ['bio-82', 'inserting proviral DNA into the host genome is integrase'],
  ['bio-85', 'Like all consumers it ingests its food'],
  ['bio-85', 'Again it ingests its food'],
  ['bio-88', 'where no soil or organisms previously existed'],
  ['bio-88', 'is far slower than secondary succession'],
  ['bio-88', 'a surface that has never been colonized before'],
  ['bio-88', 'where soil and seed banks remain'],
  ['bio-108', 'Fixing CO₂ only at night with stomata open describes CAM'],
  ['bio-114', 'a completely different mechanism based on osmotic pressure gradients'],
  ['bio-121', 'trophoblast that forms the fetal part of the placenta'],
  ['bio-123', 'A) The trophoblast component of the chorion and fetal placenta'],
  ['bio-126', 'rather than becoming a structure itself'],
  ['bio-127', 'A) Rapid mitotic divisions that increase cell number'],
];
for (const [id, str] of FOLLOWUP_GONE) {
  ok(!text(BY[id]).includes(str), `${id}: correction pass did not remove: "${str.slice(0, 70)}"`);
}

const FOLLOWUP_PRESENT = [
  ['bio-64', 'Endotoxin is the lipopolysaccharide (LPS) of the Gram-negative outer membrane; lipid A is its principal toxic component.'],
  ['bio-70', 'Bacteria within a biofilm may also possess genetic antibiotic resistance'],
  ['bio-72', 'It does not supply the transfer machinery in this F-mediated system'],
  ['bio-72', 'mobile chromosomal elements can mediate conjugative transfer'],
  ['bio-72', 'A prophage is phage DNA maintained in a bacterial host'],
  ['bio-74', 'Baltimore class IV positive-sense RNA virus, such as poliovirus'],
  ['bio-76', 'infectious, self-propagating protein conformations with no nucleic-acid genome'],
  ['bio-76', 'In mammalian prion diseases the protein concerned is the prion protein'],
  ['bio-77', 'Some other temperate phages carry expressed genes that give bacteria new properties, such as toxin production.'],
  ['bio-79', 'influenza viruses, rotaviruses and hantaviruses'],
  ['bio-79', 'The segmented influenza genome allows reassortment.'],
  ['bio-79', 'Influenza, for example, also uses the nucleus'],
  ['bio-82', 'inserting the viral DNA into the host cell chromosome'],
  ['bio-82', 'once inserted, that DNA is called a provirus'],
  ['bio-85', 'A tertiary consumer feeds on secondary consumers; this is a trophic position'],
  ['bio-88', 'The defining feature is the absence of developed soil'],
  ['bio-88', 'is often slower than secondary succession'],
  ['bio-88', 'on a newly formed or exposed surface with no developed soil'],
  ['bio-88', 'Seeds, roots or other surviving organisms may also remain'],
  ['bio-108', 'CAM plants generally take up atmospheric CO₂ at night and store the carbon in organic acids'],
  ['bio-108', 'the carbon fixation is not confined to the night'],
  ['bio-114', 'Phloem sap moves by bulk flow down a hydrostatic pressure gradient'],
  ['bio-121', 'trophoblast that contributes to the fetal part of the placenta'],
  ['bio-123', 'A) The chorion and fetal portion of the placenta'],
  ['bio-126', 'during human embryonic development'],
  ['bio-126', 'axial mesodermal structure that helps organize surrounding tissues through signalling'],
  ['bio-127', 'A) Successive mitotic divisions that increase cell number'],
];

// Q55's option A must no longer give the answer away by naming the trophoblast
// that the stem asks about.
ok(!/trophoblast/i.test(BY['bio-123'].options[0]),
   'Q55 (bio-123): option A still names the trophoblast the stem asks about');
// Q59's keyed option must not reintroduce "rapid" as a defining requirement,
// while option B legitimately keeps it as part of a wrong description.
ok(!/^Rapid/.test(BY['bio-127'].options[0]), 'Q59 (bio-127): keyed option starts with "Rapid" again');
ok(/^Rapid/.test(BY['bio-127'].options[1]), 'Q59 (bio-127): option B unexpectedly changed');
for (const [id, str] of FOLLOWUP_PRESENT) {
  ok(text(BY[id]).includes(str), `${id}: correction-pass text missing: "${str.slice(0, 70)}"`);
}

// Q14: PrP must now appear only as the mammalian example, never as the
// definition of what a prion is.
{
  const e = BY['bio-76'].explanation;
  const defSentence = e.slice(e.indexOf('<p>'), e.indexOf('</p>'));
  ok(!/PrP/.test(defSentence), 'Q14 (bio-76): the opening definition still names PrP');
  ok(/PrP<sup>Sc<\/sup>/.test(e) && /PrP<sup>C<\/sup>/.test(e), 'Q14 (bio-76): PrP forms not written with proper superscripts');
}
// Q20: "provirus" must appear only after integration, never in the stem.
ok(!/provir/i.test(BY['bio-82'].question), 'Q20 (bio-82): the stem still says proviral');

// ===========================================================================
section('7. The five substantial rewrites');

// Q8: obligate anaerobes no longer defined by two enzymes
{
  const q = BY['bio-69'];
  ok(/grows only when oxygen is excluded/.test(q.question), 'Q8: stem not rewritten');
  ok(q.options[0] === 'Oxidative damage and inactivation of oxygen-sensitive metabolic enzymes', 'Q8: option A wrong');
  ok(!/catalase and superoxide dismutase/.test(q.options.join(' ')), 'Q8: enzyme pair survives in an option');
  ok(!/<th>Key Enzymes<\/th>/.test(q.explanation), 'Q8: the catalase/SOD classification table survives');
}
// Q12: protease inhibitors target the enzyme
{
  const q = BY['bio-73'];
  ok(/A drug inhibits HIV protease/.test(q.question), 'Q12: stem not rewritten');
  ok(q.correct === 3 && /Cleavage of viral polyprotein/.test(q.options[3]), 'Q12: option D wrong');
  ok(new Set(q.options).size === 4, 'Q12: options not distinct');
}
// Q30: hypothetical scenario, no Yellowstone river-course claim
{
  const q = BY['bio-93'];
  ok(/riverside trees recover/.test(q.question), 'Q30: stem not rewritten');
  ok(!/Yellowstone/.test(text(q)), 'Q30: Yellowstone causal claim survives');
  ok(q.options[2] === 'Bottom-up control', 'Q30: option C wrong');
}
// Q39: the clock needs a calibrated rate
{
  const q = BY['bio-104'];
  ok(/what information is needed/.test(q.question), 'Q39: stem not rewritten');
  ok(q.correct === 2 && /calibrated/.test(q.options[2]), 'Q39: option C wrong');
  ok(!/most commonly used/.test(text(q)), 'Q39: "most commonly used" survives');
}
// Q48: red/far-red reversibility, so A is uniquely correct
{
  const q = BY['bio-115'];
  ok(/far-red/.test(q.question), 'Q48: stem not rewritten');
  ok(q.correct === 0 && q.options[0] === 'Phytochrome', 'Q48: option A wrong');
  ok(/Cryptochromes detect blue and UV-A light, and they do influence flowering/.test(q.explanation),
     'Q48: cryptochrome still dismissed categorically');
}

// Q53 had all four options renamed, so they must stay parallel. The generic
// heading rule cannot see this: "A. Multipotent cells:" is still a valid
// abbreviation of "Multipotent stem cells", so only an explicit shape check
// catches one option drifting back to the old phrasing.
{
  const q = BY['bio-121'];
  ok(q.options.every(o => /^(Multi|Pluri|Toti|Uni)potent cells$/.test(o)),
     `Q53 (bio-121): potency options are not phrased consistently: ${JSON.stringify(q.options)}`);
}

// ===========================================================================
section('8. Nothing outside the pack changed');

let drifted = 0;
for (const q of data.biology) {
  if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drifted++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
}
ok(drifted === 0, `${drifted} out-of-scope biology items changed`);
let chemDrift = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] !== hash(q)) chemDrift++;
ok(chemDrift === 0, `${chemDrift} chemistry items changed; this review touches biology only`);
// Batches 4, 5, 6 and 7 have each taken 60 of these ids, so 569 - 240. Each
// approved batch hands its ids to that batch's own test, so the sweeps
// partition the bank.
ok(Object.keys(untouched.biology).length === 209, 'untouched biology hash count unexpected');
// the seven batch-2 items that were skipped must be byte-identical
for (const id of idmap.skipped_already_reviewed) {
  ok(untouched.biology[id] === hash(BY[id]), `${id}: a previously approved item was modified`);
}

// ===========================================================================
section('9. Internal consistency of every item in the pack');

const words = s => s.replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/[^a-z0-9% ]/gi, ' ').trim().toLowerCase().split(/\s+/).filter(Boolean);
const isSubsequence = (small, big) => {
  let j = 0;
  for (const w of small) { while (j < big.length && big[j] !== w) j++; if (j === big.length) return false; j++; }
  return true;
};

for (const id of IDS) {
  const q = BY[id];
  const n = qnum(id);
  const blob = text(q);

  ok(!blob.includes('—'), `Q${n} (${id}): em dash in student-facing text`);
  ok(new Set(q.options).size === 4, `Q${n} (${id}): duplicate option text`);

  for (const tag of ['p', 'ul', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'h4', 'caption', 'sub', 'sup', 'i']) {
    const open = (q.explanation.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
    const close = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    ok(open === close, `Q${n} (${id}): <${tag}> unbalanced (${open}/${close})`);
  }

  for (const t of q.explanation.match(/<table[\s\S]*?<\/table>/g) || []) {
    const rows = t.match(/<tr>[\s\S]*?<\/tr>/g) || [];
    if (!rows.length) continue;
    const w = (rows[0].match(/<t[hd]>/g) || []).length;
    for (const r of rows) ok((r.match(/<t[hd]>/g) || []).length === w, `Q${n} (${id}): ragged table row`);
  }

  // answer heading must name the keyed option
  const head = (q.explanation.match(/<h4>Correct Answer:([^<]*)<\/h4>/) || [])[1];
  if (head) {
    const keyed = q.options[q.correct].replace(/<[^>]*>/g, '').trim();
    const norm = s => s.replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/[^a-z0-9]/gi, '').toLowerCase();
    ok(norm(head).includes(norm(keyed)) || norm(keyed).includes(norm(head).replace(/^[a-d]/, '')),
       `Q${n} (${id}): answer heading "${head.trim().slice(0, 55)}" does not name keyed option "${keyed.slice(0, 55)}"`);
  }

  // a distractor heading may abbreviate its option but must not contradict it
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ([^<]*?):?</strong>'));
    if (!m) continue;
    ok(isSubsequence(words(m[1]), words(q.options[i].replace(/<[^>]*>/g, ''))),
       `Q${n} (${id}): option ${LETTER[i]} is "${q.options[i].slice(0, 45)}" but headed "${m[1].slice(0, 45)}"`);
  }

  // every item keeps an educational-points list, sized as the review asked
  const ulMatch = q.explanation.match(/Key Educational Points:<\/h4>\s*<ul>([^]*?)<\/ul>/);
  ok(!!ulMatch, `Q${n} (${id}): no Key Educational Points list`);
  if (ulMatch) {
    const count = (ulMatch[1].match(/<li>/g) || []).length;
    ok(count >= 2 && count <= 5, `Q${n} (${id}): ${count} educational points, expected 2 to 5`);
  }
  ok(/<li>/.test(q.explanation), `Q${n} (${id}): no list items at all`);
}

// ===========================================================================
console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
