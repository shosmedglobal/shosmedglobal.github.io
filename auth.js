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

// Sign up with email/password
async function signUpWithEmail(name, email, password, path) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName: name });
    // Save profile to Firestore
    await db.collection('users').doc(result.user.uid).set({
      name: name,
      email: email,
      path: path, // 'applicant' or 'student'
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      payments: {}
    });
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign in with email/password
async function signInWithEmail(email, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign in/up with Google
async function signInWithGoogle(path) {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    // Check if user profile exists in Firestore
    const doc = await db.collection('users').doc(result.user.uid).get();
    if (!doc.exists) {
      // New user - create profile
      await db.collection('users').doc(result.user.uid).set({
        name: result.user.displayName || '',
        email: result.user.email,
        path: path || 'applicant',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        payments: {}
      });
    }
    return { success: true, user: result.user, isNewUser: !doc.exists };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign out
async function signOut() {
  try {
    await auth.signOut();
    window.location.href = 'index.html';
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
    return { success: false, error: error.message };
  }
}

// Get user profile from Firestore
async function getUserProfile(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (doc.exists) {
      return doc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

// Update user profile
async function updateUserProfile(uid, data) {
  try {
    await db.collection('users').doc(uid).update(data);
    return { success: true };
  } catch (error) {
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
        <a href="login.html">Log In</a>
        <a href="signup.html" class="nav-cta">Sign Up</a>
      `;
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initAuthNavbar();
});
