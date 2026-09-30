import { normalizeCharacter } from "./normalize-character.js";
import { finalizeVisibleCharacter } from "./normalize-character-final.js";
import { addDualSkillNamesToCharacter, addDualSkillNamesToRules } from "./skill-dual-names.js";
import { applyMarvelPowerOverrides } from "./marvel-power-overrides.js";
import { addAttackLabels } from "./attack-labels.js";
import { enrichResourceDetails } from "./resource-details.js";
import { finalCardAudit } from "./final-card-audit.js";
import { resolveFinalCardExceptions } from "./final-card-exceptions.js";

const LOAD_RETRIES = 2;
const CHARACTER_LOAD_CONCURRENCY = 6;

function pause(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function loadJson(path) {
  let lastError;

  for (let attempt = 0; attempt <= LOAD_RETRIES; attempt += 1) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        const error = new Error(`Nie udało się wczytać ${path}: HTTP ${response.status}`);
        // Brakujący plik nie pojawi się po ponowieniu żądania.
        if (response.status >= 400 && response.status < 500) throw error;
        lastError = error;
      } else {
        return await response.json();
      }
    } catch (error) {
      lastError = error;
      if (/HTTP 4\d\d/.test(String(error?.message))) throw error;
    }

    if (attempt < LOAD_RETRIES) await pause(250 * (attempt + 1));
  }

  throw new Error(`Nie udało się wczytać ${path}. ${lastError?.message || "Błąd połączenia."}`);
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
  const characters = new Array(ids.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < ids.length) {
      const index = nextIndex;
      nextIndex += 1;
      characters[index] = await loadCharacter(ids[index]);
    }
  }

  const workerCount = Math.min(CHARACTER_LOAD_CONCURRENCY, ids.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return characters;
}
