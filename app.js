const STORAGE_KEY = "malang-opic-state-v1";

const questions = [
  { topic: "자기소개", level: "IM", text: "자기소개를 해주세요. 하는 일, 성격, 요즘 자주 하는 일을 연결해서 말해보세요." },
  { topic: "집", level: "IM", text: "당신의 방이나 집에서 가장 편한 공간을 설명해주세요. 그곳에서 보통 무엇을 하나요?" },
  { topic: "동네", level: "IM", text: "당신이 사는 동네를 소개해주세요. 자주 가는 장소와 그 이유를 말해보세요." },
  { topic: "루틴", level: "IM", text: "평일 하루 일과를 순서대로 말해주세요. 가장 바쁜 시간과 쉬는 시간을 포함해보세요." },
  { topic: "음식", level: "IM", text: "좋아하는 음식을 하나 고르고, 언제 주로 먹는지와 왜 좋아하는지 말해보세요." },
  { topic: "취미", level: "IM", text: "요즘 즐기는 취미를 소개해주세요. 처음 시작한 계기와 자주 하는 방식을 말해보세요." },
  { topic: "음악", level: "IH", text: "요즘 자주 듣는 음악을 소개하고, 그 음악을 들으면 어떤 기분이 드는지 설명해보세요." },
  { topic: "영화", level: "IH", text: "최근 본 영화나 드라마에 대해 말해주세요. 기억에 남는 장면과 그 이유를 포함해보세요." },
  { topic: "여행", level: "IH", text: "기억에 남는 여행 경험을 말해주세요. 장소, 함께 간 사람, 인상 깊었던 일을 넣어보세요." },
  { topic: "쇼핑", level: "IH", text: "최근에 산 물건 하나를 소개해주세요. 사기 전 기대와 실제 사용 후 느낌을 비교해보세요." },
  { topic: "건강", level: "IH", text: "건강을 위해 하고 있는 습관을 말해주세요. 시작한 이유와 달라진 점을 함께 말해보세요." },
  { topic: "친구", level: "IH", text: "친한 친구 한 명을 소개해주세요. 어떤 사람이고, 최근에 함께 한 일을 말해보세요." },
  { topic: "비교", level: "AL", text: "예전의 여가 생활과 지금의 여가 생활을 비교해보세요. 달라진 이유까지 설명해보세요." },
  { topic: "돌발", level: "AL", text: "약속 시간에 늦었던 경험을 말해주세요. 무슨 일이 있었고 어떻게 해결했나요?" },
  { topic: "문제해결", level: "AL", text: "여행이나 외출 중 예상치 못한 문제가 생긴 경험을 말해주세요. 대응 과정과 결과를 포함해보세요." },
  { topic: "변화", level: "AL", text: "최근 몇 년 사이 당신의 생활 습관이 어떻게 변했는지 말해주세요. 변화의 원인도 설명해보세요." },
  { topic: "의견", level: "AL", text: "혼자 공부하는 것과 함께 공부하는 것 중 어느 쪽이 더 잘 맞나요? 이유와 경험을 들어 말해보세요." },
  { topic: "기술", level: "AL", text: "스마트폰이나 앱이 당신의 공부 방식에 준 영향을 말해주세요. 장점과 단점을 함께 말해보세요." },
];

const dailyPhrases = [
  {
    phrase: "It was totally worth it.",
    meaning: "완전 그럴 가치가 있었어요.",
    example: "I was tired, but the trip was totally worth it.",
  },
  {
    phrase: "I usually go for something simple.",
    meaning: "저는 보통 간단한 걸 선택해요.",
    example: "When I eat alone, I usually go for something simple.",
  },
  {
    phrase: "That is my go-to place.",
    meaning: "거기는 제가 자주 가는 단골 장소예요.",
    example: "There is a small cafe near my home, and that is my go-to place.",
  },
  {
    phrase: "I was in the middle of something.",
    meaning: "제가 뭔가를 한창 하고 있던 중이었어요.",
    example: "I missed the call because I was in the middle of something.",
  },
  {
    phrase: "It depends on my mood.",
    meaning: "그때그때 기분에 따라 달라요.",
    example: "I sometimes watch movies, but it depends on my mood.",
  },
  {
    phrase: "I ended up liking it more than I expected.",
    meaning: "생각보다 더 마음에 들게 됐어요.",
    example: "I tried yoga once, and I ended up liking it more than I expected.",
  },
  {
    phrase: "I needed a change of pace.",
    meaning: "분위기 전환이 필요했어요.",
    example: "I went for a walk because I needed a change of pace.",
  },
  {
    phrase: "It helped me clear my head.",
    meaning: "머리를 식히는 데 도움이 됐어요.",
    example: "Listening to music helped me clear my head.",
  },
  {
    phrase: "I am not really into that.",
    meaning: "저는 그걸 그렇게 좋아하진 않아요.",
    example: "I am not really into loud places, so I prefer quiet cafes.",
  },
  {
    phrase: "I try to make time for it.",
    meaning: "그걸 하려고 시간을 내려고 해요.",
    example: "I am busy, but I try to make time for exercise.",
  },
  {
    phrase: "It did not go as planned.",
    meaning: "계획대로 되진 않았어요.",
    example: "My trip did not go as planned because it rained all day.",
  },
  {
    phrase: "I learned that the hard way.",
    meaning: "힘들게 겪고 나서야 알게 됐어요.",
    example: "I forgot my charger on a trip, and I learned that the hard way.",
  },
  {
    phrase: "I would say it is pretty convenient.",
    meaning: "꽤 편리하다고 말할 수 있어요.",
    example: "The subway near my home is pretty convenient.",
  },
  {
    phrase: "It is a small thing, but it matters.",
    meaning: "작은 일이지만 중요해요.",
    example: "Having a quiet desk is a small thing, but it matters.",
  },
  {
    phrase: "I got used to it pretty quickly.",
    meaning: "꽤 빨리 익숙해졌어요.",
    example: "At first, online classes felt strange, but I got used to it pretty quickly.",
  },
];

const rubricCriteria = [
  { value: "length", label: "40초 이상 이어서 말했다", points: 1, tip: "답변 끝에 한 문장만 더 붙여서 40초를 넘겨보세요." },
  { value: "structure", label: "시작-이유-마무리 흐름이 있다", points: 1, tip: "첫 문장은 결론, 두 번째는 이유, 마지막은 느낌으로 정리해보세요." },
  { value: "detail", label: "개인 경험이나 구체적인 장면을 넣었다", points: 1, tip: "언제, 어디서, 누구와 있었는지 하나만 추가해보세요." },
  { value: "tense", label: "과거 또는 미래 시제를 사용했다", points: 1, tip: "I went, I watched, I will try 같은 시제 표현을 하나 넣어보세요." },
  { value: "connectors", label: "because, so, actually 같은 연결어를 썼다", points: 1, tip: "because, so, also 중 하나로 문장 사이를 연결해보세요." },
  { value: "problem", label: "문제 상황이나 해결 과정을 설명했다", points: 1, tip: "문제-대응-결과 순서로 한 문장씩 말해보세요." },
];

const coachPrompts = {
  length: [
    "마지막에 '그 경험이 왜 기억에 남았는지' 한 문장 더 붙여볼까요?",
    "답변 끝에 요즘 생각이나 느낌을 한 문장 추가해보세요.",
  ],
  structure: [
    "첫 문장은 결론, 다음 문장은 이유, 마지막은 느낌으로 정리해볼까요?",
    "답변을 시작-이유-예시-마무리 순서로 다시 배치해보세요.",
  ],
  detail: [
    "언제, 어디서, 누구와 있었던 일인지 하나만 더 넣어보세요.",
    "장면이 보이게 장소나 상황을 구체적으로 말해보세요.",
  ],
  tense: [
    "과거에 있었던 일을 한 문장 추가해보세요.",
    "예전과 지금이 어떻게 달라졌는지 비교해보세요.",
  ],
  connectors: [
    "because, so, actually 중 하나로 문장 사이를 연결해보세요.",
    "For example으로 개인 경험을 시작해보세요.",
  ],
  problem: [
    "문제-대응-결과를 한 문장씩 넣어보세요.",
    "예상과 다르게 된 일을 말하고, 어떻게 해결했는지 붙여보세요.",
  ],
  complete: [
    "좋아요. 이제 같은 답변을 더 자연스럽게 말하는 연습을 해보세요.",
    "체크 기준은 충분해요. 다음엔 감정 표현을 더 풍부하게 넣어봐요.",
  ],
};

const ratingBands = [
  { min: 0, label: "IM1 연습", next: "짧아도 괜찮으니 이유 한 문장을 붙여보세요." },
  { min: 2, label: "IM2 느낌", next: "경험 예시를 하나 넣으면 답변이 더 살아나요." },
  { min: 3, label: "IM3 느낌", next: "문장을 단락처럼 이어 말하면 IH에 가까워져요." },
  { min: 4, label: "IH 도전", next: "과거 경험과 감정 표현을 더 구체적으로 말해보세요." },
  { min: 5, label: "IH 안정권 연습", next: "돌발 상황에서 문제-대응-결과 구조를 연습해보세요." },
  { min: 6, label: "AL 도전", next: "비교, 변화, 문제 해결을 길게 설명하는 연습을 이어가세요." },
];

const rewards = [
  { id: "mug", icon: "컵", title: "카페 머그컵", requirement: "카페 도착", unlock: (state) => state.steps >= 4 },
  { id: "shoes", icon: "운동화", title: "공원 운동화", requirement: "공원 도착", unlock: (state) => state.steps >= 8 },
  { id: "ticket", icon: "티켓", title: "역 티켓", requirement: "지하철역 도착", unlock: (state) => state.steps >= 12 },
  { id: "carrier", icon: "캐리어", title: "공항 캐리어", requirement: "공항 도착", unlock: (state) => state.steps >= 16 },
  { id: "camera", icon: "카메라", title: "여행지 카메라", requirement: "여행지 도착", unlock: (state) => state.steps >= 20 },
  { id: "badge", icon: "배지", title: "시험장 배지", requirement: "시험장 도착", unlock: (state) => state.steps >= 24 },
];

const journeyStops = [
  { name: "집 앞", topic: "자기소개, 집, 동네", step: 0 },
  { name: "카페", topic: "음식, 친구, 취미", step: 4 },
  { name: "공원", topic: "건강, 루틴", step: 8 },
  { name: "지하철역", topic: "교통, 약속, 돌발", step: 12 },
  { name: "공항", topic: "여행 준비, 예약", step: 16 },
  { name: "여행지", topic: "경험, 비교, 변화", step: 20 },
  { name: "시험장", topic: "종합 모의 답변", step: 24 },
];

const evolutions = [
  {
    id: "seed",
    stage: 1,
    name: "말랑 씨앗몬",
    requirement: "시작 단계",
    unlock: () => true,
  },
  {
    id: "sprout",
    stage: 2,
    name: "새싹 말랑몬",
    requirement: "답변 3개 완료",
    unlock: (state) => state.totalAnswers >= 3,
  },
  {
    id: "spark",
    stage: 3,
    name: "반짝 스피치몬",
    requirement: "레벨 4 또는 답변 7개",
    unlock: (state) => state.level >= 4 || state.totalAnswers >= 7,
  },
  {
    id: "dragon",
    stage: 4,
    name: "오픽 드래곤",
    requirement: "답변 15개 + 3일 연속",
    unlock: (state) => state.totalAnswers >= 15 && state.streak >= 3,
  },
];

const defaultState = {
  petName: "쿼랑이",
  level: 1,
  xp: 0,
  streak: 0,
  totalAnswers: 0,
  steps: 0,
  lastPracticeDate: "",
  currentQuestionIndex: 0,
  targetLevel: "IH",
  history: [],
};

let state = loadState();
let mediaRecorder = null;
let chunks = [];
let timer = null;
let remainingSeconds = 60;
let totalSeconds = 60;
let deferredInstallPrompt = null;
let recognition = null;
let recognizing = false;
let coachPromptIndex = 0;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  pet: $("#pet"),
  petName: $("#petName"),
  evolutionText: $("#evolutionText"),
  petMessage: $("#petMessage"),
  dailyPhraseText: $("#dailyPhraseText"),
  dailyPhraseMeaning: $("#dailyPhraseMeaning"),
  dailyPhraseExample: $("#dailyPhraseExample"),
  phraseCopyButton: $("#phraseCopyButton"),
  levelText: $("#levelText"),
  streakText: $("#streakText"),
  answersText: $("#answersText"),
  xpText: $("#xpText"),
  xpBar: $("#xpBar"),
  currentStopText: $("#currentStopText"),
  nextStopText: $("#nextStopText"),
  journeyHint: $("#journeyHint"),
  stageStopText: $("#stageStopText"),
  roomItems: $("#roomItems"),
  questionText: $("#questionText"),
  topicChip: $("#topicChip"),
  levelChip: $("#levelChip"),
  targetLevel: $("#targetLevel"),
  durationSelect: $("#durationSelect"),
  timerText: $("#timerText"),
  timerRing: $("#timerRing"),
  recordButton: $("#recordButton"),
  speechButton: $("#speechButton"),
  doneButton: $("#doneButton"),
  audioPlayback: $("#audioPlayback"),
  answerNotes: $("#answerNotes"),
  coachPrompt: $("#coachPrompt"),
  coachRefreshButton: $("#coachRefreshButton"),
  insertTemplateButton: $("#insertTemplateButton"),
  insertPhraseButton: $("#insertPhraseButton"),
  insertProblemButton: $("#insertProblemButton"),
  scorePreview: $("#scorePreview"),
  scoreAdvice: $("#scoreAdvice"),
  nextLevelText: $("#nextLevelText"),
  feedbackList: $("#feedbackList"),
  routeLine: $("#routeLine"),
  rewardGrid: $("#rewardGrid"),
  historyList: $("#historyList"),
  installButton: $("#installButton"),
};

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function todayOrdinal() {
  return Math.floor(new Date(`${todayKey()}T00:00:00`).getTime() / 86400000);
}

function todayPhrase() {
  return dailyPhrases[todayOrdinal() % dailyPhrases.length];
}

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

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
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
  stopSpeechRecognition();
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

function currentStop() {
  return journeyStops.reduce((current, stop) => ((state.steps || 0) >= stop.step ? stop : current), journeyStops[0]);
}

function nextStop() {
  return journeyStops.find((stop) => stop.step > (state.steps || 0)) || journeyStops[journeyStops.length - 1];
}

function stepsToNextStop() {
  return Math.max(0, nextStop().step - (state.steps || 0));
}

function journeyProgressPercent() {
  const lastStep = journeyStops[journeyStops.length - 1].step;
  return Math.min(100, Math.round(((state.steps || 0) / lastStep) * 100));
}

function currentEvolution() {
  return evolutions.reduce((current, evolution) => (evolution.unlock(state) ? evolution : current), evolutions[0]);
}

function render() {
  const evolution = currentEvolution();
  const phrase = todayPhrase();
  elements.petName.textContent = state.petName;
  elements.evolutionText.textContent = `${evolution.stage}단계 · ${evolution.name}`;
  elements.dailyPhraseText.textContent = phrase.phrase;
  elements.dailyPhraseMeaning.textContent = phrase.meaning;
  elements.dailyPhraseExample.textContent = phrase.example;
  elements.levelText.textContent = state.level;
  elements.streakText.textContent = state.streak;
  elements.answersText.textContent = state.totalAnswers;
  elements.xpText.textContent = `${state.xp} / 100`;
  elements.xpBar.style.width = `${state.xp}%`;
  elements.targetLevel.value = state.targetLevel;
  elements.pet.className = `pet level-${Math.min(4, Math.max(1, Math.ceil(state.level / 2)))} evolution-${evolution.id}`;
  elements.currentStopText.textContent = currentStop().name;
  elements.nextStopText.textContent = nextStop().name;
  elements.stageStopText.textContent = currentStop().name;
  elements.journeyHint.textContent = stepsToNextStop()
    ? `다음 목적지까지 ${stepsToNextStop()}걸음 남았어요. 체크 4개 이상이면 2걸음 전진!`
    : "시험장까지 도착했어요. 이제 종합 답변을 반복해봐요.";
  const petLeft = 22 + journeyProgressPercent() * 0.56;
  document.documentElement.style.setProperty("--pet-left", `${petLeft}%`);
  document.documentElement.style.setProperty("--journey-progress", `${journeyProgressPercent()}%`);

  renderRoute();
  renderRewards();
  renderHistory();
  renderRoomItems();
}

function renderRoute() {
  elements.routeLine.innerHTML = "";
  journeyStops.forEach((stop) => {
    const node = document.createElement("div");
    const reached = (state.steps || 0) >= stop.step;
    const active = stop.name === currentStop().name;
    node.className = `route-stop ${reached ? "reached" : ""} ${active ? "active" : ""}`;
    node.innerHTML = `
      <div class="route-dot">${reached ? "✓" : ""}</div>
      <strong>${stop.name}</strong>
      <span>${stop.topic}</span>
    `;
    elements.routeLine.appendChild(node);
  });
}

function renderRewards() {
  elements.rewardGrid.innerHTML = "";
  rewards.forEach((reward) => {
    const template = $("#rewardTemplate").content.cloneNode(true);
    const card = template.querySelector(".reward-card");
    const unlocked = reward.unlock(state);
    card.classList.toggle("locked", !unlocked);
    template.querySelector(".reward-icon").textContent = unlocked ? reward.icon : "잠김";
    template.querySelector("h3").textContent = reward.title;
    template.querySelector("p").textContent = unlocked ? "방에 배치되었어요." : reward.requirement;
    elements.rewardGrid.appendChild(template);
  });
}

function renderRoomItems() {
  elements.roomItems.innerHTML = "";
  rewards
    .filter((reward) => reward.unlock(state))
    .slice(0, 3)
    .forEach((reward) => {
      const item = document.createElement("div");
      item.className = "room-item";
      item.textContent = reward.icon;
      elements.roomItems.appendChild(item);
    });
}

function renderHistory() {
  elements.historyList.innerHTML = "";
  if (!state.history.length) {
    elements.historyList.innerHTML = '<div class="history-empty">아직 기록이 없어요. 오늘의 첫 답변을 남겨보세요.</div>';
    return;
  }

  state.history.forEach((item) => {
    const article = document.createElement("article");
    article.className = "history-item";
    article.innerHTML = `
      <strong>${item.date} · ${item.topic} · ${item.level} · ${item.estimatedRating || "등급 미기록"}</strong>
      <p>${item.question}</p>
      ${item.notes ? `<p>${escapeHtml(item.notes)}</p>` : ""}
    `;
    elements.historyList.appendChild(article);
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[char];
  });
}

function bindEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((button) => button.classList.remove("active"));
      $$(".view").forEach((view) => view.classList.remove("active"));
      tab.classList.add("active");
      $(`#${tab.dataset.view}View`).classList.add("active");
    });
  });

  $("#newQuestionButton").addEventListener("click", nextQuestion);
  elements.targetLevel.addEventListener("change", () => {
    state.targetLevel = elements.targetLevel.value;
    saveState();
    nextQuestion();
  });
  elements.durationSelect.addEventListener("change", () => updateTimer(Number(elements.durationSelect.value)));
  $$(".checklist input").forEach((input) => input.addEventListener("change", updateScorePreview));
  elements.answerNotes.addEventListener("input", autoCheckFromNotes);
  elements.coachRefreshButton.addEventListener("click", () => {
    coachPromptIndex += 1;
    updateCoachPrompt();
  });
  elements.insertTemplateButton.addEventListener("click", () => appendToNotes(answerTemplate()));
  elements.insertPhraseButton.addEventListener("click", () => {
    const phrase = todayPhrase();
    appendToNotes(`${phrase.phrase}\n${phrase.example}`);
  });
  elements.insertProblemButton.addEventListener("click", () => appendToNotes(problemTemplate()));
  elements.recordButton.addEventListener("click", toggleRecording);
  elements.speechButton.addEventListener("click", toggleSpeechRecognition);
  elements.doneButton.addEventListener("click", completeMission);
  elements.phraseCopyButton.addEventListener("click", async () => {
    const phrase = todayPhrase();
    const text = `${phrase.phrase}\n${phrase.meaning}\n${phrase.example}`;
    try {
      await navigator.clipboard.writeText(text);
      setMessage("오늘 표현을 복사했어요. 답변에 한 번 넣어봐요.");
    } catch {
      setMessage("복사가 막혔어요. 오늘 표현을 직접 따라 말해봐도 좋아요.");
    }
  });
  $("#renameButton").addEventListener("click", () => {
    const nextName = window.prompt("캐릭터 이름을 정해주세요.", state.petName);
    if (nextName?.trim()) {
      state.petName = nextName.trim().slice(0, 12);
      saveState();
      render();
    }
  });
  $("#resetButton").addEventListener("click", () => {
    if (window.confirm("모든 성장 기록을 초기화할까요?")) {
      state = { ...defaultState };
      saveState();
      render();
      selectQuestion();
      setMessage("다시 시작해도 좋아요. 오늘 한 문장이면 충분해요.");
    }
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    elements.installButton.hidden = false;
  });

  elements.installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    elements.installButton.hidden = true;
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

bindEvents();
setupSpeechRecognition();
render();
selectQuestion();
updateTimer();
updateScorePreview();
registerServiceWorker();
