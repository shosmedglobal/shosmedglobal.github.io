/* Apply the SHOSMED LF3 FINAL review pack to questions.json: the last ten
 * unreviewed chemistry questions and three supplied biology questions.
 *
 * All-or-nothing. Every edit is anchored on the exact text it replaces, every
 * id/answer-letter pair is re-confirmed against the stored record, and the
 * inventories the brief asserts are re-checked after the edits. Nothing is
 * written unless every check passes.
 *
 * Verified map: scripts/review-final-pack-idmap.json
 * Edit specs:   scripts/final-pack-edits.js
 *
 * Usage: node scripts/apply-review-final-pack.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const L = 'ABCD';
const WHY = '<h4>Why the other choices are wrong:</h4>';
const KEP = '<h4>Key Educational Points:</h4>';
const BLOPEN = "<p class='exp-key'>Bottom Line: ";

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
if (JSON.stringify(data, null, 2) + '\n' !== raw) {
  console.error('ABORT: questions.json does not round-trip through JSON.stringify(.., null, 2)');
  process.exit(1);
}
const before = JSON.parse(raw);

const IDMAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/review-final-pack-idmap.json'), 'utf8'));
const MAP = IDMAP.map;
const KEEP = new Set(IDMAP.scope.keep_unchanged);
const SPECS = require('./final-pack-edits.js');

const problems = [];
const fail = m => problems.push(m);
const sub = id => (id.startsWith('bio-') ? 'biology' : 'chemistry');
const find = (d, id) => d[sub(id)].find(r => r.id === id);

/* ---------- structure split / join, for items that already have markup ---------- */
function split(exp) {
  const km = exp.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!km) return null;
  const a = exp.indexOf(WHY);
  if (a < 0) return null;
  const head = exp.slice(km[0].length, a);
  const after = exp.slice(a + WHY.length);
  let cut = after.length;
  const iK = after.indexOf(KEP); if (iK >= 0) cut = Math.min(cut, iK);
  const iB = after.indexOf(BLOPEN); if (iB >= 0) cut = Math.min(cut, iB);
  const fb = after.slice(0, cut);
  let rest = after.slice(cut);
  let points = null;
  if (rest.startsWith(KEP)) {
    const um = rest.slice(KEP.length).match(/^<ul>([\s\S]*?)<\/ul>/);
    if (!um) return null;
    points = um[1];
    rest = rest.slice(KEP.length + um[0].length);
  }
  let bl = null;
  if (rest.startsWith(BLOPEN)) {
    const bm = rest.match(/^<p class='exp-key'>Bottom Line: ([\s\S]*?)<\/p>/);
    if (!bm) return null;
    bl = bm[1];
    rest = rest.slice(bm[0].length);
  }
  return { keyed: km[1], head, fb, points, bl, tail: rest };
}
function join(s) {
  let out = '<h4>Correct Answer: ' + s.keyed + '</h4>' + s.head + WHY + s.fb;
  if (s.points !== null) out += KEP + '<ul>' + s.points + '</ul>';
  if (s.bl !== null) out += BLOPEN + s.bl + '</p>';
  return out + s.tail;
}
function parseFb(fb) {
  const re = /<p><strong>([ABCD])\. ([\s\S]*?):<\/strong>([\s\S]*?)<\/p>/g;
  const items = [], seps = [];
  let m, last = 0;
  while ((m = re.exec(fb))) {
    seps.push(fb.slice(last, m.index));
    items.push({ letter: m[1], head: m[2], body: m[3] });
    last = m.index + m[0].length;
  }
  return { items, seps, post: fb.slice(last) };
}
function buildFb(p) {
  let out = '';
  p.items.forEach((it, i) => {
    out += p.seps[i] + '<p><strong>' + it.letter + '. ' + it.head + ':</strong>' + it.body + '</p>';
  });
  return out + p.post;
}
const liOf = points => (points.match(/<li>[\s\S]*?<\/li>/g) || []).map(x => x.slice(4, -5));
const pointsOf = arr => arr.map(x => '<li>' + x + '</li>').join('');

/* ---------- apply ---------- */
const stat = { changed: [], stems: [], rebuilt: [], frozen: [], headEdit: 0, fbBodies: 0, pointBlocks: [], pointEdits: 0, bls: [] };

for (const spec of SPECS) {
  const where = spec.k + ' ' + spec.id;
  if (MAP[spec.k] !== spec.id) { fail(where + ': the verified map says ' + MAP[spec.k]); continue; }
  if (sub(spec.id) !== spec.subject) { fail(where + ': subject mismatch'); continue; }
  if (IDMAP.asserted_keys[spec.k] !== spec.key) { fail(where + ': the id map asserts key ' + IDMAP.asserted_keys[spec.k]); continue; }
  const r = find(data, spec.id);
  if (!r) { fail(where + ': record not found'); continue; }
  if (L[r.correct] !== spec.key) {
    fail(where + ': STORED KEY IS ' + L[r.correct] + ' BUT THE BRIEF SAYS ' + spec.key + ' - report before changing any key');
    continue;
  }
  const pre = JSON.stringify({ q: r.question, o: r.options, e: r.explanation });

  if (spec.keep) {
    if (!KEEP.has(spec.k)) fail(where + ': marked keep but not in the id map KEEP list');
    stat.frozen.push(spec.k);
    continue;
  }
  if (KEEP.has(spec.k)) { fail(where + ': in the KEEP list but the spec edits it'); continue; }

  /* stem */
  if (spec.stem !== undefined) {
    if (spec.stemWas === undefined) { fail(where + ': a stem replacement needs stemWas'); continue; }
    if (r.question !== spec.stemWas) { fail(where + ': the stem is not the reconfirmed text'); continue; }
    r.question = spec.stem;
    stat.stems.push(spec.k);
  }
  if (spec.options) { fail(where + ': this pack changes no option text'); continue; }

  if (spec.rebuild) {
    const rb = spec.rebuild;
    /* the gap must be real: the stored explanation carries no markup at all */
    if (/</.test(r.explanation)) { fail(where + ': the stored explanation already has markup, so it must be reconciled, not rebuilt'); continue; }
    let head;
    if (rb.headFromStored) {
      let prose = r.explanation;
      let bad = false;
      for (const [from, to] of (rb.headEdits || [])) {
        const n = prose.split(from).length - 1;
        if (n !== 1) { fail(where + ' head edit matched ' + n + ' time(s)'); bad = true; break; }
        prose = prose.replace(from, to);
        stat.headEdit++;
      }
      if (bad) continue;
      head = '<p>' + prose + '</p>';
    } else {
      if (!rb.headMustContain || r.explanation.indexOf(rb.headMustContain) < 0) {
        fail(where + ': the stored explanation does not contain ' + JSON.stringify(rb.headMustContain)); continue;
      }
      head = rb.head;
    }
    const keyed = rb.keyedFromOption ? r.options[r.correct] : rb.keyed;
    if (keyed !== r.options[r.correct]) { fail(where + ': the keyed heading does not reproduce the keyed option'); continue; }
    let exp = '<h4>Correct Answer: ' + keyed + '</h4>' + head + WHY;
    const seen = new Set();
    let bad = false;
    for (const [letter, body] of rb.fb) {
      const j = L.indexOf(letter);
      if (j < 0 || j === r.correct || seen.has(letter)) { fail(where + ': rebuild feedback letter ' + letter + ' is invalid or repeated'); bad = true; break; }
      seen.add(letter);
      exp += '<p><strong>' + letter + '. ' + r.options[j] + ':</strong>' + body + '</p>';
      stat.fbBodies++;
    }
    if (bad) continue;
    if (seen.size !== 3) { fail(where + ': rebuild supplied ' + seen.size + ' distractor paragraphs, expected 3'); continue; }
    r.explanation = exp;
    stat.rebuilt.push(spec.k);
  } else {
    const s = split(r.explanation);
    if (!s) { fail(where + ': the explanation does not parse into keyed/head/feedback'); continue; }
    const keyedWas = s.keyed;
    let bad = false;
    for (const [from, to] of (spec.headEdits || [])) {
      const n = s.head.split(from).length - 1;
      if (n !== 1) { fail(where + ' head edit matched ' + n + ' time(s): ' + JSON.stringify(from.slice(0, 60))); bad = true; break; }
      s.head = s.head.replace(from, to);
      stat.headEdit++;
    }
    if (bad) continue;

    const fbp = parseFb(s.fb);
    if (fbp.items.length !== 3) { fail(where + ': parsed ' + fbp.items.length + ' feedback paragraphs, expected 3'); continue; }
    const byLetter = {};
    for (const it of fbp.items) byLetter[it.letter] = it;
    if (Object.keys(byLetter).length !== 3 || byLetter[L[r.correct]]) {
      fail(where + ': feedback letters are ' + fbp.items.map(x => x.letter).join('') + ' with key ' + L[r.correct]); continue;
    }
    for (const letter of Object.keys(spec.fb || {})) {
      const it = byLetter[letter];
      if (!it) { fail(where + ': no feedback paragraph for ' + letter); bad = true; break; }
      it.body = spec.fb[letter];
      stat.fbBodies++;
    }
    if (bad) continue;

    if (spec.points !== undefined) {
      if (s.points === null) { fail(where + ': no point block to replace'); continue; }
      if (liOf(s.points).length !== spec.points.length) {
        fail(where + ': point replacement changes the count from ' + liOf(s.points).length + ' to ' + spec.points.length); continue;
      }
      s.points = pointsOf(spec.points);
      stat.pointBlocks.push(spec.k);
    }
    for (const [idx, from, to] of (spec.pointEdits || [])) {
      if (s.points === null) { fail(where + ': no point block for a point edit'); bad = true; break; }
      const li = liOf(s.points);
      if (!li[idx] || li[idx] !== from) { fail(where + ' point ' + (idx + 1) + ': expected ' + JSON.stringify(String(from).slice(0, 60))); bad = true; break; }
      li[idx] = to;
      s.points = pointsOf(li);
      stat.pointEdits++;
    }
    if (bad) continue;

    if (spec.bl !== undefined) {
      if (s.bl === null) { fail(where + ': no Bottom Line to replace'); continue; }
      s.bl = spec.bl;
      stat.bls.push(spec.k);
    }

    /* headings: this pack changes none. The keyed style is per item and kept. */
    if (s.keyed !== keyedWas) { fail(where + ': the keyed heading changed'); continue; }
    for (const it of fbp.items) {
      const want = r.options[L.indexOf(it.letter)];
      if (it.head !== want) { fail(where + ' ' + it.letter + ': its heading does not reproduce its option'); bad = true; break; }
    }
    if (bad) continue;
    s.fb = buildFb(fbp);
    r.explanation = join(s);
  }

  const post = JSON.stringify({ q: r.question, o: r.options, e: r.explanation });
  if (post !== pre) stat.changed.push(spec.k);
  else fail(where + ': the spec produced no change');
}

/* ---------- pack-wide invariants ---------- */
const KS = Object.keys(MAP);
if (SPECS.length !== 13) fail('loaded ' + SPECS.length + ' specs, expected 13');
if (new Set(SPECS.map(s => s.k)).size !== 13) fail('the specs do not cover 13 distinct displays');

let pts = 0, blocks = 0, bls = 0, tables = 0, fbParas = 0;
const headBad = [], tableItems = [], blItems = [];
for (const k of KS) {
  const r = find(data, MAP[k]);
  const e = r.explanation;
  const ul = e.match(/<h4>Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  if (ul) { blocks++; pts += (ul[1].match(/<li>/g) || []).length; }
  if (e.indexOf(BLOPEN) >= 0) { bls++; blItems.push(k); }
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(k); }
  const a = e.indexOf(WHY);
  if (a < 0) { fail(k + ': no "Why the other choices are wrong" heading'); continue; }
  let z = e.length;
  const iK = e.indexOf(KEP); if (iK > a) z = Math.min(z, iK);
  const iB = e.indexOf(BLOPEN); if (iB > a) z = Math.min(z, iB);
  const parts = [...e.slice(a + WHY.length, z).matchAll(/<p><strong>([ABCD])\. ([\s\S]*?):<\/strong>/g)];
  fbParas += parts.length;
  if (parts.length !== 3) fail(k + ': ' + parts.length + ' distractor paragraphs, expected 3');
  if (new Set(parts.map(m => m[1])).size !== 3) fail(k + ': duplicate distractor letters');
  for (const m of parts) {
    if (m[1] === L[r.correct]) fail(k + ': a feedback paragraph for the keyed letter');
    if (m[2] !== r.options[L.indexOf(m[1])]) headBad.push(k + ' ' + m[1]);
  }
  const kh = (e.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/) || [])[1];
  if (kh === undefined) { fail(k + ': no keyed heading'); continue; }
  if ((e.match(/<h4>Correct Answer:/g) || []).length !== 1) fail(k + ': duplicated keyed heading');
  if ((e.match(new RegExp(WHY.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length !== 1) fail(k + ': duplicated feedback heading');
  const bare = kh.replace(/^[ABCD]\. /, '');
  if (bare !== r.options[r.correct]) headBad.push(k + ' keyed');
  if (/<p><p>|<\/p><\/p>/.test(e)) fail(k + ': doubled paragraph tags');
  for (const t2 of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t2 + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t2 + '>', 'g')) || []).length;
    if (o !== c) fail(k + ': unbalanced <' + t2 + '> ' + o + '/' + c);
  }
  if (/�/.test(r.question + r.options.join('') + e)) fail(k + ': replacement character');
}
if (pts !== 20 || blocks !== 5) fail('points ' + pts + ' in ' + blocks + ' blocks, expected 20 in 5');
if (bls !== 4 || JSON.stringify(blItems) !== JSON.stringify(['B1', 'B2', 'B3', 'B4']))
  fail('Bottom Lines: ' + bls + ' in ' + blItems.join(',') + ', expected 4 in B1,B2,B3,B4');
if (tables !== 2 || JSON.stringify(tableItems) !== JSON.stringify(['B2', 'B3']))
  fail('tables: ' + tables + ' in ' + tableItems.join(',') + ', expected 2 in B2,B3');
if (fbParas !== 39) fail('distractor paragraphs ' + fbParas + ', expected 39');
if (headBad.length) fail('headings not matching their options: ' + headBad.join(', '));

/* scope */
if (JSON.stringify(stat.stems) !== JSON.stringify(IDMAP.scope.stem_changes))
  fail('stems replaced ' + stat.stems.join(',') + ', expected ' + IDMAP.scope.stem_changes.join(','));
if (JSON.stringify(stat.rebuilt) !== JSON.stringify(IDMAP.scope.explanations_rebuilt))
  fail('rebuilt ' + stat.rebuilt.join(',') + ', expected ' + IDMAP.scope.explanations_rebuilt.join(','));
if (JSON.stringify(stat.frozen) !== JSON.stringify(IDMAP.scope.keep_unchanged))
  fail('frozen ' + stat.frozen.join(',') + ', expected ' + IDMAP.scope.keep_unchanged.join(','));
if (stat.changed.length !== 11) fail(stat.changed.length + ' items changed, expected 11');
for (const k of stat.frozen) {
  if (JSON.stringify(find(before, MAP[k])) !== JSON.stringify(find(data, MAP[k]))) fail(k + ': a KEEP item changed');
}
for (const k of KS) {
  const a = find(before, MAP[k]), b = find(data, MAP[k]);
  if (a.id !== b.id || a.correct !== b.correct || a.topic !== b.topic) fail(k + ': id, key or topic moved');
  if (JSON.stringify(a.options) !== JSON.stringify(b.options)) fail(k + ': an option text changed');
}

/* nothing outside the pack */
const PACK = new Set(Object.values(MAP));
if (data.chemistry.length !== 485 || data.biology.length !== 629) fail('bank sizes moved');
for (const s of ['biology', 'chemistry']) for (const r of before[s]) {
  if (PACK.has(r.id)) continue;
  if (JSON.stringify(data[s].find(x => x.id === r.id)) !== JSON.stringify(r)) fail('out-of-pack record changed: ' + r.id);
}

if (problems.length) {
  console.error('ABORTED, nothing written (' + problems.length + ' problem(s)):\n  ' + problems.join('\n  '));
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
const list = a => (a.length ? ' (' + a.join(', ') + ')' : '');
console.log('13/13 displays processed; 2 KEEP items byte-identical' + list(stat.frozen));
console.log('  items changed       : ' + stat.changed.length + list(stat.changed));
console.log('  explanations rebuilt: ' + stat.rebuilt.length + list(stat.rebuilt) + ' (keyed heading and three distractor paragraphs added)');
console.log('  stems replaced      : ' + stat.stems.length + list(stat.stems));
console.log('  option texts        : 0; answer letters moved: 0; keys changed: 0');
console.log('  head/table edits    : ' + stat.headEdit + '; feedback bodies written: ' + stat.fbBodies);
console.log('  point blocks        : ' + stat.pointBlocks.length + ' replaced, ' + stat.pointEdits + ' individual points edited');
console.log('  Bottom Lines        : ' + stat.bls.length + ' replaced' + list(stat.bls));
console.log('  pack: ' + pts + ' points in ' + blocks + ' blocks, ' + bls + ' Bottom Lines, ' + tables + ' tables, ' + fbParas + ' distractor paragraphs');
