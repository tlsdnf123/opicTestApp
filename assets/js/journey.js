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
