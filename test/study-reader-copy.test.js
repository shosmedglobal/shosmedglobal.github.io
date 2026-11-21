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
      measureText: t => ({ width: t.length * 8 }),
      fillText: t => drawn.push(t),
      set font(v) {}, set fillStyle(v) {}, set textAlign(v) {}, set textBaseline(v) {}
    }),
    toDataURL: () => 'data:image/png;base64,AA'
  };
}

/* A plain element, for the inert overlay the watermark appends. */
function makeNode() {
  return {
    style: {}, attrs: {}, children: [], className: '',
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; },
    removeAttribute(k) { delete this.attrs[k]; },
    appendChild(c) { this.children.push(c); c.parentNode = this; return c; },
    removeChild(c) {
      const i = this.children.indexOf(c);
      if (i >= 0) this.children.splice(i, 1);
      return c;
    }
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
    /* A chapter column, several screens long: the watermark measures the
       area to decide between one mark and one per screenful. */
    clientWidth: 760, clientHeight: 4200,
    offsetWidth: 760, offsetHeight: 4200,
    children: [], className: '',
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; },
    removeAttribute(k) { delete this.attrs[k]; },
    appendChild(c) { this.children.push(c); c.parentNode = this; return c; },
    removeChild(c) {
      const i = this.children.indexOf(c);
      if (i >= 0) this.children.splice(i, 1);
      return c;
    },
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
    innerHeight: 760,
    getSelection: () => ({ isCollapsed: true, rangeCount: 0 }),
    getComputedStyle: () => ({ position: 'static' }),
    addEventListener: () => {}
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
    createElement: tag => (tag === 'canvas' ? makeCanvas(drawn) : makeNode()),
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
    noticeText: () => els.spProtectionNotice.textContent || '',
    watermarked: () => els.spReaderContent.classList.contains('watermarked'),
    /* The mark is an overlay appended to the chapter, not a background on
       the chapter itself: opaque callout boxes inside a chapter would
       otherwise cut a single diagonal into pieces. */
    overlays: () => els.spReaderContent.children.filter(
      c => c.className === 'shos-watermark'),
    overlayCss: () => {
      const ov = els.spReaderContent.children.find(
        c => c.className === 'shos-watermark');
      return (ov && ov.style.cssText) || '';
    }
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
  check('4b by exactly one inert overlay', e.overlays().length === 1, e.overlays().length);
  check('4c carrying a generated image, not text',
    /background-image:url\("data:image\/png/.test(e.overlayCss()), e.overlayCss());
  check('4d it adds nothing the highlighter can see: the overlay holds no text '
    + 'and cannot be selected, so stored highlight offsets are untouched',
    /user-select:none/.test(e.overlayCss()) && /pointer-events:none/.test(e.overlayCss()));
  check('4e a chapter is longer than a screenful, so the mark repeats',
    /background-repeat:repeat/.test(e.overlayCss()), e.overlayCss());
  check('4f and the protection notice is shown', e.notice() === '');
}
{
  const e = makeEnv();
  e.signIn('eli@shosmed.com', null);
  check('4g an admin is watermarked too: copying does not mean unbranded', e.watermarked());
  check('4h and the notice says copying is on for admins',
    /Copying is enabled for admins/.test(e.noticeText()), e.noticeText());
}
{
  const e = makeEnv();
  e.signIn('student@example.com', null);
  check('4i a guarded reader is told the content is protected',
    /Content protected/.test(e.noticeText()), e.noticeText());
}
{
  // The email the watermark is drawn with is the EFFECTIVE one, asserted via
  // the strings the canvas was actually asked to draw.
  const e = makeEnv();
  const drawn = e.drawn;
  e.signIn('eli@shosmed.com', 'student@example.com');
  check('4j while impersonating, the watermark names the TARGET',
    drawn.length > 0 && drawn.every(t => t.includes('student@example.com')), drawn);
  check('4k and never the admin', drawn.every(t => !t.includes('eli@shosmed.com')), drawn);
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

/* ============================================================== 6 =======
 * Dragging to select, which is the only way to copy a paragraph.
 *
 * Reported 20 November 2026: an admin could not copy chapter text on the
 * live site even though the guard said copying was allowed. The guard was
 * never the problem. #spReaderContent has a mouseup handler that turns any
 * deliberate drag into a highlight, and spApplyHighlight() finishes with
 * sel.removeAllRanges(). So the drag that selects a paragraph destroyed its
 * own selection before the user could press Ctrl+C, and the clipboard kept
 * whatever had been in it before. Right-click > Copy failed identically.
 *
 * A triple-click does NOT reproduce it (the pointer does not move, so the
 * dx/dy test short-circuits), which is why it survived the earlier live
 * check. These run the real handler with the pointer moved.
 * ==================================================================== */
const iMU = DASH.indexOf("getElementById('spReaderContent').addEventListener('mouseup'");
check('6a the reader still turns a drag into a highlight', iMU > 0);
const iArrow = DASH.indexOf('(e) => {', iMU);
let d2 = 0, iFnEnd = -1;
for (let i = DASH.indexOf('{', iArrow); i < DASH.length; i++) {
  if (DASH[i] === '{') d2++;
  else if (DASH[i] === '}') { d2--; if (d2 === 0) { iFnEnd = i + 1; break; } }
}
check('6b and its handler brace-matches', iFnEnd > iArrow);
const MOUSEUP_SRC = DASH.slice(iArrow, iFnEnd);

/** Run the real mouseup handler for one role and report what it did.
 *  `moved` false models a triple-click (pointer never moves). */
function drag(allowed, moved) {
  let highlighted = 0;
  let cleared = false;
  const ctx = {
    spJustRemovedHighlight: false,
    spMouseDownPos: { x: 100, y: 200 },
    spReaderState: { hlColor: 'yellow' },
    spApplyHighlight: function () { highlighted++; cleared = true; },
    document: {
      body: { classList: { contains: c => c === 'exam-copy-allowed' && allowed } }
    },
    window: {
      getSelection: () => ({
        isCollapsed: false,
        toString: () => 'Prokaryotes are the oldest, smallest and most abundant organisms.'
      })
    }
  };
  ctx.global = ctx;
  vm.createContext(ctx);
  vm.runInContext(
    'var h = ' + MOUSEUP_SRC + ';\n' +
    'h({ clientX: ' + (moved ? 700 : 101) + ', clientY: 203, target: { closest: () => null } });',
    ctx
  );
  // The selection survives exactly when no highlight was applied.
  return { highlighted, selectionSurvived: !cleared };
}

const adminDrag = drag(true, true);
check('6c an admin who drags is left with the selection intact',
  adminDrag.selectionSurvived, adminDrag);
check('6d and so has something for Ctrl+C and right-click > Copy to take',
  adminDrag.highlighted === 0, adminDrag);

const studentDrag = drag(false, true);
check('6e a guarded reader still gets the highlight on drag',
  studentDrag.highlighted === 1, studentDrag);

const adminClick = drag(true, false);
check('6f a bare click highlights for nobody', adminClick.highlighted === 0);
check('6g including a guarded one', drag(false, false).highlighted === 0);

/* The admin's route to a highlight is the Color menu, which applies the
   chosen colour to whatever is selected. If that goes, admins lose
   highlighting altogether rather than just losing it on drag. */
check('6h a colour swatch still applies to the live selection',
  /sp-hl-swatch[\s\S]{0,600}?spApplyHighlight\(spReaderState\.hlColor\)/.test(DASH));

/* And the reader says which of the two behaviours is in force. */
check('6i the notice tells an admin that copying is on',
  /notice\.textContent\s*=\s*isAdmin/.test(DASH)
  && /Copying is enabled for admins/.test(DASH));
check('6j and still says "content protected" to everyone else',
  /Content protected\. Personal watermark applied\./.test(DASH));
check('6k no em dash reached the reader notice',
  !/[—].{0,80}watermark applied/i.test(DASH));

/* The admin's only remaining route to a highlight is the Color menu, and a
   mousedown on a plain element collapses the document selection before the
   click lands. Without preventDefault on these three the menu would act on
   nothing, which would leave admins unable to highlight at all. */
const hlBlock = (/spHlBtn[\s\S]*?spHlClear[\s\S]{0,400}?\}\);/.exec(DASH) || [''])[0];
check('6l opening the colour menu keeps the selection',
  /spHlBtn'\)\.addEventListener\('mousedown', e => e\.preventDefault\(\)\)/.test(DASH));
check('6m choosing a colour keeps the selection it is about to use',
  /sp-hl-swatch[\s\S]{0,600}?addEventListener\('mousedown', e => e\.preventDefault\(\)\)/.test(DASH));
check('6n and so does clearing one',
  /spHlClear'\)\.addEventListener\('mousedown', e => e\.preventDefault\(\)\)/.test(DASH));
check('6o the swatch still applies the colour on click',
  /sp-hl-swatch[\s\S]{0,900}?spApplyHighlight\(spReaderState\.hlColor\)/.test(DASH));

console.log('study-reader-copy: ' + passed + ' passed, ' + failures.length + ' failed');
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
