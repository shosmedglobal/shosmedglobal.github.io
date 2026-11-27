'use strict';
/* Who may be indexed, and how we say so.

   Search Console reported three URLs as "Indexed, though blocked by
   robots.txt". That state is not a crawl problem, it is a contradiction:
   robots.txt told Google not to fetch the page, inbound links told Google
   the page exists, so it indexed the URL with no title and no description
   and never read the noindex that would have removed it.

   The rule this file enforces is therefore: a page is kept out of the index
   by its own meta tag, never by Disallow. Disallow is only for things that
   cannot carry a tag, which here means the study fragments (no <head>) and
   Firebase's internal paths.

   The opposite mistake is just as bad, so the sitemap is checked from both
   ends: nothing in it may be blocked, and nothing in it may be noindexed. */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

let passed = 0;
const failures = [];
function check(name, cond) {
  if (cond) passed++;
  else failures.push(name);
}

const robots = read('robots.txt');
const sitemap = read('sitemap.xml');

const disallowed = robots
  .split(/\r?\n/)
  .filter(l => /^\s*Disallow:/i.test(l))
  .map(l => l.replace(/^\s*Disallow:\s*/i, '').trim())
  .filter(Boolean);

// ---------------------------------------------------------------------------
// 1. Pages that must be noindex, and must NOT be blocked from crawling.
//    Google has to fetch them to see the tag. Blocking them is what caused
//    the "Indexed, though blocked by robots.txt" report in the first place.
// ---------------------------------------------------------------------------
const NOINDEX_PAGES = [
  'dashboard.html',
  'qbank.html',
  'qbank-diag.html',
  'practice-exam.html',
  'success.html',
  'login.html',
  'signup.html',
  // Step 2 of registration and the handler for the links we email. Both are
  // reachable from a signed-out browser, so both need a tag of their own.
  'verify-email.html',
  'auth-action.html',
];

for (const f of NOINDEX_PAGES) {
  const html = read(f);
  const tag = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  check('1a ' + f + ' carries a robots meta', !!tag);
  check('1b ' + f + ' is noindex', !!tag && /noindex/i.test(tag[1]));
  check('1c ' + f + ' is not blocked in robots.txt',
    !disallowed.some(d => d === '/' + f));
}

// ---------------------------------------------------------------------------
// 2. What robots.txt is still allowed to block: only things that cannot
//    carry a meta tag of their own.
// ---------------------------------------------------------------------------
const BLOCKABLE = ['/study/', '/functions/', '/__/'];
for (const d of disallowed) {
  check('2a Disallow ' + d + ' is one of the pathless-fragment paths',
    BLOCKABLE.includes(d));
}
check('2b the study fragments are still blocked', disallowed.includes('/study/'));
check('2c robots.txt advertises the sitemap',
  /^Sitemap:\s*https:\/\/shosmed\.com\/sitemap\.xml$/m.test(robots));
check('2d crawling is allowed by default', /^Allow:\s*\/$/m.test(robots));

// ---------------------------------------------------------------------------
// 3. The sitemap, from both ends.
// ---------------------------------------------------------------------------
const entries = [];
const RE = /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g;
let m;
while ((m = RE.exec(sitemap))) entries.push({ loc: m[1], lastmod: m[2] });

check('3a the sitemap has entries', entries.length >= 17);

const FILE_FOR = {
  'https://shosmed.com/': 'index.html',
  'https://shosmed.com/blog/': 'blog/index.html',
};
const today = new Date().toISOString().slice(0, 10);

for (const e of entries) {
  const rel = FILE_FOR[e.loc] || e.loc.replace('https://shosmed.com/', '');
  check('3b ' + rel + ' exists', fs.existsSync(path.join(ROOT, rel)));

  const html = fs.existsSync(path.join(ROOT, rel)) ? read(rel) : '';
  check('3c ' + rel + ' is not noindex', !/<meta\s+name="robots"[^>]*noindex/i.test(html));

  const urlPath = e.loc.replace('https://shosmed.com', '');
  check('3d ' + rel + ' is not blocked by robots.txt',
    !disallowed.some(d => urlPath === d || (d.endsWith('/') && urlPath.startsWith(d))));

  check('3e ' + rel + ' lastmod is a plain date', /^\d{4}-\d{2}-\d{2}$/.test(e.lastmod));
  check('3f ' + rel + ' lastmod is not in the future', e.lastmod <= today);

  // A lastmod that never moves is worse than none: it tells Google the page
  // has not changed since the date it is stuck on.
  check('3g ' + rel + ' lastmod is not the stale 2026-05-20 stamp',
    e.lastmod !== '2026-05-20');

  // Self-referential absolute canonical, so the www/github.io/http variants
  // all fold into one URL.
  const can = html.match(/<link rel="canonical" href="([^"]+)"/);
  check('3h ' + rel + ' canonical points at its own https URL', !!can && can[1] === e.loc);
}

// ---------------------------------------------------------------------------
console.log('indexability: ' + passed + ' passed, ' + failures.length + ' failed');
for (const f of failures) console.log('\n  FAIL ' + f);
process.exit(failures.length ? 1 : 0);
