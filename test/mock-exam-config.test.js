/**
 * Mock-exam library config: identifiers vs. display labels.
 *
 * Run:  node test/mock-exam-config.test.js
 *
 * `year` is the stable identifier — it keys data/mock-exams/mock-exam-<year>.json,
 * the attempt document under users/{uid}/mockExamAttempts/<year>, and the
 * ?year= URL parameter. Changing one would orphan every stored attempt, so
 * these tests pin the identifiers. `label` is the admissions cycle shown to
 * the user ("2021/2022"); the dashboard and the exam page must display that
 * and never the bare identifier.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC_CFG = path.join(ROOT, 'data', 'mock-exams', 'config.json');
const SERVER_CFG = path.join(ROOT, 'functions', 'exam-data', 'config.json');

let passed = 0;
const failures = [];
const check = (name, cond, detail) => {
  if (cond) { passed++; return; }
  failures.push(name + (detail !== undefined ? '  -> ' + JSON.stringify(detail).slice(0, 200) : ''));
};

const cfg = JSON.parse(fs.readFileSync(PUBLIC_CFG, 'utf8'));
const server = JSON.parse(fs.readFileSync(SERVER_CFG, 'utf8'));

// ------------------------------------------------------------ identifiers
const EXPECTED_IDS = ['2022', '2023', '2024', '2025'];
check('1a the public config lists exactly the known exam identifiers',
  JSON.stringify((cfg.years || []).map(y => y.year)) === JSON.stringify(EXPECTED_IDS),
  (cfg.years || []).map(y => y.year));
check('1b freeYear is one of them', EXPECTED_IDS.includes(cfg.freeYear), cfg.freeYear);
check('1c the server copy is byte-identical to the public one',
  fs.readFileSync(PUBLIC_CFG, 'utf8') === fs.readFileSync(SERVER_CFG, 'utf8'));
check('1d the server copy parses to the same object',
  JSON.stringify(server) === JSON.stringify(cfg));

(cfg.years || []).forEach(y => {
  check(`1e the question file for ${y.year} exists in data/`,
    fs.existsSync(path.join(ROOT, 'data', 'mock-exams', 'mock-exam-' + y.year + '.json')));
  check(`1f the question file for ${y.year} exists in functions/exam-data/`,
    fs.existsSync(path.join(ROOT, 'functions', 'exam-data', 'mock-exam-' + y.year + '.json')));
});

// -------------------------------------------- public copy stays in sync
// Students read the stems and options from data/mock-exams/, not from the
// functions bundle, so a content fix applied only to functions/exam-data/
// never reaches the exam. scripts/strip-mock-exams.js regenerates the
// public copy; these checks fail if someone forgets to run it.
const PUBLIC_SHAPE = ['id', 'section', 'question', 'options'];
(cfg.years || []).forEach(y => {
  const pubPath = path.join(ROOT, 'data', 'mock-exams', 'mock-exam-' + y.year + '.json');
  const srvPath = path.join(ROOT, 'functions', 'exam-data', 'mock-exam-' + y.year + '.json');
  if (!fs.existsSync(pubPath) || !fs.existsSync(srvPath)) return;
  const pub = JSON.parse(fs.readFileSync(pubPath, 'utf8'));
  const srv = JSON.parse(fs.readFileSync(srvPath, 'utf8'));

  check(`6a ${y.year}: both copies have the same number of questions`,
    pub.length === srv.length, { pub: pub.length, srv: srv.length });
  const stripped = srv.map(q => ({ id: q.id, section: q.section, question: q.question, options: q.options }));
  const drift = pub.map((q, i) => {
    const s = stripped[i];
    if (!s) return 'Q' + q.id + ' (no server counterpart)';
    const bad = [];
    if (q.question !== s.question) bad.push('stem');
    if (JSON.stringify(q.options) !== JSON.stringify(s.options)) bad.push('options');
    if (q.id !== s.id) bad.push('id');
    if (q.section !== s.section) bad.push('section');
    return bad.length ? 'Q' + s.id + ' ' + bad.join('+') : null;
  }).filter(Boolean);
  check(`6b ${y.year}: the public copy matches the server copy (run scripts/strip-mock-exams.js)`,
    drift.length === 0, drift.slice(0, 12));

  // And it must still leak nothing: no answer key, no explanation, no topic.
  check(`6c ${y.year}: the public copy carries no answer key or explanation`,
    pub.every(q => Object.keys(q).every(k => PUBLIC_SHAPE.includes(k))),
    [...new Set(pub.flatMap(q => Object.keys(q)))]);
});

// ----------------------------------------------------------------- labels
const EXPECTED_LABELS = {
  '2022': '2021/2022',
  '2023': '2022/2023',
  '2024': '2023/2024',
  '2025': '2024/2025',
};
(cfg.years || []).forEach(y => {
  check(`2a ${y.year} carries a label`, !!y.label, y);
  check(`2b ${y.year} is labelled ${EXPECTED_LABELS[y.year]}`,
    y.label === EXPECTED_LABELS[y.year], y.label);
  // A cycle label must end in its own identifier, so the label and the
  // paper it points at can never drift apart.
  check(`2c the ${y.year} label ends in its identifier`,
    /^\d{4}\/\d{4}$/.test(String(y.label)) && String(y.label).split('/')[1] === y.year, y.label);
  check(`2d the ${y.year} label spans consecutive years`,
    Number(String(y.label).split('/')[1]) - Number(String(y.label).split('/')[0]) === 1, y.label);
});
check('2e labels are unique', new Set((cfg.years || []).map(y => y.label)).size === (cfg.years || []).length);

// ------------------------------------------------------- what gets shown
// examLabel() is lifted straight out of dashboard.html and exercised here,
// so the dashboard's own mapping is what these tests cover.
const dash = fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8');
const fnSrc = dash.match(/function examLabel\(cfg, year\) \{[\s\S]*?\n    \}/);
check('3a dashboard.html defines examLabel()', !!fnSrc);
if (fnSrc) {
  // eslint-disable-next-line no-new-func
  const examLabel = new Function('return (' + fnSrc[0] + ')')();
  check('3b examLabel maps 2022 to its cycle', examLabel(cfg, '2022') === '2021/2022', examLabel(cfg, '2022'));
  check('3c examLabel maps 2025 to its cycle', examLabel(cfg, '2025') === '2024/2025', examLabel(cfg, '2025'));
  check('3d examLabel falls back to the bare year for an unknown one',
    examLabel(cfg, '2019') === '2019', examLabel(cfg, '2019'));
  check('3e examLabel tolerates a missing config', examLabel(null, '2022') === '2022');
  check('3f examLabel tolerates a missing year', examLabel(cfg, null) === '');
  check('3g examLabel falls back when an entry has no label',
    examLabel({ years: [{ year: '2030' }] }, '2030') === '2030');
}

// The library table must render the label, not the identifier.
check('4a the year cell renders the label',
  dash.includes("'<td class=\"cell-year\"><span class=\"year-num\">' + (y.label || y.year) + '</span></td>'"));
// User-facing year mentions in the Mock Exams view go through examLabel.
[
  "title.textContent = 'Take the ' + examLabel(cfg, nextYear) + ' exam next'",
  "'\" class=\"btn btn-primary\">Start ' + examLabel(cfg, nextYear) + ' Exam</a>'",
  "'You\\'ve done the free ' + examLabel(cfg, cfg.freeYear) + ' exam.",
  "examLabel(cfg, latest.year)",
  "'Start the free ' + examLabel(cfg, cfg.freeYear) + ' mock exam &rarr;'",
].forEach((snippet, i) =>
  check(`4b dashboard user-facing year #${i + 1} uses examLabel`, dash.includes(snippet), snippet));

// The identifier must still be what links and lookups use.
check('4c links still carry the identifier',
  dash.includes("'<a href=\"practice-exam.html?year=' + encodeURIComponent(y.year)"));
check('4d attempts are still keyed by the identifier', dash.includes('attempts[y.year]'));
check('4e the free-year test still compares identifiers', dash.includes('y.year === cfg.freeYear'));

const pe = fs.readFileSync(path.join(ROOT, 'practice-exam.html'), 'utf8');
check('5a practice-exam.html defines mockExamLabel()', /function mockExamLabel\(\)/.test(pe));
check('5b the post-exam upsell names the cycle',
  (pe.match(/on the free " \+ mockExamLabel\(\) \+ " exam/g) || []).length === 2);
check('5c the admin review banner names the cycle', pe.includes('esc(mockExamLabel())'));
check('5d the "not taken" message names the cycle',
  pe.includes("'This user has not taken the ' + mockExamLabel() + ' mock exam.'"));
check('5e no user-facing string in practice-exam.html prints the bare identifier',
  !/mockExamYear \+ " exam|esc\(mockExamYear\)|mockExamYear \+ ' mock exam/.test(pe));
check('5f practice-exam.html still loads questions by identifier',
  pe.includes('"data/mock-exams/mock-exam-" + mockExamYear + ".json'));
check('5g practice-exam.html still stores the attempt under the identifier',
  pe.includes('.doc(mockExamYear)'));

console.log(`mock-exam-config: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
