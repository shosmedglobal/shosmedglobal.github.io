/**
 * Integrity checks for the 2024 LF3 mock exam (shown to students as the
 * 2023/2024 cycle).
 *
 * Run:  node test/mock-exam-2024.test.js
 *
 * Same contract as the 2022 and 2023 papers, with one difference. Stems and
 * options were allowed minor grammar, spelling and wording repairs this time,
 * so instead of a stopword list deciding what counts as "minor", every
 * approved edit is pinned to its exact text below. Anything not pinned must
 * still match the official paper character for character, and no stem or
 * option anywhere may gain a number, a formula or more than a few words.
 *
 * The fixture in test/fixtures/mock-exam-2024-official.json is the paper as
 * it stood before this repair.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'functions', 'exam-data', 'mock-exam-2024.json');
const exam = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const OFFICIAL = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'fixtures', 'mock-exam-2024-official.json'), 'utf8'));

// LF3's published 2023/2024 answer key.
const OFFICIAL_KEY = 'DCBDBDBADBDBAACBABCCADADBDCAACBDACDBDACBDACBDBAABCDABADCBACD';

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
const ALLOWED_TAGS = /^(p|strong|em|sub|sup|u)$/;
exam.forEach(q => {
  ['question', 'explanation'].forEach(f => {
    const bad = [...q[f].matchAll(/<\/?([a-z]+)[^>]*>/gi)].map(m => m[1].toLowerCase())
      .filter(t => !ALLOWED_TAGS.test(t));
    check(`2a Q${q.id} ${f} uses only the expected tags`, bad.length === 0, bad);
  });
  check(`2b Q${q.id} has no HTML entity at all`,
    !/&[a-z#0-9]+;/i.test(q.question + q.explanation + Object.values(q.options).join('')));
  check(`2c Q${q.id} stem and options contain no markup`,
    !/<[a-z/]/i.test(q.question) && !Object.values(q.options).some(v => /<[a-z/]/i.test(v)));
});
// Exponents, charges and arrows must be real characters so they survive being
// copied as plain text — the review saw "q2", "109" and "104" where q², 10⁹
// and 10⁴ were meant.
const whole = JSON.stringify(exam);
check('2d no digit superscripts left as markup', !/<sup>[\d+\-−]+<\/sup>/.test(whole),
  (whole.match(/<sup>[^<]*<\/sup>/g) || []).slice(0, 5));
check('2e no digit subscripts left as markup', !/<sub>[\d+\-−]+<\/sub>/.test(whole),
  (whole.match(/<sub>[^<]*<\/sub>/g) || []).slice(0, 5));
// Only letter subscripts with no Unicode form may stay as markup.
check('2f remaining subscripts are letters without a Unicode form',
  (whole.match(/<sub>([^<]*)<\/sub>/g) || []).every(t => /^<sub>(AA|Aa|b)<\/sub>$/.test(t)),
  [...new Set(whole.match(/<sub>[^<]*<\/sub>/g) || [])]);
check('2g no superscript markup remains', !/<sup>/.test(whole),
  [...new Set(whole.match(/<sup>[^<]*<\/sup>/g) || [])]);
// Explanations are injected with innerHTML, and this paper writes "<" and ">"
// as comparison operators (ΔG < 0). An operator is safe because the HTML
// parser only opens a tag when "<" is followed by a letter, "/", "!" or "?".
// Assert that: strip the tags we wrote, and nothing tag-like may be left.
exam.forEach(q => {
  const residue = q.explanation.replace(/<\/?(p|strong|em|sub|sup|u)>/g, '');
  const opening = residue.match(/<[a-zA-Z/!?]/g) || [];
  check(`2h Q${q.id} no stray "<" can open a tag`, opening.length === 0, opening);
  check(`2i Q${q.id} comparison operators are spaced`,
    !/[<>][^\s]/.test(residue) && !/[^\s][<>]/.test(residue),
    residue.match(/.{0,8}[<>].{0,8}/g) || []);
});

// ------------------------------------- the official question is preserved
const ENTITIES = { '&beta;': 'β', '&alpha;': 'α', '&gamma;': 'γ', '&mu;': 'μ',
  '&pi;': 'π', '&Pi;': 'Π', '&Delta;': 'Δ', '&ndash;': '-', '&mdash;': '-',
  '&prime;': '′', '&times;': 'x', '&divide;': '÷', '&rarr;': '->',
  '&radic;': '√', '&equiv;': '≡', '&deg;': '°', '&middot;': '·', '&gt;': '>',
  '&lt;': '<', '&asymp;': '≈', '&hellip;': '...', '&oslash;': 'ø',
  '&uuml;': 'ü', '&frac12;': '½', '&#8652;': '⇌', '&minus;': '-' };
const SUPER = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5',
  '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-',
  '⁽': '(', '⁾': ')', 'ⁿ': 'n', 'ᵖ': 'p', 'ᴴ': 'H' };
const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5',
  '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '-',
  '₍': '(', '₎': ')', 'ₙ': 'n', 'ₐ': 'a' };
function plain(s) {
  let out = String(s);
  for (const [k, v] of Object.entries(ENTITIES)) out = out.split(k).join(v);
  return out
    .replace(/<\/?(sub|sup|strong|em|p|u)>/g, '')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁽⁾ⁿᵖᴴ]/g, ch => SUPER[ch] !== undefined ? SUPER[ch] : ch)
    .replace(/[₀₁₂₃₄₅₆₇₈₉₊₋₍₎ₙₐ]/g, ch => SUB[ch] !== undefined ? SUB[ch] : ch)
    .replace(/[−–—]/g, '-')
    .replace(/→/g, '->')
    .replace(/×/g, 'x')
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

// Every approved stem/option repair, pinned to the exact text it was approved
// as. A stem or option not listed here must match the official paper.
const APPROVED_STEMS = {
  4:  'The structure of a eukaryotic flagellum contains:',
  5:  'The function of the rough endoplasmic reticulum is:',
  7:  'The enzyme primase is:',
  9:  "In Mendel's experiments, the number of gamete types in a trihybrid cross is:",
  11: 'The F2 phenotypic ratio in a monohybrid cross with incomplete dominance is:',
  15: 'When there are two alleles of a gene (dominant A and recessive a), then the probability (p) of dominant phenotype is:',
  16: 'In a population at equilibrium, a gene has two alleles: the frequency of the dominant allele is 60% and the frequency of the recessive allele is 40%. What is the frequency of heterozygotes?',
  19: 'The nervous system originates from:',
  20: 'The human heart supports:',
  21: 'Muscle contraction:',
  24: 'The hormone glucagon is produced by:',
  30: 'Which vitamin is water-soluble?',
  34: 'Common unsaturated fatty acids occurring in the human body have an even number of carbons and one or more cis double bond(s). Which of the following molecules is an example of a fatty acid that can exist in the cis configuration?',
  43: 'Choose the chemical reaction in which one of the reactants is water:',
  52: 'Synthetic reactions in our metabolism use free energy, often in the form of ATP. Therefore, from a thermodynamic point of view they can be classified as',
  54: 'For the detection of polysaccharides in histological sections the staining called PAS reaction is used. One of the chemicals used in this test is periodic acid whose formula is',
};
const APPROVED_OPTIONS = {
  '26C': 'a measure of the tendency of a solution to take up potassium when separated from pure water by a selectively permeable membrane',
  '36C': 'tetramethylammonium',
  '56B': 'a very weak acid that is unable to dissociate in water',
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

// The five stems that were reworded most must still name the same science.
const KEPT_TERMS = {
  11: ['F2', 'monohybrid', 'incomplete dominance', 'ratio'],
  16: ['equilibrium', 'two alleles', '60%', '40%', 'heterozygotes'],
  20: ['human heart'],
  30: ['vitamin', 'water-soluble'],
  54: ['polysaccharides', 'PAS reaction', 'periodic acid'],
};
Object.entries(KEPT_TERMS).forEach(([id, terms]) => terms.forEach(t =>
  check(`3e Q${id} stem still says "${t}"`, plain(byId(Number(id)).question).includes(t),
    plain(byId(Number(id)).question))));

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
  [2,  /<strong>Infectivity<\/strong> is a different property/i,
       /by definition, virulent|opposite of highly infective/i,
       'infectivity and virulence are distinct; opportunists are not the opposite of infective'],
  [2,  /ranging from mutually beneficial to parasitic/i,
       /mutually beneficial or at least non-harmful/i,
       'symbiosis is an association, not necessarily harmless'],
  [5,  /it does not sort every protein in the cell/i,
       /is the job of the <strong>Golgi apparatus<\/strong>, which sorts proteins to lysosomes/i,
       'the Golgi does not sort every protein in the cell'],
  [5,  /not all of them end up secreted/i, /ultimate secretion/i,
       'rough-ER proteins are not all secreted'],
  [13, /<strong>in a protein-coding sequence<\/strong>/i,
       /all subsequent amino acids are wrong/i,
       'the frameshift assumes a coding sequence, and the effect is not stated absolutely'],
  [16, /0\.25 is the frequency of each <em>homozygous<\/em> genotype/i,
       /confuses the calculation with the F₂ heterozygote fraction/i,
       '0.25 is a homozygote frequency, not the F2 heterozygote fraction'],
  [24, /produces hormones such as ACTH, TSH, GH, LH, FSH and prolactin/i,
       /produces tropic hormones/i,
       'prolactin is not called a tropic hormone'],
  [29, /underestimates the water content of normal plasma, which is approximately 90–92%/i,
       /inconsistent with plasma being a fluid capable of carrying dissolved solutes/i,
       '60-70% water would still carry solutes'],
  [31, /its oxidation state is <strong>0<\/strong>/i, /from −1 to \+2/i,
       'the carbinol carbon goes from 0 to +2'],
  [33, /<strong>acyl phosphate<\/strong>/i, /has a keto group next to the phosphate/i,
       'option B is an acyl phosphate, not a ketone'],
  [35, /adding water to ethanol does not convert it into ethanal/i,
       /would give a hydrate\/geminal diol, not an aldehyde/i,
       'water does not add to an alcohol to give a geminal diol'],
  [42, /<strong>Amylose<\/strong> is an unbranched chain of α-1,4-linked glucose/i,
       /α-1,4 \(amylose\) and α-1,6 \(amylopectin\)/i,
       'amylopectin has alpha-1,4 chains with alpha-1,6 branch points'],
  [45, /This structure is <strong>serine<\/strong>/i, /L-serine/,
       'the formula specifies no stereochemistry'],
  [46, /not permanently paired as NaCl molecules/i, null,
       'charge balance is distinguished from how the ions exist in plasma'],
  [46, /gives a total charge of <strong>\+3<\/strong>/i, /would double the positive charge/i,
       'one Na+ plus one Ca2+ is +3, not double'],
  [56, /<strong>Phosphoric acid is a weak triprotic acid\.<\/strong>/i,
       /only moderately strong in its first step/i,
       'phosphoric acid is a weak triprotic acid'],
  [57, /Reading the 8 % as a <strong>mass\/volume<\/strong> percentage/i, null,
       'the mass/volume reading of 8% is stated before the grams are calculated'],
  [57, /fourfold decrease/i, null, 'the dilution is fourfold, 8% to 2%'],
];
CORRECTIONS.forEach(([id, present, absent, label]) => {
  check(`4a Q${id} states: ${label}`, present.test(byId(id).explanation),
    plain(byId(id).explanation).slice(0, 220));
  if (absent) check(`4b Q${id} no longer claims the opposite: ${label}`, !absent.test(byId(id).explanation));
});

// ------------------------------- explanations split without being rewritten
// The review found explanations that had been cut out of one joint sentence
// and pasted under each option unchanged: duplicated bodies, sentences ending
// in "and" or ",.", and a corrupted "a2+, opens later". These three checks
// are what stop that from coming back.
const paragraphs = e => e.split('</p>').map(p => plain(p.replace('<p>', '')).trim()).filter(Boolean);
exam.forEach(q => {
  const ps = paragraphs(q.explanation);
  const bodies = ps.filter(p => /^Option [A-D]/.test(p))
    .map(p => p.replace(/^Option [A-D] \([^)]*\): ?/, ''))
    .filter(b => b.length > 60);
  // Identical bodies are the obvious form of the defect. Q13 showed the other
  // form: the joint sentence pasted under each option, with an extra clause
  // appended to the last one. So no body may contain another body either.
  const shared = [];
  bodies.forEach((a, i) => bodies.forEach((b, j) => {
    if (i !== j && a.includes(b) && (a !== b || i < j)) shared.push(b.slice(0, 60));
  }));
  check(`5a Q${q.id} no two options share the same explanation`, shared.length === 0, shared);
  ps.forEach((p, i) => {
    check(`5b Q${q.id} paragraph ${i + 1} is a finished sentence`,
      /[.?!"”)]$/.test(p) && !/\b(and|so|or|but|with|respectively)$/.test(p), p.slice(-60));
  });
  check(`5c Q${q.id} has no subject-verb comma left by the split`,
    !/(<\/strong>|\)),\s+(is|are|was|were|has|have|had|sits?|forms?|belongs?|secretes?|produces?|contains?|refers?|describes?|opens?|arises?|by definition|would|lacks?|carries?|adds?|removes?)\b/.test(q.explanation),
    (q.explanation.match(/(<\/strong>|\)),\s+\w+/g) || []).slice(0, 4));
  check(`5d Q${q.id} explanation says "respectively" nowhere`, !/respectively/i.test(q.explanation));
});
check('5e Q28 option C is no longer corrupted', /voltage-gated <strong>Ca²⁺ channels<\/strong>/i.test(byId(28).explanation));
check('5f Q26 main explanation no longer ends in "so"',
  !/ so<\/p>/.test(byId(26).explanation));

// ------------------------------------------- explanations simplified
const SIMPLIFIED = [
  [5,  /COPII/,                                  'the COPII vesicle discussion'],
  [30, /pteridine|aminobenzoate|glutamate moieties/i, "folic acid's chemical components"],
  [41, /ring current/i,                          'the NMR ring current'],
];
SIMPLIFIED.forEach(([id, re, label]) =>
  check(`6a Q${id} explanation no longer carries ${label}`, !re.test(byId(id).explanation)));
[[5, /N-glycosylated/i], [30, /water-soluble/i], [41, /delocalised<\/strong> over the whole ring/i]]
  .forEach(([id, re]) => check(`6b Q${id} still teaches the tested concept`, re.test(byId(id).explanation)));
[5, 30, 41].forEach(id =>
  check(`6c Q${id} explanation stays short`, plain(byId(id).explanation).length < 1200,
    plain(byId(id).explanation).length));

// ------------------------------------- the public copy stays in step
// data/mock-exams/ is what practice-exam.html renders. It must be the server
// copy minus the answer key — the 2022 repair shipped stems that students
// never saw because this file was not regenerated.
const PUBLIC = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', 'data', 'mock-exams', 'mock-exam-2024.json'), 'utf8'));
check('7a public copy has 60 questions', PUBLIC.length === 60, PUBLIC.length);
PUBLIC.forEach((p, i) => {
  const q = exam[i];
  check(`7b Q${p.id} public question matches the server copy`,
    p.question === q.question && JSON.stringify(p.options) === JSON.stringify(q.options),
    { id: p.id });
  check(`7c Q${p.id} public copy leaks no answer or explanation`,
    !('correct' in p) && !('explanation' in p) && !('topic' in p));
});

console.log(`mock-exam-2024: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
