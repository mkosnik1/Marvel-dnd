import { normalizeCharacter } from "./normalize-character.js";
import { finalizeVisibleCharacter } from "./normalize-character-final.js";
import { addDualSkillNamesToCharacter, addDualSkillNamesToRules } from "./skill-dual-names.js";

export async function loadJson(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Nie udało się wczytać ${path}: HTTP ${response.status}`);
  return response.json();
}

export async function loadRules() {
  const rules = await loadJson("data/rules.json");
  return addDualSkillNamesToRules(rules);
}

export async function loadCharacterRegistry() {
  const registry = await loadJson("data/characters/index.json");
  return registry.characters;
}

export async function loadCharacter(id) {
  const character = await loadJson(`data/characters/${encodeURIComponent(id)}.json`);
  const normalized = finalizeVisibleCharacter(normalizeCharacter(character));
  return addDualSkillNamesToCharacter(normalized);
}

export async function loadAllCharacters(ids) {
  return Promise.all(ids.map(loadCharacter));
}
