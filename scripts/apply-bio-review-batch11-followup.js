/**
 * Narrow clarification after the scientific reread of biology batch 11.
 *
 *   node scripts/apply-bio-review-batch11-followup.js [--dry]
 *
 * One item, one passage: the first sentence of option A's feedback in B4
 * (bio-606) is split so that each flea-borne pathogen is named with the
 * disease it causes, instead of letting "caused by Rickettsia typhi" appear to
 * govern plague as well.
 *
 * Nothing else may move. The guards assert that the stem, every option text,
 * the answer letter, the metadata, the option headings, the educational-point
 * count, the Bottom Line and the main explanation are all untouched, and that
 * no other record in either subject changes.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [
  {
    q: 'B4', id: 'bio-606', expectLetter: 'B',
    explanation: [[
      'Rat fleas are associated with plague and flea-borne murine typhus, caused by <em>Rickettsia typhi</em>.',
      'Rat fleas can transmit <em>Yersinia pestis</em>, which causes plague. They can also transmit ' +
      '<em>Rickettsia typhi</em>, which causes flea-borne murine typhus.'
    ]],
    keepHeadings: [
      '<strong>A. Rat flea (Xenopsylla cheopis):</strong>',
      '<strong>C. Hard tick (Ixodes ricinus):</strong>',
      '<strong>D. Deer fly (Chrysops):</strong>'
    ],
    // the rest of option A's paragraph, and the parts of the item the
    // clarification must not disturb
    keepText: [
      'Epidemic typhus is caused by <em>R. prowazekii</em> and is classically associated with body lice in crowded conditions.',
      'These similar disease names refer to different infections and vectors.',
      'They are not the established vector of epidemic typhus.',
      'louse feces containing <em>R. prowazekii</em> are scratched into the skin',
      "<p class='exp-key'>Bottom Line: Epidemic typhus = body louse"
    ],
    gone: ['Rat fleas are associated with plague and flea-borne murine typhus']
  }
];

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

const points = e => {
  const m = e.match(/Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/);
  return m ? (m[1].match(/<li>/g) || []).length : -1;
};
// everything before the distractor block, i.e. the main explanation
const mainOf = e => e.split('<h4>Why the other choices are wrong:</h4>')[0];

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch11-idmap.json'), 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  let applied = 0;

  for (const spec of EDITS) {
    const where = `${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found in questions.json`); continue; }
    if (idmap.map[spec.q] !== spec.id) { fail(`${where}: the id map says ${spec.q} is ${idmap.map[spec.q]}`); continue; }
    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: stored key is ${LETTER[q.correct]}, this pass asserts ${spec.expectLetter}`);
      continue;
    }

    const stemBefore = q.question;
    const optsBefore = q.options.join('\u0000');
    const keyBefore = q.correct;
    const pointsBefore = points(q.explanation);
    const mainBefore = mainOf(q.explanation);

    let t = q.explanation, ok = true;
    for (const [from, to] of spec.explanation) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { ok = false; break; }
      t = next;
    }
    if (!ok) continue;
    q.explanation = t;

    if (q.question !== stemBefore) fail(`${where}: the stem changed; this pass touches one feedback sentence only`);
    if (q.options.join('\u0000') !== optsBefore) fail(`${where}: an option text changed`);
    if (q.correct !== keyBefore) fail(`${where}: the answer key moved`);
    if (points(q.explanation) !== pointsBefore) {
      fail(`${where}: educational-point count moved from ${pointsBefore} to ${points(q.explanation)}`);
    }
    if (mainOf(q.explanation) !== mainBefore) fail(`${where}: the main explanation changed`);
    applied++;
  }

  // ---- post-checks --------------------------------------------------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const where = `${spec.q} ${spec.id}`;

    for (const head of spec.keepHeadings || []) {
      if (!q.explanation.includes(head)) fail(`${where}: option heading lost: ${head}`);
    }
    for (const t of spec.keepText || []) {
      if (!q.explanation.includes(t)) fail(`${where}: retained text lost: ${t.slice(0, 70)}`);
    }
    for (const gone of spec.gone || []) {
      if ((q.question + ' ' + q.options.join(' ') + ' ' + q.explanation).includes(gone)) {
        fail(`${where}: superseded text still present: ${gone}`);
      }
    }

    // the keyed option still equals its answer heading in full
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
    if ((q.explanation.match(/class='exp-key'>Bottom Line:/g) || []).length !== 1) {
      fail(`${where}: expected exactly one Bottom Line`);
    }
    if ((q.explanation.match(/<table/g) || []).length !== 0) fail(`${where}: a table appeared where there was none`);

    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—') || blob.includes('&mdash;')) fail(`${where}: em dash in student-facing text`);
    if (/[‘’“”]/.test(blob)) fail(`${where}: curly quote; the bank uses straight quotes`);
    for (const tag of ['p', 'li', 'ul', 'ol', 'strong', 'h4', 'em', 'i', 'sup', 'sub']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${where}: <${tag}> opened ${o} times, closed ${c} times`);
    }
  }

  // ---- only this one record may change ------------------------------------
  const expected = new Set(EDITS.map(s => s.id));
  for (const q of data.biology.concat(data.chemistry)) {
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !expected.has(q.id)) fail(`${q.id}: changed but this pass covers only ${[...expected].join(', ')}`);
    if (!changed && expected.has(q.id)) fail(`${q.id}: an edit was supplied but the record did not change`);
  }
  if (data.biology.length !== 629 || data.chemistry.length !== 485) {
    fail(`counts moved: ${data.biology.length} biology, ${data.chemistry.length} chemistry`);
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
