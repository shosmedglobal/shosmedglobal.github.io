// ===== Firebase Configuration =====
const firebaseConfig = {
  apiKey: "AIzaSyDGYSvXADpcZWNHuKXAzOKuRL9FlfJ7-u0",
  authDomain: "shos-med-global-6eb19.firebaseapp.com",
  projectId: "shos-med-global-6eb19",
  storageBucket: "shos-med-global-6eb19.firebasestorage.app",
  messagingSenderId: "66913419368",
  appId: "1:66913419368:web:69e97029afbabf96fe7bdd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ===== Auth Functions =====

// Map Firebase error codes to user-friendly messages. Covers both the
// legacy singular `auth/invalid-credential` (Firebase v9.0-9.16) and
// the current `auth/invalid-login-credentials` (v9.17+ / v10) plus
// modern user-disabled / operation-not-allowed variants.
function friendlyError(error) {
  const map = {
    'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/invalid-login-credentials': 'Incorrect email or password. Please try again.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/operation-not-allowed': 'Email/password sign-in is not enabled. Please contact support.',
    'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method (e.g. Google).',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/popup-blocked': 'Your browser blocked the sign-in popup. Please allow popups and try again.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/requires-recent-login': 'For your security, please sign in again and retry this action.',
    'auth/missing-password': 'Please enter your password.',
    'auth/missing-email': 'Please enter your email address.',
  };
  if (error && error.code && map[error.code]) return map[error.code];
  // Fallback: strip the "Firebase: Error (...)." prefix so the raw message
  // doesn't leak the SDK internals. Show a generic message rather than
  // the auth/xxx code.
  return 'Something went wrong. Please try again, or email contact@shosmed.com if it keeps happening.';
}

// Sign up with email/password
async function signUpWithEmail(name, email, password, path) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName: name });
    // Save profile to Firestore. Do NOT include `payments` — that field
    // is Stripe-webhook-only per Firestore rules; the client attempting
    // to plant it (even as `{}`) is rejected by the field allowlist.
    // Absent payments is treated the same as empty by every read site.
    await db.collection('users').doc(result.user.uid).set({
      name: name.substring(0, 200),
      email: email,
      path: path, // 'applicant' or 'student'
      agreedToTerms: true,
      agreedToTermsDate: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: friendlyError(error) };
  }
}

// Sign in with email/password
async function signInWithEmail(email, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    // Self-heal: ensure a Firestore profile exists. Older accounts (or
    // accounts whose signup Firestore write failed mid-flow) may exist in
    // Firebase Auth but have no users/{uid} doc, which makes them invisible
    // to the admin dashboard. Backfill a minimal doc on every sign-in so
    // they show up next time the admin loads the list.
    try { await ensureUserProfile(result.user); } catch (_) { /* non-fatal */ }
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: friendlyError(error) };
  }
}

// Ensure users/{uid} exists with at least the bare-minimum fields.
// Uses `merge:true` so we never overwrite existing data — only fills in gaps
// (createdAt, email, etc.) for accounts that lack them.
async function ensureUserProfile(user) {
  if (!user || !user.uid) return;
  const ref = db.collection('users').doc(user.uid);
  const snap = await ref.get();
  if (snap.exists) {
    // Doc exists. Only backfill `createdAt` if it's somehow missing —
    // otherwise leave the doc untouched (don't clobber path, payments, etc.).
    const data = snap.data() || {};
    const patch = {};
    if (!data.createdAt) {
      patch.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    if (!data.email && user.email) patch.email = user.email;
    if (!data.name && user.displayName) patch.name = user.displayName;
    if (Object.keys(patch).length > 0) {
      await ref.set(patch, { merge: true });
    }
    return;
  }
  // Doc missing entirely — create a minimal record so the admin can see them.
  // `path` is intentionally null (we don't know if they're applicant/student
  // without asking) — the admin can categorize later.
  // Omit `payments` — Stripe-webhook-only per rules.
  // Omit `backfilled` — was diagnostic-only, and adds no value; the admin can
  // tell a healed doc from an original one by the missing `agreedToTermsDate`.
  await ref.set({
    name: (user.displayName || '').substring(0, 200),
    email: user.email || '',
    path: null,
    agreedToTerms: true,   // they accepted ToS at original signup
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
}

// Sign in/up with Google
async function signInWithGoogle(path, fromSignup) {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    // Check if user profile exists in Firestore
    const doc = await db.collection('users').doc(result.user.uid).get();
    if (!doc.exists) {
      // New user - only allow account creation from the signup page
      if (!fromSignup) {
        // User tried to sign in but has no account - sign them out and redirect
        await auth.signOut();
        return { success: false, error: 'No account found. Please sign up first.', needsSignup: true };
      }
      // Create profile from signup page. Omit `payments` — Stripe-webhook-only.
      await db.collection('users').doc(result.user.uid).set({
        name: (result.user.displayName || '').substring(0, 200),
        email: result.user.email,
        path: path || 'applicant',
        agreedToTerms: true,
        agreedToTermsDate: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // Existing Google user — self-heal any missing fields (createdAt,
      // email, name) so the admin dashboard sees them. Non-fatal on error.
      try { await ensureUserProfile(result.user); } catch (_) {}
    }
    return { success: true, user: result.user, isNewUser: !doc.exists };
  } catch (error) {
    return { success: false, error: friendlyError(error) };
  }
}

// Sign out
async function signOut() {
  try {
    await auth.signOut();
    // Clear cached auth state so next page load pre-renders the anon nav
    try { localStorage.setItem('shos_authed', '0'); } catch (e) {}
    window.location.href = window.location.origin + '/index.html';
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

// Send password reset email
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    return { success: true };
  } catch (error) {
    // Always show generic message to prevent email enumeration
    return { success: true };
  }
}

// Get user profile from Firestore
async function getUserProfile(uid) {
  try {
    // Force server read to avoid stale cache after profile updates
    const doc = await db.collection('users').doc(uid).get({ source: 'server' });
    if (doc.exists) {
      return doc.data();
    }
    return null;
  } catch (error) {
    // Fallback to cache if offline
    try {
      const cached = await db.collection('users').doc(uid).get();
      return cached.exists ? cached.data() : null;
    } catch (e) {
      console.error('Error getting profile:', e);
      return null;
    }
  }
}

// Update user profile (uses set+merge so it works even if doc doesn't exist yet)
async function updateUserProfile(uid, data) {
  try {
    await db.collection('users').doc(uid).set(data, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('updateUserProfile error:', error);
    return { success: false, error: error.message };
  }
}

// ===== Mobile navigation drawer (Hamburger menu) =====
// Adds expert-website close behaviors to the existing per-page nav:
//
//   - Tap the dimmed backdrop → close it
//   - Tap anywhere OUTSIDE the drawer → close it
//   - Press Escape → close it
//   - Body scroll locked while the drawer is open
//
// Key design choice: this module does NOT touch the hamburger's click
// handler, does NOT add per-link click handlers, and does NOT toggle
// the .active class itself. The per-page inline script owns those.
// Instead, we WATCH the .nav-links `.active` class via MutationObserver
// and react to changes (sync backdrop + body scroll). That keeps the
// existing navigation flow intact and only adds the new close paths.
function initMobileNav() {
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');
  if (!toggle || !links) return;
  if (toggle.dataset.mobileNavBound === '1') return;   // idempotent
  toggle.dataset.mobileNavBound = '1';

  // Create the dim backdrop once. Lives at body root; CSS keeps it
  // inert (pointer-events: none, opacity 0) until .active is added.
  let backdrop = document.getElementById('shos-nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'shos-nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);
  }

  function isOpen() {
    return links.classList.contains('active');
  }

  // Close the drawer by removing the same class the inline script uses.
  // We DON'T touch aria-hidden on .nav-links (Chrome treats aria-hidden
  // on the desktop nav as a hint that links shouldn't take focus, which
  // broke keyboard navigation in some cases). The drawer's open/closed
  // state is communicated via the visible CSS transform.
  function close() {
    links.classList.remove('active');
    toggle.classList.remove('active');
    // sync — the MutationObserver below will also run, but explicit
    // sync here is faster than waiting for the next microtask.
    syncFromState();
  }

  function syncFromState() {
    const open = isOpen();
    backdrop.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // Watch the inline script's toggle. Anytime .nav-links' class list
  // changes, mirror the state to backdrop + body. This is the SAFE
  // way to intercept the existing toggle without touching its
  // handler chain.
  new MutationObserver(syncFromState).observe(links, {
    attributes: true,
    attributeFilter: ['class'],
  });

  // Tap the backdrop → close.
  backdrop.addEventListener('click', close);

  // Tap ANYWHERE outside the drawer → close. NOT capture phase — we
  // want links and buttons inside the drawer (and the hamburger itself)
  // to handle their click first, then if the drawer is still open,
  // we close it on the bubble.
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    if (links.contains(e.target)) return;     // tap inside the drawer
    if (toggle.contains(e.target)) return;    // hamburger handles itself
    close();
  });

  // Escape key → close (keyboard a11y).
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });
}

// ===== Navbar Auth State =====
// Call this on every page to update navbar based on login status
function initAuthNavbar() {
  const authLinks = document.getElementById('auth-links');
  if (!authLinks) return;

  auth.onAuthStateChanged((user) => {
    const isAuthed = !!user;

    // Cache auth state so the next page load can pre-render the correct nav
    // synchronously (prevents flash of unauthenticated content). See the
    // inline <script> in each page's <head> that reads this value.
    try { localStorage.setItem('shos_authed', isAuthed ? '1' : '0'); } catch (e) {}

    // Mirror the state on <html> so CSS can reveal #auth-links once known
    document.documentElement.setAttribute('data-auth', isAuthed ? 'authed' : 'anon');

    if (isAuthed) {
      // Logged in
      authLinks.innerHTML = `
        <a href="dashboard.html" class="nav-cta">Dashboard</a>
      `;
    } else {
      // Logged out
      authLinks.innerHTML = `
        <a href="login.html" class="nav-login">Log In</a>
        <a href="signup.html" class="nav-cta">Sign Up</a>
      `;
    }
  });
}

// Fill `<span data-academic-year>` placeholders with the current Czech
// academic year (Sep -> Aug). Rolls over each September 1 automatically
// so tuition / disclaimer footnotes don't go stale every year.
(function () {
  function currentAcademicYear() {
    const now = new Date();
    // Academic year for CU runs Sep -> Aug. Before Sep, we're still in
    // the previous AY; after, we're in the new one.
    const y = now.getFullYear();
    return now.getMonth() < 8 /* 0-indexed: 8 = September */
      ? (y - 1) + '/' + y
      : y + '/' + (y + 1);
  }
  document.addEventListener('DOMContentLoaded', function () {
    const text = currentAcademicYear();
    document.querySelectorAll('[data-academic-year]').forEach(function (el) {
      el.textContent = text;
    });
  });
})();

// Initialize on page load.
// Visit tracking is split into two paths based on auth state:
//   - Signed-in user  →  recordUserVisit(user)  → users/{uid}.visitCount++
//                        (so admin can see per-user engagement)
//   - Anonymous user  →  recordSiteVisit()      → _meta/siteStats.visits++
//                        (the public "advertising / discovery" funnel metric)
// Both are session-deduped via sessionStorage so multi-page visits in
// one tab count as a single visit, not N.
document.addEventListener('DOMContentLoaded', () => {
  initAuthNavbar();
  initMobileNav();    // Upgrade the hamburger menu UX site-wide.
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) recordUserVisit(user);
      else      recordSiteVisit();
    });
  } else {
    recordSiteVisit();
  }
});

// ===== Site-visits tracking =====
// Records every fresh browser session as a single visit. Each session
// increments three Firestore documents (atomically):
//
//   _meta/siteStats          { visits: N, lastVisitAt: timestamp }
//   _meta/visitsByDay        { days: { "YYYY-MM-DD": N } }       — for the daily chart
//   _meta/visitsByCountry    { countries: { "US": N, "CZ": N } } — for the country chart
//
// All increments use FieldValue.increment so concurrent visitors don't race.
// Country code is resolved via ipapi.co (free, no API key, 1k/day per source IP
// — effectively unlimited at our scale because each visitor only queries their
// own IP once per session). Visit recording NEVER throws — failures are
// silent so the visitor's experience isn't impacted.
async function recordSiteVisit() {
  try {
    if (typeof sessionStorage === 'undefined') return;
    if (sessionStorage.getItem('shos_visit_recorded') === '1') return;
    sessionStorage.setItem('shos_visit_recorded', '1');
    if (typeof db === 'undefined' || typeof firebase === 'undefined') return;

    // Resolve country in parallel with the base write so a slow geo API
    // doesn't delay the visit increment. Failure → skip the country update.
    const today = new Date().toISOString().slice(0, 10);   // YYYY-MM-DD (UTC)
    const countryPromise = resolveVisitorCountry();

    // Always-do writes: total + daily.
    // NOTE: Firestore `set({merge:true})` does NOT interpret dot-notation
    // keys as nested paths — only `update()` does that. So we have to
    // build the actual nested object literal: `{ days: { 'YYYY-MM-DD': n }}`.
    const baseWrites = db.collection('_meta').doc('siteStats').set({
      visits: firebase.firestore.FieldValue.increment(1),
      lastVisitAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    const dayWrite = db.collection('_meta').doc('visitsByDay').set({
      days: { [today]: firebase.firestore.FieldValue.increment(1) },
    }, { merge: true });

    // Country write: only if we can resolve it; never blocks the others.
    const country = await countryPromise;
    const tasks = [
      baseWrites.catch(err => { console.error('[visit] siteStats write failed:', err.code, err.message); throw err; }),
      dayWrite.catch(err => { console.error('[visit] visitsByDay write failed:', err.code, err.message); throw err; }),
    ];
    if (country) {
      tasks.push(db.collection('_meta').doc('visitsByCountry').set({
        countries: { [country]: firebase.firestore.FieldValue.increment(1) },
      }, { merge: true }).catch(err => {
        console.error('[visit] visitsByCountry write failed:', err.code, err.message);
        throw err;
      }));
    }
    // Use allSettled so ONE failed write doesn't cancel the others —
    // e.g. rules regression on visitsByCountry shouldn't stop the daily
    // chart from updating. Errors are surfaced individually via the
    // per-promise catch handlers above so a working DevTools console
    // exposes exactly which write is broken.
    await Promise.allSettled(tasks);
  } catch (error) {
    // Top-level catch — only reached for setup errors (missing SDK,
    // sessionStorage disabled, etc.). Rule/network errors bubble up
    // via the individual .catch() handlers above.
    console.error('[visit] recordSiteVisit setup error:', error.message);
  }
}

// Per-user visit counter. Bumps users/{uid}.visitCount ONCE PER BROWSER
// SESSION while signed in. Symmetric with the anonymous counter
// (recordSiteVisit) — both count "sessions", not page loads. So the two
// metrics are conceptually consistent for the admin dashboard.
//
// Design history:
//   v1/v2/v3 had subtle sessionStorage-timing bugs (flag set before write
//     could silence counter permanently after a transient failure). v4
//     dropped sessionStorage entirely and counted every page load —
//     simple but conflated "page views" with "sessions". v5 (current)
//     brings back session dedupe with the timing bug fixed: flag is
//     set AFTER the write resolves successfully, and the key includes
//     the uid so multi-account switching in one browser still counts.
//
// Diagnostic mode: set `window.__SHOS_VISIT_DEBUG = true` (in DevTools
// or as a URL flag) BEFORE the page loads to enable per-step
// `[visit]` console output. Off in production for privacy.

// Purge legacy dedupe flags from older versions.
try {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('shos_user_visit_recorded');
    sessionStorage.removeItem('shos_user_visit_recorded_v2');
    sessionStorage.removeItem('shos_user_visit_recorded_v3');
  }
} catch (_) {}

// Auto-enable debug mode via URL flag `?visitdebug=1` (once per page
// load) so the admin can toggle from a link without opening DevTools.
try {
  if (typeof URLSearchParams !== 'undefined' &&
      new URLSearchParams(location.search).get('visitdebug') === '1') {
    window.__SHOS_VISIT_DEBUG = true;
  }
} catch (_) {}
function _visitLog() {
  if (!window.__SHOS_VISIT_DEBUG) return;
  try { console.info.apply(console, ['[visit]'].concat([].slice.call(arguments))); } catch (_) {}
}

window.__shosVisitPromise = null;
async function recordUserVisit(user) {
  // Coalesce concurrent calls within ONE page load. Without this the
  // belt-and-suspenders trigger in dashboard.html plus auth.js's own
  // trigger would double-count one load.
  if (window.__shosVisitPromise) {
    _visitLog('recordUserVisit skipped (already in-flight this page load)');
    return window.__shosVisitPromise;
  }
  window.__shosVisitPromise = (async () => {
    try {
      if (!user || !user.uid) {
        _visitLog('recordUserVisit skipped (no user)');
        return;
      }
      if (typeof db === 'undefined' || typeof firebase === 'undefined') {
        _visitLog('recordUserVisit skipped (Firebase SDK missing)');
        return;
      }

      // Per-session dedupe. Key includes uid so signing out + in as a
      // different account in the same browser still counts the second
      // account's session. The flag is set only AFTER a successful
      // write, so a permission-denied / network failure does NOT
      // silence the counter for the rest of the session.
      const sessionKey = 'shos_user_visit_recorded_v5_' + user.uid;
      try {
        if (typeof sessionStorage !== 'undefined' &&
            sessionStorage.getItem(sessionKey) === '1') {
          _visitLog('recordUserVisit skipped (already counted this session)', user.email || user.uid);
          return;
        }
      } catch (_) { /* private browsing: sessionStorage may throw — count anyway */ }

      _visitLog('recordUserVisit START uid=' + user.uid + ' email=' + (user.email || '(no email)'));
      await db.collection('users').doc(user.uid).set({
        visitCount: firebase.firestore.FieldValue.increment(1),
        lastVisitAt: firebase.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      _visitLog('recordUserVisit SUCCESS uid=' + user.uid);

      // Set the session flag AFTER the write resolves. Transient
      // failure leaves the flag unset, so a retry on the same session
      // will get another chance.
      try { sessionStorage.setItem(sessionKey, '1'); } catch (_) {}
    } catch (error) {
      // Surface the actual Firestore error code so silent permission
      // denials, network failures, or quota issues remain visible even
      // when debug mode is off.
      console.error('[visit] recordUserVisit FAILED:',
                    (error && error.code) || 'no-code', '—',
                    (error && error.message) || String(error));
    }
  })();
  return window.__shosVisitPromise;
}

// Expose a manual trigger for debugging. From DevTools:  shosBumpVisit()
// Useful when the admin wants to force a write to verify permissions
// without reloading the page.
window.shosBumpVisit = function () {
  const u = firebase.auth().currentUser;
  if (!u) { console.warn('[visit] not signed in'); return; }
  window.__shosVisitPromise = null;
  return recordUserVisit(u);
};

// Resolve the visitor's country code (ISO 3166-1 alpha-2, e.g. "US", "CZ").
// Cached in sessionStorage so multi-page sessions don't re-query the API.
// Returns null on failure — the rest of the visit pipeline still works.
async function resolveVisitorCountry() {
  try {
    const cached = sessionStorage.getItem('shos_visitor_country');
    if (cached) return cached === '__none__' ? null : cached;

    // Race a 1.5s timeout — the geolocation isn't worth holding up the
    // write for slow networks.
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 1500);
    let cc = null;
    try {
      const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const j = await res.json();
        cc = (j && j.country_code) ? String(j.country_code).toUpperCase() : null;
        // Sanity: ISO-2 only
        if (cc && !/^[A-Z]{2}$/.test(cc)) cc = null;
      }
    } catch (_) {
      clearTimeout(timeoutId);
    }
    sessionStorage.setItem('shos_visitor_country', cc || '__none__');
    return cc;
  } catch (_) {
    return null;
  }
}
