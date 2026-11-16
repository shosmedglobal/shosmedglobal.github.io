/**
 * Verifies the result of chemistry review batch 1 against the review's own
 * requirements, independently of the script that applied it.
 *
 *   node test/chem-review-batch1.test.js
 *
 * The supplied export carried no bank ids, so section 1 re-derives the id map
 * from the ORIGINAL stems and options in the before-fixture rather than trusting
 * scripts/chem-review-batch1-idmap.json. Nineteen stems were replaced by this
 * pass, so the signatures must come from the fixture, not from live data.
 *
 * Section 4's "claim removed" assertions are each paired with a check that the
 * claim really was in the before-fixture, so a typo cannot make an assertion
 * pass vacuously.
 *
 * The review asked for focused verification and explicitly asked NOT to build a
 * large new testing framework for this prose pass, so this suite follows the
 * shape of the existing per-batch suites and is sized to the 60-item pack.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch1-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch1-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch1-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/chem-batch1-edits-a.js'),
  require('../scripts/chem-batch1-edits-b.js'),
  require('../scripts/chem-batch1-edits-c.js'),
  require('../scripts/chem-batch1-edits-d.js'),
  require('../scripts/chem-batch1-edits-e.js'),
  require('../scripts/chem-batch1-edits-f.js')
);

const BY = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
const MAP = idmap.map;
const IDS = Object.values(MAP);
const PACK = new Set(IDS);
const KEEP = new Set(idmap.keep_unchanged_per_review);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0001' + q.options.join('\u0001') + '\u0001' + q.explanation;
const disp = id => Object.keys(MAP).find(n => MAP[n] === id);
const strip = s => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/\s+/g, ' ').trim();
const words = s => strip(s).toLowerCase().replace(/[^a-z0-9%+\-−→ ]+/g, ' ').trim().split(/\s+/).filter(Boolean);
const pointCount = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>/g) || []).length : 0;
};
const mainOf = e => e.split('<h4>Why the other choices are wrong:</h4>')[0];

// ===========================================================================
section('1. The id map, re-derived from the ORIGINAL stems and options');

// Each signature is drawn from the stem and option texts AS SUPPLIED, i.e. from
// the before-fixture. It must match exactly one fixture record, that record's
// stored key must be the letter the review preserves, and the 60 letters must
// reproduce the review's key block and tally.
const SIGNATURES = [
  ['Q1', 'maximum number of electrons that can occupy a single s orbital', ['1', '2', '6', '10']],
  ['Q2', 'A solution has a pH of 4. How many times more acidic', ['3 times', '30 times', '300 times', '1000 times']],
  ['Q3', 'bond is most likely to form between sodium (Na) and chlorine (Cl)', ['Ionic bond', 'Metallic bond']],
  ['Q4', 'molar mass of calcium carbonate', ['68 g/mol', '84 g/mol', '100 g/mol', '116 g/mol']],
  ['Q5', 'functional group is formed when a primary alcohol is oxidized in one step', ['Ketone', 'Aldehyde', 'Carboxylic acid', 'Ester']],
  ['Q6', 'group of the periodic table contains the halogens', ['Group IA (1)', 'Group VIIA (17)']],
  ['Q7', 'salts, when dissolved in water, will produce a basic (alkaline) solution', ['NaCl', 'KNO']],
  ['Q8', 'considered an inorganic carbon compound', ['Carbon dioxide (CO', 'Acetic acid (CH']],
  ['Q9', 'which change will shift the equilibrium to the RIGHT', ['Removing SO', 'Adding a catalyst']],
  ['Q10', 'How many milliliters of 4M NaOH are required', ['50 mL', '100 mL', '200 mL', '400 mL']],
  ['Q11', "According to Hund's rule, how are the three electrons", ['All three in one 2p orbital']],
  ['Q12', 'correct IUPAC name for the compound Fe', ['Iron oxide', 'Iron(II) oxide', 'Iron(III) oxide', 'Diiron trioxide']],
  ['Q13', 'if the volume of an ideal gas is halved, what happens to the pressure', ['Pressure doubles', 'Pressure quadruples']],
  ['Q14', 'semipermeable membrane separates a 0.5 M NaCl solution', ['Equally in both directions']],
  ['Q15', 'volume of water must be added to 100 mL of a 2 M solution', ['300 mL', '400 mL']],
  ['Q16', 'increase the rate of a chemical reaction without changing the equilibrium position', ['Adding a catalyst']],
  ['Q17', 'which species is the reducing agent', ['Zn', 'Cu']],
  ['Q18', 'buffer solution is prepared by mixing acetic acid', ['2.0', '4.76', '7.0', '9.24']],
  ['Q19', 'reagent is used to distinguish between an alkene and an alkane', ['Bromine water', 'Distilled water']],
  ['Q20', 'Benzene preferentially undergoes electrophilic aromatic substitution rather than addition', ['Addition products of benzene are thermodynamically more stable']],
  ['Q21', 'Phenol (C', 'Ethanol has stronger O-H bonds than phenol'],
  ['Q22', 'test is used to distinguish between an aldehyde and a ketone', ['Litmus test', 'Flame test', 'Iodine test']],
  ['Q23', 'common name for methanoic acid', ['Acetic acid', 'Formic acid', 'Oxalic acid', 'Citric acid']],
  ['Q24', "loss of a protein's three-dimensional structure due to heat", ['Hydrolysis', 'Denaturation', 'Saponification']],
  ['Q25', 'distinguishes unsaturated fatty acids from saturated fatty acids', ['Unsaturated fatty acids contain nitrogen atoms']],
  ['Q26', 'disaccharide composed of which two monosaccharides', ['Glucose + Fructose', 'Fructose + Galactose']],
  ['Q27', 'bases is found in RNA but NOT in DNA', ['Adenine', 'Guanine', 'Uracil', 'Cytosine']],
  ['Q28', 'adenine and guanine belong to which class of heterocyclic', ['Pyrimidines', 'Purines', 'Pyrroles', 'Piperidines']],
  ['Q29', 'How are amines classified as primary, secondary, or tertiary', ['By the number of amino groups in the molecule']],
  ['Q30', 'Which element is this, and how many unpaired electrons', ['Sulfur, 2 unpaired', 'Chlorine, 1 unpaired']],
  ['Q31', 'correct IUPAC name for the compound N', ['Nitrogen oxide', 'Dinitrogen pentaoxide']],
  ['Q32', 'metal block has a mass of 270 g and a volume of 100 cm', ['7.87 g/cm']],
  ['Q33', 'raise the temperature of 500 g of water from 20', ['12,540 J', '125,400 J', '1,254 J', '209,000 J']],
  ['Q34', 'essential for thyroid hormone synthesis', ['Fluorine (F)', 'Iodine (I)', 'Bromine (Br)', 'Chlorine (Cl)']],
  ['Q35', 'unusually high boiling point of water compared to H', ['London dispersion forces', 'Hydrogen bonds', 'Ionic bonds']],
  ['Q36', 'contains 2 atm of O', ['1 atm', '2.5 atm', '5 atm', '6 atm']],
  ['Q37', 'formation of a meniscus in a narrow glass tube', ['Surface tension and adhesion', 'Low density of ice']],
  ['Q38', "Henry's law states that the solubility of a gas", ['Carbonated drinks releasing bubbles when opened']],
  ['Q39', 'dissolving 4.0 g of NaOH', ['0.1 M', '0.2 M', '0.5 M', '1.0 M']],
  ['Q40', 'which is the limiting reagent', ['Neither, both are exactly consumed']],
  ['Q41', 'what happens if the concentration of a product is suddenly increased', ['The equilibrium constant K changes']],
  ['Q42', 'Lowry theory, a base is defined as', ['An electron pair donor']],
  ['Q43', 'pH of a 0.001 M HCl solution', ['1', '2', '3', '4']],
  ['Q44', 'equivalence point of a titration of a strong acid with a strong base', ['Exactly 7', 'Depends on the initial concentration']],
  ['Q45', 'catalyst increases the rate of a reaction by', ['Shifting the equilibrium toward products']],
  ['Q46', 'oxidation number of manganese in KMnO', ['+2', '+4', '+5', '+7']],
  ['Q47', 'functional group defines an organic compound as a carboxylic acid', ['-COOH (carboxyl)']],
  ['Q48', 'Polyethylene plastic is formed by the polymerization of which monomer', ['Ethene (CH', 'Ethyne (HC']],
  ['Q49', 'type of reaction does benzene preferentially undergo', ['Electrophilic aromatic substitution', 'Free radical addition']],
  ['Q50', 'reagent can distinguish a primary alcohol from a tertiary alcohol', ['Sodium metal', 'Universal indicator']],
  ['Q51', 'Keto-enol tautomerism is observed in carbonyl compounds', ['A carbon-carbon triple bond', 'An ester linkage']],
  ['Q52', 'between a carboxylic acid and an alcohol in the presence of an acid catalyst', ['An ester and water', 'An anhydride and water']],
  ['Q53', 'amines is the most basic', ['Aniline (C', 'Diethylamine ((C', 'Acetamide (CH']],
  ['Q54', 'At physiological pH (7.4), amino acids predominantly exist as', ['Uncharged molecules', 'Cations only (positively charged)']],
  ['Q55', 'What makes them amphipathic', ['They are soluble in both acids and bases']],
  ['Q56', 'polysaccharide serves as the primary energy storage molecule in animals', ['Cellulose', 'Starch', 'Glycogen', 'Chitin']],
  ['Q57', 'if 30% of the bases are adenine, what percentage are cytosine', ['10%', '20%', '30%', '40%']],
  ['Q58', 'Pyrrole is a five-membered aromatic heterocyclic', ['Hemoglobin (heme group)', 'Cholesterol']],
  ['Q59', 'Moving from left to right across a period', ['Atomic radius', 'Electronegativity', 'Number of electron shells']],
  ['Q60', 'contains O', ['0.95 atm', '0.15 atm', '1.10 atm', '0.40 atm']]
];

const KEY_BLOCK = 'BDCCBDCCCB' + 'CCBBCCABBB' + 'BBBBBBCBBB' + 'CBBBCCBBBB' + 'BCCBCDCBCC' + 'BBBBBCBCCA';
ok(KEY_BLOCK.length === 60, 'the review key block should hold 60 letters');
ok(KEY_BLOCK === idmap.asserted_key_block, 'the key block in the id map should match the review');
ok(SIGNATURES.length === 60, `${SIGNATURES.length} signatures, expected 60`);

const fixtureList = Object.values(before);
ok(fixtureList.length === 60, `${fixtureList.length} before-fixture records, expected 60`);

const derived = {};
SIGNATURES.forEach(([q, stemSig, optSigs], i) => {
  const hits = fixtureList.filter(r => r.question.includes(stemSig));
  ok(hits.length === 1, `${q}: original-stem signature matched ${hits.length} fixture records`);
  if (hits.length !== 1) return;
  const r = hits[0];
  const opts = [].concat(optSigs);
  const missing = opts.filter(s => !r.options.some(o => o.includes(s)));
  ok(missing.length === 0, `${q} -> ${r.id}: original option signature(s) absent: ${missing.join(' | ')}`);
  ok(LETTER[r.correct] === KEY_BLOCK[i],
    `${q} -> ${r.id}: stored key ${LETTER[r.correct]}, the review's key block says ${KEY_BLOCK[i]}`);
  derived[q] = r.id;
});
ok(Object.keys(derived).length === 60, 'all 60 display numbers should resolve to exactly one record');
ok(JSON.stringify(derived) === JSON.stringify(MAP), 'the re-derived map should equal the recorded id map');
ok(new Set(IDS).size === 60, 'the 60 ids should be distinct');

// the tally the review states
const tally = {};
for (const id of IDS) { const l = LETTER[BY[id].correct]; tally[l] = (tally[l] || 0) + 1; }
ok(tally.A === 2 && tally.B === 33 && tally.C === 22 && tally.D === 3,
  `key tally is ${JSON.stringify(tally)}, the review asserts A=2 B=33 C=22 D=3`);
for (const id of IDS) {
  ok(BY[id].correct === before[id].correct, `${disp(id)} ${id}: the answer letter moved`);
}

// non-contiguity: the two bank records inside the span that the export skipped
for (const id of idmap.coverage.still_unreviewed_low_ids) {
  ok(!PACK.has(id), `${id} should not be claimed as part of this pack`);
  ok(data.chemistry.some(q => q.id === id), `${id} should still exist in the bank`);
}
ok(IDS.includes('chem-22') && !IDS.includes('chem-257'),
  'the near-duplicate pair should resolve to chem-22, leaving chem-257 outside the pack');

// ===========================================================================
section('2. Scope: 58 edited, 2 kept, and the review\'s own inventories');

ok(EDITS.length === 58, `${EDITS.length} edit specs, expected 58`);
const changed = IDS.filter(id => JSON.stringify(BY[id]) !== JSON.stringify(before[id]));
ok(changed.length === 58, `${changed.length} pack records changed, expected 58`);
for (const id of KEEP) {
  ok(JSON.stringify(BY[id]) === JSON.stringify(before[id]),
    `${disp(id)} ${id}: the review keeps this item unchanged, but it moved`);
  ok(!changed.includes(id), `${id} should not appear among the changed records`);
}
ok(KEEP.size === 2 && KEEP.has('chem-37') && KEEP.has('chem-62'),
  'the two KEEP items should be chem-37 (Q36) and chem-62 (Q60)');

const sortQ = a => a.slice().sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
const stemMoved = sortQ(IDS.filter(id => BY[id].question !== before[id].question).map(disp));
ok(stemMoved.join(',') === sortQ(idmap.stem_changes).join(','),
  `stems moved in ${stemMoved.join(',')}\n      the review lists  ${sortQ(idmap.stem_changes).join(',')}`);
ok(stemMoved.length === 19, `${stemMoved.length} stems changed, the review's inventory lists 19`);

const optMoved = {};
for (const id of IDS) {
  for (let i = 0; i < BY[id].options.length; i++) {
    if (BY[id].options[i] !== before[id].options[i]) (optMoved[disp(id)] = optMoved[disp(id)] || []).push(LETTER[i]);
  }
}
const flat = o => sortQ(Object.keys(o)).map(k => k + ':' + o[k].slice().sort().join('')).join(' ');
ok(flat(optMoved) === flat(idmap.option_changes),
  `option changes are ${flat(optMoved)}\n      the review lists  ${flat(idmap.option_changes)}`);
ok(Object.values(optMoved).flat().length === 4, 'exactly four option texts should have changed');
for (const id of IDS) {
  ok(BY[id].options.length === 4, `${disp(id)} ${id}: should still have four options`);
  ok(BY[id].id === before[id].id, `${id}: the bank id changed`);
}

// the two stems that only gained a stated condition, rather than being replaced
for (const q of idmap.stem_additions_only) {
  const id = MAP[q];
  const a = strip(before[id].question), b = strip(BY[id].question);
  ok(b.length > a.length, `${q} ${id}: the stem should have gained a condition, not shrunk`);
  const tail = a.split(' ').slice(-6).join(' ');
  ok(b.includes(tail), `${q} ${id}: the original stem's ending should survive the addition`);
}
ok(BY[MAP.Q7].question.includes('at 25°C'), 'Q7 should state the 25°C condition');
ok(/^At constant temperature/.test(BY[MAP.Q38].question), "Q38 should open with the constant-temperature condition");

// ===========================================================================
section('3. Nothing outside the pack moved');

const nBio = Object.keys(untouched.biology).length;
const nChem = Object.keys(untouched.chemistry).length;
ok(nBio === 629, `${nBio} untouched biology hashes, expected 629`);
ok(nChem === 425, `${nChem} untouched chemistry hashes, expected 425`);
ok(nChem + 60 === 485, 'the untouched chemistry set plus the 60 pack ids should account for all 485');
ok(data.biology.length === 629, `biology holds ${data.biology.length} questions, expected 629`);
ok(data.chemistry.length === 485, `chemistry holds ${data.chemistry.length} questions, expected 485`);

let bioDrift = 0;
for (const q of data.biology) if (untouched.biology[q.id] !== hash(q)) { bioDrift++; console.error('  FAIL biology ' + q.id + ' changed'); }
ok(bioDrift === 0, `${bioDrift} biology questions changed; this review touches chemistry only`);

let chemDrift = 0;
for (const q of data.chemistry) {
  if (PACK.has(q.id)) continue;
  if (untouched.chemistry[q.id] !== hash(q)) { chemDrift++; console.error('  FAIL chemistry ' + q.id + ' changed'); }
}
ok(chemDrift === 0, `${chemDrift} chemistry questions outside the pack changed`);

// ===========================================================================
section('4. The scientific repairs the review required');

// [display, gone-from-the-before-fixture, text that must now be present]
const REPAIRS = [
  ['Q1', '<th>Orbital Type</th>', '<th>Subshell</th>'],
  ['Q1', '<th>Max Electrons Total</th>', '<th>Max Electrons per Subshell</th>'],
  ['Q1', '<strong>C. 6:</strong> A p subshell has 3 orbitals', 'Six is the capacity of an entire p subshell'],
  ['Q2', '1000 times more acidic', '1,000 times the hydrogen ion concentration'],
  ['Q2', '10<sup>1</sup>.48', 'Multiply by 10 for each unit: 10 × 10 × 10 = 1,000'],
  ['Q2', '10<sup>2</sup>.48', 'The three is an exponent, not a multiplier applied to 100'],
  ['Q2', '1000-fold difference in acidity', 'about a 1,000-fold increase in hydrogen ion concentration'],
  ['Q3', '&gt; 1.7', 'numerical electronegativity cutoffs are only guides, not universal rules'],
  ['Q3', 'far too large for any type of covalent bond', 'Sodium chloride instead forms a lattice of positively and negatively charged ions'],
  ['Q3', 'exceeds the threshold for covalent bonding', 'Electronegativity difference alone is not an absolute test'],
  ['Q3', '<th>Electronegativity Difference</th>', '<th>Bonding description</th>'],
  ['Q4', 'molar mass of NaHCO3', '84 g/mol results from counting only two oxygen atoms'],
  ['Q4', 'does not correspond to any standard error', '116 g/mol results from counting four oxygen atoms'],
  ['Q5', 'cannot be further oxidized', 'Ketones resist the mild oxidizing conditions used for this test'],
  ['Q5', 'Cannot be easily oxidized', 'Resistant to these ordinary oxidation conditions'],
  ['Q5', 'requires an acid catalyst. Esters are responsible', 'is one common esterification route, not the only possible way'],
  ['Q6', '<td>Astatine</td>', 'Group 17 also includes astatine and tennessine, which are radioactive'],
  ['Q6', 'contains the alkali metals: Li, Na, K, Rb, Cs, and Fr', 'Group 1 contains hydrogen and the alkali metals'],
  ['Q6', 'contains the chalcogens: O, S, Se, Te, and Po', 'Group 16 also includes livermorium'],
  ['Q6', 'Group IA = alkali metals (1 valence', 'hydrogen plus the alkali metals'],
  ['Q7', '<td>Neutral (7)</td>', 'Approximately neutral (about 7)'],
  ['Q7', 'All nitrates and all Group IA salts are soluble', 'negligible acid-base effects in water'],
  ['Q7', 'CH₃COOH, producing OH⁻ ions.</p>', 'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻'],
  ['Q8', 'because it lacks carbon-hydrogen (C-H) bonds', 'Organic/inorganic classification is partly conventional'],
  ['Q8', '<th>Has C-H bonds?</th>', '<th>Compound type</th>'],
  ['Q8', 'cyanides (HCN - debated)', 'carbon monoxide (CO).</p>'],
  ['Q8', 'primary energy source for cells', 'is an important fuel for many cells'],
  ['Q9', 'Removing a product always shifts equilibrium toward products', 'Expanding the vessel favors the side with more gas particles'],
  ['Q9', 'Catalyst speeds both directions equally', 'without changing K or the equilibrium composition'],
  ['Q9', 'Decreasing pressure favors the side with more moles of gas', 'adding or removing an inert gas is not automatically equivalent'],
  ['Q11', "Hund's rule maximizes total spin, which minimizes", 'occupy equal-energy orbitals singly with parallel spins before pairing'],
  ['Q12', '<th>IUPAC Name</th>', '<th>Stock-system name</th>'],
  ['Q12', 'The prefix system (diiron trioxide) is used for covalent', 'Diiron trioxide is a valid compositional name describing the 2:3 atom ratio'],
  ['Q12', 'use Greek prefixes (mono-, di-, tri-, etc.)', 'the Roman numeral gives oxidation state, not the number of atoms'],
  ['Q13', 'strike the walls twice as often', 'Compression increases collisions with each unit area of the container wall'],
  ['Q14', 'IV fluids must be isotonic (0.9% NaCl)', 'the concentrations need not become equal'],
  ['Q14', "i = 2 because it dissociates", 'For ideally dissociated NaCl, i ≈ 2'],
  ['Q14', '<td>Water leaves</td>', '<td>Net water leaves</td>'],
  ['Q14', 'there is always a net flow of water toward the hypertonic side', 'a hydrostatic-pressure difference can balance the osmotic effect'],
  ['Q15', 'common source of error.</p>', 'solution and water volumes are not always exactly additive'],
  ['Q16', 'Guldberg-Waage law of mass action', 'An overall rate law is determined experimentally'],
  ['Q16', '<th>Effect on Rate</th>', '<th>Equilibrium effect for this reaction</th>'],
  ['Q16', 'forward and reverse reactions equally by lowering the activation energy', 'supplies a faster reaction pathway while leaving the equilibrium constant'],
  ['Q16', 'it also shifts the equilibrium position toward the side with fewer moles of gas', 'compression need not shift equilibrium'],
  ['Q17', 'appear on both sides of the net ionic equation and can be removed', 'cancelled when writing the net ionic equation'],
  ['Q17', 'Standard electrode potentials (E°) predict spontaneity', 'The reducing agent donates electrons and is itself oxidized'],
  ['Q18', '<td>Maximum capacity</td>', 'For a given total buffer concentration, resistance to small acid/base additions is greatest'],
  ['Q18', 'pH 7.0 is the pH of pure water, not a buffer', 'Buffers can have pH 7 if an appropriate acid-base pair is chosen'],
  ['Q18', 'conjugate acid-base pair (14 - 4.76 = 9.24)', 'conjugate acid-base pair at 25°C (14 - 4.76 = 9.24)'],
  ['Q18', 'Blood pH (7.4) is maintained by the carbonic acid', 'the useful range is roughly pH 3.76-5.76'],
  ['Q19', 'CH₂Br-CH₂Br (1,2-dibromoethane)', 'In water, bromohydrin products can form'],
  ['Q19', 'No reaction (at room temp)', 'No rapid reaction under these test conditions'],
  ['Q19', '<td>Alkane</td>', '<td>Acyclic alkane</td>'],
  ['Q19', 'any organic functional group test', 'does not give a distinctive reaction that separates these two simple hydrocarbons'],
  ['Q19', 'Alkanes undergo substitution reactions (halogenation) only under UV light', 'not a universal identification test for every unknown organic compound'],
  ['Q20', 'Addition products of benzene are thermodynamically more stable', "Addition preserves benzene's aromatic pi system"],
  ['Q20', 'No (high energy cost)', '<th>Aromaticity in the final product</th>'],
  ['Q20', 'making them energetically unfavorable', 'loss of H⁺ restores aromaticity in the product'],
  ['Q20', 'It simply prefers substitution because addition would destroy', 'It can undergo addition, such as catalytic hydrogenation, under suitable conditions'],
  ['Q21', 'Ethanol has stronger O-H bonds than phenol', 'The ethoxide ion is more resonance-stabilized than the phenoxide ion'],
  ['Q21', 'O-H bond dissociation energies of phenol and ethanol are actually quite similar', 'The comparison is reversed'],
  ['Q21', '<td>Not stabilized</td>', '<td>Not resonance-delocalized into a ring</td>'],
  ['Q21', '<td>Reacts with NaOH?</td>', '<td>Appreciably deprotonated by dilute aqueous NaOH?</td>'],
  ['Q22', '+ 2OH⁻ -> R-COO⁻ + 2Ag(s) + 4NH₃ + H₂O', '+ 3OH⁻ → R-COO⁻ + 2Ag(s) + 4NH₃ + 2H₂O'],
  ['Q22', '<th>Aldehyde Result</th>', '<th>Ethanal (aldehyde)</th>'],
  ['Q22', 'selectively reduced by aldehydes but not by ketones', 'Propanone gives a negative result under the standard test conditions'],
  ['Q22', 'This difference in reducibility is the basis for all aldehyde-specific tests', 'This compares ease of oxidation'],
  ['Q22', 'not a general test for distinguishing all aldehydes from all ketones', 'both ethanal and propanone can give a positive iodoform result'],
  ['Q23', 'responsible for the sting of ant bites', 'occurs in the defensive secretions of some ants'],
  ['Q23', '<td>Ant venom</td>', '<td>Secretions of some ants</td>'],
  ['Q23', 'main component of vinegar', 'main acid in vinegar'],
  ['Q24', 'base-catalyzed', 'Saponification is alkaline ester hydrolysis'],
  ['Q24', 'Yes (disrupted)', '<td>Can be disrupted</td>'],
  ['Q24', 'breaking non-covalent interactions, but leaves the primary structure', 'some denaturing treatments can also disrupt disulfide bonds'],
  ['Q24', 'Hydrolysis = breaking peptide bonds (irreversible)', 'Hydrolysis breaks peptide bonds by reaction with water'],
  ['Q25', 'Tight (solid at RT)', '<td>Tighter</td>'],
  ['Q25', 'Fatty acids are composed only of carbon, hydrogen, and oxygen', 'The common fatty acids discussed here contain carbon, hydrogen and oxygen'],
  ['Q25', 'More double bonds = lower melting point = more liquid', 'Unsaturated does not automatically mean liquid'],
  ['Q26', 'Sucrase (invertase)', 'the sucrase part of sucrase-isomaltase'],
  ['Q26', '<td>alpha(1->2)</td>', '<td>α(1→2)β</td>'],
  ['Q26', 'No common naturally occurring disaccharide is formed from fructose and galactose', 'lactulose contains galactose and fructose'],
  ['Q26', 'leaving no free hemiacetal group to act as a reducing agent', 'neither unit has a free anomeric group that can open to a carbonyl'],
  ['Q27', 'G triple-bond C', 'G-C pairs form 3 hydrogen bonds'],
  ['Q27', '<td>Double-stranded helix</td>', '<td>Usually double-stranded</td>'],
  ['Q27', 'It always pairs with cytosine', 'standard Watson-Crick base pairing'],
  ['Q27', 'thymine (DNA only) vs. uracil (RNA only)', 'In the standard base sets, DNA uses thymine where RNA uses uracil'],
  ['Q28', 'has no structural relationship to the nucleic acid bases', 'not the fused aromatic purine framework'],
  ['Q28', 'a purine always pairs', 'In standard Watson-Crick DNA base pairing, a purine pairs with a pyrimidine'],
  ['Q28', 'four pyrrole units form the porphyrin ring in hemoglobin and chlorophyll', "Pyrrole-derived units occur in heme's porphyrin ring"],
  ['Q28', 'purine (adenine, guanine).</li>', 'Purine is a fused five-plus-six-membered ring system, not a single six-membered ring'],
  ['Q29', 'All amines are basic due to the lone pair', 'their basicity varies with structure and solvent'],
  ['Q30', '1s2 2s2 2p6 3s2 3p2', '1s² 2s² 2p⁶ 3s² 3p²'],
  ['Q30', '1s2 2s2 2p6 3s2 3p3', '1s² 2s² 2p⁶ 3s² 3p³'],
  ['Q30', '1s2 2s2 2p6 3s2 3p5', '1s² 2s² 2p⁶ 3s² 3p⁵'],
  ['Q31', 'Dinitrogen pentaoxide', 'Dinitrogen tetroxide'],
  ['Q31', '"Pentaoxide" is incorrect', 'The systematic compositional spelling dinitrogen pentaoxide is also valid'],
  ['Q31', 'vowel-dropping rule', 'dinitrogen pentaoxide is also a valid systematic compositional form'],
  ['Q31', 'The Stock system (Roman numerals) is used for ionic compounds', 'Multiplying prefixes communicate composition'],
  ['Q31', 'IUPAC requires Greek prefixes', 'does not specify the 2:5 nitrogen-to-oxygen ratio'],
  ['Q32', 'Objects with density &lt; 1 float in water', "object's average density relative to the surrounding liquid"],
  ['Q33', '<th>SI Unit</th>', '<th>Units used here</th>'],
  ['Q33', 'hydrogen bonds must be disrupted before the molecules can move faster', 'hydrogen-bond network can absorb energy as its arrangement changes'],
  ['Q33', 'perhaps using 80 as the change instead of 80-20=60', 'for example by adding 20 and 80'],
  ['Q34', 'Bromine has no known essential biological function', 'collagen IV cross-links in basement membranes'],
  ['Q34', 'most common preventable cause of intellectual disability', 'adequate thyroid hormone is especially important for development'],
  ['Q34', 'Iodine deficiency causes goiter', 'Iodine deficiency can cause goiter'],
  ['Q35', 'universal biological solvent', 'cannot be ranked by a universal weakest-to-strongest list'],
  ['Q35', '<td>Weakest</td>', '<th>Important qualification</th>'],
  ['Q35', 'S is not electronegative enough', 'does not form a comparably strong network'],
  ['Q35', 'Hydrogen bonds require H bonded to F, O, or N', 'Commonly H attached to N, O or F interacting with an acceptor'],
  ['Q35', "Water's anomalously high boiling point requires a stronger explanation", 'H₂S is more polarizable, so dispersion alone does not explain'],
  ['Q37', 'Capillary action in narrow tubes is essential for water movement in plant xylem', 'driven mainly by transpiration pull through a continuous water column'],
  ['Q38', 'pressure drops, and gas solubility decreases', 'the CO₂ partial pressure above the liquid falls'],
  ['Q38', "governed by Raoult's law", "This colligative effect is different from Henry's law"],
  ['Q38', '<td>Gas solubility in liquids</td>', 'dilute solution, constant temperature'],
  ['Q38', 'where C is gas concentration, kH is', "kH is Henry's constant defined in that convention and at that temperature"],
  ['Q40', '<strong>A. H₂:</strong> The remaining 2 mol H₂ are unreacted.', 'Hydrogen therefore remains after oxygen is exhausted'],
  ['Q41', 'A system at equilibrium will always respond to concentration changes', 'The system responds by net reverse reaction until Q = K is restored'],
  ['Q41', 'Changes in concentration or pressure shift the position but do NOT change K', 'a product that appears in the equilibrium expression raises Q above K'],
  ['Q42', 'but does not directly produce OH-', 'Producing or increasing OH⁻ in water describes an Arrhenius base'],
  ['Q43', 'For strong acids, [H⁺] = acid concentration (full dissociation)', "when water's own contribution is negligible"],
  ['Q43', 'pH = -log[H⁺] = -log(10⁻³)', 'pH ≈ -log₁₀[H⁺] = -log₁₀(10⁻³)'],
  ['Q44', 'Use phenolphthalein (pH 8-10) for weak acid/strong base titrations', 'should lie within the steep part of the titration curve'],
  ['Q44', 'is always 7 regardless of concentrations', 'do not change this result in the ideal model'],
  ['Q45', 'Catalysts lower the activation energy (Eₐ) without being consumed', 'participates in the reaction pathway and is regenerated overall'],
  ['Q45', 'Catalysts speed both forward and reverse reactions equally', "without changing the reaction's overall ΔG"],
  ['Q45', 'A catalyst does not change reactant concentrations', 'A catalyst does not work by adding more reactant'],
  ['Q46', '<td>Sum in compound</td>', "<td>Sum in a neutral compound</td>"],
  ['Q46', 'Mn2+ is the oxidation state of manganese', 'Manganese has oxidation state +2 in compounds such as MnCl₂'],
  ['Q46', 'Mn4+ is the oxidation state of manganese', 'Manganese has oxidation state +4 in MnO₂'],
  ['Q46', 'The purple color disappears as Mn is reduced', 'other conditions can give different products, such as brown MnO₂'],
  ['Q47', "give positive Tollens' and Fehling's tests", "Simple aldehydes such as ethanal can reduce Tollens' reagent"],
  ['Q47', '<tr><td>-OH</td><td>Hydroxyl</td><td>Alcohol</td></tr>', 'phenols also contain OH but form a separate class'],
  ['Q47', 'the molecule is an amino acid -- the building block', 'In an alpha-amino acid, an amino group and a carboxyl group are attached to the same alpha carbon'],
  ['Q48', 'Polymerization requires a reactive site', 'Addition polymerization of ethene-type monomers requires a reactive C=C double bond'],
  ['Q48', 'Addition polymerization requires monomers with double bonds', 'including some with triple bonds, can also polymerize'],
  ['Q49', 'free radical substitution (e.g., with Cl2 under UV light)', 'under special photochemical conditions'],
  ['Q49', 'Lewis acid catalysts like AlCl3 or FeBr3', 'lacks the leaving group those common nucleophilic substitutions require'],
  ['Q50', 'Cr⁶⁺ orange', 'orange Cr(VI) species to green Cr(III) species'],
  ['Q50', 'so they cannot be oxidized', 'resists this test because its OH-bearing carbon has no hydrogen'],
  ['Q50', '<strong>No reaction</strong>', '<strong>No oxidation under these test conditions</strong>'],
  ['Q50', 'a pH indicator cannot differentiate between primary and tertiary alcohols', 'does not provide a reliable class test for these alcohols'],
  ['Q51', 'Tautomerism is a rapid equilibrium between the keto form', 'Acid or base commonly catalyzes the interconversion'],
  ['Q51', 'Esters are formed by condensation of acids and alcohols.', 'is one common route to an ester'],
  ['Q51', 'tautomers are real, distinct molecules', 'Resonance drawings instead describe the same molecule'],
  ['Q51', 'the alpha-hydrogen of a carbonyl compound migrates to the oxygen', 'rather than a direct intramolecular hydrogen jump'],
  ['Q52', 'Esters have fruity smells', 'Many small esters have fruity smells'],
  ['Q52', 'base-catalyzed ester hydrolysis', 'Base-promoted ester hydrolysis consumes hydroxide overall'],
  ['Q52', '<td>Acid + amine</td>', 'Usually requires activation or suitable dehydration conditions'],
  ['Q52', '<td>Acid + acid</td>', 'Requires suitable activation or dehydration conditions'],
  ['Q52', 'The reaction of an acid with an amine forms a peptide/amide bond', 'usually first forms an ammonium carboxylate salt'],
  ['Q53', '<th>Amine</th>', '<th>Compound</th>'],
  ['Q53', 'Aliphatic amines &gt; ammonia &gt; aromatic amines', 'diethylamine &gt; ammonia &gt; aniline &gt; acetamide in basicity'],
  ['Q53', 'through the inductive effect, making the lone pair more available', 'More alkyl groups do not always produce a stronger base'],
  ['Q54', 'Amino acids are almost never completely uncharged', 'Glycine has an amino group and a carboxyl group, with no ionizable side chain'],
  ['Q54', 'most amino acids carry both a positive and negative charge', 'the same net-charge conclusion does not apply to all of them'],
  ['Q54', '<th>pH Condition</th>', '<th>Predominant glycine form</th>'],
  ['Q54', 'The isoelectric point (pI) is the pH at which the amino acid has no net charge', 'Its isoelectric point is about pH 6'],
  ['Q54', 'forming an internal salt', 'H₃N⁺-CH₂-COO⁻'],
  ['Q55', 'the basis of all biological membranes', 'a major basis of the lipid bilayers in human cell membranes'],
  ['Q55', '<td>Fatty acid tails (2)</td>', 'Hydrocarbon tails (two, in a typical membrane phospholipid)'],
  ['Q55', 'they spontaneously form bilayers, micelles, or liposomes', 'Other amphipathic molecules may form different structures, such as micelles'],
  ['Q55', 'Solubility in acids and bases describes amphoteric substances', 'Amphoteric means able to react as either an acid or a base'],
  ['Q56', 'but only liver glycogen can raise blood glucose', 'skeletal muscle uses its glycogen locally'],
  ['Q56', 'Storage polysaccharides use &alpha;-glycosidic bonds', 'humans lack cellulase'],
  ['Q57', 'They do NOT apply to single-stranded DNA or RNA', 'not required for an individual strand or a single-stranded genome'],
  ['Q58', 'Co³⁺ in vitamin B12', 'vitamin B12 contains cobalt in a corrin ring'],
  ['Q58', 'the five-membered ring with one NH that forms the porphyrin system', 'the porphyrin framework is built from four pyrrole-derived units'],
  ['Q58', '<td>5-membered, 1 N</td>', '<strong>Pyrrole-derived units</strong>'],
  ['Q58', 'Porphyrins (4 pyrrole rings) coordinate metal ions', 'related tetrapyrrole frameworks, not three identical porphyrins'],
  ['Q59', 'Across a period, nuclear charge increases while electrons are added', 'Across a typical main-group period, increasing effective nuclear charge'],
  ['Q59', 'that is what defines a period', 'Moving down a group introduces a new outer shell']
];

ok(REPAIRS.length >= 150, `${REPAIRS.length} repair assertions; the pack warrants a broad set`);
for (const [q, gone, present] of REPAIRS) {
  const id = MAP[q];
  const was = text(before[id]);
  const now = text(BY[id]);
  // non-vacuity: the superseded claim really was there to begin with
  ok(was.includes(gone), `${q} ${id}: VACUOUS - "${gone.slice(0, 60)}" was not in the before-fixture`);
  ok(!now.includes(gone), `${q} ${id}: superseded text still present: "${gone.slice(0, 60)}"`);
  ok(now.includes(present), `${q} ${id}: replacement text missing: "${present.slice(0, 60)}"`);
}

// The 53 replaced blocks were "repeated" in the review's sense: the same point
// text was shared across items. Rather than hand-listing those paragraphs, the
// repeated set is derived from the before-fixture - any point line that appeared
// in two or more of the 53 items is by definition one of the repeated ones - and
// none of them may survive anywhere in the pack.
const pointLines = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>[\s\S]*?<\/li>/g) || []).map(li => li.replace(/<\/?li>/g, '')) : [];
};
const seenCount = {};
for (const q of idmap.three_point_replacements) {
  for (const line of pointLines(before[MAP[q]].explanation)) seenCount[line] = (seenCount[line] || 0) + 1;
}
const GENERIC = Object.keys(seenCount).filter(l => seenCount[l] >= 2);
ok(GENERIC.length >= 25, `${GENERIC.length} repeated point paragraphs derived from the fixture, expected at least 25`);
ok(Object.keys(seenCount).every(l => seenCount[l] >= 2),
  'every point line in the 53 replaced blocks should have been a shared one');
for (const id of IDS) {
  const hit = GENERIC.filter(g => BY[id].explanation.includes(g));
  ok(hit.length === 0,
    `${disp(id)} ${id}: a repeated educational-point paragraph survived: ${hit[0] ? hit[0].slice(0, 60) : ''}`);
}
for (const q of idmap.three_point_replacements) {
  const id = MAP[q];
  ok(pointLines(before[id].explanation).some(l => GENERIC.includes(l)),
    `${q} ${id}: VACUOUS - the before-fixture carried no repeated point paragraph`);
  // and each replacement point is unique to its item within the pack
  for (const line of pointLines(BY[id].explanation)) {
    const shared = IDS.filter(o => pointLines(BY[o].explanation).includes(line));
    ok(shared.length === 1,
      `${q} ${id}: a replacement point is shared with ${shared.filter(o => o !== id).join(', ')}`);
  }
}

// ===========================================================================
section('5. The major rewrite and the two fairness repairs');

{ // Q54 (chem-55): now explicitly about free glycine
  const q = BY[MAP.Q54];
  ok(/free glycine/.test(q.question), 'Q54: the stem should name free glycine');
  ok(!/amino acids predominantly exist/.test(q.question), 'Q54: the stem should no longer generalize over amino acids');
  ok(q.explanation.includes('no ionizable side chain'), 'Q54: glycine should be identified as having no ionizable side chain');
  ok(/isoelectric point is about pH 6/.test(q.explanation), "Q54: glycine's pI should be given as about 6, not 7.4");
  ok(!/At physiological pH, the amino group is protonated/.test(q.explanation),
    'Q54: the old universal physiological-pH sentence should be gone');
  ok(q.explanation.includes('also consider ionizable side chains'),
    'Q54: the Bottom Line should point to side-chain charges for other amino acids');
  ok(/about 2\.3/.test(q.explanation) && /about 9\.6/.test(q.explanation),
    "Q54: the table should give glycine's two pKa values");
  ok(LETTER[q.correct] === 'B', 'Q54: the answer should still be B');
}
{ // Q12 (chem-12): diiron trioxide must not be called invalid
  const q = BY[MAP.Q12];
  ok(/Stock-system name/.test(q.question), 'Q12: the stem should ask for the Stock-system name');
  ok(/Diiron trioxide is a valid compositional name/.test(q.explanation),
    'Q12: diiron trioxide must be described as a valid compositional name');
  ok(!/is used for covalent \(nonmetal-nonmetal\) compounds/.test(q.explanation),
    'Q12: the claim restricting prefix names to nonmetal pairs should be gone');
  ok(q.options[3] === 'Diiron trioxide', 'Q12: option D should still read Diiron trioxide');
  ok(LETTER[q.correct] === 'C', 'Q12: the answer should still be C');
}
{ // Q31 (chem-32): pentaoxide is no longer the wrong option
  const q = BY[MAP.Q31];
  ok(q.options[3] === 'Dinitrogen tetroxide', 'Q31: option D should now be Dinitrogen tetroxide');
  ok(!q.options.includes('Dinitrogen pentaoxide'), 'Q31: pentaoxide should no longer be an option');
  ok(/dinitrogen pentaoxide is also a valid systematic compositional form/.test(q.explanation),
    'Q31: pentaoxide should be described as valid');
  ok(!/drops/.test(q.explanation), 'Q31: no vowel-dropping rule should remain');
  ok(/both atom counts/.test(q.question), 'Q31: the stem should ask prefixes to specify both atom counts');
  ok(/N₂O₄/.test(q.explanation), 'Q31: option D feedback should identify N₂O₄');
  ok(LETTER[q.correct] === 'C', 'Q31: the answer should still be C');
}

// ===========================================================================
section('6. Presentation: point counts, Bottom Lines and tables');

const FIVE = new Set(idmap.five_point_blocks_kept.map(q => MAP[q]));
ok(FIVE.size === 7, 'seven items should carry individual five-point blocks');
for (const id of IDS) {
  const want = FIVE.has(id) ? 5 : 3;
  ok(pointCount(BY[id].explanation) === want,
    `${disp(id)} ${id}: ${pointCount(BY[id].explanation)} educational points, expected ${want}`);
  ok(pointCount(before[id].explanation) === want,
    `${disp(id)} ${id}: the point count changed, expected it to stay at ${want}`);
  ok((BY[id].explanation.match(/class='exp-key'>Bottom Line:/g) || []).length === 1,
    `${disp(id)} ${id}: expected exactly one Bottom Line`);
}
for (const [q, nums] of Object.entries(idmap.five_point_in_place_repairs)) {
  const id = MAP[q];
  const a = before[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/)[1].split('</li>');
  const b = BY[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/)[1].split('</li>');
  for (let i = 0; i < 5; i++) {
    const repaired = nums.includes(i + 1);
    ok(repaired ? a[i] !== b[i] : a[i] === b[i],
      `${q} ${id}: point ${i + 1} should have been ${repaired ? 'repaired' : 'left alone'}`);
  }
}
// the three five-point blocks the review leaves wholly alone
for (const q of ['Q36', 'Q37', 'Q60']) {
  const id = MAP[q];
  const a = before[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/)[1];
  const b = BY[id].explanation.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/)[1];
  ok(a === b, `${q} ${id}: its five-point block should be untouched`);
}

const NO_TABLE = new Set(idmap.no_table_items.map(q => MAP[q]));
for (const id of IDS) {
  const n = (BY[id].explanation.match(/<table/g) || []).length;
  const was = (before[id].explanation.match(/<table/g) || []).length;
  ok(n === was, `${disp(id)} ${id}: table count moved from ${was} to ${n}`);
  ok(n === (NO_TABLE.has(id) ? 0 : 1), `${disp(id)} ${id}: ${n} tables, expected ${NO_TABLE.has(id) ? 0 : 1}`);
}
ok(NO_TABLE.size === 4, 'four pack items should have no table');
// every table is still rectangular
for (const id of IDS) {
  const t = BY[id].explanation.match(/<table[^>]*>([\s\S]*?)<\/table>/);
  if (!t) continue;
  const rows = [...t[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)]
    .map(r => (r[1].match(/<t[hd][^>]*>/g) || []).length);
  ok(rows.length >= 2, `${disp(id)} ${id}: its table should have at least two rows`);
  ok(new Set(rows).size === 1, `${disp(id)} ${id}: ragged table, cells per row: ${rows.join(',')}`);
}

// ===========================================================================
section('7. Stems, options and headings in sync');

// Every heading the review renamed, plus the ones it asked to bring into
// agreement, must match its option text. Distractor headings must have every
// word present in the option.
for (const id of IDS) {
  const q = BY[id];
  const key = LETTER[q.correct];
  const esc = q.options[q.correct].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  ok(new RegExp('<h4>Correct Answer: (?:' + key + '\\. )?' + esc + '</h4>').test(q.explanation),
    `${disp(id)} ${id}: the correct-answer heading does not match option ${key} in full`);
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ([\\s\\S]*?):</strong>'));
    ok(m, `${disp(id)} ${id}: no "${LETTER[i]}. ...:" feedback heading`);
    if (!m) continue;
    const n = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
    ok(n === 1, `${disp(id)} ${id}: ${n} "${LETTER[i]}. ..." headings, expected 1`);
    const optWords = new Set(words(q.options[i]));
    const stray = words(m[1]).filter(w => !optWords.has(w));
    ok(stray.length === 0,
      `${disp(id)} ${id}: option ${LETTER[i]} heading has words absent from the option: ${stray.join(' ')}`);
  }
}
// Q60 keeps its letter-prefixed heading; no other pack item gained one
ok(/<h4>Correct Answer: A\. 0\.95 atm<\/h4>/.test(BY[MAP.Q60].explanation),
  "Q60 should keep its existing letter-prefixed heading");
for (const id of IDS) {
  if (id === MAP.Q60) continue;
  ok(!/<h4>Correct Answer: [ABCD]\. /.test(BY[id].explanation),
    `${disp(id)} ${id}: a letter prefix appeared in the correct-answer heading`);
}
// the four replaced options and the three resynced headings
ok(BY[MAP.Q20].options[3] === "Addition preserves benzene's aromatic pi system", 'Q20 option D text');
ok(BY[MAP.Q21].options[3] === 'The ethoxide ion is more resonance-stabilized than the phenoxide ion', 'Q21 option D text');
ok(BY[MAP.Q31].options[3] === 'Dinitrogen tetroxide', 'Q31 option D text');
ok(BY[MAP.Q51].options[1] === 'A hydroxyl group (-OH) attached directly to a carbon of a C=C double bond', 'Q51 option B text');
for (const q of idmap.heading_resyncs) {
  const r = BY[MAP[q]];
  ok(r.explanation.includes('<h4>Correct Answer: ' + r.options[r.correct] + '</h4>'),
    `${q}: the correct-answer heading should now carry the full option text`);
  ok(!before[MAP[q]].explanation.includes('<h4>Correct Answer: ' + before[MAP[q]].options[before[MAP[q]].correct] + '</h4>'),
    `${q}: VACUOUS - the heading already matched in full before this pass`);
}

// ===========================================================================
section('8. One complete feedback section per distractor');

for (const id of IDS) {
  const q = BY[id];
  const parts = q.explanation.split('<h4>Why the other choices are wrong:</h4>');
  ok(parts.length === 2, `${disp(id)} ${id}: expected exactly one distractor block`);
  if (parts.length !== 2) continue;
  const bodies = [];
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const m = parts[1].match(new RegExp('<strong>' + LETTER[i] + '\\. [\\s\\S]*?:</strong>([\\s\\S]*?)</p>'));
    ok(m, `${disp(id)} ${id}: option ${LETTER[i]} feedback not found in the distractor block`);
    if (!m) continue;
    const body = strip(m[1]);
    ok(body.length >= 40, `${disp(id)} ${id}: option ${LETTER[i]} feedback is only ${body.length} characters`);
    ok(/[.!?]$/.test(body), `${disp(id)} ${id}: option ${LETTER[i]} feedback does not end in a full stop`);
    bodies.push(body);
  }
  ok(new Set(bodies).size === bodies.length, `${disp(id)} ${id}: two distractors share identical feedback`);
  // no distractor feedback may be a verbatim copy of a main-explanation sentence
  const mainSentences = new Set(strip(mainOf(q.explanation)).split(/(?<=[.!?]) /).map(s => s.trim()).filter(s => s.length > 30));
  for (const b of bodies) ok(!mainSentences.has(b), `${disp(id)} ${id}: a distractor repeats a whole main-explanation sentence`);
}
// option A in Q1 gained the feedback it was missing
ok(/<strong>A\. 1:<\/strong>/.test(BY[MAP.Q1].explanation), 'Q1: option A should now have feedback');
ok(!/<strong>A\. 1:<\/strong>/.test(before[MAP.Q1].explanation), 'Q1: VACUOUS - option A already had feedback');

// ===========================================================================
section('9. Structural invariants and clean rendering');

for (const id of IDS) {
  const q = BY[id];
  const blob = text(q);
  ok(!blob.includes('—'), `${disp(id)} ${id}: em dash in student-facing text`);
  ok(!/[‘’“”]/.test(blob), `${disp(id)} ${id}: curly quote; the bank uses straight quotes`);
  ok(!/\[S\d+\]/.test(blob), `${disp(id)} ${id}: a reviewer source label leaked into student text`);
  ok(!/\bSources?:/.test(blob), `${disp(id)} ${id}: a source note leaked into student text`);
  ok(!/https?:\/\//.test(blob), `${disp(id)} ${id}: a URL leaked into student text`);
  ok(!/\bQ\d+\b/.test(blob), `${disp(id)} ${id}: a review Q-label leaked into student text`);
  ok(!/\b(review|reviewer|implementer)\b/i.test(strip(q.explanation).replace(/reviewed/gi, '')),
    `${disp(id)} ${id}: reviewer commentary wording in student text`);
  ok(q.question.trim() === q.question && q.question.length > 20, `${disp(id)} ${id}: stem is blank or badly trimmed`);
  for (const o of q.options) {
    ok(o.trim() === o && o.length > 0, `${disp(id)} ${id}: an option is blank or badly trimmed`);
    ok(!/\.$/.test(o), `${disp(id)} ${id}: option text ends with a period: ${o.slice(0, 50)}`);
  }
  ok(typeof q.correct === 'number' && q.correct >= 0 && q.correct <= 3, `${disp(id)} ${id}: correct index out of range`);
  for (const tag of ['p', 'li', 'ul', 'ol', 'strong', 'h4', 'em', 'i', 'sup', 'sub', 'table', 'tr', 'th', 'td', 'div']) {
    const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
    const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    ok(o === c, `${disp(id)} ${id}: <${tag}> opened ${o} times, closed ${c} times`);
  }
  ok(!/<li>\s*<\/li>/.test(q.explanation), `${disp(id)} ${id}: empty list item`);
  ok(!/\s{2,}/.test(strip(q.explanation)), `${disp(id)} ${id}: collapsed whitespace problem`);
  ok(!/<p><\/p>/.test(q.explanation), `${disp(id)} ${id}: empty paragraph`);
}
// the three subscript/superscript conventions the review asked us to check
ok(/3p⁴/.test(BY[MAP.Q30].explanation) && !/3p4/.test(BY[MAP.Q30].explanation),
  'Q30: every distractor configuration should use superscripts');
ok(/10<sup>3<\/sup>/.test(BY[MAP.Q2].explanation), 'Q2: powers should render as superscripts');
ok(!/10<sup>\d<\/sup>\.\d/.test(BY[MAP.Q2].explanation), 'Q2: no broken "10^1.48" superscript should remain');

// ===========================================================================
section('10. Calculations and equations, re-checked independently');

{ // Q22: the replacement Tollens equation must balance for atoms AND charge
  const eq = BY[MAP.Q22].explanation.match(/<p>(R-CHO[^<]*)<\/p>/);
  ok(eq, 'Q22: the Tollens equation paragraph should be present');
  if (eq) {
    const s = eq[1];
    ok(/R-CHO \+ 2\[Ag\(NH₃\)₂\]⁺ \+ 3OH⁻ → R-COO⁻ \+ 2Ag\(s\) \+ 4NH₃ \+ 2H₂O/.test(s),
      `Q22: unexpected Tollens equation: ${s}`);
    // Ag 2=2; N 4=4; H outside NH3: 1 (CHO) + 3 (OH) = 4 == 2 x H2O = 4
    ok(1 + 3 === 2 * 2, 'Q22: hydrogen outside the ammine ligands should balance (1 + 3 = 4)');
    // O: 1 (CHO) + 3 (OH) = 4 == 2 (COO) + 2 (H2O) = 4
    ok(1 + 3 === 2 + 2, 'Q22: oxygen should balance (4 = 4)');
    // charge: 2(+1) + 3(-1) = -1 == -1
    ok(2 * 1 + 3 * -1 === -1, 'Q22: net charge should be -1 on both sides');
    ok(/net charge of -1/.test(BY[MAP.Q22].explanation), 'Q22: the explanation should state the net charge');
  }
}
ok(40 + 12 + 3 * 16 === 100 && BY[MAP.Q4].explanation.includes('= <strong>100 g/mol</strong>'), 'Q4: CaCO₃ molar mass');
ok(40 + 12 + 2 * 16 === 84 && 40 + 12 + 4 * 16 === 116, 'Q4: the two distractor arithmetic routes');
ok(2 * 0.200 / 4 === 0.1 && BY[MAP.Q10].explanation.includes('= 0.100 L = <strong>100 mL</strong>'), 'Q10: neutralization volume');
ok(2 * 100 / 0.5 - 100 === 300 && BY[MAP.Q15].explanation.includes('400 - 100 = <strong>300 mL</strong>'), 'Q15: dilution');
ok(270 / 100 === 2.7 && BY[MAP.Q32].explanation.includes('= <strong>2.70 g/cm³</strong>'), 'Q32: density');
ok(500 * 4.18 * 60 === 125400 && BY[MAP.Q33].explanation.includes('= <strong>125,400 J = 125.4 kJ</strong>'), 'Q33: Q = mcΔT');
ok(500 * 4.18 * 100 === 209000, 'Q33: the 209,000 J distractor comes from ΔT = 100°C');
ok(4.0 / 40 / 0.5 === 0.2 && BY[MAP.Q39].explanation.includes('0.1 / 0.5 = <strong>0.2 M</strong>'), 'Q39: molarity');
ok(2 + 3 === 5 && BY[MAP.Q36].explanation.includes('= <strong>5 atm</strong>'), "Q36: Dalton's law");
ok(Math.abs(0.40 + 0.55 - 0.95) < 1e-9 && BY[MAP.Q60].explanation.includes('0.95 atm'), "Q60: Dalton's law");
ok((100 - 2 * 30) / 2 === 20 && BY[MAP.Q57].explanation.includes('each = 40%/2 = <strong>20%</strong>'), 'Q57: Chargaff');
ok(1 + 7 + 4 * -2 === 0 && BY[MAP.Q46].explanation.includes('x = <strong>+7</strong>'), 'Q46: KMnO₄ oxidation number');
ok(2 * 3 + 3 * -2 === 0 && BY[MAP.Q12].explanation.includes('x = +3'), 'Q12: Fe₂O₃ oxidation number');
ok(-Math.log10(1e-3) === 3 && BY[MAP.Q43].explanation.includes('<strong>3</strong>'), 'Q43: pH of 0.001 M HCl');
ok(Math.pow(10, 7 - 4) === 1000 && BY[MAP.Q2].explanation.includes('1,000 times the hydrogen ion concentration'), 'Q2: pH ratio');
ok(14 - 4.76 === 9.24, 'Q18: pKa + pKb = 14 arithmetic behind the 9.24 distractor');
// Q16's reaction really does have unequal gas coefficients, as the repair relies on
ok(/2SO₂\(g\) \+ O₂\(g\) ⇌ 2SO₃\(g\)/.test(BY[MAP.Q16].question) && 2 + 1 !== 2,
  'Q16: the stem should name the unequal-gas-coefficient equilibrium');

// ===========================================================================
section('11. Cross-item consistency');

// Q24 and Q52 must use the same saponification terminology
for (const q of ['Q24', 'Q52']) {
  const e = BY[MAP[q]].explanation;
  ok(!/base-catalyzed/.test(e), `${q}: should not call saponification base-catalyzed`);
}
ok(/alkaline ester hydrolysis/.test(BY[MAP.Q24].explanation), 'Q24: saponification as alkaline ester hydrolysis');
ok(/Base-promoted ester hydrolysis consumes hydroxide overall/.test(BY[MAP.Q52].explanation),
  'Q52: base-promoted hydrolysis, hydroxide consumed overall');

// the catalyst items must agree that K and the equilibrium composition are unchanged
for (const q of ['Q9', 'Q16', 'Q45']) {
  const e = BY[MAP[q]].explanation;
  ok(!/equally/.test(e) || !/forward and reverse reactions equally/.test(e),
    `${q}: should not claim the two rates increase equally`);
}
// no pack item still ranks intermolecular forces universally
ok(!/Strongest intermolecular/.test(BY[MAP.Q35].explanation), 'Q35: no universal strength ranking');
// benzene items agree that addition is possible under suitable conditions
for (const q of ['Q20', 'Q49']) {
  ok(/under suitable conditions|under special photochemical conditions/.test(BY[MAP[q]].explanation),
    `${q}: benzene addition should be described as possible under suitable conditions`);
}
// the pack must not reintroduce an em dash anywhere, and chemistry as a whole
// should now carry fewer of them than before this pass
const emNow = data.chemistry.reduce((n, q) => n + (text(q).match(/—/g) || []).length, 0);
ok(emNow === 4, `${emNow} em dashes remain in the chemistry bank, expected 4 (all outside this pack)`);
for (const id of IDS) ok(!text(BY[id]).includes('—'), `${disp(id)} ${id}: em dash`);

// coverage block is internally consistent
const c = idmap.coverage;
ok(c.new_unique_ids_this_batch === 60, 'coverage: 60 new unique ids');
ok(c.edited_this_batch + c.kept_unchanged_this_batch === 60, 'coverage: 58 edited + 2 kept = 60');
ok(c.reviewed_before_this_batch + c.new_unique_ids_this_batch === c.reviewed_after_this_batch,
  'coverage: reviewed-after should be before + new');
ok(c.reviewed_after_this_batch + c.still_unreviewed_chemistry === c.chemistry_total,
  'coverage: reviewed + unreviewed should equal 485');
ok(c.previously_reviewed_included_again.length === 0,
  'coverage: no previously reviewed chemistry id should be counted again');
ok(c.biology_still_unreviewed.length === 5, 'coverage: five biology questions remain unreviewed');
for (const id of c.biology_still_unreviewed) {
  ok(data.biology.some(q => q.id === id), `coverage: ${id} should exist in the biology bank`);
}

// ===========================================================================
section('12. The focused follow-up: five passages across four items');

// Two of these passages were written by batch 1 itself, so the pre-batch-1
// fixture is not their baseline. They are listed here as superseded and
// asserted absent, rather than being treated as drift in section 4.
const FOLLOWUP = [
  ['Q5', 'chem-5',
   "An ester (R-COO-R') is not formed by oxidation.",
   "An ester (R-COO-R') is not the product expected from the controlled oxidation of a primary alcohol described here.",
   'batch1'],
  ['Q8', 'chem-8',
   'Ethanol is an organic compound because it contains C-H bonds and a carbon backbone.',
   'Ethanol is an organic compound belonging to the alcohol class.',
   'original'],
  ['Q8', 'chem-8',
   'It contains C-H bonds and a carboxyl group (-COOH), clearly classifying it as organic.',
   'Acetic acid belongs to the organic carboxylic acids and contains their characteristic -COOH group.',
   'original'],
  ['Q21', 'chem-22',
   'Resonance delocalization, electronegativity, and inductive effects all stabilize conjugate bases.',
   'Resonance delocalization and electron-withdrawing inductive effects can stabilize a negatively charged conjugate base.',
   'original'],
  ['Q47', 'chem-48',
   'The amino group (-NH2) defines primary amines.',
   'An -NH₂ group alone does not define a primary amine: acetamide (CH₃CONH₂), for example, is an amide because its nitrogen is bonded directly to a carbonyl carbon.',
   'original']
];

ok(FOLLOWUP.length === 5, `${FOLLOWUP.length} follow-up passages, expected 5`);
const FU_IDS = [...new Set(FOLLOWUP.map(f => f[1]))];
ok(FU_IDS.length === 4, `${FU_IDS.length} items touched by the follow-up, expected 4`);

for (const [q, id, gone, present, baseline] of FOLLOWUP) {
  const now = text(BY[id]);
  ok(now.includes(present), `${q} ${id}: follow-up text missing: "${present.slice(0, 70)}"`);
  ok(!now.includes(gone), `${q} ${id}: superseded text still present: "${gone.slice(0, 70)}"`);
  // non-vacuity: a passage whose baseline is the original export must have been
  // in the before-fixture; one batch 1 itself wrote must NOT have been.
  const inFixture = text(before[id]).includes(gone);
  ok(baseline === 'original' ? inFixture : !inFixture,
    `${q} ${id}: baseline recorded as "${baseline}" but the fixture says otherwise`);
  // and the follow-up text is unique to its own item
  const leaked = IDS.filter(o => o !== id && text(BY[o]).includes(present));
  ok(leaked.length === 0, `${q} ${id}: follow-up text leaked into ${leaked.join(', ')}`);
}

// the follow-up is explanation-only: nothing else in those four items moved
for (const id of FU_IDS) {
  const q = BY[id], was = before[id];
  ok(q.question === was.question || idmap.stem_changes.includes(disp(id)),
    `${disp(id)} ${id}: the stem moved outside the batch 1 inventory`);
  ok(q.options.join('\u0000') === was.options.join('\u0000') ||
     Object.keys(idmap.option_changes).includes(disp(id)),
    `${disp(id)} ${id}: an option moved outside the batch 1 inventory`);
  ok(q.correct === was.correct, `${disp(id)} ${id}: the answer letter moved`);
  ok(q.id === was.id, `${disp(id)} ${id}: the bank id moved`);
}
// Q5's stem and Q21's option D were changed by batch 1 and must still carry
// exactly those replacements; the other three items' stems and options must be
// byte-identical to the original export.
ok(BY['chem-5'].question ===
  'Under controlled oxidation conditions that prevent further oxidation of the initial carbonyl product, ' +
  'which functional group is formed from a primary alcohol?',
  "Q5 chem-5: the stem should still be batch 1's replacement, unchanged by the follow-up");
for (const id of FU_IDS) {
  if (!idmap.stem_changes.includes(disp(id))) {
    ok(BY[id].question === before[id].question, `${disp(id)} ${id}: the stem differs from the original export`);
  }
  for (let i = 0; i < 4; i++) {
    const letter = LETTER[i];
    const wasChanged = (idmap.option_changes[disp(id)] || []).includes(letter);
    if (!wasChanged) {
      ok(BY[id].options[i] === before[id].options[i],
        `${disp(id)} ${id}: option ${letter} differs from the original export`);
    }
  }
}
ok(BY['chem-22'].options[3] === 'The ethoxide ion is more resonance-stabilized than the phenoxide ion',
  'Q21 chem-22: option D should still carry its batch 1 replacement text');

// the specific things the follow-up said to preserve
ok(!/Baeyer|Villiger/i.test(text(BY['chem-5'])), 'Q5: no Baeyer-Villiger chemistry should have been added');
ok(BY['chem-48'].explanation.includes('<strong>D. -NH₂ (amino):</strong>'),
  'Q47: option D keeps its existing heading exactly');
ok(BY['chem-48'].explanation.includes(
  'In an alpha-amino acid, an amino group and a carboxyl group are attached to the same alpha carbon.'),
  'Q47: the alpha-amino-acid sentence should survive in the rewritten paragraph');
ok(BY['chem-8'].explanation.includes('It is the alcohol found in alcoholic beverages'),
  'Q8: the rest of option A should be unchanged');
ok(BY['chem-8'].explanation.includes('It gives vinegar its sour taste and pungent smell.'),
  'Q8: the rest of option D should be unchanged');
ok(BY['chem-22'].explanation.includes('Phenol is acidic enough to react with NaOH but not with NaHCO₃'),
  'Q21: the rest of the Bottom Line should be unchanged');
ok(BY['chem-5'].explanation.includes('Many small esters have fruity and floral aromas.'),
  'Q5: the rest of option D should be unchanged');

// The follow-up must preserve all tables and educational-point blocks in these
// four items. Pin them by content hash: 16-char SHA-256 prefixes of the point
// list body and of the item's tables, as they stand after the follow-up. The
// apply harness pins them too, so a later edit to a point line or a table cell
// in any of these four items fails here even if it touches no asserted string.
// chem-5 has no table, hence the empty-string hash e3b0c44298fc1c14.
const PINNED = [
  ['chem-5', '51b4de8f66e22cc2', 'e3b0c44298fc1c14'],
  ['chem-8', '3acd72997aa0fada', '6d7b7b9a1b7f5fc6'],
  ['chem-22', 'fbfd709b177481f5', '1c499dc70334cad3'],
  ['chem-48', '57acdc64b7deaef0', 'b791e0b0017f6f02']
];
const h = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const pointBody = e => { const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/); return m ? m[1] : ''; };
const tableBody = e => (e.match(/<table[\s\S]*?<\/table>/g) || []).join('');
ok(h('') === 'e3b0c44298fc1c14', 'the empty-string hash prefix should be e3b0c44298fc1c14');
for (const [id, wantPoints, wantTables] of PINNED) {
  ok(h(pointBody(BY[id].explanation)) === wantPoints,
    `${disp(id)} ${id}: the educational-point block moved (${h(pointBody(BY[id].explanation))})`);
  ok(h(tableBody(BY[id].explanation)) === wantTables,
    `${disp(id)} ${id}: a table moved (${h(tableBody(BY[id].explanation))})`);
}

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
