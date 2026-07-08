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
    setMessage("다시 시작해도 좋아요. 오늘 한 문장이면 충분해요.");
  }
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
