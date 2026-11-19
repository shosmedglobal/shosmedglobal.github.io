/**
 * Verifies the result of chemistry review batch 4 against the review's own
 * requirements, independently of the script that applied it.
 *
 *   node test/chem-review-batch4.test.js
 *
 * The supplied export carried no bank ids, so section 1 re-derives the id map
 * from the ORIGINAL stems and options in the before-fixture rather than
 * trusting scripts/chem-review-batch4-idmap.json. Twenty-eight stems and three
 * option texts were replaced by this pass, so those signatures must come from
 * the fixture, not from live data.
 *
 * Q11/chem-192 and Q36/chem-217 share their four-option set (0 / 1 / 2 / 3), so
 * each signature is checked as a (stem phrase, option set) PAIR, never on the
 * option set alone.
 *
 * Every "claim removed" assertion in section 4 is paired with a check that the
 * claim really was in the before-fixture, so a typo cannot make an assertion
 * pass vacuously.
 *
 * The review asked for focused verification in the existing framework and
 * explicitly asked NOT to build a new testing framework or a mutation-testing
 * project for this prose pass. This suite therefore follows the shape of the
 * existing per-batch suites and is sized to the 60-item pack.
 */
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
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch4-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/chem-review-batch4-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch4-idmap.json'), 'utf8'));

const EDITS = [].concat(
  require('../scripts/chem-batch4-edits-a.js'),
  require('../scripts/chem-batch4-edits-b.js'),
  require('../scripts/chem-batch4-edits-c.js'),
  require('../scripts/chem-batch4-edits-d.js'),
  require('../scripts/chem-batch4-edits-e.js'),
  require('../scripts/chem-batch4-edits-f.js')
);
const SPEC = Object.fromEntries(EDITS.map(s => [s.q, s]));

const BY = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
const MAP = idmap.map;
const QS = Object.keys(MAP);
const IDS = QS.map(k => MAP[k]);
const PACK = new Set(IDS);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const rec = Q => BY[MAP[Q]];
const pre = Q => { const r = Object.assign({}, before[Q]); delete r.q; return r; };
const dec = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const optSig = q => q.options.join('\u0001');
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
  const m = fbOf(e).match(new RegExp('<p><strong>' + L + '\\.[\\s\\S]*?</p>'));
  return m ? m[0] : '';
};
const bodyOf = p => p.replace(/^<p><strong>[ABCD]\.[\s\S]*?:<\/strong>\s*/, '').replace(/<\/p>$/, '');
const tableOf = e => { const m = e.match(/<table[\s\S]*?<\/table>/); return m ? m[0] : ''; };

// ---------------------------------------------------------------------------
section('1. the display-number to bank-id map, re-derived from the before-fixture');

// [display, distinctive phrase from the ORIGINAL stem]
const SIG = [
  ['Q1', 'electron configuration of a Cl− ion is the same as that of which noble gas'],
  ['Q2', 'Which subshell designation is NOT possible'],
  ['Q3', 'two electrons in the same orbital must differ in their'],
  ['Q4', 'Which of the following has the most protons'],
  ['Q5', 'correct electron configuration for chromium (Z=24)'],
  ['Q6', 'How many orbitals are in the 4f subshell'],
  ['Q7', 'Which ion has the smallest ionic radius'],
  ['Q8', 'Which element has the electron configuration [Ne] 3s² 3p³'],
  ['Q9', 'A neutral atom has 20 neutrons and a mass number of 39'],
  ['Q10', 'In which order are the subshells filled according to the Aufbau principle'],
  ['Q11', 'total number of nodes (radial + angular) in a 3p orbital'],
  ['Q12', 'Which pair of atoms are isotopes of the same element'],
  ['Q13', 'Which element has the highest electronegativity'],
  ['Q14', 'Which property generally INCREASES as you move down a group'],
  ['Q15', 'Which element has the highest first ionization energy'],
  ['Q16', 'The elements Na, Mg, and Al are in the same period'],
  ['Q17', 'Elements in the same group of the periodic table have the same number of'],
  ['Q18', 'Which of the following elements is classified as a metalloid'],
  ['Q19', 'Electron affinity becomes more negative (more energy released) as you move'],
  ['Q20', 'Which pair of elements would you expect to have the most similar chemical properties'],
  ['Q21', 'order of INCREASING first ionization energy'],
  ['Q22', 'Transition metals are located in which block of the periodic table'],
  ['Q23', 'Which element is expected to be the most reactive nonmetal'],
  ['Q24', 'Which of the following is a biologically important trace element'],
  ['Q25', 'second ionization energy of sodium is significantly higher'],
  ['Q26', 'Which halogen exists as a liquid at room temperature and standard pressure'],
  ['Q27', 'largest electron affinity (most energy released when gaining an electron)'],
  ['Q28', 'Which of the following compounds contains only ionic bonds'],
  ['Q29', 'molecular geometry of methane (CH₄) according to VSEPR theory'],
  ['Q30', 'Which of the following molecules is nonpolar despite having polar bonds'],
  ['Q31', 'Hydrogen bonds can form between molecules of'],
  ['Q32', 'hybridization is present on the carbon atom in ethene (C₂H₄)'],
  ['Q33', 'Which of the following molecules has a bent (V-shaped) geometry'],
  ['Q34', 'strongest type of intermolecular force present in liquid water'],
  ['Q35', 'In a metallic bond, the valence electrons are best described as'],
  ['Q36', 'How many lone pairs of electrons does the nitrogen atom in ammonia'],
  ['Q37', 'Which compound is expected to have the highest melting point'],
  ['Q38', 'sp³ hybridized central atom and no lone pairs is approximately'],
  ['Q39', 'thiol (–SH) group in its side chain that can form disulfide'],
  ['Q40', 'amino acid with a nonpolar side chain exists predominantly as'],
  ['Q41', 'peptide bond is formed by a condensation reaction between which two functional groups'],
  ['Q42', 'Which of the following amino acids has an aromatic side chain'],
  ['Q43', 'Denaturation of a protein results in the loss of'],
  ['Q44', 'Glycine is unique among the 20 standard amino acids because it'],
  ['Q45', 'act as both a proton donor and acceptor near physiological pH'],
  ['Q46', 'protein composed of two identical polypeptide subunits is described as a'],
  ['Q47', 'MOST important in driving protein folding in an aqueous environment'],
  ['Q48', 'Proline differs from all other standard amino acids because its side chain'],
  ['Q49', 'How many water molecules are released during the formation of a linear peptide'],
  ['Q50', 'Which pair of amino acids both have negatively charged side chains'],
  ['Q51', 'isoelectric point (pI) of an amino acid is the pH at which'],
  ['Q52', 'Which type of bond directly links amino acids in the primary structure'],
  ['Q53', 'In L-amino acids, the amino group on the α-carbon is oriented to the'],
  ['Q54', 'An α-helix makes one complete turn every'],
  ['Q55', 'only one that contains a secondary amino group in its backbone'],
  ['Q56', "Collagen's structure is characterized by a repeating tripeptide motif"],
  ['Q57', 'An enzyme that catalyzes the hydrolysis of peptide bonds is classified as a'],
  ['Q58', 'IUPAC name of the compound CH₃CH(CH₃)CH₂CH₃'],
  ['Q59', 'Which reagent is used to distinguish between ethene and ethane'],
  ['Q60', "Markovnikov's rule, the addition of HBr to propene produces mainly"]
];
ok(SIG.length === 60, `the signature table has ${SIG.length} rows, expected 60`);

// The pre-pass bank: the before-fixture inside the pack, live records outside it.
// Records outside the pack are unchanged by this pass (section 3 proves that
// separately), so this reconstruction is the bank as the review saw it.
const PRE = {};
for (const q of data.chemistry) if (!PACK.has(q.id)) PRE[q.id] = q;
for (const Q of QS) PRE[MAP[Q]] = pre(Q);
ok(Object.keys(PRE).length === 485, `the reconstructed pre-pass bank holds ${Object.keys(PRE).length} records, expected 485`);

for (const [Q, phrase] of SIG) {
  const id = MAP[Q], r = PRE[id];
  ok(!!r, `${Q}: ${id} is not in the reconstructed pre-pass bank`);
  if (!r) continue;
  ok(r.question.indexOf(phrase) >= 0, `${Q}: the original stem of ${id} does not contain "${phrase.slice(0, 50)}"`);
  const both = Object.keys(PRE).filter(k =>
    PRE[k].question.indexOf(phrase) >= 0 && optSig(PRE[k]) === optSig(r));
  ok(both.length === 1 && both[0] === id,
    `${Q}: the stem phrase plus the four original options match ${both.length} records (${both.join(', ')})`);
  ok(LETTER[r.correct] === idmap.asserted_key_block[Number(Q.slice(1)) - 1],
    `${Q}: stored key ${LETTER[r.correct]} disagrees with the review's key block`);
}

// the shared option set the review's mapping instruction warns about
ok(optSig(PRE['chem-192']) === optSig(PRE['chem-217']),
  'chem-192 and chem-217 should share their option set, so the pair test is what makes the map unique');

// contiguity and overlap are RESULTS, not assumptions
ok(IDS.every((id, i) => id === 'chem-' + (182 + i)),
  'the verified ids should turn out to be chem-182 .. chem-241');
const earlier = new Set();
for (let i = 1; i <= 60; i++) earlier.add('chem-' + i);
for (let i = 63; i <= 122; i++) earlier.add('chem-' + i);
earlier.add('chem-76');
for (let i = 123; i <= 181; i++) earlier.add('chem-' + i);
const overlap = IDS.filter(id => earlier.has(id));
ok(overlap.length === 0, `this pack overlaps earlier reviewed ids: ${overlap.join(', ')}`);

const derivedKey = QS.map(Q => LETTER[rec(Q).correct]).join('');
ok(derivedKey === idmap.asserted_key_block, `the live key block is ${derivedKey}`);
const tally = { A: 0, B: 0, C: 0, D: 0 };
for (const c of derivedKey) tally[c]++;
ok(JSON.stringify(tally) === JSON.stringify(idmap.asserted_key_tally),
  `key tally ${JSON.stringify(tally)} disagrees with the review's A=3 B=28 C=26 D=3`);

// ---------------------------------------------------------------------------
section('2. scope of the pass');

const changed = QS.filter(Q => JSON.stringify(pre(Q)) !== JSON.stringify(rec(Q)));
ok(changed.length === 60, `${changed.length} of 60 items changed, expected all 60`);

const stems = QS.filter(Q => pre(Q).question !== rec(Q).question);
ok(JSON.stringify(stems) === JSON.stringify(idmap.stem_changes),
  `stems changed: ${JSON.stringify(stems)}`);
ok(stems.length === 28, `${stems.length} stems changed, expected 28`);

const optChanges = {};
for (const Q of QS) for (let j = 0; j < 4; j++) {
  if (pre(Q).options[j] !== rec(Q).options[j]) (optChanges[Q] = optChanges[Q] || []).push(LETTER[j]);
}
ok(JSON.stringify(optChanges) === JSON.stringify(idmap.option_changes),
  `option changes: ${JSON.stringify(optChanges)}`);
ok(rec('Q14').options[3] === 'Energy released on electron attachment', 'Q14 D should be the signed-convention-free wording');
ok(rec('Q19').options[3] === 'from Group 17 to Group 18', 'Q19 D should no longer duplicate A');
ok(rec('Q60').options[3] === '2,2-dibromopropane', 'Q60 D should no longer restate 1-bromopropane');

for (const Q of QS) {
  ok(rec(Q).correct === pre(Q).correct, `${Q}: the answer letter moved`);
  ok(rec(Q).id === pre(Q).id, `${Q}: the id moved`);
  ok(rec(Q).options.length === 4, `${Q}: option count changed`);
}

// ---------------------------------------------------------------------------
section('3. nothing outside the pack moved');

let bioBad = 0, chemBad = 0;
for (const q of data.biology) if (untouched.biology[q.id] !== hash(q)) bioBad++;
ok(Object.keys(untouched.biology).length === 629, `the untouched fixture holds ${Object.keys(untouched.biology).length} biology hashes`);
ok(bioBad === 0, `${bioBad} biology records changed`);
for (const q of data.chemistry) {
  if (PACK.has(q.id)) continue;
  if (!untouched.chemistry[q.id]) continue;   // pruned by a later reviewed batch
  if (untouched.chemistry[q.id] !== hash(q)) { chemBad++; console.error('    changed outside the pack: ' + q.id); }
}
/* NOTE: the chemistry batch 7 pass (chem-362 .. chem-421) pruned those 60 ids
   from this fixture, so the hash count below steps down by 60. nChem counts LIVE
   out-of-pack records and is unaffected by pruning. */
ok(Object.keys(untouched.chemistry).length === 189, `the untouched fixture holds ${Object.keys(untouched.chemistry).length} out-of-pack chemistry hashes (189 after the batch 8 prune)`);
ok(chemBad === 0, `${chemBad} chemistry records outside the pack changed`);
ok(data.biology.length === 629 && data.chemistry.length === 485, 'bank counts changed');
ok(Object.keys(untouched.chemistry).length + 60 + 60 + 60 + 60 + 56 === 485, 'the untouched chemistry hashes, this 60-item pack and the new ids of chemistry batches 5 to 8 should be the whole chemistry bank');

// ---------------------------------------------------------------------------
section('4. the specific science and feedback repairs the review names');

// [display, text that must be GONE, text that must be PRESENT]
const REPAIRS = [
  // Q1 isoelectronic claims
  ['Q1', 'achieved only by H⁻ and Li⁺', 'Krypton has 36 electrons.'],
  ['Q1', 'Anions gain electrons to achieve a noble gas configuration', 'sharing an electron configuration does not make two species the same element'],
  ['Q1', 'The isoelectronic noble gas for any ion is typically the nearest noble gas', 'A chloride ion has 17 + 1 = 18 electrons'],
  // Q2 copied distractors
  ['Q2', '<strong>A. 3d:</strong> All other options are valid', 'This is allowed because l can take the values 0, 1 and 2 when n = 3.'],
  ['Q2', '<strong>D. 4f:</strong> All other options are valid', 'l can range from 0 to 3 when n = 4'],
  // Q5 chromium
  ['Q5', 'exchange energy associated with electrons having parallel spins', 'the 3d and 4s levels are close in energy'],
  ['Q5', 'outweighs the cost of leaving 4s half-filled', 'not a rule that predicts every atom'],
  ['Q5', 'achieving extra stability through half-filled or fully filled d subshells', 'Learn this observed exception to the simple filling sequence'],
  // Q8 / Q9 lowercased copies
  ['Q8', 'Silicon (z=14) would be [ne] 3s2 3p2', 'Silicon has 14 electrons and ground-state configuration [Ne] 3s² 3p².'],
  ['Q9', 'Calcium has z=20, argon has z=18, and scandium has z=21.', 'An atom with mass number 39 and 20 protons would have 19 neutrons'],
  // Q10 aufbau mnemonic
  ['Q10', 'The 4s subshell has a slightly lower energy than the 3d subshell', 'subshells are ordered by n + l'],
  ['Q10', 'the 4s subshell fills before 3d because it has a lower energy', 'Do not turn that mnemonic into a claim'],
  // Q11 nodes
  ['Q11', 'angular (or planar) nodes = l', 'that does not make every angular node in every subshell planar'],
  ['Q11', '<strong>B. 1:</strong> These nodes are further divided', 'The question asks for their total, which is 1 + 1 = 2.'],
  // Q12 dating digression
  ['Q12', 'potassium-argon dating', 'They are isobars, not isotopes of one element.'],
  // Q13 electronegativity
  ['Q13', 'Electronegativity increases going <strong>up and to the right</strong>', 'attraction for the electrons it shares in a bond'],
  ['Q13', 'located in the top-right corner of the reactive elements', 'not the energy change when an isolated atom gains an electron'],
  // Q14 electron attachment row
  ['Q14', '<td>Electron affinity</td>', '<td>Energy released on electron attachment</td>'],
  ['Q14', 'Chlorine actually has a more negative electron affinity than fluorine due to electron-electron repulsion', 'Irregular; not a reliable simple down-group trend'],
  ['Q14', '<tr><td>Atomic radius</td><td>Increases</td></tr>', '<tr><td>Atomic radius</td><td>Generally increases</td></tr>'],
  // Q15 noble-gas scoping
  ['Q15', 'Noble gases have the highest ionization energies in their respective periods', 'Among the listed Period 2 elements, neon has the highest first ionization energy.'],
  ['Q15', 'represents the maximum ionization energy for any given period', "neon's filled outer shell gives it the highest first ionization energy"],
  // Q16 shielding
  ['Q16', 'This produces a clear decrease in atomic radius across a period.', 'the increase in nuclear charge is not fully offset by shielding'],
  // Q17 same-group rule
  ['Q17', 'Elements in the same group do NOT have the same number of electron shells', 'Helium is a special case'],
  ['Q17', 'which determines their chemical behavior', 'help explain similar, not identical, chemistry'],
  // Q18 metalloid vs semimetal
  ['Q18', '(semimetals) are elements that have properties intermediate', 'a combination of the properties associated with metals and with nonmetals'],
  ['Q18', 'Aluminum is a metal (despite being close to the line), while phosphorus and sulfur are nonmetals.', 'its conductivity can be changed by temperature or by added impurities'],
  // Q19 sign convention
  ['Q19', 'with chlorine having the most negative of all elements', 'Always check the sign convention'],
  ['Q19', 'From top to bottom in any column', 'Group 18 atoms already have closed valence shells.'],
  // Q20 group similarity
  ['Q20', '<strong>C. N and O:</strong> N and O are neighbors in the same period.', 'Nitrogen has five valence electrons and oxygen has six.'],
  ['Q20', 'Elements in the same group share similar chemical properties due to having the same number of valence electrons.', 'their compounds and reactivities are not identical'],
  // Q21 nitrogen/oxygen
  ['Q21', 'Option C lists them in decreasing order.', 'the correct increasing order is C &lt; O &lt; N &lt; F'],
  ['Q21', 'ionization energy generally increases left to right (C &lt; N &lt; O &lt; F)', "Nitrogen's 2p³ configuration is half-filled"],
  // Q22 transition elements
  ['Q22', 'rare earth elements', 'can form a cation with an incomplete d subshell'],
  ['Q22', 'Lanthanides & Actinides', 'Commonly called the inner-transition region'],
  ['Q22', 'the ability to form colored compounds and complexes', 'not universal properties of every element or compound'],
  // Q23 oxidizing ability
  ['Q23', 'by lightning, bacteria, or industrial processes', 'An oxidizing agent accepts electrons from another substance.'],
  ['Q23', 'Nonmetal reactivity increases <strong>up and to the right</strong>', 'strong N≡N bond'],
  // Q24 trace element
  ['Q24', 'Carbon, oxygen, and calcium are all <strong>macroelements</strong>', "not to a small biological importance"],
  // Q25 isotope premise
  ['Q25', 'it has one stable isotope, Na-23) is completely unrelated to ionization energy', 'but radioactive sodium isotopes also exist'],
  // Q26 explicit conditions
  ['Q26', 'Physical state increases (gas → liquid → solid) going down the group', 'At 25 °C and 1 bar, F₂ and Cl₂ are gases'],
  ['Q26', 'liquid at standard conditions', '<th>State at 25 °C and 1 bar</th>'],
  // Q27 sodium and argon electron attachment
  ['Q27', 'adding an electron would begin filling a new subshell', 'An added electron enters the same 3s subshell, giving [Ne] 3s², not a new subshell.'],
  ['Q27', 'has essentially zero electron affinity', 'Do not interpret a rounded or omitted tabulated value as a literal zero-energy process.'],
  // Q28 ionic bonding
  ['Q28', 'Ionic bonding requires a metal to hand electrons to a nonmetal', 'the ionic bond itself is the attraction between opposite charges'],
  ['Q28', 'nonpolar (<0.4), polar covalent (0.4-1.7), ionic (>1.7)', 'not a requirement for every ionic compound'],
  // Q29 hybridization as a model
  ['Q29', 'A linear geometry (180 degree bond angle) occurs when a central atom has two bonding regions', 'not an extra step required by VSEPR'],
  // Q30 polarity superlative
  ['Q30', 'one of the most polar common molecules', 'Its bond dipoles do not cancel, so the molecule has a net dipole.'],
  ['Q30', '5°) and nh3 (trigonal pyramidal)', 'so NH₃ is polar'],
  // Q31 hydrogen bonding
  ['Q31', 'specifically <strong>F, O, or N</strong>', 'not an exhaustive definition of every possible hydrogen bond'],
  ['Q31', 'H₂S cannot form hydrogen bonds because sulfur is not electronegative enough', 'does not form the strong intermolecular hydrogen-bond network characteristic of HF'],
  // Q32 d-orbital expansion
  ['Q32', 'they have accessible d orbitals', 'The sp³d label describes a five-orbital hybridization model'],
  ['Q32', 'This expanded octet is only possible for elements in Period 3 or below', 'overlaps sideways to form the pi component of the double bond'],
  // Q33 BeCl2 monomer
  ['Q33', '<strong>A. BeCl₂:</strong> BeCl₂ and CO₂ are both linear', 'This does not describe the extended bonding in solid BeCl₂.'],
  // Q34 force hierarchy
  ['Q34', 'are the weakest intermolecular forces', 'Dispersion forces are not universally weak in all substances'],
  ['Q34', 'Ionic bonding is an intramolecular (within compounds) force', 'an ionic lattice is an extended structure of oppositely charged ions'],
  // Q35 metallic bonding
  ['Q35', 'metal atoms release their valence electrons', 'the attraction between the positive ion cores'],
  ['Q35', 'Layers of atoms can slide without breaking bonds', 'Atomic layers can shift while metallic attraction is maintained.'],
  ['Q35', 'Free electrons absorb and re-emit light', 'Electrons respond to incident light, producing strong reflection.'],
  // Q36 electron counting
  ['Q36', 'This would require five bonds, as in PF5', 'Zero lone pairs would not account for all eight electrons.'],
  ['Q36', 'can only form a maximum of four bonds', 'That would require ten valence electrons, but neutral NH₃ has only eight.'],
  // Q37 sublimation
  ['Q37', '<td>−78°C (sublimes)</td>', 'Does not melt at 1 atm; sublimes at about −78.5 °C'],
  ['Q37', 'always have much lower melting points than ionic compounds', 'is a sublimation temperature, not a melting point'],
  ['Q37', 'It has a very low sublimation point of -78.5 degrees C and does not even melt at standard pressure.', 'the strong covalent C=O bonds within each molecule are not broken during sublimation'],
  // Q38 ideal tetrahedral
  ['Q38', '120 degrees is the bond angle for sp2-hybridized atoms with trigonal planar geometry', 'An angle of 120° belongs to an ideal trigonal planar arrangement'],
  ['Q38', 'If lone pairs are present on the sp³ hybridized atom, the bond angles are compressed below 109.5°', 'In familiar examples with lone pairs on the sp³ atom'],
  // Q39 cystine
  ['Q39', 'creating a cystine residue', 'The corresponding linked pair of free cysteine molecules is called <strong>cystine</strong>.'],
  ['Q39', '(–oh) groups, not thiol groups', "Serine's side chain is –CH₂OH."],
  // Q40 zwitterion
  ['Q40', 'both ionization events have occurred', 'carboxyl-group pKa of about 2.3 and an ammonium-group pKa of about 9.7'],
  ['Q40', 'amino acids never exist in this fully protonated/deprotonated neutral form', 'zero net charge does not mean no charged groups'],
  // Q41 condensation scope
  ['Q41', 'An ester bond (not a peptide bond) forms between a hydroxyl and carboxyl group.', 'Cells make peptide bonds using activated amino acids attached to tRNA'],
  ['Q41', 'does not readily occur under biological conditions', 'Two amino groups alone do not form the peptide linkage.'],
  // Q42 aromatic count
  ['Q42', 'making it one of the three aromatic amino acids', "histidine's imidazole ring is also aromatic"],
  ['Q42', 'the amino acid with the largest side chain', 'strong UV absorbance near 280 nm'],
  // Q43 denaturation
  ['Q43', "Anfinsen's classic ribonuclease experiment", 'reduction of disulfide bonds is not required for every instance of denaturation'],
  ['Q43', 'Critically, denaturation does not break peptide bonds', 'Recovery of the fold is possible for some proteins but is not guaranteed.'],
  // Q44 chirality vs rotation
  ['Q44', 'making them optically active', 'giving each of them a chiral α-carbon'],
  ['Q44', 'and to some extent histidine (pKa ~6.0)', 'histidine (pKa ~6.0) is mostly neutral with a smaller protonated fraction'],
  // Q45 histidine not exclusive
  ['Q45', 'has no acid-base catalytic role', 'This does not mean that lysine, aspartate or other residues cannot act as catalytic acids or bases.'],
  ['Q45', 'making it crucial for enzyme catalysis', 'Catalytic acid–base roles are not exclusive to histidine.'],
  // Q46 hemoglobin
  ['Q46', 'for example, hemoglobin alpha and beta chains', 'The usual adult hemoglobin molecule has four subunits'],
  // Q47 hydrophobic effect
  ['Q47', 'typically formed after folding', 'can form or rearrange during folding'],
  ['Q47', 'the dominant force driving protein folding', 'one contribution should not be declared universally dominant'],
  // Q48 proline
  ['Q48', 'imino acid', 'the unprotonated nitrogen is a secondary amine, not an imine'],
  ['Q48', 'incompatible with the interior of', 'proline is not absolutely excluded from helices'],
  ['Q48', 'helix breaker', 'an internal proline residue lacks an N–H donor'],
  // Q49 net stoichiometry
  ['Q49', 'Fifteen water molecules would require 16 amino acids', 'There is no peptide link beyond each end of the linear chain.'],
  ['Q49', 'releases (n − 1) water molecules during synthesis', 'ribosomal synthesis uses activated amino acids attached to tRNA'],
  // Q50 predominance
  ['Q50', 'giving it a partial positive charge', 'with a smaller positively charged fraction'],
  ['Q50', 'Both are fully deprotonated', 'Both are predominantly deprotonated at physiological pH.'],
  ['Q50', '<th>Charge at pH 7.4</th>', '<th>Predominant side-chain charge at pH 7.4</th>'],
  // Q51 pI
  ['Q51', 'the molecule does not migrate in an electric field', 'zero average net electrical charge'],
  ['Q51', 'the amino group loses its proton (-NH2), resulting in an overall negative charge', 'Above its pI, an amino acid has a negative average net charge'],
  // Q52 backbone link
  ['Q52', 'they are not part of the primary backbone sequence', 'an internal proline residue has no N–H at that nitrogen'],
  ['Q52', 'Primary protein structure = amino acid sequence connected by peptide (amide) bonds', 'which are covalent amide C–N links'],
  // Q53 Fischer orientation
  ['Q53', 'D-amino acids are rare in nature but are found in some bacterial cell walls', 'D does not mean that the molecule must rotate light to the right.'],
  ['Q53', 'the groups above and below the α-carbon are the amino group (top) or carboxyl group (top, by convention)', 'The top position is occupied by COOH in the projection specified in the stem.'],
  ['Q53', 'Virtually all biological proteins consist of L-amino acids.', 'The orientation must be stated.'],
  // Q54 alpha helix
  ['Q54', 'has exactly 3.6 residues per turn', 'Each complete turn of the ideal helix contains approximately'],
  ['Q54', 'does not correspond to any known protein helix', 'actual protein helices can be distorted from the ideal geometry'],
  ['Q54', 'tend to disrupt α-helices', 'tend to disfavor regular α-helical structure'],
  // Q55 secondary amine
  ['Q55', '(an imino group)', 'A secondary amine is not an imine'],
  ['Q55', 'This is why proline disrupts regular secondary structures.', 'but most are still trans'],
  ['Q55', 'is the largest of the standard amino acids', 'its indole nitrogen belongs to that aromatic ring'],
  // Q56 collagen
  ['Q56', 'Mutations replacing glycine in collagen cause diseases like osteogenesis imperfecta', 'Certain glycine substitutions in type I collagen can disrupt the triple helix and cause osteogenesis imperfecta.'],
  ['Q56', '<strong>B. Proline:</strong> X is frequently proline', 'Glycine, rather than proline, is required at every third position'],
  // Q57 EC 7
  ['Q57', '<td>Bond formation with ATP</td>', '<td>Energy-coupled bond formation, often using ATP</td>'],
  ['Q57', 'water is the attacking species', 'water is consumed in the overall reaction'],
  ['Q57', 'at the cost of hydrolysing ATP', 'Translocases (EC 7)'],
  // Q58 nomenclature
  ['Q58', 'Always number from the end that gives the lowest locant to the substituent.', 'For this singly substituted alkane'],
  ['Q58', 'is a common (trivial) name, not the IUPAC systematic name', 'Isopentane is a common name for the same compound.'],
  // Q59 fairness rewrite
  ['Q59', 'Dilute NaOH is a weak base', 'NaOH is a strong base even when its solution is dilute'],
  ['Q59', 'specific and unambiguous for unsaturation', 'Concentrated sulfuric acid can react with ethene'],
  ['Q59', 'electrophilic addition across the double bond', 'other substances can also consume bromine'],
  // Q60 HBr addition
  ['Q60', 'is the same as 1-bromopropane', '2,2-Dibromopropane contains two bromine atoms on the central carbon.'],
  ['Q60', 'would result from the addition of Br2 (molecular bromine)', "when Br₂ adds across propene's double bond under suitable nonaqueous conditions"]
];

for (const [Q, gone, present] of REPAIRS) {
  const was = allText(pre(Q)), now = allText(rec(Q));
  ok(was.indexOf(gone) >= 0, `${Q}: "${gone.slice(0, 55)}" was not in the before-fixture, so the removal check is vacuous`);
  ok(now.indexOf(gone) < 0, `${Q}: "${gone.slice(0, 55)}" should be gone`);
  ok(now.indexOf(present) >= 0, `${Q}: "${present.slice(0, 55)}" should be present`);
}

// Four follow-up corrections applied after the batch 4 re-read, 17 November 2026.
// These replaced text that this pass itself had written, so the before-fixture
// cannot witness them; non-vacuity was established against the commit instead.
const FOLLOWUP = [
  ['Q35', 'Electron transfer from one atom to another describes ionic bonding, as seen in NaCl',
          'Electron transfer can explain the formation of Na⁺ and Cl− from neutral atoms; ionic bonding is the electrostatic attraction between those ions.'],
  ['Q35', 'form a shared "electron sea" that belongs to the entire metallic lattice',
          'valence electrons are delocalized over many atoms rather than transferred to particular atoms.'],
  ['Q37', '-182.5 degrees C', 'about −182.5 °C. The C–H bonds within each methane molecule are covalent and remain intact when methane melts.'],
  ['Q37', 'Methane (CH4) is a nonpolar molecule', 'Methane molecules are nonpolar and attract one another mainly through London dispersion forces.'],
  ['Q50', 'aspartate and glutamate - they are predominantly uncharged',
          'the amide derivatives of aspartate and glutamate; their side-chain amide groups are predominantly uncharged at physiological pH.'],
  ['Q57', 'Enzymes that cleave peptide bonds are classified as',
          'Enzymes that hydrolyze peptide bonds are classified as <strong>hydrolases</strong>, specifically <strong>proteases</strong>']
];
for (const [Q, gone, present] of FOLLOWUP) {
  const now = allText(rec(Q));
  ok(now.indexOf(gone) < 0, `${Q} follow-up: "${gone.slice(0, 55)}" should be gone`);
  ok(now.indexOf(present) >= 0, `${Q} follow-up: "${present.slice(0, 55)}" should be present`);
}
// the follow-up touched only these four, and only their explanation fields
ok(['Q35', 'Q37', 'Q50', 'Q57'].every(Q => MAP[Q] === { Q35: 'chem-216', Q37: 'chem-218', Q50: 'chem-231', Q57: 'chem-238' }[Q]),
  'the four follow-up ids come from the verified map');
ok(/<p><strong>A\. transferred from one atom to another:<\/strong> Electron transfer can explain/.test(rec('Q35').explanation),
  "Q35 follow-up: the new text is option A's feedback body under its unchanged heading");
ok(/<p><strong>B\. CH₄:<\/strong> Methane molecules are nonpolar/.test(rec('Q37').explanation),
  "Q37 follow-up: the new text is option B's feedback body under its unchanged heading");
ok(/<\/table><p>Asparagine and glutamine are the amide derivatives[\s\S]*?<\/p><h4>Why the other choices/.test(rec('Q50').explanation),
  'Q50 follow-up: the new sentence is the single paragraph between the table and the feedback');
ok(/^<h4>Correct Answer: Hydrolase \(protease\)<\/h4><p>Enzymes that hydrolyze[\s\S]*?proteinases\)\. Hydrolases \(EC class 3\) catalyze bond cleavage in which water is consumed in the overall reaction\.<\/p>/.test(rec('Q57').explanation),
  'Q57 follow-up: the new first sentence is followed by the unchanged second sentence');
ok((rec('Q37').explanation.match(/−182\.5 °C/g) || []).length === 2,
  "Q37 follow-up: the −182.5 °C value agrees between the table and option B's feedback");

// universal claims the review bans anywhere in the pack
const BANNED = [
  'optically active',
  'imino acid',
  'intramolecular (within compounds) force',
  'exactly 3.6 residues',
  'Dilute NaOH is a weak base',
  'rare earth elements',
  'potassium-argon dating',
  'Anfinsen',
  'helix breaker',
  'essentially zero electron affinity',
  'fully deprotonated',
  'nonpolar (<0.4)',
  'Lanthanides & Actinides',
  'Physical state increases',
  'the three aromatic amino acids',
  'most polar common molecules',
  'liquid at standard conditions',
  'Bond formation with ATP',
  '−78°C (sublimes)',
  '3-bromopropane'
];
for (const Q of QS) {
  const now = allText(rec(Q));
  for (const b of BANNED) ok(now.indexOf(b) < 0, `${Q}: banned claim still present -> "${b}"`);
}

// ---------------------------------------------------------------------------
section("5. the review's own final-consistency list");

ok(/Nitrogen has a higher first ionization energy than oxygen/.test(rec('Q21').explanation) &&
   /N has a higher value than O/.test(rec('Q21').explanation),
  'Q21 should state N > O for first ionization energy, in both the explanation and its points');
ok(/An added electron enters the same 3s subshell/.test(rec('Q27').explanation),
  'Q27 should say a sodium atom gains an electron into 3s');
ok(/formation of a stable ground-state Ar− ion by simple attachment is unfavorable/.test(rec('Q27').explanation),
  "Q27 should not treat argon's attachment as literally zero");
ok(/Ionic bonding is electrostatic attraction between oppositely charged ions/.test(rec('Q28').explanation),
  'Q28 should define ionic bonding as ion attraction');
ok(/sublimes at about −78\.5 °C/.test(rec('Q37').explanation) && /not a melting point/.test(rec('Q37').explanation),
  "Q37 should label CO₂'s −78.5 °C value a sublimation temperature");
ok(/secondary amine, not an imine/.test(rec('Q48').explanation), 'Q48 should call free proline a secondary amine');
ok(/bonded to two carbon atoms and one hydrogen, making it a secondary amine/.test(rec('Q55').explanation),
  'Q55 should derive free proline\'s secondary amine from its substituents');
ok(/no N–H bond and cannot donate the usual backbone hydrogen bond/.test(rec('Q48').explanation),
  'Q48 should say internal peptide-bonded proline lacks an N–H donor');
ok(/no N–H hydrogen-bond donor/.test(rec('Q55').explanation),
  'Q55 should say internal peptide-bonded proline lacks an N–H donor');
ok(/not exclusive to histidine/.test(rec('Q45').explanation), 'Q45 should not make catalysis exclusive to histidine');
ok(/COOH at the top and the side chain at the bottom/.test(rec('Q53').explanation) &&
   /COOH at the top and side chain R at the bottom/.test(rec('Q53').question),
  'Q53 should state the Fischer orientation in both stem and explanation');
ok(/Translocases \(EC 7\)/.test(rec('Q57').explanation), 'Q57 should carry the EC 7 row');
ok(/seven main classes, including translocases as EC 7/.test(rec('Q57').explanation),
  "Q57's points should name the seven-class scheme");
ok(/Energy-coupled bond formation, often using ATP/.test(rec('Q57').explanation),
  'Q57 should not describe all ligases as ATP-dependent');
ok(/NaOH is a strong base even when its solution is dilute/.test(rec('Q59').explanation),
  'Q59 should correct the dilute-NaOH claim');
ok(/Concentrated sulfuric acid can react with ethene/.test(rec('Q59').explanation),
  'Q59 should concede that concentrated sulfuric acid reacts with ethene');
ok(/in the absence of ultraviolet light/.test(rec('Q59').question),
  "Q59's stem should state the conditions that make bromine water the answer");
// Q41 and Q49 must scope the condensation equation the same way
for (const Q of ['Q41', 'Q49']) {
  ok(/activated amino acids attached to tRNA/.test(rec(Q).explanation),
    `${Q} should distinguish the net condensation equation from ribosomal synthesis`);
  ok(/condensation/.test(rec(Q).question), `${Q}'s stem should name the overall condensation representation`);
}

// ---------------------------------------------------------------------------
section('6. presentation: points, Bottom Lines and tables');

let totalPoints = 0;
for (const Q of QS) {
  const lines = pointLines(rec(Q).explanation);
  ok(lines.length === 3, `${Q}: ${lines.length} educational points, expected 3`);
  totalPoints += lines.length;
  ok((rec(Q).explanation.match(/<ul>/g) || []).length === 1, `${Q}: not exactly one <ul>`);
  for (const l of lines) {
    // the review forbids padding points to an arbitrary minimum, so this floor
    // only catches a truncated or empty line
    ok(l.length >= 20, `${Q}: an educational point is too short -> "${l}"`);
    ok(/[.!?]$/.test(l.trim()), `${Q}: an educational point does not end in punctuation -> "${l}"`);
  }
  ok(JSON.stringify(lines) === JSON.stringify(SPEC[Q].points),
    `${Q}: the stored points differ from the spec's supplied set`);
}
ok(totalPoints === 180, `${totalPoints} educational points in the pack, expected 180`);

// the four stock blocks, derived from the before-fixture rather than hand-listed
const seen = {};
for (const Q of QS) for (const l of pointLines(pre(Q).explanation)) seen[l] = (seen[l] || 0) + 1;
const GENERIC = Object.keys(seen).filter(l => seen[l] >= 2);
ok(GENERIC.length === 12, `derived ${GENERIC.length} stock point lines from the before-fixture, expected 12 (four blocks of three)`);
for (const Q of QS) {
  const now = rec(Q).explanation;
  for (const g of GENERIC) ok(now.indexOf(g) < 0, `${Q}: a generic stock point survived -> "${g.slice(0, 50)}"`);
}
// no point line is shared between two items any more
const after = {};
for (const Q of QS) for (const l of pointLines(rec(Q).explanation)) (after[l] = after[l] || []).push(Q);
const shared = Object.keys(after).filter(l => after[l].length > 1);
ok(shared.length === 0, `point lines shared between items: ${shared.map(l => l.slice(0, 40)).join(' | ')}`);

let totalBL = 0;
for (const Q of QS) {
  const n = Number(Q.slice(1));
  const count = (rec(Q).explanation.match(/Bottom Line:/g) || []).length;
  ok(count === (n <= 57 ? 1 : 0), `${Q}: ${count} Bottom Lines, expected ${n <= 57 ? 1 : 0}`);
  totalBL += count;
  if (n <= 57) {
    const bl = bottomOf(rec(Q).explanation);
    ok(bl.length >= 40, `${Q}: the Bottom Line is too short`);
    const replaced = idmap.bottom_line_replacements.indexOf(Q) >= 0;
    const same = bottomOf(pre(Q).explanation) === bl;
    ok(replaced !== same, `${Q}: Bottom Line ${same ? 'unchanged' : 'changed'} but the id map says ${replaced ? 'replaced' : 'kept'}`);
  }
}
ok(totalBL === 57, `${totalBL} Bottom Lines in the pack, expected 57`);
ok(idmap.bottom_line_replacements.length === 45, `the id map lists ${idmap.bottom_line_replacements.length} Bottom Line replacements, expected 45`);

let totalTables = 0;
for (const Q of QS) {
  const n = (rec(Q).explanation.match(/<table/g) || []).length;
  const want = idmap.tables.indexOf(Q) >= 0 ? 1 : 0;
  ok(n === want, `${Q}: ${n} tables, expected ${want}`);
  totalTables += n;
  if (!want) continue;
  const t = tableOf(rec(Q).explanation);
  ok(/^<table class='exp-table'><tr><th>/.test(t), `${Q}: the table does not open with a header row`);
  ok(/<\/tr><\/table>$/.test(t), `${Q}: the table does not close after its last row`);
  const rows = (t.match(/<tr>/g) || []).length;
  ok(rows >= 3, `${Q}: the table has only ${rows} rows`);
  const widths = new Set((t.match(/<tr>[\s\S]*?<\/tr>/g) || []).map(r => (r.match(/<t[hd]>/g) || []).length));
  ok(widths.size === 1, `${Q}: the table's rows have differing cell counts (${[...widths].join(', ')})`);
  const repaired = idmap.tables_repaired.indexOf(Q) >= 0;
  const same = tableOf(pre(Q).explanation) === t;
  ok(repaired !== same, `${Q}: table ${same ? 'unchanged' : 'changed'} but the id map says ${repaired ? 'repaired' : 'kept as is'}`);
}
ok(totalTables === 13, `${totalTables} tables in the pack, expected 13`);
ok((tableOf(rec('Q57').explanation).match(/<tr>/g) || []).length === 8,
  "Q57's table should have a header row plus seven enzyme classes");

// ---------------------------------------------------------------------------
section('7. every heading agrees with its own option');

for (const Q of QS) {
  const q = rec(Q), n = Number(Q.slice(1)), e = q.explanation;
  const m = e.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/);
  ok(!!m, `${Q}: the explanation does not open with the keyed heading`);
  if (!m) continue;
  const want = (n <= 57 ? '' : LETTER[q.correct] + '. ') + q.options[q.correct];
  ok(dec(m[1]) === dec(want), `${Q}: keyed heading [${m[1]}] does not match option [${want}]`);
  ok(n <= 57 ? !/^[ABCD]\. /.test(m[1]) : /^[ABCD]\. /.test(m[1]),
    `${Q}: the keyed heading should be ${n <= 57 ? 'unlettered' : 'lettered'}, as the review requires`);
  for (let j = 0; j < 4; j++) {
    if (j === q.correct) continue;
    const h = e.match(new RegExp('<strong>' + LETTER[j] + '\\. ([\\s\\S]*?):<\\/strong>'));
    ok(!!h, `${Q}: no heading for distractor ${LETTER[j]}`);
    if (h) ok(dec(h[1]) === dec(q.options[j]),
      `${Q} ${LETTER[j]}: heading [${h[1]}] does not match option [${q.options[j]}]`);
  }
}

// ---------------------------------------------------------------------------
section('8. distractor feedback is complete, specific and distinct');

const bodies = {};
let totalParas = 0;
for (const Q of QS) {
  const q = rec(Q), e = q.explanation;
  const paras = fbParas(e);
  ok(paras.length === 3, `${Q}: ${paras.length} distractor paragraphs, expected 3`);
  totalParas += paras.length;
  const letters = paras.map(p => p.match(/<strong>([ABCD])\./)[1]);
  const wantOrder = [0, 1, 2, 3].filter(j => j !== q.correct).map(j => LETTER[j]);
  ok(JSON.stringify(letters) === JSON.stringify(wantOrder),
    `${Q}: distractor paragraphs are in order ${letters.join('')}, expected ${wantOrder.join('')}`);
  ok(letters.indexOf(LETTER[q.correct]) < 0, `${Q}: a paragraph is labelled with the keyed letter`);
  const main = mainOf(e);
  const localBodies = [];
  for (const p of paras) {
    const b = bodyOf(p);
    ok(b.length >= 40, `${Q}: a distractor paragraph is too short -> "${b.slice(0, 60)}"`);
    ok(/[.!?]$/.test(b.trim()), `${Q}: a distractor paragraph does not end in punctuation -> "${b.slice(-40)}"`);
    ok(main.indexOf(b) < 0, `${Q}: a distractor paragraph is copied verbatim from the main explanation`);
    localBodies.push(b);
    (bodies[b] = bodies[b] || []).push(Q);
  }
  ok(new Set(localBodies).size === 3, `${Q}: two distractor paragraphs share the same body`);
}
ok(totalParas === 180, `${totalParas} distractor paragraphs in the pack, expected 180`);
const dupBodies = Object.keys(bodies).filter(b => bodies[b].length > 1);
ok(dupBodies.length === 0, `distractor bodies shared between items: ${dupBodies.map(b => b.slice(0, 40)).join(' | ')}`);

// the 25 the review lists as missing were absent before and are present now
let restored = 0;
for (const [Q, letters] of Object.entries(idmap.missing_feedback_restored)) {
  for (const L of letters) {
    restored++;
    ok(fbFor(pre(Q).explanation, L) === '', `${Q} ${L}: the review says this paragraph was missing, but the fixture has one`);
    ok(fbFor(rec(Q).explanation, L) !== '', `${Q} ${L}: the restored paragraph is still missing`);
  }
}
ok(restored === 25, `the id map lists ${restored} restored paragraphs, expected 25`);
// and no other item was missing one
for (const Q of QS) {
  const q = pre(Q);
  for (let j = 0; j < 4; j++) {
    if (j === q.correct) continue;
    const had = fbFor(q.explanation, LETTER[j]) !== '';
    const listed = (idmap.missing_feedback_restored[Q] || []).indexOf(LETTER[j]) >= 0;
    ok(had !== listed, `${Q} ${LETTER[j]}: the fixture ${had ? 'has' : 'lacks'} a paragraph but the id map says otherwise`);
  }
}

// ---------------------------------------------------------------------------
section('9. structural invariants');

for (const Q of QS) {
  const e = rec(Q).explanation;
  for (const t of ['p', 'strong', 'em', 'ul', 'li', 'h4', 'sub', 'sup', 'table', 'tr', 'th', 'td', 'div']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, `${Q}: <${t}> ${o} open vs ${c} close`);
  }
  // tag counts cannot see a doubled pair such as "</p></p><p><p>"
  ok(!/<\/p>\s*<\/p>/.test(e), `${Q}: doubled </p>`);
  ok(!/<p(?: class='[^']*')?>\s*<p[ >]/.test(e), `${Q}: doubled <p>`);
  let depth = 0, bad = false;
  for (const m of e.match(/<p(?: class='[^']*')?>|<\/p>/g) || []) {
    depth += m === '</p>' ? -1 : 1;
    if (depth < 0 || depth > 1) { bad = true; break; }
  }
  ok(!bad, `${Q}: paragraph nesting is wrong`);
  ok(depth === 0, `${Q}: unbalanced paragraphs`);
  ok((e.match(/<h4>/g) || []).length === 3, `${Q}: not exactly three h4 headings`);
  ok(e.indexOf(FB_H) >= 0 && e.indexOf(PT_H) >= 0, `${Q}: a section heading went missing`);
  ok(e.indexOf('—') < 0, `${Q}: em dash`);
  ok(!/[‘’“”]/.test(e), `${Q}: curly quote`);
  ok(!/https?:\/\//.test(e), `${Q}: URL in student-facing text`);
  ok(!/\bR\d{1,2}\b/.test(e), `${Q}: reviewer source label`);
  ok(e.indexOf('\u0000') < 0, `${Q}: the table sentinel leaked into the text`);
  ok(!/\bSources?:/.test(e), `${Q}: a reviewer source note reached the student text`);
  ok(!/feedback\b/i.test(e) || /acid/.test(e), `${Q}: a reviewer shorthand label may have reached the text`);
}
// Q41's trailing empty div is out of scope and must survive
ok(rec('Q41').explanation.indexOf('<div style="text-align:center;margin:12px 0"></div>') >= 0,
  "Q41's pre-existing trailing div should be preserved");

// ---------------------------------------------------------------------------
section('10. the numbers in the kept calculations still check out');

ok(/17 \+ 1 = 18/.test(rec('Q1').explanation), 'Q1: 17 + 1 = 18 electrons');
ok(/2\(3\)\+1 = <strong>7<\/strong>/.test(rec('Q6').explanation), 'Q6: 2l + 1 = 7 orbitals for l = 3');
ok(/10 \+ 2 \+ 3 = <strong>15 electrons<\/strong>/.test(rec('Q8').explanation), 'Q8: [Ne] + 3s² 3p³ = 15 electrons');
ok(/39 − 20 = <strong>19 protons<\/strong>/.test(rec('Q9').explanation), 'Q9: Z = 39 − 20 = 19');
ok(/Radial nodes = n − l − 1 = 1/.test(rec('Q11').explanation) && /total is n − 1 = 2/.test(rec('Q11').explanation),
  'Q11: 1 radial + 1 angular = 2 total nodes');
ok(/4s has n \+ l = 4, whereas 3d has n \+ l = 5/.test(rec('Q10').explanation), 'Q10: n + l of 4s and 3d');
ok(/15 − 1 = <strong>14<\/strong>/.test(rec('Q49').explanation), 'Q49: 15 − 1 = 14 peptide links');
ok(/Nickel has the highest atomic number \(28\)/.test(rec('Q4').explanation), 'Q4: nickel has 28 protons');
ok(/3\.6 amino acid residues/.test(rec('Q54').explanation) && /0\.54 nm/.test(rec('Q54').explanation),
  'Q54: 3.6 residues per turn and a 0.54 nm pitch');
ok(/109\.5°/.test(rec('Q38').explanation), 'Q38: the ideal tetrahedral angle');
ok(/801 °C/.test(rec('Q37').explanation), "Q37: NaCl's melting point");
ok(/496 kJ\/mol/.test(rec('Q25').explanation) && /4562 kJ\/mol/.test(rec('Q25').explanation),
  "Q25: sodium's first and second ionization energies");

// ---------------------------------------------------------------------------
section('11. cross-item consistency and the coverage ledger');

// electron attachment: Cl releases more than F wherever the pack says so
for (const Q of ['Q13', 'Q19']) ok(/[Cc]hlorine releases more energy/.test(rec(Q).explanation) || /need not have the same highest-ranked element/.test(rec(Q).explanation),
  `${Q} should keep the electronegativity / electron-affinity distinction`);
// histidine's side-chain pKa is quoted consistently
for (const Q of ['Q44', 'Q45']) ok(/pKa (~6\.0|near 6|of about 6)/.test(rec(Q).explanation),
  `${Q} should quote histidine's side-chain pKa near 6`);
// proline's nitrogen is described the same way in all three proline items
for (const Q of ['Q45', 'Q48', 'Q55']) ok(/backbone nitrogen|alpha-amino nitrogen/.test(rec(Q).explanation),
  `${Q} should describe proline's ring reaching the backbone nitrogen`);

const cov = idmap.coverage;
ok(cov.chemistry_total === 485, 'coverage: chemistry total');
ok(cov.reviewed_before_this_batch === 179, 'coverage: 179 chemistry items were reviewed before this batch');
ok(cov.new_unique_ids_this_batch === 60, 'coverage: this batch adds 60 new unique ids');
ok(cov.previously_reviewed_included_again.length === 0, 'coverage: no display repeats an earlier reviewed id');
ok(cov.reviewed_before_this_batch + cov.new_unique_ids_this_batch === cov.reviewed_after_this_batch,
  'coverage: 179 + 60 should equal the new reviewed total');
ok(cov.reviewed_after_this_batch === 239, 'coverage: 239 chemistry items reviewed after this batch');
ok(cov.reviewed_after_this_batch + cov.still_unreviewed_chemistry === 485,
  'coverage: reviewed plus unreviewed should be the whole chemistry bank');
ok(cov.still_unreviewed_chemistry === 246, 'coverage: 246 chemistry items still unreviewed');
ok(cov.edited_this_batch === 60 && cov.kept_unchanged_this_batch === 0,
  'coverage: all 60 displays were edited, since every one carried a generic point block');
ok(cov.biology_unaffected === true && cov.biology_still_unreviewed.length === 5,
  'coverage: biology is untouched, with five items still unreviewed');
ok(idmap.deviations.length === 0, `the id map records ${idmap.deviations.length} deviation(s)`);

// ---------------------------------------------------------------------------
console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
