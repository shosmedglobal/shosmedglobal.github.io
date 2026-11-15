/**
 * Apply the external biology review of batch 5 (displayed Q1-Q60, parietal
 * cells through the Na+/K+-ATPase) to questions.json.
 *
 *   node scripts/apply-bio-review-batch5.js [--dry]
 *
 * This pack is bio-191..bio-256 with six ids removed: five were edited in
 * batch 2 (bio-212, 230, 243, 252, 254) and bio-253 is simply absent from the
 * export. That leaves exactly 60, all confirmed against BOTH the topic and the
 * answer letter the review asserts; scripts/bio-review-batch5-idmap.json records it.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If a single anchor misses, nothing is written at all, so a stale anchor
 * can never produce a half-applied question. Three further post-checks run before
 * the file is written:
 *
 *   1. the stored key still matches the letter the review asserts;
 *   2. a renamed option has a matching "<LETTER>. <option text>:" heading in its
 *      distractor explanation, and the old heading is gone;
 *   3. no edit introduces an em dash (house style forbids them in student copy).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [].concat(
  require('./bio-batch5-edits-a.js'),
  require('./bio-batch5-edits-b.js'),
  require('./bio-batch5-edits-c.js'),
  require('./bio-batch5-edits-d.js'),
  require('./bio-batch5-edits-e.js')
);

// ===========================================================================

let failed = false;
function fail(msg) { console.error('FAIL ' + msg); failed = true; return false; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 130)}`);
    return null;
  }
  return text.replace(from, to);
}

function applyPairs(text, pairs, where) {
  let t = text;
  for (const [from, to] of pairs) {
    const next = replaceOnce(t, from, to, where);
    if (next === null) return null;
    t = next;
  }
  return t;
}

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  const seen = new Set();
  let applied = 0;

  for (const spec of EDITS) {
    const where = `Q${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found in questions.json`); continue; }
    if (seen.has(spec.id)) { fail(`${where}: id edited twice`); continue; }
    seen.add(spec.id);

    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: stored key is ${LETTER[q.correct]}, review asserts ${spec.expectLetter}`);
      continue;
    }

    let ok = true;

    if (spec.stemFull) {
      q.question = spec.stemFull;
    } else if (spec.stem) {
      const t = replaceOnce(q.question, spec.stem[0], spec.stem[1], where + ' stem');
      if (t === null) ok = false; else q.question = t;
    }

    for (const [i, text] of spec.optionFull || []) q.options[i] = text;

    for (const [i, from, to] of spec.options || []) {
      const t = replaceOnce(q.options[i], from, to, `${where} option ${LETTER[i]}`);
      if (t === null) ok = false; else q.options[i] = t;
    }

    if (spec.explanationFull) {
      q.explanation = spec.explanationFull;
    } else if (spec.explanation) {
      const t = applyPairs(q.explanation, spec.explanation, where + ' explanation');
      if (t === null) ok = false; else q.explanation = t;
    }

    if (ok) applied++;
  }

  // ---- post-check: option text and distractor heading must agree ----------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const renamed = []
      .concat((spec.optionFull || []).map(([i]) => i))
      .concat((spec.options || []).map(([i]) => i));
    for (const i of new Set(renamed)) {
      if (i === q.correct) continue;                 // keyed option has its own heading style
      const label = q.options[i].replace(/<[^>]*>/g, '');
      const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ' + esc + ':?</strong>').test(q.explanation) &&
          !new RegExp('<strong>' + LETTER[i] + '\\. ' + esc.slice(0, 40)).test(q.explanation)) {
        fail(`Q${spec.q} ${spec.id}: option ${LETTER[i]} reads "${label.slice(0, 60)}" but no matching "${LETTER[i]}. ..." heading in the explanation`);
      }
    }
    for (const gone of spec.headingsGone || []) {
      if (q.explanation.includes(gone)) {
        fail(`Q${spec.q} ${spec.id}: stale heading still present: ${gone}`);
      }
    }
  }

  // ---- post-check: no em dashes in anything we touched -------------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—')) fail(`Q${spec.q} ${spec.id}: em dash in student-facing text`);
  }

  if (failed) {
    console.error(`\n${applied}/${EDITS.length} items applied cleanly; nothing written.`);
    process.exit(1);
  }
  if (DRY) { console.log(`dry run: ${applied}/${EDITS.length} items apply cleanly.`); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`${applied}/${EDITS.length} items applied; questions.json written.`);
}

main();
