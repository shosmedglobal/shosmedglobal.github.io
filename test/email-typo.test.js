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
  signup.indexOf('emailTypoCheck()') > 0 &&
  signup.indexOf('emailTypoCheck()') < signup.indexOf("btn.textContent = 'Creating account...'"));
check('5f it degrades to nothing if the script fails to load',
  signup.includes('window.SHOSEmailTypo\n') || signup.includes('window.SHOSEmailTypo ?') ||
  /emailTypoCheck && emailTypoCheck\(\)/.test(signup));

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
