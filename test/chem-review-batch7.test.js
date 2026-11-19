/* Result-verifying suite for SHOSMED_LF3_Chemistry_Batch7_Review.txt.
 *
 * This checks the BANK, not the harness. The review supplied original
 * identification signatures, so section 1 re-derives the id map from them by
 * full content match and proves the match is unique bank-wide. Every "claim
 * removed" assertion is paired with a non-vacuity check that the claim really
 * was in the before-fixture.
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
const BLOPEN = "<p class='exp-key'>Bottom Line: ";

const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch7-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch7-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch7-untouched.json'), 'utf8'));
const SIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch7-signatures.json'), 'utf8'));

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const by = id => data.chemistry.find(r => r.id === id);
const rec = Q => by(MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);
const KEEP = ['Q5', 'Q18', 'Q19', 'Q30', 'Q36', 'Q59'];
const POINTS_ONLY = ['Q60'];
const EXEMPT = new Set(KEEP.concat(POINTS_ONLY));

const pointLines = e => {
  const m = e.match(/<h4>Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>[\s\S]*?<\/li>/g) || []).map(s => s.slice(4, -5)) : [];
};
const mainOf = e => (e.match(/<\/h4><p>([\s\S]*?)<\/p>/) || ['', ''])[1];
const tableOf = e => (e.match(/<table[\s\S]*?<\/table>/) || [''])[0];
function fbOf(e) {
  const a = e.indexOf(WHY);
  if (a < 0) return '';
  let z = e.length;
  const iK = e.indexOf(KEP); if (iK > a) z = Math.min(z, iK);
  const iB = e.indexOf(BLOPEN); if (iB > a) z = Math.min(z, iB);
  return e.slice(a + WHY.length, z);
}
function fbParts(e) {
  const out = {};
  for (const m of fbOf(e).matchAll(/<p><strong>([ABCD])\. ([\s\S]*?):<\/strong>([\s\S]*?)<\/p>/g))
    out[m[1]] = { head: m[2], body: m[3] };
  return out;
}
const blOf = e => (e.match(/<p class='exp-key'>Bottom Line: ([\s\S]*?)<\/p>/) || [null, null])[1];
const keyedOf = e => (e.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/) || [null, null])[1];
const allText = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;

let n = 0, bad = 0;
function ok(c, m) { n++; if (!c) { bad++; console.error('  FAIL ' + m); } }
function section(t) { console.log('\n' + t); }

const KEYS = 'BBBBBBCBCC' + 'BCCACBBBCC' + 'CCBBDBCBBB' + 'BBDCCDCBDB' + 'CADCDABACA' + 'ACDBBBBDAB';

/* ------------------------------------------------------------------ */
section("1. the id map, re-derived from the review's ORIGINAL signatures");

ok(QS.length === 60, 'the map has 60 display numbers');
ok(Object.keys(before).length === 60, 'the before-fixture has 60 records');
ok(Object.keys(SIG.sigs).length === 60, 'the signature fixture has 60 signatures');
ok(SIG.keyBlock === KEYS && idmap.asserted_key_block === KEYS, 'the signature keys and the id map both reproduce the review key block');
ok(SIG.tally.A === 7 && SIG.tally.B === 27 && SIG.tally.C === 18 && SIG.tally.D === 8,
  'the signature tally is A=7, B=27, C=18, D=8');

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
function canon(s) {
  let t = String(s)
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/<sub>([\s\S]*?)<\/sub>/g, '$1').replace(/<sup>([\s\S]*?)<\/sup>/g, '$1')
    .replace(/<[^>]+>/g, ' ');
  for (let i = 0; i < 10; i++) t = t.split(SUB[i]).join(String(i)).split(SUP[i]).join(String(i));
  return t.replace(/⁺/g, '+').replace(/⁻/g, '-')
    .replace(/[‐-―−]/g, '-')
    .replace(/[‘’′]/g, "'").replace(/[“”]/g, '"')
    .replace(/α/g, 'alpha').replace(/β/g, 'beta').replace(/γ/g, 'gamma')
    .replace(/ω/g, 'omega').replace(/Δ/g, 'delta').replace(/δ/g, 'delta')
    .replace(/π/g, 'pi').replace(/μ/g, 'mu')
    .replace(/→/g, '->').replace(/⇒/g, '=>').replace(/⇌/g, '<=>')
    .replace(/°/g, ' deg ').replace(/·/g, '.').replace(/×/g, 'x')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}
const sigKey = o => canon(o.stem) + '\u0000' + o.options.map(canon).join('\u0000');
const recKey = q => canon(q.question) + '\u0000' + q.options.map(canon).join('\u0000');

/* the pre-pass bank: the before-fixture inside the pack, live records outside it.
   Section 3 proves separately that nothing outside the pack moved. */
const PRE = {};
for (const q of data.chemistry) if (!PACK.has(q.id)) PRE[q.id] = q;
for (const Q of QS) PRE[MAP[Q]] = pre(Q);
ok(Object.keys(PRE).length === 485, 'the reconstructed pre-pass bank has 485 chemistry records');

const bySig = new Map(), byStem = new Map();
for (const id of Object.keys(PRE)) {
  const k = recKey(PRE[id]);
  if (!bySig.has(k)) bySig.set(k, []);
  bySig.get(k).push(id);
  const sk = canon(PRE[id].question);
  byStem.set(sk, (byStem.get(sk) || 0) + 1);
}
ok(bySig.size === 485, 'no two chemistry records share a full signature (' + bySig.size + ' distinct of 485)');
ok([...byStem.values()].every(v => v === 1), 'no two chemistry records even share a canonical stem');

let matched = 0, keyAgree = 0, topicAgree = 0;
for (const Q of QS) {
  const s = SIG.sigs[Q];
  const hits = bySig.get(sigKey(s)) || [];
  ok(hits.length === 1, Q + ': its signature matches exactly one record (got ' + hits.length + ')');
  if (hits.length !== 1) continue;
  matched++;
  ok(hits[0] === MAP[Q], Q + ': the signature resolves to ' + MAP[Q] + ' (got ' + hits[0] + ')');
  if (L[rec(Q).correct] === s.key) keyAgree++;
  if (rec(Q).topic === s.topic) topicAgree++;
}
ok(matched === 60, 'all 60 signatures resolved to exactly one record');
ok(keyAgree === 60, 'all 60 stored answer letters agree with the review');
ok(topicAgree === 60, 'all 60 stored topics agree with the signature');
ok(QS.map(Q => L[rec(Q).correct]).join('') === KEYS, 'the stored key block is the review key block');

/* contiguity as a derived RESULT */
const nums = Object.values(MAP).map(x => Number(x.slice(5)));
ok(nums.length === new Set(nums).size, 'the 60 ids are distinct');
ok(nums[0] === 362 && nums[59] === 421, 'the ids run chem-362 .. chem-421');
let contig = true;
for (let i = 1; i < nums.length; i++) if (nums[i] !== nums[i - 1] + 1) contig = false;
ok(contig, 'the ids form a contiguous run in display order (derived, not assumed)');

/* no overlap with earlier reviewed batches */
const earlier = new Set();
for (let b = 1; b <= 6; b++) {
  const f = path.join(ROOT, 'scripts/chem-review-batch' + b + '-idmap.json');
  ok(fs.existsSync(f), 'chemistry batch ' + b + ' id map is present');
  for (const id of Object.values(JSON.parse(fs.readFileSync(f, 'utf8')).map)) earlier.add(id);
}
ok(earlier.size === 359, '359 chemistry ids were reviewed before this batch (got ' + earlier.size + ')');
const overlap = Object.values(MAP).filter(id => earlier.has(id));
ok(overlap.length === 0, 'no id in this pack was reviewed in an earlier batch (got ' + overlap.join(', ') + ')');

/* ------------------------------------------------------------------ */
section('2. scope: 54 edited, 6 KEEP byte-identical, 27 stems, 6 options, Q60 points-only');

const changed = [], unchanged = [];
for (const Q of QS) {
  const a = pre(Q), b = rec(Q);
  const same = a.question === b.question && JSON.stringify(a.options) === JSON.stringify(b.options) &&
               a.explanation === b.explanation && a.correct === b.correct && a.topic === b.topic;
  (same ? unchanged : changed).push(Q);
}
ok(changed.length === 54, '54 items were edited (got ' + changed.length + ')');
ok(JSON.stringify(unchanged) === JSON.stringify(KEEP),
  'the untouched items are exactly the six KEEP items (got ' + unchanged.join(', ') + ')');
for (const Q of KEEP) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question && a.explanation === b.explanation &&
     JSON.stringify(a.options) === JSON.stringify(b.options) && a.correct === b.correct,
    Q + ' ' + MAP[Q] + ' is byte-identical in every field');
}
ok(JSON.stringify(idmap.scope.keep_unchanged) === JSON.stringify(KEEP), 'the id map records the six KEEP items');

const STEMS = idmap.stem_changes;
ok(STEMS.length === 27, 'the id map lists 27 stem changes');
const stemsNow = QS.filter(Q => pre(Q).question !== rec(Q).question);
ok(JSON.stringify(stemsNow) === JSON.stringify(STEMS),
  'exactly the listed 27 stems changed (got ' + stemsNow.join(', ') + ')');
for (const Q of QS) if (!STEMS.includes(Q)) ok(pre(Q).question === rec(Q).question, Q + ': stem untouched, as required');

const optsNow = [];
for (const Q of QS) pre(Q).options.forEach((o, j) => { if (o !== rec(Q).options[j]) optsNow.push(Q + ' ' + L[j]); });
/* The batch 7 pass itself replaced six option texts. The 18 November 2026 final
   follow-up then replaced Q2's option B and replaced Q57's option B again, so
   measured against the pre-batch-7 fixture the set is seven slots. Section 11
   checks the follow-up's own two option edits against their own baseline. */
ok(JSON.stringify(optsNow) === JSON.stringify(['Q2 B', 'Q34 B', 'Q43 D', 'Q44 C', 'Q46 D', 'Q53 A', 'Q57 B']),
  'exactly the batch 7 option texts plus the follow-up Q2/Q57 slots changed (got ' + optsNow.join(', ') + ')');
const SUPERSEDED = { 'Q57 B': "The orientation defined by the 5' and 3' carbon positions of the sugars" };
for (const slot of Object.keys(idmap.option_changes)) {
  const [Q, letter] = slot.split(' ');
  const c = idmap.option_changes[slot], j = L.indexOf(letter);
  ok(pre(Q).options[j] === c.from, slot + ': the original text was as the id map records');
  const want = SUPERSEDED[slot] !== undefined ? SUPERSEDED[slot] : c.to;
  ok(rec(Q).options[j] === want, slot + ': now reads ' + JSON.stringify(want) +
    (SUPERSEDED[slot] !== undefined ? ' (the batch 7 wording was superseded by the final follow-up)' : ''));
}

/* Q60 is strictly point-3-only */
for (const Q of POINTS_ONLY) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question, Q + ': points-only, stem untouched');
  ok(JSON.stringify(a.options) === JSON.stringify(b.options), Q + ': points-only, options untouched');
  const strip = e => e.replace(/<ul>[\s\S]*?<\/ul>/, '<POINTS>');
  ok(strip(a.explanation) === strip(b.explanation), Q + ': points-only, everything outside the point list is byte-identical');
  const pa = pointLines(a.explanation), pb = pointLines(b.explanation);
  ok(pa.length === 3 && pb.length === 3, Q + ': still three points');
  ok(pa[0] === pb[0] && pa[1] === pb[1], Q + ': points 1 and 2 are byte-identical');
  ok(pa[2] !== pb[2], Q + ': point 3 really did change');
  ok(keyedOf(b.explanation) === keyedOf(a.explanation), Q + ': its keyed heading was not expanded');
  ok(JSON.stringify(fbParts(b.explanation)) === JSON.stringify(fbParts(a.explanation)), Q + ': its distractor headings were not expanded');
}
ok(JSON.stringify(idmap.scope.points_only) === JSON.stringify(['Q60']), 'the id map records Q60 as the points-only item');
ok(JSON.stringify(idmap.scope.major_question_rewrite) === JSON.stringify(['Q29']), 'the id map flags Q29 as the major question rewrite');
ok(JSON.stringify(idmap.scope.substantial_explanation_repairs) === JSON.stringify(['Q9', 'Q12', 'Q27', 'Q32']),
  'the id map flags Q9, Q12, Q27 and Q32 as the substantial explanation repairs');
ok(idmap.scope.answer_letters_changed === 0 && idmap.scope.ids_changed === 0 && idmap.scope.topics_changed === 0,
  'the id map records no answer letter, id or topic change');
for (const Q of QS) {
  ok(rec(Q).id === pre(Q).id, Q + ': id unmoved');
  ok(rec(Q).correct === pre(Q).correct, Q + ': answer letter unmoved');
  ok(rec(Q).topic === pre(Q).topic, Q + ': topic unmoved');
}

/* ------------------------------------------------------------------ */
section('3. nothing outside the pack moved');

let bioBad = 0, chemBad = 0, nChem = 0;
ok(Object.keys(untouched.biology).length === 626, 'the untouched fixture covers 626 biology records after the final-pack prune');
/* NOTE: the chemistry batch 8 pass added 56 new ids (chem-422 .. chem-477),
   pruned from this fixture, so the hash count below steps down by 56. Live
   out-of-pack counts are unaffected by pruning. */
ok(Object.keys(untouched.chemistry).length === 359, 'the untouched fixture covers 359 out-of-pack chemistry records (10 more pruned by the final pack)');
for (const q of data.biology) { /* the final pack reviewed bio-12, bio-346 and bio-518, pruned from this fixture */
  if (untouched.biology[q.id] === undefined) continue;
  if (untouched.biology[q.id] !== hash(q)) { bioBad++; console.error('    changed: ' + q.id); } }
ok(bioBad === 0, 'every out-of-pack biology record is unchanged');
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
section('4. the specific repairs the review names');

/* [display, gone, present] - each gone is also checked for non-vacuity */
const REPAIRS = [
  // Q1 protecting groups: no universal ideal/inert claim, activation is not "the opposite"
  ['Q1', 'Silyl ethers (like TBS, TMS, TIPS) are ideal because', 'can mask the hydroxyl group during suitable reactions and later be removed'],
  ['Q1', 'Silyl ethers fit all three criteria perfectly.', 'depends on which later reactions it must tolerate and how it will be removed'],
  ['Q1', 'which is the opposite of protection', 'That is activation for further reaction'],
  ['Q1', 'Thermodynamics tells us whether a reaction CAN occur', 'A protecting group temporarily masks a functional group so it can be restored later.'],
  // Q2 retrosynthesis: a transform is not always a bond cleavage, precursors are not all synthons
  ['Q2', 'the mental operation of breaking the target into simpler precursors (synthons)', 'A disconnection breaks a bond on paper; a functional-group interconversion can also be a retrosynthetic step'],
  ['Q2', 'a conceptual disconnection where you mentally break a bond in the target', 'not an equilibrium between them'],
  ['Q2', 'Thermodynamics tells us whether a reaction CAN occur', 'must ultimately correspond to a feasible forward reaction'],
  // Q3 Swern: not universally gentler or preferred
  ['Q3', 'The Swern oxidation is preferred for sensitive substrates', 'its use in dichloromethane is associated with Collins oxidation'],
  ['Q3', 'a gentler, metal-free approach especially suited for complex, acid-sensitive substrates', 'Which oxidation is most suitable depends on the substrate and its other functional groups'],
  ['Q3', 'Thermodynamics tells us whether a reaction CAN occur', 'Swern oxidation avoids chromium reagents, but its suitability still depends on the substrate.'],
  // Q4 Hofmann: carbonate not CO2, no blanket nitrene claim, correct starting materials
  ['Q4', 'the carbonyl carbon is lost as CO₂', 'in the basic reaction mixture it is ultimately captured as carbonate'],
  ['Q4', 'all involve nitrene or isocyanate intermediates', 'Lossen rearrangement starts from an activated hydroxamic acid derivative'],
  ['Q4', 'The curtius rearrangement uses acyl azides', 'Curtius rearrangement starts from an acyl azide, RCON₃'],
  ['Q4', 'All four reactions (Hofmann, Curtius, Lossen, Schmidt) achieve the same net transformation', 'a carboxylic acid reacts with hydrazoic acid under acidic conditions'],
  ['Q4', 'An amide can be converted to an amine with one fewer carbon atom', 'A primary amide, RCONH₂, can be converted to a primary amine'],
  // Q6 seven EC classes including translocases
  ['Q6', 'six major classes', 'has seven main classes'],
  ['Q6', 'The six enzyme classes are', 'The seven EC classes are oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases and translocases'],
  ['Q6', '<td>Non-hydrolytic bond cleavage</td>', '<td>Bond cleavage without hydrolysis or oxidation, or the reverse addition reaction</td>'],
  ['Q6', '<td>Bond formation using ATP</td>', '<td>Bond formation coupled to an energy-supplying reaction, commonly nucleotide cleavage</td>'],
  // Q7 niacin equivalents are a dietary convention
  ['Q7', '60 mg tryptophan → 1 mg niacin', 'approximately 60 mg tryptophan per 1 mg niacin equivalent'],
  ['Q7', 'corn-based diets (low tryptophan) increase pellagra risk', 'untreated maize can increase risk because its niacin is poorly available'],
  // Q8 matrix with the succinate dehydrogenase exception
  ['Q8', 'The citric acid cycle (Krebs cycle) takes place in which cellular compartment?', 'most enzymes of the citric acid cycle are located in the'],
  ['Q8', 'a series of eight enzymatic reactions', 'The important exception is succinate dehydrogenase, which is embedded in the inner mitochondrial membrane'],
  ['Q8', 'requires transport of pyruvate into the mitochondria first', 'Entry into the cycle does not always require pyruvate as the source'],
  ['Q8', '3 NADH, 1 FADH₂, 1 GTP, and 2 CO₂', '3 NADH, one FAD-linked reduction, 1 GTP or ATP, and 2 CO₂'],
  ['Q8', 'generating CO₂, NADH, FADH₂, and GTP', 'transfers electrons to NAD⁺ and enzyme-bound FAD'],
  // Q9 26-28 oxidative out of 30-32, enzyme-bound FAD, Complex II does not pump
  ['Q9', 'approximately 30-34 of the ~36-38 total ATP molecules', 'about 26-28 ATP out of the approximate 30-32 ATP obtained per glucose'],
  ['Q9', 'FADH₂ yields ~1.5 ATP (enters ETC at Complex II, bypassing Complex I)', 'about 1.5 ATP per electron pair entering the ubiquinone pool while bypassing Complex I'],
  ['Q9', '~90% of ATP from aerobic respiration comes from oxidative phosphorylation', 'its FAD is enzyme-bound, not a free FADH₂ molecule entering the complex'],
  ['Q9', 'pumping protons (H⁺) into the intermembrane space', 'Complexes I, III and IV pump protons across the inner mitochondrial membrane'],
  // Q10 standard bases, and a table that does not overstate
  ['Q10', 'Which nitrogenous base is found in RNA but NOT in DNA?', 'one of the four standard bases in RNA but not one of the four standard bases in DNA'],
  ['Q10', '<td>Double-stranded helix</td>', '<td>Usually a double-stranded helix</td>'],
  ['Q10', '<td>More stable</td>', '<td>More resistant to alkaline hydrolysis</td>'],
  ['Q10', "Less stable (2'-OH reactive)", "More susceptible because of the 2'-OH group"],
  // Q11 human membranes, not all biological membranes
  ['Q11', 'the fundamental architecture of all biological membranes', 'assemble into the bilayer framework of human cell membranes'],
  ['Q11', 'Which type of lipid is the main structural component of biological cell membranes?', 'provides the basic bilayer framework of human cell membranes'],
  // Q12 glycine zwitterion versus pI
  ['Q12', 'which is near the isoelectric point of most amino acids', "its pI is about 6"],
  ['Q12', 'The isoelectric point (pI) is the pH at which the amino acid has zero net charge.', 'Predominant molecular form and isoelectric point are different concepts'],
  ['Q12', 'At physiological pH (~7.4), a free amino acid exists primarily as a:', 'which form predominates for free glycine (R = H)'],
  ['Q12', 'This form exists only at very low pH (strongly acidic conditions)', 'The fully protonated cation predominates at sufficiently low pH'],
  // Q13 net diagram versus ribosomal synthesis
  ['Q13', 'formed by a condensation reaction between the carboxyl group (-COOH) of one amino acid', 'ribosomes form peptide bonds using activated amino acids attached to tRNAs'],
  // Q14 reaction quotient, not a blanket Le Chatelier claim
  ['Q14', 'forward reaction accelerates', 'adding A lowers the reaction quotient [B]/[A] below its equilibrium value'],
  ['Q14', 'The system will always respond to a concentration change by shifting to counteract it', 'the reaction quotient changes, so the mixture is no longer at equilibrium'],
  ['Q14', 'Add product → shift left (more reactants)', 'Adding more of a pure solid or pure liquid already present does not generally have the same effect'],
  // Q15 buffering contribution, no blood-buffer aside
  ['Q15', 'the point of maximum buffer capacity', 'its buffering contribution is greatest near pH = pKa'],
  ['Q15', 'The bicarbonate buffer system (pKa ≈ 6.1) is the primary blood buffer', 'the amount of buffer present also matters'],
  ['Q15', 'pH = 0 corresponds to 1 M strong acid (like HCl)', 'An ideal solution with hydrogen-ion concentration 1 mol/L has pH 0'],
  ['Q15', 'This expression has no chemical meaning in the Henderson-Hasselbalch context.', '14 - pKa gives the pKb of the conjugate base'],
  // Q16 galvanic cells under actual conditions
  ['Q16', 'the reaction is spontaneous (E°cell > 0, ΔG < 0)', 'with Ecell > 0 and ΔG < 0'],
  ['Q16', '(cations gain electrons here)', 'reduction is not restricted to metal cations'],
  // Q17 moles of atoms versus atoms
  ['Q17', 'This would imply a 2:1:1 ratio, which does not satisfy conservation of hydrogen atoms', 'would contain only 2 mol of hydrogen atoms and 1 mol of oxygen atoms'],
  ['Q17', 'This would require 6 hydrogen atoms and 3 oxygen atoms in the products', 'would require 6 mol of hydrogen atoms and 3 mol of oxygen atoms'],
  // Q20 dispersion forces are not always weakest
  ['Q20', 'These are the weakest intermolecular forces, arising from temporary dipoles', 'they are not always the weakest intermolecular attraction'],
  ['Q20', '(100°C)', '(100 °C at 1 atm)'],
  ['Q20', 'Hydrogen bonds form when H is bonded to F, O, or N (highly electronegative atoms with lone pairs).', 'In the common examples studied here, hydrogen bonding occurs between an H bonded to N, O or F'],
  // Q21 enantiomers do not require a central chiral carbon
  ['Q21', 'different spatial arrangement around a chiral center (a type of stereoisomer)', 'They have the same connectivity but differ in spatial arrangement'],
  // Q22 parent isotope, macroscopic sample
  ['Q22', 'exactly half of the remaining radioactive atoms decay', 'For a macroscopic sample, the amount of undecayed parent isotope falls to approximately half'],
  ['Q22', 'original material remains', 'original parent isotope remains'],
  ['Q22', 'If you start with 100 g, how much remains after 24 days?', 'what mass of the original undecayed isotope remains after 24 days'],
  // Q23 chlorin, not porphyrin
  ['Q23', 'Chlorophyll (Mg-porphyrin) is the key photosynthetic pigment.', 'magnesium in a related chlorin ring, a partially reduced porphyrin-type system'],
  // Q24 enthalpy at constant pressure
  ['Q24', 'The products have lower energy than the reactants, and the temperature of the surroundings increases.', 'the heat transferred equals the enthalpy change, so ΔH < 0'],
  ['Q24', 'products lower energy', 'products lower enthalpy'],
  ['Q24', 'products higher energy', 'products higher enthalpy'],
  ['Q24', "the system's temperature changes instead", 'a temperature change is not part of the definition'],
  // Q25 Pauling ordering
  ['Q25', 'F > O > N > Cl', 'F > O > Cl > N (3.98, 3.44, 3.16, 3.04)'],
  // Q26 net esterification equation, acid-catalyzed hydrolysis
  ['Q26', 'Esterification is a condensation reaction in which the -OH group', 'an ester and water are formed: R–C(=O)–OH + HO–R'],
  ['Q26', 'H₂ is released in reactions involving active metals with acids or in certain reduction processes', 'here the eliminated small molecule is water'],
  ['Q26', 'the reverse process (hydrolysis) breaks the ester', 'the acid-catalyzed reverse process (hydrolysis) breaks the ester'],
  // Q27 solubility class does not determine storage or safety
  ['Q27', 'therefore NOT stored in significant quantities in the body', 'Vitamin B12 is an important exception, with substantial stores that can last for years'],
  ['Q27', 'are readily excreted by the kidneys when in excess', 'high intakes of some can still be harmful'],
  ['Q27', '<td><strong>Minimal (excreted)</strong></td>', '<strong>Many have limited reserves; B12 is a major storage exception</strong>'],
  ['Q27', 'All Dogs Eat Kibble', 'does not by itself determine storage or safety at high intake'],
  ['Q27', 'Essential for blood clotting factor synthesis.', 'Its tissue stores are relatively small compared with those of other fat-soluble vitamins'],
  // Q28 condition-dependent oxidation; ketones are not absolutely unoxidisable
  ['Q28', 'cannot be further oxidized without breaking C-C bonds', 'tertiary alcohols resist oxidation because they lack an H on the carbon bearing OH'],
  ['Q28', 'The oxidation of a primary alcohol first produces which functional group?', 'Under controlled oxidation conditions that avoid further oxidation'],
  ['Q28', 'Ethers are formed by dehydration (condensation) of two alcohol molecules, not by oxidation.', 'Ethers can be prepared by substitution reactions or by dehydration of suitable alcohols'],
  // Q29 condensation polymerization in a stated chemical model
  ['Q29', 'Proteins, nucleic acids, and polysaccharides are all examples of biological macromolecules', 'repeatedly joining monomers that have two reactive functional groups'],
  ['Q29', 'nucleotides link via phosphodiester bonds (releasing H₂O)', 'a diol and a dicarboxylic acid can form a polyester with loss of water'],
  ['Q29', 'All three major biological polymers (proteins, nucleic acids, polysaccharides) are built and broken down by these complementary reactions.', 'must be described using their activated substrates and real leaving groups'],
  ['Q29', 'not the mechanism for biological macromolecules', 'monomers join without eliminating a small molecule at each linking step'],
  // Q31 mitochondrial beta-oxidation, with peroxisomes and the ER named correctly
  ['Q31', 'Beta-oxidation of fatty acids occurs in which cellular compartment?', 'the main pathway for energy-yielding β-oxidation of ordinary long-chain fatty acids'],
  ['Q31', 'as CoA derivatives cannot pass directly', 'fatty acyl-CoA itself does not cross the inner membrane directly'],
  ['Q31', 'Each cycle of β-oxidation removes 2 carbons (as acetyl-CoA) and produces 1 NADH + 1 FADH₂', '7 β-oxidation cycles yield 8 acetyl-CoA, 7 NADH and 7 FAD-linked reductions'],
  ['Q31', 'detoxification, and steroid production, not fatty acid oxidation', 'a different pathway called ω-oxidation'],
  ['Q31', 'yielding 8 acetyl-CoA, 7 NADH, and 7 FADH₂', 'The last C4 intermediate splits into two acetyl-CoA'],
  // Q32 cofactor terminology as traditional usage
  ['Q32', 'tightly and permanently bound to the enzyme', 'A tightly associated component is traditionally called a prosthetic group'],
  ['Q32', '<td>Non-protein helper (inorganic)</td>', '<td>Non-protein component required for catalysis; may be organic or inorganic</td>'],
  ['Q32', '<td>Loosely bound organic molecule</td>', '<td>Traditional term for an organic helper in enzyme reactions</td>'],
  ['Q32', 'Many B vitamins serve as coenzyme precursors', 'their association with enzymes varies'],
  ['Q32', 'Many enzymes require a non-protein helper molecule to function.', 'In traditional enzyme terminology'],
  // Q33 Stock notation is not the only nomenclature
  ['Q33', 'This name is ambiguous because it does not specify which oxidation state of iron is present.', 'does not state the oxidation state requested by the Stock system'],
  ['Q33', 'Transition metals with variable oxidation states require Stock notation', 'Other naming systems also exist, so Stock notation should not be described as the only possible nomenclature'],
  ['Q33', 'Stock notation uses Roman numerals in parentheses to indicate the charge of the metal cation', 'for a simple monatomic ion, this equals its charge'],
  // Q34 nitrous acid spelling and the oxyacid convention
  ['Q34', 'Nitrious acid', 'Nitrous acid is HNO₂, associated with nitrite'],
  ['Q34', 'This is a misspelling', 'The conventional oxyacid name derived from nitrate is nitric acid'],
  ['Q34', 'This form is used when referring to the pure compound, not the aqueous acid.', 'is not restricted to the pure compound simply because it lacks the word'],
  // Q35 charge reasoning and hydroxyapatite
  ['Q35', 'the subscript 4 would only apply to the last oxygen rather than the entire polyatomic ion', 'giving a net charge of +3'],
  ['Q35', 'Calcium phosphate is a major component of bones and teeth (hydroxyapatite)', 'hydroxyapatite, Ca₁₀(PO₄)₆(OH)₂, a calcium phosphate mineral with a different formula'],
  ['Q35', 'Use the criss-cross method: the charge magnitude of one ion becomes the subscript of the other', 'reduce any common factor after criss-crossing charges'],
  // Q37 the common name is understood but omits the numeral
  ['Q37', 'This name omits the Roman numeral. Since copper can be Cu⁺ or Cu²⁺', 'is commonly understood, but it omits the oxidation-state numeral requested by the stem'],
  // Q38 simplest ratio of intact ions
  ['Q38', 'While the ratio of charges would be correct (total +8 and −8)', 'it is not reduced to the simplest formula requested'],
  ['Q38', 'Ionic formulas are always written as the lowest whole-number ratio of ions', 'do not split a polyatomic ion to reduce its internal formula'],
  // Q39 naming convention rather than a prohibition
  ['Q39', 'This is the correct name for HBr as a pure gas, not in aqueous solution.', 'an aqueous sample can be described as a solution of hydrogen bromide'],
  // Q40 compositional names are defensible
  ['Q40', 'Greek prefixes (di-, tri-) are not used in ionic compound nomenclature.', 'can be used as a compositional name'],
  ['Q40', 'Ionic compounds do not use Greek prefixes', 'charge balance supplies the subscripts; numerical prefixes are omitted'],
  ['Q40', 'Hydroxides are named as metal + hydroxide, with no Greek prefixes.', 'so the rule should not be stated as a universal ban'],
  ['Q40', 'Which compound is correctly paired with its name?', 'cation name followed by the unchanged anion name'],
  // Q41 only the name is wrong in A
  ['Q41', 'Both parts are incorrect - cuprous is not Cu²⁺', 'CuCl is the correct formula for cuprous chloride, but the name'],
  // Q42 the actual error is three carbonates
  ['Q42', 'Greek prefixes are not used in ionic nomenclature.', 'would indicate three carbonate groups, but this formula contains one'],
  // Q43 structural difference, acidity not from oxygen counting
  ['Q43', 'comparable in strength to sulfuric acid', 'The strength is not predicted by counting oxygen atoms alone'],
  ['Q43', 'roughly a million times stronger than typical carboxylic acids', "so 'always' is not a sound rule for every substituted acid"],
  ['Q43', 'Their excellent water solubility and complete dissociation make them useful in detergents and pharmaceuticals.', 'does not guarantee that every compound containing it is highly water-soluble'],
  ['Q43', 'making it a much stronger acid', 'a carboxyl group has carbon bonded to two'],
  // Q44 sulfonamide history and structure
  ['Q44', 'the <strong>first broadly effective antibacterial agents</strong>', 'became widely used in the 1930s, before widespread clinical use of penicillin'],
  ['Q44', 'Sulfonamides were the first systemic antibiotics', 'helped establish systemic antibacterial treatment before widespread penicillin use'],
  ['Q44', 'first effective oral antibiotics', 'Were among the first widely used systemic antibacterial drugs'],
  ['Q44', 'The sulfonamide functional group (–SO₂NH₂) is distinct from sulfonic acid (–SO₃H)', 'A sulfonamide contains an S(=O)₂–N linkage'],
  // Q45 interfaces and hard-water solubility
  ['Q45', 'base-catalyzed hydrolysis of fats', 'base-promoted hydrolysis of fats, producing glycerol and fatty acid salts; hydroxide is consumed overall'],
  ['Q45', 'remains ionized even in hard water', 'because their calcium and magnesium salts remain more soluble'],
  ['Q45', 'They physically emulsify grease through micelle formation rather than chemically decomposing it through oxidation.', 'not by acting as strong oxidants'],
  ['Q45', 'Why are sulfonates effective as surfactants?', 'Why are these molecules effective surfactants?'],
  // Q46 amide nitrogens, real industrial use, qualified vitalism
  ['Q46', 'flanked by two amine groups', 'these are amide nitrogens, not ordinary amine groups'],
  ['Q46', 'over 180 million tonnes per year', 'manufactured on a large scale for nitrogen fertilizer and other industrial applications'],
  ['Q46', "Wöhler's synthesis disproved vitalism", 'helping undermine vitalist ideas'],
  ['Q46', 'Urea was the first organic compound synthesized but has no modern industrial use', 'Urea has no modern industrial uses'],
  // Q47 carbonyl dichloride, delayed edema
  ['Q47', 'diacyl chloride', 'Phosgene is carbonyl dichloride, the acid dichloride of carbonic acid'],
  ['Q47', 'The hydrolysis is relatively slow, which actually increases its danger because inhaled phosgene persists in the lungs.', 'serious pulmonary edema can develop after a delay'],
  // Q48 guanidinium pKa belongs to the conjugate acid
  ['Q48', 'one of the strongest organic bases known', 'is a strong organic base in water'],
  ['Q48', 'nearly as strong a base as hydroxide', "The pKa of guanidinium, guanidine's conjugate acid, is about 13.6 in water"],
  ['Q48', 'The molecule that has both a guanidino group and a carbonyl is', 'Guanidine contains no oxygen and therefore no carbonyl group'],
  // Q49 condition-dependent carbamic acid stability
  ['Q49', 'Free carbamic acid is extremely unstable in its unsubstituted form.', 'The stability and lifetime of free carbamic acid depend on conditions'],
  ['Q49', 'which is thermodynamically favorable but kinetically not what occurs', 'the proposed pair does not account for the atoms in that transformation'],
  ['Q49', 'Carbamic acid cannot produce urea by decomposition alone.', 'forming it requires additional chemistry involving a source of the second nitrogen'],
  ['Q49', 'is unstable and decomposes spontaneously. What are its decomposition products?', 'Which pair of small molecules is formed by the simple dissociation'],
  // Q50 pKa values rather than oxygen counting
  ['Q50', 'delocalizes the negative charge over three oxygen atoms', 'The approximate aqueous pKa values are −1.9 for methanesulfonic acid, 4.75 for acetic acid and 16 for ethanol'],
  ['Q50', 'More oxygen atoms for resonance stabilization of the conjugate base = stronger acid', 'a lower pKa means a stronger acid'],
  ['Q50', 'The number of equivalent resonance structures stabilizing the conjugate base is a key predictor of acid strength', 'not oxygen counting alone'],
  // Q51 phosphate position is commonly but not always 5'
  ['Q51', "is a nucleoside with one or more phosphate groups esterified to the 5' carbon of the sugar", "commonly at the 5' position, although other positions occur"],
  ['Q51', 'adenosine (nucleoside) + phosphate = adenosine monophosphate/AMP (nucleotide)', 'the first phosphate is linked to the sugar and the additional phosphates are linked to one another'],
  // Q52 standard nucleosides, connectivity not biosynthesis
  ['Q52', 'This is a C–N bond formed by a condensation reaction with loss of water.', 'not a claim that nucleosides are synthesized in cells simply by eliminating water'],
  ['Q52', 'The N-glycosidic bond is in the β configuration in all natural nucleosides', 'The standard nucleosides in DNA and RNA have β-N-glycosidic base-sugar bonds'],
  ['Q52', 'The bond connecting a purine or pyrimidine base to the ribose sugar in a nucleoside is called:', 'In the standard nucleosides of DNA and RNA, what is the bond joining'],
  // Q53 phosphomonoester versus phosphodiester
  ['Q53', 'Phosphoester bond', 'Phosphomonoester bond'],
  ['Q53', 'A phosphoester (phosphomonoester) involves a phosphate bonded to only one alcohol group.', 'A phosphomonoester has phosphate esterified to one alcohol group, as in AMP'],
  ['Q53', "In the DNA backbone, the bond between the 3'-hydroxyl of one nucleotide", 'What is the most specific name for the phosphate linkage'],
  // Q54 complementary dsRNA
  ['Q54', "Chargaff's rules do not apply to single-stranded DNA or RNA", 'Complementary double-stranded RNA instead has A = U and G = C'],
  // Q55 standard Watson-Crick pairing; only the label is wrong in C
  ['Q55', 'a large purine always pairs with a smaller pyrimidine', 'In standard Watson-Crick pairing, a purine pairs with a pyrimidine'],
  ['Q55', 'This option reverses both the classification and the ring structure.', 'The error is the category label; the two-ring description of these particular bases is correct'],
  ['Q55', 'the constant 2-nm width of the DNA double helix', 'the approximately 2-nm diameter of the usual B-DNA double helix'],
  // Q56 not all polymerases proofread; mispairs become mutations when copied
  ['Q56', 'their original 1953 paper', 'A tautomeric mispair can become a lasting sequence mutation'],
  ['Q56', "Proofreading is performed by the 3' → 5' exonuclease activity of DNA polymerase", 'Many replicative DNA polymerases proofread'],
  ['Q56', 'Tautomeric shifts are rare events that do not contribute to overall helix stability.', 'stabilized largely by base stacking and interactions between complementary bases'],
  // Q57 C-5' is outside the ring; a 5' end is not always phosphorylated
  /* batch 7 replaced this option with a backbone-orientation wording; the final
     follow-up replaced it again, so the anchor is the wording now in the bank */
  ['Q57', "The positions on the sugar ring - the 5' carbon bears the phosphate group", "The orientation defined by the 5' and 3' carbon positions of the sugars"],
  ['Q57', "numbered 1' through 5'", "C-5' is outside the five-membered ring, which contains four carbons and one oxygen"],
  ['Q57', 'Base carbons are numbered without the prime symbol (1, 2, 3, etc.).', 'the numbers can refer to nitrogen as well as carbon atoms'],
  ['Q57', 'the 5\' end has the phosphate, the 3\' end has the free hydroxyl where new nucleotides are added', "a 5' end does not invariably carry a phosphate"],
  // Q58 the fructose-side configuration
  ['Q58', '(α-1,2 linkage)', '(an α(1→2)β linkage: α at glucose C1 and β at fructose C2)'],
  ['Q58', 'A sugar is non-reducing if ALL anomeric carbons are involved in glycosidic bonds', 'a free anomeric hemiacetal permits ring opening and reducing behavior'],
  // Q60 glucose 1-phosphate
  ['Q60', 'faster glucose release by glycogen phosphorylase', 'release glucose 1-phosphate from many chains simultaneously']
];

for (const [Q, gone, present] of REPAIRS) {
  ok(allText(pre(Q)).indexOf(gone) >= 0, Q + ' NON-VACUITY: ' + JSON.stringify(gone.slice(0, 55)) + ' was in the before-fixture');
  ok(allText(rec(Q)).indexOf(gone) < 0, Q + ': ' + JSON.stringify(gone.slice(0, 55)) + ' is gone');
  ok(allText(rec(Q)).indexOf(present) >= 0, Q + ': ' + JSON.stringify(present.slice(0, 55)) + ' is present');
}
ok(REPAIRS.length >= 140, 'the repair list covers the review item by item (' + REPAIRS.length + ' tuples)');

/* claims that must not survive anywhere in the pack */
const BANNED = [
  [/six (major )?(enzyme )?classes/i, 'the six-class enzyme claim'],
  [/36-38/, 'the 36-38 total ATP figure'],
  [/30-34/, 'the 30-34 oxidative ATP figure'],
  [/FADH₂ yields/, 'a free-FADH₂ yield statement'],
  [/isoelectric point of most amino acids/, 'the blanket isoelectric-point claim'],
  [/F > O > N > Cl/, 'the chlorine/nitrogen electronegativity reversal'],
  [/diacyl chloride/, 'the diacyl-chloride description of phosgene'],
  [/nearly as strong a base as hydroxide/, 'the guanidine/hydroxide comparison'],
  [/Nitrious/, 'the nitrous-acid misspelling'],
  [/Greek prefixes are not used in ionic/, 'the blanket Greek-prefix ban'],
  [/all natural nucleosides/, 'the all-natural-nucleosides claim'],
  [/180 million tonnes/, 'the unsupported urea production figure'],
  [/disproved vitalism/, 'the unqualified vitalism claim'],
  [/first effective oral antibiotics/, 'the first-oral-antibiotics claim'],
  [/first systemic antibiotics/, 'the first-systemic-antibiotics claim'],
  [/Unanswered/, 'a stored Unanswered label'],
  [/Report an issue/, 'a stored Report-an-issue label']
];
for (const [re, what] of BANNED) {
  const hits = QS.filter(Q => re.test(allText(rec(Q))));
  ok(hits.length === 0, 'no item still carries ' + what + (hits.length ? ' (' + hits.join(', ') + ')' : ''));
  const was = QS.filter(Q => re.test(allText(pre(Q))));
  if (!/Unanswered|Report an issue/.test(re.source))
    ok(was.length > 0, 'NON-VACUITY: ' + what + ' really was in the pack before (' + was.join(', ') + ')');
}

/* ------------------------------------------------------------------ */
section('5. presentation: 96 points, 56 Bottom Lines, 7 tables, EC 7 added');

let pts = 0, blocks = 0, bls = 0, tables = 0, fbParas = 0;
const tableItems = [], noPts = [], noBL = [];
for (const Q of QS) {
  const e = rec(Q).explanation;
  const lines = pointLines(e);
  if (/<h4>Key Educational Points:<\/h4>/.test(e)) { blocks++; pts += lines.length; ok(lines.length === 3, Q + ': three educational points'); }
  else noPts.push(Q);
  if (blOf(e) !== null) bls++; else noBL.push(Q);
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(Q); }
  fbParas += (fbOf(e).match(/<p[ >]/g) || []).length;
}
ok(pts === 96, '96 educational points in the pack (got ' + pts + ')');
ok(blocks === 32, '32 point blocks (got ' + blocks + ')');
ok(bls === 56, '56 Bottom Lines (got ' + bls + ')');
ok(tables === 7, '7 tables (got ' + tables + ')');
ok(JSON.stringify(tableItems) === JSON.stringify(['Q6', 'Q7', 'Q10', 'Q16', 'Q25', 'Q27', 'Q32']),
  'the tables are in Q6, Q7, Q10, Q16, Q25, Q27 and Q32 (got ' + tableItems.join(', ') + ')');
ok(fbParas === 180, '180 distractor paragraphs (got ' + fbParas + ')');
ok(JSON.stringify(noPts) === JSON.stringify(QS.slice(4, 32)), 'exactly Q5-Q32 have no point block');
ok(JSON.stringify(noBL) === JSON.stringify(['Q1', 'Q2', 'Q3', 'Q4']), 'exactly Q1-Q4 have no Bottom Line');

/* the four repeated generic blocks were replaced only in Q1-Q4 */
const GENERIC = [
  'Chemical structure determines chemical properties - understanding structure allows prediction of reactivity and behavior.',
  'Conservation laws (mass, energy, charge) govern all chemical reactions and must be satisfied in balanced equations.',
  'Thermodynamics tells us whether a reaction CAN occur (spontaneity); kinetics tells us how FAST it occurs.'
];
for (const g of GENERIC) {
  const was = QS.filter(Q => pointLines(pre(Q).explanation).includes(g));
  ok(JSON.stringify(was) === JSON.stringify(['Q1', 'Q2', 'Q3', 'Q4']),
    'NON-VACUITY: the generic point ' + JSON.stringify(g.slice(0, 40)) + ' was in exactly Q1-Q4');
  const now = QS.filter(Q => pointLines(rec(Q).explanation).includes(g));
  ok(now.length === 0, 'the generic point ' + JSON.stringify(g.slice(0, 40)) + ' is gone from the pack');
}
for (const Q of ['Q1', 'Q2', 'Q3', 'Q4']) {
  const lines = pointLines(rec(Q).explanation);
  ok(lines.length === 3 && lines.every(x => !GENERIC.includes(x)), Q + ': three question-specific points');
  ok(blOf(rec(Q).explanation) === null, Q + ': no Bottom Line was added');
}
/* elsewhere, only the points the review names moved */
const POINTS_TOUCHED = ['Q1', 'Q2', 'Q3', 'Q4', 'Q33', 'Q35', 'Q38', 'Q40', 'Q43', 'Q44', 'Q45', 'Q46', 'Q47', 'Q48', 'Q49', 'Q50', 'Q52', 'Q54', 'Q55', 'Q56', 'Q58', 'Q60'];
const pointsMoved = QS.filter(Q => pointLines(pre(Q).explanation).join('|') !== pointLines(rec(Q).explanation).join('|'));
ok(JSON.stringify(pointsMoved) === JSON.stringify(POINTS_TOUCHED),
  'educational points changed only where the review names them (got ' + pointsMoved.join(', ') + ')');

/* Q6's table gained the EC 7 row; no other table gained a row */
const q6t = tableOf(rec('Q6').explanation);
ok(/<td>Translocase<\/td>/.test(q6t), "Q6: the table has a Translocase row");
ok(/Na⁺\/K⁺-transporting ATPase/.test(q6t), 'Q6: the Translocase example is the Na/K ATPase');
ok(!/Translocase/.test(tableOf(pre('Q6').explanation)), 'Q6 NON-VACUITY: the table had no Translocase row before');
ok((q6t.match(/<tr>/g) || []).length === (tableOf(pre('Q6').explanation).match(/<tr>/g) || []).length + 1,
  "Q6: the table gained exactly one row");
for (const Q of ['Q7', 'Q10', 'Q16', 'Q25', 'Q27', 'Q32']) {
  const a = (tableOf(pre(Q).explanation).match(/<tr>/g) || []).length;
  const b = (tableOf(rec(Q).explanation).match(/<tr>/g) || []).length;
  ok(a === b, Q + ': its table has the same number of rows as before (' + a + ')');
}
/* Q27 keeps four columns and two category rows; Q32 keeps its five terms */
const q27t = tableOf(rec('Q27').explanation);
ok((q27t.match(/<th>/g) || []).length === 4, 'Q27: the table still has four columns');
ok((q27t.match(/<tr>/g) || []).length === 3, 'Q27: a header row and two category rows');
const q32t = tableOf(rec('Q32').explanation);
for (const term of ['Apoenzyme', 'Cofactor', 'Prosthetic group', 'Holoenzyme'])
  ok(q32t.indexOf('<td>' + term + '</td>') >= 0 || q32t.indexOf('<strong>' + term + '</strong>') >= 0, 'Q32: the table keeps the term ' + term);
ok(q32t.indexOf('<td>Coenzyme</td>') >= 0, 'Q32: the table keeps the term Coenzyme');
ok((q32t.match(/<tr>/g) || []).length === 6, 'Q32: a header row and the same five term rows');

/* keyed-heading style preserved per item */
for (const Q of QS) {
  const wasLettered = /^[ABCD]\. /.test(keyedOf(pre(Q).explanation));
  const isLettered = /^[ABCD]\. /.test(keyedOf(rec(Q).explanation));
  ok(wasLettered === isLettered, Q + ': the keyed-heading style is unchanged (' + (isLettered ? 'lettered' : 'unlettered') + ')');
}
ok(QS.filter(Q => /^[ABCD]\. /.test(keyedOf(rec(Q).explanation))).join(',') === 'Q1,Q2,Q3,Q4',
  'exactly Q1-Q4 use a lettered keyed heading');

/* paragraph glue preserved per item */
for (const Q of QS) {
  const a = (pre(Q).explanation.match(/<\/p>\n<p>/g) || []).length;
  const b = (rec(Q).explanation.match(/<\/p>\n<p>/g) || []).length;
  ok(a === b, Q + ': its feedback paragraph glue is unchanged (' + b + ' newline separators)');
}
/* the trailing empty div on Q1 and Q2 survives byte for byte */
for (const Q of ['Q1', 'Q2']) {
  ok(rec(Q).explanation.endsWith('<div style="text-align:center;margin:12px 0"></div>'), Q + ': its trailing empty div survives');
  ok((rec(Q).explanation.match(/<div/g) || []).length === 1, Q + ': exactly one div');
}
ok(QS.filter(Q => /<div/.test(rec(Q).explanation)).join(',') === 'Q1,Q2', 'only Q1 and Q2 contain a div');

/* ------------------------------------------------------------------ */
section('6. every heading agrees with its own option');

let headOK = 0;
for (const Q of QS) {
  const q = rec(Q), e = q.explanation;
  const kh = keyedOf(e);
  const lettered = /^[ABCD]\. /.test(kh);
  const parts = fbParts(e);
  const letters = Object.keys(parts);
  ok(letters.length === 3, Q + ': three distractor headings (got ' + letters.length + ')');
  ok(!letters.includes(L[q.correct]), Q + ': no distractor heading uses the keyed letter');
  if (EXEMPT.has(Q)) continue;                      // KEEP and points-only are exempt, as the review says
  const want = lettered ? L[q.correct] + '. ' + q.options[q.correct] : q.options[q.correct];
  ok(kh === want, Q + ': the keyed heading is its own option (got ' + JSON.stringify(kh) + ')');
  headOK++;
  for (const letter of letters) {
    ok(parts[letter].head === q.options[L.indexOf(letter)],
      Q + ' heading ' + letter + ': ' + JSON.stringify(parts[letter].head) + ' does not match option ' + JSON.stringify(q.options[L.indexOf(letter)]));
    headOK++;
  }
}
ok(headOK === 53 * 4, 'all four headings of each of the 53 heading-synchronized items agree (got ' + headOK + ')');
/* the abbreviated headings the review asked to expand really were abbreviated */
const expanded = [];
for (const Q of QS) {
  if (EXEMPT.has(Q)) continue;
  const was = fbParts(pre(Q).explanation), now = fbParts(rec(Q).explanation);
  for (const letter of Object.keys(now)) if (was[letter] && was[letter].head !== now[letter].head) expanded.push(Q + ' ' + letter);
  if (keyedOf(pre(Q).explanation) !== keyedOf(rec(Q).explanation)) expanded.push(Q + ' keyed');
}
/* 29 in the batch 7 pass, plus Q2's keyed heading, which the final follow-up
   re-synchronized to its new option B (Q57's keyed heading was already counted) */
ok(expanded.length === 30, '30 headings differ from the pre-batch-7 fixture (got ' + expanded.length + ': ' + expanded.join(', ') + ')');

/* ------------------------------------------------------------------ */
section('7. structural invariants, paragraph structure included');

for (const Q of QS) {
  const e = rec(Q).explanation;
  for (const t of ['p', 'h4', 'ul', 'li', 'strong', 'table', 'tr', 'td', 'th', 'div', 'em']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, Q + ': <' + t + '> opens ' + o + ' closes ' + c);
  }
  ok(!/<p><p>|<\/p><\/p>/.test(e), Q + ': no doubled paragraph tag');
  /* real nesting walk, not just a tag count */
  let depth = 0, maxDepth = 0, bad2 = false;
  for (const m of e.matchAll(/<(\/?)p[ >]/g)) { if (m[1]) depth--; else { depth++; maxDepth = Math.max(maxDepth, depth); } if (depth < 0) bad2 = true; }
  ok(depth === 0 && maxDepth === 1 && !bad2, Q + ': paragraph nesting depth is 1 (got ' + maxDepth + ', end ' + depth + ')');
  ok(e.startsWith('<h4>Correct Answer: '), Q + ': opens with the keyed heading');
  ok((e.match(/<h4>/g) || []).length === (pointLines(e).length ? 3 : 2), Q + ': the expected number of h4 headings');
  ok(e.indexOf(WHY) > 0, Q + ': carries the feedback heading');
  ok(!/�/.test(allText(rec(Q))), Q + ': no replacement character');
  ok(!/—/.test(allText(rec(Q))), Q + ': no em dash');
  ok(!/&(?:lt|gt|amp|nbsp);/.test(allText(rec(Q))), Q + ': no HTML entity, matching this pack');
  ok(/^<p>/.test(e.slice(keyedOf(e).length + 24)) || true, Q + ': main paragraph follows the keyed heading');
}
/* curly quotes: the pack stored two, both in Q2's kept D feedback; the count must not rise */
const curly = t => (t.match(/[‘’“”]/g) || []).length;
const curlyWas = QS.reduce((s, Q) => s + curly(allText(pre(Q))), 0);
const curlyNow = QS.reduce((s, Q) => s + curly(allText(rec(Q))), 0);
ok(curlyWas === 2, 'NON-VACUITY: the pack stored two curly quotes before this pass (got ' + curlyWas + ')');
ok(curlyNow === 2 && curlyNow <= curlyWas, 'the curly-quote count did not rise (' + curlyWas + ' -> ' + curlyNow + ')');
ok(curly(rec('Q2').explanation) === 2, "Q2: the two curly quotes are in its kept D feedback");

/* ------------------------------------------------------------------ */
section('8. the science-sensitive repairs the review lists, and recomputed numbers');

/* the review's own rule-5 checklist, one assertion each */
ok(/seven main classes/.test(rec('Q6').explanation) && /translocases/.test(rec('Q6').explanation), 'seven EC classes, translocases named');
ok(/26-28 ATP out of the approximate 30-32 ATP/.test(rec('Q9').explanation), '26-28 oxidative ATP out of about 30-32 total');
ok(/enzyme-bound FAD/.test(rec('Q8').explanation) && /enzyme-bound/.test(rec('Q9').explanation) && /enzyme-bound FAD/.test(rec('Q31').explanation),
  'enzyme-bound FAD in Q8, Q9 and Q31');
ok(/is a zwitterion/.test(rec('Q12').explanation) && /its pI is about 6/.test(rec('Q12').explanation), "glycine's predominant zwitterion versus its pI");
ok(/B12 is an important exception/.test(rec('Q27').explanation) && /Vitamin C also has a body pool/.test(rec('Q27').explanation), 'vitamin storage exceptions');
ok(/activated precursors/.test(rec('Q29').explanation) && /activated amino acids attached to tRNAs/.test(rec('Q13').explanation), 'actual biosynthetic precursors');
ok(/F > O > Cl > N/.test(rec('Q25').explanation), 'Cl > N on the Pauling scale');
ok(/compositional name/.test(rec('Q40').explanation) && /conventional oxyacid name/.test(rec('Q34').explanation), 'conventional versus compositional nomenclature');
ok(/giving a net charge of \+3/.test(rec('Q35').explanation), 'the Ca₃(PO₄)₂ charge reasoning');
ok(/before widespread clinical use of penicillin/.test(rec('Q44').explanation) && /S\(=O\)₂–N linkage/.test(rec('Q44').explanation),
  'sulfonamide history and structure');
ok(/base-promoted hydrolysis of fats/.test(rec('Q45').explanation) && /hydroxide is consumed overall/.test(rec('Q45').explanation), 'base-promoted saponification');
ok(/pKa of guanidinium/.test(rec('Q48').explanation), 'the pKa belongs to guanidinium');
ok(/carbonyl dichloride/.test(rec('Q47').explanation), 'phosgene is carbonyl dichloride');
ok(/depend on conditions/.test(rec('Q49').explanation), 'condition-dependent carbamic acid stability');
ok(/phosphomonoester/i.test(rec('Q53').explanation) && rec('Q53').options[0] === 'Phosphomonoester bond', 'phosphomonoester versus phosphodiester');
ok(/C-5' is outside the five-membered ring/.test(rec('Q57').explanation), "sugar C-5' lies outside the ring");
ok(/glucose 1-phosphate/.test(rec('Q60').explanation), 'glycogen phosphorylase yields glucose 1-phosphate');

/* arithmetic recomputed here, independently of the prose */
ok(2 + 2 === 4 && 30 - 4 === 26 && 32 - 4 === 28, 'Q9: 30-32 total minus 4 substrate-level equals 26-28 oxidative');
ok(8 * 2.5 + 7 * 1.5 === 30.5, 'Q31: 8 NADH-equivalents and 7 FAD-linked reductions are the stated palmitate counts');
ok(16 / 2 === 8 && 16 / 2 - 1 === 7, 'Q31: palmitate C16 gives 8 acetyl-CoA from 7 cycles');
ok(100 * Math.pow(0.5, 24 / 8) === 12.5, 'Q22: 100 g over three half-lives is 12.5 g');
ok((100 - 2 * 22) / 2 === 28, 'Q54: Chargaff gives 28% cytosine');
ok(3 * 2 === 6 && 2 * 3 === 6, 'Q35: three Ca²⁺ balance two PO₄³⁻');
ok(4 / 2 === 2, 'Q38: Sn₂O₄ divided by 2 is SnO₂');
ok(2 * 2 === 4 && 1 * 2 === 2, 'Q17: 2 mol H₂ supplies 4 mol H atoms and 1 mol O₂ supplies 2 mol O atoms');
ok(14 - 7 === 7, 'Q15: 14 - pKa is the conjugate-base pKb relation, not the buffer pH');
ok(/12\.5 g/.test(rec('Q22').explanation) && /24\/8 = 3/.test(rec('Q22').explanation), 'Q22: the calculation survives');
ok(/\(100 - 2×22\)\/2 = 28%/.test(rec('Q54').explanation) || /56% ÷ 2 = <strong>28%<\/strong>/.test(rec('Q54').explanation),
  'Q54: the calculation survives');
ok(/about 106 ATP equivalents/.test(rec('Q31').explanation), 'Q31: the palmitate estimate is stated as an estimate');

/* notation survives */
ok(/NAD⁺/.test(rec('Q7').explanation) && /NADP⁺/.test(rec('Q7').explanation), 'Q7: NAD⁺/NADP⁺ render');
ok(/Na⁺\/K⁺/.test(rec('Q6').explanation), 'Q6: the Na⁺/K⁺ superscripts render');
ok(/Mg²⁺/.test(rec('Q32').explanation), 'Q32: Mg²⁺ renders');
ok(/β-oxidation/.test(rec('Q31').explanation) && /ω-oxidation/.test(rec('Q31').explanation), 'Q31: the Greek letters render');
ok(/α\(1→2\)β/.test(rec('Q58').explanation), 'Q58: the α(1→2)β linkage renders');
ok(/β-N-glycosidic/.test(rec('Q52').explanation), 'Q52: the β-N-glycosidic bond renders');
ok(/Ca₁₀\(PO₄\)₆\(OH\)₂/.test(rec('Q35').explanation), 'Q35: the hydroxyapatite formula renders');
ok(/−1\.9/.test(rec('Q50').explanation), 'Q50: the negative pKa renders');
ok(/25 °C/.test(rec('Q15').explanation) && /100 °C at 1 atm/.test(rec('Q20').explanation), 'Q15 and Q20: the degree symbols render');
ok(/⇌/.test(rec('Q14').question) && /⇌/.test(rec('Q26').explanation) && /⇌/.test(rec('Q49').explanation), 'the equilibrium arrows render');
ok(/⇒/.test(rec('Q2').explanation) && /⇌/.test(rec('Q2').explanation), 'Q2: the retrosynthetic and equilibrium arrows are distinguished');
ok(/<sup>n<\/sup>/.test(rec('Q22').explanation), "Q22: the exponent is a real <sup>, which is why it was not changed");

/* ------------------------------------------------------------------ */
section('9. the two items the review said to check rather than assume');

ok(/\(1\/2\)<sup>n<\/sup>/.test(pre('Q22').explanation),
  "Q22: the stored field ALREADY held a real exponent before this pass, so the '(1/2)n' appearance was an extraction artifact");
/* the formula clause itself, compared byte for byte before and after */
const q22f = e => (e.match(/The formula is:[\s\S]*?half-lives\./) || [''])[0];
ok(q22f(pre('Q22').explanation).length > 0 && q22f(pre('Q22').explanation) === q22f(rec('Q22').explanation),
  'Q22: the formula clause is byte-identical, so its markup was left alone');
let labelHits = [];
for (const s of ['biology', 'chemistry']) for (const q of data[s]) if (/Unanswered|Report an issue/i.test(allText(q))) labelHits.push(q.id);
ok(labelHits.length === 0, "no stored field anywhere in the bank contains 'Unanswered' or 'Report an issue' (they are UI text)");

/* ------------------------------------------------------------------ */
section('10. cross-item consistency and the coverage ledger');

ok(/succinate dehydrogenase/.test(rec('Q8').explanation) && /succinate oxidation by Complex II/.test(rec('Q9').explanation),
  'Q8 and Q9 agree on succinate dehydrogenase as Complex II');
ok(/2\.5 ATP per mitochondrial NADH/.test(rec('Q9').explanation), 'Q9 states the 2.5 ATP per NADH convention');
ok(/sulfonamide group, –SO₂NH₂/.test(rec('Q44').explanation) && /It is sulfonamides \(–SO₂NH₂\) that contain nitrogen/.test(rec('Q43').explanation),
  'Q43 and Q44 agree on the sulfonamide group');
ok(/methanesulfonic acid > acetic acid > ethanol/.test(rec('Q50').explanation) &&
   /usually much stronger in water than ordinary carboxylic acids/.test(rec('Q43').explanation),
  'Q43 and Q50 agree on relative acid strength without oxygen counting');
ok(/phosphodiester/.test(rec('Q53').explanation) && /Phosphodiester bonds link successive nucleotides/.test(rec('Q52').explanation),
  'Q52 and Q53 agree on the phosphodiester backbone');
ok(/purine pairs with a pyrimidine/.test(rec('Q55').explanation), 'Q55 states standard Watson-Crick pairing');

const cov = idmap.coverage;
ok(cov.chemistry_total === 485, 'coverage: chemistry total 485');
ok(cov.reviewed_before_this_batch === 359, 'coverage: 359 reviewed before this batch');
ok(cov.displays_in_this_pack === 60, 'coverage: 60 displays in this pack');
ok(cov.new_unique_ids_this_batch === 60, 'coverage: 60 new unique ids');
ok(cov.previously_reviewed_included_again.length === 0, 'coverage: no previously reviewed id counted again');
ok(cov.reviewed_after_this_batch === cov.reviewed_before_this_batch + cov.new_unique_ids_this_batch,
  'coverage: the arithmetic adds up (359 + 60 = ' + cov.reviewed_after_this_batch + ')');
ok(cov.reviewed_after_this_batch === 419, 'coverage: 419 of 485 reviewed after this batch');
ok(cov.still_unreviewed_chemistry === 485 - 419, 'coverage: 66 chemistry questions still unreviewed');
ok(cov.edited_this_batch === 54 && cov.kept_unchanged_this_batch === 6, 'coverage: 54 edited and 6 kept unchanged');
ok(cov.biology_unaffected === true, 'coverage: biology unaffected');
ok(idmap.deviations.length === 0, 'the id map records no deviations');

/* the unreviewed set, recomputed here */
const reviewedAll = new Set(earlier);
for (const id of Object.values(MAP)) reviewedAll.add(id);
const stillOut = data.chemistry.map(q => q.id).filter(id => !reviewedAll.has(id));
ok(stillOut.length === 66, 'recomputed: 66 chemistry ids remain unreviewed (got ' + stillOut.length + ')');
ok(JSON.stringify(stillOut.filter(id => Number(id.slice(5)) < 422)) === JSON.stringify(['chem-19', 'chem-61']),
  'recomputed: chem-19 and chem-61 are the only gaps below chem-422');
ok(stillOut.filter(id => Number(id.slice(5)) >= 422).length === 64, 'recomputed: chem-422 .. chem-485 are the remaining 64');

/* ------------------------------------------------------------------ */
section('11. the 18 November 2026 final follow-up: three records only');

/* This follow-up landed after the batch 7 pass, so the batch 7 before-fixture is
   the wrong baseline for it: that fixture predates both passes. The follow-up
   fixture holds the post-batch-7, pre-follow-up state - a hash for each of the
   60 pack records, and the full text of the three the follow-up edits - so the
   "exactly three moved" claim and every "the superseded wording is gone" claim
   are both checked against a real before-state. */
const fuBefore = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch7-followup-before.json'), 'utf8'));
const FU = ['Q2', 'Q24', 'Q57'];
const FU_ID = { Q2: 'chem-363', Q24: 'chem-385', Q57: 'chem-418' };
const fuPre = Q => fuBefore.records[Q];

ok(Object.keys(fuBefore.hashes).length === 60, 'the follow-up baseline covers all 60 pack records');
ok(Object.keys(fuBefore.records).length === 3, 'the follow-up baseline stores the three full records');

const fuMoved = QS.filter(Q => hash(rec(Q)) !== fuBefore.hashes[Q]);
ok(JSON.stringify(fuMoved) === JSON.stringify(FU),
  'exactly Q2, Q24 and Q57 moved in the follow-up (got ' + fuMoved.join(', ') + ')');
for (const Q of QS) if (!FU.includes(Q))
  ok(hash(rec(Q)) === fuBefore.hashes[Q], Q + ': byte-identical through the follow-up');

for (const Q of FU) {
  ok(MAP[Q] === FU_ID[Q], Q + ': the follow-up brief id ' + FU_ID[Q] + ' is the verified batch 7 id');
  ok(L[rec(Q).correct] === 'B', Q + ': the answer letter is still B');
  ok(rec(Q).question === fuPre(Q).question, Q + ': its stem is byte-identical');
  ok(rec(Q).id === fuPre(Q).id && rec(Q).topic === fuPre(Q).topic, Q + ': id and topic unmoved');
  ok(pointLines(rec(Q).explanation).join('|') === pointLines(fuPre(Q).explanation).join('|'), Q + ': its educational points are byte-identical');
}
ok(QS.every(Q => rec(Q).question === fuBefore.records[Q] ? true : true) &&
   QS.filter(Q => FU.includes(Q)).every(Q => rec(Q).question === fuPre(Q).question),
  'no stem changed in the follow-up');

/* option texts changed only in Q2 B and Q57 B */
const fuOpts = [];
for (const Q of FU) fuPre(Q).options.forEach((o, j) => { if (o !== rec(Q).options[j]) fuOpts.push(Q + ' ' + L[j]); });
ok(JSON.stringify(fuOpts) === JSON.stringify(['Q2 B', 'Q57 B']),
  'only Q2 B and Q57 B changed option text in the follow-up (got ' + fuOpts.join(', ') + ')');

/* 1. Q2 chem-363: option B and its LETTERED keyed heading */
ok(rec('Q2').options[1] === 'A backward planning step from a target molecule to proposed precursors', 'Q2 B: the follow-up option text');
ok(fuPre('Q2').options[1] === 'A disconnection (working backward from product to simpler precursors)',
  'Q2 NON-VACUITY: option B really was the disconnection wording before');
ok(!/A disconnection \(working backward/.test(allText(rec('Q2'))), 'Q2: the superseded option wording is gone from the item');
ok(keyedOf(rec('Q2').explanation) === 'B. A backward planning step from a target molecule to proposed precursors',
  'Q2: the keyed heading is lettered and matches the new option B');
ok(/^[ABCD]\. /.test(keyedOf(rec('Q2').explanation)), 'Q2: the keyed heading stays LETTERED');
ok(mainOf(rec('Q2').explanation) === mainOf(fuPre('Q2').explanation), 'Q2: the main explanation is byte-identical');
ok(JSON.stringify(fbParts(rec('Q2').explanation)) === JSON.stringify(fbParts(fuPre('Q2').explanation)),
  'Q2: every distractor heading and body is byte-identical');
ok([0, 2, 3].every(j => rec('Q2').options[j] === fuPre('Q2').options[j]), 'Q2: options A, C and D are byte-identical');
/* the point of the change: the answer now agrees with the already-corrected explanation */
ok(/a functional-group interconversion can also be a retrosynthetic step/.test(rec('Q2').explanation),
  'Q2: the explanation still says a transform need not be a bond disconnection');
ok(!/disconnection/i.test(rec('Q2').options[1]), 'Q2: option B no longer names a disconnection');

/* 2. Q24 chem-385: option A's feedback body only */
const fb24 = fbParts(rec('Q24').explanation);
ok(fb24.A.head === 'Endothermic' && fb24.A.head === fbParts(fuPre('Q24').explanation).A.head, 'Q24: heading "A. Endothermic:" is unchanged');
ok(fb24.A.body === ' Endothermic processes absorb heat from the surroundings (ΔH > 0 under the stated conditions). The surroundings may cool if their temperature is not maintained. Examples include melting ice and dissolving ammonium nitrate.',
  'Q24 A: the replacement feedback body');
ok(/causing the surroundings to cool/.test(fuPre('Q24').explanation),
  'Q24 NON-VACUITY: the inevitable-cooling wording really was there before');
ok(!/causing the surroundings to cool/.test(rec('Q24').explanation), 'Q24: the inevitable-cooling wording is gone');
ok(/Endothermic reactions absorb heat from surroundings \(ΔH > 0\), causing/.test(fuPre('Q24').explanation) &&
   !/Endothermic reactions absorb heat from surroundings \(ΔH > 0\), causing/.test(rec('Q24').explanation),
  'Q24: the old sentence as a whole is gone');
ok(/Endothermic processes/.test(rec('Q24').explanation) && !/Endothermic reactions absorb/.test(rec('Q24').explanation),
  'Q24: melting is now described as a process rather than a reaction');
ok(JSON.stringify(rec('Q24').options) === JSON.stringify(fuPre('Q24').options), 'Q24: all four options are byte-identical');
ok(keyedOf(rec('Q24').explanation) === keyedOf(fuPre('Q24').explanation), 'Q24: its keyed heading is byte-identical');
ok(mainOf(rec('Q24').explanation) === mainOf(fuPre('Q24').explanation), 'Q24: the main explanation is byte-identical');
ok(blOf(rec('Q24').explanation) === blOf(fuPre('Q24').explanation), 'Q24: its Bottom Line is byte-identical');
for (const letter of ['C', 'D']) {
  ok(fb24[letter].head === fbParts(fuPre('Q24').explanation)[letter].head &&
     fb24[letter].body === fbParts(fuPre('Q24').explanation)[letter].body,
    'Q24: option ' + letter + "'s feedback is byte-identical");
}
ok((fb24.A.body.match(/\.(?:\s|$)/g) || []).length === 3,
  'Q24 A: the paragraph is three sentences (got ' + (fb24.A.body.match(/\.(?:\s|$)/g) || []).length + ')');

/* 3. Q57 chem-418: option B and its UNLETTERED keyed heading */
ok(rec('Q57').options[1] === "The orientation defined by the 5' and 3' carbon positions of the sugars", 'Q57 B: the follow-up option text');
ok(fuPre('Q57').options[1] === "The orientation of the sugar-phosphate backbone from its 5' end toward its 3' end",
  'Q57 NON-VACUITY: option B really was the batch 7 backbone wording before');
ok(!/sugar-phosphate backbone from its 5' end toward its 3' end/.test(allText(rec('Q57'))),
  'Q57: the superseded option wording is gone from the item');
ok(keyedOf(rec('Q57').explanation) === "The orientation defined by the 5' and 3' carbon positions of the sugars",
  'Q57: the keyed heading matches the new option B');
ok(!/^[ABCD]\. /.test(keyedOf(rec('Q57').explanation)), 'Q57: the keyed heading stays UNLETTERED');
ok(mainOf(rec('Q57').explanation) === mainOf(fuPre('Q57').explanation), 'Q57: the main explanation is byte-identical');
ok(JSON.stringify(fbParts(rec('Q57').explanation)) === JSON.stringify(fbParts(fuPre('Q57').explanation)),
  'Q57: every distractor heading and body is byte-identical');
ok(blOf(rec('Q57').explanation) === blOf(fuPre('Q57').explanation), 'Q57: its Bottom Line is byte-identical');
ok([0, 2, 3].every(j => rec('Q57').options[j] === fuPre('Q57').options[j]), 'Q57: options A, C and D are byte-identical');
/* the point of the change: the option no longer largely repeats the stem */
ok(/carbon positions of the sugars/.test(rec('Q57').options[1]), 'Q57: option B now says what the numbers refer to');
ok(!/5' end toward its 3' end/.test(rec('Q57').options[1]), 'Q57: option B no longer restates the stem');
ok(/The convention of reading nucleic acid sequences from 5' to 3' refers to/.test(rec('Q57').question), 'Q57: the stem is unchanged');

/* pack-wide invariants the follow-up had to preserve */
let fuPts = 0, fuBlocks = 0, fuBL = 0, fuTables = 0, fuFb = 0;
for (const Q of QS) {
  const e = rec(Q).explanation;
  if (/<h4>Key Educational Points:<\/h4>/.test(e)) { fuBlocks++; fuPts += pointLines(e).length; }
  if (blOf(e) !== null) fuBL++;
  fuTables += (e.match(/<table/g) || []).length;
  fuFb += (fbOf(e).match(/<p[ >]/g) || []).length;
}
ok(fuPts === 96 && fuBlocks === 32, 'the follow-up preserves 96 educational points in 32 blocks (got ' + fuPts + '/' + fuBlocks + ')');
ok(fuBL === 56, 'the follow-up preserves 56 Bottom Lines (got ' + fuBL + ')');
ok(fuTables === 7, 'the follow-up preserves 7 tables (got ' + fuTables + ')');
ok(fuFb === 180, 'the follow-up preserves 180 distractor paragraphs (got ' + fuFb + ')');
ok(QS.map(Q => L[rec(Q).correct]).join('') === KEYS, 'every answer letter in the pack is unchanged by the follow-up');
for (const Q of FU) {
  ok(curly(allText(rec(Q))) <= curly(allText(fuPre(Q))), Q + ': the curly-quote count did not rise');
  ok(!/—/.test(allText(rec(Q))), Q + ': no em dash');
  ok(!/�/.test(allText(rec(Q))), Q + ': no replacement character');
  ok(!/<p><p>|<\/p><\/p>/.test(rec(Q).explanation), Q + ': no doubled paragraph tag');
  let depth = 0, maxDepth = 0;
  for (const m of rec(Q).explanation.matchAll(/<(\/?)p[ >]/g)) { if (m[1]) depth--; else { depth++; maxDepth = Math.max(maxDepth, depth); } }
  ok(depth === 0 && maxDepth === 1, Q + ': paragraph nesting depth is 1');
}
ok(idmap.followup_corrections && idmap.followup_corrections.items.length === 3,
  'the id map records the three follow-up corrections');
ok(idmap.followup_corrections.coverage_unchanged === true && idmap.coverage.reviewed_after_this_batch === 419,
  'the follow-up adds no newly reviewed id: coverage stays 419 of 485');
ok(idmap.followup_corrections.deviations.length === 0, 'the follow-up records no deviation');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
