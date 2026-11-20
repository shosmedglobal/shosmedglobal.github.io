/* Result-verifying suite for the SHOSMED physics THIRD 60-question review.
 *
 * This checks the BANK, not the harness. Section 1 re-derives the id map from
 * the review's original signatures by full content match and proves the match
 * is unique bank-wide. Every "claim removed" assertion is paired with a
 * non-vacuity check that the claim really was in the before-fixture.
 *
 * This block differs from the first two in one way that needs its own checks:
 * Q56..Q60 already carried three distractor bodies each, stored as a <ul> of
 * <li> items with option-text lead-ins. Section 4b proves that the seven
 * bodies the review retains survive byte for byte, that the eight it replaces
 * really changed, and that no list markup or old heading is left behind.
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
const OLDWHY = '<p><strong>Why the other answers are wrong:</strong></p>';
const KCOPEN = "<p class='exp-key'>Key Concept: ";

const BANK = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions-physics.json'), 'utf8')).physics;
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-b3-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b3-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b3-untouched.json'), 'utf8'));
const SIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b3-signatures.json'), 'utf8'));
const B1 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-60-idmap.json'), 'utf8')).map;
const B2 = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-b2-idmap.json'), 'utf8')).map;
const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e', 'f'])
  for (const s of require(path.join(ROOT, 'scripts/phys-b3-edits-' + m + '.js'))) SPECS.push(s);
const specOf = Q => SPECS.find(s => s.q === Q);

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const rec = Q => BANK.find(r => r.id === MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);

const keyedOf = e => (e.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/) || [null, null])[1];
const kcOf = e => { const i = e.indexOf(KCOPEN); return i < 0 ? null : e.slice(i + KCOPEN.length, e.indexOf('</p>', i)); };
const tailOf = e => { const i = e.indexOf(KCOPEN); return i < 0 ? null : e.slice(e.indexOf('</p>', i) + 4); };
/* the main explanation: between the keyed heading and whichever feedback
   heading this record carries, or the Key Concept if it carries neither */
const headOf = e => {
  const km = e.match(/^<h4[^>]*>Correct Answer: [\s\S]*?<\/h4>/);
  if (!km) return '';
  let i = e.indexOf(WHY);
  if (i < 0) i = e.indexOf(OLDWHY);
  if (i < 0) i = e.indexOf(KCOPEN);
  return e.slice(km[0].length, i);
};
function fbParts(e) {
  const out = {};
  for (const m of e.matchAll(/<p><strong>([ABCD])\. ([\s\S]*?):<\/strong>([\s\S]*?)<\/p>/g)) out[m[1]] = { head: m[2], body: m[3] };
  return out;
}
const allText = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const round = (x, d) => Number(x.toFixed(d));
const count = (s, re) => (s.match(re) || []).length;

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
  t = t.replace(/[Ωω]/g, 'ohm').replace(/[αΑ]/g, 'alpha')
       .replace(/[βΒ]/g, 'beta').replace(/[γΓ]/g, 'gamma').replace(/λ/g, 'lambda')
       .replace(/μ/g, 'mu').replace(/[Δδ]/g, 'delta')
       .replace(/π/g, 'pi').replace(/ρ/g, 'rho').replace(/θ/g, 'theta')
       .replace(/[σΣ]/g, 'sigma').replace(/τ/g, 'tau').replace(/ε/g, 'epsilon')
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
   its stems and 5 of its option texts have since been replaced */
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
  let exact = 0;
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
  ok(exact === 60, 'all 60 signatures matched without relaxing whitespace (got ' + exact + ')');
  const loosened = QS.filter(Q => BANK.filter(q => recOf(srcOf(q), canon) === sigOf(SIG.sigs[Q], canon)).length !== 1);
  ok(JSON.stringify(loosened) === JSON.stringify(idmap.verification.matched_only_ignoring_whitespace),
    'none needed whitespace relaxation, as the id map records');
}
ok(new Set(Object.values(MAP)).size === 60, 'the 60 ids are distinct');
ok(QS.every(Q => MAP[Q] === 'phys-' + (120 + Number(Q.slice(1)))), 'the map resolved to phys-121..phys-180');
{
  const earlier = new Set([...Object.values(B1), ...Object.values(B2)]);
  ok(earlier.size === 120, 'the two earlier blocks cover 120 distinct ids');
  ok(QS.every(Q => !earlier.has(MAP[Q])), 'none of the 60 ids appears in either previously reviewed physics block');
  ok(idmap.verification.overlap_with_previously_reviewed_blocks === 0, 'and the id map records zero overlap');
}
/* the review's Q56 mapping caution: same numbers as the earlier block's Q41,
   different record */
ok(MAP.Q56 === 'phys-176' && B2.Q41 === 'phys-101',
  "Q56 is phys-176 and the earlier block's Q41 is phys-101: different records");
ok(JSON.stringify(rec('Q56').options) !== JSON.stringify(BANK.find(r => r.id === 'phys-101').options),
  'and their option sets differ, as the review warns');
ok(untouched.physics['phys-101'] === hash(BANK.find(r => r.id === 'phys-101')),
  "the earlier block's Q41 was not touched in this pass");

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
  ok(JSON.stringify(t) === JSON.stringify(idmap.asserted_tally), 'the key tally is A=8, B=29, C=21, D=2');
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
    if (headOf(a.explanation) !== headOf(b.explanation)) heads.push(Q);
  }
  ok(JSON.stringify(stems) === JSON.stringify(idmap.scope.stem_changes), '34 stems changed, exactly the declared list (got ' + stems.length + ')');
  ok(JSON.stringify(heads) === JSON.stringify(idmap.scope.main_explanation_changes), '20 main explanations changed, exactly the declared list (got ' + heads.length + ')');
  ok(JSON.stringify(kcs) === JSON.stringify(idmap.scope.key_concept_changes), '33 Key Concepts changed, exactly the declared list (got ' + kcs.length + ')');
  ok(JSON.stringify(opts) === JSON.stringify(['Q19', 'Q39', 'Q48']), 'option texts changed in exactly Q19, Q39 and Q48');
  ok(stems.length === 34 && heads.length === 20 && kcs.length === 33, 'the three counts are 34, 20 and 33');
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
  ok(slots === 5, 'exactly 5 option slots changed (got ' + slots + ')');
  ok(Object.keys(idmap.scope.option_text_changes).length === 5, 'and the id map declares 5');
}
for (const Q of idmap.scope.core_content_kept) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question, Q + ': core-kept stem unchanged');
  ok(JSON.stringify(a.options) === JSON.stringify(b.options), Q + ': core-kept options unchanged');
  ok(kcOf(a.explanation) === kcOf(b.explanation), Q + ': core-kept Key Concept unchanged');
  ok(headOf(a.explanation) === headOf(b.explanation), Q + ': core-kept main explanation unchanged');
  ok(a.explanation !== b.explanation, Q + ': but its explanation did change, because feedback was added');
}
ok(idmap.scope.core_content_kept.length === 13, 'thirteen items are core-content-kept');
for (const Q of idmap.scope.key_concept_only_changes) {
  const a = pre(Q), b = rec(Q);
  ok(a.question === b.question && headOf(a.explanation) === headOf(b.explanation),
    Q + ': Key-Concept-only item kept its stem and main explanation');
  ok(kcOf(a.explanation) !== kcOf(b.explanation), Q + ': and its Key Concept did change');
}
ok(JSON.stringify(idmap.scope.key_concept_only_changes) === JSON.stringify(['Q14', 'Q53', 'Q55']),
  'the Key-Concept-only items are Q14, Q53 and Q55');
/* the inventory closes: the items with no stem, main, Key Concept or option
   change are exactly the thirteen core-content-kept ones */
{
  const touched = new Set([...idmap.scope.stem_changes, ...idmap.scope.main_explanation_changes,
    ...idmap.scope.key_concept_changes, 'Q19', 'Q39', 'Q48']);
  ok(JSON.stringify(QS.filter(Q => !touched.has(Q))) === JSON.stringify(idmap.scope.core_content_kept),
    "the review's own inventory closes against its core-content-kept list");
}

/* ------------------------------------------------------------------ */
section('4. structure and heading agreement');

let fbTotal = 0, divTotal = 0;
for (const Q of QS) {
  const r = rec(Q), e = r.explanation;
  ok(count(e, /<h4[^>]*>Correct Answer:/g) === 1, Q + ': exactly one keyed heading');
  ok(keyedOf(e) === r.options[r.correct], Q + ': the keyed heading reproduces the keyed option');
  ok(!/^[ABCD][.)] /.test(keyedOf(e)), Q + ": the keyed heading keeps this block's unlettered style");
  ok(count(e, /<p class='exp-key'>Key Concept: /g) === 1, Q + ': exactly one Key Concept');
  ok(count(e, /Why the other choices are wrong/g) === 1, Q + ': exactly one feedback heading');
  ok(e.indexOf(OLDWHY) < 0, Q + ': the old <ul> feedback heading is gone');
  ok(!/<ul>|<li>|<ol>/.test(e), Q + ': no list markup remains');
  const parts = fbParts(e);
  const letters = Object.keys(parts);
  fbTotal += letters.length;
  divTotal += count(e, /<div/g);
  ok(letters.length === 3, Q + ': three distractor paragraphs (got ' + letters.length + ')');
  ok(!letters.includes(L[r.correct]), Q + ': no feedback paragraph for the keyed letter');
  ok(JSON.stringify(letters) === JSON.stringify(L.split('').filter((_, j) => j !== r.correct)),
    Q + ': the three paragraphs run in option order');
  for (const letter of letters) {
    ok(parts[letter].head === r.options[L.indexOf(letter)], Q + ' ' + letter + ': the feedback heading reproduces its option text');
    ok(/^ \S/.test(parts[letter].body), Q + ' ' + letter + ': the body opens with the single leading space of the bank convention');
    ok(parts[letter].body.length > 40, Q + ' ' + letter + ': the body is a real explanation, not a stub');
  }
  ok(new Set(letters.map(x => parts[x].body)).size === 3, Q + ': the three bodies are distinct');
  const iW = e.indexOf(WHY), iK = e.indexOf(KCOPEN);
  ok(iW > 0 && iW < iK, Q + ': the feedback sits after the main explanation and before the Key Concept');
  ok(!/<table/.test(e), Q + ': no table was introduced');
  ok(!/Key Educational Points/i.test(e) && !/Bottom Line/i.test(e), Q + ': no generic educational block was added');
  ok(!/<p><p>|<\/p><\/p>/.test(e), Q + ': no doubled paragraph tags');
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'div', 'sub', 'sup']) {
    const o = count(e, new RegExp('<' + t + '[ >]', 'g'));
    const c = count(e, new RegExp('</' + t + '>', 'g'));
    ok(o === c, Q + ': <' + t + '> tags balance (' + o + '/' + c + ')');
  }
  const txt = allText(r);
  ok(!/—/.test(txt), Q + ': no em dash');
  ok(!/[‘’“”]/.test(txt), Q + ': no curly quote');
  ok(!/�/.test(txt), Q + ': no replacement character');
  ok(count(txt, /&[a-zA-Z#][a-zA-Z0-9#]*;/g) <= count(allText(pre(Q)), /&[a-zA-Z#][a-zA-Z0-9#]*;/g),
    Q + ': no HTML entity was introduced');
  ok(!/\n/.test(r.question), Q + ': the stem has no bare newline, which would collapse on screen');
  ok(!/Reviewer references|Not student-facing text|MAJOR QUESTION REWRITE|Replacement stem|Final feedback below/.test(txt),
    Q + ': no reviewer label, source note or instruction leaked into student text');
  ok(!/S1[0-4]\b|\bS[1-9]\b/.test(txt), Q + ': no reviewer source tag leaked into student text');
}
ok(fbTotal === 180, '180 distractor paragraphs across the block (got ' + fbTotal + ')');
ok(divTotal === idmap.presentation.divs_after, 'the block holds ' + idmap.presentation.divs_after + ' divs (got ' + divTotal + ')');
/* content after the Key Concept: Q17 only, exactly as stored */
for (const Q of QS) {
  const want = Q === 'Q17' ? '<div style="text-align:center;margin:12px 0"></div>' : '';
  ok(tailOf(rec(Q).explanation) === want, Q + ': the span after the Key Concept is as declared');
  ok(tailOf(pre(Q).explanation) === want, Q + ': and it was already that before this pass');
}

/* ------------------------------------------------------------------ */
section('4b. the feedback that already existed in Q56..Q60');

{
  let had = [];
  for (const Q of QS) if (/Why the other/i.test(pre(Q).explanation)) had.push(Q);
  ok(JSON.stringify(had) === JSON.stringify(idmap.scope.existing_feedback_items),
    'exactly Q56..Q60 carried feedback before this pass (got ' + had.join(', ') + ')');
  for (const Q of QS) {
    if (had.includes(Q)) continue;
    ok(!/<p><strong>[ABCD]\. /.test(pre(Q).explanation), Q + ': carried no lettered feedback paragraph either');
  }
  ok(had.length === 5 && QS.length - had.length === 55, '55 items had none, so the 165 bodies added there duplicate nothing');
}
/* the stored <ul> block, reconstructed from the spec, really was what was stored */
for (const Q of idmap.scope.existing_feedback_items) {
  const spec = specOf(Q);
  ok(Array.isArray(spec.existingFb) && spec.existingFb.length === 3, Q + ': the spec records three stored bodies');
  const block = OLDWHY + '<ul>' + spec.existingFb.map(x => '<li>' + x[1] + ':' + x[2] + '</li>').join('') + '</ul>';
  ok(pre(Q).explanation.indexOf(block) >= 0, Q + ': the spec reproduces the stored <ul> feedback block byte for byte');
  {
    const e = pre(Q).explanation;
    const span = e.slice(e.indexOf(OLDWHY), e.indexOf(KCOPEN));
    ok(span === block, Q + ': and that block was the whole span between the main explanation and the Key Concept');
  }
}
/* retained bodies survive verbatim; replaced ones really changed */
for (const slot of idmap.scope.existing_feedback_bodies_retained) {
  const [Q, letter] = slot.split(' ');
  const spec = specOf(Q), r = rec(Q);
  const body = spec.existingFb.find(x => x[0] === letter)[2];
  ok(pre(Q).explanation.indexOf('<li>' + spec.existingFb.find(x => x[0] === letter)[1] + ':' + body + '</li>') >= 0,
    slot + ': that body really was stored before (non-vacuity)');
  ok(fbParts(r.explanation)[letter].body === body, slot + ': the retained body is carried over verbatim');
}
ok(idmap.scope.existing_feedback_bodies_retained.length === 7, 'seven bodies were retained');
for (const slot of idmap.scope.existing_feedback_bodies_replaced) {
  const [Q, letter] = slot.split(' ');
  const spec = specOf(Q), r = rec(Q);
  const old = spec.existingFb.find(x => x[0] === letter)[2];
  ok(pre(Q).explanation.indexOf(old) >= 0, slot + ': the old body really was stored before (non-vacuity)');
  ok(r.explanation.indexOf(old) < 0, slot + ': the old body is gone');
  ok(fbParts(r.explanation)[letter].body !== old, slot + ': and the stored body is the replacement');
}
ok(idmap.scope.existing_feedback_bodies_replaced.length === 8, 'eight bodies were replaced');
ok(idmap.scope.existing_feedback_bodies_retained.length + idmap.scope.existing_feedback_bodies_replaced.length === 15,
  'retained plus replaced accounts for all fifteen bodies that existed');
/* the retained markup the plain-text review flattened is still markup */
ok(fbParts(rec('Q58').explanation).D.body.indexOf('1/2&rho;v<sup>2</sup>') >= 0,
  "Q58 D keeps its &rho; and <sup> markup, which the review's plain text flattened");
ok(fbParts(rec('Q59').explanation).D.body.indexOf('2 x 10 x 5 = 100') >= 0, 'Q59 D keeps its stored wording');
/* the exp-diagram divs of the items whose main explanation the review retains */
for (const Q of ['Q56', 'Q58', 'Q59']) {
  ok(/<div class='exp-diagram'>/.test(rec(Q).explanation), Q + ": keeps its stored 'exp-diagram' worked formula");
  ok(headOf(rec(Q).explanation) === headOf(pre(Q).explanation).replace(/<p><strong>Why the other[\s\S]*$/, ''),
    Q + ': and its main explanation is otherwise exactly as stored');
}
ok(!/<div/.test(rec('Q57').explanation),
  "Q57's main explanation was one of the 20 replaced, and the replacement carries its formula inline");
ok(idmap.deviations.some(d => /exp-diagram/.test(d)), 'the id map reports that div change as a deviation');
ok(idmap.deviations.some(d => /Q17 stores an EMPTY styled div/.test(d)), "and reports Q17's empty div");
ok(idmap.deviations.length === 3, 'three deviations are recorded');

/* ------------------------------------------------------------------ */
section('5. notation the review asked to inspect rather than assume');

/* Q47, Q52 and Q53 were already correct markup that the export flattened */
ok(/A₀\/2<sup>n<\/sup>/.test(kcOf(rec('Q47').explanation)), "Q47 keeps its stored A0/2^n markup");
ok(kcOf(rec('Q47').explanation) === kcOf(pre('Q47').explanation), 'Q47: its Key Concept was not touched');
ok(/\(1\/2\)<sup>n<\/sup>/.test(kcOf(rec('Q52').explanation)), 'Q52 keeps its stored (1/2)^n markup');
ok(/\(1\/2\)<sup>3<\/sup>/.test(rec('Q52').explanation), 'and its (1/2)^3 in the worked line');
ok(kcOf(rec('Q52').explanation) === kcOf(pre('Q52').explanation), 'Q52: its Key Concept was not touched');
ok(/<sup>235<\/sup><sub>92<\/sub>U/.test(rec('Q53').question), 'Q53 keeps its stored nuclide notation');
ok(/<sup>141<\/sup><sub>56<\/sub>Ba/.test(rec('Q53').question) && /<sup>92<\/sup><sub>36<\/sub>Kr/.test(rec('Q53').question),
  'including both fission products');
ok(rec('Q53').question === pre('Q53').question, 'Q53: its stem was not touched, so that notation was left alone');
/* Q48 was the one genuine stored notation defect */
ok(pre('Q48').options.join(' ').indexOf('Α particles') >= 0, 'Q48 really stored an UPPERCASE alpha before (non-vacuity)');
ok(/[ΑΒΓ]/.test(allText(pre('Q48'))), 'and uppercase Greek particle symbols in its explanation too');
ok(rec('Q48').options[0] === 'α particles' && rec('Q48').options[1] === 'β particles' && rec('Q48').options[2] === 'γ rays',
  'Q48 now carries the lower-case particle symbols');
for (const Q of QS) ok(!/[ΑΒΓ]/.test(allText(rec(Q))), Q + ': no uppercase Greek particle symbol survives');
/* new text uses <sup>/<sub>; the Unicode forms that remain are all in spans
   the review retains */
{
  const uni = QS.filter(Q => /[₀-₉⁰¹²³⁴-⁹]/.test(allText(rec(Q))));
  ok(JSON.stringify(uni) === JSON.stringify(['Q1', 'Q2', 'Q7', 'Q8', 'Q11', 'Q13', 'Q16', 'Q22', 'Q47', 'Q55']),
    'ten items still show a Unicode exponent or index: ' + uni.join(', '));
  for (const Q of uni) {
    const r = rec(Q), a = pre(Q);
    const newText = r.question + '\u0000' + r.options.join('\u0000') + '\u0000' +
      Object.values(fbParts(r.explanation)).map(p => p.body).join('\u0000') + '\u0000' +
      (idmap.scope.main_explanation_changes.includes(Q) ? headOf(r.explanation) : '') + '\u0000' +
      (idmap.scope.key_concept_changes.includes(Q) ? kcOf(r.explanation) : '');
    const stemIsNew = idmap.scope.stem_changes.includes(Q);
    const checkText = stemIsNew ? newText : newText.slice(r.question.length);
    ok(!/[₀-₉]/.test(checkText), Q + ': no Unicode index in text this pass wrote');
    void a;
  }
}
for (const Q of QS) {
  ok(!/<sup>-/.test(allText(rec(Q))), Q + ': no ASCII hyphen inside a superscript, where the bank uses U+2212');
  ok(!/<sup><\/sup>|<sub><\/sub>/.test(rec(Q).explanation), Q + ': no empty exponent or index element');
}
ok(count(rec('Q5').question, /<sup>/g) === 2, "Q5's new stem renders both its exponents as markup");
ok(/0\.02 m<sup>2<\/sup>/.test(rec('Q5').question), 'including the plate area in square metres');
ok(/8\.85 × 10<sup>−12<\/sup> F\/m/.test(rec('Q5').question), 'and the permittivity with a U+2212 minus');

/* ------------------------------------------------------------------ */
section('6. the named content repairs, each paired with a non-vacuity check');

function repaired(Q, gone, present, label) {
  const a = allText(pre(Q)), b = allText(rec(Q));
  if (gone !== null) {
    ok(a.indexOf(gone) >= 0, Q + ': the old wording ' + JSON.stringify(gone.slice(0, 44)) + ' really was there before (non-vacuity)');
    ok(b.indexOf(gone) < 0, Q + ': ' + label + ' - the old wording is gone');
  }
  if (present !== null) ok(b.indexOf(present) >= 0, Q + ': ' + label + ' - the replacement wording is present');
}

repaired('Q2', 'F = kq<sub>1</sub>q<sub>2</sub>/r²', 'k|q<sub>1</sub>q<sub>2</sub>|',
  'a force magnitude uses absolute values');
ok(/attractive because the charges have opposite signs/.test(rec('Q2').explanation),
  'Q2: and the opposite signs are explained as attraction, not a negative magnitude');
repaired('Q3', 'What is the electric field at a distance of 0.5 m', 'magnitude of the electric field',
  'the stem asks for field magnitude');
ok(/points radially away from this positive charge/.test(rec('Q3').explanation), 'Q3: and the direction is stated separately');
repaired('Q5', 'A parallel plate capacitor has plates of area', 'Neglecting edge effects',
  'the vacuum and edge-effect assumptions are in the stem');
ok(/vacuum between plates/.test(rec('Q5').question), 'Q5: the vacuum dielectric is stated');
repaired('Q9', 'In a series circuit with a 12 V battery', 'ideal 12 V battery',
  'an ideal battery removes the unspecified internal resistance');
repaired('Q10', 'How much work is done in moving a charge', 'increase in its electric potential energy',
  'the question tests the potential-energy increase explicitly');
ok(/does −120 J of work/.test(rec('Q10').explanation), 'Q10: and the field work is given the opposite sign');
ok(/Work done by the electric field is −ΔU/.test(kcOf(rec('Q10').explanation)), 'Q10: the Key Concept states the sign relation');
repaired('Q13', 'What is the resistance of the filament?', 'at normal operating temperature',
  'the filament is specified at its rated operating condition');
ok(/cold resistance can differ/.test(kcOf(rec('Q13').explanation)), 'Q13: and the Key Concept warns about the cold resistance');
repaired('Q14', 'Combine series resistances first, then parallel, step by step.', 'Identify which components actually form',
  'the Key Concept no longer implies a compulsory series-first reduction');
repaired('Q16', 'A simple pendulum has a length of 1 m.', 'oscillates through a small angle',
  'the small-angle condition is in the stem');
ok(/small-angle oscillations/.test(kcOf(rec('Q16').explanation)), 'Q16: and in the Key Concept');
repaired('Q17', 'This is the speed of sound in air at room temperature.', 'approximately the speed of sound in air at ordinary temperatures',
  '340 m/s is no longer an exact universal value');
repaired('Q18', 'As the ambulance approaches you at 34 m/s', 'stationary relative to still air',
  'a stationary observer and still air are specified');
ok(/directly toward an observer/.test(rec('Q18').question), 'Q18: and the motion is directly toward the observer');
repaired('Q19', 'The driving frequency equals the natural frequency', 'The driving frequency is close to the natural frequency',
  'exact-resonance equality becomes proximity for light damping');
ok(rec('Q19').correct === 1 && keyedOf(rec('Q19').explanation) === 'The driving frequency is close to the natural frequency',
  'Q19: the key is still B and its keyed heading was re-synchronized to the new option B');
ok(/lightly damped/.test(rec('Q19').question), 'Q19: the stem states light damping');
ok(/Damping limits the amplitude/.test(kcOf(rec('Q19').explanation)), 'Q19: the Key Concept says damping limits the amplitude');
repaired('Q20', 'travel in opposite directions in a string', 'their transverse displacements in the same plane',
  'the standard standing-wave setup is explicit');
repaired('Q23', 'the maximum velocity occurs at', 'the maximum speed occurs at',
  'maximum speed replaces a potentially signed velocity');
repaired('Q24', 'A string under tension vibrates in its second harmonic.', 'fixed at both ends',
  'both ends are fixed, as the node count requires');
repaired('Q25', 'going into a less dense medium', 'lower refractive index',
  'refractive index replaces unqualified material density');
ok(/measured from the normal/.test(kcOf(rec('Q25').explanation)), 'Q25: and both angles are referred to the normal');
repaired('Q26', 'Where is the image formed?', 'thin converging lens',
  'a thin lens and a real object are specified');
ok(/distance from the lens to the image/.test(rec('Q26').question), 'Q26: the stem asks for a distance without naming the side');
repaired('Q28', 'A myopic (near-sighted) person needs', 'accommodation relaxed',
  'distance vision in myopia without astigmatism');
ok(/no astigmatism/.test(rec('Q28').question), 'Q28: and astigmatism is excluded in the stem');
repaired('Q30', 'Shorter wavelengths (violet) are slowed more and refracted more', 'usually bent more than red light',
  'the violet/red statement is scoped to ordinary glass in the visible range');
ok(/its wavelength changes while it travels in the glass/.test(rec('Q30').explanation),
  'Q30: option D is explained without claiming wavelength never changes on refraction');
repaired('Q31', 'Diverging lenses always produce virtual, upright, diminished images.', 'For a real object in front of a single thin diverging lens',
  'the unconditional always claim is gone');
repaired('Q32', 'The power of a lens with focal length 0.25 m', 'focal length +0.25 m',
  'the positive focal length is explicit');
repaired('Q33', 'It can only be explained by the wave model of light.', 'This demonstrates wave behavior',
  'the exclusive only-wave-model claim is gone');
repaired('Q34', 'The visible spectrum extends from about', 'The limits are not sharp',
  '400 and 700 nm are not turned into exact perceptual cutoffs');
repaired('Q35', 'An AC voltage source has a peak voltage', 'A sinusoidal AC voltage has a peak value',
  'the peak-to-RMS factor is tied to a sinusoid');
ok(/Other waveforms can have different peak-to-RMS relationships/.test(kcOf(rec('Q35').explanation)),
  'Q35: and the Key Concept says other waveforms differ');
repaired('Q36', 'what is the force on the wire?', 'magnitude of the magnetic force on that length',
  'a straight wire in a uniform field, and a magnitude');
ok(/lies entirely in a uniform magnetic field/.test(rec('Q36').question), 'Q36: the field covers the full stated length');
repaired('Q37', 'no change in flux = no EMF', 'no emf by this induction mechanism',
  'zero flux change no longer rules out every possible source of emf');
ok(/between the field and the normal to the loop/.test(rec('Q37').explanation), 'Q37: the flux angle is defined');
ok(/average induced emf/.test(kcOf(rec('Q37').explanation)), 'Q37: and average emf is distinguished from instantaneous');
repaired('Q38', 'What is the magnetic force on it?', 'magnitude of the magnetic force on it',
  'the question asks for a magnitude');
ok(/F = \|q\|vBsinθ/.test(kcOf(rec('Q38').explanation)), 'Q38: the Key Concept uses |q|');
ok(/\+1\.6 × 10<sup>−19<\/sup> C/.test(rec('Q38').question), 'Q38: and the proton charge carries its sign');
repaired('Q39', 'Strong attraction to magnetic fields and permanent magnetization', 'Strong magnetization in an applied field, with the ability to retain magnetization',
  'permanent magnetization is no longer compulsory');
ok(rec('Q39').correct === 2 && keyedOf(rec('Q39').explanation) === 'Strong magnetization in an applied field, with the ability to retain magnetization',
  'Q39: the key is still C and its keyed heading was re-synchronized');
ok(/An unmagnetized piece can still be ferromagnetic/.test(rec('Q39').explanation),
  'Q39: and the explanation says an unmagnetized specimen is still ferromagnetic');
repaired('Q39', 'Ferro = strong attraction + permanent', 'Ferromagnets respond strongly and can retain magnetization',
  'the mnemonic Key Concept is replaced');
repaired('Q40', 'In a purely capacitive AC circuit, the current:', 'For an ideal capacitor connected to a sinusoidal AC voltage source in steady operation',
  'an ideal capacitor with sinusoidal drive in steady operation');
repaired('Q41', 'The capacitive reactance of a 10 μF capacitor at a frequency', 'ideal 10 μF capacitor at a sinusoidal AC frequency',
  'an ideal capacitor and sinusoidal AC');
repaired('Q42', 'What is the natural oscillation frequency? (π² ≈ 10)', 'Use π ≈ 3.14',
  'the unnecessary squared-pi instruction is replaced');
ok(/negligible resistance/.test(rec('Q42').question), 'Q42: and the ideal LC circuit is stated');
repaired('Q43', 'In an RLC series circuit, at resonance:', 'driven by a sinusoidal voltage of fixed amplitude',
  'sinusoidal steady operation with nonzero R and a fixed source amplitude');
ok(/R > 0/.test(rec('Q43').question), 'Q43: R is stated to be nonzero');
ok(/maximal for a fixed source voltage amplitude/.test(kcOf(rec('Q43').explanation)),
  'Q43: the current maximum is qualified by the fixed voltage amplitude');
repaired('Q44', 'A magnetic flux through a coil of 200 turns', 'The magnetic flux through each turn',
  'flux per turn and an average emf magnitude');
ok(/not total flux linkage/.test(kcOf(rec('Q44').explanation)), 'Q44: the Key Concept says it is flux per turn');
repaired('Q46', 'In α (α) decay, the parent nucleus emits:', 'In alpha (α) decay, the parent nucleus emits:',
  'the duplicated alpha wording is gone');
repaired('Q47', 'A radioactive sample has a half-life of 6 hours.', 'activity of this isotope after 18 hours',
  'the activity is that of one isotope, not an unspecified total');
repaired('Q48', 'Which type of radiation has the highest penetrating power?', 'consists of high-energy photons',
  'the major rewrite tests recognition of penetrating gamma photons');
ok(rec('Q48').correct === 2 && keyedOf(rec('Q48').explanation) === 'γ rays',
  'Q48: the key is still C and its keyed heading was re-synchronized to the lower-case gamma');
ok(/thick lead or concrete/.test(rec('Q48').question), 'Q48: the stem names the usual shielding');
ok(/Penetration depends on photon energy and the material/.test(rec('Q48').explanation),
  'Q48: and the explanation refuses a universal penetration ranking');
ok(/they cannot be ranked against all gamma rays without further information/.test(fbParts(rec('Q48').explanation).D.body),
  "Q48: option D's feedback says protons cannot be ranked against all gamma rays");
repaired('Q48', 'Penetrating power: γ > β > α. Ionizing power: α > β > γ.', 'Shielding reduces their intensity',
  'the universal ranking Key Concept is replaced');
repaired('Q50', 'making it the most stable nucleus', 'nickel-62 has a slightly higher value',
  'Fe-56 is near, not at, the binding-energy-per-nucleon maximum');
repaired('Q50', 'Iron-56 is at the peak of the binding energy curve', 'Binding energy per nucleon peaks in the iron-nickel region',
  'the Key Concept names the iron-nickel region and Ni-62');
repaired('Q51', 'They have the same chemical properties.', 'very similar, although their masses and nuclear stability differ',
  'isotope effects are allowed for');
ok(/mass-related isotope effects can cause small differences/.test(fbParts(rec('Q51').explanation).D.body),
  "Q51: option D's feedback mentions mass-related isotope effects");
repaired('Q52', 'What fraction of the original sample remains after 30 days?', 'original nuclei remains undecayed',
  'the question asks about original undecayed nuclei');
repaired('Q53', 'In nuclear reactions, both mass number (A) and atomic number (Z) are conserved.', 'Balance nucleon number and electric charge',
  'nucleon number and charge balance replaces a universal atomic-number claim');
ok(/236 nucleons become 141 \+ 92 \+ 3/.test(kcOf(rec('Q53').explanation)), 'Q53: and the Key Concept works the balance through');
repaired('Q54', "This 'missing' mass is converted to binding energy", 'The bound state has lower rest energy by Δmc<sup>2</sup>',
  'the mass defect is the lower rest energy of a bound nucleus');
repaired('Q54', "Mass defect Δm → binding energy E = Δmc² (Einstein's mass-energy equivalence).", 'E<sub>b</sub> = Δmc<sup>2</sup>',
  'the Key Concept defines the binding energy from the mass difference');
repaired('Q55', 'Stellar energy comes from fusion; light nuclei combine releasing energy', 'The Sun is powered mainly by hydrogen fusion into helium',
  'the Key Concept is scoped to hydrogen fusion in the Sun');
repaired('Q56', 'This incorrectly squares the area ratio.', 'Squaring that ratio would give 32 m/s',
  "option D's false arithmetic is corrected");
ok(/steady incompressible flow with no leaks/.test(kcOf(rec('Q56').explanation)), 'Q56: the continuity assumptions are stated');
ok(/average speed in the wider section/.test(rec('Q56').question), 'Q56: and the stem uses section-average speeds');
repaired('Q57', 'shower curtains blow inward', 'is constant along a streamline',
  'the unsupported shower-curtain shortcut is gone and the streamline condition is stated');
repaired('Q57', 'There is no such two-stage behavior in Bernoulli flow through a constriction.', 'not a compulsory two-stage process',
  "option D's feedback compares two locations rather than denying a process");
ok(/no pump or turbine/.test(rec('Q57').question), 'Q57: the stem excludes added or extracted mechanical energy');
ok(/not a rule for every pair of points in every moving fluid/.test(rec('Q57').explanation),
  'Q57: and the explanation refuses the universal speed/pressure claim');
repaired('Q58', 'This subtracts only the velocity difference (not the kinetic energy difference).', '= 4000 Pa',
  "option B's feedback distinguishes the two operations and gives both results");
ok(/½\(1000\)\(3 − 1\)<sup>2<\/sup>/.test(fbParts(rec('Q58').explanation).B.body),
  'Q58 B: and shows the squared difference that would give 2000 Pa');
ok(/not the square of their difference/.test(kcOf(rec('Q58').explanation)), 'Q58: the Key Concept names the right operation');
repaired('Q59', 'This uses v = &radic;(gh) instead of &radic;(2gh), forgetting the factor of 2.', '25/20 = 1.25 m',
  "option A no longer attributes 5 m/s to sqrt(gh), which is about 7.1 m/s");
repaired('Q59', 'This uses v = 2gh instead of &radic;(2gh), forgetting the square root.', 'The product gh is 50 m<sup>2</sup>/s<sup>2</sup>, which is not a speed',
  'option C no longer attributes 50 m/s to 2gh');
ok(/same atmospheric pressure as the surface/.test(rec('Q59').question), 'Q59: equal atmospheric pressure is stated');
ok(/Neglect frictional losses/.test(rec('Q59').question), 'Q59: and negligible losses');
repaired('Q60', 'Faster air = lower pressure, so pressure is lower above, not higher.', 'the faster upper flow instead has lower static pressure',
  "option A's feedback is restated within the model");
repaired('Q60', 'The air below actually moves slower. The wing shape ensures faster flow on top.', 'The stem specifies faster flow above, not below',
  "option D's feedback no longer asserts what the air below does");
ok(/turns airflow downward, consistent with momentum conservation/.test(rec('Q60').explanation),
  'Q60: the explanation is consistent with downward air deflection');
ok(/require air parcels above and below the wing to meet at the trailing edge/.test(rec('Q60').explanation),
  'Q60: and explicitly rejects equal transit time');
ok(/simplified model of steady airflow/.test(rec('Q60').question), 'Q60: the stem states the low-speed model');

/* ------------------------------------------------------------------ */
section("7. the review's numerical results, recomputed here");

ok(round(2 / 4, 6) === 0.5, 'Q1: twice the mass and twice the radius give g/2');
ok(round(9e9 * 3e-6 * 6e-6 / 0.09, 6) === 1.8, 'Q2: the force magnitude is 1.8 N');
ok(round(9e9 * 3e-6 * 6e-6, 6) === 0.162, 'Q2: and the numerator is 0.162 N.m2, as option A\'s feedback says');
ok(round(9e9 * 2e-6 / 0.25, 6) === 72000, 'Q3: the field is 72,000 N/C');
ok(round(9e9 * 2e-6 / 1, 6) === 18000, 'Q3: and 18,000 N/C is the field at 1 m, as option A\'s feedback says');
ok(round(1 / (1 / 2 + 1 / 3 + 1 / 6), 6) === 1, 'Q4: the parallel equivalent is 1 ohm');
ok(round((2 + 3 + 6), 6) === 11, 'Q4: and 11 ohm is the series total, as option D\'s feedback says');
ok(round(8.85e-12 * 0.02 / 0.001, 13) === 1.77e-10, 'Q5: the capacitance is 1.77 x 10^-10 F');
ok(round(0.02 / 0.001, 6) === 20, 'Q5: and the geometric factor is 20 m, not 100 m');
ok(round(1 / (1 / 4 + 1 / 6), 6) === 2.4, 'Q6: the series equivalent is 2.4 uF');
ok(round(1 / 4 + 1 / 6, 6) === round(5 / 12, 6), 'Q6: and the reciprocal sum is 5/12 per uF');
ok(round(9 * 10, 6) === 90, 'Q7: the power is 90 W');
ok(round(Math.sqrt(300 / 10), 2) === 5.48, 'Q7: and 300 W would need about 5.48 A');
ok(round(1.7e-8 * 10 / 1e-6, 6) === 0.17, 'Q8: the resistance is 0.17 ohm');
ok(round(1.7e-8 * 1 / 1e-6, 6) === 0.017, 'Q8: and 1 m of the same wire gives 0.017 ohm');
ok(round(12 * 6 / 9, 6) === 8, 'Q9: the 6 ohm resistor takes 8 V');
ok(round(12 * 3 / 9, 6) === 4, 'Q9: and the 3 ohm resistor takes 4 V');
ok(round(5 * 24, 6) === 120, 'Q10: the potential-energy increase is +120 J');
ok(round(0.5 * 100e-6 * 2500, 6) === 0.125, 'Q11: the stored energy is 0.125 J');
ok(round(100e-6 * 2500, 6) === 0.25, 'Q11: and CV^2 without the half is 0.25 J');
ok(round(120 * 120 / 60, 6) === 240, 'Q13: the hot filament resistance is 240 ohm');
ok(round(1 / (1 / 16 + 1 / 16), 6) === 8, 'Q14: two 16 ohm branches in parallel give 8 ohm');
ok(round(1 / (4 / 8), 6) === 2, 'Q14: and four 8 ohm resistors all in parallel would give 2 ohm');
ok(round(1 / 0.4, 6) === 2.5, 'Q15: the frequency is 2.5 Hz');
ok(round(1 / 0.25, 6) === 4, 'Q15: and 4 Hz would need a 0.25 s period');
ok(round(2 * Math.PI * Math.sqrt(1 / 10), 3) === 1.987, 'Q16: the period is about 2 s');
ok(round(500 * 0.68, 6) === 340, 'Q17: the wave speed is 340 m/s');
ok(round(500 / 0.68, 0) === 735, 'Q17: and 500/0.68 is about 735, which option D explains');
ok(round(800 * 340 / (340 - 34), 3) === 888.889, 'Q18: the observed frequency is 888.889 Hz, rounding to 889 Hz');
ok(round(800 * (340 + 34) / 340, 6) === 880, 'Q18: and the moving-observer formula would give 880 Hz');
ok(round(2 * Math.PI * Math.sqrt(0.25 / 10), 3) === 0.993, 'Q21: the shorter pendulum has a period of about 1 s');
ok(round(Math.pow(1.5 / 2, 2), 4) === 0.5625, 'Q21: and 1.5 s would need about 0.5625 m');
ok(Math.abs(260 - 256) === 4, 'Q22: the beat frequency is 4 Hz');
ok((260 + 256) / 2 === 258 && 260 + 256 === 516, 'Q22: and 258 Hz is their mean while 516 Hz is their sum');
ok(2 + 1 === 3, 'Q24: the second harmonic on a string fixed at both ends has 3 nodes');
ok(3 + 1 === 4, 'Q24: and 4 nodes would be the third harmonic');
ok(round(Math.asin(1.33 * 0.5) * 180 / Math.PI, 4) === 41.6823, 'Q25: the refraction angle is 41.6823 deg, rounding to 41.7');
ok(round(Math.asin(0.5 / 1.33) * 180 / Math.PI, 0) === 22, 'Q25: and the reverse case gives about 22 deg');
ok(round(Math.asin(1 / 1.33) * 180 / Math.PI, 1) === 48.8, 'Q25: and the water-to-air critical angle is about 48.8 deg');
ok(round(1 / (1 / 10 - 1 / 30), 6) === 15, 'Q26: the image distance is +15 cm');
ok(round(1 / (1 / 10 + 1 / 30), 6) === 7.5, 'Q26: and adding the reciprocals would give 7.5 cm');
ok(round(1 / (-1 / 30 - 1 / 15), 6) === -10, 'Q31: the image distance is -10 cm');
ok(round(1 / 0.25, 6) === 4, 'Q32: the optical power is +4 D');
ok(round(1 / 0.4, 6) === 2.5 && round(1 / 0.04, 6) === 25, 'Q32: and 2.5 D and 25 D belong to 0.4 m and 0.04 m');
ok(round(170 / Math.SQRT2, 3) === 120.208, 'Q35: the RMS voltage is 120.208 V, rounding to 120 V');
ok(round(170 * Math.SQRT2, 0) === 240, 'Q35: and multiplying by root two would give about 240 V');
ok(round(0.5 * 4 * 2, 6) === 4, 'Q36: the force is 4 N');
ok(round(0.5 * 4 * 1, 6) === 2, 'Q36: and a 1 m segment would feel 2 N');
ok(round(1.6e-19 * 2e6 * 0.5, 20) === 1.6e-13, 'Q38: the magnetic force is 1.6 x 10^-13 N');
ok(round(1.6e-19 * 2e6, 20) === 3.2e-13, 'Q38: and qv alone is 3.2 x 10^-13');
ok(round(1 / (2 * Math.PI * 50 * 10e-6), 2) === 318.31, 'Q41: the reactance is 318.31 ohm');
ok(round(1 / (2 * Math.PI * 50 * 100e-6), 1) === 31.8, 'Q41: and 100 uF would give 31.8 ohm');
ok(round(1 / (2 * Math.PI * 50 * 1e-6), 0) === 3183, 'Q41: while 1 uF would give about 3180 ohm');
ok(round(1 / (2 * Math.PI * Math.sqrt(0.1 * 10e-6)), 3) === 159.155, 'Q42: the LC frequency is 159.155 Hz');
ok(round(1 / (2 * 3.14 * Math.sqrt(0.1 * 10e-6)), 3) === 159.236, 'Q42: or 159.236 Hz with pi = 3.14, both rounding to 159');
ok(round(0.1 * 10e-6, 10) === 1e-6 && round(Math.sqrt(1e-6), 10) === 1e-3, 'Q42: LC is 10^-6 s2 and its root 10^-3 s');
ok(round(1 / (2 * 0.001), 6) === 500, 'Q42: and omitting pi would give 500 Hz');
ok(round(200 * 0.05 / 0.1, 6) === 100, 'Q44: the average induced emf magnitude is 100 V');
ok(round(100 * 0.05 / 0.1, 6) === 50, 'Q44: and 100 turns would give 50 V');
ok(round(800 / Math.pow(2, 3), 6) === 100, 'Q47: the activity after three half-lives is 100 Bq');
ok(round(800 / Math.pow(2, 4), 6) === 50, 'Q47: and 50 Bq would need four half-lives, or 24 hours');
ok(round(Math.pow(0.5, 3), 6) === 0.125, 'Q52: one-eighth of the original nuclei remain');
ok(round(Math.pow(0.5, 4), 6) === 0.0625, 'Q52: and one-sixteenth would need 40 days');
ok(235 + 1 - 141 - 92 === 3, 'Q53: three neutrons balance the nucleon count');
ok(92 === 56 + 36, 'Q53: and the proton numbers balance without an emitted proton');
ok(141 + 92 + 1 === 234 && 141 + 92 + 2 === 235, 'Q53: one or two neutrons would give 234 or 235 nucleons');
ok(round(0.04 * 2 / 0.01, 6) === 8, 'Q56: the narrow-section speed is 8 m/s');
ok(round(2 * Math.pow(0.04 / 0.01, 2), 6) === 32, 'Q56: squaring the area ratio gives 32 m/s, not 16');
ok(round(200000 - 0.5 * 1000 * (9 - 1), 6) === 196000, 'Q58: the pressure at B is 196,000 Pa');
ok(round(0.5 * 1000 * Math.pow(3 - 1, 2), 6) === 2000, 'Q58: the square of the speed difference gives a 2000 Pa drop');
ok(round(0.5 * 1000 * (9 - 1), 6) === 4000, 'Q58: while the difference of the squares gives 4000 Pa');
ok(round(Math.sqrt(2 * 10 * 5), 6) === 10, 'Q59: the exit speed is 10 m/s');
ok(round(Math.sqrt(10 * 5), 2) === 7.07, 'Q59: sqrt(gh) is about 7.07 m/s, not 5 m/s');
ok(round(10 * 5, 6) === 50 && round(2 * 10 * 5, 6) === 100, 'Q59: gh is 50 m2/s2 and 2gh is 100 m2/s2, neither a speed');
ok(round(25 / (2 * 10), 6) === 1.25, 'Q59: a 5 m/s exit speed would correspond to a 1.25 m depth');
for (const Q of QS) {
  const r = rec(Q);
  ok(r.correct >= 0 && r.correct <= 3, Q + ': the stored key index is in range');
}

/* ------------------------------------------------------------------ */
section('8. nothing outside the block moved');

ok(BANK.length === 280, 'the physics bank still holds 280 records');
/* The fourth and final physics review blocks (phys-181..phys-280) were pruned
   from this fixture as each was implemented, so the records this suite still
   guards are the 120 of the first two blocks. The rest are guarded by
   test/phys-review-b4.test.js and test/phys-review-b5.test.js against their
   own before-fixtures. */
{
  let checked = 0; const drifted = [];
  for (const q of BANK) {
    if (PACK.has(q.id)) continue;
    if (untouched.physics[q.id] === undefined) continue;
    checked++;
    if (untouched.physics[q.id] !== hash(q)) drifted.push(q.id);
  }
  ok(checked === 120, '120 physics records lie outside this block and every later one (got ' + checked + ')');
  ok(drifted.length === 0, 'none of them changed' + (drifted.length ? ': ' + drifted.join(', ') : ''));
  ok(Object.keys(untouched.physics).length === 120, 'the untouched fixture covers all 120');
  ok(BANK.filter(q => !PACK.has(q.id)).length === 220, 'and 220 records lie outside this block in all');
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
/* the other bank is outside this pass entirely */
{
  const other = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
  ok(other.biology.length === 629 && other.chemistry.length === 485,
    'biology and chemistry are untouched at 629 and 485 records');
}

/* ------------------------------------------------------------------ */
section('9. the coverage ledger and the id map record');

ok(idmap.coverage.physics_bank_size === 280, 'the ledger records a 280-record physics bank');
ok(idmap.coverage.reviewed_before_this_block === 120 && idmap.coverage.new_unique_ids_this_block === 60,
  'it records 120 previously reviewed and 60 new ids');
ok(idmap.coverage.reviewed_after_this_block === 180, 'so coverage becomes 180 of 280');
ok(idmap.coverage.still_unreviewed === 100, 'and 100 physics records remain unreviewed');
ok(idmap.coverage.reviewed_after_this_block + idmap.coverage.still_unreviewed === 280, 'the coverage sum closes');
ok(idmap.verification.key_changes === 0, 'the record states that no answer letter changed');
ok(idmap.verification.matched_exactly === 60, 'and that all 60 signatures matched exactly');
ok(idmap.notes.join(' ').indexOf('do not establish scientific accuracy') >= 0,
  'the id map states that these checks are not scientific approval');
ok(idmap.notes.join(' ').indexOf('No CSS was changed') >= 0,
  'and that no CSS was changed and no bank-wide normalization applied');
ok(idmap.presentation.distractor_paragraphs_before === 0 && idmap.presentation.distractor_paragraphs_after === 180,
  'the record states that lettered feedback went from 0 to 180 paragraphs');
ok(idmap.presentation.distractor_list_items_before === 15 && idmap.presentation.distractor_list_items_after === 0,
  'and that the 15 stored list items were converted');
ok(idmap.presentation.divs_before === 5 && idmap.presentation.divs_after === 4, 'and that divs went from 5 to 4');
ok(Object.keys(idmap.map).length === 60 && Object.keys(idmap.asserted_keys).length === 60,
  'the map and the asserted keys both cover 60 displays');
for (const Q of QS) ok(idmap.asserted_keys[Q] === L[rec(Q).correct], Q + ': the asserted key matches the stored key');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
