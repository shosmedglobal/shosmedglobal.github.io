/* Result-verifying suite for the SHOSMED LF3 FINAL review pack: the last ten
 * unreviewed chemistry questions and three supplied biology questions.
 *
 * This checks the BANK, not the harness. The mapping is re-confirmed against
 * stored content, the coverage ledger is recomputed from verified unique ids
 * across three sources, and every "claim removed" assertion is paired with a
 * non-vacuity check that the claim really was in the before-fixture.
 *
 * Passing this suite establishes scope, structure and consistency. It is NOT
 * scientific approval of the content.
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
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/review-final-pack-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/review-final-pack-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/review-final-pack-untouched.json'), 'utf8'));

const MAP = idmap.map;
const KS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const sub = id => (id.startsWith('bio-') ? 'biology' : 'chemistry');
const rec = k => data[sub(MAP[k])].find(r => r.id === MAP[k]);
const pre = k => before[k];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);
const KEEP = ['B1', 'B4'];
const REBUILT = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'];

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

/* ------------------------------------------------------------------ */
section('1. the mapping and the answer letters, confirmed against stored content');

ok(KS.length === 13, 'the map has 13 displays');
ok(Object.keys(before).length === 13, 'the before-fixture has 13 records');
const EXPECT_KEYS = idmap.asserted_keys;
for (const k of KS) {
  const q = rec(k);
  ok(!!q, k + ' ' + MAP[k] + ' exists in the bank');
  ok(sub(MAP[k]) === (k === 'B3' || k === 'B4' || k === 'B5' ? 'biology' : 'chemistry'),
    k + ' ' + MAP[k] + ' is in the expected subject');
  ok(L[q.correct] === EXPECT_KEYS[k],
    k + ' ' + MAP[k] + ': stored key is ' + L[q.correct] + ', the brief says ' + EXPECT_KEYS[k]);
  ok(pre(k).correct === q.correct, k + ': the answer letter was not changed by this pass');
}
ok(idmap.verification.keys_changed === 0 && idmap.verification.key_disagreements_to_report === 0,
  'the id map records that every stored key already agreed, so none was changed');
ok(new Set(Object.values(MAP)).size === 13, 'the 13 displays map to 13 distinct ids');

/* the mapping is confirmed by stored content, not by numbering */
const CONTENT = [
  ['A1', /covalent network solid in which every atom is bonded/, 'Diamond (C)'],
  ['A2', /How many atoms are effectively contained within a simple cubic unit cell/, '1'],
  ['A3', /body-centered cubic \(BCC\) unit cell contains how many atoms/, '2'],
  ['A4', /coordination number of an atom in a face-centered cubic/, '12'],
  ['A5', /Diamond and graphite are both made of pure carbon/, 'Allotropes'],
  ['A6', /Which type of crystalline solid typically has the LOWEST melting point/, 'Molecular crystal'],
  ['A7', /no stable liquid phase at 1 atm/, 'Carbon dioxide (CO₂) — "dry ice"'],
  ['A8', /Why are most metallic solids good conductors of electricity/, 'They have a "sea" of delocalized electrons that move freely throughout the lattice'],
  ['B1', /2\.0 mol of an ideal gas at 300 K and 1\.0 atm/, '2.0 atm'],
  ['B2', /non-superimposable mirror images of each other/, 'Optical isomerism (enantiomerism)'],
  ['B3', /lysogeny by bacteriophage λ \(lambda\) in E\. coli/, 'It integrates into the host chromosome as a prophage'],
  ['B4', /osteons \(Haversian systems\)/, 'Compact (cortical) bone in the diaphysis'],
  ['B5', /epithelium lines the urinary bladder/, 'Transitional epithelium (urothelium)']
];
for (const [k, stemRe, keyOpt] of CONTENT) {
  ok(stemRe.test(rec(k).question), k + ': its stem is the expected question');
  ok(rec(k).options[rec(k).correct] === keyOpt, k + ': its keyed option is ' + JSON.stringify(keyOpt));
}

/* ------------------------------------------------------------------ */
section('2. scope: 11 edited, 2 KEEP byte-identical, 2 stems, no option or key moves');

const changed = [], stems = [], expls = [], same = [];
for (const k of KS) {
  const a = pre(k), b = rec(k);
  let touched = false;
  if (a.question !== b.question) { stems.push(k); touched = true; }
  if (a.explanation !== b.explanation) { expls.push(k); touched = true; }
  ok(JSON.stringify(a.options) === JSON.stringify(b.options), k + ': all four option texts are unchanged');
  ok(a.id === b.id && a.correct === b.correct && a.topic === b.topic, k + ': id, answer letter and topic unchanged');
  if (touched) changed.push(k); else same.push(k);
}
ok(changed.length === 11, '11 items changed (got ' + changed.length + ')');
ok(JSON.stringify(same) === JSON.stringify(KEEP), 'the untouched set is exactly B1 and B4 (got ' + same.join(',') + ')');
for (const k of KEEP) ok(JSON.stringify(pre(k)) === JSON.stringify(rec(k)), k + ': KEEP item byte-identical in every field');
ok(JSON.stringify(stems) === JSON.stringify(['A7', 'B3']), 'exactly A7 and B3 changed stems (got ' + stems.join(',') + ')');
ok(expls.length === 11, '11 explanations changed (got ' + expls.length + ')');
ok(idmap.scope.option_text_changes === 0 && idmap.scope.answer_letter_changes === 0,
  'the id map records no option-text and no answer-letter change');
ok(idmap.scope.items_edited === 11 && idmap.scope.keep_unchanged.length === 2,
  'the id map records 11 edited and 2 KEEP items');

/* B5: only option A and B feedback and points 3 and 5 moved */
{
  const a = pre('B5').explanation, b = rec('B5').explanation;
  ok(keyedOf(a) === keyedOf(b), 'B5: its keyed heading is unchanged, as the brief requires');
  ok(headOf(a) === headOf(b), 'B5: its main explanation is unchanged');
  ok(fbParts(a).D.body === fbParts(b).D.body, 'B5: option D feedback is byte-identical');
  ok(fbParts(a).A.body !== fbParts(b).A.body && fbParts(a).B.body !== fbParts(b).B.body,
    'B5: options A and B feedback really did change');
  const pa = pointLines(a), pb = pointLines(b);
  ok(pa.length === 5 && pb.length === 5, 'B5 still has five points');
  ok(pa[0] === pb[0] && pa[1] === pb[1] && pa[3] === pb[3], 'B5: points 1, 2 and 4 are unchanged');
  ok(pa[2] !== pb[2] && pa[4] !== pb[4], 'B5: points 3 and 5 really did change');
  ok(blOf(b) === null, 'B5 still has no Bottom Line, and none was added');
}
/* B2: keyed heading and option A feedback preserved */
{
  const a = pre('B2').explanation, b = rec('B2').explanation;
  ok(keyedOf(a) === keyedOf(b), 'B2: its keyed heading is unchanged');
  ok(fbParts(a).A.body === fbParts(b).A.body, 'B2: option A feedback is byte-identical');
  const pa = pointLines(a), pb = pointLines(b);
  ok(pa.length === 5 && pb.length === 5, 'B2 still has five points');
  ok(pa[0] === pb[0] && pa[1] === pb[1] && pa[3] === pb[3] && pa[4] === pb[4], 'B2: points 1, 2, 4 and 5 are unchanged');
  ok(pa[2] !== pb[2], 'B2: point 3 really did change');
}

/* ------------------------------------------------------------------ */
section('3. nothing outside the pack moved');

let bioSame = 0, chemSame = 0;
const outside = [];
for (const s of ['biology', 'chemistry']) for (const q of data[s]) {
  if (PACK.has(q.id)) continue;
  if (untouched[s][q.id] === hash(q)) { if (s === 'biology') bioSame++; else chemSame++; }
  else outside.push(q.id);
}
ok(data.biology.length === 629 && data.chemistry.length === 485, 'the bank still holds 629 biology and 485 chemistry records');
ok(bioSame === 626, 'all 626 out-of-pack biology records are byte-identical (got ' + bioSame + ')');
ok(chemSame === 475, 'all 475 out-of-pack chemistry records are byte-identical (got ' + chemSame + ')');
ok(outside.length === 0, 'no record outside the pack changed' + (outside.length ? ': ' + outside.slice(0, 6).join(', ') : ''));

/* ------------------------------------------------------------------ */
section('4. A1-A8: the gap was in storage, and each was rebuilt exactly once');

for (const k of REBUILT) {
  ok(!/</.test(pre(k).explanation),
    k + ': its stored explanation really had NO markup before, so the missing structure was a storage gap');
  ok(fbOf(pre(k).explanation) === '', k + ': it really had no distractor paragraphs before');
  ok(pointLines(pre(k).explanation).length === 0 && blOf(pre(k).explanation) === null,
    k + ': it had no point block or Bottom Line before');
  const e = rec(k).explanation;
  ok((e.match(/<h4>Correct Answer:/g) || []).length === 1, k + ': exactly one keyed heading, not duplicated');
  ok((e.match(/Why the other choices are wrong/g) || []).length === 1, k + ': exactly one feedback heading, not duplicated');
  ok(!/^[ABCD]\. /.test(keyedOf(e)), k + ': its keyed heading is unlettered, as the brief specifies');
  ok(keyedOf(e) === rec(k).options[rec(k).correct], k + ': its keyed heading reproduces the keyed option');
  const parts = fbParts(e);
  ok(Object.keys(parts).length === 3, k + ': exactly three distractor paragraphs');
  ok(!parts[L[rec(k).correct]], k + ': no feedback paragraph for the keyed letter');
  ok(new Set(Object.values(parts).map(p => p.body)).size === 3, k + ': its three distractor paragraphs are distinct');
  for (const letter of Object.keys(parts))
    ok(parts[letter].head === rec(k).options[L.indexOf(letter)], k + ' ' + letter + ': its heading matches its option');
  ok(pointLines(e).length === 0, k + ': no educational-point block was added');
  ok(blOf(e) === null, k + ': no Bottom Line was added');
  ok(!/<table/.test(e), k + ': no table was added');
  ok((e.match(/<p[ >]/g) || []).length === 4, k + ': one main paragraph plus three distractor paragraphs');
}
/* the four mains the brief preserves are preserved verbatim */
for (const k of ['A3', 'A4', 'A5'])
  ok(headOf(rec(k).explanation) === '<p>' + pre(k).explanation + '</p>',
    k + ': its stored main explanation is preserved verbatim, only wrapped in a paragraph');
ok(headOf(rec('A2').explanation) ===
   '<p>' + pre('A2').explanation.replace('This makes simple cubic the least efficient cubic packing (~52% packing fraction).',
     'Among the simple cubic, BCC and FCC models for identical spheres, simple cubic has the lowest packing fraction, about 52%.') + '</p>',
  'A2: its main is the stored prose with only its last sentence replaced');

/* ------------------------------------------------------------------ */
section("5. the brief's content repairs, each paired with a non-vacuity check");

const ADDED = [
  ['A1', /Correct Answer: Diamond \(C\)/, 'the keyed heading'],
  ['A1', /continuous three-dimensional network rather than forming separate molecules/, 'the network description'],
  ['A1', /held together mainly by London dispersion forces/, 'the iodine distractor'],
  ['A2', /lowest packing fraction, about 52%/, 'the comparative packing statement'],
  ['A2', /Two atoms per conventional cell is the BCC count/, 'the BCC distractor'],
  ['A3', /omits the atom entirely inside the body center/, 'the A distractor'],
  ['A4', /Coordination number instead counts the nearest neighbors of one atom/, 'the A distractor'],
  ['A4', /Eight is the coordination number of BCC packing/, 'the C distractor'],
  ['A5', /Isotopes are atoms of the same element with different numbers of neutrons/, 'the isotope distractor'],
  ['A6', /This is a general trend, not an absolute ranking/, 'the trend qualifier'],
  ['A6', /some metals melt near or below room temperature/, 'the low-melting metals caveat'],
  ['A7', /no stable liquid phase at 1 atm/, 'the reworded stem'],
  ['A7', /Its triple-point pressure is about 5\.1 atm/, 'the triple-point statement'],
  ['A7', /Ice can sublime into sufficiently dry air/, 'water can sublime too'],
  ['A8', /positive atomic cores are surrounded by delocalized valence electrons/, 'the metallic-bond model'],
  ['A8', /graphite can also conduct despite being a covalent network material/, 'the graphite exception'],
  ['B2', /when measured under the same conditions/, 'the measurement qualifier'],
  ['B2', /different arrangement around a double bond or within a ring/, 'the corrected geometric definition'],
  ['B2', /Interconversion of constitutional isomers, commonly involving proton transfer/, 'the corrected tautomerism definition'],
  ['B2', /consists of diastereomers, not enantiomers/, 'the corrected B feedback'],
  ['B2', /as in keto-enol tautomerism/, 'the repaired D feedback'],
  ['B2', /Under the same achiral conditions, pure enantiomers have matching melting points/, 'the rewritten point 3'],
  ['B3', /bacteriophage λ \(lambda\) in E\. coli/, 'the lambda-specific stem'],
  ['B3', /not necessarily completely transcriptionally silent/, 'lysogeny is not total silence'],
  ['B3', /Production of new virions/, 'the new table row'],
  ['B3', /DNA damage can trigger induction/, 'the rewritten arrow sequence'],
  ['B3', /Some temperate phages, such as P1, persist as plasmid prophages/, 'the P1 exception'],
  ['B3', /virulent phages do not establish lysogeny/, 'the rewritten point 1'],
  ['B3', /lysogeny does not inevitably end in lysis/, 'the rewritten Bottom Line'],
  ['B5', /parietal layer of Bowman's capsule/, 'the corrected simple squamous examples'],
  ['B5', /more cuboidal or columnar cells near the base/, 'the corrected stratified squamous description'],
  ['B5', /low-permeability barrier that limits movement of water and urinary solutes/, 'the rewritten point 3'],
  ['B5', /the epithelium becomes thinner as cells change shape and rearrange/, 'the rewritten point 5']
];
for (const [k, re, what] of ADDED) {
  ok(re.test(allText(rec(k))), k + ' now states: ' + what);
  ok(!re.test(allText(pre(k))), k + ' did NOT state it before, so the check is not vacuous: ' + what);
}

const GONE = [
  ['A1', /~3550 °C/, 'the unqualified melting point'],
  ['A1', /hardest naturally occurring substance/, 'the superlative hardness claim'],
  ['A2', /least efficient cubic packing/, 'the unqualified efficiency claim'],
  ['A6', /most molecular solids melt below 200 °C/, 'the 200 degree cutoff'],
  ['A6', /melt at far higher temperatures/, 'the absolute ranking claim'],
  ['A7', /sublimes at standard atmospheric pressure \(changes directly from solid to gas without melting\)/, 'the old stem'],
  ['A7', /melt before vaporizing/, 'the claim that the others must melt first'],
  ['A8', /ionic solids only conduct when molten or dissolved/i, 'the universal ionic claim'],
  ['A8', /covalent network solids generally do not conduct/i, 'the blanket covalent claim'],
  ['B2', /labelled \(\+\) for dextrorotatory and \(−\) for levorotatory/, 'the old rotation sentence'],
  ['B2', /Dynamic equilibrium between structural isomers/, 'the loose tautomerism definition'],
  ['B2', /These are superimposable on their mirror images and are not enantiomers/, 'the over-general B feedback'],
  ['B2', /L-alaninetautomerismdynamic equilibrium/, 'the corrupted D feedback'],
  ['B2', /the body uses L-amino acids and D-sugars almost exclusively/, 'the blanket biology claim'],
  ['B3', /During the lysogenic cycle of a bacteriophage/, 'the old stem'],
  ['B3', /Integrated DNA name/, 'the old table row'],
  ['B3', /Environmental stress can trigger switch to lytic cycle/, 'the old arrow sequence'],
  ['B3', /integrating quietly into the host genome/, 'the silence wording'],
  ['B3', /lysogenic cycle specifically involves integration of viral DNA/, 'the universal integration claim'],
  ['B3', /genome integration as prophage with delayed lysis/, 'the delayed-lysis definition'],
  ['B3', /the viral genome \(prophage\) is silently replicated/, 'the old Bottom Line'],
  ['B5', /Bowman's capsule in the kidney \(for filtration\)/, 'the filtration attribution'],
  ['B5', /too thin and fragile to withstand the stretching/, 'the cannot-stretch claim'],
  ['B5', /it does not have the ability to stretch and recoil/, 'the old B feedback claim'],
  ['B5', /blood-urine barrier that stops hypertonic, acidic urine leaking back/, 'the old point 3'],
  ['B5', /which is where the name transitional came from/, 'the old point 5']
];
for (const [k, re, what] of GONE) {
  ok(!re.test(allText(rec(k))), k + ' no longer carries ' + what);
  ok(re.test(allText(pre(k))), k + ' really did carry it before, so the check is not vacuous: ' + what);
}

/* A4's retained neighbour description was NOT flagged as an error */
ok(/4 in its own plane, 4 in the plane above, and 4 in the plane below/.test(rec('A4').explanation),
  "A4: the existing 4 + 4 + 4 description is retained, as the brief instructs");
ok(headOf(rec('A4').explanation) === '<p>' + pre('A4').explanation + '</p>',
  'A4: its main explanation is byte-identical apart from the paragraph wrapper');

/* pack-wide sweep */
const BANNED = [
  [/~3550 °C/, 'the unqualified diamond melting point'],
  [/most molecular solids melt below 200 °C/, 'the 200 degree cutoff'],
  [/L-alaninetautomerism/, 'the corrupted B2 feedback'],
  [/the body uses L-amino acids and D-sugars almost exclusively/, 'the blanket stereochemistry claim'],
  [/Back to Dashboard|Unanswered|Report an issue/, 'a UI label']
];
for (const [re, what] of BANNED) {
  const hits = KS.filter(k => re.test(allText(rec(k))));
  ok(hits.length === 0, 'the pack no longer carries ' + what + (hits.length ? ' (' + hits.join(', ') + ')' : ''));
}
{
  const labels = [];
  for (const s of ['biology', 'chemistry']) for (const q of data[s])
    if (/Back to Dashboard|Unanswered|Report an issue/i.test(allText(q))) labels.push(q.id);
  ok(labels.length === 0,
    "'Back to Dashboard', 'Unanswered' and 'Report an issue' appear in no stored field across all 1,114 records");
}
{
  const scaffolding = KS.filter(k => /https?:\/\/|doi\.org|Reviewer|OpenStax|IUBMB|Replace the|Keep stem/.test(allText(rec(k))));
  ok(scaffolding.length === 0, 'no source reference or implementation instruction reached a student-facing field' +
    (scaffolding.length ? ': ' + scaffolding.join(', ') : ''));
}

/* ------------------------------------------------------------------ */
section('6. presentation: points, Bottom Lines, tables, headings, notation');

let pts = 0, blocks = 0, bls = 0, tables = 0, fbParas = 0;
const blItems = [], tableItems = [], ptCounts = {};
for (const k of KS) {
  const e = rec(k).explanation;
  const p = pointLines(e);
  if (p.length) { blocks++; pts += p.length; ptCounts[k] = p.length; }
  if (blOf(e) !== null) { bls++; blItems.push(k); }
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(k); }
  fbParas += Object.keys(fbParts(e)).length;
}
ok(pts === 20 && blocks === 5, '20 educational points in 5 blocks (got ' + pts + ' in ' + blocks + ')');
ok(ptCounts.B1 === 5 && ptCounts.B2 === 5 && ptCounts.B3 === 3 && ptCounts.B4 === 2 && ptCounts.B5 === 5,
  'the point blocks are B1 five, B2 five, B3 three, B4 two and B5 five');
ok(bls === 4 && JSON.stringify(blItems) === JSON.stringify(['B1', 'B2', 'B3', 'B4']),
  'four Bottom Lines, in B1, B2, B3 and B4 (got ' + blItems.join(',') + ')');
ok(tables === 2 && JSON.stringify(tableItems) === JSON.stringify(['B2', 'B3']),
  'two tables, in B2 and B3 (got ' + tableItems.join(',') + ')');
ok(fbParas === 39, '39 distractor paragraphs, three for each of the thirteen items (got ' + fbParas + ')');
{
  let fbBefore = 0;
  for (const k of KS) fbBefore += Object.keys(fbParts(pre(k).explanation)).length;
  ok(fbBefore === 15, 'the before-fixture held 15, so the eight rebuilt items added exactly 24 (got ' + fbBefore + ')');
}

/* tables kept their shape */
ok((tableOf(rec('B2').explanation).match(/<tr/g) || []).length === 5, "B2's table keeps a header plus four data rows");
ok((tableOf(rec('B3').explanation).match(/<tr/g) || []).length === 5, "B3's table keeps a header plus four data rows");
ok((tableOf(rec('B3').explanation).match(/<th>/g) || []).length === 3, "B3's table has three columns");
ok(/Butane vs\. isobutane/.test(tableOf(rec('B2').explanation)) && /Keto-enol forms/.test(tableOf(rec('B2').explanation)),
  "B2's table keeps its examples");
ok(/D-alanine vs\. L-alanine/.test(tableOf(rec('B2').explanation)), "B2's table keeps its optical-isomerism row");

/* keyed heading style, per item */
ok(/^[ABCD]\. /.test(keyedOf(rec('B1').explanation)), 'B1 keeps its LETTERED keyed heading');
ok(/^[ABCD]\. /.test(keyedOf(rec('B5').explanation)), 'B5 keeps its LETTERED keyed heading');
for (const k of ['B2', 'B3', 'B4'].concat(REBUILT))
  ok(!/^[ABCD]\. /.test(keyedOf(rec(k).explanation)), k + ' has an unlettered keyed heading');
for (const k of KS)
  ok(/^[ABCD]\. /.test(keyedOf(rec(k).explanation)) === /^[ABCD]\. /.test(keyedOf(pre(k).explanation) || ''),
    k + ': its keyed-heading style is unchanged or newly created in the pack convention');

/* every heading reproduces its option */
let headOK = 0;
const headBad = [];
for (const k of KS) {
  const r = rec(k), e = r.explanation;
  const kh = keyedOf(e).replace(/^[ABCD]\. /, '');
  if (kh === r.options[r.correct]) headOK++; else headBad.push(k + ' keyed');
  const parts = fbParts(e);
  for (const letter of Object.keys(parts)) {
    if (parts[letter].head === r.options[L.indexOf(letter)]) headOK++; else headBad.push(k + ' ' + letter);
  }
}
ok(headBad.length === 0, 'every heading reproduces its option text' + (headBad.length ? ': ' + headBad.join(', ') : ''));
ok(headOK === 52, 'all 52 headings agree, 13 keyed plus 39 distractor (got ' + headOK + ')');

/* notation */
let entities = 0, replChar = [], emItems = [], curlyItems = [];
for (const k of KS) {
  const all = allText(rec(k));
  entities += (all.match(/&(?:lt|gt|amp|nbsp);/g) || []).length;
  if (/�/.test(all)) replChar.push(k);
  if (/—/.test(all)) emItems.push(k);
  if (curly(all)) curlyItems.push(k);
}
ok(entities === 0, 'the pack stores no HTML entities (got ' + entities + ')');
ok(replChar.length === 0, 'no replacement character anywhere in the pack');
ok(JSON.stringify(emItems) === JSON.stringify(['A7']),
  'the only em dash left in the pack is A7\'s, inherited from its kept option C (got ' + (emItems.join(',') || 'none') + ')');
ok((allText(rec('A7')).match(/—/g) || []).length === 2,
  "A7 carries exactly two em dashes: its kept option C and the keyed heading that reproduces it");
ok(/—/.test(pre('A6').explanation) && !/—/.test(rec('A6').explanation),
  "A6's own em dash was removed by its replacement main");
ok(/—/.test(pre('A7').explanation) && !/—/.test(headOf(rec('A7').explanation)),
  "A7's explanation em dash was removed by its replacement main");
ok(curlyItems.length === 0, 'the pack stores no curly quote; A7 and A8 use straight double quotes');
ok(/"dry ice"/.test(rec('A7').options[2]) && /"dry ice"/.test(keyedOf(rec('A7').explanation)),
  "A7's keyed heading reproduces its option verbatim, straight quotes and all");
ok(/"sea"/.test(rec('A8').options[1]) && /"sea"/.test(keyedOf(rec('A8').explanation)),
  "A8's keyed heading reproduces its option verbatim");
ok(/λ/.test(rec('B3').question) && /λ/.test(allText(rec('B3'))), 'B3 carries the lambda character');
ok(/→/.test(rec('B3').explanation), "B3's arrow sequence uses real arrows");
ok(/I₂/.test(rec('A1').explanation) && /CO₂/.test(rec('A1').explanation), 'A1 keeps real subscripts');
ok(/sp³/.test(rec('A1').explanation) && /sp³/.test(rec('A5').explanation) && /sp²/.test(rec('A5').explanation),
  'A1 and A5 keep real superscripts');
ok(/−78\.5 °C/.test(rec('A7').explanation), 'A7 keeps its minus sign and degree symbol');

/* ------------------------------------------------------------------ */
section('7. structural health');

for (const k of KS) {
  const r = rec(k), e = r.explanation;
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, k + ': <' + t + '> balanced (' + o + '/' + c + ')');
  }
  let depth = 0, maxDepth = 0;
  for (const m of e.matchAll(/<(\/?)p[ >]/g)) { if (m[1]) depth--; else { depth++; maxDepth = Math.max(maxDepth, depth); } }
  ok(depth === 0 && maxDepth === 1, k + ': paragraph nesting depth is 1');
  ok(!/<p><p>|<\/p><\/p>/.test(e), k + ': no doubled paragraph tags');
  ok(!/&lt;(?:p|h4|li|strong)/.test(e), k + ': no escaped literal markup in the text');
  ok((e.match(/Bottom Line:/g) || []).length <= 1, k + ': at most one Bottom Line');
  ok((e.match(/<h4>Key Educational Points:/g) || []).length <= 1, k + ': at most one point block');
}

/* ------------------------------------------------------------------ */
section("8. the science the brief pins down, recomputed where it is numerical");

ok(1.0 * 600 / 300 === 2.0 && rec('B1').options[rec('B1').correct] === '2.0 atm',
  'B1: P2 = P1 T2/T1 = 1.0 x 600/300 = 2.0 atm, and that is the keyed option');
ok(8 * (1 / 8) === 1 && rec('A2').options[rec('A2').correct] === '1',
  'A2: eight corners x 1/8 = 1 atom per simple cubic cell, and that is the keyed option');
ok(8 * (1 / 8) + 1 === 2 && rec('A3').options[rec('A3').correct] === '2',
  'A3: eight shared corners plus one body centre = 2 atoms per BCC cell, and that is the keyed option');
ok(4 + 4 + 4 === 12 && 6 + 3 + 3 === 12 && rec('A4').options[rec('A4').correct] === '12',
  'A4: both 4 + 4 + 4 and the close-packed 6 + 3 + 3 give twelve, and that is the keyed option');
ok(/5\.1 atm/.test(rec('A7').explanation) && 5.1 > 1,
  "A7: CO2's triple-point pressure exceeds 1 atm, which is why no liquid is stable there");
ok(/EC |prophage/.test(rec('B3').explanation) && /P1/.test(rec('B3').explanation),
  'B3 names P1 as the plasmid-prophage counterexample');

/* ------------------------------------------------------------------ */
section('9. the coverage ledger, recomputed from verified unique ids');

const owner = new Map();
for (const f of fs.readdirSync(path.join(ROOT, 'scripts')).filter(x => /-idmap\.json$/.test(x))) {
  if (f === 'review-final-pack-idmap.json') continue;
  const m = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', f), 'utf8'));
  for (const id of Object.values(m.map || {})) if (!owner.has(id)) owner.set(id, f);
  for (const id of Object.keys(m.also_edited || {}))
    if (/^(bio|chem)-\d+$/.test(id) && !owner.has(id)) owner.set(id, f + ' (also_edited)');
}
/* the earliest biology pass predates id maps: bio-1..bio-11 and bio-13..bio-61 */
const firstPass = [];
for (let i = 1; i <= 60; i++) firstPass.push('bio-' + (i <= 11 ? i : i + 1));
ok(firstPass.length === 60 && !firstPass.includes('bio-12') && firstPass[firstPass.length - 1] === 'bio-61',
  'the earliest biology pass covers 60 ids, bio-1..bio-61, deliberately skipping bio-12');
for (const id of firstPass) if (!owner.has(id)) owner.set(id, 'bio-review-001-060');

const chemBefore = data.chemistry.map(r => r.id).filter(id => owner.has(id));
const bioBefore = data.biology.map(r => r.id).filter(id => owner.has(id));
ok(chemBefore.length === 475, 'chemistry reviewed before this pack: 475 of 485 (got ' + chemBefore.length + ')');
ok(bioBefore.length === 624, 'biology reviewed before this pack: 624 of 629 (got ' + bioBefore.length + ')');
const b11 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch11-idmap.json'), 'utf8'));
ok(b11.coverage.reviewed_after_batch11 === bioBefore.length,
  'that agrees with the ledger biology batch 11 recorded (' + b11.coverage.reviewed_after_batch11 + ')');
const bioRemBefore = data.biology.map(r => r.id).filter(id => !owner.has(id));
ok(JSON.stringify(bioRemBefore.slice().sort()) === JSON.stringify(b11.coverage.still_unreviewed.slice().sort()),
  'and with its remaining set: ' + bioRemBefore.join(', '));

const newIds = Object.values(MAP).filter(id => !owner.has(id));
ok(newIds.length === 13, 'all 13 of this pack\'s ids are genuinely new (got ' + newIds.length + ')');
for (const id of newIds) owner.set(id, 'final-pack');
const chemAfter = data.chemistry.map(r => r.id).filter(id => owner.has(id));
const bioAfter = data.biology.map(r => r.id).filter(id => owner.has(id));
const chemRem = data.chemistry.map(r => r.id).filter(id => !owner.has(id));
const bioRem = data.biology.map(r => r.id).filter(id => !owner.has(id));
ok(chemAfter.length === 485 && chemRem.length === 0, 'chemistry is now 485 of 485 with none remaining');
ok(bioAfter.length === 627, 'biology is now 627 of 629 (got ' + bioAfter.length + ')');
ok(JSON.stringify(bioRem) === JSON.stringify(['bio-513', 'bio-583']),
  'exactly bio-513 and bio-583 remain unreviewed (got ' + bioRem.join(', ') + ')');

const cov = idmap.coverage;
ok(cov.chemistry_reviewed_before === 475 && cov.chemistry_new_unique_ids === 10 && cov.chemistry_reviewed_after === 485,
  'the ledger records chemistry 475 + 10 = 485');
ok(cov.chemistry_still_unreviewed === 0 && cov.chemistry_remaining_ids.length === 0, 'the ledger records no chemistry remaining');
ok(cov.biology_reviewed_before === 624 && cov.biology_new_unique_ids === 3 && cov.biology_reviewed_after === 627,
  'the ledger records biology 624 + 3 = 627');
ok(JSON.stringify(cov.biology_remaining_ids) === JSON.stringify(['bio-513', 'bio-583']),
  'the ledger names bio-513 and bio-583 as remaining');
ok(cov.chemistry_reviewed_after + cov.chemistry_still_unreviewed === 485 &&
   cov.biology_reviewed_after + cov.biology_still_unreviewed === 629,
  'both coverage sums close against the bank sizes');

/* bio-513 and bio-583 really have no documented review */
for (const id of ['bio-513', 'bio-583']) {
  let found = false;
  for (const f of fs.readdirSync(path.join(ROOT, 'scripts')).filter(x => /-idmap\.json$/.test(x))) {
    const m = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', f), 'utf8'));
    if (Object.values(m.map || {}).includes(id) || Object.keys(m.also_edited || {}).includes(id)) found = true;
  }
  ok(!found, id + ': no id map records a completed review of it, so it is reported as still outstanding');
}
ok(idmap.deviations.length === 0, 'the id map records no deviation');
ok(/awaits post-implementation content approval/.test(cov.approval_status) &&
   /Earlier batches keep the approval status they already had/.test(cov.approval_status),
  'the ledger says this pack awaits approval and does not reopen earlier batches');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
