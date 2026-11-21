/**
 * The shared content watermark.
 *
 * Run:  node test/content-watermark.test.js
 *
 * Rewritten 20 November 2026. The first version tiled a small HORIZONTAL
 * email every 20px and painted it onto each element in turn, including every
 * answer choice, so that a crop of any single line carried an address. It
 * did. It also made the pages hard to read, and that cost is not one the
 * watermark is allowed to impose. The rules now are:
 *
 *   1. ONE area, ONE mark. An area is a question card, a review block or a
 *      chapter. Nothing is painted per answer choice.
 *   2. The mark repeats only when the area is taller than a screenful, and
 *      then roughly once per screenful.
 *   3. It is tilted 45 degrees, in light gray.
 *   4. It is an inert OVERLAY with no text in it. Opaque children (answer
 *      choices, explanation panes, callout boxes) would otherwise cut a
 *      background-image mark into pieces, and any element carrying text
 *      inside the content would shift the offsets both highlighters store.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'content-watermark.js'), 'utf8');

let passed = 0;
const failures = [];
const check = (n, c, d) => {
  if (c) { passed++; return; }
  failures.push(n + (d === undefined ? '' : '  [got: ' + JSON.stringify(d) + ']'));
};

const CHAR_W = 10;   // the stub's measureText, per character

/* ------------------------------------------------------------- stubs --- */
function makeEnv(opts) {
  const o = opts || {};
  const calls = { draws: [], rotate: [], scale: [], created: 0, sizes: [] };
  const canvasFor = () => {
    calls.created++;
    const c = {
      width: 0, height: 0,
      getContext: () => {
        let fontPx = 22;      // text measures proportionally to the type size
        return {
          scale: (x, y) => calls.scale.push([x, y]),
          rotate: a => calls.rotate.push(a),
          translate() {}, clearRect() {}, save() {}, restore() {},
          measureText: t => ({ width: Math.round(t.length * CHAR_W * fontPx / 22) }),
          fillText: (t, x, y) => calls.draws.push({ t, x, y }),
          set font(v) {
            calls.font = v;
            const m = /(\d+)px/.exec(v);
            if (m) fontPx = Number(m[1]);
          },
          set fillStyle(v) { calls.fillStyle = v; },
          set textAlign(v) {}, set textBaseline(v) {}
        };
      },
      toDataURL: () => 'data:image/png;base64,' + (c.width + 'x' + c.height)
    };
    return c;
  };
  const win = {
    devicePixelRatio: o.dpr === undefined ? 1 : o.dpr,
    innerHeight: o.vh === undefined ? 700 : o.vh,
    getComputedStyle: el => ({ position: (el && el._position) || 'static' }),
    addEventListener: () => {}
  };
  const ctx = {
    window: win, globalThis: win, setTimeout: () => 0, clearTimeout: () => {},
    document: {
      createElement: tag => (tag === 'canvas' ? canvasFor() : el()),
      querySelectorAll: () => [],
      body: {}
    }
  };
  ctx.global = ctx;
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx);
  return { api: win.SHOSWatermark, calls, ctx };
}

/** A DOM element good enough for paint(): size, children, style, attributes. */
function el(w, h) {
  return {
    clientWidth: w || 0, clientHeight: h || 0,
    offsetWidth: w || 0, offsetHeight: h || 0,
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

const EMAIL = 'student@example.com';         // 19 chars -> 190px at CHAR_W 10
const CARD_W = 760;

/* ------------------------------------------------- 1. one mark, tilted - */
{
  const e = makeEnv();
  const card = el(CARD_W, 320);
  check('1a a question card is marked', e.api.paint(card, EMAIL) === true);
  check('1b exactly one overlay is added', card.children.length === 1, card.children.length);

  const ov = card.children[0];
  check('1c the email is drawn once, not tiled across the card',
    e.calls.draws.length === 1, e.calls.draws.length);
  check('1d and it is the email', e.calls.draws[0].t === EMAIL);
  check('1e tilted 45 degrees', Math.abs(e.calls.rotate[0]) === Math.PI / 4, e.calls.rotate);
  check('1f rising to the right', e.calls.rotate[0] < 0, e.calls.rotate[0]);
  check('1g the overlay does not repeat on a short area',
    /background-repeat:no-repeat/.test(ov.style.cssText), ov.style.cssText);
  check('1h and sits in the middle of it',
    /background-position:center center/.test(ov.style.cssText));
  check('1j a repeating area starts its grid at the top, so the first mark is '
    + 'whole rather than sliced by the top edge', (() => {
      const tall = el(CARD_W, 4000);
      e.api.paint(tall, EMAIL);
      return /background-position:center top/.test(tall.children[0].style.cssText);
    })());

  // Painting again replaces the overlay rather than stacking another on top.
  e.api.paint(card, EMAIL);
  check('1i re-painting does not stack overlays', card.children.length === 1, card.children.length);
}

/* ----------------------------------- 2. once per screenful when long --- */
{
  const e = makeEnv({ vh: 800 });                 // screenful = 720
  const pitch = e.api.screenful();
  check('2a a screenful tracks the viewport', pitch === 720, pitch);

  const short = el(CARD_W, pitch);                 // exactly one screen
  e.api.paint(short, EMAIL);
  check('2b an area of one screenful gets a single mark',
    /background-repeat:no-repeat/.test(short.children[0].style.cssText));

  const chapter = el(CARD_W, pitch * 6);           // a long chapter
  e.api.paint(chapter, EMAIL);
  const css = chapter.children[0].style.cssText;
  check('2c a long area repeats instead', /background-repeat:repeat/.test(css), css);
  const size = /background-size:(\d+)px (\d+)px/.exec(css);
  check('2d and the vertical pitch is one screenful',
    size && Number(size[2]) === pitch, size && size[2]);
  check('2e so a six-screen chapter carries about six marks',
    Math.round((pitch * 6) / Number(size[2])) === 6);

  // The boundary is forgiving, so an area a little over one screen is not
  // suddenly marked twice.
  const slightlyTall = el(CARD_W, Math.round(pitch * 1.1));
  e.api.paint(slightlyTall, EMAIL);
  check('2f an area just over one screenful still gets a single mark',
    /background-repeat:no-repeat/.test(slightlyTall.children[0].style.cssText));
}

/* ------------------------------------------- 3. readable, not shouty --- */
{
  const e = makeEnv();
  const CFG = e.api.CFG;
  const alpha = Number(/rgba\([^)]*,\s*([\d.]+)\s*\)/.exec(CFG.COLOR)[1]);
  check('3a it is faint', alpha <= 0.25, alpha);
  check('3b but not invisible', alpha >= 0.1, alpha);
  check('3c in gray, not a colour', (() => {
    const [r, g, b] = /rgba\((\d+),\s*(\d+),\s*(\d+)/.exec(CFG.COLOR).slice(1).map(Number);
    return Math.max(r, g, b) - Math.min(r, g, b) <= 45;
  })(), CFG.COLOR);
  check('3d the type is big enough to read when looked for', CFG.FONT_PX >= 18, CFG.FONT_PX);
  check('3e the tilt is 45 degrees', Math.abs(CFG.ANGLE_DEG) === 45, CFG.ANGLE_DEG);
}

/* -------------------------------------- 4. an inert, text-free layer --- */
{
  const e = makeEnv();
  const card = el(CARD_W, 300);
  e.api.paint(card, EMAIL);
  const ov = card.children[0];

  check('4a the overlay carries no text at all',
    ov.textContent === undefined && !('innerHTML' in ov.attrs), Object.keys(ov.attrs));
  check('4b so nothing inside the content gains a text node',
    card.children.filter(c => c.className !== e.api.CLASS).length === 0);
  check('4c the email is in a background image, never in the DOM',
    /background-image:url\("data:image\/png/.test(ov.style.cssText));
  check('4d clicks pass straight through', /pointer-events:none/.test(ov.style.cssText));
  check('4e it cannot be selected, so it never lands in a copy',
    /user-select:none/.test(ov.style.cssText));
  check('4f and screen readers skip it', ov.attrs['aria-hidden'] === 'true');
  check('4g it is above the content, where opaque children cannot hide it',
    /position:absolute/.test(ov.style.cssText) && /z-index:[1-9]/.test(ov.style.cssText));
  check('4h the area becomes the containing block', card.style.position === 'relative');

  const positioned = el(CARD_W, 300);
  positioned._position = 'relative';
  e.api.paint(positioned, EMAIL);
  check('4i an already positioned area is left alone',
    positioned.style.position === undefined, positioned.style.position);

  e.api.clear(card);
  check('4j clear removes the overlay', card.children.length === 0);
  check('4k and the marker attribute', card.getAttribute(e.api.ATTR) === null);
}

/* ------------------------------------------------- 5. whose email ------ */
{
  const e = makeEnv();
  const a = el(CARD_W, 300), b = el(CARD_W, 300);
  e.api.paint(a, 'one@b.com');
  e.api.paint(b, 'two@b.com');
  check('5a each area is drawn with the email it was given',
    e.calls.draws.map(d => d.t).join() === 'one@b.com,two@b.com', e.calls.draws.map(d => d.t));
  check('5b the area records whose it is', a.getAttribute(e.api.ATTR) === 'one@b.com');

  const before = e.calls.created;
  e.api.paint(el(CARD_W, 300), 'one@b.com');
  check('5c an identical tile is reused rather than redrawn',
    e.calls.created === before, [before, e.calls.created]);

  check('5d no email, no mark', e.api.paint(el(CARD_W, 300), '') === false);
  check('5e no area, no mark', e.api.paint(null, EMAIL) === false);
  check('5f an unmeasurable area is skipped', e.api.paint(el(0, 0), EMAIL) === false);
}

/* ------------------------------------- 6. narrow columns and phones ---- */
{
  const e = makeEnv({ vh: 740 });
  const CFG = e.api.CFG;

  const phone = el(320, 300);
  const p = e.api.plan(phone, 'a.very.long.address@university.example.edu');
  check('6a a long address in a phone column is shrunk, not cropped',
    p.font < CFG.FONT_PX && p.font >= CFG.MIN_FONT_PX, p);
  check('6b and its tile still fits the column', p.tw <= 320, p);

  const phoneLong = el(360, 4000);
  const q = e.api.plan(phoneLong, EMAIL);
  check('6c a scrolled phone column tiles at its own width, so the mark is '
    + 'never pushed off the side', q.tw <= 360, q);

  const wide = el(1600, 4000);
  const r = e.api.plan(wide, EMAIL);
  check('6d a wide column caps the horizontal pitch rather than spreading out',
    r.tw === CFG.MAX_TILE_W, r);

  const normal = e.api.plan(el(CARD_W, 300), EMAIL);
  check('6e a normal card uses the full size', normal.font === CFG.FONT_PX, normal);
}

/* --------------------------------------------------- 7. paintAll ------- */
{
  const e = makeEnv();
  const a = el(CARD_W, 300), b = el(CARD_W, 300);
  const root = el(CARD_W, 900);
  root.querySelectorAll = () => [a, b];
  root.matches = () => false;
  check('7a paintAll marks every area', e.api.paintAll(root, '.quiz-card', EMAIL) === 2);

  const selfMatching = el(CARD_W, 300);
  selfMatching.querySelectorAll = () => [];
  selfMatching.matches = () => true;
  check('7b the root itself is marked when it matches',
    e.api.paintAll(selfMatching, '.quiz-card', EMAIL) === 1);
  check('7c without an email nothing is marked',
    e.api.paintAll(root, '.quiz-card', '') === 0);
}

/* ---------------------------------- 8. redraw on resize and rotate ----- */
{
  const e = makeEnv();
  const a = el(CARD_W, 300);
  e.api.paint(a, EMAIL);
  e.ctx.document.querySelectorAll = () => [a];
  check('8a refresh re-marks everything already marked', e.api.refresh() === 1);
  check('8b using the email that area was marked with',
    e.calls.draws[e.calls.draws.length - 1].t === EMAIL);
  check('8c and a resize is wired to it', /addEventListener\('resize'/.test(SRC));
  check('8d debounced, so a drag does not redraw per pixel',
    /clearTimeout\(resizeTimer\)/.test(SRC));
}

/* ------------------------------------------------- 9. retina ----------- */
{
  const e1 = makeEnv({ dpr: 1 }), e2 = makeEnv({ dpr: 2 }), e4 = makeEnv({ dpr: 4 });
  e1.api.paint(el(CARD_W, 300), EMAIL);
  e2.api.paint(el(CARD_W, 300), EMAIL);
  e4.api.paint(el(CARD_W, 300), EMAIL);
  check('9a at 1x the canvas is not scaled up', e1.calls.scale[0][0] === 1);
  check('9b at 2x it is drawn double size', e2.calls.scale[0][0] === 2);
  check('9c and capped at 2x so the data URL stays small', e4.calls.scale[0][0] === 2);
}

/* ------------------------- 9b. areas that are hidden when painted ------ */
/* Found on the live site, not in a test: the mock exam builds its ENTIRE
   results review while the results view is still display:none, so every
   block measured zero and none of the 60 was marked. The old watermark was
   a per-element background and never measured anything, so this could not
   happen to it; deciding one mark against one per screenful can. An area
   that cannot be measured is remembered and retried once it has a size. */
{
  const e = makeEnv();
  const timers = [];
  e.ctx.setTimeout = fn => { timers.push(fn); return timers.length; };
  e.ctx.window.requestAnimationFrame = fn => { timers.push(fn); return 1; };
  // Re-run the module so it picks up those two.
  vm.runInContext(SRC, e.ctx);
  const api = e.ctx.window.SHOSWatermark;

  const hidden = el(0, 0);          // display:none measures zero
  hidden.isConnected = true;
  check('9b-a a hidden area reports that it was not marked yet',
    api.paint(hidden, EMAIL) === false);
  check('9b-b but it is remembered', api.pending() === 1, api.pending());
  check('9b-c and stamped, so refresh() finds it too',
    hidden.getAttribute(api.ATTR) === EMAIL);
  check('9b-d asking twice does not queue it twice', (() => {
    api.paint(hidden, EMAIL);
    return api.pending() === 1;
  })(), api.pending());
  check('9b-e a retry is scheduled', timers.length > 0, timers.length);

  // The view is shown: the area now has a size, and the next retry marks it.
  hidden.clientWidth = 978; hidden.clientHeight = 497;
  hidden.offsetWidth = 978; hidden.offsetHeight = 497;
  timers.shift()();
  check('9b-f once it has a size the retry marks it', hidden.children.length === 1,
    hidden.children.length);
  check('9b-g and it leaves the queue', api.pending() === 0, api.pending());

  // An area removed from the page before it ever became visible is dropped
  // rather than retried forever.
  const gone = el(0, 0);
  gone.isConnected = true;
  api.paint(gone, EMAIL);
  gone.isConnected = false;
  timers.shift()();
  check('9b-h an area removed from the page is dropped', api.pending() === 0);
}

/* The mock exam paints after the frame in which the view is revealed, so in
   practice the retry is a safety net rather than the mechanism. */
check('9b-i the mock exam defers its review watermark to the next frame',
  /requestAnimationFrame\(markReview\)/.test(
    fs.readFileSync(path.join(ROOT, 'practice-exam.html'), 'utf8')));

/* --------------------------------- 10. every surface, one area each ---- */
for (const page of ['qbank.html', 'practice-exam.html', 'dashboard.html']) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const at = src.search(/<script\b[^>]*src="content-watermark\.js/);
  check('10 ' + page + ' loads the shared watermark', at !== -1);
  const tag = at === -1 ? '' : src.slice(at, src.indexOf('>', at) + 1);
  check('10 ' + page + ' loads it synchronously', at !== -1 && !/\basync\b/.test(tag), tag);
}

const QBJS = fs.readFileSync(path.join(ROOT, 'qbank.js'), 'utf8');
const EXAM = fs.readFileSync(path.join(ROOT, 'practice-exam.html'), 'utf8');
const QBHTML = fs.readFileSync(path.join(ROOT, 'qbank.html'), 'utf8');
const QBCSS = fs.readFileSync(path.join(ROOT, 'qbank.css'), 'utf8');

check('10a the QBank marks the card, not its parts',
  /QB_LIVE_TARGETS\s*=\s*'\.quiz-card'/.test(QBJS));
check('10b and the review item, not its parts',
  /QB_REVIEW_TARGETS\s*=\s*'\.review-item'/.test(QBJS));
check('10c no answer choice is marked on its own',
  !/\.quiz-option|\.review-answer/.test(
    (/QB_LIVE_TARGETS[\s\S]*?QB_REVIEW_TARGETS\s*=\s*'[^']*'/.exec(QBJS) || [''])[0]));
check('10d the mock exam marks the question area during the exam',
  /'\.exam-question,'/.test(EXAM));
check('10e and the whole block in review',
  /'\.review-question'/.test(EXAM));
check('10f no mock exam option is marked on its own',
  !/\.review-option|#qOptionsList \.q-option/.test(
    (/examWatermarkTargets\(root\)[\s\S]{0,600}?\n  \}/.exec(EXAM) || [''])[0]));

/* The two watermarks this one replaced must not creep back. Two layers at
   different angles and spacings is what made an explanation unreadable. */
check('10g the QBank no longer paints its own SVG layer',
  !/qbApplyWatermark/.test(QBHTML));
check('10h and the ::after tile is gone from the stylesheet',
  !/\.quiz-explanation::after/.test(QBCSS));
check('10i the chapter reader no longer rolls its own rotated canvas',
  !/rotate\(-25 \* Math\.PI/.test(fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8')));

console.log('content-watermark: ' + passed + ' passed, ' + failures.length + ' failed');
if (failures.length) { console.log(); failures.forEach(f => console.log('  FAIL ' + f)); process.exit(1); }
