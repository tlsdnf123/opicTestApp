function formatTimer(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function selectQuestion(index = state.currentQuestionIndex) {
  const preferred = questions.filter((question) => question.level === state.targetLevel);
  const pool = preferred.length ? preferred : questions;
  const question = pool[index % pool.length];
  state.currentQuestionIndex = questions.indexOf(question);
  saveState();
  elements.questionText.textContent = question.text;
  elements.topicChip.textContent = question.topic;
  elements.levelChip.textContent = question.level;
}

function nextQuestion() {
  const start = state.currentQuestionIndex + 1;
  const matchingIndexes = questions
    .map((question, index) => ({ question, index }))
    .filter((item) => item.question.level === state.targetLevel)
    .map((item) => item.index);
  const currentPosition = matchingIndexes.indexOf(state.currentQuestionIndex);
  state.currentQuestionIndex =
    matchingIndexes[(currentPosition + 1 + matchingIndexes.length) % matchingIndexes.length] ?? start % questions.length;
  selectQuestion(state.currentQuestionIndex);
}

function updateTimer(seconds = Number(elements.durationSelect.value)) {
  remainingSeconds = seconds;
  totalSeconds = seconds;
  elements.timerText.textContent = formatTimer(remainingSeconds);
  elements.timerRing.style.setProperty("--timer-progress", "0%");
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    remainingSeconds = Math.max(0, remainingSeconds - 1);
    const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    elements.timerText.textContent = formatTimer(remainingSeconds);
    elements.timerRing.style.setProperty("--timer-progress", `${progress}%`);
    if (remainingSeconds === 0) {
      stopRecording();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

async function toggleRecording() {
  if (mediaRecorder?.state === "recording") {
    stopRecording();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    setMessage("이 브라우저에서는 녹음이 제한돼요. HTTPS Safari나 Chrome 최신 버전에서 다시 시도해보세요.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks = [];
    recorderMimeType = pickRecorderMimeType();
    mediaRecorder = recorderMimeType ? new MediaRecorder(stream, { mimeType: recorderMimeType }) : new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType || recorderMimeType || "audio/mp4" });
      elements.audioPlayback.src = URL.createObjectURL(blob);
      elements.audioPlayback.hidden = false;
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.start();
    elements.recordButton.classList.add("recording");
    elements.recordButton.innerHTML = recordIcon() + "녹음 중지";
    updateTimer(Number(elements.durationSelect.value));
    startTimer();
    setMessage("좋아요. 완벽한 문장보다 멈추지 않고 이어가는 게 먼저예요.");
  } catch {
    setMessage("마이크 권한이 필요해요. 권한을 허용하거나 완료 버튼으로 수동 기록해도 괜찮아요.");
  }
}

function pickRecorderMimeType() {
  if (!window.MediaRecorder?.isTypeSupported) return "";
  return ["audio/mp4", "audio/aac", "audio/webm;codecs=opus", "audio/webm"].find((type) =>
    MediaRecorder.isTypeSupported(type),
  ) || "";
}

function stopRecording() {
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop();
  }
  stopTimer();
  elements.recordButton.classList.remove("recording");
  elements.recordButton.innerHTML = recordIcon() + "녹음 시작";
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    elements.speechButton.disabled = true;
    elements.speechButton.textContent = "받아쓰기 미지원";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    let transcript = "";
    for (let index = 0; index < event.results.length; index += 1) {
      transcript += event.results[index][0].transcript;
    }
    elements.answerNotes.value = transcript.trim();
    autoCheckFromNotes();
  };
  recognition.onerror = () => {
    stopSpeechRecognition();
    setMessage("받아쓰기가 멈췄어요. 메모에 직접 적어도 자동 분석은 계속 돼요.");
  };
  recognition.onend = () => {
    if (recognizing) {
      recognition.start();
    }
  };
}

function toggleSpeechRecognition() {
  if (!recognition) {
    setMessage("이 브라우저는 받아쓰기를 지원하지 않아요. 답변 메모에 직접 적으면 자동 체크돼요.");
    return;
  }

  if (recognizing) {
    stopSpeechRecognition();
    return;
  }

  recognizing = true;
  elements.speechButton.classList.add("listening");
  elements.speechButton.textContent = "받아쓰기 중지";
  try {
    recognition.start();
    setMessage("영어로 말하면 답변 메모에 자동으로 들어가고 체크도 갱신돼요.");
  } catch {
    stopSpeechRecognition();
    setMessage("받아쓰기를 시작하지 못했어요. HTTPS나 Chrome 브라우저에서 더 잘 작동해요.");
  }
}

function stopSpeechRecognition() {
  recognizing = false;
  elements.speechButton.classList.remove("listening");
  elements.speechButton.textContent = "받아쓰기";
  recognition?.stop();
}

function recordIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v4a4 4 0 0 0 4 4Z" /><path d="M19 11a7 7 0 0 1-14 0M12 18v3" /></svg>';
}

function checkedCount() {
  return $$(".checklist input:checked").length;
}

function checkedValues() {
  return $$(".checklist input:checked").map((input) => input.value);
}

function autoCheckFromNotes() {
  const text = elements.answerNotes.value.trim();
  const words = text.match(/[a-zA-Z']+/g) || [];
  const lower = ` ${text.toLowerCase()} `;
  const rules = {
    length: words.length >= 70 || /(\.|!|\?)[\s\S]*(\.|!|\?)/.test(text),
    structure:
      /\b(because|reason|so|that's why|in conclusion|overall|first|second|finally)\b/i.test(text) ||
      words.length >= 45,
    detail:
      /\b(yesterday|last|ago|when|where|with my|friend|family|school|work|home|restaurant|trip|movie|weekend)\b/i.test(
        text,
      ),
    tense:
      /\b(went|was|were|did|had|watched|visited|bought|started|used|will|going to|would|could)\b/i.test(text),
    connectors: /\b(because|so|also|actually|but|and then|however|for example|especially|that's why)\b/i.test(text),
    problem: /\b(problem|issue|trouble|late|lost|forgot|missed|fixed|solved|handled|decided|called|asked)\b/i.test(text),
  };

  $$(".checklist input").forEach((input) => {
    input.checked = Boolean(rules[input.value]);
  });
  updateScorePreview();
}

function estimateRating(score) {
  return ratingBands.reduce((current, band) => (score >= band.min ? band : current), ratingBands[0]);
}

function nextRating(score) {
  return ratingBands.find((band) => band.min > score) || ratingBands[ratingBands.length - 1];
}

function buildFeedbackItems(score) {
  const checked = checkedValues();
  const missing = rubricCriteria.filter((criterion) => !checked.includes(criterion.value));
  const next = nextRating(score);
  const needed = Math.max(0, next.min - score);

  if (!needed) {
    return ["현재 체크 기준에서는 최고 단계예요. 다음 답변은 더 자연스럽게 길게 말하는 연습을 해보세요."];
  }

  return missing.slice(0, Math.max(1, Math.min(needed + 1, 3))).map((criterion) => criterion.tip);
}

function firstMissingCriterion() {
  const checked = checkedValues();
  return rubricCriteria.find((criterion) => !checked.includes(criterion.value));
}

function updateCoachPrompt() {
  const missing = firstMissingCriterion();
  const key = missing?.value || "complete";
  const prompts = coachPrompts[key];
  elements.coachPrompt.textContent = prompts[coachPromptIndex % prompts.length];
}

function appendToNotes(text) {
  const current = elements.answerNotes.value.trim();
  elements.answerNotes.value = current ? `${current}\n\n${text}` : text;
  elements.answerNotes.focus();
  autoCheckFromNotes();
}

function answerTemplate() {
  return [
    "I would say that ...",
    "The main reason is that ...",
    "For example, last ...",
    "Because of that, I felt ...",
    "Looking back, I think ...",
  ].join("\n");
}

function problemTemplate() {
  return [
    "At first, I had a small problem because ...",
    "So I decided to ...",
    "In the end, it worked out, and I learned that ...",
  ].join("\n");
}

function updateScorePreview() {
  const score = checkedCount();
  const rating = estimateRating(score);
  const next = nextRating(score);
  const needed = Math.max(0, next.min - score);
  elements.scorePreview.textContent = rating.label;
  elements.scoreAdvice.textContent = `${rating.next} 공식 점수가 아닌 개인 학습용 참고 지표예요.`;
  elements.nextLevelText.textContent = needed
    ? `다음 목표: ${next.label}까지 ${needed}개 개선`
    : "다음 목표: AL 답변 안정화";
  elements.feedbackList.innerHTML = "";
  buildFeedbackItems(score).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    elements.feedbackList.appendChild(li);
  });
  updateCoachPrompt();
}

function completeMission() {
  stopRecording();
  stopSpeechRecognition();

  const question = questions[state.currentQuestionIndex];
  const date = todayKey();
  const checklistScore = checkedCount();
  const estimatedRating = estimateRating(checklistScore);
  const baseXp = 35;
  const bonusXp = checklistScore * 7;
  const alreadyPracticedToday = state.lastPracticeDate === date;

  if (!alreadyPracticedToday) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);
    state.streak = state.lastPracticeDate === yesterdayKey ? state.streak + 1 : 1;
    state.lastPracticeDate = date;
  }

  state.totalAnswers += 1;
  const stepGain = checklistScore >= 4 ? 2 : 1;
  state.steps = Math.min(journeyStops[journeyStops.length - 1].step, (state.steps || 0) + stepGain);
  state.xp += baseXp + bonusXp;
  while (state.xp >= 100) {
    state.xp -= 100;
    state.level += 1;
  }

  state.history.unshift({
    date,
    topic: question.topic,
    level: question.level,
    question: question.text,
    notes: elements.answerNotes.value.trim(),
    checklistScore,
    estimatedRating: estimatedRating.label,
    stepGain,
  });
  state.history = state.history.slice(0, 20);

  elements.answerNotes.value = "";
  $$(".checklist input").forEach((input) => {
    input.checked = false;
  });
  saveState();
  render();
  updateScorePreview();
  setMessage(makeFeedback(checklistScore, estimatedRating));
  nextQuestion();
}

function makeFeedback(score, rating = estimateRating(score)) {
  if (score >= 6) return `${rating.label}! 오늘은 문제 해결형 답변까지 잘 챙겼어요.`;
  if (score >= 4) return `${rating.label}. 구조가 좋아요. 다음엔 감정 표현을 한 문장 더 넣어봐요.`;
  if (score >= 2) return `${rating.label}. 이유와 예시를 붙이면 IH 답변에 더 가까워져요.`;
  return `${rating.label}. 완료한 것 자체가 점수예요. 내일은 이유 한 문장만 더 붙여봐요.`;
}

function setMessage(message) {
  elements.petMessage.textContent = message;
}
