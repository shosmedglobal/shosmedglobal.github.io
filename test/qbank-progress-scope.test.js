/* The Overview tab's QBank Progress bar.
 *
 * `total` has always been scoped to the subjects the user selected, but
 * `uniqueAnswered` counted every answered question id. A user who had worked
 * through physics with the Include-Physics toggle OFF therefore saw
 *
 *     1,393 / 1,114        100%
 *
 * i.e. more answered than the pool contains. This suite runs the real
 * renderQbankTotals() out of dashboard.html against a stub DOM and Firestore
 * so the numerator, the denominator and the scope label are checked together.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8');

let checks = 0, failures = 0;
const ok = (cond, label) => {
  checks++;
  if (!cond) { failures++; console.log('  FAIL ' + label); }
};
const eq = (got, want, label) => ok(got === want, label + '  [got: ' + JSON.stringify(got) + ' want: ' + JSON.stringify(want) + ']');

/* ---- bank sizes come from the banks themselves, not from constants ---- */
const main = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions.json'), 'utf8'));
const phys = JSON.parse(fs.readFileSync(path.join(ROOT, 'questions-physics.json'), 'utf8'));
const COUNTS = { biology: main.biology.length, chemistry: main.chemistry.length, physics: phys.physics.length };
const CORE = COUNTS.biology + COUNTS.chemistry;
const ALL = CORE + COUNTS.physics;

/* ---- extract the real function body from dashboard.html ---- */
const START = 'async function renderQbankTotals(tests) {';
const iStart = html.indexOf(START);
ok(iStart > 0, 'renderQbankTotals is still defined in dashboard.html');
let depth = 0, iEnd = -1;
for (let i = iStart + START.length - 1; i < html.length; i++) {
  if (html[i] === '{') depth++;
  else if (html[i] === '}') { depth--; if (depth === 0) { iEnd = i + 1; break; } }
}
ok(iEnd > iStart, 'and its body brace-matches');
const source = html.slice(iStart, iEnd);

/* ---- stubs ---- */
function makeEnv(opts) {
  const els = {};
  /* textContent coerces to a string in a real DOM, so the stub must too --
     the renderer assigns a Number to #statQuestionsPerDay. */
  const el = id => (els[id] = els[id] || (() => {
    let text = '';
    const e = { id, style: {}, checked: false };
    Object.defineProperty(e, 'textContent', {
      get: () => text,
      set: v => { text = String(v); },
      enumerable: true
    });
    return e;
  })());
  ['overviewProgressText', 'overviewProgressBar', 'overviewProgressPct', 'qbankScopeLabel',
    'statQuestionsLeft', 'statQuestionsPerDay', 'includePhysicsToggle'].forEach(el);

  const profile = { path: opts.path || 'applicant' };
  if (typeof opts.includePhysics === 'boolean') profile.qbankIncludePhysics = opts.includePhysics;

  const completed = {};
  for (const id of (opts.answered || [])) completed[id] = { correct: true, date: '2026-01-01' };

  const doc = name => ({
    get: async () => name === 'profile'
      ? { exists: true, data: () => profile }
      : { exists: opts.progressDocExists !== false, data: () => ({ completedQuestions: completed }) },
    collection: () => ({ doc: () => doc('progress') })
  });

  return {
    els,
    window: { _qbankCounts: { ...COUNTS }, _examDaysLeft: opts.daysLeft || 0 },
    document: { getElementById: id => els[id] || null },
    auth: { currentUser: { uid: 'u1' } },
    db: { collection: () => ({ doc: () => doc('profile') }) }
  };
}

async function run(opts) {
  const env = makeEnv(opts);
  const fn = new Function('window', 'document', 'auth', 'db',
    'return (' + source.replace(/^async function renderQbankTotals/, 'async function') + ')');
  await fn(env.window, env.document, env.auth, env.db)(opts.tests);
  return {
    text: env.els.overviewProgressText.textContent,
    pct: env.els.overviewProgressPct.textContent,
    bar: env.els.overviewProgressBar.style.width,
    label: env.els.qbankScopeLabel.textContent,
    left: env.els.statQuestionsLeft.textContent,
    perDay: env.els.statQuestionsPerDay.textContent,
    toggle: env.els.includePhysicsToggle.checked
  };
}

const bio = n => Array.from({ length: n }, (_, i) => 'bio-' + (i + 1));
const chem = n => Array.from({ length: n }, (_, i) => 'chem-' + (i + 1));
const ph = n => Array.from({ length: n }, (_, i) => 'phys-' + (i + 1));
const fmt = n => n.toLocaleString('en-US');

(async () => {
  console.log('qbank-progress-scope');

  /* 1. the reported defect: every core question done, plus most of physics,
        with the physics toggle OFF. */
  {
    const r = await run({ includePhysics: false, answered: [...bio(COUNTS.biology), ...chem(COUNTS.chemistry), ...ph(279)] });
    eq(r.text, fmt(CORE) + ' / ' + fmt(CORE), '1. physics off: answered is capped to the core pool, not ' + fmt(CORE + 279));
    ok(!r.text.startsWith('1,393'), '1. and it is no longer the 1,393 / 1,114 the user saw');
    eq(r.pct, '100%', '1. the percentage is 100');
    eq(r.left, '0', '1. and nothing is left');
  }

  /* 2. same answers, toggle ON: physics now counts on both sides. */
  {
    const r = await run({ includePhysics: true, answered: [...bio(COUNTS.biology), ...chem(COUNTS.chemistry), ...ph(279)] });
    eq(r.text, fmt(CORE + 279) + ' / ' + fmt(ALL), '2. physics on: both sides include physics');
    eq(r.left, '1', '2. one physics question is left');
  }

  /* 3. a partial run; physics answers must not inflate a core-only bar. */
  {
    const a = { includePhysics: false, answered: [...bio(10), ...chem(5), ...ph(7)] };
    const r = await run(a);
    eq(r.text, '15 / ' + fmt(CORE), '3. physics off: 7 physics answers are excluded');
    const r2 = await run({ ...a, includePhysics: true });
    eq(r2.text, '22 / ' + fmt(ALL), '3. physics on: the same 7 are included');
  }

  /* 4. the scope label */
  {
    const off = await run({ includePhysics: false, answered: [] });
    const on = await run({ includePhysics: true, answered: [] });
    eq(off.label, 'Biology + Chemistry · ' + fmt(CORE) + ' questions', '4. the subjects are spelled out in full');
    eq(on.label, 'Biology + Chemistry + Physics · ' + fmt(ALL) + ' questions', '4. and with physics on');
    for (const l of [off.label, on.label]) {
      ok(!/Bio \+ Chem/.test(l), '4. no abbreviated "Bio + Chem"');
      ok(!/LF3 syllabus/.test(l), '4. and no "(LF3 syllabus)" parenthetical');
      ok(!/—/.test(l), '4. and no em dash');
    }
  }

  /* 5. the legacy fallback (accounts with no progress doc) filters too. */
  {
    const r = await run({
      includePhysics: false, progressDocExists: false,
      tests: [{ questionIds: [...bio(4), ...ph(9)] }, { questionIds: [...bio(4), ...chem(2)] }]
    });
    eq(r.text, '6 / ' + fmt(CORE), '5. the questionIds fallback excludes physics and de-duplicates');
  }

  /* 6. the toggle default follows the user path when no preference is stored */
  {
    const applicant = await run({ path: 'applicant', answered: [] });
    const student = await run({ path: 'student', answered: [] });
    eq(applicant.toggle, false, '6. applicants default to physics off');
    eq(student.toggle, true, '6. students default to physics on');
    eq(applicant.label, 'Biology + Chemistry · ' + fmt(CORE) + ' questions', '6. and the label follows the default');
  }

  /* 7. pacing still works off the scoped remainder */
  {
    const r = await run({ includePhysics: false, answered: [...bio(COUNTS.biology), ...ph(100)], daysLeft: 10 });
    eq(r.left, fmt(COUNTS.chemistry), '7. questions-left counts only the unanswered core');
    eq(r.perDay, String(Math.ceil(COUNTS.chemistry / 10)), '7. and per-day pacing uses it');
  }

  /* 8. the markup's static fallback label matches what the renderer writes */
  {
    const m = /<span id="qbankScopeLabel"[^>]*>([^<]*)<\/span>/.exec(html);
    ok(!!m, '8. the scope label span is still in the markup');
    eq(m && m[1], 'Biology + Chemistry', '8. and its pre-render text is spelled out too');
    ok(!/Bio \+ Chem/.test(html), '8. no "Bio + Chem" remains anywhere in dashboard.html');
    ok(!/LF3 syllabus\) ·/.test(html), '8. and no "(LF3 syllabus) ·" label remains');
  }

  console.log(checks + ' checks, ' + failures + ' failure(s)');
  if (failures) process.exit(1);
})().catch(e => { console.log('  FAIL threw: ' + e.stack); process.exit(1); });
