/**
 * Apply the external biology review of batch 8 (displayed Q1-Q60, Toxoplasma
 * definitive hosts through Fox's proteinoid microspheres) to questions.json.
 *
 *   node scripts/apply-bio-review-batch8.js [--dry]
 *
 * The pack is the bank range bio-406..bio-472 minus seven ids the export omits:
 * bio-423, bio-440, bio-441, bio-450, bio-453 and bio-466 were all edited in
 * batch 2, and bio-462 is simply absent. scripts/bio-review-batch8-idmap.json
 * records the map. All 60 items were confirmed against BOTH the stem topic and
 * the answer letter the review asserts, whose tally (A=4, B=31, C=21, D=4)
 * matches the bank exactly.
 *
 * Q6 (bio-411), Q7 (bio-412), Q28 (bio-434), Q29 (bio-435), Q48 (bio-458) and
 * Q55 (bio-467) are absent from this script by design: the review says KEEP
 * UNCHANGED, so 54 of the 60 items are edited.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If a single anchor misses, nothing is written at all, so a stale
 * anchor can never produce a half-applied question. Post-checks run before the
 * file is written:
 *
 *   1. the stored key still matches the letter the review asserts, and no edit
 *      changes it;
 *   2. a renamed option has a matching "<LETTER>. <option text>:" heading in
 *      its distractor explanation, or, for the keyed option, in the answer
 *      heading (which in this pack often carries no answer letter);
 *   3. every heading listed in `keepHeadings` survives, and every string listed
 *      in `gone` really is absent afterwards;
 *   4. every distractor still has a heading of its own and no two distractors
 *      in one item share identical feedback;
 *   5. HTML tags stay balanced and no edit introduces an em dash;
 *   6. the six KEEP UNCHANGED ids are untouched, every other pack id changed,
 *      and nothing outside the pack changed at all.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [].concat(
  require('./bio-batch8-edits-a.js'),
  require('./bio-batch8-edits-b.js'),
  require('./bio-batch8-edits-c.js'),
  require('./bio-batch8-edits-d.js'),
  require('./bio-batch8-edits-e.js')
);

// ===========================================================================

let failed = false;
function fail(msg) { console.error('FAIL ' + msg); failed = true; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 140)}`);
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
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch8-idmap.json'), 'utf8'));
  const PACK = new Set(Object.values(map.map));
  const KEEP = new Set(map.keep_unchanged_per_review);
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
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

    const keyBefore = q.correct;
    let ok = true;

    if (spec.stemFull) {
      q.question = spec.stemFull;
    } else if (spec.stem) {
      const t = replaceOnce(q.question, spec.stem[0], spec.stem[1], where + ' stem');
      if (t === null) ok = false; else q.question = t;
    }

    for (const [i, text] of spec.optionFull || []) q.options[i] = text;

    if (spec.explanationFull) {
      q.explanation = spec.explanationFull;
    } else if (spec.explanation) {
      const t = applyPairs(q.explanation, spec.explanation, where + ' explanation');
      if (t === null) ok = false; else q.explanation = t;
    }

    if (q.correct !== keyBefore) fail(`${where}: the answer key moved`);
    if (ok) applied++;
  }

  // ---- post-checks --------------------------------------------------------
  const STEM_CHANGED = new Set();
  const OPT_CHANGED = new Set();

  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const where = `Q${spec.q} ${spec.id}`;
    if (spec.stemFull || spec.stem) STEM_CHANGED.add('Q' + spec.q);
    for (const [i] of spec.optionFull || []) OPT_CHANGED.add('Q' + spec.q + LETTER[i]);

    // a renamed option and its heading must agree
    for (const [i] of spec.optionFull || []) {
      const label = q.options[i].replace(/<[^>]*>/g, '').replace(/\.$/, '');
      const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const head = i === q.correct
        ? new RegExp('Correct Answer: (?:' + LETTER[i] + '\\. )?' + esc)
        : new RegExp('<strong>' + LETTER[i] + '\\. ' + esc + '\\.?:?</strong>');
      if (!head.test(q.explanation)) {
        fail(`${where}: option ${LETTER[i]} reads "${label.slice(0, 70)}" but no matching heading in the explanation`);
      }
    }

    for (const head of spec.keepHeadings || []) {
      if (!q.explanation.includes(head)) fail(`${where}: option heading lost: ${head}`);
    }
    for (const gone of spec.gone || []) {
      if ((q.question + ' ' + q.options.join(' ') + ' ' + q.explanation).includes(gone)) {
        fail(`${where}: stale text still present: ${gone}`);
      }
    }
  }

  // every pack item keeps a heading for each distractor, and no two
  // distractors in one item carry identical feedback
  for (const id of PACK) {
    const q = by[id];
    const bodies = [];
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. [\\s\\S]*?</strong>([\\s\\S]*?)</p>'));
      if (!m) { fail(`${id}: no "${LETTER[i]}. ..." heading in the explanation`); continue; }
      const body = m[1].trim();
      if (body.length < 20) fail(`${id}: option ${LETTER[i]} feedback is only ${body.length} characters`);
      if (bodies.includes(body)) fail(`${id}: option ${LETTER[i]} repeats another distractor's feedback verbatim`);
      bodies.push(body);
    }
    const label = q.options[q.correct].replace(/<[^>]*>/g, '').replace(/\.$/, '');
    const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp('Correct Answer: (?:' + LETTER[q.correct] + '\\. )?(?:' + esc + '|RuBisCO)').test(q.explanation)) {
      fail(`${id}: the correct-answer heading does not match option ${LETTER[q.correct]}`);
    }
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('\u2014')) fail(`${id}: em dash in student-facing text`);
    for (const tag of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub', 'table', 'tr', 'td', 'th']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${id}: <${tag}> opened ${o} times, closed ${c} times`);
    }
  }

  // the inventory the review prints must match what this script actually did
  const wantStems = new Set(map.stem_replacements);
  for (const k of wantStems) if (!STEM_CHANGED.has(k)) fail(`${k}: the review lists a stem replacement but none was applied`);
  for (const k of STEM_CHANGED) if (!wantStems.has(k)) fail(`${k}: a stem changed but the review does not list it`);
  const wantOpts = new Set(Object.entries(map.option_renames).map(([k, v]) => k + v));
  for (const k of wantOpts) if (!OPT_CHANGED.has(k)) fail(`${k}: the review lists an option replacement but none was applied`);
  for (const k of OPT_CHANGED) if (!wantOpts.has(k)) fail(`${k}: an option text changed but the review does not list it`);

  for (const id of KEEP) {
    if (seen.has(id)) fail(`${id}: the review says KEEP UNCHANGED but an edit targets it`);
  }

  // ---- scope: the pack changed, nothing else did --------------------------
  for (const q of data.biology.concat(data.chemistry)) {
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !PACK.has(q.id)) fail(`${q.id}: changed but is not in the batch 8 pack`);
    if (changed && KEEP.has(q.id)) fail(`${q.id}: changed but the review says KEEP UNCHANGED`);
    if (!changed && PACK.has(q.id) && !KEEP.has(q.id)) fail(`${q.id}: is in the pack but did not change`);
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
