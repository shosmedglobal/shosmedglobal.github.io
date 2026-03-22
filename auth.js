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
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: friendlyError(error) };
  }
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
    if (user) {
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initAuthNavbar();
});
