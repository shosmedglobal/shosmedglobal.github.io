/* email-typo.js — "did you mean gmail.com?", as an explicit choice.
 * ---------------------------------------------------------------------------
 * <input type="email"> accepts applicant1234@gmail.ocm. It is syntactically a
 * perfectly good address; it just does not exist. By the time the account is
 * created the damage is done: the welcome-and-verify email hard bounces off
 * send.shosmed.com, the applicant never learns we cannot reach them, and the
 * bounce counts against the sending reputation that carries everyone else's
 * receipts.
 *
 * WHAT THIS IS NOT. A suggestion is a guess about spelling. It is not
 * evidence that a mailbox exists, and it is not evidence that the person
 * typing owns it. Nothing here substitutes for clicking a link in the inbox.
 *
 * Design rules, each one load-bearing:
 *   - It never rewrites the address silently. The two outcomes are both
 *     buttons the person presses: "Use <suggestion>" or "Keep <what I typed>".
 *   - A second ordinary submit does NOT bypass it. The earlier version let
 *     the same click-through count as consent, which is indistinguishable
 *     from someone impatiently double-clicking. Consent now has its own
 *     button.
 *   - Keeping an address consents to THAT address. Edit the field afterwards
 *     and the new value is judged on its own.
 *   - Whitespace and domain case are normalised, because " A@GMAIL.COM " is
 *     the same mailbox and nobody meant the spaces. The local part is never
 *     touched: some providers treat it as case-sensitive, and "correcting"
 *     someone's mailbox name would be a worse bug than the one being fixed.
 *
 * Usage:
 *   var guard = SHOSEmailTypo.attach(inputEl, hintEl);
 *   if (guard.blocks()) return;      // in the submit handler
 */
(function (global) {
  'use strict';

  // The providers our applicants actually use. Korean and Czech mailboxes
  // are in here deliberately: the audience is US/Canada applicants plus
  // students already in Prague.
  //
  // This list is also how a genuine domain buys silence. An exact match
  // never produces a suggestion, so anything real that sits one letter from
  // a neighbour (mail.cz beside email.cz) belongs here.
  var DOMAINS = [
    'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.ca', 'yahoo.co.uk',
    'hotmail.com', 'hotmail.ca', 'hotmail.co.uk', 'outlook.com', 'live.com',
    'live.ca', 'msn.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com',
    'proton.me', 'protonmail.com', 'pm.me',
    'comcast.net', 'verizon.net', 'sbcglobal.net', 'att.net', 'bellsouth.net',
    'rogers.com', 'shaw.ca', 'telus.net', 'sympatico.ca',
    'mail.com', 'gmx.com', 'gmx.de', 'zoho.com', 'yandex.com', 'yandex.ru',
    'naver.com', 'hanmail.net', 'daum.net', 'kakao.com', 'nate.com',
    'qq.com', '163.com', '126.com',
    'seznam.cz', 'centrum.cz', 'email.cz', 'mail.cz', 'volny.cz',
    'walla.com', 'walla.co.il'
  ];

  // Only consulted for a domain we do not know, so a typo in the last label
  // is still catchable: someone@charlesuniversity.ocm. Institutional and
  // international endings are in here so they are recognised as fine.
  var TLDS = [
    'com', 'net', 'org', 'edu', 'gov', 'mil', 'int', 'info', 'biz', 'name',
    'io', 'me', 'co', 'us', 'ca', 'uk', 'eu', 'de', 'fr', 'es', 'it', 'nl',
    'se', 'no', 'dk', 'fi', 'pl', 'cz', 'sk', 'at', 'ch', 'be', 'pt', 'gr',
    'hu', 'ro', 'bg', 'hr', 'si', 'lt', 'lv', 'ee',
    'ie', 'il', 'tr', 'ru', 'ua', 'in', 'cn', 'jp', 'kr', 'au', 'nz', 'br',
    'mx', 'ar', 'cl', 'za', 'ng', 'ke', 'eg', 'sa', 'ae', 'sg', 'hk', 'tw',
    'ac', 'sch', 'health', 'med', 'clinic', 'care', 'university'
  ];

  // Damerau-Levenshtein (optimal string alignment), with an early exit.
  //
  // The transposition rule is the whole reason this is not plain
  // Levenshtein. ".ocm" for ".com" is two substitutions to Levenshtein and
  // one swap to a human, and swapping adjacent letters is the most common
  // way a domain gets mistyped. Counting it as 1 is what lets a tight
  // threshold catch real typos without inventing suggestions for addresses
  // that are fine.
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

  /* Trim, and lower-case the DOMAIN only. Returns the string unchanged when
     it is not shaped like an address, so a half-typed value survives. */
  function normalize(raw) {
    var s = String(raw == null ? '' : raw).trim();
    var at = s.lastIndexOf('@');
    if (at < 1) return s;
    return s.slice(0, at) + '@' + s.slice(at + 1).toLowerCase();
  }

  /* Returns a corrected address, or null when there is nothing to say.
     Null means "no opinion". It does NOT mean the address is valid. */
  function suggest(raw) {
    var email = normalize(raw);
    var at = email.lastIndexOf('@');
    if (at < 1 || at === email.length - 1) return null;

    var local = email.slice(0, at);
    var domain = email.slice(at + 1);
    if (local.indexOf('@') !== -1) return null;      // a@@b.com and friends
    if (domain.indexOf('.') === -1) return null;
    if (domain.charAt(0) === '.' || domain.slice(-1) === '.') return null;
    if (DOMAINS.indexOf(domain) !== -1) return null;

    // A short domain gets a tighter cap, or "mail.cz" starts suggesting
    // "mail.com" at everyone.
    var cap = domain.length <= 8 ? 1 : 2;
    var hit = closest(domain, DOMAINS, cap);
    if (hit) return local + '@' + hit;

    // Unknown domain: the last label is still worth checking. Skip anything
    // with more than one dot, so co.uk, edu.au and lf3.cuni.cz are left
    // alone — university and hospital addresses must stay usable.
    if (domain.split('.').length !== 2) return null;
    var dot = domain.lastIndexOf('.');
    var sld = domain.slice(0, dot);
    var tld = domain.slice(dot + 1);
    if (!sld || TLDS.indexOf(tld) !== -1) return null;
    var tldHit = closest(tld, TLDS, 1);
    if (tldHit && tldHit.indexOf('.') === -1) return local + '@' + sld + '.' + tldHit;
    return null;
  }

  var seq = 0;

  /* Wires an email input to a container that renders the choice.
   *
   * Returns { blocks, reset, suggestion }:
   *   blocks()     true when the caller must STOP and let the person choose.
   *                Stays true until they press one of the two buttons.
   *   reset()      forget any decision (after the form is reused).
   *   suggestion() the current suggestion string or null.
   *
   * opts.onDecision(choice, value) fires with 'use' or 'keep'.
   */
  function attach(input, box, opts) {
    opts = opts || {};
    var keptValue = null;          // the exact normalized value consented to
    var id = 'etg' + (++seq);

    function hide() {
      box.hidden = true;
      box.innerHTML = '';
      input.removeAttribute('aria-describedby');
      input.removeAttribute('aria-invalid');
    }

    function decide(choice, value) {
      keptValue = value;
      hide();
      if (typeof opts.onDecision === 'function') opts.onDecision(choice, value);
    }

    function render(typed, fix) {
      box.hidden = false;
      box.id = box.id || id;
      box.setAttribute('role', 'group');
      box.setAttribute('aria-live', 'polite');
      box.setAttribute('aria-label', 'Check this email address');
      input.setAttribute('aria-describedby', box.id);
      input.setAttribute('aria-invalid', 'true');
      box.innerHTML = '';

      var q = document.createElement('p');
      q.className = 'email-typo-q';
      q.textContent = 'Did you mean ' + fix + '?';
      box.appendChild(q);

      var row = document.createElement('div');
      row.className = 'email-typo-actions';

      var useBtn = document.createElement('button');
      useBtn.type = 'button';                       // never submits the form
      useBtn.className = 'email-typo-btn email-typo-btn-use';
      useBtn.textContent = 'Use ' + fix;
      useBtn.addEventListener('click', function () {
        input.value = fix;
        decide('use', fix);
        input.focus();
      });

      var keepBtn = document.createElement('button');
      keepBtn.type = 'button';
      keepBtn.className = 'email-typo-btn email-typo-btn-keep';
      keepBtn.textContent = 'Keep ' + typed;
      keepBtn.addEventListener('click', function () {
        input.value = typed;                        // normalized, not corrected
        decide('keep', typed);
        input.focus();
      });

      row.appendChild(useBtn);
      row.appendChild(keepBtn);
      box.appendChild(row);
    }

    // Evaluate the field. `force` renders the choice even if the person has
    // not left the field yet, which is what a blocked submit needs.
    function evaluate(force) {
      var typed = normalize(input.value);
      if (typed !== input.value) input.value = typed;   // trim + domain case

      // A decision only covers the value it was made about.
      if (keptValue !== null && keptValue !== typed) keptValue = null;

      var fix = suggest(typed);
      if (!fix || keptValue === typed) { hide(); return null; }
      if (force || document.activeElement !== input) render(typed, fix);
      return fix;
    }

    // 'change' catches autofill and password managers, which often do not
    // fire 'input'. 'blur' catches tabbing away. 'input' only clears, so the
    // panel never fights someone mid-keystroke.
    input.addEventListener('input', function () {
      if (keptValue !== null && keptValue !== normalize(input.value)) keptValue = null;
      hide();
    });
    input.addEventListener('change', function () { evaluate(false); });
    input.addEventListener('blur', function () { evaluate(false); });

    return {
      blocks: function () { return evaluate(true) !== null; },
      reset: function () { keptValue = null; hide(); },
      suggestion: function () { return suggest(input.value); }
    };
  }

  global.SHOSEmailTypo = {
    suggest: suggest,
    normalize: normalize,
    attach: attach
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = global.SHOSEmailTypo;
  }
})(typeof window !== 'undefined' ? window : globalThis);
