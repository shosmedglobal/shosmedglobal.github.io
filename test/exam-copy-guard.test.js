/**
 * Tests for the exam copy guard.
 *
 * Run:  node test/exam-copy-guard.test.js
 *
 * Staff may select and copy the questions, options and explanations of exams
 * they have taken. Everyone else may not. The QBank and the four mock exams
 * are the product, so the thing that must never regress is the DEFAULT: a
 * page where the role check has not run, or has failed, must be guarded, not
 * open.
 *
 * That default is the reason this file exists. The obvious implementation,
 * "add a class when the user is not staff", looks identical in the happy
 * path and is wrong in exactly the case that matters.
 *
 * The module is written for a browser, so the DOM pieces it touches are
 * stubbed here rather than pulling in a DOM library.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'exam-copy-guard.js'), 'utf8');
const CSS = fs.readFileSync(path.join(ROOT, 'exam-copy-guard.css'), 'utf8');

let passed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(name + (detail === undefined ? '' : `  [got: ${JSON.stringify(detail)}]`));
}

// --------------------------------------------------------------- stub DOM
function makeEnv({ readyState = 'complete' } = {}) {
  const classes = new Set();
  const listeners = {};
  const body = {
    classList: {
      add: c => classes.add(c),
      remove: c => classes.delete(c),
      contains: c => classes.has(c),
      toggle: (c, on) => (on ? classes.add(c) : classes.delete(c)),
    },
  };
  // A selection that reports which selector its ancestor matches.
  let selection = { isCollapsed: true, rangeCount: 0 };
  const win = {
    getSelection: () => selection,
    document: null,
  };
  const document = {
    readyState,
    body,
    addEventListener: (t, fn) => { (listeners[t] = listeners[t] || []).push(fn); },
  };
  win.document = document;
  const ctx = { window: win, document, globalThis: win };
  ctx.global = ctx;
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx);
  return {
    api: win.SHOSExamCopy,
    classes,
    listeners,
    fireReady: () => (listeners.DOMContentLoaded || []).forEach(f => f()),
    /** Put a selection inside (or outside) an exam region. */
    select(matches) {
      selection = {
        isCollapsed: false,
        rangeCount: 1,
        getRangeAt: () => ({
          commonAncestorContainer: {
            nodeType: 1,
            closest: sel => (sel === win.SHOSExamCopy.EXAM_ROOTS && matches ? {} : null),
          },
        }),
      };
    },
    collapse() { selection = { isCollapsed: true, rangeCount: 0 }; },
    /** Returns true when the copy was blocked. */
    copy({ inInput = false } = {}) {
      let prevented = false;
      const target = {
        nodeType: 1,
        closest: sel => (sel.includes('contenteditable') ? (inInput ? {} : null) : null),
      };
      win.SHOSExamCopy._onCopyOrCut({ target, preventDefault: () => { prevented = true; } });
      return prevented;
    },
  };
}

// ------------------------------------------------------- 1. the default
{
  const e = makeEnv({ readyState: 'complete' });
  check('1a loading the script guards the page immediately', e.classes.has('exam-copy-guarded'));
  check('1b and does not allow copying', !e.classes.has('exam-copy-allowed'));
  e.select(true);
  check('1c a copy inside an exam is blocked before any role check runs', e.copy());
}
{
  const e = makeEnv({ readyState: 'loading' });
  check('1d on a still-loading page it waits for DOMContentLoaded',
    !e.classes.has('exam-copy-guarded'));
  e.fireReady();
  check('1e then guards', e.classes.has('exam-copy-guarded'));
}

// --------------------------------------------------- 2. roles that apply
const ROLES = [
  ['nobody signed in', {}, false],
  ['a free user', { isAdmin: false, isReviewer: false }, false],
  ['a paying applicant', { isAdmin: false, isReviewer: false }, false],
  ['an admin', { isAdmin: true, isReviewer: false }, true],
  ['a reviewer', { isAdmin: false, isReviewer: true }, true],
  ['undefined role object', undefined, false],
  // Guards against a truthy non-boolean slipping through, e.g. a string
  // from a query parameter or a half-loaded profile.
  ['isAdmin as the string "false"', { isAdmin: 'false' }, false],
  ['isAdmin as 1', { isAdmin: 1 }, false],
];
for (const [label, role, expectAllowed] of ROLES) {
  const e = makeEnv();
  const got = e.api.apply(role);
  check(`2 ${label} -> ${expectAllowed ? 'may copy' : 'blocked'}`, got === expectAllowed, got);
  check(`2 ${label} sets exactly one body class`,
    e.classes.has('exam-copy-allowed') !== e.classes.has('exam-copy-guarded'));
  check(`2 ${label} class matches the decision`,
    e.classes.has('exam-copy-allowed') === expectAllowed);
}

// ------------------------------------------------- 3. what gets blocked
{
  const e = makeEnv();
  e.api.apply({ isAdmin: false });
  e.select(true);
  check('3a guarded: copy inside an exam is blocked', e.copy());
  e.select(false);
  check('3b guarded: copy elsewhere on the page is untouched', !e.copy());
  e.collapse();
  check('3c guarded: a collapsed selection is not interfered with', !e.copy());
  e.select(true);
  check('3d guarded: copying out of an input still works',
    !e.copy({ inInput: true }));
}
{
  const e = makeEnv();
  e.api.apply({ isAdmin: true });
  e.select(true);
  check('3e staff: copy inside an exam goes through', !e.copy());
}
// Re-applying must be able to close the door again, not just open it.
{
  const e = makeEnv();
  e.api.apply({ isAdmin: true });
  e.api.apply({ isAdmin: false });
  e.select(true);
  check('3f dropping from staff to guarded re-blocks', e.copy());
  check('3g and clears the allow class', !e.classes.has('exam-copy-allowed'));
}

// ---------------------------------------------- 4. handlers and wiring
{
  const e = makeEnv();
  e.api.apply({ isAdmin: false });
  e.api.apply({ isAdmin: false });
  e.api.apply({ isAdmin: true });
  check('4a copy/cut are each bound exactly once, however often apply runs',
    (e.listeners.copy || []).length === 1 && (e.listeners.cut || []).length === 1,
    [(e.listeners.copy || []).length, (e.listeners.cut || []).length]);
}

// ------------------------------------------------------------ 5. the CSS
check('5a guarded blocks selection on the mock exam', /body\.exam-copy-guarded[^{]*\.q-text-rev/.test(CSS));
check('5b staff get selectable question text', /body\.exam-copy-allowed[^{]*#questionText/.test(CSS));
check('5c staff get selectable options', /body\.exam-copy-allowed[^{]*\.review-option\b/.test(CSS));
check('5d staff get selectable explanations', /body\.exam-copy-allowed[^{]*\.review-explanation/.test(CSS));
// Printing was never part of the ask, and the print block in qbank.css is a
// separate protection. The guard must not quietly open a print route.
// Comments are stripped: the file explains why it leaves printing alone, and
// saying so is not doing so.
const CSS_RULES = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
check('5e the guard does not touch printing', !/@media\s+print/.test(CSS_RULES));

// --------------------------------------------- 6. both exam pages load it
for (const page of ['qbank.html', 'practice-exam.html']) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
  // Match the real tags, not the filename anywhere in the file: both pages
  // also NAME the module in a comment, and a comment loads nothing.
  const linkAt = src.search(/<link\b[^>]*href="exam-copy-guard\.css/);
  const scriptAt = src.search(/<script\b[^>]*src="exam-copy-guard\.js/);
  check(`6a ${page} loads the stylesheet`, linkAt !== -1);
  check(`6b ${page} loads the script`, scriptAt !== -1);
  check(`6c ${page} applies the real role flags`,
    /SHOSExamCopy\.apply\(\{ isAdmin, isReviewer \}\)/.test(src));
  // The script must have executed before apply() is called. Source order is
  // NOT the test: practice-exam.html deliberately puts its app script above
  // the libraries and runs init() on DOMContentLoaded, which fires after
  // every classic script in the document. What would actually break that is
  // `async`, which detaches execution from document order entirely.
  const tag = scriptAt === -1 ? '' : src.slice(scriptAt, src.indexOf('>', scriptAt) + 1);
  check(`6d ${page} loads the guard synchronously, not async`,
    scriptAt !== -1 && !/\basync\b/.test(tag), tag);
  // Belt and braces: wherever the call site sits above the tag, the call has
  // to be deferred to DOMContentLoaded or later rather than run at parse.
  const useAt = src.indexOf('SHOSExamCopy.apply');
  check(`6e ${page} does not call apply() at parse time above the tag`,
    useAt > scriptAt || /DOMContentLoaded/.test(src), [scriptAt, useAt]);
}

// The exam roots the handler checks must be the containers the pages use.
check('7a .qbank-section is a real container in qbank.html',
  /class="[^"]*qbank-section/.test(fs.readFileSync(path.join(ROOT, 'qbank.html'), 'utf8'))
  || /qbank-section/.test(fs.readFileSync(path.join(ROOT, 'qbank.css'), 'utf8')));
check('7b .exam-app is a real container in practice-exam.html',
  /class="exam-app"/.test(fs.readFileSync(path.join(ROOT, 'practice-exam.html'), 'utf8')));

console.log(`exam-copy-guard: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
