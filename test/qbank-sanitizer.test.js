/**
 * Regression tests for qbank-sanitizer.js
 *
 * Run:  node test/qbank-sanitizer.test.js
 *
 * Motivating defect (2026-09-02):
 *   The void-tag restore regex allowed whitespace between '<' and the tag
 *   name and matched case-insensitively, so the chemistry string
 *       "Cl < Br < I < At. The reverse is Cl > Br > I > At."
 *   had its '< Br' read as a <br> opener. The lazy attribute group then
 *   consumed everything up to the next '>', silently destroying the text.
 *   HTML does not permit whitespace after '<', so the fix is to require the
 *   tag name immediately. This is strictly more conservative: it can only
 *   cause fewer strings to be promoted back into tags, never more.
 */

const fs = require('fs');
const path = require('path');

const root = {};
const src = fs.readFileSync(path.join(__dirname, '..', 'qbank-sanitizer.js'), 'utf8');
new Function('window', 'globalThis', 'module', 'exports', src)
  .call(root, root, root, undefined, undefined);
const clean = root.qbSanitizeHtml;

let passed = 0;
const failures = [];

function check(name, actual, expected) {
  if (actual === expected) { passed++; return; }
  failures.push(`${name}\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(actual)}`);
}
function checkThat(name, cond, detail) {
  if (cond) { passed++; return; }
  failures.push(`${name}\n    ${detail}`);
}

// ---------------------------------------------------------------- the defect
// 1. Literal chemistry text containing "< Br" must survive intact.
check(
  'chemistry "< Br" is preserved as text, not eaten by a fabricated <br>',
  clean('<p>Order: Cl < Br < I < At. The reverse is Cl > Br > I > At.</p>'),
  '<p>Order: Cl &lt; Br &lt; I &lt; At. The reverse is Cl &gt; Br &gt; I &gt; At.</p>'
);

checkThat(
  'no <br> is fabricated from chemistry comparisons',
  !/<br>/i.test(clean('<p>Cl < Br < I < At. Reverse: Cl > Br > I > At.</p>')),
  'a <br> tag appeared that was never in the source'
);

// Same class of collision for the other void tag.
check(
  'chemistry "< Hr" is preserved as text',
  clean('<p>value A < Hr and B > C</p>'),
  '<p>value A &lt; Hr and B &gt; C</p>'
);

// ------------------------------------------------------- legitimate br usage
check('legitimate <br> still renders',      clean('<p>one<br>two</p>'),      '<p>one<br>two</p>');
check('legitimate <br/> still renders',     clean('<p>one<br/>two</p>'),     '<p>one<br>two</p>');
check('legitimate <br /> still renders',    clean('<p>one<br />two</p>'),    '<p>one<br>two</p>');
check('uppercase <BR> still renders',       clean('<p>one<BR>two</p>'),      '<p>one<br>two</p>');
check('legitimate <hr> still renders',      clean('<p>a</p><hr><p>b</p>'),   '<p>a</p><hr><p>b</p>');

// --------------------------------------------------- malformed input is text
check(
  'malformed "< br>" stays text and is NOT promoted to a tag',
  clean('<p>a < br> b</p>'),
  '<p>a &lt; br&gt; b</p>'
);
check(
  'malformed "< p>" stays text and is NOT promoted to a tag',
  clean('a < p>text< /p> b'),
  'a &lt; p&gt;text&lt; /p&gt; b'
);

// -------------------------------------------------------- security behaviour
checkThat('script tags are neutralised',
  !/<script/i.test(clean('<script>alert(1)</script>')),
  'a <script> tag survived');
// NOTE: assert on *live* tags only. An escaped "&lt;img ... onerror=...&gt;"
// still contains the substring "onerror", but it is inert text — the browser
// renders it as characters, never as an attribute. The real requirement is
// that no event handler survives inside an actual tag.
checkThat('event handlers are stripped from live tags',
  !/<[^>]*\bon\w+\s*=/i.test(clean('<p onclick="evil()">x</p><img src=x onerror=alert(1)>')),
  'an event handler survived inside a real tag');
check('non-allowlisted tag carrying a handler is left fully escaped',
  clean('<p onclick="evil()">x</p><img src=x onerror=alert(1)>'),
  '<p>x</p>&lt;img src=x onerror=alert(1)&gt;');
checkThat('img is not an allowlisted tag',
  !/<img/i.test(clean('<img src=x onerror=alert(1)>')),
  'an <img> tag survived');
checkThat('javascript: URLs cannot ride in on an anchor',
  !/<a\b/i.test(clean('<a href="javascript:alert(1)">x</a>')),
  'an <a> tag survived');
checkThat('whitespace evasion "< script>" is not promoted',
  !/<script/i.test(clean('< script>alert(1)< /script>')),
  'whitespace-evaded script survived');
check('safe class attribute is preserved',
  clean("<p class='exp-key'>x</p>"), '<p class="exp-key">x</p>');
checkThat('unsafe attributes are dropped while class survives',
  clean('<p class="exp-key" onclick="evil()">x</p>') === '<p class="exp-key">x</p>',
  'attribute filtering changed');

// ---------------------------------------------------------- structural sanity
check('nested allowlisted tags survive',
  clean('<ul><li><strong>a</strong></li></ul>'), '<ul><li><strong>a</strong></li></ul>');
check('subscripts survive', clean('<p>H<sub>2</sub>O</p>'), '<p>H<sub>2</sub>O</p>');
check('null input yields empty string', clean(null), '');

// --------------------------------------------------------------------- report
console.log(`qbank-sanitizer: ${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log();
  failures.forEach(f => console.log('  FAIL ' + f));
  process.exit(1);
}
