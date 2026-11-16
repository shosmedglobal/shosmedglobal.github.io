/**
 * Narrow follow-up correction pass on biology review batch 7.
 *
 *   node scripts/apply-bio-review-batch7-followup.js [--dry]
 *
 * Eight items only: Q4 (bio-347), Q6 (bio-349), Q17 (bio-360), Q19 (bio-362),
 * Q24 (bio-367), Q30 (bio-373), Q40 (bio-383) and Q48 (bio-392). Nothing else
 * in the pack and nothing outside it may change. Only Q6 and Q30 change their
 * stems; option texts, answer letters, question ids and every option heading
 * are preserved, and the rest is distractor feedback and single educational
 * points.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If one anchor misses, nothing is written at all, so a stale anchor
 * can never produce a half-applied question. Post-checks confirm that the
 * asserted key is unchanged, that every option heading and option text
 * survived verbatim, that the text the review replaces is gone, and that no em
 * dash entered student copy.
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
    q: 4, id: 'bio-347', expectLetter: 'C',
    explanation: [[
      '<p><strong>B. Mast cell:</strong> Mast cells store granules containing histamine and heparin, itself a proteoglycan, and release them during allergic and inflammatory responses. They alter the local environment, including vascular permeability and blood flow, but they are not the principal producers of connective-tissue matrix.</p>',
      '<p><strong>B. Mast cell:</strong> Mast-cell granules contain histamine and proteoglycans. Heparin is a sulfated glycosaminoglycan attached to a protein core within these proteoglycans. Mast cells release mediators during allergic and inflammatory responses, altering blood flow and vascular permeability, but they are not the principal producers of connective-tissue matrix.</p>'
    ]],
    keepHeadings: ['<strong>B. Mast cell:</strong>'],
    gone: ['heparin, itself a proteoglycan']
  },

  {
    q: 6, id: 'bio-349', expectLetter: 'C',
    stem: ['and the fibrocartilaginous disc of the pubic symphysis?', 'and the central disc of the pubic symphysis?'],
    gone: ['fibrocartilaginous disc of the pubic symphysis']
  },

  {
    q: 17, id: 'bio-360', expectLetter: 'C',
    explanation: [
      ['<p><strong>A. None:</strong> If none of the daughters were affected, it would mean none inherited both mutant X chromosomes. However, the father (who has hemophilia) will pass his X<sup>h</sup> chromosome to every daughter. Since the mother is a carrier (X<sup>H</sup> X<sup>h</sup>), each daughter has a 50% chance of receiving the mother\'s X<sup>h</sup> allele too, resulting in an affected (X<sup>h</sup> X<sup>h</sup>) daughter.</p>',
        '<p><strong>A. None:</strong> Every daughter receives her father\'s X<sup>h</sup>, and each has a 50% chance of also inheriting her mother\'s X<sup>h</sup>. The expected proportion with two altered alleles is therefore 1/2, not zero.</p>'],
      ['<li>Daughters are therefore half carriers and half affected.</li>',
        '<li>Among daughters, the expected genotypes are 50% X<sup>h</sup>X<sup>h</sup> and 50% X<sup>H</sup>X<sup>h</sup>.</li>']
    ],
    keepHeadings: ['<strong>A. None:</strong>'],
    gone: ['If none of the daughters were affected', 'Daughters are therefore half carriers and half affected']
  },

  {
    q: 19, id: 'bio-362', expectLetter: 'B',
    explanation: [[
      '<li>Every affected individual has at least one affected parent, unless a new mutation has arisen.</li>',
      '<li>An affected person may inherit the variant from a parent with symptoms or from a parent who has not expressed the condition; alternatively, the variant may arise as a new mutation.</li>'
    ]],
    gone: ['Every affected individual has at least one affected parent']
  },

  {
    q: 24, id: 'bio-367', expectLetter: 'B',
    explanation: [[
      'because selection, migration and other processes can still change them. Drift is simply not the dominant force here.</p>',
      'because selection, migration and other processes can still change them.</p>'
    ]],
    keepHeadings: ['<strong>A. Large populations with high genetic diversity:</strong>'],
    gone: ['Drift is simply not the dominant force here']
  },

  {
    q: 30, id: 'bio-373', expectLetter: 'A',
    stemFull: 'In a population initially in Hardy-Weinberg equilibrium, with both alleles present, individuals begin preferentially mating with others of the same genotype at a particular locus. Assume equal reproductive contributions and no selection, mutation, migration or drift. What is the expected effect of this positive assortative mating?',
    gone: ['In a simple population-genetics model, individuals preferentially mate']
  },

  {
    q: 40, id: 'bio-383', expectLetter: 'C',
    explanation: [[
      '<li>This contrasts with cell surface receptors, which act within seconds to minutes through second messengers and reach transcription factors only indirectly, through signalling pathways.</li>',
      '<li>Cell-surface receptors signal through intracellular proteins, second messengers, or both. Some responses are rapid, while others change gene expression over longer periods.</li>'
    ]],
    gone: ['which act within seconds to minutes through second messengers']
  },

  {
    q: 48, id: 'bio-392', expectLetter: 'C',
    explanation: [[
      '<p><strong>A. Phosphoenolpyruvate (PEP):</strong> Phosphoenolpyruvate (PEP) is the CO2 acceptor molecule used by PEP carboxylase in C4 and CAM plants during their initial carbon fixation step. In the Calvin cycle, RuBisCO uses ribulose-1,5-bisphosphate (RuBP) as the CO2 acceptor. PEP carboxylase uses bicarbonate rather than CO2 itself, so the two enzymes do not act on the same inorganic-carbon substrate, and it does not catalyse RuBisCO\'s competing oxygenase reaction.</p>',
      '<p><strong>A. Phosphoenolpyruvate (PEP):</strong> In C4 and CAM plants, PEP carboxylase adds bicarbonate (HCO₃⁻) to PEP, forming oxaloacetate during the initial carbon-fixation step. In the Calvin cycle, RuBisCO instead adds CO₂ to RuBP. PEP carboxylase does not catalyze RuBisCO\'s competing oxygenase reaction.</p>'
    ]],
    keepHeadings: ['<strong>A. Phosphoenolpyruvate (PEP):</strong>'],
    gone: ['is the CO2 acceptor molecule used by PEP carboxylase', 'the two enzymes do not act on the same inorganic-carbon substrate']
  }
];

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

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch7-idmap.json'), 'utf8'));
  const before = Object.fromEntries(data.biology.concat(data.chemistry).map(q => [q.id, JSON.stringify(q)]));
  const STEM_OK = ['bio-349', 'bio-373'];        // the only two stems this pass may touch
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

    if (spec.stemFull) {
      q.question = spec.stemFull;
    } else if (spec.stem) {
      const t = replaceOnce(q.question, spec.stem[0], spec.stem[1], where + ' stem');
      if (t === null) ok = false; else q.question = t;
    }

    let t = q.explanation;
    for (const [from, to] of spec.explanation || []) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { ok = false; break; }
      t = next;
    }
    if (!ok) continue;
    q.explanation = t;

    if (q.question !== stemBefore && !STEM_OK.includes(spec.id)) fail(`${where}: stem changed but is not Q6 or Q30`);
    if (q.options.join('\u0000') !== optsBefore) fail(`${where}: option text changed`);
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
    // every distractor still has its heading, and the keyed option its answer heading
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ').test(q.explanation)) {
        fail(`${where}: no "${LETTER[i]}. ..." heading in the explanation`);
      }
    }
    const label = q.options[q.correct].replace(/<[^>]*>/g, '');
    if (!q.explanation.includes('Correct Answer: ' + LETTER[q.correct] + '. ' + label)) {
      fail(`${where}: the correct-answer heading no longer matches option ${LETTER[q.correct]}`);
    }
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—')) fail(`${where}: em dash in student-facing text`);
    for (const tag of ['p', 'li', 'ul', 'strong', 'h4', 'sup', 'sub']) {
      const o = (q.explanation.match(new RegExp('<' + tag + '[ >]', 'g')) || []).length;
      const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (o !== c) fail(`${where}: <${tag}> opened ${o} times, closed ${c}`);
    }
  }

  // ---- nothing outside the eight items may change -------------------------
  const expected = new Set(EDITS.map(s => s.id));
  for (const q of data.biology.concat(data.chemistry)) {
    const changed = before[q.id] !== JSON.stringify(q);
    if (changed && !expected.has(q.id)) fail(`${q.id}: changed but is not one of the eight items`);
    if (!changed && expected.has(q.id)) fail(`${q.id}: is one of the eight items but did not change`);
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
