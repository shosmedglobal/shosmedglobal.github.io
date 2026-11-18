/* Apply SHOSMED_LF3_Chemistry_Batch6_Review.txt to chem-302..chem-361.
 *
 * All-or-nothing: questions.json is written only if every one of the 60 specs
 * verified its id against the review's own ORIGINAL signature (full stem plus
 * all four option texts) and the review key, every anchored edit matched exactly
 * once, every structural invariant held and every keep/gone assertion passed.
 *
 * Pack conventions, independently confirmed against the stored records before
 * any edit (see scripts/chem-review-batch6-idmap.json):
 *   <h4>Correct Answer: {LETTER}. {option}</h4>      keyed heading is LETTERED
 *   <p>{main}</p>                                    main is ONE paragraph
 *   <h4>Why the other choices are wrong:</h4>
 *   <p><strong>{L}. {option}:</strong> {body}</p>    joined by </p>\n<p>
 *   <h4>Key Educational Points:</h4><ul><li>..</li>..</ul>
 *   Q8 and Q58 then carry a pre-existing empty <div ...></div>.
 * No tables, no Bottom Lines, no HTML entities, no <sub>/<sup>: Unicode
 * subscripts, superscripts, Greek letters and arrows.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const L = 'ABCD';
const WHY = '<h4>Why the other choices are wrong:</h4>';
const KEP = '<h4>Key Educational Points:</h4>';

const raw = fs.readFileSync(FILE, 'utf8');
const data = JSON.parse(raw);
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch6-idmap.json'), 'utf8'));
const KEYS = idmap.asserted_key_block;

const SPECS = [];
for (const m of ['a', 'b', 'c', 'd', 'e', 'f'])
  SPECS.push(...require(path.join(ROOT, 'scripts/chem-batch6-edits-' + m + '.js')));

const fails = [];
const fail = m => fails.push(m);

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

function sub(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) { fail(where + ': anchor matched ' + n + ' times, expected 1 -> "' + from.slice(0, 70) + '"'); return text; }
  return text.replace(from, to);
}

const touched = [];
const changed = { stems: [], options: [], points: [], mains: [], feedback: [], inserted: [], headings: [] };

for (const s of SPECS) {
  const where = s.q + ' ' + s.id;
  /* ---- id verification against the review's own signature ----------- */
  if (idmap.map[s.q] !== s.id) { fail(where + ': the spec id disagrees with the verified map (' + idmap.map[s.q] + ')'); continue; }
  const q = data.chemistry.find(r => r.id === s.id);
  if (!q) { fail(where + ': not found in the bank'); continue; }
  if (q.question !== s.stemWas) { fail(where + ": ORIGINAL stem does not match the review's signature"); continue; }
  if (q.options.length !== 4 || q.options.some((o, j) => o !== s.optionsWere[j])) {
    fail(where + ": ORIGINAL options do not match the review's signature"); continue;
  }
  if (L[q.correct] !== s.key) { fail(where + ': stored key ' + L[q.correct] + ' != spec key ' + s.key); continue; }
  if (KEYS[Number(s.q.slice(1)) - 1] !== s.key) { fail(where + ': spec key disagrees with the review key block'); continue; }

  /* ---- Q7 is kept byte-identical ------------------------------------ */
  if (s.frozen) {
    if (s.stem || s.options || s.main || s.mainEdits || s.feedback || s.fbEdits || s.fbInsert || s.edits || s.points || s.pointEdits)
      fail(where + ': marked frozen but carries edits');
    touched.push({ q: s.q, id: s.id, frozen: true, before: JSON.stringify(q) });
    continue;
  }

  const sec = split(q.explanation);
  if (!sec) { fail(where + ': explanation does not match the pack layout'); continue; }
  const divWas = sec.tail;
  const hadDiv = /<div/.test(divWas);
  const beforeOutsidePoints = sec.keyed + sec.main + sec.fb + sec.tail;
  const beforeQuestion = q.question, beforeOptions = JSON.stringify(q.options);

  /* ---- stem --------------------------------------------------------- */
  if (s.stem) {
    if (s.stem === q.question) fail(where + ': the new stem equals the old one');
    q.question = s.stem;
    changed.stems.push(s.q);
  }

  /* ---- option texts -------------------------------------------------- */
  if (s.options) for (const [j, text] of s.options) {
    if (q.options[j] === text) { fail(where + ': option ' + L[j] + ' already reads the new text'); continue; }
    q.options[j] = text;
    changed.options.push(s.q + ' ' + L[j]);
  }

  /* ---- main explanation ---------------------------------------------- */
  if (s.main) { sec.main = '<p>' + s.main + '</p>'; changed.mains.push(s.q); }
  if (s.mainEdits) for (const [from, to] of s.mainEdits) sec.main = sub(sec.main, from, to, where + ' main');

  /* ---- distractor feedback ------------------------------------------- */
  let paras = sec.fb.split(/<\/p>\s*(?=<p[ >])/)
    .map((p, i, a) => (i === a.length - 1 ? p : p + '</p>'))
    .map(p => p.trim()).filter(Boolean);
  const slot = {};
  for (const p of paras) {
    const m = p.match(/^<p>(?:<p>)?<strong>([ABCD])\. /);
    if (!m) { fail(where + ': a feedback paragraph has no letter heading -> ' + p.slice(0, 50)); continue; }
    if (slot[m[1]]) { fail(where + ': duplicate feedback paragraph for ' + m[1]); continue; }
    slot[m[1]] = p;
  }
  const wantLetters = [0, 1, 2, 3].filter(j => j !== q.correct).map(j => L[j]);
  const haveBefore = wantLetters.filter(l => slot[l]).length;
  if (s.fbInsert) {
    for (const letter of Object.keys(s.fbInsert)) {
      if (slot[letter]) { fail(where + ': asked to insert ' + letter + ' but it already exists'); continue; }
      const j = L.indexOf(letter);
      if (j < 0 || j === q.correct) { fail(where + ': insert letter ' + letter + ' is not a distractor'); continue; }
      slot[letter] = '<p><strong>' + letter + '. ' + q.options[j] + ':</strong> ' + s.fbInsert[letter] + '</p>';
      changed.inserted.push(s.q + ' ' + letter);
    }
  }
  if (haveBefore + (s.fbInsert ? Object.keys(s.fbInsert).length : 0) !== 3)
    fail(where + ': ' + haveBefore + ' feedback paragraphs before, ' + (s.fbInsert ? Object.keys(s.fbInsert).length : 0) + ' inserted; expected 3 in total');
  if (s.feedback) for (const letter of Object.keys(s.feedback)) {
    const j = L.indexOf(letter);
    if (j < 0 || j === q.correct) { fail(where + ': feedback letter ' + letter + ' is not a distractor'); continue; }
    if (!slot[letter]) { fail(where + ': no existing ' + letter + ' paragraph to replace'); continue; }
    slot[letter] = '<p><strong>' + letter + '. ' + q.options[j] + ':</strong> ' + s.feedback[letter] + '</p>';
    changed.feedback.push(s.q + ' ' + letter);
  }
  if (s.fbEdits) for (const [letter, from, to] of s.fbEdits) {
    if (!slot[letter]) { fail(where + ': no ' + letter + ' paragraph to edit'); continue; }
    slot[letter] = sub(slot[letter], from, to, where + ' feedback ' + letter);
  }

  /* ---- headings re-synced to the (possibly new) option text ---------- */
  const wantKeyed = '<h4>Correct Answer: ' + s.key + '. ' + q.options[q.correct] + '</h4>';
  if (sec.keyed !== wantKeyed) { sec.keyed = wantKeyed; changed.headings.push(s.q + ' keyed'); }
  for (const letter of wantLetters) {
    const j = L.indexOf(letter);
    const want = '<p><strong>' + letter + '. ' + q.options[j] + ':</strong> ';
    if (!slot[letter]) { fail(where + ': missing feedback paragraph for ' + letter); continue; }
    if (!slot[letter].startsWith(want)) {
      const body = slot[letter].replace(/^<p>(?:<p>)?<strong>[ABCD]\. [\s\S]*?:<\/strong>\s*/, '');
      slot[letter] = want + body;
      changed.headings.push(s.q + ' ' + letter);
    }
  }
  sec.fb = wantLetters.map(l => slot[l]).join('\n');

  /* ---- educational points -------------------------------------------- */
  const wantPts = Number(s.q.slice(1)) <= 15 ? 5 : 3;
  let lines = (sec.points.match(/<li>[\s\S]*?<\/li>/g) || []).map(x => x.slice(4, -5));
  if (lines.length !== wantPts) fail(where + ': ' + lines.length + ' stored points, expected ' + wantPts);
  if (s.points) {
    if (s.points.length !== wantPts) { fail(where + ': ' + s.points.length + ' points supplied, expected ' + wantPts); continue; }
    lines = s.points.slice();
    changed.points.push(s.q);
  }
  if (s.pointEdits) {
    for (const [idx, text] of s.pointEdits) {
      if (idx < 1 || idx > wantPts) { fail(where + ': point index ' + idx + ' out of range'); continue; }
      if (lines[idx - 1] === text) { fail(where + ': point ' + idx + ' already reads the new text'); continue; }
      lines[idx - 1] = text;
    }
    changed.points.push(s.q);
  }
  sec.points = lines.map(p => '<li>' + p + '</li>').join('');

  /* ---- whole-explanation anchored edits ------------------------------ */
  let exp = join(sec);
  if (s.edits) for (const [from, to] of s.edits) exp = sub(exp, from, to, where);

  /* ---- points-only restriction ---------------------------------------- */
  if (s.pointsOnly) {
    const re0 = split(exp);
    if (q.question !== beforeQuestion) fail(where + ': points-only, but the stem changed');
    if (JSON.stringify(q.options) !== beforeOptions) fail(where + ': points-only, but an option changed');
    if (re0 && re0.keyed + re0.main + re0.fb + re0.tail !== beforeOutsidePoints)
      fail(where + ': points-only, but something outside the point list changed');
  }

  /* ---- structural invariants ----------------------------------------- */
  const re = split(exp);
  if (!re) { fail(where + ': rebuilt explanation no longer matches the pack layout'); continue; }
  if (hadDiv && re.tail !== divWas) fail(where + ': the pre-existing trailing div was not preserved byte-for-byte');
  if (!hadDiv && re.tail !== '') fail(where + ': unexpected trailing content after the point list');
  if ((exp.match(/<h4>/g) || []).length !== 3) fail(where + ': should have exactly three h4 headings');
  if ((re.main.match(/<p[ >]/g) || []).length !== 1) fail(where + ': the main explanation must stay a single paragraph');
  if ((re.fb.match(/<p[ >]/g) || []).length !== 3) fail(where + ': should have exactly three feedback paragraphs');
  if ((re.fb.match(/<\/p>\n<p[ >]/g) || []).length !== 2) fail(where + ': feedback must keep the stored </p>\\n<p> separator');
  if ((re.points.match(/<li>/g) || []).length !== wantPts) fail(where + ': wrong point count after the edit');
  for (const bad of ['</p></p>', '<p><p>', '</li></li>', '<li><li>', '</strong></strong>', '<table', 'Bottom Line', '—', '&amp;lt;', '&lt;p&gt;', 'http://', 'https://', '[S1', '[S2'])
    if (exp.indexOf(bad) >= 0) fail(where + ': contains ' + JSON.stringify(bad));
  /* This pack stores 39 pre-existing curly quotes. The review forbids ADDING an
     em dash and says to match existing punctuation, so the test is that the
     curly-quote count never rises; many replacements remove them. */
  const curly = t => (t.match(/[‘’“”]/g) || []).length;
  if (curly(exp) > curly(q.explanation)) fail(where + ': curly-quote count rose from ' + curly(q.explanation) + ' to ' + curly(exp));
  for (const t of ['p', 'h4', 'ul', 'li', 'strong', 'sub', 'sup', 'div']) {
    const o = (exp.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (exp.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (o !== c) fail(where + ': <' + t + '> ' + o + ' open / ' + c + ' close');
  }
  for (const tag of ['p', 'li', 'strong', 'ul']) {
    let depth = 0, maxd = 0;
    for (const t of exp.match(new RegExp('</?' + tag + '[ >]', 'g')) || []) {
      depth += /^<\//.test(t) ? -1 : 1;
      maxd = Math.max(maxd, depth);
      if (depth < 0) break;
    }
    if (depth !== 0 || maxd > 1) fail(where + ': <' + tag + '> nesting is wrong (end ' + depth + ', max ' + maxd + ')');
  }
  const kh = (exp.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/) || [])[1];
  if (kh !== s.key + '. ' + q.options[q.correct]) fail(where + ': keyed heading does not match the keyed option');
  for (const letter of wantLetters) {
    const h = (exp.match(new RegExp('<strong>' + letter + '\\. ([\\s\\S]*?):<\\/strong>')) || [])[1];
    if (h !== q.options[L.indexOf(letter)]) fail(where + ': heading ' + letter + ' does not match its option');
  }
  if (s.keep) for (const k of s.keep) if (exp.indexOf(k) < 0) fail(where + ': should keep -> "' + k.slice(0, 70) + '"');
  if (s.gone) for (const g of s.gone) if (exp.indexOf(g) >= 0) fail(where + ': should be gone -> "' + g.slice(0, 70) + '"');

  q.explanation = exp;
  touched.push({ q: s.q, id: s.id });
}

/* ---------- pack-wide totals ------------------------------------------ */
if (SPECS.length !== 60) fail('expected 60 specs, got ' + SPECS.length);
const ids = SPECS.map(s => s.id);
if (new Set(ids).size !== ids.length) fail('duplicate id in the specs');
const mapped = Object.keys(idmap.map).map(k => idmap.map[k]);
if (JSON.stringify(ids.slice().sort()) !== JSON.stringify(mapped.slice().sort())) fail('the spec ids are not exactly the verified map');

let total = 0, bl = 0, tab = 0, fbParas = 0;
for (const id of mapped) {
  const e = data.chemistry.find(r => r.id === id).explanation;
  total += ((e.match(/<ul>([\s\S]*?)<\/ul>/) || ['', ''])[1].match(/<li>/g) || []).length;
  bl += (e.match(/Bottom Line/g) || []).length;
  tab += (e.match(/<table/g) || []).length;
  const a = e.indexOf(WHY), b = e.indexOf(KEP);
  fbParas += (e.slice(a + WHY.length, b).match(/<p[ >]/g) || []).length;
}
if (total !== 210) fail('pack point total is ' + total + ', expected 210');
if (bl !== 0) fail('pack has ' + bl + ' Bottom Lines, expected 0');
if (tab !== 0) fail('pack has ' + tab + ' tables, expected 0');
if (fbParas !== 180) fail('pack has ' + fbParas + ' feedback paragraphs, expected 180');
if (data.biology.length !== 629 || data.chemistry.length !== 485) fail('bank counts changed');
if (changed.stems.length !== 18) fail(changed.stems.length + ' stems changed, expected 18');
if (changed.options.length !== 3) fail(changed.options.length + ' option texts changed, expected 3');
if (changed.inserted.length !== 1) fail(changed.inserted.length + ' feedback paragraphs inserted, expected 1 (Q28 B)');

const frozen = touched.find(t => t.frozen);
if (!frozen) fail('Q7 was not processed');
else if (JSON.stringify(data.chemistry.find(r => r.id === frozen.id)) !== frozen.before)
  fail('Q7 ' + frozen.id + ' is not byte-identical');

if (fails.length) {
  console.error('ABORTED: ' + fails.length + ' problem(s); questions.json NOT written.');
  fails.forEach(f => console.error('  ' + f));
  process.exit(1);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
const list = a => a.length + (a.length ? ' (' + a.join(', ') + ')' : '');
console.log(touched.length + '/60 items processed; Q7 kept byte-identical.');
console.log('  stems changed      : ' + list(changed.stems));
console.log('  options replaced   : ' + list(changed.options));
console.log('  point blocks edited: ' + changed.points.length + ', ' + total + ' points in the pack');
console.log('  mains replaced     : ' + changed.mains.length);
console.log('  feedback replaced  : ' + changed.feedback.length);
console.log('  feedback inserted  : ' + list(changed.inserted));
console.log('  headings re-synced : ' + list(changed.headings));
console.log('  feedback paragraphs: ' + fbParas + '; Bottom Lines/tables: ' + bl + ' / ' + tab);
