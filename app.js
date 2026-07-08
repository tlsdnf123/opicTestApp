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
let recorderMimeType = "";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  petStage: $(".pet-stage"),
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
  stageRoute: $("#stageRoute"),
  dailyStackText: $("#dailyStackText"),
  footprintTrail: $("#footprintTrail"),
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

function setupAppLayout() {
  const appShell = $(".app-shell");
  const heroPanel = $(".hero-panel");
  const practicePanel = $(".practice-panel");
  const tabs = $(".tabs");
  const missionView = $("#missionView");

  if (!appShell || !heroPanel || !practicePanel || !tabs || !missionView) return;

  document.body.classList.add("app-mode");
  appShell.classList.add("app-shell-mobile");

  tabs.innerHTML = `
    <button class="tab active" type="button" data-view="mission">홈</button>
    <button class="tab" type="button" data-view="phrase">표현</button>
    <button class="tab" type="button" data-view="history">기록</button>
  `;

  const phraseView = document.createElement("section");
  phraseView.className = "view";
  phraseView.id = "phraseView";
  phraseView.innerHTML = `
    <div class="section-head">
      <div>
        <p class="eyebrow">Daily phrase</p>
        <h2>오늘의 표현</h2>
      </div>
    </div>
  `;

  practicePanel.insertBefore(phraseView, $("#historyView"));

  const missionFeedback = document.createElement("div");
  missionFeedback.className = "mission-feedback-area";
  missionFeedback.id = "missionFeedbackArea";
  missionFeedback.hidden = true;
  missionFeedback.innerHTML = `
    <div class="mission-result-card">
      <span>오늘의 피드백</span>
      <strong id="missionResultRating">연습 결과</strong>
      <p id="missionResultText">완료를 누르면 답변 기준에 맞춰 바로 보여드려요.</p>
    </div>
  `;

  const moveTo = (target, selectors) => {
    selectors.forEach((selector) => {
      const node = $(selector);
      if (node) target.appendChild(node);
    });
  };

  const surveyCard = document.createElement("div");
  surveyCard.className = "survey-card";
  surveyCard.innerHTML = `
    <div class="survey-head">
      <div>
        <span>Background Survey</span>
        <strong>관심사 선택</strong>
      </div>
      <button class="text-button" id="startMockExamButton" type="button">모의시험 다시 구성</button>
    </div>
    <div class="survey-options" id="surveyOptions"></div>
    <p>선택한 관심사에서 기본 질문이 나오고, 중간에 롤플레이와 돌발 질문이 섞여요.</p>
  `;
  missionView.prepend(surveyCard);

  moveTo(missionView, [".pet-stage"]);
  moveTo(missionView, [".answer-box"]);
  missionView.appendChild(missionFeedback);
  moveTo(missionFeedback, [".al-coach-card", ".checklist", ".score-card"]);
  moveTo(phraseView, [".daily-phrase-card"]);

  $("#gardenView")?.remove();

  heroPanel.hidden = true;
}

function showMissionFeedback(rating, message) {
  const feedbackArea = $("#missionFeedbackArea");
  if (!feedbackArea) return;

  $("#missionResultRating").textContent = rating;
  $("#missionResultText").textContent = message;
  feedbackArea.hidden = false;

  const missionTab = $('.tab[data-view="mission"]');
  if (missionTab && !missionTab.classList.contains("active")) {
    missionTab.click();
  }

  feedbackArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideMissionFeedback() {
  const feedbackArea = $("#missionFeedbackArea");
  if (feedbackArea) feedbackArea.hidden = true;
}

function renderSurveyOptions() {
  const container = $("#surveyOptions");
  if (!container) return;
  const selected = new Set(state.surveySelectedTopics?.length ? state.surveySelectedTopics : defaultState.surveySelectedTopics);
  container.innerHTML = "";
  backgroundSurveyOptions.forEach((option) => {
    const label = document.createElement("label");
    label.className = "survey-option";
    label.innerHTML = `
      <input type="checkbox" value="${option.id}" ${selected.has(option.id) ? "checked" : ""} />
      <span>${option.label}</span>
    `;
    container.appendChild(label);
  });
}

function rebuildMockExam() {
  const selected = $$("#surveyOptions input:checked").map((input) => input.value);
  state.surveySelectedTopics = selected.length ? selected : [...defaultState.surveySelectedTopics];
  state.dailyPlanDate = "";
  state.dailyPlanSurvey = "";
  state.dailyQuestionIndexes = [];
  state.examCompletedCount = 0;
  saveState();
  selectQuestion();
  hideMissionFeedback();
  render();
  setMessage("선택한 관심사 기준으로 15문제 모의시험을 다시 구성했어요.");
}

function bindEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((button) => button.classList.remove("active"));
      $$(".view").forEach((view) => view.classList.remove("active"));
      tab.classList.add("active");
      $(`#${tab.dataset.view}View`).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  $("#newQuestionButton").addEventListener("click", nextQuestion);
  $("#startMockExamButton")?.addEventListener("click", rebuildMockExam);
  $("#surveyOptions")?.addEventListener("change", rebuildMockExam);
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
  $("#quickResetButton").addEventListener("click", resetGrowthState);
  $("#resetButton").addEventListener("click", resetGrowthState);

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

function resetGrowthState() {
  if (window.confirm("모든 성장 기록을 초기화할까요?")) {
    state = { ...defaultState };
    saveState();
    render();
    selectQuestion();
    updateScorePreview();
    hideMissionFeedback();
    setMessage("다시 시작해도 좋아요. 오늘 한 문장이면 충분해요.");
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

setupAppLayout();
renderSurveyOptions();
bindEvents();
setupSpeechRecognition();
render();
selectQuestion();
updateTimer();
updateScorePreview();
registerServiceWorker();
