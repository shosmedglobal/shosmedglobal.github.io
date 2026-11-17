/**
 * Applies the SHOSMED LF3 Chemistry Batch 2 review to questions.json.
 *
 * All-or-nothing: every anchor must match exactly once and every post-check
 * must pass, or nothing is written.
 *
 * Scope per the review: 57 of the 60 mapped items are edited; Q9, Q11 and Q12
 * (chem-71, chem-73, chem-74) stay byte-identical. 24 stems and 6 option texts
 * change; Q13-Q60 get question-specific three-point blocks; Q1-Q12 keep five
 * points with only the specified in-place repairs.
 *
 * Spec fields (see scripts/chem-batch2-edits-*.js):
 *   q, id, key    display number, bank id, expected answer letter
 *   stem          full replacement stem
 *   options       [[index, text], ...]
 *   main          array of paragraph bodies replacing the whole main section
 *   edits         [[from, to], ...] anchored surgical replacements
 *   feedback      { A: body, ... } replace-or-insert one distractor paragraph
 *   points        [p1, p2, p3] replacing the whole educational-point list
 *   pointEdits    [[oneBasedIndex, text], ...] in-place five-point repairs
 *   bottom        replacement Bottom Line text (without the label)
 *   expectPoints  3 (default) or 5
 *   gone          strings that must be absent afterwards
 *   keep          strings that must survive
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QFILE = path.join(ROOT, 'questions.json');
const L = 'ABCD';

const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'chem-review-batch2-idmap.json'), 'utf8'));
const MAP = idmap.map;
const KEEP = new Set(idmap.keep_unchanged_per_review);

const SPECS = [].concat(
  require('./chem-batch2-edits-a.js'),
  require('./chem-batch2-edits-b.js'),
  require('./chem-batch2-edits-c.js'),
  require('./chem-batch2-edits-d.js'),
  require('./chem-batch2-edits-e.js'),
  require('./chem-batch2-edits-f.js')
);

const problems = [];
const fail = m => problems.push(m);

const raw = fs.readFileSync(QFILE, 'utf8');
const data = JSON.parse(raw);
const byId = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
const BEFORE = JSON.parse(JSON.stringify(data));

// ---------------------------------------------------------------- helpers
const FB_HEADER = '<h4>Why the other choices are wrong:</h4>';
const PTS_HEADER = '<h4>Key Educational Points:</h4>';

function replaceOnce(hay, from, to, where) {
  const n = hay.split(from).length - 1;
  if (n !== 1) {
    fail(where + ': anchor matched ' + n + ' times, expected 1 -> "' + from.slice(0, 90) + '"');
    return hay;
  }
  return hay.replace(from, function () { return to; });
}

// The pack mixes two paragraph separators, "</p><p>" and "</p>\n<p>". Every
// paragraph built here already carries its own <p> and </p>, so the glue
// between two of them is whitespace only; returning the tags as well would
// emit "</p></p><p><p>", which keeps the tag COUNTS balanced and so would slip
// past a counting check.
const glueOf = exp => (exp.indexOf('</p>\n<p>') >= 0 ? '\n' : '');

function splitSections(exp, where) {
  const kh = exp.match(/^<h4>Correct Answer: ([\s\S]*?)<\/h4>/);
  if (!kh) { fail(where + ': no leading "Correct Answer" heading'); return null; }
  const iFb = exp.indexOf(FB_HEADER);
  const iPt = exp.indexOf(PTS_HEADER);
  if (iFb < 0 || iPt < 0 || iFb > iPt) { fail(where + ': feedback/points headers missing or out of order'); return null; }
  return {
    head: kh[0],
    main: exp.slice(kh[0].length, iFb),
    fb: exp.slice(iFb + FB_HEADER.length, iPt),
    tail: exp.slice(iPt)
  };
}
const joinSections = s => s.head + s.main + FB_HEADER + s.fb + s.tail;

function paragraphs(block) {
  const out = [];
  const re = /<p(?: class='[^']*')?>[\s\S]*?<\/p>/g;
  let m;
  while ((m = re.exec(block))) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  return out;
}

function setFeedback(sec, letter, body, optText, glue, where) {
  const newP = '<p><strong>' + letter + '. ' + optText + ':</strong> ' + body + '</p>';
  const hits = sec.fb.match(new RegExp('<p><strong>' + letter + '\\.', 'g')) || [];
  if (hits.length > 1) { fail(where + ': ' + letter + ' has ' + hits.length + ' feedback paragraphs'); return; }
  if (hits.length === 1) {
    sec.fb = sec.fb.replace(new RegExp('<p><strong>' + letter + '\\.[\\s\\S]*?<\\/p>'), function () { return newP; });
    return;
  }
  const ps = paragraphs(sec.fb);
  if (ps.length === 0) { sec.fb = newP; return; }
  const letterOf = p => (p.text.match(/<strong>([ABCD])\./) || [])[1];
  let at = ps.length;
  for (let i = 0; i < ps.length; i++) {
    const l = letterOf(ps[i]);
    if (l && l > letter) { at = i; break; }
  }
  if (at === ps.length) {
    const end = ps[ps.length - 1].end;
    sec.fb = sec.fb.slice(0, end) + glue + newP + sec.fb.slice(end);
  } else {
    sec.fb = sec.fb.slice(0, ps[at].start) + newP + glue + sec.fb.slice(ps[at].start);
  }
}

// ---------------------------------------------------------------- apply
if (SPECS.length !== 57) fail('expected 57 specs, found ' + SPECS.length);
const seen = new Set();
const stemsChanged = [];
const optionsChanged = {};
const pointBlocksReplaced = [];
const fivePointRepairs = {};
const headingsSynced = [];

for (const s of SPECS) {
  const where = s.q + ' ' + s.id;
  if (MAP[s.q] !== s.id) { fail(where + ': the id map says ' + s.q + ' is ' + MAP[s.q]); continue; }
  if (seen.has(s.id)) { fail(where + ': duplicate spec'); continue; }
  seen.add(s.id);
  if (KEEP.has(s.id)) { fail(where + ': listed as keep-unchanged but has a spec'); continue; }
  const q = byId[s.id];
  if (!q) { fail(where + ': not in the bank'); continue; }
  if (L[q.correct] !== s.key) { fail(where + ': key is ' + L[q.correct] + ', spec says ' + s.key); continue; }

  const glue = glueOf(q.explanation);

  if (s.stem) {
    if (s.stem === q.question) fail(where + ': replacement stem is identical to the original');
    q.question = s.stem;
    stemsChanged.push(s.q);
  }
  if (s.options) {
    for (const pair of s.options) {
      const i = pair[0], text = pair[1];
      if (q.options[i] === text) fail(where + ': option ' + L[i] + ' replacement is identical to the original');
      q.options[i] = text;
      (optionsChanged[s.q] = optionsChanged[s.q] || []).push(L[i]);
    }
  }

  const sec = splitSections(q.explanation, where);
  if (!sec) continue;

  if (s.main) {
    // each entry already carries its own <p>...</p>, so the glue is just the
    // whitespace this item uses between paragraphs
    const glue = sec.main.indexOf('</p>\n<p>') >= 0 ? '\n' : '';
    sec.main = s.main.map(p => '<p>' + p + '</p>').join(glue);
  }

  if (s.edits) {
    for (const pair of s.edits) {
      const from = pair[0], to = pair[1];
      const inMain = sec.main.indexOf(from) >= 0;
      const inFb = sec.fb.indexOf(from) >= 0;
      const inTail = sec.tail.indexOf(from) >= 0;
      const n = (inMain ? 1 : 0) + (inFb ? 1 : 0) + (inTail ? 1 : 0);
      if (n === 0) { fail(where + ': edit anchor not found -> "' + from.slice(0, 90) + '"'); continue; }
      if (n > 1) { fail(where + ': edit anchor spans sections -> "' + from.slice(0, 90) + '"'); continue; }
      if (inMain) sec.main = replaceOnce(sec.main, from, to, where);
      else if (inFb) sec.fb = replaceOnce(sec.fb, from, to, where);
      else sec.tail = replaceOnce(sec.tail, from, to, where);
    }
  }

  if (s.feedback) {
    for (const letter of Object.keys(s.feedback).sort()) {
      const i = L.indexOf(letter);
      if (i < 0 || i === q.correct) { fail(where + ': feedback for ' + letter + ' is not a distractor'); continue; }
      setFeedback(sec, letter, s.feedback[letter], q.options[i], glue, where);
    }
  }

  if (s.points) {
    if (s.points.length !== 3) fail(where + ': points block must have 3 entries');
    const m = sec.tail.match(/<ul>[\s\S]*?<\/ul>/);
    if (!m) fail(where + ': no educational-point list');
    else {
      const built = '<ul>' + s.points.map(p => '<li>' + p + '</li>').join('') + '</ul>';
      sec.tail = sec.tail.replace(m[0], function () { return built; });
      pointBlocksReplaced.push(s.q);
    }
  }
  if (s.pointEdits) {
    const m = sec.tail.match(/<ul>([\s\S]*?)<\/ul>/);
    if (!m) fail(where + ': no educational-point list');
    else {
      const items = m[1].match(/<li>[\s\S]*?<\/li>/g) || [];
      for (const pair of s.pointEdits) {
        const n = pair[0], text = pair[1];
        if (!items[n - 1]) { fail(where + ': point ' + n + ' does not exist'); continue; }
        if (items[n - 1] === '<li>' + text + '</li>') fail(where + ': point ' + n + ' replacement is identical');
        items[n - 1] = '<li>' + text + '</li>';
        (fivePointRepairs[s.q] = fivePointRepairs[s.q] || []).push(n);
      }
      const built = '<ul>' + items.join('') + '</ul>';
      sec.tail = sec.tail.replace(m[0], function () { return built; });
    }
  }

  if (s.bottom) {
    const m = sec.tail.match(/<p class='exp-key'>Bottom Line: [\s\S]*?<\/p>/);
    if (!m) fail(where + ': no Bottom Line');
    else {
      const built = "<p class='exp-key'>Bottom Line: " + s.bottom + '</p>';
      sec.tail = sec.tail.replace(m[0], function () { return built; });
    }
  }

  // Headings are always re-synced to the (possibly new) option texts, so that
  // every answer and distractor heading visibly matches its own option.
  const wantKey = '<h4>Correct Answer: ' + s.key + '. ' + q.options[q.correct] + '</h4>';
  if (sec.head !== wantKey) { headingsSynced.push(s.q + ' key'); sec.head = wantKey; }
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const re = new RegExp('<strong>' + L[i] + '\\.[\\s\\S]*?:<\\/strong>');
    const m = sec.fb.match(re);
    if (!m) { fail(where + ': no feedback heading for ' + L[i]); continue; }
    const want = '<strong>' + L[i] + '. ' + q.options[i] + ':</strong>';
    if (m[0] !== want) {
      headingsSynced.push(s.q + ' ' + L[i]);
      sec.fb = sec.fb.replace(re, function () { return want; });
    }
  }

  q.explanation = joinSections(sec);

  for (const g of s.gone || []) {
    if (q.question.indexOf(g) >= 0 || q.explanation.indexOf(g) >= 0 || q.options.some(o => o.indexOf(g) >= 0))
      fail(where + ': text that should be gone is still present -> "' + g.slice(0, 90) + '"');
  }
  for (const k of s.keep || []) {
    if (q.explanation.indexOf(k) < 0)
      fail(where + ': text that should have survived is missing -> "' + k.slice(0, 90) + '"');
  }
}

// ---------------------------------------------------------------- post-checks
const PACK = Object.keys(MAP).map(k => MAP[k]);
for (const s of SPECS) {
  const q = byId[s.id];
  if (!q) continue;
  const where = s.q + ' ' + s.id;
  const exp = q.explanation;

  const wantKey = '<h4>Correct Answer: ' + s.key + '. ' + q.options[q.correct] + '</h4>';
  if (exp.indexOf(wantKey) !== 0) fail(where + ': keyed heading does not equal the letter plus the option text');

  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const want = '<strong>' + L[i] + '. ' + q.options[i] + ':</strong>';
    const n = exp.split(want).length - 1;
    if (n !== 1) fail(where + ': ' + L[i] + ' heading appears ' + n + ' times, expected 1');
  }
  const fbCount = (exp.match(/<p><strong>[ABCD]\./g) || []).length;
  if (fbCount !== 3) fail(where + ': ' + fbCount + ' distractor feedback paragraphs, expected 3');

  const wantPts = s.expectPoints || 3;
  const pm = exp.match(/<ul>([\s\S]*?)<\/ul>/);
  const gotPts = pm ? (pm[1].match(/<li>/g) || []).length : 0;
  if (gotPts !== wantPts) fail(where + ': ' + gotPts + ' educational points, expected ' + wantPts);

  const bl = (exp.match(/Bottom Line:/g) || []).length;
  if (bl !== 1) fail(where + ': ' + bl + ' Bottom Lines, expected 1');
  if ((exp.match(/<table/g) || []).length !== 0) fail(where + ': unexpected table');
  const allText = exp + q.question + q.options.join(' ');
  if (allText.indexOf('—') >= 0) fail(where + ': em dash');
  if (/[‘’“”]/.test(allText)) fail(where + ': curly quote');
  if (/\[S\d+\]/.test(allText)) fail(where + ': source label leaked into student-facing text');
  if (/https?:\/\//.test(allText)) fail(where + ': URL leaked into student-facing text');
  if (q.options.some(o => /\.$/.test(o))) fail(where + ': an option ends with a period');
  const TAGS = ['p', 'strong', 'em', 'ul', 'ol', 'li', 'h4', 'sub', 'sup', 'table', 'tr', 'td', 'th', 'div', 'span'];
  for (const t of TAGS) {
    const o = (exp.match(new RegExp('<' + t + '[ >]', 'g')) || []).length;
    const c = (exp.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (o !== c) fail(where + ': <' + t + '> ' + o + ' open vs ' + c + ' close');
  }
  // counting tags cannot see a doubled pair such as "</p></p><p><p>", which
  // keeps the counts equal, so check the nesting as well
  if (/<\/p>\s*<\/p>/.test(exp)) fail(where + ': doubled </p>');
  if (/<p(?: class='[^']*')?>\s*<p[ >]/.test(exp)) fail(where + ': doubled <p>');
  let depth = 0;
  for (const m of exp.match(/<p(?: class='[^']*')?>|<\/p>/g) || []) {
    depth += m === '</p>' ? -1 : 1;
    if (depth < 0 || depth > 1) { fail(where + ': paragraph nesting is wrong'); break; }
  }
}

for (const id of KEEP) {
  const a = JSON.stringify(BEFORE.chemistry.find(q => q.id === id));
  const b = JSON.stringify(byId[id]);
  if (a !== b) fail(id + ': listed as keep-unchanged but changed');
}

const packSet = new Set(PACK);
if (JSON.stringify(BEFORE.biology) !== JSON.stringify(data.biology)) fail('biology changed');
for (let i = 0; i < BEFORE.chemistry.length; i++) {
  const a = BEFORE.chemistry[i], b = data.chemistry[i];
  if (a.id !== b.id) fail('chemistry order changed at index ' + i);
  if (!packSet.has(a.id) && JSON.stringify(a) !== JSON.stringify(b)) fail(a.id + ': changed but is outside the pack');
}
if (data.biology.length !== 629 || data.chemistry.length !== 485) fail('bank counts changed');

const sortQ = a => a.slice().sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
if (JSON.stringify(sortQ(stemsChanged)) !== JSON.stringify(sortQ(idmap.stem_changes)))
  fail('stem inventory: applied ' + sortQ(stemsChanged).join(',') + ' vs declared ' + sortQ(idmap.stem_changes).join(','));
const optApplied = {};
for (const k of Object.keys(optionsChanged).sort()) optApplied[k] = optionsChanged[k].slice().sort();
const optDeclared = {};
for (const k of Object.keys(idmap.option_changes).sort()) optDeclared[k] = idmap.option_changes[k].slice().sort();
if (JSON.stringify(optApplied) !== JSON.stringify(optDeclared))
  fail('option inventory: applied ' + JSON.stringify(optApplied) + ' vs declared ' + JSON.stringify(optDeclared));
if (pointBlocksReplaced.length !== 48) fail(pointBlocksReplaced.length + ' three-point blocks replaced, expected 48');

// ---------------------------------------------------------------- write
if (problems.length) {
  console.error('NOT WRITTEN. ' + problems.length + ' problem(s):');
  problems.forEach(p => console.error('  - ' + p));
  process.exit(1);
}
fs.writeFileSync(QFILE, JSON.stringify(data, null, 2) + '\n');
const nOpts = Object.keys(optionsChanged).reduce((a, k) => a + optionsChanged[k].length, 0);
console.log(SPECS.length + '/57 items applied.');
console.log('  stems changed      : ' + stemsChanged.length + ' (' + sortQ(stemsChanged).join(', ') + ')');
console.log('  options replaced   : ' + nOpts + ' (' + sortQ(Object.keys(optionsChanged))
  .map(k => k + ' ' + optionsChanged[k].slice().sort().join('')).join(', ') + ')');
console.log('  three-point blocks : ' + pointBlocksReplaced.length + ' replaced');
console.log('  five-point repairs : ' + sortQ(Object.keys(fivePointRepairs))
  .map(k => k + '[' + fivePointRepairs[k].join(',') + ']').join(' '));
console.log('  headings re-synced : ' + headingsSynced.length + ' (' + headingsSynced.join(', ') + ')');
console.log('  kept byte-identical: ' + Array.from(KEEP).join(', '));
