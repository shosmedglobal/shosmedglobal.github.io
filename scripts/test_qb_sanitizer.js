/**
 * Regression tests for the qbank HTML sanitizer.
 *
 *   node scripts/test_qb_sanitizer.js
 *
 * Exits with code 1 if any test fails so this can be wired into CI.
 *
 * Covers the cases the user explicitly asked for (H₂O, CO₂, Ca²⁺, mixed
 * bold + subscript) plus XSS / attribute-stripping guardrails so we don't
 * silently regress the safety properties.
 *
 * NOTE: qbank.js conditionally exports the sanitizer when `module` exists,
 * so this require() works without modifying browser behavior.
 */
const path = require('path');
const { qbSanitizeHtml, QB_ALLOWED_TAGS } = require(path.join(__dirname, '..', 'qbank-sanitizer.js'));

let passed = 0;
let failed = 0;
const failures = [];

function eq(label, input, expected) {
  const actual = qbSanitizeHtml(input);
  if (actual === expected) {
    passed++;
    console.log('  PASS  ' + label);
  } else {
    failed++;
    failures.push({ label, input, expected, actual });
    console.log('  FAIL  ' + label);
    console.log('        input    : ' + JSON.stringify(input));
    console.log('        expected : ' + JSON.stringify(expected));
    console.log('        got      : ' + JSON.stringify(actual));
  }
}

function contains(label, input, fragment) {
  const actual = qbSanitizeHtml(input);
  if (actual.indexOf(fragment) !== -1) {
    passed++;
    console.log('  PASS  ' + label);
  } else {
    failed++;
    failures.push({ label, input, expected: 'contains ' + fragment, actual });
    console.log('  FAIL  ' + label);
    console.log('        input    : ' + JSON.stringify(input));
    console.log('        expected : contains ' + JSON.stringify(fragment));
    console.log('        got      : ' + JSON.stringify(actual));
  }
}

function notContains(label, input, fragment) {
  const actual = qbSanitizeHtml(input);
  if (actual.indexOf(fragment) === -1) {
    passed++;
    console.log('  PASS  ' + label);
  } else {
    failed++;
    failures.push({ label, input, expected: 'does NOT contain ' + fragment, actual });
    console.log('  FAIL  ' + label);
    console.log('        input    : ' + JSON.stringify(input));
    console.log('        expected : NOT contain ' + JSON.stringify(fragment));
    console.log('        got      : ' + JSON.stringify(actual));
  }
}


// =========================================================================
// 1. The user's explicit acceptance tests
// =========================================================================
console.log('\n[1] Chemical formulas (user-spec)\n');

eq('H<sub>2</sub>O renders subscript',
   'H<sub>2</sub>O',
   'H<sub>2</sub>O');

eq('CO<sub>2</sub> renders subscript',
   'CO<sub>2</sub>',
   'CO<sub>2</sub>');

eq('Ca<sup>2+</sup> renders superscript',
   'Ca<sup>2+</sup>',
   'Ca<sup>2+</sup>');

eq('mixed bold + subscript: <strong>NOT</strong> H<sub>2</sub>O',
   '<strong>NOT</strong> H<sub>2</sub>O',
   '<strong>NOT</strong> H<sub>2</sub>O');

// `->` from the input becomes `-&gt;` in the output — that's the CORRECT
// sanitization (a literal `>` would otherwise let an upstream injection
// close a tag). The browser still renders `&gt;` as the character `>` in
// text content, so visually the user sees `-> ` exactly as intended.
eq('multi-formula: 2H<sub>2</sub> + O<sub>2</sub> -> 2H<sub>2</sub>O',
   '2H<sub>2</sub> + O<sub>2</sub> -> 2H<sub>2</sub>O',
   '2H<sub>2</sub> + O<sub>2</sub> -&gt; 2H<sub>2</sub>O');


// =========================================================================
// 2. Every allowlisted tag must round-trip cleanly
// =========================================================================
console.log('\n[2] Allowlisted tags round-trip\n');

for (const tag of QB_ALLOWED_TAGS) {
  eq(tag + ': open + close preserved',
     'x<' + tag + '>y</' + tag + '>z',
     'x<' + tag + '>y</' + tag + '>z');
}

eq('<br> void element preserved',
   'line one<br>line two',
   'line one<br>line two');

eq('<br/> self-closing normalized to <br>',
   'a<br/>b',
   'a<br>b');

eq('<br /> with space normalized',
   'a<br />b',
   'a<br>b');

eq('<BR> upper-case still recognized',
   'a<BR>b',
   'a<br>b');

eq('<SUB> upper-case lowered',
   'H<SUB>2</SUB>O',
   'H<sub>2</sub>O');


// =========================================================================
// 3. Dangerous content must be neutralized (defense-in-depth)
// =========================================================================
console.log('\n[3] XSS / dangerous content stripped\n');

notContains('<script> stripped',
   'safe<script>alert(1)</script>tail',
   '<script>');

notContains('<iframe> stripped',
   '<iframe src="x"></iframe>',
   '<iframe');

notContains('<img onerror=...> stripped',
   '<img src=x onerror="alert(1)">',
   '<img');

// (Removed: an obsolete `notContains '<sub class'` test. `class` is now
// in the attribute allowlist — its safety is covered by the value
// character whitelist, plus the executable-attr checks below.)

// These check that the output contains no *executable* attribute — i.e.
// no real HTML tag with the dangerous attr. The literal characters can
// appear inside escaped text (e.g. "&lt;sub onclick=...&gt;") and that's
// safe because the browser won't parse them as a tag.
function noExecutableAttr(label, input, attrRegex) {
  const actual = qbSanitizeHtml(input);
  // Look for an UNESCAPED tag opener `<` followed (eventually) by the attr
  // before the closing `>`. If only escaped (`&lt;...attr...&gt;`) is found,
  // there's no executable attribute and we pass.
  const realTagWithAttr = new RegExp('<[^/!?][^>]*' + attrRegex, 'i');
  if (!realTagWithAttr.test(actual)) {
    passed++;
    console.log('  PASS  ' + label);
  } else {
    failed++;
    failures.push({ label, input, expected: 'no real tag with ' + attrRegex, actual });
    console.log('  FAIL  ' + label);
    console.log('        input : ' + JSON.stringify(input));
    console.log('        got   : ' + JSON.stringify(actual));
  }
}

noExecutableAttr('no executable onclick attribute',
   '<sub class="x" onclick="alert(1)">2</sub>',
   'onclick\\s*=');

noExecutableAttr('no executable javascript: href',
   '<a href="javascript:alert(1)">x</a>',
   'href\\s*=\\s*["\']?javascript:');

noExecutableAttr('no executable onerror on <img>',
   '<img src=x onerror="alert(1)">',
   'onerror\\s*=');

noExecutableAttr('no executable onload on <body>',
   '<body onload="alert(1)">x</body>',
   'onload\\s*=');

notContains('<style> stripped',
   '<style>body{display:none}</style>',
   '<style>');

notContains('<form> stripped',
   '<form><input></form>',
   '<form');

eq('text-with-< stays literal (escaped to entity)',
   'if x < 5 then go',
   'if x &lt; 5 then go');

eq('text-with-> stays literal (escaped to entity)',
   'pipe: a > b > c',
   'pipe: a &gt; b &gt; c');

eq('<span> is allowed, but style attribute dropped',
   '<span style="color:red">hello</span>',
   '<span>hello</span>');

eq('class attribute preserved (sanitized)',
   '<p class="exp-stem">hello</p>',
   '<p class="exp-stem">hello</p>');

eq('class with multiple values preserved',
   '<div class="exp-key highlight">important</div>',
   '<div class="exp-key highlight">important</div>');

eq('class value sanitized (strips quote-breakout chars + collapses whitespace)',
   '<div class=\'" onclick="alert(1)\'>x</div>',
   '<div class="onclickalert1">x</div>');

eq('non-class attrs dropped, class kept',
   '<table class="exp-table" border="1" onclick="bad()">x</table>',
   '<table class="exp-table">x</table>');


// =========================================================================
// 3b. Educational HTML round-trips (the major bug fix iter)
// =========================================================================
console.log('\n[3b] Educational HTML — headings, tables, divs\n');

for (const tag of ['h1','h2','h3','h4','h5','h6']) {
  eq(tag + ' heading round-trips',
     'a<' + tag + '>Title</' + tag + '>b',
     'a<' + tag + '>Title</' + tag + '>b');
  eq(tag + ' with class attribute preserved',
     '<' + tag + ' class="exp-heading">Title</' + tag + '>',
     '<' + tag + ' class="exp-heading">Title</' + tag + '>');
}

eq('<table> with <tr><td> structure round-trips',
   '<table><tr><td>A</td><td>B</td></tr></table>',
   '<table><tr><td>A</td><td>B</td></tr></table>');

eq('full table with <thead>/<tbody>/<th>/<caption> round-trips',
   '<table><caption>Cap</caption><thead><tr><th>K</th></tr></thead><tbody><tr><td>V</td></tr></tbody></table>',
   '<table><caption>Cap</caption><thead><tr><th>K</th></tr></thead><tbody><tr><td>V</td></tr></tbody></table>');

eq('<table class="exp-table"> preserves class, drops other attrs',
   '<table class="exp-table" border="1"><tr><td>A</td></tr></table>',
   '<table class="exp-table"><tr><td>A</td></tr></table>');

eq('<div class="exp-key"> preserves class',
   '<div class="exp-key"><p>Key point</p></div>',
   '<div class="exp-key"><p>Key point</p></div>');

eq('nested <p><strong>...</strong></p> round-trips',
   '<p>Hello <strong>world</strong></p>',
   '<p>Hello <strong>world</strong></p>');

eq('<dl>/<dt>/<dd> definition list round-trips',
   '<dl><dt>Term</dt><dd>Def</dd></dl>',
   '<dl><dt>Term</dt><dd>Def</dd></dl>');

eq('<details>/<summary> round-trips',
   '<details><summary>More</summary>hidden</details>',
   '<details><summary>More</summary>hidden</details>');

eq('<hr> void element preserved',
   'a<hr>b',
   'a<hr>b');

eq('<blockquote> round-trips',
   '<blockquote>important</blockquote>',
   '<blockquote>important</blockquote>');

eq('<pre><code> nested round-trips',
   '<pre><code>x = 1</code></pre>',
   '<pre><code>x = 1</code></pre>');


// =========================================================================
// 4. Existing HTML entities survive (don't get double-encoded)
// =========================================================================
console.log('\n[4] Entity preservation\n');

eq('&amp; survives',
   'A &amp; B',
   'A &amp; B');

eq('&micro; survives',
   '5 &micro;s half-life',
   '5 &micro;s half-life');

eq('mixed entities + tags',
   '&Delta;G = -100 kJ at 298&nbsp;K, with E<sup>0</sup> = +1.10 V',
   '&Delta;G = -100 kJ at 298&nbsp;K, with E<sup>0</sup> = +1.10 V');


// =========================================================================
// 5. Edge cases
// =========================================================================
console.log('\n[5] Edge cases\n');

eq('null input -> empty string',
   null,
   '');

eq('undefined input -> empty string',
   undefined,
   '');

eq('empty string -> empty string',
   '',
   '');

eq('numbers coerced to string',
   42,
   '42');

eq('unclosed tag stays escaped',
   'broken <sub2',
   'broken &lt;sub2');

eq('whitespace inside tag tolerated',
   'H< sub >2< /sub >O',
   'H<sub>2</sub>O');


// =========================================================================
// Summary
// =========================================================================
console.log('\n' + '='.repeat(56));
console.log('  ' + passed + ' passed, ' + failed + ' failed (' + (passed + failed) + ' total)');
console.log('='.repeat(56) + '\n');

if (failed > 0) {
  process.exit(1);
}
