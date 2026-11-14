/**
 * Verifies the external biology review of QBank questions 1-60.
 *
 *   node test/bio-review-001-060.test.js
 *
 * This checks the RESULT, not the script that produced it. It reads
 * questions.json as the site serves it and asserts the properties the review
 * asked for, so re-running the apply script is not what makes it pass.
 *
 * test/fixtures/bio-review-001-060-before.json holds the 60 items exactly as
 * they were before the review, which is what lets the "no superseded claim
 * survives" checks below be specific rather than hopeful.
 *
 * Numbering: the review's Q1-Q60 are not bio-1..bio-60. The exported block
 * skipped bio-12 and ran one past the end:
 *     review Q1-Q11  -> bio-1..bio-11
 *     review Q12-Q60 -> bio-13..bio-61
 * bio-12 is therefore UNREVIEWED, and check 6 below pins it unchanged so a
 * later pass cannot quietly assume it was covered.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const BIO = DATA.biology;
const BY = Object.fromEntries(BIO.map(q => [q.id, q]));
const BEFORE = Object.fromEntries(
  JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'bio-review-001-060-before.json'), 'utf8'))
    .map(q => [q.id, q]));

const ID = n => 'bio-' + (n <= 11 ? n : n + 1);
const LETTER = 'ABCD';
const REVIEWED = Array.from({ length: 60 }, (_, i) => ID(i + 1));

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail === undefined ? '' : `  [got: ${JSON.stringify(detail)}]`));
}
const text = q => (q.question + ' ' + q.options.join(' ') + ' ' + q.explanation)
  .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

// ======================================================= 1. structural sanity
check('1a the biology bank still has 629 questions', BIO.length === 629, BIO.length);
check('1b no duplicate ids', new Set(BIO.map(q => q.id)).size === BIO.length);
check('1c the fixture covers all 60 reviewed items', Object.keys(BEFORE).length === 60);

for (const id of REVIEWED) {
  const q = BY[id];
  check(`1d ${id} exists`, !!q);
  if (!q) continue;
  check(`1e ${id} has exactly 4 options`, q.options.length === 4, q.options.length);
  check(`1f ${id} key is in range`, Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4, q.correct);
  check(`1g ${id} has no empty option`, q.options.every(o => String(o).trim().length > 0));
  check(`1h ${id} options are distinct`,
    new Set(q.options.map(o => o.toLowerCase().trim())).size === 4, q.options);
  check(`1i ${id} has a stem`, String(q.question).trim().length > 10);
  check(`1j ${id} has an explanation`, String(q.explanation).trim().length > 50);
}

// ============================================ 2. answer keys are all unchanged
// The review preserves every correct letter, including through the Q28 and
// Q21 rewrites. A key that moved would be a silent scoring change.
for (let n = 1; n <= 60; n++) {
  const id = ID(n);
  if (!BY[id] || !BEFORE[id]) continue;
  check(`2 Q${n} (${id}) answer key unchanged`,
    BY[id].correct === BEFORE[id].correct,
    { now: LETTER[BY[id].correct], before: LETTER[BEFORE[id].correct] });
}

// ================================= 3. superseded claims survive nowhere on the
// card: not in prose, not in a table, not in a takeaway. Each entry is a claim
// the review removed and the item it was removed from.
const GONE = [
  ['bio-1', 'Yes (70S)', 'mammalian mitochondrial ribosomes are 55S, not 70S'],
  ['bio-1', 'No single feature is decisive', 'own DNA already distinguishes it'],
  ['bio-4', 'Polyploidy is lethal in humans', 'polyploid cells occur normally in some tissues'],
  ['bio-4', '2n to 4n in S phase', 'S phase doubles DNA, not chromosome number'],
  ['bio-5', 'each specifying one amino acid', 'a codon can specify a stop signal'],
  ['bio-6', '<td>G3P, glucose</td>', 'glucose is not the direct net product of the Calvin cycle'],
  ['bio-8', 'it is not where the process described primarily occurs', 'placeholder distractor'],
  ['bio-9', 'occupies a different ecological role', 'placeholder distractor'],
  ['bio-9', 'the rest is lost as heat through cellular respiration', 'some energy stays in uneaten material'],
  ['bio-10', 'Pure sensory pathways exist only in the dorsal root', 'sensory pathways exist elsewhere too'],
  ['bio-11', 'without harming human cells', 'these drugs can still cause adverse effects'],
  ['bio-11', 'DNA is the genetic material found in all living cells', 'mature red cells are an exception'],
  ['bio-13', 'methylguanine cap', 'the cap is 7-methylguanosine'],
  ['bio-14', 'APC/C activation', 'APC/C is not a cyclin-CDK complex'],
  ['bio-15', 'This concept applies to a different evolutionary mechanism', 'placeholder distractor'],
  ['bio-15', 'most common type in nature', 'unsupported ranking'],
  ['bio-16', 'If any condition is violated, allele frequencies change', 'nonrandom mating need not change them'],
  ['bio-17', 'only applies when genes are on different chromosomes', 'distant loci can behave as unlinked'],
  ['bio-18', 'those still show 46 chromosomes', 'balanced Robertsonian is typically 45'],
  ['bio-19', 'approximately 2ⁿ copies', 'ignores starting copies and the plateau'],
  ['bio-20', 'Innate + Adaptive', 'macrophages are innate cells'],
  ['bio-21', '0.2 micrometers thick', 'an exact thickness depends what is measured'],
  ['bio-21', 'stomach (with goblet cells', 'a normal stomach lining has no goblet cells'],
  ['bio-22', 'Bicuspid and tricuspid valves', 'that option duplicated option A'],
  ['bio-22', 'Eustachian and Thebesian', 'specialist trivia removed'],
  ['bio-24', '65-80% of the filtrate', 'one percentage was applied to every substance'],
  ['bio-24', 'protein-free and cell-free filtrate', 'filtrate is low in protein, not protein-free'],
  ['bio-25', 'Wolpert', 'quote removed'],
  ['bio-28', 'unique among vitamins', 'niacin can be made from tryptophan'],
  ['bio-28', 'sterile guts', 'newborns have low stores, not sterile guts'],
  ['bio-29', 'direct ancestor', 'direct ancestry is unresolved'],
  ['bio-29', 'first to use controlled fire', 'overly certain'],
  ['bio-30', '70-110 mg/dL', 'a diagnostic range is not being tested'],
  ['bio-32', 'NH₃ → NO₃⁻', 'nitrification has two steps'],
  ['bio-33', 'often a lipid envelope', 'retroviruses are enveloped'],
  ['bio-33', 'Capsid + tail', 'not all phages have tails'],
  ['bio-34', 'Cholesterol (37°C)', 'no universal switch at exactly 37 degrees'],
  ['bio-35', 'recognize and cleave specific palindromic DNA sequences', 'not all recognition sites are palindromic'],
  ['bio-36', 'each codon = one amino acid', 'a codon can specify a stop signal'],
  ['bio-37', 'over 50% of all human cancers', 'statistic removed from a foundational item'],
  ['bio-37', 'Li-Fraumeni', 'clinical aside removed'],
  ['bio-38', 'It cannot occur at any other stage', 'too absolute'],
  ['bio-38', 'mature into gametes (sperm or ova)', 'oogenesis yields one egg plus polar bodies'],
  ['bio-39', 'double the chromosome number', 'failed cytokinesis leaves two nuclei'],
  ['bio-40', '100% dominant offspring = parent was AA', 'an expected ratio is not proof'],
  ['bio-41', 'both parents would need to contribute both A and B', 'each parent contributes one allele'],
  ['bio-42', 'XᶜXᶜ', 'mangled genotype notation'],
  ['bio-43', 'transcriptionally silent heterochromatin', 'some genes escape X-inactivation'],
  ['bio-44', 'linear by definition', 'fragments are not linear by definition'],
  ['bio-45', '1 centimorgan = 1% recombination', 'holds for short intervals'],
  ['bio-46', 'CD4 below 200', 'not a complete AIDS definition'],
  ['bio-48', '~34', 'one older ATP accounting model'],
  ['bio-49', 'Photosynthesis converts light energy', 'photosynthesis points on a glycolysis question'],
  ['bio-49', 'occurs in ALL cells', 'replaced with "virtually all human cells"'],
  ['bio-49', 'pyruvate enters mitochondria', 'mature red blood cells have none'],
  ['bio-49', 'Acetyl-CoA is a 2-carbon compound', 'the molecule has many more carbons'],
  ['bio-50', 'IgG indicates past exposure or chronic infection', 'class alone does not date an infection'],
  ['bio-52', 'PTH stimulates osteoclasts;', "PTH acts indirectly via osteoblast-lineage cells"],
  ['bio-53', 'BP = cardiac output × peripheral resistance', 'imprecise formula'],
  ['bio-54', 'Bilirubin in bile gives feces its brown color', 'stercobilin does'],
  ['bio-55', 'Up to 20 L/day', 'exact volumes unnecessary'],
  ['bio-56', 'SNARE', 'named machinery removed'],
  ['bio-57', 'not ataxia', 'frontal lesions are not excluded from causing ataxia'],
  ['bio-59', '3 polar bodies', 'the first polar body may not divide'],
  ['bio-59', 'not a possible outcome of meiosis', 'too absolute'],
  ['bio-60', '20-fold', 'the ossicles raise pressure, not energy twentyfold'],
  ['bio-61', 'competitively inhibit transpeptidase', 'beta-lactams inhibit covalently'],
  ['bio-61', 'isoniazid and ethambutol', 'ethambutol targets arabinosyltransferases'],
];
for (const [id, claim, why] of GONE) {
  const q = BY[id];
  if (!q) { check(`3 ${id} exists for the removed-claim check`, false); continue; }
  const before = BEFORE[id];
  const wasThere = before && (before.question + before.options.join(' ') + before.explanation).includes(claim);
  check(`3a ${id}: the superseded claim was actually there before ("${claim.slice(0, 34)}")`, wasThere);
  const stillThere = (q.question + q.options.join(' ') + q.explanation).includes(claim);
  check(`3b ${id}: "${claim.slice(0, 34)}" is gone (${why})`, !stillThere);
}

// ============================ 4. replacement content is present where promised
const PRESENT = [
  ['bio-1', 'differ from the 80S ribosomes'],
  ['bio-4', 'After meiosis II'],
  ['bio-5', 'aminoacyl-tRNA synthetase'],
  ['bio-6', 'stromal side of the thylakoid membrane'],
  ['bio-8', 'activates pepsinogen to pepsin'],
  ['bio-9', 'is a useful approximation, not a fixed law'],
  ['bio-10', 'Somatic motor neuron cell bodies'],
  ['bio-11', 'Archaea are also prokaryotes'],
  ['bio-13', '7-methylguanosine cap'],
  ['bio-14', 'Cyclins are regulatory proteins whose levels rise and fall'],
  ['bio-15', 'This is directional selection'],
  ['bio-16', 'Nonrandom mating alone can change genotype frequencies'],
  ['bio-17', 'phenotype class'],
  ['bio-18', 'Balanced Robertsonian translocation'],
  ['bio-19', 'other thermostable polymerases'],
  ['bio-20', 'helps activate adaptive immunity'],
  ['bio-21', 'surface mucous cells protect the lining'],
  ['bio-22', 'Aortic and mitral valves'],
  ['bio-22', 'Pulmonary and tricuspid valves'],
  ['bio-24', 'very low in protein'],
  ['bio-25', 'more than one germ layer'],
  ['bio-28', 'niacin can be synthesised from tryptophan'],
  ['bio-29', 'Acheulean'],
  ['bio-30', 'skeletal muscle and adipose tissue'],
  ['bio-32', 'Nitrification, step 1'],
  ['bio-33', 'no nucleic-acid genome'],
  ['bio-34', 'Cholesterol at higher temperatures'],
  ['bio-35', 'in this bacterial example'],
  ['bio-36', 'one amino acid or a stop signal'],
  ['bio-37', 'does not mean that cancer appears immediately'],
  ['bio-38', 'polar bodies'],
  ['bio-39', 'held together by cohesin'],
  ['bio-40', 'small sample can deviate by chance'],
  ['bio-41', 'Each parent contributes only one ABO allele'],
  ['bio-42', 'X<sup>N</sup>X<sup>n</sup>'],
  ['bio-43', 'largely transcriptionally inactive'],
  ['bio-44', 'relaxed or supercoiled'],
  ['bio-45', 'does not exceed, 50%'],
  ['bio-46', 'such as macrophages'],
  ['bio-48', 'uses that gradient to make ATP'],
  ['bio-49', 'virtually all human cells'],
  ['bio-49', 'mature red blood cells lack mitochondria'],
  ['bio-50', 'serum IgA is mainly monomeric'],
  ['bio-52', 'indirectly'],
  ['bio-53', 'systemic vascular resistance'],
  ['bio-54', 'stercobilin'],
  ['bio-55', 'Nephrogenic diabetes insipidus'],
  ['bio-56', 'voltage-gated calcium channels'],
  ['bio-57', 'contribute to motor learning'],
  ['bio-59', 'after maturation'],
  ['bio-60', 'increases pressure at the oval window'],
  ['bio-61', 'covalently inhibiting the transpeptidase activity'],
];
for (const [id, snippet] of PRESENT) {
  const q = BY[id];
  check(`4 ${id} contains "${snippet.slice(0, 40)}"`,
    !!q && (q.question + q.options.join(' ') + q.explanation).includes(snippet));
}

// ========================================= 4b. the follow-up pass (five items)
// Q6 and Q47 renamed an option, which is the edit most likely to half-land:
// the option changes and the heading of its distractor explanation does not.
for (const [id, idx, label] of [['bio-6', 3, 'Cytosol'], ['bio-48', 0, 'Cytosol']]) {
  const q = BY[id];
  check(`4b ${id} option ${LETTER[idx]} is "${label}"`, q.options[idx] === label, q.options[idx]);
  check(`4b ${id} option ${LETTER[idx]} no longer says Cytoplasm`, q.options[idx] !== 'Cytoplasm');
  check(`4b ${id} its explanation heading matches the option`,
    q.explanation.includes(`<strong>${LETTER[idx]}. ${label}:</strong>`));
  check(`4b ${id} no stale "${LETTER[idx]}. Cytoplasm:" heading remains`,
    !q.explanation.includes(`<strong>${LETTER[idx]}. Cytoplasm:</strong>`));
}
// Q34: the lagging strand is not made "backwards"; both strands run 5'->3'.
check('4b bio-35 drops "built backwards"', !BY['bio-35'].explanation.includes('built backwards'));
check('4b bio-35 states both strands are made 5′→3′',
  /Both new DNA strands are synthesized in the 5&prime;&rarr;3&prime; direction/.test(BY['bio-35'].explanation));
check('4b bio-35 says the fragments grow away from the fork',
  BY['bio-35'].explanation.includes('growing away from the fork'));
// Q44: the item names no cross, so no dihybrid ratio may be asserted against it.
check('4b bio-45 has no dihybrid-ratio column', !BY['bio-45'].explanation.includes('Dihybrid Ratio'));
check('4b bio-45 quotes no 9:3:3:1 ratio', !BY['bio-45'].explanation.includes('9:3:3:1'));
check('4b bio-45 keeps the centimorgan discussion', BY['bio-45'].explanation.includes('centimorgan'));
{
  // Every row of that table must now be two cells wide.
  const tbl = /<table[^>]*>([\s\S]*?)<\/table>/.exec(BY['bio-45'].explanation)[1];
  const widths = (tbl.match(/<tr>[\s\S]*?<\/tr>/g) || [])
    .map(r => (r.match(/<t[dh]\b/g) || []).length);
  check('4b bio-45 comparison table is uniformly two columns',
    widths.length === 4 && widths.every(w => w === 2), widths);
}
// Q47: ATP synthase uses the gradient; it is not a link in the chain.
check('4b bio-48 does not count ATP synthase among the chain complexes',
  !/electron transport chain consists of four protein complexes \(I-IV\) and ATP synthase/.test(BY['bio-48'].explanation));
check('4b bio-48 says ATP synthase does not transfer electrons',
  BY['bio-48'].explanation.includes('it does not itself transfer electrons along the chain'));
// Q53: emulsification and micelle formation are separate jobs.
check('4b bio-54 separates emulsification from micelle formation',
  !BY['bio-54'].explanation.includes('emulsify fat into small droplets and help form micelles'));
check('4b bio-54 names pancreatic lipase for the surface-area benefit',
  BY['bio-54'].explanation.includes('surface area available to pancreatic lipase'));
check('4b bio-54 describes mixed micelles carrying digestion products',
  BY['bio-54'].explanation.includes('mixed micelles'));

// ================================ 5. the educational points teach THIS question
// Q48/bio-49 is the case the review singled out: a glycolysis question whose
// points were entirely about photosynthesis.
function points(q) {
  const m = /<h4>Key Educational Points:<\/h4>([\s\S]*?)(?:<p class='exp-key'|$)/.exec(q.explanation);
  return m ? m[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').toLowerCase() : '';
}
const pts49 = points(BY['bio-49']);
check('5a bio-49 educational points mention glycolysis', pts49.includes('glycolysis'), pts49.slice(0, 80));
check('5b bio-49 educational points do not teach photosynthesis',
  !/photosynthesis|calvin|thylakoid|photosystem/.test(pts49));

// The six other items the review named as carrying the same generic
// central-dogma block must no longer share it.
const DOGMA = 'the central dogma of molecular biology describes information flow';
for (const id of ['bio-5', 'bio-13', 'bio-19', 'bio-35', 'bio-36', 'bio-44']) {
  check(`5c ${id} no longer carries the generic central-dogma block`, !points(BY[id]).includes(DOGMA));
}

// ======================================= 6. untouched items really are untouched
// The ten the review preserved, plus bio-12, which the export skipped.
const PRESERVE = [2, 3, 7, 22, 25, 26, 30, 46, 50, 57].map(ID);
for (const id of PRESERVE) {
  check(`6a ${id} preserved byte-for-byte`,
    JSON.stringify(BY[id]) === JSON.stringify(BEFORE[id]));
}
check('6b bio-12 was never part of the reviewed block', !REVIEWED.includes('bio-12'));
check('6c bio-12 is still the lysogenic-cycle question, unreviewed',
  /lysogenic cycle/i.test(BY['bio-12'].question));

// ================================================ 7. rendering and house style
for (const id of REVIEWED) {
  const q = BY[id];
  if (!q) continue;
  // Tags must balance, or a stray </table> swallows the rest of the card.
  const open = (q.explanation.match(/<(table|ul|p|h4|tr|td|th|li|div|strong|em|sup|sub)\b/g) || []).length;
  const close = (q.explanation.match(/<\/(table|ul|p|h4|tr|td|th|li|div|strong|em|sup|sub)>/g) || []).length;
  check(`7a ${id} HTML tags balance`, open === close, { open, close });
  // Reviewer scaffolding must never reach a student.
  check(`7b ${id} carries no reviewer language`,
    !/\b(Required:|Teaching improvement|SUBSTANTIAL|MAJOR REWRITE|\[S\d+\])/i.test(text(q)));
  // The owner's standing style rule.
  check(`7c ${id} uses no em dash`, !/—/.test(q.question + q.options.join(' ') + q.explanation));
  // A rewritten card must not leave the answer heading naming a stale option.
  const head = /<h4>Correct Answer:([^<]*)<\/h4>/.exec(q.explanation);
  if (head) {
    const named = head[1].replace(/^\s*[A-D]\)\s*/, '').trim().toLowerCase();
    const key = String(q.options[q.correct]).replace(/<[^>]*>/g, '').trim().toLowerCase();
    const ok = named.length < 3 || key.includes(named) || named.includes(key)
      || /^\d+$/.test(named) || named.includes(key.slice(0, 12));
    check(`7d ${id} answer heading matches the keyed option`, ok, { named, key });
  }
}

console.log(`bio-review-001-060: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
