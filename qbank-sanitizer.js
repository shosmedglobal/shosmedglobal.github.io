/**
 * Allowlist-based HTML sanitizer for question / option / explanation text.
 *
 * The data pipeline stores rich educational content using standard HTML:
 *   - chemistry / math : <sub>, <sup>
 *   - emphasis         : <b>, <strong>, <i>, <em>, ...
 *   - structure        : <p>, <h1>..<h6>, <div>, <blockquote>, ...
 *   - lists            : <ul>, <ol>, <li>, <dl>, <dt>, <dd>
 *   - tables           : <table>, <thead>, <tbody>, <tr>, <th>, <td>, <caption>
 * Many of those carry attributes (`<table class='exp-table'>`,
 * `<p style="...">`). Authors expected those attributes to survive.
 *
 * Strategy (defense-in-depth):
 *   1. Escape every '<' and '>' so nothing in the source can become a tag.
 *      (We deliberately don't touch '&' — existing entities like `&amp;`,
 *      `&micro;` survive intact.)
 *   2. Restore allowlisted void tags (<br>, <hr>) — optional attrs tolerated
 *      but discarded.
 *   3. Restore allowlisted paired tags ATOMICALLY (open + close together).
 *      Optional attributes on the opener are matched but discarded — no
 *      attribute reaches the DOM, which means no `onclick=`, `style=`,
 *      `href=javascript:`, etc. can ever sneak through.
 *      Repeat each tag's pass until stable so nested same-tag pairs resolve.
 *
 * Pair-based matching is the safety net: an attribute-bearing opener
 * with no matching closer (or a stray closer) stays fully escaped, so
 * we never emit a dangling `</...>` or an unsanitized `<...attr...>`.
 *
 * This file is DOM-free so it can be require()'d from Node tests
 * (scripts/test_qb_sanitizer.js). The browser loads it via
 * <script src="qbank-sanitizer.js"> BEFORE qbank.js.
 */
(function (root, factory) {
  const exported = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  } else {
    root.qbSanitizeHtml = exported.qbSanitizeHtml;
    root.QB_ALLOWED_TAGS = exported.QB_ALLOWED_TAGS;
    root.QB_VOID_TAGS = exported.QB_VOID_TAGS;
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Void elements (no closer).
  const QB_VOID_TAGS = ['br', 'hr'];

  // Paired allowlisted tags. Ordering doesn't matter — each tag is
  // processed independently in its own pass with non-greedy pair regex.
  const QB_ALLOWED_TAGS = [
    // Formatting / inline
    'b', 'strong', 'i', 'em', 'u', 's', 'mark',
    'code', 'kbd', 'samp', 'small', 'abbr', 'cite',
    // Chemistry / math
    'sub', 'sup',
    // Block-level structure
    'p', 'div', 'span', 'section', 'article',
    'blockquote', 'pre', 'figure', 'figcaption',
    // Headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // Lists
    'ul', 'ol', 'li',
    'dl', 'dt', 'dd',
    // Tables
    'table', 'thead', 'tbody', 'tfoot',
    'tr', 'th', 'td', 'caption',
    // Collapsible
    'details', 'summary',
  ];

  function qbSanitizeHtml(str) {
    if (str == null) return '';
    let s = String(str);

    // 1) Escape every < and >. Nothing in the input can be a real tag
    //    after this step.
    s = s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 2) Void tags — restore <br>, <hr>. Optional attributes/whitespace
    //    and optional self-close are tolerated and discarded.
    for (const tag of QB_VOID_TAGS) {
      const re = new RegExp(
        '&lt;\\s*' + tag + '(?:\\s+[\\s\\S]*?)?\\s*\\/?\\s*&gt;',
        'gi'
      );
      s = s.replace(re, '<' + tag + '>');
    }

    // 3) Paired tags — restore <tag>...</tag> as a single atomic match.
    //    Attributes on the opener are captured. We preserve ONLY a
    //    sanitized `class="..."` (see extractSafeClass) so existing
    //    explanation styles (`.exp-table`, `.exp-key`, `.exp-diagram`,
    //    etc.) keep working. Every other attribute — `onclick`, `style`,
    //    `href`, event handlers, data-*, etc. — is dropped before the
    //    HTML ever reaches the DOM. Multi-pass until stable so nested
    //    same-tag pairs resolve.
    for (const tag of QB_ALLOWED_TAGS) {
      const pairRe = new RegExp(
        '&lt;\\s*' + tag +
          '(\\s+[\\s\\S]*?)?\\s*&gt;' +                 // group 1: optional attrs
          '([\\s\\S]*?)' +                              // group 2: inner content
          '&lt;\\s*\\/\\s*' + tag + '\\s*&gt;',         // closer
        'gi'
      );
      let prev;
      do {
        prev = s;
        s = s.replace(pairRe, function (_m, attrs, content) {
          return '<' + tag + extractSafeClass(attrs) + '>' + content + '</' + tag + '>';
        });
      } while (s !== prev);
    }

    return s;
  }

  /**
   * Extract a `class="..."` attribute value, sanitize it down to safe
   * characters (letters, digits, dash, underscore, space) and return it
   * as a ready-to-concat attribute fragment (with leading space) — or
   * an empty string if no class is present or it's empty after cleaning.
   *
   * Quote-breakout, javascript:, attribute-name injection, etc. are all
   * blocked by the character whitelist on the VALUE.
   */
  function extractSafeClass(attrStr) {
    if (!attrStr) return '';
    const m = attrStr.match(/\bclass\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (!m) return '';
    const raw = m[1] || m[2] || m[3] || '';
    const safe = raw.replace(/[^a-zA-Z0-9\-_ ]/g, '').trim().replace(/\s+/g, ' ');
    if (!safe) return '';
    return ' class="' + safe + '"';
  }

  return {
    qbSanitizeHtml: qbSanitizeHtml,
    QB_ALLOWED_TAGS: QB_ALLOWED_TAGS,
    QB_VOID_TAGS: QB_VOID_TAGS
  };
}));
