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
