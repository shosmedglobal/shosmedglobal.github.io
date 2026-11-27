/* email-typo.js — "did you mean gmail.com?"
 * ---------------------------------------------------------------------------
 * <input type="email"> accepts applicant1234@gmail.ocm. It is syntactically a
 * perfectly good address; it just does not exist. By the time the account is
 * created the damage is already done: the welcome-and-verify email hard
 * bounces off send.shosmed.com, the applicant never learns that we cannot
 * reach them, and the bounce counts against our sending reputation for
 * everybody else's receipts.
 *
 * The only place to catch it is the keyboard. This suggests a correction for
 * a domain that is one or two characters away from a real one, and it never
 * blocks: a suggestion the person ignores twice goes through. Someone really
 * does own an address at a domain we have never heard of.
 *
 * Usage:  SHOSEmailTypo.suggest('a@gmail.ocm')  ->  'a@gmail.com'
 *         SHOSEmailTypo.suggest('a@gmail.com')  ->  null
 */
(function (global) {
  'use strict';

  // The providers our applicants actually use. Korean and Czech mailboxes are
  // in here deliberately: the audience is US/Canada applicants plus students
  // already in Prague, and hanmail/naver/seznam typos are not rare.
  var DOMAINS = [
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.ca', 'yahoo.co.uk',
    'hotmail.com', 'hotmail.ca', 'hotmail.co.uk', 'outlook.com', 'live.com',
    'msn.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com',
    'proton.me', 'protonmail.com', 'pm.me',
    'comcast.net', 'verizon.net', 'sbcglobal.net', 'att.net', 'bellsouth.net',
    'rogers.com', 'shaw.ca', 'telus.net', 'sympatico.ca',
    'mail.com', 'gmx.com', 'zoho.com', 'yandex.com',
    'naver.com', 'hanmail.net', 'daum.net', 'kakao.com', 'nate.com',
    'qq.com', '163.com', '126.com',
    // mail.cz is here because it is real and sits one letter from email.cz.
    // The known list is how a genuine domain buys silence: an exact match
    // never produces a suggestion.
    'seznam.cz', 'centrum.cz', 'email.cz', 'mail.cz', 'volny.cz',
    'walla.com', 'walla.co.il'
  ];

  // Only used for addresses whose domain we do not know, so a typo in the
  // last label is still catchable: someone@charlesuniversity.ocm.
  var TLDS = [
    'com', 'net', 'org', 'edu', 'gov', 'mil', 'int', 'info', 'biz',
    'io', 'me', 'co', 'us', 'ca', 'uk', 'eu', 'de', 'fr', 'es', 'it', 'nl',
    'se', 'no', 'dk', 'fi', 'pl', 'cz', 'sk', 'at', 'ch', 'be', 'pt', 'gr',
    'ie', 'il', 'tr', 'ru', 'ua', 'in', 'cn', 'jp', 'kr', 'au', 'nz', 'br',
    'mx', 'ar', 'za', 'edu.au', 'ac.uk', 'co.uk', 'co.il', 'co.kr'
  ];

  // Damerau-Levenshtein (optimal string alignment), with an early exit.
  //
  // The transposition rule is the whole reason this is not plain Levenshtein.
  // ".ocm" for ".com" is two substitutions to Levenshtein and one swap to a
  // human, and swapping two adjacent letters is the single most common way
  // to mistype a domain. Counting it as 1 is what lets a tight cap catch the
  // real typos without inventing suggestions for addresses that are fine.
  function distance(a, b, cap) {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > cap) return cap + 1;
    var la = a.length, lb = b.length;
    var prev2 = [], prev = [], cur, i, j;
    for (j = 0; j <= lb; j++) prev[j] = j;
    for (i = 1; i <= la; i++) {
      cur = [i];
      var best = i;
      for (j = 1; j <= lb; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        var v = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
        if (i > 1 && j > 1 &&
            a.charAt(i - 1) === b.charAt(j - 2) &&
            a.charAt(i - 2) === b.charAt(j - 1)) {
          v = Math.min(v, prev2[j - 2] + 1);
        }
        cur[j] = v;
        if (v < best) best = v;
      }
      if (best > cap) return cap + 1;
      prev2 = prev;
      prev = cur;
    }
    return prev[lb];
  }

  function closest(needle, list, cap) {
    var best = null, bestD = cap + 1, i, d;
    for (i = 0; i < list.length; i++) {
      d = distance(needle, list[i], cap);
      if (d > 0 && d < bestD) { bestD = d; best = list[i]; }
    }
    return best;
  }

  /* Returns a corrected address, or null when there is nothing to say.
     Null means "no opinion", NOT "this address is valid". */
  function suggest(raw) {
    var email = String(raw == null ? '' : raw).trim();
    var at = email.lastIndexOf('@');
    if (at < 1 || at === email.length - 1) return null;

    // The local part is echoed back exactly as typed. Some providers treat it
    // as case-sensitive, and a "correction" that quietly lower-cases someone's
    // mailbox name would be a worse bug than the one being fixed.
    var local = email.slice(0, at);
    var domain = email.slice(at + 1).toLowerCase();
    if (domain.indexOf('.') === -1) return null;
    if (DOMAINS.indexOf(domain) !== -1) return null;

    // A short domain gets a tighter cap, or "mail.cz" starts suggesting
    // "mail.com" at everyone.
    var cap = domain.length <= 8 ? 1 : 2;
    var hit = closest(domain, DOMAINS, cap);
    if (hit) return local + '@' + hit;

    // Unknown domain: the last label is still worth checking. Skip anything
    // with more than one dot so co.uk and com.au are left alone.
    if (domain.split('.').length !== 2) return null;
    var dot = domain.lastIndexOf('.');
    var sld = domain.slice(0, dot);
    var tld = domain.slice(dot + 1);
    if (!sld || TLDS.indexOf(tld) !== -1) return null;
    var tldHit = closest(tld, TLDS, 1);
    if (tldHit && tldHit.indexOf('.') === -1) return local + '@' + sld + '.' + tldHit;
    return null;
  }

  /* Wires a text input to a container element that shows the suggestion.
     onAccept is optional and runs after the value has been corrected.
     Returns a check() the submit handler calls: it returns true when the
     caller should STOP and let the person look at the suggestion, which it
     only ever does once per edit. */
  function attach(input, box, onAccept) {
    var warned = false;

    function hide() { box.hidden = true; box.innerHTML = ''; }

    function show(fix) {
      box.hidden = false;
      box.innerHTML = '';
      var span = document.createElement('span');
      span.textContent = 'Did you mean ';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'email-typo-fix';
      btn.textContent = fix;
      btn.addEventListener('click', function () {
        input.value = fix;
        warned = false;
        hide();
        if (typeof onAccept === 'function') onAccept(fix);
        input.focus();
      });
      var q = document.createElement('span');
      q.textContent = '?';
      box.appendChild(span);
      box.appendChild(btn);
      box.appendChild(q);
    }

    input.addEventListener('input', function () { warned = false; hide(); });
    input.addEventListener('blur', function () {
      var fix = suggest(input.value);
      if (fix) show(fix); else hide();
    });

    return function check() {
      var fix = suggest(input.value);
      if (!fix) { hide(); return false; }
      if (warned) return false;   // they looked at it and meant it
      warned = true;
      show(fix);
      return true;
    };
  }

  global.SHOSEmailTypo = { suggest: suggest, attach: attach };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = global.SHOSEmailTypo;
  }
})(typeof window !== 'undefined' ? window : globalThis);
