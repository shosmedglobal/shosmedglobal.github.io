/* Apply the SHOSMED LF3 chemistry batch 8 content review to questions.json.
 *
 * All-or-nothing. Every edit is anchored on the exact text it replaces, every
 * id/answer-letter pair is re-confirmed against the stored record, and the
 * pack-wide inventories the review asserts are re-checked after the edits.
 * Nothing is written unless every check passes.
 *
 * Verified display -> bank id map: scripts/chem-review-batch8-idmap.json
 * Edit specs: scripts/chem-batch8-edits-{a..f}.js (ten display items each).
 *
 * Usage: node scripts/apply-chem-review-batch8.js
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

const IDMAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch8-idmap.json'), 'utf8'));
const MAP = IDMAP.map;
const KEEP = new Set(IDMAP.scope.keep_unchanged);

const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e', 'f'])
  for (const s of require('./chem-batch8-edits-' + m + '.js')) SPECS.push(s);

const problems = [];
const fail = m => problems.push(m);

/* ---------- structure split / join ---------- */
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

/* feedback paragraphs, keeping the exact glue between them */
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
const liOf = points => {
  const m = points.match(/<li>[\s\S]*?<\/li>/g) || [];
  return m.map(x => x.slice(4, -5));
};
const pointsOf = arr => arr.map(x => '<li>' + x + '</li>').join('');

/* ---------- apply ---------- */
const stat = {
  changed: [], stems: [], opts: [], headFull: [], headEdit: 0, fbBodies: 0, fbEdit: 0,
  pointBlocks: [], pointEdits: 0, bls: [], blEdits: 0, headsKeyed: 0, headsDistractor: 0,
  rebuilt: [], frozen: []
};

for (const spec of SPECS) {
  const where = spec.q + ' ' + spec.id;
  if (MAP[spec.q] !== spec.id) { fail(where + ': the verified map says ' + MAP[spec.q]); continue; }
  const r = data.chemistry.find(x => x.id === spec.id);
  if (!r) { fail(where + ': record not found'); continue; }
  if (L[r.correct] !== spec.key) { fail(where + ': stored key ' + L[r.correct] + ', spec says ' + spec.key); continue; }
  const pre = JSON.stringify({ q: r.question, o: r.options, e: r.explanation });

  if (spec.keep) {
    if (!KEEP.has(spec.q)) fail(where + ': marked keep but not in the id map KEEP list');
    stat.frozen.push(spec.q);
    continue;
  }
  if (KEEP.has(spec.q)) { fail(where + ': in the KEEP list but the spec edits it'); continue; }

  /* stem */
  if (spec.stem !== undefined) {
    if (spec.stemWas === undefined) { fail(where + ': a stem replacement needs stemWas'); continue; }
    if (r.question !== spec.stemWas) { fail(where + ': the stem is not the reconfirmed text'); continue; }
    r.question = spec.stem;
    stat.stems.push(spec.q);
  } else if (spec.stemWas !== undefined && r.question !== spec.stemWas) {
    fail(where + ': the reconfirmed stem does not match'); continue;
  }

  /* option texts */
  if (spec.options) {
    let bad = false;
    for (const [j, from, to] of spec.options) {
      if (r.options[j] !== from) { fail(where + ' option ' + L[j] + ': expected ' + JSON.stringify(from)); bad = true; break; }
      r.options[j] = to;
      stat.opts.push(spec.q + ' ' + L[j]);
    }
    if (bad) continue;
  }

  /* explanation: either rebuild from scratch or edit in place */
  if (spec.rebuild) {
    if (r.explanation !== spec.explanationWas) { fail(where + ': the stored explanation is not the reconfirmed bare text'); continue; }
    const rb = spec.rebuild;
    let exp = '<h4>Correct Answer: ' + rb.keyed + '</h4>' + rb.head + WHY;
    for (const [letter, body] of rb.fb) {
      const j = L.indexOf(letter);
      if (j < 0 || j === r.correct) { fail(where + ': rebuild feedback letter ' + letter + ' is invalid'); exp = null; break; }
      exp += '<p><strong>' + letter + '. ' + r.options[j] + ':</strong>' + body + '</p>';
    }
    if (exp === null) continue;
    r.explanation = exp;
    stat.rebuilt.push(spec.q);
  } else {
    const s = split(r.explanation);
    if (!s) { fail(where + ': the explanation does not parse into keyed/head/feedback'); continue; }

    /* head: full replacement or anchored edits */
    if (spec.head !== undefined) {
      if (spec.headWas !== undefined && s.head !== spec.headWas) { fail(where + ': the head block is not the reconfirmed text'); continue; }
      s.head = spec.head;
      stat.headFull.push(spec.q);
    }
    let bad = false;
    for (const [from, to] of (spec.headEdits || [])) {
      const n = s.head.split(from).length - 1;
      if (n !== 1) { fail(where + ' head edit matched ' + n + ' time(s): ' + JSON.stringify(from.slice(0, 60))); bad = true; break; }
      s.head = s.head.replace(from, to);
      stat.headEdit++;
    }
    if (bad) continue;

    /* feedback */
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
    for (const [letter, from, to] of (spec.fbEdits || [])) {
      const it = byLetter[letter];
      if (!it) { fail(where + ': no feedback paragraph for ' + letter); bad = true; break; }
      const n = it.body.split(from).length - 1;
      if (n !== 1) { fail(where + ' feedback ' + letter + ' edit matched ' + n + ' time(s)'); bad = true; break; }
      it.body = it.body.replace(from, to);
      stat.fbEdit++;
    }
    if (bad) continue;

    /* educational points */
    if (spec.points !== undefined) {
      if (s.points === null) { fail(where + ': no point block to replace'); continue; }
      if (liOf(s.points).length !== spec.points.length) {
        fail(where + ': point replacement changes the count from ' + liOf(s.points).length + ' to ' + spec.points.length); continue;
      }
      s.points = pointsOf(spec.points);
      stat.pointBlocks.push(spec.q);
    }
    for (const [idx, from, to] of (spec.pointEdits || [])) {
      if (s.points === null) { fail(where + ': no point block for a point edit'); bad = true; break; }
      const li = liOf(s.points);
      if (!li[idx]) { fail(where + ': no point ' + (idx + 1)); bad = true; break; }
      if (from !== null && li[idx] !== from) { fail(where + ' point ' + (idx + 1) + ': expected ' + JSON.stringify(from.slice(0, 60))); bad = true; break; }
      li[idx] = to;
      s.points = pointsOf(li);
      stat.pointEdits++;
    }
    if (bad) continue;

    /* Bottom Line */
    if (spec.bl !== undefined) {
      if (s.bl === null) { fail(where + ': no Bottom Line to replace'); continue; }
      if (spec.blWas !== undefined && s.bl !== spec.blWas) { fail(where + ': the Bottom Line is not the reconfirmed text'); continue; }
      s.bl = spec.bl;
      stat.bls.push(spec.q);
    }
    for (const [from, to] of (spec.blEdits || [])) {
      if (s.bl === null) { fail(where + ': no Bottom Line for an edit'); bad = true; break; }
      const n = s.bl.split(from).length - 1;
      if (n !== 1) { fail(where + ' Bottom Line edit matched ' + n + ' time(s)'); bad = true; break; }
      s.bl = s.bl.replace(from, to);
      stat.blEdits++;
    }
    if (bad) continue;

    /* heading synchronization: edited items only, keyed style preserved */
    const wasLettered = /^[ABCD]\. /.test(s.keyed);
    const want = wasLettered ? L[r.correct] + '. ' + r.options[r.correct] : r.options[r.correct];
    if (s.keyed !== want) { s.keyed = want; stat.headsKeyed++; }
    for (const it of fbp.items) {
      const w = r.options[L.indexOf(it.letter)];
      if (it.head !== w) { it.head = w; stat.headsDistractor++; }
    }
    s.fb = buildFb(fbp);
    r.explanation = join(s);
  }

  const post = JSON.stringify({ q: r.question, o: r.options, e: r.explanation });
  if (post !== pre) stat.changed.push(spec.q);
  else if (!spec.keep) fail(where + ': the spec produced no change');
}

/* ---------- pack-wide invariants ---------- */
const QS = Object.keys(MAP);
if (SPECS.length !== 60) fail('loaded ' + SPECS.length + ' specs, expected 60');
if (new Set(SPECS.map(s => s.q)).size !== 60) fail('the specs do not cover 60 distinct display numbers');

let pts = 0, blocks = 0, bls = 0, tables = 0, fbParas = 0, keyedLettered = 0;
const tableItems = [], headBad = [];
for (const Q of QS) {
  const r = data.chemistry.find(x => x.id === MAP[Q]);
  const e = r.explanation;
  const ul = e.match(/<h4>Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  if (ul) { blocks++; pts += (ul[1].match(/<li>/g) || []).length; }
  if (e.indexOf(BLOPEN) >= 0) bls++;
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(Q); }
  const a = e.indexOf(WHY);
  if (a < 0) { fail(Q + ': no "Why the other choices are wrong" heading'); continue; }
  let z = e.length;
  const iK = e.indexOf(KEP); if (iK > a) z = Math.min(z, iK);
  const iB = e.indexOf(BLOPEN); if (iB > a) z = Math.min(z, iB);
  fbParas += (e.slice(a + WHY.length, z).match(/<p[ >]/g) || []).length;
  const kh = (e.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/) || [])[1];
  if (kh === undefined) { fail(Q + ': no keyed heading'); continue; }
  if (/^[ABCD]\. /.test(kh)) keyedLettered++;
  if (!KEEP.has(Q)) {
    const want = /^[ABCD]\. /.test(kh) ? L[r.correct] + '. ' + r.options[r.correct] : r.options[r.correct];
    if (kh !== want) headBad.push(Q + ' keyed');
    for (const m of e.slice(a, z).matchAll(/<strong>([ABCD])\. ([\s\S]*?):<\/strong>/g))
      if (m[2] !== r.options[L.indexOf(m[1])]) headBad.push(Q + ' ' + m[1]);
  }
  if (/<p><p>|<\/p><\/p>/.test(e)) fail(Q + ': doubled paragraph tags');
  for (const t2 of ['p', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'div', 'sub', 'sup']) {
    const o = (e.match(new RegExp('<' + t2 + '[ >]', 'g')) || []).length;
    const c = (e.match(new RegExp('</' + t2 + '>', 'g')) || []).length;
    if (o !== c) fail(Q + ': unbalanced <' + t2 + '> ' + o + '/' + c);
  }
  const all = r.question + r.options.join('') + e;
  if (/—/.test(all)) fail(Q + ': em dash');
  if (/�/.test(all)) fail(Q + ': replacement character');
}
if (pts !== 65 || blocks !== 21) fail('points ' + pts + ' in ' + blocks + ' blocks, expected 65 in 21');
if (bls !== 58) fail('Bottom Lines ' + bls + ', expected 58');
if (tables !== 5 || JSON.stringify(tableItems) !== JSON.stringify(['Q18', 'Q27', 'Q42', 'Q44', 'Q51']))
  fail('tables: ' + tables + ' in ' + tableItems.join(',') + ', expected 5 in Q18,Q27,Q42,Q44,Q51');
if (fbParas !== 180) fail('distractor paragraphs ' + fbParas + ', expected 180');
if (keyedLettered !== 0) fail(keyedLettered + ' keyed headings are lettered, expected 0 (this pack is unlettered throughout)');
if (headBad.length) fail('headings out of sync: ' + headBad.join(', '));

/* scope: exactly the review's inventory */
const expectStems = IDMAP.stem_changes;
if (JSON.stringify(stat.stems) !== JSON.stringify(expectStems))
  fail('stems replaced ' + stat.stems.join(',') + ', expected ' + expectStems.join(','));
const expectOpts = Object.keys(IDMAP.option_changes);
if (JSON.stringify(stat.opts.slice().sort()) !== JSON.stringify(expectOpts.slice().sort()))
  fail('option texts changed ' + stat.opts.join(',') + ', expected ' + expectOpts.join(','));
if (stat.frozen.length !== 12 || JSON.stringify(stat.frozen) !== JSON.stringify(IDMAP.scope.keep_unchanged))
  fail('frozen items ' + stat.frozen.join(',') + ', expected the 12 KEEP items');
if (stat.changed.length !== 48) fail(stat.changed.length + ' items changed, expected 48');
for (const Q of stat.frozen) {
  const a = before.chemistry.find(x => x.id === MAP[Q]), b = data.chemistry.find(x => x.id === MAP[Q]);
  if (JSON.stringify(a) !== JSON.stringify(b)) fail(Q + ': a KEEP item changed');
}

/* nothing outside the pack */
const PACK = new Set(Object.values(MAP));
if (data.chemistry.length !== 485 || data.biology.length !== 629) fail('bank sizes moved');
if (JSON.stringify(before.biology) !== JSON.stringify(data.biology)) fail('a biology record changed');
for (const r of before.chemistry) {
  if (PACK.has(r.id)) continue;
  if (JSON.stringify(data.chemistry.find(x => x.id === r.id)) !== JSON.stringify(r)) fail('out-of-pack record changed: ' + r.id);
}
for (const Q of QS) {
  const a = before.chemistry.find(x => x.id === MAP[Q]), b = data.chemistry.find(x => x.id === MAP[Q]);
  if (a.id !== b.id || a.correct !== b.correct || a.topic !== b.topic) fail(Q + ': id, key or topic moved');
}

if (problems.length) {
  console.error('ABORTED, nothing written (' + problems.length + ' problem(s)):\n  ' + problems.join('\n  '));
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
const list = a => a.length ? ' (' + a.join(', ') + ')' : '';
console.log('60/60 items processed; 12 KEEP items byte-identical' + list(stat.frozen));
console.log('  items changed       : ' + stat.changed.length);
console.log('  stems replaced      : ' + stat.stems.length + list(stat.stems));
console.log('  option texts        : ' + stat.opts.length + list(stat.opts));
console.log('  heads replaced      : ' + stat.headFull.length + '; head sentence edits: ' + stat.headEdit);
console.log('  feedback bodies     : ' + stat.fbBodies + '; feedback sentence edits: ' + stat.fbEdit);
console.log('  point blocks        : ' + stat.pointBlocks.length + ' replaced, ' + stat.pointEdits + ' individual points edited');
console.log('  Bottom Lines        : ' + stat.bls.length + ' replaced, ' + stat.blEdits + ' sentence edits');
console.log('  explanations rebuilt: ' + stat.rebuilt.length + list(stat.rebuilt) + ' (keyed heading and three distractor paragraphs added)');
console.log('  headings re-synced  : ' + stat.headsKeyed + ' keyed, ' + stat.headsDistractor + ' distractor');
console.log('  pack: ' + pts + ' points in ' + blocks + ' blocks, ' + bls + ' Bottom Lines, ' + tables + ' tables, ' + fbParas + ' distractor paragraphs');
