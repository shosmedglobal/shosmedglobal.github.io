/**
 * Narrow follow-up correction pass on biology review batch 8.
 *
 *   node scripts/apply-bio-review-batch8-followup.js [--dry]
 *
 * Four items only: Q8 (bio-413), Q43 (bio-452), Q58 (bio-470) and Q59
 * (bio-471). Nothing else in the pack and nothing outside it may change. No
 * stem changes at all; the one option text that moves is Q59's option B, whose
 * distractor heading is synchronised with it. Answer letters, question ids and
 * every other heading are preserved.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If one anchor misses, nothing is written at all, so a stale anchor
 * can never produce a half-applied question. Post-checks confirm that the
 * asserted key is unchanged, that no stem moved, that a renamed option matches
 * its heading, that the superseded wording is gone, that tags stay balanced
 * and that no em dash entered student copy.
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
    q: 8, id: 'bio-413', expectLetter: 'B',
    explanation: [
      ['<li>Excystation releases trophozoites, the active form; these may stay in the intestinal lumen or invade the wall, and they cannot survive outside the host.</li>',
        '<li>Excystation releases trophozoites, the active form. They are fragile outside the host and ordinarily do not survive passage through the stomach after ingestion.</li>'],
      ['<li>Trophozoites invade the colonic wall causing amoebic dysentery with flask-shaped ulcers, and can seed the liver as an abscess.</li>',
        '<li>Trophozoites may remain in the intestinal lumen or invade the colonic wall. Invasive infection can cause flask-shaped ulcers and amoebic dysentery, and may spread to the liver to form an abscess.</li>']
    ],
    gone: ['these may stay in the intestinal lumen or invade the wall',
      'Trophozoites invade the colonic wall causing amoebic dysentery with flask-shaped ulcers']
  },

  {
    q: 43, id: 'bio-452', expectLetter: 'C',
    explanation: [[
      '<p><strong>B. Veins:</strong> Venous pressure is much lower than aortic pressure (~2-10 mmHg). Venous return is driven by a pressure gradient toward the right atrium and is assisted by skeletal-muscle contractions, breathing and venous valves.</p>',
      '<p><strong>B. Veins:</strong> Venous pressure is much lower than aortic pressure. Venous return is driven by a pressure gradient toward the right atrium and is assisted by skeletal-muscle contractions, breathing and venous valves.</p>'
    ]],
    keepHeadings: ['<strong>B. Veins:</strong>'],
    gone: ['much lower than aortic pressure (~2-10 mmHg)']
  },

  {
    q: 58, id: 'bio-470', expectLetter: 'D',
    explanation: [[
      '<p><strong>C. RNA contains thymine instead of uracil:</strong> This is reversed. Standard RNA uses uracil (U) and standard DNA uses thymine (T). The chemical difference that matters for this hypothesis is RNA\'s 2\'-OH group rather than thymine\'s methyl group.</p>',
      '<p><strong>C. RNA contains thymine instead of uracil:</strong> This reverses the standard base distinction: RNA uses uracil, whereas DNA uses thymine. The RNA world hypothesis is supported by RNA\'s ability to carry genetic information and catalyze reactions.</p>'
    ]],
    keepHeadings: ['<strong>C. RNA contains thymine instead of uracil:</strong>'],
    gone: ['The chemical difference that matters for this hypothesis is RNA\'s 2\'-OH group']
  },

  {
    q: 59, id: 'bio-471', expectLetter: 'C',
    optionFull: [[1, 'They reproduce by coordinated DNA replication and binary fission']],
    explanation: [[
      '<p><strong>B. Reproduction by coordinated DNA replication and binary fission, as in modern bacteria:</strong>',
      '<p><strong>B. They reproduce by coordinated DNA replication and binary fission:</strong>'
    ]],
    gone: ['Reproduction by coordinated DNA replication and binary fission, as in modern bacteria']
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

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch8-idmap.json'), 'utf8'));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  const OPT_OK = ['bio-471'];        // the only option text this pass may touch
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
      fail(`${where}: stored key is ${LETTER[q.correct]}, review asserts ${spec.expectLetter}`);
      continue;
    }

    const stemBefore = q.question;
    const optsBefore = q.options.join('\u0000');
    let ok = true;

    for (const [i, t] of spec.optionFull || []) q.options[i] = t;

    let t = q.explanation;
    for (const [from, to] of spec.explanation || []) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { ok = false; break; }
      t = next;
    }
    if (!ok) continue;
    q.explanation = t;

    if (q.question !== stemBefore) fail(`${where}: stem changed, but this pass touches no stems`);
    if (q.options.join('\u0000') !== optsBefore && !OPT_OK.includes(spec.id)) {
      fail(`${where}: option text changed but only Q59's option B may move`);
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
    // a renamed option and its distractor heading must agree exactly
    for (const [i] of spec.optionFull || []) {
      const label = q.options[i].replace(/<[^>]*>/g, '');
      const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (i === q.correct) fail(`${where}: this pass renames no keyed option`);
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ' + esc + ':</strong>').test(q.explanation)) {
        fail(`${where}: option ${LETTER[i]} reads "${label}" but its heading does not match`);
      }
    }
    // every distractor still has its own heading, and the keyed option its answer heading
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ').test(q.explanation)) {
        fail(`${where}: no "${LETTER[i]}. ..." heading in the explanation`);
      }
    }
    const keyLabel = q.options[q.correct].replace(/<[^>]*>/g, '');
    if (!q.explanation.includes('Correct Answer: ' + keyLabel) &&
        !q.explanation.includes('Correct Answer: ' + LETTER[q.correct] + '. ' + keyLabel)) {
      fail(`${where}: the correct-answer heading no longer matches option ${LETTER[q.correct]}`);
    }
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—')) fail(`${where}: em dash in student-facing text`);
    if (/[‘’“”]/.test(blob)) fail(`${where}: curly quote; the bank uses straight quotes`);
    for (const tag of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub', 'table', 'tr', 'td', 'th']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${where}: <${tag}> opened ${o} times, closed ${c} times`);
    }
  }

  // ---- nothing outside the four items may change --------------------------
  const expected = new Set(EDITS.map(s => s.id));
  for (const q of data.biology.concat(data.chemistry)) {
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !expected.has(q.id)) fail(`${q.id}: changed but is not one of the four items`);
    if (!changed && expected.has(q.id)) fail(`${q.id}: is one of the four items but did not change`);
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
