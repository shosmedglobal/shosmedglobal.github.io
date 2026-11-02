/**
 * Integrity checks for the 2022 LF3 mock exam.
 *
 * Run:  node test/mock-exam-2022.test.js
 *
 * Background (audit, 1 November 2026): all 60 answer letters match LF3's
 * published 2021/2022 key, but several questions were unanswerable as
 * written and several explanations taught something untrue. Those were
 * repaired. The answer letters themselves must never change — they are the
 * official key — so the most important check here is that the key string is
 * exactly what LF3 published.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'functions', 'exam-data', 'mock-exam-2022.json');
const exam = JSON.parse(fs.readFileSync(FILE, 'utf8'));

// LF3's published 2021/2022 answer key, confirmed against the exam paper.
const OFFICIAL_KEY = 'BCCCADAAACDBDBBDABACBCADACBCCABDCACBDBACBBBAACBDAABBDBCDBACC';

let passed = 0;
const failures = [];
const check = (name, cond, detail) => {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail).slice(0, 200) : ''));
};

// ----------------------------------------------------------- structure
check('1a exam has 60 questions', exam.length === 60, exam.length);
check('1b ids run 1–60 in order', exam.every((q, i) => q.id === i + 1));
check('1c every question has a section of Biology or Chemistry',
  exam.every(q => q.section === 'Biology' || q.section === 'Chemistry'));
check('1d 30 biology and 30 chemistry',
  exam.filter(q => q.section === 'Biology').length === 30 && exam.filter(q => q.section === 'Chemistry').length === 30);
check('1e answer key matches the official LF3 key', exam.map(q => q.correct).join('') === OFFICIAL_KEY,
  exam.map(q => q.correct).join(''));
exam.forEach(q => {
  check(`1f Q${q.id} has exactly options A–D`, Object.keys(q.options).sort().join('') === 'ABCD');
  check(`1g Q${q.id} options are all non-empty`, Object.values(q.options).every(v => v && v.trim().length));
  check(`1h Q${q.id} correct letter points at a real option`, !!q.options[q.correct]);
  check(`1i Q${q.id} has a question and an explanation`, !!q.question.trim() && !!q.explanation.trim());
  check(`1j Q${q.id} explanation mentions each wrong option`,
    ['A', 'B', 'C', 'D'].filter(l => l !== q.correct).every(l => q.explanation.includes('Option ' + l) || q.explanation.includes('>' + l + '<')),
    q.id);
});

// -------------------------------------------------- formatting / markup
const ALLOWED_TAGS = /^(p|strong|em|sub|sup)$/;
exam.forEach(q => {
  ['question', 'explanation'].forEach(f => {
    const tags = [...q[f].matchAll(/<\/?([a-z]+)[^>]*>/gi)].map(m => m[1].toLowerCase());
    const bad = tags.filter(t => !ALLOWED_TAGS.test(t));
    check(`2a Q${q.id} ${f} uses only the expected tags`, bad.length === 0, bad);
  });
  check(`2b Q${q.id} has no HTML entity other than &lt;`,
    !/&(?!lt;)[a-z#0-9]+;/i.test(q.question + q.explanation + Object.values(q.options).join('')));
  check(`2c Q${q.id} options contain no markup`,
    !Object.values(q.options).some(v => /<[a-z/]/i.test(v)));
});
// Exponents and charges must be real characters, so they survive being copied
// as plain text (the audit found "0.62" where "0.6²" was meant).
const whole = JSON.stringify(exam);
check('2d no digit superscripts left as markup', !/<sup>[\d+\-−]+<\/sup>/.test(whole),
  (whole.match(/<sup>[^<]*<\/sup>/g) || []).slice(0, 5));
check('2e no digit subscripts left as markup', !/<sub>[\d+\-−]+<\/sub>/.test(whole),
  (whole.match(/<sub>[^<]*<\/sub>/g) || []).slice(0, 5));

// ------------------------------------- the official question is preserved
// Rule for this exam: LF3's question text may be improved for grammar,
// spelling, punctuation and chemical-formula formatting, and nothing else.
// An edit may not add numerical data, assumptions, reagents or conditions,
// change what the student must determine, or hand over something the paper
// expected the student to know. Scientific qualifications go in the
// explanation. The fixture is the paper exactly as it stood before the
// accuracy repair.
const byId = id => exam[id - 1];
const OFFICIAL = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'fixtures', 'mock-exam-2022-official.json'), 'utf8'));
const official = id => OFFICIAL[id - 1];

check('3a the fixture is the same 60 questions', OFFICIAL.length === 60);
check('3b the fixture carries the official key',
  OFFICIAL.map(q => q.correct).join('') === OFFICIAL_KEY);

// Compare like with like: markup and Unicode formatting are cosmetic, so
// normalize both sides to plain text before looking at content.
const SUPER = { '\u2070': '0', '\u00b9': '1', '\u00b2': '2', '\u00b3': '3', '\u2074': '4',
                '\u2075': '5', '\u2076': '6', '\u2077': '7', '\u2078': '8', '\u2079': '9',
                '\u207a': '+', '\u207b': '-' };
const SUB = { '\u2080': '0', '\u2081': '1', '\u2082': '2', '\u2083': '3', '\u2084': '4',
              '\u2085': '5', '\u2086': '6', '\u2087': '7', '\u2088': '8', '\u2089': '9',
              '\u208a': '+', '\u208b': '-' };
function plain(s) {
  return String(s)
    .replace(/<\/?(sub|sup|strong|em|p)>/g, '')
    .replace(/&minus;|&ndash;|&mdash;/g, '-')
    .replace(/&rarr;/g, '->')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079\u207a\u207b]/g, ch => SUPER[ch])
    .replace(/[\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089\u208a\u208b]/g, ch => SUB[ch])
    .replace(/[\u2212\u2013\u2014]/g, '-')
    .replace(/\u00d7/g, 'x')
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}
const numbersIn = s => (plain(s).match(/\d+(?:\.\d+)?/g) || []).sort();
// Anything that reads as a formula or a reagent: NaBH4, Ca, SO32-, H2SO3.
const formulasIn = s => [...new Set((plain(s).match(/\b[A-Z][A-Za-z]*\d*[A-Za-z0-9]*\b/g) || [])
  .filter(t => /\d/.test(t) || /^(Na|Ca|Mg|Fe|NH|Ba|Li|Al|Cl|Br|OH)/.test(t)))].sort();

exam.forEach(q => {
  const o = official(q.id);
  const now = plain(q.question + ' ' + Object.values(q.options).join(' '));
  const was = plain(o.question + ' ' + Object.values(o.options).join(' '));

  // No number may appear that the official paper did not contain.
  const addedNums = numbersIn(now).filter(n => !numbersIn(was).includes(n));
  check(`3c Q${q.id} introduces no numerical data`, addedNums.length === 0, addedNums);

  // No reagent or formula may appear that the official paper did not contain.
  const addedForms = formulasIn(now).filter(f => !formulasIn(was).includes(f));
  check(`3d Q${q.id} introduces no reagent or formula`, addedForms.length === 0, addedForms);

  // A stem may be rephrased, not extended with new clauses.
  const dw = now.split(' ').length - was.split(' ').length;
  check(`3e Q${q.id} stem and options gained no more than 8 words`, dw <= 8, dw);
});

// The five rewrites the reviewer named must be back verbatim (modulo markup).
[20, 36, 42, 45, 53].forEach(id =>
  check(`3g Q${id} stem is the official one`,
    plain(byId(id).question) === plain(official(id).question),
    { now: plain(byId(id).question), official: plain(official(id).question) }));

// Options are the paper's, except for a short, explicit list of cosmetic
// repairs: spelling, articles, the multiplication sign, formula formatting.
const COSMETIC_OPTIONS = new Set(['2C', '2D', '4A', '4B', '4C', '16A', '16B', '16C', '16D',
  '34A', '34B', '43D', '47B']);
exam.forEach(q => ['A', 'B', 'C', 'D'].forEach(L => {
  if (COSMETIC_OPTIONS.has(q.id + L)) return;
  check(`3h Q${q.id} option ${L} is the official text`,
    plain(q.options[L]) === plain(official(q.id).options[L]),
    { now: plain(q.options[L]), official: plain(official(q.id).options[L]) });
}));
// ...and each listed repair must still be a repair, not a rewrite: the same
// content words once articles and the known misspellings are set aside.
const contentWords = s => plain(s).toLowerCase()
  .replace(/\bantikodon\b/g, 'anticodon').replace(/\bquarternary\b/g, 'quaternary')
  .replace(/ised\b/g, 'ized')
  .replace(/\b(a|an|the)\b/g, ' ').replace(/[^a-z0-9+\- ]/g, ' ')
  .split(/\s+/).filter(Boolean).join(' ');
[...COSMETIC_OPTIONS].forEach(k => {
  const id = Number(k.slice(0, -1)), L = k.slice(-1);
  check(`3i Q${id} option ${L} differs from the official text only cosmetically`,
    contentWords(byId(id).options[L]) === contentWords(official(id).options[L]),
    { now: contentWords(byId(id).options[L]), official: contentWords(official(id).options[L]) });
});

// Stems must NOT carry the material the earlier repair had put there.
const NOT_IN_STEM = [
  [5, /double-stranded/i, 'the double-stranded premise'],
  [8, /monohybrid|complete dominance/i, 'the cross and the dominance relationship'],
  [4, /mosaicism|penetrance|new mutation/i, 'the inheritance assumptions'],
  [24, /assort independently/i, 'independent assortment'],
  [23, /complete dominance/i, 'the dominance assumption'],
  [34, /fixed total/i, 'a fixed sulfur(IV) concentration'],
  [36, /\(m\/v\)|final volume/i, 'a concentration convention and a final volume'],
  [42, /NaBH|work-?up/i, 'a reducing reagent'],
  [45, /at equilibrium|equilibrium constant/i, 'an explicit equilibrium'],
  [53, /NaOH|25 ?\u00b0C/i, 'named compounds and a temperature'],
  [41, /Ca = 40|anhydrous/i, 'the atomic masses'],
  [33, /atomic number/i, 'the atomic number of sodium'],
  [57, /complete combustion/i, 'the completeness condition'],
  [55, /mass percentage/i, 'the concentration convention'],
  [20, /1500|intake/i, 'the intake figures'],
  [35, /ground-state/i, 'the ground-state condition'],
  [11, /in humans/i, 'the species condition'],
  [7, /germ cells/i, 'where in the organ meiosis happens'],
  [1, /which gland/i, 'the category the answer belongs to'],
];
NOT_IN_STEM.forEach(([id, re, label]) =>
  check(`3j Q${id} stem does not supply ${label}`, !re.test(byId(id).question), byId(id).question));

// ...and the qualification must be in the explanation instead.
const IN_EXPLANATION = [
  [5, /double-stranded/i, 'that Chargaff needs two strands'],
  [8, /monohybrid/i, 'which cross the F2 ratio comes from'],
  [4, /mosaicism/i, 'new mutation and germline mosaicism'],
  [24, /linkage|linked/i, 'why linkage does not change the answer'],
  [34, /fraction and concentration are not the same/i, 'fraction versus concentration'],
  [36, /additive/i, 'that the volumes are treated as additive'],
  [42, /NaBH/i, 'which reduction is meant'],
  [45, /Le Ch/i, 'that Le Chatelier applies at equilibrium'],
  [53, /25 ?\u00b0C/i, 'the temperature the pH 13 figure assumes'],
  [41, /164|96/, 'the masses used in the arithmetic'],
  [33, /Z = 11/, 'the atomic number of sodium'],
  [57, /incomplete/i, 'what incomplete combustion would change'],
  [55, /m\/m|without naming a unit/i, 'the concentration convention'],
  [20, /averages|varies widely/i, 'that 2500 mL is a textbook average'],
  [13, /inactive precursor/i, 'that pepsinogen is a zymogen'],
  [46, /conjugate base/i, 'that lactate is strictly the anion'],
  [51, /ionization/i, 'why ionization is defensible but imprecise'],
  [54, /phenolic/i, 'why the hydroxyl distractor is arguable'],
  [16, /same cross written in either order/i, 'that two options are the same cross'],
  [19, /NH4\+/, 'what the kidney actually excretes'],
  [29, /decondense|unwind/i, 'what relax means at telophase'],
];
IN_EXPLANATION.forEach(([id, re, label]) =>
  check(`3k Q${id} explanation covers ${label}`, re.test(plain(byId(id).explanation)),
    plain(byId(id).explanation).slice(0, 160)));

// Honest about ambiguity where the paper is genuinely loose.
[[46, /strictly/i], [51, /defensible/i], [54, /defensible/i], [45, /looseness/i], [20, /weakest part/i]]
  .forEach(([id, re]) => check(`3l Q${id} explanation names the ambiguity`, re.test(plain(byId(id).explanation))));

check('3m Q19 uses "excreted", not "secreted", in the stem',
  /excreted/i.test(byId(19).question) && !/secreted/i.test(byId(19).question));

// Explanations must no longer contain the specific false statements.
const FALSE_CLAIMS = [
  [10, /not implicated in any human or bovine disease/i, 'phages cause no human disease'],
  [12, /neither abduction nor adduction primarily changes the angle/i, 'abduction changes no angle'],
  [43, /highest common carbon oxidation state/i, 'carboxyl carbon is at carbon\'s highest oxidation state'],
  [48, /cannot function as a counter-?ion/i, 'hydroxide cannot be a counterion'],
  [55, /100 g as the denominator, which would be correct/i, '20 g in 100 g solvent is 20%'],
  [41, /roughly equals the oxygen in 1 mol/i, '53 g ≈ 96 g'],
  [24, /is therefore diploid/i, 'a gamete labelled diploid'],
  [28, /9&ndash;10 atoms|~9–10 atoms/i, 'bases have 9–10 atoms'],
  [26, /epidermis \+ dermis \+ hypodermis/i, 'hypodermis counted as skin'],
  [37, /misnames all three steps/i, 'option A misnames all three steps'],
  [2, /the only cellular event/i, 'codon–anticodon is the only RNA–RNA pairing'],
];
FALSE_CLAIMS.forEach(([id, re, label]) =>
  check(`4 Q${id} no longer claims: ${label}`, !re.test(byId(id).explanation)));

// ------------------------------------------------------------ editorial
// Spelling and grammar repairs that must stay repaired. "full blood" and
// "make less products" are deliberately NOT listed: they are the paper's own
// wording in Q3 and Q45, restored with the official text.
const TYPOS = ['occured', 'antikodon', 'quarternary', 'a mRNA', 'phenotype normal',
  'propane-2-ol', 'oxidised', 'catalysed', 'counselling'];
TYPOS.forEach(t => check(`5 "${t}" no longer appears`, !whole.toLowerCase().includes(t.toLowerCase())));
check('5z no question stem ends with a bare colon',
  !exam.some(q => q.question.trim().endsWith(':') && /^(which|what|how)\b/i.test(q.question.trim())),
  exam.filter(q => q.question.trim().endsWith(':')).map(q => q.id));

console.log(`mock-exam-2022: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
