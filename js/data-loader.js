import { normalizeCharacter } from "./normalize-character.js";
import { finalizeVisibleCharacter } from "./normalize-character-final.js";

export async function loadJson(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Nie udało się wczytać ${path}: HTTP ${response.status}`);
  return response.json();
}

export async function loadRules() {
  return loadJson("data/rules.json");
}

export async function loadCharacterRegistry() {
  const registry = await loadJson("data/characters/index.json");
  return registry.characters;
}

export async function loadCharacter(id) {
  const character = await loadJson(`data/characters/${encodeURIComponent(id)}.json`);
  return finalizeVisibleCharacter(normalizeCharacter(character));
}

export async function loadAllCharacters(ids) {
  return Promise.all(ids.map(loadCharacter));
}
