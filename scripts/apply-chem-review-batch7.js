/* Apply SHOSMED_LF3_Chemistry_Batch7_Review.txt to questions.json.
 *
 * All-or-nothing. Nothing is written unless EVERY id resolves to the record the
 * verified signature map names, EVERY stored answer letter matches the review,
 * EVERY anchor string matches exactly once, and EVERY pack-wide invariant holds.
 *
 * Presentation rules this pack enforces:
 *   - Q1-Q4 keep a LETTERED keyed heading; Q5-Q60 keep an UNLETTERED one.
 *   - Distractor headings are always lettered and, in EDITED items, are
 *     synchronized to the exact option text. KEEP items and the points-only
 *     item are exempt, as the review requires.
 *   - Q1-Q4 have three points and no Bottom Line; Q5-Q32 have a Bottom Line and
 *     no points; Q33-Q60 have both. 96 points, 56 Bottom Lines, 7 tables.
 *   - Paragraph glue differs by item (Q1-Q32 use "</p>\n<p>", Q33-Q60 use
 *     "</p><p>"), so paragraphs are edited in place and never reassembled.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const L = 'ABCD';

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
if (JSON.stringify(data, null, 2) + '\n' !== raw) { console.error('ABORT: questions.json does not round-trip'); process.exit(1); }

const MAP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch7-idmap.json'), 'utf8')).map;
const SPECS = [].concat(
  require('./chem-batch7-edits-a.js'), require('./chem-batch7-edits-b.js'),
  require('./chem-batch7-edits-c.js'), require('./chem-batch7-edits-d.js'),
  require('./chem-batch7-edits-e.js'), require('./chem-batch7-edits-f.js'));

const WHY = '<h4>Why the other choices are wrong:</h4>';
const KEP = '<h4>Key Educational Points:</h4>';
const BLOPEN = "<p class='exp-key'>Bottom Line: ";

const problems = [];
const fail = m => problems.push(m);
const curly = t => (t.match(/[‘’“”]/g) || []).length;
const emdash = t => (t.match(/—/g) || []).length;

/* ---------- structural split / join ---------- */
function split(exp) {
  const km = exp.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!km) return null;
  const a = exp.indexOf(WHY);
  if (a < 0) return null;
  const head = exp.slice(km[0].length, a);
  const mm = head.match(/^<p>([\s\S]*?)<\/p>/);
  if (!mm) return null;
  const table = head.slice(mm[0].length);
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
  return { keyed: km[1], main: mm[1], table, fb, points, bl, tail: rest };
}
function join(s) {
  let out = '<h4>Correct Answer: ' + s.keyed + '</h4><p>' + s.main + '</p>' + s.table + WHY + s.fb;
  if (s.points !== null) out += KEP + '<ul>' + s.points + '</ul>';
  if (s.bl !== null) out += BLOPEN + s.bl + '</p>';
  return out + s.tail;
}
/* feedback paragraphs, with their separators preserved exactly */
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
  p.items.forEach((it, i) => { out += p.seps[i] + '<p><strong>' + it.letter + '. ' + it.head + ':</strong>' + it.body + '</p>'; });
  return out + p.post;
}
const liOf = s => (s.match(/<li>[\s\S]*?<\/li>/g) || []).map(x => x.slice(4, -5));
const liJoin = a => a.map(x => '<li>' + x + '</li>').join('');

/* ---------- a verified, exactly-once replacement ---------- */
function once(where, text, from, to) {
  const n = text.split(from).length - 1;
  if (n !== 1) { fail(where + ': anchor matched ' + n + ' time(s), expected once: ' + JSON.stringify(String(from).slice(0, 70))); return text; }
  return text.replace(from, to);
}

/* ---------- before-state ---------- */
const before = {};
for (const Q of Object.keys(MAP)) {
  const r = data.chemistry.find(x => x.id === MAP[Q]);
  if (!r) { fail(Q + ': ' + MAP[Q] + ' not in the bank'); continue; }
  before[Q] = JSON.parse(JSON.stringify(r));
  const s = split(r.explanation);
  if (!s) fail(Q + ': the explanation does not split into the expected structure');
  else if (join(s) !== r.explanation) fail(Q + ': split/join does not round-trip');
}
if (problems.length) { console.error('ABORTED, nothing written:\n  ' + problems.join('\n  ')); process.exit(1); }

if (SPECS.length !== 60) fail('expected 60 specs, got ' + SPECS.length);
const seen = new Set();
for (const s of SPECS) { if (seen.has(s.q)) fail('duplicate spec for ' + s.q); seen.add(s.q); }

/* ---------- apply ---------- */
const stat = { stems: [], options: [], mains: 0, mainEdits: 0, tables: 0, tableEdits: 0, fbBodies: 0, fbEdits: 0,
               pointBlocks: 0, pointEdits: 0, bls: 0, blEdits: 0, headsKeyed: 0, headsDistractor: 0, frozen: [], pointsOnly: [] };

for (const spec of SPECS) {
  const Q = spec.q, where = Q + ' ' + spec.id;
  if (MAP[Q] !== spec.id) { fail(where + ': the verified map says ' + MAP[Q]); continue; }
  const r = data.chemistry.find(x => x.id === spec.id);
  if (!r) { fail(where + ': not found'); continue; }
  if (L[r.correct] !== spec.key) { fail(where + ': stored key ' + L[r.correct] + ', review says ' + spec.key); continue; }

  if (spec.frozen) { stat.frozen.push(Q); continue; }

  const b = before[Q];
  const letteredKeyed = /^[ABCD]\. /.test(split(b.explanation).keyed);

  if (spec.stem !== undefined) {
    if (spec.stemWas === undefined || r.question !== spec.stemWas) { fail(where + ': stem does not match the stated original'); continue; }
    r.question = spec.stem;
    stat.stems.push(Q);
  }
  if (spec.options) for (const [j, from, to] of spec.options) {
    if (r.options[j] !== from) { fail(where + ' option ' + L[j] + ': expected ' + JSON.stringify(from)); continue; }
    r.options[j] = to;
    stat.options.push(Q + ' ' + L[j]);
  }

  const s = split(r.explanation);
  if (!s) { fail(where + ': split failed after field edits'); continue; }

  if (spec.main !== undefined) { s.main = spec.main; stat.mains++; }
  if (spec.mainEdits) for (const [from, to] of spec.mainEdits) { s.main = once(where + ' main', s.main, from, to); stat.mainEdits++; }

  if (spec.table !== undefined) {
    if (!s.table) { fail(where + ': no table to replace'); } else { s.table = spec.table; stat.tables++; }
  }
  if (spec.tableEdits) for (const [from, to] of spec.tableEdits) { s.table = once(where + ' table', s.table, from, to); stat.tableEdits++; }

  const fbp = parseFb(s.fb);
  if (fbp.items.length !== 3) fail(where + ': parsed ' + fbp.items.length + ' feedback paragraphs, expected 3');
  const byLetter = {};
  for (const it of fbp.items) { if (byLetter[it.letter]) fail(where + ': duplicate feedback letter ' + it.letter); byLetter[it.letter] = it; }
  if (byLetter[spec.key]) fail(where + ': a distractor paragraph uses the keyed letter ' + spec.key);

  if (spec.fb) for (const letter of Object.keys(spec.fb)) {
    const it = byLetter[letter];
    if (!it) { fail(where + ': no feedback paragraph for ' + letter); continue; }
    it.body = ' ' + spec.fb[letter];
    stat.fbBodies++;
  }
  if (spec.fbEdits) for (const letter of Object.keys(spec.fbEdits)) {
    const it = byLetter[letter];
    if (!it) { fail(where + ': no feedback paragraph for ' + letter); continue; }
    for (const [from, to] of spec.fbEdits[letter]) { it.body = once(where + ' fb ' + letter, it.body, from, to); stat.fbEdits++; }
  }

  if (spec.points) {
    if (s.points === null) { fail(where + ': no point block to replace'); }
    else {
      const n = liOf(s.points).length;
      if (n !== spec.points.length) fail(where + ': replacing ' + n + ' points with ' + spec.points.length);
      s.points = liJoin(spec.points);
      stat.pointBlocks++;
    }
  }
  if (spec.pointEdits) {
    if (s.points === null) { fail(where + ': no point block to edit'); }
    else {
      const lis = liOf(s.points);
      for (const [idx, was, to] of spec.pointEdits) {
        if (idx < 1 || idx > lis.length) { fail(where + ': point index ' + idx + ' out of range'); continue; }
        if (lis[idx - 1] !== was) { fail(where + ' point ' + idx + ': expected ' + JSON.stringify(was) + ' but found ' + JSON.stringify(lis[idx - 1])); continue; }
        lis[idx - 1] = to;
        stat.pointEdits++;
      }
      s.points = liJoin(lis);
    }
  }

  if (spec.bl !== undefined) {
    if (s.bl === null) { fail(where + ': no Bottom Line to replace'); } else { s.bl = spec.bl; stat.bls++; }
  }
  if (spec.blEdits) {
    if (s.bl === null) { fail(where + ': no Bottom Line to edit'); }
    else for (const [from, to] of spec.blEdits) { s.bl = once(where + ' bottom line', s.bl, from, to); stat.blEdits++; }
  }

  /* heading synchronization: edited items only, keyed style preserved */
  if (!spec.pointsOnly) {
    const wantKeyed = letteredKeyed ? L[r.correct] + '. ' + r.options[r.correct] : r.options[r.correct];
    if (s.keyed !== wantKeyed) { s.keyed = wantKeyed; stat.headsKeyed++; }
    for (const it of fbp.items) {
      const want = r.options[L.indexOf(it.letter)];
      if (it.head !== want) { it.head = want; stat.headsDistractor++; }
    }
  } else {
    stat.pointsOnly.push(Q);
  }

  s.fb = buildFb(fbp);
  const exp = join(s);

  /* per-item guards */
  if (/<p><p>|<\/p><\/p>/.test(exp)) fail(where + ': doubled paragraph tags');
  for (const t of ['p', 'h4', 'ul', 'li', 'strong', 'table', 'tr', 'td', 'th', 'div', 'em']) {
    const o = (exp.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (exp.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (o !== c) fail(where + ': unbalanced <' + t + '> ' + o + '/' + c);
  }
  if (curly(exp) > curly(b.explanation)) fail(where + ': curly-quote count rose from ' + curly(b.explanation) + ' to ' + curly(exp));
  const allNow = r.question + r.options.join('') + exp, allWas = b.question + b.options.join('') + b.explanation;
  if (emdash(allNow) > emdash(allWas)) fail(where + ': an em dash was added');
  if (/�/.test(allNow)) fail(where + ': replacement character');
  if (spec.keep) for (const k of spec.keep) if (exp.indexOf(k) < 0) fail(where + ': required text is gone: ' + JSON.stringify(k.slice(0, 60)));
  if (spec.gone) for (const g of spec.gone) {
    if (allWas.indexOf(g) < 0) fail(where + ': NON-VACUITY - ' + JSON.stringify(g.slice(0, 60)) + ' was not there before');
    if (allNow.indexOf(g) >= 0) fail(where + ': should be gone but is still present: ' + JSON.stringify(g.slice(0, 60)));
  }

  if (spec.pointsOnly) {
    const strip = e => e.replace(/<ul>[\s\S]*?<\/ul>/, '<POINTS>');
    if (strip(exp) !== strip(b.explanation)) fail(where + ': points-only, yet something outside the point list changed');
    if (r.question !== b.question || JSON.stringify(r.options) !== JSON.stringify(b.options)) fail(where + ': points-only, yet a stem or option changed');
  }

  r.explanation = exp;
}

/* ---------- pack-wide invariants ---------- */
let points = 0, blocks = 0, bls = 0, tables = 0, fbParas = 0, changed = [];
const tableItems = [], noPts = [], noBL = [], headBad = [];
for (const Q of Object.keys(MAP)) {
  const r = data.chemistry.find(x => x.id === MAP[Q]), b = before[Q], e = r.explanation;
  const same = r.question === b.question && e === b.explanation &&
               JSON.stringify(r.options) === JSON.stringify(b.options) && r.correct === b.correct;
  if (!same) changed.push(Q);
  const s = split(e);
  if (!s) { fail(Q + ': final explanation does not split'); continue; }
  if (s.points !== null) { blocks++; points += liOf(s.points).length; } else noPts.push(Q);
  if (s.bl !== null) bls++; else noBL.push(Q);
  const t = (e.match(/<table/g) || []).length;
  if (t) { tables += t; tableItems.push(Q); }
  const fbp = parseFb(s.fb);
  fbParas += fbp.items.length;
  if (r.id !== b.id || r.correct !== b.correct || r.topic !== b.topic) fail(Q + ': id, key or topic moved');
  /* heading agreement, for every item the review did not exempt */
  const spec = SPECS.find(x => x.q === Q);
  if (!spec.frozen && !spec.pointsOnly) {
    const lettered = /^[ABCD]\. /.test(s.keyed);
    const want = lettered ? L[r.correct] + '. ' + r.options[r.correct] : r.options[r.correct];
    if (s.keyed !== want) headBad.push(Q + ' keyed');
    for (const it of fbp.items) if (it.head !== r.options[L.indexOf(it.letter)]) headBad.push(Q + ' ' + it.letter);
  }
}
if (points !== 96) fail('educational points: ' + points + ', expected 96');
if (blocks !== 32) fail('point blocks: ' + blocks + ', expected 32');
if (bls !== 56) fail('Bottom Lines: ' + bls + ', expected 56');
if (tables !== 7) fail('tables: ' + tables + ', expected 7');
if (JSON.stringify(tableItems) !== JSON.stringify(['Q6', 'Q7', 'Q10', 'Q16', 'Q25', 'Q27', 'Q32']))
  fail('tables are in ' + tableItems.join(',') + ', expected Q6,Q7,Q10,Q16,Q25,Q27,Q32');
if (fbParas !== 180) fail('feedback paragraphs: ' + fbParas + ', expected 180');
if (headBad.length) fail('headings out of sync: ' + headBad.join(', '));
if (noPts.length !== 28) fail(noPts.length + ' items without a point block, expected 28 (Q5-Q32)');
if (noBL.length !== 4 || JSON.stringify(noBL) !== JSON.stringify(['Q1', 'Q2', 'Q3', 'Q4'])) fail('items without a Bottom Line: ' + noBL.join(','));

const FROZEN = ['Q5', 'Q18', 'Q19', 'Q30', 'Q36', 'Q59'];
if (JSON.stringify(stat.frozen) !== JSON.stringify(FROZEN)) fail('frozen set is ' + stat.frozen.join(',') + ', expected ' + FROZEN.join(','));
for (const Q of FROZEN) {
  const r = data.chemistry.find(x => x.id === MAP[Q]), b = before[Q];
  if (r.question !== b.question || r.explanation !== b.explanation ||
      JSON.stringify(r.options) !== JSON.stringify(b.options) || r.correct !== b.correct)
    fail(Q + ': KEEP item is not byte-identical');
}
if (changed.length !== 54) fail(changed.length + ' items changed, expected 54');
for (const Q of FROZEN) if (changed.includes(Q)) fail(Q + ': a KEEP item is in the changed set');
if (stat.stems.length !== 27) fail(stat.stems.length + ' stems replaced, expected 27');
if (stat.options.length !== 6) fail(stat.options.length + ' option texts replaced, expected 6');
if (JSON.stringify(stat.options) !== JSON.stringify(['Q34 B', 'Q43 D', 'Q44 C', 'Q46 D', 'Q53 A', 'Q57 B']))
  fail('option changes are ' + stat.options.join(', ') + ', expected Q34 B, Q43 D, Q44 C, Q46 D, Q53 A, Q57 B');

/* nothing outside the pack */
const PACK = new Set(Object.values(MAP));
const orig = JSON.parse(raw);
if (data.chemistry.length !== 485 || data.biology.length !== 629) fail('bank sizes moved');
if (JSON.stringify(orig.biology) !== JSON.stringify(data.biology)) fail('a biology record changed');
for (const r of orig.chemistry) {
  if (PACK.has(r.id)) continue;
  const now = data.chemistry.find(x => x.id === r.id);
  if (JSON.stringify(now) !== JSON.stringify(r)) fail('out-of-pack record changed: ' + r.id);
}

if (problems.length) {
  console.error('ABORTED, nothing written (' + problems.length + ' problem(s)):\n  ' + problems.join('\n  '));
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
console.log('60/60 items processed; ' + stat.frozen.length + ' KEEP items byte-identical (' + stat.frozen.join(', ') + ')');
console.log('  items changed       : ' + changed.length);
console.log('  stems replaced      : ' + stat.stems.length + ' (' + stat.stems.join(', ') + ')');
console.log('  option texts        : ' + stat.options.length + ' (' + stat.options.join(', ') + ')');
console.log('  mains replaced      : ' + stat.mains + '; main sentence edits: ' + stat.mainEdits);
console.log('  tables replaced     : ' + stat.tables + '; table cell edits: ' + stat.tableEdits);
console.log('  feedback bodies     : ' + stat.fbBodies + '; feedback sentence edits: ' + stat.fbEdits);
console.log('  point blocks        : ' + stat.pointBlocks + ' replaced, ' + stat.pointEdits + ' individual points edited');
console.log('  Bottom Lines        : ' + stat.bls + ' replaced, ' + stat.blEdits + ' sentence edits');
console.log('  headings re-synced  : ' + stat.headsKeyed + ' keyed, ' + stat.headsDistractor + ' distractor');
console.log('  points-only items   : ' + (stat.pointsOnly.join(', ') || 'none'));
console.log('  pack: ' + points + ' points in ' + blocks + ' blocks, ' + bls + ' Bottom Lines, ' + tables + ' tables, ' + fbParas + ' feedback paragraphs');
