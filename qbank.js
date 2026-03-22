// ===== Question Bank Logic =====

let allQuestions = {};
let quizQuestions = [];
let currentIndex = 0;
let answers = {}; // { index: selectedOptionIndex }
let score = { correct: 0, wrong: 0 };

// ===== Test Mode State =====
let isTestMode = false;
let testTimerInterval = null;
let testTimeRemaining = 0; // seconds
let testStartTime = null;
let testElapsedSeconds = 0;
let timerWarningShown = false;

// ===== Progress & History Tracking =====
let userProgress = {};
let testHistory = [];
let currentUserId = null;

async function loadProgress() {
  if (!currentUserId) return;
  try {
    const doc = await db.collection('users').doc(currentUserId).collection('qbankData').doc('progress').get();
    if (doc.exists) {
      userProgress = doc.data();
    } else {
      userProgress = { completedQuestions: {}, resetCount: 0 };
    }
  } catch (err) {
    console.error('Failed to load progress:', err);
    userProgress = { completedQuestions: {}, resetCount: 0 };
  }
}

async function loadTestHistory() {
  if (!currentUserId) return;
  try {
    const snapshot = await db.collection('users').doc(currentUserId)
      .collection('qbankData').doc('history').get();
    if (snapshot.exists && snapshot.data().tests) {
      testHistory = snapshot.data().tests;
    } else {
      testHistory = [];
    }
  } catch (err) {
    console.error('Failed to load test history:', err);
    testHistory = [];
  }
}

async function saveTestRecord(testData) {
  if (!currentUserId) return;
  testHistory.unshift(testData); // Add to beginning (newest first)
  // Keep only last 100 tests
  if (testHistory.length > 100) testHistory = testHistory.slice(0, 100);
  try {
    await db.collection('users').doc(currentUserId)
      .collection('qbankData').doc('history').set({ tests: testHistory });
  } catch (err) {
    console.error('Failed to save test record:', err);
  }
}

async function renameTest(index, newName) {
  if (!currentUserId || !testHistory[index]) return;
  testHistory[index].name = newName.trim();
  try {
    await db.collection('users').doc(currentUserId)
      .collection('qbankData').doc('history').set({ tests: testHistory });
  } catch (err) {
    console.error('Failed to rename test:', err);
  }
}

function renderTestHistoryList() {
  const section = document.getElementById('testHistorySection');
  const list = document.getElementById('testHistoryList');
  if (!section || !list) return;

  if (testHistory.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  list.innerHTML = '';

  testHistory.forEach((test, i) => {
    const date = new Date(test.date);
    const defaultName = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' — ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const displayName = test.name || defaultName;
    const pct = test.total > 0 ? Math.round((test.correct / test.total) * 100) : 0;
    const pctClass = pct >= 70 ? 'score-good' : pct >= 50 ? 'score-mid' : 'score-low';
    const subjects = test.subjects ? test.subjects.join(', ') : '';
    const isTestModeRecord = test.mode && test.mode.includes('Test');
    const modeBadge = isTestModeRecord
      ? '<span class="th-mode th-mode-test">Test</span>'
      : '<span class="th-mode th-mode-review">Review</span>';
    const timeStr = test.timeTaken ? ` · ${Math.floor(test.timeTaken / 60)}m ${test.timeTaken % 60}s` : '';

    const row = document.createElement('div');
    row.className = 'test-history-row';
    const hasReview = test.questionIds && test.questionIds.length > 0;
    row.innerHTML = `
      <div class="th-name-wrap">
        <span class="th-name" id="thName-${i}" title="Click to rename">${displayName}</span>
        ${modeBadge}
        <button class="th-rename-btn" data-index="${i}" title="Rename">✏️</button>
      </div>
      <div class="th-stats">
        <span class="th-score ${pctClass}">${pct}%</span>
        <span class="th-detail">${test.correct}/${test.total} correct${timeStr}</span>
        <span class="th-subjects">${subjects}</span>
        ${hasReview ? `<button class="th-review-btn" data-index="${i}">Review</button>` : ''}
      </div>
    `;
    list.appendChild(row);
  });

  // Attach inline rename handlers
  list.querySelectorAll('.th-rename-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index);
      const nameEl = document.getElementById('thName-' + idx);
      if (nameEl.querySelector('.th-inline-rename')) {
        nameEl.querySelector('.th-inline-rename').focus();
        return;
      }
      const currentName = testHistory[idx].name || nameEl.textContent;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentName;
      input.className = 'th-inline-rename';
      nameEl.textContent = '';
      nameEl.appendChild(input);
      input.focus();
      input.select();

      function doSave() {
        const newName = input.value.trim();
        if (!newName || newName === currentName) {
          nameEl.textContent = currentName;
          return;
        }
        nameEl.textContent = newName;
        renameTest(idx, newName);
      }

      let saved = false;
      input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') { saved = true; input.blur(); doSave(); }
        if (ev.key === 'Escape') { saved = true; nameEl.textContent = currentName; }
      });
      input.addEventListener('blur', () => { if (!saved) { saved = true; doSave(); } });
    });
  });

  // Attach review handlers
  list.querySelectorAll('.th-review-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index);
      const test = testHistory[idx];
      if (!test.questionIds) return;
      loadHistoricalReview(test);
    });
  });
}

async function saveProgress() {
  if (!currentUserId) return;
  try {
    await db.collection('users').doc(currentUserId).collection('qbankData').doc('progress').set(userProgress, { merge: true });
  } catch (err) {
    console.error('Failed to save progress:', err);
  }
}

async function resetProgress() {
  if (!currentUserId) return;
  const profile = await getUserProfile(currentUserId);
  const plan = profile?.payments?.['exam-bank-plan'];
  const ADMIN_EMAILS = ['shosmedglobal@gmail.com', 'elizolotov@gmail.com'];
  const isAdmin = ADMIN_EMAILS.includes(profile?.email || '');

  if (isAdmin) {
    userProgress = { completedQuestions: {}, resetCount: (userProgress.resetCount || 0) + 1 };
    await saveProgress();
    updateProgressDisplay();
    return true;
  }

  if (plan === '6mo' && (userProgress.resetCount || 0) < 1) {
    userProgress = { completedQuestions: {}, resetCount: 1 };
    await saveProgress();
    updateProgressDisplay();
    return true;
  }

  return false;
}

function getProgressStats() {
  const completed = userProgress.completedQuestions || {};
  const totalDone = Object.keys(completed).length;
  const totalCorrect = Object.values(completed).filter(q => q.correct).length;
  return { totalDone, totalCorrect, totalWrong: totalDone - totalCorrect };
}

function isQuestionDone(questionId) {
  return !!(userProgress.completedQuestions && userProgress.completedQuestions[questionId]);
}

function getUnansweredQuestions(pool) {
  return pool.filter(q => !isQuestionDone(q.id));
}

// ===== Subject Performance from Progress =====
function getSubjectPerformance() {
  const completed = userProgress.completedQuestions || {};
  const subjects = {};

  // Initialize all subjects
  Object.entries(allQuestions).forEach(([subj, questions]) => {
    subjects[subj] = { total: questions.length, done: 0, correct: 0 };
  });

  // Count from completed questions
  Object.entries(completed).forEach(([qId, data]) => {
    // Find which subject this question belongs to
    for (const [subj, questions] of Object.entries(allQuestions)) {
      if (questions.find(q => q.id === qId)) {
        subjects[subj].done++;
        if (data.correct) subjects[subj].correct++;
        break;
      }
    }
  });

  return subjects;
}

function updateProgressDisplay() {
  const stats = getProgressStats();
  let totalAvailable = 0;
  Object.values(allQuestions).forEach(arr => { totalAvailable += arr.length; });

  const pct = totalAvailable > 0 ? Math.round((stats.totalDone / totalAvailable) * 100) : 0;

  const progressEl = document.getElementById('overallProgress');
  if (progressEl) {
    progressEl.innerHTML = `
      <div class="progress-stats-row">
        <span class="progress-label">Overall Progress</span>
        <span class="progress-numbers">${stats.totalDone} / ${totalAvailable} questions (${pct}%)</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: ${pct}%"></div>
      </div>
      <div class="progress-detail-row">
        <span class="progress-correct">✓ ${stats.totalCorrect} correct</span>
        <span class="progress-wrong">✗ ${stats.totalWrong} incorrect</span>
        <span class="progress-remaining">${totalAvailable - stats.totalDone} remaining</span>
      </div>
    `;
  }

  // Update per-subject counts
  ['biology', 'chemistry'].forEach(subj => {
    const subjQuestions = allQuestions[subj] || [];
    const done = subjQuestions.filter(q => isQuestionDone(q.id)).length;
    const countEl = document.getElementById('count' + subj.charAt(0).toUpperCase() + subj.slice(1));
    if (countEl) {
      countEl.textContent = `${done}/${subjQuestions.length} done`;
    }
  });
}

function markQuestionCompleted(questionId, isCorrect) {
  if (!userProgress.completedQuestions) {
    userProgress.completedQuestions = {};
  }
  userProgress.completedQuestions[questionId] = {
    correct: isCorrect,
    date: new Date().toISOString()
  };
}

// ===== Performance Screen =====
function showPerformance() {
  showScreen('performanceScreen');
  renderPerformance();
}

function renderPerformance() {
  const container = document.getElementById('performanceContent');
  if (!container) return;

  const stats = getProgressStats();
  const subjPerf = getSubjectPerformance();
  let totalAvailable = 0;
  Object.values(allQuestions).forEach(arr => { totalAvailable += arr.length; });

  const overallPct = stats.totalDone > 0 ? Math.round((stats.totalCorrect / stats.totalDone) * 100) : 0;
  const progressPct = totalAvailable > 0 ? Math.round((stats.totalDone / totalAvailable) * 100) : 0;

  // Build subject breakdown rows
  let subjectRows = '';
  const subjectIcons = { biology: '🧬', chemistry: '⚗️' };
  Object.entries(subjPerf).forEach(([subj, data]) => {
    const pct = data.done > 0 ? Math.round((data.correct / data.done) * 100) : 0;
    const donePct = data.total > 0 ? Math.round((data.done / data.total) * 100) : 0;
    const barColor = pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--gold, #f59e0b)' : 'var(--red)';
    subjectRows += `
      <div class="perf-subject-row">
        <div class="perf-subject-name">
          <span>${subjectIcons[subj] || ''}</span>
          <strong>${subj.charAt(0).toUpperCase() + subj.slice(1)}</strong>
        </div>
        <div class="perf-subject-stats">
          <div class="perf-mini-bar">
            <div class="perf-mini-fill" style="width: ${pct}%; background: ${barColor};"></div>
          </div>
          <span class="perf-subject-pct">${data.done > 0 ? pct + '%' : '—'}</span>
          <span class="perf-subject-detail">${data.correct}/${data.done} correct · ${data.done}/${data.total} done (${donePct}%)</span>
        </div>
      </div>
    `;
  });

  // Build test history rows
  let historyRows = '';
  if (testHistory.length === 0) {
    historyRows = '<tr><td colspan="6" class="perf-empty">No tests completed yet. Start a block to see your history.</td></tr>';
  } else {
    testHistory.forEach((test, i) => {
      const date = new Date(test.date);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const pct = test.total > 0 ? Math.round((test.correct / test.total) * 100) : 0;
      const pctClass = pct >= 70 ? 'perf-score-good' : pct >= 50 ? 'perf-score-mid' : 'perf-score-low';
      const subjects = test.subjects ? test.subjects.join(', ') : '—';
      historyRows += `
        <tr>
          <td>${testHistory.length - i}</td>
          <td>${dateStr}<br><small>${timeStr}</small></td>
          <td class="${pctClass}"><strong>${pct}%</strong></td>
          <td>${test.correct}/${test.total}</td>
          <td>${subjects}</td>
          <td>${test.mode || 'All'}</td>
        </tr>
      `;
    });
  }

  // Cumulative score across all tests
  let totalTestQuestions = 0, totalTestCorrect = 0;
  testHistory.forEach(t => { totalTestQuestions += t.total; totalTestCorrect += t.correct; });
  const cumulativePct = totalTestQuestions > 0 ? Math.round((totalTestCorrect / totalTestQuestions) * 100) : 0;

  container.innerHTML = `
    <!-- Cumulative Stats Cards -->
    <div class="perf-stats-grid">
      <div class="perf-stat-card">
        <div class="perf-stat-number">${progressPct}%</div>
        <div class="perf-stat-label">QBank Completed</div>
        <div class="perf-stat-sub">${stats.totalDone} / ${totalAvailable} questions</div>
      </div>
      <div class="perf-stat-card">
        <div class="perf-stat-number ${overallPct >= 70 ? 'perf-score-good' : overallPct >= 50 ? 'perf-score-mid' : 'perf-score-low'}">${stats.totalDone > 0 ? overallPct + '%' : '—'}</div>
        <div class="perf-stat-label">Overall Accuracy</div>
        <div class="perf-stat-sub">${stats.totalCorrect} correct / ${stats.totalDone} answered</div>
      </div>
      <div class="perf-stat-card">
        <div class="perf-stat-number">${testHistory.length}</div>
        <div class="perf-stat-label">Tests Completed</div>
        <div class="perf-stat-sub">${totalTestQuestions} total questions attempted</div>
      </div>
      <div class="perf-stat-card">
        <div class="perf-stat-number ${cumulativePct >= 70 ? 'perf-score-good' : cumulativePct >= 50 ? 'perf-score-mid' : 'perf-score-low'}">${totalTestQuestions > 0 ? cumulativePct + '%' : '—'}</div>
        <div class="perf-stat-label">Cumulative Test Score</div>
        <div class="perf-stat-sub">${totalTestCorrect} / ${totalTestQuestions} across all tests</div>
      </div>
    </div>

    <!-- Subject Breakdown -->
    <div class="perf-section">
      <h3>Subject Performance</h3>
      <div class="perf-subject-list">
        ${subjectRows}
      </div>
    </div>

    <!-- Test History -->
    <div class="perf-section">
      <h3>Test History</h3>
      <div class="perf-table-wrap">
        <table class="perf-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Score</th>
              <th>Correct</th>
              <th>Subjects</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            ${historyRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Load questions from JSON
async function loadQuestions() {
  try {
    const res = await fetch('questions.json');
    allQuestions = await res.json();
    updateProgressDisplay();
  } catch (err) {
    console.error('Failed to load questions:', err);
  }
}

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Topic-interleaved shuffle: spreads questions from the same topic apart
// so you don't get similar questions back to back
function topicInterleaveShuffle(arr) {
  // Group questions by topic
  const byTopic = {};
  arr.forEach(q => {
    const key = (q.subject || '') + '::' + (q.topic || '');
    if (!byTopic[key]) byTopic[key] = [];
    byTopic[key].push(q);
  });

  // Shuffle within each topic group
  const topicKeys = Object.keys(byTopic);
  topicKeys.forEach(key => { byTopic[key] = shuffle(byTopic[key]); });

  // Sort topic groups by size (largest first) for better interleaving
  topicKeys.sort((a, b) => byTopic[b].length - byTopic[a].length);

  // Round-robin pick: take one from each topic in rotation
  const result = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    // Shuffle the order of topics each round so it's not predictable
    const roundOrder = shuffle(topicKeys);
    for (const key of roundOrder) {
      if (byTopic[key].length > 0) {
        result.push(byTopic[key].shift());
        remaining = true;
      }
    }
  }

  return result;
}

// Start quiz
function startQuiz() {
  const selectedSubjects = Array.from(
    document.querySelectorAll('input[name="subject"]:checked')
  ).map(cb => cb.value);

  if (selectedSubjects.length === 0) {
    alert('Please select at least one subject.');
    return;
  }

  let pool = [];
  selectedSubjects.forEach(subj => {
    if (allQuestions[subj]) {
      pool = pool.concat(allQuestions[subj]);
    }
  });

  if (pool.length === 0) {
    alert('No questions available for the selected subjects.');
    return;
  }

  // Filter by mode
  const filterMode = document.getElementById('questionFilter')?.value || 'all';
  if (filterMode === 'unanswered') {
    pool = getUnansweredQuestions(pool);
    if (pool.length === 0) {
      alert('You have completed all questions in the selected subjects! Switch to "All Questions" to review them.');
      return;
    }
  } else if (filterMode === 'incorrect') {
    pool = pool.filter(q => {
      const progress = userProgress.completedQuestions?.[q.id];
      return progress && !progress.correct;
    });
    if (pool.length === 0) {
      alert('No previously incorrect questions found. Great job!');
      return;
    }
  }

  // Store quiz metadata for history
  window._quizMeta = {
    subjects: selectedSubjects.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    mode: filterMode === 'unanswered' ? 'Unanswered' : filterMode === 'incorrect' ? 'Incorrect' : 'All'
  };

  const shouldShuffle = document.getElementById('shuffleQuestions').checked;
  if (shouldShuffle && window.qbankAccessLevel !== 'sample') {
    pool = topicInterleaveShuffle(pool);
  }

  const countSelect = document.getElementById('questionCount').value;
  const limit = parseInt(countSelect);
  if (limit > 0 && limit < pool.length) {
    pool = pool.slice(0, limit);
  }

  quizQuestions = pool;
  currentIndex = 0;
  answers = {};
  score = { correct: 0, wrong: 0 };

  // Detect quiz mode
  const modeRadio = document.querySelector('input[name="quizMode"]:checked');
  isTestMode = modeRadio && modeRadio.value === 'test';
  timerWarningShown = false;

  document.getElementById('totalQuestions').textContent = quizQuestions.length;
  document.getElementById('scoreCorrect').textContent = '0';
  document.getElementById('scoreWrong').textContent = '0';

  // Test Mode setup
  if (isTestMode) {
    document.getElementById('quizScoreDisplay').style.display = 'none';
    document.getElementById('testTimer').style.display = 'flex';
    document.getElementById('questionNavigator').style.display = 'flex';
    testTimeRemaining = quizQuestions.length * 2 * 60; // 2 min per question
    testStartTime = Date.now();
    testElapsedSeconds = 0;
    updateTimerDisplay();
    startTimer();
    renderQuestionNavigator();
  } else {
    document.getElementById('quizScoreDisplay').style.display = '';
    document.getElementById('testTimer').style.display = 'none';
    document.getElementById('questionNavigator').style.display = 'none';
    stopTimer();
  }

  showScreen('quizScreen');
  renderQuestion();
  saveInProgressTest();
}

// Render current question
function renderQuestion() {
  const q = quizQuestions[currentIndex];
  if (!q) return;

  document.getElementById('questionIndex').textContent = currentIndex + 1;
  document.getElementById('currentSubject').textContent =
    q.subject.charAt(0).toUpperCase() + q.subject.slice(1);

  const pct = ((currentIndex + 1) / quizQuestions.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';

  document.getElementById('questionTopic').textContent = q.topic;
  document.getElementById('questionText').innerHTML = q.question;

  const container = document.getElementById('optionsContainer');
  const letters = ['A', 'B', 'C', 'D'];
  container.innerHTML = '';

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-option';
    div.dataset.index = i;
    const letterSpan = document.createElement('span');
    letterSpan.className = 'option-letter';
    letterSpan.textContent = letters[i];
    const textSpan = document.createElement('span');
    textSpan.textContent = opt;
    div.appendChild(letterSpan);
    div.appendChild(textSpan);

    if (isTestMode) {
      // Test Mode: allow selecting/changing answers, no correct/wrong styling
      if (answers[currentIndex] === i) {
        div.classList.add('selected');
      }
      div.addEventListener('click', () => selectAnswer(i));
    } else {
      // Review Mode: original behavior
      if (answers[currentIndex] !== undefined) {
        div.classList.add('disabled');
        if (i === q.correct) div.classList.add('correct');
        if (i === answers[currentIndex] && i !== q.correct) div.classList.add('wrong');
      } else {
        div.addEventListener('click', () => selectAnswer(i));
      }
    }

    container.appendChild(div);
  });

  const expBox = document.getElementById('explanationBox');
  const reportWrap = document.getElementById('reportBtnWrap');
  const reportForm = document.getElementById('reportForm');

  if (isTestMode) {
    // Test Mode: never show explanation during quiz
    expBox.style.display = 'none';
    reportWrap.style.display = 'none';
    reportForm.style.display = 'none';
  } else {
    // Review Mode: original behavior
    if (answers[currentIndex] !== undefined) {
      showExplanation(q, answers[currentIndex] === q.correct);
      reportWrap.style.display = 'flex';
    } else {
      expBox.style.display = 'none';
      reportWrap.style.display = 'none';
    }
    reportForm.style.display = 'none';
    // Reset report button in case previous question had "submitted" state
    reportWrap.innerHTML = '<button class="report-btn" id="reportBtn" title="Report a problem with this question">Report an issue</button>';
    // Re-attach event listener
    document.getElementById('reportBtn').addEventListener('click', () => {
      document.getElementById('reportForm').style.display = 'block';
      document.getElementById('reportBtnWrap').style.display = 'none';
      document.querySelectorAll('input[name="reportReason"]').forEach(r => r.checked = false);
      document.getElementById('reportDetails').value = '';
    });
  }

  document.getElementById('prevBtn').disabled = currentIndex === 0;

  if (isTestMode) {
    // Test Mode navigation: always show Next (except on last), always show Finish Test
    const isLast = currentIndex === quizQuestions.length - 1;
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('finishBtn').style.display = 'none';
    document.getElementById('testNextBtn').style.display = isLast ? 'none' : 'inline-flex';
    document.getElementById('finishTestBtn').style.display = 'inline-flex';
    // Update navigator highlight
    updateNavigatorHighlight();
  } else {
    // Review Mode: original behavior
    document.getElementById('testNextBtn').style.display = 'none';
    document.getElementById('finishTestBtn').style.display = 'none';
    const isAnswered = answers[currentIndex] !== undefined;
    const isLast = currentIndex === quizQuestions.length - 1;
    document.getElementById('nextBtn').style.display = (isAnswered && !isLast) ? 'inline-flex' : 'none';
    document.getElementById('finishBtn').style.display = (isAnswered && isLast) ? 'inline-flex' : 'none';
  }
}

// Select an answer
function selectAnswer(index) {
  if (isTestMode) {
    // Test Mode: allow changing answers, no grading yet
    answers[currentIndex] = index;

    // Update option styling
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => {
      const i = parseInt(opt.dataset.index);
      opt.classList.remove('selected');
      if (i === index) opt.classList.add('selected');
    });

    // Update navigator
    updateNavigatorHighlight();

    // Auto-save in-progress state
    saveInProgressTest();
    return;
  }

  // Review Mode: original behavior
  if (answers[currentIndex] !== undefined) return;

  const q = quizQuestions[currentIndex];
  answers[currentIndex] = index;
  const isCorrect = index === q.correct;

  if (isCorrect) score.correct++;
  else score.wrong++;

  markQuestionCompleted(q.id, isCorrect);

  document.getElementById('scoreCorrect').textContent = score.correct;
  document.getElementById('scoreWrong').textContent = score.wrong;

  const options = document.querySelectorAll('.quiz-option');
  options.forEach(opt => {
    const i = parseInt(opt.dataset.index);
    opt.classList.add('disabled');
    opt.replaceWith(opt.cloneNode(true));

    const newOpt = document.querySelectorAll('.quiz-option')[i];
    if (i === q.correct) newOpt.classList.add('correct');
    if (i === index && !isCorrect) newOpt.classList.add('wrong');
    newOpt.classList.add('disabled');
  });

  showExplanation(q, isCorrect);

  const isLast = currentIndex === quizQuestions.length - 1;
  document.getElementById('nextBtn').style.display = isLast ? 'none' : 'inline-flex';
  document.getElementById('finishBtn').style.display = isLast ? 'inline-flex' : 'none';

  // Auto-save in-progress state
  saveInProgressTest();
}

// Show explanation
function showExplanation(q, isCorrect) {
  const box = document.getElementById('explanationBox');
  const header = box.querySelector('.explanation-header');
  const icon = document.getElementById('explanationIcon');
  const title = document.getElementById('explanationTitle');
  const content = document.getElementById('explanationContent');

  header.className = 'explanation-header ' + (isCorrect ? 'correct-header' : 'wrong-header');
  icon.textContent = isCorrect ? '✓' : '✗';
  title.textContent = isCorrect ? 'Correct!' : 'Incorrect';
  // Sanitize: only allow safe HTML tags from questions.json
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = q.explanation;
  // Remove any script tags
  tempDiv.querySelectorAll('script,iframe,object,embed,form,input').forEach(el => el.remove());
  content.innerHTML = tempDiv.innerHTML;
  box.style.display = 'block';

  // Restore saved highlights for this question
  restoreHighlights(q.id, content);

  setTimeout(() => {
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ===== Highlighter Feature =====
const HL_COLORS = {
  yellow: '#ffe066',
  green:  '#a8edba',
  blue:   '#a0d4f7'
};

function getHighlightKey(qId) { return 'qbank_highlights_' + qId; }

function saveHighlights(qId, container) {
  const marks = container.querySelectorAll('mark.user-highlight');
  const data = Array.from(marks).map(m => ({ text: m.textContent, color: m.dataset.hlColor || 'yellow' }));
  if (data.length > 0) {
    localStorage.setItem(getHighlightKey(qId), JSON.stringify(data));
  } else {
    localStorage.removeItem(getHighlightKey(qId));
  }
}

function restoreHighlights(qId, container) {
  const stored = localStorage.getItem(getHighlightKey(qId));
  if (!stored) return;
  try {
    const data = JSON.parse(stored);
    data.forEach(item => {
      // Support old format (plain string) and new format ({text, color})
      const text = typeof item === 'string' ? item : item.text;
      const color = typeof item === 'string' ? 'yellow' : (item.color || 'yellow');
      highlightTextInNode(container, text, color);
    });
  } catch (e) { /* ignore */ }
}

function highlightTextInNode(root, searchText, color) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const idx = node.textContent.indexOf(searchText);
    if (idx === -1 || node.parentElement.classList.contains('user-highlight')) continue;
    const range = document.createRange();
    range.setStart(node, idx);
    range.setEnd(node, idx + searchText.length);
    const mark = document.createElement('mark');
    mark.className = 'user-highlight';
    mark.dataset.hlColor = color || 'yellow';
    mark.style.background = HL_COLORS[color] || HL_COLORS.yellow;
    range.surroundContents(mark);
    return;
  }
}

function removeHighlightMark(mark) {
  const parent = mark.parentNode;
  while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
  parent.removeChild(mark);
  parent.normalize();
}

// Highlight popup on text selection inside explanation
(function initHighlighter() {
  let popup = document.createElement('div');
  popup.className = 'highlight-popup';
  popup.innerHTML =
    '<button class="hl-color-btn" data-color="yellow" title="Yellow"><span style="background:#ffe066"></span></button>' +
    '<button class="hl-color-btn" data-color="green" title="Green"><span style="background:#a8edba"></span></button>' +
    '<button class="hl-color-btn" data-color="blue" title="Blue"><span style="background:#a0d4f7"></span></button>';
  popup.style.display = 'none';
  document.body.appendChild(popup);

  // Find the explanation container the selection is inside (quiz or review mode)
  function getExpContainer(node) {
    if (!node || !node.parentElement) return null;
    const el = node.parentElement.closest ? node.parentElement : node;
    const quizExp = document.getElementById('explanationContent');
    if (quizExp && quizExp.contains(node)) return { container: quizExp, qIndex: currentIndex };
    const reviewExp = el.closest ? el.closest('.review-explanation') : null;
    if (reviewExp) {
      const reviewItem = reviewExp.closest('.review-item');
      const allItems = Array.from(document.querySelectorAll('#reviewContainer .review-item'));
      const idx = allItems.indexOf(reviewItem);
      return { container: reviewExp, qIndex: idx >= 0 ? idx : null };
    }
    return null;
  }

  // Click on existing highlight → remove it
  document.addEventListener('click', (e) => {
    const mark = e.target.closest('mark.user-highlight');
    if (!mark) return;
    // Only act if no text is being selected (pure click)
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) return;
    const expInfo = getExpContainer(mark);
    removeHighlightMark(mark);
    if (expInfo) {
      const q = expInfo.qIndex != null ? quizQuestions[expInfo.qIndex] : null;
      if (q) saveHighlights(q.id, expInfo.container);
    }
  });

  // Show color picker popup on text selection
  document.addEventListener('mouseup', (e) => {
    // Small delay to let click-to-remove run first
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.toString().trim().length === 0) {
        popup.style.display = 'none';
        return;
      }
      // Don't show popup if selection is inside an existing highlight
      if (sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('mark.user-highlight')) {
        popup.style.display = 'none';
        return;
      }
      const expInfo = getExpContainer(sel.anchorNode);
      if (!expInfo) {
        popup.style.display = 'none';
        return;
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      popup.style.left = (rect.left + rect.width / 2 - 52) + 'px';
      popup.style.top = (rect.top - 44 + window.scrollY) + 'px';
      popup.style.display = 'flex';
    }, 10);
  });

  // Color button clicks → apply highlight
  popup.querySelectorAll('.hl-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      const expInfo = getExpContainer(sel.anchorNode);
      if (!expInfo) return;
      try {
        const range = sel.getRangeAt(0);
        // Use extractContents + wrap to handle cross-element selections
        const fragment = range.extractContents();
        const mark = document.createElement('mark');
        mark.className = 'user-highlight';
        mark.dataset.hlColor = color;
        mark.style.background = HL_COLORS[color] || HL_COLORS.yellow;
        mark.appendChild(fragment);
        range.insertNode(mark);
        // Normalize to merge adjacent text nodes
        mark.parentNode && mark.parentNode.normalize();
        sel.removeAllRanges();
        popup.style.display = 'none';
        const q = expInfo.qIndex != null ? quizQuestions[expInfo.qIndex] : null;
        if (q) saveHighlights(q.id, expInfo.container);
      } catch (e) { console.warn('Highlight error:', e); }
    });
  });

  document.addEventListener('mousedown', (e) => {
    if (!popup.contains(e.target)) popup.style.display = 'none';
  });
})();

// Navigation
function goNext() {
  if (currentIndex < quizQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function finishQuiz() {
  if (isTestMode) {
    finishTestMode();
    return;
  }

  // Review Mode: original behavior
  // Save progress to Firestore
  saveProgress();

  // Save test record
  const meta = window._quizMeta || { subjects: [], mode: 'All' };
  const now = new Date();
  const defaultName = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' — ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  saveTestRecord({
    date: now.toISOString(),
    name: defaultName,
    correct: score.correct,
    wrong: score.wrong,
    total: quizQuestions.length,
    subjects: meta.subjects,
    mode: meta.mode,
    questionIds: quizQuestions.map(q => q.id),
    userAnswers: { ...answers }
  });

  // Clear in-progress state
  clearInProgressTest();

  showResults();
}

// ===== Test Mode: Finish and Grade =====
function finishTestMode() {
  stopTimer();
  testElapsedSeconds = Math.round((Date.now() - testStartTime) / 1000);

  // Grade all questions now
  score = { correct: 0, wrong: 0 };
  quizQuestions.forEach((q, i) => {
    const userAnswer = answers[i];
    const isCorrect = userAnswer !== undefined && userAnswer === q.correct;
    if (isCorrect) {
      score.correct++;
    } else {
      score.wrong++;
    }
    // Mark progress (unanswered = wrong)
    markQuestionCompleted(q.id, isCorrect);
  });

  // Save progress to Firestore
  saveProgress();

  // Save test record
  const meta = window._quizMeta || { subjects: [], mode: 'All' };
  const now = new Date();
  const defaultName = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' — ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  saveTestRecord({
    date: now.toISOString(),
    name: defaultName,
    correct: score.correct,
    wrong: score.wrong,
    total: quizQuestions.length,
    subjects: meta.subjects,
    mode: meta.mode + ' (Test)',
    questionIds: quizQuestions.map(q => q.id),
    userAnswers: { ...answers },
    timeTaken: testElapsedSeconds
  });

  // Clear in-progress state
  clearInProgressTest();

  // Show results with time
  showResults();

  // Show time taken
  const timeEl = document.getElementById('statTimeTaken');
  const finalTimeEl = document.getElementById('finalTime');
  if (timeEl && finalTimeEl) {
    timeEl.style.display = '';
    const mins = Math.floor(testElapsedSeconds / 60);
    const secs = testElapsedSeconds % 60;
    finalTimeEl.textContent = mins + ':' + String(secs).padStart(2, '0');
  }

  // Reset test mode state after showing results
  // (isTestMode stays true so review shows correctly)
}

// ===== Timer Functions =====
function startTimer() {
  stopTimer();
  testTimerInterval = setInterval(() => {
    testTimeRemaining--;
    updateTimerDisplay();

    // 5-minute warning
    if (testTimeRemaining === 300 && !timerWarningShown) {
      timerWarningShown = true;
      document.getElementById('timerWarningModal').style.display = 'flex';
    }

    // Time's up
    if (testTimeRemaining <= 0) {
      testTimeRemaining = 0;
      updateTimerDisplay();
      finishTestMode();
    }
  }, 1000);
}

function stopTimer() {
  if (testTimerInterval) {
    clearInterval(testTimerInterval);
    testTimerInterval = null;
  }
}

function updateTimerDisplay() {
  const display = document.getElementById('timerDisplay');
  if (!display) return;
  const mins = Math.floor(testTimeRemaining / 60);
  const secs = testTimeRemaining % 60;
  display.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

  // Turn red when under 2 minutes
  const timerEl = document.getElementById('testTimer');
  if (timerEl) {
    if (testTimeRemaining < 120) {
      timerEl.classList.add('timer-danger');
    } else {
      timerEl.classList.remove('timer-danger');
    }
  }
}

// ===== Question Navigator =====
function renderQuestionNavigator() {
  const nav = document.getElementById('questionNavigator');
  if (!nav) return;
  nav.innerHTML = '';
  quizQuestions.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.className = 'nav-dot';
    btn.textContent = i + 1;
    btn.dataset.index = i;
    if (i === currentIndex) btn.classList.add('nav-dot-current');
    if (answers[i] !== undefined) btn.classList.add('nav-dot-answered');
    btn.addEventListener('click', () => {
      currentIndex = i;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    nav.appendChild(btn);
  });
}

function updateNavigatorHighlight() {
  const nav = document.getElementById('questionNavigator');
  if (!nav) return;
  const dots = nav.querySelectorAll('.nav-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('nav-dot-current', i === currentIndex);
    dot.classList.toggle('nav-dot-answered', answers[i] !== undefined);
  });
}

// ===== Test Time Info (start screen) =====
function updateTestTimeInfo() {
  const modeRadio = document.querySelector('input[name="quizMode"]:checked');
  const infoEl = document.getElementById('testTimeInfo');
  const textEl = document.getElementById('testTimeText');
  if (!modeRadio || !infoEl || !textEl) return;

  if (modeRadio.value === 'test') {
    const count = parseInt(document.getElementById('questionCount').value) || 20;
    const minutes = count * 2;
    textEl.textContent = count + ' questions = ' + minutes + ' minutes';
    infoEl.style.display = 'flex';
  } else {
    infoEl.style.display = 'none';
  }
}

// Show results
function showResults() {
  showScreen('resultsScreen');

  // Hide time stat by default (shown by finishTestMode if applicable)
  const timeEl = document.getElementById('statTimeTaken');
  if (timeEl && !isTestMode) timeEl.style.display = 'none';

  const total = quizQuestions.length;
  const pct = total > 0 ? Math.round((score.correct / total) * 100) : 0;

  document.getElementById('scorePercent').textContent = pct + '%';
  const circle = document.getElementById('scoreCircle');
  const circumference = 339.292;
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => { circle.style.strokeDashoffset = offset; }, 100);

  if (pct >= 70) circle.style.stroke = 'var(--green)';
  else if (pct >= 50) circle.style.stroke = 'var(--gold)';
  else circle.style.stroke = 'var(--red)';

  document.getElementById('finalCorrect').textContent = score.correct;
  document.getElementById('finalWrong').textContent = score.wrong;
  document.getElementById('finalTotal').textContent = total;

  const breakdown = {};
  quizQuestions.forEach((q, i) => {
    if (!breakdown[q.subject]) breakdown[q.subject] = { correct: 0, total: 0 };
    breakdown[q.subject].total++;
    if (answers[i] === q.correct) breakdown[q.subject].correct++;
  });

  const breakdownEl = document.getElementById('subjectBreakdown');
  breakdownEl.innerHTML = '';
  Object.entries(breakdown).forEach(([subj, data]) => {
    const subjPct = Math.round((data.correct / data.total) * 100);
    breakdownEl.innerHTML += `
      <div class="breakdown-row">
        <span class="breakdown-subject">${subj}</span>
        <div class="breakdown-bar">
          <div class="breakdown-bar-fill" style="width: ${subjPct}%"></div>
        </div>
        <span class="breakdown-score">${data.correct}/${data.total}</span>
      </div>
    `;
  });
}

// Review answers
function showReview() {
  showScreen('reviewScreen');
  const container = document.getElementById('reviewContainer');
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  quizQuestions.forEach((q, i) => {
    const userAnswer = answers[i];
    const isUnanswered = userAnswer === undefined;
    const isCorrect = !isUnanswered && userAnswer === q.correct;

    let answersHtml = '';
    q.options.forEach((opt, j) => {
      let cls = 'neutral';
      let prefix = letters[j] + '.';
      if (j === q.correct) cls = 'correct-answer';
      if (!isUnanswered && j === userAnswer && !isCorrect) cls = 'wrong-answer';
      answersHtml += `<div class="review-answer ${cls}">${prefix} ${opt}</div>`;
    });

    const statusClass = isUnanswered ? 'wrong' : (isCorrect ? 'correct' : 'wrong');
    const unansweredBadge = isUnanswered ? '<span class="review-unanswered-badge">Unanswered</span>' : '';
    container.innerHTML += `
      <div class="review-item">
        <div class="review-item-header">
          <span class="review-number ${statusClass}">${i + 1}</span>
          <span class="review-topic">${q.subject} · ${q.topic}</span>
          ${unansweredBadge}
        </div>
        <div class="review-question">${q.question}</div>
        <div class="review-answers">${answersHtml}</div>
        <div class="review-explanation">${q.explanation}</div>
        <div class="report-btn-wrap" style="display:flex;">
          <button class="report-btn review-report-btn" data-qid="${q.id}" data-subject="${q.subject}" data-topic="${q.topic}">Report an issue</button>
        </div>
      </div>
    `;
  });

  // Restore saved highlights for each review question
  container.querySelectorAll('.review-item').forEach((item, i) => {
    const q = quizQuestions[i];
    const expEl = item.querySelector('.review-explanation');
    if (q && expEl) restoreHighlights(q.id, expEl);
  });

  // Delegated click handler for review report buttons
  container.addEventListener('click', async (e) => {
    const btn = e.target.closest('.review-report-btn');
    if (!btn) return;
    const reason = prompt('What is the issue? (e.g., incorrect answer, unclear question, wrong explanation)');
    if (!reason) return;
    try {
      await db.collection('questionReports').add({
        questionId: btn.dataset.qid,
        subject: btn.dataset.subject,
        topic: btn.dataset.topic,
        reason: 'review_report',
        details: reason,
        userId: currentUserId,
        reportedAt: new Date().toISOString()
      });
      btn.textContent = 'Report submitted!';
      btn.disabled = true;
      btn.style.opacity = '0.5';
    } catch (err) {
      console.error('Failed to submit report:', err);
      alert('Failed to submit report. Please try again.');
    }
  });
}

// ===== In-Progress Test Save/Restore =====
async function saveInProgressTest() {
  if (!currentUserId || quizQuestions.length === 0) return;
  try {
    const meta = window._quizMeta || { subjects: [], mode: 'All' };
    await db.collection('users').doc(currentUserId)
      .collection('qbankData').doc('inProgress').set({
        questionIds: quizQuestions.map(q => q.id),
        answers: { ...answers },
        currentIndex,
        score: { ...score },
        meta,
        total: quizQuestions.length,
        startedAt: new Date().toISOString()
      });
  } catch (err) {
    console.error('Failed to save in-progress:', err);
  }
}

async function clearInProgressTest() {
  if (!currentUserId) return;
  try {
    await db.collection('users').doc(currentUserId)
      .collection('qbankData').doc('inProgress').delete();
  } catch (err) {
    console.error('Failed to clear in-progress:', err);
  }
}

async function getInProgressTest() {
  if (!currentUserId) return null;
  try {
    const doc = await db.collection('users').doc(currentUserId)
      .collection('qbankData').doc('inProgress').get();
    return doc.exists ? doc.data() : null;
  } catch (err) {
    console.error('Failed to load in-progress:', err);
    return null;
  }
}

// Restore an in-progress test and continue
function resumeInProgressTest(savedState) {
  // Rebuild quizQuestions from IDs using allQuestions
  const allQMap = {};
  Object.values(allQuestions).forEach(arr => {
    arr.forEach(q => { allQMap[q.id] = q; });
  });

  quizQuestions = savedState.questionIds
    .map(id => allQMap[id])
    .filter(q => q); // skip any missing questions

  if (quizQuestions.length === 0) {
    alert('Could not restore test questions. The test may have been modified.');
    return;
  }

  // Restore state — convert string keys back to numbers
  answers = {};
  if (savedState.answers) {
    Object.keys(savedState.answers).forEach(k => {
      answers[parseInt(k)] = savedState.answers[k];
    });
  }
  currentIndex = savedState.currentIndex || 0;
  score = savedState.score || { correct: 0, wrong: 0 };
  window._quizMeta = savedState.meta || { subjects: [], mode: 'All' };

  document.getElementById('totalQuestions').textContent = quizQuestions.length;
  document.getElementById('scoreCorrect').textContent = score.correct;
  document.getElementById('scoreWrong').textContent = score.wrong;

  showScreen('quizScreen');
  renderQuestion();
}

// Load a historical test for review-only (from Previous Tests)
function loadHistoricalReview(testRecord) {
  // Rebuild quizQuestions from stored IDs
  const allQMap = {};
  Object.values(allQuestions).forEach(arr => {
    arr.forEach(q => { allQMap[q.id] = q; });
  });

  const ids = testRecord.questionIds || [];
  quizQuestions = ids.map(id => allQMap[id]).filter(q => q);

  if (quizQuestions.length === 0) {
    if (ids.length === 0) {
      alert('This test was taken before review data was saved. No questions to review.');
    } else {
      alert('Could not match ' + ids.length + ' stored question IDs to current question bank. The questions may have been updated.');
    }
    showScreen('startScreen');
    return;
  }

  // Restore answers — convert string keys back to numbers
  answers = {};
  if (testRecord.userAnswers) {
    Object.keys(testRecord.userAnswers).forEach(k => {
      answers[parseInt(k)] = testRecord.userAnswers[k];
    });
  }

  score = { correct: testRecord.correct || 0, wrong: testRecord.wrong || 0 };

  // Hide "Back to Results" (no results screen for historical review), show "Back to QBank"
  const backToResults = document.getElementById('backToResultsBtn');
  const backToStart = document.getElementById('backToQbankBtn');
  if (backToResults) backToResults.style.display = 'none';

  showReview();
}

// Screen switching
function showScreen(id) {
  ['startScreen', 'quizScreen', 'resultsScreen', 'reviewScreen', 'performanceScreen'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = s === id ? 'block' : 'none';
  });
  if (id === 'startScreen') {
    updateProgressDisplay();
    renderTestHistoryList();
    // Reset test mode when going back to start
    stopTimer();
    isTestMode = false;
  }
  // Hide navbar during quiz/review to avoid double header
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.display = (id === 'quizScreen' || id === 'reviewScreen') ? 'none' : '';
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
  document.getElementById('nextBtn').addEventListener('click', goNext);
  document.getElementById('prevBtn').addEventListener('click', goPrev);
  document.getElementById('finishBtn').addEventListener('click', finishQuiz);
  document.getElementById('testNextBtn').addEventListener('click', goNext);
  document.getElementById('finishTestBtn').addEventListener('click', () => {
    const unanswered = quizQuestions.length - Object.keys(answers).length;
    if (unanswered > 0) {
      if (!confirm('You have ' + unanswered + ' unanswered question' + (unanswered > 1 ? 's' : '') + '. Submit anyway?')) return;
    }
    finishTestMode();
  });
  document.getElementById('timerWarningDismiss').addEventListener('click', () => {
    document.getElementById('timerWarningModal').style.display = 'none';
  });
  document.getElementById('retryBtn').addEventListener('click', () => {
    document.getElementById('scoreCircle').style.strokeDashoffset = 339.292;
    isTestMode = false;
    showScreen('startScreen');
  });
  document.getElementById('reviewBtn').addEventListener('click', showReview);
  document.getElementById('backToResultsBtn').addEventListener('click', () => showScreen('resultsScreen'));
  document.getElementById('backToQbankBtn').addEventListener('click', () => {
    window.location.href = 'dashboard.html?view=qbank';
  });

  // Mode selector: show/hide time info + visual toggle
  document.querySelectorAll('input[name="quizMode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      updateTestTimeInfo();
      // Update visual state for mode options (fallback for browsers without :has())
      document.querySelectorAll('.mode-option').forEach(opt => {
        opt.classList.toggle('mode-option-active', opt.querySelector('input').checked);
      });
    });
  });
  // Set initial state
  document.querySelectorAll('.mode-option').forEach(opt => {
    opt.classList.toggle('mode-option-active', opt.querySelector('input').checked);
  });
  const questionCountSel = document.getElementById('questionCount');
  if (questionCountSel) questionCountSel.addEventListener('change', updateTestTimeInfo);

  // Performance button
  const perfBtn = document.getElementById('performanceBtn');
  if (perfBtn) perfBtn.addEventListener('click', showPerformance);

  const backFromPerf = document.getElementById('backFromPerformance');
  if (backFromPerf) backFromPerf.addEventListener('click', () => showScreen('startScreen'));

  // Reset button
  const resetBtn = document.getElementById('resetProgressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to reset all your progress? This cannot be undone.')) return;
      const success = await resetProgress();
      if (success) {
        alert('Progress has been reset. You can start fresh!');
        showScreen('startScreen');
      } else {
        alert('Progress reset is not available for your subscription plan. Only 6-month subscribers can reset once.');
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('quizScreen').style.display === 'none') return;

    if (isTestMode) {
      // Test Mode: arrow keys always navigate, number keys select/change answer
      if (e.key === 'ArrowRight') {
        if (currentIndex < quizQuestions.length - 1) goNext();
      }
      if (e.key === 'ArrowLeft') goPrev();

      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        selectAnswer(num - 1);
      }
    } else {
      // Review Mode: original behavior
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (answers[currentIndex] !== undefined) {
          if (currentIndex < quizQuestions.length - 1) goNext();
          else finishQuiz();
        }
      }
      if (e.key === 'ArrowLeft') goPrev();

      const num = parseInt(e.key);
      if (num >= 1 && num <= 4 && answers[currentIndex] === undefined) {
        selectAnswer(num - 1);
      }
    }
  });

  // ===== Report Issue (Cancel & Submit — form elements don't get replaced) =====
  document.getElementById('reportCancel').addEventListener('click', () => {
    document.getElementById('reportForm').style.display = 'none';
    document.getElementById('reportBtnWrap').style.display = 'flex';
  });

  document.getElementById('reportSubmit').addEventListener('click', async () => {
    const reason = document.querySelector('input[name="reportReason"]:checked');
    if (!reason) {
      alert('Please select a reason for the report.');
      return;
    }
    const q = quizQuestions[currentIndex];
    const details = document.getElementById('reportDetails').value.trim();
    try {
      await db.collection('questionReports').add({
        questionId: q.id,
        subject: q.subject,
        topic: q.topic,
        reason: reason.value,
        details: details,
        userId: currentUserId,
        reportedAt: new Date().toISOString()
      });
      document.getElementById('reportForm').style.display = 'none';
      document.getElementById('reportBtnWrap').innerHTML =
        '<span class="report-thanks">Report submitted. Thank you!</span>';
      document.getElementById('reportBtnWrap').style.display = 'flex';
    } catch (err) {
      console.error('Failed to submit report:', err);
      alert('Failed to submit report. Please try again.');
    }
  });
});
