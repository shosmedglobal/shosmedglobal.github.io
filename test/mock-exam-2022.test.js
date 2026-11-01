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

// ------------------------------------------------- the audit's findings
const byId = id => exam[id - 1];
check('3a Q46 option C names lactate as the conjugate base, not the acid itself',
  /conjugate base of 2-hydroxypropanoic acid/i.test(byId(46).options.C), byId(46).options.C);
check('3b Q46 no longer equates lactate with the acid',
  byId(46).options.C.trim() !== '2-hydroxypropanoic acid');
check('3c Q51 stem states a redox context', /redox/i.test(byId(51).question), byId(51).question);
check('3d Q51 no longer offers "ionization" as a distractor',
  !Object.values(byId(51).options).some(v => /ionization/i.test(v)), byId(51).options);
check('3e Q54 option D specifies a phenolic hydroxyl',
  /phenolic hydroxyl/i.test(byId(54).options.D), byId(54).options.D);
check('3f Q5 states the DNA is double-stranded', /double-stranded/i.test(byId(5).question));
check('3g Q8 states monohybrid and complete dominance',
  /monohybrid/i.test(byId(8).question) && /complete dominance/i.test(byId(8).question));
check('3h Q4 states its inheritance assumptions',
  /no new mutation/i.test(byId(4).question) && /mosaicism/i.test(byId(4).question));
check('3i Q24 states that the genes assort independently', /assort independently/i.test(byId(24).question));
check('3j Q34 fixes the total sulfur(IV) concentration', /fixed total/i.test(byId(34).question));
check('3k Q36 specifies (m/v) and a final volume',
  /\(m\/v\)/.test(byId(36).question) && /final volume/i.test(byId(36).question));
check('3l Q45 asks about equilibrium', /equilibrium/i.test(byId(45).question));
check('3m Q53 names real bases at a stated temperature',
  /NaOH/.test(byId(53).question) && /25\s*°C/.test(byId(53).question) && /NH₃/.test(byId(53).options.D));
check('3n Q16 asks for an example rather than the definition', /example of a testcross/i.test(byId(16).question));
check('3o Q16 has no duplicate option', new Set(Object.values(byId(16).options)).size === 4, byId(16).options);
check('3p Q20 gives the inputs instead of assuming a universal figure',
  /1500 mL/.test(byId(20).question) && /balance/i.test(byId(20).question));
check('3q Q13 calls pepsinogen an inactive precursor', /inactive precursor/i.test(byId(13).options.B));
check('3r Q19 uses "excreted", not "secreted"', /excreted/i.test(byId(19).question) && !/secreted/i.test(byId(19).question));
check('3s Q57 specifies complete combustion', /complete combustion/i.test(byId(57).question));
check('3t Q41 states the atomic masses it expects', /Ca = 40/.test(byId(41).question));
check('3u Q55 asks for mass percentage explicitly', /mass percentage/i.test(byId(55).question));

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
const TYPOS = ['occured', 'antikodon', 'quarternary', 'a mRNA', 'phenotype normal', 'full blood',
  'propane-2-ol', 'make less products', 'oxidised', 'catalysed', 'counselling'];
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
