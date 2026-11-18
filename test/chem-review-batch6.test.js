/* Result-verifying suite for SHOSMED_LF3_Chemistry_Batch6_Review.txt.
 *
 * This checks the BANK, not the harness. The review supplied original
 * identification signatures, so section 1 re-derives the id map by full content
 * match from the before-fixture and confirms it against the review's key block.
 * Every "claim removed" assertion is paired with a non-vacuity check that the
 * claim really was in the before-fixture.
 *
 * Passing this suite establishes structure and consistency. It is NOT
 * scientific approval of the chemistry.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const L = 'ABCD';
const WHY = '<h4>Why the other choices are wrong:</h4>';
const KEP = '<h4>Key Educational Points:</h4>';

const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch6-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch6-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch6-untouched.json'), 'utf8'));

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const by = id => data.chemistry.find(r => r.id === id);
const rec = Q => by(MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);
const allText = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const pointLines = e => {
  const m = e.match(/<ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>[\s\S]*?<\/li>/g) || []).map(s => s.slice(4, -5)) : [];
};
const mainOf = e => (e.match(/<\/h4><p>([\s\S]*?)<\/p><h4>Why/) || ['', ''])[1];
const fbOf = e => e.slice(e.indexOf(WHY) + WHY.length, e.indexOf(KEP));

let n = 0, bad = 0;
function ok(c, m) { n++; if (!c) { bad++; console.error('  FAIL ' + m); } }
function section(t) { console.log('\n' + t); }

const KEYS = 'BBBBCBBDCB' + 'CBBBABCBCC' + 'BBBBCBBCBB' + 'CCBCCBBBBC' + 'CBBBBBBCBB' + 'BCBBCBCBBA';

/* ------------------------------------------------------------------ */
section("1. the id map, re-derived from the review's ORIGINAL signatures");

ok(QS.length === 60, 'the map has 60 display numbers');
ok(Object.keys(before).length === 60, 'the before-fixture has 60 records');
ok(KEYS === idmap.asserted_key_block, 'the id map records the review key block');

/* the pre-pass bank: the before-fixture inside the pack, live records outside it.
   Section 3 proves separately that nothing outside the pack moved. */
const PRE = {};
for (const q of data.chemistry) if (!PACK.has(q.id)) PRE[q.id] = q;
for (const Q of QS) PRE[MAP[Q]] = pre(Q);
ok(Object.keys(PRE).length === 485, 'the reconstructed pre-pass bank has 485 chemistry records');

/* the canonical form used for content matching */
const SUBS = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
const SUPS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-' };
function canon(s) {
  let t = String(s);
  t = t.replace(/<sub>([\s\S]*?)<\/sub>/g, '$1').replace(/<sup>([\s\S]*?)<\/sup>/g, '$1').replace(/<[^>]+>/g, '');
  t = t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
  t = t.replace(/[₀-₉]/g, c => SUBS[c]).replace(/[⁰¹²³⁴-⁻]/g, c => SUPS[c] || c);
  t = t.replace(/[‐-―−]/g, '-').replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"');
  t = t.replace(/α/g, 'alpha').replace(/β/g, 'beta');
  return t.toLowerCase().replace(/\s+/g, ' ').trim();
}
const sig = q => canon(q.question) + '\u0001' + q.options.map(canon).join('\u0001');

/* every signature in the pre-pass bank is unique, so no match is ambiguous */
const counts = {};
for (const id of Object.keys(PRE)) { const k = sig(PRE[id]); counts[k] = (counts[k] || 0) + 1; }
ok(Object.values(counts).every(v => v === 1),
  'no two records in the 485-record pre-pass bank share a full signature');

for (let i = 0; i < 60; i++) {
  const Q = 'Q' + (i + 1), id = MAP[Q], r = pre(Q);
  ok(r.id === id, Q + ': the before-fixture record is ' + id);
  const hits = Object.keys(PRE).filter(k => sig(PRE[k]) === sig(r));
  ok(hits.length === 1 && hits[0] === id,
    `${Q}: the original stem plus all four original options match ${hits.length} records (${hits.join(', ')})`);
  ok(L[r.correct] === KEYS[i], Q + ': original key ' + L[r.correct] + ' equals the review key ' + KEYS[i]);
  ok(rec(Q).correct === r.correct, Q + ': the answer letter did not move');
  ok(rec(Q).id === id, Q + ': the bank id did not move');
}
const derivedBlock = QS.map(Q => L[pre(Q).correct]).join('');
ok(derivedBlock === KEYS, 'the key block derived from the before-fixture equals the review block');
const tally = {}; for (const c of derivedBlock) tally[c] = (tally[c] || 0) + 1;
ok(tally.A === 2 && tally.B === 39 && tally.C === 18 && tally.D === 1,
  'derived tally ' + JSON.stringify(tally) + ' equals the review tally A2/B39/C18/D1');
/* contiguity as a derived result */
const idxOf = {}; data.chemistry.forEach((q, i) => idxOf[q.id] = i);
let contiguous = true;
for (let i = 1; i < 60; i++) if (idxOf[MAP['Q' + (i + 1)]] !== idxOf[MAP['Q' + i]] + 1) contiguous = false;
ok(contiguous, 'the verified ids occupy 60 consecutive bank positions (a derived result)');
ok(MAP.Q1 === 'chem-302' && MAP.Q60 === 'chem-361', 'the pack runs chem-302 .. chem-361');
/* zero overlap with batches 1-5 */
const EARLIER = new Set();
for (const f of [1, 2, 3, 4, 5]) {
  const p = path.join(ROOT, 'scripts', 'chem-review-batch' + f + '-idmap.json');
  if (!fs.existsSync(p)) continue;
  const m = JSON.parse(fs.readFileSync(p, 'utf8')).map;
  for (const k of Object.keys(m)) EARLIER.add(m[k]);
}
ok(EARLIER.size === 299, 'chemistry batches 1-5 cover 299 ids (got ' + EARLIER.size + ')');
ok(QS.every(Q => !EARLIER.has(MAP[Q])), 'no id in this pack was reviewed in an earlier chemistry batch');

/* ------------------------------------------------------------------ */
section('2. scope: 59 edited, Q7 byte-identical, 18 stems, 3 options');

const changed = [], unchanged = [];
for (const Q of QS) {
  const a = pre(Q), b = rec(Q);
  const same = a.question === b.question && a.correct === b.correct &&
    JSON.stringify(a.options) === JSON.stringify(b.options) && a.explanation === b.explanation;
  (same ? unchanged : changed).push(Q);
}
ok(changed.length === 59, '59 items were edited (got ' + changed.length + ')');
ok(unchanged.length === 1 && unchanged[0] === 'Q7', 'exactly Q7 is unchanged (got ' + unchanged.join(', ') + ')');
const q7a = pre('Q7'), q7b = rec('Q7');
ok(q7a.question === q7b.question && q7a.explanation === q7b.explanation &&
   JSON.stringify(q7a.options) === JSON.stringify(q7b.options) && q7a.correct === q7b.correct,
  'Q7 chem-308 is byte-identical in every field');
ok(pointLines(q7b.explanation).length === 5, 'Q7 keeps its five individual educational points');

const STEMS = idmap.stem_changes;
ok(STEMS.length === 18, 'the id map lists 18 stem changes');
const stemsNow = QS.filter(Q => pre(Q).question !== rec(Q).question);
ok(JSON.stringify(stemsNow) === JSON.stringify(STEMS),
  'exactly the listed 18 stems changed (got ' + stemsNow.join(', ') + ')');
for (const Q of QS) if (!STEMS.includes(Q)) ok(pre(Q).question === rec(Q).question, Q + ': stem untouched, as required');

const optsNow = [];
for (const Q of QS) pre(Q).options.forEach((o, j) => { if (o !== rec(Q).options[j]) optsNow.push(Q + ' ' + L[j]); });
ok(JSON.stringify(optsNow) === JSON.stringify(['Q22 B', 'Q44 A', 'Q50 B']),
  'exactly the three listed option texts changed (got ' + optsNow.join(', ') + ')');
for (const Q of Object.keys(idmap.option_changes)) {
  const c = idmap.option_changes[Q], j = L.indexOf(c.letter);
  ok(pre(Q).options[j] === c.from, Q + ' ' + c.letter + ': the original text was ' + JSON.stringify(c.from));
  ok(rec(Q).options[j] === c.to, Q + ' ' + c.letter + ': now reads ' + JSON.stringify(c.to));
}

/* points-only items */
for (const Q of idmap.scope.points_only) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question, Q + ' is points-only: stem untouched');
  ok(JSON.stringify(a.options) === JSON.stringify(b.options), Q + ' is points-only: options untouched');
  const strip = e => e.replace(/<h4>Key Educational Points:<\/h4><ul>[\s\S]*?<\/ul>/, '<POINTS>');
  ok(strip(a.explanation) === strip(b.explanation),
    Q + ' is points-only: everything outside the point list is byte-identical');
  ok(pointLines(a.explanation).join('|') !== pointLines(b.explanation).join('|'), Q + ': its points really did change');
}
ok(idmap.scope.points_only.length === 5 &&
   JSON.stringify(idmap.scope.points_only) === JSON.stringify(['Q24', 'Q47', 'Q48', 'Q52', 'Q57']),
  'the points-only items are Q24, Q47, Q48, Q52 and Q57');

/* ------------------------------------------------------------------ */
section('3. nothing outside the pack moved');

let bioBad = 0;
for (const q of data.biology) if (untouched.biology[q.id] !== hash(q)) { bioBad++; console.error('    changed: ' + q.id); }
ok(bioBad === 0, 'all 629 biology records are unchanged');
ok(Object.keys(untouched.biology).length === 629, 'the untouched fixture covers 629 biology records');
let chemBad = 0, nChem = 0;
for (const q of data.chemistry) {
  if (PACK.has(q.id)) continue;
  nChem++;
  if (!untouched.chemistry[q.id]) continue;            // pruned by a later reviewed batch
  if (untouched.chemistry[q.id] !== hash(q)) { chemBad++; console.error('    changed outside the pack: ' + q.id); }
}
ok(chemBad === 0, 'every chemistry record outside the pack is unchanged');
ok(nChem === 425, '425 chemistry records lie outside the pack (got ' + nChem + ')');
ok(nChem + 60 === 485, 'the partition adds up: 425 outside + 60 in the pack = 485');
ok(data.biology.length === 629 && data.chemistry.length === 485, 'bank counts are still 629 / 485');

/* ------------------------------------------------------------------ */
section('4. the specific science and feedback repairs the review names');

/* [display, gone, present] - each gone is also checked for non-vacuity */
const REPAIRS = [
  // Q1 racemate and tetrahedral wording
  ['Q1', 'This asymmetry allows it to rotate plane-polarized light.', 'an equal mixture of the two enantiomers has no net rotation'],
  ['Q1', 'A carbon must have four different substituents to be a stereocenter.', 'For a tetrahedral carbon to be a chirality center'],
  // Q2 meso: overall achirality, not cancelling rotations
  ['Q2', 'The optical rotation from one chiral center is exactly cancelled by the other.', 'making the molecule superimposable on its mirror image'],
  ['Q2', 'the rotation caused by one chiral center is exactly canceled by its mirror-image counterpart within the same molecule', 'its overall symmetry also matters'],
  ['Q2', 'meso = one molecule canceling itself', 'Meso-tartaric acid is one achiral compound'],
  ['Q2', 'Meso compounds are optically inactive despite having chiral centers because they:', 'Which feature explains its overall achirality?'],
  // Q3 CIP isotopes
  ['Q3', 'substituent priority is determined by:', 'what determines their initial priority'],
  ['Q3', 'If there is a tie, you move outward along the chain to the next atoms until a difference is found.', 'the higher mass number takes priority, such as ²H over ¹H'],
  ['Q3', 'Priority depends on atomic number alone - not on group size, mass, or electronegativity', 'the isotope with the higher mass number ranks higher'],
  ['Q3', 'The system works by comparing atomic numbers at each successive point of difference, outward from the chiral center.', 'Multiple bonds are represented using duplicate atoms'],
  // Q4 enantiomers in achiral environments
  ['Q4', '<p><strong>A. Identical:</strong> They have identical physical properties except for the direction of optical rotation', 'the four groups around C2 have opposite three-dimensional arrangements'],
  ['Q4', 'They occur when a molecule has two or more stereocenters and the configurations differ at some but not all centers.', 'Examples include E/Z alkene pairs'],
  // Q5 diastereomers need not be two tetrahedral centers
  ['Q5', 'They differ at some but not all stereocenters. Unlike enantiomers, diastereomers have different physical properties', 'they may be E/Z alkene isomers'],
  ['Q5', 'Enantiomers always rotate plane-polarized light by equal amounts in opposite directions.', 'when measured under the same conditions'],
  // Q6 repeat the CIP correction
  ['Q6', 'using CIP rules (based on atomic number)', 'including atomic-number comparisons and the mass-number rule for isotopes'],
  ['Q6', 'Physical size (van der Waals radius) of substituents has no role in the E/Z naming system.', 'Bulk alone does not set priority'],
  // Q8 open-chain classification
  ['Q8', 'Fructose, by contrast, is a ketohexose (6 carbons with a ketone group at c2)', 'Open-chain glucose instead has an aldehyde at C1'],
  ['Q8', 'Glucose (C₆H₁₂O₆) has 6 carbon atoms (hexose) and an aldehyde functional group at C1 (aldo-)', 'In water it exists mainly as cyclic hemiacetals'],
  ['Q8', ' Glucose has 6 carbons and an aldehyde group,', 'Open-chain glucose has 6 carbons and an aldehyde group'],
  // Q9 Haworth versus chair
  ['Q9', 'axial and equatorial describe the chair, while up and down describe the Haworth drawing', 'a chair flip exchanges axial and equatorial positions without changing α into β'],
  ['Q9', 'Anomers arise from the two possible orientations of the –OH group at C-1 when the open chain cyclizes: axial (α) or equatorial (β) in the chair conformation.', 'their OH groups are trans or cis to the C6 CH₂OH group'],
  ['Q9', 'α-1,4 linkages give digestible starch, while β-1,4 linkages give indigestible cellulose', 'but lack cellulase for the β(1→4) linkages in cellulose'],
  // Q10 amylase, cellulase, termites
  ['Q10', 'cannot digest cellulose because we lack the enzyme cellulase to cleave β-linkages', 'other digestive enzymes finish digestion, including at branch points'],
  ['Q10', 'While cellulose molecules tend to be longer than individual amylose or amylopectin chains', 'Both polymers have variable chain lengths and molecular masses'],
  ['Q10', 'Ruminants and termites digest cellulose only through symbiotic microbes that supply cellulase - they have no such enzyme themselves.', 'they can use both their own enzymes and microbial enzymes'],
  // Q11 lactose and the reducing-sugar lesson
  ['Q11', 'If both anomeric carbons were free, the two monosaccharides would not be bonded together at all', 'glucose C1 retains a free hemiacetal group'],
  ['Q11', '<li>A reducing sugar has a free anomeric carbon that can open to an aldehyde and then be oxidised.</li>', 'retains a free hemiacetal group that can open to an aldehyde'],
  // Q12 truncated A
  ['Q12', '<p><strong>A. Enantiomers:</strong> Enantiomers would differ at every stereocenter (d-glucose vs.</p>', 'their corresponding stereocenters all have opposite configurations'],
  ['Q12', '<li>Because epimers are diastereomers, they are genuinely different compounds with different properties, handled by different enzymes.</li>', 'enzymes can distinguish their different configurations'],
  // Q13 reducing disaccharides
  ['Q13', 'anomeric forms of the same monosaccharide', 'anomeric forms of the same reducing sugar'],
  // Q14 Benedict and the amino-acid tests
  ['Q14', 'Reducing sugars (which have a free or potentially free anomeric carbon) reduce Cu²⁺ to Cu₂O (brick-red precipitate)', 'the result can range from green or yellow to orange or brick-red precipitate'],
  ['Q14', 'The xanthoproteic test specifically detects aromatic amino acids (tyrosine, tryptophan, phenylalanine) in proteins.', 'Phenylalanine gives little or no color under usual test conditions'],
  ['Q14', 'Ninhydrin reacts with the α-amino group to produce a purple-blue color known as Ruhemann’s purple.', 'proline, which has a secondary amino group, gives a yellow product'],
  // Q15 fructose conditions
  ['Q15', 'Fructose adopts predominantly which ring form in solution?', 'At equilibrium in dilute aqueous solution near room temperature'],
  ['Q15', 'the thermodynamically more stable pyranose form predominates', 'The distribution depends on temperature and solvent'],
  ['Q15', '<li>The six-membered pyranose ring is thermodynamically more stable than the five-membered furanose form.</li>', 'one ring size is not universally preferred under every condition'],
  // Q16 saturation does not fix physical state
  ['Q16', 'resulting in higher melting points (solid at room temperature, e.g., stearic acid)', 'so saturated does not mean always solid'],
  ['Q16', 'Saturated fatty acids are typically solid at room temperature (like butter and animal fats), not liquid.', 'Butter and oils are mixtures composed mainly of triacylglycerols'],
  // Q17 formal esterification
  ['Q17', 'is a triester formed when all three hydroxyl groups of glycerol react with fatty acids', 'In the formal reaction between glycerol and three free fatty acids'],
  // Q18 hydroxide consumed
  ['Q18', 'Saponification is the base-catalyzed hydrolysis of a triglyceride', 'Saponification is base-promoted hydrolysis of a triacylglycerol'],
  ['Q18', 'Water is a reactant in saponification (hydrolysis), not a product.', 'the overall reaction consumes hydroxide and yields glycerol plus sodium carboxylates'],
  // Q19 not every phospholipid has glycerol
  ['Q19', 'They have a glycerol backbone, two fatty acid chains (hydrophobic tails), and a phosphate-containing head group (hydrophilic)', 'Sphingomyelin is also a phospholipid, but has a sphingosine-based backbone'],
  ['Q19', 'They are fully hydrophobic', 'They are predominantly hydrophobic'],
  ['Q19', 'Which lipid is the basic structural unit of cell membranes?', 'main bilayer framework of human cell membranes'],
  // Q20 steroid nucleus is not planar
  ['Q20', 'Phospholipids have a glycerol backbone, two fatty acid tails, and a phosphate-containing head group. Cholesterol lacks a glycerol backbone entirely', 'many use glycerol, whereas sphingomyelin uses a different backbone'],
  ['Q20', 'planar four-ring steroid nucleus', 'rigid, puckered four-ring steroid nucleus'],
  // Q21 oleic acid and alpha-linolenic
  ['Q21', 'It is the most abundant fatty acid in human adipose tissue', 'Oleic acid is common in human adipose tissue and abundant in olive oil'],
  ['Q21', 'and linolenic acid (C18:3, omega-3).', 'α-linolenic acid (C18:3, omega-3)'],
  // Q22 trans fats
  ['Q22', 'Trans fats are harmful because they:', 'industrially produced trans fats a cardiovascular concern'],
  ['Q22', 'This allows tighter molecular packing, raising melting points and LDL cholesterol levels', 'should not be explained simply as tighter chain packing'],
  ['Q22', 'Behave more like saturated fats, increasing cardiovascular risk', 'They raise LDL cholesterol and increase cardiovascular risk'],
  ['Q22', 'the trans geometry creates a straight chain that packs like a saturated fat', 'approximately 9 kcal per gram'],
  ['Q22', 'Trans fats can be metabolized, but they are processed differently from cis fats', 'Trans fatty acids can be absorbed and metabolized'],
  // Q23 iodine value
  ['Q23', 'I₂ adds across C=C double bonds', 'A common method uses iodine monochloride (Wijs reagent)'],
  ['Q23', 'Each double bond adds two iodine atoms across it', 'More reactive C=C bonds per unit mass generally give a higher iodine value'],
  // Q24 points only
  ['Q24', 'Lipids are hydrophobic molecules that include fats, phospholipids, steroids, and waxes', 'Sphingomyelin uses a sphingosine-based backbone rather than glycerol'],
  // Q25 structural identification
  ['Q25', 'EPA has anti-inflammatory properties and is associated with cardiovascular benefits', 'written 20:5 n-3'],
  // Q26 net yield in the stem
  ['Q26', 'Glycolysis converts one molecule of glucose into:', 'using the NET ATP yield'],
  ['Q26', 'This answer gets every detail wrong', 'because four ATP are made but two are invested earlier'],
  // Q27 SDH and the pyruvate carrier
  ['Q27', 'The Krebs cycle (citric acid cycle) takes place in:', 'where are most citric acid cycle enzymes located'],
  ['Q27', 'must be actively transported into the mitochondrial matrix (via the pyruvate dehydrogenase complex)', 'through the mitochondrial pyruvate carrier'],
  ['Q27', 'where its eight enzymes sequentially oxidize acetyl-CoA', 'with succinate dehydrogenase associated with the inner membrane'],
  // Q28 approximate accounting and the restored B
  ['Q28', 'How many ATP equivalents are produced per molecule of NADH in oxidative phosphorylation?', 'usual approximate ATP accounting for human mitochondria'],
  ['Q28', '1.5 ATP per molecule is the yield from FADH₂, not NADH. FADH₂ enters the electron transport chain at Complex II', 'a free FADH₂ molecule does not enter Complex II'],
  ['Q28', '3 ATP per NADH is the older textbook value based on the P/O ratio', 'Three ATP per NADH is an older textbook accounting value'],
  // Q29 beta-oxidation arithmetic
  ['Q29', 'A C16 fatty acid (palmitate) undergoes 7 cycles, producing 8 acetyl-CoA, 7 NADH, and 7 FADH₂.', 'The final four-carbon intermediate splits into two acetyl-CoA'],
  ['Q29', 'Four carbons would mean each cycle removes nearly a quarter', 'Four is the number of reaction stages in a typical cycle'],
  // Q30 TPP and aerobic lactate
  ['Q30', 'TPP (thiamine),', 'TPP (thiamine pyrophosphate, derived from vitamin B1)'],
  ['Q30', 'pyruvate + CoA + NAD⁺ → acetyl-CoA + CO₂ + NADH.', 'Pyruvate + CoA-SH + NAD⁺ → acetyl-CoA + CO₂ + NADH + H⁺.'],
  ['Q30', 'Pyruvate is converted to lactate by lactate dehydrogenase under anaerobic conditions', 'This can occur with or without oxygen'],
  // Q31 lactate not restricted to anoxia
  ['Q31', 'In the absence of sufficient oxygen, NADH from glycolysis cannot be reoxidized', 'Lactate production is not confined to low-oxygen conditions'],
  ['Q31', '<p><strong>A. Ethanol:</strong> Ethanol is the product of anaerobic fermentation in yeast, not in human muscle.</p>', 'Yeast can convert pyruvate to acetaldehyde and then ethanol'],
  ['Q31', 'Under anaerobic conditions, pyruvate stays in the cytoplasm and is reduced to lactate instead', 'that reaction does not regenerate cytosolic NAD⁺ for glycolysis'],
  // Q32 ATP accounting, option B and the malformed paragraph
  ['Q32', '<p><p><strong>', '<p><strong>A. 2 ATP:</strong> Two ATP is the net direct ATP yield of glycolysis alone'],
  ['Q32', '10 NADH × 2.5 = 25', '4 + 20 + 3 + 5 = 32 or 4 + 20 + 3 + 3 = 30'],
  ['Q32', '<strong>B. 12 ATP:</strong> 2 ATP is the net yield from glycolysis alone', 'Twelve ATP does not account for all the products of complete glucose oxidation'],
  ['Q32', 'the energy cost of transporting cytoplasmic NADH into mitochondria', 'These shuttles transfer reducing equivalents, not NADH molecules across the inner membrane'],
  ['Q32', 'The total theoretical ATP yield from complete oxidation of one glucose molecule is approximately:', 'about 2.5 ATP per mitochondrial NADH and 1.5 ATP per FAD-linked electron pair'],
  // Q33 first committed step
  ['Q33', 'Which enzyme catalyzes the committed (rate-limiting) step of glycolysis?', 'Which enzyme catalyzes the first committed step of glycolysis?'],
  ['Q33', 'Although hexokinase is also regulated, pfk-1 is considered the primary regulatory enzyme of the pathway.', 'That product can enter glycolysis, glycogen metabolism or the pentose phosphate pathway'],
  ['Q33', 'The rate-limiting step must be both irreversible and subject to allosteric regulation', 'control of pathway flux can be shared among several steps'],
  // Q34 ketone bodies
  ['Q34', 'They serve as an alternative fuel source for the brain, heart, and skeletal muscle when glucose availability is limited.', 'Acetone is volatile and some is exhaled, but it is not a principal ketone fuel'],
  ['Q34', 'ketogenesis itself occurs in the mitochondria, not the nucleus. The nucleus houses DNA', 'the principal site of ketogenesis is liver mitochondria, not the nucleus'],
  ['Q34', 'Fatty acid synthesis (lipogenesis) occurs in the cytoplasm, not the endoplasmic reticulum', 'The endoplasmic reticulum participates in several lipid processes'],
  // Q35 fairness: net accounting
  ['Q35', 'FAD is reduced to FADH₂ in which step of the Krebs cycle?', 'which reaction is assigned one FADH₂ equivalent rather than one NADH'],
  ['Q35', 'This is the only Krebs cycle enzyme embedded in the inner mitochondrial membrane and the only one using FAD as its coenzyme', 'although free FADH₂ is not released'],
  ['Q35', 'The only step in the Krebs cycle that reduces FAD to FADH₂ is succinate → fumarate', 'This is a net NADH-producing step'],
  // Q36 pyrrole basicity
  ['Q36', 'pKₐ of conjugate acid ≈ −4', 'making nitrogen protonation unfavorable'],
  ['Q36', 'Both pyrrole and pyridine are five- and six-membered heterocycles, respectively, but ring size is not the reason', 'Pyrrole has a smaller five-membered ring, whereas pyridine has a six-membered ring'],
  // Q37 furanose is not furan
  ['Q37', 'found in furanose sugar forms but not in nucleotide bases', 'but is not the aromatic compound furan'],
  ['Q37', 'the correct terminology for the purine components is pyrimidine + imidazole', 'each with two ring nitrogens'],
  // Q38 standard-20 scope
  ['Q38', 'It is not present in any amino acid side chain.', 'It is not a side-chain ring in the standard 20 protein amino acids.'],
  ['Q38', 'but not in amino acids.', 'but not in the side chains of the standard 20 protein amino acids.'],
  // Q39 copied DNA-base feedback
  ['Q39', '<p><strong>A. Adenine and guanine:</strong> Adenine and guanine are the purine bases (double-ring structures) found in both DNA and RNA.</p>', 'each with a fused two-ring structure'],
  ['Q39', '<strong>C. Cytosine and uracil:</strong> RNA contains cytosine and uracil (u) instead of thymine.', 'Cytosine and uracil are the standard pyrimidines of RNA'],
  // Q40 thiophene orbital claim
  ['Q40', 'Thiophene is the most stable and most aromatic of the three', 'Thiophene contains sulfur, not phosphorus, as shown by its formula C₄H₄S'],
  ['Q40', 'Phosphorus is not found in common simple heterocyclic aromatic compounds', 'these names identify different ring heteroatoms'],
  // Q41 histidine pKa belongs to the side chain
  ['Q41', 'This gives histidine a pKₐ near physiological pH (~6.0), making it an important catalytic residue in many enzymes.', 'The imidazolium side chain of free histidine has a pKa of about 6'],
  ['Q41', 'making it crucial in enzyme active sites', 'the surrounding protein influences this acid-base behavior'],
  ['Q41', 'is close to physiological pH, allowing histidine to participate in acid-base catalysis in many enzymes', 'can differ in an enzyme active site'],
  // Q42 pyrimidine nitrogens
  ['Q42', 'Think of it as pyridine with an extra nitrogen inserted.', 'replacing the ring carbon at position 3 with nitrogen'],
  ['Q42', 'Purine bases (adenine, guanine) contain 4 total nitrogens but across a bicyclic (9-atom) ring system', 'an additional nitrogen in an amino group outside the rings, giving five total'],
  // Q43 nicotinamide redox states
  ['Q43', 'It is found in porphyrins (heme, chlorophyll) and in the amino acid proline (as pyrrolidine)', 'Proline contains the saturated ring pyrrolidine, which should not be confused with pyrrole'],
  ['Q43', 'The pyridine ring in NAD⁺ accepts a hydride ion during reduction to form NADH.', 'reduces this ring to the dihydropyridine form in NADH'],
  // Q44 N-1 and N-substitution
  ['Q44', 'C-1 (nitrogen)', 'N-1 (the ring nitrogen)'],
  ['Q44', 'Substitution at nitrogen would disrupt the aromatic π system', 'need not destroy aromaticity'],
  ['Q44', 'Electrophilic aromatic substitution on pyrrole preferentially occurs at which position?', 'ordinary electrophilic aromatic substitution of unsubstituted pyrrole'],
  // Q45 complete fused system
  ['Q45', 'Caffeine is a derivative of which heterocyclic ring system?', 'Which complete fused heterocyclic ring system'],
  ['Q45', '<p><strong>A. Pyrimidine:</strong> The purine ring system consists of fused pyrimidine and imidazole rings.</p>', 'but it does not name the whole structure'],
  ['Q45', 'which is why it can block adenosine receptors in the brain', 'Caffeine instead has a fused nitrogen-containing xanthine structure'],
  // Q46 polyethylene initiation
  ['Q46', 'This is initiated by free radicals, cations, or anions, or by coordination catalysts (Ziegler-Natta).', 'Common routes use free-radical initiation or coordination catalysts'],
  ['Q46', 'is another name for condensation polymerization', 'it is not the mechanism used to make polyethylene from ethene'],
  // Q49 SN1 scope
  ['Q49', 'SN1 reactions are favored by:', 'without allylic or benzylic stabilization'],
  ['Q49', 'Tertiary substrates form the most stable carbocations.', 'tertiary carbocations are more stable than secondary or primary ones'],
  ['Q49', 'Polar aprotic solvents (like DMSO, DMF, acetone) enhance nucleophile reactivity by not solvating anions', 'they do not leave the anions completely unsolvated'],
  // Q50 fairness: anti is favored, not required
  ['Q50', 'E2 elimination requires which geometric relationship between the leaving group and the β-hydrogen?', 'which relationship between a β-hydrogen and the leaving group is usually favored'],
  ['Q50', 'Anti-periplanar (trans-diaxial)', 'For a cyclohexane chair, the usual anti geometry corresponds to a trans-diaxial hydrogen and leaving group'],
  ['Q50', 'E2 is highly geometry-dependent - not any arrangement will work', 'For the freely rotating case in the stem, anti-periplanar is the usual favorable arrangement'],
  ['Q50', 'In cyclohexane rings, both groups must be axial and trans to each other', 'syn elimination is not universally impossible'],
  // Q51 SN1 is not exactly 50:50
  ['Q51', 'leading to racemization (mixture of retention and inversion)', 'they need not occur in an exactly 1:1 ratio'],
  // Q53 glycosidic linkage
  ['Q53', 'glycosidic bonds are hemiacetal/acetal linkages, structurally different from esters', 'It has acetal or ketal character'],
  // Q54 unhindered substrate and solvent
  ['Q54', 'Which factor most strongly favors SN2 over E2 when treating a primary alkyl halide with a base/nucleophile?', 'For an unhindered primary alkyl halide that has a β-hydrogen'],
  ['Q54', 'Elimination has a higher activation entropy (more disorder in the transition state', 'the precise product ratio depends on the substrate, reagent and solvent'],
  ['Q54', 'Higher temperature and polar protic solvents also tend to favor elimination', 'a protic solvent does not automatically mean an E2 reaction'],
  // Q55 traditional sulfur curing
  ['Q55', 'Vulcanization of rubber involves cross-linking polymer chains with:', 'Traditional vulcanization of natural rubber'],
  ['Q55', 'which forms cross-links (–S–S– or –Sₓ–) between polymer chains at the double bond positions', 'The bridges can contain one, two or several sulfur atoms'],
  ['Q55', 'Nitrogen is not used in vulcanization', 'Some processing additives may contain nitrogen'],
  // Q56 oxidation-state convention
  ['Q56', 'Strong oxidizing agents like KMnO₄ or CrO₃ can accomplish this in one step', 'carrying it out in one vessel does not make it a single elementary step'],
  ['Q56', 'Reduction of a primary alcohol would instead produce an alkane (R–CH₃)', 'Here the reacting carbon gains bonds to oxygen and loses bonds to hydrogen'],
  // Q58 epoxidation reagents
  ['Q58', 'requires a peracid (like mCPBA) or a peroxide, not H₂ and Pd/C', 'some peroxide methods require an appropriate catalyst or other suitable conditions'],
  // Q59 Wittig ylide and E/Z
  ['Q59', 'unlike elimination reactions which may give mixtures', 'its E/Z outcome depends on the reactants and conditions and may be a mixture'],
  ['Q59', 'Ester formation from a carbonyl requires an oxidation step (like Baeyer–Villiger oxidation for ketones)', 'An ester retains a carbonyl and has an –OR group attached to that carbonyl carbon'],
  // Q60 ketoxime scope
  ['Q60', 'Beckmann rearrangement of an oxime produces:', 'The classic Beckmann rearrangement of a ketoxime'],
  ['Q60', 'departure of water, 1,2-shift of the anti-periplanar group', 'The Beckmann product has a carbonyl bonded to nitrogen'],
  ['Q60', 'an oxime is a special type of imine', 'the transformation does not simply produce an ordinary imine'],
  ['Q60', 'The group anti to the hydroxyl migrates from carbon to nitrogen as the N–O bond breaks.', 'The group anti to the activated leaving group migrates from carbon to nitrogen']
];
for (const [Q, gone, present] of REPAIRS) {
  const was = allText(pre(Q)), now = allText(rec(Q));
  ok(was.indexOf(gone) >= 0, `${Q}: "${gone.slice(0, 55)}" was not in the before-fixture, so the removal check is vacuous`);
  ok(now.indexOf(gone) < 0, `${Q}: "${gone.slice(0, 55)}" should be gone`);
  ok(now.indexOf(present) >= 0, `${Q}: "${present.slice(0, 55)}" should be present`);
}

/* universal or incorrect claims the review bans anywhere in the pack */
const BANNED = [
  'This asymmetry allows it to rotate plane-polarized light',
  'meso = one molecule canceling itself',
  'Priority depends on atomic number alone',
  'Think of it as pyridine with an extra nitrogen inserted',
  'most stable and most aromatic of the three',
  'Nitrogen is not used in vulcanization',
  'not present in any amino acid side chain',
  'but not in amino acids.',
  'base-catalyzed hydrolysis of a triglyceride',
  'fully hydrophobic',
  'planar four-ring steroid nucleus',
  'Behave more like saturated fats',
  'Anti-periplanar (trans-diaxial)',
  'C-1 (nitrogen)',
  'TPP (thiamine),',
  'Tertiary substrates form the most stable carbocations',
  'the energy cost of transporting cytoplasmic NADH into mitochondria',
  'Ruhemann',
  '<p><p>',
  '&lt;p&gt;'
];
for (const Q of QS) {
  if (Q === 'Q7') continue;                        // frozen by the review
  const now = allText(rec(Q));
  for (const b of BANNED) ok(now.indexOf(b) < 0, `${Q}: banned claim still present -> "${b}"`);
}

/* ------------------------------------------------------------------ */
section('5. the structural repairs the review asks for');

ok(!/<p><p>/.test(rec('Q32').explanation), 'Q32: the malformed doubled paragraph tag is gone');
ok(/<p><p>/.test(pre('Q32').explanation), 'Q32: NON-VACUITY, the before-fixture really had the doubled tag');
ok(MAP.Q32 === 'chem-333', 'Q32 resolves to chem-333, the record flagged in earlier batches');
let d32 = 0, m32 = 0;
for (const t of rec('Q32').explanation.match(/<\/?p[ >]/g) || []) { d32 += /^<\//.test(t) ? -1 : 1; m32 = Math.max(m32, d32); }
ok(d32 === 0 && m32 === 1, 'Q32: paragraph nesting is now flat and balanced (end ' + d32 + ', max ' + m32 + ')');
ok((rec('Q32').explanation.match(/<p[ >]/g) || []).length === (rec('Q32').explanation.match(/<\/p>/g) || []).length,
  'Q32: paragraph tags balance');

const preFb28 = (fbOf(pre('Q28').explanation).match(/<p[ >]/g) || []).length;
ok(preFb28 === 2, 'Q28: NON-VACUITY, the before-fixture really had only two feedback paragraphs (got ' + preFb28 + ')');
ok((fbOf(rec('Q28').explanation).match(/<p[ >]/g) || []).length === 3, 'Q28: now has three feedback paragraphs');
ok(/<strong>B\. 2:<\/strong> Two ATP is not the usual estimate/.test(rec('Q28').explanation),
  "Q28: the restored option B paragraph is present under its own heading");

ok(/Enantiomers would differ at every stereocenter \(d-glucose vs\.<\/p>/.test(pre('Q12').explanation),
  'Q12: NON-VACUITY, option A really was truncated in the before-fixture');
ok(/[.?!]<\/p>/.test((fbOf(rec('Q12').explanation).match(/<p><strong>A\.[\s\S]*?<\/p>/) || [''])[0]),
  'Q12: option A now ends in a complete sentence');

ok(/<strong>B\. 12 ATP:<\/strong> Twelve ATP/.test(rec('Q32').explanation),
  "Q32: option B's paragraph now discusses its own option");

/* ------------------------------------------------------------------ */
section('6. presentation: 210 points, no Bottom Lines, no tables');

let total = 0, bl = 0, tab = 0, five = 0, three = 0;
for (const Q of QS) {
  const e = rec(Q).explanation, ls = pointLines(e);
  const want = Number(Q.slice(1)) <= 15 ? 5 : 3;
  ok(ls.length === want, Q + ' has ' + ls.length + ' educational points, expected ' + want);
  if (ls.length === 5) five++; else if (ls.length === 3) three++;
  total += ls.length;
  bl += (e.match(/Bottom Line/g) || []).length;
  tab += (e.match(/<table/g) || []).length;
  for (const l of ls) {
    ok(l.length >= 20, Q + ': an educational point is suspiciously short -> "' + l + '"');
    ok(/[.:]$/.test(l), Q + ': an educational point does not end in punctuation -> "' + l.slice(-40) + '"');
    ok(l.indexOf('<li>') < 0 && l.indexOf('</li>') < 0, Q + ': a point contains a nested list tag');
  }
  ok(new Set(ls).size === ls.length, Q + ': its educational points are not all distinct');
}
ok(total === 210, 'the pack has 210 educational points (got ' + total + ')');
ok(five === 15 && three === 45, '15 five-point and 45 three-point blocks (got ' + five + ' / ' + three + ')');
ok(bl === 0, 'the pack has no Bottom Lines (got ' + bl + ')');
ok(tab === 0, 'the pack has no tables (got ' + tab + ')');

/* the stock blocks, derived from the before-fixture, are gone */
const seen = {};
for (const Q of QS) for (const l of pointLines(pre(Q).explanation)) seen[l] = (seen[l] || 0) + 1;
const GENERIC = Object.keys(seen).filter(l => seen[l] >= 2);
ok(GENERIC.length === 9, 'derived ' + GENERIC.length + ' stock point lines from the before-fixture, expected 9 (three blocks of three)');
ok(GENERIC.length > 0, 'the stock sweep is not vacuous');
for (const Q of QS) for (const l of pointLines(rec(Q).explanation))
  ok(!GENERIC.includes(l), Q + ': still carries a stock point line -> "' + l.slice(0, 60) + '"');
for (let i = 16; i <= 60; i++) {
  const wasStock = pointLines(pre('Q' + i).explanation).every(l => GENERIC.includes(l));
  ok(wasStock, 'Q' + i + ': NON-VACUITY, its before-fixture block really was stock');
}
/* no educational point is shared between two items */
const dup = {};
for (const Q of QS) for (const l of pointLines(rec(Q).explanation)) (dup[l] = dup[l] || []).push(Q);
for (const l of Object.keys(dup))
  ok(dup[l].length === 1, 'an educational point is shared by ' + dup[l].join(', ') + ' -> "' + l.slice(0, 60) + '"');
/* the targeted point replacements really landed, and only there */
for (const Q of Object.keys(idmap.points.targeted_point_replacements)) {
  const a = pointLines(pre(Q).explanation), b = pointLines(rec(Q).explanation);
  const idxs = idmap.points.targeted_point_replacements[Q];
  ok(a.length === 5 && b.length === 5, Q + ': still five points');
  for (let i = 1; i <= 5; i++) {
    if (idxs.includes(i)) ok(a[i - 1] !== b[i - 1], Q + ': point ' + i + ' was replaced');
    else ok(a[i - 1] === b[i - 1], Q + ': point ' + i + ' was left alone');
  }
}
ok(pointLines(pre('Q7').explanation).join('|') === pointLines(rec('Q7').explanation).join('|'),
  "Q7's five points are unchanged");

/* ------------------------------------------------------------------ */
section('7. every heading agrees with its own option, and stays lettered');

for (const Q of QS) {
  const q = rec(Q), e = q.explanation;
  const kh = (e.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/) || [])[1];
  ok(kh === L[q.correct] + '. ' + q.options[q.correct],
    Q + ': the keyed heading is the lettered keyed option (got ' + JSON.stringify(kh) + ')');
  const heads = e.match(/<strong>([ABCD])\. /g) || [];
  ok(heads.length === 3, Q + ': ' + heads.length + ' distractor headings, expected 3');
  const letters = heads.map(h => h.slice(8, 9));
  ok(new Set(letters).size === 3, Q + ': duplicate distractor heading letter');
  ok(!letters.includes(L[q.correct]), Q + ': a distractor heading uses the keyed letter');
  const wantOrder = [0, 1, 2, 3].filter(j => j !== q.correct).map(j => L[j]);
  ok(JSON.stringify(letters) === JSON.stringify(wantOrder), Q + ': distractor headings are out of letter order');
  for (let j = 0; j < 4; j++) {
    if (j === q.correct) continue;
    const h = (e.match(new RegExp('<strong>' + L[j] + '\\. ([\\s\\S]*?):<\\/strong>')) || [])[1];
    ok(h === q.options[j], Q + ' heading ' + L[j] + ': ' + JSON.stringify(h) + ' does not match option ' + JSON.stringify(q.options[j]));
  }
}

/* ------------------------------------------------------------------ */
section('8. distractor feedback is complete, specific and distinct');

const bodies = {};
let paraTotal = 0;
for (const Q of QS) {
  const q = rec(Q), e = q.explanation;
  const paras = fbOf(e).split(/<\/p>\s*(?=<p[ >])/).map((p, i, a) => (i === a.length - 1 ? p : p + '</p>')).map(s => s.trim()).filter(Boolean);
  ok(paras.length === 3, Q + ': ' + paras.length + ' feedback paragraphs, expected 3');
  paraTotal += paras.length;
  const main = mainOf(e);
  const set = new Set();
  for (const p of paras) {
    const m = p.match(/^<p><strong>([ABCD])\. [\s\S]*?:<\/strong> ([\s\S]*)<\/p>$/);
    ok(!!m, Q + ': a feedback paragraph has the wrong shape -> ' + p.slice(0, 60));
    if (!m) continue;
    const body = m[2];
    ok(body.length >= 40, Q + ' ' + m[1] + ': feedback body is suspiciously short -> "' + body + '"');
    ok(/[.?!]$/.test(body.replace(/<\/?[a-z]+>$/, '')), Q + ' ' + m[1] + ': feedback does not end in punctuation');
    ok(body !== main, Q + ' ' + m[1] + ': feedback is a copy of the main explanation');
    ok(!set.has(body), Q + ' ' + m[1] + ': duplicate feedback body within the item');
    set.add(body);
    (bodies[body] = bodies[body] || []).push(Q + ' ' + m[1]);
    /* a lower-case opener is the signature of the copied fragments this review
       reports; locants such as "m-nitro..." and labels such as "sp3" are allowed */
    const opener = body.replace(/^<[^>]+>/, '');
    ok(!/^[a-z]/.test(opener) || /^([a-z]-|sp\d|tert-|cis|trans|n[CH])/.test(opener),
      Q + ' ' + m[1] + ': feedback body starts lower-case -> "' + body.slice(0, 50) + '"');
  }
}
ok(paraTotal === 180, 'the pack has 180 distractor paragraphs (got ' + paraTotal + ')');
for (const b of Object.keys(bodies))
  ok(bodies[b].length === 1, 'identical feedback shared by ' + bodies[b].join(', ') + ' -> "' + b.slice(0, 60) + '"');
/* the copied or truncated paragraphs the review reports really were defective */
const WERE_DEFECTIVE = { Q4: ['A'], Q8: ['C'], Q12: ['A'], Q31: ['A'], Q33: ['A'], Q39: ['A', 'C'], Q45: ['A'] };
for (const Q of Object.keys(WERE_DEFECTIVE)) {
  const e = pre(Q).explanation, mainWas = mainOf(e).toLowerCase();
  for (const letter of WERE_DEFECTIVE[Q]) {
    const m = e.match(new RegExp('<strong>' + letter + '\\. [\\s\\S]*?:<\\/strong> ([\\s\\S]*?)<\\/p>'));
    ok(!!m, Q + ' ' + letter + ': NON-VACUITY, the before-fixture has that paragraph');
    if (!m) continue;
    const body = m[1];
    ok(mainWas.indexOf(body.toLowerCase()) >= 0 || body.length < 130 || /vs\.$/.test(body),
      Q + ' ' + letter + ': NON-VACUITY, that paragraph really was a copy, a fragment or truncated');
    const nowBody = (rec(Q).explanation.match(new RegExp('<strong>' + letter + '\\. [\\s\\S]*?:<\\/strong> ([\\s\\S]*?)<\\/p>')) || ['', ''])[1];
    ok(nowBody !== body, Q + ' ' + letter + ': that paragraph was replaced');
  }
}

/* ------------------------------------------------------------------ */
section('9. structural invariants');

let divs = 0, curlyNow = 0, curlyWas = 0;
for (const Q of QS) {
  const q = rec(Q), e = q.explanation;
  ok((e.match(/<h4>/g) || []).length === 3, Q + ': should have exactly three h4 headings');
  ok(e.startsWith('<h4>Correct Answer: '), Q + ': should open with the keyed heading');
  ok(e.indexOf(WHY) > 0, Q + ': should carry the feedback heading');
  ok(e.indexOf(KEP + '<ul>') > 0, Q + ': should carry the points heading');
  for (const b of ['</p></p>', '<p><p>', '</li></li>', '<li><li>', '</strong></strong>', '\u0000', '�', '&amp;lt;', '&lt;p&gt;', 'TODO', 'http://', 'https://', '[S1', '[S2', 'OpenStax'])
    ok(e.indexOf(b) < 0, Q + ': explanation contains ' + JSON.stringify(b));
  ok(e.indexOf('—') < 0, Q + ': no em dash in the explanation');
  ok(q.question.indexOf('—') < 0, Q + ': no em dash in the stem');
  curlyNow += (e.match(/[‘’“”]/g) || []).length;
  curlyWas += (pre(Q).explanation.match(/[‘’“”]/g) || []).length;
  for (const t of ['p', 'h4', 'ul', 'li', 'strong', 'sub', 'sup', 'div']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, Q + ': <' + t + '> ' + o + ' open / ' + c + ' close');
  }
  for (const tag of ['p', 'li', 'strong', 'ul', 'h4']) {
    let depth = 0, maxd = 0;
    for (const t of e.match(new RegExp('</?' + tag + '[ >]', 'g')) || []) {
      depth += /^<\//.test(t) ? -1 : 1; maxd = Math.max(maxd, depth);
      if (depth < 0) break;
    }
    ok(depth === 0 && maxd <= 1, Q + ': <' + tag + '> nesting is wrong (end ' + depth + ', max ' + maxd + ')');
  }
  const main = mainOf(e);
  ok(main.length > 0, Q + ': the main explanation is present as a single paragraph');
  ok((e.slice(e.indexOf('</h4>') + 5, e.indexOf('<h4>Why')).match(/<p[ >]/g) || []).length === 1,
    Q + ': the main explanation must be a single paragraph');
  ok((fbOf(e).match(/<\/p>\n<p[ >]/g) || []).length === 2, Q + ': feedback keeps the stored </p>\\n<p> separator');
  ok(fbOf(e).indexOf('</p><p') < 0, Q + ': a feedback separator lost its newline');
  if (/<div/.test(e)) divs++;
}
ok(curlyNow <= curlyWas, 'the curly-quote count did not rise (' + curlyWas + ' -> ' + curlyNow + ')');
ok(curlyWas === 39 && curlyNow === 25, 'curly quotes fell from 39 to 25 as the replacements landed');
/* the two pre-existing trailing divs */
for (const Q of ['Q8', 'Q58']) {
  ok(pre(Q).explanation.endsWith('<div style="text-align:center;margin:12px 0"></div>'),
    Q + ': NON-VACUITY, the before-fixture really ends with the empty div');
  ok(rec(Q).explanation.endsWith('<div style="text-align:center;margin:12px 0"></div>'),
    Q + ': the pre-existing trailing div is preserved byte-for-byte');
}
ok(divs === 2, 'exactly two items carry a div, as before (got ' + divs + ')');

/* ------------------------------------------------------------------ */
section('10. the recomputed numbers, formulas and notation');

/* Q26: glycolysis net yield */
ok(/net gain of two ATP/.test(rec('Q26').explanation) && /Four ATP are produced and two are consumed/.test(rec('Q26').explanation),
  'Q26: 4 produced minus 2 invested gives a net 2 ATP');
ok(/two pyruvate molecules/.test(rec('Q26').explanation) && /Two NADH are also produced/.test(rec('Q26').explanation),
  'Q26: two pyruvate and two NADH');
/* Q29: beta-oxidation of C16 */
ok(/seven cycles to yield eight acetyl-CoA, seven NADH and seven FAD-linked electron pairs/.test(rec('Q29').explanation),
  'Q29: 7 cycles give 8 acetyl-CoA, 7 NADH, 7 FAD-linked pairs');
ok(/final four-carbon intermediate splits into two acetyl-CoA/.test(rec('Q29').explanation),
  'Q29: the final C4 intermediate explains the eighth acetyl-CoA');
/* Q32: the arithmetic adds up, independently */
const e32 = rec('Q32').explanation;
ok(/4 \+ 20 \+ 3 \+ 5 = 32 or 4 \+ 20 \+ 3 \+ 3 = 30/.test(e32), 'Q32: both totals are written out');
ok(8 * 2.5 === 20, 'Q32: 8 mitochondrial NADH at 2.5 give 20 ATP');
ok(2 * 1.5 === 3, 'Q32: 2 FAD-linked pairs at 1.5 give 3 ATP');
ok(2 * 2.5 === 5 && 2 * 1.5 === 3, 'Q32: 2 cytosolic NADH give 5 via malate-aspartate or 3 via glycerol-3-phosphate');
ok(4 + 20 + 3 + 5 === 32 && 4 + 20 + 3 + 3 === 30, 'Q32: the stated sums really are 32 and 30');
ok(/8 mitochondrial NADH, worth about 20 ATP/.test(e32) && /2 FAD-linked electron pairs, worth about 3 ATP/.test(e32),
  'Q32: the component contributions are stated');
ok(/4 ATP equivalents: 2 net ATP from glycolysis and 2 GTP or ATP from the citric acid cycle/.test(e32),
  'Q32: substrate-level phosphorylation accounts for 4');
/* notation that must stay readable */
ok(/²H over ¹H/.test(rec('Q3').explanation), 'Q3: the isotope labels are superscripted');
ok(/mass-number rule for isotopes/.test(rec('Q6').explanation), 'Q6: the isotope rule is repeated');
ok(/⁴C₁ chair/.test(rec('Q9').explanation), 'Q9: the ⁴C₁ chair notation survives');
ok(/β\(1→4\)/.test(rec('Q9').explanation) && /α\(1→4\)/.test(rec('Q10').explanation), 'Q9 and Q10: the linkage arrows survive');
ok(/C18:1/.test(rec('Q21').explanation) && /C18:0/.test(rec('Q21').explanation), 'Q21: the C18 notation survives');
ok(/NAD⁺/.test(rec('Q43').explanation) && /NADH/.test(rec('Q43').explanation), 'Q43: NAD⁺/NADH survive');
ok(/FADH₂/.test(rec('Q35').explanation), 'Q35: FADH₂ survives');
ok(/Ph₃P=O/.test(rec('Q59').explanation) && /Ph₃P=CHR/.test(rec('Q59').explanation), 'Q59: the ylide and phosphine oxide formulas match');
ok(/N-1 \(the ring nitrogen\)/.test(rec('Q44').options[0]) && /labeled N-1, not C-1/.test(rec('Q44').explanation),
  'Q44: N-1 is used for the ring nitrogen');
ok(/180° apart/.test(rec('Q50').explanation) && /about 60° apart/.test(rec('Q50').explanation), 'Q50: the dihedral angles are given');
ok(/triacylglycerol \+ 3NaOH → glycerol \+ 3RCOONa/.test(rec('Q18').explanation), 'Q18: the saponification equation is balanced for 3 NaOH');
ok(/Pyruvate \+ CoA-SH \+ NAD⁺ → acetyl-CoA \+ CO₂ \+ NADH \+ H⁺/.test(rec('Q30').explanation), 'Q30: the PDH equation is complete');
ok(/C₄H₄S/.test(rec('Q40').explanation), 'Q40: thiophene formula survives');
ok(/2ⁿ is an upper bound/.test(rec('Q2').explanation), 'Q2: 2ⁿ is stated as an upper bound');
/* subscripts and Greek letters were not lost wholesale */
let uni = 0;
for (const Q of QS) uni += (rec(Q).explanation.match(/[₀-₉⁰¹²³⁴-⁻α-ω→]/g) || []).length;
ok(uni > 200, 'the pack still carries its Unicode subscripts, superscripts, Greek letters and arrows (' + uni + ')');

/* ------------------------------------------------------------------ */
section('11. cross-item consistency and the coverage ledger');

ok(/mass number/.test(rec('Q3').explanation) && /mass number/.test(rec('Q6').explanation),
  'Q3 and Q6 agree on the CIP isotope rule');
ok(/sphingosine-based backbone/.test(rec('Q19').explanation) && /sphingomyelin uses a different backbone/.test(rec('Q20').explanation) &&
   /sphingosine-based backbone rather than glycerol/.test(rec('Q24').explanation),
  'Q19, Q20 and Q24 agree that not every phospholipid uses glycerol');
ok(/enzyme-bound/.test(rec('Q35').explanation) && /enzyme-bound/.test(rec('Q28').explanation),
  'Q28 and Q35 agree that the relevant FAD is enzyme-bound');
ok(/succinate dehydrogenase/i.test(rec('Q27').explanation) && /Succinate dehydrogenase/.test(rec('Q35').explanation),
  'Q27 and Q35 agree about succinate dehydrogenase');
ok(/about 2.5 ATP per mitochondrial NADH/.test(rec('Q28').explanation) && /2.5 ATP per mitochondrial NADH/.test(rec('Q32').question),
  'Q28 and Q32 use the same 2.5 ATP convention');
ok(/can occur with or without oxygen/.test(rec('Q30').explanation) && /also occurs when oxygen is available/.test(rec('Q31').explanation),
  'Q30 and Q31 agree that lactate can form aerobically');
ok(/not the aromatic compound furan/.test(rec('Q37').explanation) && /A sugar furanose ring is not aromatic furan/.test(rec('Q43').explanation),
  'Q37 and Q43 agree that a furanose ring is not furan');
ok(/α positions, C2 and C5/.test(rec('Q44').explanation) && /C2 and C5 are equivalent α positions/.test(rec('Q44').explanation),
  'Q44 states the equivalent α positions in both places');
ok(/caprolactam/.test(rec('Q60').explanation) && /caprolactam/.test(rec('Q47').explanation),
  'Q47 and Q60 agree that caprolactam relates to nylon-6');
ok(/acetal or ketal character/.test(rec('Q53').explanation) && /free hemiacetal group/.test(rec('Q11').explanation),
  'Q11 and Q53 keep hemiacetal and acetal distinct');

const cov = idmap.coverage;
ok(cov.chemistry_total === 485, 'coverage: chemistry total 485');
ok(cov.reviewed_before_this_batch === 299, 'coverage: 299 reviewed before this batch');
ok(cov.displays_in_this_pack === 60, 'coverage: 60 displays in this pack');
ok(cov.new_unique_ids_this_batch === 60, 'coverage: 60 new unique ids');
ok(cov.previously_reviewed_included_again.length === 0, 'coverage: no previously reviewed id counted again');
ok(cov.reviewed_after_this_batch === cov.reviewed_before_this_batch + cov.new_unique_ids_this_batch,
  'coverage: the arithmetic adds up (299 + 60 = ' + cov.reviewed_after_this_batch + ')');
ok(cov.reviewed_after_this_batch === 359, 'coverage: 359 of 485 reviewed after this batch');
ok(cov.still_unreviewed_chemistry === 485 - 359, 'coverage: 126 chemistry questions still unreviewed');
ok(cov.edited_this_batch === 59 && cov.kept_unchanged_this_batch === 1, 'coverage: 59 edited and 1 kept unchanged');
ok(cov.biology_unaffected === true, 'coverage: biology unaffected');
ok(idmap.deviations.length === 0, 'the id map records no deviations');
ok(JSON.stringify(idmap.scope.major_explanatory_rewrites) === JSON.stringify(['Q2', 'Q22', 'Q32']),
  'the id map flags Q2, Q22 and Q32 as the major explanatory rewrites');
ok(JSON.stringify(idmap.scope.fairness_repairs) === JSON.stringify(['Q35', 'Q50']),
  'the id map flags Q35 and Q50 as the fairness repairs');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
