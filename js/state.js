const PREFIX = "marvel:";
const HISTORY_LIMIT = 60;

export function safeId(value) {
  return "c_" + btoa(unescape(encodeURIComponent(value))).replace(/[^a-zA-Z0-9]/g, "");
}

export function getCounter(key, max) {
  const raw = localStorage.getItem(PREFIX + key);
  if (raw === null) return max;
  return Math.max(0, Math.min(max, Number(raw)));
}

export function setCounter(key, max, value) {
  const next = Math.max(0, Math.min(max, value));
  localStorage.setItem(PREFIX + key, String(next));
  return next;
}

export function getValue(key, fallback = 0, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const raw = localStorage.getItem(PREFIX + key);
  const value = raw === null ? fallback : Number(raw);
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : fallback));
}

export function setValue(key, value, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const next = Math.max(min, Math.min(max, Number(value)));
  localStorage.setItem(PREFIX + key, String(next));
  return next;
}

export function addHistory(characterId, event) {
  const key = PREFIX + characterId + ":history";
  let history = [];
  try { history = JSON.parse(localStorage.getItem(key) || "[]"); } catch (_) { history = []; }
  history.unshift({ ...event, at: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(history.slice(0, HISTORY_LIMIT)));
  return history;
}

export function getHistory(characterId) {
  try { return JSON.parse(localStorage.getItem(PREFIX + characterId + ":history") || "[]"); }
  catch (_) { return []; }
}

export function resetCharacterCounters(characterId) {
  Object.keys(localStorage)
    .filter(key => key.startsWith(PREFIX + characterId + ":"))
    .forEach(key => localStorage.removeItem(key));
}
