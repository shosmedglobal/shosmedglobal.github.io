'use strict';
/* The typo guard, from both sides.
 *
 * It exists because an address ending @gmail.ocm got through signup: a valid
 * address at a domain that does not exist, so the welcome-and-verify email
 * hard bounced and nobody found out.
 *
 * The expensive mistake here is not a missed typo, it is a false positive.
 * A suggestion against a domain the person actually owns teaches them to
 * ignore the thing, so the "leaves alone" block below matters more than the
 * "catches" block. Nothing it says ever blocks a submit outright.
 */

const path = require('path');
const typo = require(path.join(__dirname, '..', 'email-typo.js'));

let passed = 0;
const failures = [];
function check(name, cond) {
  if (cond) passed++;
  else failures.push(name);
}
function suggests(input, expected) {
  const got = typo.suggest(input);
  check(input + ' -> ' + expected + (got === expected ? '' : ' (got ' + got + ')'),
    got === expected);
}

// ---------------------------------------------------------------------------
// 1. Catches. The first one is the address from the admin list.
// ---------------------------------------------------------------------------
suggests('applicant1234@gmail.ocm', 'applicant1234@gmail.com');
suggests('a@gmail.con', 'a@gmail.com');
suggests('a@gmail.cmo', 'a@gmail.com');
suggests('a@gmai.com', 'a@gmail.com');
suggests('a@gnail.com', 'a@gmail.com');
suggests('a@gmial.com', 'a@gmail.com');
suggests('a@hotmial.com', 'a@hotmail.com');
suggests('a@hotmai.com', 'a@hotmail.com');
suggests('a@yahooo.com', 'a@yahoo.com');
suggests('a@outlok.com', 'a@outlook.com');
suggests('a@icloud.cm', 'a@icloud.com');
suggests('a@protonmai.com', 'a@protonmail.com');
suggests('a@nave.com', 'a@naver.com');
suggests('a@hanmai.net', 'a@hanmail.net');

// An unknown domain is still worth a look when only the last label is wrong.
suggests('a@charlesuniversity.ocm', 'a@charlesuniversity.com');
suggests('a@somehospital.nte', 'a@somehospital.net');

// ---------------------------------------------------------------------------
// 2. Leaves alone. Every one of these is a real address someone could own.
// ---------------------------------------------------------------------------
const QUIET = [
  'a@gmail.com', 'a@yahoo.com', 'a@hotmail.com', 'a@outlook.com',
  'a@icloud.com', 'a@proton.me', 'a@pm.me', 'a@me.com',
  'a@naver.com', 'a@hanmail.net', 'a@daum.net', 'a@qq.com',
  'a@seznam.cz', 'a@centrum.cz', 'a@email.cz',
  'a@mail.cz',                       // short domain, tight cap
  'a@live.ca', 'a@yahoo.fr', 'a@yahoo.co.uk', 'a@hotmail.co.uk',
  'a@lf3.cuni.cz',                   // three labels: left alone entirely
  'a@student.cuni.cz',
  'a@mountsinai.org', 'a@humc.edu', 'a@example.com',
  'a@nhs.uk', 'a@univ.edu.au',
];
for (const e of QUIET) {
  check('quiet on ' + e, typo.suggest(e) === null);
}

// ---------------------------------------------------------------------------
// 3. Nonsense in, null out. Never throw on a half-typed address: the guard
//    runs on blur, so it sees every intermediate state.
// ---------------------------------------------------------------------------
const JUNK = ['', '   ', null, undefined, 'a', 'a@', '@gmail.com', 'a@b',
              'no-at-sign.com', '@', 'a@@gmail.com', 'a@.com', 123, {}];
for (const j of JUNK) {
  let threw = false, got;
  try { got = typo.suggest(j); } catch (e) { threw = true; }
  check('no throw on ' + JSON.stringify(j), !threw);
  check('no suggestion for ' + JSON.stringify(j), !threw && got === null);
}

// ---------------------------------------------------------------------------
// 4. The local part comes back exactly as typed. Some providers are
//    case-sensitive there, so "correcting" it would be its own bug.
// ---------------------------------------------------------------------------
suggests('Given.Family@gmail.ocm', 'Given.Family@gmail.com');
suggests('A_B+tag@gmail.ocm', 'A_B+tag@gmail.com');
check('surrounding whitespace is ignored',
  typo.suggest('  a@gmail.ocm  ') === 'a@gmail.com');

// ---------------------------------------------------------------------------
// 5. The page wiring. attach() must exist and the signup form must use it,
//    with somewhere to render and the script actually loaded.
// ---------------------------------------------------------------------------
const fs = require('fs');
const ROOT = path.join(__dirname, '..');
const signup = fs.readFileSync(path.join(ROOT, 'signup.html'), 'utf8');

check('5a attach is exported', typeof typo.attach === 'function');
check('5b signup loads the guard', /<script src="email-typo\.js\?v=/.test(signup));
check('5c signup has somewhere to show it', signup.includes('id="emailTypoHint"'));
check('5d signup wires the field to it', signup.includes('window.SHOSEmailTypo.attach('));
check('5e the check runs before the account is created',
  signup.indexOf('emailGuard.blocks()') > 0 &&
  signup.indexOf('emailGuard.blocks()') < signup.indexOf("btn.textContent = 'Creating account...'"));
check('5f it degrades to nothing if the script fails to load',
  /emailGuard && emailGuard\.blocks\(\)/.test(signup));

// The contact form is the other door a mistyped address walks through: a
// lead we can read and cannot answer.
const modal = fs.readFileSync(path.join(ROOT, 'contact-modal.js'), 'utf8');
check('5g the contact form has somewhere to show it',
  modal.includes('id="shosCmEmailHint"'));
check('5h the contact form wires the guard', modal.includes('window.SHOSEmailTypo.attach('));
check('5i the contact form blocks on an unanswered suggestion',
  /_emailGuard && _emailGuard\.blocks\(\)/.test(modal));

// Every page that can open the modal must actually load the script, or the
// guard silently is not there.
const MODAL_PAGES = ['applicants.html', 'community.html', 'index.html',
                     'lf3.html', 'mentors.html', 'students.html',
                     'blog/from-acceptance-to-residency.html'];
for (const p of MODAL_PAGES) {
  const html = fs.readFileSync(path.join(ROOT, p), 'utf8');
  check('5j ' + p + ' loads contact-modal.js', html.includes('contact-modal.js'));
  check('5k ' + p + ' loads the guard too', /email-typo\.js\?v=/.test(html));
}

// ---------------------------------------------------------------------------
// 5L. The contract that makes this a choice rather than a nag. These are
//     source-level assertions because the behaviour is DOM behaviour; the
//     browser pass covers the rendered side.
// ---------------------------------------------------------------------------
const guardSrc = fs.readFileSync(path.join(ROOT, 'email-typo.js'), 'utf8');
check('5L1 both answers are offered', /Use .{0,10}\+ fix/.test(guardSrc) &&
  /Keep .{0,12}\+ typed/.test(guardSrc));
check('5L2 the buttons cannot submit the form',
  (guardSrc.match(/\.type = 'button'/g) || []).length >= 2);
check('5L3 consent is recorded against one exact value',
  guardSrc.includes('keptValue !== typed'));
check('5L4 editing after a decision voids it',
  /keptValue !== null && keptValue !== normalize\(input\.value\)/.test(guardSrc));
check('5L5 autofill is covered', guardSrc.includes("addEventListener('change'"));
check('5L6 the field is described by the panel for screen readers',
  guardSrc.includes("setAttribute('aria-describedby'") &&
  guardSrc.includes("'aria-live', 'polite'"));
check('5L7 no silent second-submit bypass remains', !/warned/.test(guardSrc));

// ---------------------------------------------------------------------------
// 5M. normalize(): whitespace and domain case only. The local part is
//     load-bearing for plus-aliases and case-sensitive mailboxes.
// ---------------------------------------------------------------------------
check('5M1 trims', typo.normalize('  a@gmail.com  ') === 'a@gmail.com');
check('5M2 lower-cases the domain', typo.normalize('a@GMAIL.COM') === 'a@gmail.com');
check('5M3 leaves the local part alone', typo.normalize('A.B@GMAIL.COM') === 'A.B@gmail.com');
check('5M4 keeps a plus alias', typo.normalize('me+lf3@Gmail.Com') === 'me+lf3@gmail.com');
check('5M5 survives a half-typed value', typo.normalize('  abc  ') === 'abc');
check('5M6 plus aliases are never flagged', typo.suggest('me+lf3@gmail.com') === null);
check('5M7 a plus alias typo still resolves',
  typo.suggest('me+lf3@gmail.ocm') === 'me+lf3@gmail.com');

// ---------------------------------------------------------------------------
// 6. Admin visibility: the row can only say "unverified" when it knows.
// ---------------------------------------------------------------------------
const audience = fs.readFileSync(path.join(ROOT, 'admin-audience.js'), 'utf8');
const dash = fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8');

check('6a buildPeople carries emailVerified', audience.includes('emailVerified:'));
check('6b it stays null when the source did not say',
  /typeof u\.emailVerified === 'boolean' \? u\.emailVerified : null/.test(audience));
check('6c the row marks a known-false, not a null',
  dash.includes("p.emailVerified === false ?"));
check('6d the marker has a style', dash.includes('.aa-unverified'));

// ---------------------------------------------------------------------------
console.log('email-typo: ' + passed + ' passed, ' + failures.length + ' failed');
for (const f of failures) console.log('\n  FAIL ' + f);
process.exit(failures.length ? 1 : 0);
