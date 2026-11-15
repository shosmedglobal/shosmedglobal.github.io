/**
 * Verifies the RESULT of the batch 4 biology review in questions.json.
 *
 *   node test/bio-review-batch4.test.js
 *
 * The review asked not to build an oversized suite for prose edits, so this
 * is deliberately narrower than the batch 3 test: it checks scope, keys, the
 * things the review called out by name, the five generic blocks, and the
 * structural invariants that catch half-applied edits. Each "gone" check is
 * paired with a check that the text really was in the before-fixture.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const LETTER = 'ABCD';
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const before = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch4-before.json'), 'utf8'));
const untouched = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bio-review-batch4-untouched.json'), 'utf8'));
const idmap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/bio-review-batch4-idmap.json'), 'utf8'));

const BY = Object.fromEntries(data.biology.map(q => [q.id, q]));
const MAP = idmap.map;
const IDS = Object.values(MAP);

let checks = 0, failures = 0;
const ok = (c, m) => { checks++; if (!c) { failures++; console.error('  FAIL ' + m); } };
const section = n => console.log('\n' + n);
const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
const text = q => q.question + '\u0000' + q.options.join('\u0000') + '\u0000' + q.explanation;
const qnum = id => Object.keys(MAP).find(n => MAP[n] === id);

const KEYS = {
  1: 'B', 2: 'B', 3: 'A', 4: 'A', 5: 'B', 6: 'D', 7: 'D', 8: 'A', 9: 'C', 10: 'D',
  11: 'D', 12: 'B', 13: 'B', 14: 'B', 15: 'A', 16: 'D', 17: 'D', 18: 'D', 19: 'C', 20: 'B',
  21: 'D', 22: 'A', 23: 'A', 24: 'A', 25: 'D', 26: 'A', 27: 'A', 28: 'A', 29: 'D', 30: 'A',
  31: 'B', 32: 'A', 33: 'A', 34: 'D', 35: 'A', 36: 'D', 37: 'A', 38: 'A', 39: 'D', 40: 'A',
  41: 'A', 42: 'C', 43: 'C', 44: 'C', 45: 'C', 46: 'A', 47: 'A', 48: 'C', 49: 'C', 50: 'D',
  51: 'A', 52: 'A', 53: 'C', 54: 'A', 55: 'A', 56: 'D', 57: 'C', 58: 'D', 59: 'A', 60: 'D',
};

// ===========================================================================
section('1. Scope and keys');

ok(data.biology.length === 629, `biology count ${data.biology.length}`);
ok(data.chemistry.length === 485, `chemistry count ${data.chemistry.length}`);
ok(IDS.length === 60 && new Set(IDS).size === 60, 'idmap is not 60 distinct ids');
for (const id of idmap.skipped_already_reviewed) ok(!IDS.includes(id), `${id} should be skipped`);
for (const [n, id] of Object.entries(MAP)) {
  ok(!!BY[id], `Q${n}: ${id} missing`);
  if (!BY[id]) continue;
  ok(LETTER[BY[id].correct] === KEYS[n], `Q${n} (${id}): key is ${LETTER[BY[id].correct]}, review asserts ${KEYS[n]}`);
  ok(BY[id].correct === before[id].correct, `Q${n} (${id}): key index changed`);
}

// ===========================================================================
section('2. The five repeated educational-point blocks are gone');

const GENERIC = [
  ['biotechnology', 'The central dogma of molecular biology describes information flow'],
  ['cardiovascular', 'The heart functions as a double pump'],
  ['nervous system', 'The nervous system is divided into the CNS'],
  ['endocrine', 'Hormones are chemical messengers that travel through the blood'],
  ['digestive', 'Digestion involves mechanical breakdown (chewing, peristalsis)'],
];
for (const [label, opener] of GENERIC) {
  const wasThere = IDS.filter(id => before[id].explanation.includes(opener)).length;
  ok(wasThere > 0, `${label} block never appeared in the before-fixture, so this sweep is vacuous`);
  for (const id of IDS) ok(!BY[id].explanation.includes(opener), `Q${qnum(id)} (${id}): ${label} block survives`);
}
// the two misleading claims those blocks carried
for (const id of IDS) {
  ok(!/excitatory \(e\.g\., glutamate, acetylcholine\)/.test(BY[id].explanation), `${id}: acetylcholine-as-excitatory survives`);
  ok(!/chemical breakdown \(enzymes, acid, bile\)/.test(BY[id].explanation), `${id}: bile-as-chemical-breakdown survives`);
}

// ===========================================================================
section('3. Claims the review named, removed (paired with a before-check)');

const GONE = [
  ['bio-129', 'use lactose only when glucose is unavailable'],
  ['bio-130', 'partial complementarity (typical of miRNAs) leads to translational repression'],
  ['bio-130', 'This answer is partially correct in concept'],
  ['bio-131', 'functionally haploid'],
  ['bio-131', 'losing or mutating it causes disease'],
  ['bio-132', 'Histone acetylation = open chromatin = gene activation'],
  ['bio-133', 'system: lactose inactivates the repressor'],
  ['bio-134', 'in female mammals'],
  ['bio-136', 'RNA polymerase II does not directly bind enhancers'],
  ['bio-136', 'Only repress gene transcription:</strong> Enhancers can both activate and repress'],
  ['bio-136', 'even on different chromosomes'],
  ['bio-137', 'over 60% of human protein-coding genes'],
  ['bio-138', 'DNA is amplified approximately 2ⁿ-fold'],
  ['bio-140', 'short palindromic DNA sequences (typically 4–8 base pairs)'],
  ['bio-141', 'such as EcoRI and BamHI, are especially useful for cloning because the overhangs base-pair with each other'],
  ['bio-142', 'three essential components'],
  ['bio-143', 'lacking introns and regulatory regions'],
  ['bio-144', 'Edward Southern'],
  ['bio-145', 'directly sequence and quantify all RNA molecules'],
  ['bio-146', 'they are actually slightly smaller than normal dNTPs'],
  ['bio-147', 'antibiotics treat bacterial infections by targeting bacterial cellular processes'.replace('antibiotics', 'Antibiotics')],
  ['bio-148', 'compatible ends (from the same restriction enzyme)'],
  ['bio-149', 'inversely proportional to the initial amount of template'],
  ['bio-150', '5 cm) compared to the right ventricle (approximately 0.'],
  ['bio-151', 'Atrial diastole'],
  ['bio-152', 'A prolonged PR interval (first-degree AV block) reflects delayed conduction specifically at the AV node'],
  ['bio-153', 'the heart pumps whatever volume of blood returns to it'],
  ['bio-154', 'potentially indicating heart failure or severe hypovolemia'],
  ['bio-156', 'Increased heart rate and vasodilation:</strong> Increased heart rate and vasoconstriction is the response'],
  ['bio-157', 'the reverse of systemic naming conventions'],
  ['bio-157', 'non-functional lungs'],
  ['bio-160', 'However, the closer approximation using the formula'],
  ['bio-162', 'Cl- ions flow into the cell, causing hyperpolarization'],
  ['bio-163', 'Acetylcholine (ACh) is primarily an excitatory neurotransmitter'],
  ['bio-164', 'Jump from one node of Ranvier to the next'],
  ['bio-165', 'Increased heart rate:</strong> The sympathetic nervous system produces the opposite effects'],
  ['bio-167', 'allowing only small lipophilic molecules and gases to cross freely'],
  ['bio-168', 'It does not control tongue movement'],
  ['bio-169', 'They have minimal cardiac effects'],
  ['bio-170', 'Which ion’s equilibrium potential is closest to this value?'.replace('’', "'")],
  ['bio-171', 'Hypothalamus:</strong> The pons modifies the respiratory rhythm'],
  ['bio-172', 'spinal cord injury at the level of C4'],
  ['bio-172', 'cranial nerve function is preserved in spinal cord injuries'],
  ['bio-174', 'supraoptic nuclei'],
  ['bio-175', 'a feature unique to Graves disease'],
  ['bio-176', 'Alpha cells:</strong> Alpha cells produce glucagon (raises blood glucose), delta cells'],
  ['bio-178', 'Stimulates osteoclast activity to release calcium from bone'],
  ['bio-178', 'one of the fastest mechanisms to raise blood calcium'],
  ['bio-179', 'Water follows sodium osmotically'],
  ['bio-180', 'lipophilic enough to cross cell membranes (like steroids)'],
  ['bio-181', 'it stimulates lipolysis (fat breakdown) in adipose tissue'],
  ['bio-182', 'GH excess before puberty causes gigantism'],
  ['bio-182', 'Dwarfism:</strong> Dwarfism results from gh deficiency'],
  ['bio-183', 'within the thyroid follicular cells'],
  ['bio-184', 'Follicular cells:</strong> Follicular cells produce T3 and T4.</p>'],
  ['bio-186', 'slightly alkaline pH of saliva'],
  ['bio-187', 'Jejunum and ileum of the small intestine'],
  ['bio-187', 'approximately 600-fold'],
  ['bio-188', 'smaller droplets (micelles)'],
  ['bio-188', 'Bicarbonate from the pancreas neutralizes gastric acid, not bile'],
  ['bio-189', 'Stimulates insulin release from the pancreas'],
  ['bio-190', 'prevents food from entering the trachea'],
  ['bio-190', 'this is a secondary barrier'],
];
for (const [id, str] of GONE) {
  ok(text(before[id]).includes(str), `${id}: GONE string was not in the before-fixture: "${str.slice(0, 60)}"`);
  ok(!text(BY[id]).includes(str), `${id}: still present: "${str.slice(0, 60)}"`);
}

// ===========================================================================
section('4. Replacement content present');

const PRESENT = [
  ['bio-129', 'Expression is highest when lactose is available and glucose is low or absent'],
  ['bio-130', 'inhibiting translation and promoting mRNA destabilization and decay'],
  ['bio-131', 'Both DNA copies remain present'],
  ['bio-131', 'Imprints are reset during egg or sperm formation'],
  ['bio-132', 'Methylation of promoter CpG islands is commonly associated with reduced transcription'],
  ['bio-133', 'allolactose inactivates the repressor'],
  ['bio-134', 'human XX somatic cells'],
  ['bio-134', 'Some genes escape X-inactivation'],
  ['bio-136', 'Specify the site where transcription of the target gene begins'],
  ['bio-136', 'Regulatory elements that reduce transcription are called silencers'],
  ['bio-137', 'the stretch of mRNA after the protein-coding sequence'],
  ['bio-138', 'In an idealized model'],
  ['bio-140', 'the engineered sgRNA fuses them into one'],
  ['bio-141', 'What matters is that the two ends are compatible'],
  ['bio-142', 'A standard bacterial cloning vector commonly carries three features'],
  ['bio-143', 'including any copied untranslated regions'],
  ['bio-144', 'Edwin Southern invented Southern blotting'],
  ['bio-144', 'denaturing the DNA to single strands'],
  ['bio-145', 'sequences a cDNA library made from sampled RNA'],
  ['bio-146', 'size is not what stops the reaction'],
  ['bio-147', 'does not add a functional gene copy'],
  ['bio-148', 'compatible overhangs can come from different enzymes'],
  ['bio-149', 'provided the samples are tested under comparable conditions'],
  ['bio-150', 'so its wall is thinner than the left ventricle'],
  ['bio-151', 'Isovolumetric relaxation of the ventricles'],
  ['bio-152', 'not a pure measurement of AV-node conduction'],
  ['bio-153', 'Within the physiological range'],
  ['bio-154', 'does not follow from the heart rate and stroke volume given'],
  ['bio-156', 'Vasodilation fits the response to a rise in blood pressure'],
  ['bio-157', 'does not reverse any naming convention'],
  ['bio-160', 'D. 87 mmHg'],
  ['bio-162', 'They commonly reduce the likelihood of firing'],
  ['bio-163', 'depends on the receptor it binds'],
  ['bio-164', 'Are regenerated at successive nodes of Ranvier as current spreads between them'],
  ['bio-165', 'pupillary constriction travels with the oculomotor nerve'],
  ['bio-167', 'restrict movement BETWEEN the endothelial cells'],
  ['bio-168', 'The vagus supplies palatoglossus'],
  ['bio-169', 'beta-1 is the principal receptor for the norepinephrine response'],
  ['bio-170', 'makes the largest contribution to the resting membrane potential'],
  ['bio-171', 'The pons modifies the breathing rhythm that the medulla generates'],
  ['bio-172', 'spinal accessory nerve (cranial nerve XI)'],
  ['bio-172', 'Shoulder shrug'],
  ['bio-174', 'neither belongs exclusively to one nucleus'],
  ['bio-175', 'autoimmune inflammation and tissue expansion in the orbit'],
  ['bio-176', 'particularly into skeletal muscle and adipose tissue'],
  ['bio-178', 'Decreases phosphate reabsorption in the proximal tubule of the kidney'],
  ['bio-179', 'Late distal tubule and collecting duct'],
  ['bio-179', 'strongly regulated by ADH'],
  ['bio-180', 'enter cells through transport proteins'],
  ['bio-181', 'not stimulation of adipose fat synthesis'],
  ['bio-182', 'Short stature due to childhood GH deficiency'],
  ['bio-182', 'before epiphyseal plate closure causes gigantism'],
  ['bio-183', 'release it into the follicle'],
  ['bio-184', 'they produce the thyroid hormones T3 and T4, not calcitonin'],
  ['bio-186', 'works best near neutral pH'],
  ['bio-187', 'Small intestine'],
  ['bio-187', 'The problem with this option is the word "only"'],
  ['bio-188', 'mixed micelles that carry fatty acids, monoglycerides'],
  ['bio-188', 'Bile also contributes alkaline fluid'],
  ['bio-189', 'Accelerates gastric emptying'],
  ['bio-190', 'folds backward over the laryngeal inlet'],
  ['bio-190', 'The vocal folds close the glottis and contribute directly to airway protection'],
];
for (const [id, str] of PRESENT) ok(text(BY[id]).includes(str), `${id}: replacement missing: "${str.slice(0, 60)}"`);

// ===========================================================================
section('5. The flagged structural defects');

// Q21: B feedback must now be a complete sentence, not a fragment.
{
  const m = BY['bio-150'].explanation.match(/<strong>B\. Right ventricle:<\/strong>([^]*?)<\/p>/);
  ok(!!m && m[1].trim().length > 40 && /\.$/.test(m[1].trim()), 'Q21 (bio-150): B feedback is still not a complete sentence');
}
// Q27: C feedback must describe vasodilation, which is what option C says.
ok(/C\. Increased heart rate and vasodilation:<\/strong> Vasodilation/.test(BY['bio-156'].explanation),
   'Q27 (bio-156): C feedback still does not address option C');
// Q31: exactly one feedback each for A, C and D, and no stray "C. 93 mmHg".
{
  const e = BY['bio-160'].explanation;
  for (const L of ['A', 'C', 'D']) {
    ok((e.match(new RegExp('<strong>' + L + '\\. ', 'g')) || []).length === 1, `Q31 (bio-160): option ${L} does not have exactly one feedback entry`);
  }
  ok(!/C\. 93 mmHg/.test(e), 'Q31 (bio-160): the mislabelled "C. 93 mmHg" entry survives');
}
// Q43: the major rewrite, with no trace of the old prognosis scenario.
{
  const q = BY['bio-172'];
  ok(/spinal accessory nerve/.test(q.question), 'Q43: stem not rewritten');
  ok(!/C4|ventilat|quadripleg/i.test(text(q)), 'Q43: traces of the old C4 scenario remain');
  ok(q.options[2] === 'Shoulder shrug' && q.correct === 2, 'Q43: option C or key wrong');
}
// Q7, Q41, Q48, Q58, Q60: the other substantial repairs.
ok(BY['bio-136'].options[1] === 'Specify the site where transcription of the target gene begins', 'Q7: option B wrong');
ok(/largest contribution/.test(BY['bio-170'].question), 'Q41: stem not rewritten');
ok(/proximal tubule/.test(BY['bio-178'].options[0]), 'Q48: option A wrong');
ok(/mixed micelles/.test(BY['bio-188'].explanation) && !/droplets \(micelles\)/.test(BY['bio-188'].explanation), 'Q58: emulsified droplets still called micelles');
ok(/laryngeal inlet/.test(BY['bio-190'].question), 'Q60: stem not rewritten');

// ===========================================================================
section('6. Nothing outside the pack changed');

let drift = 0;
for (const q of data.biology) if (untouched.biology[q.id] && untouched.biology[q.id] !== hash(q)) { drift++; console.error('  FAIL biology ' + q.id + ' changed but is not in this pack'); }
ok(drift === 0, `${drift} out-of-scope biology items changed`);
let chem = 0;
for (const q of data.chemistry) if (untouched.chemistry[q.id] !== hash(q)) chem++;
ok(chem === 0, `${chem} chemistry items changed`);
for (const id of idmap.skipped_already_reviewed) ok(untouched.biology[id] === hash(BY[id]), `${id}: a previously approved item was modified`);
// Review batch 5 took 60 of these ids, so 569 - 60. Each approved batch hands
// its ids to its own test, so the sweeps partition the bank.
ok(Object.keys(untouched.biology).length === 449, 'untouched biology hash count unexpected');

// ===========================================================================
section('7. Structural invariants across the pack');

const words = s => s.replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/[^a-z0-9% ]/gi, ' ').trim().toLowerCase().split(/\s+/).filter(Boolean);
const isSub = (small, big) => { let j = 0; for (const w of small) { while (j < big.length && big[j] !== w) j++; if (j === big.length) return false; j++; } return true; };

for (const id of IDS) {
  const q = BY[id], n = qnum(id);
  ok(!text(q).includes('—'), `Q${n} (${id}): em dash`);
  ok(new Set(q.options).size === 4, `Q${n} (${id}): duplicate option text`);

  for (const tag of ['p', 'ul', 'li', 'strong', 'em', 'table', 'tr', 'td', 'th', 'h4', 'sub', 'sup']) {
    const o = (q.explanation.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
    const c = (q.explanation.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    ok(o === c, `Q${n} (${id}): <${tag}> unbalanced (${o}/${c})`);
  }
  for (const t of q.explanation.match(/<table[\s\S]*?<\/table>/g) || []) {
    const rows = t.match(/<tr>[\s\S]*?<\/tr>/g) || [];
    if (!rows.length) continue;
    const w = (rows[0].match(/<t[hd]>/g) || []).length;
    for (const r of rows) ok((r.match(/<t[hd]>/g) || []).length === w, `Q${n} (${id}): ragged table row`);
  }

  // the answer heading must name the keyed option
  const head = (q.explanation.match(/<h4>Correct Answer:([^<]*)<\/h4>/) || [])[1];
  if (head) {
    const keyed = q.options[q.correct].replace(/<[^>]*>/g, '').trim();
    const norm = s => s.replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/[^a-z0-9]/gi, '').toLowerCase();
    ok(norm(head).includes(norm(keyed)) || norm(keyed).includes(norm(head).replace(/^[a-d]/, '')),
       `Q${n} (${id}): answer heading "${head.trim().slice(0, 55)}" does not name keyed option "${keyed.slice(0, 55)}"`);
  }

  // every non-keyed option: exactly one feedback paragraph, agreeing with it
  for (let i = 0; i < 4; i++) {
    if (i === q.correct) continue;
    const count = (q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ', 'g')) || []).length;
    ok(count === 1, `Q${n} (${id}): option ${LETTER[i]} has ${count} feedback headings, expected 1`);
    const m = q.explanation.match(new RegExp('<strong>' + LETTER[i] + '\\. ([^<]*?):?</strong>'));
    if (m) ok(isSub(words(m[1]), words(q.options[i].replace(/<[^>]*>/g, ''))),
              `Q${n} (${id}): option ${LETTER[i]} is "${q.options[i].slice(0, 45)}" but headed "${m[1].slice(0, 45)}"`);
  }
  // no two distractor paragraphs identical (the duplicated-feedback defect)
  const paras = [...q.explanation.matchAll(/<strong>([A-D])\.[^<]*<\/strong>([^]*?)<\/p>/g)].map(x => x[2].trim()).filter(t => t.length > 20);
  ok(new Set(paras).size === paras.length, `Q${n} (${id}): duplicated distractor explanation text`);

  // 2-4 question-specific educational points (Q12 keeps the 4 it had)
  // The review told us to REPLACE the 51 repeated blocks with 2-3 points, and
  // to RETAIN the individual blocks that Q1-Q8 and Q12 already had, which are
  // longer. So the allowed range depends on which group the item is in.
  const ul = q.explanation.match(/Key Educational Points:<\/h4>\s*<ul>([^]*?)<\/ul>/);
  ok(!!ul, `Q${n} (${id}): no Key Educational Points list`);
  if (ul) {
    const c = (ul[1].match(/<li>/g) || []).length;
    const kept = Number(n) <= 8 || Number(n) === 12;
    const max = kept ? 6 : 4;
    ok(c >= 2 && c <= max, `Q${n} (${id}): ${c} educational points, expected 2 to ${max}`);
  }
}

console.log(`\n${checks} checks, ${failures} failure(s)`);
process.exit(failures ? 1 : 0);
