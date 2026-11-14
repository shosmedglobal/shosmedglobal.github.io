/* ===========================================================================
 * Exam copy guard
 * ---------------------------------------------------------------------------
 * Staff may copy the questions, options and explanations out of exams they
 * have taken. Everyone else may not.
 *
 *   SHOSExamCopy.apply({ isAdmin, isReviewer })
 *
 * Call it once per page, as soon as the signed-in user's role is known.
 * qbank.html and practice-exam.html both already compute those two flags.
 *
 * Two halves, because blocking selection alone is not enough and is not
 * always wanted:
 *
 *   1. CSS (exam-copy-guard.css) blocks SELECTION for guarded users. The
 *      QBank explanation pane is deliberately left selectable even when
 *      guarded, because the highlighter needs a selection to work with.
 *   2. This file blocks the copy and cut EVENTS inside an exam, which is
 *      what stops the highlighter's selection from becoming copied text.
 *
 * Deliberately not a lock. A determined reader can open devtools or retype
 * what is on screen, and nothing client-side changes that. The point is to
 * stop casual bulk copying of a paid question bank, not to pretend the text
 * was never sent to the browser.
 *
 * Fails closed: until apply() runs, the page carries no allow class, and the
 * pages' own CSS plus the handlers below behave as if the user were guarded.
 * ======================================================================== */
(function (global) {
  'use strict';

  var ALLOW = 'exam-copy-allowed';
  var GUARD = 'exam-copy-guarded';

  // The regions whose text is the product. A copy whose selection touches
  // one of these is blocked for guarded users.
  var EXAM_ROOTS = '.qbank-section, .exam-app';

  var installed = false;

  function isAllowed() {
    return !!(document.body && document.body.classList.contains(ALLOW));
  }

  /** True when the current selection touches an exam region. */
  function selectionTouchesExam() {
    var sel = global.getSelection ? global.getSelection() : null;
    if (!sel || sel.isCollapsed || !sel.rangeCount) return false;
    var node = sel.getRangeAt(0).commonAncestorContainer;
    if (node && node.nodeType === 3) node = node.parentNode;      // text node
    return !!(node && node.closest && node.closest(EXAM_ROOTS));
  }

  function onCopyOrCut(e) {
    if (isAllowed()) return;                 // staff: let it through
    var t = e.target;
    if (t && t.nodeType === 3) t = t.parentNode;
    // Never interfere with a real input the user is typing in, such as the
    // "report an issue" prompt or the calculator.
    if (t && t.closest && t.closest('input, textarea, [contenteditable="true"]')) return;
    if (!selectionTouchesExam()) return;     // selection is elsewhere on the page
    e.preventDefault();
  }

  function install() {
    if (installed) return;
    installed = true;
    // Capture phase, so a handler on an inner element cannot pre-empt it.
    document.addEventListener('copy', onCopyOrCut, true);
    document.addEventListener('cut', onCopyOrCut, true);
  }

  /**
   * @param {{isAdmin?: boolean, isReviewer?: boolean}} role
   * @returns {boolean} whether copying was allowed
   */
  function apply(role) {
    var r = role || {};
    var allowed = r.isAdmin === true || r.isReviewer === true;
    var body = document.body;
    if (body) {
      body.classList.toggle(ALLOW, allowed);
      body.classList.toggle(GUARD, !allowed);
    }
    install();
    return allowed;
  }

  /**
   * Put the page into the guarded state straight away, before any auth check
   * has run. practice-exam.html has no protection of its own, so without this
   * a page where apply() never runs (auth hangs, a script throws, the user
   * never signs in) would leave the mock exam fully selectable.
   */
  function guardNow() {
    if (!document.body) return;
    if (document.body.classList.contains(ALLOW)) return;   // apply() got there first
    document.body.classList.add(GUARD);
    install();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', guardNow);
  } else {
    guardNow();
  }

  global.SHOSExamCopy = {
    apply: apply,
    guardNow: guardNow,
    ALLOW: ALLOW,
    GUARD: GUARD,
    EXAM_ROOTS: EXAM_ROOTS,
    // exposed for the test
    _selectionTouchesExam: selectionTouchesExam,
    _onCopyOrCut: onCopyOrCut,
  };
}(typeof window !== 'undefined' ? window : globalThis));
