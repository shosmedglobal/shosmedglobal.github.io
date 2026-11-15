/**
 * Second, targeted pass over the batch 2 block.
 *
 *   node scripts/apply-bio-review-batch2-followup.js [--dry]
 *
 * Six corrections that came back after the first pass, plus one editorial
 * deletion. Ids come from scripts/bio-review-batch2-idmap.json.
 *
 *   Q8  bio-267  polyadenylation described without implying splicing finishes first
 *   Q17 bio-135  splicing vs polyadenylation; splice-site mutation wording
 *   Q19 bio-75   reassortment as "the mechanism tested here"; frameshift distractor
 *   Q39 bio-254  circular chromosome + 70S as common, not conclusive
 *   Q44 bio-212  segmental arteries restored in distractor B
 *   Q58 bio-312  option A now describes the lytic cycle properly; point scoped to lambda
 *   Q45 bio-611  editorial: drop the "harder extension" sentence
 *
 * Same guarantees as the first pass: every anchor must match exactly once, a
 * renamed option must end up with a matching distractor heading, answer keys
 * are asserted unchanged, and no em dash may enter student-facing copy. If any
 * one check fails, nothing is written.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [

// ============================================================ Q8  bio-267
// "Most mature mRNAs THEN receive a tail" reads as though splicing must
// finish before polyadenylation. Distractor A also said introns are removed
// "from mature mRNA", which is backwards: they are removed from the pre-mRNA.
{
  q: 8, id: 'bio-267', expectLetter: 'C',
  explanation: [
    ['Most mature mRNAs then receive a 3&prime; poly(A) tail of roughly 200 adenines, which adds stability and helps the transcript leave the nucleus.</p>',
     'During processing, the 3&prime; end of most pre-mRNAs is cleaved and a poly(A) tail is added, supporting mRNA stability and export.</p>'],
    ['Introns are removed from mature mRNA by the spliceosome (a complex of snRNAs and proteins) and are NOT translated. Only exons are retained and joined together in the final mRNA.',
     'Introns are normally removed from pre-mRNA, and the remaining exons are joined to form mature mRNA.'],
  ],
},

// ============================================================ Q17 bio-135
// "Does nothing to the 3' end" is wrong as a blanket claim, and the
// alternative-polyadenylation aside is above the level of this item.
{
  q: 17, id: 'bio-135', expectLetter: 'A',
  explanation: [
    ['<p><strong>B. Bypass the need for a poly-A tail for mRNA stability:</strong> Splicing and polyadenylation are separate processing steps, and choosing between exon combinations does nothing to the 3&prime; end. Most mature mRNAs carry a poly(A) tail, which contributes to stability and to export from the nucleus, and alternative splicing is not a substitute for it. Selecting between alternative polyadenylation sites is itself a separate way of generating mRNA diversity.</p>',
     '<p><strong>B. Bypass the need for a poly-A tail for mRNA stability:</strong> Alternative splicing determines which RNA segments are retained in the mature mRNA, whereas polyadenylation adds the poly(A) tail. These are distinct processing reactions, and alternative splicing does not replace the tail&rsquo;s role in supporting mRNA stability and export.</p>'],
    ['It is a post-transcriptional process that occurs during or after transcription, determining which combination of exons appears in the mature mRNA.',
     'It is an RNA-processing step that can occur during or after transcription, determining which combination of exons appears in the mature mRNA.'],
    ['<li>Mutations at splice sites cause disease by producing the wrong isoform - a well-known mechanism in the thalassaemias.</li>',
     '<li>Splice-site mutations can produce abnormal mRNA and reduce functional protein production, as occurs in some forms of beta-thalassemia.</li>'],
  ],
},

// ============================================================ Q19 bio-75
// Distractor C carried the last categorical "shift results from segment
// exchange" sentence; replacing the paragraph removes it, and the new text
// explains what a frameshift actually is instead.
{
  q: 19, id: 'bio-75', expectLetter: 'D',
  explanation: [
    ['Recombination between a viral gene and a host cellular gene is not the mechanism here. Shift arises from exchange of whole genome segments between influenza A viruses infecting the same cell, which can happen in a host such as a pig that both avian and human viruses are able to infect.</p>',
     'Recombination between a viral gene and a host cellular gene is not the mechanism here. The mechanism tested here is reassortment: the exchange of whole genome segments between influenza A viruses infecting the same cell, which can happen in a host such as a pig that both avian and human viruses are able to infect.</p>'],
    ['<p><strong>C. Frameshift mutations caused by RNA polymerase slippage:</strong> While RNA polymerase errors do contribute to the high mutation rate of influenza (antigenic drift), frameshift mutations typically produce nonfunctional proteins and are usually lethal to the virus. Antigenic shift is not produced by mutation within one genome: it results from the physical exchange of whole genome segments when two influenza A viruses infect the same cell.</p>',
     '<p><strong>C. Frameshift mutations caused by RNA polymerase slippage:</strong> A frameshift changes a gene&rsquo;s reading frame and usually disrupts the resulting protein. It does not describe the reassortment of intact RNA genome segments.</p>'],
  ],
},

// ============================================================ Q39 bio-254
// "Establish only that the organism is a prokaryote" overstates what those
// two clues do. They are common prokaryotic features, and the point that
// matters is that they do not separate Bacteria from Archaea.
{
  q: 39, id: 'bio-254', expectLetter: 'B',
  explanation: [
    ['Both Bacteria and Archaea are prokaryotes with circular chromosomes and 70S ribosomes, so those two clues establish only that the organism is a prokaryote and do not separate the two groups.',
     'Circular chromosomes and 70S ribosomes are common features of prokaryotes, but they do not distinguish Bacteria from Archaea.'],
    ['<li>Circular chromosomes and 70S ribosomes only establish that the organism is prokaryotic - they do not separate Bacteria from Archaea.</li>',
     '<li>Circular chromosomes and 70S ribosomes are common features of prokaryotes, but they do not distinguish Bacteria from Archaea.</li>'],
    ['Circular chromosomes and 70S ribosomes show only that the organism is a prokaryote.</p>',
     'Circular chromosomes and 70S ribosomes are common features of prokaryotes, but they do not distinguish Bacteria from Archaea.</p>'],
  ],
},

// ============================================================ Q44 bio-212
// Distractor B still said the renal artery divides first into interlobar
// arteries, which contradicts the segmental artery now in every choice.
{
  q: 44, id: 'bio-212', expectLetter: 'A',
  explanation: [
    ['Anatomically, the renal artery first divides into interlobar arteries that travel between the renal pyramids in the renal columns.',
     'The renal artery first divides into segmental arteries, which branch into interlobar arteries that run between the renal pyramids.'],
  ],
},

// ============================================================ Q58 bio-312
// Option A said "immediately lyses", which no phage cycle does. It now
// describes the lytic cycle accurately and is wrong for the right reason:
// it is the other cycle, not an impossible event.
{
  q: 58, id: 'bio-312', expectLetter: 'B',
  optionFull: [[0, 'Directs production of new phages followed by host-cell lysis']],
  headingsGone: ['A. Immediately lyses the host cell:'],
  explanation: [
    ['<p><strong>A. Immediately lyses the host cell:</strong> This describes the lytic cycle rather than lysogeny, and even there lysis is not immediate: the phage first directs replication of its DNA and synthesis of viral proteins, then the assembly of new particles, and only after that is the host cell lysed to release them. In lysogeny the lytic genes are repressed instead, and the host cell survives.</p>',
     '<p><strong>A. Directs production of new phages followed by host-cell lysis:</strong> This describes the lytic cycle: phage DNA is replicated, viral components are assembled, and the host cell is then lysed. During lambda lysogeny, the genes driving lytic reproduction are repressed.</p>'],
    ['<li>In the lysogenic cycle, phage DNA integrates into the host chromosome as a prophage and replicates passively with it.</li>',
     '<li>In lambda lysogeny, phage DNA integrates into the host chromosome as a prophage and replicates passively with it.</li>'],
  ],
},

// ============================================================ Q45 bio-611
// Editorial: the sentence commented on the question rather than teaching.
{
  q: 45, id: 'bio-611', expectLetter: 'A',
  explanation: [
    ['<li>Recalling all four factor names is a harder extension rather than the main point of the question.</li>', ''],
  ],
},

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
  let applied = 0;

  for (const spec of EDITS) {
    const where = `Q${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found`); continue; }
    if (LETTER[q.correct] !== spec.expectLetter) {
      fail(`${where}: key is ${LETTER[q.correct]}, expected ${spec.expectLetter}`);
      continue;
    }
    let ok = true;
    for (const [i, t] of spec.optionFull || []) q.options[i] = t;
    if (spec.explanation) {
      let t = q.explanation;
      for (const [from, to] of spec.explanation) {
        const next = replaceOnce(t, from, to, where + ' explanation');
        if (next === null) { ok = false; break; }
        t = next;
      }
      if (ok) q.explanation = t;
    }
    if (ok) applied++;
  }

  // A renamed option must carry its rename into the distractor heading.
  for (const spec of EDITS) {
    const q = by[spec.id];
    if (!q) continue;
    for (const [i] of spec.optionFull || []) {
      if (i === q.correct) continue;
      const label = q.options[i].replace(/<[^>]*>/g, '');
      const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp('<strong>' + LETTER[i] + '\\. ' + esc + ':?</strong>').test(q.explanation)) {
        fail(`Q${spec.q} ${spec.id}: option ${LETTER[i]} is "${label.slice(0, 60)}" with no matching heading`);
      }
    }
    for (const gone of spec.headingsGone || []) {
      if (q.explanation.includes(gone)) fail(`Q${spec.q} ${spec.id}: stale heading still present: ${gone}`);
    }
    const blob = q.question + ' ' + q.options.join(' ') + ' ' + q.explanation;
    if (blob.includes('—')) fail(`Q${spec.q} ${spec.id}: em dash in student-facing text`);
    if (/<li>\s*<\/li>|<p>\s*<\/p>/.test(q.explanation)) fail(`Q${spec.q} ${spec.id}: empty element left by a deletion`);
  }

  if (failed) { console.error(`\n${applied}/${EDITS.length} applied cleanly; nothing written.`); process.exit(1); }
  if (DRY) { console.log(`dry run: ${applied}/${EDITS.length} items apply cleanly.`); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`${applied}/${EDITS.length} follow-up edits applied; questions.json written.`);
}

main();
