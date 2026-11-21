/**
 * The shared content watermark.
 *
 * Run:  node test/content-watermark.test.js
 *
 * The requirement this module exists to meet: a screenshot cropped to a
 * single question, answer choice, explanation or chapter paragraph must
 * still carry a readable email. Two properties follow from that and are
 * pinned here, because both are easy to undo by "tidying" the drawing code:
 *
 *   1. The text is HORIZONTAL. An email is ~110px wide, so tilted even 20
 *      degrees it spans ~49px vertically and cannot fit inside a ~44px
 *      answer row. A rotate() call reintroduces the bug the layout avoids.
 *   2. The tile carries the email TWICE, half a tile apart, so consecutive
 *      lines are PITCH_Y apart rather than 2*PITCH_Y. That halves the crop
 *      height needed to catch a whole line.
 *
 * It must also add no DOM nodes: the QBank and the chapter reader rebuild
 * highlight Ranges from stored text offsets, and any injected element
 * inside the content would shift them.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'content-watermark.js'), 'utf8');

let passed = 0;
const failures = [];
const check = (n, c, d) => { if (c) { passed++; return; } failures.push(n + (d === undefined ? '' : '  [got: ' + JSON.stringify(d) + ']')); };

const CHAR_W = 6;   // the stub's measureText

function makeEnv(dpr) {
  const calls = { fillText: [], rotate: 0, scale: [], created: 0, appended: 0 };
  const canvasFor = () => {
    calls.created++;
    return {
      width: 0, height: 0,
      getContext: () => ({
        scale: (x, y) => calls.scale.push([x, y]),
        rotate: () => { calls.rotate++; },
        clearRect() {}, save() {}, translate() {}, restore() {},
        measureText: t => ({ width: t.length * CHAR_W }),
        fillText: (t, x, y) => calls.fillText.push({ t, x, y }),
        set font(v) { calls.font = v; },
        set fillStyle(v) { calls.fillStyle = v; },
        set textAlign(v) {}, set textBaseline(v) {}
      }),
      toDataURL: () => 'data:image/png;base64,' + calls.created
    };
  };
  const win = { devicePixelRatio: dpr === undefined ? 1 : dpr };
  const ctx = {
    window: win, globalThis: win,
    document: { createElement: canvasFor, body: { appendChild: () => { calls.appended++; } } }
  };
  ctx.global = ctx;
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx);
  return { api: win.SHOSWatermark, calls, ctx };
}

const el = () => ({
  style: {}, attrs: {}, children: 0,
  setAttribute(k, v) { this.attrs[k] = String(v); },
  getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; },
  removeAttribute(k) { delete this.attrs[k]; },
  appendChild() { this.children++; }
});

const EMAIL = 'student@example.com';

/* ------------------------------------------------- 1. the geometry ---- */
{
  const e = makeEnv();
  const t = e.api.tile(EMAIL);
  const CFG = e.api.CFG;
  check('1a the tile is as wide as the email plus a gap',
    t.w === EMAIL.length * CHAR_W + CFG.GAP_X, t.w);
  check('1b and two lines tall', t.h === CFG.PITCH_Y * 2, t.h);
  check('1c it returns a data URL', /^data:image\/png/.test(t.url));

  // Two brick positions, each drawn 9 times so an edge-crossing line wraps.
  check('1d the email is drawn 18 times: 2 positions x a 3x3 wrap',
    e.calls.fillText.length === 18, e.calls.fillText.length);
  check('1e every draw is the email itself',
    e.calls.fillText.every(f => f.t === EMAIL));

  // The y positions inside the tile, reduced modulo the tile height, must
  // be exactly PITCH_Y apart: that is the coverage guarantee.
  const ys = [...new Set(e.calls.fillText.map(f => ((f.y % t.h) + t.h) % t.h))].sort((a, b) => a - b);
  check('1f there are two distinct lines per tile', ys.length === 2, ys);
  check('1g spaced exactly PITCH_Y apart', ys[1] - ys[0] === CFG.PITCH_Y, ys);
  check('1h and PITCH_Y apart again across the tile seam',
    (ys[0] + t.h) - ys[1] === CFG.PITCH_Y, ys);

  // The second line is offset horizontally, so the pattern is bricks, not
  // columns; a narrow crop then still catches text.
  const xs = [...new Set(e.calls.fillText.map(f => ((f.x % t.w) + t.w) % t.w))].sort((a, b) => a - b);
  check('1i the two lines are offset horizontally', xs.length === 2, xs);
  check('1j by half a tile', Math.abs((xs[1] - xs[0]) - t.w / 2) < 1, xs);
}

/* --------------------------------------- 2. horizontal, by design ----- */
{
  const e = makeEnv();
  e.api.tile(EMAIL);
  check('2a the text is never rotated', e.calls.rotate === 0, e.calls.rotate);
  check('2b the source contains no rotate() call at all', !/\.rotate\s*\(/.test(SRC));
}

/* --------------------------------------- 3. the coverage guarantee ---- */
{
  const e = makeEnv();
  const CFG = e.api.CFG;
  const guarantee = e.api.guaranteedCropHeight();
  check('3a the guarantee is the line spacing plus one line height',
    guarantee === CFG.PITCH_Y + CFG.FONT_PX, guarantee);
  // Heights measured on the live site, not assumed: a one-line question
  // stem is 31px and an answer choice is 68px. The stem is the smallest
  // thing worth cropping, so it sets the bar.
  check('3b a 31px one-line question stem is guaranteed a whole email',
    guarantee <= 31, guarantee);
  check('3c so is a 68px answer choice', guarantee <= 68);
  // And the watermark must stay faint enough to read through.
  const alpha = Number(/rgba\([^)]*,\s*([\d.]+)\s*\)/.exec(CFG.COLOR)[1]);
  check('3d it is faint enough not to compete with the content', alpha <= 0.2, alpha);
  check('3e but not invisible', alpha >= 0.07, alpha);
  check('3f the type is small', CFG.FONT_PX <= 13 && CFG.FONT_PX >= 9, CFG.FONT_PX);
}

/* ----------------------------------------------- 4. painting an el ---- */
{
  const e = makeEnv();
  const node = el();
  check('4a paint reports success', e.api.paint(node, EMAIL) === true);
  check('4b it sets a background image', /^url\("data:image\/png/.test(node.style.backgroundImage));
  check('4c repeating', node.style.backgroundRepeat === 'repeat');
  const t = e.api.tile(EMAIL);
  check('4d at the tile size', node.style.backgroundSize === t.w + 'px ' + t.h + 'px', node.style.backgroundSize);
  check('4e and marks the element', node.getAttribute('data-watermarked') === '1');
  check('4f it adds NO child nodes, so highlight offsets are untouched', node.children === 0);
  check('4g and appends nothing to the document', e.calls.appended === 0);

  check('4h no email, no paint', e.api.paint(el(), '') === false);
  check('4i no element, no paint', e.api.paint(null, EMAIL) === false);

  const cleared = el();
  e.api.paint(cleared, EMAIL);
  e.api.clear(cleared);
  check('4j clear removes it', cleared.style.backgroundImage === ''
    && cleared.getAttribute('data-watermarked') === null);
}

/* ------------------------------------------------- 5. whose email ----- */
{
  const e = makeEnv();
  e.api.tile('a@b.com');
  e.calls.fillText.length = 0;
  e.api.tile('c@d.com');
  check('5a a different email is drawn, not a cached one',
    e.calls.fillText.length === 18 && e.calls.fillText.every(f => f.t === 'c@d.com'));
  const before = e.calls.created;
  e.api.tile('c@d.com');
  check('5b the same email is memoised, not redrawn', e.calls.created === before, [before, e.calls.created]);
  check('5c and the two emails produced different tiles',
    e.api.tile('a@b.com').url !== e.api.tile('c@d.com').url);
  check('5d with different widths', e.api.tile('a@b.com').w !== e.api.tile('much.longer@example.com').w);
}

/* --------------------------------------------------- 6. paintAll ------ */
{
  const e = makeEnv();
  const a = el(), b = el(), root = el();
  root.querySelectorAll = () => [a, b];
  root.matches = () => false;
  check('6a paintAll paints every match', e.api.paintAll(root, '.x', EMAIL) === 2);
  check('6b both carry the mark', a.getAttribute('data-watermarked') === '1'
    && b.getAttribute('data-watermarked') === '1');

  const selfMatching = el();
  selfMatching.querySelectorAll = () => [];
  selfMatching.matches = () => true;
  check('6c the root itself is painted when it matches',
    e.api.paintAll(selfMatching, '.x', EMAIL) === 1);

  const none = el();
  none.querySelectorAll = () => [a];
  none.matches = () => false;
  check('6d without an email nothing is painted', e.api.paintAll(none, '.x', '') === 0);
}

/* ------------------------------------------- 7. retina sharpness ------ */
{
  const e1 = makeEnv(1), e2 = makeEnv(2), e3 = makeEnv(4);
  e1.api.tile(EMAIL); e2.api.tile(EMAIL); e3.api.tile(EMAIL);
  check('7a at 1x the canvas is not scaled up', e1.calls.scale[0][0] === 1, e1.calls.scale[0]);
  check('7b at 2x it is drawn double size for sharpness', e2.calls.scale[0][0] === 2, e2.calls.scale[0]);
  check('7c and capped at 2x so the data URL stays small', e3.calls.scale[0][0] === 2, e3.calls.scale[0]);
  check('7d while the CSS tile size is unchanged by dpr',
    e1.api.tile(EMAIL).w === e2.api.tile(EMAIL).w);
}

/* ------------------------------------- 8. every surface loads it ------ */
for (const page of ['qbank.html', 'practice-exam.html', 'dashboard.html']) {
  const src = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const at = src.search(/<script\b[^>]*src="content-watermark\.js/);
  check('8 ' + page + ' loads the shared watermark', at !== -1);
  const tag = at === -1 ? '' : src.slice(at, src.indexOf('>', at) + 1);
  check('8 ' + page + ' loads it synchronously', at !== -1 && !/\basync\b/.test(tag), tag);
}
// The two bespoke canvas watermarks it replaced must not creep back.
for (const f of ['qbank.js', 'dashboard.html']) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  check('8 ' + f + ' no longer rolls its own rotated watermark',
    !/rotate\(-25 \* Math\.PI/.test(src));
}

console.log('content-watermark: ' + passed + ' passed, ' + failures.length + ' failed');
if (failures.length) { console.log(); failures.forEach(f => console.log('  FAIL ' + f)); process.exit(1); }
