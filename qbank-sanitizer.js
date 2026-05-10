/**
 * Allowlist-based HTML sanitizer for question / option / explanation text.
 *
 * The data pipeline stores chemical formulas, math, and emphasis using
 * standard HTML tags (e.g. `H<sub>2</sub>O`, `Ca<sup>2+</sup>`,
 * `<strong>NOT</strong>`). Naively using `textContent` shows the literal
 * tags; using `innerHTML` without sanitization is unsafe.
 *
 * Strategy:
 *   1. Escape every `<` and `>` so nothing the data contains can become a
 *      real tag. (We deliberately do NOT touch `&`, so existing entities
 *      like `&amp;` / `&micro;` survive intact.)
 *   2. Re-introduce ONLY whitelisted tags via regex. No attributes are
 *      ever accepted — `<sub class=x>` would be stripped to nothing.
 *
 * Result: a `<script>` in the data renders as literal `<script>` text;
 * no attribute-based JS sneaks through (no onclick, no href javascript:,
 * no style); `<sub>2</sub>` becomes a real subscript.
 *
 * Allowed tags (per product spec):
 *   formatting    : b, strong, i, em, u, mark
 *   chemistry/math: sub, sup
 *   structure     : p, ul, ol, li, br
 *   inline        : code, kbd
 *
 * This file is DOM-free so it can be required from Node tests. The
 * browser loads it via <script src="qbank-sanitizer.js"> BEFORE
 * qbank.js so the qbSanitizeHtml symbol is globally available.
 */
(function (root, factory) {
  const exported = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  } else {
    root.qbSanitizeHtml = exported.qbSanitizeHtml;
    root.QB_ALLOWED_TAGS = exported.QB_ALLOWED_TAGS;
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const QB_ALLOWED_TAGS = [
    'sub', 'sup',
    'b', 'strong', 'i', 'em', 'u', 'mark',
    'code', 'kbd',
    'p', 'ul', 'ol', 'li'
  ];

  function qbSanitizeHtml(str) {
    if (str == null) return '';
    let s = String(str);
    // 1) Neutralize every angle bracket.
    s = s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // 2) Restore the allowlist — but only as PAIRS (open + close together).
    //    Matching the pair atomically guarantees no dangling closers from
    //    attribute-bearing openers (e.g. `<sub onclick=...>2</sub>` stays
    //    fully escaped because the opener doesn't match the bare-tag form).
    //    Repeat each tag until stable so nested same-tag pairs resolve.
    for (const tag of QB_ALLOWED_TAGS) {
      const pairRe = new RegExp(
        '&lt;\\s*' + tag + '\\s*&gt;([\\s\\S]*?)&lt;\\s*/\\s*' + tag + '\\s*&gt;',
        'gi'
      );
      let prev;
      do {
        prev = s;
        s = s.replace(pairRe, '<' + tag + '>$1</' + tag + '>');
      } while (s !== prev);
    }
    // <br>, <br/>, <br /> (void element — has no closer)
    s = s.replace(/&lt;\s*br\s*\/?\s*&gt;/gi, '<br>');
    return s;
  }

  return { qbSanitizeHtml: qbSanitizeHtml, QB_ALLOWED_TAGS: QB_ALLOWED_TAGS };
}));
