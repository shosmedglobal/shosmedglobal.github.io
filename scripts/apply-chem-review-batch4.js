/**
 * Apply the SHOSMED LF3 chemistry review, batch 4 (display Q1-Q60 =
 * chem-182 .. chem-241) to questions.json.
 *
 * All-or-nothing. Every anchored replacement must match exactly once, every
 * asserted "gone" string must really disappear, every asserted "keep" string
 * must survive, the answer letters and ids must not move, and nothing outside
 * the pack may change. If any check fails, NOTHING is written.
 *
 * The pack's own presentation conventions, preserved here:
 *   - Q1-Q57 store the keyed heading WITHOUT its letter ("<h4>Correct Answer:
 *     Argon</h4>"); Q58-Q60 store it WITH the letter. Both must still match the
 *     keyed option's text.
 *   - main-section blocks are glued with no whitespace ("</p><p>",
 *     "</p><table ", "</table><p>"); distractor paragraphs are glued with a
 *     single newline ("</p>\n<p>") in 58 items and with none in Q28 and Q57.
 *   - "<" and ">" inside student text are stored as &lt; / &gt; entities, which
 *     the real sanitizer passes through unchanged.
 *   - exactly one "<ul>" holding three "<li>" points per item, and one
 *     "<p class='exp-key'>Bottom Line: ...</p>" in Q1-Q57 only.
 *
 *   node scripts/apply-chem-review-batch4.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QFILE = path.join(ROOT, 'questions.json');
const L = 'ABCD';
const WHY = '<h4>Why the other choices are wrong:</h4>';
const KEP = '<h4>Key Educational Points:</h4>';
const TABLE = '\u0000TABLE\u0000';   // sentinel: "the item's table goes here"

const SPECS = [].concat(
  require('./chem-batch4-edits-a.js'),
  require('./chem-batch4-edits-b.js'),
  require('./chem-batch4-edits-c.js'),
  require('./chem-batch4-edits-d.js'),
  require('./chem-batch4-edits-e.js'),
  require('./chem-batch4-edits-f.js')
);

const idmap = JSON.parse(fs.readFileSync(path.join(__dirname, 'chem-review-batch4-idmap.json'), 'utf8'));

const problems = [];
const fail = m => problems.push(m);
const enc = s => s.replace(/&/g, '\u0001').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\u0001/g, '&');

const raw = fs.readFileSync(QFILE, 'utf8');
const data = JSON.parse(raw);
const BEFORE = JSON.parse(raw);
const BY = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
const PACK = new Set(Object.values(idmap.map));

// ------------------------------------------------------------------ sectioning
function split(exp) {
  const a = exp.indexOf(WHY), b = exp.indexOf(KEP);
  if (a < 0 || b < 0) return null;
  const head = exp.slice(0, a);
  const hm = head.match(/^<h4>Correct Answer: [\s\S]*?<\/h4>/);
  if (!hm) return null;
  const after = exp.slice(b + KEP.length);
  const um = after.match(/^<ul>([\s\S]*?)<\/ul>/);
  if (!um) return null;
  return {
    keyed: hm[0],
    main: head.slice(hm[0].length),
    fb: exp.slice(a + WHY.length, b),
    points: um[1],
    tail: after.slice(um[0].length)
  };
}
const join = s => s.keyed + s.main + WHY + s.fb + KEP + '<ul>' + s.points + '</ul>' + s.tail;

// the item's own distractor-paragraph glue
function fbGlue(fb) { return /<\/p>\n<p[ >]/.test(fb) ? '\n' : (/<\/p><p[ >]/.test(fb) ? '' : '\n'); }

function tableOf(main) {
  const m = main.match(/<table[\s\S]*?<\/table>/);
  return m ? m[0] : null;
}

// ------------------------------------------------------------------ application
const stemsChanged = [], optionsChanged = [], headsResynced = [];
const tablesTouched = [], bottomsReplaced = [], fbRestored = [], fbReplaced = [];

for (const s of SPECS) {
  const where = s.q + ' ' + s.id;
  const q = BY[s.id];
  if (!q) { fail(where + ': id not in bank'); continue; }
  if (idmap.map[s.q] !== s.id) { fail(where + ': spec id disagrees with the verified id map'); continue; }
  if (L[q.correct] !== s.key) { fail(where + ': stored key is ' + L[q.correct] + ', spec says ' + s.key); continue; }
  const unlettered = Number(s.q.slice(1)) <= 57;
  if (!!s.unlettered !== unlettered) { fail(where + ': unlettered flag does not match the Q1-Q57 / Q58-Q60 presentation'); continue; }

  const was = JSON.parse(JSON.stringify(q));

  // 1. stem
  if (s.stem) {
    if (s.stem === q.question) { fail(where + ': new stem is identical to the stored stem'); continue; }
    q.question = s.stem;
    stemsChanged.push(s.q);
  }

  // 2. option texts
  for (const [idx, text] of s.options || []) {
    if (q.options[idx] === text) { fail(where + ': option ' + L[idx] + ' is already that text'); continue; }
    q.options[idx] = text;
    optionsChanged.push(s.q + ' ' + L[idx]);
  }

  // 3. anchored edits over the whole explanation
  for (const [from, to] of s.edits || []) {
    const n = q.explanation.split(from).length - 1;
    if (n !== 1) { fail(where + ': anchor matched ' + n + ' times, expected 1 -> "' + from.slice(0, 72) + '"'); continue; }
    q.explanation = q.explanation.replace(from, () => to);
  }

  const sec = split(q.explanation);
  if (!sec) { fail(where + ': could not split the explanation into its sections'); continue; }
  const hadTable = tableOf(sec.main);

  // 4. main section
  if (s.tableEdits) {
    if (!hadTable) fail(where + ': tableEdits given but the item has no table');
    for (const [from, to] of s.tableEdits) {
      const n = sec.main.split(from).length - 1;
      if (n !== 1) { fail(where + ': table anchor matched ' + n + ' times, expected 1 -> "' + from.slice(0, 60) + '"'); continue; }
      sec.main = sec.main.replace(from, () => to);
    }
    tablesTouched.push(s.q);
  }
  if (s.tableHtml && !s.main) {
    if (!hadTable) fail(where + ': tableHtml given but the item has no table');
    else sec.main = sec.main.replace(hadTable, () => s.tableHtml);
    tablesTouched.push(s.q);
  }
  if (s.main) {
    const want = s.tableHtml || tableOf(sec.main);
    const nT = s.main.filter(x => x === TABLE).length;
    if (!!hadTable !== (nT === 1)) fail(where + ': the main block list must place the table exactly where the item has one');
    if (nT > 1) fail(where + ': the main block list names the table more than once');
    if (s.tableHtml) tablesTouched.push(s.q);
    sec.main = s.main.map(x => x === TABLE ? want : '<p>' + x + '</p>').join('');
  }

  // 5. distractor feedback: replace in place, or insert in letter order
  const glue = fbGlue(sec.fb);
  if (s.feedback) {
    let paras = sec.fb.split(/<\/p>\s*(?=<p[ >])/).map((p, i, a) => i === a.length - 1 ? p : p + '</p>')
      .map(p => p.trim()).filter(Boolean);
    const slot = {};
    for (const p of paras) {
      const m = p.match(/^<p><strong>([ABCD])\./);
      if (!m) { fail(where + ': a distractor paragraph has no letter heading -> ' + p.slice(0, 60)); continue; }
      if (slot[m[1]]) fail(where + ': two paragraphs are labelled ' + m[1]);
      slot[m[1]] = p;
    }
    for (const letter of Object.keys(s.feedback)) {
      const j = L.indexOf(letter);
      if (j < 0 || j === q.correct) { fail(where + ': feedback given for ' + letter + ', which is not a distractor'); continue; }
      (slot[letter] ? fbReplaced : fbRestored).push(s.q + ' ' + letter);
      slot[letter] = '<p><strong>' + letter + '. ' + enc(q.options[j]) + ':</strong> ' + s.feedback[letter] + '</p>';
    }
    const order = [];
    for (let j = 0; j < 4; j++) {
      if (j === q.correct) { if (slot[L[j]]) fail(where + ': a paragraph is labelled with the keyed letter ' + L[j]); continue; }
      if (!slot[L[j]]) { fail(where + ': no paragraph for distractor ' + L[j]); continue; }
      order.push(slot[L[j]]);
    }
    sec.fb = order.join(glue);
  }

  // 6. educational points (always replaced: all 60 carry the generic block)
  if (!s.points || s.points.length !== 3) { fail(where + ': points block must have exactly three entries'); continue; }
  sec.points = s.points.map(p => '<li>' + p + '</li>').join('\n');

  // 7. Bottom Line
  const hasBL = Number(s.q.slice(1)) <= 57;
  if (s.bottom) {
    if (!hasBL) { fail(where + ': Q58-Q60 must not gain a Bottom Line'); continue; }
    const re = /<p class='exp-key'>Bottom Line: [\s\S]*?<\/p>/;
    if (!re.test(sec.tail)) { fail(where + ': no Bottom Line paragraph to replace'); continue; }
    sec.tail = sec.tail.replace(re, () => "<p class='exp-key'>Bottom Line: " + s.bottom + '</p>');
    bottomsReplaced.push(s.q);
  }

  // 8. headings rebuilt from the item's own (possibly new) option texts
  const wantKeyed = '<h4>Correct Answer: ' + (s.unlettered ? '' : s.key + '. ') + enc(q.options[q.correct]) + '</h4>';
  if (sec.keyed !== wantKeyed) { headsResynced.push(s.q + ' key'); sec.keyed = wantKeyed; }
  for (let j = 0; j < 4; j++) {
    if (j === q.correct) continue;
    const want = '<strong>' + L[j] + '. ' + enc(q.options[j]) + ':</strong>';
    const re = new RegExp('<strong>' + L[j] + '\\. [\\s\\S]*?:<\\/strong>');
    const m = sec.fb.match(re);
    if (!m) { fail(where + ': distractor ' + L[j] + ' has no heading after the pass'); continue; }
    if (m[0] !== want) { headsResynced.push(s.q + ' ' + L[j]); sec.fb = sec.fb.replace(re, () => want); }
  }

  q.explanation = join(sec);

  // ------------------------------------------------------------ per-item checks
  const exp = q.explanation;
  if (q.id !== was.id) fail(where + ': the id moved');
  if (q.correct !== was.correct) fail(where + ': the answer letter moved');
  if (q.options.length !== 4) fail(where + ': option count changed');
  if (!s.stem && q.question !== was.question) fail(where + ': the stem changed but no replacement was specified');
  for (let j = 0; j < 4; j++) {
    const planned = (s.options || []).some(([idx]) => idx === j);
    if (!planned && q.options[j] !== was.options[j]) fail(where + ': option ' + L[j] + ' changed but no replacement was specified');
  }
  if (exp === was.explanation) fail(where + ': the explanation did not change');

  for (const g of s.gone || []) if (exp.indexOf(g) >= 0) fail(where + ': should be gone -> "' + g.slice(0, 72) + '"');
  for (const k of s.keep || []) if (exp.indexOf(k) < 0) fail(where + ': should have survived -> "' + k.slice(0, 72) + '"');

  const nLi = (exp.match(/<li>/g) || []).length;
  if (nLi !== 3) fail(where + ': ' + nLi + ' points, expected 3');
  if ((exp.match(/<ul>/g) || []).length !== 1) fail(where + ': not exactly one <ul>');
  const nBL = (exp.match(/Bottom Line:/g) || []).length;
  if (nBL !== (hasBL ? 1 : 0)) fail(where + ': ' + nBL + ' Bottom Lines, expected ' + (hasBL ? 1 : 0));
  const nTab = (exp.match(/<table/g) || []).length;
  const wantTab = idmap.tables.indexOf(s.q) >= 0 ? 1 : 0;
  if (nTab !== wantTab) fail(where + ': ' + nTab + ' tables, expected ' + wantTab);
  if ((exp.match(/<h4>/g) || []).length !== 3) fail(where + ': not exactly three h4 headings');
  if ((exp.match(/<p><strong>[ABCD]\./g) || []).length !== 3) fail(where + ': not exactly three distractor paragraphs');
  if (exp.indexOf(WHY) < 0 || exp.indexOf(KEP) < 0) fail(where + ': a section heading went missing');
  if (exp.indexOf('—') >= 0) fail(where + ': em dash');
  if (/[‘’“”]/.test(exp)) fail(where + ': curly quote');
  if (/\u0000/.test(exp)) fail(where + ': the table sentinel leaked into the text');
  if (/https?:\/\//.test(exp)) fail(where + ': URL in student-facing text');
  if (/\bR\d{1,2}\b/.test(exp)) fail(where + ': reviewer source label');
  for (const t of ['p', 'strong', 'em', 'ul', 'li', 'h4', 'sub', 'sup', 'table', 'tr', 'th', 'td']) {
    const o = (exp.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (exp.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (o !== c) fail(where + ': <' + t + '> ' + o + ' open vs ' + c + ' close');
  }
  // counting tags cannot see a doubled pair such as "</p></p><p><p>"
  if (/<\/p>\s*<\/p>/.test(exp)) fail(where + ': doubled </p>');
  if (/<p(?: class='[^']*')?>\s*<p[ >]/.test(exp)) fail(where + ': doubled <p>');
  let depth = 0;
  for (const m of exp.match(/<p(?: class='[^']*')?>|<\/p>/g) || []) {
    depth += m === '</p>' ? -1 : 1;
    if (depth < 0 || depth > 1) { fail(where + ': paragraph nesting is wrong'); break; }
  }
  if (depth !== 0) fail(where + ': unbalanced paragraphs');
}

// ---------------------------------------------------------------- pack checks
const sortQ = a => a.slice().sort((x, y) => Number(x.slice(1).split(' ')[0]) - Number(y.slice(1).split(' ')[0]) || x.localeCompare(y));
if (SPECS.length !== 60) fail('expected 60 specs, got ' + SPECS.length);
const seen = new Set();
for (const s of SPECS) { if (seen.has(s.q)) fail('duplicate spec for ' + s.q); seen.add(s.q); }
for (let i = 1; i <= 60; i++) if (!seen.has('Q' + i)) fail('no spec for Q' + i);

const eq = (got, want, label) => {
  const a = JSON.stringify(sortQ(got)), b = JSON.stringify(sortQ(want));
  if (a !== b) fail(label + '\n      got : ' + a + '\n      want: ' + b);
};
eq(stemsChanged, idmap.stem_changes, 'stems changed does not match the id map');
eq(optionsChanged, Object.entries(idmap.option_changes).flatMap(([q, ls]) => ls.map(l => q + ' ' + l)), 'option changes do not match the id map');
eq(bottomsReplaced, idmap.bottom_line_replacements, 'Bottom Line replacements do not match the id map');
eq([...new Set(tablesTouched)], idmap.tables_repaired, 'tables repaired do not match the id map');
eq(fbRestored, Object.entries(idmap.missing_feedback_restored).flatMap(([q, ls]) => ls.map(l => q + ' ' + l)), 'restored feedback does not match the id map');

// nothing outside the pack moved
if (JSON.stringify(BEFORE.biology) !== JSON.stringify(data.biology)) fail('biology changed');
for (let i = 0; i < BEFORE.chemistry.length; i++) {
  const a = BEFORE.chemistry[i], b = data.chemistry[i];
  if (a.id !== b.id) { fail('chemistry order changed at index ' + i); break; }
  if (PACK.has(a.id)) continue;
  if (JSON.stringify(a) !== JSON.stringify(b)) fail(a.id + ': changed but is outside the pack');
}
if (data.biology.length !== 629 || data.chemistry.length !== 485) fail('bank counts changed');
const keyBlock = Object.keys(idmap.map).map(Q => L[BY[idmap.map[Q]].correct]).join('');
if (keyBlock !== idmap.asserted_key_block) fail('the key block moved');

// pack-wide totals the review fixes
let pts = 0, bls = 0, tabs = 0;
for (const id of PACK) {
  const e = BY[id].explanation;
  pts += (e.match(/<li>/g) || []).length;
  bls += (e.match(/Bottom Line:/g) || []).length;
  tabs += (e.match(/<table/g) || []).length;
}
if (pts !== 180) fail(pts + ' educational points in the pack, expected 180');
if (bls !== 57) fail(bls + ' Bottom Lines in the pack, expected 57');
if (tabs !== 13) fail(tabs + ' tables in the pack, expected 13');

// ---------------------------------------------------------------- write
if (problems.length) {
  console.error('NOT WRITTEN. ' + problems.length + ' problem(s):');
  problems.slice(0, 60).forEach(p => console.error('  - ' + p));
  if (problems.length > 60) console.error('  ... and ' + (problems.length - 60) + ' more');
  process.exit(1);
}
fs.writeFileSync(QFILE, JSON.stringify(data, null, 2) + '\n');
console.log(SPECS.length + '/60 items applied.');
console.log('  stems changed      : ' + stemsChanged.length + ' (' + sortQ(stemsChanged).join(', ') + ')');
console.log('  options replaced   : ' + optionsChanged.length + ' (' + sortQ(optionsChanged).join(', ') + ')');
console.log('  point blocks       : 60 replaced, 180 points');
console.log('  Bottom Lines       : ' + bottomsReplaced.length + ' replaced, 57 preserved');
console.log('  tables repaired    : ' + [...new Set(tablesTouched)].length + ' (' + sortQ([...new Set(tablesTouched)]).join(', ') + '), 13 preserved');
console.log('  feedback restored  : ' + fbRestored.length + ' (' + sortQ(fbRestored).join(', ') + ')');
console.log('  feedback replaced  : ' + fbReplaced.length);
console.log('  headings re-synced : ' + headsResynced.length + ' (' + sortQ(headsResynced).join(', ') + ')');
