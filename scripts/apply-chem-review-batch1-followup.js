/**
 * Focused follow-up to chemistry review batch 1.
 *
 *   node scripts/apply-chem-review-batch1-followup.js [--dry]
 *
 * Five passages across four items, explanation fields only:
 *   Q5  chem-5   option D feedback, first sentence
 *   Q8  chem-8   option A feedback, first sentence; option D feedback, last sentence
 *   Q21 chem-22  one Bottom Line sentence
 *   Q47 chem-48  option D feedback paragraph (heading kept exactly)
 *
 * All-or-nothing: every anchor must match exactly once or nothing is written.
 * The guards pin the stem, every option text, the answer letter, the metadata,
 * every option heading, the table, the educational-point block and the rest of
 * the Bottom Line, so only the named passages can move.
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
    q: 'Q5', id: 'chem-5', expectLetter: 'B',
    explanation: [[
      "An ester (R-COO-R') is not formed by oxidation.",
      "An ester (R-COO-R') is not the product expected from the controlled oxidation of a primary alcohol " +
      'described here.'
    ]],
    keepText: [
      'Acid-catalyzed reaction of a carboxylic acid with an alcohol is one common esterification route, ' +
      'not the only possible way to make an ester.',
      'Many small esters have fruity and floral aromas.',
      'Primary alcohol (R-CH₂OH) -> Aldehyde (R-CHO) -> Carboxylic acid (R-COOH)'
    ],
    gone: ["An ester (R-COO-R') is not formed by oxidation", 'Baeyer', 'Villiger']
  },
  {
    q: 'Q8', id: 'chem-8', expectLetter: 'C',
    explanation: [
      ['Ethanol is an organic compound because it contains C-H bonds and a carbon backbone.',
       'Ethanol is an organic compound belonging to the alcohol class.'],
      ['It contains C-H bonds and a carboxyl group (-COOH), clearly classifying it as organic.',
       'Acetic acid belongs to the organic carboxylic acids and contains their characteristic -COOH group.']
    ],
    keepText: [
      'It is the alcohol found in alcoholic beverages and is produced by fermentation of sugars.',
      'Its structure (CH3-CH2-OH) features a hydroxyl functional group attached to a two-carbon chain.',
      'Acetic acid is an organic compound and the simplest carboxylic acid after formic acid.',
      'It gives vinegar its sour taste and pungent smell.',
      'Carbon dioxide is conventionally classified as an <strong>inorganic carbon compound</strong>',
      '<th>Compound type</th>'
    ],
    gone: ['because it contains C-H bonds and a carbon backbone',
           'clearly classifying it as organic']
  },
  {
    q: 'Q21', id: 'chem-22', expectLetter: 'B',
    explanation: [[
      'Resonance delocalization, electronegativity, and inductive effects all stabilize conjugate bases.',
      'Resonance delocalization and electron-withdrawing inductive effects can stabilize a negatively charged ' +
      'conjugate base.'
    ]],
    keepText: [
      'Bottom Line: Acidity depends on the stability of the conjugate base. More stable conjugate base = stronger acid.',
      'Phenol is acidic enough to react with NaOH but not with NaHCO₃',
      'The ethoxide ion is more resonance-stabilized than the phenoxide ion'
    ],
    gone: ['electronegativity, and inductive effects all stabilize conjugate bases']
  },
  {
    q: 'Q47', id: 'chem-48', expectLetter: 'C',
    explanation: [[
      '<p><strong>D. -NH₂ (amino):</strong> The amino group (-NH2) defines primary amines. In an alpha-amino acid, ' +
      'an amino group and a carboxyl group are attached to the same alpha carbon; alpha-amino acids are the building ' +
      'blocks of proteins. The amino group is basic (can accept a proton), while the carboxyl group is acidic.</p>',
      '<p><strong>D. -NH₂ (amino):</strong> An -NH₂ group alone does not define a primary amine: acetamide ' +
      '(CH₃CONH₂), for example, is an amide because its nitrogen is bonded directly to a carbonyl carbon. The group ' +
      'that identifies a carboxylic acid is -COOH. In an alpha-amino acid, an amino group and a carboxyl group are ' +
      'attached to the same alpha carbon.</p>'
    ]],
    keepText: [
      '<strong>D. -NH₂ (amino):</strong>',
      'Primary amine when attached to an appropriate carbon group',
      "Simple aldehydes such as ethanal can reduce Tollens' reagent.",
      'An OH group alone does not identify a carboxylic acid.',
      'Bottom Line: Carboxylic acids are weak acids'
    ],
    gone: ['The amino group (-NH2) defines primary amines',
           'alpha-amino acids are the building blocks of proteins',
           'The amino group is basic (can accept a proton)']
  }
];

// ===========================================================================

let failed = false;
function fail(msg) { console.error('FAIL ' + msg); failed = true; }

function replaceOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 160)}`);
    return null;
  }
  return text.replace(from, to);
}

const POINTS_RE = /Key Educational Points:<\/h4><ul>([\s\S]*?)<\/ul>/;
const pointBlock = e => { const m = e.match(POINTS_RE); return m ? m[1] : null; };
const tableOf = e => (e.match(/<table[\s\S]*?<\/table>/g) || []).join('\u0001');
const headingsOf = e => (e.match(/<h4>[\s\S]*?<\/h4>/g) || []).join('\u0001') +
  '\u0002' + (e.match(/<strong>[ABCD]\. [\s\S]*?<\/strong>/g) || []).join('\u0001');

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/chem-review-batch1-idmap.json'), 'utf8'));
  const by = Object.fromEntries(data.chemistry.map(q => [q.id, q]));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  const KEEP = new Set(idmap.keep_unchanged_per_review);
  let applied = 0, passages = 0;

  if (EDITS.length !== 4) fail(`${EDITS.length} items in this pass, expected 4`);
  const total = EDITS.reduce((n, s) => n + s.explanation.length, 0);
  if (total !== 5) fail(`${total} passage replacements, expected 5`);

  for (const spec of EDITS) {
    const where = `${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found in the chemistry bank`); continue; }
    if (idmap.map[spec.q] !== spec.id) { fail(`${where}: the id map says ${spec.q} is ${idmap.map[spec.q]}`); continue; }
    if (KEEP.has(spec.id)) { fail(`${where}: this item is a KEEP item`); continue; }
    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: stored key is ${LETTER[q.correct]}, this pass asserts ${spec.expectLetter}`);
      continue;
    }

    const stemBefore = q.question;
    const optsBefore = q.options.join('\u0000');
    const keyBefore = q.correct;
    const idBefore = q.id;
    const pointsBefore = pointBlock(q.explanation);
    const tableBefore = tableOf(q.explanation);
    const headsBefore = headingsOf(q.explanation);

    let t = q.explanation, ok = true;
    for (const [from, to] of spec.explanation) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { ok = false; break; }
      t = next;
      passages++;
    }
    if (!ok) continue;
    q.explanation = t;

    // nothing but the named passages may have moved
    if (q.question !== stemBefore) fail(`${where}: the stem changed; this pass is explanation-only`);
    if (q.options.join('\u0000') !== optsBefore) fail(`${where}: an option text changed`);
    if (q.correct !== keyBefore) fail(`${where}: the answer key moved`);
    if (q.id !== idBefore) fail(`${where}: the bank id changed`);
    if (pointBlock(q.explanation) !== pointsBefore) fail(`${where}: the educational-point block changed`);
    if (tableOf(q.explanation) !== tableBefore) fail(`${where}: a table changed`);
    if (headingsOf(q.explanation) !== headsBefore) fail(`${where}: an option or section heading changed`);
    applied++;
  }

  // ---- post-checks --------------------------------------------------------
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    const where = `${spec.q} ${spec.id}`;
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;

    for (const txt of spec.keepText || []) {
      if (!q.explanation.includes(txt)) fail(`${where}: retained text lost: ${txt.slice(0, 80)}`);
    }
    for (const g of spec.gone || []) {
      if (blob.includes(g)) fail(`${where}: superseded text still present: ${g.slice(0, 80)}`);
    }

    const esc = q.options[q.correct].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp('<h4>Correct Answer: ' + esc + '</h4>').test(q.explanation)) {
      fail(`${where}: the correct-answer heading no longer matches option ${LETTER[q.correct]} in full`);
    }
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      const n = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
      if (n !== 1) fail(`${where}: ${n} "${LETTER[i]}. ..." headings, expected 1`);
    }
    if ((q.explanation.match(/class='exp-key'>Bottom Line:/g) || []).length !== 1) {
      fail(`${where}: expected exactly one Bottom Line`);
    }
    if (blob.includes('—')) fail(`${where}: em dash in student-facing text`);
    if (/[‘’“”]/.test(blob)) fail(`${where}: curly quote; the bank uses straight quotes`);
    if (/\[S\d+\]/.test(blob) || /https?:\/\//.test(blob)) fail(`${where}: a source note or URL leaked into student text`);
    for (const tag of ['p', 'li', 'ul', 'ol', 'strong', 'h4', 'em', 'i', 'sup', 'sub', 'table', 'tr', 'th', 'td', 'div']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${where}: <${tag}> opened ${o} times, closed ${c} times`);
    }
  }

  // ---- only these four records may change ---------------------------------
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
  const summary = `${applied}/${EDITS.length} items applied, ${passages}/5 passages replaced ` +
    `(${EDITS.map(s => s.q + ' x' + s.explanation.length).join(', ')}).`;
  if (DRY) { console.log('dry run, nothing written.\n' + summary); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(summary + '\n  questions.json written.');
}

main();
