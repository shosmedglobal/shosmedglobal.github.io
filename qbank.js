// ===== Question Bank Logic =====

let allQuestions = {};
let quizQuestions = [];
let currentIndex = 0;
let answers = {}; // { index: selectedOptionIndex }
let score = { correct: 0, wrong: 0 };

// Load questions from JSON
async function loadQuestions() {
  try {
    const res = await fetch('questions.json');
    allQuestions = await res.json();

    // Update counts
    document.getElementById('countBiology').textContent =
      (allQuestions.biology?.length || 0) + ' questions';
    document.getElementById('countChemistry').textContent =
      (allQuestions.chemistry?.length || 0) + ' questions';
    document.getElementById('countPhysics').textContent =
      (allQuestions.physics?.length || 0) + ' questions';
    document.getElementById('countMathematics').textContent =
      (allQuestions.mathematics?.length || 0) + ' questions';
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

// Start quiz
function startQuiz() {
  const selectedSubjects = Array.from(
    document.querySelectorAll('input[name="subject"]:checked')
  ).map(cb => cb.value);

  if (selectedSubjects.length === 0) {
    alert('Please select at least one subject.');
    return;
  }

  // Gather questions from selected subjects
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

  // Shuffle if checked
  const shouldShuffle = document.getElementById('shuffleQuestions').checked;
  if (shouldShuffle) {
    pool = shuffle(pool);
  }

  // Limit count
  const countSelect = document.getElementById('questionCount').value;
  const limit = parseInt(countSelect);
  if (limit > 0 && limit < pool.length) {
    pool = pool.slice(0, limit);
  }

  // Initialize quiz state
  quizQuestions = pool;
  currentIndex = 0;
  answers = {};
  score = { correct: 0, wrong: 0 };

  // Update UI
  document.getElementById('totalQuestions').textContent = quizQuestions.length;
  document.getElementById('scoreCorrect').textContent = '0';
  document.getElementById('scoreWrong').textContent = '0';

  // Show quiz screen
  showScreen('quizScreen');
  renderQuestion();
}

// Render current question
function renderQuestion() {
  const q = quizQuestions[currentIndex];
  if (!q) return;

  // Update topbar
  document.getElementById('questionIndex').textContent = currentIndex + 1;
  document.getElementById('currentSubject').textContent =
    q.subject.charAt(0).toUpperCase() + q.subject.slice(1);

  // Progress bar
  const pct = ((currentIndex + 1) / quizQuestions.length) * 100;
  document.getElementById('progressFill').style.width = pct + '%';

  // Topic & question
  document.getElementById('questionTopic').textContent = q.topic;
  document.getElementById('questionText').textContent = q.question;

  // Options
  const container = document.getElementById('optionsContainer');
  const letters = ['A', 'B', 'C', 'D'];
  container.innerHTML = '';

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-option';
    div.dataset.index = i;
    div.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;

    // If already answered this question, restore state
    if (answers[currentIndex] !== undefined) {
      div.classList.add('disabled');
      if (i === q.correct) {
        div.classList.add('correct');
      }
      if (i === answers[currentIndex] && i !== q.correct) {
        div.classList.add('wrong');
      }
    } else {
      div.addEventListener('click', () => selectAnswer(i));
    }

    container.appendChild(div);
  });

  // Explanation
  const expBox = document.getElementById('explanationBox');
  if (answers[currentIndex] !== undefined) {
    showExplanation(q, answers[currentIndex] === q.correct);
  } else {
    expBox.style.display = 'none';
  }

  // Navigation buttons
  document.getElementById('prevBtn').disabled = currentIndex === 0;

  const isAnswered = answers[currentIndex] !== undefined;
  const isLast = currentIndex === quizQuestions.length - 1;

  document.getElementById('nextBtn').style.display =
    (isAnswered && !isLast) ? 'inline-flex' : 'none';
  document.getElementById('finishBtn').style.display =
    (isAnswered && isLast) ? 'inline-flex' : 'none';
}

// Select an answer
function selectAnswer(index) {
  if (answers[currentIndex] !== undefined) return; // already answered

  const q = quizQuestions[currentIndex];
  answers[currentIndex] = index;
  const isCorrect = index === q.correct;

  if (isCorrect) {
    score.correct++;
  } else {
    score.wrong++;
  }

  // Update score display
  document.getElementById('scoreCorrect').textContent = score.correct;
  document.getElementById('scoreWrong').textContent = score.wrong;

  // Update option styles
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(opt => {
    const i = parseInt(opt.dataset.index);
    opt.classList.add('disabled');
    opt.replaceWith(opt.cloneNode(true)); // Remove event listeners

    const newOpt = document.querySelectorAll('.quiz-option')[i];
    if (i === q.correct) {
      newOpt.classList.add('correct');
    }
    if (i === index && !isCorrect) {
      newOpt.classList.add('wrong');
    }
    newOpt.classList.add('disabled');
  });

  // Show explanation
  showExplanation(q, isCorrect);

  // Show next/finish button
  const isLast = currentIndex === quizQuestions.length - 1;
  document.getElementById('nextBtn').style.display = isLast ? 'none' : 'inline-flex';
  document.getElementById('finishBtn').style.display = isLast ? 'inline-flex' : 'none';
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
  content.innerHTML = q.explanation;

  box.style.display = 'block';

  // Scroll explanation into view
  setTimeout(() => {
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

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
  showResults();
}

// Show results
function showResults() {
  showScreen('resultsScreen');

  const total = quizQuestions.length;
  const pct = total > 0 ? Math.round((score.correct / total) * 100) : 0;

  // Animate score circle
  document.getElementById('scorePercent').textContent = pct + '%';
  const circle = document.getElementById('scoreCircle');
  const circumference = 339.292;
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 100);

  // Update color based on score
  if (pct >= 70) {
    circle.style.stroke = 'var(--green)';
  } else if (pct >= 50) {
    circle.style.stroke = 'var(--gold)';
  } else {
    circle.style.stroke = 'var(--red)';
  }

  // Stats
  document.getElementById('finalCorrect').textContent = score.correct;
  document.getElementById('finalWrong').textContent = score.wrong;
  document.getElementById('finalTotal').textContent = total;

  // Subject breakdown
  const breakdown = {};
  quizQuestions.forEach((q, i) => {
    if (!breakdown[q.subject]) {
      breakdown[q.subject] = { correct: 0, total: 0 };
    }
    breakdown[q.subject].total++;
    if (answers[i] === q.correct) {
      breakdown[q.subject].correct++;
    }
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
    const isCorrect = userAnswer === q.correct;

    let answersHtml = '';
    q.options.forEach((opt, j) => {
      let cls = 'neutral';
      let prefix = letters[j] + '.';
      if (j === q.correct) cls = 'correct-answer';
      if (j === userAnswer && !isCorrect) cls = 'wrong-answer';
      answersHtml += `<div class="review-answer ${cls}">${prefix} ${opt}</div>`;
    });

    container.innerHTML += `
      <div class="review-item">
        <div class="review-item-header">
          <span class="review-number ${isCorrect ? 'correct' : 'wrong'}">${i + 1}</span>
          <span class="review-topic">${q.subject} · ${q.topic}</span>
        </div>
        <div class="review-question">${q.question}</div>
        <div class="review-answers">${answersHtml}</div>
        <div class="review-explanation">${q.explanation}</div>
      </div>
    `;
  });
}

// Screen switching
function showScreen(id) {
  ['startScreen', 'quizScreen', 'resultsScreen', 'reviewScreen'].forEach(s => {
    document.getElementById(s).style.display = s === id ? 'block' : 'none';
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();

  document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
  document.getElementById('nextBtn').addEventListener('click', goNext);
  document.getElementById('prevBtn').addEventListener('click', goPrev);
  document.getElementById('finishBtn').addEventListener('click', finishQuiz);
  document.getElementById('retryBtn').addEventListener('click', () => {
    // Reset score circle
    document.getElementById('scoreCircle').style.strokeDashoffset = 339.292;
    showScreen('startScreen');
  });
  document.getElementById('reviewBtn').addEventListener('click', showReview);
  document.getElementById('backToResultsBtn').addEventListener('click', () => showScreen('resultsScreen'));

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('quizScreen').style.display === 'none') return;

    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (answers[currentIndex] !== undefined) {
        if (currentIndex < quizQuestions.length - 1) goNext();
        else finishQuiz();
      }
    }
    if (e.key === 'ArrowLeft') goPrev();

    // Number keys 1-4 to select answers
    const num = parseInt(e.key);
    if (num >= 1 && num <= 4 && answers[currentIndex] === undefined) {
      selectAnswer(num - 1);
    }
  });
});
