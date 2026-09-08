import { getCounter, setCounter, safeId } from "./state.js";

const PB = 3;
const ABILITIES = ["STR","DEX","CON","INT","WIS","CHA"];

function mod(score){ return Math.floor((score - 10) / 2); }
function fmt(value){ return value >= 0 ? `+${value}` : String(value); }

function hp(character, rules){
  const hd = rules.hitdie[character.cls];
  const con = mod(character.stats.CON);
  const avg = rules.fixedPerLevel[hd];
  let value = hd + con + 4 * (avg + con);
  if (character.feats.includes("Tough")) value += 10;
  return value;
}

function initiative(character){
  let value = mod(character.stats.DEX);
  if (character.feats.includes("Alert")) value += 5;
  if (character.raceRules === "Harengon") value += PB;
  return value;
}

function skillBonus(character, skill, rules){
  const ability = rules.skillAbility[skill];
  let value = mod(character.stats[ability]);
  if (character.expertise.includes(skill)) value += PB * 2;
  else if (character.skillProfs.includes(skill)) value += PB;
  return value;
}

function passive(character, skill, rules){ return 10 + skillBonus(character, skill, rules); }
function saveBonus(character, ability){ return mod(character.stats[ability]) + (character.saveProfs.includes(ability) ? PB : 0); }
function escapeAttr(value){ return String(value).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function skillDisplayName(character, skill, rules){
  const pl = rules.skillPL[skill] || skill;
  const alias = character.skillAliases?.[skill] || rules.skillAliasDefault[skill];
  return alias ? `${pl} / ${alias}` : pl;
}

function skillTooltip(character, skill, rules){
  const ability = rules.skillAbility[skill];
  const alias = character.skillAliases?.[skill] || rules.skillAliasDefault[skill];
  return `${rules.skillPL[skill]} (${rules.abilityPL[ability]}). ${rules.skillTooltips[skill]}${alias ? ` Współczesny reskin: „${alias}”.` : ""} Reskin nie zmienia mechaniki testu.`;
}

function card(title, body, full=false){ return `<section class="card ${full ? "full" : ""}"><div class="card-head"><h3>${title}</h3></div><div class="card-body">${body}</div></section>`; }
function rows(items){ return `<div class="rows">${items.map(([k,v]) => `<div class="row"><div class="k">${k}</div><div class="v">${v}</div></div>`).join("")}</div>`; }
function features(items){
  if (!items?.length) return `<div class="note">Brak danych.</div>`;
  return items.map(item => `<div class="feature"><h4>${item.name}<span class="rules-name">Mechanika D&D: ${item.rulesName}</span></h4><p>${item.description}</p></div>`).join("");
}

function featList(character){
  const details = character.featDetails || [];
  if (details.length) return details.map(item => `<div class="feature"><h4>${item.name}</h4><p>${item.description}</p></div>`).join("");
  if (!character.feats?.length) return `<div class="note">Brak featów.</div>`;
  return character.feats.map(feat => `<div class="feature"><h4>${feat}</h4><p>Pełny efekt tego featu jest opisany w odpowiedniej cesze rozwoju postaci.</p></div>`).join("");
}

function skillTable(character, rules){
  const names = Object.keys(rules.skillAbility);
  const header = `<div class="skill-header"><div>Umiejętność</div><div>Atrybut</div><div>Premia</div><div>Biegłość</div></div>`;
  const body = names.map(skill => {
    const exp = character.expertise.includes(skill), prof = character.skillProfs.includes(skill), ability = rules.skillAbility[skill];
    return `<div class="skill-row"><strong><span class="skill-label" tabindex="0" data-tip="${escapeAttr(skillTooltip(character, skill, rules))}">${skillDisplayName(character, skill, rules)} <span class="info">i</span></span></strong><div class="ability">${rules.abilityPL[ability]}</div><div class="bonus">${fmt(skillBonus(character, skill, rules))}</div><div class="status">${exp ? '<span class="tag exp">Ekspertyza</span>' : prof ? '<span class="tag prof">Biegłość</span>' : '—'}</div></div>`;
  }).join("");
  return `<div class="skill-help">Nazwa po „/” jest reskinem dopasowanym do bohatera. Najedź na nazwę, aby zobaczyć przykładowe zastosowania.</div><div class="skill-grid">${header}${body}</div>`;
}

function attackList(character){
  if (!character.attacks?.length) return `<div class="note">Brak osobnych ataków.</div>`;
  return character.attacks.map(a => `<div class="attack"><strong>${a[0]}</strong><div>${a[1]}</div><div>${a[2]}</div><small>${a[3]}</small></div>`).join("");
}

function spellList(character){
  if (!character.spellsDetailed?.length) return `<div class="note">Brak zaklęć lub mocy zapisanych jako zaklęcia.</div>`;
  return character.spellsDetailed.map(spell => `<div class="spell"><div><span class="tag level">${spell.levelLabel}</span></div><strong>${spell.name}${spell.flavorName ? `<span class="flavor">Reskin: ${spell.flavorName}</span>` : ""}</strong><div class="desc">${spell.description}</div></div>`).join("");
}

function resourceList(character){
  if (!character.resources?.length) return `<div class="note">Brak osobnej puli zasobów do śledzenia.</div>`;
  return `<div class="resource-grid">${character.resources.map((resource, index) => {
    const key = `${character.id}:resource:${index}`;
    const counter = resource.max !== null && resource.max !== undefined
      ? `<div class="counter"><button data-counter-key="${key}" data-max="${resource.max}" data-delta="-1">−</button><span class="value" id="${safeId(key)}">${getCounter(key, resource.max)} / ${resource.max}${resource.unit ? ` ${resource.unit}` : ""}</span><button data-counter-key="${key}" data-max="${resource.max}" data-delta="1">+</button></div>`
      : "";
    return `<div class="resource"><div class="resource-top"><h4>${resource.name}</h4><span class="recharge">${resource.recharge || ""}</span></div><p>${resource.description || ""}</p>${counter}</div>`;
  }).join("")}</div>`;
}

function spellSlotList(character){
  if (!character.spellSlotsDetailed?.length) return `<div class="note">Brak klasowych spell slotów.</div>`;
  return `<div class="slot-grid">${character.spellSlotsDetailed.map(slot => {
    const key = `${character.id}:slot:${slot.level}`;
    return `<div class="slot"><strong>${slot.name}</strong><small>${slot.recharge}</small><div class="counter"><button data-counter-key="${key}" data-max="${slot.max}" data-delta="-1">−</button><span class="value" id="${safeId(key)}">${getCounter(key, slot.max)} / ${slot.max}</span><button data-counter-key="${key}" data-max="${slot.max}" data-delta="1">+</button></div></div>`;
  }).join("")}</div>`;
}

function profRows(character, rules){
  const profs = rules.classProfs[character.cls] || ["—","—"];
  return [["Pochodzenie Marvela",character.race],["Mechanika pochodzenia",character.raceRules],["Klasa",`${character.cls} 5`],["Podklasa",character.subclass],["Background",character.background],["Drużyna",character.team || "—"],["Armor",profs[0]],["Weapons",profs[1]],["Tools",character.tools || rules.bgTools[character.background] || "—"],["Languages",character.languages || "English"]];
}

export function renderCharacter(character, rules, heroEl, contentEl){
  heroEl.innerHTML = `<div class="eyebrow">${character.group} • poziom 5 • 6,500 XP</div><h2>${character.name}</h2><div class="real">${character.realName}</div><div class="chips"><span class="chip">Pochodzenie: ${character.race}</span><span class="chip">${character.cls} 5</span><span class="chip">${character.subclass}</span>${character.team ? `<span class="chip">${character.team}</span>` : ""}<span class="chip">${character.alignment}</span></div><div class="stats">${ABILITIES.map(a => `<div class="stat"><div class="lab">${rules.abilityPL[a]}</div><div class="score">${character.stats[a]}</div><div class="mod">${fmt(mod(character.stats[a]))}</div></div>`).join("")}</div><div class="quick"><div class="q"><span>AC</span><strong>${character.ac}</strong></div><div class="q"><span>HP</span><strong>${hp(character, rules)}</strong></div><div class="q"><span>Speed</span><strong>${character.speed} ft</strong></div><div class="q"><span>Initiative</span><strong>${fmt(initiative(character))}</strong></div><div class="q"><span>Proficiency</span><strong>+3</strong></div><div class="q"><span>Hit Dice</span><strong>5d${rules.hitdie[character.cls]}</strong></div></div>`;
  const saves = ABILITIES.map(a => [rules.abilityPL[a], `${fmt(saveBonus(character,a))}${character.saveProfs.includes(a) ? " • biegłość" : ""}`]);
  contentEl.innerHTML =
    card("Rzuty Obronne", rows(saves)) +
    card("Wartości pasywne", rows([["Passive Perception",passive(character,"Perception",rules)],["Passive Investigation",passive(character,"Investigation",rules)],["Passive Insight",passive(character,"Insight",rules)]])) +
    card("Umiejętności", skillTable(character,rules), true) +
    card("Zasoby", resourceList(character), true) +
    card("Spell slots", spellSlotList(character), true) +
    card("Pochodzenie Marvela — pełny reskin", features(character.originFeatures), true) +
    card("Cechy klasowe — reskin", features(character.classFeaturesDetailed), true) +
    card("Cechy podklasy — reskin", features(character.subclassFeaturesDetailed), true) +
    card("Featy", featList(character)) +
    card("Marvelowe moce i przedmioty", character.marvel?.length ? character.marvel.map(x => `<div class="feature"><h4>${x[0]} <span class="tag">homebrew</span></h4><p>${x[1]}</p></div>`).join("") : `<div class="note">Brak dodatkowych cech homebrew.</div>`) +
    card("Ataki", attackList(character), true) +
    card("Zaklęcia i moce zapisane jako zaklęcia", spellList(character), true) +
    card("Biegłości i informacje", rows(profRows(character,rules)), true);

  contentEl.querySelectorAll("[data-counter-key]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.counterKey;
      const max = Number(button.dataset.max);
      const delta = Number(button.dataset.delta);
      const next = setCounter(key, max, getCounter(key,max) + delta);
      const target = document.getElementById(safeId(key));
      const resource = character.resources?.find((_,i) => `${character.id}:resource:${i}` === key);
      target.textContent = `${next} / ${max}${resource?.unit ? ` ${resource.unit}` : ""}`;
    });
  });
}
