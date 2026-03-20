// ===== Community Forum Logic =====
// Uses Firebase Auth and Firestore from auth.js (already initialized)

(function () {
  'use strict';

  // ===== Constants =====
  const POSTS_PER_PAGE = 15;
  const CATEGORY_LABELS = {
    'entrance-exams': 'Entrance Exams',
    'med-school-life': 'Med School Life',
    'usmle-boards': 'USMLE & Boards',
    'residency-match': 'Residency Match',
    'general': 'General'
  };

  // ===== State =====
  let currentUser = null;
  let lastDoc = null;
  let currentCategory = 'all';
  let currentSort = 'newest';
  let isLoading = false;
  let currentPostId = null;

  // ===== DOM References =====
  const forumPosts = document.getElementById('forum-posts');
  const forumEmpty = document.getElementById('forum-empty');
  const loadMoreContainer = document.getElementById('load-more-container');
  const btnLoadMore = document.getElementById('btn-load-more');
  const btnAskQuestion = document.getElementById('btn-ask-question');
  const askModal = document.getElementById('ask-modal');
  const btnCancelQuestion = document.getElementById('btn-cancel-question');
  const btnSubmitQuestion = document.getElementById('btn-submit-question');
  const forumListView = document.getElementById('forum-list-view');
  const threadView = document.getElementById('thread-view');
  const btnBackToList = document.getElementById('btn-back-to-list');
  const categoryFilter = document.getElementById('forum-category-filter');
  const sortFilter = document.getElementById('forum-sort');

  // ===== Tab Switching =====
  document.querySelectorAll('.community-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.community-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
  });

  // ===== Auth State =====
  auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user) {
      btnAskQuestion.style.display = 'inline-flex';
    } else {
      btnAskQuestion.style.display = 'none';
    }
    // Refresh answer area if viewing a thread
    if (currentPostId) {
      renderPostAnswerArea();
    }
  });

  // ===== Load Posts =====
  function buildQuery(startAfter) {
    let ref = db.collection('forum_posts');

    if (currentCategory !== 'all') {
      ref = ref.where('category', '==', currentCategory);
    }

    if (currentSort === 'newest') {
      ref = ref.orderBy('createdAt', 'desc');
    } else if (currentSort === 'most-upvoted') {
      ref = ref.orderBy('voteCount', 'desc');
    } else if (currentSort === 'unanswered') {
      ref = ref.where('answerCount', '==', 0).orderBy('createdAt', 'desc');
    }

    if (startAfter) {
      ref = ref.startAfter(startAfter);
    }

    return ref.limit(POSTS_PER_PAGE);
  }

  async function loadPosts(append) {
    if (isLoading) return;
    isLoading = true;

    try {
      if (!append) {
        forumPosts.innerHTML = '';
        lastDoc = null;
      }

      const query = buildQuery(lastDoc);
      const snapshot = await query.get();

      if (snapshot.empty && !append) {
        forumEmpty.style.display = 'block';
        loadMoreContainer.style.display = 'none';
      } else {
        forumEmpty.style.display = 'none';
      }

      snapshot.forEach(doc => {
        const post = doc.data();
        post.id = doc.id;
        forumPosts.appendChild(createPostCard(post));
        lastDoc = doc;
      });

      // Show/hide load more
      if (snapshot.size === POSTS_PER_PAGE) {
        loadMoreContainer.style.display = 'block';
      } else {
        loadMoreContainer.style.display = 'none';
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }

    isLoading = false;
  }

  // ===== Create Post Card =====
  function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'forum-post-card';
    card.dataset.postId = post.id;

    const date = post.createdAt ? post.createdAt.toDate() : new Date();
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const categoryLabel = CATEGORY_LABELS[post.category] || post.category;
    const hasAccepted = post.acceptedAnswerId ? ' has-accepted' : '';

    card.innerHTML = `
      <div class="post-votes">
        <button class="vote-btn upvote-btn" data-post-id="${post.id}" title="Upvote">&#9650;</button>
        <span class="vote-count">${post.voteCount || 0}</span>
      </div>
      <div class="post-content">
        <div class="post-title">${escapeHtml(post.title)}</div>
        <div class="post-excerpt">${escapeHtml(post.body || '')}</div>
        <div class="post-meta">
          <span class="post-category">${categoryLabel}</span>
          <span class="post-author">${escapeHtml(post.authorName || 'Anonymous')}</span>
          <span class="post-date">${dateStr}</span>
        </div>
      </div>
      <div class="post-stats">
        <div class="post-answer-count${hasAccepted}">
          <span class="count-num">${post.answerCount || 0}</span>
          <span class="count-label">${(post.answerCount === 1) ? 'answer' : 'answers'}</span>
        </div>
      </div>
    `;

    // Click to open thread (but not on vote button)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.vote-btn')) return;
      openThread(post.id);
    });

    // Upvote on card
    const upvoteBtn = card.querySelector('.upvote-btn');
    upvoteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePostVote(post.id, upvoteBtn, card.querySelector('.vote-count'));
    });

    // Check if user already voted
    if (currentUser) {
      checkPostVote(post.id, upvoteBtn);
    }

    return card;
  }

  // ===== Voting =====
  async function togglePostVote(postId, btn, countEl) {
    if (!currentUser) {
      alert('Please log in to vote.');
      return;
    }

    const voteRef = db.collection('post_votes').doc(`${currentUser.uid}_${postId}`);
    const postRef = db.collection('forum_posts').doc(postId);

    try {
      const voteDoc = await voteRef.get();
      if (voteDoc.exists) {
        // Remove vote
        await voteRef.delete();
        await postRef.update({ voteCount: firebase.firestore.FieldValue.increment(-1) });
        btn.classList.remove('voted');
        countEl.textContent = parseInt(countEl.textContent) - 1;
      } else {
        // Add vote
        await voteRef.set({ userId: currentUser.uid, postId: postId, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        await postRef.update({ voteCount: firebase.firestore.FieldValue.increment(1) });
        btn.classList.add('voted');
        countEl.textContent = parseInt(countEl.textContent) + 1;
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  }

  async function checkPostVote(postId, btn) {
    if (!currentUser) return;
    try {
      const voteDoc = await db.collection('post_votes').doc(`${currentUser.uid}_${postId}`).get();
      if (voteDoc.exists) {
        btn.classList.add('voted');
      }
    } catch (e) { /* ignore */ }
  }

  async function toggleAnswerVote(postId, answerId, btn, countEl) {
    if (!currentUser) {
      alert('Please log in to vote.');
      return;
    }

    const voteRef = db.collection('answer_votes').doc(`${currentUser.uid}_${answerId}`);
    const answerRef = db.collection('forum_posts').doc(postId).collection('answers').doc(answerId);

    try {
      const voteDoc = await voteRef.get();
      if (voteDoc.exists) {
        await voteRef.delete();
        await answerRef.update({ voteCount: firebase.firestore.FieldValue.increment(-1) });
        btn.classList.remove('voted');
        countEl.textContent = parseInt(countEl.textContent) - 1;
      } else {
        await voteRef.set({ userId: currentUser.uid, answerId: answerId, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
        await answerRef.update({ voteCount: firebase.firestore.FieldValue.increment(1) });
        btn.classList.add('voted');
        countEl.textContent = parseInt(countEl.textContent) + 1;
      }
    } catch (error) {
      console.error('Answer vote error:', error);
    }
  }

  // ===== Open Thread =====
  async function openThread(postId) {
    currentPostId = postId;
    forumListView.style.display = 'none';
    threadView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const postDoc = await db.collection('forum_posts').doc(postId).get();
      if (!postDoc.exists) {
        alert('Post not found.');
        closeThread();
        return;
      }

      const post = postDoc.data();
      post.id = postDoc.id;
      renderThreadQuestion(post);
      await loadAnswers(postId, post);
      renderPostAnswerArea();
    } catch (error) {
      console.error('Error opening thread:', error);
    }
  }

  function renderThreadQuestion(post) {
    const container = document.getElementById('thread-question-content');
    const date = post.createdAt ? post.createdAt.toDate() : new Date();
    const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const categoryLabel = CATEGORY_LABELS[post.category] || post.category;

    container.innerHTML = `
      <div class="thread-question-header">
        <h2>${escapeHtml(post.title)}</h2>
        <span class="post-category">${categoryLabel}</span>
      </div>
      <div class="thread-question-body">${escapeHtml(post.body || '')}</div>
      <div class="thread-question-meta">
        <div class="thread-vote-box">
          <button class="thread-vote-btn" id="thread-upvote-btn" title="Upvote">&#9650;</button>
          <span class="thread-vote-count" id="thread-vote-count">${post.voteCount || 0}</span>
        </div>
        <span class="post-author">${escapeHtml(post.authorName || 'Anonymous')}</span>
        <span class="post-date">${dateStr}</span>
      </div>
    `;

    // Thread upvote
    const upvoteBtn = document.getElementById('thread-upvote-btn');
    const voteCount = document.getElementById('thread-vote-count');
    upvoteBtn.addEventListener('click', () => {
      togglePostVote(post.id, upvoteBtn, voteCount);
    });
    if (currentUser) {
      checkPostVote(post.id, upvoteBtn);
    }
  }

  async function loadAnswers(postId, post) {
    const answersList = document.getElementById('answers-list');
    const countLabel = document.getElementById('answers-count-label');

    try {
      const snapshot = await db.collection('forum_posts').doc(postId)
        .collection('answers')
        .orderBy('voteCount', 'desc')
        .orderBy('createdAt', 'asc')
        .get();

      const answers = [];
      snapshot.forEach(doc => {
        const a = doc.data();
        a.id = doc.id;
        answers.push(a);
      });

      countLabel.textContent = `${answers.length} ${answers.length === 1 ? 'Answer' : 'Answers'}`;

      // Sort accepted answer to top
      answers.sort((a, b) => {
        if (a.id === post.acceptedAnswerId) return -1;
        if (b.id === post.acceptedAnswerId) return 1;
        return 0;
      });

      answersList.innerHTML = '';
      answers.forEach(answer => {
        answersList.appendChild(createAnswerCard(answer, post));
      });
    } catch (error) {
      console.error('Error loading answers:', error);
    }
  }

  function createAnswerCard(answer, post) {
    const card = document.createElement('div');
    const isAccepted = post.acceptedAnswerId === answer.id;
    card.className = 'answer-card' + (isAccepted ? ' accepted' : '');

    const date = answer.createdAt ? answer.createdAt.toDate() : new Date();
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const isPostAuthor = currentUser && currentUser.uid === post.authorId;

    let acceptHtml = '';
    if (isAccepted) {
      acceptHtml = `<span class="accepted-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Accepted Answer</span>`;
    } else if (isPostAuthor) {
      acceptHtml = `<button class="accept-btn" data-answer-id="${answer.id}">&#10003; Accept Answer</button>`;
    }

    card.innerHTML = `
      ${acceptHtml ? '<div>' + acceptHtml + '</div>' : ''}
      <div class="answer-body">${escapeHtml(answer.body)}</div>
      <div class="answer-meta">
        <div class="thread-vote-box">
          <button class="thread-vote-btn answer-vote-btn" data-answer-id="${answer.id}" title="Upvote">&#9650;</button>
          <span class="thread-vote-count answer-vote-count">${answer.voteCount || 0}</span>
        </div>
        <span class="post-author">${escapeHtml(answer.authorName || 'Anonymous')}</span>
        <span class="post-date">${dateStr}</span>
      </div>
    `;

    // Answer vote
    const voteBtn = card.querySelector('.answer-vote-btn');
    const voteCount = card.querySelector('.answer-vote-count');
    voteBtn.addEventListener('click', () => {
      toggleAnswerVote(post.id, answer.id, voteBtn, voteCount);
    });
    if (currentUser) {
      checkAnswerVote(answer.id, voteBtn);
    }

    // Accept button
    const acceptBtn = card.querySelector('.accept-btn');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => acceptAnswer(post.id, answer.id));
    }

    return card;
  }

  async function checkAnswerVote(answerId, btn) {
    if (!currentUser) return;
    try {
      const voteDoc = await db.collection('answer_votes').doc(`${currentUser.uid}_${answerId}`).get();
      if (voteDoc.exists) {
        btn.classList.add('voted');
      }
    } catch (e) { /* ignore */ }
  }

  async function acceptAnswer(postId, answerId) {
    try {
      await db.collection('forum_posts').doc(postId).update({ acceptedAnswerId: answerId });
      // Reload thread
      openThread(postId);
    } catch (error) {
      console.error('Accept answer error:', error);
    }
  }

  function renderPostAnswerArea() {
    const area = document.getElementById('post-answer-area');
    if (!currentPostId) return;

    if (currentUser) {
      area.innerHTML = `
        <div class="post-answer-box">
          <h4>Your Answer</h4>
          <div class="form-group">
            <textarea class="form-textarea" id="answer-body" placeholder="Write your answer..." maxlength="5000"></textarea>
          </div>
          <button class="btn-submit" id="btn-submit-answer">Post Answer</button>
        </div>
      `;
      document.getElementById('btn-submit-answer').addEventListener('click', submitAnswer);
    } else {
      area.innerHTML = `
        <div class="login-prompt">
          <p><a href="login.html">Log in</a> or <a href="signup.html">sign up</a> to post an answer.</p>
        </div>
      `;
    }
  }

  async function submitAnswer() {
    const body = document.getElementById('answer-body').value.trim();
    if (!body) return;
    if (!currentUser) return;

    const btn = document.getElementById('btn-submit-answer');
    btn.disabled = true;
    btn.textContent = 'Posting...';

    try {
      const answerRef = db.collection('forum_posts').doc(currentPostId).collection('answers').doc();
      await answerRef.set({
        body: body.substring(0, 5000),
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous',
        voteCount: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Increment answer count on post
      await db.collection('forum_posts').doc(currentPostId).update({
        answerCount: firebase.firestore.FieldValue.increment(1)
      });

      // Reload thread
      openThread(currentPostId);
    } catch (error) {
      console.error('Submit answer error:', error);
      alert('Error posting answer. Please try again.');
      btn.disabled = false;
      btn.textContent = 'Post Answer';
    }
  }

  // ===== Close Thread =====
  function closeThread() {
    currentPostId = null;
    threadView.classList.remove('active');
    forumListView.style.display = 'block';
  }

  // ===== Ask Question =====
  function openAskModal() {
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }
    askModal.classList.add('active');
    document.getElementById('question-title').value = '';
    document.getElementById('question-body').value = '';
    document.getElementById('question-title').focus();
  }

  function closeAskModal() {
    askModal.classList.remove('active');
  }

  async function submitQuestion() {
    const title = document.getElementById('question-title').value.trim();
    const body = document.getElementById('question-body').value.trim();
    const category = document.getElementById('question-category').value;

    if (!title) {
      alert('Please enter a title for your question.');
      return;
    }
    if (!currentUser) return;

    btnSubmitQuestion.disabled = true;
    btnSubmitQuestion.textContent = 'Posting...';

    try {
      await db.collection('forum_posts').add({
        title: title.substring(0, 200),
        body: body.substring(0, 5000),
        category: category,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous',
        voteCount: 0,
        answerCount: 0,
        acceptedAnswerId: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      closeAskModal();
      // Reload posts
      currentSort = 'newest';
      sortFilter.value = 'newest';
      loadPosts(false);
    } catch (error) {
      console.error('Submit question error:', error);
      alert('Error posting question. Please try again.');
    }

    btnSubmitQuestion.disabled = false;
    btnSubmitQuestion.textContent = 'Post Question';
  }

  // ===== Event Listeners =====
  btnAskQuestion.addEventListener('click', openAskModal);
  btnCancelQuestion.addEventListener('click', closeAskModal);
  btnSubmitQuestion.addEventListener('click', submitQuestion);
  btnBackToList.addEventListener('click', closeThread);
  btnLoadMore.addEventListener('click', () => loadPosts(true));

  // Close modal on overlay click
  askModal.addEventListener('click', (e) => {
    if (e.target === askModal) closeAskModal();
  });

  // Category filter
  categoryFilter.addEventListener('change', () => {
    currentCategory = categoryFilter.value;
    loadPosts(false);
  });

  // Sort filter
  sortFilter.addEventListener('change', () => {
    currentSort = sortFilter.value;
    loadPosts(false);
  });

  // ===== Utility =====
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ===== Initialize =====
  loadPosts(false);

})();
