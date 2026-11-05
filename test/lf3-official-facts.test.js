/**
 * Pins the LF3 programme facts that come from Charles University, not from us.
 *
 * Run:  node test/lf3-official-facts.test.js
 *
 * Source of truth: the official SIS entry for General Medicine
 * (M0912A350009), Third Faculty of Medicine, Charles University.
 * Checked against SIS on 2026-11-04.
 *
 * These figures are scattered across marketing pages, the dashboard and the
 * blog, which is how they drifted in the first place: tuition sat at the
 * 420,000 CZK rate in three places, one blog post claimed the exam had
 * "roughly 100 questions" while the whole QBank is built on 60, and the
 * application fee appeared as ~30 EUR in one post and ~940 CZK in the
 * dashboard. None of that is visible from any single file, so it is checked
 * across all of them at once.
 *
 * When LF3 publishes a new rate, update OFFICIAL below and the failures tell
 * you every file that has to change.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const OFFICIAL = {
  tuitionCZK: 440000,
  applicationFeeCZK: 2000,
  // The rate the cost blog declares it converts at. Every USD figure derived
  // from a CZK one has to use this, or the two drift apart.
  czkPerUSD: 22,
  questions: 60,
  biology: 30,
  chemistry: 30,
  optionsPerQuestion: 4,
};

const usd = czk => Math.round(czk / OFFICIAL.czkPerUSD);

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail === undefined ? '' : `  [got: ${JSON.stringify(detail)}]`));
}

// Every user-facing page. study/ is excluded: it is chapter material whose
// numbers belong to physics and biology problems, not to LF3 admissions.
function pages(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'study', 'functions', 'test', 'data', 'scripts'].includes(entry.name)) continue;
      pages(p, acc);
    } else if (entry.name.endsWith('.html')) {
      acc.push(path.relative(ROOT, p).replace(/\\/g, '/'));
    }
  }
  return acc;
}

const FILES = pages(ROOT);
const TEXT = new Map(FILES.map(f => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]));

check('0 the page sweep found the main pages',
  ['index.html', 'applicants.html', 'lf3.html', 'dashboard.html', 'community.html']
    .every(f => FILES.includes(f)), FILES.length);

// ---------------------------------------------------------------------------
// 1. Superseded figures must not come back anywhere.
//
// Each entry is the stale claim and what replaced it, so a failure explains
// itself without a trip to the git log.
// ---------------------------------------------------------------------------
const SUPERSEDED = [
  ['420,000 CZK', 'tuition is now 440,000 CZK/year'],
  ['420000 CZK', 'tuition is now 440,000 CZK/year'],
  ['18,500', 'tuition in USD is now ~$20,000'],
  ['19,100', 'the dollar figures are rounded at 22 CZK/$, so tuition is ~$20,000'],
  ['$111,000', '6-year tuition is now ~$120,000'],
  ['$111K', '6-year tuition is now ~$120K'],
  ['$115,000', '6-year tuition is now ~$120,000'],
  ['$115K', '6-year tuition is now ~$120K'],
  ['$87', 'the application fee in USD is rounded to ~$90'],
  ['23 CZK per dollar', 'the declared rate is now 22 CZK per dollar'],
  ['30 EUR', 'the application fee is 2,000 CZK, not ~30 EUR'],
  ['940 CZK', 'the application fee is 2,000 CZK, not ~940 CZK'],
  ['roughly 100 questions', 'the exam is 60 questions'],
  ['around 100 questions', 'the exam is 60 questions'],
  ['multiple correct answers', 'every question has exactly one correct answer'],
  ['campus in Prague', 'the exam also runs outside the Czech Republic and online'],
  ['sit the exam in Prague', 'the exam also runs outside the Czech Republic and online'],
  ['in-person Biology and Chemistry entrance exam', 'the exam is not Prague-only in person'],
];

for (const [stale, why] of SUPERSEDED) {
  const hits = FILES.filter(f => TEXT.get(f).includes(stale));
  check(`1 "${stale}" appears nowhere (${why})`, hits.length === 0, hits);
}

// ---------------------------------------------------------------------------
// 2. The current figures are actually published, and the USD conversions
//    match the CZK ones at the rate the site says it uses.
// ---------------------------------------------------------------------------
const TUITION_USD = usd(OFFICIAL.tuitionCZK);          // 20,000 exactly at 22 CZK/$
const FEE_USD = usd(OFFICIAL.applicationFeeCZK);       // 91 -> shown rounded as ~$90

check('2a the tuition USD figure is the round one on the site',
  TUITION_USD === 20000, TUITION_USD);
check('2b the application-fee USD figure rounds to the one on the site',
  Math.round(FEE_USD / 10) * 10 === 90, FEE_USD);
check('2c the declared rate in the cost blog is the one used here',
  TEXT.get('blog/charles-university-tuition-2026-cost-breakdown.html')
    .includes(`${OFFICIAL.czkPerUSD} CZK per dollar`));

const tuitionCZKPages = FILES.filter(f => TEXT.get(f).includes('440,000 CZK'));
check('2d tuition in CZK is published on the pages that quote a rate',
  ['community.html', 'dashboard.html', 'applicants.html'].every(f => tuitionCZKPages.includes(f)),
  tuitionCZKPages);

// Any page that names a yearly tuition in dollars must name the current one.
// Scoped to figures actually labelled as per-year, so unrelated costs in the
// same range (USMLE fees, moving costs) are not swept up.
// The pages also quote US and Caribbean yearly costs in the same range, so a
// match only counts as LF3 tuition when LF3 is named nearby.
const YEARLY_USD = /\$([12][0-9],[0-9]{3})(?![0-9])(?=(?:<[^>]*>|[^.<]){0,40}(?:per year|per academic year|\/year|\/yr|a year))/g;
// Sentence scope, not a character window: a nearby "Charles University" in
// the previous sentence is not what makes a dollar figure LF3 tuition.
const IS_LF3 = /LF3|Charles University|Third Faculty/;
const sentences = html => html
  .replace(/<[^>]*>/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .split(/(?<=[.!?:])\s+/);
for (const f of FILES) {
  const found = new Set();
  for (const s of sentences(TEXT.get(f))) {
    if (!IS_LF3.test(s)) continue;
    for (const m of s.matchAll(YEARLY_USD)) found.add(m[1]);
  }
  const wrong = [...found].filter(v => v !== '20,000');
  check(`2e ${f} quotes no superseded yearly LF3 tuition`, wrong.length === 0, wrong);
}

const feePages = FILES.filter(f => /2,000 CZK/.test(TEXT.get(f)));
check('2f the 2,000 CZK application fee is published',
  feePages.length > 0, feePages);
for (const f of feePages) {
  check(`2g ${f} pairs the fee with its dollar equivalent`,
    TEXT.get(f).includes('$90'));
}

// The dollar figures the site shows are round, not raw conversions. Rounding
// is the point: a number like $19,130 reads as precise and goes stale with
// the exchange rate, while $20,000 reads as the estimate it is.
check('2h the published tuition figure is round to the nearest $1,000',
  TUITION_USD % 1000 === 0, TUITION_USD);

// Every place the site quotes LF3 tuition, pinned verbatim. The sentence
// sweep above cannot do this on its own: "About $20,183 per year" sits in a
// sentence that never names LF3, so only the pin catches an unrounded figure
// creeping back in.
const TUITION_COPY = {
  'applicants.html': [
    'MD program. About $20,000 per year.',
    'About <strong>$20,000 per year</strong> (440,000 CZK)',
  ],
  'lf3.html': ['~$20,000<span style="font-size:0.95rem;">/yr</span>'],
  'community.html': [
    "tuition is 440,000 CZK/year, which is about $20,000. Over 6 years that's around $120,000 in tuition.",
  ],
  'dashboard.html': [
    'Approximately 440,000 CZK / year (~$20,000 USD)',
    '<strong>~440,000 CZK (~$20,000 USD)</strong>',
  ],
  'blog/charles-university-tuition-2026-cost-breakdown.html': [
    '<h3>Tuition: ~$20,000 per year (~$120K total)</h3>',
    '440,000 CZK per academic year, approximately $20,000',
    'The full 6-year program is about $120,000 in tuition.',
  ],
};
for (const [f, snippets] of Object.entries(TUITION_COPY)) {
  for (const s of snippets) {
    check(`2i ${f} quotes tuition as "${s.slice(0, 44)}..."`,
      TEXT.has(f) && TEXT.get(f).includes(s));
  }
}

// ---------------------------------------------------------------------------
// 3. Exam shape: 60 questions, 30 per subject, four options, one correct.
//    This has to agree with the four mock exams, which are the product.
// ---------------------------------------------------------------------------
for (const year of [2022, 2023, 2024, 2025]) {
  const exam = JSON.parse(fs.readFileSync(
    path.join(ROOT, 'functions', 'exam-data', `mock-exam-${year}.json`), 'utf8'));
  check(`3a mock-exam-${year} has ${OFFICIAL.questions} questions`,
    exam.length === OFFICIAL.questions, exam.length);
  const count = s => exam.filter(q => q.section === s).length;
  check(`3b mock-exam-${year} has ${OFFICIAL.biology} biology and ${OFFICIAL.chemistry} chemistry`,
    count('Biology') === OFFICIAL.biology && count('Chemistry') === OFFICIAL.chemistry,
    { Biology: count('Biology'), Chemistry: count('Chemistry') });
  check(`3c mock-exam-${year} offers ${OFFICIAL.optionsPerQuestion} options per question`,
    exam.every(q => Object.keys(q.options).length === OFFICIAL.optionsPerQuestion));
  check(`3d mock-exam-${year} has exactly one correct answer per question`,
    exam.every(q => typeof q.correct === 'string' && /^[A-D]$/.test(q.correct)));
}

// The sentences that actually describe the exam's shape to an applicant are
// pinned verbatim. A loose numeric sweep cannot do this job: "a total of 60"
// and "a total of 100" are equally well-formed English, so the only way to
// notice the second is to have written down the first.
const EXAM_SHAPE = {
  'blog/mcat-vs-charles-university-entrance-exam.html':
    'with 30 Biology and 30 Chemistry questions for a total of 60; each has four '
    + 'options and exactly one correct answer',
  'blog/lf3-entrance-exam-what-is-on-it.html':
    'Biology and Chemistry, with 30 questions in each, for a total of 60',
  'applicants.html': '<strong>60 MCQs</strong> (30 Biology + 30 Chemistry)',
  'practice-exam.html':
    '<strong>Format:</strong> 60 questions, 4 options each. Exactly one correct answer per question.',
  'dashboard.html': 'Biology (30 MCQ) + Chemistry (30 MCQ) = <strong>60 questions</strong>',
};
for (const [f, sentence] of Object.entries(EXAM_SHAPE)) {
  check(`3e ${f} describes the exam as ${OFFICIAL.biology}+${OFFICIAL.chemistry}=${OFFICIAL.questions}`,
    TEXT.has(f) && TEXT.get(f).includes(sentence));
}

// Prose that states a question count has to state the right one.
for (const f of FILES) {
  const t = TEXT.get(f);
  const claims = [...t.matchAll(/(?:total of|There are|are|is)\s+(\d{2,3})\s+(?:MCQs|questions)/gi)]
    .map(m => Number(m[1]));
  const wrong = claims.filter(n => n !== OFFICIAL.questions);
  check(`3f ${f} states the exam length correctly where it states one`,
    wrong.length === 0, wrong);
}

// ---------------------------------------------------------------------------
// 4. House style: no em dashes in the copy we have rewritten.
// ---------------------------------------------------------------------------
const REWRITTEN = [
  'community.html', 'applicants.html', 'lf3.html',
  'blog/charles-university-tuition-2026-cost-breakdown.html',
  'blog/lf3-entrance-exam-what-is-on-it.html',
  'blog/mcat-vs-charles-university-entrance-exam.html',
];
const EM_DASH_LINES = {
  // Paragraphs rewritten in this change, by their opening words. Older
  // paragraphs on the same pages still carry &mdash; and are out of scope.
  'blog/charles-university-tuition-2026-cost-breakdown.html': [
    'They quote tuition, about $20,000 a year',
  ],
};
for (const [f, snippets] of Object.entries(EM_DASH_LINES)) {
  for (const s of snippets) {
    const line = TEXT.get(f).split('\n').find(l => l.includes(s));
    check(`4 ${f}: "${s.slice(0, 30)}..." uses no em dash`,
      line !== undefined && !line.includes('&mdash;') && !line.includes('—'));
  }
}
check('4a every rewritten file was found', REWRITTEN.every(f => FILES.includes(f)));

console.log(`lf3-official-facts: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
