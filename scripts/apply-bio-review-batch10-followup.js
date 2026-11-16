/**
 * Narrow follow-up correction pass on biology review batch 10.
 *
 *   node scripts/apply-bio-review-batch10-followup.js [--dry]
 *
 * Five items only: Q8 (bio-545), Q33 (bio-572), Q47 (bio-588), Q48 (bio-589)
 * and Q56 (bio-598). Only the explanation field of each may change. Nothing
 * else in the pack and nothing outside it may change: every stem, option,
 * answer letter, question id and option heading is preserved, as are the
 * educational-point counts and the presence of each Bottom Line.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If one anchor misses, nothing is written at all, so a stale anchor
 * can never produce a half-applied question. Post-checks confirm the asserted
 * key, that no stem or option moved at all, that every option heading
 * survived, that the superseded wording is gone, that each item still has one
 * Bottom Line and the same number of educational points, that tags stay
 * balanced and that no em dash or curly quote entered student copy.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

// ---------------------------------------------------------------------------

const EDITS = [
  {
    q: 8, id: 'bio-545', expectLetter: 'A',
    explanation: [
      ['Factor VIII is part of the intrinsic coagulation pathway, which is assessed by aPTT. Therefore, Factor VIII deficiency prolongs aPTT while PT (which measures the extrinsic pathway) remains normal.',
        'Factor VIII participates in the intrinsic coagulation pathway. aPTT assesses the intrinsic and common pathways; PT assesses the extrinsic and common pathways. Hemophilia A typically causes a prolonged aPTT with normal PT, but mild disease can have a normal aPTT.'],
      ['It also causes prolonged aPTT with normal PT.</p>',
        'It also typically causes a prolonged aPTT with normal PT.</p>'],
      ['<p class=\'exp-key\'>Bottom Line: Hemophilia A is Factor VIII deficiency causing prolonged aPTT with normal PT, inherited in an X-linked recessive pattern.</p>',
        '<p class=\'exp-key\'>Bottom Line: Hemophilia A is an X-linked disorder caused by reduced factor VIII activity. It typically prolongs aPTT with normal PT, although mild disease may have a normal aPTT.</p>']
    ],
    keepHeadings: ['<strong>B. Hemophilia B (Christmas disease):</strong>'],
    gone: ['which is assessed by aPTT. Therefore', 'which measures the extrinsic pathway',
      'It also causes prolonged aPTT with normal PT', 'Hemophilia A is Factor VIII deficiency causing']
  },

  {
    q: 33, id: 'bio-572', expectLetter: 'C',
    explanation: [[
      '<li>Barr body count in Turner syndrome: 1 − 1 = 0</li>',
      '<li>For the 45,X cells described here, the expected Barr body count is 1 − 1 = 0</li>'
    ]],
    gone: ['Barr body count in Turner syndrome:']
  },

  {
    q: 47, id: 'bio-588', expectLetter: 'A',
    explanation: [[
      '<p class=\'exp-key\'>Bottom Line: Septate hyphae with acute-angle branching, a halo sign on CT and prolonged neutropenia together point to invasive aspergillosis. Contrast with Mucorales: broad, pauciseptate hyphae with irregular or near-right-angle branching. Neither finding is specific on its own.</p>',
      '<p class=\'exp-key\'>Bottom Line: In a bone marrow transplant recipient, a pulmonary halo sign and septate hyphae with acute-angle branching strongly suggest invasive aspergillosis. Mucorales typically have broad, sparsely septate hyphae with irregular or near-right-angle branching. Neither the hyphal appearance nor the halo sign is specific on its own.</p>'
    ]],
    gone: ['prolonged neutropenia together point to invasive aspergillosis']
  },

  {
    q: 48, id: 'bio-589', expectLetter: 'C',
    explanation: [[
      'They should not be distinguished by claiming yeasts can never form filaments: <em>Candida</em> can form pseudohyphae and true hyphae.</p>',
      'Some yeasts can also grow in filamentous forms: <em>Candida</em> can produce pseudohyphae and true hyphae.</p>'
    ]],
    keepHeadings: ['<strong>B. Yeasts:</strong>'],
    gone: ['They should not be distinguished by claiming yeasts can never form filaments']
  },

  {
    q: 56, id: 'bio-598', expectLetter: 'C',
    explanation: [[
      'All <em>Plasmodium</em> species use this machinery to invade red blood cells and liver cells.',
      'In human malaria, sporozoites invade liver cells and merozoites invade red blood cells.'
    ]],
    gone: ['All <em>Plasmodium</em> species use this machinery']
  }
];

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

const points = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>/g) || []).length : -1;
};

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch10-idmap.json'), 'utf8'));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  const touched = new Set();
  let applied = 0;

  for (const spec of EDITS) {
    const where = `Q${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found in questions.json`); continue; }
    if (map.map['Q' + spec.q] !== spec.id) {
      fail(`${where}: idmap says Q${spec.q} is ${map.map['Q' + spec.q]}`);
      continue;
    }
    if (touched.has(spec.id)) { fail(`${where}: id edited twice`); continue; }
    touched.add(spec.id);

    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: stored key is ${LETTER[q.correct]}, the follow-up asserts ${spec.expectLetter}`);
      continue;
    }

    const stemBefore = q.question;
    const optsBefore = q.options.join('\u0000');
    const keyBefore = q.correct;
    const pointsBefore = points(q.explanation);
    let ok = true;

    let t = q.explanation;
    for (const [from, to] of spec.explanation) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { ok = false; break; }
      t = next;
    }
    if (!ok) continue;
    q.explanation = t;

    if (q.question !== stemBefore) fail(`${where}: stem changed, but this pass touches explanations only`);
    if (q.options.join('\u0000') !== optsBefore) fail(`${where}: option text changed, but this pass touches explanations only`);
    if (q.correct !== keyBefore) fail(`${where}: the answer key moved`);
    if (points(q.explanation) !== pointsBefore) {
      fail(`${where}: educational-point count moved from ${pointsBefore} to ${points(q.explanation)}`);
    }
    applied++;
  }

  // ---- post-checks --------------------------------------------------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const where = `Q${spec.q} ${spec.id}`;

    for (const head of spec.keepHeadings || []) {
      if (!q.explanation.includes(head)) fail(`${where}: option heading lost: ${head}`);
    }
    for (const gone of spec.gone || []) {
      if ((q.question + ' ' + q.options.join(' ') + ' ' + q.explanation).includes(gone)) {
        fail(`${where}: replaced text still present: ${gone}`);
      }
    }
    // every option keeps its own heading, and the keyed option its answer heading in full
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      const heads = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
      if (heads !== 1) fail(`${where}: ${heads} "${LETTER[i]}. ..." headings, expected 1`);
    }
    const keyLabel = q.options[q.correct];
    const escKey = keyLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp('<h4>Correct Answer: (?:' + LETTER[q.correct] + '\\. )?' + escKey + '</h4>').test(q.explanation)) {
      fail(`${where}: the correct-answer heading no longer matches option ${LETTER[q.correct]} in full`);
    }
    if ((q.explanation.match(/class='exp-key'>Bottom Line:/g) || []).length !== 1) {
      fail(`${where}: expected exactly one Bottom Line`);
    }
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—')) fail(`${where}: em dash in student-facing text`);
    if (/[‘’“”]/.test(blob)) fail(`${where}: curly quote; the bank uses straight quotes`);
    for (const tag of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub', 'em', 'i', 'table', 'tr', 'td', 'th']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${where}: <${tag}> opened ${o} times, closed ${c} times`);
    }
  }

  // ---- nothing outside the five items may change, and only explanations ---
  const expected = new Set(EDITS.map(s => s.id));
  for (const q of data.biology.concat(data.chemistry)) {
    const was = JSON.parse(before[q.id]);
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !expected.has(q.id)) fail(`${q.id}: changed but is not one of the five items`);
    if (!changed && expected.has(q.id)) fail(`${q.id}: is one of the five items but did not change`);
    if (changed) {
      if (was.question !== q.question) fail(`${q.id}: the stem changed; this pass is explanation-only`);
      if (was.options.join('\u0000') !== q.options.join('\u0000')) fail(`${q.id}: an option changed; this pass is explanation-only`);
      if (was.correct !== q.correct) fail(`${q.id}: the key changed`);
      if (was.topic !== q.topic || was.subject !== q.subject) fail(`${q.id}: a metadata field changed`);
    }
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
