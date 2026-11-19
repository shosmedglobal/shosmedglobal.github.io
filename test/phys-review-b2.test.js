/* Result-verifying suite for the SHOSMED physics SECOND 60-question review.
 *
 * This checks the BANK, not the harness. Section 1 re-derives the id map from
 * the review's original signatures by full content match and proves the match
 * is unique bank-wide. Every "claim removed" assertion is paired with a
 * non-vacuity check that the claim really was in the before-fixture.
 *
 * The review asks for proportionate verification rather than a large new
 * testing project, so this is one focused file: scope, structure, heading
 * agreement, the named content repairs and the recomputed numbers.
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
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-b2-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b2-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b2-untouched.json'), 'utf8'));
const SIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b2-signatures.json'), 'utf8'));
const B1 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-60-idmap.json'), 'utf8')).map;

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
  if (!km) return '';
  return i >= 0 ? e.slice(km[0].length, i) : e.slice(km[0].length, e.indexOf(KCOPEN));
};
function fbParts(e) {
  const out = {};
  for (const m of e.matchAll(/<p><strong>([ABCD])\. ([\s\S]*?):<\/strong>([\s\S]*?)<\/p>/g)) out[m[1]] = { head: m[2], body: m[3] };
  return out;
}
const allText = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const round = (x, d) => Number(x.toFixed(d));

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
       .replace(/ν/g, 'nu').replace(/φ/g, 'phi').replace(/Φ/g, 'phi').replace(/η/g, 'eta').replace(/½/g, '1/2');
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
ok(SIG.retainedKeys === idmap.asserted_key_block, 'the signatures reproduce the review key block');
ok(SIG.originalKeys === SIG.retainedKeys, 'the displayed and intended key blocks are identical: the review moves no answer letter');

/* uniqueness is computed from the BEFORE-fixture for the block, since 34 of
   its stems and 7 of its option texts have since been replaced */
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
  let exact = 0, loose = 0;
  for (const Q of QS) {
    const sig = SIG.sigs[Q];
    const hitsE = BANK.filter(q => recOf(srcOf(q), canon) === sigOf(sig, canon));
    const hitsT = BANK.filter(q => recOf(srcOf(q), tight) === sigOf(sig, tight));
    if (hitsE.length === 1 && hitsE[0].id === MAP[Q]) exact++;
    ok(hitsT.length === 1 && hitsT[0].id === MAP[Q],
      Q + ': the signature matches exactly one bank record, ' + MAP[Q]);
    ok(sig.topic === rec(Q).topic, Q + ': the stored topic equals the signature topic');
    ok(L[pre(Q).correct] === sig.retainedKey, Q + ': the stored key equalled the review key before editing');
  }
  ok(exact === 56, '56 signatures matched without relaxing whitespace (got ' + exact + ')');
  const loosened = QS.filter(Q => BANK.filter(q => recOf(srcOf(q), canon) === sigOf(SIG.sigs[Q], canon)).length !== 1);
  ok(JSON.stringify(loosened) === JSON.stringify(idmap.verification.matched_only_ignoring_whitespace),
    'the four needing whitespace relaxation are the ones the id map names: ' + loosened.join(', '));
}
ok(new Set(Object.values(MAP)).size === 60, 'the 60 ids are distinct');
ok(QS.every(Q => MAP[Q] === 'phys-' + (60 + Number(Q.slice(1)))), 'the map resolved to phys-61..phys-120');
ok(QS.every(Q => !new Set(Object.values(B1)).has(MAP[Q])),
  'none of the 60 ids appears in the previously reviewed physics block');

/* ------------------------------------------------------------------ */
section('2. answer letters, ids and topics are untouched');

for (const Q of QS) {
  const a = pre(Q), b = rec(Q);
  ok(a.correct === b.correct, Q + ': the answer letter did not move (' + L[a.correct] + ')');
  ok(a.id === b.id && a.topic === b.topic && a.subject === b.subject, Q + ': id, topic and subject are unchanged');
  ok(b.options.length === 4, Q + ': still four options');
}
ok(QS.map(Q => L[rec(Q).correct]).join('') === idmap.asserted_key_block, 'the stored key block equals the review key block');
{
  const t = { A: 0, B: 0, C: 0, D: 0 };
  for (const Q of QS) t[L[rec(Q).correct]]++;
  ok(JSON.stringify(t) === JSON.stringify(idmap.asserted_tally), 'the key tally is A=6, B=28, C=26, D=0');
}

/* ------------------------------------------------------------------ */
section('3. the declared edit inventory, recomputed from the bank');

{
  const stems = [], opts = [], kcs = [], heads = [];
  for (const Q of QS) {
    const a = pre(Q), b = rec(Q);
    if (a.question !== b.question) stems.push(Q);
    if (JSON.stringify(a.options) !== JSON.stringify(b.options)) opts.push(Q);
    if (kcOf(a.explanation) !== kcOf(b.explanation)) kcs.push(Q);
    const ha = headOf(a.explanation), hb = headOf(b.explanation);
    if (ha !== hb) heads.push(Q);
  }
  ok(JSON.stringify(stems) === JSON.stringify(idmap.scope.stem_changes), '34 stems changed, exactly the declared list (got ' + stems.length + ')');
  ok(JSON.stringify(heads) === JSON.stringify(idmap.scope.main_explanation_changes), '22 main explanations changed, exactly the declared list (got ' + heads.length + ')');
  ok(JSON.stringify(kcs) === JSON.stringify(idmap.scope.key_concept_changes), '40 Key Concepts changed, exactly the declared list (got ' + kcs.length + ')');
  ok(JSON.stringify(opts) === JSON.stringify(['Q21', 'Q34', 'Q54', 'Q56']), 'option texts changed in exactly Q21, Q34, Q54 and Q56');
  ok(stems.length === 34 && heads.length === 22 && kcs.length === 40, 'the three counts are 34, 22 and 40');
}
{
  let slots = 0;
  for (const Q of QS) {
    const a = pre(Q), b = rec(Q);
    for (let j = 0; j < 4; j++) {
      if (a.options[j] === b.options[j]) continue;
      slots++;
      const slot = Q + ' ' + L[j];
      ok(idmap.scope.option_text_changes[slot] === b.options[j], slot + ': the stored option is the declared replacement');
    }
  }
  ok(slots === 7, 'exactly 7 option slots changed (got ' + slots + ')');
  ok(Object.keys(idmap.scope.option_text_changes).length === 7, 'and the id map declares 7');
}
for (const Q of idmap.scope.core_content_kept) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question, Q + ': core-kept stem unchanged');
  ok(JSON.stringify(a.options) === JSON.stringify(b.options), Q + ': core-kept options unchanged');
  ok(kcOf(a.explanation) === kcOf(b.explanation), Q + ': core-kept Key Concept unchanged');
  ok(headOf(a.explanation) === headOf(b.explanation), Q + ': core-kept main explanation unchanged');
  ok(a.explanation !== b.explanation, Q + ': but its explanation did change, because feedback was added');
}
ok(idmap.scope.core_content_kept.length === 12, 'twelve items are core-content-kept');
for (const Q of idmap.scope.key_concept_only_changes) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question && headOf(a.explanation) === headOf(b.explanation),
    Q + ': Key-Concept-only item kept its stem and main explanation');
  ok(kcOf(a.explanation) !== kcOf(b.explanation), Q + ': and its Key Concept did change');
}

/* ------------------------------------------------------------------ */
section('4. structure and heading agreement');

let fbTotal = 0;
for (const Q of QS) {
  const r = rec(Q), e = r.explanation;
  ok((e.match(/<h4[^>]*>Correct Answer:/g) || []).length === 1, Q + ': exactly one keyed heading');
  ok(keyedOf(e) === r.options[r.correct], Q + ': the keyed heading reproduces the keyed option');
  ok(!/^[ABCD][.)] /.test(keyedOf(e)), Q + ": the keyed heading keeps this block's unlettered style");
  ok((e.match(/<p class='exp-key'>Key Concept: /g) || []).length === 1, Q + ': exactly one Key Concept');
  ok((e.match(/Why the other choices are wrong/g) || []).length === 1, Q + ': exactly one feedback heading');
  const parts = fbParts(e);
  const letters = Object.keys(parts);
  fbTotal += letters.length;
  ok(letters.length === 3, Q + ': three distractor paragraphs (got ' + letters.length + ')');
  ok(!letters.includes(L[r.correct]), Q + ': no feedback paragraph for the keyed letter');
  for (const letter of letters) {
    ok(parts[letter].head === r.options[L.indexOf(letter)], Q + ' ' + letter + ': the feedback heading reproduces its option text');
    ok(/^ \S/.test(parts[letter].body), Q + ' ' + letter + ': the body opens with the single leading space of the bank convention');
    ok(parts[letter].body.length > 40, Q + ' ' + letter + ': the body is a real explanation, not a stub');
  }
  const iW = e.indexOf(WHY), iK = e.indexOf(KCOPEN);
  ok(iW > 0 && iW < iK, Q + ': the feedback sits after the main explanation and before the Key Concept');
  ok(e.indexOf('</p>', iK) + 4 === e.length, Q + ': nothing follows the Key Concept');
  ok(!/<table/.test(e), Q + ': no table was introduced');
  ok(!/<div/.test(e), Q + ': no div was introduced');
  ok(!/Key Educational Points/i.test(e) && !/Bottom Line/i.test(e), Q + ': no generic educational block was added');
  ok(!/<p><p>|<\/p><\/p>/.test(e), Q + ': no doubled paragraph tags');
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t + '>', 'g')) || []).length;
    ok(o === c, Q + ': <' + t + '> tags balance (' + o + '/' + c + ')');
  }
  const txt = allText(r);
  ok(!/—/.test(txt), Q + ': no em dash');
  ok(!/[‘’“”]/.test(txt), Q + ': no curly quote');
  ok(!/�/.test(txt), Q + ': no replacement character');
  ok(!/&[a-zA-Z#]/.test(txt), Q + ': no HTML entity was introduced');
  ok(!/\n/.test(r.question), Q + ': the stem has no bare newline, which would collapse on screen');
  ok(!/Reviewer source notes|These labels are not student text|S1[0-9]?,|MAJOR REWRITE/.test(txt),
    Q + ': no reviewer label, source note or instruction leaked into student text');
}
ok(fbTotal === 180, '180 distractor paragraphs across the block (got ' + fbTotal + ')');
{
  let hadFb = 0;
  for (const Q of QS) if (/Why the other choices are wrong/.test(pre(Q).explanation) || /<p><strong>[ABCD]\. /.test(pre(Q).explanation)) hadFb++;
  ok(hadFb === 0, 'none of the 60 carried distractor feedback before this pass, so nothing was duplicated');
}

/* ------------------------------------------------------------------ */
section('5. typography the review asked to verify');

for (const Q of ['Q1', 'Q5', 'Q44', 'Q58']) {
  const r = rec(Q);
  ok(r.options.every(o => /<sup>/.test(o)), Q + ': its options still carry real <sup> markup');
  ok(JSON.stringify(r.options) === JSON.stringify(pre(Q).options), Q + ': its option markup was left exactly as stored');
  ok(r.options.some(o => /<sup>−/.test(o)) || Q === 'Q44', Q + ': negative exponents keep the U+2212 minus');
}
ok(/3\.34 × 10<sup>5<\/sup> J\/kg/.test(rec('Q52').question), "Q52's latent heat renders as 3.34 × 10^5 J/kg in the stem");
ok(/12 × 10<sup>−6<\/sup> \/°C/.test(rec('Q48').question), "Q48's expansion coefficient keeps its negative exponent markup");
ok(/6\.67 × 10<sup>−11<\/sup>/.test(rec('Q58').question), "Q58's G keeps its negative exponent markup");
ok(/ρ<sub>water<\/sub>/.test(rec('Q38').question), "Q38's water density keeps its subscript markup");
ok(/μ<sub>k<\/sub>/.test(rec('Q19').question), "Q19's friction coefficient keeps its subscript markup");
{
  let unicodeSubs = 0;
  for (const Q of QS) unicodeSubs += (allText(rec(Q)).match(/[₀-₉]/g) || []).length;
  ok(unicodeSubs === 0, "no Unicode subscript digit remains in the block; the bank's <sub> markup is used throughout (got " + unicodeSubs + ')');
}
for (const Q of QS) {
  const bank = BANK.filter(q => !PACK.has(q.id));
  void bank;
  ok(!/<sup>-/.test(allText(rec(Q))), Q + ': no ASCII hyphen inside a superscript, where the bank uses U+2212');
}

/* ------------------------------------------------------------------ */
section('6. the named content repairs, each paired with a non-vacuity check');

function repaired(Q, gone, present, label) {
  const a = pre(Q).explanation + '\u0000' + pre(Q).question + '\u0000' + pre(Q).options.join('\u0000');
  const b = rec(Q).explanation + '\u0000' + rec(Q).question + '\u0000' + rec(Q).options.join('\u0000');
  if (gone !== null) {
    ok(a.indexOf(gone) >= 0, Q + ': the old wording ' + JSON.stringify(gone.slice(0, 44)) + ' really was there before (non-vacuity)');
    ok(b.indexOf(gone) < 0, Q + ': ' + label + ' - the old wording is gone');
  }
  if (present !== null) ok(b.indexOf(present) >= 0, Q + ': ' + label + ' - the replacement wording is present');
}

repaired('Q3', 'have the same units', 'cannot by itself prove that a formula is correct',
  'dimensional analysis can reject but not prove');
repaired('Q6', 'not the average of the two speeds', 'time-weighted average',
  'the arithmetic mean is not wrong in principle, only in general');
repaired('Q9', 'At maximum height the velocity is zero', 'momentarily zero at the highest point',
  'the Key Concept is scoped to a vertical throw');
repaired('Q10', 'Maximum range occurs at 45°', 'launch and landing at the same height',
  'the range formula states its equal-height assumption');
repaired('Q13', 'vertical and horizontal motions are independent', 'Find the fall time from the vertical motion',
  'the Key Concept says how the two components are used');
repaired('Q14', 'Distance in the nth second', 'x(3 s) − x(2 s)',
  'position subtraction replaces the dimensionally misleading shortcut');
repaired('Q16', 'Total flight time for vertical throw', 'returning to its release height',
  'total flight time is tied to the landing height');
repaired('Q18', 'm(g ± a)', 'upward defined as positive',
  'a signed acceleration replaces the ambiguous plus-or-minus mnemonic');
repaired('Q21', 'Cancel each other out', 'Cancel each other on the same object',
  'option A is restricted to the same object');
ok(/internal forces/.test(rec('Q21').explanation), 'Q21: the explanation distinguishes internal-force cancellation for the combined system');
repaired('Q22', 'pulled by a force of 25 N on a frictionless surface', 'A horizontal force of 25 N acts on the 3 kg block',
  'the stem names which block receives the force');
repaired('Q25', 'A 1000 kg car brakes from 20 m/s', 'magnitude of the average net force',
  'the question asks for an average net force magnitude');
repaired('Q26', 'maintains its state of rest or uniform motion', 'constant velocity in a straight line',
  'uniform motion is spelled out');
repaired('Q31', 'A motor lifts a 200 kg load', 'average useful power',
  'the power asked for is specified');
repaired('Q33', 'Energy was lost to heat/sound', 'not that total energy was destroyed',
  'loss of kinetic energy is not loss of total energy');
repaired('Q34', 'An object is in stable equilibrium when its center of gravity is:', 'Which response after a small tilt and release from rest',
  'the major rewrite tests the restoring-torque definition');
ok(rec('Q34').options.every((o, j) => o !== pre('Q34').options[j]), 'Q34: all four option texts were replaced');
ok(rec('Q34').correct === 1 && keyedOf(rec('Q34').explanation) === 'It experiences a torque that tends to restore its original orientation',
  'Q34: the key is still B and its keyed heading was re-synchronized to the new option B');
ok(/neutral equilibrium/.test(kcOf(rec('Q34').explanation)), 'Q34: the Key Concept contrasts stable, unstable and neutral equilibrium');
repaired('Q38', 'hydrostatic pressure at the bottom', 'gauge pressure',
  'gauge pressure is distinguished from absolute pressure');
ok(/P<sub>absolute<\/sub>/.test(kcOf(rec('Q38').explanation)), 'Q38: the Key Concept gives the absolute-pressure relation too');
repaired('Q39', 'is placed in water', 'floats at rest in water of density 1000 kg/m³',
  'floating equilibrium and the water density are stated');
repaired('Q40', 'Buoyant force = weight in air', 'weight of displaced fluid',
  "Archimedes' principle is taught rather than defined as a scale difference");
repaired('Q41', 'Equation of continuity', 'unbranched pipe',
  'steady incompressible flow in an unbranched pipe is stated');
repaired('Q42', 'as the speed of a fluid increases', 'negligible viscous losses',
  "the Bernoulli comparison's assumptions are in the stem");
repaired('Q44', 'Standard atmospheric pressure = 101,325 Pa ≈', 'defined as exactly 101,325 Pa',
  'the chain of exact and approximate equalities is repaired');
repaired('Q45', 'Laminar flow transitions to turbulent flow when the Reynolds number exceeds', 'approximate onset of transition',
  'an approximate transition onset replaces a universal sharp threshold');
ok(/does not prove that the flow is fully turbulent/.test(rec('Q45').explanation),
  'Q45: the explanation says a value just above 2000 does not prove turbulence');
repaired('Q46', 'T(K) = T(°C) + 273 = 37 + 273', '273.15',
  'the exact Celsius offset is used and the rounding is asked for');
repaired('Q48', 'An iron rod of length 2 m is heated', 'free to expand',
  'the rod is stated to be free to expand and L0 is used');
repaired('Q50', 'Ideal gas law PV = nRT; P in Pascals', 'absolute pressure and temperature in kelvin',
  'the Key Concept names the required units');
repaired('Q51', 'ΔU = Q − W (energy conservation)', 'W<sub>by</sub>',
  'the work sign convention is explicit');
repaired('Q52', 'melt 0.5 kg of ice at 0°C?', 'pure ice',
  'the phase-change endpoints are specified');
repaired('Q53', 'In an isothermal process for an ideal gas:', 'a fixed amount of an ideal gas',
  'a fixed amount of gas is specified');
ok(/is not necessarily adiabatic/.test(kcOf(rec('Q53').explanation)), 'Q53: the Key Concept says isothermal is not adiabatic');
repaired('Q54', 'The entropy of an isolated system tends to increase', 'The entropy of an isolated system cannot decrease',
  'option C states nondecrease and allows reversible equality');
ok(rec('Q54').correct === 2 && keyedOf(rec('Q54').explanation) === 'The entropy of an isolated system cannot decrease',
  'Q54: the key is still C and its keyed heading was re-synchronized');
ok(/first law/.test(fbParts(rec('Q54').explanation).D.body), "Q54: option D's feedback explains that it is a first-law consequence");
repaired('Q55', 'An ideal gas at 200 kPa occupies 3 L', 'constant external pressure of 200 kPa',
  'the constant external pressure is stated');
repaired('Q56', '26.3°C ≈ 27°C', 'to the nearest 0.1°C',
  'the false rounding claim is gone and the precision is requested');
ok(rec('Q56').options[2] === '26.3°C' && pre('Q56').options[2] === '27.0°C',
  'Q56: option C was corrected from 27.0°C to 26.3°C');
ok(rec('Q56').correct === 2 && keyedOf(rec('Q56').explanation) === '26.3°C',
  'Q56: the key is still C and its keyed heading was re-synchronized to 26.3°C');
ok(!/27\.0°C/.test(rec('Q56').explanation + rec('Q56').options.join(' ')), 'Q56: no 27.0°C remains anywhere in the record');
ok(/insulated/.test(rec('Q56').question) && /negligible heat capacity/.test(rec('Q56').question),
  'Q56: the calorimetry assumptions are in the stem');
repaired('Q57', 'Compression raises temperature; expansion lowers it.', 'freely into a vacuum',
  'free expansion is the counterexample to the blanket claim');
repaired('Q58', 'Two masses of 4 kg and 9 kg', 'Two point masses',
  'point masses make the separation unambiguous');
repaired('Q59', 'does the gravitational acceleration become g/4?', 'spherically symmetric',
  'the spherical-Earth model is stated and rotation neglected');
repaired('Q60', 'If the distance between two objects is doubled', 'separation between two point masses',
  'fixed point masses and a change of separation are specified');
repaired('Q7', 'accelerates uniformly at 4 m/s', 'What is its speed after 5 seconds?',
  'the question asks for speed, matching its directionless choices');
repaired('Q8', 'A ball is dropped from a height of 45 m', 'Ignoring air resistance',
  'the free-fall model is explicit');
repaired('Q19', 'What horizontal force is needed to move it at constant velocity?', 'slides on a level horizontal surface',
  'the block is already sliding, which is what kinetic friction governs');
repaired('Q23', 'A 4 kg object on a frictionless incline at 30° slides down', 'fixed, frictionless incline',
  'the incline model is explicit');
repaired('Q24', 'A box is pushed across a floor', 'level horizontal floor',
  'a level floor makes N equal the given weight');
repaired('Q27', 'pulls a sled 10 m along the ground at an angle of 60°', 'A constant force of 40 N acts at 60° above the horizontal',
  'the force, not the path, is inclined');
repaired('Q29', 'PE = mgh = 2 × 10 × 15', 'ΔU = mgΔh',
  'the change in potential energy replaces an absolute value');
repaired('Q30', 'potential energy converts fully to kinetic energy', 'loss of gravitational potential energy equals the gain in kinetic energy',
  'the Key Concept speaks of a loss becoming a gain');
repaired('Q32', 'A lever has an effort arm of 2 m', 'ideal lever is in equilibrium',
  'the ideal-lever model and perpendicular moment arms are stated');
repaired('Q35', 'The motor has an efficiency of 75%', '75% of the electrical energy input',
  'the efficiency is defined relative to the useful height gain');
repaired('Q36', 'is compressed by 0.3 m. How much elastic potential energy is stored?', "obeys Hooke's law",
  'the Hooke range and the natural-length reference are stated');
repaired('Q37', 'A force of 600 N is applied to a piston', 'A normal force of 600 N',
  'a normal force and an average pressure are specified');

/* The final content reread asked for one further change: the body of Q29's
   option A feedback. Everything else in Q29 stays as this pass left it. */
{
  const r = rec('Q29');
  const A = "<p><strong>A. 150 J:</strong> This would be the gravitational potential-energy increase for a 1 kg object raised by 15 m when g = 10 m/s². The given object has a mass of 2 kg, so its energy increase is 2 × 10 × 15 = 300 J.</p>";
  ok(r.explanation.indexOf(A) >= 0, 'Q29: option A feedback carries the reread wording');
  ok(r.explanation.indexOf('This is gΔh without the factor of mass') < 0, 'Q29: the earlier option A body is gone');
  ok(r.explanation.indexOf('potential-energy increase for a 1 kg object') >= 0, 'Q29: the new body names the 1 kg object the 150 J value would belong to');
  ok(r.explanation.slice(r.explanation.indexOf(A)).indexOf('2 × 10 × 15 = 300 J') >= 0, 'Q29: the new body recomputes the correct 300 J');
  ok(r.options[0] === '150 J', 'Q29: option A text is unchanged');
  ok(r.explanation.indexOf("<p><strong>A. " + r.options[0] + ':') >= 0, 'Q29: the feedback heading still reproduces option A');
  ok(r.explanation.indexOf('<strong>B. 200 J:</strong> For this mass, a 200 J increase would correspond to a 10 m rise.') >= 0, 'Q29: option B feedback untouched');
  ok(r.explanation.indexOf('<strong>D. 30 J:</strong> The product mΔh is 30 kg·m, not an energy.') >= 0, 'Q29: option D feedback untouched');
  ok(r.explanation.indexOf("<p>Near Earth's surface, with g treated as constant, the increase in gravitational potential energy is ΔU = mgΔh = 2 × 10 × 15 = <strong>300 J</strong>.") >= 0, 'Q29: main explanation untouched');
  ok(r.explanation.indexOf("Key Concept: For a height change near Earth's surface, ΔU = mgΔh.") >= 0, 'Q29: Key Concept untouched');
  ok(r.correct === 2, 'Q29: still keyed C');
}

/* ------------------------------------------------------------------ */
section("7. the review's numerical results, recomputed here");

ok(round(20 / (0.5 * (9 - 4)), 6) === 8, 'Q14: 20 m over the third second gives a = 8 m/s2');
ok(/8 m\/s²/.test(rec('Q14').options[rec('Q14').correct]), 'Q14: and the keyed option reads 8 m/s2');
ok(round(2 * (25 / (2 + 3)), 6) === 10, 'Q22: a = 5 m/s2 and the tension on the 2 kg block is 10 N');
ok(round(3 * (25 / (2 + 3)), 6) === 15, 'Q22: pulling the other block would instead give 15 N, which option C now explains');
ok(round(1000 * 20 / 4, 6) === 5000, 'Q25: the average net force magnitude is 5000 N');
ok(round(1000 * 10 * 5, 6) === 50000, 'Q38: the gauge pressure is 50,000 Pa');
ok(round(200000 * 0.002, 6) === 400, 'Q55: the isobaric work is 400 J');
{
  const T = (0.2 * 900 * 100 + 0.5 * 4200 * 20) / (0.2 * 900 + 0.5 * 4200);
  ok(round(T, 4) === 26.3158, 'Q56: the equilibrium temperature is 26.3158 C');
  ok(round(T, 1) === 26.3, 'Q56: which rounds to 26.3 C, not 27.0 C');
  ok(round(0.2 * 900 * (100 - 22.7), 0) === 13914 && round(0.5 * 4200 * (22.7 - 20), 0) === 5670,
    "Q56: option A's energy figures check out (13,914 J lost against 5670 J gained)");
  ok(round(0.2 * 900 * (100 - 25.4), 0) === 13428 && round(0.5 * 4200 * (25.4 - 20), 0) === 11340,
    "Q56: option B's energy figures check out");
  ok(round(0.2 * 900 * (100 - 30.2), 0) === 12564 && round(0.5 * 4200 * (30.2 - 20), 0) === 21420,
    "Q56: option D's energy figures check out");
}
ok(round(50 * 1e-9 / 1e-8, 6) === 5, 'Q1: 50 nm is 5 x 10^-8 m');
ok(round(4 * 5, 6) === 20, 'Q7: v = at = 20 m/s');
ok(round(Math.sqrt(2 * 45 / 10), 6) === 3, 'Q8: the fall takes 3 s');
ok(round(900 / 20, 6) === 45, 'Q9: the rise is 45 m');
ok(round(1600 * Math.sin(Math.PI / 2) / 10, 6) === 160, 'Q10: the range is 160 m');
ok(round(1 / (600 / 60), 6) === 0.1, 'Q11: the period is 0.1 s');
ok(round(36 / 2, 6) === 18, 'Q12: the centripetal acceleration is 18 m/s2');
ok(round(15 * Math.sqrt(2 * 80 / 10), 6) === 60, 'Q13: the horizontal distance is 60 m');
ok(round(4 * Math.PI / (2 * Math.PI), 6) === 2, 'Q15: the frequency is 2 Hz');
ok(round(2 * 20 / 10, 6) === 4, 'Q16: the flight time is 4 s');
ok(round(5 * 3, 6) === 15, 'Q17: the net force is 15 N');
ok(round(60 * (10 + 2), 6) === 720, 'Q18: the apparent weight is 720 N');
ok(round(0.3 * 10 * 10, 6) === 30, 'Q19: the pull is 30 N');
ok(round(Math.hypot(3, 4), 6) === 5, 'Q20: the resultant is 5 N');
ok(round(10 * Math.sin(Math.PI / 6), 6) === 5, 'Q23: the downhill acceleration is 5 m/s2');
ok(round(50 / 200, 6) === 0.25, 'Q24: the friction coefficient is 0.25');
ok(round(40 * 10 * Math.cos(Math.PI / 3), 6) === 200, 'Q27: the work is 200 J');
ok(round(0.5 * 3 * 64, 6) === 96, 'Q28: the kinetic energy is 96 J');
ok(round(2 * 10 * 15, 6) === 300, 'Q29: the potential-energy gain is 300 J');
ok(round(Math.sqrt(2 * 10 * 20), 6) === 20, 'Q30: the impact speed is 20 m/s');
ok(round(200 * 10 * 10 / 5, 6) === 4000, 'Q31: the average useful power is 4000 W');
ok(round(2 / 0.5, 6) === 4, 'Q32: the mechanical advantage is 4');
ok(round(0.5 * 4 * (9 - 25), 6) === -32, 'Q33: the kinetic-energy change is -32 J');
ok(round((500 * 10 * 12 / 20) / 0.75, 6) === 4000, 'Q35: the electrical input power is 4000 W');
ok(round(0.5 * 200 * 0.09, 6) === 9, 'Q36: the stored elastic energy is 9 J');
ok(round(600 / 0.02, 6) === 30000, 'Q37: the average pressure is 30,000 Pa');
ok(round(600 / 1000, 6) === 0.6, 'Q39: the submerged fraction is 0.6');
ok(round(80 - 50, 6) === 30, 'Q40: the buoyant force is 30 N');
ok(round(0.04 * 2 / 0.01, 6) === 8, 'Q41: the narrow-section speed is 8 m/s');
ok(round(540 / 200, 6) === 2.7, 'Q43: the density is 2.7 g/cm3');
ok(round(37 + 273.15, 2) === 310.15 && Math.round(310.15) === 310, 'Q46: 37 C is 310.15 K, rounding to 310 K');
ok(round(2 * 4200 * 50, 6) === 420000, 'Q47: the heat required is 420,000 J');
ok(round(12e-6 * 2 * 100 * 1000, 6) === 2.4, 'Q48: the expansion is 2.4 mm');
ok(round(3 * 8.3 * 300 / 0.1, 6) === 74700, 'Q50: the pressure is 74,700 Pa');
ok(round(500 - 200, 6) === 300, 'Q51: the internal-energy change is 300 J');
ok(round(0.5 * 3.34e5, 6) === 167000, 'Q52: the latent heat required is 167,000 J');
ok(round(6.67e-11 * 4 * 9 / 9, 13) === 2.668e-10, 'Q58: the gravitational force is about 2.67 x 10^-10 N');
ok(round(1 / 4, 6) === 0.25, 'Q59: g falls to one-quarter when the centre distance doubles, so h = R');
ok(round(1 / 4, 6) === 0.25, 'Q60: doubling the separation leaves one-quarter of the force');
for (const Q of QS) {
  const r = rec(Q);
  ok(r.correct >= 0 && r.correct <= 3, Q + ': the stored key index is in range');
}

/* ------------------------------------------------------------------ */
section('8. nothing outside the block moved');

ok(BANK.length === 280, 'the physics bank still holds 280 records');
{
  let checked = 0, drifted = [];
  for (const q of BANK) {
    if (PACK.has(q.id)) continue;
    checked++;
    if (untouched.physics[q.id] !== hash(q)) drifted.push(q.id);
  }
  ok(checked === 220, '220 physics records lie outside this block (got ' + checked + ')');
  ok(drifted.length === 0, 'none of them changed' + (drifted.length ? ': ' + drifted.join(', ') : ''));
  ok(Object.keys(untouched.physics).length === 220, 'the untouched fixture covers all 220');
}
ok(new Set(BANK.map(q => q.id)).size === 280, 'all physics ids are still distinct');
for (const q of BANK) {
  ok(q.subject === 'physics', q.id + ': still filed under physics');
  ok(Array.isArray(q.options) && q.options.length === 4, q.id + ': still has four options');
}
{
  const raw = fs.readFileSync(path.join(ROOT, 'questions-physics.json'), 'utf8');
  ok(JSON.stringify(JSON.parse(raw), null, 2) + '\n' === raw, 'the file round-trips through the project JSON format');
}

/* ------------------------------------------------------------------ */
section('9. the coverage ledger and the id map record');

ok(idmap.coverage.physics_bank_size === 280, 'the ledger records a 280-record physics bank');
ok(idmap.coverage.reviewed_before_this_block === 60 && idmap.coverage.new_unique_ids_this_block === 60,
  'it records 60 previously reviewed and 60 new ids');
ok(idmap.coverage.reviewed_after_this_block === 120, 'so coverage becomes 120 of 280');
ok(idmap.coverage.reviewed_after_this_block + idmap.coverage.still_unreviewed === 280, 'the coverage sum closes');
ok(idmap.verification.key_changes === 0, 'the record states that no answer letter changed');
ok(idmap.verification.overlap_with_previously_reviewed_block === 0, 'and that there is no overlap with the earlier block');
ok(idmap.deviations.length === 0, 'the id map records no deviation');
ok(idmap.notes.join(' ').indexOf('do not establish scientific accuracy') >= 0,
  'the id map states that these checks are not scientific approval');
ok(idmap.presentation.distractor_paragraphs_before === 0 && idmap.presentation.distractor_paragraphs_after === 180,
  'the record states that feedback went from 0 to 180 paragraphs');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
