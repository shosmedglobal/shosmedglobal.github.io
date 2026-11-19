/* Result-verifying suite for the SHOSMED physics 60-question review.
 *
 * This checks the BANK, not the harness. Section 1 re-derives the id map from
 * the review's original signatures by full content match and proves the match
 * is unique bank-wide. Every "claim removed" assertion is paired with a
 * non-vacuity check that the claim really was in the before-fixture.
 *
 * Passing this suite establishes scope, structure and consistency. It is NOT
 * scientific approval of the physics.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const L = 'ABCD';
const WHY = '<h4>Why the other choices are wrong:</h4>';
const KCOPEN = "<p class='exp-key'>Key Concept: ";

const BANK = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions-physics.json'), 'utf8')).physics;
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-60-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-60-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-60-untouched.json'), 'utf8'));
const SIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-60-signatures.json'), 'utf8'));

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const rec = Q => BANK.find(r => r.id === MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);

const keyedOf = e => (e.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/) || [null, null])[1];
const kcOf = e => { const i = e.indexOf(KCOPEN); return i < 0 ? null : e.slice(i + KCOPEN.length, e.indexOf('</p>', i)); };
const headOf = e => {
  const km = e.match(/^<h4[^>]*>Correct Answer: [\s\S]*?<\/h4>/);
  const i = e.indexOf(WHY);
  return km && i >= 0 ? e.slice(km[0].length, i) : '';
};
const tableOf = e => (e.match(/<table[\s\S]*?<\/table>/) || [''])[0];
function fbParts(e) {
  const out = {};
  for (const m of e.matchAll(/<p><strong>([ABCD])\. ([\s\S]*?):<\/strong>([\s\S]*?)<\/p>/g)) out[m[1]] = { head: m[2], body: m[3] };
  return out;
}
const allText = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;

let n = 0, bad = 0;
function ok(c, m) { n++; if (!c) { bad++; console.error('  FAIL ' + m); } }
function section(t) { console.log('\n' + t); }

/* ------------------------------------------------------------------ */
section("1. the id map, re-derived from the review's ORIGINAL signatures");

const ENT = {
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  Omega: 'Ω', omega: 'ω', Delta: 'Δ', delta: 'δ', alpha: 'α',
  beta: 'β', gamma: 'γ', epsilon: 'ε', theta: 'θ', kappa: 'κ',
  lambda: 'λ', mu: 'μ', nu: 'ν', pi: 'π', rho: 'ρ',
  sigma: 'σ', tau: 'τ', phi: 'φ', Phi: 'Φ', radic: '√',
  asymp: '≈', prop: '∝', plusmn: '±', divide: '÷', times: '×',
  deg: '°', frac12: '½', le: '≤', ge: '≥', middot: '·', minus: '−',
};
const decode = s => s.replace(/&([a-zA-Z][a-zA-Z0-9]{1,12});/g, (m, k) => (ENT[k] !== undefined ? ENT[k] : m))
                     .replace(/&#(\d+);/g, (m, k) => String.fromCodePoint(Number(k)));
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
function canon(s) {
  let t = decode(String(s));
  t = t.replace(/<sub>([\s\S]*?)<\/sub>/g, '$1').replace(/<sup>([\s\S]*?)<\/sup>/g, '$1');
  t = t.replace(/<[^>]+>/g, ' ');
  for (let i = 0; i < 10; i++) t = t.split(SUB[i]).join(String(i)).split(SUP[i]).join(String(i));
  t = t.replace(/⁺/g, '+').replace(/⁻/g, '-').replace(/ⁿ/g, 'n');
  t = t.replace(/[‐-―−]/g, '-');
  t = t.replace(/[‘’′]/g, "'").replace(/[“”]/g, '"');
  t = t.replace(/Ω/g, 'ohm').replace(/ω/g, 'omega').replace(/α/g, 'alpha')
       .replace(/β/g, 'beta').replace(/γ/g, 'gamma').replace(/λ/g, 'lambda')
       .replace(/μ/g, 'mu').replace(/Δ/g, 'delta').replace(/δ/g, 'delta')
       .replace(/π/g, 'pi').replace(/ρ/g, 'rho').replace(/θ/g, 'theta')
       .replace(/σ/g, 'sigma').replace(/τ/g, 'tau').replace(/ε/g, 'epsilon')
       .replace(/ν/g, 'nu').replace(/φ/g, 'phi').replace(/Φ/g, 'phi').replace(/½/g, '1/2');
  t = t.replace(/→/g, '->').replace(/°/g, ' deg ').replace(/·/g, '.').replace(/×/g, 'x');
  t = t.replace(/≈/g, '~').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/√/g, 'sqrt');
  return t.toLowerCase().replace(/\s+/g, ' ').trim();
}
const tight = s => canon(s).replace(/\s+/g, '');
const sigOf = (o, f) => f(o.stem) + '\u0000' + o.options.map(f).join('\u0000');
const recOf = (q, f) => f(q.question) + '\u0000' + q.options.map(f).join('\u0000');

ok(QS.length === 60, 'the map has 60 displays');
ok(Object.keys(before).length === 60, 'the before-fixture has 60 records');
ok(Object.keys(SIG.sigs).length === 60, 'the signature fixture has 60 signatures');
ok(SIG.originalKeys === idmap.asserted_original_key_block, 'the signatures reproduce the review ORIGINAL key block');
ok(SIG.correctedKeys === idmap.asserted_corrected_key_block, 'and the CORRECTED key block');
{
  let d = 0;
  for (let i = 0; i < 60; i++) if (SIG.originalKeys[i] !== SIG.correctedKeys[i]) d++;
  ok(d === 1 && SIG.originalKeys[30] === 'D' && SIG.correctedKeys[30] === 'B',
    'the two key blocks differ in exactly one place, Q31 D to B');
}

/* uniqueness is computed from the BEFORE-fixture for the block, since the
   stems of 38 of them have since been replaced */
const srcOf = q => (PACK.has(q.id) ? before[QS.find(Q => MAP[Q] === q.id)] : q);
for (const f of [canon, tight]) {
  const m = new Map();
  for (const q of BANK) {
    const k = recOf(srcOf(q), f);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(q.id);
  }
  ok(m.size === 280, 'all 280 physics records have distinct signatures under ' +
    (f === canon ? 'the exact form' : 'the whitespace-insensitive form') + ' (got ' + m.size + ')');
}
{
  const strict = new Map(), loose = new Map();
  for (const q of BANK) {
    const a = recOf(srcOf(q), canon), b = recOf(srcOf(q), tight);
    if (!strict.has(a)) strict.set(a, []); strict.get(a).push(q.id);
    if (!loose.has(b)) loose.set(b, []); loose.get(b).push(q.id);
  }
  let exact = 0, viaLoose = [];
  for (const Q of QS) {
    const s = SIG.sigs[Q];
    const h1 = strict.get(sigOf(s, canon)) || [];
    if (h1.length === 1 && h1[0] === MAP[Q]) { exact++; continue; }
    const h2 = loose.get(sigOf(s, tight)) || [];
    ok(h2.length === 1 && h2[0] === MAP[Q], Q + ': its signature resolves to ' + MAP[Q] + ' (got ' + (h2.join(',') || 'none') + ')');
    viaLoose.push(Q);
  }
  ok(exact === 52, '52 signatures matched exactly (got ' + exact + ')');
  ok(JSON.stringify(viaLoose) === JSON.stringify(idmap.verification.matched_only_ignoring_whitespace),
    'the eight that needed the whitespace-insensitive form are the ones the id map names (got ' + viaLoose.join(',') + ')');
  /* and those eight are exactly the items whose OPTIONS carry <sup> markup */
  const supOpts = QS.filter(Q => pre(Q).options.some(o => /<sup>/.test(o)));
  ok(JSON.stringify(supOpts) === JSON.stringify(viaLoose),
    'they are precisely the items whose option texts carry <sup>, which is what the export flattened');
}
for (const Q of QS) {
  ok(L[pre(Q).correct] === SIG.sigs[Q].originalKey, Q + ': its stored key before the pass was the review original key');
  ok(L[rec(Q).correct] === SIG.sigs[Q].correctedKey, Q + ': its stored key now is the review corrected key');
}
ok(QS.map(Q => L[rec(Q).correct]).join('') === idmap.asserted_corrected_key_block, 'the whole stored key block is the corrected one');
{
  const t = { A: 0, B: 0, C: 0, D: 0 };
  for (const Q of QS) t[L[rec(Q).correct]]++;
  ok(JSON.stringify(t) === JSON.stringify(idmap.asserted_corrected_tally),
    'the corrected tally is A=13, B=17, C=14, D=16 (got ' + JSON.stringify(t) + ')');
}
ok(new Set(Object.values(MAP)).size === 60, 'the 60 displays map to 60 distinct ids');
ok(BANK.length === 280 && idmap.coverage.ids_outside_this_block === 220,
  'the block is 60 of 280 physics records; 220 lie outside it');

/* ------------------------------------------------------------------ */
section('2. scope: 38 stems, 19 mains, 38 Key Concepts, 1 key, 0 option texts');

const stems = [], kcs = [], keys = [], opts = [], changed = [];
for (const Q of QS) {
  const a = pre(Q), b = rec(Q);
  if (a.question !== b.question) stems.push(Q);
  if (kcOf(a.explanation) !== kcOf(b.explanation)) kcs.push(Q);
  if (a.correct !== b.correct) keys.push(Q);
  if (JSON.stringify(a.options) !== JSON.stringify(b.options)) opts.push(Q);
  if (JSON.stringify(a) !== JSON.stringify(b)) changed.push(Q);
  ok(a.id === b.id && a.topic === b.topic && a.subject === b.subject, Q + ': id, topic and subject unchanged');
}
ok(JSON.stringify(stems) === JSON.stringify(idmap.scope.stem_changes), '38 stems replaced, exactly the review list (got ' + stems.length + ')');
ok(stems.length === 38, 'the stem count is 38');
ok(JSON.stringify(kcs) === JSON.stringify(idmap.scope.key_concept_changes), '38 Key Concepts replaced, exactly the review list (got ' + kcs.length + ')');
ok(kcs.length === 38 && idmap.scope.key_concepts_retained.length === 22, '38 replaced and 22 retained');
for (const Q of idmap.scope.key_concepts_retained)
  ok(kcOf(pre(Q).explanation) === kcOf(rec(Q).explanation), Q + ': its Key Concept is byte-identical');
ok(JSON.stringify(keys) === JSON.stringify(['Q31']), 'exactly one answer letter moved, Q31 (got ' + keys.join(',') + ')');
ok(opts.length === 0, 'no option text changed anywhere (got ' + opts.join(',') + ')');
ok(changed.length === 60, 'all 60 records changed, since every item gains feedback');
/* the nine feedback-only items gained nothing but feedback */
for (const Q of idmap.scope.feedback_only_items) {
  ok(pre(Q).question === rec(Q).question, Q + ': its stem is byte-identical');
  ok(kcOf(pre(Q).explanation) === kcOf(rec(Q).explanation), Q + ': its Key Concept is byte-identical');
  ok(headOf(rec(Q).explanation) === pre(Q).explanation.slice(
    (pre(Q).explanation.match(/^<h4[^>]*>Correct Answer: [\s\S]*?<\/h4>/) || [''])[0].length,
    pre(Q).explanation.indexOf(KCOPEN)),
    Q + ': its main explanation and any table are byte-identical');
}

/* ------------------------------------------------------------------ */
section('3. nothing outside the block moved');

let outSame = 0;
const outside = [];
for (const q of BANK) {
  if (PACK.has(q.id)) continue;
  if (untouched.physics[q.id] === hash(q)) outSame++; else outside.push(q.id);
}
ok(outSame === 220, 'all 220 out-of-block physics records are byte-identical (got ' + outSame + ')');
ok(outside.length === 0, 'no record outside the block changed' + (outside.length ? ': ' + outside.slice(0, 6).join(', ') : ''));
ok(BANK.length === 280, 'the physics bank still holds 280 records');

/* ------------------------------------------------------------------ */
section('4. distractor feedback, which none of the 60 carried before');

let fbBefore = 0, fbNow = 0;
for (const Q of QS) {
  fbBefore += Object.keys(fbParts(pre(Q).explanation)).length;
  const parts = fbParts(rec(Q).explanation);
  fbNow += Object.keys(parts).length;
  const r = rec(Q);
  ok(Object.keys(parts).length === 3, Q + ': exactly three distractor paragraphs');
  ok(!parts[L[r.correct]], Q + ': no feedback paragraph for the keyed letter');
  ok(new Set(Object.values(parts).map(p => p.body)).size === 3, Q + ': its three bodies are distinct');
  for (const letter of Object.keys(parts))
    ok(parts[letter].head === r.options[L.indexOf(letter)], Q + ' ' + letter + ': its heading reproduces its option');
  ok(!/Why the other choices are wrong/.test(pre(Q).explanation), Q + ': it really had no feedback before, so nothing was duplicated');
  ok((rec(Q).explanation.match(/Why the other choices are wrong/g) || []).length === 1, Q + ': exactly one feedback heading');
  /* placement: after the main and any table, before the Key Concept */
  const e = rec(Q).explanation;
  const iW = e.indexOf(WHY), iK = e.indexOf(KCOPEN), iT = e.indexOf('<table');
  ok(iW > 0 && iW < iK, Q + ': feedback sits before the Key Concept');
  if (iT >= 0) ok(iT < iW, Q + ': feedback sits after the table');
}
ok(fbBefore === 0, 'the before-fixture carried no distractor paragraph at all (got ' + fbBefore + ')');
ok(fbNow === 180, '180 distractor paragraphs now (got ' + fbNow + ')');

/* ------------------------------------------------------------------ */
section("5. the review's content repairs, each paired with a non-vacuity check");

const ADDED = [
  ['Q1', /Non-SI units, such as the minute/, 'the non-SI category'],
  ['Q1', /<td>Thermodynamic temperature<\/td>/, 'the corrected kelvin quantity'],
  ['Q4', /which has a higher refractive index/, 'refractive index rather than density'],
  ['Q4', /λ<sub>vacuum<\/sub>\/λ<sub>medium<\/sub>/, 'the repaired lambda notation'],
  ['Q5', /rounded to the nearest kelvin/, 'the rounding instruction'],
  ['Q5', /273\.15/, 'the exact offset'],
  ['Q6', /Only one member of the pair acts on each body/, 'the third-law pair wording'],
  ['Q7', /Typical value or range/, 'the corrected table heading'],
  ['Q8', /average density/, 'average density for floating'],
  ['Q9', /Halfway to the maximum height/, 'the clarified table row'],
  ['Q10', /ideal hydraulic press/, 'the ideal model'],
  ['Q11', /a learning guide rather than strict boundaries/, 'the band caveat'],
  ['Q12', /Electron \+ electron antineutrino/, 'the named antineutrino in the table'],
  ['Q12', /<sup>4<\/sup><sub>2<\/sub>He/, 'the unambiguous alpha nucleus'],
  ['Q13', /average useful power/, 'average useful power'],
  ['Q14', /Neglect external impulse/, 'the impulse assumption'],
  ['Q15', /Does not change speed by itself/, 'the corrected comparison row'],
  ['Q16', /straight-line motion with constant acceleration/, 'the scoped equation set'],
  ['Q17', /still air at a speed below the speed of sound/, 'the acoustic assumptions'],
  ['Q18', /A thin converging lens in air/, 'the thin-lens model'],
  ['Q19', /An ideal 12 V battery/, 'the ideal source'],
  ['Q20', /remains undecayed/, 'undecayed parent isotope'],
  ['Q21', /1000 angular projections during each full rotation/, 'the rewritten stem'],
  ['Q21', /number of detector elements alone therefore does not tell us/, 'the detector-element correction'],
  ['Q22', /γ\/\(2π\)/, 'the gamma over two pi convention'],
  ['Q24', /mean absorbed radiation dose/, 'mean absorbed dose'],
  ['Q26', /attenuates more strongly in soft tissue/, 'the penetration trade-off'],
  ['Q27', /ideal 90° RF pulse/, 'the ideal pulse'],
  ['Q29', /A long straight wire in air/, 'the long-wire model'],
  ['Q30', /producing a helix/, 'the helical case'],
  ['Q31', /= 150\.8 V\. This is option B/, 'the corrected peak EMF calculation'],
  ['Q31', /Its rotation axis lies in the coil's plane/, 'the rotation geometry'],
  ['Q32', /directed so the electric and magnetic forces oppose each other/, 'the velocity-direction condition'],
  ['Q33', /long air-core solenoid/, 'the long-solenoid model'],
  ['Q34', /does not make its magnitude negative/, 'magnitude versus signed EMF'],
  ['Q35', /Two long, straight, parallel wires in air/, 'the explicit geometry'],
  ['Q36', /An ideal transformer/, 'the ideal transformer'],
  ['Q38', /An electron initially at rest/, 'the initial condition'],
  ['Q39', /free electron initially at rest/, 'the free-electron model'],
  ['Q41', /ħ/, 'the hbar symbol'],
  ['Q41', /intrinsic to quantum states/, 'uncertainty as intrinsic'],
  ['Q43', /unbranched artery/, 'the unbranched vessel'],
  ['Q44', /neglect viscous losses/, 'the Bernoulli assumptions'],
  ['Q45', /steady, fully developed laminar flow/, 'the laminar conditions'],
  ['Q46', /neglect wall effects/, 'the Stokes model'],
  ['Q47', /aortic flow is pulsatile/, 'the pulsatile caveat'],
  ['Q48', /133\.322 Pa/, 'the conventional mmHg conversion'],
  ['Q50', /expand reversibly and isothermally/, 'the reversible assumption'],
  ['Q51', /373\.15 K/, 'the exact Celsius offset'],
  ['Q52', /compressed reversibly and adiabatically/, 'the reversible adiabatic assumption'],
  ['Q53', /solid–liquid–vapor triple point/, 'the explicit triple point'],
  ['Q54', /real-is-positive convention/, 'one sign convention'],
  ['Q55', /paraxial approximation/, 'the paraxial model'],
  ['Q57', /final image at infinity, so the eye is relaxed/, 'the relaxed-eye condition'],
  ['Q57', /not the physical distance between the lenses/, 'the optical tube length'],
  ['Q58', /measured from the normal/, 'angles from the normal'],
  ['Q59', /traveling from glass into air/, 'the direction of travel'],
  ['Q60', /derived SI units are formed from their products and powers/, 'the SI classification'],
];
for (const [Q, re, what] of ADDED) {
  ok(re.test(allText(rec(Q))), Q + ' now states: ' + what);
  ok(!re.test(allText(pre(Q))), Q + ' did NOT state it before, so the check is not vacuous: ' + what);
}

const GONE = [
  ['Q1', /Any unit not in this list/, 'the over-broad derived-unit claim'],
  ['Q4', /lambda<sub>medium<\/sub>/, 'the spelled-out lambda'],
  ['Q5', /molecular motion theoretically stops/, 'the absolute-zero claim'],
  ['Q6', /They never cancel each other/, 'the never-cancel claim'],
  ['Q7', /Sound travels faster in denser media/, 'the density-implies-speed claim'],
  ['Q7', /<th>Human Range<\/th>/, 'the mislabelled table heading'],
  ['Q9', /<td>Halfway up<\/td>/, 'the ambiguous row label'],
  ['Q11', /<th>Wavelength Range<\/th>/, 'the unqualified band heading'],
  ['Q13', /P = W\/t = F x v/, 'the conflated average and instantaneous power'],
  ['Q14', /maximum KE loss/, 'the unqualified maximum-loss claim'],
  ['Q15', /Along field lines/, 'the incorrect electric-force direction cell'],
  ['Q17', /blue shift/, 'the astronomy labels on an acoustic table'],
  ['Q20', /N = N<sub>0<\/sub>/, 'nucleus-count notation used for a mass'],
  ['Q21', /With 1000 detector elements sampling per rotation/, 'the detector-element reasoning'],
  ['Q22', /f = γ x B/, 'the mixed angular/ordinary frequency convention'],
  ['Q26', /Higher frequency ultrasound gives better resolution/, 'the unqualified resolution claim'],
  ['Q31', /753\.98 V/, 'the wrong peak EMF'],
  ['Q33', /not the solenoid's length or radius/, 'the false length independence'],
  ['Q41', /h-bar\/2/, 'the plain-text hbar'],
  ['Q44', /an increase in velocity leads to a decrease in pressure/, 'the universal Bernoulli claim'],
  ['Q47', /laminar \(Re < 2000\)/, 'the confident steady-pipe thresholds'],
  ['Q48', /A manometer connected to a patient's artery/, 'the mmHg conversion framing'],
  ['Q51', /disorder of the system greatly increases/, 'the disorder-only explanation'],
  ['Q54', /with sign convention u = -30 cm/, 'the mixed sign convention'],
  ['Q55', /f = -20 cm \(concave\)/, 'the unexplained sign switch'],
  ['Q57', /distance between lenses/, 'the wrong tube-length definition'],
  ['Q60', /cannot be expressed in terms of other SI units/, 'the over-strong base-unit claim'],
];
for (const [Q, re, what] of GONE) {
  ok(!re.test(allText(rec(Q))), Q + ' no longer carries ' + what);
  ok(re.test(allText(pre(Q))), Q + ' really did carry it before, so the check is not vacuous: ' + what);
}

/* ------------------------------------------------------------------ */
section('6. presentation: tables, Key Concepts, heading style, notation');

let tables = 0, kcCount = 0, lettered = 0, unlettered = 0, pts = 0, bl = 0;
const tableItems = [];
for (const Q of QS) {
  const e = rec(Q).explanation;
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(Q); }
  ok((e.match(/<p class='exp-key'>Key Concept: /g) || []).length === 1, Q + ': exactly one Key Concept');
  kcCount++;
  if (/Key Educational Points/i.test(e)) pts++;
  if (/Bottom Line/i.test(e)) bl++;
  const kh = keyedOf(e);
  if (/^[ABCD]\) /.test(kh)) lettered++; else unlettered++;
  ok(/^[ABCD]\) /.test(kh) === /^[ABCD]\) /.test(keyedOf(pre(Q).explanation)), Q + ': its keyed-heading style is unchanged');
  const r = rec(Q);
  ok(kh === (/^[ABCD]\) /.test(kh) ? L[r.correct] + ') ' + r.options[r.correct] : r.options[r.correct]),
    Q + ': its keyed heading reproduces the keyed option');
}
ok(tables === 18 && JSON.stringify(tableItems) === JSON.stringify(idmap.presentation.table_items),
  '18 tables, in exactly the items the review names (got ' + tables + ')');
for (const Q of QS) {
  const a = (pre(Q).explanation.match(/<table/g) || []).length;
  const b = (rec(Q).explanation.match(/<table/g) || []).length;
  ok(a === b, Q + ': its table count is unchanged (' + a + ' -> ' + b + ')');
}
ok(kcCount === 60, '60 Key Concepts, one per item');
ok(pts === 0 && bl === 0, 'no Key Educational Points block and no Bottom Line was invented');
ok(lettered === 39 && unlettered === 21, '39 lettered and 21 unlettered keyed headings (got ' + lettered + '/' + unlettered + ')');
ok(keyedOf(rec('Q31').explanation) === 'B) 150.8 V', "Q31's keyed heading now names B, 150.8 V");

let emItems = [], curly = 0, replChar = [];
const entKinds = new Set(), entKindsBefore = new Set();
for (const Q of QS) {
  const t = allText(rec(Q));
  if (/—/.test(t)) emItems.push(Q);
  curly += (t.match(/[‘’“”]/g) || []).length;
  if (/�/.test(t)) replChar.push(Q);
  for (const m of t.matchAll(/&([a-zA-Z][a-zA-Z0-9]{1,12});/g)) entKinds.add(m[1]);
  for (const m of allText(pre(Q)).matchAll(/&([a-zA-Z][a-zA-Z0-9]{1,12});/g)) entKindsBefore.add(m[1]);
}
ok(emItems.length === 0, 'no em dash anywhere in the block' + (emItems.length ? ': ' + emItems.join(', ') : ''));
ok(curly === 0, 'no curly quote anywhere in the block (got ' + curly + ')');
ok(replChar.length === 0, 'no replacement character anywhere in the block');
ok([...entKinds].every(k => entKindsBefore.has(k)),
  'no new kind of HTML entity was introduced; the block uses ' + [...entKinds].sort().join(', '));

/* ------------------------------------------------------------------ */
section('7. structural health');

for (const Q of QS) {
  const e = rec(Q).explanation;
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, Q + ': <' + t + '> balanced (' + o + '/' + c + ')');
  }
  let depth = 0, maxDepth = 0;
  for (const m of e.matchAll(/<(\/?)p[ >]/g)) { if (m[1]) depth--; else { depth++; maxDepth = Math.max(maxDepth, depth); } }
  ok(depth === 0 && maxDepth === 1, Q + ': paragraph nesting depth is 1');
  ok(!/<p><p>|<\/p><\/p>/.test(e), Q + ': no doubled paragraph tags');
  ok((e.match(/<h4[^>]*>Correct Answer:/g) || []).length === 1, Q + ': exactly one keyed heading');
  ok(!/&lt;(?:p|h4|li|strong)/.test(e), Q + ': no escaped literal markup');
}
for (const Q of idmap.presentation.trailing_div_items)
  ok(/<div style="text-align:center;margin:12px 0"><\/div>$/.test(rec(Q).explanation), Q + ': its trailing div is preserved');
{
  const scaffolding = QS.filter(Q => /https?:\/\/|Supporting source notes|Replacement stem|Review:|S1[0-9]?,|Preserve the existing/.test(allText(rec(Q))));
  ok(scaffolding.length === 0, 'no reviewer note, citation or implementation instruction reached the student text' +
    (scaffolding.length ? ': ' + scaffolding.join(', ') : ''));
}

/* ------------------------------------------------------------------ */
section("8. the review's numerical results, independently recomputed");

const round = (x, d) => Number(x.toFixed(d));
const opt = Q => rec(Q).options[rec(Q).correct];
ok(round(50 * 0.4 * 0.020 * (2 * Math.PI * 60), 1) === 150.8 && opt('Q31') === '150.8 V',
  'Q31: 50 x 0.4 x 0.020 x 2pi x 60 = 150.8 V, and that is now the keyed option');
ok(round(753.9 / 150.8, 1) === 5.0, 'Q31: the superseded 753.9 V was exactly five times the correct value');
ok(13600 * 10 * 0.120 === 16320 && opt('Q48') === '16320 Pa', 'Q48: 13600 x 10 x 0.120 = 16320 Pa');
ok(round(2 * 8.314 * 400 * 0.693, 0) === 4609 && opt('Q50') === '4610 J', 'Q50: 2 x 8.314 x 400 x 0.693 = 4609 J, keyed as 4610 J');
ok(round(2260000 / 373.15, 0) === 6057 && opt('Q51') === '6060 J/K', 'Q51: 2,260,000 / 373.15 = 6057 J/K, keyed as 6060 J/K');
ok(round(300 * Math.pow(8, 2 / 3), 6) === 1200 && opt('Q52') === '1200 K', 'Q52: 300 x 8^(2/3) = 1200 K');
ok((160 / 5) * (250 / 25) === 320 && opt('Q57') === '320x', 'Q57: (160/5) x (250/25) = 320');
ok(round(340 / 440, 2) === 0.77 && opt('Q7') === '0.77 m', 'Q7: 340/440 = 0.77 m');
ok((30 * 30 - 10 * 10) / (2 * 200) === 2 && opt('Q16') === '2 m/s<sup>2</sup>', 'Q16: (900-100)/400 = 2 m/s2');
ok(20000 / 3000 > 6.66 && 20000 / 3000 < 6.67 && opt('Q14') === '6.67 m/s', 'Q14: 20000/3000 = 6.67 m/s');

/* ------------------------------------------------------------------ */
section('9. the things the review said to check rather than assume');

ok(/2<sup>2<\/sup> = 4/.test(pre('Q28').explanation),
  "Q28's exponent was ALREADY correct markup before the pass, so the flattened '22' was an export artifact");
ok(/2<sup>2<\/sup> = 4/.test(rec('Q28').explanation), 'Q28 keeps it unchanged');
ok(headOf(rec('Q28').explanation).replace(WHY, '').indexOf('2<sup>2</sup> = 4') >= 0, "Q28's main explanation is otherwise untouched");
ok(/<sup>14<\/sup><sub>6<\/sub>C/.test(pre('Q12').explanation),
  "Q12's isotope layout was ALREADY correct, so 'AZX' and '146C' were export artifacts, not stored strings");
ok(/<sup>14<\/sup><sub>6<\/sub>C/.test(rec('Q12').explanation), 'Q12 keeps that layout');
ok(!/AZX|146C/.test(allText(rec('Q12'))), 'Q12 stores no flattened isotope string');
ok(/&Omega;/.test(rec('Q19').question), "Q19's ohm sign is the &Omega; entity, which renders correctly; it was never a defect");
ok(/r⁴/.test(rec('Q45').explanation), "Q45's fourth power was already a real superscript and is kept");
ok(/8<sup>2\/3<\/sup>/.test(rec('Q52').explanation), 'Q52 now shows 8^(2/3) as a real exponent');

/* ------------------------------------------------------------------ */
section('10. the coverage ledger');

ok(idmap.coverage.physics_bank_size === 280 && idmap.coverage.ids_in_this_block === 60,
  'the ledger records 60 ids in a 280-record physics bank');
ok(idmap.coverage.ids_in_this_block + idmap.coverage.ids_outside_this_block === 280, 'the coverage sum closes');
ok(/not a claim about the rest of the physics bank/.test(idmap.coverage.note),
  'the ledger says this is one block, not the whole bank');
ok(idmap.deviations.length === 0, 'the id map records no deviation');
ok(idmap.notes.join(' ').indexOf('do not establish scientific accuracy') >= 0,
  'the id map states that these checks are not scientific approval');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
