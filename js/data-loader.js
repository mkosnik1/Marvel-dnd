import { normalizeCharacter } from "./normalize-character.js";
import { finalizeVisibleCharacter } from "./normalize-character-final.js";
import { addDualSkillNamesToCharacter, addDualSkillNamesToRules } from "./skill-dual-names.js";
import { applyMarvelPowerOverrides } from "./marvel-power-overrides.js";
import { addAttackLabels } from "./attack-labels.js";
import { enrichResourceDetails } from "./resource-details.js";
import { finalCardAudit } from "./final-card-audit.js";
import { resolveFinalCardExceptions } from "./final-card-exceptions.js";

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
  const withDetailedResources = enrichResourceDetails(character);
  const normalized = finalizeVisibleCharacter(normalizeCharacter(withDetailedResources));
  const withDetailedMarvelPowers = applyMarvelPowerOverrides(normalized);
  const withAttackLabels = addAttackLabels(withDetailedMarvelPowers);
  const audited = finalCardAudit(addDualSkillNamesToCharacter(withAttackLabels));
  return resolveFinalCardExceptions(audited);
}

export async function loadAllCharacters(ids) {
  return Promise.all(ids.map(loadCharacter));
}
