// ─── State ───────────────────────────────────────────────────────────────────
const state = {
  current: 0,
  answers: {},
  revealed: {},
  mode: 'quiz', // 'quiz' | 'review'
  shuffled: [],
  startTime: null,
  endTime: null
};

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  state.shuffled = [...questions].sort(() => Math.random() - 0.5);
  state.current = 0;
  state.answers = {};
  state.revealed = {};
  state.mode = 'quiz';
  state.startTime = Date.now();
  state.endTime = null;
  renderQuestion();
  updateProgress();
}

// ─── Render question ──────────────────────────────────────────────────────────
function renderQuestion() {
  const q = state.shuffled[state.current];
  const total = state.shuffled.length;
  const answered = Object.keys(state.answers).length;

  document.getElementById('topic-badge').textContent = q.topic;
  document.getElementById('question-number').textContent = `Questão ${state.current + 1} de ${total}`;
  document.getElementById('question-text').textContent = q.question;

  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';

  const isRevealed = state.revealed[state.current];
  const userAnswer = state.answers[state.current];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('data-index', i);

    const letter = String.fromCharCode(65 + i); // A, B, C, D
    btn.innerHTML = `<span class="option-letter">${letter}</span><span class="option-text">${opt}</span>`;

    if (isRevealed) {
      if (i === q.correct) btn.classList.add('correct');
      else if (i === userAnswer && userAnswer !== q.correct) btn.classList.add('wrong');
      btn.disabled = true;
    } else if (userAnswer !== undefined) {
      if (i === userAnswer) btn.classList.add('selected');
      btn.disabled = true;
    } else {
      btn.addEventListener('click', () => selectAnswer(i));
    }

    optionsEl.appendChild(btn);
  });

  // Explanation
  const expEl = document.getElementById('explanation');
  if (isRevealed) {
    expEl.innerHTML = `<div class="explanation-inner"><strong>📖 Explicação:</strong> ${q.explanation}</div>`;
    expEl.style.display = 'block';
  } else {
    expEl.style.display = 'none';
  }

  // Navigation buttons
  document.getElementById('btn-prev').disabled = state.current === 0;

  const nextBtn = document.getElementById('btn-next');
  const revealBtn = document.getElementById('btn-reveal');
  const finishBtn = document.getElementById('btn-finish');

  const isLast = state.current === total - 1;
  const allAnswered = Object.keys(state.answers).length === total;

  nextBtn.style.display = (!isLast) ? 'inline-flex' : 'none';
  finishBtn.style.display = isLast && allAnswered ? 'inline-flex' : 'none';
  revealBtn.style.display = (state.answers[state.current] !== undefined && !isRevealed) ? 'inline-flex' : 'none';
}

function selectAnswer(index) {
  if (state.answers[state.current] !== undefined) return;
  state.answers[state.current] = index;
  updateProgress();
  renderQuestion();
  // Auto show reveal button
  document.getElementById('btn-reveal').style.display = 'inline-flex';
}

function revealAnswer() {
  state.revealed[state.current] = true;
  renderQuestion();
}

function navigate(dir) {
  const next = state.current + dir;
  if (next >= 0 && next < state.shuffled.length) {
    state.current = next;
    renderQuestion();
  }
}

function updateProgress() {
  const total = state.shuffled.length;
  const answered = Object.keys(state.answers).length;
  const pct = Math.round((answered / total) * 100);

  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-text').textContent = `${answered}/${total} respondidas`;
}

// ─── Results ──────────────────────────────────────────────────────────────────
function showResults() {
  state.endTime = Date.now();
  const elapsed = Math.round((state.endTime - state.startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  const total = state.shuffled.length;
  let correct = 0;
  const byTopic = {};

  state.shuffled.forEach((q, i) => {
    const topic = q.topic;
    if (!byTopic[topic]) byTopic[topic] = { correct: 0, total: 0 };
    byTopic[topic].total++;
    if (state.answers[i] === q.correct) {
      correct++;
      byTopic[topic].correct++;
    }
  });

  const pct = Math.round((correct / total) * 100);
  const passed = pct >= 72; // AWS passing score

  document.getElementById('quiz-screen').style.display = 'none';
  const res = document.getElementById('results-screen');
  res.style.display = 'block';

  document.getElementById('score-pct').textContent = pct + '%';
  document.getElementById('score-pct').className = passed ? 'score-pct pass' : 'score-pct fail';
  document.getElementById('score-label').textContent = passed ? '✅ APROVADO' : '❌ REPROVADO';
  document.getElementById('score-detail').textContent = `${correct} de ${total} corretas`;
  document.getElementById('score-time').textContent = `⏱ Tempo: ${mins}min ${secs}s`;
  document.getElementById('pass-score').textContent = `Nota mínima de aprovação: 72%`;

  // Topic breakdown
  const topicEl = document.getElementById('topic-breakdown');
  topicEl.innerHTML = '';
  Object.entries(byTopic).sort((a, b) => a[0].localeCompare(b[0])).forEach(([topic, data]) => {
    const topicPct = Math.round((data.correct / data.total) * 100);
    const div = document.createElement('div');
    div.className = 'topic-row';
    div.innerHTML = `
      <span class="topic-name">${topic}</span>
      <span class="topic-score">${data.correct}/${data.total}</span>
      <div class="topic-bar-wrap"><div class="topic-bar" style="width:${topicPct}%;background:${topicPct >= 72 ? 'var(--green)' : 'var(--red)'}"></div></div>
      <span class="topic-pct">${topicPct}%</span>
    `;
    topicEl.appendChild(div);
  });
}

function restartQuiz() {
  document.getElementById('results-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  init();
}

// ─── Event listeners ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-prev').addEventListener('click', () => navigate(-1));
  document.getElementById('btn-next').addEventListener('click', () => navigate(1));
  document.getElementById('btn-reveal').addEventListener('click', revealAnswer);
  document.getElementById('btn-finish').addEventListener('click', showResults);
  document.getElementById('btn-restart').addEventListener('click', restartQuiz);
  init();
});
