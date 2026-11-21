/* ===========================================================================
 * Personal content watermark
 * ---------------------------------------------------------------------------
 * One faint diagonal copy of the reader's email, shared by all three product
 * surfaces: the QBank, the mock exams and the study plan chapters.
 *
 *   SHOSWatermark.paint(el, email)              one area
 *   SHOSWatermark.paintAll(root, sel, email)    every match under root
 *
 * ONE MARK PER AREA, NOT ONE PER ELEMENT
 * The first version tiled a small horizontal email every 20px and painted it
 * onto each element in turn, including every answer choice, so that a crop of
 * any single line still carried an address. It did carry one. It also made
 * the page hard to read, which is the thing the watermark is not allowed to
 * cost. An area is now a whole question card, a whole review block, or a
 * chapter, and it gets ONE diagonal email:
 *
 *   area no taller than a screenful  ->  a single mark, centred, no repeat
 *   taller than that                 ->  the same mark repeated once per
 *                                        screenful as the reader scrolls
 *
 * The switch is on measured height, so a question card with a short
 * explanation gets one mark and the same card with a long one gets a mark
 * per screen without the caller deciding anything.
 *
 * WHY AN OVERLAY ELEMENT AND NOT A BACKGROUND IMAGE
 * A background-image paints above its own element's background-color but
 * BELOW any child's. Answer choices, explanation panes and callout boxes all
 * draw opaque backgrounds, so a background on the card showed through only in
 * the gaps and a single diagonal came out chopped into pieces. One absolutely
 * positioned, inert overlay per area sits above all of that and reads as one
 * continuous mark.
 *
 * The overlay holds NO TEXT: the email is painted into a canvas tile and
 * applied as that overlay's background. So it is never selected, never
 * copied into an admin's clipboard, never read out by a screen reader
 * (aria-hidden), never hit by a click (pointer-events:none), and invisible to
 * the QBank and chapter highlighters, which walk text nodes and rebuild
 * ranges from stored offsets.
 *
 * Deliberately not a lock. It is a deterrent against passing screenshots and
 * PDFs around, not a claim that the text was never sent to the browser.
 * ======================================================================== */
(function (global) {
  'use strict';

  var CFG = {
    FONT_PX: 22,        /* the size asked for: readable when looked for */
    MIN_FONT_PX: 12,    /* floor, for a long address in a narrow column */
    WEIGHT: 600,
    FAMILY: "Inter, 'Segoe UI', Arial, sans-serif",
    /* Light gray. Over white this lands around #e3e5e8: legible when you
       look for it, quiet enough to read straight through. */
    COLOR: 'rgba(100, 116, 139, 0.17)',
    ANGLE_DEG: -45,     /* a 45 degree tilt, rising to the right */
    /* Horizontal pitch cap. Wide enough that a normal reading column of
       900 to 1300px carries ONE mark per row, so with the vertical pitch
       below that comes to about one mark per screenful. */
    MAX_TILE_W: 1100,
    MIN_PITCH_Y: 420,
    MAX_PITCH_Y: 900,
    PAD: 24             /* breathing room around the mark inside its tile */
  };

  var CLASS = 'shos-watermark';
  var ATTR = 'data-wm-email';
  var cache = Object.create(null);

  function radians() { return CFG.ANGLE_DEG * Math.PI / 180; }

  /** One screenful, which is the vertical pitch when an area is scrolled. */
  function screenful() {
    var vh = global.innerHeight || 700;
    return Math.max(CFG.MIN_PITCH_Y, Math.min(CFG.MAX_PITCH_Y, Math.round(vh * 0.9)));
  }

  /* One measuring canvas for the life of the page. Text is measured on
     every paint, including every resize, and a throwaway canvas per call
     adds up on a chapter full of areas. */
  var probeCtx = null;
  function probe() {
    if (!probeCtx) {
      var c = document.createElement('canvas');
      probeCtx = c && c.getContext ? c.getContext('2d') : null;
    }
    return probeCtx;
  }

  /** The bounding box of the email once it has been tilted. */
  function measure(email, fontPx) {
    var ctx = probe();
    if (!ctx) return null;
    ctx.font = CFG.WEIGHT + ' ' + fontPx + 'px ' + CFG.FAMILY;
    var tw = Math.ceil(ctx.measureText(email).width);
    var th = Math.ceil(fontPx * 1.25);
    var c = Math.abs(Math.cos(radians()));
    var s = Math.abs(Math.sin(radians()));
    return { w: Math.ceil(tw * c + th * s), h: Math.ceil(tw * s + th * c) };
  }

  /** Draw the email once, tilted, centred in a tileW x tileH canvas. */
  function tile(email, tileW, tileH, fontPx) {
    var key = email + '|' + tileW + '|' + tileH + '|' + fontPx;
    if (cache[key]) return cache[key];

    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    var canvas = document.createElement('canvas');
    canvas.width = Math.round(tileW * dpr);
    canvas.height = Math.round(tileH * dpr);
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.scale(dpr, dpr);
    ctx.font = CFG.WEIGHT + ' ' + fontPx + 'px ' + CFG.FAMILY;
    ctx.fillStyle = CFG.COLOR;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(tileW / 2, tileH / 2);
    ctx.rotate(radians());
    ctx.fillText(email, 0, 0);

    cache[key] = { url: canvas.toDataURL('image/png'), w: tileW, h: tileH, font: fontPx };
    return cache[key];
  }

  /**
   * Decide how one area should be marked, from its measured size.
   * @returns {{repeat:boolean, tw:number, th:number, font:number}|null}
   */
  function plan(el, email) {
    var w = el.clientWidth || el.offsetWidth || 0;
    var h = el.clientHeight || el.offsetHeight || 0;
    if (w <= CFG.PAD) return null;                 /* nothing worth marking */

    var pitch = screenful();
    /* A little past one screenful before it starts repeating, so an area that
       is merely a bit tall still reads as having one mark. */
    var repeat = h > pitch * 1.15;

    var avail = (repeat ? Math.min(w, CFG.MAX_TILE_W) : w) - CFG.PAD;
    var fontPx = CFG.FONT_PX;
    var m = measure(email, fontPx);
    if (!m) return null;
    /* A long address in a narrow column is shrunk rather than cropped.
       Stepping down rather than scaling once, because the tilted box does
       not shrink linearly with the type size and one pass can overshoot. */
    while (m.w > avail && fontPx > CFG.MIN_FONT_PX) {
      fontPx = Math.max(CFG.MIN_FONT_PX,
                        Math.min(fontPx - 1, Math.floor(fontPx * avail / m.w)));
      m = measure(email, fontPx);
    }

    if (repeat) {
      return {
        repeat: true,
        tw: Math.max(m.w + CFG.PAD, Math.min(w, CFG.MAX_TILE_W)),
        th: pitch,
        font: fontPx
      };
    }
    return { repeat: false, tw: m.w + CFG.PAD, th: m.h + CFG.PAD, font: fontPx };
  }

  function overlayIn(el) {
    var kids = el.children || [];
    for (var i = 0; i < kids.length; i++) {
      if (kids[i].className === CLASS) return kids[i];
    }
    return null;
  }

  /** Mark one area. Returns true when it was marked. */
  function paint(el, email) {
    if (!el || !email || !el.style) return false;
    var p = plan(el, email);
    if (!p) return false;
    var t = tile(email, p.tw, p.th, p.font);
    if (!t) return false;

    /* The overlay is positioned against the area, so the area must be a
       containing block. Anything already positioned is left alone. */
    var cs = global.getComputedStyle ? global.getComputedStyle(el) : null;
    if (cs && cs.position === 'static') el.style.position = 'relative';

    var ov = overlayIn(el);
    if (!ov) {
      ov = document.createElement('div');
      ov.className = CLASS;
      ov.setAttribute('aria-hidden', 'true');
      el.appendChild(ov);
    }
    ov.style.cssText = [
      'position:absolute',
      'top:0', 'left:0', 'right:0', 'bottom:0',
      'pointer-events:none',
      'user-select:none', '-webkit-user-select:none',
      'z-index:4',
      'background-repeat:' + (p.repeat ? 'repeat' : 'no-repeat'),
      /* Aligned to the top when it repeats, so the first mark sits whole
         inside the first band instead of being sliced by the area's top
         edge the way a centred grid slices it. */
      'background-position:' + (p.repeat ? 'center top' : 'center center'),
      'background-size:' + t.w + 'px ' + t.h + 'px',
      'background-image:url("' + t.url + '")'
    ].join(';');

    el.setAttribute(ATTR, email);
    return true;
  }

  /** Mark every match of `selectors` under `root`. Returns the count. */
  function paintAll(root, selectors, email) {
    if (!email) return 0;
    var scope = root || document;
    var n = 0;
    var list = scope.querySelectorAll(selectors);
    for (var i = 0; i < list.length; i++) if (paint(list[i], email)) n++;
    /* The root itself may be one of the areas. */
    if (scope.matches && scope.matches(selectors) && paint(scope, email)) n++;
    return n;
  }

  /** Remove the mark. Used when an area is rebuilt from scratch. */
  function clear(el) {
    if (!el || !el.removeAttribute) return;
    var ov = overlayIn(el);
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    el.removeAttribute(ATTR);
  }

  /* The tile depends on the area's width and on the height of a screenful,
     so a resize or a phone rotation has to redraw it. */
  function refresh() {
    if (!document.querySelectorAll) return 0;
    var marked = document.querySelectorAll('[' + ATTR + ']');
    var n = 0;
    for (var i = 0; i < marked.length; i++) {
      if (paint(marked[i], marked[i].getAttribute(ATTR))) n++;
    }
    return n;
  }

  var resizeTimer = null;
  if (global.addEventListener) {
    global.addEventListener('resize', function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 200);
    });
  }

  global.SHOSWatermark = {
    paint: paint,
    paintAll: paintAll,
    clear: clear,
    refresh: refresh,
    tile: tile,
    plan: plan,
    screenful: screenful,
    CFG: CFG,
    CLASS: CLASS,
    ATTR: ATTR
  };
}(typeof window !== 'undefined' ? window : globalThis));
