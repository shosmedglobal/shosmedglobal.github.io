/**
 * Apply biology review batch 11 (26 questions across two exports, 23 edited).
 *
 *   node scripts/apply-bio-review-batch11.js [--dry]
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If a single anchor misses, nothing is written at all, so a stale
 * anchor can never leave a half-applied question behind.
 *
 * Post-checks confirm, for every item: the asserted answer letter is unchanged;
 * a renamed option agrees in full with its correct-answer or distractor
 * heading; every distractor still has exactly one heading; headings and text
 * the review told us to keep are still present; superseded strings are gone;
 * the educational-point count matches the review's inventory; exactly one
 * Bottom Line survives; the four existing tables are still exactly where the
 * review says they are and no table was created elsewhere; tags are balanced;
 * and no em dash or curly quote entered student-facing copy. Finally the stem
 * and option inventories are compared against the id map, the three KEEP items
 * are confirmed byte-identical, and nothing outside the pack may change.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [].concat(
  require('./bio-batch11-edits-a.js'),
  require('./bio-batch11-edits-b.js'),
  require('./bio-batch11-edits-c.js'),
  require('./bio-batch11-edits-d.js'),
  require('./bio-batch11-edits-e.js')
);

// ===========================================================================

let failed = false;
function fail(msg) { console.error('FAIL ' + msg); failed = true; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 150)}`);
    return null;
  }
  return text.replace(from, to);
}

const pointCount = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>/g) || []).length : 0;
};

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch11-idmap.json'), 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  const PACK = new Set(Object.values(idmap.map));
  const KEEP = new Set(idmap.keep_unchanged_per_review);
  const touched = new Set();
  const stemsChanged = [];
  const optionsChanged = [];
  let applied = 0;

  // ---- apply ---------------------------------------------------------------
  for (const spec of EDITS) {
    const where = `${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found in questions.json`); continue; }
    if (idmap.map[spec.q] !== spec.id) {
      fail(`${where}: the id map says ${spec.q} is ${idmap.map[spec.q]}`);
      continue;
    }
    if (KEEP.has(spec.id)) { fail(`${where}: this id is on the KEEP list and must not be edited`); continue; }
    if (touched.has(spec.id)) { fail(`${where}: id edited twice`); continue; }
    touched.add(spec.id);

    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: stored key is ${LETTER[q.correct]}, the review asserts ${spec.expectLetter}`);
      continue;
    }

    const keyBefore = q.correct;
    let ok = true;

    if (spec.stemFull) {
      if (q.question === spec.stemFull) fail(`${where}: the replacement stem is already in place`);
      q.question = spec.stemFull;
      stemsChanged.push(spec.q);
    }

    for (const [i, text] of spec.optionFull || []) {
      if (q.options[i] === text) fail(`${where}: option ${LETTER[i]} already carries the replacement text`);
      q.options[i] = text;
      optionsChanged.push(`${spec.q} ${LETTER[i]}`);
    }

    if (spec.explanationFull) {
      if (q.explanation === spec.explanationFull) fail(`${where}: the replacement explanation is already in place`);
      q.explanation = spec.explanationFull;
    } else if (spec.explanation) {
      let t = q.explanation;
      for (const [from, to] of spec.explanation) {
        const next = replaceOnce(t, from, to, where);
        if (next === null) { ok = false; break; }
        t = next;
      }
      if (!ok) continue;
      q.explanation = t;
    } else {
      fail(`${where}: no explanation edit supplied`);
    }

    if (q.correct !== keyBefore) fail(`${where}: the answer key moved`);
    applied++;
  }

  // ---- post-checks ---------------------------------------------------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const where = `${spec.q} ${spec.id}`;

    // the keyed option must equal its correct-answer heading in full
    const keyLabel = q.options[q.correct];
    const esc = keyLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp('<h4>Correct Answer: (?:' + LETTER[q.correct] + '\\. )?' + esc + '</h4>').test(q.explanation)) {
      fail(`${where}: the correct-answer heading does not match option ${LETTER[q.correct]} in full`);
    }

    // exactly one heading per distractor
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      const n = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
      if (n !== 1) fail(`${where}: ${n} "${LETTER[i]}. ..." headings, expected 1`);
    }

    for (const head of spec.keepHeadings || []) {
      if (!q.explanation.includes(head)) fail(`${where}: heading lost: ${head}`);
    }
    for (const t of spec.keepText || []) {
      if (!q.explanation.includes(t)) fail(`${where}: retained text lost: ${t}`);
    }
    for (const gone of spec.gone || []) {
      if ((q.question + ' ' + q.options.join(' ') + ' ' + q.explanation).includes(gone)) {
        fail(`${where}: superseded text still present: ${gone}`);
      }
    }

    // the review's point-count inventory
    const want = idmap.point_counts[spec.q];
    const got = pointCount(q.explanation);
    if (got !== want) fail(`${where}: ${got} educational points, the review's inventory says ${want}`);
    if (spec.noPointBlock && /Key Educational Points:/.test(q.explanation)) {
      fail(`${where}: an educational-point block was added where the review says there is none`);
    }

    // exactly one Bottom Line
    const bl = (q.explanation.match(/class='exp-key'>Bottom Line:/g) || []).length;
    if (bl !== 1) fail(`${where}: ${bl} Bottom Lines, expected 1`);

    // tables only where the review says
    const tables = (q.explanation.match(/<table/g) || []).length;
    const wantTable = idmap.tables.includes(spec.q) ? 1 : 0;
    if (tables !== wantTable) fail(`${where}: ${tables} table(s), expected ${wantTable}`);
    if (spec.noTable && tables) fail(`${where}: a table was created where the review forbids one`);

    // presentation hygiene
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—') || blob.includes('&mdash;')) fail(`${where}: em dash in student-facing text`);
    if (/[‘’“”]/.test(blob)) fail(`${where}: curly quote; the bank uses straight quotes`);
    for (const tag of ['p', 'li', 'ul', 'ol', 'strong', 'h4', 'sup', 'sub', 'em', 'i', 'table', 'tr', 'td', 'th']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${where}: <${tag}> opened ${o} times, closed ${c} times`);
    }
  }

  // ---- inventories match the id map ---------------------------------------
  const wantStems = idmap.stem_replacements.slice().sort();
  const gotStems = stemsChanged.slice().sort();
  if (gotStems.join(',') !== wantStems.join(',')) {
    fail(`stem inventory: changed ${gotStems.join(',') || 'none'}; the review lists ${wantStems.join(',')}`);
  }
  const wantOpts = [];
  for (const [n, letters] of Object.entries(idmap.option_renames)) for (const L of letters) wantOpts.push(`${n} ${L}`);
  if (optionsChanged.slice().sort().join(',') !== wantOpts.slice().sort().join(',')) {
    fail(`option inventory: changed ${optionsChanged.join(', ') || 'none'}; the review lists ${wantOpts.join(', ')}`);
  }

  // ---- the three KEEP items must be byte-identical -------------------------
  for (const id of KEEP) {
    if (before[id] !== JSON.stringify(by[id])) fail(`${id}: on the KEEP list but changed`);
  }

  // ---- nothing outside the pack may change --------------------------------
  const expected = new Set(EDITS.map(s => s.id));
  for (const q of data.biology.concat(data.chemistry)) {
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !PACK.has(q.id)) fail(`${q.id}: changed but is outside the batch 11 pack`);
    if (changed && !expected.has(q.id)) fail(`${q.id}: changed but no edit was supplied for it`);
    if (!changed && expected.has(q.id)) fail(`${q.id}: an edit was supplied but the record did not change`);
    if (changed) {
      const was = JSON.parse(before[q.id]);
      if (was.correct !== q.correct) fail(`${q.id}: the answer key changed`);
      if (was.topic !== q.topic || was.subject !== q.subject) fail(`${q.id}: a metadata field changed`);
      if (was.options.length !== q.options.length) fail(`${q.id}: the option count changed`);
    }
  }

  if (data.biology.length !== 629 || data.chemistry.length !== 485) {
    fail(`counts moved: ${data.biology.length} biology, ${data.chemistry.length} chemistry`);
  }

  if (failed) {
    console.error(`\n${applied}/${EDITS.length} items applied cleanly; nothing written.`);
    process.exit(1);
  }
  console.log(`${applied}/${EDITS.length} items applied.`);
  console.log(`  stems replaced  : ${stemsChanged.length} (${stemsChanged.join(', ')})`);
  console.log(`  options replaced: ${optionsChanged.length} (${optionsChanged.join(', ')})`);
  if (DRY) { console.log('dry run: nothing written.'); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log('questions.json written.');
}

main();
