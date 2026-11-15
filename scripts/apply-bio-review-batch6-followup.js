/**
 * Narrow follow-up correction pass on biology review batch 6.
 *
 *   node scripts/apply-bio-review-batch6-followup.js [--dry]
 *
 * Eight items only: Q9 (bio-268), Q18 (bio-280), Q25 (bio-289), Q42 (bio-315),
 * Q46 (bio-320), Q48 (bio-322), Q49 (bio-324) and Q52 (bio-328). Nothing else
 * in the pack and nothing outside it may change. Stems, options, answer letters,
 * question ids and option headings are all preserved: only distractor feedback
 * bodies and single educational points are rewritten.
 *
 * Every edit is anchored on text that must appear exactly once in the current
 * record. If one anchor misses, nothing is written at all, so a stale anchor can
 * never produce a half-applied question. Post-checks confirm that the asserted
 * key is unchanged, that every option heading survived verbatim, that the text
 * the review replaces is gone, and that no em dash entered student copy.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

// ---------------------------------------------------------------------------
// The eight items. `keepHeadings` are strings that must still be present after
// the edit; `gone` are strings the review replaces and that must be absent.
// ---------------------------------------------------------------------------

const EDITS = [
  {
    q: 9, id: 'bio-268', expectLetter: 'C',
    explanation: [[
      "<p><strong>B. Termination of transcription:</strong> Transcription termination in prokaryotes occurs by two mechanisms, neither involving the sigma factor. Rho-independent termination uses a GC-rich hairpin loop followed by a poly-U sequence in the mRNA. Rho-dependent termination uses the rho helicase protein, which catches up to RNA polymerase and unwinds the RNA-DNA hybrid to release the transcript.</p>",
      "<p><strong>B. Termination of transcription:</strong> Bacterial transcription can end through an intrinsic RNA-hairpin mechanism or a Rho-dependent mechanism. These mechanisms terminate transcription. Sigma factor's principal role is recognizing a promoter so that transcription can begin.</p>"
    ]],
    keepHeadings: ['<strong>B. Termination of transcription:</strong>'],
    gone: ['Transcription termination in prokaryotes occurs by two mechanisms', 'Rho-independent termination uses a GC-rich hairpin loop']
  },

  {
    q: 18, id: 'bio-280', expectLetter: 'B',
    explanation: [
      [
        "<p><strong>A. Heterozygous:</strong> If the parent were heterozygous (Aa), a cross with aa would produce 50% Aa (dominant phenotype) and 50% aa (recessive phenotype). Because every offspring shows the dominant phenotype, AA is the more likely genotype. A heterozygous parent could still produce an all-dominant sample by chance, particularly when few offspring are observed, so this result is strong evidence for AA rather than proof of it.</p>",
        "<p><strong>A. Heterozygous:</strong> An Aa × aa cross gives each offspring a 50% chance of showing the dominant phenotype. A heterozygous parent can therefore produce an all-dominant sample by chance. Such a sample supports AA without proving it; the strength of that support depends on how many offspring were observed.</p>"
      ],
      [
        "<li>With few offspring the conclusion is only probabilistic - a heterozygote could by chance produce a small all-dominant litter.</li>",
        "<li>Any finite all-dominant sample can arise from a heterozygous parent by chance; this becomes less likely as the number of offspring increases.</li>"
      ]
    ],
    keepHeadings: ['<strong>A. Heterozygous:</strong>'],
    gone: ['the conclusion is only probabilistic', 'small all-dominant litter', 'strong evidence for AA rather than proof of it']
  },

  {
    q: 25, id: 'bio-289', expectLetter: 'C',
    explanation: [[
      "<li>An affected heterozygote (Hh) crossed with an unaffected homozygote (hh) gives 1/2 affected offspring.</li>",
      "<li>An Hh × hh cross gives each child a 50% chance of inheriting the H allele.</li>"
    ]],
    gone: ['gives 1/2 affected offspring']
  },

  {
    q: 42, id: 'bio-315', expectLetter: 'B',
    explanation: [[
      "<p><strong>A. Binary fission produces four daughter cells:</strong> Binary fission produces two daughter cells, not four. Each daughter cell receives a copy of the single circular chromosome. The process yielding four cells from one starting cell is meiosis (in eukaryotes), which involves two sequential divisions. Binary fission is a single division event.</p>",
      "<p><strong>A. Binary fission produces four daughter cells:</strong> Binary fission is one cell division that produces two daughter cells. Replicated chromosomal DNA is partitioned between them. It does not produce four daughter cells from a single division.</p>"
    ]],
    keepHeadings: ['<strong>A. Binary fission produces four daughter cells:</strong>'],
    gone: ['Each daughter cell receives a copy of the single circular chromosome', 'The process yielding four cells from one starting cell is meiosis']
  },

  {
    q: 46, id: 'bio-320', expectLetter: 'B',
    explanation: [[
      "<li>Most of the original endosymbiont genes have since moved to the nuclear genome, so although these organelles divide, they depend on nuclear-encoded proteins and cannot live independently.</li>",
      "<li>During evolution, many ancestral endosymbiont genes were lost, while others were transferred to the nucleus. Mitochondria and chloroplasts depend on many nuclear-encoded proteins and cannot live independently.</li>"
    ]],
    gone: ['Most of the original endosymbiont genes have since moved to the nuclear genome']
  },

  {
    q: 48, id: 'bio-322', expectLetter: 'B',
    explanation: [
      [
        "<p><strong>A. Increased biodiversity at all trophic levels:</strong> Eutrophication actually decreases biodiversity, not increases it. The initial algal bloom may appear productive, but respiration by the bloom itself and by decomposers breaking down organic matter can consume enough oxygen to create hypoxic or anoxic conditions. Fish and invertebrates cannot survive, and the ecosystem collapses to one dominated by a few pollution-tolerant species.</p>",
        "<p><strong>A. Increased biodiversity at all trophic levels:</strong> Excess nutrients may initially increase algal growth, but severe eutrophication can reduce biodiversity. Respiration and decomposition can lower dissolved oxygen enough to kill sensitive fish and invertebrates, favoring organisms that tolerate low oxygen. This is not a general increase in biodiversity at all trophic levels.</p>"
      ],
      [
        "<li>The result is a hypoxic dead zone, as seen seasonally in the Gulf of Mexico and the Baltic Sea.</li>",
        "<li>Severe oxygen depletion can create a hypoxic \"dead zone\", as occurs seasonally in parts of the Gulf of Mexico and the Baltic Sea.</li>"
      ]
    ],
    keepHeadings: ['<strong>A. Increased biodiversity at all trophic levels:</strong>'],
    gone: ['Eutrophication actually decreases biodiversity, not increases it', 'Fish and invertebrates cannot survive, and the ecosystem collapses', 'The result is a hypoxic dead zone']
  },

  {
    q: 49, id: 'bio-324', expectLetter: 'B',
    explanation: [[
      "<p><strong>A. Australopithecus afarensis:</strong> Australopithecus afarensis, the species that includes the famous Lucy fossil, was a bipedal australopith dating to about 3.2 million years ago. It is not the Homo species whose name means handy man.</p>",
      "<p><strong>A. Australopithecus afarensis:</strong> Australopithecus afarensis was a bipedal australopith. It includes Lucy, whose fossil is about 3.2 million years old. It is not the Homo species whose name means \"handy man\".</p>"
    ]],
    keepHeadings: ['<strong>A. Australopithecus afarensis:</strong>'],
    gone: ['the species that includes the famous Lucy fossil']
  },

  {
    q: 52, id: 'bio-328', expectLetter: 'B',
    explanation: [[
      "<p><strong>C. Endoderm:</strong> The endoderm gives rise to the epithelial lining of the gastrointestinal tract, the respiratory tract, and associated glandular organs (liver, pancreas, thyroid, parathyroid, thymus). It does not give rise to muscles, bones, blood, or kidneys. These structural and supporting tissues come from the mesoderm.</p>",
      "<p><strong>C. Endoderm:</strong> Endoderm supplies most of the epithelial lining of the digestive and respiratory tracts and epithelial or glandular components of organs such as the liver, pancreas, thyroid, parathyroids, and thymus. It does not supply the skeletal muscle, cardiac muscle, blood, or kidneys listed in the stem; those are mesodermal derivatives.</p>"
    ]],
    keepHeadings: ['<strong>C. Endoderm:</strong>'],
    gone: ['It does not give rise to muscles, bones, blood, or kidneys']
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
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch6-idmap.json'), 'utf8'));
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
      fail(`${where}: stored key is ${LETTER[q.correct]}, review asserts ${spec.expectLetter}`);
      continue;
    }

    const stemBefore = q.question;
    const optsBefore = q.options.join('\u0000');
    let ok = true;
    let t = q.explanation;
    for (const [from, to] of spec.explanation) {
      const next = replaceOnce(t, from, to, where);
      if (next === null) { ok = false; break; }
      t = next;
    }
    if (!ok) continue;
    q.explanation = t;

    if (q.question !== stemBefore) fail(`${where}: stem changed`);
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
      if (q.explanation.includes(gone)) fail(`${where}: replaced text still present: ${gone}`);
    }
    // every option still has a heading in the explanation
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correct) continue;
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ').test(q.explanation)) {
        fail(`${where}: no "${LETTER[i]}. ..." heading in the explanation`);
      }
    }
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—')) fail(`${where}: em dash in student-facing text`);
    // balanced tags on the paragraphs and lists we rewrote
    for (const tag of ['p', 'li', 'ul', 'strong', 'h4']) {
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
