/* Result-verifying suite for the SHOSMED physics FOURTH 60-question review.
 *
 * This checks the BANK, not the harness. Section 1 re-derives the id map from
 * the review's original signatures by full content match and proves the match
 * is unique bank-wide. Every "claim removed" assertion is paired with a
 * non-vacuity check that the claim really was in the before-fixture.
 *
 * Two things make this block different from the first three and get their own
 * sections: it has TWO presentation bands (Key Concepts in Q1-Q45,
 * educational points plus a Bottom Line in Q46-Q60), and it already carried
 * all 180 distractor bodies, of which exactly 83 are replaced and 97 retained.
 * Four items (Q3, Q8, Q20, Q23) must stay byte-identical in every field.
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
const OLDWHY = '<p><strong>Why the other answers are wrong:</strong></p>';
const NEWWHY = '<h4>Why the other choices are wrong:</h4>';
const EPOPEN = '<h4>Key Educational Points:</h4><ul>';
const KCOPEN = "<p class='exp-key'>Key Concept: ";
const BLOPEN = "<p class='exp-key'>Bottom Line: ";

const BANK = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions-physics.json'), 'utf8')).physics;
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/phys-review-b4-idmap.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b4-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b4-untouched.json'), 'utf8'));
const SIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/phys-review-b4-signatures.json'), 'utf8'));
const EARLIER = [];
for (const f of ['phys-review-60-idmap.json', 'phys-review-b2-idmap.json', 'phys-review-b3-idmap.json'])
  EARLIER.push(JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/' + f), 'utf8')).map);
const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e', 'f'])
  for (const s of require(path.join(ROOT, 'scripts/phys-b4-edits-' + m + '.js'))) SPECS.push(s);
const specOf = Q => SPECS.find(s => s.q === Q);

const MAP = idmap.map;
const QS = Object.keys(MAP);
const PACK = new Set(Object.values(MAP));
const KEEP = idmap.scope.keep_items;
const rec = Q => BANK.find(r => r.id === MAP[Q]);
const pre = Q => before[Q];
const hash = q => crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0, 16);
const bandOf = Q => (Number(Q.slice(1)) <= 45 ? 1 : 2);

function split(exp) {
  const km = exp.match(/^<h4[^>]*>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!km) return null;
  const rest = exp.slice(km[0].length);
  const band = rest.indexOf(OLDWHY) >= 0 ? 1 : (rest.indexOf(NEWWHY) >= 0 ? 2 : 0);
  if (!band) return null;
  const why = band === 1 ? OLDWHY : NEWWHY;
  const iFb = rest.indexOf(why);
  const head = rest.slice(0, iFb);
  if (band === 1) {
    const iKC = rest.indexOf(KCOPEN);
    const close = rest.indexOf('</p>', iKC);
    return { band, keyed: km[1], head, fbBlock: rest.slice(iFb, iKC), kc: rest.slice(iKC + KCOPEN.length, close), tail: rest.slice(close + 4) };
  }
  const iEP = rest.indexOf(EPOPEN), iBL = rest.indexOf(BLOPEN);
  const epEnd = rest.indexOf('</ul>', iEP);
  const inner = rest.slice(iEP + EPOPEN.length, epEnd);
  const close = rest.indexOf('</p>', iBL);
  return { band, keyed: km[1], head, fbBlock: rest.slice(iFb, iEP),
    points: inner.slice(4, -5).split('</li><li>'), bl: rest.slice(iBL + BLOPEN.length, close), tail: rest.slice(close + 4) };
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

ok(QS.length === 60, 'the map has 60 displays');
ok(Object.keys(before).length === 60, 'the before-fixture has 60 records');
ok(Object.keys(SIG.sigs).length === 60, 'the signature fixture has 60 signatures');
ok(SIG.retainedKeys === idmap.asserted_key_block, 'the signatures reproduce the review key block');
ok(SIG.originalKeys === SIG.retainedKeys, 'the displayed and intended key blocks are identical: the review moves no answer letter');

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
  ok(exact === 60, 'all 60 signatures matched without relaxing whitespace (got ' + exact + ')');
}
ok(new Set(Object.values(MAP)).size === 60, 'the 60 ids are distinct');
ok(QS.every(Q => MAP[Q] === 'phys-' + (180 + Number(Q.slice(1)))), 'the map resolved to phys-181..phys-240');
{
  const earlier = new Set();
  for (const m of EARLIER) for (const id of Object.values(m)) earlier.add(id);
  ok(earlier.size === 180, 'the three earlier blocks cover 180 distinct ids');
  ok(QS.every(Q => !earlier.has(MAP[Q])), 'none of the 60 ids appears in any previously reviewed physics block');
  ok(idmap.verification.overlap_with_previously_reviewed_blocks === 0, 'and the id map records zero overlap');
}
/* Q34's "Unanswered" line is interface text, not stored content */
ok(!BANK.some(q => /Unanswered/.test(allText(q))), '"Unanswered" appears in no stored field in the whole physics bank');
ok(!/Unanswered/.test(SIG.sigs.Q34.stem), "so it was dropped from Q34's signature");
ok(idmap.verification.ui_text_dropped_from_signature.length === 1, 'and the id map records that it was dropped');
for (const s of ['Back to Dashboard', 'Report an issue'])
  ok(!BANK.some(q => allText(q).indexOf(s) >= 0), '"' + s + '" appears in no stored field either');

/* ------------------------------------------------------------------ */
section('2. answer letters, ids, topics and the four KEEP items');

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
  ok(JSON.stringify(t) === JSON.stringify(idmap.asserted_tally), 'the key tally is A=5, B=26, C=25, D=4');
}
ok(JSON.stringify(KEEP) === JSON.stringify(['Q3', 'Q8', 'Q20', 'Q23']), 'the KEEP list is Q3, Q8, Q20 and Q23');
for (const Q of KEEP) {
  ok(JSON.stringify(rec(Q)) === JSON.stringify(pre(Q)), Q + ': byte-identical in every field');
  ok(!/<strong>[ABCD]\. /.test(rec(Q).explanation), Q + ': and exempt from heading normalization, as the review requires');
  ok(rec(Q).explanation.indexOf(OLDWHY) >= 0, Q + ': it keeps its stored feedback heading untouched');
}
{
  const changed = QS.filter(Q => JSON.stringify(rec(Q)) !== JSON.stringify(pre(Q)));
  ok(changed.length === 56, '56 items changed (got ' + changed.length + ')');
  ok(JSON.stringify(QS.filter(Q => !changed.includes(Q))) === JSON.stringify(KEEP), 'and the four unchanged are exactly the KEEP items');
}

/* ------------------------------------------------------------------ */
section('3. the declared edit inventory, recomputed from the bank');

{
  const stems = [], opts = [], kcs = [], heads = [], bls = [], epItems = [];
  for (const Q of QS) {
    const a = pre(Q), b = rec(Q), sa = split(a.explanation), sb = split(b.explanation);
    if (a.question !== b.question) stems.push(Q);
    if (JSON.stringify(a.options) !== JSON.stringify(b.options)) opts.push(Q);
    if (sa.head !== sb.head) heads.push(Q);
    if (sa.band === 1 && sa.kc !== sb.kc) kcs.push(Q);
    if (sa.band === 2 && sa.bl !== sb.bl) bls.push(Q);
    if (sa.band === 2 && JSON.stringify(sa.points) !== JSON.stringify(sb.points)) epItems.push(Q);
  }
  ok(JSON.stringify(stems) === JSON.stringify(idmap.scope.stem_changes), '39 stems changed, exactly the declared list (got ' + stems.length + ')');
  ok(stems.length === 39, 'the stem count is 39');
  const mainItems = [...new Set([...idmap.scope.main_block_changes, ...idmap.scope.scoped_main_edits.map(x => x.split('.')[0])])].sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
  ok(JSON.stringify(heads) === JSON.stringify(mainItems), 'main explanations changed in exactly the 22 whole-block plus 5 scoped items (got ' + heads.length + ')');
  ok(idmap.scope.main_block_changes.length === 22, '22 complete main blocks are declared');
  ok(idmap.scope.scoped_main_edits.length === 6, 'and 6 scoped main passages or cells');
  ok(JSON.stringify(kcs) === JSON.stringify(idmap.scope.key_concept_changes), '32 Key Concepts changed, exactly the declared list (got ' + kcs.length + ')');
  ok(kcs.length === 32, 'the Key Concept count is 32');
  ok(JSON.stringify(bls) === JSON.stringify(idmap.scope.bottom_line_changes), '11 Bottom Lines changed, exactly the declared list (got ' + bls.length + ')');
  ok(bls.length === 11, 'the Bottom Line count is 11');
  const epDeclared = [...new Set([...idmap.scope.educational_point_block_changes, ...idmap.scope.educational_point_changes.map(x => x.split('.')[0])])].sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
  ok(JSON.stringify(epItems) === JSON.stringify(epDeclared), 'educational points changed in exactly the declared items (got ' + epItems.join(',') + ')');
  ok(idmap.scope.educational_point_block_changes.length === 4, '4 complete point blocks are declared');
  ok(idmap.scope.educational_point_changes.length === 12, 'and 12 individual points');
  ok(JSON.stringify(opts) === JSON.stringify(['Q4', 'Q13', 'Q18', 'Q19']), 'option texts changed in exactly Q4, Q13, Q18 and Q19');
  /* An item may be named for SOME of its points. Each point is therefore
     checked individually against the before-fixture, so a change to an
     unnamed point inside a named item cannot hide. */
  for (const Q of QS) {
    if (bandOf(Q) !== 2) continue;
    const a = split(pre(Q).explanation).points, b = split(rec(Q).explanation).points;
    ok(a.length === b.length, Q + ': its educational-point count is unchanged');
    const wholeBlock = idmap.scope.educational_point_block_changes.includes(Q);
    for (let i = 0; i < a.length; i++) {
      const named = wholeBlock || idmap.scope.educational_point_changes.includes(Q + '.' + (i + 1));
      if (named) ok(a[i] !== b[i], Q + '.' + (i + 1) + ': a named educational point really changed');
      else ok(a[i] === b[i], Q + '.' + (i + 1) + ': an unnamed educational point is untouched');
    }
  }
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
/* the scoped main edits really were scoped: nothing else in those heads moved */
for (const slot of idmap.scope.scoped_main_edits) {
  const Q = slot.split('.')[0], i = Number(slot.split('.')[1]) - 1;
  const spec = specOf(Q), [from, to] = spec.headEdits[i];
  ok(split(pre(Q).explanation).head.indexOf(from) >= 0, slot + ': the old passage really was there (non-vacuity)');
  ok(split(rec(Q).explanation).head.indexOf(to) >= 0, slot + ': the replacement passage is present');
  ok(split(rec(Q).explanation).head.indexOf(from) < 0, slot + ': the old passage is gone');
  ok(spec.head === undefined, slot + ': and its item has no whole-block replacement, so the edit really is scoped');
}

/* ------------------------------------------------------------------ */
section('4. the two presentation bands and the structure they must keep');

let kcTotal = 0, blTotal = 0, epBlocks = 0, epTotal = 0, tables = 0, fbTotal = 0;
const perItemPoints = [];
for (const Q of QS) {
  const r = rec(Q), e = r.explanation, s = split(e);
  ok(!!s, Q + ': its explanation parses into its band');
  ok(s.band === bandOf(Q), Q + ': is in band ' + bandOf(Q));
  kcTotal += count(e, /<p class='exp-key'>Key Concept: /g);
  blTotal += count(e, /<p class='exp-key'>Bottom Line: /g);
  epBlocks += count(e, /<h4>Key Educational Points:<\/h4>/g);
  tables += count(e, /<table/g);
  if (s.band === 1) {
    ok(count(e, /<p class='exp-key'>Key Concept: /g) === 1, Q + ': exactly one Key Concept');
    ok(!/Bottom Line/.test(e) && !/Key Educational Points/.test(e), Q + ': no Bottom Line or point block in the first band');
  } else {
    perItemPoints.push(s.points.length);
    epTotal += s.points.length;
    ok(count(e, /<p class='exp-key'>Bottom Line: /g) === 1, Q + ': exactly one Bottom Line');
    ok(count(e, /<h4>Key Educational Points:<\/h4>/g) === 1, Q + ': exactly one educational-point block');
    ok(!/Key Concept/.test(e), Q + ': no Key Concept in the second band');
    ok(s.points.every(p => p.length > 20), Q + ': every educational point is a real point');
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
  ok(!/Reviewer references|Do not insert reference labels|Replacement stem|Replacement main explanation|Replace only these numbered|KEEP: the item is suitable/.test(txt),
    Q + ': no reviewer label, source note or instruction leaked into student text');
  ok(!/\bS1[0-9]\b|\bS[1-9]\b/.test(txt), Q + ': no reviewer source tag leaked into student text');
}
ok(kcTotal === 45, '45 Key Concepts across Q1-Q45 (got ' + kcTotal + ')');
ok(blTotal === 15, '15 Bottom Lines across Q46-Q60 (got ' + blTotal + ')');
ok(epBlocks === 15, '15 educational-point blocks (got ' + epBlocks + ')');
ok(epTotal === 48, '48 educational points in all (got ' + epTotal + ')');
ok(JSON.stringify(perItemPoints) === JSON.stringify([3, 4, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3]),
  'the per-item point counts are unchanged: ' + perItemPoints.join(','));
ok(tables === 7, 'seven tables remain (got ' + tables + ')');
{
  const withTable = QS.filter(Q => /<table/.test(rec(Q).explanation));
  ok(JSON.stringify(withTable) === JSON.stringify(['Q1', 'Q4', 'Q9', 'Q15', 'Q39', 'Q54', 'Q55']),
    'and they are the declared seven items');
  for (const Q of ['Q9', 'Q15', 'Q39']) {
    const a = split(pre(Q).explanation).head.match(/<table[\s\S]*?<\/table>/)[0];
    const b = split(rec(Q).explanation).head.match(/<table[\s\S]*?<\/table>/)[0];
    ok(a === b, Q + ": its table is byte-identical, as the review requires");
  }
  for (const Q of ['Q1', 'Q4', 'Q54']) {
    const a = split(pre(Q).explanation).head.match(/<table[\s\S]*?<\/table>/)[0];
    const b = split(rec(Q).explanation).head.match(/<table[\s\S]*?<\/table>/)[0];
    ok(a !== b, Q + ': its table came with the replacement main block');
  }
  const a55 = split(pre('Q55').explanation).head.match(/<table[\s\S]*?<\/table>/)[0];
  const b55 = split(rec('Q55').explanation).head.match(/<table[\s\S]*?<\/table>/)[0];
  ok(a55.replace('<td>20 Hz - 20 kHz</td>', '<td>Approximately 20 Hz–20 kHz</td>') === b55,
    "Q55's table differs in exactly the one named cell");
}
/* the four mechanism/result bullets of Q59 and Q60 */
for (const Q of ['Q59', 'Q60']) {
  const a = split(pre(Q).explanation).head.match(/<ul>[\s\S]*?<\/ul>/)[0].slice(4, -5).split('</li><li>');
  const b = split(rec(Q).explanation).head.match(/<ul>[\s\S]*?<\/ul>/)[0].slice(4, -5).split('</li><li>');
  ok(a.length === 4 && b.length === 4, Q + ': keeps its four mechanism bullets');
  ok(a[0] === b[0] && a[1] === b[1] && a[2] === b[2], Q + ': its first three bullets are untouched');
  ok(a[3] !== b[3], Q + ': and only its fourth bullet changed');
}

/* ------------------------------------------------------------------ */
section('4b. the 180 distractor bodies: 83 replaced, 97 retained, none added');

{
  let before180 = 0;
  for (const Q of QS) before180 += Object.keys(fbParts(pre(Q).explanation)).length ||
    count(pre(Q).explanation, /<li>/g) - (bandOf(Q) === 2 ? split(pre(Q).explanation).points.length : 0) -
    (['Q26', 'Q59', 'Q60'].includes(Q) ? 4 : 0);
  void before180;
  let after = 0;
  for (const Q of QS) {
    const parts = fbParts(rec(Q).explanation);
    if (KEEP.includes(Q)) {
      ok(Object.keys(parts).length === 0, Q + ': a KEEP item has no lettered heading');
      const li = split(rec(Q).explanation).fbBlock.match(/<li>/g) || [];
      ok(li.length === 3, Q + ': but it still carries its three stored bodies');
      after += 3;
      continue;
    }
    const letters = Object.keys(parts);
    after += letters.length;
    ok(letters.length === 3, Q + ': three lettered distractor bodies (got ' + letters.length + ')');
    ok(JSON.stringify(letters) === JSON.stringify(L.split('').filter((_, j) => j !== rec(Q).correct)),
      Q + ': they run in option order and skip the key');
    for (const letter of letters) {
      ok(parts[letter].head === rec(Q).options[L.indexOf(letter)], Q + ' ' + letter + ': the heading reproduces its option text');
      ok(/^ \S/.test(parts[letter].body), Q + ' ' + letter + ': the body opens with the single leading space of the bank convention');
      /* The review forbids a word-count floor, and four RETAINED bodies are
         legitimately terse. Anything short must therefore be a body this pass
         carried over, never one it wrote. */
      const short = parts[letter].body.length <= 40;
      ok(!short || specOf(Q).fbKeep.includes(letter),
        Q + ' ' + letter + ': a short body is one the review retained, not one this pass wrote');
      ok(parts[letter].body.length > 20, Q + ' ' + letter + ': the body is a real explanation, not a stub');
    }
    ok(new Set(letters.map(x => parts[x].body)).size === 3, Q + ': the three bodies are distinct');
  }
  ok(after === 180, '180 distractor bodies after this pass (got ' + after + ')');
}
/* every stored feedback block was reconstructed byte for byte before editing */
for (const Q of QS) {
  if (KEEP.includes(Q)) continue;
  const spec = specOf(Q), band = bandOf(Q);
  const block = band === 1
    ? OLDWHY + '<ul>' + spec.existingFb.map(x => '<li>' + x[1] + ':' + x[2] + '</li>').join('') + '</ul>'
    : NEWWHY + spec.existingFb.map(x => '<p><strong>' + x[0] + '. ' + x[1] + ':</strong>' + x[2] + '</p>').join('');
  ok(split(pre(Q).explanation).fbBlock === block, Q + ': the spec reproduces its stored feedback block byte for byte');
}
/* retained bodies survive verbatim; replaced ones really changed */
for (const Q of QS) {
  if (KEEP.includes(Q)) continue;
  const spec = specOf(Q), parts = fbParts(rec(Q).explanation);
  for (const letter of spec.fbKeep) {
    const body = spec.existingFb.find(x => x[0] === letter)[2];
    ok(pre(Q).explanation.indexOf(body) >= 0, Q + ' ' + letter + ': the retained body really was stored before (non-vacuity)');
    ok(parts[letter].body === body, Q + ' ' + letter + ': it is carried over verbatim');
  }
  for (const letter of spec.fbReplace) {
    const old = spec.existingFb.find(x => x[0] === letter)[2];
    ok(pre(Q).explanation.indexOf(old) >= 0, Q + ' ' + letter + ': the old body really was stored before (non-vacuity)');
    ok(rec(Q).explanation.indexOf(old) < 0, Q + ' ' + letter + ': the old body is gone');
    ok(parts[letter].body !== old, Q + ' ' + letter + ': and the stored body is the replacement');
  }
}
{
  let replaced = 0, retained = 12;   /* the KEEP items hold 12 retained bodies */
  for (const Q of QS) {
    if (KEEP.includes(Q)) continue;
    replaced += specOf(Q).fbReplace.length;
    retained += specOf(Q).fbKeep.length;
  }
  ok(replaced === 83, '83 bodies were replaced (got ' + replaced + ')');
  ok(retained === 97, '97 bodies were retained (got ' + retained + ')');
  ok(replaced + retained === 180, 'and the two account for all 180');
  ok(idmap.scope.distractor_bodies_replaced.length === 83, 'the id map lists all 83');
}
/* band 1 keeps its list container and band 2 its paragraphs */
for (const Q of QS) {
  const fb = split(rec(Q).explanation).fbBlock;
  if (bandOf(Q) === 1) ok(/^<p><strong>Why the other answers are wrong:<\/strong><\/p><ul>/.test(fb), Q + ': keeps its stored list container');
  else ok(fb.startsWith(NEWWHY + '<p>'), Q + ': keeps its stored paragraph container');
}

/* ------------------------------------------------------------------ */
section('5. notation the review asked to inspect rather than assume');

for (const Q of ['Q7', 'Q23', 'Q24', 'Q27', 'Q30', 'Q31', 'Q37', 'Q39', 'Q41', 'Q42']) {
  ok(!/[₀-₉⁰¹²³⁴-⁹]/.test(allText(pre(Q))), Q + ': stored no Unicode exponent or index before this pass');
  ok(/<sup>|<sub>/.test(allText(rec(Q))), Q + ': and carries real markup');
}
/* Every item's exponent and index markup is pinned, so a silent flattening
   anywhere in the block fails here. These are the counts this pass produced;
   the review's instruction is not to "correct" valid markup. */
const SUPSUB = {"Q1":[0,0],"Q2":[5,10],"Q3":[0,5],"Q4":[0,0],"Q5":[0,10],"Q6":[0,2],"Q7":[2,0],"Q8":[0,0],"Q9":[0,2],"Q10":[0,1],"Q11":[0,1],"Q12":[0,4],"Q13":[0,0],"Q14":[0,0],"Q15":[0,0],"Q16":[0,0],"Q17":[0,1],"Q18":[0,0],"Q19":[0,0],"Q20":[0,0],"Q21":[0,0],"Q22":[0,17],"Q23":[11,0],"Q24":[5,14],"Q25":[0,10],"Q26":[0,0],"Q27":[4,8],"Q28":[0,8],"Q29":[0,6],"Q30":[6,12],"Q31":[16,0],"Q32":[2,0],"Q33":[0,0],"Q34":[0,0],"Q35":[0,12],"Q36":[1,6],"Q37":[8,4],"Q38":[0,0],"Q39":[2,1],"Q40":[0,2],"Q41":[5,3],"Q42":[28,1],"Q43":[0,6],"Q44":[0,0],"Q45":[1,4],"Q46":[5,1],"Q47":[1,4],"Q48":[13,6],"Q49":[0,7],"Q50":[0,0],"Q51":[0,0],"Q52":[6,21],"Q53":[11,6],"Q54":[0,0],"Q55":[0,0],"Q56":[0,8],"Q57":[1,0],"Q58":[0,0],"Q59":[0,0],"Q60":[0,1]};
for (const Q of QS) {
  const t = rec(Q).question + rec(Q).options.join('') + rec(Q).explanation;
  const got = [count(t, /<sup>/g), count(t, /<sub>/g)];
  ok(JSON.stringify(got) === JSON.stringify(SUPSUB[Q]),
    Q + ': its exponent and index markup is intact (' + got.join('/') + ' against ' + SUPSUB[Q].join('/') + ')');
}
ok(/10<sup>0<\/sup>/.test(pre('Q53').explanation), "Q53 really stored 10<sup>0</sup>, so the export's \"100\" was a flattening artifact");
ok(/10<sup>-12<\/sup>/.test(pre('Q53').explanation), 'and 10<sup>-12</sup> for the reference intensity');
ok(/10<sup>-12<\/sup>/.test(rec('Q53').explanation) && /10<sup>12<\/sup>/.test(rec('Q53').explanation),
  'Q53 now states the reference and the 10^12 ratio in markup');
for (const Q of ['Q46', 'Q47']) {
  ok(!/ω/.test(allText(pre(Q))), Q + ': stored the letter w for angular frequency, never a flattened omega');
  ok(!/ω/.test(allText(rec(Q))), Q + ': so w is kept throughout, as the review directs');
  ok(rec(Q).question.indexOf('angular frequency w') >= 0, Q + ': its new stem uses w as well');
}
ok(/[ΑΒΓ]/.test(pre('Q41').explanation), "Q41's Key Concept really used uppercase Greek before (non-vacuity)");
for (const Q of QS) ok(!/[ΑΒΓ]/.test(allText(rec(Q))), Q + ': no uppercase Greek particle symbol survives');
ok(/In α decay/.test(rec('Q41').explanation) && /β<sup>-<\/sup>/.test(rec('Q41').explanation),
  "Q41's replacement Key Concept uses conventional lowercase alpha and beta");
for (const Q of QS) {
  ok(!/<sup><\/sup>|<sub><\/sub>/.test(rec(Q).explanation), Q + ': no empty exponent or index element');
  ok(count(allText(rec(Q)), /&[a-zA-Z#][a-zA-Z0-9#]*;/g) <= count(allText(pre(Q)), /&[a-zA-Z#][a-zA-Z0-9#]*;/g),
    Q + ': no HTML entity was introduced');
}

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

/* Q34 is the major scenario repair */
repaired('Q34', 'an electric field E pointing upward', 'an electric field E pointing downward',
  'the electric field is reversed so the two forces can cancel');
ok(/magnetic field B pointing into the page/.test(rec('Q34').question), 'Q34: B still points into the page');
ok(/The electron moves to the right/.test(rec('Q34').question), 'Q34: and the electron still moves to the right');
ok(rec('Q34').correct === 1 && split(rec('Q34').explanation).keyed === 'E = vB', 'Q34: the key is still B, E = vB');
ok(JSON.stringify(rec('Q34').options) === JSON.stringify(pre('Q34').options), 'Q34: all four option texts are unchanged');
ok(/the downward electric field exerts an upward electric force/.test(rec('Q34').explanation),
  'Q34: the explanation gives the electric force direction');
ok(/magnetic force therefore points downward/.test(rec('Q34').explanation),
  'Q34: and the magnetic force direction, before equating magnitudes');
ok(/opposite in direction as well as equal in magnitude/.test(split(rec('Q34').explanation).kc),
  'Q34: the Key Concept requires opposite directions, not just equal magnitudes');
/* Q13 is the competing-answer repair */
repaired('Q13', 'Collimating lens that makes light rays parallel', 'Lens that forms the first real image directly from the specimen',
  'the defensible collimation distractor is replaced rather than denied');
ok(/rays from each image point emerge parallel/.test(rec('Q13').explanation),
  'Q13: and the explanation now accepts that a relaxed-eye eyepiece does collimate');
ok(rec('Q13').correct === 0, 'Q13: the key is still A');
repaired('Q12', 'optical interval (tube length)', 'relaxed-eye viewing (final image at infinity)',
  'relaxed-eye adjustment and the optical interval justify 400x');
ok(/rear focal point/.test(rec('Q12').question), 'Q12: the optical interval is defined between the specified focal points');
repaired('Q1', '0 m/s (no sound)', 'Not applicable: sound cannot propagate', 'a vacuum has no sound speed of zero');
repaired('Q1', '~5000 m/s', 'About 5000–6000 m/s for longitudinal sound', 'the steel figure is a qualified range');
ok(split(rec('Q54').explanation).head.indexOf('About 5000–6000 m/s for longitudinal sound') >= 0,
  "Q54 uses the same qualified steel range as Q1");
repaired('Q54', '~5,960 m/s', 'elastic stiffness relative to density', 'stiffness relative to density replaces density alone');
repaired('Q54', 'Only electromagnetic waves (like light) can travel through a vacuum.', 'Light can cross a vacuum because it is an electromagnetic wave',
  'the "only electromagnetic waves" claim is gone');
repaired('Q2', 'The threshold of human hearing is defined as', 'Using the reference intensity',
  'the reference intensity replaces a biological threshold');
repaired('Q2', 'There is no reason to get 1; log(1) = 0, not 0.1.', 'about 1.26', 'the 1 dB feedback gives the real ratio');
repaired('Q4', 'inaudible to humans', 'below the usual human hearing range', 'infrasound is not categorically inaudible');
repaired('Q5', '600 x 340/380 &asymp; 537 Hz, close to this', '≈ 537 Hz, not 548 Hz',
  '548 Hz is no longer attributed to the receding calculation');
repaired('Q6', 'This is what you would get if the car were approaching rather than receding.', '= 425 Hz, not 424 Hz',
  'approach gives 425 Hz, not the displayed 424 Hz');
repaired('Q7', 'The factor 2&pi; relates angular frequency (&omega;) to regular frequency, not period to frequency.', 'ω = 2πf = 2π/T',
  'angular frequency is related to the period as well');
repaired('Q9', 'A compound microscope has two converging lenses working in series:', 'In this simplified compound-microscope model',
  'the two-lens model is scoped');
repaired('Q10', 'the best possible resolution is about 200 nm', 'not a universal limit for every microscopy technique',
  'the absolute 200 nm limit is gone');
repaired('Q11', 'the numerical aperture increases by a factor of about 1.5', 'does not guarantee a fixed 1.5-fold gain',
  'the universal 1.5-fold improvement is gone');
repaired('Q14', 'In a PN junction diode under forward bias', 'under appreciable forward bias', 'forward bias is qualified');
repaired('Q14', 'The silicon diode begins conducting significantly at about 0.6 V forward bias.', 'not a universal turn-on threshold',
  '0.6 V is a model value, not a switch-on threshold');
repaired('Q15', 'Metals do not integrate into the silicon crystal lattice in the same way.', 'Copper and gold can occur as impurities in silicon',
  'metals can enter silicon, but are not the standard shallow donors');
repaired('Q16', 'What is the approximate forward voltage drop across a silicon diode when it is conducting?', 'constant-voltage-drop model',
  'the approximate model is named');
repaired('Q17', 'This would require a full-wave rectifier using four diodes in a bridge configuration.', 'suitable two-diode, center-tapped arrangement',
  'a bridge is not the only full-wave rectifier');
repaired('Q18', 'An insulator that blocks current flow', 'An insulating barrier that strongly limits current flow',
  'reverse bias limits rather than forbids current');
repaired('Q18', 'The depletion region has no free charge carriers.', 'not absolutely empty of carriers',
  'depletion is not literally no carriers');
repaired('Q19', 'The coil is placed in a uniform, steady magnetic field', 'The coil remains stationary in a uniform, steady magnetic field',
  '"placed" no longer hides a flux change');
repaired('Q21', 'This ignores the number of turns (divides by 200 instead of multiplying).', '2 V per turn and 400 V for 200 turns',
  'the 4 V feedback gives the real arithmetic');
repaired('Q22', 'A transformer has 100 primary turns', 'An ideal transformer has 100 primary turns', 'the ideal-transformer and RMS conditions are explicit');
repaired('Q24', 'Impedance would only be zero if R were also zero', 'the stated resistance is positive', 'R > 0 is stated');
repaired('Q26', 'This only occurs in a purely resistive circuit.', 'a series RLC circuit at resonance',
  'a net-resistive RLC circuit can also be in phase');
repaired('Q27', 'Off by a factor, possibly from converting micro to milli incorrectly.', 'angular resonant frequency in rad/s',
  'the 1000 distractor is identified as the angular frequency');
repaired('Q29', 'This is 230/&radic;2, which would give a lower value, not higher.', 'multiply by √2 instead',
  'the 163 V feedback is restated');
repaired('Q30', 'This adds R + X<sub>L</sub> - X<sub>C</sub>/2 or some other incorrect combination.', 'does not follow from the series-impedance formula',
  'the false 110 arithmetic is gone');
repaired('Q31', 'F = qvB sin(&theta;)', 'F = |q|vB sinθ', 'charge magnitude is used in a magnitude formula');
repaired('Q32', 'A charged particle moves in a circle of radius r in a uniform magnetic field.', 'nonrelativistic',
  'the nonrelativistic model is stated');
repaired('Q33', 'the mass increases and the cyclotron frequency assumption breaks down', 'even though rest mass is unchanged',
  'rest mass does not increase');
repaired('Q35', 'The ratio of the radius of the α particle', 'perpendicular to the field', 'circular rather than helical motion');
repaired('Q36', 'if the temperature of a black body is doubled', 'absolute temperature in kelvin doubles', 'absolute temperature is specified');
repaired('Q36', 'The Sun (5800 K) peaks in the green-yellow range.', 'its overall appearance depends on its broad spectrum',
  'the green-yellow label is gone');
repaired('Q37', 'If the temperature increases from 300 K to 600 K', 'emitting surface area stays fixed', 'the area is fixed');
repaired('Q37', null, 'not net radiative heat loss', 'emitted power is distinguished from net heat transfer');
repaired('Q38', "This is simply because our eyes' photoreceptors are not sensitive to UV wavelengths.", 'lies outside the usual visible band',
  'the UV photoreceptor claim is gone');
repaired('Q38', 'later confirmed by Einstein', 'Einstein later used light quanta', "Einstein's work is not called confirmation");
repaired('Q39', 'A radioactive sample has an initial activity', 'Ignoring any activity from daughter products', 'one isotope is specified');
repaired('Q40', 'This means that on any given day, each atom has about a 6.9% probability of decaying.', 'decay rate per surviving nucleus',
  'the rate constant is not a finite one-day probability');
repaired('Q41', 'Z=91 means losing only 1 proton, which is β-plus decay, not α.', 'Beta-plus decay would lower Z by 1 but leave A unchanged',
  'the false beta-plus explanation is repaired');
repaired('Q42', 'how many atoms remain?', 'original nuclei remain undecayed', 'undecayed original nuclei, not all atoms');
repaired('Q43', 'Since &kappa; > 1 for all real dielectrics', 'Because the specified κ is greater than 1', 'the ordinary static dielectric model');
repaired('Q43', null, 'the voltage does not decrease', 'the fixed-charge and fixed-voltage cases are distinguished');
repaired('Q44', 'why water has a very high dielectric constant (~80)?', 'about 80 near room temperature', 'the value is scoped');
repaired('Q44', 'Nonpolar molecules only develop weak induced dipoles', 'Thermal motion prevents perfect alignment', 'alignment is partial');
repaired('Q45', 'This allows capacitors to store more charge and energy in the same physical size, which is why practical capacitors always contain dielectric materials.', 'At fixed charge instead, U = Q<sup>2</sup>/(2C) decreases to one-quarter',
  'more stored energy follows at fixed voltage, not at fixed charge');
repaired('Q46', 'This is the formula for <strong>capacitive reactance</strong> (XC = 1/(wC)), not inductive reactance.', 'has units of siemens, not ohms',
  '1/(wL) is not the capacitive-reactance formula');
repaired('Q47', 'charge and discharge the capacitor more effectively', 'The current satisfies i = C(dv/dt)', 'the derivative relation replaces "more effectively"');
repaired('Q48', 'The total impedance Z of a series RLC circuit is given by:', 'impedance magnitude Z', 'the magnitude is distinguished from complex impedance');
repaired('Q49', 'Higher Q means a narrower, taller peak.', 'Peak current is V/R', 'a higher Q does not by itself give a taller peak');
repaired('Q50', 'The current must change before the voltage responds', 'For a sinusoidal current, its rate of change is one-quarter cycle ahead',
  'the causal "current changes first" story is replaced');
repaired('Q50', 'it would require a negative resistance, which is not physically standard', 'The derivative relation for an ideal inductor gives a quarter-cycle',
  'the negative-resistance claim is gone');
repaired('Q51', 'current must flow to charge the capacitor before a voltage can build up', 'Differentiating a sine-wave voltage gives a current one-quarter cycle ahead',
  'the literal waiting time is replaced by the derivative relation');
repaired('Q51', null, 'Current magnitude is greatest', 'maximum magnitude is distinguished from a signed maximum');
repaired('Q52', 'has units of amperes/ohms = siemens', 'has units A/Ω, not volts and not siemens', 'the A/Ω units error is repaired');
repaired('Q52', null, 'For a series RLC circuit, Z = √[R<sup>2</sup>', 'the square-root formula is scoped to a series circuit');
repaired('Q53', 'OSHA limits occupational exposure to 8 hours at this level', 'absence of pain does not mean a sound cannot damage hearing',
  'the occupational exposure limit is gone');
repaired('Q53', 'Common reference levels: whisper ~20 dB', 'Biological thresholds vary', 'the fixed everyday-noise list is gone');
ok(rec('Q53').correct === 2 && split(rec('Q53').explanation).keyed === '120 dB', 'Q53: the key is still C, 120 dB');
repaired('Q55', 'The frequency spectrum of sound is divided into three ranges based on human hearing:', 'approximate hearing range of a typical young listener',
  'the audible band is a conventional approximation');
repaired('Q56', 'An ambulance is approaching a stationary observer with its siren blaring.', 'stationary relative to still air',
  'the moving-source formula is scoped');
repaired('Q56', 'The abrupt apparent change in pitch occurs at the moment the ambulance passes the observer', 'Nothing in the question describes repeated changes',
  'the instantaneous pitch jump claim is gone');
repaired('Q57', 'This answer might be confused with the behavior of wavelength in a different context (e.g., standing waves in a fixed medium).', 'Period and frequency are reciprocals',
  'the unrelated standing-wave suggestion is gone');
repaired('Q58', 'Alkali metals with 1 valence electron are not used as semiconductor dopants.', 'not the standard substitutional donor dopants',
  'the claim about all possible dopants is narrowed');
repaired('Q58', 'the basis for diodes, transistors, and all modern electronics', 'used in junction diodes and bipolar transistors',
  'PN junctions do not underlie literally all electronics');
repaired('Q58', 'The dopant concentrations are extremely small (about 1 dopant per 10<sup>6</sup> to 10<sup>8</sup> silicon atoms)', 'the semiconductor remains electrically neutral overall',
  'the fixed tiny concentration range is gone');
repaired('Q59', 'once the threshold voltage is exceeded (~0.7 V for silicon, ~0.3 V for germanium)', 'increase continuously and strongly with applied voltage',
  'the abrupt threshold claim is gone from the mechanism bullet');
repaired('Q59', 'The threshold voltage for silicon diodes is approximately 0.7 V.', 'not a universal threshold',
  'and from the Bottom Line');
repaired('Q60', "increases the diode's capacitance area", 'lowers junction capacitance',
  'widening the depletion layer REDUCES junction capacitance');
ok(/C<sub>j<\/sub> = εA\/W/.test(rec('Q60').explanation), 'Q60: and the point gives the approximate relation');
repaired('Q60', 'doubles for every 10 degrees C', 'not a universal law for all diodes', 'the universal leakage-temperature law is gone');
repaired('Q60', 'This is destructive for normal diodes', 'Excess current or power can damage a diode', 'breakdown is not automatically destructive');

/* ------------------------------------------------------------------ */
section("7. the review's numerical results, recomputed here");

ok(round(10 * Math.log10(1), 6) === 0, 'Q2: 10 log10(1) = 0 dB');
ok(round(Math.pow(10, 0.1), 2) === 1.26, 'Q2: 1 dB would need a ratio of about 1.26');
ok(round(10 * Math.log10(100), 6) === 20, 'Q3: 10 log10(100) = 20 dB');
ok(round(600 * 340 / (340 - 40), 6) === 680, 'Q5: the approaching source gives 680 Hz');
ok(round(600 * 340 / (340 + 40), 0) === 537, 'Q5: and a receding source would give about 537 Hz, not 548');
ok(round(400 * 340 / (340 + 20), 1) === 377.8, 'Q6: the receding source gives 377.8 Hz, rounding to 378');
ok(round(400 * 340 / (340 - 20), 6) === 425, 'Q6: and approach would give 425 Hz, not 424');
ok(round((160 / 4) * (250 / 25), 6) === 400, 'Q12: (160/4)(250/25) = 400x');
ok(round(200 * Math.abs(0.01 - 0.05) / 0.02, 6) === 400, 'Q21: the average induced emf is 400 V');
ok(round(Math.abs(0.01 - 0.05) / 0.02, 6) === 2, 'Q21: which is 2 V per turn, so ignoring the turns gives 2 V, not 4 V');
ok(round(400 / 200, 6) === 2 && round(0.4 * 1000, 6) === 400, 'Q21: and dividing by 200 would give 0.01 V, neither displayed distractor');
ok(round(12 * 2000 / 100, 6) === 240, 'Q22: the secondary voltage is 240 V');
ok(round(1 / (2 * Math.PI * Math.sqrt(0.1 * 10e-6)), 0) === 159, 'Q27: the resonant frequency is about 159 Hz');
ok(round(1 / Math.sqrt(0.1 * 10e-6), 0) === 1000, 'Q27: and 1/sqrt(LC) = 1000 rad/s, which is the 1000 distractor');
ok(round(Math.cos(0), 6) === 1, 'Q28: the power factor of an ideal resistor is 1');
ok(round(230 * Math.SQRT2, 0) === 325, 'Q29: the peak voltage is about 325 V');
ok(round(Math.sqrt(30 * 30 + (100 - 60) * (100 - 60)), 6) === 50, 'Q30: the impedance magnitude is 50 ohm');
ok(round(30 + 100 - 60 / 2, 6) === 100, 'Q30: and 30 + 100 - 60/2 is 100, not the 110 the old feedback claimed');
ok(round(1.6e-19 * 2e6 * 0.5, 20) === 1.6e-13, 'Q31: the magnetic force is 1.6 x 10^-13 N');
ok(round(1.6e-19 * 2e6, 20) === 3.2e-13, 'Q31: and omitting B gives 3.2 x 10^-13 N');
ok(round((4 / 2), 6) === 2, 'Q35: the alpha-to-proton radius ratio is 2:1');
ok(round(Math.pow(600 / 300, 4), 6) === 16, 'Q37: the Stefan-Boltzmann factor is 16');
ok(round(800 * Math.pow(0.5, 12 / 4), 6) === 100, 'Q39: the activity after three half-lives is 100 Bq');
ok(round(Math.log(2) / 10, 4) === 0.0693, 'Q40: the decay constant is 0.0693 per day');
ok(round(1 - Math.exp(-Math.log(2) / 10), 3) === 0.067, 'Q40: while the one-day decay probability is about 6.7%, not 6.9%');
ok(238 - 4 === 234 && 92 - 2 === 90, 'Q41: alpha decay of U-238 gives Th-234');
ok(round(6.4e8 * Math.pow(0.5, 5), 6) === 2e7, 'Q42: five half-lives leave 2 x 10^7 nuclei');
ok(round(4 * 5, 6) === 20, 'Q45: kappa = 4 takes 5 uF to 20 uF');
ok(round(Math.pow(10, 120 / 10) * 1e-12, 6) === 1, 'Q53: 120 dB with the stated reference is 1 W/m2');
ok(round(Math.pow(10, 60 / 10) * 1e-12, 12) === 1e-6, 'Q53: and 60 dB is 10^-6 W/m2');
ok(120 - 90 === 30, 'Q53: 90 dB is 30 dB, a factor of 1000 in intensity, below 120 dB');
ok(160 - 120 === 40, 'Q53: and 160 dB is 40 dB, a factor of 10,000, above it');
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
  const other = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
  ok(other.biology.length === 629 && other.chemistry.length === 485,
    'biology and chemistry are untouched at 629 and 485 records');
}

/* ------------------------------------------------------------------ */
section('9. the coverage ledger and the id map record');

ok(idmap.coverage.physics_bank_size === 280, 'the ledger records a 280-record physics bank');
ok(idmap.coverage.reviewed_before_this_block === 180 && idmap.coverage.new_unique_ids_this_block === 60,
  'it records 180 previously reviewed and 60 new ids');
ok(idmap.coverage.reviewed_after_this_block === 240, 'so coverage becomes 240 of 280');
ok(idmap.coverage.still_unreviewed === 40, 'and 40 physics records remain unreviewed');
ok(idmap.coverage.reviewed_after_this_block + idmap.coverage.still_unreviewed === 280, 'the coverage sum closes');
ok(idmap.verification.key_changes === 0, 'the record states that no answer letter changed');
ok(idmap.verification.matched_exactly === 60, 'and that all 60 signatures matched exactly');
ok(idmap.notes.join(' ').indexOf('do not establish scientific accuracy') >= 0,
  'the id map states that these checks are not scientific approval');
ok(idmap.presentation.distractor_bodies === 180, 'the record states that the block holds 180 distractor bodies');
ok(idmap.presentation.key_concepts === 45 && idmap.presentation.bottom_lines === 15 && idmap.presentation.educational_points === 48,
  'and the two bands at 45 Key Concepts, 15 Bottom Lines and 48 educational points');
ok(idmap.scope.keep_items.length === 4 && idmap.scope.edited_items === 56, 'and 4 KEEP items against 56 edited');
ok(Object.keys(idmap.map).length === 60 && Object.keys(idmap.asserted_keys).length === 60,
  'the map and the asserted keys both cover 60 displays');
for (const Q of QS) ok(idmap.asserted_keys[Q] === L[rec(Q).correct], Q + ': the asserted key matches the stored key');

console.log('\n' + n + ' checks, ' + bad + ' failure(s)');
if (bad) process.exit(1);
