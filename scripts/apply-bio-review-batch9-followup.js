/**
 * Focused follow-up correction pass on biology review batch 9.
 *
 *   node scripts/apply-bio-review-batch9-followup.js [--dry]
 *
 * Five items only: Q3 (bio-475), Q19 (bio-491), Q23 (bio-495), Q29 (bio-501)
 * and Q37 (bio-509). Nothing else in the pack and nothing outside it may
 * change. Only Q3 changes its stem and only Q37 changes an option text, whose
 * distractor heading is synchronised with it. Answer letters and question ids
 * are preserved: Q3=D, Q19=A, Q23=A, Q29=B, Q37=B.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If one anchor misses, nothing is written at all, so a stale anchor
 * can never produce a half-applied question. Post-checks confirm the asserted
 * key, that no other stem or option moved, that a renamed option matches its
 * heading in full, that the superseded wording is gone, that tags stay
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
    q: 3, id: 'bio-475', expectLetter: 'D',
    stemFull: 'Which sequence is consistent with a proposed origin-of-life model in which self-replicating molecules arise before membrane-enclosed protocells?',
    gone: ['organic building blocks form first, self-replicating molecules develop next']
  },

  {
    q: 19, id: 'bio-491', expectLetter: 'A',
    explanation: [[
      '<p><strong>D. Normal male phenotype with no clinical manifestations:</strong> While Klinefelter syndrome can be mild (and some men are diagnosed only during infertility workup), it is NOT a completely normal phenotype. Most affected individuals have at least some clinical features, particularly small testes and infertility. Many individuals remain undiagnosed, however, because the features can be mild.</p>',
      '<p><strong>D. Normal male phenotype with no clinical manifestations:</strong> Some individuals with Klinefelter syndrome have very mild or no obvious symptoms, so a lack of obvious features does not exclude the condition. However, absence of clinical manifestations is not its characteristic presentation. Small testes, impaired fertility and the other findings in A are characteristic, although their presence and severity vary.</p>'
    ]],
    keepHeadings: ['<strong>D. Normal male phenotype with no clinical manifestations:</strong>'],
    gone: ['it is NOT a completely normal phenotype', 'diagnosed only during infertility workup']
  },

  {
    q: 23, id: 'bio-495', expectLetter: 'A',
    explanation: [
      ['<p><strong>D. Inversions always cause trisomy in offspring:</strong> An inversion is a rearrangement rather than an automatic gain of a whole chromosome; trisomy arises from nondisjunction. Some recombinant products carry duplicated material, but that is not the same as every offspring having whole-chromosome trisomy.</p>',
        '<p><strong>D. Inversions always cause trisomy in offspring:</strong> An inversion rearranges a segment within a chromosome; it does not automatically add a whole chromosome. Crossing over in a pericentric inversion heterozygote can produce duplicated or deleted chromosome segments, but this does not mean that every offspring will have trisomy.</p>'],
      ['<li>Pericentric inversion = includes centromere → crossover produces chromosomes with duplications and deletions</li>',
        '<li>Pericentric inversion = includes the centromere; crossing over within the inversion loop can produce chromatids with duplications and deletions</li>'],
      ['<p class=\'exp-key\'>Bottom Line: In inversion heterozygotes, crossing over within the inverted segment produces unbalanced gametes with duplications and deletions, often leading to inviable offspring.</p>',
        '<p class=\'exp-key\'>Bottom Line: In a pericentric inversion heterozygote, crossing over within the inverted region can produce unbalanced gametes carrying duplicated and deleted chromosome segments, increasing the risk of pregnancy loss or an affected child.</p>']
    ],
    keepHeadings: ['<strong>D. Inversions always cause trisomy in offspring:</strong>'],
    gone: ['trisomy arises from nondisjunction', 'includes centromere →',
      'often leading to inviable offspring']
  },

  {
    q: 29, id: 'bio-501', expectLetter: 'B',
    explanation: [[
      '<p><strong>C. PKU is an X-linked disorder that only affects males:</strong> PKU is autosomal recessive, NOT X-linked. Both males and females are affected equally. The PAH gene is located on chromosome 12. X-linked disorders preferentially affect males (e.g., hemophilia, Duchenne muscular dystrophy), but PKU is not one of them.</p>',
      '<p><strong>C. PKU is an X-linked disorder that only affects males:</strong> PKU is an autosomal recessive disorder caused by disease-causing variants in both copies of the PAH gene. It can affect either sex. Treatment aims to control phenylalanine levels, not to provide the hormone treatment proposed in this option.</p>'
    ]],
    keepHeadings: ['<strong>C. PKU is an X-linked disorder that only affects males:</strong>'],
    gone: ['X-linked disorders preferentially affect males', 'PKU is autosomal recessive, NOT X-linked']
  },

  {
    q: 37, id: 'bio-509', expectLetter: 'B',
    optionFull: [[0, 'Natural selection favoring the inherited trait']],
    explanation: [[
      '<p><strong>A. Natural selection favoring polydactyly:</strong>',
      '<p><strong>A. Natural selection favoring the inherited trait:</strong>'
    ]],
    gone: ['Natural selection favoring polydactyly']
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
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch9-idmap.json'), 'utf8'));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  const STEM_OK = ['bio-475'];       // the only stem this pass may touch
  const OPT_OK = ['bio-509'];        // the only option text this pass may touch
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
    let ok = true;

    if (spec.stemFull) q.question = spec.stemFull;
    for (const [i, t] of spec.optionFull || []) q.options[i] = t;

    let t = q.explanation;
    for (const [from, to] of spec.explanation || []) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { ok = false; break; }
      t = next;
    }
    if (!ok) continue;
    q.explanation = t;

    if (q.question !== stemBefore && !STEM_OK.includes(spec.id)) fail(`${where}: stem changed but only Q3's stem may move`);
    if (q.options.join('\u0000') !== optsBefore && !OPT_OK.includes(spec.id)) {
      fail(`${where}: option text changed but only Q37's option A may move`);
    }
    if (q.correct !== keyBefore) fail(`${where}: the answer key moved`);
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
      if (i === q.correct) { fail(`${where}: this pass renames no keyed option`); continue; }
      const label = q.options[i].replace(/<[^>]*>/g, '');
      const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ' + esc + ':</strong>').test(q.explanation)) {
        fail(`${where}: option ${LETTER[i]} reads "${label}" but its heading does not match`);
      }
    }
    // every distractor still has exactly one heading, and the keyed option its
    // answer heading in full
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      const heads = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
      if (heads !== 1) fail(`${where}: ${heads} "${LETTER[i]}. ..." headings, expected 1`);
    }
    const keyLabel = q.options[q.correct].replace(/<[^>]*>/g, '');
    const escKey = keyLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp('<h4>Correct Answer: (?:' + LETTER[q.correct] + '\\. )?' + escKey + '</h4>').test(q.explanation)) {
      fail(`${where}: the correct-answer heading no longer matches option ${LETTER[q.correct]} in full`);
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

  // ---- nothing outside the five items may change --------------------------
  const expected = new Set(EDITS.map(s => s.id));
  for (const q of data.biology.concat(data.chemistry)) {
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !expected.has(q.id)) fail(`${q.id}: changed but is not one of the five items`);
    if (!changed && expected.has(q.id)) fail(`${q.id}: is one of the five items but did not change`);
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
