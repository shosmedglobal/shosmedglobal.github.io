/**
 * Verifies the result of biology review batch 11 against the review's own
 * requirements, independently of the script that applied it.
 *
 *   node test/bio-review-batch11.test.js
 *
 * Batch 11 covered 26 questions supplied as TWO exports whose display
 * numbering restarts (File A: A1-A5; File B: B1-B21). The exports carried no
 * bank ids, so section 1 re-derives the id map from stems and options rather
 * than trusting it.
 *
 * Every "claim removed" assertion is paired with a check that the claim really
 * was in the before-fixture, so a typo cannot make an assertion pass vacuously.
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
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch11-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch11-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch11-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/bio-batch11-edits-a.js'),
  require('../scripts/bio-batch11-edits-b.js'),
  require('../scripts/bio-batch11-edits-c.js'),
  require('../scripts/bio-batch11-edits-d.js'),
  require('../scripts/bio-batch11-edits-e.js')
);

const BY = Object.fromEntries(data.biology.map(q => [q.id, q]));
const MAP = idmap.map;
const IDS = Object.values(MAP);
const PACK = new Set(IDS);
const KEEP = new Set(idmap.keep_unchanged_per_review);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const disp = id => Object.keys(MAP).find(n => MAP[n] === id);
const strip = s => s.replace(/<[^>]*>/g, '').replace(/&#8209;/g, '-').replace(/\s+/g, ' ').trim();
const words = s => strip(s).toLowerCase().replace(/[^a-z0-9%+\-−→ ]+/g, ' ').trim().split(/\s+/).filter(Boolean);
const pointCount = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>/g) || []).length : 0;
};

// ===========================================================================
section('1. The id map, re-derived from stems and options');

// The two exports numbered independently, so the map is the one thing that
// must not be taken on trust. Each item is pinned by a signature drawn from
// its stem and option texts; the signature must match exactly one bank record.
// Signatures use only wording this batch did NOT change, so they still hold.
const SIGNATURES = {
  A1: ['Phycocyanin and phycoerythrin', 'Chlorophyll b and carotenoids', 'Bacteriochlorophyll and rhodopsin'],
  A2: ['glutamic acid to valine', 'Primary structure', 'Quaternary structure'],
  A3: ['BOTH prokaryotic and eukaryotic', 'Membrane-bound nucleus', 'Linear chromosomes with histone proteins'],
  A4: ['ovulation is triggered by a surge', 'Luteinizing hormone (LH)', 'Follicle-stimulating hormone (FSH)'],
  A5: ['8 cM', '42%', '16%', '50%'],
  B1: ['periorbital edema', 'wild boar', 'Trichinella spiralis', 'Dracunculus medinensis'],
  B2: ['Culex - Japanese encephalitis', 'Anopheles - yellow fever', 'Aedes - malaria'],
  B3: ['erythema migrans', 'Rickettsia rickettsii', 'Francisella tularensis'],
  B4: ['epidemic typhus', 'Pediculus humanus corporis', 'Chrysops'],
  B5: ['Heterocysts', 'Akinetes', 'Hormogonia', 'Baeocytes'],
  B6: ['The Great Oxidation Event', 'The Late Heavy Bombardment', 'The Cambrian Explosion'],
  B7: ['Induced pluripotent stem cells (iPSCs)', 'Mesenchymal stem cells (MSCs)', 'transcription factors'],
  B8: ['bone marrow transplant from a matched donor', 'Multipotent', 'Unipotent'],
  B9: ["Koch's postulates", 'susceptible to at least one antibiotic', 'grown in pure culture'],
  B10: ['Photo 51', 'Rosalind Franklin', 'Erwin Chargaff', 'Barbara McClintock'],
  B11: ['father of genetics', 'Pisum sativum', 'Caenorhabditis elegans'],
  B12: ['three-domain', 'ribosomal RNA (rRNA) gene sequences', 'Comparison of cell wall composition'],
  B13: ['Felis catus', 'species epithet', 'binomial nomenclature'],
  B14: ['Brundtland', 'selective logging with replanting', 'Converting all wetlands'],
  B15: ['Habitat destruction and fragmentation', 'Ozone layer depletion', 'Invasive alien species introduction'],
  B16: ['Ethology', 'Animal behavior under natural conditions'],
  B17: ['dicotyledonous', 'Tap root system and reticulate', 'Scattered vascular bundles in the stem'],
  B18: ['cetaceans', 'Dolphin and whale', 'Sea lion and walrus'],
  B19: ['strobilation', 'transverse segmentation', 'ephyrae'],
  B20: ['Ames test', 'mutagenic potential of chemical compounds using bacteria', 'Teratogenic effects'],
  B21: ['aquaporin-2', 'Antidiuretic hormone (ADH/vasopressin)', 'Parathyroid hormone (PTH)']
};

ok(Object.keys(MAP).length === 26, `the id map holds ${Object.keys(MAP).length} items, expected 26`);
ok(Object.keys(SIGNATURES).length === 26, `${Object.keys(SIGNATURES).length} signatures, expected 26`);
ok(new Set(IDS).size === 26, 'the id map repeats an id');
ok(Object.keys(MAP).filter(n => n[0] === 'A').length === 5, 'File A should contribute 5 items');
ok(Object.keys(MAP).filter(n => n[0] === 'B').length === 21, 'File B should contribute 21 items');

for (const [n, sig] of Object.entries(SIGNATURES)) {
  const matches = data.biology.filter(r => {
    const b = strip(r.question) + ' || ' + r.options.map(strip).join(' | ');
    return sig.every(t => b.includes(t));
  });
  ok(matches.length === 1 && matches[0].id === MAP[n],
    `${n}: signature matched ${matches.length} record(s) [${matches.map(m => m.id).join(',')}], expected only ${MAP[n]}`);
}

// the review's asserted key letters and tallies
const aKeys = ['A1', 'A2', 'A3', 'A4', 'A5'].map(n => LETTER[BY[MAP[n]].correct]).join('');
const bKeys = Array.from({ length: 21 }, (_, i) => LETTER[BY[MAP['B' + (i + 1)]].correct]).join('');
ok(aKeys === idmap.asserted_letters_file_a, `File A keys are ${aKeys}, the review asserts ${idmap.asserted_letters_file_a}`);
ok(bKeys === idmap.asserted_letters_file_b, `File B keys are ${bKeys}, the review asserts ${idmap.asserted_letters_file_b}`);
const tally = s => ({ A: (s.match(/A/g) || []).length, B: (s.match(/B/g) || []).length, C: (s.match(/C/g) || []).length, D: (s.match(/D/g) || []).length });
const ta = tally(aKeys), tb = tally(bKeys);
ok(ta.A === 2 && ta.B === 1 && ta.C === 2 && ta.D === 0, `File A tally ${JSON.stringify(ta)}, the review says A=2 B=1 C=2 D=0`);
ok(tb.A === 4 && tb.B === 5 && tb.C === 7 && tb.D === 5, `File B tally ${JSON.stringify(tb)}, the review says A=4 B=5 C=7 D=5`);

// every key is unchanged from the before-fixture
for (const id of IDS) ok(BY[id].correct === before[id].correct, `${id} (${disp(id)}): the answer letter moved`);

// ===========================================================================
section('2. Scope: what changed and what did not');

ok(data.biology.length === 629, `biology holds ${data.biology.length} questions, expected 629`);
ok(data.chemistry.length === 485, `chemistry holds ${data.chemistry.length} questions, expected 485`);

const changed = IDS.filter(id => text(BY[id]) !== text(before[id]));
ok(changed.length === 23, `${changed.length} of the 26 items changed, the review asked for 23`);
ok(EDITS.length === 23, `${EDITS.length} edit specs, expected 23`);

// the three KEEP items are byte-identical
ok(KEEP.size === 3, `${KEEP.size} KEEP ids, expected 3`);
for (const id of KEEP) {
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]), `${id} (${disp(id)}): on the KEEP list but changed`);
  ok(!changed.includes(id), `${id} (${disp(id)}): KEEP item appears in the changed set`);
}
// and every other pack item did change
for (const id of IDS) {
  if (KEEP.has(id)) continue;
  ok(changed.includes(id), `${id} (${disp(id)}): should have been edited but is unchanged`);
}

// the stem and option inventories
const stemsNow = IDS.filter(id => BY[id].question !== before[id].question).map(disp).sort();
ok(stemsNow.join(',') === idmap.stem_replacements.slice().sort().join(','),
  `stems changed in ${stemsNow.join(',')}; the review lists ${idmap.stem_replacements.join(',')}`);
ok(stemsNow.length === 10, `${stemsNow.length} stems changed, the review says 10`);

const optsNow = [];
for (const id of IDS) {
  for (let i = 0; i < 4; i++) if (BY[id].options[i] !== before[id].options[i]) optsNow.push(`${disp(id)} ${LETTER[i]}`);
}
const optsWant = [];
for (const [n, letters] of Object.entries(idmap.option_renames)) for (const L of letters) optsWant.push(`${n} ${L}`);
ok(optsNow.slice().sort().join(',') === optsWant.slice().sort().join(','),
  `options changed: ${optsNow.join(', ')}; the review lists ${optsWant.join(', ')}`);
ok(optsNow.length === 7, `${optsNow.length} option texts changed, the review says 7`);
ok(new Set(optsNow.map(s => s.split(' ')[0])).size === 3,
  'the option changes should fall in exactly 3 questions');

// ===========================================================================
section('3. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) {
  if (PACK.has(q.id)) continue;
  if (untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL ' + q.id + ' changed but is outside the pack'); }
}
checks++; if (drift) failures++;

const nBio = Object.keys(untouched.biology).length;
const nChem = Object.keys(untouched.chemistry).length;
ok(nBio === 603, `${nBio} untouched biology hashes, expected 603`);
// Chemistry review batch 1 owns 58 chemistry ids (chem-1..chem-18,
// chem-20..chem-36, chem-38..chem-60), so this sweep covers the 248 chemistry
// items no reviewed chemistry batch owns; those 58 are checked by
// test/chem-review-batch1.test.js.
ok(nChem === 128, `${nChem} untouched chemistry hashes, expected 128`);
ok(nBio + 26 === 629, 'the untouched biology set plus the 26 pack ids should account for all 629');
ok(nBio + nChem + 26 + 58 + 60 + 59 + 60 + 60 + 60 === 629 + 485,
  'the untouched set, this pack and chemistry batches 1, 2 and 3 should partition the whole bank');
for (const id of IDS) ok(!(id in untouched.biology), `${id} is both in the pack and in the untouched set`);

// chemistry is wholly untouched
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] && untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry questions changed; this pass must not touch chemistry`);

// ===========================================================================
section('4. Claims the review asked to remove, and their replacements');

// [id, removed claim, replacement text that must be present]
const REPAIRS = [
  // --- File A
  ['bio-608', 'unique accessory pigments', 'light-harvesting pigment-protein complexes called'],
  ['bio-608', 'orange-red spectrum (500-650 nm)', 'wavelengths absorbed relatively poorly by chlorophyll a'],
  ['bio-608', 'not a true photosynthetic pigment', 'retinal-containing light-sensitive proteins'],
  ['bio-608', 'which only have chlorophyll a', 'Some cyanobacteria contain chlorophyll b'],
  ['bio-608', 'Neither is found in cyanobacteria', 'some occur in cyanobacteria'],
  ['bio-608', 'the only prokaryotes that perform oxygenic photosynthesis', 'these structures are not unique to cyanobacteria'],
  ['bio-277', 'which then cascades to affect higher-order folding', 'favors abnormal contacts between hemoglobin molecules'],
  ['bio-277', 'may be altered as a downstream consequence', 'it does not automatically disrupt these local patterns'],
  ['bio-277', 'is dramatically affected in sickle cell disease', 'HbS fibers arise from abnormal association of hemoglobin tetramers'],
  ['bio-277', 'primary structure determines all higher levels', 'without grossly disrupting every level of folding'],
  ['bio-253', 'Plasma membrane composed of a phospholipid bilayer', 'A plasma membrane surrounding the cell'],
  ['bio-253', 'Circular, no histones', 'DNA-packaging proteins vary'],
  ['bio-253', '80S (cytoplasm), 70S (mitochondria/chloroplasts)', 'are not all the same size'],
  ['bio-253', 'histone-like proteins (HU, IHF) but not true histones', 'Many archaea have histones'],
  ['bio-253', 'This is a universal feature of all cells', 'some archaea have membranes formed by a lipid monolayer'],
  ['bio-462', 'mature Graafian follicle', 'the timing varies between people and cycles'],
  ['bio-462', 'switches hypothalamic feedback from negative to positive', 'positive feedback on the hypothalamus and anterior pituitary'],
  ['bio-282', '1 cM corresponds to 1% recombinant gametes', 'corresponds to approximately'],
  ['bio-282', 'the two combinations the dihybrid parent inherited', 'the stem explicitly gives the phase as AB/ab'],
  ['bio-282', 'The maximum observable recombination frequency is 50%', 'does not exceed 50%'],
  ['bio-282', 'recombination frequency can never exceed 50%', 'behave as unlinked in a two-locus testcross'],

  // --- File B
  ['bio-603', 'The classic triad is', 'are characteristic clues'],
  ['bio-603', 'they do not encyst in skeletal muscle fibers', 'liver, lungs, eyes and skeletal muscle'],
  ['bio-603', 'The transmission is from soil/feces, not undercooked meat', 'infected meat or offal can also transmit larvae'],
  ['bio-603', 'Guinea worm disease is nearly eradicated globally', 'not transmitted through meat.</p>'],
  ['bio-603', 'freezing kills most', 'freezing wild game is not a reliable way to kill'],
  ['bio-603', 'has no free-living stage', 'completes its life cycle within mammalian hosts'],
  ['bio-604', 'breed in stagnant, polluted water', 'rural rice-growing areas'],
  ['bio-604', 'Night-biter, breeds in polluted water', 'habitats include rice fields and other standing water'],
  ['bio-604', 'Malaria is exclusively transmitted by', 'the vectors responsible for mosquito-borne human malaria'],
  ['bio-604', 'live attenuated 17D vaccine', 'Haemagogus'],
  ['bio-605', 'The disease progresses through three stages', 'do not have to occur in a fixed sequence'],
  ['bio-605', 'Erythema migrans is pathognomonic for Lyme disease', 'need not have a classic bull'],
  ['bio-605', 'doxycycline (adults), amoxicillin (children/pregnant)', 'promptly removing attached ticks'],
  ['bio-605', 'Borrelia burgdorferi</h4>', 'sensu lato (species complex)'],
  ['bio-606', 'associated with rats, not human overcrowding', 'flea-borne murine typhus'],
  ['bio-606', 'Hymenolepis diminuta', 'different infections and vectors'],
  ['bio-606', 'not associated with any', 'not the established vector of epidemic typhus'],
  ['bio-607', 'Lacking Photosystem II', 'Suppressing oxygen-producing Photosystem II activity'],
  ['bio-607', 'microplasmodesmata', 'septal junctions'],
  ['bio-607', '16 ATP', 'requires substantial ATP and reducing power'],
  ['bio-607', 'anaerobic environment', 'low-oxygen interior'],
  ['bio-609', 'the first organisms to perform', 'Oxygenic photosynthesis evolved before this transition'],
  ['bio-609', 'formed by cyanobacterial mats', 'their shape alone does not identify the organisms'],
  ['bio-609', 'catastrophic for most existing anaerobic life', 'disadvantaged oxygen-sensitive organisms'],
  ['bio-609', 'anoxic (reducing)', 'oxygen production and atmospheric accumulation are different milestones'],
  ['bio-609', '96% of marine species', 'massive volcanism and major environmental disruption'],
  ['bio-610', 'genetically identical to an adult patient', "retain the donor's genetic background"],
  ['bio-610', 'differentiate into virtually any cell type', 'derivatives of all three embryonic germ layers'],
  ['bio-610', 'avoiding the ethical concerns associated with embryo destruction', 'without deriving cells from an embryo'],
  ['bio-610', 'c-Myc is a proto-oncogene, which is why', 'residual undifferentiated pluripotent cells'],
  ['bio-612', 'multiple related cell types within a single lineage', 'several related cell types within the blood-forming system'],
  ['bio-612', 'up to the 8-cell stage (morula) are totipotent', 'The zygote is the classic example'],
  ['bio-613', '(1884) are:', 'The classical formulation of'],
  ['bio-613', 'some cannot be cultured in vitro', 'specialized in-vitro co-culture'],
  ['bio-614', 'without Franklin', 'her doctoral student'],
  ['bio-614', 'not awarded posthumously', 'did not share that award'],
  ['bio-614', 'established the complementary base pairing principle', 'compositional evidence, not Photo 51'],
  ['bio-617', 'three-domain system in 1977', 'formally proposed the three-domain classification'],
  ['bio-617', 'as different from each other as either is from Eukarya', 'does not mean that all three groups are equally related'],
  ['bio-617', 'molecular clock of evolution', 'modern evolutionary analyses also use many genes and whole genomes'],
  ['bio-617', 'unique coenzymes for methanogenesis', 'characteristic of certain archaea, not all archaea'],
  ['bio-619', 'exemplifies sustainable development because it allows', 'Replanting alone does not guarantee sustainability'],
  ['bio-619', 'Clear-cutting destroys the entire forest ecosystem', 'Some cleared forests can regenerate'],
  ['bio-619', 'at or below the natural recharge rate', 'connected rivers, wetlands and water quality'],
  ['bio-619', 'overexploited when individuals act in self-interest', 'not matched by effective collective management'],
  ['bio-621', 'single greatest driver of biodiversity loss', "greatest overall negative impact on terrestrial and freshwater"],
  ['bio-621', 'second or third greatest', 'relative importance varies with the organisms'],
  ['bio-621', 'HIPPO', 'IPBES identifies five major direct drivers'],
  ['bio-621', 'Habitat destruction is the #1 cause', 'direct exploitation has led in marine systems'],
  ['bio-623', 'are characterized by having', 'individual traits have exceptions'],
  ['bio-623', '<th>Dicots</th>', 'Typical dicot/eudicot pattern'],
  ['bio-623', 'Usually present</td><td>Usually absent', 'Present in many, especially woody species'],
  ['bio-623', 'enables secondary growth and the formation of wood', 'a ring arrangement alone does not mean'],
  ['bio-623', '(true dicots)', 'the terms are not exact synonyms'],
  ['bio-624', 'fully aquatic marine mammals', 'some dolphins inhabit rivers'],
  ['bio-624', 'suborder Pinnipedia', 'belonging to the order Carnivora'],
  ['bio-624', 'two main suborders', 'two main groups'],
  ['bio-624', 'never leave the water', 'complete their life cycles in the water'],
  ['bio-624', 'order Artiodactyla (even-toed ungulates)', 'Artiodactyla or Cetartiodactyla'],
  ['bio-626', 'in Scyphozoa (true jellyfish) where', 'such as <em>Aurelia</em>'],
  ['bio-626', 'occurs in the <strong>medusa</strong> stage, not the polyp stage', 'corals, can produce gametes in the polyp stage'],
  ['bio-626', 'do not revert to polyps under normal conditions', 'not a medusa changing back into a polyp'],
  ['bio-627', 'More revertant colonies = stronger mutagenic potential', 'compared with appropriate'],
  ['bio-627', 'liver microsome fraction', 'liver-derived enzyme preparation'],
  ['bio-627', '90% of known carcinogens', 'a negative result does not establish safety'],
  ['bio-627', 'pregnant rodents or rabbits', 'developmental-toxicity approaches'],
  ['bio-629', 'in the distal convoluted tubule only', 'aldosterone-sensitive distal nephron'],
  ['bio-629', 'exclusively in the proximal tubule', 'calcium reabsorption in the distal nephron'],
  ['bio-629', 'technically not part of the nephron', 'help determine the final water content of urine'],
  ['bio-629', 'remains impermeable to water', 'reduced kidney responsiveness to ADH'],
  ['bio-629', '20 liters per day', 'excessive loss of dilute urine'],
  ['bio-629', 'glomerulus and afferent arteriole', 'including in collecting ducts']
];

ok(REPAIRS.length >= 85, `${REPAIRS.length} repair checks, expected at least 85`);
for (const [id, gone, present] of REPAIRS) {
  const was = text(before[id]);
  const now = text(BY[id]);
  // non-vacuity: the claim must really have been there before
  ok(was.includes(gone), `${id} (${disp(id)}): "${gone.slice(0, 60)}" was not in the before-fixture, so removing it proves nothing`);
  ok(!now.includes(gone), `${id} (${disp(id)}): superseded claim survives: ${gone.slice(0, 60)}`);
  ok(now.includes(present), `${id} (${disp(id)}): replacement text missing: ${present.slice(0, 60)}`);
}

// ===========================================================================
section('5. The two major rewrites');

ok(idmap.major_rewrites.join(',') === 'A3,B21', `major rewrites listed as ${idmap.major_rewrites.join(',')}, expected A3,B21`);

// A3 bio-253: the keyed option is a plasma membrane, not a universal bilayer
ok(BY['bio-253'].options[2] === 'A plasma membrane surrounding the cell', 'bio-253 (A3): option C text');
ok(BY['bio-253'].options[1] === '70S ribosomes free in the cytosol', 'bio-253 (A3): option B text');
ok(BY['bio-253'].explanation.includes('<h4>Correct Answer: A plasma membrane surrounding the cell</h4>'),
  'bio-253 (A3): the correct-answer heading must match option C in full');
ok(/lipid monolayer rather than a bilayer/.test(BY['bio-253'].explanation),
  'bio-253 (A3): the archaeal monolayer qualification is missing');
ok(!/phospholipid bilayer/i.test(BY['bio-253'].options.join(' ')),
  'bio-253 (A3): no option should still assert a universal phospholipid bilayer');
ok((BY['bio-253'].explanation.match(/<tr>/g) || []).length === 5,
  'bio-253 (A3): the replacement table should have a header row plus four feature rows');
ok(/Prokaryotes include both Bacteria and Archaea/.test(BY['bio-253'].explanation),
  'bio-253 (A3): the Bacteria-and-Archaea caution is missing');
ok(/cytosol/.test(BY['bio-253'].options[1]) && /cytosol/.test(BY['bio-253'].explanation),
  'bio-253 (A3): the review asked for "cytosol" rather than "cytoplasm" in the ribosome option');

// B21 bio-629: parallel hormone-name options, no "only/exclusively" crutches
const o629 = BY['bio-629'].options;
ok(o629[0] === 'Aldosterone', 'bio-629 (B21): option A');
ok(o629[1] === 'Atrial natriuretic peptide (ANP)', 'bio-629 (B21): option B');
ok(o629[2] === 'Antidiuretic hormone (ADH/vasopressin)', 'bio-629 (B21): option C');
ok(o629[3] === 'Parathyroid hormone (PTH)', 'bio-629 (B21): option D');
ok(BY['bio-629'].explanation.includes('<h4>Correct Answer: Antidiuretic hormone (ADH/vasopressin)</h4>'),
  'bio-629 (B21): the correct-answer heading must match option C in full');
for (const o of o629) ok(!/\bonly\b|\bexclusively\b/i.test(o), `bio-629 (B21): option "${o}" still leans on an absolute`);
ok(o629.every(o => o.length < 45), 'bio-629 (B21): the options should be short parallel hormone names');
ok(/V2 receptors/.test(BY['bio-629'].explanation), 'bio-629 (B21): the V2-receptor mechanism is missing');
ok(/the channels do not actively pump water/.test(BY['bio-629'].explanation),
  'bio-629 (B21): the clarification that AQP2 does not pump water is missing');
ok(/deficiency or reduced kidney responsiveness/.test(BY['bio-629'].explanation),
  'bio-629 (B21): diabetes insipidus should cover deficiency and resistance');
ok(/aquaporin-2/.test(BY['bio-629'].question), 'bio-629 (B21): the new stem should name aquaporin-2');

// ===========================================================================
section('6. Presentation the review told us to preserve');

// point counts, exactly as the review's inventory states them
for (const [n, want] of Object.entries(idmap.point_counts)) {
  const id = MAP[n];
  ok(pointCount(BY[id].explanation) === want,
    `${id} (${n}): ${pointCount(BY[id].explanation)} educational points, the review says ${want}`);
}
ok(pointCount(BY[MAP.A4].explanation) === 0 && !/Key Educational Points/.test(BY[MAP.A4].explanation),
  'bio-462 (A4): must continue to have no educational-point block');

// one Bottom Line each
for (const id of IDS) {
  const n = (BY[id].explanation.match(/class='exp-key'>Bottom Line:/g) || []).length;
  ok(n === 1, `${id} (${disp(id)}): ${n} Bottom Lines, expected exactly 1`);
}

// the four tables, and no others
const withTable = IDS.filter(id => /<table/.test(BY[id].explanation)).map(disp).sort();
ok(withTable.join(',') === idmap.tables.slice().sort().join(','),
  `tables found in ${withTable.join(',')}; the review says ${idmap.tables.join(',')}`);
ok(withTable.length === 4, `${withTable.length} tables, the review says 4`);
ok(!/<table/.test(BY[MAP.B20].explanation), 'bio-627 (B20): the review explicitly forbids creating a table here');
// B13's table is untouched, B17's keeps its six feature rows
ok(JSON.stringify(BY[MAP.B13]) === JSON.stringify(before[MAP.B13]), 'bio-618 (B13): its table must be untouched');
ok((BY[MAP.B17].explanation.match(/<tr>/g) || []).length === 7,
  'bio-623 (B17): expected a header row plus six feature rows');
for (const id of IDS) {
  const o = (BY[id].explanation.match(/<table/g) || []).length;
  const c = (BY[id].explanation.match(/<\/table>/g) || []).length;
  ok(o === c, `${id} (${disp(id)}): ${o} table opens, ${c} closes`);
}

// ===========================================================================
section('7. Stems, options and headings stay in sync');

// Documented paraphrase exemptions: a distractor heading may abbreviate its
// option where the full text would be unwieldy. Earlier batches needed several.
// Batch 11 needs none: every heading's words appear in its option, including
// A4's "D. FSH" (whose option spells out "Follicle-stimulating hormone (FSH)")
// and B14's C and D headings, which this pass extended to the full option text.
// The mechanism is kept so that an exemption can never be added silently.
const PARAPHRASED = {};
let paraphrased = 0;
for (const id of IDS) {
  const q = BY[id];
  // keyed option must equal its heading in full
  const esc = q.options[q.correct].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  ok(new RegExp('<h4>Correct Answer: (?:' + LETTER[q.correct] + '\\. )?' + esc + '</h4>').test(q.explanation),
    `${id} (${disp(id)}): the correct-answer heading does not equal option ${LETTER[q.correct]} in full`);

  // each distractor heading's words must all appear in its option
  for (let i = 0; i < q.options.length; i++) {
    if (i === q.correct) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ([^<]*?):?</strong>'));
    ok(m, `${id} (${disp(id)}): no heading found for distractor ${LETTER[i]}`);
    if (!m) continue;
    const headWords = words(m[1]);
    const optWords = new Set(words(q.options[i]));
    const missing = headWords.filter(w => !optWords.has(w));
    const key = `${id}:${i}`;
    if (missing.length && PARAPHRASED[key]) { paraphrased++; continue; }
    ok(missing.length === 0,
      `${id} (${disp(id)}) option ${LETTER[i]}: heading words not in the option: ${missing.join(', ')}`);
  }
}
ok(paraphrased === Object.keys(PARAPHRASED).length,
  `${paraphrased} paraphrase exemptions were used, ${Object.keys(PARAPHRASED).length} are documented`);

// every renamed option agrees with its heading, checked explicitly
for (const spec of EDITS) {
  for (const [i, t] of spec.optionFull || []) {
    ok(BY[spec.id].options[i] === t, `${spec.q} (${spec.id}): option ${LETTER[i]} does not match the supplied text`);
    if (i === BY[spec.id].correct) {
      ok(BY[spec.id].explanation.includes('<h4>Correct Answer: ' + t + '</h4>'),
        `${spec.q} (${spec.id}): renamed keyed option is out of step with its answer heading`);
    } else {
      ok(BY[spec.id].explanation.includes('<strong>' + LETTER[i] + '. ' + t + ':</strong>'),
        `${spec.q} (${spec.id}): renamed option ${LETTER[i]} is out of step with its distractor heading`);
    }
  }
  if (spec.stemFull) ok(BY[spec.id].question === spec.stemFull, `${spec.q} (${spec.id}): stem does not match the supplied text`);
}

// ===========================================================================
section('8. One complete, distinct feedback section per distractor');

for (const id of IDS) {
  const q = BY[id];
  for (let i = 0; i < q.options.length; i++) {
    if (i === q.correct) continue;
    const n = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
    ok(n === 1, `${id} (${disp(id)}): ${n} "${LETTER[i]}. ..." headings, expected 1`);
  }
  // distractor paragraphs must be distinct from one another and from the main text
  const paras = [...q.explanation.matchAll(/<p><strong>[A-D]\. [^<]*?:?<\/strong>([\s\S]*?)<\/p>/g)].map(m => strip(m[1]));
  ok(paras.length === 3, `${id} (${disp(id)}): found ${paras.length} distractor paragraphs, expected 3`);
  ok(new Set(paras).size === paras.length, `${id} (${disp(id)}): two distractor paragraphs are identical`);
  for (const p of paras) ok(p.length > 60, `${id} (${disp(id)}): a distractor paragraph is only ${p.length} characters`);
  const main = strip(q.explanation.split('<h4>Why the other choices are wrong')[0]);
  for (const p of paras) ok(p !== main, `${id} (${disp(id)}): a distractor paragraph duplicates the main explanation`);
}

// ===========================================================================
section('9. Structural invariants and clean rendering');

for (const id of IDS) {
  const q = BY[id];
  for (const tag of ['p', 'li', 'ul', 'ol', 'strong', 'h4', 'em', 'i', 'sup', 'sub', 'table', 'tr', 'td', 'th']) {
    const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
    const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    ok(o === c, `${id} (${disp(id)}): <${tag}> opened ${o} times, closed ${c} times`);
  }
  const blob = text(q);
  ok(!blob.includes('—') && !blob.includes('&mdash;'), `${id} (${disp(id)}): em dash in student-facing text`);
  ok(!/[‘’“”]/.test(blob), `${id} (${disp(id)}): curly quote; the bank uses straight quotes`);
  ok(!/\s{2,}/.test(strip(q.explanation)), `${id} (${disp(id)}): collapsed whitespace suggests a markup gap`);
  ok(!/<[^>]*<|>[^<]*>>/.test(q.explanation), `${id} (${disp(id)}): nested or doubled angle brackets`);
  ok(!/\.\.(?!\.)/.test(q.explanation.replace(/\.\.\./g, '')), `${id} (${disp(id)}): a doubled period suggests truncation`);
  ok(!/<p>\s*<\/p>|<li>\s*<\/li>/.test(q.explanation), `${id} (${disp(id)}): an empty paragraph or list item`);
  ok(!/\bTODO\b|\bTBD\b|\bXXX\b/.test(blob), `${id} (${disp(id)}): a placeholder marker survives`);
  // reviewer notes and source references must never reach student copy
  ok(!/\bSources?:\s*S\d/.test(blob), `${id} (${disp(id)}): a source note leaked into student-facing text`);
  ok(!/https?:\/\//.test(blob), `${id} (${disp(id)}): a bare URL leaked into student-facing text`);
  ok(!/\bIPBES Global Assessment report\b/.test(blob), `${id} (${disp(id)}): a reviewer citation leaked in`);
  // options carry no trailing period, per bank style
  for (let i = 0; i < q.options.length; i++) {
    ok(!/\.$/.test(strip(q.options[i])), `${id} (${disp(id)}) option ${LETTER[i]}: trailing period breaks bank style`);
  }
  // each item still has a stem that asks something
  ok(strip(q.question).length > 25, `${id} (${disp(id)}): the stem is suspiciously short`);
}

// each edited item's educational-point list is internally consistent about
// trailing periods, so no list reads half punctuated
for (const id of changed) {
  const m = BY[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  if (!m) continue;
  const items = [...m[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => strip(x[1]));
  const withDot = items.filter(t => /\.$/.test(t)).length;
  ok(withDot === 0 || withDot === items.length,
    `${id} (${disp(id)}): ${withDot} of ${items.length} educational points end with a period; the list should be consistent`);
}

// ===========================================================================
section('10. The cross-item consistency the review demands');

// no absolute genus-wide vector rules survive
ok(!/breeds in clean water|breeds in polluted water/.test(BY['bio-604'].explanation),
  'bio-604 (B2): a genus-wide breeding-habitat rule survives');
ok(/rice fields/.test(BY['bio-604'].explanation), 'bio-604 (B2): rice-field habitat should be named for Culex');
// the two cyanobacteria items agree that nitrogen fixation is not universal
ok(/Some filamentous cyanobacteria/.test(BY['bio-607'].question),
  'bio-607 (B5): the stem should scope the claim to filamentous cyanobacteria');
ok(!/Cyanobacteria are unique among prokaryotes/.test(text(BY['bio-608'])),
  'bio-608 (A1): the uniqueness claim should be gone');
// the three stem-cell items agree on what pluripotency means
for (const id of ['bio-610', 'bio-612']) {
  ok(/three embryonic germ layers|all three embryonic germ layers/.test(BY[id].explanation),
    `${id} (${disp(id)}): pluripotency should be defined by the three embryonic germ layers`);
  ok(!/extra-embryonic/.test(BY[id].explanation) || /extraembryonic/.test(BY[id].explanation),
    `${id} (${disp(id)}): inconsistent extraembryonic spelling`);
}
// the two Woese/Koch history items carry no false single-date claim
ok(/1977/.test(BY['bio-617'].explanation) && /1990/.test(BY['bio-617'].explanation),
  'bio-617 (B12): both 1977 and 1990 should appear');
ok(!/\(1884\)/.test(BY['bio-613'].explanation), 'bio-613 (B9): the bare 1884 dating should be gone');
// the three ecology items avoid unsupported rankings
for (const id of ['bio-619', 'bio-621']) {
  ok(!/#1|single greatest/.test(BY[id].explanation), `${id} (${disp(id)}): an unsupported ranking survives`);
}
// the two taxonomy items avoid exception-free rules
ok(/exceptions/.test(BY['bio-623'].explanation), 'bio-623 (B17): the exception caveat is missing');
ok(/some dolphins inhabit rivers/.test(BY['bio-624'].explanation), 'bio-624 (B18): freshwater dolphins should be acknowledged');
// no item reintroduces an absolute impermeability or pump claim
ok(!/impermeable to water/.test(BY['bio-629'].explanation), 'bio-629 (B21): absolute impermeability survives');

// ===========================================================================
section('11. The clarification from the scientific reread');

// After the reread, one passage changed: the first sentence of option A's
// feedback in B4 (bio-606). The old wording let "caused by Rickettsia typhi"
// appear to govern plague as well. The sentence is now split so that each
// pathogen is named with the disease it causes.
//
// The replaced wording was introduced by batch 11 itself, so the pre-batch-11
// fixture is not its baseline; it is listed here and asserted absent rather
// than treated as drift in section 4.
const FOLLOWUP_GONE = 'Rat fleas are associated with plague and flea-borne murine typhus, caused by <em>Rickettsia typhi</em>.';
const FOLLOWUP_PRESENT = [
  'Rat fleas can transmit <em>Yersinia pestis</em>, which causes plague.',
  'They can also transmit <em>Rickettsia typhi</em>, which causes flea-borne murine typhus.'
];

{
  const q = BY['bio-606'];
  const was = before['bio-606'];
  for (const t of FOLLOWUP_PRESENT) ok(q.explanation.includes(t), `bio-606 (B4): clarification text missing: ${t.slice(0, 70)}`);
  ok(!text(q).includes(FOLLOWUP_GONE), 'bio-606 (B4): the superseded first sentence is still present');
  // each pathogen is now paired with its own disease, in the right order
  const a = q.explanation.match(/<p><strong>A\. Rat flea \(Xenopsylla cheopis\):<\/strong>([\s\S]*?)<\/p>/);
  ok(a, 'bio-606 (B4): option A feedback paragraph not found');
  if (a) {
    const p = strip(a[1]);
    ok(p.indexOf('Yersinia pestis') < p.indexOf('plague'), 'bio-606 (B4): Yersinia pestis should be named before plague');
    ok(p.indexOf('Rickettsia typhi') < p.indexOf('flea-borne murine typhus'),
      'bio-606 (B4): Rickettsia typhi should be named before murine typhus');
    ok(!/plague and flea-borne murine typhus/.test(p),
      'bio-606 (B4): the two diseases should no longer share one "caused by" clause');
    // the rest of the paragraph survives
    ok(/Epidemic typhus is caused by R\. prowazekii/.test(p), 'bio-606 (B4): the R. prowazekii contrast was lost');
    ok(/These similar disease names refer to different infections and vectors/.test(p),
      'bio-606 (B4): the closing sentence of option A was lost');
  }
  // the clarification is explanation-only
  ok(q.question === was.question, 'bio-606 (B4): the stem moved during the clarification');
  ok(q.options.join('\u0000') === was.options.join('\u0000'), 'bio-606 (B4): an option text moved during the clarification');
  ok(q.correct === was.correct && LETTER[q.correct] === 'B', 'bio-606 (B4): the answer should still be B');
  ok(pointCount(q.explanation) === 3, `bio-606 (B4): ${pointCount(q.explanation)} educational points, expected 3`);
  ok(q.explanation.includes("<p class='exp-key'>Bottom Line: Epidemic typhus = body louse"),
    'bio-606 (B4): the Bottom Line changed');
  ok(q.explanation.includes('<h4>Correct Answer: Human body louse (Pediculus humanus corporis)</h4>'),
    'bio-606 (B4): the correct-answer heading changed');
  // and the other 25 items are untouched by this pass
  const movedSinceBatch11 = IDS.filter(id => id !== 'bio-606' && FOLLOWUP_PRESENT.some(t => BY[id].explanation.includes(t)));
  ok(movedSinceBatch11.length === 0,
    `the clarification text leaked into ${movedSinceBatch11.join(', ')}`);
}

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
