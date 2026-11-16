/**
 * Applies chemistry review batch 1 (the first 60-question chemistry pack).
 *
 *   node scripts/apply-chem-review-batch1.js --dry   # verify every anchor
 *   node scripts/apply-chem-review-batch1.js         # write questions.json
 *
 * All-or-nothing: every anchor must match exactly once. A single miss fails the
 * whole run and nothing is written, so questions.json is never left half-edited.
 *
 * The edits live in scripts/chem-batch1-edits-{a..f}.js, 58 specs in all. The
 * review keeps Q36 (chem-37) and Q60 (chem-62) byte-identical, and this script
 * asserts that as well as the inventories recorded in
 * scripts/chem-review-batch1-idmap.json.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [].concat(
  require('./chem-batch1-edits-a.js'),
  require('./chem-batch1-edits-b.js'),
  require('./chem-batch1-edits-c.js'),
  require('./chem-batch1-edits-d.js'),
  require('./chem-batch1-edits-e.js'),
  require('./chem-batch1-edits-f.js')
);

let failed = false;
function fail(msg) { console.error('FAIL ' + msg); failed = true; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 170)}`);
    return null;
  }
  return text.replace(from, to);
}

const POINTS_RE = /(Key Educational Points:<\/h4><ul>)([\s\S]*?)(<\/ul>)/;
const pointCount = e => {
  const m = e.match(POINTS_RE);
  return m ? (m[2].match(/<li>/g) || []).length : -1;
};
const blobOf = q => q.question + '\u0001' + q.options.join('\u0001') + '\u0001' + q.explanation;

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch1-idmap.json'), 'utf8'));
  const MAP = idmap.map;
  const by = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  const KEEP = new Set(idmap.keep_unchanged_per_review);

  // ---- the pack itself ----------------------------------------------------
  if (EDITS.length !== 58) fail(`${EDITS.length} specs loaded, expected 58`);
  const seen = new Set();
  for (const s of EDITS) {
    if (seen.has(s.id)) fail(`${s.id}: appears in more than one spec`);
    seen.add(s.id);
    if (MAP[s.q] !== s.id) fail(`${s.q} ${s.id}: the id map says ${s.q} is ${MAP[s.q]}`);
    if (KEEP.has(s.id)) fail(`${s.q} ${s.id}: the review keeps this item unchanged`);
  }
  for (const [q, id] of Object.entries(MAP)) {
    if (!seen.has(id) && !KEEP.has(id)) fail(`${q} ${id}: in the map but has no spec and is not a KEEP item`);
  }

  const stemsChanged = [], optionsChanged = {};
  let applied = 0;

  // ---- apply --------------------------------------------------------------
  for (const spec of EDITS) {
    const where = `${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found in the chemistry bank`); continue; }
    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: stored key is ${LETTER[q.correct]}, the review preserves ${spec.expectLetter}`);
      continue;
    }

    const keyBefore = q.correct;
    const idBefore = q.id;
    let bad = false;

    // stem
    if (spec.stem && spec.stemEdit) { fail(`${where}: both stem and stemEdit supplied`); bad = true; }
    if (spec.stem) {
      if (spec.stem === q.question) { fail(`${where}: replacement stem equals the stored stem`); bad = true; }
      else { q.question = spec.stem; stemsChanged.push(spec.q); }
    } else if (spec.stemEdit) {
      let t = q.question;
      for (const [from, to] of spec.stemEdit) {
        const next = replaceOnce(t, from, to, where + ' stem');
        if (next === null) { bad = true; break; }
        t = next;
      }
      if (!bad) { q.question = t; stemsChanged.push(spec.q); }
    }

    // options
    for (const [idx, text] of spec.options || []) {
      if (idx < 0 || idx >= q.options.length) { fail(`${where}: option index ${idx} out of range`); bad = true; continue; }
      if (q.options[idx] === text) { fail(`${where}: option ${LETTER[idx]} replacement equals the stored text`); bad = true; continue; }
      q.options[idx] = text;
      (optionsChanged[spec.q] = optionsChanged[spec.q] || []).push(LETTER[idx]);
    }

    // explanation, anchored, in order
    let t = q.explanation;
    for (const [from, to] of spec.explanation || []) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { bad = true; break; }
      t = next;
    }
    if (!bad) q.explanation = t;

    // educational points: replace the whole list
    if (spec.points && !bad) {
      if (spec.points.length !== 3) fail(`${where}: ${spec.points.length} replacement points, the review supplies 3`);
      const m = q.explanation.match(POINTS_RE);
      if (!m) { fail(`${where}: no educational-point list found`); bad = true; }
      else {
        const list = spec.points.map(p => `<li>${p}</li>`).join('');
        q.explanation = q.explanation.replace(POINTS_RE, (all, open, body, close) => open + list + close);
      }
    }

    if (q.id !== idBefore) fail(`${where}: the bank id changed`);
    if (q.correct !== keyBefore) fail(`${where}: the answer key moved`);
    if (!bad) applied++;
  }

  // ---- post-checks --------------------------------------------------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const where = `${spec.q} ${spec.id}`;
    const blob = blobOf(q);

    for (const head of spec.keepHeadings || []) {
      if (!q.explanation.includes(head)) fail(`${where}: option heading lost: ${head}`);
    }
    for (const txt of spec.keepText || []) {
      if (!q.explanation.includes(txt)) fail(`${where}: retained text lost: ${txt.slice(0, 80)}`);
    }
    for (const g of spec.gone || []) {
      if (blob.includes(g)) fail(`${where}: superseded text still present: ${g.slice(0, 80)}`);
    }

    // the keyed option must equal its answer heading in full
    const esc = q.options[q.correct].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp('<h4>Correct Answer: (?:' + LETTER[q.correct] + '\\. )?' + esc + '</h4>').test(q.explanation)) {
      fail(`${where}: the correct-answer heading no longer matches option ${LETTER[q.correct]} in full`);
    }
    // exactly one heading per distractor
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      const n = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
      if (n !== 1) fail(`${where}: ${n} "${LETTER[i]}. ..." headings, expected 1`);
    }

    const want = spec.expectPoints || 3;
    if (pointCount(q.explanation) !== want) {
      fail(`${where}: ${pointCount(q.explanation)} educational points, expected ${want}`);
    }
    if ((q.explanation.match(/class='exp-key'>Bottom Line:/g) || []).length !== 1) {
      fail(`${where}: expected exactly one Bottom Line`);
    }
    const tables = (q.explanation.match(/<table/g) || []).length;
    if (spec.noTable) {
      if (tables !== 0) fail(`${where}: a table appeared where the item had none`);
    } else if (tables !== 1) {
      fail(`${where}: ${tables} tables, expected 1`);
    }

    if (blob.includes('—')) fail(`${where}: em dash in student-facing text`);
    if (/[‘’“”]/.test(blob)) fail(`${where}: curly quote; the bank uses straight quotes`);
    if (/\bSources?:\s*S\d/.test(blob) || /\[S\d+\]/.test(blob)) fail(`${where}: reviewer source note leaked into student text`);
    if (/https?:\/\//.test(blob)) fail(`${where}: a URL leaked into student text`);
    for (const opt of q.options) {
      if (/\.$/.test(opt.trim())) fail(`${where}: option text ends with a period: ${opt.slice(0, 60)}`);
    }
    for (const tag of ['p', 'li', 'ul', 'ol', 'strong', 'h4', 'em', 'i', 'sup', 'sub', 'table', 'tr', 'th', 'td', 'div']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${where}: <${tag}> opened ${o} times, closed ${c} times`);
    }
  }

  // ---- inventories match the review's own lists ---------------------------
  const sortQ = a => a.slice().sort((x, y) => Number(x.slice(1)) - Number(y.slice(1)));
  const gotStems = sortQ([...new Set(stemsChanged)]).join(',');
  const wantStems = sortQ(idmap.stem_changes).join(',');
  if (gotStems !== wantStems) fail(`stem inventory is ${gotStems}\n      the review lists  ${wantStems}`);

  const flat = o => sortQ(Object.keys(o)).map(k => k + ':' + o[k].slice().sort().join('')).join(' ');
  if (flat(optionsChanged) !== flat(idmap.option_changes)) {
    fail(`option inventory is ${flat(optionsChanged)}\n      the review lists  ${flat(idmap.option_changes)}`);
  }

  // ---- only the 58 pack items may change ----------------------------------
  const expected = new Set(EDITS.map(s => s.id));
  for (const q of data.biology.concat(data.chemistry)) {
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !expected.has(q.id)) fail(`${q.id}: changed but is outside this pack`);
    if (!changed && expected.has(q.id)) fail(`${q.id}: an edit was supplied but the record did not change`);
  }
  for (const id of KEEP) {
    if (before[id] !== JSON.stringify(by[id])) fail(`${id}: the review keeps this item unchanged, but it moved`);
  }
  if (data.biology.length !== 629 || data.chemistry.length !== 485) {
    fail(`counts moved: ${data.biology.length} biology, ${data.chemistry.length} chemistry`);
  }

  // ---- report -------------------------------------------------------------
  if (failed) {
    console.error(`\n${applied}/${EDITS.length} items applied cleanly; nothing written.`);
    process.exit(1);
  }
  const optLines = sortQ(Object.keys(optionsChanged))
    .map(k => k + ' ' + optionsChanged[k].join('/')).join(', ');
  const summary =
    `${applied}/${EDITS.length} items applied.\n` +
    `  stems changed   : ${new Set(stemsChanged).size} (${sortQ([...new Set(stemsChanged)]).join(', ')})\n` +
    `  options replaced: ${Object.values(optionsChanged).flat().length} (${optLines})\n` +
    `  point blocks replaced: ${EDITS.filter(s => s.points).length}\n` +
    `  five-point blocks kept: ${EDITS.filter(s => s.expectPoints === 5).length} edited in place, ` +
    `${idmap.five_point_blocks_kept.length} in total\n` +
    `  kept byte-identical  : ${[...KEEP].join(', ')}`;

  if (DRY) { console.log('dry run, nothing written.\n' + summary); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(summary + '\n  questions.json written.');
}

main();
