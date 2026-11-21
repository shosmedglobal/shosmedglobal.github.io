/**
 * Study plan chapter reader: who may copy a chapter.
 *
 * Run:  node test/study-reader-copy.test.js
 *
 * Until 20 November 2026 the reader blocked copy, right-click, drag and
 * Ctrl+C for EVERYONE, admins included, and was the one product surface the
 * exam copy guard did not cover. It now follows the same rule as the QBank
 * and the mock exams: admins may copy, everyone else may not, reviewers
 * included.
 *
 * Two things here are easy to break and expensive to notice:
 *
 *   1. The reader's text must stay SELECTABLE even when guarded, because the
 *      chapter highlighter works off a selection. Blocking the event is the
 *      whole of the protection, so a handler that stops being wired, or stops
 *      being gated, is the failure mode.
 *   2. The watermark must survive, and must name the user the chapter is
 *      being shown TO. During impersonation that is the target, not the
 *      admin -- otherwise the admin's own address is stamped onto someone
 *      else's chapter.
 *
 * The protection block is an IIFE inside dashboard.html, so it is extracted
 * and run here against stubs rather than reimplemented.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const DASH = fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8');
const GUARD = fs.readFileSync(path.join(ROOT, 'exam-copy-guard.js'), 'utf8');
const WATERMARK = fs.readFileSync(path.join(ROOT, 'content-watermark.js'), 'utf8');

let passed = 0;
const failures = [];
const check = (name, cond, detail) => {
  if (cond) { passed++; return; }
  failures.push(name + (detail === undefined ? '' : '  [got: ' + JSON.stringify(detail) + ']'));
};

/* ------------------------------------------------- extract the IIFE ---- */
const MARK = '// ===== Study Reader Content Protection =====';
const iMark = DASH.indexOf(MARK);
check('0a the protection block is still in dashboard.html', iMark > 0);
const iOpen = DASH.indexOf('(function() {', iMark);
let depth = 0, iEnd = -1;
for (let i = DASH.indexOf('{', iOpen); i < DASH.length; i++) {
  if (DASH[i] === '{') depth++;
  else if (DASH[i] === '}') { depth--; if (depth === 0) { iEnd = i + 1; break; } }
}
check('0b and brace-matches', iEnd > iOpen);
const BLOCK = DASH.slice(iOpen, iEnd) + ')();';

/* ------------------------------------------------------------ stubs ---- */
/* A canvas good enough for content-watermark.js: it measures text, scales,
   and records every string drawn so the test can assert WHOSE email the
   watermark carries. */
function makeCanvas(drawn) {
  return {
    width: 0, height: 0, style: {},
    getContext: () => ({
      scale() {}, clearRect() {}, save() {}, translate() {}, rotate() {}, restore() {},
      measureText: t => ({ width: t.length * 6 }),
      fillText: t => drawn.push(t),
      set font(v) {}, set fillStyle(v) {}, set textAlign(v) {}, set textBaseline(v) {}
    }),
    toDataURL: () => 'data:image/png;base64,AA'
  };
}

function makeEnv() {
  const drawn = [];
  const bodyClasses = new Set();
  const listeners = { content: {}, view: {}, document: {} };
  const mk = bag => ({
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      contains(c) { return this._s.has(c); },
      toggle(c, on) { on ? this._s.add(c) : this._s.delete(c); }
    },
    style: {},
    attrs: {},
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; },
    removeAttribute(k) { delete this.attrs[k]; },
    getContext: () => null,
    addEventListener(t, fn) { (bag[t] = bag[t] || []).push(fn); }
  });
  const readerContent = mk(listeners.content);
  const readerView = mk(listeners.view);
  readerContent.getContext = undefined;

  const els = {
    spReaderContent: readerContent,
    studyReaderView: readerView,
    spScreenshotFlash: mk({}),
    spProtectionNotice: mk({})
  };

  let authCb = null;
  const win = {
    _impersonatedProfile: null,
    getSelection: () => ({ isCollapsed: true, rangeCount: 0 })
  };
  const body = {
    classList: {
      add: c => bodyClasses.add(c), remove: c => bodyClasses.delete(c),
      contains: c => bodyClasses.has(c),
      toggle: (c, on) => (on ? bodyClasses.add(c) : bodyClasses.delete(c))
    }
  };
  const document = {
    readyState: 'complete', body,
    getElementById: id => els[id] || null,
    createElement: () => makeCanvas(drawn),
    addEventListener(t, fn) { (listeners.document[t] = listeners.document[t] || []).push(fn); }
  };
  win.document = document;

  const ctx = {
    window: win, document, globalThis: win,
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    firebase: {
      auth: () => ({
        currentUser: ctx.__currentUser || null,
        onAuthStateChanged: cb => { authCb = cb; }
      })
    },
    setTimeout: () => {},
    console
  };
  ctx.global = ctx;
  vm.createContext(ctx);
  vm.runInContext(GUARD, ctx);        // the real guard, same as the page
  vm.runInContext(WATERMARK, ctx);    // the real shared watermark module
  vm.runInContext(BLOCK, ctx);        // the real protection block

  const fire = (bag, type, ev) => {
    let prevented = false;
    const e = Object.assign({ preventDefault: () => { prevented = true; } }, ev);
    (bag[type] || []).forEach(fn => fn(e));
    return prevented;
  };

  return {
    win, ctx, bodyClasses, drawn,
    signIn(email, impersonating) {
      ctx.__currentUser = email ? { email } : null;
      win._impersonatedProfile = impersonating ? { email: impersonating } : null;
      if (authCb) authCb(ctx.__currentUser);
    },
    copy: () => fire(listeners.content, 'copy', {}),
    contextmenu: () => fire(listeners.content, 'contextmenu', {}),
    dragstart: () => fire(listeners.content, 'dragstart', {}),
    key(k, mods = {}) {
      readerView.classList.add('active');
      return fire(listeners.view, 'keydown', Object.assign({ key: k, ctrlKey: true }, mods));
    },
    wired: {
      copy: (listeners.content.copy || []).length,
      contextmenu: (listeners.content.contextmenu || []).length,
      dragstart: (listeners.content.dragstart || []).length,
      keydown: (listeners.view.keydown || []).length
    },
    notice: () => els.spProtectionNotice.style.display,
    watermarked: () => els.spReaderContent.classList.contains('watermarked'),
    bg: () => els.spReaderContent.style.backgroundImage || ''
  };
}

/* --------------------------------------------------- 1. it is wired ---- */
{
  const e = makeEnv();
  check('1a copy is handled on the reader', e.wired.copy === 1, e.wired);
  check('1b right-click is handled', e.wired.contextmenu === 1, e.wired);
  check('1c drag is handled', e.wired.dragstart === 1, e.wired);
  check('1d keyboard is handled', e.wired.keydown === 1, e.wired);
  check('1e before any sign-in the chapter is already closed', e.copy());
  check('1f and the allow class is absent', !e.bodyClasses.has('exam-copy-allowed'));
}

/* --------------------------------------------------- 2. who may copy --- */
const PEOPLE = [
  ['an admin', 'eli@shosmed.com', null, true],
  ['another admin', 'elizolotov@gmail.com', null, true],
  ['an admin with a capitalised address', 'Eli@ShosMed.com', null, true],
  ['the LF3 reviewer', 'jana.fauknerova@lf3.cuni.cz', null, false],
  ['a paying applicant', 'student@example.com', null, false],
  ['nobody signed in', '', null, false],
  // "See what they see": while impersonating, the target's rights apply.
  ['an admin viewing as a student', 'eli@shosmed.com', 'student@example.com', false],
  ['an admin viewing as another admin', 'eli@shosmed.com', 'contact@shosmed.com', true]
];
for (const [label, email, impersonating, mayCopy] of PEOPLE) {
  const e = makeEnv();
  e.signIn(email, impersonating);
  check('2 ' + label + ' -> ' + (mayCopy ? 'may copy' : 'blocked'), e.copy() === !mayCopy, { blocked: e.copy() });
  check('2 ' + label + ': right-click matches', e.contextmenu() === !mayCopy);
  check('2 ' + label + ': drag matches', e.dragstart() === !mayCopy);
  check('2 ' + label + ': Ctrl+C matches', e.key('c') === !mayCopy);
  check('2 ' + label + ': Ctrl+A matches', e.key('a') === !mayCopy);
  check('2 ' + label + ': the body class matches', e.bodyClasses.has('exam-copy-allowed') === mayCopy);
}

/* ------------------------------- 3. what is NOT released for an admin -- */
{
  const e = makeEnv();
  e.signIn('eli@shosmed.com', null);
  check('3a print stays blocked even for an admin', e.key('p'));
  check('3b save stays blocked', e.key('s'));
  check('3c view-source stays blocked', e.key('u'));
  check('3d an unmodified key is not touched', !e.key('c', { ctrlKey: false }));
}

/* ------------------------------------------- 4. the watermark survives - */
{
  const e = makeEnv();
  e.signIn('student@example.com', null);
  check('4a a chapter is watermarked for a regular user', e.watermarked());
  check('4b with a generated background image', e.bg().startsWith('url("data:image/png'));
  check('4c and the protection notice is shown', e.notice() === '');
}
{
  const e = makeEnv();
  e.signIn('eli@shosmed.com', null);
  check('4d an admin is watermarked too: copying does not mean unbranded', e.watermarked());
}
{
  // The email the watermark is drawn with is the EFFECTIVE one, asserted via
  // the strings the canvas was actually asked to draw.
  const e = makeEnv();
  const drawn = e.drawn;
  e.signIn('eli@shosmed.com', 'student@example.com');
  check('4e while impersonating, the watermark names the TARGET',
    drawn.length > 0 && drawn.every(t => t.includes('student@example.com')), drawn);
  check('4f and never the admin', drawn.every(t => !t.includes('eli@shosmed.com')), drawn);
}

/* ------------------------------------------------- 5. page and guard --- */
check('5a the guard treats the reader as a protected region',
  /EXAM_ROOTS\s*=\s*'[^']*\.sp-reader-content/.test(GUARD));
check('5b dashboard.html loads the guard stylesheet',
  /<link\b[^>]*href="exam-copy-guard\.css/.test(DASH));
const scriptAt = DASH.search(/<script\b[^>]*src="exam-copy-guard\.js/);
check('5c dashboard.html loads the guard script', scriptAt !== -1);
const tag = scriptAt === -1 ? '' : DASH.slice(scriptAt, DASH.indexOf('>', scriptAt) + 1);
check('5d synchronously, not async', scriptAt !== -1 && !/\basync\b/.test(tag), tag);
// Search the code, not the comments: dashboard.html NAMES the call in an
// HTML comment right above the tag, and a comment calls nothing.
const DASH_CODE = DASH.replace(/<!--[\s\S]*?-->/g, m => ' '.repeat(m.length));
check('5e and before the inline script that calls apply()',
  scriptAt !== -1 && scriptAt < DASH_CODE.indexOf('SHOSExamCopy.apply'));
check('5e2 the call is real code, not only a comment',
  DASH_CODE.indexOf('SHOSExamCopy.apply') !== -1);

/* The reader must stay selectable for the highlighter: a well-meaning
   user-select:none on .sp-reader-content would silently kill highlighting. */
// Every user-select declaration on the element itself must say `text`, all
// four vendor spellings of it. Checking only one lets the other three be
// flipped silently, which is enough to kill highlighting on that browser.
// The ::before watermark pseudo-element is excluded on purpose: it says
// `none` so the repeated email cannot be selected along with the prose.
{
  // `.sp-reader-content`, optionally with further classes (.watermarked) and
  // a pseudo-element. A `::` in the suffix means it is not the element.
  const rules = [...DASH.matchAll(/\.sp-reader-content([\w.:-]*)\s*\{([^}]*)\}/g)];
  const onElement = rules.filter(m => !m[1].includes('::')).map(m => m[2]);
  const decls = onElement.flatMap(b => [...b.matchAll(/(?:-\w+-)?user-select\s*:\s*([a-z]+)/g)].map(d => d[1]));
  check('5f the reader content declares selectability at all', decls.length >= 4, decls);
  check('5f2 and every one of those declarations is `text`',
    decls.length > 0 && decls.every(v => v === 'text'), decls);
  const onBefore = rules.filter(m => m[1].includes('::')).map(m => m[2]).join('');
  check('5f3 while the watermark itself stays unselectable',
    /user-select\s*:\s*none/.test(onBefore));
}

/* The admin list must not drift from the one the rest of the page uses. */
const lists = [...DASH.matchAll(/ADMIN_EMAILS\s*=\s*(\[[^\]]*\])/g)]
  .map(m => JSON.parse(m[1].replace(/'/g, '"')).map(x => x.toLowerCase()).sort().join(','));
check('5g every ADMIN_EMAILS list in dashboard.html agrees',
  lists.length > 1 && new Set(lists).size === 1, lists.length ? [...new Set(lists)] : 'none found');
check('5h and the chapter policy uses one of them',
  /SP_ADMIN_EMAILS\s*=\s*\[/.test(DASH) && lists.length >= 2);

/* The firestore rules are the server-side twin of that list. */
const RULES = fs.readFileSync(path.join(ROOT, 'firestore.rules'), 'utf8');
for (const email of ['eli@shosmed.com', 'contact@shosmed.com', 'privacy@shosmed.com', 'elizolotov@gmail.com']) {
  check('5i firestore.rules still knows ' + email, RULES.includes(email));
}

console.log('study-reader-copy: ' + passed + ' passed, ' + failures.length + ' failed');
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
