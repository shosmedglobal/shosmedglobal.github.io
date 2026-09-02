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

  // Keep in sync with firestore.rules → isAdmin() and qbank.js → ADMIN_EMAILS.
  // Client-side only, for showing the moderation controls; the actual delete
  // is authorised server-side by the isAdmin() rule.
  const ADMIN_EMAILS = ['eli@shosmed.com', 'contact@shosmed.com', 'privacy@shosmed.com', 'elizolotov@gmail.com'];

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
  let lastAuthUid = undefined;
  auth.onAuthStateChanged((user) => {
    const changed = lastAuthUid !== (user ? user.uid : null);
    lastAuthUid = user ? user.uid : null;
    currentUser = user;
    if (user) {
      btnAskQuestion.style.display = 'inline-flex';
    } else {
      btnAskQuestion.style.display = 'none';
    }
    // The first list render happens before Firebase resolves auth, so the
    // per-user state (own votes, admin moderation controls) is missing.
    // Re-render the list once the identity is actually known.
    if (changed && !currentPostId) {
      loadPosts(false);
    }
    // Refresh answer area if viewing a thread
    if (currentPostId) {
      if (changed) openThread(currentPostId);
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

  let reloadQueued = false;

  async function loadPosts(append) {
    // A reload requested while one is already in flight (e.g. auth resolving
    // mid-load) must not be silently dropped — queue it instead.
    if (isLoading) {
      if (!append) reloadQueued = true;
      return;
    }
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

    if (reloadQueued) {
      reloadQueued = false;
      loadPosts(false);
    }
  }

  // ===== Create Post Card =====
  // Built with DOM nodes rather than an innerHTML template. Every value that
  // comes back from Firestore is attacker-controlled (any signed-in client can
  // write arbitrary fields via the SDK), so none of it is ever concatenated
  // into markup — text goes through textContent and ids go through dataset.
  function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'forum-post-card';
    card.dataset.postId = post.id;

    const date = post.createdAt ? post.createdAt.toDate() : new Date();
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const answerCount = toCount(post.answerCount);

    const votes = el('div', 'post-votes');
    const upvoteBtn = el('button', 'vote-btn upvote-btn');
    upvoteBtn.type = 'button';
    upvoteBtn.title = 'Upvote';
    upvoteBtn.textContent = '▲';
    const voteCountEl = el('span', 'vote-count', toCount(post.voteCount));
    votes.append(upvoteBtn, voteCountEl);

    const meta = el('div', 'post-meta');
    meta.append(
      el('span', 'post-category', categoryLabelFor(post.category)),
      el('span', 'post-author', asText(post.authorName, 'Anonymous')),
      el('span', 'post-date', dateStr)
    );

    const content = el('div', 'post-content');
    content.append(
      el('div', 'post-title', asText(post.title, '(untitled)')),
      el('div', 'post-excerpt', asText(post.body, '')),
      meta
    );

    const answerBox = el('div', 'post-answer-count' + (post.acceptedAnswerId ? ' has-accepted' : ''));
    answerBox.append(
      el('span', 'count-num', answerCount),
      el('span', 'count-label', answerCount === 1 ? 'answer' : 'answers')
    );
    const stats = el('div', 'post-stats');
    stats.appendChild(answerBox);

    card.append(votes, content, stats);

    // Admin-only moderation control, so spam/abuse posts can be removed from
    // the live site without opening the Firebase console.
    if (isAdminUser()) {
      meta.appendChild(buildDeleteButton('Delete this question and all of its answers?', () => deletePost(post.id)));
    }

    // Click to open thread (but not on vote/moderation buttons)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.vote-btn') || e.target.closest('.mod-delete-btn')) return;
      openThread(post.id);
    });

    // Upvote on card
    upvoteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePostVote(post.id, upvoteBtn, voteCountEl);
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

    const header = el('div', 'thread-question-header');
    header.append(
      el('h2', null, asText(post.title, '(untitled)')),
      el('span', 'post-category', categoryLabelFor(post.category))
    );

    const upvoteBtn = el('button', 'thread-vote-btn');
    upvoteBtn.type = 'button';
    upvoteBtn.id = 'thread-upvote-btn';
    upvoteBtn.title = 'Upvote';
    upvoteBtn.textContent = '▲';
    const voteCount = el('span', 'thread-vote-count', toCount(post.voteCount));
    voteCount.id = 'thread-vote-count';
    const voteBox = el('div', 'thread-vote-box');
    voteBox.append(upvoteBtn, voteCount);

    const meta = el('div', 'thread-question-meta');
    meta.append(
      voteBox,
      el('span', 'post-author', asText(post.authorName, 'Anonymous')),
      el('span', 'post-date', dateStr)
    );

    if (isAdminUser()) {
      meta.appendChild(buildDeleteButton('Delete this question and all of its answers?', () => deletePost(post.id)));
    }

    container.replaceChildren(header, el('div', 'thread-question-body', asText(post.body, '')), meta);

    // Thread upvote
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

    let acceptBtn = null;
    if (isAccepted) {
      const badge = el('span', 'accepted-badge');
      // Static markup only — no untrusted interpolation.
      badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Accepted Answer';
      const row = document.createElement('div');
      row.appendChild(badge);
      card.appendChild(row);
    } else if (isPostAuthor) {
      acceptBtn = el('button', 'accept-btn', '✓ Accept Answer');
      acceptBtn.type = 'button';
      acceptBtn.dataset.answerId = answer.id;
      const row = document.createElement('div');
      row.appendChild(acceptBtn);
      card.appendChild(row);
    }

    const voteBtn = el('button', 'thread-vote-btn answer-vote-btn');
    voteBtn.type = 'button';
    voteBtn.title = 'Upvote';
    voteBtn.textContent = '▲';
    voteBtn.dataset.answerId = answer.id;
    const voteCount = el('span', 'thread-vote-count answer-vote-count', toCount(answer.voteCount));
    const voteBox = el('div', 'thread-vote-box');
    voteBox.append(voteBtn, voteCount);

    const meta = el('div', 'answer-meta');
    meta.append(
      voteBox,
      el('span', 'post-author', asText(answer.authorName, 'Anonymous')),
      el('span', 'post-date', dateStr)
    );

    if (isAdminUser()) {
      meta.appendChild(buildDeleteButton('Delete this answer?', () => deleteAnswer(post.id, answer.id)));
    }

    card.append(el('div', 'answer-body', asText(answer.body, '')), meta);

    // Answer vote
    voteBtn.addEventListener('click', () => {
      toggleAnswerVote(post.id, answer.id, voteBtn, voteCount);
    });
    if (currentUser) {
      checkAnswerVote(answer.id, voteBtn);
    }

    // Accept button
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
        // Dual-write authorId (legacy field read by community.js) and
        // authorUid (field checked by firestore.rules for owner writes).
        // A prior mismatch caused every author-side update/delete to be
        // silently denied.
        authorId: currentUser.uid,
        authorUid: currentUser.uid,
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
        authorUid: currentUser.uid,
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

  // ===== Moderation (admin only) =====
  function isAdminUser() {
    return !!(currentUser && ADMIN_EMAILS.includes((currentUser.email || '').toLowerCase()));
  }

  function buildDeleteButton(confirmMessage, action) {
    const btn = el('button', 'mod-delete-btn', 'Delete');
    btn.type = 'button';
    btn.title = 'Delete (admin)';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!confirm(confirmMessage)) return;
      btn.disabled = true;
      action();
    });
    return btn;
  }

  async function deletePost(postId) {
    try {
      const postRef = db.collection('forum_posts').doc(postId);
      // Answers are a subcollection: deleting the parent doc leaves them
      // orphaned, so remove them first.
      const answers = await postRef.collection('answers').get();
      await Promise.all(answers.docs.map(d => d.ref.delete()));
      await postRef.delete();

      if (currentPostId === postId) closeThread();
      loadPosts(false);
    } catch (error) {
      console.error('Delete post error:', error);
      alert('Could not delete this post.');
    }
  }

  async function deleteAnswer(postId, answerId) {
    try {
      await db.collection('forum_posts').doc(postId).collection('answers').doc(answerId).delete();
      await db.collection('forum_posts').doc(postId).update({
        answerCount: firebase.firestore.FieldValue.increment(-1)
      });
      openThread(postId);
    } catch (error) {
      console.error('Delete answer error:', error);
      alert('Could not delete this answer.');
    }
  }

  // ===== Utility =====
  // Element builder. `text` is always applied via textContent, so any HTML in
  // stored forum content is rendered as literal characters, never parsed.
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  // Coerce a stored value to a display string. Firestore fields are not
  // type-checked by the SDK, so a hostile client can store an object, array,
  // or number where a string is expected.
  function asText(value, fallback) {
    if (typeof value === 'string' && value.length) return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    return fallback;
  }

  // Vote/answer counts are rendered as numbers, never as raw stored values.
  function toCount(value) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }

  // Only render a label from the known category map. Falls back to "General"
  // for anything unrecognised instead of echoing the stored string back into
  // the page. hasOwnProperty guards against prototype keys ("constructor").
  function categoryLabelFor(category) {
    return Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, category)
      ? CATEGORY_LABELS[category]
      : 'General';
  }

  // ===== Initialize =====
  loadPosts(false);

})();
