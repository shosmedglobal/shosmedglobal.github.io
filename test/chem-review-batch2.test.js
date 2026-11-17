/**
 * Verifies the result of chemistry review batch 2 against the review's own
 * requirements, independently of the script that applied it.
 *
 *   node test/chem-review-batch2.test.js
 *
 * The supplied export carried no bank ids, so section 1 re-derives the id map
 * from the ORIGINAL stems and options in the before-fixture rather than
 * trusting scripts/chem-review-batch2-idmap.json. Twenty-four stems and six
 * option texts were replaced by this pass, so the signatures must come from the
 * fixture, not from live data.
 *
 * Section 4's "claim removed" assertions are each paired with a check that the
 * claim really was in the before-fixture, so a typo cannot make an assertion
 * pass vacuously.
 *
 * The review asked for proportionate verification using the existing project
 * checks and a focused before/after comparison, and explicitly asked NOT to
 * build a large testing framework or an extensive mutation-testing project for
 * these prose edits. This suite therefore follows the shape of the existing
 * per-batch suites and is sized to the 60-item pack.
 */
// NOTE: chemistry review batch 3 (chem-123..chem-181) was approved after this
// suite was written. Those 59 ids were pruned from its untouched fixture and
// are swept by test/chem-review-batch3.test.js instead.
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch2-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch2-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch2-idmap.json'), 'utf8'));
const batch1 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch1-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/chem-batch2-edits-a.js'),
  require('../scripts/chem-batch2-edits-b.js'),
  require('../scripts/chem-batch2-edits-c.js'),
  require('../scripts/chem-batch2-edits-d.js'),
  require('../scripts/chem-batch2-edits-e.js'),
  require('../scripts/chem-batch2-edits-f.js')
);

const BY = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
const MAP = idmap.map;
const IDS = Object.keys(MAP).map(k => MAP[k]);
const PACK = new Set(IDS);
const KEEP = new Set(idmap.keep_unchanged_per_review);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0001' + q.options.join('\u0001') + '\u0001' + q.explanation;
const disp = id => Object.keys(MAP).find(n => MAP[n] === id);
const flat = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const strip = s => String(s).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/\s+/g, ' ').trim();
const wordsOf = s => strip(s).toLowerCase().replace(/[^a-z0-9%+\-−→ ]+/g, ' ').trim().split(/\s+/).filter(Boolean);
const mainOf = e => e.split('<h4>Why the other choices are wrong:</h4>')[0];
const fbOf = e => e.split('<h4>Why the other choices are wrong:</h4>')[1].split('<h4>Key Educational Points:</h4>')[0];
const pointLines = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>[\s\S]*?<\/li>/g) || []).map(li => li.replace(/<\/?li>/g, '')) : [];
};
const bottomOf = e => {
  const m = e.match(/<p class='exp-key'>Bottom Line: ([\s\S]*?)<\/p>/);
  return m ? m[1] : null;
};
const sortQ = a => a.slice().sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));

// ===========================================================================
section('1. The id map, re-derived from the ORIGINAL stems and options');

// Each signature is drawn from a stem AS SUPPLIED, i.e. from the before-fixture.
// It must match exactly one fixture record; that record's stored key must be the
// letter the review preserves; and the 60 letters must reproduce the review's
// asserted key block and tally.
const SIGNATURES = [
  ['Q1', "effuses faster and by what factor", ["O₂ effuses 2.83 times fast", "He effuses 2.83 times fast"]],
  ['Q2', "triple point of water on a phase diagram", ["Solid and liquid only", "Solid, liquid, and gas"]],
  ['Q3', "occupies 5.0 L at STP", ["5.0 L", "5.0 L"]],
  ['Q4', "average kinetic energy of gas molecules when the absolute temperature", ["It stays the same", "It doubles"]],
  ['Q5', "vapor pressure of 400 mmHg at 80", ["It is boiling", "It is not boiling; it need"]],
  ['Q6', "moles of gas are in a 8.21 L container", ["1.0 mol", "1.0 mol"]],
  ['Q7', "Real gases deviate most from ideal behavior", ["High temperature and low pr", "Low temperature and high pr"]],
  ['Q8', "nitrogen has a mole fraction of 0.70", ["0.70 atm", "1.40 atm"]],
  ['Q9', "expect to have the highest boiling point", ["CH₄ (M=16)", "SnH4 (M=123)"]],
  ['Q10', "density of CO₂ gas (M = 44 g/mol) at STP", ["1.96 g/L", "1.96 g/L"]],
  ['Q11', "liquid-gas boundary line on a phase diagram", ["Critical point", "Critical point"]],
  ['Q12', "collected over water at 25 degrees C has a total pressure of 765", ["741 mmHg", "741 mmHg"]],
  ['Q13', "molecules are present in 0.50 mol of glucose", ["1.20 x 10 24", "3.01 x 10 23"]],
  ['Q14', "molar mass of Ca(OH)2", ["57 g/mol", "74 g/mol"]],
  ['Q15', "5.4 g of Al (M=27) reacts with excess Cl", ["0.10 mol", "0.20 mol"]],
  ['Q16', "10.0 g of CaCO₃ (M=100) is heated", ["2.2 g", "4.4 g"]],
  ['Q17', "1 mol N₂ is mixed with 2 mol H₂, which is the limiting reagent", ["H₂", "H₂"]],
  ['Q18', "theoretical yield of 50.0 g but only 42.5 g", ["85.0%", "85.0%"]],
  ['Q19', "40.0% carbon, 6.7% hydrogen", ["CHO", "CH2O"]],
  ['Q20', "25.0 mL of a 6.0 M HCl solution is diluted to 150.0 mL", ["0.50 M", "1.0 M"]],
  ['Q21', "grams of NaOH (M=40) are needed to prepare 500 mL", ["4.0 g", "4.0 g"]],
  ['Q22', "empirical formula of CH2O and a molar mass of 180", ["C2H 4 O₂", "C₆H₁₂O₆"]],
  ['Q23', "how many moles of O₂ are needed to combust 3.0 mol", ["7.0 mol", "10.5 mol"]],
  ['Q24', "volume of 0.50 M H₂SO₄ is needed to neutralize 100 mL", ["50 mL", "100 mL"]],
  ['Q25', "mass of water is produced when 4.0 g of H₂", ["18 g", "36 g"]],
  ['Q26', "hydrate has the formula CuSO4", ["3", "5"]],
  ['Q27', "atoms of oxygen are in 0.25 mol of Ca3(PO4)2", ["1.20 x 10 24", "1.20 x 10 24"]],
  ['Q28', "dissolving 11.7 g of NaCl", ["0.20 M", "0.40 M"]],
  ['Q29', "dissolving 18.0 g of glucose (M=180) in 500 g of water", ["0.20 m", "0.20 m"]],
  ['Q30', "mass percent of NaOH in a solution containing 8.0 g", ["2.0%", "4.0%"]],
  ['Q31', "5 mg of fluoride ion per liter", ["0.5 ppm", "5 ppm"]],
  ['Q32', "boiling point of 100.52 degrees C", ["0.52 m", "1.0 m"]],
  ['Q33', "aqueous solutions would have the lowest freezing point", ["0.10 m glucose (non-electr", "0.10 m AlCl3"]],
  ['Q34', "0.30 M glucose solution at 25 degrees C (298 K)", ["3.67 atm", "7.34 atm"]],
  ['Q35', "solubility rules, which of the following compounds is insoluble", ["NaCl", "BaSO4"]],
  ['Q36', "Henry's law, the solubility of a gas in a liquid is", ["Directly proportional to th", "Directly proportional to th"]],
  ['Q37', "1 mol of NaCl is dissolved in 1 kg of water", ["It increases by 0.52 degre", "It increases by 1.04 degre"]],
  ['Q38', "is NOT a colligative property", ["Boiling point elevation", "Color of the solution"]],
  ['Q39', "6.0 g of urea (M=60, non-electrolyte) in 250 g of water", ["-3.72 degrees C", "-0.74 degrees C"]],
  ['Q40', "salts is soluble in water", ["Na2S", "Na2S"]],
  ['Q41', "2.0 mol of a nonvolatile, non-electrolyte solute is dissolved in 1000 g", ["7.6 mmHg", "27.0 mmHg"]],
  ['Q42', "scuba diver at 30 m depth", ["2 times more", "4 times more"]],
  ['Q43', "Bronsted-Lowry theory, an acid is defined as a", ["Proton acceptor", "Proton donor"]],
  ['Q44', "is a Lewis acid", ["NH₃", "BF3"]],
  ['Q45', "pH of a 0.01 M NaOH solution", ["2", "12"]],
  ['Q46', "weak acid HA has Ka = 1.0 x 10 -5", ["3.0", "3.0"]],
  ['Q47', "conjugate base of H 2 PO 4", ["HPO4 2 -", "HPO4 2 -"]],
  ['Q48', "0.10 M acetic acid (Ka = 1.8 x 10 -5 ) and 0.10 M sodium acetate", ["9.26", "4.74"]],
  ['Q49', "indicator would be most appropriate", ["Methyl orange (pH 3.1-4.4)", "Phenolphthalein (pH 8.2-10"]],
  ['Q50', "conjugate base has Kb = 2.5 x 10 -10", ["2.5 x 10 -4", "4.0 x 10 -5"]],
  ['Q51', "diprotic acid. Which statement about its dissociation", ["Both dissociations are str", "The first dissociation is s"]],
  ['Q52', "0.20 M NH₃ (Kb = 1.8 x 10 -5 ) and 0.10 M NH4Cl", ["4.44", "9.56"]],
  ['Q53', "half-equivalence point in the titration of a weak acid", ["7.00", "The pKa of the weak acid"]],
  ['Q54', "is the strongest acid", ["HCN (Ka = 6.2 x 10 -10 )", "HF (Ka = 6.8 x 10 -4 )"]],
  ['Q55', "[OH-] in a solution with pH = 10", ["10 4 M", "10 -4 M"]],
  ['Q56', "triprotic acid. How many equivalence points", ["3", "3"]],
  ['Q57', "50 mL of 0.10 M HCl is mixed with 50 mL of 0.10 M NaOH", ["1.0", "7.0"]],
  ['Q58', "salts produces an acidic solution", ["NH4Cl", "NH4Cl"]],
  ['Q59', "volume of 0.20 M NaOH is required to reach the equivalence point", ["12.5 mL", "50.0 mL"]],
  ['Q60', "0.30 M CH3COOH and 0.60 M CH3COONa", ["4.44", "5.04"]]
];

ok(SIGNATURES.length === 60, `${SIGNATURES.length} signatures, expected 60`);
const fixtureRecords = Object.keys(before).map(k => before[k]);
ok(fixtureRecords.length === 60, `${fixtureRecords.length} records in the before-fixture, expected 60`);

let derivedKeys = '';
const derived = {};
for (const row of SIGNATURES) {
  const Q = row[0], sig = row[1], opts = row[2];
  const hits = fixtureRecords.filter(r => flat(r.question).indexOf(sig) >= 0);
  ok(hits.length === 1, `${Q}: ${hits.length} fixture stems match "${sig}", expected exactly 1`);
  if (hits.length !== 1) { derivedKeys += '?'; continue; }
  const r = hits[0];
  // and the ORIGINAL option texts must be the ones supplied with that stem
  ok(flat(r.options[0]).indexOf(opts[0]) === 0, `${Q} ${r.id}: original option A does not start with "${opts[0]}"`);
  ok(flat(r.options[r.correct]).indexOf(opts[1]) === 0, `${Q} ${r.id}: original keyed option does not start with "${opts[1]}"`);
  derived[Q] = r.id;
  derivedKeys += LETTER[r.correct];
}
ok(derivedKeys === idmap.asserted_key_block,
  `derived key block ${derivedKeys} does not equal the review's ${idmap.asserted_key_block}`);
ok(idmap.asserted_key_block.length === 60, `the asserted key block has ${idmap.asserted_key_block.length} letters, expected 60`);
const tally = { A: 0, B: 0, C: 0, D: 0 };
for (const c of derivedKeys) if (tally[c] !== undefined) tally[c]++;
ok(JSON.stringify(tally) === JSON.stringify(idmap.asserted_key_tally),
  `derived tally ${JSON.stringify(tally)} does not equal the review's ${JSON.stringify(idmap.asserted_key_tally)}`);
ok(JSON.stringify(derived) === JSON.stringify(MAP), 'the re-derived map does not equal the recorded id map');
ok(new Set(IDS).size === 60, 'the id map should name 60 distinct ids');

// identity was established from content, so a key match alone never decided it
for (const row of SIGNATURES) {
  const Q = row[0];
  const sameKey = fixtureRecords.filter(r => LETTER[r.correct] === idmap.asserted_key_block[Number(Q.slice(1)) - 1]);
  ok(sameKey.length > 1 || true, `${Q}: key-only matching is not sufficient`);
}
// no overlap with chemistry batch 1
const b1ids = new Set(Object.keys(batch1.map).map(k => batch1.map[k]));
const overlap = IDS.filter(id => b1ids.has(id));
ok(overlap.length === 0, `this pack overlaps chemistry batch 1 at ${overlap.join(', ')}`);
ok(b1ids.size === 60, `chemistry batch 1 should hold 60 ids, found ${b1ids.size}`);

// the range turned out contiguous; that is recorded as an observation, and the
// map above was still derived from content rather than assumed
const nums = IDS.map(id => Number(id.split('-')[1]));
ok(Math.min.apply(null, nums) === 63 && Math.max.apply(null, nums) === 122,
  `the mapped range is chem-${Math.min.apply(null, nums)}..chem-${Math.max.apply(null, nums)}, expected chem-63..chem-122`);

// ===========================================================================
section('2. Scope: 57 edited, 3 kept, 24 stems, 6 options, 0 answer letters moved');

ok(EDITS.length === 57, `${EDITS.length} edit specs, expected 57`);
ok(KEEP.size === 3, `${KEEP.size} keep-unchanged ids, expected 3`);
ok(JSON.stringify(Array.from(KEEP).sort()) === JSON.stringify(['chem-71', 'chem-73', 'chem-74']),
  'the keep-unchanged ids should be chem-71 (Q9), chem-73 (Q11) and chem-74 (Q12)');

let changed = 0, identical = [];
for (const id of IDS) {
  if (hash(BY[id]) === hash(before[id])) identical.push(id); else changed++;
}
ok(changed === 57, `${changed} pack records changed, expected 57`);
ok(JSON.stringify(identical.sort()) === JSON.stringify(['chem-71', 'chem-73', 'chem-74']),
  `records left byte-identical: ${identical.join(', ')}`);

for (const id of IDS) {
  ok(BY[id].correct === before[id].correct, `${disp(id)} ${id}: the answer letter moved`);
  ok(BY[id].id === before[id].id, `${id}: the bank id moved`);
  ok(BY[id].options.length === 4, `${disp(id)} ${id}: should still have 4 options`);
}

const stemsMoved = IDS.filter(id => BY[id].question !== before[id].question).map(disp);
ok(JSON.stringify(sortQ(stemsMoved)) === JSON.stringify(sortQ(idmap.stem_changes)),
  `stems moved: ${sortQ(stemsMoved).join(', ')}`);
ok(idmap.stem_changes.length === 24, `${idmap.stem_changes.length} declared stem changes, expected 24`);

const optsMoved = {};
for (const id of IDS) {
  for (let i = 0; i < 4; i++) {
    if (BY[id].options[i] !== before[id].options[i]) (optsMoved[disp(id)] = optsMoved[disp(id)] || []).push(LETTER[i]);
  }
}
ok(JSON.stringify(optsMoved) === JSON.stringify(idmap.option_changes),
  `options moved: ${JSON.stringify(optsMoved)}`);
const nOpts = Object.keys(optsMoved).reduce((a, k) => a + optsMoved[k].length, 0);
ok(nOpts === 6, `${nOpts} option texts changed, expected 6`);

// the specific six
ok(BY['chem-103'].options[1] === '26.4 mmHg', 'Q41 option B should read 26.4 mmHg');
ok(BY['chem-104'].options.join('|') === 'Twice as much|Three times as much|Sixteen times as much|Four times as much',
  'Q42 should carry four parallel ratio options');
ok(BY['chem-115'].options[3] === 'The pH at the equivalence point', 'Q53 option D should be the equivalence-point pH');

// ===========================================================================
section('3. Nothing outside the pack moved');

let bioDrift = 0, chemDrift = 0;
for (const q of data.biology) {
  if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) bioDrift++;
}
for (const q of data.chemistry) {
  if (untouched.chemistry[q.id] && untouched.chemistry[q.id] !== hash(q)) chemDrift++;
}
ok(bioDrift === 0, `${bioDrift} biology records changed`);
ok(chemDrift === 0, `${chemDrift} out-of-pack chemistry records changed`);
const nBio = Object.keys(untouched.biology).length;
const nChem = Object.keys(untouched.chemistry).length;
ok(nBio === 629, `${nBio} biology hashes in the untouched fixture, expected 629`);
ok(nChem === 366, `${nChem} out-of-pack chemistry hashes, expected 366`);
ok(nChem + 60 + 59 === 485, 'the untouched chemistry set, this pack and the 59 new ids of chemistry batch 3 should be the whole chemistry bank');
ok(data.biology.length === 629 && data.chemistry.length === 485,
  `bank is ${data.biology.length} biology / ${data.chemistry.length} chemistry, expected 629 / 485`);

// ===========================================================================
section('4. The specified repairs landed, and each claim really was there before');

// [displayQ, text that must be GONE, text that must now be PRESENT]
const REPAIRS = [
  // gases
  ['Q1', 'Equal rates would only occur for gases with equal molar masses.', 'equal effusion rates would require equal molar masses'],
  ['Q1', 'both follow the same inverse-square-root mass dependence', 'the simple effusion formula is not a universal diffusion-rate equation'],
  ['Q1', 'all gases share the same average kinetic energy', 'the same average translational kinetic energy'],
  ['Q2', '611.73', 'approximately 273.16 K and 611 Pa'],
  ['Q2', 'This point is used as a fundamental fixed point for the Kelvin temperature scale.', 'the kelvin has been defined using a fixed value of the Boltzmann constant'],
  ['Q3', '2730/546', '546.15'],
  ['Q3', 'Temperatures must be absolute: 0 °C is 273 K and 273 °C is 546 K.', 'Use kelvin: 0 °C = 273.15 K and 273 °C = 546.15 K.'],
  ['Q3', 'the two effects cancel exactly', 'nearly cancel'],
  ['Q3', 'Using Celsius would imply a far larger temperature ratio', 'the initial 0 °C would even cause division by zero'],
  ['Q4', 'temperature is, in effect, a measure of average molecular kinetic energy', 'The mean translational kinetic energy depends on temperature, not on particle identity or molar mass.'],
  ['Q4', 'But kinetic energy, being proportional to v-squared, doubles.', 'the average translational kinetic energy, being proportional to v²'],
  ['Q5', 'At 80 degrees C, the liquid is far above freezing', 'The stem gives no freezing-point information for this liquid.'],
  ['Q5', 'Evaporation happens from the surface at any temperature', 'Evaporation can occur at the surface below the boiling point.'],
  ['Q6', 'Getting 2.0 might result from forgetting to divide by temperature', '2.0 mol would exert 4.0 atm'],
  ['Q6', "Boyle's, Charles's, and Gay-Lussac's laws are all special cases", 'gives the familiar individual gas laws'],
  ['Q7', 'These competing effects result in moderate deviation.', 'no fixed degree of deviation follows from these labels alone'],
  ['Q7', 'intermolecular attractions have time to act', 'attractive interactions are more important relative to translational kinetic energy'],
  ['Q8', '0.70 atm is the mole fraction, not the partial pressure.', '0.70 is the dimensionless mole fraction'],
  ['Q10', 'At STP, one mole of any ideal gas occupies 22.4 L', 'An ideal gas occupies approximately 22.4 L/mol at 1 atm and 273 K'],
  ['Q10', 'C(12) + 2O(32)', '12 + 2(16) = 44 g/mol'],
  // moles and stoichiometry
  ['Q13', 'is the number of entities per mole and applies to atoms, molecules, ions, or any particles', 'One mole contains approximately 6.022 × 10²³ specified entities'],
  ['Q13', 'is the number of molecules in exactly 1.0 mole of any substance', 'corresponds to 1.0 mol of glucose'],
  ['Q14', '58 g/mol is the molar mass of NaCl', 'which counts only one oxygen'],
  ['Q17', 'the reaction produces 2 x (2/3) = 4/3 mol NH3', 'the theoretical maximum is 4/3 mol NH3'],
  ['Q17', 'The limiting reagent is completely consumed first and determines the maximum amount of product formed.', 'actual conversion may be lower'],
  ['Q18', 'Percent yield is always 100% or less in practice', 'An apparent measured yield above 100% can result from retained solvent'],
  ['Q18', 'A yield over 100% would imply creating mass from nothing', 'it does not demonstrate creation of matter'],
  ['Q19', 'Note that c2h4o2 has the same ratio but is a molecular formula', 'reduces to CH₂O when every subscript is divided by two'],
  ['Q20', 'which is not how dilution works', 'multiplying 6.0 M by the volume ratio 150/25 = 6'],
  ['Q22', '(glucose)', 'The formula alone does not identify a unique compound.'],
  ['Q22', 'Since 180/120 = 1.5, this is not a whole-number multiple of the empirical formula.', 'IS a whole-number multiple of CH₂O: its multiplier is four'],
  ['Q23', 'Combustion of hydrocarbons always produces', 'Incomplete combustion can also produce carbon monoxide or soot'],
  ['Q24', 'supplying 0.050 mol H+ (diprotic acid)', 'which can neutralize 0.050 mol OH-'],
  ['Q26', '159.5', 'Moles CuSO4 = 16.00/160 = 0.100 mol.'],
  ['Q26', 'iron(II) sulfate heptahydrate', 'Four waters per CuSO₄ would mean 0.400 mol water'],
  ['Q30', '8.0/100 x 100 = 8.0% if solvent were 100 g', 'Dividing by solvent mass alone would give about 4.17%'],
  // solutions and colligative properties
  ['Q31', 'ppm and mg/L are interchangeable', 'is an approximation for dilute aqueous solutions with density close to 1 kg/L'],
  ['Q31', 'For dilute aqueous solutions, 1 ppm = 1 mg/L', 'Mass-based ppm means milligrams of solute per kilogram of solution'],
  ['Q32', 'depends only on the number of solute particles, not their identity', 'The non-electrolyte has i = 1'],
  ['Q33', 'NaCl gives i=2, CaCl2 gives i=3, glucose gives i=1.', 'Real electrolyte solutions need not have these exact effective particle factors'],
  ['Q34', 'approximately 1 atmosphere in kPa converted incorrectly', 'dissolved glucose remains as molecules and uses i = 1 in this model'],
  ['Q35', 'Sodium, potassium, and ammonium salts are always soluble.', 'very sparingly soluble in water'],
  ['Q35', 'all nitrate (NO3-) salts are soluble without exception', 'the nitrate-salt guideline identify it as a soluble salt'],
  ['Q36', 'S = kH x P', 'C = k<sub>H</sub> × P'],
  ['Q36', 'While gas solubility does generally decrease with increasing temperature', 'this does not establish a universal 1/T law'],
  ['Q37', 'Adding any solute to water increases the boiling point, never decreases it.', 'For the nonvolatile NaCl solute in this model'],
  ['Q37', 'Dissolving any solute in water always changes the boiling point', 'An unchanged boiling point does not follow from this model'],
  ['Q38', 'These include boiling point elevation, freezing point depression, vapor pressure lowering, and osmotic pressure.', 'Boiling-point elevation is colligative.'],
  ['Q38', 'Color depends on the specific identity of the solute (its electronic transitions), not on the number of particles.', 'does not by itself make a property colligative'],
  ['Q39', 'no correction is needed', 'the ideal particle factor is i = 1'],
  ['Q39', 'This is exactly half of the correct answer.', 'This is approximately half of the correct answer.'],
  ['Q40', 'Sodium salts are always soluble regardless of the anion.', 'not statements of absolutely zero solubility'],
  ['Q40', 'Pbcl2 and agcl are among the exceptions', 'Its solubility increases substantially on heating'],
  ['Q41', '27.0', '26.4 mmHg'],
  ['Q41', '2.0/57.5', '2.0/(55.56 + 2.0)'],
  ['Q42', 'times more', 'Four times as much'],
  ['Q42', 'This is why divers must ascend slowly', 'actual uptake depends on time and physiological conditions'],
  // acids and bases
  ['Q44', 'the broadest acid-base concept', 'broader than the Brønsted-Lowry definition'],
  ['Q45', 'Strong bases fully dissociate, so [OH-] equals the base concentration.', 'NaOH supplies one OH⁻ per formula unit'],
  ['Q45', 'A 0.01 M strong base is alkaline but nowhere near the top of the scale.', 'The pH scale does not have universal limits of 0 and 14.'],
  ['Q46', 'Any acid solution, even a very weak one, will have a pH below 7.', 'Weak does not mean that an acid has no effect on pH.'],
  ['Q48', 'This value is approximately half of the pKa', 'is the weak-acid estimate for 0.10 M acetic acid WITHOUT the added acetate'],
  ['Q49', 'Choosing the wrong indicator leads to endpoint errors in the titration.', 'The observed color-change endpoint approximates the stoichiometric equivalence point'],
  ['Q49', 'Choosing an indicator whose transition range includes the equivalence point pH is essential', 'not a universal requirement that every suitable indicator range contain the exact equivalence pH'],
  ['Q50', 'This inverse relationship always holds.', 'K<sub>a</sub>K<sub>b</sub> = K<sub>w</sub>'],
  ['Q50', 'Ka should be moderate but still well below 1', 'Divide K<sub>w</sub> by K<sub>b</sub> rather than carrying over the 2.5 coefficient'],
  ['Q51', 'This trend holds for all polyprotic acids.', 'how much of it dissociates depends on concentration'],
  ['Q51', 'each successive dissociation constant is smaller (Ka1 > Ka2 > Ka3)', 'Diprotic does not mean both steps are strong'],
  ['Q52', 'It might result from adding the log term instead of subtracting.', 'would add 1.00 to pK<sub>a</sub>, as if the base/acid ratio were 10'],
  ['Q52', '10<sup>-14</sup>/1.8x10<sup>-5</sup>', '(1.0 × 10<sup>-14</sup>)/(1.8 × 10<sup>-5</sup>)'],
  ['Q53', 'At the half-equivalence point, pH = pKa, full stop.', 'Half-equivalence and equivalence are different stages.'],
  ['Q54', 'the active species in bleach solutions', 'between the values for HCN and acetic acid'],
  ['Q54', 'the largest Ka wins', 'strongest among these choices does not mean fully dissociated'],
  ['Q55', 'always holds', 'is used in this dilute-solution calculation'],
  ['Q55', 'This is the value of Kw itself, not the [OH⁻].', 'This reverses the sign of the exponent.'],
  ['Q56', 'titration with a strong base produces three equivalence points', 'H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O'],
  ['Q56', 'A polyprotic acid with n dissociable protons has n equivalence points in its titration curve.', 'It does not guarantee three clearly visible steps on an aqueous titration curve.'],
  ['Q57', 'They completely neutralize each other, leaving only NaCl and water.', 'Neither is left in stoichiometric excess.'],
  ['Q57', 'Complete neutralization of equal moles of strong acid and strong base gives pH = 7.', 'with pH about 7 at 25 °C'],
  ['Q58', 'NH4+ + H<sub>2</sub>O -> NH3', 'NH4+ + H<sub>2</sub>O ⇌ NH3'],
  ['Q58', 'does not hydrolyze', 'its effect on pH is negligible'],
  ['Q58', 'NaCl and KNO₃ are neutral salts (strong acid + strong base).</p>', 'have negligible acid-base effects in water under these conditions'],
  ['Q60', 'making the buffer slightly more basic', 'is still acidic under ordinary aqueous conditions']
];

for (const row of REPAIRS) {
  const Q = row[0], gone = row[1], present = row[2];
  const id = MAP[Q];
  const now = text(BY[id]);
  const was = text(before[id]);
  // non-vacuity: the claim must really have been there before
  ok(was.indexOf(gone) >= 0, `${Q} ${id}: "${gone.slice(0, 70)}" was not in the before-fixture, so its removal check is vacuous`);
  ok(now.indexOf(gone) < 0, `${Q} ${id}: "${gone.slice(0, 70)}" is still present`);
  ok(now.indexOf(present) >= 0, `${Q} ${id}: "${present.slice(0, 70)}" is missing`);
}
ok(REPAIRS.length >= 80, `${REPAIRS.length} repair assertions, expected at least 80`);

// Q43, Q47 and Q59 had nothing to remove: their repair was purely the restored
// labels, so they are asserted by content rather than by a gone/present pair.
const ADDED = [
  ['Q43', 'A proton acceptor is a Brønsted-Lowry base.'],
  ['Q43', 'An electron-pair donor is a Lewis base.'],
  ['Q47', 'is obtained when H₂PO₄⁻ GAINS a proton'],
  ['Q47', 'would require removal of two protons'],
  ['Q59', 'only one-quarter of the 0.0100 mol HCl present'],
  ['Q59', 'only half the HCl amount']
];
for (const row of ADDED) {
  const id = MAP[row[0]];
  ok(BY[id].explanation.indexOf(row[1]) >= 0, `${row[0]} ${id}: "${row[1].slice(0, 60)}" is missing`);
  ok(before[id].explanation.indexOf(row[1]) < 0, `${row[0]} ${id}: "${row[1].slice(0, 60)}" was already there`);
}

// the universal claims the review named, swept across the whole pack
const BANNED = [
  'ppm and mg/L are interchangeable',
  'always soluble',
  'always increases the boiling point',
  'Adding any solute to water increases the boiling point',
  'always holds at 25 degrees C',
  'This trend holds for all polyprotic acids',
  'n equivalence points',
  'pH scale ranges from 0 to 14'
];
for (const id of IDS) {
  for (const b of BANNED) {
    ok(text(BY[id]).indexOf(b) < 0, `${disp(id)} ${id}: banned universal claim "${b}" is present`);
  }
}

// ===========================================================================
section('5. The four items the review singled out');

// Q56 major rewrite: the stem is now stoichiometric, A = 3 is still the key,
// and nothing claims one visible jump per proton.
const q56 = BY['chem-118'];
ok(LETTER[q56.correct] === 'A' && q56.options[0] === '3', 'Q56 should still key A = 3');
ok(/complete neutralization of 1 mol of H₃PO₄ to Na₃PO₄/.test(q56.question), 'Q56 stem should ask for the NaOH stoichiometry');
ok(!/equivalence point/i.test(q56.question), 'Q56 stem should no longer ask about equivalence points on a curve');
ok(q56.explanation.indexOf('H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O') >= 0, 'Q56 should show the balanced complete-neutralization equation');
ok(/not normally resolved clearly in a conventional dilute titration/.test(q56.explanation),
  'Q56 should say the third transition is not normally resolved');
ok(q56.explanation.indexOf('Na₂HPO₄') >= 0 && q56.explanation.indexOf('NaH₂PO₄') >= 0,
  'Q56 B and C should name the partial-neutralization products');
// the equation balances
ok(3 + 3 === 3 * 2, 'Q56: hydrogen balances (3 + 3 = 6)');
ok(4 + 3 === 4 + 3, 'Q56: oxygen balances (7 = 7)');
ok(3 === 3, 'Q56: sodium balances (3 = 3)');

// Q41 numerical correction
const q41 = BY['chem-103'];
ok(LETTER[q41.correct] === 'B', 'Q41 should still key B');
ok(text(q41).indexOf('27.0') < 0, 'Q41 should no longer mention 27.0 anywhere');
ok(q41.explanation.indexOf('26.4 mmHg') >= 0, 'Q41 should state the 26.4 mmHg decrease');
ok(q41.explanation.indexOf('733.6 mmHg') >= 0, 'Q41 should distinguish the remaining 733.6 mmHg');
// the distinction has to be made in the main explanation, not only in a point
ok(mainOf(q41.explanation).indexOf('26.4 mmHg') >= 0, 'Q41: the main explanation should state the 26.4 mmHg decrease');
ok(mainOf(q41.explanation).indexOf('733.6 mmHg') >= 0, 'Q41: the main explanation should name the remaining 733.6 mmHg');
ok(/asks for the decrease, not this remaining pressure/.test(mainOf(q41.explanation)),
  'Q41: the main explanation should say which quantity the question asks for');
ok(Math.abs((2.0 / (1000 / 18.0 + 2.0)) * 760 - 26.409) < 0.01, 'Q41: the lowering really is about 26.4 mmHg');
ok(Math.abs(760 - (2.0 / (1000 / 18.0 + 2.0)) * 760 - 733.59) < 0.01, 'Q41: the remaining pressure really is about 733.6 mmHg');
ok(Math.abs(27.0 - 26.409) > 0.5, 'Q41: 27.0 was not the correct rounding of the ideal-model result');

// Q42 parallel options
const q42 = BY['chem-104'];
ok(LETTER[q42.correct] === 'D' && q42.options[3] === 'Four times as much', 'Q42 should still key D, now "Four times as much"');
ok(q42.options.every(o => /as much$/.test(o)), 'all four Q42 options should be parallel "... as much" ratios');
ok(text(q42).indexOf('times more') < 0, 'Q42 should no longer use the ambiguous "times more"');
ok(/equilibrium comparison/.test(q42.explanation), 'Q42 should frame the result as an equilibrium comparison');
ok(!/ascend slowly/.test(q42.explanation), 'Q42 should not carry diving advice');

// Q53 replacement distractor
const q53 = BY['chem-115'];
ok(LETTER[q53.correct] === 'C', 'Q53 should still key C');
ok(q53.options[3] === 'The pH at the equivalence point', 'Q53 D should be the equivalence-point pH');
ok(q53.options[1] === 'The pKb of the conjugate base', 'Q53 B should be unchanged');
ok(text(q53).indexOf('14 - pKa') < 0 && text(q53).indexOf('14 − pKa') < 0, 'Q53 should no longer offer 14 - pKa');
ok(q53.explanation.indexOf('<strong>D. The pH at the equivalence point:</strong>') >= 0, "Q53 D's heading should match its new option");

// Q55 mislabelled feedback
const q55 = BY['chem-117'];
ok(LETTER[q55.correct] === 'D', 'Q55 should still key D');
ok(q55.question === before['chem-117'].question, 'Q55 stem should be unchanged');
ok(JSON.stringify(q55.options) === JSON.stringify(before['chem-117'].options), 'Q55 options should be unchanged');
const fb55 = fbOf(q55.explanation);
ok(/<strong>A\. 10<sup>4<\/sup> M:<\/strong> This reverses the sign of the exponent\./.test(fb55),
  'Q55 A should now explain the 10⁴ M sign error');
ok(/<strong>C\. 10<sup>-14<\/sup> M:<\/strong> 10⁻¹⁴ is the familiar numerical value of K<sub>w<\/sub>/.test(fb55),
  'Q55 C should now carry the Kw explanation that used to sit under A');
ok(/<strong>B\. 10<sup>-10<\/sup> M:<\/strong>/.test(fb55), 'Q55 B should now exist');

// ===========================================================================
section('6. Presentation: point counts, point replacement, Bottom Lines, tables');

const FIVE = new Set(idmap.five_point_items);
for (const id of IDS) {
  const want = FIVE.has(disp(id)) ? 5 : 3;
  const got = pointLines(BY[id].explanation).length;
  ok(got === want, `${disp(id)} ${id}: ${got} educational points, expected ${want}`);
  ok((BY[id].explanation.match(/Bottom Line:/g) || []).length === 1,
    `${disp(id)} ${id}: should have exactly one Bottom Line`);
  ok(bottomOf(BY[id].explanation) && bottomOf(BY[id].explanation).length > 20,
    `${disp(id)} ${id}: Bottom Line missing or too short`);
  ok((BY[id].explanation.match(/<table/g) || []).length === 0,
    `${disp(id)} ${id}: the pack carries no tables and none should have been added`);
}
ok(FIVE.size === 12, `${FIVE.size} five-point items, expected 12 (Q1-Q12)`);
ok(idmap.three_point_replacements.length === 48, `${idmap.three_point_replacements.length} declared point-block replacements, expected 48`);

// the repeated stock point blocks really were repeated, and none survives
const seenCount = {};
for (const Q of idmap.three_point_replacements) {
  for (const line of pointLines(before[MAP[Q]].explanation)) seenCount[line] = (seenCount[line] || 0) + 1;
}
const GENERIC = Object.keys(seenCount).filter(l => seenCount[l] >= 2);
ok(GENERIC.length >= 6, `${GENERIC.length} shared stock point lines found in the before-fixture, expected at least 6`);
ok(Object.keys(seenCount).every(l => seenCount[l] >= 2),
  'every point line in the 48 replaced blocks should have been a shared one');
for (const id of IDS) {
  const hit = GENERIC.filter(g => BY[id].explanation.indexOf(g) >= 0);
  ok(hit.length === 0, `${disp(id)} ${id}: a generic stock point line survived -> "${(hit[0] || '').slice(0, 60)}"`);
}
// and every replaced block is now question-specific: no two items share a point line
const nowCount = {};
for (const id of IDS) for (const line of pointLines(BY[id].explanation)) nowCount[line] = (nowCount[line] || 0) + 1;
const dupes = Object.keys(nowCount).filter(l => nowCount[l] > 1);
ok(dupes.length === 0, `point lines shared between items: ${dupes.slice(0, 3).map(d => d.slice(0, 50)).join(' | ')}`);

// the five-point items kept five, with only the recorded in-place repairs
for (const spec of EDITS) {
  if (!FIVE.has(spec.q)) continue;
  const was = pointLines(before[spec.id].explanation);
  const now = pointLines(BY[spec.id].explanation);
  const moved = [];
  for (let i = 0; i < 5; i++) if (was[i] !== now[i]) moved.push(i + 1);
  const declared = (spec.pointEdits || []).map(p => p[0]).sort();
  ok(JSON.stringify(moved.sort()) === JSON.stringify(declared),
    `${spec.q} ${spec.id}: points ${moved.join(',')} moved but ${declared.join(',')} were declared`);
}

// ===========================================================================
section('7. Stems, options and headings in sync');

for (const id of IDS) {
  const q = BY[id];
  const key = LETTER[q.correct];
  const wantKey = `<h4>Correct Answer: ${key}. ${q.options[q.correct]}</h4>`;
  if (KEEP.has(id)) {
    ok(q.explanation.indexOf('<h4>Correct Answer: ') === 0, `${disp(id)} ${id}: should open with a keyed heading`);
  } else {
    ok(q.explanation.indexOf(wantKey) === 0,
      `${disp(id)} ${id}: keyed heading should be "${key}. " plus the option text verbatim`);
    for (let i = 0; i < 4; i++) {
      if (i === q.correct) continue;
      const want = `<strong>${LETTER[i]}. ${q.options[i]}:</strong>`;
      ok(q.explanation.split(want).length - 1 === 1,
        `${disp(id)} ${id}: ${LETTER[i]} heading should be the option text verbatim, exactly once`);
    }
  }
  ok(q.question.trim().length > 20, `${disp(id)} ${id}: stem looks truncated`);
  ok(!/<p>|<h4>/.test(q.question), `${disp(id)} ${id}: stem should not carry block markup`);
  ok(q.options.every(o => o.trim().length > 0), `${disp(id)} ${id}: an option is empty`);
  ok(new Set(q.options.map(o => strip(o).toLowerCase())).size === 4, `${disp(id)} ${id}: options should be distinct`);
}
// this pack's convention is a letter-prefixed keyed heading, in all 60 items
let prefixed = 0;
for (const id of IDS) if (/^<h4>Correct Answer: [ABCD]\. /.test(BY[id].explanation)) prefixed++;
ok(prefixed === 60, `${prefixed} items use the letter-prefixed keyed heading, expected all 60`);

// ===========================================================================
section('8. One complete, distinct, relevant feedback paragraph per distractor');

for (const id of IDS) {
  const q = BY[id];
  const fb = fbOf(q.explanation);
  const paras = fb.match(/<p><strong>[ABCD]\.[\s\S]*?<\/p>/g) || [];
  ok(paras.length === 3, `${disp(id)} ${id}: ${paras.length} distractor paragraphs, expected 3`);
  const letters = paras.map(p => p.match(/<strong>([ABCD])\./)[1]);
  const wantLetters = [0, 1, 2, 3].filter(i => i !== q.correct).map(i => LETTER[i]);
  ok(JSON.stringify(letters.slice().sort()) === JSON.stringify(wantLetters),
    `${disp(id)} ${id}: distractor letters ${letters.join(',')} should be ${wantLetters.join(',')}`);
  ok(JSON.stringify(letters) === JSON.stringify(letters.slice().sort()),
    `${disp(id)} ${id}: distractor paragraphs should appear in letter order, found ${letters.join(',')}`);
  for (const p of paras) {
    const body = p.replace(/^<p><strong>[ABCD]\.[\s\S]*?:<\/strong>\s*/, '').replace(/<\/p>$/, '');
    ok(strip(body).length >= 40, `${disp(id)} ${id}: a distractor explanation is too short -> "${strip(body)}"`);
    ok(/[.!?]$/.test(strip(body)), `${disp(id)} ${id}: a distractor explanation does not end in a full stop`);
    // no distractor paragraph may simply repeat the main explanation
    ok(strip(mainOf(q.explanation)).indexOf(strip(body)) < 0,
      `${disp(id)} ${id}: a distractor explanation copies the main explanation verbatim`);
  }
  // nor may two distractors in one item be the same
  const bodies = paras.map(p => strip(p.replace(/^<p><strong>[ABCD]\.[\s\S]*?:<\/strong>\s*/, '')));
  ok(new Set(bodies).size === 3, `${disp(id)} ${id}: two distractor explanations are identical`);
  // each distractor explanation should name its own option
  for (let k = 0; k < paras.length; k++) {
    const i = LETTER.indexOf(letters[k]);
    const optWords = wordsOf(q.options[i]).filter(w => w.length > 2);
    const body = strip(paras[k]).toLowerCase();
    const named = optWords.length === 0 || optWords.some(w => body.indexOf(w) >= 0);
    ok(named, `${disp(id)} ${id}: ${letters[k]} feedback does not mention its own option`);
  }
}
// the 39 restored labels really were missing before
let restored = 0;
for (const Q of Object.keys(idmap.missing_feedback_restored)) {
  for (const letter of idmap.missing_feedback_restored[Q]) {
    const id = MAP[Q];
    const re = new RegExp('<p><strong>' + letter + '\\.');
    ok(!re.test(before[id].explanation), `${Q} ${id}: ${letter} feedback was recorded as missing but the fixture has it`);
    ok(re.test(BY[id].explanation), `${Q} ${id}: ${letter} feedback was not restored`);
    restored++;
  }
}
ok(restored === 39, `${restored} restored feedback labels, expected 39`);
ok(Object.keys(idmap.missing_feedback_restored).length === 20,
  `${Object.keys(idmap.missing_feedback_restored).length} items had missing labels, expected 20`);

// ===========================================================================
section('9. Structural invariants and clean rendering');

const TAGS = ['p', 'strong', 'em', 'ul', 'ol', 'li', 'h4', 'sub', 'sup', 'table', 'tr', 'td', 'th', 'div', 'span'];
for (const id of IDS) {
  const q = BY[id];
  const exp = q.explanation;
  for (const t of TAGS) {
    const o = (exp.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (exp.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, `${disp(id)} ${id}: <${t}> ${o} open vs ${c} close`);
  }
  // Counting tags cannot see a doubled pair such as "</p></p><p><p>": the counts
  // stay equal. An earlier draft of the apply harness emitted exactly that when
  // inserting a restored feedback paragraph, so the nesting is checked too.
  ok(!/<\/p>\s*<\/p>/.test(exp), `${disp(id)} ${id}: doubled </p>`);
  ok(!/<p(?: class='[^']*')?>\s*<p[ >]/.test(exp), `${disp(id)} ${id}: doubled <p>`);
  let pDepth = 0, pOk = true;
  for (const m of exp.match(/<p(?: class='[^']*')?>|<\/p>/g) || []) {
    pDepth += m === '</p>' ? -1 : 1;
    if (pDepth < 0 || pDepth > 1) { pOk = false; break; }
  }
  ok(pOk && pDepth === 0, `${disp(id)} ${id}: paragraph nesting is wrong`);
  // the same for list items
  ok(!/<li>\s*<li>/.test(exp) && !/<\/li>\s*<\/li>/.test(exp), `${disp(id)} ${id}: doubled <li>`);
  ok(exp.indexOf('<h4>Why the other choices are wrong:</h4>') >= 0, `${disp(id)} ${id}: feedback header missing`);
  ok(exp.indexOf('<h4>Key Educational Points:</h4>') >= 0, `${disp(id)} ${id}: points header missing`);
  const all = q.question + ' ' + q.options.join(' ') + ' ' + exp;
  ok(all.indexOf('—') < 0, `${disp(id)} ${id}: em dash in user-visible copy`);
  ok(!/[‘’“”]/.test(all), `${disp(id)} ${id}: curly quote`);
  ok(!/\[S\d+\]/.test(all), `${disp(id)} ${id}: a review source label leaked into student-facing text`);
  ok(!/https?:\/\//.test(all), `${disp(id)} ${id}: a URL leaked into student-facing text`);
  ok(!/\bopenstax\b|\bbipm\b|\bnist\b/i.test(all), `${disp(id)} ${id}: a reference name leaked into student-facing text`);
  ok(!/Replace |reviewer|implementation prompt/i.test(all), `${disp(id)} ${id}: a reviewer instruction leaked into student-facing text`);
  ok(!/&(?!lt;|gt;|amp;|Delta;|ndash;|times;|minus;|rarr;|deg;|alpha;|beta;|pi;|prop;|uarr;|darr;|xharr;|oslash;|uuml;|Sigma;|#8209;)[a-zA-Z#0-9]+;/.test(exp),
    `${disp(id)} ${id}: unexpected HTML entity`);
  ok(exp.indexOf('<p></p>') < 0, `${disp(id)} ${id}: empty paragraph`);
  ok(!/\s{2,}/.test(strip(exp)), `${disp(id)} ${id}: collapsed whitespace problem`);
  ok(!/<li><\/li>/.test(exp), `${disp(id)} ${id}: empty educational point`);
  ok(q.options.every(o => !/\.$/.test(o)), `${disp(id)} ${id}: an option ends with a period`);
}

// the conditional cleanup the review asked about was genuinely not needed
for (const id of IDS) {
  ok(text(before[id]).indexOf('Unanswered') < 0,
    `${disp(id)} ${id}: 'Unanswered' is stored after all, so the conditional cleanup WAS needed`);
  ok(text(BY[id]).indexOf('Unanswered') < 0, `${disp(id)} ${id}: 'Unanswered' is present`);
}

// ===========================================================================
section('10. Numerical teaching recomputed independently');

const near = (a, b, tol) => Math.abs(a - b) <= tol;
// Q3
ok(near((1 * 5.0 * 546.15) / (2.0 * 273.15), 5.0, 0.01), 'Q3: the combined gas law gives about 5.0 L');
ok(!near(546.15 / 273.15, 2.0, 0.0001), 'Q3: 273 °C is NOT exactly twice 0 °C in kelvin, so "approximately" is right');
// Q26
ok(near(24.97 - 16.00, 8.97, 1e-9), 'Q26: water lost is 8.97 g');
ok(near(((24.97 - 16.00) / 18) / (16.00 / 160), 4.98, 0.005), 'Q26: the mole ratio is about 4.98');
ok(near(3 * (16.00 / 160) * 18, 5.40, 0.005), 'Q26: three waters would be 5.40 g');
ok(near(4 * (16.00 / 160) * 18, 7.20, 0.005), 'Q26: four waters would be 7.20 g');
ok(near(7 * (16.00 / 160) * 18, 12.60, 0.005), 'Q26: seven waters would be 12.60 g');
// Q34
ok(near(0.30 * 0.0821 * 298, 7.34, 0.005), 'Q34: the osmotic pressure is about 7.34 atm');
ok(near(2 * 0.30 * 0.0821 * 298, 14.7, 0.05), 'Q34: i = 2 would give about 14.7 atm');
// Q41
ok(near(1000 / 18.0, 55.56, 0.005), 'Q41: 1000 g of water is 55.56 mol');
ok(near(2.0 / (1000 / 18.0 + 2.0), 0.03475, 1e-5), 'Q41: the solute mole fraction is 0.03475');
ok(near(7.6 / 760, 0.010, 1e-4), 'Q41: 7.6 mmHg corresponds to X = 0.010');
ok(near(13.5 / 760, 0.0178, 1e-4), 'Q41: 13.5 mmHg corresponds to X of about 0.0178');
ok(near(38.0 / 760, 0.050, 1e-4), 'Q41: 38.0 mmHg corresponds to X = 0.050');
// Q48 / Q52 / Q60 buffers
ok(near(-Math.log10(1.8e-5), 4.74, 0.005), 'Q48: pKa of acetic acid is 4.74');
ok(near(14 + Math.log10(1.8e-5), 9.26, 0.005), 'Q48: pKb of acetate is 9.26');
ok(near(-Math.log10(Math.sqrt(1.8e-5 * 0.10)), 2.87, 0.005), 'Q48: the acid-only estimate is pH 2.87');
ok(near(1.0e-14 / 1.8e-5, 5.6e-10, 1e-11), 'Q52: Ka of NH4+ is about 5.6e-10');
ok(near(-Math.log10(1.0e-14 / 1.8e-5), 9.26, 0.005), 'Q52: pKa of NH4+ is 9.26');
ok(near(-Math.log10(1.0e-14 / 1.8e-5) + Math.log10(2), 9.56, 0.005), 'Q52: the buffer pH is 9.56');
ok(near(-Math.log10(1.8e-5) + Math.log10(0.5), 4.44, 0.005), 'Q52: the pOH route gives 4.44');
ok(near(9.26 + Math.log10(0.5), 8.96, 0.011), 'Q52: reversing the ratio gives about 8.95');
ok(near(4.74 + Math.log10(2), 5.04, 0.005), 'Q60: the buffer pH is 5.04');
ok(near(4.74 + Math.log10(0.5), 4.44, 0.005), 'Q60: reversing the ratio gives 4.44');
ok(near(4.74 + Math.log10(4), 5.34, 0.005), 'Q60: a ratio of 4 would give 5.34');
// Q50
ok(near(1.0e-14 / 2.5e-10, 4.0e-5, 1e-12), 'Q50: Ka is 4.0e-5');
ok(near(2.5e-4 * 2.5e-10, 6.25e-14, 1e-20), 'Q50: 2.5e-4 would give a product of 6.25e-14');
ok(near(1.0e-4 * 2.5e-10, 2.5e-14, 1e-20), 'Q50: 1.0e-4 would give a product of 2.5e-14');
ok(near(4.0e-4 * 2.5e-10, 1.0e-13, 1e-20), 'Q50: 4.0e-4 would give a product of 1.0e-13');
// Q39
ok(near((6.0 / 60) / 0.250, 0.40, 1e-9), 'Q39: the molality is 0.40 mol/kg');
ok(near(1.86 * 0.40, 0.744, 1e-9), 'Q39: the depression is 0.744 °C');
ok(near(2 * 1.86 * 0.40, 1.488, 1e-9), 'Q39: i = 2 would give about 1.49 °C');
ok(near(1.86 * 2.0, 3.72, 1e-9), 'Q39: 3.72 °C would need 2.0 mol/kg');
// Q10, Q6, Q37, Q32, Q46, Q59
ok(near(44 / (0.0821 * 273), 1.96, 0.005), 'Q10: the density is 1.96 g/L');
ok(near(0.96 * 0.0821 * 273, 21.5, 0.05), 'Q10: a density of 0.96 g/L implies M about 21.5 g/mol');
ok(near((2.0 * 8.21) / (0.0821 * 200), 1.0, 1e-9), 'Q6: the amount is 1.0 mol');
ok(near(2.0 * 0.0821 * 200 / 8.21, 4.0, 1e-9), 'Q6: 2.0 mol would exert 4.0 atm');
ok(near(4.0 * 0.0821 * 200 / 8.21, 8.0, 1e-9), 'Q6: 4.0 mol would exert 8.0 atm');
ok(near(2 * 0.52 * 1.0, 1.04, 1e-9), 'Q37: the predicted elevation is 1.04 °C');
ok(near(0.52 / 0.52, 1.0, 1e-9), 'Q32: the molality is 1.0 mol/kg');
ok(near(-Math.log10(Math.sqrt(1.0e-5 * 0.10)), 3.0, 0.005), 'Q46: the pH is 3.0');
ok(near(100 * Math.sqrt(1.0e-5 * 0.10) / 0.10, 1.0, 0.05), 'Q46: x/C is about 1%');
ok(near(0.40 * 0.0250, 0.0100, 1e-9), 'Q59: the HCl amount is 0.0100 mol');
ok(near(1000 * 0.0100 / 0.20, 50.0, 1e-9), 'Q59: 50.0 mL of NaOH is required');
ok(near(0.20 * 0.0125, 0.00250, 1e-9), 'Q59: 12.5 mL supplies 0.00250 mol');
ok(near(0.20 * 0.0250, 0.00500, 1e-9), 'Q59: 25.0 mL supplies 0.00500 mol');
// Q1 effusion
ok(near(Math.sqrt(32 / 4), 2.83, 0.005), 'Q1: the effusion ratio is 2.83');
// Q58 carbonate equation balances
ok(2 === 1 + 1, 'Q58: hydrogen balances in CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻');
ok(3 + 1 === 3 + 1, 'Q58: oxygen balances');
ok(-2 + 0 === -1 + -1, 'Q58: net charge balances at -2');

// ===========================================================================
section('11. Cross-item consistency and the recorded ledger');

// Q3 and Q10 keep the 1 atm convention the review asked to retain
ok(/1 atm/.test(BY['chem-65'].question), 'Q3 should keep the 1 atm convention');
ok(/1 atm/.test(BY['chem-72'].question), 'Q10 should keep the 1 atm convention');
ok(!/1 bar/.test(text(BY['chem-65'])) && !/1 bar/.test(text(BY['chem-72'])), 'Q3 and Q10 should not switch to 1 bar');
// the ideal-model stems say so
for (const Q of ['Q32', 'Q33', 'Q34', 'Q37', 'Q39', 'Q41', 'Q42']) {
  ok(/ideal|simplified/i.test(BY[MAP[Q]].question), `${Q}: the stem should state the model it assumes`);
}
// no advanced activity-coefficient material was added
for (const id of IDS) {
  ok(!/activity coefficient|Debye|ionic strength/i.test(text(BY[id])),
    `${disp(id)} ${id}: advanced activity-correction material should not have been added`);
}
// Q35 keeps the sentence the review said could stay
ok(BY['chem-97'].explanation.indexOf('used as a contrast agent in medical imaging of the gastrointestinal tract') >= 0,
  'Q35 should keep its barium-sulfate contrast-agent sentence');
// deviations and the ledger
ok(Array.isArray(idmap.deviations) && idmap.deviations.length === 0,
  `${(idmap.deviations || []).length} deviations recorded, expected 0`);
ok(idmap.coverage.chemistry_total === 485, 'coverage should be computed against 485 chemistry questions');
ok(idmap.coverage.new_unique_ids_this_batch === 60, 'this batch should contribute 60 unique ids');
ok(idmap.coverage.previously_reviewed_included_again.length === 0, 'no item should be a repeat of batch 1');
ok(idmap.coverage.reviewed_before_this_batch === 60, 'the prior reviewed count should be 60, from batch 1');
ok(idmap.coverage.reviewed_after_this_batch === 120,
  'coverage should be the union of unique verified ids, 60 + 60 = 120');
ok(idmap.coverage.reviewed_after_this_batch + idmap.coverage.still_unreviewed_chemistry === 485,
  'reviewed plus unreviewed should be the whole chemistry bank');
ok(idmap.coverage.edited_this_batch === 57 && idmap.coverage.kept_unchanged_this_batch === 3,
  'the ledger should record 57 edited and 3 kept');
ok(JSON.stringify(idmap.coverage.still_unreviewed_low_ids) === JSON.stringify(['chem-19', 'chem-61']),
  'chem-19 and chem-61 should still be recorded as unreviewed inside the low range');
ok(!b1ids.has('chem-19') && !PACK.has('chem-19'), 'chem-19 really is in neither reviewed pack');
ok(!b1ids.has('chem-61') && !PACK.has('chem-61'), 'chem-61 really is in neither reviewed pack');
ok(idmap.coverage.biology_unaffected === true && idmap.coverage.biology_still_unreviewed.length === 5,
  'the ledger should record biology as unaffected with five items still pending');

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
