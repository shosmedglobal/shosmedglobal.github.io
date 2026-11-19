/* Result-verifying suite for SHOSMED_LF3_Chemistry_Batch5_Review.txt.
 *
 * This checks the BANK, not the harness: it re-derives the id map from the
 * before-fixture's ORIGINAL stems and options, then asserts every scope,
 * content, presentation and structural claim the review makes. Every "claim
 * removed" assertion is paired with a non-vacuity check that the claim really
 * was in the before-fixture, so a typo cannot pass as a repair.
 *
 * Passing this suite establishes structure and consistency. It is NOT
 * scientific approval of the chemistry.
 */
'use strict';
// NOTE: chemistry batch 6 (chem-302..chem-361) pruned 60 ids from this suite's
// untouched fixture on 18 November 2026; the counts below were stepped to match.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const L = 'ABCD';

const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch5-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch5-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch5-untouched.json'), 'utf8'));

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const by = id => data.chemistry.find(r => r.id === id);
const rec = Q => by(MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);
const allText = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;

let n = 0, bad = 0;
function ok(c, m) { n++; if (!c) { bad++; console.error('  FAIL ' + m); } }
function section(t) { console.log('\n' + t); }

const KEYS = 'CBAACDCBCC' + 'BBBBBBBCCB' + 'CBBCBACBBB' + 'CBBBBABDBB' + 'BBCBCBBBBC' + 'CCBCBBBBBB';

/* ------------------------------------------------------------------ */
section('1. the id map, re-derived from the ORIGINAL stems and options');

ok(QS.length === 60, 'the map has 60 display numbers');
ok(Object.keys(before).length === 60, 'the before-fixture has 60 records');

/* The pre-pass bank: the before-fixture inside the pack, live records outside
   it. Section 3 proves separately that nothing outside the pack moved, so this
   reconstruction is the bank as the review's export was taken from. */
const PRE = {};
for (const q of data.chemistry) if (!PACK.has(q.id)) PRE[q.id] = q;
for (const Q of QS) PRE[MAP[Q]] = pre(Q);
ok(Object.keys(PRE).length === 485, 'the reconstructed pre-pass bank has 485 chemistry records');

const optSig = q => q.options.join('\u0001');
for (let i = 0; i < 60; i++) {
  const Q = 'Q' + (i + 1), id = MAP[Q], r = pre(Q);
  ok(r.id === id, Q + ': the before-fixture record is ' + id);
  /* the review's key, the stored key and the fixture agree */
  ok(L[r.correct] === KEYS[i], Q + ': original key ' + L[r.correct] + ' equals the review key ' + KEYS[i]);
  ok(rec(Q).correct === r.correct, Q + ': the answer letter did not move');
  /* uniqueness on the full original stem, and on stem plus all four options */
  const sameStem = Object.keys(PRE).filter(k => PRE[k].question === r.question);
  ok(sameStem.length === 1 && sameStem[0] === id,
    `${Q}: the original stem matches ${sameStem.length} records (${sameStem.join(', ')})`);
  const both = Object.keys(PRE).filter(k => PRE[k].question === r.question && optSig(PRE[k]) === optSig(r));
  ok(both.length === 1 && both[0] === id,
    `${Q}: the original stem plus all four original options match ${both.length} records (${both.join(', ')})`);
}
/* derived key block and tally */
const derivedBlock = QS.map(Q => L[pre(Q).correct]).join('');
ok(derivedBlock === KEYS, 'the key block derived from the before-fixture equals the review block');
ok(derivedBlock === idmap.asserted_key_block, 'the id map records that same key block');
const tally = {}; for (const c of derivedBlock) tally[c] = (tally[c] || 0) + 1;
ok(tally.A === 4 && tally.B === 37 && tally.C === 17 && tally.D === 2,
  'derived tally ' + JSON.stringify(tally) + ' equals the review tally A4/B37/C17/D2');
/* only ONE 60-window in the whole bank reproduces the block */
let windows = 0, windowStart = null;
for (let s = 0; s + 60 <= data.chemistry.length; s++) {
  let m = true;
  for (let k = 0; k < 60; k++) if (L[data.chemistry[s + k].correct] !== KEYS[k]) { m = false; break; }
  if (m) { windows++; windowStart = data.chemistry[s].id; }
}
ok(windows === 1 && windowStart === 'chem-242',
  'exactly one 60-record window in the bank reproduces the key block, starting at chem-242 (got ' + windows + ', ' + windowStart + ')');
/* contiguity as a derived result */
const idxOf = {}; data.chemistry.forEach((q, i) => idxOf[q.id] = i);
let contiguous = true;
for (let i = 1; i < 60; i++) if (idxOf[MAP['Q' + (i + 1)]] !== idxOf[MAP['Q' + i]] + 1) contiguous = false;
ok(contiguous, 'the verified ids occupy 60 consecutive bank positions (a derived result)');
ok(MAP.Q1 === 'chem-242' && MAP.Q60 === 'chem-301', 'the pack runs chem-242 .. chem-301');
/* zero overlap with batches 1-4 */
const EARLIER = new Set();
for (const f of ['chem-review-batch1-idmap.json', 'chem-review-batch2-idmap.json',
                 'chem-review-batch3-idmap.json', 'chem-review-batch4-idmap.json']) {
  const p = path.join(ROOT, 'scripts', f);
  if (!fs.existsSync(p)) continue;
  const m = JSON.parse(fs.readFileSync(p, 'utf8')).map;
  for (const k of Object.keys(m)) EARLIER.add(m[k]);
}
ok(EARLIER.size === 239, 'chemistry batches 1-4 cover 239 ids (got ' + EARLIER.size + ')');
ok(QS.every(Q => !EARLIER.has(MAP[Q])), 'no id in this pack was reviewed in an earlier chemistry batch');

/* ------------------------------------------------------------------ */
section('2. scope: 59 edited, Q58 byte-identical, 24 stems, 6 options');

let changed = [], unchanged = [];
for (const Q of QS) (JSON.stringify(rec(Q)) === JSON.stringify({ ...pre(Q), q: undefined }) ? unchanged : changed).push(Q);
/* the fixture carries an extra `q` field, so compare field by field instead */
changed = []; unchanged = [];
for (const Q of QS) {
  const a = pre(Q), b = rec(Q);
  const same = a.id === b.id && a.question === b.question && a.correct === b.correct &&
    JSON.stringify(a.options) === JSON.stringify(b.options) && a.explanation === b.explanation;
  (same ? unchanged : changed).push(Q);
}
ok(changed.length === 59, '59 items were edited (got ' + changed.length + ')');
ok(unchanged.length === 1 && unchanged[0] === 'Q58', 'exactly Q58 is unchanged (got ' + unchanged.join(', ') + ')');

const q58pre = pre('Q58'), q58now = rec('Q58');
ok(q58pre.question === q58now.question && q58pre.explanation === q58now.explanation &&
   JSON.stringify(q58pre.options) === JSON.stringify(q58now.options) && q58pre.correct === q58now.correct,
  'Q58 chem-299 is byte-identical in every field');
ok(((q58now.explanation.match(/<ul>([\s\S]*?)<\/ul>/) || ['', ''])[1].match(/<li>/g) || []).length === 5,
  "Q58 keeps its five individual educational points");
ok(q58now.explanation.indexOf('Bottom Line') < 0, 'Q58 gained no Bottom Line');

const STEMS = idmap.stem_changes;
ok(STEMS.length === 24, 'the id map lists 24 stem changes');
const stemsNow = QS.filter(Q => pre(Q).question !== rec(Q).question);
ok(JSON.stringify(stemsNow) === JSON.stringify(STEMS),
  'exactly the listed 24 stems changed (got ' + stemsNow.join(', ') + ')');
for (const Q of QS) if (!STEMS.includes(Q)) ok(pre(Q).question === rec(Q).question, Q + ': stem untouched, as required');

const optsNow = [];
for (const Q of QS) pre(Q).options.forEach((o, j) => { if (o !== rec(Q).options[j]) optsNow.push(Q + ' ' + L[j]); });
ok(JSON.stringify(optsNow) === JSON.stringify(['Q14 D', 'Q16 D', 'Q19 B', 'Q20 D', 'Q30 D', 'Q51 D']),
  'exactly the six listed option texts changed (got ' + optsNow.join(', ') + ')');
for (const Q of Object.keys(idmap.option_changes)) {
  const c = idmap.option_changes[Q], j = L.indexOf(c.letter);
  ok(pre(Q).options[j] === c.from, Q + ' ' + c.letter + ': the original text was ' + JSON.stringify(c.from));
  ok(rec(Q).options[j] === c.to, Q + ' ' + c.letter + ': now reads ' + JSON.stringify(c.to));
}
let keyMoves = 0;
for (const Q of QS) if (pre(Q).correct !== rec(Q).correct) keyMoves++;
ok(keyMoves === 0, 'no answer letter moved');
ok(QS.every(Q => rec(Q).id === MAP[Q]), 'no bank id moved');

/* points-only items. Q54 was points-only in the batch 5 pass, but the
   17 November 2026 follow-up explicitly superseded that restriction and
   replaced its option D feedback, so it is no longer checked here. */
for (const Q of ['Q7', 'Q29', 'Q38']) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question, Q + ' is points-only: stem untouched');
  ok(JSON.stringify(a.options) === JSON.stringify(b.options), Q + ' is points-only: options untouched');
  const strip = e => e.replace(/<h4>Key Educational Points:<\/h4><ul>[\s\S]*?<\/ul>/, '<POINTS>');
  ok(strip(a.explanation) === strip(b.explanation),
    Q + ' is points-only: everything outside the point list is byte-identical');
}

/* ------------------------------------------------------------------ */
section('3. nothing outside the pack moved');

let bioBad = 0;
for (const q of data.biology) { /* the final pack reviewed bio-12, bio-346 and bio-518, pruned from this fixture */
  if (untouched.biology[q.id] === undefined) continue;
  if (untouched.biology[q.id] !== hash(q)) { bioBad++; console.error('    changed: ' + q.id); } }
ok(bioBad === 0, 'all 626 out-of-pack biology records are unchanged');
ok(Object.keys(untouched.biology).length === 626, 'the untouched fixture covers 626 biology records after the final-pack prune');
let chemBad = 0, nChem = 0;
for (const q of data.chemistry) {
  if (PACK.has(q.id)) continue;
  nChem++;
  if (!untouched.chemistry[q.id]) continue;            // pruned by a later reviewed batch
  if (untouched.chemistry[q.id] !== hash(q)) { chemBad++; console.error('    changed outside the pack: ' + q.id); }
}
ok(chemBad === 0, 'every chemistry record outside the pack is unchanged');
/* nChem counts LIVE records outside this pack, so it stays 425 however many of
   their hashes a later batch prunes from the fixture. The fixture count is the
   number that steps down: 305 after the chemistry batch 7 prune. */
ok(nChem === 425, '425 chemistry records lie outside the pack (got ' + nChem + ')');
ok(nChem + 60 === 485, 'the partition adds up: 425 outside + 60 in the pack = 485');
/* NOTE: the chemistry batch 7 pass (chem-362 .. chem-421) pruned those 60 ids
   from this fixture, so the hash count below steps down by 60. nChem counts LIVE
   out-of-pack records and is unaffected by pruning. */
/* NOTE: the final review pack (chem-19, chem-61, chem-478..chem-485, bio-12,
   bio-346, bio-518) was pruned from this fixture, so its hash counts step down.
   Drift sweeps skip ids the fixture no longer holds. */
ok(Object.keys(untouched.chemistry).length === 239,
  'the untouched fixture holds ' + Object.keys(untouched.chemistry).length + ' out-of-pack chemistry hashes (239 after the final-pack prune)');
ok(data.biology.length === 629 && data.chemistry.length === 485, 'bank counts are still 629 / 485');

/* ------------------------------------------------------------------ */
section('4. the specific science and feedback repairs the review names');

/* [display, gone, present] - each gone is also checked for non-vacuity */
const REPAIRS = [
  // Q1 d-orbital detour
  ['Q1', 'This type of hybridization is seen in elements like phosphorus in PCl5.', 'An sp³d description does not fit this carbon bonding arrangement'],
  ['Q1', 'Carbon atoms in Period 2 do not have accessible d orbitals', 'retains two unhybridized p orbitals for the two pi bonds'],
  // Q2 alkyne hydration
  ['Q2', 'it has no adjacent carbon with hydrogens to form a methyl ketone', 'Ethyne has only two carbon atoms, so hydration cannot give the three-carbon product acetone'],
  ['Q2', 'But-2-yne is an internal alkyne and would give a different product pattern', 'Hydration and tautomerism give butan-2-one'],
  ['Q2', 'following Markovnikov addition of water', 'water adds to propyne to form an enol, CH₃C(OH)=CH₂'],
  ['Q2', 'acid-catalyzed hydration?', 'mercury(II) sulfate catalyst?'],
  // Q3 ozonolysis is not always two molecules
  ['Q3', 'Ozonolysis always breaks the carbon-carbon double bond, producing two separate carbonyl fragments.', 'so two separate products are not a universal rule'],
  // Q4 radical stages
  ['Q4', 'Propagation cannot come before initiation.', 'Propagation requires radicals to be present'],
  ['Q4', 'There are no radicals present at the start of the reaction', 'Termination describes removal of radicals, not their initial generation'],
  ['Q4', 'Termination cannot immediately follow initiation.', 'can nevertheless terminate without first propagating'],
  ['Q4', 'proceeds via which steps in order?', 'conventional order used to outline the stages'],
  // Q5 strain
  ['Q5', 'This angle strain (Baeyer strain) makes the C–C bonds weaker', 'It also has torsional strain from eclipsing C–H bonds'],
  ['Q5', 'Its reactivity is entirely due to angle strain, not aromatic character.', 'including angle and torsional strain, rather than aromatic stabilization'],
  // Q6 boiling points
  ['Q6', 'Cyclopentane (49°C) has a rigid cyclic structure with even greater surface contact area', 'cyclic compounds do not universally boil above acyclic compounds'],
  ['Q6', 'Pentane (36°c) > 2-methylbutane (28°c) > 2,2-dimethylpropane (10°c).', 'Cyclopentane boils at about 49 °C and has formula C₅H₁₀, not C₅H₁₂'],
  ['Q6', 'Which of the following has the highest boiling point?', 'highest normal boiling point, measured at 1 atm'],
  // Q8 Huckel scope
  ['Q8', 'Benzene has 6 (n=1), naphthalene has 10 (n=2).', 'Benzene has 6, with n = 1.'],
  ['Q8', 'a planar cyclic compound is aromatic if it has', 'planar, monocyclic, fully conjugated π system in its ground state'],
  ['Q8', 'Compounds with 4n π electrons are anti-aromatic.</p>', 'A nonplanar ring with that count, such as cyclooctatetraene, is nonaromatic rather than antiaromatic'],
  // Q9 copied meta-director feedback
  ['Q9', '-no2, -cooh, and -cho are all electron-withdrawing and are meta directors.', 'A carboxyl group attached through its carbonyl carbon withdraws electron density'],
  ['Q9', 'All strong electron-withdrawing groups are meta directors and ring deactivators.', 'The aldehyde group, –CHO, withdraws electron density through its carbonyl group'],
  // Q10 nitrate as nucleophile
  ['Q10', 'NO3- (nitrate ion) is a stable, negatively charged species that acts as a nucleophile', 'Nitrate, NO₃⁻, is the conjugate base of nitric acid'],
  // Q11 methyl group
  ['Q11', 'this effect is overwhelmed by hyperconjugation', 'Its inductive effect and hyperconjugation help stabilize the positively charged reaction intermediate'],
  ['Q11', 'All electron-donating groups are activating and ortho/para directing.', 'Activation describes the effect on reaction rate; directing describes the preferred position'],
  // Q12 Friedel-Crafts alkylation
  ['Q12', 'generating the electrophilic carbocation CH₃⁺', 'a freely existing methyl carbocation need not be invoked'],
  ['Q12', 'this methyl cation is the electrophile that attacks the ring', 'CH₃Cl/AlCl₃ transfers a methyl group in this reaction'],
  ['Q12', 'would be produced by Friedel-Crafts acylation using formyl chloride (HCOCl)', 'formyl chloride is unstable and is not used like an ordinary acyl chloride'],
  ['Q12', 'Friedel-Crafts alkylation of benzene with CH₃Cl in the presence of AlCl₃ produces', 'initial monosubstitution product'],
  // Q13 heterocycle electron counts
  ['Q13', '</strong> Pyridine, furan, and thiophene are all aromatic heterocycles', 'the nitrogen lone pair lies outside the aromatic π system'],
  ['Q13', 'Pyridine, furan, and thiophene are all aromatic heterocycles with 6 π electrons.</p>\n<p><strong>C. Furan', 'Furan has four π electrons from its two double bonds and two from one oxygen lone pair'],
  // Q14 fairness
  ['Q14', 'm-chloronitrobenzene is actually the same compound as m-nitrochlorobenzene', 'Nitrobenzene lacks the chlorine substituent'],
  ['Q14', 'When chlorobenzene undergoes further nitration, the major product is', 'During mononitration of chlorobenzene'],
  ['Q14', 'would only form as a minor product under forcing conditions', 'The question specifies mononitration, which introduces one nitro group'],
  // Q15 fused-ring counting
  ['Q15', 'Benzene has 6, while anthracene and phenanthrene each have 14 π electrons.</p>', 'The shared ring atoms are counted only once'],
  ['Q15', "It has 10 π electrons (4n + 2, where n = 2), satisfying Hückel's rule.", 'ten sp² carbon atoms'],
  // Q16 phenol vs ethanol
  ['Q16', 'Ethanol has a stronger inductive effect', 'The ethyl group stabilizes ethoxide by withdrawing electron density'],
  ['Q16', 'In phenol, the aromatic ring withdraws and delocalizes the negative charge.', 'phenoxide can delocalize negative charge into the ring, whereas ethoxide cannot'],
  // Q17 acylation
  ['Q17', 'would require formyl chloride (HCOCl) as the acylating agent', 'Formyl chloride is unstable and is not a practical reagent'],
  ['Q17', 'an advantage of acylation over alkylation is that the ketone product does not rearrange', 'the acylium electrophile resists rearrangement'],
  ['Q17', 'acylation does not suffer from polysubstitution because the product ketone is deactivated', 'further Friedel-Crafts acylation is strongly disfavored'],
  // Q18 alcohol oxidation
  ['Q18', 'Secondary alcohols oxidize to ketones only.', 'Secondary alcohols ordinarily give ketones under standard alcohol-oxidation conditions'],
  ['Q18', '</strong> Tertiary alcohols resist oxidation under normal conditions', 'A tertiary alcohol has no hydrogen on the carbon bearing –OH'],
  ['Q18', 'Which type of alcohol is most easily oxidized to a carboxylic acid?', 'without breaking its carbon skeleton?'],
  // Q19 Lucas test
  ['Q19', 'Within 5 minutes at room temperature', 'After several minutes at room temperature, with no immediate cloudiness'],
  ['Q19', 'their carbocation intermediates (primary carbocations) are highly unstable', 'it usually proceeds by SN2, without a free primary carbocation'],
  ['Q19', 'Secondary alcohols react within 5 minutes, while primary alcohols require prolonged heating', 'The timing is a practical guide, not an exact stopwatch rule'],
  ['Q19', 'Tertiary alcohols absolutely do react with Lucas reagent', 'The cloudy material is the poorly water-soluble chloride product'],
  // Q20 dehydration
  ['Q20', 'that would require a structural rearrangement of the carbon skeleton', 'It is not the direct β-elimination product of the initially formed tertiary carbocation'],
  ['Q20', '"Pentene" is too vague an answer', 'Pent-1-ene has an unbranched carbon skeleton'],
  // Q21 PCC
  ['Q21', 'It cannot stop at the aldehyde stage.', 'an aldehyde can also be obtained with acidified dichromate by carefully controlling the oxidation'],
  ['Q21', 'is the reagent in the Baeyer test for unsaturation', 'It is not the standard selective reagent in anhydrous dichloromethane described here'],
  ['Q21', 'is another strong oxidant that converts primary alcohols to carboxylic acids, not aldehydes', 'Acidified dichromate can give an aldehyde if the product is removed by controlled distillation'],
  // Q22 Williamson
  ['Q22', 'Secondary and tertiary halides favor elimination (E2) instead.', 'tertiary halides are unsuitable for this SN2 route'],
  ['Q22', 'especially symmetrical ethers at ~140 degrees C', 'ethanol can give diethyl ether under controlled heating with sulfuric acid'],
  ['Q22', 'does produce an alcohol with a longer carbon chain through ring-opening', 'A Grignard reagent opens an epoxide to form a magnesium alkoxide'],
  // Q23 sodium and ethanol
  ['Q23', 'confirming that alcohols are weaker acids than water', 'reaction speed alone does not establish relative acid strength'],
  ['Q23', 'Breaking a C-H bond would require much more energy.', 'In this reaction the C–O bond remains intact'],
  ['Q23', 'It would form if acetic acid (not ethanol) reacted with NaOH.', 'Ethanoic acid with sodium metal can give sodium ethanoate and H₂'],
  // Q24 ferric chloride test
  ['Q24', 'Ethanol lacks the aromatic ring needed for this coordination.', 'A positive ferric chloride test is not, however, restricted to aromatic compounds'],
  ['Q24', 'The FeCl3 test requires a phenolic hydroxyl that can chelate with the iron ion.', 'Its oxygen can donate a lone pair to a Lewis acid'],
  ['Q24', 'Only compounds with a phenolic -OH group directly attached to an aromatic ring produce', 'the test is not exclusive to phenols because some enols also form colored iron complexes'],
  // Q25 acidity order
  ['Q25', 'Water (pKₐ ≈ 15.7) is next.', 'the usual introductory comparison places water ahead of ethanol'],
  ['Q25', 'Remember the pKa values: phenol (~10), water (~15.7), ethanol (~16).', 'numerical pKₐ values must use compatible conventions'],
  ['Q25', 'The order of acidity among the following is:', 'In the usual aqueous comparison'],
  // Q26 epoxide hydrolysis
  ['Q26', 'Markovnikov-like regioselectivity under acidic conditions, attacking the more substituted carbon', 'One ring C–O bond breaks as a new bond forms between a ring carbon and the oxygen of water'],
  ['Q26', 'would require oxidative cleavage of a C-C bond', 'so oxidative cleavage is not a universal requirement'],
  ['Q26', 'both new bonds formed are O-H bonds', 'nucleophilic attack forms a new C–O bond'],
  // Q27 glycerol
  ['Q27', 'the backbone of triglycerides and phospholipids', 'the backbone of triacylglycerols and glycerophospholipids'],
  ['Q27', '(like ethanol or methanol)', '(like ethanol)'],
  // Q28 Tollens
  ['Q28', 'Ketones do not react because they cannot be easily oxidized without breaking C–C bonds.', 'some α-hydroxy ketones and reducing sugars can also give a positive result'],
  ['Q28', 'This test does not specifically distinguish aldehydes from ketones the way', 'Ethanal, ethanol and alcohols of the form CH₃CH(OH)R also give the test'],
  // Q30 aldol addition vs condensation
  ['Q30', 'Aldol condensation of acetaldehyde produces:', 'initial aldol addition product'],
  ['Q30', 'No oxidation state change occurs at the carbonyl carbon in an aldol reaction.', 'Ethanoic acid would result from oxidation of ethanal'],
  ['Q30', 'Crotonaldehyde directly', 'Crotonaldehyde (but-2-enal)'],
  ['Q30', 'Subsequent heating causes dehydration to form crotonaldehyde', 'the addition followed by dehydration is commonly called aldol condensation'],
  // Q31 iodoform
  ['Q31', 'Acetaldehyde (ch3cho), acetone (ch3coch3), and methyl ethyl ketone (ch3coch2ch3) all have this feature.', 'It is the usual aldehyde exception to the shorthand description of this as a methyl-ketone test'],
  ['Q31', 'The iodoform reaction requires a methyl group adjacent to the carbonyl', 'ethanol is the important primary-alcohol example'],
  // Q32 Grignard products
  ['Q32', 'Propan-1-ol (CH3CH2CH2OH) has three carbons and would form if CH3MgBr reacted with acetaldehyde', 'Propan-1-ol can be prepared by adding ethylmagnesium bromide to formaldehyde'],
  ['Q32', 'ketones also give secondary (or tertiary with excess) alcohols', 'Adding CH₃MgBr to acetone instead gives the tertiary alcohol 2-methylpropan-2-ol'],
  // Q33 Cannizzaro
  ['Q33', 'cinnamaldehyde', 'The classic examples are non-enolizable aldehydes such as benzaldehyde and formaldehyde'],
  ['Q33', 'Aldehydes with α-hydrogens undergo aldol condensation instead.', 'Aldehydes with readily enolizable α-hydrogens generally favor competing aldol chemistry'],
  ['Q33', 'Aldehydes with alpha-hydrogens preferentially undergo the aldol reaction', 'Aldehydes with readily enolizable alpha-hydrogens preferentially undergo'],
  // Q34 ketone reduction
  ['Q34', '<p><strong>A. A primary alcohol:</strong> Aldehyde reduction gives a primary alcohol.</p>', 'Reducing an aldehyde such as ethanal gives a primary alcohol'],
  ['Q34', 'Aldehyde reduction gives a primary alcohol.</p><h4>Why', 'formaldehyde gives methanol'],
  // Q35 carbonyl reactivity
  ['Q35', 'Acetone > Formaldehyde > Acetaldehyde is the reverse of the correct trend', 'Acetone > Formaldehyde > Acetaldehyde incorrectly places acetone first'],
  // Q36 cyanohydrin hydrolysis
  ['Q36', 'Lactic acid (2-hydroxypropanoic acid) would require hydrolysis of the cyanohydrin.', '2-hydroxy-2-methylpropanoic acid, (CH₃)₂C(OH)COOH'],
  ['Q36', 'So lactic acid could be a downstream product', 'Lactic acid has three carbons and can instead be obtained by hydrolyzing the cyanohydrin of ethanal'],
  // Q37 acetal equilibrium
  ['Q37', 'Hemiacetals are unstable intermediates on the way to acetals.', 'Hemiacetals are not universally unstable; cyclic sugar forms are important examples'],
  ['Q37', 'unstable intermediate with –OH and –OR on the same carbon', 'excess alcohol and removal of water favor acetal formation'],
  ['Q37', 'Treatment of an aldehyde with excess alcohol in the presence of acid catalyst gives', 'while water is removed'],
  // Q39 esterification
  ['Q39', 'drives it to completion', 'shifts the equilibrium toward ester formation'],
  ['Q39', 'A base catalyst would actually promote hydrolysis of an ester (saponification)', 'A base mainly deprotonates the starting carboxylic acid to form a carboxylate salt'],
  ['Q39', 'would give two alcohol molecules, not an ester', 'Reducing one carboxylic-acid molecule does not generate the two alcohol molecules obtained by reducing an ester'],
  // Q40 leaving groups
  ['Q40', 'and –NH₂ is a poor leaving group', 'and NH₂⁻ is a poor leaving group'],
  ['Q40', 'stabilizing the C=O and making it resistant', 'stabilizing the amide group and making it resistant'],
  ['Q40', 'is essentially the reverse of the correct order', 'The usual relative leaving-group ability is Cl⁻ > RCOO⁻ > RO⁻ > NH₂⁻'],
  // Q41 saponification
  ['Q41', 'Base-catalyzed hydrolysis of an ester is called saponification.', 'Saponification is the base-promoted hydrolysis of an ester'],
  ['Q41', 'saponification is irreversible because the carboxylate anion is very stable', 'strongly product-favored under these alkaline conditions'],
  ['Q41', 'saponification (base-catalyzed hydrolysis) breaks them', 'saponification (base-promoted hydrolysis) breaks them'],
  ['Q41', 'This is not hydrolysis because no water or hydroxide is involved in the key step.', 'Some transesterification methods are base-catalyzed'],
  // Q42 decarboxylation
  ['Q42', 'is a straightforward loss of CO2 (as Na<sub>2</sub>CO<sub>3</sub>)', 'removes the carboxyl carbon into Na<sub>2</sub>CO<sub>3</sub>'],
  ['Q42', 'No elimination occurs, so unsaturated products do not form.', 'it does not create an alkene from this substrate'],
  ['Q42', 'Combined with a hydrogen (from NaOH), this gives methane', 'the carboxyl carbon of two-carbon sodium acetate ends up in carbonate'],
  // Q43 amide resistance
  ['Q43', 'The N-H bond in amides gives them high boiling points and makes them resistant to hydrolysis.', 'mainly explained by amide resonance and poor leaving-group ability, not by the mere presence of an N–H bond'],
  // Q44 aspirin
  ['Q44', 'It would react with the -OH group of salicylic acid to form a hemiacetal', 'Acetaldehyde does not transfer an acetyl group in the reaction used to make aspirin'],
  ['Q44', 'could theoretically acetylate the -OH group of salicylic acid, but the reaction would be extremely slow', 'much less effective than acetic anhydride for acetylating'],
  // Q45 boiling point and H-bond donors
  ['Q45', 'Which carboxylic acid derivative has the highest boiling point?', 'highest normal boiling point at 1 atm?'],
  ['Q45', 'The N–H bonds in primary amides can form multiple hydrogen bonds (both as donors and acceptors through the C=O)', 'N–H hydrogen-bond donors and a carbonyl oxygen that accepts hydrogen bonds'],
  ['Q45', 'amides have even stronger hydrogen bonding due to the N-H bond', 'rather than assuming that every amide–amide hydrogen bond is stronger than every acid–acid hydrogen bond'],
  ['Q45', 'hydrogen bonding ability trumps molecular weight in determining boiling point', 'not molecular mass alone'],
  // Q46 HVZ
  ['Q46', 'The Hell-Volhard-Zelinsky (HVZ) reaction introduces a bromine at which position of a carboxylic acid?', 'followed by aqueous work-up, which carbon has a hydrogen replaced by bromine in the final acid product?'],
  ['Q46', 'Bromine does not substitute at the carbonyl carbon in the HVZ reaction.', 'so bromine is temporarily bonded to the carbonyl carbon'],
  ['Q46', 'Selective terminal functionalization is quite difficult in organic chemistry.', 'the terminal methyl carbon is C4, whereas the α-carbon is C2'],
  // Q47 LiAlH4
  ['Q47', 'The reduction proceeds through an aldehyde intermediate, but lialh4 is strong enough to reduce that as well.', 'An aldehyde is not normally isolated because the reducing conditions also convert that carbonyl functionality to an alcohol'],
  ['Q47', 'Clemmensen or Wolff-Kishner reduction of a ketone or aldehyde', 'This carboxylic-acid reduction retains one oxygen as the alcohol group'],
  ['Q47', 'Reduction of a carboxylic acid with LiAlH₄ produces:', 'excess LiAlH₄ followed by aqueous work-up'],
  // Q48 amine basicity
  ['Q48', 'has no N-H bonds available for stabilizing hydrogen bonds with water', 'has one N–H bond and can donate a hydrogen bond'],
  ['Q48', 'In the gas phase and in general, adding alkyl groups to nitrogen increases basicity', 'In water, methylamine and dimethylamine are stronger bases than ammonia'],
  ['Q48', 'The correct order of basicity is:', 'in dilute aqueous solution near 25 °C?'],
  ['Q48', 'due to steric hindrance to solvation despite having three methyl groups', 'the ordering shown is associated with the gas-phase comparison instead'],
  // Q49 aniline
  ['Q49', 'This is a purely electronic effect, not related to molecular size.', 'actually has a lower molecular mass than cyclohexylamine'],
  // Q50 amino-acid side chains
  ['Q50', 'Serine has a hydroxyl group (polar), aspartate has a carboxyl group (charged), and lysine has an amino group (charged at physiological ph).', "Aspartate's side chain is predominantly –CH₂COO⁻ at physiological pH"],
  ['Q50', 'lysine has an amino group (charged at physiological pH)', 'that of lysine is predominantly –NH₃⁺'],
  // Q51 isoelectric point
  ['Q51', 'An uncharged molecule', 'A molecule with no charged functional groups'],
  ['Q51', 'explains why amino acids have high melting points and good water solubility', 'Zero net charge does not mean that all functional groups are uncharged'],
  ['Q51', 'At its isoelectric point, an amino acid exists predominantly as:', 'free glycine exists predominantly as:'],
  // Q52 peptide bond
  ['Q52', 'The backbone is held together exclusively by peptide (amide) bonds between consecutive amino acids.', 'The backbone also contains the other covalent bonds within each amino-acid residue'],
  ['Q52', 'formed by a condensation reaction between the α-amino group of one amino acid', "a peptide bond to proline's nitrogen has no N–H hydrogen"],
  ['Q52', 'It is an acetal-type linkage found in disaccharides', 'The common O-glycosidic links between sugars differ from the carbonyl carbon–nitrogen amide linkage'],
  // Q53 diazotization
  ['Q53', 'gives an N-nitrosamine', 'Nitrous acid does not simply alkylate the starting amine'],
  ['Q53', 'An amide (R-CO-NH2) is formed by reacting an amine with an acyl derivative', 'Acylating a primary amine normally gives an N-substituted amide, not necessarily RCONH₂'],
  ['Q53', 'Treatment of a primary amine with nitrous acid (HNO₂) at 0-5°C gives:', 'relatively persistent intermediate'],
  // Q55 sulfur amino acids
  ['Q55', 'Two cysteine residues can form a disulfide bond (–S–S–) called cystine', 'the disulfide-linked pair is called cystine'],
  ['Q55', 'serves as the initiator amino acid in translation', "Methionine's side chain does not ordinarily form the disulfide links characteristic of cysteine"],
  // Q56 Hofmann elimination
  ['Q56', 'The bulky trimethylammonium leaving group creates steric effects', 'a general quaternary ammonium salt can release a different tertiary amine'],
  ['Q56', 'An alcohol is not a product of Hofmann elimination.', 'The elimination produces an alkene, a tertiary amine and water'],
  ['Q56', 'heating a quaternary ammonium hydroxide to produce the least substituted alkene', 'often favoring the less substituted alkene'],
  ['Q56', 'Hofmann elimination of a quaternary ammonium hydroxide yields primarily:', 'the usual Hofmann-elimination preference is for:'],
  // Q57 Hinsberg
  ['Q57', 'Tertiary amines do not react with sulfonyl chloride because they lack an N–H bond.', 'A tertiary amine does not form the diagnostic sulfonamide'],
  ['Q57', 'secondary amines form insoluble ones, and tertiary amines do not react.', 'whether the product can be deprotonated in alkali'],
  // Q59 E/Z
  ['Q59', 'Cis-trans isomerism in alkenes requires:', 'distinct E/Z configurations about a C=C bond'],
  ['Q59', 'An asymmetric (chiral) carbon is required for enantiomerism (optical isomerism)', 'it is not required for all enantiomerism either'],
  ['Q59', 'Geometric (cis-trans) isomerism occurs when each carbon of the C=C double bond bears two different groups', 'E/Z notation compares the higher-priority group on each carbon'],
  // Q60 stereoisomer counting
  ['Q60', 'A molecule with one chiral center has how many stereoisomers?', 'no other source of stereoisomerism'],
  ['Q60', 'A single molecule cannot be its own stereoisomer.', 'An achiral molecule still has a mirror image; its mirror image is simply superimposable on it'],
  ['Q60', '2 raised to any whole number is always even', 'Some molecules with multiple centers have three stereoisomers because of symmetry and a meso form'],
  ['Q60', 'Four stereoisomers (2² = 4) would require two chiral centers.', 'such as a second chiral center or a separate E/Z unit'],
  ['Q60', 'A stereocentre is a carbon bearing four different substituents.', 'a racemic mixture has no net rotation']
];
for (const [Q, gone, present] of REPAIRS) {
  const was = allText(pre(Q)), now = allText(rec(Q));
  ok(was.indexOf(gone) >= 0, `${Q}: "${gone.slice(0, 55)}" was not in the before-fixture, so the removal check is vacuous`);
  ok(now.indexOf(gone) < 0, `${Q}: "${gone.slice(0, 55)}" should be gone`);
  ok(now.indexOf(present) >= 0, `${Q}: "${present.slice(0, 55)}" should be present`);
}

/* Five follow-up corrections applied after the batch 5 re-read, 17 November 2026.
   These replaced text this pass itself had written, so the before-fixture cannot
   witness them; non-vacuity was established against the commit instead. */
const FOLLOWUP = [
  ['Q17', 'should not be presented as a routine substitute for acetyl chloride',
          'Formyl chloride is unstable and is not a practical reagent for the standard Friedel-Crafts reaction, so benzene formylation uses a different method.'],
  ['Q19', 'their substitution must not be explained by a stable primary carbocation',
          'When they undergo substitution under suitable conditions, it usually proceeds by SN2, without a free primary carbocation.'],
  ['Q19', 'Ordinary primary alcohols react much less readily under the test conditions',
          'Ordinary primary alcohols generally show no reaction during the room-temperature test.'],
  ['Q43', "Esters have the general structure R-COO-R', where an alkyl group replaces the acidic hydrogen",
          'Carboxylic esters contain R–C(=O)–O–R′, where R′ can be an alkyl group, as here, or an aryl group.'],
  ['Q54', 'have four alkyl groups on nitrogen and a positive charge',
          'Quaternary ammonium salts contain R₄N⁺ ions, with four carbon-containing groups bonded to nitrogen; these can be alkyl or aryl groups.'],
  ['Q54', 'Making quaternary salts requires exhaustive alkylation of an amine',
          'A quaternary ammonium salt can be prepared by alkylating a tertiary amine.'],
  ['Q55', 'Tyrosine has an aromatic side chain (a phenol group, 4-hydroxyphenyl).',
          "Tyrosine's side chain is –CH₂–C₆H₄–OH, with –OH opposite the –CH₂– attachment on the benzene ring."]
];
for (const [Q, gone, present] of FOLLOWUP) {
  const now = allText(rec(Q));
  ok(now.indexOf(gone) < 0, `${Q} follow-up: "${gone.slice(0, 55)}" should be gone`);
  ok(now.indexOf(present) >= 0, `${Q} follow-up: "${present.slice(0, 55)}" should be present`);
}
/* The follow-up changed distractor BODIES only. The before-fixture predates the
   batch 5 pass, so it cannot serve as the baseline for "unchanged by the
   follow-up"; that diff was run against the commit instead. What is asserted
   here is that each item's keyed heading, main explanation and point block are
   still the ones the batch 5 pass set. */
const FOLLOWUP_INTACT = {
  Q17: ['AlCl₃ activates acetyl chloride to form an acylium electrophile, CH₃CO⁺.',
        '<li>The electrophile is a resonance-stabilized acylium ion.</li>'],
  Q19: ['Lucas reagent is concentrated HCl containing ZnCl₂.',
        '<li>The Lucas test detects formation of a poorly water-soluble alkyl chloride as cloudiness.</li>',
        'Delayed cloudiness is more characteristic of a suitable secondary alcohol than a tertiary one.'],
  Q43: ['Acetic anhydride (CH₃CO)₂O has the general structure of two acyl groups bonded to the same oxygen',
        '<li>An acid anhydride has two acyl groups connected through an oxygen atom.</li>'],
  Q54: ['The Gabriel synthesis uses potassium phthalimide',
        '<li>Phthalimide anion substitutes on a suitable primary alkyl halide by SN2.</li>'],
  Q55: ['Cysteine contains a thiol group, –SH, in its side chain.',
        '<li>Cysteine has a sulfur-containing thiol side chain.</li>']
};
for (const Q of Object.keys(FOLLOWUP_INTACT)) {
  for (const k of FOLLOWUP_INTACT[Q])
    ok(rec(Q).explanation.indexOf(k) >= 0, Q + ' follow-up: still carries -> "' + k.slice(0, 55) + '"');
}
/* Q43 keeps the surrounding sentences the brief names */
ok(/CH3COOCH3 is methyl acetate, an ester \(not an anhydride\)/.test(rec('Q43').explanation) &&
   /An anhydride, by contrast, has two acyl groups linked by an oxygen/.test(rec('Q43').explanation),
  'Q43 follow-up: the methyl-acetate identification and the anhydride comparison are kept');
/* Q55 keeps the sulfur and precursor sentences */
ok(/It contains no sulfur\. Tyrosine is important as a precursor/.test(rec('Q55').explanation),
  'Q55 follow-up: the sulfur and precursor sentences are kept');

/* universal or incorrect claims the review bans anywhere in the pack */
const BANNED = [
  'PCl5',
  'Baeyer strain',
  'Baeyer test',
  'no adjacent carbon with hydrogens',
  'greater surface contact area',
  'Ozonolysis always breaks',
  'Propagation cannot come before initiation',
  'cinnamaldehyde',
  'formyl chloride (HCOCl)',
  'drives it to completion',
  'base-catalyzed hydrolysis) breaks them',
  'Base-catalyzed hydrolysis of an ester is called saponification',
  '15.7',
  'Markovnikov-like regioselectivity',
  'no N-H bonds available',
  'Clemmensen or Wolff-Kishner reduction of a ketone or aldehyde',
  'Hemiacetals are unstable intermediates',
  'good water solubility',
  'initiator amino acid',
  '2 raised to any whole number',
  'all have this feature',
  'is the reverse of the correct trend',
  '(as Na<sub>2</sub>CO<sub>3</sub>), producing'
];
for (const Q of QS) {
  if (Q === 'Q58') continue;                       // frozen by the review
  const now = allText(rec(Q));
  for (const b of BANNED) ok(now.indexOf(b) < 0, `${Q}: banned claim still present -> "${b}"`);
}

/* ------------------------------------------------------------------ */
section("5. the review's own particular-attention list");

ok(/a freely existing methyl carbocation need not be invoked/.test(rec('Q12').explanation),
  'Q12 should not teach a freely generated CH₃⁺');
ok(/resonance-stabilized acylium ion/.test(rec('Q17').explanation) &&
   /Formyl chloride is unstable and is not a practical reagent/.test(rec('Q17').explanation),
  'Q17 should fix the acylium account and the formyl-chloride prescription');
ok(/no immediate cloudiness/.test(rec('Q19').options[1]) &&
   /without a free primary carbocation/.test(rec('Q19').explanation),
  "Q19 should remove B's overlap with C and the primary-carbocation claim");
ok(/It is not the direct β-elimination product/.test(rec('Q20').explanation) &&
   rec('Q20').explanation.indexOf('rearrangement of the carbon skeleton') < 0,
  'Q20 should drop the false carbon-skeleton-rearrangement claim');
ok(/so the absence of –OH does not mean that ethers are incapable of coordination/.test(rec('Q24').explanation) &&
   /not, however, restricted to aromatic compounds/.test(rec('Q24').explanation),
  'Q24 should fix the coordination and aromatic-ring misconceptions');
ok(/One ring C–O bond breaks as a new bond forms between a ring carbon and the oxygen of water/.test(rec('Q26').explanation) &&
   /nucleophilic attack forms a new C–O bond/.test(rec('Q26').explanation),
  'Q26 should describe the bond changes correctly');
ok(/This initial step is aldol addition/.test(rec('Q30').explanation) &&
   /It is the later dehydration product/.test(rec('Q30').explanation) &&
   /initial aldol addition product/.test(rec('Q30').question),
  'Q30 should test the initial addition product and name the condensation separately');
ok(/ethylmagnesium bromide to formaldehyde/.test(rec('Q32').explanation) &&
   /2-methylpropan-2-ol/.test(rec('Q32').explanation),
  'Q32 should give the correct Grignard products');
ok(/2-hydroxy-2-methylpropanoic acid/.test(rec('Q36').explanation) &&
   /Lactic acid has three carbons/.test(rec('Q36').explanation),
  "Q36 should give the four-carbon hydrolysis product");
ok(/shifts the equilibrium toward ester formation/.test(rec('Q39').explanation) &&
   /it does not make carboxylic-acid reduction impossible/.test(rec('Q39').explanation),
  'Q39 should fix the equilibrium wording and the LiAlH₄ account');
ok(/Hydroxide is consumed in the overall reaction/.test(rec('Q41').explanation) &&
   /base-promoted hydrolysis/.test(rec('Q41').explanation),
  'Q41 should account for hydroxide being consumed');
ok(/N–H hydrogen-bond donors and a carbonyl oxygen that accepts hydrogen bonds/.test(rec('Q45').explanation),
  'Q45 should name donors and acceptors correctly');
ok(/butanoic acid gives 2-bromobutanoic acid/.test(rec('Q46').explanation) &&
   /Aqueous work-up restores the carboxylic-acid group/.test(rec('Q46').explanation),
  'Q46 should distinguish the intermediate from the final product');
ok(/has one N–H bond and can donate a hydrogen bond/.test(rec('Q48').explanation) &&
   /dilute aqueous solution near 25 °C/.test(rec('Q48').question),
  "Q48 should fix the N–H count and state the aqueous scope");
ok(/A molecule with no charged functional groups/ .test(rec('Q51').options[3]) &&
   /zero average net charge/.test(rec('Q51').explanation),
  'Q51 should make D mean no charged groups and keep the pI definition exact');
ok(/E\/Z notation compares the higher-priority group on each carbon/.test(rec('Q59').explanation) &&
   /substituted rings can also show cis\/trans relationships/.test(rec('Q59').explanation),
  'Q59 should use the general E/Z criterion');
ok(/2ⁿ expression is an upper limit/.test(rec('Q60').explanation) &&
   /no other source of stereoisomerism/.test(rec('Q60').question),
  'Q60 should limit the model explicitly and use 2ⁿ as an upper bound');

/* ------------------------------------------------------------------ */
section('6. presentation: 186 points, no Bottom Lines, no tables');

const pointLines = e => {
  const m = e.match(/<ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>[\s\S]*?<\/li>/g) || []).map(s => s.slice(4, -5)) : [];
};
let total = 0, bl = 0, tab = 0;
for (const Q of QS) {
  const e = rec(Q).explanation;
  const ls = pointLines(e);
  const want = Number(Q.slice(1)) <= 57 ? 3 : 5;
  ok(ls.length === want, Q + ' has ' + ls.length + ' educational points, expected ' + want);
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
ok(total === 186, 'the pack has 186 educational points (got ' + total + ')');
ok(bl === 0, 'the pack has no Bottom Lines (got ' + bl + ')');
ok(tab === 0, 'the pack has no tables (got ' + tab + ')');

/* the stock blocks, derived from the before-fixture, are gone from Q1-Q57 */
const seen = {};
for (const Q of QS) for (const l of pointLines(pre(Q).explanation)) seen[l] = (seen[l] || 0) + 1;
const GENERIC = Object.keys(seen).filter(l => seen[l] >= 2);
ok(GENERIC.length === 9, 'derived ' + GENERIC.length + ' stock point lines from the before-fixture, expected 9 (three blocks of three)');
ok(GENERIC.length > 0, 'the stock sweep is not vacuous');
for (const Q of QS) for (const l of pointLines(rec(Q).explanation))
  ok(!GENERIC.includes(l), Q + ': still carries a stock point line -> "' + l.slice(0, 60) + '"');
for (let i = 1; i <= 57; i++) {
  const wasStock = pointLines(pre('Q' + i).explanation).every(l => GENERIC.includes(l));
  ok(wasStock, 'Q' + i + ': NON-VACUITY, its before-fixture block really was stock');
}

/* no educational point is shared between two items */
const dup = {};
for (const Q of QS) for (const l of pointLines(rec(Q).explanation)) (dup[l] = dup[l] || []).push(Q);
for (const l of Object.keys(dup))
  ok(dup[l].length === 1, 'an educational point is shared by ' + dup[l].join(', ') + ' -> "' + l.slice(0, 60) + '"');

/* the 59 replaced blocks and the one kept block */
let replaced = 0, kept = 0;
for (const Q of QS) {
  const a = pointLines(pre(Q).explanation).join('\u0001'), b = pointLines(rec(Q).explanation).join('\u0001');
  if (a === b) { kept++; ok(Q === 'Q58', Q + ': its point block is unchanged, but only Q58 may be'); }
  else replaced++;
}
ok(replaced === 59 && kept === 1, '59 point blocks replaced, 1 kept (got ' + replaced + ' / ' + kept + ')');

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
  const WHYH = '<h4>Why the other choices are wrong:</h4>';
  const fb = e.slice(e.indexOf(WHYH) + WHYH.length, e.indexOf('<h4>Key Educational Points:</h4>'));
  const paras = fb.split(/<\/p>\s*(?=<p[ >])/).map((p, i, a) => (i === a.length - 1 ? p : p + '</p>')).map(s => s.trim()).filter(Boolean);
  ok(paras.length === 3, Q + ': ' + paras.length + ' feedback paragraphs, expected 3');
  paraTotal += paras.length;
  const main = (e.match(/<\/h4><p>([\s\S]*?)<\/p><h4>Why/) || ['', ''])[1];
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
    /* a body that opens with a lower-case letter is the signature of the copied
       fragments this review reports. Two shapes legitimately start lower-case
       and the review keeps them: locants such as "m-nitro..." and orbital
       labels such as "sp3 hybridization...". */
    const opener = body.replace(/^<[^>]+>/, '');
    ok(!/^[a-z]/.test(opener) || /^([a-z]-|sp\d)/.test(opener),
      Q + ' ' + m[1] + ': feedback body starts lower-case, a sign of a copied fragment -> "' + body.slice(0, 50) + '"');
  }
}
ok(paraTotal === 180, 'the pack has 180 distractor paragraphs (got ' + paraTotal + ')');
for (const b of Object.keys(bodies))
  ok(bodies[b].length === 1, 'identical feedback shared by ' + bodies[b].join(', ') + ' -> "' + b.slice(0, 60) + '"');

/* the copied/corrupted paragraphs the review reports really were there before */
const WERE_COPIES = {
  Q6: ['A', 'B', 'C'], Q9: ['B', 'D'], Q13: ['A', 'C', 'D'], Q15: ['A', 'C', 'D'],
  Q18: ['A', 'B'], Q31: ['A', 'B', 'D'], Q34: ['A'], Q47: ['A'], Q50: ['A', 'B', 'D'],
  Q8: ['A'], Q2: ['D']
};
for (const Q of Object.keys(WERE_COPIES)) {
  const e = pre(Q).explanation;
  for (const letter of WERE_COPIES[Q]) {
    const m = e.match(new RegExp('<strong>' + letter + '\\. [\\s\\S]*?:<\\/strong> ([\\s\\S]*?)<\\/p>'));
    ok(!!m, Q + ' ' + letter + ': NON-VACUITY, the before-fixture has that paragraph');
    if (!m) continue;
    const body = m[1];
    /* "copy" here means copied from the main explanation, which the corrupted
       versions reproduce with the case flattened, so compare case-insensitively. */
    const mainWas = (e.match(/<\/h4><p>([\s\S]*?)<\/p><h4>Why/) || ['', ''])[1].toLowerCase();
    const plain = body.replace(/<\/?sub>/g, '').toLowerCase();
    ok(mainWas.indexOf(plain) >= 0 || body.length < 130 || /^[a-z0-9]/.test(body),
      Q + ' ' + letter + ': NON-VACUITY, that paragraph really was a copy, a fragment or lower-case corrupted');
    const nowBody = (rec(Q).explanation.match(new RegExp('<strong>' + letter + '\\. [\\s\\S]*?:<\\/strong> ([\\s\\S]*?)<\\/p>')) || ['', ''])[1];
    ok(nowBody !== body, Q + ' ' + letter + ': that paragraph was replaced');
  }
}

/* ------------------------------------------------------------------ */
section('9. structural invariants');

for (const Q of QS) {
  const q = rec(Q), e = q.explanation;
  ok((e.match(/<h4>/g) || []).length === 3, Q + ': should have exactly three h4 headings');
  ok(e.startsWith('<h4>Correct Answer: '), Q + ': should open with the keyed heading');
  ok(e.indexOf('<h4>Why the other choices are wrong:</h4>') > 0, Q + ': should carry the feedback heading');
  ok(e.indexOf('<h4>Key Educational Points:</h4><ul>') > 0, Q + ': should carry the points heading');
  for (const bad of ['</p></p>', '<p><p>', '</li></li>', '<li><li>', '</strong></strong>', '</h4></h4>', '<h4><h4>', '\u0000', '�', '&amp;lt;', 'TODO', 'http://', 'https://'])
    ok(e.indexOf(bad) < 0, Q + ': explanation contains ' + JSON.stringify(bad));
  ok(e.indexOf('—') < 0, Q + ': no em dash in the explanation');
  ok(q.question.indexOf('—') < 0, Q + ': no em dash in the stem');
  for (const c of ['‘', '’', '“', '”'])
    ok(e.indexOf(c) < 0 && q.question.indexOf(c) < 0, Q + ': no curly quote ' + JSON.stringify(c));
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
  /* the main explanation is still exactly one paragraph */
  const main = e.slice(e.indexOf('</h4>') + 5, e.indexOf('<h4>Why'));
  ok((main.match(/<p[ >]/g) || []).length === 1, Q + ': the main explanation must be a single paragraph');
  ok(main.startsWith('<p>') && main.endsWith('</p>'), Q + ': the main paragraph is not well formed');
  /* feedback separator */
  const fb = e.slice(e.indexOf('wrong:</h4>') + 11, e.indexOf('<h4>Key Educational'));
  ok((fb.match(/<\/p>\n<p[ >]/g) || []).length === 2, Q + ': feedback keeps the stored </p>\\n<p> separator');
  ok(fb.indexOf('</p><p') < 0, Q + ': a feedback separator lost its newline');
}
/* the two pre-existing trailing divs */
for (const Q of ['Q29', 'Q36']) {
  ok(pre(Q).explanation.endsWith('<div style="text-align:center;margin:12px 0"></div>'),
    Q + ': NON-VACUITY, the before-fixture really ends with the empty div');
  ok(rec(Q).explanation.endsWith('<div style="text-align:center;margin:12px 0"></div>'),
    Q + ': the pre-existing trailing div is preserved byte-for-byte');
}
let divs = 0;
for (const Q of QS) if (/<div/.test(rec(Q).explanation)) divs++;
ok(divs === 2, 'exactly two items carry a div, as before (got ' + divs + ')');

/* ------------------------------------------------------------------ */
section('10. the corrected products, formulas and carbon counts');

ok(/CH₃C\(OH\)=CH₂/.test(rec('Q2').explanation), 'Q2: the enol from propyne is CH₃C(OH)=CH₂');
ok(/CH₃COCH₃, acetone/.test(rec('Q2').explanation), 'Q2: the product is CH₃COCH₃');
ok(/CH₂=CHOH/.test(rec('Q2').explanation) && /CH₃CHO/.test(rec('Q2').explanation), 'Q2: ethyne gives the enol CH₂=CHOH and then CH₃CHO');
ok(/butan-2-one, CH₃COCH₂CH₃/.test(rec('Q2').explanation), 'Q2: but-1-yne gives CH₃COCH₂CH₃');
ok(/two molecules of ethanal, preserving the total of four carbon atoms/.test(rec('Q3').explanation), 'Q3: four carbons are conserved');
ok(/Cl· \+ CH₄ → HCl \+ CH₃·/.test(rec('Q4').explanation) && /CH₃· \+ Cl₂ → CH₃Cl \+ Cl·/.test(rec('Q4').explanation),
  'Q4: both propagation steps are written and balanced');
ok(/about 49 °C/.test(rec('Q6').explanation) && /36, 28 and 10 °C/.test(rec('Q6').explanation), 'Q6: the four boiling points');
ok(/C₅H₁₀, not C₅H₁₂/.test(rec('Q6').explanation), 'Q6: cyclopentane is C₅H₁₀');
ok(/begin 2, 6, 10 and 14/.test(rec('Q8').explanation), 'Q8: the allowed 4n+2 counts');
ok(/ten sp² carbon atoms/.test(rec('Q15').explanation) && /each have fourteen/.test(rec('Q15').explanation),
  'Q15: ten for naphthalene, fourteen for anthracene and phenanthrene');
ok(/pKₐ values, 10 for phenol and 16 for ethanol/.test(rec('Q16').explanation), 'Q16: the two pKa values');
ok(/CH₃CH\(OH\)CH₂CHO, 3-hydroxybutanal/.test(rec('Q30').explanation), 'Q30: the aldol addition product formula');
ok(/four-carbon β-hydroxy aldehyde/.test(rec('Q30').explanation), 'Q30: four carbons from two ethanal molecules');
ok(/\(CH₃\)₂C\(OH\)COOH/.test(rec('Q36').explanation), "Q36: the four-carbon hydrolysis product formula");
ok(/three carbons become four in its cyanohydrin/.test(rec('Q36').explanation), 'Q36: the carbon count');
ok(/Cl⁻ > RCOO⁻ > RO⁻ > NH₂⁻/.test(rec('Q40').explanation), 'Q40: the leaving-group order with charges');
ok(/CH₃COOCH₂CH₃ \+ NaOH → CH₃COONa \+ CH₃CH₂OH/.test(rec('Q41').explanation), 'Q41: the saponification equation');
ok(/2CH₃CH₂OH \+ 2Na → 2CH₃CH₂ONa \+ H₂/.test(rec('Q23').explanation), 'Q23: the sodium/ethanol equation');
ok(/about 216 °C/.test(rec('Q45').explanation) && /about 77 °C/.test(rec('Q45').explanation) &&
   /about 141 °C/.test(rec('Q45').explanation) && /about 102 °C/.test(rec('Q45').explanation),
  'Q45: all four boiling points');
ok(/2-bromobutanoic acid/.test(rec('Q46').explanation) && /the α-carbon is C2/.test(rec('Q46').explanation),
  'Q46: the product and the numbered positions');
ok(/RCH₂OH/.test(rec('Q47').explanation), 'Q47: the primary-alcohol product formula');
ok(/\(CH₃\)₂NH > CH₃NH₂ > NH₃/.test(rec('Q48').explanation), 'Q48: the aqueous order');
ok(/\(CH₃\)₃NH⁺/.test(rec('Q48').explanation), 'Q48: the trimethylammonium ion');
ok(/C₆H₇N/.test(rec('Q49').explanation) && /C₆H₁₃N/.test(rec('Q49').explanation), 'Q49: both molecular formulas');
ok(/⁺H₃N–CH₂–COO⁻/.test(rec('Q51').explanation), 'Q51: the glycine zwitterion');
ok(/H₂N–CH₂–COOH/.test(rec('Q51').explanation), 'Q51: the uncharged structure in D');
ok(/2ⁿ/.test(rec('Q60').explanation), 'Q60: the 2ⁿ expression survives as a superscript');
/* subscripts and superscripts were not lost */
let subsup = 0;
for (const Q of QS) subsup += (rec(Q).explanation.match(/<sub>|<sup>/g) || []).length;
ok(subsup > 0, 'the pack still uses <sub>/<sup> markup where it had it (' + subsup + ' tags)');
/* where the review did not replace the main paragraph, its subscripts, charges
   and <sub> markup must be byte-identical. Where the review supplied a whole new
   paragraph, its own typography governs. */
const mainOf = e => e.slice(e.indexOf('</h4>') + 5, e.indexOf('<h4>Why'));
let mainsKept = 0;
for (const Q of QS) {
  const a = mainOf(pre(Q).explanation), b = mainOf(rec(Q).explanation);
  if (a !== b) continue;
  mainsKept++;
  ok((a.match(/[₀-₉⁰-⁹⁺⁻]/g) || []).length === (b.match(/[₀-₉⁰-⁹⁺⁻]/g) || []).length,
    Q + ': an unchanged main paragraph kept its Unicode subscripts and charges');
  ok((a.match(/<sub>|<sup>/g) || []).length === (b.match(/<sub>|<sup>/g) || []).length,
    Q + ': an unchanged main paragraph kept its sub/sup markup');
}
ok(mainsKept >= 20, 'at least 20 main paragraphs were left alone and checked for lost typography (got ' + mainsKept + ')');

/* ------------------------------------------------------------------ */
section('11. cross-item consistency and the coverage ledger');

ok(/formyl chloride is unstable/.test(rec('Q12').explanation) && /Formyl chloride is unstable/.test(rec('Q17').explanation),
  'Q12 and Q17 agree that formyl chloride is unstable');
ok(/reduced to a primary alcohol after aqueous work-up/.test(rec('Q39').explanation) &&
   /converts an alkyl carboxylic acid to a primary alcohol/.test(rec('Q47').explanation),
  'Q39 and Q47 agree on LiAlH₄ reducing a carboxylic acid to a primary alcohol');
ok(/aldol/i.test(rec('Q33').explanation) && /aldol addition/.test(rec('Q30').explanation),
  'Q30 and Q33 both speak of aldol chemistry in base');
ok(/the disulfide-linked pair is called cystine/.test(rec('Q55').explanation) &&
   /disulfide bond joins two cysteine side chains/.test(rec('Q52').explanation),
  'Q52 and Q55 agree on disulfide bonds and cystine');
ok(/predominantly –NH₃⁺/.test(rec('Q50').explanation) && /⁺H₃N–CH₂–COO⁻/.test(rec('Q51').explanation),
  'Q50 and Q51 agree that amine groups are protonated near physiological pH');
ok(/some enols also form colored iron complexes/.test(rec('Q24').explanation) &&
   /FeCl3 solution is used to test for phenols/.test(rec('Q57').explanation),
  'Q24 and Q57 agree about the ferric chloride test');

const cov = idmap.coverage;
ok(cov.chemistry_total === 485, 'coverage: chemistry total 485');
ok(cov.reviewed_before_this_batch === 239, 'coverage: 239 reviewed before this batch');
ok(cov.displays_in_this_pack === 60, 'coverage: 60 displays in this pack');
ok(cov.new_unique_ids_this_batch === 60, 'coverage: 60 new unique ids');
ok(cov.previously_reviewed_included_again.length === 0, 'coverage: no previously reviewed id counted again');
ok(cov.reviewed_after_this_batch === cov.reviewed_before_this_batch + cov.new_unique_ids_this_batch,
  'coverage: the arithmetic adds up (239 + 60 = ' + cov.reviewed_after_this_batch + ')');
ok(cov.reviewed_after_this_batch === 299, 'coverage: 299 of 485 reviewed after this batch');
ok(cov.still_unreviewed_chemistry === 485 - 299, 'coverage: 186 chemistry questions still unreviewed');
ok(cov.edited_this_batch === 59 && cov.kept_unchanged_this_batch === 1,
  'coverage: 59 edited and 1 kept unchanged');
ok(cov.biology_unaffected === true, 'coverage: biology unaffected');
ok(idmap.deviations.length === 0, 'the id map records no deviations');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
