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

const SERVICE_TYPES = {
  'free-consultation':   { name: 'Free 15-Min Consultation', price: 0,    duration: '15 min',     category: 'consultation' },
  'application-guide':   { name: 'Application Guide',        price: 99,   duration: '45 min',     category: 'applicant' },
  'full-application':    { name: 'Full Application Package',  price: 249,  duration: 'Full cycle', category: 'applicant' },
  'mentorship':          { name: 'Mentorship Session',        price: 199,  duration: '45 min',     category: 'student' },
  'match-ready':         { name: 'Match-Ready Package',       price: 499,  duration: 'Full cycle', category: 'student' },
  'board-review-single': { name: 'Board Review - Single',     price: 99,   duration: '45 min',     category: 'student' },
  'board-review-5pack':  { name: 'Board Review - 5 Pack',     price: 449,  duration: '5 sessions', category: 'student' },
  'board-review-10pack': { name: 'Board Review - 10 Pack',    price: 799,  duration: '10 sessions',category: 'student' }
};

const MESSAGE_STATUSES = ['new', 'read', 'replied', 'resolved'];
const BOOKING_STATUSES = ['inquiry', 'pending_payment', 'paid', 'confirmed', 'completed', 'cancelled', 'no_show'];

// ===== Intake Questions =====
function getIntakeQuestions(serviceType) {
  const common = [
    { id: 'sessionGoal', label: "What's your main goal for this session?", type: 'textarea' }
  ];

  const typeQuestions = {
    'free-consultation': [
      { id: 'helpWith', label: 'What are you looking for help with?', type: 'textarea' },
      { id: 'currentStage', label: 'Current stage', type: 'select', options: ['Pre-med', 'Med student (preclinical)', 'Med student (clinical)', 'Graduate', 'Other'] }
    ],
    'application-guide': [
      { id: 'faculty', label: 'Which faculty are you applying to?', type: 'text' },
      { id: 'applyDate', label: 'When do you plan to apply?', type: 'text' },
      { id: 'examStarted', label: 'Have you started studying for the entrance exam?', type: 'select', options: ['Not yet', 'Just started', 'Been studying for a few months', 'Feel prepared'] }
    ],
    'full-application': [
      { id: 'faculty', label: 'Which faculty are you applying to?', type: 'text' },
      { id: 'applyDate', label: 'When do you plan to apply?', type: 'text' },
      { id: 'examStarted', label: 'Have you started studying for the entrance exam?', type: 'select', options: ['Not yet', 'Just started', 'Been studying for a few months', 'Feel prepared'] }
    ],
    'mentorship': [
      { id: 'specialty', label: 'What specialty are you interested in?', type: 'text' },
      { id: 'usmleSteps', label: 'Have you taken any USMLE steps?', type: 'select', options: ['Not yet', 'Step 1 only', 'Step 1 + Step 2 CK', 'All steps completed'] },
      { id: 'yearOfStudy', label: 'What year are you in?', type: 'text' }
    ],
    'match-ready': [
      { id: 'specialty', label: 'What specialty are you interested in?', type: 'text' },
      { id: 'usmleSteps', label: 'Have you taken any USMLE steps?', type: 'select', options: ['Not yet', 'Step 1 only', 'Step 1 + Step 2 CK', 'All steps completed'] },
      { id: 'yearOfStudy', label: 'What year are you in?', type: 'text' },
      { id: 'matchYear', label: 'Which Match cycle are you targeting?', type: 'text' }
    ],
    'board-review-single': [
      { id: 'whichStep', label: 'Which Step are you preparing for?', type: 'select', options: ['Step 1', 'Step 2 CK', 'Step 3', 'COMLEX'] },
      { id: 'examDate', label: 'When is your exam date?', type: 'text' },
      { id: 'focusSubjects', label: 'What subjects do you want to focus on?', type: 'textarea' }
    ],
    'board-review-5pack': [
      { id: 'whichStep', label: 'Which Step are you preparing for?', type: 'select', options: ['Step 1', 'Step 2 CK', 'Step 3', 'COMLEX'] },
      { id: 'examDate', label: 'When is your exam date?', type: 'text' },
      { id: 'focusSubjects', label: 'What subjects do you want to focus on?', type: 'textarea' }
    ],
    'board-review-10pack': [
      { id: 'whichStep', label: 'Which Step are you preparing for?', type: 'select', options: ['Step 1', 'Step 2 CK', 'Step 3', 'COMLEX'] },
      { id: 'examDate', label: 'When is your exam date?', type: 'text' },
      { id: 'focusSubjects', label: 'What subjects do you want to focus on?', type: 'textarea' }
    ]
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
    let query = db.collection('messages').orderBy('createdAt', 'desc');
    if (filterStatus && filterStatus !== 'all') {
      query = query.where('status', '==', filterStatus);
    }
    if (filterCategory && filterCategory !== 'all') {
      query = query.where('category', '==', filterCategory);
    }
    const snap = await query.limit(200).get();
    const messages = [];
    snap.forEach(doc => messages.push({ id: doc.id, ...doc.data() }));
    return messages;
  } catch (error) {
    console.error('loadAdminMessages error:', error);
    return [];
  }
}

// ===== Admin: Update Message Status =====
async function updateMessageStatus(messageId, status, adminNotes) {
  try {
    const updates = { status };
    if (status === 'replied') {
      updates.repliedAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }
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
