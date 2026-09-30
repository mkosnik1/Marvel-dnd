import "./mechanics-pl-extra.js";
import "./mechanics-pl-final.js";
import { loadRules, loadCharacterRegistry, loadAllCharacters } from "./data-loader.js";
import { resetCharacterCounters } from "./state.js";
import { renderCharacter, restCharacter } from "./render.js";
import { cleanupRenderedCard } from "./post-render-cleanup.js";
import { initDiceRoller } from "./dice.js";

const heroEl = document.getElementById("hero");
const contentEl = document.getElementById("content");
const charListEl = document.getElementById("charList");
const filterEl = document.getElementById("filters");
const hintEl = document.getElementById("categoryHint");
const searchEl = document.getElementById("search");

let rules;
let characters = [];
let activeCharacterId = "cap";
let activeFilter = "Wszyscy";

const categories = {
  "Wszyscy":"Wszystkie dostępne postacie.",
  "Mutanci":"Mutanci i postacie ze środowiska X-Men / X-Force.",
  "Małe ziemniaczki":"Bohaterowie uliczni i postacie działające w mniejszej skali.",
  "Duże ziemniaczki":"Avengers, magia, kosmos i cięższa artyleria."
};

function showError(error){
  const localFileHint = location.protocol === "file:"
    ? "Uruchom start-server.bat albo serwer HTTP — przeglądarki blokują pobieranie plików JSON dla adresów file://."
    : "Sprawdź połączenie z internetem i spróbuj ponownie.";
  heroEl.innerHTML = `<div class="loading error"><strong>Nie udało się wczytać danych.</strong><br><br><span id="loadErrorDetail"></span><br><br>${localFileHint}<br><br><button id="retryLoadBtn" type="button">Spróbuj ponownie</button></div>`;
  document.getElementById("loadErrorDetail").textContent = error?.message || "Nieznany błąd.";
  document.getElementById("retryLoadBtn").addEventListener("click", () => location.reload());
  contentEl.innerHTML = "";
}

function renderFilters(){
  filterEl.innerHTML = Object.keys(categories).map(name => `<button class="filter ${name===activeFilter ? "active" : ""}" data-filter="${name}">${name}</button>`).join("");
  hintEl.textContent = categories[activeFilter];
  filterEl.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    renderFilters();
    renderList();
  }));
}

function renderList(){
  const query = searchEl.value.trim().toLowerCase();
  const visible = characters.filter(c => (activeFilter === "Wszyscy" || c.group === activeFilter) && (`${c.name} ${c.realName} ${c.race} ${c.raceRules} ${c.cls} ${c.subclass} ${c.team || ""}`.toLowerCase().includes(query)));
  charListEl.innerHTML = visible.map(c => `<button class="char-btn ${c.id===activeCharacterId ? "active" : ""}" data-id="${c.id}"><span class="char-name">${c.name}</span><span class="char-meta">${c.realName}<br>${c.race}${c.team ? `<br>${c.team}` : ""}</span></button>`).join("");
  charListEl.querySelectorAll("[data-id]").forEach(button => button.addEventListener("click", () => selectCharacter(button.dataset.id)));
}

function selectCharacter(id){
  const character = characters.find(c => c.id === id) || characters[0];
  activeCharacterId = character.id;
  renderList();
  renderCharacter(character, rules, heroEl, contentEl);
  cleanupRenderedCard(heroEl, contentEl);
  location.hash = character.id;
}

async function init(){
  try {
    heroEl.innerHTML = `<div class="loading">Wczytywanie danych postaci…</div>`;
    [rules] = await Promise.all([loadRules()]);
    const ids = await loadCharacterRegistry();
    characters = await loadAllCharacters(ids);
    renderFilters();
    renderList();
    const requested = location.hash.replace("#","");
    selectCharacter(characters.some(c => c.id===requested) ? requested : (characters.some(c => c.id==="cap") ? "cap" : characters[0].id));
  } catch (error) {
    console.error(error);
    showError(error);
  }
}

searchEl.addEventListener("input", renderList);
document.getElementById("resetBtn").addEventListener("click", () => {
  resetCharacterCounters(activeCharacterId);
  selectCharacter(activeCharacterId);
});
document.getElementById("shortRestBtn").addEventListener("click", () => {
  const character = characters.find(c => c.id === activeCharacterId);
  if (!character) return;
  restCharacter(character, rules, "short");
  selectCharacter(activeCharacterId);
});
document.getElementById("longRestBtn").addEventListener("click", () => {
  const character = characters.find(c => c.id === activeCharacterId);
  if (!character) return;
  restCharacter(character, rules, "long");
  selectCharacter(activeCharacterId);
});

initDiceRoller();
init();
