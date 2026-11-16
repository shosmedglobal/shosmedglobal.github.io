/**
 * Apply the external biology review of batch 7 (displayed Q1-Q60, covalent
 * enzyme modification through the atlas vertebra) to questions.json.
 *
 *   node scripts/apply-bio-review-batch7.js [--dry]
 *
 * The pack is the contiguous bank range bio-343..bio-404 minus bio-346 and
 * bio-385, which the export omits; scripts/bio-review-batch7-idmap.json records
 * the map. All 60 items were confirmed against BOTH the stem topic and the
 * answer letter the review asserts, whose tally (A=2, B=32, C=25, D=1) matches
 * the bank exactly.
 *
 * Q31 (bio-374), Q32 (bio-375), Q52 (bio-396), Q54 (bio-398), Q55 (bio-399) and
 * Q60 (bio-404) are absent from this script by design: the review says KEEP
 * UNCHANGED, so 54 of the 60 items are edited.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If a single anchor misses, nothing is written at all, so a stale
 * anchor can never produce a half-applied question. Post-checks run before the
 * file is written:
 *
 *   1. the stored key still matches the letter the review asserts, and no edit
 *      changes it;
 *   2. a renamed option has a matching "<LETTER>. <option text>:" heading in its
 *      distractor explanation, or, for the keyed option, in the answer heading;
 *   3. every string listed in `gone` really is absent afterwards;
 *   4. no edit introduces an em dash (house style forbids them in student copy);
 *   5. the six KEEP UNCHANGED ids are not targeted.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [].concat(
  require('./bio-batch7-edits-a.js'),
  require('./bio-batch7-edits-b.js'),
  require('./bio-batch7-edits-c.js'),
  require('./bio-batch7-edits-d.js'),
  require('./bio-batch7-edits-e.js')
);

// ===========================================================================

let failed = false;
function fail(msg) { console.error('FAIL ' + msg); failed = true; }

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
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch7-idmap.json'), 'utf8'));
  const seen = new Set();
  let applied = 0;

  for (const spec of EDITS) {
    const where = `Q${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found in questions.json`); continue; }
    if (map.map['Q' + spec.q] !== spec.id) {
      fail(`${where}: idmap says Q${spec.q} is ${map.map['Q' + spec.q]}`);
      continue;
    }
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

  // ---- post-check: option text and its heading must agree ----------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const renamed = []
      .concat((spec.optionFull || []).map(([i]) => i))
      .concat((spec.options || []).map(([i]) => i));
    for (const i of new Set(renamed)) {
      const label = q.options[i].replace(/<[^>]*>/g, '').replace(/\.$/, '');
      const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const head = i === q.correct
        ? new RegExp('Correct Answer: (?:' + LETTER[i] + '\\. )?' + esc)
        : new RegExp('<strong>' + LETTER[i] + '\\. ' + esc + '\\.?:?</strong>');
      if (!head.test(q.explanation)) {
        fail(`Q${spec.q} ${spec.id}: option ${LETTER[i]} reads "${label.slice(0, 70)}" but no matching heading in the explanation`);
      }
    }
    for (const gone of spec.gone || []) {
      if (q.explanation.includes(gone) || q.question.includes(gone) || q.options.join(' ').includes(gone)) {
        fail(`Q${spec.q} ${spec.id}: stale text still present: ${gone}`);
      }
    }
  }

  // ---- post-check: no em dashes in anything we touched -------------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('\u2014')) fail(`Q${spec.q} ${spec.id}: em dash in student-facing text`);
  }

  // ---- post-check: the KEEP UNCHANGED items must not be in EDITS ----------
  for (const id of map.keep_unchanged_per_review) {
    if (seen.has(id)) fail(`${id}: the review says KEEP UNCHANGED but an edit targets it`);
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
