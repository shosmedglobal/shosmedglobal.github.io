/* ===========================================================================
 * Personal content watermark
 * ---------------------------------------------------------------------------
 * One tiled, repeating watermark of the reader's email, used by all three
 * product surfaces: the QBank, the mock exams and the study plan chapters.
 * It replaces two near-identical canvas implementations that had drifted
 * apart and only covered part of each page.
 *
 *   SHOSWatermark.paint(el, email)              one element
 *   SHOSWatermark.paintAll(root, sel, email)    every match under root
 *
 * WHY A BACKGROUND IMAGE, NOT AN OVERLAY ELEMENT
 * A tiled background-image adds no nodes to the DOM. That matters more here
 * than it looks: both the QBank and the chapter reader highlight text by
 * walking text nodes and rebuilding Ranges from stored offsets. An injected
 * overlay node, or any element inside the flow, shifts those offsets and
 * silently corrupts saved highlights. A background cannot. It is also
 * inert for selection and for copy: the email never lands in the clipboard,
 * so an admin's legitimate copy is clean.
 *
 * WHY IT IS PAINTED ON LEAVES, NOT ON THE CARD
 * A background-image paints above its own element's background-color but
 * BELOW any child's. An answer choice draws its own opaque background, so a
 * watermark on the surrounding card is invisible exactly where the answer
 * is. Each content element is therefore painted in its own right.
 *
 * WHY THE TEXT IS HORIZONTAL
 * The requirement is that a screenshot cropped to a single question, answer,
 * explanation or chapter paragraph still carries a readable email. An answer
 * row is around 44px tall. An email is ~110px wide, so at even a 20 degree
 * tilt it spans ~49px vertically and CANNOT fit inside that crop. Horizontal
 * text occupies one line height, so it can. Legibility in a crop was the
 * requirement; the diagonal look was not.
 *
 * COVERAGE GUARANTEE
 * The tile carries the email twice in a brick pattern, half a tile apart, so
 * the vertical distance between consecutive lines is PITCH_Y, not 2*PITCH_Y.
 * Any crop at least (PITCH_Y + line height) tall therefore contains at least
 * one COMPLETE line, wherever the crop happens to fall. With the values
 * below that threshold is 31px, which is the height of a ONE-LINE question
 * stem as the live QBank renders it, and the smallest thing worth cropping.
 * An answer choice (68px), an explanation and a chapter paragraph are all
 * comfortably above it.
 * ======================================================================== */
(function (global) {
  'use strict';

  var CFG = {
    FONT_PX: 11,
    WEIGHT: 600,
    FAMILY: "Inter, 'Segoe UI', Arial, sans-serif",
    /* Dark enough to read when a crop is blown up, light enough to sit under
       body text without competing with it. Tuned against real screenshots at
       desktop and phone widths, not picked from the air. */
    COLOR: 'rgba(15, 23, 42, 0.115)',
    GAP_X: 58,      /* horizontal space between repeats */
    /* 20px, so the guarantee below lands at 31px. Measured against the live
       QBank: a one-line question stem is 31px tall and a 28px pitch caught a
       whole email only depending on where the line happened to fall. */
    PITCH_Y: 20     /* vertical distance between consecutive lines */
  };

  var cache = Object.create(null);

  /** Build (and memoise) the repeating tile for one email. */
  function tile(email) {
    if (cache[email]) return cache[email];
    var font = CFG.WEIGHT + ' ' + CFG.FONT_PX + 'px ' + CFG.FAMILY;

    var probe = document.createElement('canvas').getContext('2d');
    probe.font = font;
    var textW = Math.ceil(probe.measureText(email).width);

    var W = textW + CFG.GAP_X;
    var H = CFG.PITCH_Y * 2;                 /* two lines per tile */
    var dpr = Math.min(global.devicePixelRatio || 1, 2);

    var canvas = document.createElement('canvas');
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.scale(dpr, dpr);
    ctx.font = font;
    ctx.fillStyle = CFG.COLOR;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    /* Brick layout: the second line sits half a tile across, so the pattern
       does not read as columns and every PITCH_Y band carries an email.
       Each is drawn nine times, offset by whole tiles, so a line crossing an
       edge reappears on the opposite side and the tile stays seamless. */
    var spots = [[0, CFG.PITCH_Y * 0.5], [W / 2, CFG.PITCH_Y * 1.5]];
    for (var s = 0; s < spots.length; s++) {
      for (var ix = -1; ix <= 1; ix++) {
        for (var iy = -1; iy <= 1; iy++) {
          ctx.fillText(email, spots[s][0] + ix * W, spots[s][1] + iy * H);
        }
      }
    }

    cache[email] = { url: canvas.toDataURL('image/png'), w: W, h: H };
    return cache[email];
  }

  /** Paint one element. Returns true when it was painted. */
  function paint(el, email) {
    if (!el || !email || !el.style) return false;
    var t = tile(email);
    if (!t) return false;
    el.style.backgroundImage = 'url("' + t.url + '")';
    el.style.backgroundRepeat = 'repeat';
    el.style.backgroundSize = t.w + 'px ' + t.h + 'px';
    el.setAttribute('data-watermarked', '1');
    return true;
  }

  /** Paint every match of `selectors` under `root`. Returns the count. */
  function paintAll(root, selectors, email) {
    if (!email) return 0;
    var scope = root || document;
    var n = 0;
    var list = scope.querySelectorAll(selectors);
    for (var i = 0; i < list.length; i++) if (paint(list[i], email)) n++;
    /* The root itself may be one of the targets. */
    if (scope.matches && scope.matches(selectors) && paint(scope, email)) n++;
    return n;
  }

  /** Remove the watermark. Used when a container is re-rendered from scratch. */
  function clear(el) {
    if (!el || !el.style) return;
    el.style.backgroundImage = '';
    el.removeAttribute('data-watermarked');
  }

  global.SHOSWatermark = {
    paint: paint,
    paintAll: paintAll,
    clear: clear,
    tile: tile,
    CFG: CFG,
    /* The smallest crop height guaranteed to contain one whole email. */
    guaranteedCropHeight: function () { return CFG.PITCH_Y + CFG.FONT_PX; }
  };
}(typeof window !== 'undefined' ? window : globalThis));
