/**
 * Five targeted corrections to batch 4.
 *
 *   node scripts/apply-bio-review-batch4-followup.js [--dry]
 *
 *   Q17 bio-146  C feedback: termination is the chemical block, and whether
 *                the polymerase stays bound is beside the point
 *   Q18 bio-147  C feedback: name the alternative strategies instead of
 *                "the functional copy has to come from somewhere else"
 *   Q34 bio-163  glycine stated plainly; the brainstem IS part of the brain,
 *                so the old parenthetical did not justify the stem's scope
 *   Q42 bio-171  the hypothalamus influences autonomic circuits in both the
 *                brainstem and the spinal cord, not only via a brainstem relay
 *   Q53 bio-183  Bottom Line rewritten; the corrected main explanation stays
 *
 * Stems, options, keys and ids are untouched. Each anchor must match exactly
 * once, or nothing is written.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'questions.json');
const DRY = process.argv.includes('--dry');
const LETTER = 'ABCD';

const EDITS = [

{
  q: 17, id: 'bio-146', expectLetter: 'D',
  explanation: [
    ['<p><strong>C. Cause the DNA polymerase to dissociate from the template:</strong> DdNTPs do not cause DNA polymerase to dissociate from the template. Termination is a chemical consequence of the missing 3&prime;-OH group: once a ddNTP has been incorporated, no further nucleotide can be added. What the polymerase does next is beside the point. In Sanger sequencing, occasional incorporation of fluorescently labeled ddNTPs produces fragments of many different lengths, which are then separated by capillary electrophoresis.</p>',
     '<p><strong>C. Cause the DNA polymerase to dissociate from the template:</strong> Chain termination occurs because the incorporated ddNTP lacks the 3&prime;-OH needed to add another nucleotide. This chemical block explains why extension stops, regardless of whether the polymerase subsequently remains bound or dissociates.</p>'],
  ],
},

{
  q: 18, id: 'bio-147', expectLetter: 'D',
  explanation: [
    ['<p><strong>C. Increasing the expression of the mutated gene:</strong> In the scenario described, the allele produces no functional protein at all, so transcribing it harder simply makes more of something that does not work. It may also be harmful if the product is truncated or misfolded. The functional copy has to come from somewhere else.</p>',
     '<p><strong>C. Increasing the expression of the mutated gene:</strong> In this scenario, the allele produces no functional protein, so increasing its expression would not restore the missing function. Gene addition can supply a functional copy, while gene editing is a separate strategy that may correct the existing sequence.</p>'],
  ],
},

{
  q: 34, id: 'bio-163', expectLetter: 'D',
  explanation: [
    ['(In the spinal cord and brainstem, glycine also has a major inhibitory role, which is why this question specifies the brain.)',
     'Glycine is another important inhibitory neurotransmitter, especially in the spinal cord and brainstem.'],
    ['<p class=\'exp-key\'>Bottom Line: GABA is the principal inhibitory neurotransmitter in the CNS; glutamate is the principal excitatory neurotransmitter.</p>',
     '<p class=\'exp-key\'>Bottom Line: GABA is the main inhibitory neurotransmitter in the adult brain; glutamate is the main excitatory neurotransmitter.</p>'],
  ],
},

{
  q: 42, id: 'bio-171', expectLetter: 'C',
  explanation: [
    ['<p><strong>A. Hypothalamus:</strong> The hypothalamus integrates autonomic and homeostatic responses at a higher level, coordinating temperature, thirst, hunger and the stress response. It influences cardiovascular and respiratory activity indirectly, through the brainstem, rather than housing the direct control centres.</p>',
     '<p><strong>A. Hypothalamus:</strong> The hypothalamus coordinates broad homeostatic and autonomic responses, including temperature, thirst, hunger and stress. It influences autonomic circuits in both the brainstem and spinal cord. The medulla contains the principal cardiovascular and respiratory networks being tested here.</p>'],
  ],
},

{
  q: 53, id: 'bio-183', expectLetter: 'C',
  explanation: [
    ['<p class=\'exp-key\'>Bottom Line: Iodine is an essential component of thyroid hormones; its deficiency causes goiter due to TSH overstimulation.</p>',
     '<p class=\'exp-key\'>Bottom Line: Iodine is needed to make T3 and T4. Iodine deficiency can reduce thyroid hormone production and lead to TSH-driven enlargement of the thyroid (goiter).</p>'],
  ],
},

];

// ===========================================================================

let failed = false;
const fail = m => { console.error('FAIL ' + m); failed = true; };

function main() {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const by = Object.fromEntries(data.biology.map(q => [q.id, q]));
  const snapshot = JSON.stringify(data);
  let applied = 0;

  for (const spec of EDITS) {
    const where = `Q${spec.q} ${spec.id}`;
    const q = by[spec.id];
    if (!q) { fail(`${where}: not found`); continue; }
    if (LETTER[q.correct] !== spec.expectLetter) { fail(`${where}: key is ${LETTER[q.correct]}`); continue; }
    const stem = q.question, opts = JSON.stringify(q.options), key = q.correct;
    let t = q.explanation, ok = true;
    for (const [from, to] of spec.explanation) {
      const n = t.split(from).length - 1;
      if (n !== 1) { fail(`${where}: anchor matched ${n} times, expected 1\n      ${from.slice(0, 120)}`); ok = false; break; }
      t = t.replace(from, to);
    }
    if (!ok) continue;
    q.explanation = t;
    // this pass must not touch stem, options or key
    if (q.question !== stem) fail(`${where}: stem changed`);
    if (JSON.stringify(q.options) !== opts) fail(`${where}: options changed`);
    if (q.correct !== key) fail(`${where}: key changed`);
    if (/<li>\s*<\/li>|<p>\s*<\/p>/.test(q.explanation)) fail(`${where}: empty element left behind`);
    if (q.explanation.includes('—')) fail(`${where}: em dash`);
    applied++;
  }

  // nothing outside the five may change
  const after = JSON.parse(JSON.stringify(data));
  const beforeAll = JSON.parse(snapshot);
  const touched = new Set(EDITS.map(e => e.id));
  for (let i = 0; i < beforeAll.biology.length; i++) {
    const a = beforeAll.biology[i], b = after.biology[i];
    if (!touched.has(a.id) && JSON.stringify(a) !== JSON.stringify(b)) fail(`${a.id}: changed but is not one of the five`);
  }
  if (JSON.stringify(beforeAll.chemistry) !== JSON.stringify(after.chemistry)) fail('chemistry changed');

  if (failed) { console.error(`\n${applied}/${EDITS.length} applied cleanly; nothing written.`); process.exit(1); }
  if (DRY) { console.log(`dry run: ${applied}/${EDITS.length} items apply cleanly.`); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`${applied}/${EDITS.length} corrections applied; questions.json written.`);
}

main();
