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

function topicScene() {
  const topic = questions[state.currentQuestionIndex]?.topic || "";
  if (["집", "동네", "루틴", "자기소개"].includes(topic)) return "home";
  if (["음식", "친구", "쇼핑"].includes(topic)) return "cafe";
  if (["취미", "음악", "건강"].includes(topic)) return "park";
  if (["여행", "비교", "변화", "문제해결"].includes(topic)) return "trip";
  if (["돌발", "의견", "기술", "영화"].includes(topic)) return "test";
  return "default";
}

function todayMissionItems() {
  return state.history.filter((item) => item.date === todayKey()).slice(0, 15).reverse();
}

function companionSeed(value) {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function todaysCompanion() {
  const currentDate = todayKey();
  const hasCompanion = companionMissions.some((mission) => mission.id === state.companionId);

  if (state.companionDate !== currentDate || !hasCompanion) {
    const index = companionSeed(`${currentDate}-${state.totalAnswers || 0}`) % companionMissions.length;
    state.companionDate = currentDate;
    state.companionId = companionMissions[index].id;
    saveState();
  }

  return companionMissions.find((mission) => mission.id === state.companionId) || companionMissions[0];
}

function updateStageScene() {
  const stop = currentStop();
  const companion = todaysCompanion();
  elements.petStage.className = `pet-stage scene-${stop.scene} topic-${topicScene()} companion-${companion.id}`;
}

function render() {
  const evolution = currentEvolution();
  const phrase = todayPhrase();
  const stop = currentStop();
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
  updateStageScene();
  elements.currentStopText.textContent = stop.name;
  elements.nextStopText.textContent = nextStop().name;
  elements.stageStopText.textContent = stop.name;
  elements.journeyHint.textContent = stepsToNextStop()
    ? `다음 목적지까지 ${stepsToNextStop()}걸음 남았어요. 체크 4개 이상이면 2걸음 전진!`
    : "시험장까지 도착했어요. 이제 종합 답변을 반복해봐요.";
  const petLeft = 22 + journeyProgressPercent() * 0.56;
  document.documentElement.style.setProperty("--pet-left", `${petLeft}%`);
  document.documentElement.style.setProperty("--journey-progress", `${journeyProgressPercent()}%`);

  renderStageProgress();
  renderRoute();
  renderFootprints();
  renderRewards();
  renderHistory();
  renderRoomItems();
}

function renderStageProgress() {
  elements.stageRoute.innerHTML = '<div class="stage-road"></div>';
  const lastStep = journeyStops[journeyStops.length - 1].step;
  journeyStops.forEach((stop) => {
    const marker = document.createElement("div");
    const reached = (state.steps || 0) >= stop.step;
    const active = stop.name === currentStop().name;
    marker.className = `stage-marker ${reached ? "reached" : ""} ${active ? "active" : ""}`;
    marker.style.setProperty("--marker-left", `${(stop.step / lastStep) * 100}%`);
    elements.stageRoute.appendChild(marker);
  });
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

function renderFootprints() {
  const todayItems = todayMissionItems();
  const companion = todaysCompanion();
  const stackGoal = 15;
  elements.dailyStackText.textContent = `${todayItems.length}/${stackGoal}`;
  elements.footprintTrail.innerHTML = "";
  const journeyFootprints = stackGoal;
  const filledCount = Math.min(journeyFootprints, todayItems.length);

  Array.from({ length: journeyFootprints }).forEach((_, index) => {
    const footprint = document.createElement("div");
    const isFilled = index < filledCount;
    footprint.className = `footprint ${isFilled ? "filled" : "slot"} ${companion.footprint}`;
    footprint.style.setProperty("--step-index", index);
    footprint.style.setProperty("--step-left", `${4 + index * 6.55}%`);
    footprint.style.setProperty("--step-lift", `${index % 2 ? 8 : 0}px`);
    footprint.title = isFilled ? "전진한 발자국" : "앞으로 채워질 발자국";
    elements.footprintTrail.appendChild(footprint);
  });
}

function renderRoomItems() {
  const companion = todaysCompanion();
  const todayCount = todayMissionItems().length;
  const revealStage = todayCount >= 15 ? "complete" : todayCount >= 8 ? "hint" : "mystery";
  const biteLevel = Math.min(7, Math.max(0, todayCount - 8));

  elements.roomItems.innerHTML = "";
  const reveal = document.createElement("div");
  reveal.className = `reveal-scene reveal-${revealStage} reveal-${companion.id} bite-${biteLevel}`;
  reveal.style.setProperty("--bite-progress", biteLevel);
  reveal.setAttribute("aria-label", `${companion.animal} mission reveal`);
  reveal.innerHTML = `
    <div class="mission-treat treat-${companion.treat}"></div>
    <div class="mission-animal animal-${companion.animal}">
      <div class="animal-ear left"></div>
      <div class="animal-ear right"></div>
      <div class="animal-head">
        <span class="animal-eye left"></span>
        <span class="animal-eye right"></span>
        <span class="animal-nose"></span>
        <span class="animal-mouth"></span>
        <span class="animal-cheek left"></span>
        <span class="animal-cheek right"></span>
      </div>
      <div class="animal-paw left"></div>
      <div class="animal-paw right"></div>
    </div>
  `;
  elements.roomItems.appendChild(reveal);
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
