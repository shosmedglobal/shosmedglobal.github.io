/**
 * Verifies the result of chemistry review batch 3 against the review's own
 * requirements, independently of the script that applied it.
 *
 *   node test/chem-review-batch3.test.js
 *
 * The supplied export carried no bank ids, so section 1 re-derives the id map
 * from the ORIGINAL stems and options in the before-fixture rather than
 * trusting scripts/chem-review-batch3-idmap.json. Twenty-one stems and two
 * option texts were replaced by this pass, so the signatures must come from the
 * fixture, not from live data.
 *
 * Two chemistry items in this pack share their option set with another record
 * (Q6/chem-127 with Q55/chem-176, and Q8/chem-129 with chem-118), so the
 * four-option signature is checked TOGETHER with a distinctive stem phrase.
 * Neither identification is ambiguous once both are used.
 *
 * Section 4's "claim removed" assertions are each paired with a check that the
 * claim really was in the before-fixture, so a typo cannot make an assertion
 * pass vacuously.
 *
 * The review asked for proportionate checks using the existing project tools
 * and explicitly asked NOT to build a large new testing or mutation framework
 * for this prose pass. This suite therefore follows the shape of the existing
 * per-batch suites and is sized to the 60-item pack.
 */
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
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch3-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch3-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch3-idmap.json'), 'utf8'));
const batch1 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch1-idmap.json'), 'utf8'));
const batch2 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch2-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/chem-batch3-edits-a.js'),
  require('../scripts/chem-batch3-edits-b.js'),
  require('../scripts/chem-batch3-edits-c.js'),
  require('../scripts/chem-batch3-edits-d.js'),
  require('../scripts/chem-batch3-edits-e.js'),
  require('../scripts/chem-batch3-edits-f.js')
);

const BY = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
const MAP = idmap.map;
const QS = Object.keys(MAP);
const IDS = QS.map(k => MAP[k]);
const PACK = new Set(IDS);
const KEEP = new Set(idmap.keep_unchanged_per_review);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const disp = id => QS.find(n => MAP[n] === id);
const rec = Q => BY[MAP[Q]];
const pre = Q => { const r = Object.assign({}, before[Q]); delete r.q; return r; };
const allText = q => q.question + '\u0001' + q.options.join('\u0001') + '\u0001' + q.explanation;
const FB_H = '<h4>Why the other choices are wrong:</h4>';
const PT_H = '<h4>Key Educational Points:</h4>';
const mainOf = e => e.split(FB_H)[0];
const fbOf = e => e.split(FB_H)[1].split(PT_H)[0];
const pointLines = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>[\s\S]*?<\/li>/g) || []).map(li => li.replace(/<\/?li>/g, '')) : [];
};
const bottomOf = e => {
  const m = e.match(/<p class='exp-key'>Bottom Line: ([\s\S]*?)<\/p>/);
  return m ? m[1] : '';
};
const fbParas = e => (fbOf(e).match(/<p><strong>[ABCD]\.[\s\S]*?<\/p>/g) || []);
const fbFor = (e, L) => {
  const m = fbOf(e).match(new RegExp('<p><strong>' + L + '\\.[\\s\\S]*?</p>', 'g')) || [];
  return m;
};
const close = (a, b, tol) => Math.abs(a - b) <= tol;

// The pre-pass bank: the before-fixture inside the pack, live records outside
// it. Records outside the pack are unchanged by this pass (section 3 proves
// that separately), so this reconstruction is the bank as the review saw it.
const PRE = {};
for (const q of data.chemistry) if (!PACK.has(q.id)) PRE[q.id] = q;
for (const Q of QS) PRE[MAP[Q]] = pre(Q);

console.log('chemistry review batch 3: verifying the applied result');

// ---------------------------------------------------------------------------
section('1. the id map, re-derived from the ORIGINAL stems and options');
// [display, distinctive phrase from the ORIGINAL stem, ORIGINAL keyed option]
const SIG = [
  ['Q1', 'molar mass of Ca(OH)2', '74 g/mol'],
  ['Q2', 'what is the expression for Kc', '[NH₃]<sup>2</sup> / ([N₂][H₂]<sup>3</sup>)'],
  ['Q3', 'if more O₂ is added at equilibrium', 'Equilibrium shifts right, producing more SO₃'],
  ['Q4', 'what is the relationship to Kc if Δn(gas) = -2', 'Kp < Kc'],
  ['Q5', 'If the temperature of an exothermic reaction at equilibrium is increased', 'Toward reactants'],
  ['Q6', 'A first-order reaction has a rate constant k = 0.0693', '10 min'],
  ['Q7', 'If the concentration of A is doubled while B remains constant', '4'],
  ['Q8', 'What is the overall order of a reaction with rate law', '3'],
  ['Q9', 'A catalyst is added that lowers Ea to 30 kJ/mol', 'The reaction rate increases but Kc is unchanged'],
  ['Q10', 'If the temperature increases from 300 K to 310 K and Ea = 80 kJ/mol', 'Approximately double'],
  ['Q11', 'Step 1 (slow): A -> D', 'rate = k[A]'],
  ['Q12', 'A reaction has Kc = 4.0 x 10', 'Reactants are heavily favored at equilibrium'],
  ['Q13', 'For a zero-order reaction, which statement is correct', 'The rate is independent of reactant concentration'],
  ['Q14', 'The reaction quotient Q is calculated to be 5.0', 'Toward reactants (left)'],
  ['Q15', 'For an endothermic reaction at equilibrium, increasing the temperature', 'Increase K'],
  ['Q16', 'A second-order reaction has a rate constant k = 0.040', '50 s'],
  ['Q17', 'Adding an inert gas to an equilibrium mixture of gases at constant volume', 'Have no effect on the equilibrium position'],
  ['Q18', 'The rate of a reaction is found to triple', '1'],
  ['Q19', 'In a reaction mechanism, what is an intermediate', 'A species produced in one step and consumed in a later step'],
  ['Q20', 'what happens when the volume of the container is decreased', 'Equilibrium shifts toward reactants (PCl5)'],
  ['Q21', 'Reaction 1 has Ea = 40 kJ/mol', 'Cannot be determined without knowing the pre-exponential factor'],
  ['Q22', 'which species is oxidized', 'Zn'],
  ['Q23', 'oxidation occurs at the', 'Anode'],
  ['Q24', 'what is E<sub>cell</sub> for a Zn-Cu galvanic cell', '1.10 V'],
  ['Q25', 'The Nernst equation is E =', '1.10 V'],
  ['Q26', 'During the electrolysis of molten NaCl, what is produced at the cathode', 'Na metal'],
  ['Q27', "According to Faraday's first law", '1.0 mol'],
  ['Q28', 'Which of the following is the strongest oxidizing agent', 'F2'],
  ['Q29', 'What is the oxidation state of sulfur in H₂SO₄', '+6'],
  ['Q30', 'In corrosion of iron, which reaction occurs at the anodic region', 'Fe -> Fe<sup>2</sup>+ + 2e-'],
  ['Q31', 'A current of 5.0 A is passed through a solution of AgNO3', '5.40 g'],
  ['Q32', 'Which of the following reactions is a disproportionation reaction', '2 H<sub>2</sub>O₂ -> 2 H₂O + O₂'],
  ['Q33', 'What is the standard cell potential for a galvanic cell made from Al', '1.41 V'],
  ['Q34', 'what is the change in oxidation state of Mn', '+7 to +2 (reduction by 5)'],
  ['Q35', 'Which method protects iron from corrosion by using a more active metal', 'Galvanizing (coating with zinc)'],
  ['Q36', 'The enthalpy change for the reaction C(s) + O₂(g) -> CO₂(g)', 'Exothermic'],
  ['Q37', 'what is ΔH for C + 1/2 O₂ -> CO', '-110 kJ'],
  ['Q38', 'A 50.0 g sample of water absorbs 4180 J of heat', '20 degrees C'],
  ['Q39', 'The bond energies of H-H, Cl-Cl, and H-Cl', '-183 kJ'],
  ['Q40', 'For a spontaneous process at all temperatures', 'ΔH < 0, ΔS > 0'],
  ['Q41', 'What is ΔG at 25 degrees C (298 K)', '-40.4 kJ'],
  ['Q42', 'Which of the following processes has a positive entropy change', 'Solid dissolving in water to form ions'],
  ['Q43', 'A reaction is non-spontaneous at 25 degrees C', '500 K'],
  ['Q44', 'When 200 mL of 1.0 M HCl is mixed with 200 mL of 1.0 M NaOH', '-56.8 kJ/mol'],
  ['Q45', 'According to the third law of thermodynamics', 'Zero'],
  ['Q46', 'Which type of radioactive decay involves the emission of a helium-4 nucleus', 'Alpha decay'],
  ['Q47', 'In beta-minus decay, a neutron is converted into', 'A proton, an electron, and an antineutrino'],
  ['Q48', 'Gamma radiation differs from alpha and beta radiation', 'Are electromagnetic waves with no mass or charge'],
  ['Q49', 'If you start with 64 g, how much remains after 24 days', '8 g'],
  ['Q50', 'What particle completes this nuclear equation', 'Alpha particle (He-4)'],
  ['Q51', 'Nuclear fission involves', 'Splitting a heavy nucleus into lighter nuclei'],
  ['Q52', 'In nuclear fusion, energy is released when', 'Light nuclei combine to form heavier nuclei'],
  ['Q53', 'The binding energy per nucleon is highest for nuclei near which element', 'Iron (Fe-56)'],
  ['Q54', 'Carbon-14 dating works because C-14', 'Has a half-life of 5,730 years and is incorporated into living organisms'],
  ['Q55', 'A radioactive sample has an activity of 800 Bq', '10 min'],
  ['Q56', 'Which set of quantum numbers is permissible', 'n=3, l=2, mₗ=−1, mₛ=−½'],
  ['Q57', 'How many unpaired electrons are present in a ground-state nitrogen atom', '3'],
  ['Q58', 'Which of the following atoms has the largest atomic radius', 'K'],
  ['Q59', 'The isotopes ³⁵Cl and ³⁷Cl differ in their number of', 'neutrons'],
  ['Q60', 'the third principal energy level (n=3)', '18']
];
ok(SIG.length === 60, `${SIG.length} signatures, expected 60`);
ok(Object.keys(MAP).length === 60, 'the id map should have 60 entries');

const optSig = r => r.options.join('\u0001');
let derivedKeys = '';
for (const [Q, phrase, keyed] of SIG) {
  const id = MAP[Q];
  const r = PRE[id];
  ok(!!r, `${Q}: ${id} is not in the bank`);
  if (!r) { derivedKeys += '?'; continue; }
  ok(r.question.indexOf(phrase) >= 0, `${Q} ${id}: the original stem should contain "${phrase}"`);
  ok(r.options[r.correct] === keyed, `${Q} ${id}: original keyed option is "${r.options[r.correct]}", expected "${keyed}"`);
  const both = Object.keys(PRE).filter(k =>
    PRE[k].question.indexOf(phrase) >= 0 && optSig(PRE[k]) === optSig(r));
  ok(both.length === 1 && both[0] === id,
    `${Q}: the stem phrase plus the four original options match ${both.length} records (${both.join(', ')})`);
  ok(r.options.length === 4, `${Q} ${id}: should have four options`);
  ok(new Set(r.options).size === 4, `${Q} ${id}: the four original options should be distinct`);
  derivedKeys += LETTER[r.correct];
}
ok(derivedKeys === idmap.asserted_key_block,
  `the key block derived from the bank is ${derivedKeys}, the review asserts ${idmap.asserted_key_block}`);
const tally = { A: 0, B: 0, C: 0, D: 0 };
for (const c of derivedKeys) tally[c]++;
ok(JSON.stringify(tally) === JSON.stringify(idmap.asserted_key_tally),
  `derived tally ${JSON.stringify(tally)} vs asserted ${JSON.stringify(idmap.asserted_key_tally)}`);
ok(derivedKeys === 'CCCDCBBABAABCDADBDAAABBBBDBDDBDCBABDCBACDDBDCBABADDCDCBBCDCB',
  'the derived key block should equal the review\'s printed sequence');

// the overlap the review warned about, and no other
const b1ids = new Set(Object.values(batch1.map || batch1.id_map || {}));
const b2ids = new Set(Object.values(batch2.map));
ok(b2ids.has('chem-76'), 'chem-76 should be a chemistry batch 2 id');
ok(MAP.Q1 === 'chem-76', 'Q1 should map to chem-76, the item batch 2 reviewed as its Q14');
ok(batch2.map.Q14 === 'chem-76', 'batch 2 display Q14 should be chem-76');
const overlaps = QS.filter(Q => b1ids.has(MAP[Q]) || b2ids.has(MAP[Q]));
ok(overlaps.length === 1 && overlaps[0] === 'Q1',
  `overlap with earlier packs should be Q1 alone, found ${overlaps.join(', ')}`);
const nums = IDS.map(id => Number(id.split('-')[1])).sort((a, b) => a - b);
ok(nums[0] === 76, 'the lowest id in the pack should be chem-76');
ok(nums[1] === 123 && nums[nums.length - 1] === 181,
  'the 59 new ids should run chem-123..chem-181');
ok(nums.length === 60 && new Set(nums).size === 60, 'the 60 mapped ids should be distinct');
for (let i = 2; i < nums.length; i++)
  ok(nums[i] === nums[i - 1] + 1, `chem-${nums[i - 1]} and chem-${nums[i]} should be consecutive`);
// only one calcium-hydroxide record exists, which is what made Q1 unambiguous
const caOH = data.chemistry.filter(q => /Ca\(OH\)/.test(q.question));
ok(caOH.length === 1 && caOH[0].id === 'chem-76',
  `expected exactly one Ca(OH)2 record, found ${caOH.map(q => q.id).join(', ')}`);

// ---------------------------------------------------------------------------
section('2. applied scope: 57 edited, 3 byte-identical, 21 stems, 2 options');
const changed = [], same = [];
for (const Q of QS) {
  (JSON.stringify(pre(Q)) === JSON.stringify(rec(Q)) ? same : changed).push(Q);
}
ok(changed.length === 57, `${changed.length} items changed, expected 57`);
ok(same.length === 3 && same.join(',') === 'Q1,Q37,Q41',
  `byte-identical items should be Q1, Q37, Q41; found ${same.join(', ')}`);
for (const Q of same) ok(KEEP.has(MAP[Q]), `${Q} ${MAP[Q]} should be in the keep list`);
ok(KEEP.size === 3, 'the keep list should hold three ids');

const stems = QS.filter(Q => pre(Q).question !== rec(Q).question);
const srt = a => a.slice().sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
ok(stems.length === 21, `${stems.length} stems replaced, expected 21`);
ok(JSON.stringify(srt(stems)) === JSON.stringify(srt(idmap.stem_changes)),
  `stem inventory ${srt(stems).join(',')} vs declared ${srt(idmap.stem_changes).join(',')}`);
const optChanges = {};
for (const Q of QS) {
  pre(Q).options.forEach((o, i) => {
    if (o !== rec(Q).options[i]) (optChanges[Q] = optChanges[Q] || []).push(LETTER[i]);
  });
}
ok(JSON.stringify(optChanges) === JSON.stringify({ Q10: ['A'], Q42: ['D'] }),
  `option changes ${JSON.stringify(optChanges)} vs expected {"Q10":["A"],"Q42":["D"]}`);
ok(rec('Q10').options[0] === 'Increase by a factor of approximately 2.81',
  'Q10 option A should read "Increase by a factor of approximately 2.81"');
ok(rec('Q42').options[3] === 'An ideal gas expanding into a larger volume',
  'Q42 option D should read "An ideal gas expanding into a larger volume"');
for (const Q of QS) {
  ok(pre(Q).correct === rec(Q).correct, `${Q} ${MAP[Q]}: the answer letter moved`);
  ok(pre(Q).id === rec(Q).id, `${Q}: the id changed`);
  ok(pre(Q).options.length === rec(Q).options.length, `${Q}: the option count changed`);
}
ok(EDITS.length === 57, `${EDITS.length} edit specs, expected 57`);
ok(new Set(EDITS.map(s => s.id)).size === 57, 'the edit specs should cover 57 distinct ids');
for (const s of EDITS) ok(!KEEP.has(s.id), `${s.q}: a keep-unchanged id should have no spec`);

// ---------------------------------------------------------------------------
section('3. nothing outside the pack changed');
let bioDrift = 0;
ok(Object.keys(untouched.biology).length === 626, 'the fixture should hash the 626 biology items the final pack did not review');
for (const q of data.biology) { /* the final pack reviewed bio-12, bio-346 and bio-518, pruned from this fixture */
  if (untouched.biology[q.id] === undefined) continue;
  if (untouched.biology[q.id] !== hash(q)) { bioDrift++; console.error('  FAIL biology ' + q.id + ' changed'); } }
checks++; if (bioDrift) failures++;
let chemDrift = 0;
for (const q of data.chemistry) {
  if (PACK.has(q.id)) continue;
  if (!untouched.chemistry[q.id]) continue;   // pruned by a later reviewed batch
  if (untouched.chemistry[q.id] !== hash(q)) { chemDrift++; console.error('  FAIL chemistry ' + q.id + ' changed but is outside the pack'); }
}
checks++; if (chemDrift) failures++;
const nChem = Object.keys(untouched.chemistry).length;
/* NOTE: the final review pack (chem-19, chem-61, chem-478..chem-485, bio-12,
   bio-346, bio-518) was pruned from this fixture, so its hash counts step down.
   Drift sweeps skip ids the fixture no longer holds. */
ok(nChem === 119, `${nChem} out-of-pack chemistry hashes, expected 119 after the final-pack prune`);
ok(nChem + 60 + 60 + 60 + 60 + 60 + 56 + 10 === 485, 'the out-of-pack set, this pack, the new ids of chemistry batches 4 to 8 and the final pack should be the whole chemistry bank');
ok(data.biology.length === 629 && data.chemistry.length === 485, 'bank counts should be 629 and 485');
for (const id of IDS) ok(!(id in untouched.chemistry), `${id} is both in the pack and in the untouched set`);

// ---------------------------------------------------------------------------
section('4. the specified repairs, each paired with a non-vacuity check');
// [display, text that must be gone, text that must now be present]
const REPAIRS = [
  ['Q2', 'only gases and aqueous species', 'their activities are treated as constant'],
  ['Q2', 'Chemical equilibrium is dynamic', 'Reversing the reaction replaces K by 1/K'],
  ['Q3', 'Le Chatelier', 'Qc falls below Kc, so more SO₃ forms'],
  ['Q3', 'the system will shift to counteract this change', 'Qc = [SO₃]²/([SO₂]²[O₂])'],
  ['Q4', 'When Δn is negative (fewer gas moles in products), Kp < Kc.', 'Kc = 0.50 × 606.6 ≈ 303.3'],
  ['Q4', 'the sign of Δn alone decides whether Kp is larger or smaller', 'not a rule based on Δn alone'],
  ['Q4', 'The actual values of Kp, R and T are not needed', 'the conversion can be calculated'],
  ['Q5', 'Pressure and temperature are independent variables', 'Heating favors the endothermic direction'],
  ['Q5', 'Reaction rate depends on concentration, temperature, surface area', 'K decreases as temperature increases for the exothermic forward reaction'],
  ['Q6', 'which is for second-order reactions', 'Twenty minutes is two half-lives'],
  ['Q7', "Le Chatelier's principle: a system at equilibrium", 'the reaction is second order with respect to A'],
  ['Q8', 'Perhaps this comes from multiplying the orders', 'An overall order of 4 would require exponents whose sum is 4'],
  ['Q9', 'both forward and reverse reactions equally', 'It catalyzes both forward and reverse interconversion'],
  ['Q9', 'Catalysts provide an alternative reaction pathway with a lower energy barrier.', 'It is regenerated in the catalytic cycle'],
  ['Q10', 'Approximately double', 'Increase by a factor of approximately 2.81'],
  ['Q10', 'rule of thumb that reaction rates double for every 10 degree C increase', 'the doubling-per-10-K shortcut is not a universal law'],
  ['Q10', 'gives approximately 2 for these values', '2.81'],
  ['Q11', 'This would imply the slow step involves two molecules of A colliding', 'A rate proportional to [D] describes the fast elementary second step'],
  ['Q11', 'The slow step acts as a bottleneck', 'D is an intermediate because it is formed and then consumed'],
  ['Q12', 'Kc = 1 means roughly equal amounts', 'the equilibrium ratio [B]/[A] is only 0.004'],
  ['Q12', 'which is essentially impossible thermodynamically', 'Kc does not specify'],
  ['Q13', 'This occurs in enzyme-catalyzed reactions at saturation', 'over the range in which the zero-order rate law applies'],
  ['Q13', 'Chemical equilibrium is dynamic', '[A]₀/(2k)'],
  ['Q14', 'When Q > Kc, there are more products than at equilibrium', 'Qc has the same concentration expression as Kc but uses the current concentrations'],
  ['Q15', 'which only happens at one specific temperature for a given reaction', 'There is no reason it must become exactly 1'],
  ['Q16', 'A second-order reaction has a rate constant', '−d[A]/dt = k[A]²'],
  ['Q17', 'Adding an inert gas to an equilibrium mixture of gases at constant volume will', 'both temperature and container volume are held constant'],
  ['Q17', 'the position of equilibrium is unaffected.</p>', 'unaffected under these conditions'],
  ['Q18', 'Third-order reactions are quite rare in practice.', 'Hold temperature and other reactant concentrations fixed'],
  ['Q19', 'Le Chatelier', 'A catalyst is regenerated overall; an intermediate is generated along the pathway'],
  ['Q20', 'Kc depends only on temperature, never on pressure or volume changes.', 'In the stated fixed-temperature ideal-gas model'],
  ['Q21', 'However, if A values are similar', 'an unknown difference in A prevents a definite conclusion'],
  ['Q21', 'Both are at the same temperature. Which reaction is faster?', 'equal reactant concentrations'],
  ['Q22', 'Standard electrode potentials (E°) predict spontaneity', 'Cu²⁺ gains those electrons and is reduced to Cu'],
  ['Q23', 'Electrochemistry has major applications', 'ions carry charge through the electrolyte and salt bridge'],
  ['Q24', 'Always assign the electrode with the more positive reduction potential as the cathode.', 'do not multiply electrode potentials by stoichiometric coefficients'],
  ['Q24', 'A positive E<sub>cell</sub> indicates a spontaneous reaction in a galvanic cell.', 'thermodynamically favored under standard conditions'],
  ['Q25', 'When all species are at standard conditions (1 M, 1 atm)', 'it need not mean equilibrium'],
  ['Q26', 'In electrolysis, cations are reduced at the cathode and anions are oxidized at the anode.', 'water can participate'],
  ['Q27', 'how many moles of Cu are deposited by passing 2 Faradays', 'all the charge is used for'],
  ['Q28', 'Conversely, the species with the most negative reduction potential is the strongest reducing agent.', 'Zn metal is the reducing agent associated with Zn²⁺/Zn, not Zn²⁺ itself'],
  ['Q29', 'The maximum oxidation state for a main-group element equals its group number.', '2(+1) + S + 4(−2) = 0 gives S = +6'],
  ['Q30', 'Corrosion requires both oxygen and water (moisture) to proceed.', 'oxygen is not required for every corrosion mechanism'],
  ['Q30', 'The Fe<sup>2</sup>+ eventually forms rust', 'iron oxides and oxyhydroxides commonly called rust'],
  ['Q31', 'How many grams of silver (M=108) are deposited?', '100% current efficiency'],
  ['Q32', 'the same element acts as both the oxidizing and reducing agent', 'the same starting species supplies the element that is both oxidized and reduced'],
  ['Q33', 'The more active metal (more negative E) is always the anode in a galvanic cell.', 'Nonstandard concentrations can affect actual electrode potentials'],
  ['Q33', 'Standard cell potentials for galvanic cells must be positive.', 'not cathode minus anode'],
  ['Q34', 'but in acidic conditions (with H⁺), Mn is fully reduced to Mn²⁺', 'this question explicitly specifies Mn²⁺'],
  ['Q34', 'The number of electrons in a half-reaction equals the change in oxidation state.', 'electron totals also account for how many atoms undergo the change'],
  ['Q35', 'Cathodic protection specifically requires a more reactive metal', 'another uses an externally supplied electrical current'],
  ['Q36', 'Exothermic reactions feel hot to the touch', 'the reaction can be kept at constant temperature if that heat is removed'],
  ['Q36', 'Combustion reactions such as this one are always strongly exothermic.', 'with only pressure-volume work'],
  ['Q38', '50 °C comes from dividing the heat by the mass alone', 'Use ΔT = q/(mc) to obtain 20 °C'],
  ['Q39', 'Bond energies are averages taken across many compounds', 'uses gas-phase bond enthalpies and the specified bonds'],
  ['Q39', '862 kJ is the energy released in forming the two H', 'its contribution is −862 kJ, not +862 kJ'],
  ['Q40', 'An exothermic reaction with increasing entropy is always spontaneous.', 'treating ΔH and ΔS as temperature-independent'],
  ['Q42', 'Solid dissolving in water to form ions', 'An ideal gas expanding into a larger volume'],
  ['Q42', 'so the entropy change is positive', 'changes in solvent organization also contribute'],
  ['Q42', 'Physical state is a reliable guide', 'Isothermal expansion increases the entropy of an ideal gas'],
  ['Q43', '250 K would follow from a unit slip', 'At 250 K, ΔG = 50 kJ − 250 K × 0.100 kJ/K = +25 kJ'],
  ['Q43', 'A reaction is non-spontaneous at 25 degrees C', 'At exactly 500 K, ΔG = 0'],
  ['Q44', 'The standard enthalpy of neutralization for strong acid + strong base is approximately -57 kJ/mol.', 'q_reaction ≈ −11.37 kJ'],
  ['Q44', 'Any strong acid with any strong base gives close to', 'not every acid/base mixture under all conditions'],
  ['Q45', 'whereas enthalpies are only ever quoted as changes', 'tabulated enthalpies instead use a chosen reference convention'],
  ['Q45', 'real crystals with defects or disorder retain some residual entropy at 0 K', 'Frozen-in disorder can lead to residual entropy'],
  ['Q46', 'Alpha particles are the heaviest and least penetrating form of radiation', 'alpha particles have the largest rest mass'],
  ['Q46', 'makes external alpha sources relatively harmless', 'inhaled or ingested alpha emitters can irradiate living tissue directly'],
  ['Q46', 'high-energy photon with neither mass nor charge', 'zero rest mass and no charge'],
  ['Q47', 'This would not conserve charge or mass.', 'would have net charge +1, whereas the neutron is uncharged'],
  ['Q48', 'Because no particle leaves the nucleus', 'no proton or neutron is removed'],
  ['Q48', 'Ionising power and penetrating power run opposite to one another', 'rather than a universal inverse law'],
  ['Q48', 'Gamma rays have the highest penetrating power and require thick lead or concrete shielding.', 'generally more penetrating than typical alpha or beta radiation'],
  ['Q49', 'exactly half of the remaining radioactive material decays', 'on average, half the undecayed nuclei remain'],
  ['Q49', 'so the amount approaches but never reaches zero', 'Individual nuclei decay at random times'],
  ['Q49', 'is unaffected by temperature, pressure, or chemical combination', 'do not appreciably change most radioactive decay rates'],
  ['Q50', 'thorium-237', 'the daughter would be U-237'],
  ['Q50', 'The emitted particle has mass 4 and charge +2', 'mass number 4 and charge +2'],
  ['Q50', 'Conservation of mass number and atomic number must hold in all nuclear equations.', 'including the emitted particles'],
  ['Q50', 'A beta particle has essentially no mass number', 'despite having a small nonzero rest mass'],
  ['Q51', 'Both release enormous energy.', 'when their products are more tightly bound overall'],
  ['Q51', 'releasing neutrons and a large amount of energy.</li>', 'for heavy fuel nuclei such as U-235'],
  ['Q52', 'Neutron absorption by uranium triggers fission, not fusion.', 'absorption is not always followed by splitting'],
  ['Q52', 'It releases far less energy than fusion', 'no blanket energy ranking is needed'],
  ['Q52', 'Fusion produces more energy per unit mass than fission but requires extremely high temperatures', 'This comparison is not a universal rule for every fusion reaction'],
  ['Q53', 'making it the most stable nucleus', 'Ni-62, not Fe-56, has the highest binding energy per nucleon'],
  ['Q53', 'Binding energy per nucleon peaks at iron-56', 'broad maximum in the iron-nickel region'],
  ['Q53', 'This is why iron is the end product of stellar nucleosynthesis in massive stars.', 'Massive stars can build iron-group cores'],
  ['Q54', 'maintaining a constant C-14/C-12 ratio', 'radiocarbon ages are calibrated'],
  ['Q54', 'It only works on once-living material', 'specialized applications to inorganic carbon also exist'],
  ['Q54', 'the method applies to once-living material rather than to rocks', 'such as dissolved carbon in groundwater'],
  ['Q55', 'the actual initial activity is not needed to find the half-life', 'both activity readings are needed'],
  ['Q55', 'A radioactive sample has an activity of 800 Bq. After 30 minutes', 'The activity of a single radioactive isotope falls from 800 Bq to 100 Bq'],
  ['Q56', 'Option A: n=2, l=2 is invalid because l must be less than n.', 'For n = 2, l can only be 0 or 1'],
  ['Q56', 'Atomic structure determines chemical behavior', 'takes the 2l+1 integer values'],
  ['Q57', 'electrons fill each orbital singly before pairing up', 'each of the three equal-energy 2p orbitals singly before pairing up'],
  ['Q58', 'na &gt; mg &gt; al', 'K has its outer electron in the next principal shell'],
  ['Q58', 'decreases going <strong>across a period</strong> (greater nuclear charge', 'generally decreases going <strong>across a period</strong>'],
  ['Q59', 'Their differences (mass, nuclear stability) are physical, not chemical.', 'their chemistry is not required to be exactly identical'],
  ['Q59', 'they exhibit essentially identical chemical behavior', 'differing masses can still lead to isotope effects'],
  ['Q60', 'This might come from n² = 9, forgetting to multiply by 2.', 'Nine is the number of orbitals in the n = 3 shell'],
  ['Q60', 'distributed among s, p, d, and f subshells', 'shell capacity is different from the order in which subshells are filled']
];
for (const [Q, gone, present] of REPAIRS) {
  const was = allText(pre(Q));
  const now = allText(rec(Q));
  ok(was.indexOf(gone) >= 0, `${Q} ${MAP[Q]}: "${gone.slice(0, 60)}" was not in the before-fixture, so the removal check is vacuous`);
  ok(now.indexOf(gone) < 0, `${Q} ${MAP[Q]}: "${gone.slice(0, 60)}" should be gone`);
  ok(now.indexOf(present) >= 0, `${Q} ${MAP[Q]}: "${present.slice(0, 60)}" should be present`);
}

// universal claims the review banned, swept across the whole pack
const BANNED = [
  'the same element acts as both the oxidizing and reducing agent',
  'is always the anode in a galvanic cell',
  'The maximum oxidation state for a main-group element equals its group number',
  'Corrosion requires both oxygen and water',
  'exactly half of the remaining radioactive material',
  'never reaches zero',
  'unaffected by temperature, pressure, or chemical combination',
  'Because no particle leaves the nucleus',
  'the heaviest and least penetrating form of radiation',
  'Third-order reactions are quite rare',
  'Neutron absorption by uranium triggers fission',
  'constant C-14/C-12 ratio',
  'It only works on once-living material',
  'making it the most stable nucleus',
  'so the entropy change is positive',
  'rule of thumb that reaction rates double',
  'means roughly equal amounts',
  'Standard cell potentials for galvanic cells must be positive',
  'Cathodic protection specifically requires a more reactive metal',
  'Bond energies are averages taken across many compounds',
  'only ever quoted as changes',
  'feel hot to the touch',
  'increasing entropy is always spontaneous',
  'thorium-237',
  'Ionising power and penetrating power run opposite',
  'distributed among s, p, d, and f subshells',
  'physical, not chemical',
  'both forward and reverse reactions equally'
];
for (const claim of BANNED) {
  const wasIn = QS.filter(Q => allText(pre(Q)).indexOf(claim) >= 0);
  ok(wasIn.length > 0, `the banned claim "${claim.slice(0, 50)}" was not in the before-fixture at all`);
  const stillIn = QS.filter(Q => allText(rec(Q)).indexOf(claim) >= 0);
  ok(stillIn.length === 0, `the banned claim "${claim.slice(0, 50)}" survives in ${stillIn.join(', ')}`);
}

// ---------------------------------------------------------------------------
section('5. the items the review singled out');
// Q42: the major rewrite
const q42 = rec('Q42');
ok(/constant temperature/.test(q42.question) && /treat any gas as ideal/.test(q42.question),
  'Q42: the new stem should state the constant-temperature and ideal-gas conditions');
ok(q42.options[3] === 'An ideal gas expanding into a larger volume', 'Q42: option D should be the isothermal expansion');
ok(LETTER[q42.correct] === 'D', 'Q42: the key should still be D');
ok(['Water freezing to ice', 'Gas compressing into a smaller volume', 'Vapor condensing to liquid']
  .every((o, i) => q42.options[i] === o), 'Q42: options A, B and C should be unchanged');
ok(pointLines(q42.explanation).length === 5, 'Q42: should keep five educational points');
ok(/Dissolving an ionic solid is not automatically an entropy increase/.test(q42.explanation),
  'Q42: a point should say dissolving is not automatically an entropy increase');
ok(mainOf(q42.explanation).indexOf('greater entropy when it occupies a larger volume') >= 0,
  'Q42: the main explanation should state the isothermal-expansion result');

// Q10: the numerical correction
const q10 = rec('Q10');
const ratio = Math.exp((80000 / 8.314) * (1 / 300 - 1 / 310));
ok(close(ratio, 2.814, 0.002), `Q10: the independent Arrhenius ratio is ${ratio.toFixed(4)}`);
ok(q10.options[0].indexOf('2.81') >= 0, 'Q10: option A should carry the 2.81 factor');
ok(mainOf(q10.explanation).indexOf('2.81') >= 0, 'Q10: the main explanation should state the 2.81 ratio');
ok(mainOf(q10.explanation).indexOf('1.035') >= 0, 'Q10: the main explanation should show the exponent 1.035');
ok(allText(q10).indexOf('Approximately double') < 0, 'Q10: the old doubling answer should be gone');
ok(/80,000 J\/mol/.test(q10.explanation), 'Q10: the explanation should convert Ea to joules');
ok(/8\.314/.test(q10.question), 'Q10: the stem should supply R');

// Q4: the stated Kp/Kc convention
const q4 = rec('Q4');
ok(/pressures in atm and concentrations in mol\/L/.test(q4.question), 'Q4: the stem should state the unit convention');
const RT = 0.0821 * 300, kc = 0.50 * RT * RT;
ok(close(RT, 24.63, 0.01) && close(kc, 303.3, 0.2), `Q4: independent recomputation gives RT=${RT.toFixed(2)}, Kc=${kc.toFixed(1)}`);
ok(q4.explanation.indexOf('24.63') >= 0 && q4.explanation.indexOf('303.3') >= 0,
  'Q4: the explanation should carry 24.63 and 303.3');
ok(q4.explanation.indexOf('606.6') >= 0, 'Q4: the explanation should carry the 606.6 factor');

// Q11: the mislabelled paragraph
const q11b = pre('Q11'), q11 = rec('Q11');
ok(fbOf(q11b.explanation).indexOf('<strong>B. rate = k[A]') >= 0,
  'Q11: the before-fixture should carry the mislabelled B heading');
ok(fbFor(q11.explanation, 'B').length === 1 && fbFor(q11.explanation, 'B')[0].indexOf('<strong>B. rate = k[D]:</strong>') === 3,
  'Q11: B should now be headed with option B, rate = k[D]');
ok(fbFor(q11.explanation, 'D')[0].indexOf('second order in A') >= 0,
  'Q11: the second-order-in-A explanation should now sit under D');
ok(fbParas(q11.explanation).length === 3, 'Q11: should have three distractor paragraphs');

// Q12 and Q21: the stated conditions
ok(/A\(aq\) ⇌ B\(aq\)/.test(rec('Q12').question), 'Q12: the stem should specify the 1:1 A/B equilibrium');
ok(/dilute-solution/.test(rec('Q12').question), 'Q12: the stem should say dilute solution');
ok(/Two first-order reactions/.test(rec('Q21').question) && /equal reactant concentrations/.test(rec('Q21').question),
  'Q21: the stem should fix the order and the concentrations');

// Q48, Q50, Q53, Q54: the nuclear-science repairs
ok(/zero rest mass/.test(rec('Q48').explanation), 'Q48: should say zero rest mass');
ok(!/no mass at all/.test(mainOf(rec('Q48').explanation)), 'Q48: the main explanation should not say "no mass at all"');
ok(/U-237/.test(rec('Q50').explanation), 'Q50: the neutron case should name U-237');
ok(!/thorium-237/.test(rec('Q50').explanation), 'Q50: thorium-237 should be gone');
ok(rec('Q53').options[3] === 'Iron (Fe-56)', 'Q53: option D should still be Iron (Fe-56)');
ok(LETTER[rec('Q53').correct] === 'D', 'Q53: the key should still be D');
ok(/Ni-62/.test(rec('Q53').explanation), 'Q53: should name Ni-62 as the numerical maximum');
ok(/8\.8 MeV/.test(rec('Q53').explanation) && /7\.1 MeV/.test(rec('Q53').explanation) && /7\.6 MeV/.test(rec('Q53').explanation),
  'Q53: should carry the 8.8, 7.1 and 7.6 MeV per nucleon values');
ok(/calibrat/.test(rec('Q54').explanation), 'Q54: should mention calibration');
ok(/5,730/.test(rec('Q54').explanation), 'Q54: should keep the 5,730-year half-life');
ok(/50,000 years/.test(rec('Q54').explanation), 'Q54: should keep the roughly 50,000-year range');

// ---------------------------------------------------------------------------
section('6. presentation: point counts, 220 points, no stock blocks left');
let totalPoints = 0;
for (const Q of QS) {
  const n = Number(Q.slice(1));
  const want = (n >= 36 && n <= 55) ? 5 : 3;
  const got = pointLines(rec(Q).explanation);
  ok(got.length === want, `${Q} ${MAP[Q]}: ${got.length} educational points, expected ${want}`);
  got.forEach((p, i) => ok(p.trim().length > 20, `${Q}: point ${i + 1} is too short to be real`));
  totalPoints += got.length;
  ok(bottomOf(rec(Q).explanation).length > 20, `${Q} ${MAP[Q]}: missing or truncated Bottom Line`);
  ok((rec(Q).explanation.match(/Bottom Line:/g) || []).length === 1, `${Q} ${MAP[Q]}: should have exactly one Bottom Line`);
}
ok(totalPoints === 220, `${totalPoints} educational points in the pack, expected 220`);

// the stock blocks: any point line that appeared in two or more of the 39
// replaced items was a shared one, and none may survive anywhere in the pack
const seen = {};
for (const Q of idmap.three_point_replacements)
  for (const line of pointLines(pre(Q).explanation)) seen[line] = (seen[line] || 0) + 1;
const GENERIC = Object.keys(seen).filter(l => seen[l] >= 2);
ok(GENERIC.length >= 9, `${GENERIC.length} shared stock point lines found, expected at least 9`);
ok(Object.keys(seen).every(l => seen[l] >= 2),
  'every point line in the 39 replaced blocks should have been a shared stock line');
for (const line of GENERIC) {
  const left = QS.filter(Q => rec(Q).explanation.indexOf(line) >= 0);
  ok(left.length === 0, `a stock point line survives in ${left.join(', ')}: "${line.slice(0, 50)}"`);
}
// and no point line is shared between two items any more
const nowSeen = {};
for (const Q of QS) for (const line of pointLines(rec(Q).explanation)) (nowSeen[line] = nowSeen[line] || []).push(Q);
const shared = Object.keys(nowSeen).filter(l => nowSeen[l].length > 1);
ok(shared.length === 0, `${shared.length} point line(s) are shared between items: ${shared.slice(0, 3).map(l => l.slice(0, 40)).join(' | ')}`);
// the five-point items were repaired in place, not replaced wholesale
for (const Q of idmap.five_point_items) {
  const spec = EDITS.find(s => s.q === Q);
  if (!spec || !spec.pointEdits) continue;
  const was = pointLines(pre(Q).explanation), now = pointLines(rec(Q).explanation);
  const kept = was.filter((p, i) => now[i] === p).length;
  const edited = spec.pointEdits.map(p => p[0]);
  ok(kept === 5 - edited.length, `${Q}: ${kept} of five points unchanged, expected ${5 - edited.length}`);
  for (const [i] of spec.pointEdits) ok(now[i - 1] !== was[i - 1], `${Q}: point ${i} should have changed`);
}

// ---------------------------------------------------------------------------
section('7. every heading matches its own option');
for (const Q of QS) {
  const q = rec(Q), n = Number(Q.slice(1));
  const unlettered = n >= 56;
  const want = '<h4>Correct Answer: ' + (unlettered ? '' : LETTER[q.correct] + '. ') + q.options[q.correct] + '</h4>';
  ok(q.explanation.indexOf(want) === 0,
    `${Q} ${q.id}: keyed heading should be "${want.slice(0, 80)}", found "${q.explanation.slice(0, 80)}"`);
  ok(unlettered !== /^<h4>Correct Answer: [ABCD]\. /.test(q.explanation),
    `${Q}: ${unlettered ? 'Q56-Q60 keep the unlettered keyed heading' : 'the keyed heading should carry its letter'}`);
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const h = '<strong>' + LETTER[i] + '. ' + q.options[i] + ':</strong>';
    const n2 = q.explanation.split(h).length - 1;
    ok(n2 === 1, `${Q} ${q.id}: the ${LETTER[i]} heading matching its option appears ${n2} times, expected 1`);
  }
}

// ---------------------------------------------------------------------------
section('8. one complete, distinct, relevant feedback entry per distractor');
const bodies = {};
let fbTotal = 0;
for (const Q of QS) {
  const q = rec(Q);
  const paras = fbParas(q.explanation);
  ok(paras.length === 3, `${Q} ${q.id}: ${paras.length} distractor paragraphs, expected 3`);
  const letters = paras.map(p => (p.match(/<strong>([ABCD])\./) || [])[1]);
  ok(new Set(letters).size === 3, `${Q} ${q.id}: distractor letters are ${letters.join(',')}`);
  ok(letters.indexOf(LETTER[q.correct]) < 0, `${Q} ${q.id}: the keyed letter has a distractor paragraph`);
  ok(letters.join('') === letters.slice().sort().join(''), `${Q} ${q.id}: distractor paragraphs are out of letter order`);
  const seenBodies = new Set();
  for (const p of paras) {
    fbTotal++;
    const body = p.replace(/^<p><strong>[ABCD]\.[\s\S]*?:<\/strong>\s*/, '').replace(/<\/p>$/, '');
    ok(body.length >= 40, `${Q} ${q.id}: a distractor explanation is only ${body.length} characters long`);
    ok(/[.!?]$/.test(body.replace(/<[^>]*>/g, '').trim()), `${Q} ${q.id}: a distractor explanation looks truncated`);
    ok(!seenBodies.has(body), `${Q} ${q.id}: two distractor explanations are identical`);
    seenBodies.add(body);
    ok(mainOf(q.explanation).indexOf(body) < 0, `${Q} ${q.id}: a distractor explanation is copied from the main explanation`);
    (bodies[body] = bodies[body] || []).push(Q);
  }
}
ok(fbTotal === 180, `${fbTotal} distractor explanations, expected 180`);
const dupAcross = Object.keys(bodies).filter(b => new Set(bodies[b]).size > 1);
ok(dupAcross.length === 0, `${dupAcross.length} distractor explanation(s) are reused across items`);

// the 64 labels the export was missing
let restored = 0;
for (const Q of Object.keys(idmap.missing_feedback_restored)) {
  for (const L of idmap.missing_feedback_restored[Q]) {
    restored++;
    ok(fbFor(pre(Q).explanation, L).length === 0, `${Q}: the before-fixture already had a ${L} paragraph`);
    ok(fbFor(rec(Q).explanation, L).length === 1, `${Q}: ${L} should now have exactly one paragraph`);
  }
}
ok(restored === 64, `${restored} restored labels, expected 64`);
ok(Object.keys(idmap.missing_feedback_restored).length === 32, 'the missing labels should span 32 items');
// Q58's three copied, lowercased paragraphs
const q58b = pre('Q58'), q58 = rec('Q58');
const q58oldBodies = fbParas(q58b.explanation).map(p => p.replace(/^<p><strong>[ABCD]\.[\s\S]*?:<\/strong>\s*/, ''));
ok(new Set(q58oldBodies).size === 1, 'Q58: the before-fixture should have three identical feedback bodies');
ok(new Set(fbParas(q58.explanation).map(p => p.replace(/^<p><strong>[ABCD]\.[\s\S]*?:<\/strong>\s*/, ''))).size === 3,
  'Q58: the three feedback bodies should now be distinct');
ok(!/na &gt; mg &gt; al/.test(q58.explanation), 'Q58: the lowercased copy should be gone');

// ---------------------------------------------------------------------------
section('9. structural invariants');
const TAGS = ['p', 'strong', 'em', 'ul', 'ol', 'li', 'h4', 'sub', 'sup', 'table', 'tr', 'td', 'th', 'div', 'span'];
for (const Q of QS) {
  const q = rec(Q), exp = q.explanation, id = q.id;
  for (const t of TAGS) {
    const o = (exp.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (exp.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, `${Q} ${id}: <${t}> ${o} open vs ${c} close`);
  }
  // Counting tags cannot see a doubled pair such as "</p></p><p><p>": the
  // counts stay equal. The nesting is therefore checked as well.
  ok(!/<\/p>\s*<\/p>/.test(exp), `${Q} ${id}: doubled </p>`);
  ok(!/<p(?: class='[^']*')?>\s*<p[ >]/.test(exp), `${Q} ${id}: doubled <p>`);
  let depth = 0, depthOk = true;
  for (const m of exp.match(/<p(?: class='[^']*')?>|<\/p>/g) || []) {
    depth += m === '</p>' ? -1 : 1;
    if (depth < 0 || depth > 1) { depthOk = false; break; }
  }
  ok(depthOk && depth === 0, `${Q} ${id}: paragraph nesting is wrong`);
  ok(!/<li>\s*<li>/.test(exp) && !/<\/li>\s*<\/li>/.test(exp), `${Q} ${id}: doubled <li>`);
  ok((exp.match(/<h4>/g) || []).length === 3, `${Q} ${id}: should have exactly three h4 headings`);
  ok(exp.indexOf(FB_H) > 0 && exp.indexOf(PT_H) > exp.indexOf(FB_H), `${Q} ${id}: section headings out of order`);
  ok((exp.match(/<ul>/g) || []).length === 1, `${Q} ${id}: should have exactly one educational-point list`);
  ok((exp.match(/<table/g) || []).length === 0, `${Q} ${id}: unexpected table`);
  const all = allText(q);
  ok(all.indexOf('—') < 0, `${Q} ${id}: em dash`);
  ok(!/[‘’“”]/.test(all), `${Q} ${id}: curly quote`);
  ok(!/\[(?:S|R)\d+\]/.test(all), `${Q} ${id}: a reference label leaked into student-facing text`);
  ok(!/https?:\/\//.test(all), `${Q} ${id}: a URL leaked into student-facing text`);
  ok(!/openstax|IUPAC|Gold Book|NRC|USGS/i.test(all), `${Q} ${id}: a source name leaked into student-facing text`);
  ok(!q.options.some(o => /\.$/.test(o)), `${Q} ${id}: an option ends with a period`);
  ok(q.question.trim().length > 20, `${Q} ${id}: the stem looks truncated`);
  ok(!/<p>\s*<\/p>/.test(exp), `${Q} ${id}: empty paragraph`);
}
// no record in the pack carries a table, as the review states
ok(QS.every(Q => !/<table/.test(rec(Q).explanation)), 'no item in the pack should contain a table');

// ---------------------------------------------------------------------------
section('10. the numerical teaching, recomputed independently');
const num = (Q, s) => rec(Q).explanation.indexOf(s) >= 0;
ok(close(0.693 / 0.0693, 10, 0.01) && num('Q6', '10 min'), 'Q6: ln2/k = 10 min');
ok(close(Math.exp(-0.0693 * 5), 0.707, 0.002) && num('Q6', '0.707'), 'Q6: the 5-minute fraction is 0.707');
ok(close(Math.exp(-0.0693 * 15), 0.354, 0.002) && num('Q6', '0.354'), 'Q6: the 15-minute fraction is 0.354');
ok(close(2 ** 2, 4, 0) && num('Q7', '2² = 4'), 'Q7: doubling a second-order reactant gives 4');
ok(1 + 2 === 3 && num('Q8', '1 + 2 = 3'), 'Q8: the overall order is 3');
ok(close(1 / (0.040 * 0.50), 50, 0.01) && num('Q16', '50 s'), 'Q16: 1/(k[A]0) = 50 s');
ok(close(0.693 / 0.040, 17.3, 0.05) && num('Q16', '17.3 s'), 'Q16: the first-order slip gives 17.3 s');
ok(close(0.34 - -0.76, 1.10, 0.001) && num('Q24', '+1.10 V'), 'Q24: E°cell = +1.10 V');
ok(close(0.34 + -0.76, -0.42, 0.001) && num('Q24', '0.34 + (−0.76) = −0.42'), 'Q24: the signed-sum slip gives −0.42');
ok(2 / 2 === 1 && num('Q27', '1.0 mol'), 'Q27: 2 Faradays deposit 1.0 mol Cu');
ok(2 * 1 + 6 + 4 * -2 === 0 && num('Q29', 'S = +6'), 'Q29: the charge balance gives S = +6');
const qAg = 5.0 * 965, nAg = qAg / 96485;
ok(close(qAg, 4825, 0.1) && close(nAg * 108, 5.40, 0.01) && num('Q31', '5.40 g'), 'Q31: 4825 C deposits 5.40 g Ag');
ok(close(1.08 / 108 * 96485, 965, 1) && num('Q31', 'about 965 C'), 'Q31: 1.08 g would need about 965 C');
ok(close(-0.25 - -1.66, 1.41, 0.001) && num('Q33', '+1.41 V'), 'Q33: E°cell = +1.41 V');
ok(7 - 2 === 5 && num('Q34', 'five electrons'), 'Q34: +7 to +2 is five electrons');
ok(close(4180 / (50.0 * 4.18), 20, 0.01) && num('Q38', '20 °C'), 'Q38: ΔT = 20 °C');
ok(close(50.0 * 4.18 * 50, 10450, 1) && num('Q38', '10,450 J'), 'Q38: a 50 °C rise would need 10,450 J');
ok(close((436 + 243) - 2 * 431, -183, 0.1) && num('Q39', '−183 kJ'), 'Q39: ΔH = −183 kJ');
ok(close(2 * 431, 862, 0.1) && num('Q39', '862 kJ'), 'Q39: two H-Cl bonds release 862 kJ');
ok(close(-100 - 298 * -0.200, -40.4, 0.05) && num('Q41', '-40.4 kJ'), 'Q41: ΔG = −40.4 kJ (kept unchanged)');
ok(close(50000 / 100, 500, 0.1) && num('Q43', '500 K'), 'Q43: the crossover is 500 K');
ok(close(50 - 250 * 0.100, 25, 0.001) && num('Q43', '+25 kJ'), 'Q43: at 250 K, ΔG = +25 kJ');
const qSol = 400 * 4.18 * 6.8;
ok(close(qSol, 11369.6, 1) && num('Q44', '11.37 kJ'), 'Q44: q_solution = 11.37 kJ');
ok(close(qSol / 1000 / 0.200, 56.85, 0.1) && num('Q44', '−56.8 kJ/mol'), 'Q44: ΔH = −56.8 kJ per mole of water');
ok(64 * 0.5 ** 3 === 8 && num('Q49', '8 g'), 'Q49: three half-lives leave 8 g');
ok(Math.log2(800 / 100) === 3 && num('Q55', '10 min'), 'Q55: 800 to 100 Bq is three half-lives of 10 min');
ok(2 * 3 ** 2 === 18 && num('Q60', '18 electrons'), 'Q60: 2n² = 18 for n = 3');
ok(3 ** 2 === 9 && num('Q60', 'n² = 9'), 'Q60: the n = 3 shell has nine orbitals');
// Q37 and Q41 are kept unchanged, so their arithmetic is checked on the stored text
ok(close(-393 - -283, -110, 0.1) && num('Q37', '-110 kJ'), 'Q37: Hess gives −110 kJ (kept unchanged)');

// ---------------------------------------------------------------------------
section('11. cross-item consistency and the coverage ledger');
// the Q56-Q60 subscript notation stays as the bank stores it
ok(rec('Q56').explanation.indexOf('mₗ') >= 0, 'Q56: should use the bank\'s mₗ subscript character');
ok(rec('Q56').explanation.indexOf('m<sub>l</sub>') < 0, 'Q56: should not mix in a markup subscript for mₗ');
// the retained first-order/second-order distinction
ok(/first-order/.test(rec('Q6').explanation) && /first-order half-life/.test(rec('Q16').explanation),
  'Q6 and Q16 should both name the rate law their half-life formula belongs to');
// cathodic protection described as a family, not a single mechanism
ok(/external current|externally supplied/.test(rec('Q35').explanation),
  'Q35: cathodic protection should include the impressed-current case');
// standard versus actual cell potential
ok(/standard conditions/.test(rec('Q24').explanation) && /Nonstandard concentrations/.test(rec('Q33').explanation),
  'Q24 and Q33 should distinguish standard from nonstandard conditions');
// solution heat gain versus reaction heat loss
ok(/q_solution/.test(rec('Q44').explanation) && /q_reaction/.test(rec('Q44').explanation),
  'Q44 should name both the solution and the reaction heat');

const c = idmap.coverage;
ok(c.chemistry_total === 485, 'the ledger should record 485 chemistry items');
ok(c.reviewed_before_this_batch === 120, 'the ledger should record 120 reviewed before this batch');
ok(c.new_unique_ids_this_batch === 59, 'this batch should add 59 unique ids, not 60');
ok(JSON.stringify(c.previously_reviewed_included_again) === JSON.stringify(['chem-76']),
  'the ledger should record chem-76 as the one repeat');
ok(c.reviewed_after_this_batch === 179, 'the ledger should record 179 reviewed after this batch');
ok(c.reviewed_before_this_batch + c.new_unique_ids_this_batch === c.reviewed_after_this_batch,
  'the coverage arithmetic should add up');
ok(c.still_unreviewed_chemistry === 306, 'the ledger should record 306 chemistry items still unreviewed');
ok(c.reviewed_after_this_batch + c.still_unreviewed_chemistry === 485, 'reviewed plus unreviewed should be 485');
ok(c.edited_this_batch === 57 && c.kept_unchanged_this_batch === 3, 'the ledger should record 57 edited and 3 kept');
ok(c.biology_unaffected === true && c.biology_still_unreviewed.length === 5,
  'the ledger should record biology as unaffected with five items still pending');
const reviewedIds = new Set([...b1ids, ...b2ids, ...IDS]);
ok(reviewedIds.size === 179, `${reviewedIds.size} unique reviewed chemistry ids, expected 179`);
ok(!reviewedIds.has('chem-19') && !reviewedIds.has('chem-61'),
  'chem-19 and chem-61 should still be unreviewed');
ok(485 - reviewedIds.size === 306, 'the unreviewed remainder should be 306');
ok(idmap.deviations.length === 0, 'the id map should record no deviations');

// ---------------------------------------------------------------------------
section('12. the Q46 follow-up applied after the scientific reread');
// scripts/apply-chem-review-batch3-followup.js replaced two sentences in
// chem-167 and nothing else. Each removal is paired with a non-vacuity check.
const q46was = pre('Q46').explanation, q46 = rec('Q46').explanation;
const FOLLOWUP = [
  ['In α decay, the parent nucleus loses 4 mass units and 2 atomic number units.',
   'In alpha decay, the daughter nucleus has a mass number 4 lower and an atomic number 2 lower than the parent nucleus.'],
  ['An electron has negligible mass and a charge of −1, not the mass 4 and charge +2 of a helium nucleus.',
   'An electron has a small but nonzero rest mass and charge −1; a helium-4 nucleus has mass number 4 and charge +2.']
];
for (const [gone, present] of FOLLOWUP) {
  ok(q46was.indexOf(gone) >= 0, `Q46: "${gone.slice(0, 50)}" was not in the before-fixture, so the removal check is vacuous`);
  ok(q46.indexOf(gone) < 0, `Q46: "${gone.slice(0, 50)}" should be gone`);
  ok(q46.split(present).length - 1 === 1, `Q46: "${present.slice(0, 50)}" should appear exactly once`);
}
// Batch 3 itself left Q46's first main paragraph and its option A paragraph
// alone (it edited the second main paragraph, the C and D feedback and points
// 3-5), so those two blocks in the fixture ARE the pre-follow-up text. Each may
// therefore differ from the fixture by exactly its one replaced sentence.
const firstPara = e => (e.match(/<p>[\s\S]*?<\/p>/) || [''])[0];
const paraA = e => (e.match(/<p><strong>A\.[\s\S]*?<\/p>/) || [''])[0];
ok(firstPara(q46) === firstPara(q46was).replace(FOLLOWUP[0][0], () => FOLLOWUP[0][1]),
  'Q46: the first main paragraph should differ from the fixture by exactly the one replaced sentence');
ok(paraA(q46) === paraA(q46was).replace(FOLLOWUP[1][0], () => FOLLOWUP[1][1]),
  'Q46: option A\'s paragraph should differ from the fixture by exactly the one replaced sentence');
// Everything else in the record is pinned by sections 4 to 11 of this suite,
// which already verify Q46's second main paragraph, its C and D feedback and
// its five points. The follow-up harness is what checked, in one run, that
// nothing outside these two sentences moved.
ok(q46.indexOf('An α particle consists of 2 protons and 2 neutrons (a helium-4 nucleus, He-4).') >= 0,
  'Q46: the opening alpha-particle sentence should survive');
ok(q46.indexOf('<strong>A. Beta decay:</strong> Beta-minus decay emits an electron from the nucleus as a neutron converts into a proton.') >= 0,
  'Q46: the opening beta-minus sentence of option A should survive');
ok(LETTER[rec('Q46').correct] === 'B', 'Q46: the key should still be B');
ok(pointLines(q46).length === 5, 'Q46: should still carry five educational points');
// points 1 and 2 were untouched by both the batch 3 pass and this follow-up
ok(pointLines(q46)[0] === pointLines(q46was)[0] && pointLines(q46)[1] === pointLines(q46was)[1],
  'Q46: educational points 1 and 2 should be unchanged');
ok(bottomOf(q46) === bottomOf(q46was), 'Q46: the Bottom Line should be unchanged');
ok(JSON.stringify(rec('Q46').options) === JSON.stringify(pre('Q46').options), 'Q46: the options should be unchanged');
ok(rec('Q46').question === pre('Q46').question, 'Q46: the stem should be unchanged');
// and the rest of the pack is untouched by the follow-up
const followupChanged = QS.filter(Q => {
  if (Q === 'Q46') return false;
  return JSON.stringify(pre(Q)) !== JSON.stringify(rec(Q));
});
ok(followupChanged.length === 56, `${followupChanged.length} items other than Q46 differ from the fixture, expected 56`);

// ---------------------------------------------------------------------------
console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
