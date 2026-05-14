// ===== Contact & Booking Logic =====
// Shared logic for contact form submissions and booking requests.
// Depends on Firebase globals `auth` and `db` from auth.js.

const CONTACT_CATEGORIES = [
  { value: 'booking', label: 'Book a Service' },
  { value: 'content-question', label: 'Content / Academic Question' },
  { value: 'technical-issue', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'general', label: 'General Question' }
];

// Keep keys + names + prices in sync with the booking dropdown in
// dashboard.html (#contactService <option>s). When the dropdown changes,
// this table changes — both sides MUST agree or submitBookingRequest()
// rejects with "Invalid service type."
const SERVICE_TYPES = {
  // ----- Free -----
  'free-consultation':         { name: 'Free Strategy Call',                price: 0,   duration: '15-30 min',   category: 'consultation' },

  // ----- Med School Application -----
  'full-qbank':                { name: 'Full QBank Access',                 price: 99,  duration: '6 months',    category: 'applicant' },
  'apply-lf3-service':         { name: 'Apply for LF3',                     price: 199, duration: 'Full cycle',  category: 'applicant' },
  'mock-exam-interview':       { name: 'Mock Exam + Interview',             price: 199, duration: '2 sessions',  category: 'applicant' },
  'life-in-prague':            { name: 'Life in Prague',                    price: 99,  duration: '1 session',   category: 'applicant' },
  'applicant-mentor':          { name: '1-on-1 Mentor Session (applicant)', price: 99,  duration: '1 session',   category: 'applicant' },

  // ----- Residency Application -----
  'strategy-session':          { name: 'Strategy Session',                  price: 99,  duration: '1 session',   category: 'student' },
  'mentorship-lor':            { name: 'Letter of Rec Coaching',            price: 99,  duration: '1 session',   category: 'student' },
  'mentorship-program-list':   { name: 'Program List Guidance',             price: 99,  duration: '1 session',   category: 'student' },
  'mentorship-research':       { name: 'Research Strategy',                 price: 99,  duration: '1 session',   category: 'student' },
  'mentorship-cv':             { name: 'CV & Personal Statement Review',    price: 99,  duration: '1 session',   category: 'student' },
  'mentorship-mock-interview': { name: 'Mock Interview Session',            price: 99,  duration: '1 session',   category: 'student' },
  'mentorship-eras':           { name: 'ERAS Application Strategy',         price: 199, duration: 'Full cycle',  category: 'student' },
  'usmle-step-review':         { name: 'USMLE Step Review',                 price: 99,  duration: '1 session',   category: 'student' },

  // ----- Other -----
  'entrance-exam-registration':{ name: 'Entrance Exam Registration (US & Canada)', price: 0, duration: '-', category: 'other' },
};

const MESSAGE_STATUSES = ['new', 'read', 'replied', 'resolved'];
const BOOKING_STATUSES = ['inquiry', 'pending_payment', 'paid', 'confirmed', 'completed', 'cancelled', 'no_show'];

// ===== Intake Questions =====
function getIntakeQuestions(serviceType) {
  const common = [
    { id: 'sessionGoal', label: "What's your main goal for this session?", type: 'textarea' }
  ];

  // Shared intake question groups — keeps the per-service tables short
  // and ensures consistent wording for similar services.
  const APPLICANT_INTAKE = [
    { id: 'faculty', label: 'Which Charles University faculty (or other) are you applying to?', type: 'text' },
    { id: 'applyDate', label: 'When do you plan to apply?', type: 'text' },
    { id: 'examStarted', label: 'Have you started studying for the entrance exam?', type: 'select', options: ['Not yet', 'Just started', 'Been studying for a few months', 'Feel prepared'] },
  ];
  const RESIDENCY_INTAKE = [
    { id: 'specialty', label: 'What specialty are you interested in?', type: 'text' },
    { id: 'usmleSteps', label: 'Have you taken any USMLE steps?', type: 'select', options: ['Not yet', 'Step 1 only', 'Step 1 + Step 2 CK', 'All steps completed'] },
    { id: 'yearOfStudy', label: 'What year of med school are you in?', type: 'text' },
    { id: 'matchYear', label: 'Which Match cycle are you targeting?', type: 'text' },
  ];

  const typeQuestions = {
    // ----- Free -----
    'free-consultation': [
      { id: 'helpWith', label: 'What are you looking for help with?', type: 'textarea' },
      { id: 'currentStage', label: 'Current stage', type: 'select', options: ['Pre-med', 'Med student (preclinical)', 'Med student (clinical)', 'Graduate', 'Other'] },
    ],

    // ----- Med School Application -----
    'full-qbank': [
      { id: 'examDate', label: 'When do you plan to sit the entrance exam?', type: 'text' },
    ],
    'apply-lf3-service':   APPLICANT_INTAKE,
    'mock-exam-interview': APPLICANT_INTAKE,
    'life-in-prague': [
      { id: 'startDate', label: 'When do you plan to arrive in Prague?', type: 'text' },
      { id: 'topConcerns', label: 'What are your top concerns about life in Prague?', type: 'textarea' },
    ],
    'applicant-mentor':    APPLICANT_INTAKE,

    // ----- Residency Application -----
    'strategy-session':          RESIDENCY_INTAKE,
    'mentorship-lor':            RESIDENCY_INTAKE,
    'mentorship-program-list':   RESIDENCY_INTAKE,
    'mentorship-research': [
      { id: 'researchExperience', label: 'Do you have any prior research experience?', type: 'select', options: ['None', 'Some coursework', 'Participated in a project', 'Published'] },
      { id: 'yearOfStudy', label: 'What year of med school are you in?', type: 'text' },
      { id: 'specialty', label: 'What specialty are you targeting?', type: 'text' },
    ],
    'mentorship-cv':             RESIDENCY_INTAKE,
    'mentorship-mock-interview': RESIDENCY_INTAKE,
    'mentorship-eras':           RESIDENCY_INTAKE,
    'usmle-step-review': [
      { id: 'whichStep', label: 'Which Step are you preparing for?', type: 'select', options: ['Step 1', 'Step 2 CK', 'Step 3'] },
      { id: 'examDate', label: 'When is your exam date?', type: 'text' },
      { id: 'focusSubjects', label: 'What subjects do you want to focus on?', type: 'textarea' },
    ],

    // ----- Other -----
    'entrance-exam-registration': [
      { id: 'examDate', label: 'When do you want to sit the exam?', type: 'text' },
      { id: 'country', label: 'Country you\'re registering from (US / Canada / other)?', type: 'text' },
    ],
  };

  return [...(typeQuestions[serviceType] || []), ...common];
}

// ===== Submit Contact Form =====
async function submitContactForm(formData) {
  try {
    const user = auth.currentUser;
    const doc = {
      userId: user ? user.uid : null,
      name: (formData.name || '').substring(0, 200),
      email: (formData.email || '').substring(0, 200),
      category: formData.category || 'general',
      subject: (formData.subject || '').substring(0, 300),
      body: (formData.body || '').substring(0, 5000),
      status: 'new',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      repliedAt: null,
      adminNotes: ''
    };

    await db.collection('messages').add(doc);
    return { success: true };
  } catch (error) {
    console.error('submitContactForm error:', error);
    return { success: false, error: error.message };
  }
}

// ===== Submit Booking Request =====
async function submitBookingRequest(bookingData) {
  try {
    const user = auth.currentUser;
    const service = SERVICE_TYPES[bookingData.serviceType];
    if (!service) {
      return { success: false, error: 'Invalid service type.' };
    }

    const doc = {
      userId: user ? user.uid : null,
      name: (bookingData.name || '').substring(0, 200),
      email: (bookingData.email || '').substring(0, 200),
      serviceType: bookingData.serviceType,
      serviceName: service.name,
      price: service.price,
      status: service.price === 0 ? 'inquiry' : 'inquiry',
      preferredDate: bookingData.preferredDate || null,
      preferredTime: bookingData.preferredTime || null,
      timezone: bookingData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      intakeAnswers: bookingData.intakeAnswers || {},
      sessionGoal: (bookingData.sessionGoal || '').substring(0, 2000),
      adminNotes: '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      completedAt: null
    };

    await db.collection('bookings').add(doc);
    return { success: true };
  } catch (error) {
    console.error('submitBookingRequest error:', error);
    return { success: false, error: error.message };
  }
}

// ===== Admin: Load Messages =====
async function loadAdminMessages(filterStatus, filterCategory) {
  try {
    // Use at most ONE where() with orderBy to avoid composite index requirement
    let query = db.collection('messages').orderBy('createdAt', 'desc');
    if (filterStatus && filterStatus !== 'all') {
      query = query.where('status', '==', filterStatus);
    }
    const snap = await query.limit(200).get();
    let messages = [];
    snap.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
    // Apply category filter client-side (avoids Firestore composite index)
    if (filterCategory && filterCategory !== 'all') {
      messages = messages.filter(m => m.category === filterCategory);
    }
    return messages;
  } catch (error) {
    console.error('loadAdminMessages error:', error);
    return [];
  }
}

// ===== Admin: Update Message Status =====
async function updateMessageStatus(messageId, status, adminNotes) {
  try {
    const updates = {};
    if (status !== undefined && status !== null) {
      updates.status = status;
      if (status === 'replied') {
        updates.repliedAt = firebase.firestore.FieldValue.serverTimestamp();
      }
    }
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }
    if (Object.keys(updates).length === 0) return { success: true };
    await db.collection('messages').doc(messageId).update(updates);
    return { success: true };
  } catch (error) {
    console.error('updateMessageStatus error:', error);
    return { success: false, error: error.message };
  }
}

// ===== Admin: Load Bookings =====
async function loadAdminBookings(filterStatus) {
  try {
    let query = db.collection('bookings').orderBy('createdAt', 'desc');
    if (filterStatus && filterStatus !== 'all') {
      query = query.where('status', '==', filterStatus);
    }
    const snap = await query.limit(200).get();
    const bookings = [];
    snap.forEach(doc => bookings.push({ id: doc.id, ...doc.data() }));
    return bookings;
  } catch (error) {
    console.error('loadAdminBookings error:', error);
    return [];
  }
}

// ===== Admin: Update Booking Status =====
async function updateBookingStatus(bookingId, status, adminNotes, completionNotes) {
  try {
    const updates = {
      status,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (status === 'completed') {
      updates.completedAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }
    if (completionNotes) {
      updates.completionNotes = completionNotes;
    }
    await db.collection('bookings').doc(bookingId).update(updates);
    return { success: true };
  } catch (error) {
    console.error('updateBookingStatus error:', error);
    return { success: false, error: error.message };
  }
}

// ===== Admin: Get Unread Message Count =====
async function getUnreadMessageCount() {
  try {
    const snap = await db.collection('messages').where('status', '==', 'new').get();
    return snap.size;
  } catch (error) {
    console.error('getUnreadMessageCount error:', error);
    return 0;
  }
}

// ===== Admin: Get Bookings for Calendar =====
async function getBookingsForMonth(year, month) {
  try {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59);
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];

    const snap = await db.collection('bookings')
      .where('preferredDate', '>=', startStr)
      .where('preferredDate', '<=', endStr)
      .get();

    const bookings = [];
    snap.forEach(doc => bookings.push({ id: doc.id, ...doc.data() }));
    return bookings;
  } catch (error) {
    console.error('getBookingsForMonth error:', error);
    return [];
  }
}

// ===== Real-time admin subscriptions =====
// Each function returns an unsubscribe handle; call it to detach the listener.
// These power the auto-updating admin Inbox, Bookings, Calendar, and badge.

function subscribeAdminMessages(filterStatus, filterCategory, callback) {
  try {
    let query = db.collection('messages').orderBy('createdAt', 'desc');
    if (filterStatus && filterStatus !== 'all') {
      query = query.where('status', '==', filterStatus);
    }
    return query.limit(200).onSnapshot(snap => {
      let messages = [];
      snap.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
      if (filterCategory && filterCategory !== 'all') {
        messages = messages.filter(m => m.category === filterCategory);
      }
      callback(messages);
    }, err => console.error('subscribeAdminMessages error:', err));
  } catch (error) {
    console.error('subscribeAdminMessages setup error:', error);
    return () => {};
  }
}

function subscribeAdminBookings(filterStatus, callback) {
  try {
    let query = db.collection('bookings').orderBy('createdAt', 'desc');
    if (filterStatus && filterStatus !== 'all') {
      query = query.where('status', '==', filterStatus);
    }
    return query.limit(200).onSnapshot(snap => {
      const bookings = [];
      snap.forEach(doc => bookings.push({ id: doc.id, ...doc.data() }));
      callback(bookings);
    }, err => console.error('subscribeAdminBookings error:', err));
  } catch (error) {
    console.error('subscribeAdminBookings setup error:', error);
    return () => {};
  }
}

function subscribeUnreadMessageCount(callback) {
  try {
    return db.collection('messages').where('status', '==', 'new').onSnapshot(snap => {
      callback(snap.size);
    }, err => console.error('subscribeUnreadMessageCount error:', err));
  } catch (error) {
    console.error('subscribeUnreadMessageCount setup error:', error);
    return () => {};
  }
}

function subscribeBookingsForMonth(year, month, callback) {
  try {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59);
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];
    return db.collection('bookings')
      .where('preferredDate', '>=', startStr)
      .where('preferredDate', '<=', endStr)
      .onSnapshot(snap => {
        const bookings = [];
        snap.forEach(doc => bookings.push({ id: doc.id, ...doc.data() }));
        callback(bookings);
      }, err => console.error('subscribeBookingsForMonth error:', err));
  } catch (error) {
    console.error('subscribeBookingsForMonth setup error:', error);
    return () => {};
  }
}

// Live "all users" stream — drives the admin Dashboard stat cards
// (Total Users, New This Month, Paying Users, Revenue) and the user
// management table.
function subscribeAllUsers(callback) {
  try {
    return db.collection('users').onSnapshot(snap => {
      const users = [];
      snap.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
      callback(users);
    }, err => console.error('subscribeAllUsers error:', err));
  } catch (error) {
    console.error('subscribeAllUsers setup error:', error);
    return () => {};
  }
}

// (subscribeForumPostCount removed — admin "Forum Posts" tile was dropped.
// The public forum on community.html is unaffected and uses its own queries.)

// Delete a message from the inbox. Used by the admin Inbox panel.
async function deleteMessage(messageId) {
  try {
    await db.collection('messages').doc(messageId).delete();
    return { success: true };
  } catch (error) {
    console.error('deleteMessage error:', error);
    return { success: false, error: error.message };
  }
}

// recordSiteVisit() lives in auth.js so every page can call it; this
// admin-only file only needs the read-side subscription below.

// Live total-visits stream for the admin dashboard.
function subscribeSiteVisits(callback) {
  try {
    return db.collection('_meta').doc('siteStats').onSnapshot(doc => {
      const data = doc.data() || {};
      callback(data.visits || 0);
    }, err => {
      console.error('subscribeSiteVisits error:', err);
      callback(0);
    });
  } catch (error) {
    console.error('subscribeSiteVisits setup error:', error);
    return () => {};
  }
}
