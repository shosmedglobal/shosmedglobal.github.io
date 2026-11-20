/* Result-verifying suite for the SHOSMED physics FINAL block.
 *
 * This checks the BANK, not the harness. Section 1 re-derives the id map from
 * the review's original signatures by full content match and proves the match
 * is unique bank-wide. Every "claim removed" assertion is paired with a
 * non-vacuity check that the claim really was in the before-fixture.
 *
 * The block is 41 displays, not 40: Q1 repeats the record approved as batch 4
 * Q34 and must stay byte-identical, while Q2..Q41 are the 40 physics records
 * left unreviewed. It also spans three structures: Q1's batch 4 form, the
 * educational-point plus Bottom Line form of Q2..Q11, and the Key Concept form
 * of Q12..Q41, which stored no feedback at all until this pass.
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
const NEWWHY = '<h4>Why the other choices are wrong:</h4>';
const EPOPEN = '<h4>Key Educational Points:</h4><ul>';
const KCOPEN = "<p class='exp-key'>Key Concept: ";
const BLOPEN = "<p class='exp-key'>Bottom Line: ";

const BANK = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions-physics.json'), 'utf8')).physics;
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-b5-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b5-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b5-untouched.json'), 'utf8'));
const SIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b5-signatures.json'), 'utf8'));
const EARLIER = [];
for (const f of ['phys-review-60-idmap.json', 'phys-review-b2-idmap.json', 'phys-review-b3-idmap.json', 'phys-review-b4-idmap.json'])
  EARLIER.push(JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/' + f), 'utf8')).map);
const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e'])
  for (const s of require(path.join(ROOT, 'scripts/phys-b5-edits-' + m + '.js'))) SPECS.push(s);
const specOf = Q => SPECS.find(s => s.q === Q);

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const KEEP = idmap.scope.keep_items;
const rec = Q => BANK.find(r => r.id === MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);
const bandOf = Q => { const n = Number(Q.slice(1)); return n === 1 ? 1 : (n <= 11 ? 2 : 3); };

function split(exp, band) {
  const km = exp.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!km) return null;
  const rest = exp.slice(km[0].length);
  if (band === 1) {
    /* Q1 keeps the batch 4 shape: a Key Concept, with its three bodies in a
       <ul> under the older feedback heading. */
    const OLD = '<p><strong>Why the other answers are wrong:</strong></p>';
    const iFb = rest.indexOf(OLD), iK = rest.indexOf(KCOPEN);
    const close = rest.indexOf('</p>', iK);
    return { band, keyed: km[1], head: rest.slice(0, iFb), fbBlock: rest.slice(iFb, iK),
      kc: rest.slice(iK + KCOPEN.length, close), tail: rest.slice(close + 4) };
  }
  if (band === 3) {
    const iK = rest.indexOf(KCOPEN);
    const iFb = rest.indexOf(NEWWHY);
    const close = rest.indexOf('</p>', iK);
    return { band, keyed: km[1], head: rest.slice(0, iFb >= 0 ? iFb : iK),
      fbBlock: iFb >= 0 ? rest.slice(iFb, iK) : '', kc: rest.slice(iK + KCOPEN.length, close), tail: rest.slice(close + 4) };
  }
  const iFb = rest.indexOf(NEWWHY), iEP = rest.indexOf(EPOPEN), iBL = rest.indexOf(BLOPEN);
  if (iEP < 0 || iBL < 0) return null;
  const epEnd = rest.indexOf('</ul>', iEP);
  const inner = rest.slice(iEP + EPOPEN.length, epEnd);
  const close = rest.indexOf('</p>', iBL);
  return { band, keyed: km[1], head: rest.slice(0, iFb >= 0 ? iFb : iEP),
    fbBlock: iFb >= 0 ? rest.slice(iFb, iEP) : '', points: inner.slice(4, -5).split('</li><li>'),
    bl: rest.slice(iBL + BLOPEN.length, close), tail: rest.slice(close + 4) };
}
function fbParts(e) {
  const out = {};
  for (const m of e.matchAll(/<strong>([ABCD])\. ([\s\S]*?):<\/strong>([\s\S]*?)<\/(?:li|p)>/g)) out[m[1]] = { head: m[2], body: m[3] };
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
  Omega: 'Ω', omega: 'ω', Delta: 'Δ', delta: 'δ', alpha: 'α', beta: 'β',
  gamma: 'γ', epsilon: 'ε', theta: 'θ', kappa: 'κ', lambda: 'λ', mu: 'μ',
  nu: 'ν', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', phi: 'φ', Phi: 'Φ',
  radic: '√', asymp: '≈', prop: '∝', plusmn: '±', divide: '÷', times: '×',
  deg: '°', frac12: '½', le: '≤', ge: '≥', middot: '·', minus: '−', rarr: '→',
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
  t = t.replace(/[Ωω]/g, 'ohm').replace(/[αΑ]/g, 'alpha').replace(/[βΒ]/g, 'beta')
       .replace(/[γΓ]/g, 'gamma').replace(/λ/g, 'lambda').replace(/μ/g, 'mu')
       .replace(/[Δδ]/g, 'delta').replace(/π/g, 'pi').replace(/ρ/g, 'rho')
       .replace(/θ/g, 'theta').replace(/[σΣ]/g, 'sigma').replace(/τ/g, 'tau')
       .replace(/ε/g, 'epsilon').replace(/ν/g, 'nu').replace(/φ/g, 'phi')
       .replace(/Φ/g, 'phi').replace(/η/g, 'eta').replace(/κ/g, 'kappa').replace(/½/g, '1/2');
  t = t.replace(/→/g, '->').replace(/°/g, ' deg ').replace(/·/g, '.').replace(/×/g, 'x');
  t = t.replace(/≈/g, '~').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/√/g, 'sqrt');
  return t.toLowerCase().replace(/\s+/g, ' ').trim();
}
const tight = s => canon(s).replace(/\s+/g, '');
const sigOf = (o, f) => f(o.stem) + '\u0000' + o.options.map(f).join('\u0000');
const recOf = (q, f) => f(q.question) + '\u0000' + q.options.map(f).join('\u0000');

ok(QS.length === 41, 'the map has 41 displays, not 40');
ok(Object.keys(before).length === 41, 'the before-fixture has 41 records');
ok(Object.keys(SIG.sigs).length === 41, 'the signature fixture has 41 signatures');
ok(SIG.retainedKeys === idmap.asserted_key_block, 'the signatures reproduce the review key block');

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
    ok(hitsT.length === 1 && hitsT[0].id === MAP[Q], Q + ': the signature matches exactly one bank record, ' + MAP[Q]);
    ok(sig.topic === rec(Q).topic, Q + ': the stored topic equals the signature topic');
    ok(L[pre(Q).correct] === sig.retainedKey, Q + ': the stored key equalled the review key before editing');
  }
  ok(exact === 41, 'all 41 signatures matched without relaxing whitespace (got ' + exact + ')');
}
/* Q1 repeats an already-approved record; Q2..Q41 are exactly the remainder */
{
  const earlier = new Set();
  for (const m of EARLIER) for (const id of Object.values(m)) earlier.add(id);
  ok(earlier.size === 240, 'the four earlier blocks cover 240 distinct ids');
  ok(MAP.Q1 === 'phys-214', 'Q1 resolved to phys-214');
  ok(EARLIER[3].Q34 === 'phys-214', 'which is the record approved as batch 4 Q34');
  ok(earlier.has(MAP.Q1), 'so Q1 was already reviewed and adds no coverage');
  const rest = QS.slice(1).map(Q => MAP[Q]);
  ok(rest.length === 40 && new Set(rest).size === 40, 'Q2..Q41 are 40 distinct ids');
  ok(rest.every(id => !earlier.has(id)), 'none of them appears in any earlier block');
  const remaining = BANK.map(r => r.id).filter(id => !earlier.has(id));
  ok(remaining.length === 40, 'exactly 40 physics records were unreviewed before this pass');
  ok(JSON.stringify(rest.slice().sort()) === JSON.stringify(remaining.slice().sort()),
    'and Q2..Q41 is exactly that set, computed rather than assumed from the numbering');
  ok(rest[0] === 'phys-241' && rest[39] === 'phys-280', 'their range is phys-241..phys-280');
  ok(idmap.verification.new_ids_equal_the_remaining_unreviewed_set === true, 'the id map records that equality');
}
for (const s of ['Unanswered', 'Report an issue', 'Back to Dashboard'])
  ok(!BANK.some(q => allText(q).indexOf(s) >= 0), '"' + s + '" appears in no stored field in the whole physics bank');

/* ------------------------------------------------------------------ */
section('2. answer letters, ids, topics and the frozen Q1');

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
  ok(JSON.stringify(t) === JSON.stringify(idmap.asserted_tally), 'the key tally is A=3, B=25, C=13, D=0');
}
ok(JSON.stringify(KEEP) === JSON.stringify(['Q1']), 'the KEEP list is Q1 alone');
ok(JSON.stringify(rec('Q1')) === JSON.stringify(pre('Q1')), 'Q1 is byte-identical in every field');
ok(rec('Q1').explanation.indexOf('<p><strong>Why the other answers are wrong:</strong></p>') >= 0,
  'Q1 keeps the batch 4 list form, untouched by the heading rule');
{
  const changed = QS.filter(Q => JSON.stringify(rec(Q)) !== JSON.stringify(pre(Q)));
  ok(changed.length === 40, '40 items changed (got ' + changed.length + ')');
  ok(JSON.stringify(QS.filter(Q => !changed.includes(Q))) === JSON.stringify(KEEP), 'and the one unchanged is Q1');
}

/* ------------------------------------------------------------------ */
section('3. the declared edit inventory, recomputed from the bank');

{
  const stems = [], opts = [], kcs = [], heads = [], bls = [], epItems = [];
  for (const Q of QS) {
    const band = bandOf(Q);
    const a = pre(Q), b = rec(Q);
    if (a.question !== b.question) stems.push(Q);
    if (JSON.stringify(a.options) !== JSON.stringify(b.options)) opts.push(Q);
    if (band === 1) continue;
    const sa = split(a.explanation, band), sb = split(b.explanation, band);
    if (sa.head !== sb.head) heads.push(Q);
    if (band === 3 && sa.kc !== sb.kc) kcs.push(Q);
    if (band === 2 && sa.bl !== sb.bl) bls.push(Q);
    if (band === 2 && JSON.stringify(sa.points) !== JSON.stringify(sb.points)) epItems.push(Q);
  }
  ok(JSON.stringify(stems) === JSON.stringify(idmap.scope.stem_changes), '25 stems changed, exactly the declared list (got ' + stems.length + ')');
  ok(stems.length === 25, 'the stem count is 25');
  const mainItems = [...new Set([...idmap.scope.main_block_changes, ...idmap.scope.scoped_main_edits.map(x => x.split('.')[0])])]
    .sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
  ok(JSON.stringify(heads) === JSON.stringify(mainItems), 'main explanations changed in exactly the 11 whole-block plus 6 scoped items (got ' + heads.length + ')');
  ok(idmap.scope.main_block_changes.length === 11, '11 complete main blocks are declared');
  ok(idmap.scope.scoped_main_edits.length === 7, 'and 7 scoped main passages');
  ok(JSON.stringify(kcs) === JSON.stringify(idmap.scope.key_concept_changes), '17 Key Concepts changed, exactly the declared list (got ' + kcs.length + ')');
  ok(kcs.length === 17, 'the Key Concept count is 17');
  ok(JSON.stringify(bls) === JSON.stringify(idmap.scope.bottom_line_changes), '5 Bottom Lines changed, exactly the declared list (got ' + bls.length + ')');
  ok(JSON.stringify(opts) === JSON.stringify(['Q4', 'Q5', 'Q11', 'Q37']), 'option texts changed in exactly Q4, Q5, Q11 and Q37');
  const epDeclared = [...new Set([...idmap.scope.educational_point_block_changes, ...idmap.scope.educational_point_changes.map(x => x.split('.')[0])])]
    .sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
  ok(JSON.stringify(epItems) === JSON.stringify(epDeclared), 'educational points changed in exactly the declared items (got ' + epItems.join(',') + ')');
  ok(idmap.scope.educational_point_block_changes.length === 2, '2 complete point blocks are declared');
  ok(idmap.scope.educational_point_changes.length === 11, 'and 11 individual points');
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
  ok(slots === 4, 'exactly 4 option slots changed (got ' + slots + ')');
}
/* an unnamed educational point may not move */
for (const Q of QS) {
  if (bandOf(Q) !== 2) continue;
  const a = split(pre(Q).explanation, 2).points, b = split(rec(Q).explanation, 2).points;
  ok(a.length === b.length, Q + ': its educational-point count is unchanged');
  const wholeBlock = idmap.scope.educational_point_block_changes.includes(Q);
  for (let i = 0; i < a.length; i++) {
    const named = wholeBlock || idmap.scope.educational_point_changes.includes(Q + '.' + (i + 1));
    if (named) ok(a[i] !== b[i], Q + '.' + (i + 1) + ': a named educational point really changed');
    else ok(a[i] === b[i], Q + '.' + (i + 1) + ': an unnamed educational point is untouched');
  }
}
/* the seven scoped anchors were real stored text, not the flattened export */
for (const slot of idmap.scope.scoped_main_edits) {
  const Q = slot.split('.')[0], i = Number(slot.split('.')[1]) - 1;
  const spec = specOf(Q), [from, to] = spec.headEdits[i];
  const band = bandOf(Q);
  ok(split(pre(Q).explanation, band).head.indexOf(from) >= 0, slot + ': the old passage really was stored (non-vacuity)');
  ok(split(rec(Q).explanation, band).head.indexOf(to) >= 0, slot + ': the replacement passage is present');
  ok(split(rec(Q).explanation, band).head.indexOf(from) < 0, slot + ': the old passage is gone');
  ok(spec.head === undefined, slot + ': and its item has no whole-block replacement, so the edit really is scoped');
}
/* A scoped item's main explanation must differ from the before-fixture by its
   named anchors and by nothing else: applying them to the old head has to
   reproduce the new head exactly. */
for (const Q of [...new Set(idmap.scope.scoped_main_edits.map(x => x.split('.')[0]))]) {
  const band = bandOf(Q), spec = specOf(Q);
  let head = split(pre(Q).explanation, band).head;
  for (const [from, to] of spec.headEdits) head = head.replace(from, to);
  ok(head === split(rec(Q).explanation, band).head,
    Q + ': its main explanation changed by the named scoped passages and nothing else');
}

/* ------------------------------------------------------------------ */
section('4. the three bands and the structure each must keep');

let kcTotal = 0, blTotal = 0, epBlocks = 0, epTotal = 0, tables = 0, fbTotal = 0;
const perItemPoints = [];
for (const Q of QS) {
  const r = rec(Q), e = r.explanation, band = bandOf(Q), s = split(e, band);
  ok(!!s, Q + ': its explanation parses into band ' + band);
  kcTotal += count(e, /<p class='exp-key'>Key Concept: /g);
  blTotal += count(e, /<p class='exp-key'>Bottom Line: /g);
  epBlocks += count(e, /<h4>Key Educational Points:<\/h4>/g);
  tables += count(e, /<table/g);
  if (band === 3) {
    ok(count(e, /<p class='exp-key'>Key Concept: /g) === 1, Q + ': exactly one Key Concept');
    ok(!/Bottom Line/.test(e) && !/Key Educational Points/.test(e), Q + ': no Bottom Line or point block in the third band');
  } else if (band === 2) {
    perItemPoints.push(s.points.length);
    epTotal += s.points.length;
    ok(count(e, /<p class='exp-key'>Bottom Line: /g) === 1, Q + ': exactly one Bottom Line');
    ok(count(e, /<h4>Key Educational Points:<\/h4>/g) === 1, Q + ': exactly one educational-point block');
    ok(!/Key Concept/.test(e), Q + ': no Key Concept in the second band');
  }
  ok(count(e, /<h4[^>]*>Correct Answer:/g) === 1, Q + ': exactly one keyed heading');
  ok(s.keyed === r.options[r.correct], Q + ': the keyed heading reproduces the keyed option');
  ok(!/^[ABCD][.)] /.test(s.keyed), Q + ": the keyed heading keeps this block's unlettered style");
  ok(count(e, /Why the other/gi) === 1, Q + ': exactly one feedback section heading');
  ok(s.tail === '', Q + ': nothing follows the Key Concept or Bottom Line');
  ok(!/<p><p>|<\/p><\/p>/.test(e), Q + ': no doubled paragraph tags');
  for (const t of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = count(e, new RegExp('<' + t + '[ >]', 'g'));
    const c = count(e, new RegExp('</' + t + '>', 'g'));
    ok(o === c, Q + ': <' + t + '> tags balance (' + o + '/' + c + ')');
  }
  const txt = allText(r);
  ok(!/—/.test(txt), Q + ': no em dash');
  ok(!/�/.test(txt), Q + ': no replacement character');
  ok(!/Replace stem|Replace only these educational points|Replace Bottom Line|Add missing option|CORE CONTENT KEEP|Original content anchor/.test(txt),
    Q + ': no reviewer label or instruction leaked into student text');
  ok(!/openstax\.org|nist\.gov|bipm\.org|REFERENCE NOTES/.test(txt), Q + ': no reviewer source URL leaked into student text');
}
ok(kcTotal === 31, '31 Key Concepts: Q1 and Q12..Q41 (got ' + kcTotal + ')');
ok(blTotal === 10, '10 Bottom Lines across Q2..Q11 (got ' + blTotal + ')');
ok(epBlocks === 10, '10 educational-point blocks (got ' + epBlocks + ')');
ok(epTotal === 31, '31 educational points in all (got ' + epTotal + ')');
ok(JSON.stringify(perItemPoints) === JSON.stringify([3, 3, 3, 3, 3, 3, 3, 4, 3, 3]),
  'Q9 has four points and the other nine blocks three each: ' + perItemPoints.join(','));
ok(tables === 4, 'four tables remain (got ' + tables + ')');
{
  const withTable = QS.filter(Q => /<table/.test(rec(Q).explanation));
  ok(JSON.stringify(withTable) === JSON.stringify(['Q13', 'Q16', 'Q17', 'Q22']), 'and they are the declared four items');
  for (const Q of ['Q16', 'Q17']) {
    const a = split(pre(Q).explanation, 3).head.match(/<table[\s\S]*?<\/table>/g).join('');
    const b = split(rec(Q).explanation, 3).head.match(/<table[\s\S]*?<\/table>/g).join('');
    ok(a === b, Q + ': its table contents are byte-identical, as the review requires');
  }
  for (const Q of ['Q13', 'Q22']) {
    const a = split(pre(Q).explanation, 3).head.match(/<table[\s\S]*?<\/table>/)[0];
    const b = split(rec(Q).explanation, 3).head.match(/<table[\s\S]*?<\/table>/)[0];
    ok(a !== b, Q + ': it received the specified replacement table');
    ok(count(b, /<tr>/g) >= 3, Q + ': and the replacement is a real table');
  }
}

/* ------------------------------------------------------------------ */
section('4b. 123 distractor bodies: 90 added, 16 replaced, 17 retained');

{
  let bodiesBefore = 0, bodiesAfter = 0, added = 0, replaced = 0, retained = 0;
  for (const Q of QS) {
    const band = bandOf(Q);
    bodiesBefore += Object.keys(fbParts(pre(Q).explanation)).length;
    const parts = fbParts(rec(Q).explanation);
    const letters = Object.keys(parts);
    bodiesAfter += letters.length;
    ok(letters.length === 3, Q + ': three lettered distractor bodies (got ' + letters.length + ')');
    ok(JSON.stringify(letters) === JSON.stringify(L.split('').filter((_, j) => j !== rec(Q).correct)),
      Q + ': they run in option order and skip the key');
    if (band !== 1) {
      for (const letter of letters) {
        ok(parts[letter].head === rec(Q).options[L.indexOf(letter)], Q + ' ' + letter + ': the heading reproduces its option text');
        ok(/^ \S/.test(parts[letter].body), Q + ' ' + letter + ': the body opens with the single leading space of the bank convention');
        ok(parts[letter].body.length > 20, Q + ' ' + letter + ': the body is a real explanation, not a stub');
      }
    }
    ok(new Set(letters.map(x => parts[x].body)).size === 3, Q + ': the three bodies are distinct');
    const keyedPara = split(rec(Q).explanation, band).head;
    for (const letter of letters) ok(keyedPara.indexOf(parts[letter].body) < 0, Q + ' ' + letter + ': its body is not a copy of the main explanation');
    if (band === 3) { added += 3; }
    else if (band === 2) {
      const spec = specOf(Q);
      replaced += spec.fbReplace.length;
      retained += spec.fbKeep.length;
    } else retained += 3;
  }
  ok(bodiesBefore === 33, '33 bodies existed before this pass (got ' + bodiesBefore + ')');
  ok(bodiesAfter === 123, '123 bodies after (got ' + bodiesAfter + ')');
  ok(added === 90, '90 were added in Q12..Q41 (got ' + added + ')');
  ok(replaced === 16, '16 existing bodies were replaced (got ' + replaced + ')');
  ok(retained === 17, "17 were retained, including Q1's three (got " + retained + ')');
  ok(added + replaced + retained === 123, 'and the three groups account for all 123');
}
/* Q12..Q41 really carried none, so nothing was duplicated */
for (const Q of QS) {
  if (bandOf(Q) !== 3) continue;
  ok(!/Why the other/i.test(pre(Q).explanation), Q + ': stored no feedback of any kind before this pass');
  ok(split(pre(Q).explanation, 3).head === split(rec(Q).explanation, 3).head ||
    idmap.scope.main_block_changes.includes(Q) || idmap.scope.scoped_main_edits.some(x => x.split('.')[0] === Q),
    Q + ': and its main explanation only changed where the review names it');
  const e = rec(Q).explanation;
  ok(e.indexOf(NEWWHY) > e.indexOf('Correct Answer:') && e.indexOf(NEWWHY) < e.indexOf(KCOPEN),
    Q + ': the new feedback sits after the main explanation and before the Key Concept');
}
/* the stored blocks of Q2..Q11 were reconstructed byte for byte before editing */
for (const Q of QS) {
  if (bandOf(Q) !== 2) continue;
  const spec = specOf(Q);
  const block = NEWWHY + spec.existingFb.map(x => '<p><strong>' + x[0] + '. ' + x[1] + ':</strong>' + x[2] + '</p>').join('');
  ok(split(pre(Q).explanation, 2).fbBlock === block, Q + ': the spec reproduces its stored feedback block byte for byte');
  for (const letter of spec.fbKeep) {
    const body = spec.existingFb.find(x => x[0] === letter)[2];
    ok(pre(Q).explanation.indexOf(body) >= 0, Q + ' ' + letter + ': the retained body really was stored (non-vacuity)');
    ok(fbParts(rec(Q).explanation)[letter].body === body, Q + ' ' + letter + ': it is carried over verbatim');
  }
  for (const letter of spec.fbReplace) {
    const old = spec.existingFb.find(x => x[0] === letter)[2];
    ok(pre(Q).explanation.indexOf(old) >= 0, Q + ' ' + letter + ': the old body really was stored (non-vacuity)');
    ok(rec(Q).explanation.indexOf(old) < 0, Q + ' ' + letter + ': the old body is gone');
  }
}
/* the three abbreviated stored headings were synchronized */
for (const [Q, letter, was] of [['Q6', 'D', 'Downward'], ['Q8', 'A', 'Increases (shifts toward longer wavelengths)'], ['Q8', 'D', 'First increases then decreases']]) {
  ok(pre(Q).explanation.indexOf('<strong>' + letter + '. ' + was + ':</strong>') >= 0, Q + ' ' + letter + ': really stored an abbreviated heading (non-vacuity)');
  ok(fbParts(rec(Q).explanation)[letter].head === rec(Q).options[L.indexOf(letter)], Q + ' ' + letter + ': it now reproduces its full option text');
}

/* ------------------------------------------------------------------ */
section('5. notation the review asked to inspect rather than assume');

for (const Q of ['Q12', 'Q24', 'Q29', 'Q31']) {
  ok(!/[₀-₉]/.test(allText(pre(Q))), Q + ': stored no Unicode index before this pass');
  ok(/<sup>|<sub>/.test(allText(rec(Q))), Q + ': and carries real markup');
}
ok(/<sup>&gamma;<\/sup>/.test(pre('Q12').explanation), "Q12 really stored p1V1^gamma in markup, so the export's flattening was an artifact");
ok(/<sup>5\/3<\/sup>/.test(rec('Q12').explanation), 'Q12 keeps its 8^(5/3) markup');
ok(/<sup>&gamma;<\/sup>/.test(rec('Q12').explanation), 'and its gamma exponents');
ok(/10<sup>10<\/sup>/.test(rec('Q24').options[0]), "Q24's options keep their power markup");
ok(/1\.226/.test(rec('Q29').explanation) && /<sup>−34<\/sup>/.test(rec('Q29').explanation), "Q29 keeps its derivation and its negative exponents");
ok(/X<sub>C<\/sub>/.test(rec('Q31').explanation), "Q31 keeps its subscripted reactance");
for (const Q of QS) {
  ok(!/<sup><\/sup>|<sub><\/sub>/.test(rec(Q).explanation), Q + ': no empty exponent or index element');
  /* Feedback headings reproduce their option text, so an option that stores
     &mu;s or &Omega; carries those entities into its heading. Entities are
     therefore counted outside the headings, where this pass actually wrote. */
  const stripHeads = t => t.replace(/<strong>[ABCD]\. [\s\S]*?:<\/strong>/g, '');
  ok(count(stripHeads(allText(rec(Q))), /&[a-zA-Z#][a-zA-Z0-9#]*;/g) <=
     count(stripHeads(allText(pre(Q))), /&[a-zA-Z#][a-zA-Z0-9#]*;/g),
    Q + ': no HTML entity was introduced outside a synchronized heading');
}
/* every item's exponent and index markup is pinned, so silent flattening fails here */
const SUPSUB = {};
for (const Q of QS) {
  const t = rec(Q).question + rec(Q).options.join('') + rec(Q).explanation;
  SUPSUB[Q] = [count(t, /<sup>/g), count(t, /<sub>/g)];
}
ok(JSON.stringify(SUPSUB) === JSON.stringify({"Q1":[0,0],"Q2":[0,3],"Q3":[0,0],"Q4":[7,0],"Q5":[2,2],"Q6":[0,0],"Q7":[5,0],"Q8":[1,4],"Q9":[3,1],"Q10":[5,0],"Q11":[0,0],"Q12":[14,16],"Q13":[0,0],"Q14":[0,0],"Q15":[8,0],"Q16":[3,2],"Q17":[0,0],"Q18":[3,0],"Q19":[8,4],"Q20":[0,11],"Q21":[0,5],"Q22":[0,3],"Q23":[5,1],"Q24":[38,0],"Q25":[0,11],"Q26":[1,15],"Q27":[2,2],"Q28":[4,22],"Q29":[9,0],"Q30":[6,8],"Q31":[4,32],"Q32":[0,2],"Q33":[0,0],"Q34":[5,1],"Q35":[4,1],"Q36":[0,0],"Q37":[1,0],"Q38":[0,0],"Q39":[0,0],"Q40":[0,0],"Q41":[0,0]}),
  'every item keeps its pinned exponent and index markup: ' + JSON.stringify(SUPSUB));

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

/* Q37 is the major numerical repair */
repaired('Q37', '4.0026 u', '4.0015 u', 'the nuclear mass replaces the neutral atomic mass');
repaired('Q37', '4.0320 u', '4.0319 u', 'and the free-nucleon total is the consistent value');
repaired('Q37', '27.4 MeV', '28.3 MeV', 'the binding energy is recomputed from consistent nuclear masses');
repaired('Q37', 'Mass converted to nuclear binding energy', 'Energy released when the bound nucleus formed',
  'option C describes energy released rather than mass added');
ok(rec('Q37').correct === 2 && split(rec('Q37').explanation, 3).keyed === rec('Q37').options[2],
  'Q37: the key is still C and its keyed heading was re-synchronized');
ok(/neutral atom's mass also includes its electrons/.test(rec('Q37').explanation),
  'Q37: and the explanation warns against substituting the atomic mass');
/* the substantial repairs */
repaired('Q4', 'hydrostatic pressure (ρ g h)', 'gravitational potential energy per unit volume (ρgh)',
  'the keyed option uses the corrected terminology');
repaired('Q4', 'the Navier-Stokes equations must be used instead', 'an extended energy equation can include losses',
  'Navier-Stokes is no longer the only way to include losses');
repaired('Q4', 'contributing to vessel collapse in severe stenosis', 'Real blood flow and other viscous flows can also involve energy losses',
  'vessel collapse is no longer the direct general outcome of a stenosis');
repaired('Q4', 'steady (non-turbulent) flow', 'Use Bernoulli along a streamline for steady, incompressible, nonviscous flow',
  'steady is no longer equated with non-turbulent');
repaired('Q5', 'cannot be deflected by magnetic or accelerated by electric fields', 'so the accelerating electric field does not exert the qE force on them',
  'the keyed option no longer denies every magnetic interaction');
repaired('Q5', 'Magnetic fields exert <strong>no force</strong> on neutral particles', 'A neutron has a magnetic moment and can be manipulated in a suitable nonuniform magnetic field',
  'neutron magnetic moments are acknowledged');
repaired('Q11', 'Dependent on the temperature but not direction', 'The same at all temperatures',
  'the overlapping distractor C is replaced');
repaired('Q11', 'identical in every direction', 'its value does not depend on direction',
  'isotropy is scoped to the property being considered');
repaired('Q11', 'cubic crystals</strong> (NaCl, diamond) -- these all have the same properties in every direction', 'while still having direction-dependent elastic properties',
  'cubic crystals need not be elastically isotropic');
repaired('Q13', 'In an adiabatic expansion of an ideal gas, which of the following is TRUE?', 'does positive work on its surroundings',
  'positive work against an external pressure is specified');
repaired('Q13', null, 'free expansion into a vacuum is different', 'adiabatic free expansion is distinguished');
ok(/Work done by gas W/.test(rec('Q13').explanation), "Q13: and its table states the work sign convention");
repaired('Q22', 'Decreases slightly', 'Decreases because each photon carries more energy',
  "the table's unqualified 'decreases slightly' is gone");
repaired('Q22', 'Intensity = number of photons.', 'Intensity is energy delivered per unit area per unit time',
  'intensity is power per area, not a photon count');
repaired('Q36', 'moves at 3 m/s perpendicular to a uniform magnetic field', 'mutually perpendicular',
  'the rod geometry is fully specified');
repaired('Q38', 'and is therefore the most stable', 'Among the following nuclei, which has the greatest binding energy per nucleon?',
  'the stem no longer equates the peak with absolute stability');
repaired('Q38', 'Nuclei lighter than iron release energy by <strong>fusion</strong>', 'nickel-62 has a slightly greater value than iron-56',
  'Ni-62 is named and the blanket fusion/fission claim is scoped');
repaired('Q40', 'Which material is most effective at shielding against neutron radiation?', 'especially suitable for slowing fast neutrons by elastic scattering',
  'the question asks about slowing rather than a single best shield');
repaired('Q40', 'they pass easily through dense materials like lead', 'Complete shielding may also need neutron-capturing materials',
  'moderation alone is no longer complete shielding');
/* the scoped qualifications */
repaired('Q2', 'A half-wave rectifier converts an AC input into a DC output by:', 'one ideal diode, a resistive load and no smoothing capacitor',
  'the ideal unfiltered circuit is stated');
repaired('Q2', 'uses only 50% of the input waveform', 'its average output magnitude is lower and its ripple is greater',
  'using half the cycle is distinguished from 50% efficiency');
repaired('Q3', '<strong>0.7 V for silicon</strong>', 'it is not a universal 0.7 V or 0.3 V value',
  'the built-in potential is not a fixed material constant');
repaired('Q3', '0.1 to 1 micrometer', 'Its width depends on doping and applied bias',
  'the fixed depletion-width teaching is gone');
repaired('Q6', 'The Lorentz force on the charge is directed:', 'The magnetic force on the charge is directed:',
  'the magnetic part of the Lorentz force is specified');
repaired('Q6', '"Out of the page" is parallel to B', 'Out of the page is opposite to the magnetic-field direction',
  'out of the page is antiparallel, not parallel, to B');
repaired('Q7', 'its temperature would increase without limit', 'Its emitted power is P = σAT<sup>4</sup>',
  'the unlimited-heating argument is replaced');
repaired('Q7', 'A single-wavelength emitter would be a laser or a spectral line source.', 'A narrow spectral line or laser emission is different from that broad black-body spectrum',
  'a laser is no longer described as exactly single-wavelength');
repaired('Q8', 'the wavelength at which it emits maximum radiation:', 'plotted per unit wavelength',
  'the wavelength-spectrum convention is stated');
repaired('Q8', '500 nm (green/yellow visible light)', "The Sun's broad spectrum does not make it look green",
  "the Sun's colour label is corrected");
repaired('Q8', 'body temperature determines the peak infrared emission wavelength', 'They do not generally locate the emission peak directly',
  'infrared thermometry is separated from measuring the peak');
repaired('Q9', 'The activity of a radioactive sample as a function of time', 'single radioactive parent isotope',
  'the decay law is scoped to one radionuclide');
repaired('Q9', 'theoretically never fully decays to zero', 'a finite sample can eventually have no parent nuclei left',
  'a finite sample can finish decaying');
repaired('Q10', 'you mistakenly used t1/2 = 0.5/lambda', '≈ 0.1386 day<sup>−1</sup>, twice the stated decay constant',
  "the A feedback no longer invents arithmetic that gives 7.2 days");
repaired('Q10', 'using t1/2 = ln(2) x (1/lambda) x 100', '0.693/0.0693 = 10', 'and the D feedback no longer invents a x100 step');
repaired('Q12', 'For an adiabatic process: p<sub>1</sub>', 'For a reversible adiabatic process of an ideal gas with constant γ',
  'the reversible condition is required for pV^gamma = constant');
repaired('Q14', 'A 2 kg mass oscillates on a spring with spring constant', 'ideal massless spring',
  "the Hooke-law and damping assumptions are explicit");
repaired('Q15', 'A simple pendulum has a period of 2 seconds on Earth', 'small-angle oscillations',
  'the small-angle assumption is stated');
repaired('Q16', 'In SHM, energy continuously converts between kinetic and potential forms:', 'choose the oscillation potential energy to be zero at equilibrium',
  'the zero of oscillation potential energy is a stated convention');
repaired('Q19', 'A solenoid has 2000 turns wound uniformly', 'long air-core solenoid', 'the long air-core model is stated');
repaired('Q19', 'Inserting an iron core can increase B by a factor of 1000 or more.', 'its response need not remain proportional to current',
  'the unqualified iron-core factor is gone');
repaired('Q20', 'because &mu;<sub>0</sub> and n are constants of the solenoid geometry', 'With an air core and fixed geometry, the field is proportional to the current',
  'mu0 is no longer called a constant of the geometry');
repaired('Q21', 'no electrons are emitted regardless of intensity', 'In the single-photon photoelectric model',
  'the threshold claim is scoped to the single-photon model');
repaired('Q23', 'The proper time t<sub>0</sub> is always the shortest time', 'the observed half-life is γ times its rest-frame half-life',
  'the overly broad proper-time slogan is replaced');
repaired('Q26', 'A 60 kg adult sits 1.5 m from the fulcrum of a seesaw.', 'on the opposite side',
  "the opposite side and the seesaw's own weight are stated");
repaired('Q27', 'How long must a current of 10 A flow', '100% current efficiency', 'current efficiency is specified');
repaired('Q28', 'The electrochemical equivalent of Cu (M/z = 64/2 = 32)', 'The mass deposited per coulomb, called the electrochemical equivalent, is M/(zF)',
  'the electrochemical-equivalent terminology is repaired');
repaired('Q29', 'why electron microscopes can resolve individual atoms', "also depends on its lenses and other design limits",
  'resolution is not promised from voltage alone');
repaired('Q32', 'Comfortable indoor humidity is typically 40-60%', 'the water-vapor pressure equals the saturation vapor pressure',
  'the comfort recommendation is gone and saturation is stated');
repaired('Q32', 'the maximum the air can hold at that temperature', 'saturation vapor pressure at the same temperature',
  '"air can hold" is replaced by saturation vapor pressure');
repaired('Q33', 'What happens when air is cooled below its dew point temperature?', 'cooled at constant pressure to just below 15 °C',
  'constant pressure and an above-freezing dew point are stated');
repaired('Q33', 'why glasses fog up when moving from cold to warm air', 'they cool the air next to their surfaces below its dew point',
  'fogging is explained as local cooling');
repaired('Q34', 'Two long parallel wires are 0.2 m apart,', 'in air', 'the air approximation is stated');
repaired('Q35', 'The ampere was originally defined as:', 'Since 20 May 2019', 'the current SI definition is distinguished from the former one');
repaired('Q39', 'In a nuclear fission reactor, what is the primary function', 'thermal-neutron fission reactor using U-235',
  'the reactor type is specified');
repaired('Q39', 'The moderator works because neutrons lose the most energy in collisions with particles of similar mass', 'graphite can slow neutrons through repeated collisions',
  'graphite is included without implying only equal-mass collisions work');

/* ------------------------------------------------------------------ */
section("7. the review's numerical results, recomputed here");

ok(round(Math.log(2) / 0.0693, 3) === 10.002, 'Q10: ln(2)/0.0693 = 10.002 days');
ok(round(1 / 0.0693, 3) === 14.430, 'Q10: and the mean lifetime is 14.430 days');
ok(round(Math.log(2) / 5, 4) === 0.1386, 'Q10: a 5-day half-life would need 0.1386 per day');
ok(round(0.5 / 0.0693, 3) === 7.215, 'Q10: while 0.5/lambda gives 7.215 days, not 5');
ok(round(Math.log(2) / 0.0693 * 100, 0) === 1000, 'Q10: and an extra factor of 100 gives about 1000 days, not 69.3');
ok(round(100 * Math.pow(8, 5 / 3), 6) === 3200, 'Q12: 100 x 8^(5/3) = 3200 kPa');
ok(round(Math.pow(8, 5 / 3), 6) === 32, 'Q12: the factor is 32, not 16 or 64');
ok(round(2 * Math.PI * Math.sqrt(2 / 800), 6) === 0.314159, 'Q14: the period is 0.314159 s');
ok(round(10 * 4 / (4 * Math.PI * Math.PI), 5) === 1.01321, 'Q15: the length is 1.01321 m, rounding to 1.0 m');
ok(round(4 * 0.04 / 0.05, 6) === 3.2, 'Q17: the soap-bubble excess pressure is 3.2 Pa');
ok(round(2 * 0.04 / 0.05, 6) === 1.6, 'Q17: and a droplet of the same size would give 1.6 Pa');
ok(round(2 * 0.073 / (1000 * 10 * 0.03) * 1000, 2) === 0.49, 'Q18: the capillary radius is 0.49 mm');
ok(round(4 * Math.PI * 1e-7 * (2000 / 0.4) * 3 * 1000, 4) === 18.8496, 'Q19: the solenoid field is 18.8496 mT');
ok(round(10 * 5 / 2, 6) === 25, 'Q20: the field becomes 25 mT');
ok(round(1240 / 310 - 3.0, 6) === 1, 'Q21: the maximum kinetic energy is 1.0 eV');
ok(round(1.5 / Math.sqrt(1 - 0.36), 6) === 1.875, 'Q23: the dilated half-life is 1.875 us');
ok(round(1 / Math.sqrt(1 - 0.36), 2) === 1.25, 'Q23: the Lorentz factor is 1.25');
ok(round(1e-3 * Math.pow(3e8, 2), 6) === 9e13, 'Q24: 1 g of matter is 9 x 10^13 J');
ok(round(40 * 1.5 / 60, 6) === 1, 'Q25: the 60 N weight balances at 1.0 m');
ok(round(60 * 1.5 / 30, 6) === 3, 'Q26: the child balances at 3.0 m');
ok(round(5.4 * 96500 / (108 * 10), 1) === 482.5, 'Q27: the deposition takes 482.5 s, rounding to 483');
ok(round(5.4 / 108 * 96500, 6) === 4825, 'Q27: and the required charge is 4825 C, not a time');
ok(round(2.16 * (64 / 2) / 108, 6) === 0.64, 'Q28: 0.64 g of copper is deposited');
ok(round(1.226 / Math.sqrt(400), 4) === 0.0613, 'Q29: the de Broglie wavelength is 0.0613 nm');
ok(round(1.240 / 40, 6) === 0.031, 'Q30: the X-ray cutoff is 0.031 nm');
ok(round(1 / (2 * Math.PI * 50 * 1e-5), 2) === 318.31, 'Q31: the reactance is 318.31 ohm');
ok(round(100 / (1 / (2 * Math.PI * 50 * 1e-5)), 5) === 0.31416, 'Q31: and the peak current is 0.31416 A');
ok(round(100 * 1.90 / 3.17, 4) === 59.9369, 'Q32: the relative humidity is 59.9369%, rounding to 60%');
ok(round(4 * Math.PI * 1e-7 * 5 * 5 / (2 * Math.PI * 0.2), 10) === 2.5e-5, 'Q34: the force per length is 2.5 x 10^-5 N/m');
ok(round(0.5 * 0.4 * 3, 6) === 0.6, 'Q36: the motional emf is 0.6 V');
ok(round((4.0319 - 4.0015), 4) === 0.0304, 'Q37: the mass defect is 0.0304 u with consistent nuclear masses');
ok(round((4.0319 - 4.0015) * 931.5, 4) === 28.3176, 'Q37: so the binding energy is 28.3176 MeV, rounding to 28.3');
ok(round((4.0320 - 4.0026) * 931.5, 1) === 27.4, 'Q37: the old numbers did give 27.4 MeV, so the error was the masses, not the multiplication');
ok(round((4.0319 - 4.0015) * 931.5 / 4, 1) === 7.1, "Q38: helium-4's binding energy per nucleon is about 7.1 MeV");
for (const Q of QS) ok(rec(Q).correct >= 0 && rec(Q).correct <= 3, Q + ': the stored key index is in range');

/* ------------------------------------------------------------------ */
section('8. nothing outside the block moved');

ok(BANK.length === 280, 'the physics bank still holds 280 records');
{
  let checked = 0; const drifted = [];
  for (const q of BANK) {
    if (PACK.has(q.id)) continue;
    checked++;
    if (untouched.physics[q.id] !== hash(q)) drifted.push(q.id);
  }
  ok(checked === 239, '239 physics records lie outside this block (got ' + checked + ')');
  ok(drifted.length === 0, 'none of them changed' + (drifted.length ? ': ' + drifted.join(', ') : ''));
  ok(Object.keys(untouched.physics).length === 239, 'the untouched fixture covers all 239');
}
ok(new Set(BANK.map(q => q.id)).size === 280, 'all physics ids are still distinct');
for (const q of BANK) {
  ok(q.subject === 'physics', q.id + ': still filed under physics');
  ok(Array.isArray(q.options) && q.options.length === 4, q.id + ': still has four options');
}
{
  const raw = fs.readFileSync(path.join(ROOT, 'questions-physics.json'), 'utf8');
  ok(JSON.stringify(JSON.parse(raw), null, 2) + '\n' === raw, 'the file round-trips through the project JSON format');
  const other = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
  ok(other.biology.length === 629 && other.chemistry.length === 485,
    'biology and chemistry are untouched at 629 and 485 records');
}

/* ------------------------------------------------------------------ */
section('9. the coverage ledger and the id map record');

ok(idmap.coverage.physics_bank_size === 280, 'the ledger records a 280-record physics bank');
ok(idmap.coverage.reviewed_before_this_block === 240, 'it records 240 previously reviewed');
ok(idmap.coverage.repeat_ids_this_block === 1 && idmap.coverage.new_unique_ids_this_block === 40,
  'one repeat and 40 new unique ids');
ok(idmap.coverage.reviewed_after_this_block === 280, 'so implementation coverage reaches 280 of 280');
ok(idmap.coverage.still_unreviewed === 0, 'and nothing is left unreviewed');
ok(/awaits scientific approval/.test(idmap.coverage.note), 'while the ledger records that this block still awaits scientific approval');
ok(/bio-513 and bio-583 remain outstanding/.test(idmap.coverage.note), 'and that the two biology items remain outstanding');
ok(idmap.verification.key_changes === 0, 'the record states that no answer letter changed');
ok(idmap.verification.matched_exactly === 41, 'and that all 41 signatures matched exactly');
ok(idmap.notes.join(' ').indexOf('do not establish scientific accuracy') >= 0,
  'the id map states that these checks are not scientific approval');
ok(idmap.presentation.distractor_bodies_before === 33 && idmap.presentation.distractor_bodies_after === 123,
  'the record states that bodies went from 33 to 123');
ok(idmap.scope.keep_items.length === 1 && idmap.scope.edited_items === 40, 'and 1 KEEP item against 40 edited');
for (const Q of QS) ok(idmap.asserted_keys[Q] === L[rec(Q).correct], Q + ': the asserted key matches the stored key');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
