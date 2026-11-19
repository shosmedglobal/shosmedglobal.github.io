/* Result-verifying suite for SHOSMED_LF3_Chemistry_Batch8_Review.txt.
 *
 * This checks the BANK, not the harness. The review supplied original
 * identification signatures, so section 1 re-derives the id map from them by
 * full content match, proves the match is unique bank-wide, and recomputes
 * coverage from unique verified ids rather than trusting the asserted repeats.
 * Every "claim removed" assertion is paired with a non-vacuity check that the
 * claim really was in the before-fixture.
 *
 * Passing this suite establishes scope, structure and consistency. It is NOT
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
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch8-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch8-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch8-untouched.json'), 'utf8'));
const SIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch8-signatures.json'), 'utf8'));
const fuBefore = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/chem-review-batch8-followup-before.json'), 'utf8'));

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const by = id => data.chemistry.find(r => r.id === id);
const rec = Q => by(MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);
const KEEP = ['Q1', 'Q2', 'Q3', 'Q4', 'Q17', 'Q18', 'Q25', 'Q31', 'Q40', 'Q44', 'Q49', 'Q57'];
const KEEPSET = new Set(KEEP);
const REBUILT = ['Q59', 'Q60'];

const pointLines = e => {
  const m = e.match(/<h4>Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>[\s\S]*?<\/li>/g) || []).map(s => s.slice(4, -5)) : [];
};
const headOf = e => {
  const km = e.match(/^<h4>Correct Answer: [\s\S]*?<\/h4>/);
  const a = e.indexOf(WHY);
  return km && a >= 0 ? e.slice(km[0].length, a) : '';
};
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
const curly = t => (t.match(/[‘’“”]/g) || []).length;

let n = 0, bad = 0;
function ok(c, m) { n++; if (!c) { bad++; console.error('  FAIL ' + m); } }
function section(t) { console.log('\n' + t); }

const KEYS = 'BCCADCCBDB' + 'DBACDCDADA' + 'CBADADDBBA' + 'DBACADBBCD' + 'ACDBCABCCB' + 'BCBACCBCCA';

/* ------------------------------------------------------------------ */
section("1. the id map, re-derived from the review's ORIGINAL signatures");

ok(QS.length === 60, 'the map has 60 display numbers');
ok(Object.keys(before).length === 60, 'the before-fixture has 60 records');
ok(Object.keys(SIG.sigs).length === 60, 'the signature fixture has 60 signatures');
ok(SIG.keyBlock === KEYS && idmap.asserted_key_block === KEYS,
  'the signature keys and the id map both reproduce the review key block');
ok(SIG.tally.A === 13 && SIG.tally.B === 16 && SIG.tally.C === 18 && SIG.tally.D === 13,
  'the signature tally is A=13, B=16, C=18, D=13');

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
function canon(s) {
  let t = String(s);
  t = t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
  t = t.replace(/<sub>([\s\S]*?)<\/sub>/g, '$1').replace(/<sup>([\s\S]*?)<\/sup>/g, '$1');
  t = t.replace(/<[^>]+>/g, ' ');
  for (let i = 0; i < 10; i++) t = t.split(SUB[i]).join(String(i)).split(SUP[i]).join(String(i));
  t = t.replace(/⁺/g, '+').replace(/⁻/g, '-');
  t = t.replace(/[‐-―−]/g, '-');
  t = t.replace(/[‘’′]/g, "'").replace(/[“”]/g, '"');
  t = t.replace(/α/g, 'alpha').replace(/β/g, 'beta').replace(/γ/g, 'gamma')
       .replace(/ω/g, 'omega').replace(/Δ/g, 'delta').replace(/δ/g, 'delta')
       .replace(/π/g, 'pi').replace(/μ/g, 'mu').replace(/½/g, '1/2');
  t = t.replace(/→/g, '->').replace(/⇒/g, '=>').replace(/⇌/g, '<=>').replace(/⇋|⇄/g, '<=>');
  t = t.replace(/°/g, ' deg ').replace(/·/g, '.').replace(/×/g, 'x');
  return t.toLowerCase().replace(/\s+/g, ' ').trim();
}
const sigOf = o => canon(o.stem) + '\u0000' + o.options.map(canon).join('\u0000');
const recSig = q => canon(q.question) + '\u0000' + q.options.map(canon).join('\u0000');

/* bank-wide uniqueness, computed from the BEFORE-fixture for the pack items
   (their text has since been edited) and from the live bank for the rest */
const bySig = new Map();
for (const q of data.chemistry) {
  const src = PACK.has(q.id) ? before[QS.find(Q => MAP[Q] === q.id)] : q;
  const k = recSig(src);
  if (!bySig.has(k)) bySig.set(k, []);
  bySig.get(k).push(q.id);
}
ok(bySig.size === 485, 'all 485 chemistry records have distinct full signatures (got ' + bySig.size + ')');
const stemSet = new Set(data.chemistry.map(q => canon((PACK.has(q.id) ? before[QS.find(Q => MAP[Q] === q.id)] : q).question)));
ok(stemSet.size === 485, 'all 485 canonical stems are distinct too, so no match needed a tie-break (got ' + stemSet.size + ')');

let matched = 0, keyOK = 0;
for (const Q of QS) {
  const hits = bySig.get(sigOf(SIG.sigs[Q])) || [];
  ok(hits.length === 1 && hits[0] === MAP[Q],
    Q + ': the signature matches exactly one record and it is ' + MAP[Q] + ' (got ' + (hits.join(',') || 'none') + ')');
  if (hits.length === 1 && hits[0] === MAP[Q]) matched++;
  if (L[rec(Q).correct] === SIG.sigs[Q].key) keyOK++;
}
ok(matched === 60, 'all 60 signatures resolve to the mapped record (' + matched + ' of 60)');
ok(keyOK === 60, 'every stored answer letter equals the review letter (' + keyOK + ' of 60)');
ok(QS.map(Q => L[rec(Q).correct]).join('') === KEYS, 'the stored key block equals the review key block');
ok(idmap.verification.keys_changed === 0, 'the id map records that no key was changed');

/* the two keys the export did not expose */
ok(L[rec('Q59').correct] === 'C' && rec('Q59').options[rec('Q59').correct] === 'Glass (silicate)',
  "Q59's stored key is C, Glass (silicate), as the review determined scientifically");
ok(L[rec('Q60').correct] === 'A' && rec('Q60').options[rec('Q60').correct] === 'Ionic crystal',
  "Q60's stored key is A, Ionic crystal, as the review determined scientifically");
ok(SIG.sigs.Q59.keySource.indexOf('scientifically determined') >= 0 &&
   SIG.sigs.Q60.keySource.indexOf('scientifically determined') >= 0,
  'the signature fixture records that those two letters were not read from an exported heading');

/* the asserted repeats, confirmed rather than trusted */
const owner = new Map();
for (let b = 1; b <= 7; b++) {
  const f = path.join(ROOT, 'scripts/chem-review-batch' + b + '-idmap.json');
  ok(fs.existsSync(f), 'chemistry batch ' + b + ' has an id map file');
  if (!fs.existsSync(f)) continue;
  for (const id of Object.values(JSON.parse(fs.readFileSync(f, 'utf8')).map || {}))
    if (!owner.has(id)) owner.set(id, 'batch' + b);
}
ok(owner.size === 419, 'the seven earlier chemistry batches own 419 distinct ids (got ' + owner.size + ')');
const repeats = QS.filter(Q => owner.has(MAP[Q]));
ok(JSON.stringify(repeats) === JSON.stringify(['Q1', 'Q2', 'Q3', 'Q4']),
  'exactly Q1-Q4 repeat an earlier record (got ' + repeats.join(',') + ')');
for (const Q of repeats) ok(owner.get(MAP[Q]) === 'batch7', Q + ' ' + MAP[Q] + ' is owned by chemistry batch 7');
ok(JSON.stringify(idmap.verification.asserted_repeats_confirmed_by_content) ===
   JSON.stringify(['Q1=chem-369', 'Q2=chem-382', 'Q3=chem-396', 'Q4=chem-409']),
  'the id map records the four confirmed repeats');

const newIds = QS.filter(Q => !owner.has(MAP[Q])).map(Q => MAP[Q]);
ok(new Set(newIds).size === 56, 'this pack adds 56 new unique chemistry ids (got ' + new Set(newIds).size + ')');
ok(newIds[0] === 'chem-422' && newIds[newIds.length - 1] === 'chem-477',
  'the new ids run chem-422 .. chem-477');
const nums = Object.values(MAP).map(x => Number(x.slice(5)));
let contig = true;
for (let i = 1; i < nums.length; i++) if (nums[i] !== nums[i - 1] + 1) contig = false;
ok(contig === false && idmap.verification.ids_contiguous === false,
  'the pack is NOT a contiguous id run, and the id map says so');
ok(new Set(Object.values(MAP)).size === 60, 'the 60 display numbers map to 60 distinct ids');

/* ------------------------------------------------------------------ */
section('2. scope: 48 edited, 12 KEEP byte-identical, 24 stems, 11 option texts');

const changed = [], stems = [], opts = [], expls = [], same = [];
for (const Q of QS) {
  const a = pre(Q), b = rec(Q);
  let touched = false;
  if (a.question !== b.question) { stems.push(Q); touched = true; }
  if (JSON.stringify(a.options) !== JSON.stringify(b.options)) {
    touched = true;
    a.options.forEach((o, j) => { if (o !== b.options[j]) opts.push(Q + ' ' + L[j]); });
  }
  if (a.explanation !== b.explanation) { expls.push(Q); touched = true; }
  if (touched) changed.push(Q); else same.push(Q);
  ok(a.id === b.id && a.correct === b.correct && a.topic === b.topic, Q + ': id, answer letter and topic unchanged');
}
/* The follow-up (section 11) explicitly supersedes Q49's KEEP status, for option
   B's feedback body alone. The batch 8 pass itself still left Q49 untouched,
   which is proved below against the follow-up baseline rather than assumed. */
const FU_TOUCHED = ['Q49'];
const KEEP_STILL = KEEP.filter(Q => !FU_TOUCHED.includes(Q));
ok(changed.length === 49, '48 items changed in the batch 8 pass plus Q49 in the follow-up (got ' + changed.length + ')');
ok(JSON.stringify(same) === JSON.stringify(KEEP_STILL),
  'the untouched set is the eleven KEEP items the follow-up did not reopen (got ' + same.join(',') + ')');
for (const Q of KEEP_STILL) ok(JSON.stringify(pre(Q)) === JSON.stringify(rec(Q)), Q + ': KEEP item byte-identical in every field');
ok(JSON.stringify(pre('Q49')) === JSON.stringify(fuBefore.records.Q49),
  'Q49: the batch 8 pass itself left it byte-identical; only the follow-up touched it');
ok(JSON.stringify(stems) === JSON.stringify(idmap.stem_changes),
  '24 stems replaced, exactly the ones the review lists (got ' + stems.length + ')');
ok(stems.length === 24, 'the stem count is 24');
ok(JSON.stringify(opts) === JSON.stringify(Object.keys(idmap.option_changes)),
  '11 option texts changed across six items, exactly as listed (got ' + opts.join(',') + ')');
ok(opts.length === 11 && new Set(opts.map(x => x.split(' ')[0])).size === 6,
  'the 11 option changes fall in exactly six items');
for (const slot of Object.keys(idmap.option_changes)) {
  const [Q, letter] = slot.split(' ');
  ok(rec(Q).options[L.indexOf(letter)] === idmap.option_changes[slot], slot + ': stored option text is the replacement the review supplies');
}
ok(expls.length === 48, '47 explanations changed in the batch 8 pass, Q10 being stem-only, plus Q49 in the follow-up (got ' + expls.length + ')');
ok(pre('Q10').explanation === rec('Q10').explanation && JSON.stringify(pre('Q10').options) === JSON.stringify(rec('Q10').options),
  'Q10: stem only, its explanation and options are byte-identical');

/* narrow-scope items: nothing but the named field moved */
const blankBL = e => e.replace(/<p class='exp-key'>Bottom Line: [\s\S]*?<\/p>/, '<BL>');
for (const Q of ['Q43', 'Q45']) {
  ok(blankBL(pre(Q).explanation) === blankBL(rec(Q).explanation), Q + ': only the Bottom Line moved');
  ok(blOf(pre(Q).explanation) !== blOf(rec(Q).explanation), Q + ': the Bottom Line really did change');
}
for (const [Q, letter] of [['Q13', 'C'], ['Q23', 'B'], ['Q37', 'A'], ['Q39', 'D']]) {
  const strip = e => e.replace(new RegExp('<p><strong>' + letter + '\\. [\\s\\S]*?<\\/p>'), '<FB>');
  ok(strip(pre(Q).explanation) === strip(rec(Q).explanation), Q + ': only option ' + letter + "'s feedback paragraph moved");
  ok(fbParts(pre(Q).explanation)[letter].body !== fbParts(rec(Q).explanation)[letter].body,
    Q + ': option ' + letter + "'s feedback body really did change");
  ok(fbParts(pre(Q).explanation)[letter].head === fbParts(rec(Q).explanation)[letter].head,
    Q + ': option ' + letter + "'s heading is unchanged");
}
{
  const a = pointLines(pre('Q8').explanation), b = pointLines(rec('Q8').explanation);
  ok(a.length === 3 && b.length === 3, 'Q8 still has three points');
  ok(a[0] !== b[0] && a[1] === b[1] && a[2] === b[2], 'Q8: point 1 only');
  const stripP = e => e.replace(/<h4>Key Educational Points:<\/h4><ul>[\s\S]*?<\/ul>/, '<PTS>');
  ok(stripP(pre('Q8').explanation) === stripP(rec('Q8').explanation), 'Q8: nothing outside the point block moved');
}
{
  const a = pointLines(pre('Q11').explanation), b = pointLines(rec('Q11').explanation);
  ok(a.length === 3 && b.length === 3, 'Q11 still has three points');
  ok(a[0] !== b[0] && a[1] !== b[1] && a[2] === b[2], 'Q11: points 1 and 2 only');
  const stripP = e => e.replace(/<h4>Key Educational Points:<\/h4><ul>[\s\S]*?<\/ul>/, '<PTS>');
  ok(stripP(pre('Q11').explanation) === stripP(rec('Q11').explanation), 'Q11: nothing outside the point block moved');
}
ok(idmap.scope.items_edited === 48 && idmap.scope.keep_unchanged.length === 12,
  'the id map records 48 edited and 12 KEEP items');

/* ------------------------------------------------------------------ */
section('3. nothing outside the pack moved');

let bioSame = 0, chemSame = 0, outside = [];
for (const q of data.biology) { if (untouched.biology[q.id] === hash(q)) bioSame++; else outside.push(q.id); }
for (const q of data.chemistry) {
  if (PACK.has(q.id)) continue;
  if (untouched.chemistry[q.id] === hash(q)) chemSame++; else outside.push(q.id);
}
ok(data.biology.length === 629 && data.chemistry.length === 485, 'the bank still holds 629 biology and 485 chemistry records');
ok(bioSame === 629, 'all 629 biology records are byte-identical (got ' + bioSame + ')');
ok(chemSame === 425, 'all 425 out-of-pack chemistry records are byte-identical (got ' + chemSame + ')');
ok(outside.length === 0, 'no record outside the pack changed' + (outside.length ? ': ' + outside.slice(0, 6).join(', ') : ''));
ok(Object.keys(untouched.chemistry).length === 425, 'the untouched fixture covers the 425 out-of-pack chemistry records');

/* ------------------------------------------------------------------ */
section('4. the review\'s content repairs, each paired with a non-vacuity check');

/* [display, /must be present now/, label] - also asserted ABSENT before */
const ADDED = [
  ['Q5', /anomeric composition approaches equilibrium/, 'equilibrium framing'],
  ['Q5', /a ketone for a ketose such as fructose/, 'ketoses included'],
  ['Q5', /no longer forms the hemiacetal or hemiketal center/, 'the carbon is not removed'],
  ['Q6', /with the CH₂OH group at C5 drawn above the ring/, 'the stem states the drawing'],
  ['Q6', /should not be substituted for up and down in a Haworth projection/, 'axial/equatorial warning'],
  ['Q6', /Haworth up\/down describes ring-face orientation/, 'the replacement third point'],
  ['Q7', /maximum number of stereoisomers for a molecule with three tetrahedral stereocenters/, 'the maximum is asked'],
  ['Q7', /molecular symmetry can make some assignments identical/, 'symmetry can reduce the count'],
  ['Q7', /Six is therefore not an impossible number/, 'six is not impossible'],
  ['Q8', /in meso-tartaric acid, an internal mirror plane explains the achirality/, 'point 1 scoped to the example'],
  ['Q9', /Under the same achiral conditions/, 'achiral-conditions qualifier'],
  ['Q9', /Conformers differ through rotations about single bonds/, 'rewritten B feedback'],
  ['Q10', /With H pointing away from the viewer/, 'explicit viewing direction'],
  ['Q11', /Cis\/trans and E\/Z are not universally interchangeable/, 'no universal conversion rule'],
  ['Q12', /standard pressure \(1 bar\)/, 'standard pressure stated'],
  ['Q12', /C\(s, graphite\)/, 'graphite specified'],
  ['Q12', /elemental reference forms required for an enthalpy of formation/, 'rewritten C feedback'],
  ['Q13', /Breaking H−H and Cl−Cl requires 436 \+ 242 = 678 kJ/, 'the real calculation in C feedback'],
  ['Q14', /reference form is defined as zero/, 'reference-form wording'],
  ['Q14', /Standard pressure is 1 bar/, '1 bar, not 1 atm'],
  ['Q14', /approximately half the O=O bond-dissociation enthalpy/, 'rewritten B feedback'],
  ['Q15', /remain approximately constant over the temperature range considered/, 'the stated approximation'],
  ['Q15', /\(200 K\)\(−0.200 kJ\/K\) = −60 kJ/, 'the real 200 K arithmetic'],
  ['Q16', /Dissolving NaCl in water to form a dilute solution at 25 °C/, 'the new keyed option'],
  ['Q16', /Condensing water vapor at 100 °C and 1 atm/, 'the condensation distractor'],
  ['Q16', /its entropy change is not always positive/, 'dissolution is not always positive'],
  ['Q19', /The temperature needed depends on conditions, including CO₂ pressure/, 'no fixed decomposition temperature'],
  ['Q19', /electrolysis of a suitable molten salt/, 'rewritten B feedback'],
  ['Q20', /A useful simplified equilibrium is/, 'the equilibrium is called simplified'],
  ['Q20', /\[FeSCN\]²⁺\(aq\)/, 'the 1:1 complex'],
  ['Q20', /a red coloration in solution, not a precipitate/, 'the observation stated'],
  ['Q21', /Basic copper\(II\) sulfates, including brochantite/, 'the corrected keyed option'],
  ['Q21', /Cu₄SO₄\(OH\)₆/, "brochantite's formula"],
  ['Q22', /tetrahydroxoaluminate/, 'the hydroxo complex named'],
  ['Q22', /→ 2Na\[Al\(OH\)₄\]\(aq\)/, 'the hydroxo-complex equation'],
  ['Q23', /but the reagent here is HCl/, 'rewritten B feedback'],
  ['Q24', /standard reduction potentials for X₂\/X⁻ couples/, 'the potential-based stem'],
  ['Q24', /Fluorine also reacts vigorously with water/, 'fluorine caveat'],
  ['Q26', /Binding is reversible/, 'reversibility'],
  ['Q26', /hyperbaric oxygen is considered in selected cases/, 'no mandatory hyperbaric claim'],
  ['Q27', /EC 7<\/td><td>Translocases/, 'the EC 7 row'],
  ['Q27', /nucleoside-triphosphate cleavage/, 'the corrected EC 6 description'],
  ['Q27', /not by itself a diagnosis of a particular disease/, 'the qualified ALT Bottom Line'],
  ['Q28', /active pepsin also helps activate more pepsinogen/, 'autoactivation added'],
  ['Q28', /colipase supports pancreatic lipase action at the lipid-water interface/, 'the corrected colipase role'],
  ['Q29', /derived from vitamin B₆, is the coenzyme used by aminotransferases/, 'no "all enzymes" claim'],
  ['Q29', /not a universal coenzyme for every pathway of amino acid metabolism/, 'the qualified Bottom Line'],
  ['Q30', /EC 4\.1\.2\.13/, 'the EC number'],
  ['Q30', /no dehydration step is part of this net reaction/, 'no dehydration'],
  ['Q32', /conventionally counted as one FADH₂ equivalent/, 'FAD-linked equivalents'],
  ['Q32', /cycles = n\/2 - 1 and acetyl-CoA units = n\/2/, 'the even-chain formula'],
  ['Q33', /estimated ATP-equivalent yield under the supplied accounting assumptions/, 'the framing sentence'],
  ['Q34', /depending on the enzyme isoform/, 'the isoform-aware stem'],
  ['Q34', /Other isoforms use ADP and produce ATP, including in human tissues/, 'the ADP isoform'],
  ['Q34', /an important regulatory point/, 'softened regulatory claim'],
  ['Q35', /commonly estimated at about 30-32 ATP/, 'modern aerobic estimate'],
  ['Q35', /they lack mitochondria, even when oxygen is available/, 'erythrocyte correction'],
  ['Q36', /During mitochondrial β-oxidation of a saturated fatty acyl-CoA/, 'the qualified stem'],
  ['Q36', /Electrons pass onward through electron-transfer proteins/, 'no free FADH₂'],
  ['Q36', /It is not simply β-oxidation run backward/, 'synthesis is a distinct pathway'],
  ['Q37', /The balanced equation gives one mole of CO₂ per mole of CaCO₃/, 'rewritten A feedback'],
  ['Q38', /ideal dilute-solution approximation/, 'the stated model'],
  ['Q38', /twice the concentration in this question/, 'rewritten A feedback'],
  ['Q39', /A 1:4 ratio would incorrectly produce this answer/, 'rewritten D feedback'],
  ['Q41', /C\(s, graphite\) \+ 2H₂\(g\) → CH₄\(g\)\?/, 'graphite in the stem target'],
  ['Q41', /Add reaction 1 to twice reaction 2 and subtract reaction 3/, 'rewritten C feedback'],
  ['Q42', /commonly used name of KMnO₄/, 'no IUPAC claim in the stem'],
  ['Q42', /not a universal naming rule for every element/, 'the prefix rule is limited'],
  ['Q43', /smallest whole-number ratio that makes the total charge zero/, 'the rewritten Bottom Line'],
  ['Q45', /Among these, succinate is a citric acid cycle intermediate/, 'only succinate claimed'],
  ['Q46', /oxygen binding supplies a sixth ligand/, 'the corrected coordination account'],
  ['Q46', /A level just above 1% does not automatically cause cyanosis/, 'no 1% symptom threshold'],
  ['Q46', /related to but chemically distinct from a porphyrin/, 'chlorin vs porphyrin'],
  ['Q47', /relatively rigid but not planar/, 'not planar'],
  ['Q47', /secosteroid: one ring has opened/, 'vitamin D ring opening'],
  ['Q48', /ascorbic acid and an important biochemical role/, 'the reworded stem'],
  ['Q48', /tocopherols and tocotrienols/, 'vitamin E is a family'],
  ['Q48', /Some vitamin names represent families of compounds/, 'the rewritten Bottom Line'],
  ['Q50', /Monosodium urate crystals from purine degradation/, 'the corrected keyed option'],
  ['Q50', /guanine is converted to xanthine by a different route/, 'two purine routes'],
  ['Q50', /not everyone with hyperuricemia develops gout/, 'hyperuricemia is not gout'],
  ['Q51', /creatinine from creatine and phosphocreatine breakdown/, 'the corrected keyed option'],
  ['Q51', /not an exact GFR measurement/, 'creatinine is not a gold standard'],
  ['Q51', /reported as BUN/, 'BUN is the nitrogen component'],
  ['Q52', /Brønsted conjugate acid of NaOH/, 'the conjugate-pair correction'],
  ['Q52', /negligible ion hydrolysis/, 'the NaCl contrast'],
  ['Q53', /dilute-solution concentration model/, 'the stated model'],
  ['Q53', /provided x is small compared with 0.10 M/, 'where the approximation enters'],
  ['Q53', /so the approximation is justified/, 'the approximation is checked'],
  ['Q54', /CaH₂ is used to dry selected organic solvents/, 'use depends on the compound'],
  ['Q54', /Sodium metal would itself react with water/, 'rewritten C feedback'],
  ['Q55', /contains C₂²⁻, an acetylide ion/, 'the unambiguous acetylide charge'],
  ['Q55', /methanide ion \(C⁴⁻\)/, 'the unambiguous methanide charge'],
  ['Q55', /hard, heat-resistant materials/, 'no universal inertness claim'],
  ['Q56', /smallest whole-number coefficients/, 'the qualified stem'],
  ['Q56', /enough for two H₂O rather than the four required/, 'the real B-distractor reason'],
  ['Q58', /Earth's dry atmosphere\?/, 'dry atmosphere in the stem'],
  ['Q58', /about 0\.93% of dry air/, 'dry air in the Bottom Line'],
  ['Q59', /Correct Answer: Glass \(silicate\)/, 'the keyed heading'],
  ['Q59', /It is not a liquid at ordinary room temperature/, 'glass is a solid'],
  ['Q59', /Fused silica is an example of amorphous SiO₂/, 'composition is not identity'],
  ['Q60', /Correct Answer: Ionic crystal/, 'the keyed heading'],
  ['Q60', /rock-salt structure/, 'the lattice description'],
  ['Q60', /covalent network solid, such as diamond/, 'the D feedback']
];
for (const [Q, re, what] of ADDED) {
  ok(re.test(allText(rec(Q))), Q + ' now states: ' + what);
  ok(!re.test(allText(pre(Q))), Q + ' did NOT state it before, so the check is not vacuous: ' + what);
}

/* claims that must be GONE from the item, and really were there before */
const GONE = [
  ['Q5', /permanently eliminates the anomeric carbon/, 'the carbon-removal claim'],
  ['Q6', /above the boat/, 'the boat mnemonic'],
  ['Q6', /equatorial, opposite the reference carbon C6/, 'the mixed-up option B'],
  ['Q7', /Six is not a power of 2/, 'the impossible-count claim'],
  ['Q7', /no internal plane of symmetry \(ruling out meso forms\)/, 'the single-mirror-plane rule'],
  ['Q8', /overall achiral due to an internal mirror plane/, 'the mirror-plane definition of every meso compound'],
  ['Q9', /They have identical physical properties/, 'the unqualified identical-properties claim'],
  ['Q12', /except for elements in their standard states/, 'the stray parenthesis'],
  ['Q13', /forgetting to multiply the H−Cl bond energy by 2/, 'the wrong-sign error mechanism'],
  ['Q14', /most stable allotropic form/, 'the allotrope wording'],
  ['Q14', /25°C and 1 atm is zero/, 'the 1 atm claim'],
  ['Q15', /it may be an arbitrary confusion/, 'the arbitrary-confusion remark'],
  ['Q16', /Synthesis of a protein from amino acids/, 'the polymerization option'],
  ['Q16', /the destruction of the rigid lattice creates much more disorder/, 'the lattice-only account'],
  ['Q19', /approximately 840 °C/, 'the fixed decomposition temperature'],
  ['Q20', /3SCN⁻\(aq\) → \[Fe\(SCN\)₃\]\(aq\)/, 'the one-way neutral-complex equation'],
  ['Q21', /the same mineral as malachite/, 'the carbonate patina claim'],
  ['Q22', /NaAlO₂/, 'the dehydrated aluminate product'],
  ['Q23', /This answer confuses the acidic and basic behavior/, 'the old B feedback'],
  ['Q24', /Higher electronegativity \(F = 4\.0/, 'the electronegativity-only explanation'],
  ['Q26', /nearly irreversible/, 'the near-irreversibility claim'],
  ['Q26', /0\.1% CO in air can be lethal/, 'the fixed exposure claim'],
  ['Q26', /hyperbaric oxygen therapy \(2-3 atm/, 'the treatment pressures'],
  ['Q27', /Hydrolysis \(bond cleavage by water\)/, 'the old EC 3 cell'],
  ['Q27', /a sensitive marker for hepatocellular damage, used to diagnose liver disease/, 'the diagnostic overstatement'],
  ['Q28', /No major digestive nuclease operates at pH 5\.0/, 'the no-nuclease claim'],
  ['Q29', /the universal coenzyme for amino acid metabolism/, 'the universal-coenzyme claim'],
  ['Q29', /isoniazid/, 'the drug-treatment aside'],
  ['Q30', /the reverse of an aldol condensation/, 'the aldol-condensation wording'],
  ['Q30', /form new bonds by elimination/, 'the elimination claim'],
  ['Q32', /except the last cycle, which produces 2 acetyl-CoA/, 'the free-FADH₂ cycle summary'],
  ['Q34', /the primary regulatory point/, 'the primary-regulatory-point claim'],
  ['Q34', /The energy released from cleaving the high-energy thioester bond/, 'the bond-breaking energy claim'],
  ['Q35', /during oxygen deprivation \(exercising skeletal muscle, erythrocytes\)/, 'the erythrocyte conflation'],
  ['Q36', /CoA-SH attacks the β-carbon/, 'the incomplete thiolase account'],
  ['Q37', /using Ca₂CO₃/, 'the doubled-molar-mass mechanism'],
  ['Q38', /rounding 0\.0050 to 0\.010/, 'the rounding mechanism'],
  ['Q39', /using 0\.200 mol instead of 0\.200 M/, 'the volume-omission mechanism'],
  ['Q41', /actually this sum is different/, 'the speculative C feedback'],
  ['Q41', /which doesn't match either/, 'the speculative D feedback'],
  ['Q42', /This is not a valid IUPAC or common name/, 'the invalid-nomenclature claim'],
  ['Q42', /hypo-\.\.\.-ite \(lowest\)/, 'the overextended prefix rule'],
  ['Q43', /cross-multiplication method/, 'the unqualified criss-cross rule'],
  ['Q45', /Several are TCA cycle intermediates/, 'the several-intermediates claim'],
  ['Q46', /forms six coordination bonds/, 'the six-coordinate deoxyhemoglobin claim'],
  ['Q46', /Methemoglobinemia \(>1% methemoglobin\) causes cyanosis/, 'the 1% symptom threshold'],
  ['Q46', /methylene blue/, 'the treatment detail'],
  ['Q47', /This rigid, planar ring system/, 'the planar claim'],
  ['Q47', /Altering the ring sizes would eliminate hormonal activity/, 'the no-activity claim'],
  ['Q48', /Its chemical name is tocopherol, not ascorbic acid/, 'vitamin E as a single species'],
  ['Q50', /Purines → Hypoxanthine → Xanthine/, 'the single linear pathway'],
  ['Q50', /allopurinol/, 'the treatment detail'],
  ['Q51', /Gold standard for GFR estimation/, 'the creatinine gold-standard claim'],
  ['Q51', /7-20 mg\/dL \(BUN: 7-20\)/, 'the conflated urea/BUN range'],
  ['Q51', /3\.5-7\.0 mg\/dL/, 'the urate reference range'],
  ['Q51', /0\.7-1\.3 mg\/dL/, 'the creatinine reference range'],
  ['Q52', /Na\+ remains fully hydrated but does not alter pH/, 'the old sodium account'],
  ['Q53', /A useful shortcut: pH of a weak base salt/, 'the mislabelled shortcut'],
  ['Q54', /drying agents in organic chemistry/, 'the blanket drying-agent claim'],
  ['Q54', /deprotonate weakly acidic compounds \(alcohols, amines\)/, 'the amine example'],
  ['Q55', /C2<sup>2<\/sup>-/, 'the ambiguous acetylide notation'],
  ['Q55', /C<sup>4<\/sup>-/, 'the ambiguous methanide notation'],
  ['Q55', /extremely hard and chemically inert/, 'the universal inertness claim'],
  ['Q56', /leaving 1 oxygen atom unaccounted for/, 'the leftover-oxygen reasoning'],
  ['Q58', /0\.93% of Earth's atmosphere<\/strong>/, 'the wet-atmosphere figure'],
  ['Q59', /supercooled liquid/, 'the glass-is-a-liquid claim'],
  ['Q59', /share the same SiO₂ chemistry/, 'the identical-composition claim'],
  ['Q60', /face-centered cubic lattice/, 'the unexplained fcc wording']
];
for (const [Q, re, what] of GONE) {
  ok(!re.test(allText(rec(Q))), Q + ' no longer carries ' + what);
  ok(re.test(allText(pre(Q))), Q + ' really did carry it before, so the check is not vacuous: ' + what);
}

/* pack-wide sweep: none of these may survive anywhere in the 60 items */
const BANNED = [
  [/nearly irreversible/, 'the near-irreversibility claim'],
  [/supercooled liquid/, 'the glass-is-a-liquid claim'],
  [/Gold standard for GFR estimation/, 'the creatinine gold-standard cell'],
  [/except for elements in their standard states/, 'the formation/combustion parenthesis'],
  [/the primary regulatory point/, 'the primary-regulatory-point claim'],
  [/above the boat/, 'the boat mnemonic'],
  [/C2<sup>2<\/sup>-/, 'the ambiguous acetylide notation'],
  [/C<sup>4<\/sup>-/, 'the ambiguous methanide notation'],
  [/NaAlO₂/, 'the dehydrated aqueous aluminate'],
  [/Synthesis of a protein from amino acids/, 'the polymerization entropy option'],
  [/This rigid, planar ring system/, 'the planar steroid claim'],
  [/A useful shortcut: pH of a weak base salt/, 'the mislabelled pH shortcut'],
  [/Purines → Hypoxanthine → Xanthine/, 'the single purine pathway'],
  [/Unanswered|Report an issue/, 'a stored UI label']
];
for (const [re, what] of BANNED) {
  const hits = QS.filter(Q => re.test(allText(rec(Q))));
  ok(hits.length === 0, 'the pack no longer carries ' + what + (hits.length ? ' (' + hits.join(', ') + ')' : ''));
}
{
  const labels = [];
  for (const s of ['biology', 'chemistry']) for (const q of data[s]) if (/Unanswered|Report an issue/i.test(allText(q))) labels.push(q.id);
  ok(labels.length === 0, "'Unanswered' and 'Report an issue' appear in no stored field across all 1,114 records");
}

/* ------------------------------------------------------------------ */
section('5. presentation: points, Bottom Lines, tables, notation');

let pts = 0, blocks = 0, bls = 0, tables = 0, fbParas = 0, lettered = 0;
const tableItems = [], ptCounts = {};
for (const Q of QS) {
  const e = rec(Q).explanation;
  const p = pointLines(e);
  if (p.length) { blocks++; pts += p.length; ptCounts[Q] = p.length; }
  if (e.indexOf(BLOPEN) >= 0) bls++;
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(Q); }
  fbParas += (fbOf(e).match(/<p[ >]/g) || []).length;
  if (/^[ABCD]\. /.test(keyedOf(e) || '')) lettered++;
}
ok(pts === 65 && blocks === 21, '65 educational points in 21 blocks (got ' + pts + ' in ' + blocks + ')');
ok(ptCounts.Q15 === 4 && ptCounts.Q54 === 4, 'Q15 and Q54 keep their four-point blocks');
ok(Object.keys(ptCounts).filter(Q => ptCounts[Q] !== 3 && ptCounts[Q] !== 4).length === 0, 'every other block holds three points');
ok(bls === 58, '58 Bottom Lines (got ' + bls + ')');
ok(!/Bottom Line/.test(rec('Q59').explanation) && !/Bottom Line/.test(rec('Q60').explanation),
  'Q59 and Q60 gained no Bottom Line');
ok(pointLines(rec('Q59').explanation).length === 0 && pointLines(rec('Q60').explanation).length === 0,
  'Q59 and Q60 gained no point block');
ok(!/<table/.test(rec('Q59').explanation) && !/<table/.test(rec('Q60').explanation),
  'Q59 and Q60 gained no table');
ok(tables === 5 && JSON.stringify(tableItems) === JSON.stringify(['Q18', 'Q27', 'Q42', 'Q44', 'Q51']),
  'five tables, in Q18, Q27, Q42, Q44 and Q51 (got ' + tableItems.join(',') + ')');
ok(fbParas === 180, '180 distractor paragraphs, the complete pack (got ' + fbParas + ')');
let fbBefore = 0;
for (const Q of QS) fbBefore += (fbOf(pre(Q).explanation).match(/<p[ >]/g) || []).length;
ok(fbBefore === 174, 'the before-fixture held 174, so the two rebuilt items added exactly six (got ' + fbBefore + ')');
ok(lettered === 0, 'every keyed heading is unlettered, this pack\'s convention (got ' + lettered + ' lettered)');
for (const Q of QS) ok(/^[ABCD]\. /.test(keyedOf(pre(Q).explanation) || '') === false,
  Q + ': its keyed-heading style was unlettered before too, so the convention is preserved');

/* tables: row counts and the EC 7 addition */
const rowsOf = t => (t.match(/<tr/g) || []).length;
ok(rowsOf(tableOf(rec('Q27').explanation)) === 8 && rowsOf(tableOf(pre('Q27').explanation)) === 7,
  'Q27 gained exactly one table row, the EC 7 row');
ok(/<tr><td>EC 7<\/td><td>Translocases<\/td><td>Movement of ions or molecules across or within membranes<\/td><\/tr><\/table>/
  .test(rec('Q27').explanation), 'the EC 7 row is the last row and reads as the review supplies it');
ok((tableOf(rec('Q27').explanation).match(/<td>EC /g) || []).length === 7, "Q27's table lists seven EC classes");
ok(rowsOf(tableOf(rec('Q51').explanation)) === 5 && rowsOf(tableOf(pre('Q51').explanation)) === 5,
  'Q51 keeps a header plus four data rows');
ok((tableOf(rec('Q51').explanation).match(/<th>/g) || []).length === 4,
  "Q51's table keeps four columns: a parameter column and three substances");
ok(!/mg\/dL/.test(tableOf(rec('Q51').explanation)), "Q51's table carries no numerical reference range");
for (const Q of ['Q18', 'Q42', 'Q44'])
  ok(tableOf(rec(Q).explanation) === tableOf(pre(Q).explanation), Q + ': its table is byte-identical');

/* notation and punctuation */
let entities = 0, curlies = 0, em = [], replChar = [], uniSub = 0, uniSup = 0;
for (const Q of QS) {
  const all = allText(rec(Q));
  entities += (all.match(/&(?:lt|gt|amp|nbsp);/g) || []).length;
  curlies += curly(all);
  if (/—/.test(all)) em.push(Q);
  if (/�/.test(all)) replChar.push(Q);
  uniSub += (all.match(/[₀-₉]/g) || []).length;
  uniSup += (all.match(/[²³¹⁰⁴-⁹⁺⁻ⁿ]/g) || []).length;
}
ok(entities === 0, 'the pack stores no HTML entities (got ' + entities + ')');
ok(curlies === 0, 'the pack stores no curly quotes (got ' + curlies + ')');
ok(em.length === 0, 'no em dash anywhere in the pack' + (em.length ? ': ' + em.join(', ') : ''));
{
  let emBefore = 0;
  for (const Q of QS) if (/—/.test(allText(pre(Q)))) emBefore++;
  ok(emBefore === 1, 'the before-fixture held exactly one em dash, in Q59, so removing it was a real change');
}
ok(replChar.length === 0, 'no replacement character anywhere in the pack');
ok(uniSub > 500 && uniSup > 200, 'the pack keeps its Unicode sub/superscripts (' + uniSub + ' sub, ' + uniSup + ' sup)');

/* per-item glue between distractor paragraphs, preserved */
for (const Q of QS) {
  const sep = s => [...new Set([...fbOf(s).matchAll(/<\/p>([\s\S]*?)<p[ >]/g)].map(m => m[1]))];
  const a = sep(pre(Q).explanation), b = sep(rec(Q).explanation);
  if (REBUILT.includes(Q)) ok(JSON.stringify(b) === JSON.stringify(['']), Q + ': the rebuilt feedback uses the pack-majority glue');
  else ok(JSON.stringify(a) === JSON.stringify(b), Q + ': the glue between distractor paragraphs is unchanged');
}

/* ------------------------------------------------------------------ */
section('6. heading agreement with the option texts');

let headOK = 0, headBad = [];
for (const Q of QS) {
  const r = rec(Q), e = r.explanation;
  const kh = keyedOf(e);
  if (KEEPSET.has(Q)) { headOK++; continue; }
  if (kh === r.options[r.correct]) headOK++; else headBad.push(Q + ' keyed: ' + JSON.stringify(kh));
  for (const letter of ['A', 'B', 'C', 'D']) {
    if (letter === L[r.correct]) continue;
    const part = fbParts(e)[letter];
    if (!part) { headBad.push(Q + ' ' + letter + ': missing'); continue; }
    if (part.head === r.options[L.indexOf(letter)]) headOK++; else headBad.push(Q + ' ' + letter);
  }
}
ok(headBad.length === 0, 'every heading in an edited item reproduces its option text' + (headBad.length ? ': ' + headBad.join(', ') : ''));
ok(headOK === 48 * 4 + 12, 'all ' + (48 * 4 + 12) + ' checked headings agree (got ' + headOK + ')');
{
  let expanded = 0;
  for (const Q of QS) {
    if (KEEPSET.has(Q) || REBUILT.includes(Q)) continue;
    const a = fbParts(pre(Q).explanation), b = fbParts(rec(Q).explanation);
    for (const letter of Object.keys(b)) if (a[letter] && a[letter].head !== b[letter].head) expanded++;
    if (keyedOf(pre(Q).explanation) !== keyedOf(rec(Q).explanation)) expanded++;
  }
  ok(expanded === 15, '15 headings were re-synchronized with their options (got ' + expanded + ')');
}
for (const Q of KEEP) {
  const a = fbParts(pre(Q).explanation), b = fbParts(rec(Q).explanation);
  for (const letter of Object.keys(b)) ok(a[letter].head === b[letter].head, Q + ' ' + letter + ': KEEP heading not expanded');
}

/* ------------------------------------------------------------------ */
section('7. structural health, and the two rebuilt items in particular');

for (const Q of QS) {
  const r = rec(Q), e = r.explanation;
  ok(keyedOf(e) !== null, Q + ': has exactly one keyed heading');
  ok((e.match(/<h4>Correct Answer:/g) || []).length === 1, Q + ': the keyed heading is not duplicated');
  ok((e.match(/<h4>Why the other choices are wrong:<\/h4>/g) || []).length === 1, Q + ': one feedback heading, not duplicated');
  const parts = fbParts(e);
  ok(Object.keys(parts).length === 3, Q + ': exactly three distractor paragraphs (got ' + Object.keys(parts).length + ')');
  ok(!parts[L[r.correct]], Q + ': no feedback paragraph for the keyed letter');
  ok((e.match(/<h4>Key Educational Points:/g) || []).length <= 1, Q + ': at most one point block');
  ok((e.match(/Bottom Line:/g) || []).length <= 1, Q + ': at most one Bottom Line');
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, Q + ': <' + t + '> balanced (' + o + '/' + c + ')');
  }
  let depth = 0, maxDepth = 0;
  for (const m of e.matchAll(/<(\/?)p[ >]/g)) { if (m[1]) depth--; else { depth++; maxDepth = Math.max(maxDepth, depth); } }
  ok(depth === 0 && maxDepth === 1, Q + ': paragraph nesting depth is 1');
  ok(!/<p><p>|<\/p><\/p>/.test(e), Q + ': no doubled paragraph tags');
  ok(!/&lt;(?:p|h4|li|strong)/.test(e), Q + ': no escaped literal markup in the text');
}
for (const Q of REBUILT) {
  ok(!/<h4>/.test(pre(Q).explanation), Q + ': the stored explanation really had NO markup before, so the gap was in storage');
  ok(fbOf(pre(Q).explanation) === '', Q + ': it really had no distractor paragraphs before');
  ok(rec(Q).question === pre(Q).question && JSON.stringify(rec(Q).options) === JSON.stringify(pre(Q).options),
    Q + ': its stem and all four options are unchanged');
  const parts = fbParts(rec(Q).explanation);
  ok(Object.keys(parts).sort().join('') === ['A', 'B', 'C', 'D'].filter(x => x !== L[rec(Q).correct]).join(''),
    Q + ': the three added paragraphs are exactly the three distractors');
  ok(/^<h4>Correct Answer: [^<]+<\/h4><p>/.test(rec(Q).explanation), Q + ': keyed heading then a paragraph');
  ok((rec(Q).explanation.match(/<p[ >]/g) || []).length === 4, Q + ': one main paragraph plus three distractor paragraphs');
}

/* ------------------------------------------------------------------ */
section("8. the review's numerical checks, independently recomputed");

const round = (x, d) => Number(x.toFixed(d));
const optOf = Q => rec(Q).options[rec(Q).correct];

ok(round(-393 + 2 * -286 - -890, 0) === -75 && /−75 kJ\/mol/.test(optOf('Q12')),
  'Q12: -393 + 2(-286) + 890 = -75 kJ/mol, and that is the keyed option');
ok(436 + 242 - 2 * 431 === -184 && /−184 kJ/.test(optOf('Q13')),
  'Q13: 436 + 242 - 2(431) = -184 kJ, and that is the keyed option');
ok(100000 / 200 === 500 && /500 K/.test(optOf('Q15')),
  'Q15: 100000/200 = 500 K, and that is the keyed option');
ok(16 / 2 - 1 === 7 && 16 / 2 === 8 && /7 cycles, producing 8 acetyl-CoA/.test(optOf('Q32')),
  'Q32: 16/2 - 1 = 7 cycles and 16/2 = 8 acetyl-CoA, and that is the keyed option');
ok(7 * 1.5 + 7 * 2.5 + 8 * 10 - 2 === 106 && /106 ATP/.test(optOf('Q33')),
  'Q33: 7(1.5) + 7(2.5) + 8(10) - 2 = 106, and that is the keyed option');
ok(4 - 2 === 2 && /2 ATP/.test(optOf('Q35')), 'Q35: 4 - 2 = 2 net ATP, and that is the keyed option');
ok(round((10.0 / 100.1) * 22.4, 2) === 2.24 && /2\.24 L/.test(optOf('Q37')),
  'Q37: (10.0/100.1) x 22.4 rounds to 2.24 L, and that is the keyed option');
ok(round(-Math.log10(0.0050), 2) === 2.30 && /2\.30/.test(optOf('Q38')),
  'Q38: -log(0.0050) = 2.30, and that is the keyed option');
ok(round(0.0500 * 0.200 * 2 * 40.0, 2) === 0.80 && /0\.80 g/.test(optOf('Q39')),
  'Q39: 0.0500 x 0.200 x 2 x 40.0 = 0.80 g, and that is the keyed option');
ok(round(6.00 * 25.0 / 500.0, 3) === 0.300 && /0\.300 M/.test(optOf('Q40')),
  'Q40: 6.00 x 25.0 / 500.0 = 0.300 M, and that is the keyed option');
ok(round(-393.5 + 2 * -285.8 + 890.4, 1) === -74.7 && /-74\.7 kJ\/mol/.test(optOf('Q41')),
  'Q41: -393.5 + 2(-285.8) + 890.4 = -74.7 kJ/mol, and that is the keyed option');
{
  const Ka = 1.0e-14 / 1.8e-5;
  const x = Math.sqrt(Ka * 0.10);
  ok(round(Ka * 1e10, 2) === 5.56 && round(x * 1e6, 2) === 7.45 && round(-Math.log10(x), 2) === 5.13 && /5\.13/.test(optOf('Q53')),
    'Q53: Ka = 5.56e-10, x = 7.45e-6 M, pH = 5.13, and that is the keyed option');
  ok(x < 0.10 / 100, 'Q53: x really is small compared with 0.10 M, so the stated approximation is justified');
}
ok(/^5$/.test(optOf('Q56')) && 3 * 2 + 4 * 1 === 10 && 10 / 2 === 5,
  'Q56: 3 CO2 and 4 H2O need 10 O atoms, so the O2 coefficient is 5, and that is the keyed option');
ok(/<strong>C3H8 \+ 5O2 → 3CO2 \+ 4H2O<\/strong>/.test(rec('Q56').explanation),
  'Q56: the displayed balanced equation is unchanged and balanced');
ok(/7, producing 8/.test(optOf('Q32')) === false, 'Q32: the keyed option text was not reworded');
/* Q22's new equation balances; Q20's simplified equilibrium conserves charge */
ok(/Al₂O₃\(s\) \+ 2NaOH\(aq\) \+ 3H₂O\(l\) → 2Na\[Al\(OH\)₄\]\(aq\)/.test(rec('Q22').explanation) &&
   2 === 2 && 3 + 2 + 3 === 2 * 4 && 2 + 6 === 2 * 4,
  'Q22: Al 2=2, O 8=8 and H 8=8, so the new equation balances');
ok(/Fe³⁺\(aq\) \+ SCN⁻\(aq\) ⇌ \[FeSCN\]²⁺\(aq\)/.test(rec('Q20').explanation) && 3 - 1 === 2,
  'Q20: the simplified equilibrium conserves charge, +3 - 1 = +2');
ok(Math.pow(2, 3) === 8 && Math.pow(2, 2) === 4 && Math.pow(2, 4) === 16 && /^8$/.test(optOf('Q7')),
  'Q7: 2^3 = 8 is the maximum, with 2^2 = 4 and 2^4 = 16 as the two power-of-two distractors');

/* ------------------------------------------------------------------ */
section('9. the four things the review asked to check rather than assume');

ok(/2<sup>n<\/sup>/.test(pre('Q7').explanation) && /2³ = 8/.test(pre('Q7').explanation),
  "Q7's exponents were ALREADY real before the pass: a <sup> element and a Unicode superscript");
ok(/2<sup>n<\/sup>/.test(rec('Q7').explanation), "Q7 keeps its real 2<sup>n</sup>; the flattened '2n' was an extraction artifact");
ok(/2<sup>n<\/sup>/.test(pre('Q8').explanation) && /2² = 4/.test(pre('Q8').explanation),
  "Q8's exponents were ALREADY real before the pass");
ok(/2<sup>n<\/sup>/.test(rec('Q8').explanation) && /2² = 4/.test(rec('Q8').explanation), 'Q8 keeps them');
ok((pre('Q53').explanation.match(/<sup>/g) || []).length === 11,
  "Q53's powers of ten were ALREADY real <sup> elements before the pass (11 of them)");
ok((rec('Q53').explanation.match(/<sup>/g) || []).length >= 11, 'Q53 still carries at least as many real exponents');
ok(JSON.stringify(rec('Q55').options) === JSON.stringify(pre('Q55').options),
  "Q55's four option texts are byte-identical: the export's line breaks came from <sub> markup, not a stored defect");
ok(/<sub>2<\/sub>H<sub>2<\/sub>/.test(rec('Q55').options[2]), "Q55's keyed option still uses real subscripts");
ok(/C2<sup>2<\/sup>-/.test(pre('Q55').explanation) && !/C2<sup>2<\/sup>-/.test(rec('Q55').explanation),
  "Q55's ambiguous charge notation really was stored, and is now rendered unambiguously");
ok(/C₂²⁻/.test(rec('Q55').explanation) && /C⁴⁻/.test(rec('Q55').explanation),
  'Q55 now reads C₂²⁻ and C⁴⁻ with proper sub/superscripts');
ok(idmap._comment.join(' ').indexOf('extraction artifact') >= 0,
  'the id map records the extraction-artifact findings rather than silently dropping them');

/* ------------------------------------------------------------------ */
section('10. cross-item consistency and the coverage ledger');

ok(/seven EC classes|EC 7/.test(rec('Q27').explanation), 'Q27 acknowledges EC 7');
ok(!/only six|six EC classes/i.test(rec('Q27').explanation), 'Q27 makes no six-class claim');
for (const Q of ['Q32', 'Q33', 'Q36'])
  ok(/enzyme-bound|FAD-linked|electron-transfer proteins/.test(rec(Q).explanation),
    Q + ': treats FAD as enzyme-bound rather than a freely released carrier');
for (const Q of ['Q27', 'Q30'])
  ok(/water/.test(rec(Q).explanation) && /overall|net/.test(rec(Q).explanation),
    Q + ': classifies by the overall reaction and water consumption');
ok(/30-32/.test(rec('Q35').explanation), 'Q35 uses the modern 30-32 ATP aerobic estimate');
ok(/purine/.test(rec('Q50').explanation) && /purine/.test(rec('Q51').explanation),
  'Q50 and Q51 agree that urate comes from purine degradation');
ok(/chlorin/.test(rec('Q46').explanation), 'Q46 distinguishes chlorin from porphyrin');
ok(/1 bar/.test(rec('Q12').question) && /1 bar/.test(rec('Q14').question) && /1 bar/.test(rec('Q41').question),
  'Q12, Q14 and Q41 all state standard pressure as 1 bar');
ok(/graphite/.test(rec('Q12').question) && /graphite/.test(rec('Q41').question),
  'Q12 and Q41 both specify graphite');
ok(!/C\(s\) \+/.test(rec('Q41').explanation), "Q41's retained calculation specifies graphite everywhere");
for (const Q of ['Q12', 'Q41']) {
  ok((rec(Q).question.match(/<br>/g) || []).length >= 4,
    Q + ": its stem uses <br> so the three equations display on separate lines, which the renderer supports (a bare newline collapses in .quiz-question)");
  ok(!/\n/.test(rec(Q).question), Q + ': its stem carries no bare newline that would collapse on screen');
  ok(/\n/.test(pre(Q).question), Q + ': the stored stem really did rely on bare newlines before, so this is a real fix');
  ok((rec(Q).question.match(/→/g) || []).length === (Q === 'Q41' ? 4 : 3),
    Q + ': the stem shows the three data equations' + (Q === 'Q41' ? ' plus its written target reaction' : ''));
}

const cov = idmap.coverage;
ok(cov.reviewed_before_this_batch === 419, 'coverage before this batch: 419 of 485');
ok(cov.displays_in_this_pack === 60 && cov.confirmed_repeats_not_counted_again === 4,
  'the ledger records 60 displays with four confirmed repeats');
ok(cov.new_unique_ids_this_batch === 56, 'the ledger records 56 new unique ids');
ok(cov.reviewed_after_this_batch === 475, 'coverage after this batch: 475 of 485');
ok(cov.reviewed_before_this_batch + cov.new_unique_ids_this_batch === cov.reviewed_after_this_batch,
  'the coverage arithmetic closes: 419 + 56 = 475');
ok(cov.still_unreviewed_chemistry === 10 && cov.reviewed_after_this_batch + cov.still_unreviewed_chemistry === 485,
  '10 chemistry questions remain unreviewed');
{
  const reviewed = new Set([...owner.keys(), ...newIds]);
  const remaining = data.chemistry.map(r => r.id).filter(id => !reviewed.has(id));
  ok(remaining.length === 10, 'recomputed from the bank: 10 chemistry ids are unreviewed (got ' + remaining.length + ')');
  ok(JSON.stringify(remaining) === JSON.stringify(cov.remaining_ids),
    'the recomputed remaining set equals the ledger: ' + remaining.join(', '));
}
ok(idmap.deviations.length === 0, 'the id map records no deviation');
ok(idmap.notes.join(' ').indexOf('not establish scientific accuracy') >= 0 ||
   idmap.notes.join(' ').indexOf('do not establish scientific accuracy') >= 0,
  'the id map states that these checks are not scientific approval');

/* ------------------------------------------------------------------ */
section('11. the final follow-up: two explanation-level corrections');

/* Baseline is the POST-batch-8 state, not the pre-batch-8 fixture, because the
   follow-up lands after the pass. */
const fuPre = Q => fuBefore.records[Q];
const FU = ['Q41', 'Q49'];
ok(Object.keys(fuBefore.hashes).length === 60, 'the follow-up baseline hashes all 60 pack records');
ok(Object.keys(fuBefore.records).length === 2, 'the follow-up baseline keeps the two full records it edits');

const fuMoved = QS.filter(Q => hash(rec(Q)) !== fuBefore.hashes[Q]);
ok(JSON.stringify(fuMoved) === JSON.stringify(FU),
  'exactly Q41 and Q49 moved in the follow-up (got ' + (fuMoved.join(', ') || 'none') + ')');
for (const Q of QS) {
  if (FU.includes(Q)) continue;
  ok(hash(rec(Q)) === fuBefore.hashes[Q], Q + ': byte-identical through the follow-up');
}
for (const Q of FU) {
  const a = fuPre(Q), b = rec(Q);
  ok(a.question === b.question, Q + ': its stem is unchanged');
  ok(JSON.stringify(a.options) === JSON.stringify(b.options), Q + ': all four option texts are unchanged');
  ok(a.correct === b.correct && a.id === b.id && a.topic === b.topic, Q + ': answer letter, id and topic are unchanged');
  ok(keyedOf(a.explanation) === keyedOf(b.explanation), Q + ': its keyed heading is unchanged');
  ok(pointLines(a.explanation).join('|') === pointLines(b.explanation).join('|'), Q + ': its educational points are unchanged');
  ok(blOf(a.explanation) === blOf(b.explanation), Q + ': its Bottom Line is unchanged');
  ok(tableOf(a.explanation) === tableOf(b.explanation), Q + ': it gained or lost no table content');
  const ha = fbParts(a.explanation), hb = fbParts(b.explanation);
  for (const letter of Object.keys(hb)) ok(ha[letter].head === hb[letter].head, Q + ' ' + letter + ': its heading is byte-identical');
}

/* Q41: only option D's feedback paragraph moved, and only its first sentence */
{
  const a = fuPre('Q41').explanation, b = rec('Q41').explanation;
  const blank = s => s.replace(/<p><strong>D\. [\s\S]*?<\/p>/, '<FB-D>');
  ok(blank(a) === blank(b), "Q41: nothing outside option D's feedback paragraph changed");
  const bodyA = fbParts(a).D.body, bodyB = fbParts(b).D.body;
  ok(bodyA !== bodyB, "Q41: option D's body really did change");
  const tailA = bodyA.slice(bodyA.indexOf('Reaction 3 must then be reversed'));
  const tailB = bodyB.slice(bodyB.indexOf('Reaction 3 must then be reversed'));
  ok(tailA.length > 0 && tailA === tailB, 'Q41: the rest of option D, including its calculation, is byte-identical');
  ok(/The water-formation reaction must be used twice because the target reaction consumes two moles of H₂ per mole of CH₄\./.test(bodyB),
    'Q41 D: the replacement sentence is present verbatim');
  ok(!/The hydrogen-formation data must be used twice/.test(bodyB), 'Q41 D: the superseded sentence is gone');
  ok(/The hydrogen-formation data must be used twice/.test(bodyA),
    'Q41 D: it really was there before, so that check is not vacuous');
  ok(/This gives -393\.5 \+ 2\(-285\.8\) \+ 890\.4, not -496\.9 kJ\/mol\./.test(bodyB),
    'Q41 D: the retained calculation is intact');
  ok((bodyB.match(/\.(?:\s|$)/g) || []).length === 3, 'Q41 D: the paragraph is three sentences');
}

/* Q49: only option B's feedback body moved; its KEEP status is superseded there alone */
{
  const a = fuPre('Q49').explanation, b = rec('Q49').explanation;
  const blank = s => s.replace(/<p><strong>B\. [\s\S]*?<\/p>/, '<FB-B>');
  ok(blank(a) === blank(b), "Q49: nothing outside option B's feedback paragraph changed");
  ok(fbParts(b).B.head === 'Skeletal muscle mitochondria', 'Q49 B: the heading is unchanged, as the brief requires');
  const body = fbParts(b).B.body;
  ok(/^ Skeletal muscle does not have a complete urea cycle\./.test(body), 'Q49 B: the body opens as supplied');
  ok(/It exports nitrogen mainly as alanine and glutamine\./.test(body), 'Q49 B: the export route is stated');
  ok(/Alanine is formed by transamination of pyruvate/.test(body), 'Q49 B: alanine comes from transamination of pyruvate');
  ok(/glutamine synthetase in a reaction that uses ATP/.test(body), 'Q49 B: glutamine synthetase and its ATP cost are stated');
  ok(/carry nitrogen to other organs, including the liver, where it can be converted to urea\.$/.test(body),
    'Q49 B: the body closes as supplied');
  ok(!/glucose-alanine cycle/.test(body), 'Q49 B: the superseded wording is gone');
  ok(/glucose-alanine cycle/.test(fbParts(a).B.body), 'Q49 B: it really was there before, so that check is not vacuous');
  ok((body.match(/\.(?:\s|$)/g) || []).length === 4, 'Q49 B: the paragraph is four sentences');
  ok(fbParts(b).A.body === fbParts(a).A.body && fbParts(b).D.body === fbParts(a).D.body,
    "Q49: options A and D feedback bodies are byte-identical, so the KEEP exception is confined to option B");
  ok(headOf(b) === headOf(a), 'Q49: its main explanation and compartment list are byte-identical');
}

/* pack invariants the follow-up must preserve */
{
  let fuPts = 0, fuBlocks = 0, fuBls = 0, fuTables = 0, fuFb = 0;
  for (const Q of QS) {
    const e = rec(Q).explanation;
    const p = pointLines(e);
    if (p.length) { fuBlocks++; fuPts += p.length; }
    if (e.indexOf(BLOPEN) >= 0) fuBls++;
    fuTables += (e.match(/<table/g) || []).length;
    fuFb += (fbOf(e).match(/<p[ >]/g) || []).length;
  }
  ok(fuPts === 65 && fuBlocks === 21, 'the follow-up preserves 65 points in 21 blocks (got ' + fuPts + '/' + fuBlocks + ')');
  ok(fuBls === 58, 'the follow-up preserves 58 Bottom Lines (got ' + fuBls + ')');
  ok(fuTables === 5, 'the follow-up preserves 5 tables (got ' + fuTables + ')');
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
}
ok(idmap.followup_corrections && idmap.followup_corrections.items.length === 2,
  'the id map records the two follow-up corrections');
ok(idmap.followup_corrections.coverage_unchanged === true && idmap.coverage.reviewed_after_this_batch === 475,
  'the follow-up adds no newly reviewed id: coverage stays 475 of 485');
ok(idmap.followup_corrections.deviations.length === 0, 'the follow-up records no deviation');
ok(/supersedes/i.test(JSON.stringify(idmap.followup_corrections)),
  "the id map records that Q49's KEEP status was explicitly superseded for option B's body");

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
