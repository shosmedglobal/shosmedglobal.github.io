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

// Map Firebase error codes to user-friendly messages
function friendlyError(error) {
  const map = {
    'auth/email-already-in-use': 'This email is already registered. Try logging in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };
  return map[error.code] || error.message;
}

// Sign up with email/password
async function signUpWithEmail(name, email, password, path) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName: name });
    // Save profile to Firestore
    await db.collection('users').doc(result.user.uid).set({
      name: name.substring(0, 200),
      email: email,
      path: path, // 'applicant' or 'student'
      agreedToTerms: true,
      agreedToTermsDate: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      payments: {}
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
  await ref.set({
    name: (user.displayName || '').substring(0, 200),
    email: user.email || '',
    path: null,
    agreedToTerms: true,   // they accepted ToS at original signup
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    payments: {},
    backfilled: true,      // diagnostic flag so we know this was healed
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
      // Create profile from signup page
      await db.collection('users').doc(result.user.uid).set({
        name: (result.user.displayName || '').substring(0, 200),
        email: result.user.email,
        path: path || 'applicant',
        agreedToTerms: true,
        agreedToTermsDate: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        payments: {}
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
    const tasks = [baseWrites, dayWrite];
    if (country) {
      tasks.push(db.collection('_meta').doc('visitsByCountry').set({
        countries: { [country]: firebase.firestore.FieldValue.increment(1) },
      }, { merge: true }));
    }
    await Promise.all(tasks);
  } catch (error) {
    console.warn('recordSiteVisit blocked:', error.message);
  }
}

// Per-user visit counter. Bumps users/{uid}.visitCount on every page load
// while signed in. Surfaces in the admin "User Management" table so the
// admin can see who's actively returning.
//
// Design history (and why this is so simple now):
//
//   v1 used sessionStorage to dedupe ("count once per browser session").
//     Bug: the flag was set BEFORE the write, so any transient failure
//     permanently silenced the counter for that session.
//   v2 moved the flag-set to AFTER a successful write.
//     Bug: users still in a tab from before the v1 deploy had a stale v1
//     flag, so the new code respected it and never wrote.
//   v3 renamed the flag key and explicitly cleared v1 on load.
//     Bug: STILL showed 0 — symptom suggested either browser cache was
//     serving stale auth.js, or some auth-state race was making us
//     skip the write.
//   v4 (current): drop sessionStorage entirely. Increment on every call.
//     Within a single page load we coalesce concurrent calls via the
//     in-flight promise (so two onAuthStateChanged listeners firing
//     ~simultaneously don't double-count one load). Across page loads
//     and refreshes, every visit counts — which is closer to what the
//     admin actually wants to see (raw engagement, not a session metric).
//
// Verbose logging on every code path so the admin can diagnose silent
// failures by opening DevTools.
console.info('[visit] auth.js v4 loaded (no-session-dedupe)');

// Affirmatively clear all historical dedupe flags so any user stuck with
// a stale flag from v1/v2/v3 starts fresh on first load of v4.
try {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('shos_user_visit_recorded');
    sessionStorage.removeItem('shos_user_visit_recorded_v2');
  }
} catch (_) {}

window.__shosVisitPromise = null;
async function recordUserVisit(user) {
  console.info('[visit] recordUserVisit called with user:',
               (user && (user.email || user.uid)) || '<null>');
  // Coalesce concurrent calls within ONE page load. Without this the
  // belt-and-suspenders trigger in dashboard.html plus auth.js's own
  // trigger would double-count every load.
  if (window.__shosVisitPromise) {
    console.info('[visit] write already in-flight, awaiting existing promise');
    return window.__shosVisitPromise;
  }
  window.__shosVisitPromise = (async () => {
    try {
      if (!user || !user.uid) {
        console.warn('[visit] no user/uid, skipping');
        return;
      }
      if (typeof db === 'undefined' || typeof firebase === 'undefined') {
        console.warn('[visit] firebase/db not initialized, skipping');
        return;
      }
      console.info('[visit] writing increment for', user.email || user.uid);
      await db.collection('users').doc(user.uid).set({
        visitCount: firebase.firestore.FieldValue.increment(1),
        lastVisitAt: firebase.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      console.info('[visit] ✓ user visit recorded for', user.email || user.uid);
    } catch (error) {
      // Surface the actual Firestore error code so silent permission
      // denials, network failures, or quota issues become visible.
      console.error('[visit] ✗ FAILED:', error && error.code, '—', error && error.message);
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
