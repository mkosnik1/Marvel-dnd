const PREFIX = "marvel:";

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

export function resetCharacterCounters(characterId) {
  Object.keys(localStorage)
    .filter(key => key.startsWith(PREFIX + characterId + ":"))
    .forEach(key => localStorage.removeItem(key));
}
