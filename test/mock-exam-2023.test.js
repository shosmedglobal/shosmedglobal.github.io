/**
 * Integrity checks for the 2023 LF3 mock exam (shown to students as the
 * 2022/2023 cycle).
 *
 * Run:  node test/mock-exam-2023.test.js
 *
 * Same contract as the 2022 paper. The official question text is preserved:
 * this pass changed only notation (markup and HTML entities became real
 * characters) and the explanations. No stem, option or answer letter moved,
 * and the fixture in test/fixtures/ is the paper as it stood beforehand.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'functions', 'exam-data', 'mock-exam-2023.json');
const exam = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const OFFICIAL = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'fixtures', 'mock-exam-2023-official.json'), 'utf8'));

// LF3's published 2022/2023 answer key.
const OFFICIAL_KEY = 'BBCACDDACCBACDCACDBADDDAABCCBBBCCCDAABDDBDABDDCDBDADCDADCCCC';

let passed = 0;
const failures = [];
const check = (name, cond, detail) => {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail).slice(0, 220) : ''));
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
});

// ------------------------------------------------------ notation/markup
const ALLOWED_TAGS = /^(p|strong|em|sub|sup)$/;
exam.forEach(q => {
  ['question', 'explanation'].forEach(f => {
    const bad = [...q[f].matchAll(/<\/?([a-z]+)[^>]*>/gi)].map(m => m[1].toLowerCase())
      .filter(t => !ALLOWED_TAGS.test(t));
    check(`2a Q${q.id} ${f} uses only the expected tags`, bad.length === 0, bad);
  });
  check(`2b Q${q.id} has no HTML entity other than &lt;`,
    !/&(?!lt;)[a-z#0-9]+;/i.test(q.question + q.explanation + Object.values(q.options).join('')));
  check(`2c Q${q.id} options contain no markup`,
    !Object.values(q.options).some(v => /<[a-z/]/i.test(v)));
});
// Exponents and charges must be real characters so they survive being copied
// as plain text — the review saw "q2", "109" and "104" where q², 10⁹ and 10⁴
// were meant.
const whole = JSON.stringify(exam);
check('2d no digit superscripts left as markup', !/<sup>[\d+\-−]+<\/sup>/.test(whole),
  (whole.match(/<sup>[^<]*<\/sup>/g) || []).slice(0, 5));
check('2e no digit subscripts left as markup', !/<sub>[\d+\-−]+<\/sub>/.test(whole),
  (whole.match(/<sub>[^<]*<\/sub>/g) || []).slice(0, 5));

// ------------------------------------- the official question is preserved
// Normalize both sides to plain text: the fixture still carries <sub>/<sup>
// markup and HTML entities, the current file carries the equivalent real
// characters, and those must compare equal.
const ENTITIES = { '&beta;': 'β', '&alpha;': 'α', '&gamma;': 'γ', '&mu;': 'μ',
  '&pi;': 'π', '&ndash;': '-', '&mdash;': '-', '&prime;': '′', '&times;': 'x',
  '&divide;': '÷', '&rarr;': '->', '&radic;': '√', '&equiv;': '≡', '&deg;': '°',
  '&middot;': '·', '&gt;': '>', '&frac12;': '½', '&#8652;': '⇌', '&minus;': '-' };
const SUPER = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5',
  '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-',
  '⁽': '(', '⁾': ')', 'ⁿ': 'n' };
const SUB = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5',
  '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '-',
  '₍': '(', '₎': ')', 'ₙ': 'n', 'ₐ': 'a', 'ᵣ': 'r' };
function plain(s) {
  let out = String(s);
  for (const [k, v] of Object.entries(ENTITIES)) out = out.split(k).join(v);
  return out
    .replace(/<\/?(sub|sup|strong|em|p)>/g, '')
    .replace(/[⁰¹²³⁴-ⁿ]/g, ch => SUPER[ch] !== undefined ? SUPER[ch] : ch)
    .replace(/[₀-ₙᵣ]/g, ch => SUB[ch] !== undefined ? SUB[ch] : ch)
    .replace(/[−–—]/g, '-')
    .replace(/→/g, '->')
    .replace(/×/g, 'x')
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

exam.forEach(q => {
  check(`3a Q${q.id} stem is the official text`,
    plain(q.question) === plain(official(q.id).question),
    { now: plain(q.question), official: plain(official(q.id).question) });
  ['A', 'B', 'C', 'D'].forEach(L =>
    check(`3b Q${q.id} option ${L} is the official text`,
      plain(q.options[L]) === plain(official(q.id).options[L]),
      { now: plain(q.options[L]), official: plain(official(q.id).options[L]) }));
});

// ---------------------------------------------------- the review's fixes
// Each correction is pinned twice: the statement that must be there, and the
// claim it replaced, which must not come back.
const CORRECTIONS = [
  [7,  /telomerase also has reverse-transcriptase activity/i, /encoded by retroviruses such as HIV and by cellular telomerase/i,
    'telomerase has the activity; it does not encode the enzyme'],
  [13, /would apply if the father carried two disease-causing alleles/i, /embryonic-lethal/i,
    'homozygous Huntington disease is not embryonic-lethal'],
  [14, /Turner syndrome typically has one X chromosome, 45,X/i, /DMD, ATP7A/,
    'Turner is 45,X, and the gene list is gone'],
  [18, /dermis beneath it develops mainly from mesoderm/i, /neural crest-derived melanocytes/i,
    'melanocytes are not grouped with surface-ectoderm derivatives'],
  [29, /store fat <em>inside<\/em> the cells/i, /lipid-rich extracellular matrix/i,
    'fat is stored inside adipocytes'],
  [31, /propanal dissolves well but only to a limited extent/i, /fully miscible with water/i,
    'propanal is soluble, not miscible'],
  [31, /gives propan-1-ol, not acetone/i, /branched acetone/i,
    'acetone is not branched'],
  [41, /fatty acids normally esterified in fats have one/i, /short-chain dicarboxylic acid and never occurs/i,
    'the distinction is the number of carboxyl groups'],
  [44, /This structure is <strong>lysine<\/strong>/i, /L-lysine/,
    'the formula specifies no stereochemistry'],
  [47, /oxygen has 8 protons and sulfur has 16/i, /The proton count is a fact but does not directly explain/i,
    'option D is simply false'],
  [59, /In neutral water at 25 °C both concentrations would be 10⁻⁷/i, /Only true at pH 7/i,
    'option D states 10^-9, not the pH 7 case'],
  [11, /CVS is itself a biopsy of the placenta/i, /generic "biopsy" is not a defined obstetric procedure/i,
    'CVS is a placental biopsy, so the options overlap'],
  [11, /diagnostic<\/em> procedures rather than screening tests/i, null,
    'these are diagnostic rather than screening procedures'],
  [17, /means the pH of <strong>arterial blood<\/strong>/i, /not the normal physiological range/i,
    'the question means arterial blood'],
  [17, /extends above the normal range/i, /In the alkalotic zone/i,
    'option D extends above normal rather than being wholly abnormal'],
  [27, /the options overlap/i, /contains only the deepest tips/i,
    'the sweat-gland locations overlap'],
  [30, /a genuine medical term for cells of the immune response/i, /colloquial umbrella term/i,
    'immunocyte is a real term'],
  [33, /Human cells do metabolize some D-amino acids/i, /Trick answer/i,
    'the stem’s absolute claim is too broad'],
  [36, /can form an amide under suitable conditions/i, /Yields an amide \(N-methylbutanamide\)/i,
    'an amide forms only under suitable conditions'],
  [56, /far too high for the hydroxide concentration/i, /mis-applies Kw/i,
    'the distractor arithmetic is not overclaimed'],
];
CORRECTIONS.forEach(([id, present, absent, label]) => {
  check(`4a Q${id} states: ${label}`, present.test(byId(id).explanation),
    plain(byId(id).explanation).slice(0, 200));
  if (absent) check(`4b Q${id} no longer claims the opposite: ${label}`, !absent.test(byId(id).explanation));
});

// The four simplified explanations should have lost their technical ballast.
const SIMPLIFIED = [
  [2,  /L-Ala–D-Glu|m-DAP/,                         'peptide cross-bridge sequences'],
  [4,  /nucleolar organizer regions|18S, 5.8S/,     'NORs and rRNA species'],
  [22, /OAT1\/OAT3|OCT2|MATE/,                      'transporter names'],
  [28, /Schiff base|11-cis-retinal/,                'Schiff-base chemistry'],
];
SIMPLIFIED.forEach(([id, re, label]) =>
  check(`5a Q${id} explanation no longer carries ${label}`, !re.test(byId(id).explanation)));
[[2, /sugar chains cross-linked by short peptides/i], [4, /genes for ribosomal RNA/i],
 [22, /organic acids and organic bases/i], [28, /retinal bound to an opsin protein/i]]
  .forEach(([id, re]) => check(`5b Q${id} still teaches the tested concept`, re.test(byId(id).explanation)));

// Length guard: a simplified explanation should not quietly grow back.
[2, 4, 22, 28].forEach(id =>
  check(`5c Q${id} explanation stays short`, plain(byId(id).explanation).length < 900,
    plain(byId(id).explanation).length));

console.log(`mock-exam-2023: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
