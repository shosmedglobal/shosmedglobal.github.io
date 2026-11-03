/**
 * Integrity checks for the 2025 LF3 mock exam (shown to students as the
 * 2024/2025 cycle).
 *
 * Run:  node test/mock-exam-2025.test.js
 *
 * Same contract as the 2024 paper: every approved edit to a stem or option
 * is pinned to its exact text, anything not pinned must still match the
 * official paper character for character, and no stem or option anywhere may
 * gain a number, a formula or more than a few words.
 *
 * One difference from the earlier papers. This one stresses "not", "both"
 * and "except" in the stem with <strong>, and italicises variables and
 * species names with <em>. That is the question's own emphasis and it
 * renders, because the exam page injects the stem with innerHTML, so it is
 * kept rather than stripped. What may not survive in a stem or option is an
 * HTML entity or a sub/sup tag, which is what a student copying the paper
 * would see as mangled text.
 *
 * The fixture in test/fixtures/mock-exam-2025-official.json is the paper as
 * it stood before this repair.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'functions', 'exam-data', 'mock-exam-2025.json');
const exam = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const OFFICIAL = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'fixtures', 'mock-exam-2025-official.json'), 'utf8'));

// LF3's published 2024/2025 answer key.
const OFFICIAL_KEY = 'BCBDABDACBDACCAABCCACDDBACCCADBCAABCBBBDCBCACABBBDBABDBCDADA';

let passed = 0;
const failures = [];
const check = (name, cond, detail) => {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail).slice(0, 240) : ''));
};
const byId = id => exam[id - 1];
const official = id => OFFICIAL[id - 1];

// ----------------------------------------------------------- structure
check('1a exam has 60 questions', exam.length === 60, exam.length);
check('1b ids run 1-60 in order', exam.every((q, i) => q.id === i + 1));
check('1c every question is Biology or Chemistry',
  exam.every(q => q.section === 'Biology' || q.section === 'Chemistry'));
check('1d 30 biology and 30 chemistry',
  exam.filter(q => q.section === 'Biology').length === 30 &&
  exam.filter(q => q.section === 'Chemistry').length === 30);
check('1e answer key matches the official LF3 key',
  exam.map(q => q.correct).join('') === OFFICIAL_KEY, exam.map(q => q.correct).join(''));
check('1f the fixture carries the same key',
  OFFICIAL.map(q => q.correct).join('') === OFFICIAL_KEY);
exam.forEach(q => {
  check(`1g Q${q.id} has exactly options A-D`, Object.keys(q.options).sort().join('') === 'ABCD');
  check(`1h Q${q.id} options are all non-empty`, Object.values(q.options).every(v => v && v.trim().length));
  check(`1i Q${q.id} correct letter points at a real option`, !!q.options[q.correct]);
  check(`1j Q${q.id} has a question and an explanation`, !!q.question.trim() && !!q.explanation.trim());
  check(`1k Q${q.id} explanation mentions each wrong option`,
    ['A', 'B', 'C', 'D'].filter(l => l !== q.correct).every(l => q.explanation.includes('Option ' + l)), q.id);
  check(`1l Q${q.id} explanation does not argue against its own answer`,
    !q.explanation.includes('<strong>Option ' + q.correct + '</strong>'));
});

// ------------------------------------------------------ notation/markup
const whole = JSON.stringify(exam);
check('2a no HTML entities anywhere', !/&[a-zA-Z#][a-zA-Z0-9]*;/.test(whole),
  [...new Set(whole.match(/&[a-zA-Z#][a-zA-Z0-9]*;/g) || [])]);
exam.forEach(q => {
  // A stem or option keeps only inline emphasis; everything else there would
  // be mangled text in a student's copy-paste.
  const texts = [['stem', q.question], ...Object.entries(q.options).map(([k, v]) => ['option ' + k, v])];
  texts.forEach(([where, t]) => {
    const residue = t.replace(/<\/?(strong|em|u)>/g, '');
    check(`2b Q${q.id} ${where} carries no markup beyond strong/em/u`,
      !/<[a-zA-Z/]/.test(residue), residue.match(/<[^>]*>/g) || []);
  });
});
check('2c no digit subscripts left as markup', !/<sub>[\d+\-−]+<\/sub>/.test(whole),
  (whole.match(/<sub>[^<]*<\/sub>/g) || []).slice(0, 5));
check('2d no digit superscripts left as markup', !/<sup>[\d+\-−]+<\/sup>/.test(whole),
  (whole.match(/<sup>[^<]*<\/sup>/g) || []).slice(0, 5));
// Unicode has no subscript q or w, and no superscript capital C, so these
// three stay as markup. They render correctly either way.
check('2e the only markup left is what Unicode cannot express',
  (whole.match(/<su[pb]>[^<]*<\/su[pb]>/g) || [])
    .every(t => ['<sub>eq</sub>', '<sub>w</sub>', '<sup>C</sup>'].includes(t)),
  [...new Set(whole.match(/<su[pb]>[^<]*<\/su[pb]>/g) || [])]);

// Explanations are injected with innerHTML. A "<" only opens a tag when it is
// followed by a letter, "/", "!" or "?", so strip the tags we wrote and
// assert nothing tag-like is left.
exam.forEach(q => {
  const residue = q.explanation.replace(/<\/?(p|strong|em|sub|sup|u)>/g, '');
  check(`2f Q${q.id} no stray "<" can open a tag`,
    (residue.match(/<[a-zA-Z/!?]/g) || []).length === 0, residue.match(/<[a-zA-Z/!?]/g) || []);
});
// Powers of ten must be superscripted, never flattened onto the line, where
// "10-5" reads as a subtraction.
exam.forEach(q => {
  const fields = [q.question, q.explanation, ...Object.values(q.options)].join(' ');
  check(`2g Q${q.id} powers of ten are superscripted`,
    !/10[−-][0-9]/.test(fields), fields.match(/.{0,12}10[−-][0-9].{0,6}/g) || []);
});

// ------------------------------------- the official question is preserved
const ENTITIES = { '&beta;': 'β', '&alpha;': 'α', '&gamma;': 'γ', '&mu;': 'μ',
  '&micro;': 'µ', '&pi;': 'π', '&Pi;': 'Π', '&Delta;': 'Δ', '&ndash;': '-',
  '&mdash;': '-', '&prime;': '′', '&times;': 'x', '&divide;': '÷',
  '&rarr;': '->', '&rlhar;': '⇌', '&equals;': '=', '&radic;': '√',
  '&equiv;': '≡', '&deg;': '°', '&middot;': '·', '&gt;': '>', '&lt;': '<',
  '&asymp;': '≈', '&hellip;': '...', '&oslash;': 'ø', '&uuml;': 'ü',
  '&frac12;': '½', '&#8652;': '⇌', '&minus;': '-', '&nbsp;': ' ',
  '&ldquo;': '"', '&rdquo;': '"', '&lsquo;': "'", '&rsquo;': "'" };
const SUPER = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5',
  '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-',
  '⁽': '(', '⁾': ')', 'ⁿ': 'n', 'ᵖ': 'p', 'ᴴ': 'H', 'ᴬ': 'A', 'ᴮ': 'B',
  'ⁱ': 'i', 'ᵒ': 'o' };
const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5',
  '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '-',
  '₍': '(', '₎': ')', 'ₐ': 'a', 'ₑ': 'e', 'ₕ': 'h', 'ᵢ': 'i', 'ⱼ': 'j',
  'ₖ': 'k', 'ₗ': 'l', 'ₘ': 'm', 'ₙ': 'n', 'ₒ': 'o', 'ₚ': 'p', 'ᵣ': 'r',
  'ₛ': 's', 'ₜ': 't', 'ᵤ': 'u', 'ᵥ': 'v', 'ₓ': 'x' };
function plain(s) {
  let out = String(s);
  for (const [k, v] of Object.entries(ENTITIES)) out = out.split(k).join(v);
  return out
    .replace(/<\/?(sub|sup|strong|em|p|u)>/g, '')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ⁿᵖᴴᴬᴮⁱᵒ]/g, ch => SUPER[ch] !== undefined ? SUPER[ch] : ch)
    .replace(/[₀₁₂₃₄₅₆₇₈₉₊₋₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ]/g, ch => SUB[ch] !== undefined ? SUB[ch] : ch)
    .replace(/→/g, '->')
    .replace(/[−–—]/g, '-')
    .replace(/[′’']/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// The stems and options the review approved a rewording for, pinned to the
// exact text. A stem or option not listed here must match the official paper.
const APPROVED_STEMS = {
  4:  'The structure of a bacteriophage contains:',
  5:  'The cell wall of Gram-positive bacteria contains a thick layer of:',
  6:  'The function of lysosomes is:',
  9:  'Which of these pea characteristics did Gregor Mendel not study?',
  18: 'The nervous system develops from:',
  19: 'The aorta originates in:',
  21: 'A function of the renal tubular system is:',
  26: 'When the mammalian eye focuses on nearby objects:',
  29: 'Oxygen makes up approximately ___ of the atmosphere.',
};
const APPROVED_OPTIONS = {
  '11C': 'incompletely dominant allele',
  '11D': 'completely dominant allele',
  '54A': 'contain one or more planar rings',
};

Object.entries(APPROVED_STEMS).forEach(([id, text]) =>
  check(`3a Q${id} stem is the approved wording`, plain(byId(Number(id)).question) === text,
    plain(byId(Number(id)).question)));
Object.entries(APPROVED_OPTIONS).forEach(([k, text]) => {
  const id = Number(k.slice(0, -1)), L = k.slice(-1);
  check(`3b Q${id} option ${L} is the approved wording`, plain(byId(id).options[L]) === text,
    plain(byId(id).options[L]));
});
exam.forEach(q => {
  if (!(q.id in APPROVED_STEMS)) {
    check(`3c Q${q.id} stem is the official text`,
      plain(q.question) === plain(official(q.id).question),
      { now: plain(q.question), official: plain(official(q.id).question) });
  }
  ['A', 'B', 'C', 'D'].forEach(L => {
    if ((q.id + L) in APPROVED_OPTIONS) return;
    check(`3d Q${q.id} option ${L} is the official text`,
      plain(q.options[L]) === plain(official(q.id).options[L]),
      { now: plain(q.options[L]), official: plain(official(q.id).options[L]) });
  });
});

// The reworded stems must still name the same science.
const KEPT_TERMS = {
  4:  ['bacteriophage'],
  5:  ['Gram-positive', 'thick layer'],
  6:  ['lysosomes'],
  9:  ['Mendel', 'pea'],
  18: ['nervous system'],
  19: ['aorta'],
  21: ['renal', 'amino acids'],
  26: ['mammalian eye', 'nearby objects'],
  29: ['atmosphere'],
};
Object.entries(KEPT_TERMS).forEach(([id, terms]) => terms.forEach(t => {
  const stem = plain(byId(Number(id)).question);
  const opts = Object.values(byId(Number(id)).options).map(plain).join(' ');
  check(`3e Q${id} still says "${t}"`, (stem + ' ' + opts).includes(t), stem);
}));

// Whatever the wording, no stem or option may gain a number or a formula the
// official paper did not have, or grow by more than a clause.
const numbersIn = s => (plain(s).match(/\d+(?:\.\d+)?/g) || []).sort();
const formulasIn = s => [...new Set((plain(s).match(/\b[A-Z][A-Za-z]*\d*[A-Za-z0-9]*\b/g) || [])
  .filter(t => /\d/.test(t)))].sort();
exam.forEach(q => {
  const now = plain(q.question + ' ' + Object.values(q.options).join(' '));
  const was = plain(official(q.id).question + ' ' + Object.values(official(q.id).options).join(' '));
  check(`3f Q${q.id} introduces no numerical data`,
    numbersIn(now).every(n => numbersIn(was).includes(n)),
    numbersIn(now).filter(n => !numbersIn(was).includes(n)));
  check(`3g Q${q.id} introduces no formula`,
    formulasIn(now).every(f => formulasIn(was).includes(f)),
    formulasIn(now).filter(f => !formulasIn(was).includes(f)));
  check(`3h Q${q.id} stem and options gained no more than 8 words`,
    now.split(' ').length - was.split(' ').length <= 8,
    now.split(' ').length - was.split(' ').length);
});

// --------------------------------------------- the review's science fixes
// Each correction is pinned twice: the statement that must be there, and the
// claim it replaced, which must not come back.
const CORRECTIONS = [
  [2,  /some viruses, herpesviruses among them, keep their genome as a separate episome/i,
       /latent infection is parasitic, not symbiotic/i,
       'latency does not always mean integration; symbiosis includes parasitism'],
  [2,  /symbiosis is a broad term that includes parasitism/i, null, null],
  [5,  /peptidoglycan consists of sugar chains cross-linked by short peptides/i,
       /general carbohydrates are not the principal structural component/i,
       'the carbohydrate distractor must not imply the wall has no carbohydrate'],
  [7,  /not all of them are actively expressed at a given moment/i,
       /silent genes are located in heterochromatin, not euchromatin/i,
       'euchromatin genes are accessible, not all transcribed'],
  [7,  /though repetitive elements are not confined to heterochromatin/i, null, null],
  [12, /mitosis generally preserves chromosome number/i,
       /does not generate gametes, so it cannot underlie inheritance/i,
       'plants make gametes by mitosis; the blanket claim was wrong'],
  [13, /Assuming a normal human diploid somatic cell/i,
       /every chromosome is therefore double-stranded/i,
       'DNA is double-stranded before replication too; the species is assumed'],
  [13, /each chromosome therefore consists of two sister chromatids/i, null, null],
  [19, /from the <strong>left ventricle<\/strong> into the systemic circulation/i,
       /oxygenated blood from the systemic circulation/i,
       'the aorta carries blood into, not from, the systemic circulation'],
  [21, /Kidney cells do also metabolize amino acids/i,
       /the kidney does not degrade amino acids in this segment/i,
       'proximal tubular cells do metabolize amino acids'],
  [23, /the biological calcium ion is Ca²⁺, not Ca⁺/i,
       /is the canonical excitable-cell depolarization ion and matches the textbook mechanism/i,
       'Ca2+ would depolarize too; what rules option A out is the charge written on it'],
  [27, /official intended answer under the question's simplified distinction/i,
       /Mineral deficiency is a form of <em>malnutrition<\/em>, not undernutrition/i,
       'undernutrition includes micronutrient deficiency; malnutrition is not only protein'],
  [27, /malnutrition covers excesses and imbalances/i, null, null],
  [31, /MgO₂ is magnesium peroxide/i,
       /implies a Mg⁴⁺ oxidation state/i,
       'MgO2 is a real compound of Mg2+ and peroxide, not Mg(IV)'],
  [32, null, /principal mineral phase of bones and teeth/i,
       'bone mineral is hydroxyapatite, not Ca3(PO4)2'],
  [34, /not a rule covering every route/i,
       null, 'ferric iron enters cells bound to transferrin'],
  [35, /Excessive loss of CO₂ during hyperventilation/i,
       /explains why exhaling CO₂ raises blood pH/i,
       'ordinary exhalation is not respiratory alkalosis'],
  [41, null, /water autoionization/i, 'the autoionization aside is beyond this level'],
  [43, /pH is logarithmic|pH 7 means \[H₃O⁺\] = 10⁻⁷ mol\/L, not 7 mol\/L/i,
       /dimensionally wrong/i,
       'option B uses the right unit; the numbers are what is wrong'],
  [43, /standard approximation of 25 °C/i, null, null],
  [45, /430 µmol\/L = 430 000 nmol\/L/i,
       /dimensionally inconsistent with the source value/i,
       'option D is numerically wrong, not dimensionally wrong'],
  [53, /two fewer hydrogen atoms than propanol and ethyl methyl ether/i,
       /replaces two C–H bonds present in propanol/i,
       'the carbonyl does not replace two C-H bonds'],
  [55, /three-carbon chain between the two nitrogen atoms/i,
       /a 4-carbon chain with an N-methylated secondary amine/i,
       'the displayed molecule has three carbons between the nitrogens'],
  [56, /glucose has five hydroxyl groups/i,
       /four –OH groups plus one hemiacetal/i,
       'five hydroxyls is the simpler count'],
  [58, /five fewer than sucrose/i, null, null],
];
CORRECTIONS.forEach(([id, must, mustNot, why]) => {
  const e = byId(id).explanation;
  if (must) check(`4 Q${id} ${why || 'correction is present'}`, must.test(e), e.slice(0, 200));
  if (mustNot) check(`4 Q${id} old claim is gone: ${why || mustNot}`, !mustNot.test(e),
    (e.match(mustNot) || [])[0]);
});

// ------------------------------------------------- explanations read well
exam.forEach(q => {
  const paras = (q.explanation.match(/<p>[\s\S]*?<\/p>/g) || [])
    .map(p => p.replace(/<[^>]+>/g, '').trim());
  check(`5a Q${q.id} explanation is made of <p> paragraphs`, paras.length > 0);
  paras.forEach(p => check(`5b Q${q.id} every paragraph is a finished sentence`,
    /[.!?:]$/.test(p), p.slice(-70)));

  // Identical option bodies are the mark of one joint sentence pasted under
  // each option. Containment catches the variant with a clause appended.
  const bodies = paras.filter(p => /^Option [A-D]/.test(p))
    .map(p => p.replace(/^Option [A-D][^:]*:\s*/, ''));
  const shared = [];
  bodies.forEach((a, i) => bodies.forEach((b, j) => {
    if (i !== j && a.includes(b) && (a !== b || i < j)) shared.push(b.slice(0, 60));
  }));
  check(`5c Q${q.id} no two options share the same explanation`, shared.length === 0, shared);

  check(`5d Q${q.id} no "respectively" standing in for separate sentences`,
    !/respectively/i.test(q.explanation));
});

// ------------------------------------------------ public copy and privacy
const PUBLIC = path.join(ROOT, 'data', 'mock-exams', 'mock-exam-2025.json');
const pub = JSON.parse(fs.readFileSync(PUBLIC, 'utf8'));
check('6a the public copy has the same 60 questions', pub.length === 60);
check('6b the public copy carries no answer key',
  pub.every(q => !('correct' in q)), pub.filter(q => 'correct' in q).map(q => q.id));
check('6c the public copy carries no explanations',
  pub.every(q => !('explanation' in q)), pub.filter(q => 'explanation' in q).map(q => q.id));
pub.forEach((q, i) => {
  check(`6d Q${q.id} public stem matches the server copy`, q.question === exam[i].question);
  check(`6e Q${q.id} public options match the server copy`,
    JSON.stringify(q.options) === JSON.stringify(exam[i].options));
});

console.log(`mock-exam-2025: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
