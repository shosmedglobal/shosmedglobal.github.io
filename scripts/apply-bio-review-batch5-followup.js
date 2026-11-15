/**
 * Six localized corrections to batch 5.
 *
 *   node scripts/apply-bio-review-batch5-followup.js [--dry]
 *
 *   Q5  bio-195  closing sentence and Bottom Line name portal blood rather
 *                than implying every absorbed nutrient takes that route
 *   Q6  bio-196  points 1 and 2 restated: most exchange is across alveolar
 *                walls, and the conducting zone starts at the upper airways
 *   Q10 bio-200  separate local tissue conditions from red-cell 2,3-BPG
 *   Q28 bio-219  otoconia sit in a gelatinous layer that the hair-cell
 *                bundles project into, not inside the hair cells
 *   Q38 bio-229  C: ADCC is one antibody mechanism, not the definition
 *                D: tolerance is antigen-specific unresponsiveness
 *   Q40 bio-232  Bottom Line: untreated infection can progress to AIDS
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
  q: 5, id: 'bio-195', expectLetter: 'C',
  explanation: [
    ['This portal circulation ensures that absorbed nutrients are processed before reaching the general circulation.</p>',
     'This portal circulation allows the liver to process nutrients carried in portal blood before they reach the general circulation.</p>'],
    ['<p class=\'exp-key\'>Bottom Line: The hepatic portal system directs absorbed nutrients to the liver for processing before entering systemic circulation.</p>',
     '<p class=\'exp-key\'>Bottom Line: Most absorbed water-soluble nutrients travel first to the liver through the hepatic portal system; most dietary long-chain fats initially enter lymph.</p>'],
  ],
},

{
  q: 6, id: 'bio-196', expectLetter: 'C',
  explanation: [
    ['<li>Gas exchange takes place in the alveoli, not in the airways that lead to them.</li>',
     '<li>Most pulmonary gas exchange occurs across alveolar walls.</li>'],
    ['<li>The conducting zone runs from the trachea through the bronchi to the terminal bronchioles: it moves air but its walls are too thick for exchange, which is why it forms the anatomical dead space. Respiratory bronchioles belong to the respiratory zone and carry a few alveoli in their walls.</li>',
     '<li>The conducting zone includes the upper airways and extends through the trachea and bronchi to the terminal bronchioles. It conducts air without gas exchange. The respiratory zone begins at respiratory bronchioles, where alveoli first appear.</li>'],
  ],
},

{
  q: 10, id: 'bio-200', expectLetter: 'C',
  explanation: [
    ['<li>These are precisely the conditions found in actively metabolising tissue, so the shift automatically delivers more oxygen exactly where it is needed.</li>',
     '<li>Active tissues produce more CO₂ and become more acidic and often warmer, promoting oxygen unloading. Red-cell 2,3-BPG is a separate influence on hemoglobin\'s oxygen affinity.</li>'],
  ],
},

{
  q: 28, id: 'bio-219', expectLetter: 'B',
  explanation: [
    ['<p><strong>A. Linear acceleration and gravity:</strong> These are sensed by the otolith organs, the utricle and saccule, whose hair cells are loaded with calcium carbonate otoliths. The semicircular canals respond instead to rotation of the head.</p>',
     '<p><strong>A. Linear acceleration and gravity:</strong> The utricle and saccule detect linear acceleration and head tilt relative to gravity. Their hair-cell bundles project into a gelatinous layer containing calcium carbonate crystals called otoconia. Movement of this layer bends the bundles. The semicircular canals primarily detect angular acceleration.</p>'],
  ],
},

{
  q: 38, id: 'bio-229', expectLetter: 'B',
  explanation: [
    ['<p><strong>C. Antibody-mediated cytotoxicity:</strong> Antibody-mediated cytotoxicity (also called antibody-dependent cell-mediated cytotoxicity, or ADCC) is a specific immune mechanism where antibodies coat target cells and recruit NK cells or other effector cells to destroy them via Fc receptor engagement. It is a targeted killing mechanism, not the broad inflammatory response described by the four cardinal signs.</p>',
     '<p><strong>C. Antibody-mediated cytotoxicity:</strong> Antibodies can help destroy target cells by activating complement or recruiting effector cells. Antibody-dependent cell-mediated cytotoxicity (ADCC), involving cells such as NK cells, is one such mechanism. The stem describes the general signs of acute inflammation rather than a specific antibody-directed mechanism.</p>'],
    ['<p><strong>D. Immunological tolerance:</strong> Immunological tolerance is the immune system\'s ability to not attack the body\'s own cells and tissues (self-tolerance). It is established through central tolerance (deletion of self-reactive lymphocytes in the thymus and bone marrow) and peripheral tolerance (anergy, regulatory T cells, deletion). Failure of tolerance leads to autoimmune diseases. Tolerance is the absence of an immune response, not the inflammatory response described.</p>',
     '<p><strong>D. Immunological tolerance:</strong> Immunological tolerance is antigen-specific unresponsiveness. Self-tolerance is an important example that helps prevent immune attacks on the body\'s own tissues. Tolerance does not mean that the entire immune system is inactive, and it does not describe the local inflammatory signs in the stem.</p>'],
  ],
},

{
  q: 40, id: 'bio-232', expectLetter: 'C',
  explanation: [
    ['<p class=\'exp-key\'>Bottom Line: HIV destroys CD4+ helper T cells, crippling the adaptive immune system and leading to AIDS.</p>',
     '<p class=\'exp-key\'>Bottom Line: HIV targets CD4 helper T cells and weakens immune coordination; without effective treatment, infection can progress to AIDS.</p>'],
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

  // nothing outside the six may change
  const after = JSON.parse(JSON.stringify(data));
  const beforeAll = JSON.parse(snapshot);
  const touched = new Set(EDITS.map(e => e.id));
  for (let i = 0; i < beforeAll.biology.length; i++) {
    const a = beforeAll.biology[i], b = after.biology[i];
    if (!touched.has(a.id) && JSON.stringify(a) !== JSON.stringify(b)) fail(`${a.id}: changed but is not one of the six`);
  }
  if (JSON.stringify(beforeAll.chemistry) !== JSON.stringify(after.chemistry)) fail('chemistry changed');

  if (failed) { console.error(`\n${applied}/${EDITS.length} applied cleanly; nothing written.`); process.exit(1); }
  if (DRY) { console.log(`dry run: ${applied}/${EDITS.length} items apply cleanly.`); return; }
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`${applied}/${EDITS.length} corrections applied; questions.json written.`);
}

main();
