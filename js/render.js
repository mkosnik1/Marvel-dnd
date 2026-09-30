import { getCounter, setCounter, safeId, getValue, setValue, addHistory, getHistory } from "./state.js";
import { canonicalFeatureDescription, canonicalFeat, canonicalSpell } from "./mechanics-pl.js";

const PB = 3;
const ABILITIES = ["STR","DEX","CON","INT","WIS","CHA"];
let activeView = "combat";

const CLASS_PL = {
  Fighter: "Wojownik", Artificer: "Wynalazca", Paladin: "Paladyn", Barbarian: "Barbarzyńca",
  Monk: "Mnich", Rogue: "Łotrzyk", Wizard: "Czarodziej", Sorcerer: "Zaklinacz",
  Warlock: "Czarnoksiężnik", Ranger: "Łowca", Druid: "Druid"
};

const SUBCLASS_PL = {
  "Battle Master": "Mistrz Bitewny", Champion: "Czempion", Samurai: "Samuraj",
  "Eldritch Knight": "Mistyczny Rycerz", "Psi Warrior": "Wojownik Psioniczny", "Rune Knight": "Rycerz Run", "Echo Knight": "Rycerz Echa",
  Armorer: "Zbrojmistrz", Artillerist: "Artylerzysta", Alchemist: "Alchemik", "Battle Smith": "Kowal Bitewny",
  Assassin: "Zabójca", Thief: "Złodziej", Mastermind: "Mistrz Intryg", Swashbuckler: "Zawadiaka", "Arcane Trickster": "Mistyczny Oszust",
  "School of Abjuration": "Szkoła Ochrony", "School of Evocation": "Szkoła Wywoływania", "School of Illusion": "Szkoła Iluzji",
  "School of Divination": "Szkoła Wróżenia", "School of Enchantment": "Szkoła Zaklinania", "School of Transmutation": "Szkoła Przemian",
  "School of Necromancy": "Szkoła Nekromancji", Bladesinging: "Pieśń Ostrza",
  "Draconic Bloodline": "Smocza Linia Krwi", "Divine Soul": "Boska Dusza", "Storm Sorcery": "Magia Burzy", "Shadow Magic": "Magia Cienia",
  "Wild Magic": "Dzika Magia", "Clockwork Soul": "Mechaniczna Dusza", "Aberrant Mind": "Obcy Umysł",
  Hexblade: "Zaklęte Ostrze", Archfey: "Władca Dziczy", "The Fiend": "Piekielny Patron", "The Great Old One": "Przedwieczny",
  Celestial: "Niebiański Patron", Genie: "Dżin", Undead: "Nieumarły Patron", Undying: "Nieśmiertelny Patron",
  "Oath of Glory": "Przysięga Chwały", "Oath of Vengeance": "Przysięga Zemsty", "Oath of Devotion": "Przysięga Oddania",
  "Oath of the Ancients": "Przysięga Pradawnych", "Oath of Conquest": "Przysięga Podboju",
  "Path of the Giant": "Ścieżka Olbrzyma", "Path of the Berserker": "Ścieżka Berserkera", "Path of the Totem Warrior": "Ścieżka Totemu",
  "Path of the Beast": "Ścieżka Bestii", "Path of Wild Magic": "Ścieżka Dzikiej Magii",
  "Way of the Open Hand": "Droga Otwartej Dłoni", "Way of Shadow": "Droga Cienia", "Way of the Kensei": "Droga Kensei", "Way of Mercy": "Droga Miłosierdzia",
  "Gloom Stalker": "Tropiciel Mroku", Hunter: "Łowca", "Monster Slayer": "Pogromca Potworów", "Horizon Walker": "Wędrowiec Horyzontu", "Beast Master": "Władca Bestii",
  "Circle of the Moon": "Krąg Księżyca", "Circle of the Land": "Krąg Ziemi", "Circle of Stars": "Krąg Gwiazd", "Circle of Wildfire": "Krąg Dzikiego Ognia"
};

const BACKGROUND_PL = {
  Soldier: "Żołnierz", "Guild Artisan": "Cechowy Rzemieślnik", Noble: "Szlachcic", Sage: "Mędrzec", Criminal: "Przestępca",
  "Haunted One": "Nawiedzony", Charlatan: "Szarlatan", Hermit: "Pustelnik", "Far Traveler": "Przybysz z Daleka",
  Outlander: "Wędrowiec", Entertainer: "Artysta", Investigator: "Śledczy", "Mercenary Veteran": "Weteran Najemników"
};

const ALIGNMENT_PL = {
  "Lawful Good": "Praworządny Dobry", "Neutral Good": "Neutralny Dobry", "Chaotic Good": "Chaotyczny Dobry",
  "Lawful Neutral": "Praworządny Neutralny", Neutral: "Neutralny", "True Neutral": "Neutralny", "Chaotic Neutral": "Chaotyczny Neutralny",
  "Lawful Evil": "Praworządny Zły", "Neutral Evil": "Neutralny Zły", "Chaotic Evil": "Chaotyczny Zły"
};

const TERM_REPLACEMENTS = [
  ["Super-Soldier Physiology", "Fizjologia superżołnierza"], ["Vibranium Shield", "Tarcza z vibranium"],
  ["Repulsor Flight", "Lot repulsorowy"], ["Lightning Launcher", "Działo elektryczne"], ["Thunder Gauntlet", "Rękawica uderzeniowa"],
  ["Cloak of Levitation", "Peleryna Lewitacji"], ["Soulsword", "Miecz Duszy"], ["Darkchylde", "Darkchylde"],
  ["Improved Pact Weapon", "Wzmocniony Miecz Duszy"], ["Thirsting Blade", "Mistrzostwo Miecza Duszy"], ["Eldritch Smite", "Uderzenie w duszę"],
  ["Hexblade's Curse", "Przebudzenie Darkchylde"], ["Pact of the Blade", "Więź z Mieczem Duszy"], ["Pact Magic", "Magia źródła"],
  ["Shield Master", "Mistrz tarczy"], ["Inspiring Leader", "Inspirujący dowódca"], ["War Caster", "Mag bojowy"],
  ["Fey Touched", "Dotknięty magią"], ["Telekinetic", "Telekineta"], ["Telepathic", "Telepata"], ["Sharpshooter", "Strzelec wyborowy"],
  ["Great Weapon Master", "Mistrz ciężkiej broni"], ["Polearm Master", "Mistrz broni drzewcowej"], ["Crossbow Expert", "Ekspert kuszy"],
  ["Dual Wielder", "Mistrz dwóch broni"], ["Martial Adept", "Adept walki"], ["Fighting Initiate", "Adept stylu walki"],
  ["Magic Initiate", "Adept magii"], ["Metamagic Adept", "Adept metamagii"], ["Skill Expert", "Ekspert umiejętności"],
  ["Resilient", "Odporny"], ["Crusher", "Miażdżący styl"], ["Tough", "Wytrzymały"], ["Alert", "Czujny"], ["Mobile", "Mobilny"],
  ["Athlete", "Atleta"], ["Sentinel", "Strażnik"], ["Gunner", "Strzelec"], ["Lucky", "Szczęściarz"],
  ["Trip Attack", "Atak obalający"], ["Precision Attack", "Precyzyjny atak"], ["Bait and Switch", "Zamiana pozycji"],
  ["Second Wind", "Zryw adrenaliny"], ["Action Surge", "Eksplozja tempa"], ["Superiority Dice", "kości manewrów"], ["Superiority Die", "kość manewru"],
  ["Arcane Recovery", "Odzyskanie koncentracji"], ["Arcane Ward", "Mistyczna osłona"], ["Abjuration", "magia ochronna"],
  ["Magical Tinkering", "Improwizacja technologiczna"], ["Infuse Item", "Ulepszanie sprzętu"], ["Enhanced Defense", "Wzmocniona obrona"],
  ["Mind Sharpener", "Stabilizator koncentracji"], ["Homunculus Servant", "Dron pomocniczy"], ["Replicate Magic Item: Bag of Holding", "Kieszeń wymiarowa"],
  ["Constructed Resilience", "Systemy podtrzymywania życia"], ["Sentry's Rest", "Tryb czuwania"], ["Integrated Protection", "Zintegrowana ochrona"],
  ["Mage Hand", "Astralna dłoń"], ["Absorb Elements", "Pochłonięcie żywiołu"], ["Mage Armor", "Mistyczny pancerz"], ["Magic Missile", "Pociski energii"],
  ["Hold Person", "Mistyczne więzy"], ["Mirror Image", "Astralne odbicia"], ["Misty Step", "Krótki portal"], ["Counterspell", "Przerwanie mocy"],
  ["Dispel Magic", "Rozproszenie magii"], ["Hypnotic Pattern", "Hipnotyczny glif"], ["Eldritch Blast", "Pocisk energii"], ["Armor of Agathys", "Pancerz energii"],
  ["Protection from Evil and Good", "Ochrona przed istotami nadnaturalnymi"], ["Thunder Step", "Wielki portal"], ["Detect Magic", "Wyczucie magii"], ["Detect Thoughts", "Wykrycie myśli"],
  ["Fire Bolt", "Pocisk ognia"], ["Ray of Frost", "Promień mrozu"], ["Cure Wounds", "Leczenie ran"], ["Healing Word", "Słowo leczenia"],
  ["Guiding Bolt", "Pocisk światła"], ["Sacred Flame", "Święty płomień"], ["Lesser Restoration", "Pomniejsze odnowienie"], ["Spiritual Weapon", "Duchowa broń"],
  ["Scorching Ray", "Palące promienie"], ["Burning Hands", "Płonące dłonie"], ["Lightning Bolt", "Błyskawica"], ["Chromatic Orb", "Kula żywiołu"],
  ["Ice Knife", "Lodowe ostrze"], ["Pass without Trace", "Przejście bez śladu"], ["Hunter's Mark", "Piętno łowcy"], ["Spike Growth", "Kolczasty teren"],
  ["Call Lightning", "Przywołanie błyskawicy"], ["Heat Metal", "Rozgrzanie metalu"], ["Faerie Fire", "Świetlista aura"], ["Minor Illusion", "Drobna iluzja"],
  ["Mind Sliver", "Odłamek umysłu"], ["Chill Touch", "Dotyk grobu"], ["Toll the Dead", "Dzwon śmierci"], ["Booming Blade", "Grzmiące ostrze"], ["Green-Flame Blade", "Ostrze zielonego płomienia"],
  ["Attack Action", "Akcja Ataku"], ["Bonus Action", "akcja dodatkowa"], ["Opportunity Attacks", "ataki okazyjne"], ["Opportunity Attack", "atak okazyjny"],
  ["Short or Long Rest", "krótkim lub długim odpoczynku"], ["Short/Long Rest", "krótki/długi odpoczynek"], ["Short Rest", "krótki odpoczynek"], ["Long Rest", "długi odpoczynek"],
  ["Temporary HP", "tymczasowe PW"], ["Flying Speed", "szybkość lotu"], ["Spell Save DC", "ST rzutu obronnego przeciw mocy"], ["Spell Attack", "premia do ataku mocą"],
  ["Maneuver Save DC", "ST rzutu obronnego przeciw manewrowi"], ["STR Save", "rzut obronny na Siłę"], ["DEX Save", "rzut obronny na Zręczność"],
  ["CON Save", "rzut obronny na Kondycję"], ["INT Save", "rzut obronny na Inteligencję"], ["WIS Save", "rzut obronny na Mądrość"], ["CHA Save", "rzut obronny na Charyzmę"],
  ["saving throws", "rzuty obronne"], ["saving throw", "rzut obronny"], ["attack rolls", "rzuty ataku"], ["attack roll", "rzut ataku"],
  ["damage rolls", "rzuty obrażeń"], ["damage roll", "rzut obrażeń"], ["spell slots", "komórki mocy"], ["spell slot", "komórkę mocy"], ["spellbook", "księga zaklęć"],
  ["Proficiency bonus", "premia z biegłości"], ["proficiency bonus", "premia z biegłości"], ["Proficiency", "biegłość"], ["proficiency", "biegłość"],
  ["Advantage", "przewagę"], ["advantage", "przewagę"], ["Disadvantage", "utrudnienie"], ["disadvantage", "utrudnienie"], ["Concentration", "koncentracja"], ["concentration", "koncentracja"],
  ["Reaction", "Reakcja"], ["Action", "Akcja"], ["Charmed", "zauroczony"], ["Frightened", "przerażony"], ["Paralyzed", "sparaliżowany"], ["Incapacitated", "obezwładniony"],
  ["Restrained", "unieruchomiony"], ["Grappled", "pochwycony"], ["Stunned", "ogłuszony"], ["Prone", "powalony"], ["Poisoned", "zatruty"], ["Unconscious", "nieprzytomny"],
  ["resistance", "odporność"], ["Resistance", "odporność"], ["force damage", "obrażenia od energii"], ["psychic damage", "obrażenia psychiczne"],
  ["necrotic damage", "obrażenia nekrotyczne"], ["radiant damage", "obrażenia promieniste"], ["thunder damage", "obrażenia od grzmotu"], ["lightning damage", "obrażenia od elektryczności"],
  ["fire damage", "obrażenia od ognia"], ["cold damage", "obrażenia od zimna"], ["acid damage", "obrażenia od kwasu"], ["poison damage", "obrażenia od trucizny"],
  ["bludgeoning", "obuchowe"], ["piercing", "kłute"], ["slashing", "cięte"], ["necrotic", "nekrotyczne"], ["radiant", "promieniste"], ["psychic", "psychiczne"],
  ["thunder", "od grzmotu"], ["lightning", "od elektryczności"], ["fire", "od ognia"], ["cold", "od zimna"], ["acid", "od kwasu"], ["poison", "od trucizny"], ["force", "od energii"],
  ["melee", "wręcz"], ["ranged", "dystans"], ["thrown", "rzut"], ["willing", "chętnego"], ["Huge", "Ogromny"], ["Large", "Duży"], ["Medium", "Średni"], ["Small", "Mały"], ["Tiny", "Malutki"],
  ["Magic weapon", "magiczna broń"], ["Unarmed Strike", "Atak bez broni"], ["Combat Knife", "Nóż bojowy"], ["Shield, thrown", "Rzut tarczą"],
  ["Cantrip", "Sztuczka"], ["feat", "atut"], ["Feats", "Atuty"], ["featów", "atutów"], ["homebrew", "zasada własna"], ["English", "angielski"],
  ["Tinker's Tools", "narzędzia majsterkowicza"], ["Smith's Tools", "narzędzia kowala"], ["Thieves' Tools", "narzędzia złodziejskie"],
  ["Vehicles (land)", "pojazdy lądowe"], ["Vehicles (air)", "pojazdy powietrzne"], ["Playing Cards", "karty do gry"], ["Cartographer's Tools", "narzędzia kartografa"],
  ["Disguise Kit", "zestaw do charakteryzacji"], ["Forgery Kit", "zestaw fałszerski"], ["Herbalism Kit", "zestaw zielarski"], ["Gaming Set", "zestaw do gry"],
  ["Musical Instrument", "instrument muzyczny"], ["Artisan's Tools", "narzędzia rzemieślnicze"], ["modifier", "modyfikator"], ["infusions", "ulepszenia"], ["infusion", "ulepszenie"],
  ["Light", "lekki"], ["Heavy", "ciężki"], ["Simple", "prosta"], ["Martial", "wojskowa"], ["Longsword", "długi miecz"], ["Shortsword", "krótki miecz"],
  ["Rapier", "rapier"], ["Dagger", "sztylet"], ["Dart", "rzutka"], ["Sling", "proca"], ["Quarterstaff", "kij"], ["Light Crossbow", "lekka kusza"],
  ["Hand Crossbow", "kusza ręczna"], ["Shortbow", "krótki łuk"], ["Longbow", "długi łuk"], ["Club", "pałka"], ["Javelin", "oszczep"], ["Mace", "buława"], ["Scimitar", "sejmitar"], ["Sickle", "sierp"], ["Spear", "włócznia"],
  ["Guardian", "Strażnik"], [" ft", " stóp"]
];

function mod(score){ return Math.floor((score - 10) / 2); }
function fmt(value){ return value >= 0 ? `+${value}` : String(value); }
function className(value){ return CLASS_PL[value] || translateGameText(value); }
function subclassName(value){ return SUBCLASS_PL[value] || translateGameText(value); }
function backgroundName(value){ return BACKGROUND_PL[value] || translateGameText(value); }
function alignmentName(value){ return ALIGNMENT_PL[value] || translateGameText(value); }

function translateGameText(value){
  if (value === null || value === undefined) return "";
  let text = String(value);
  for (const [from,to] of TERM_REPLACEMENTS) text = text.split(from).join(to);
  return text;
}

function reskinOnlyName(value){
  const text = String(value || "");
  if (!text.includes(" / ")) return translateGameText(text);
  const parts = text.split(" / ").map(x => x.trim()).filter(Boolean);
  return translateGameText(parts[parts.length - 1]);
}

function featureName(item){
  let name = item?.name || "Cecha";
  if (item?.rulesName && name.includes(item.rulesName)) name = name.replace(item.rulesName, "").replace(/[:\-–—]\s*$/, "").trim();
  return translateGameText(name);
}

function featureDescription(item){
  return translateGameText(canonicalFeatureDescription(item?.rulesName, item?.description || ""));
}

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

function diceExpression(value){
  const match = String(value || "").match(/(\d*)[dk](\d+)(?:\s*([+-])\s*(\d+))?/i);
  if (!match) return "";
  const count = match[1] || "1";
  const modifier = match[3] ? `${match[3]}${match[4]}` : "";
  return `${count}d${match[2]}${modifier}`;
}

function effectDiceExpression(value){
  const text = String(value || "");
  const explicit = text.match(/\d+[dk]\d+(?:\s*[+-]\s*\d+)?/i);
  if (explicit) return diceExpression(explicit[0]);
  const namedDie = text.match(/koś(?:ć|ci)\s+(?:\w+\s+)?[dk](\d+)/i);
  return namedDie ? `1d${namedDie[1]}` : "";
}

function rollButton(expression, label, text="Rzuć kością"){
  if (!expression) return "";
  return `<button class="inline-roll" data-roll="${escapeAttr(expression)}" data-roll-label="${escapeAttr(label)}">🎲 ${text}</button>`;
}

function skillDisplayName(character, skill, rules){
  return character.skillAliases?.[skill] || rules.skillAliasDefault[skill] || rules.skillPL[skill] || skill;
}

function skillTooltip(character, skill, rules){
  const ability = rules.skillAbility[skill];
  const alias = skillDisplayName(character, skill, rules);
  return `${alias} (${rules.abilityPL[ability]}). ${rules.skillTooltips[skill]}`;
}

function card(title, body, full=false){ return `<section class="card ${full ? "full" : ""}"><div class="card-head"><h3>${title}</h3></div><div class="card-body">${body}</div></section>`; }
function rows(items){ return `<div class="rows">${items.map(([k,v]) => `<div class="row"><div class="k">${k}</div><div class="v">${translateGameText(v)}</div></div>`).join("")}</div>`; }
function rollableRows(items){ return `<div class="rows">${items.map(([k,v,expression]) => `<div class="row"><div class="k">${k}</div><div class="v">${translateGameText(v)} ${rollButton(expression, k, "Rzuć")}</div></div>`).join("")}</div>`; }
function features(items){
  if (!items?.length) return `<div class="note">Brak danych.</div>`;
  return items.map(item => {
    const name = featureName(item), description = featureDescription(item);
    return `<div class="feature"><h4>${name}</h4><p>${description}</p>${rollButton(effectDiceExpression(description), name)}</div>`;
  }).join("");
}

function featList(character){
  const details = character.featDetails || [];
  if (details.length) return details.map(item => {
    const canonical = canonicalFeat(item.name);
    const name = canonical?.name || translateGameText(item.name);
    const description = canonical?.description || translateGameText(item.description);
    return `<div class="feature"><h4>${name}</h4><p>${translateGameText(description)}</p>${rollButton(effectDiceExpression(description), name)}</div>`;
  }).join("");
  if (!character.feats?.length) return `<div class="note">Brak atutów.</div>`;
  return character.feats.map(feat => {
    const canonical = canonicalFeat(feat);
    const name = canonical?.name || translateGameText(feat);
    const description = canonical?.description || "Pełny efekt tego atutu jest opisany w odpowiedniej cesze rozwoju postaci.";
    return `<div class="feature"><h4>${name}</h4><p>${description}</p>${rollButton(effectDiceExpression(description), name)}</div>`;
  }).join("");
}

function skillTable(character, rules){
  const names = Object.keys(rules.skillAbility);
  const header = `<div class="skill-header"><div>Umiejętność</div><div>Cecha</div><div>Premia</div><div>Wyszkolenie</div></div>`;
  const body = names.map(skill => {
    const exp = character.expertise.includes(skill), prof = character.skillProfs.includes(skill), ability = rules.skillAbility[skill];
    const name = skillDisplayName(character, skill, rules), bonus = skillBonus(character, skill, rules);
    return `<div class="skill-row"><strong><span class="skill-label" tabindex="0" data-tip="${escapeAttr(skillTooltip(character, skill, rules))}">${name} <span class="info">i</span></span></strong><div class="ability">${rules.abilityPL[ability]}</div><div class="bonus">${rollButton(`1d20${bonus >= 0 ? "+" : ""}${bonus}`, name, fmt(bonus))}</div><div class="status">${exp ? '<span class="tag exp">Ekspertyza</span>' : prof ? '<span class="tag prof">Biegłość</span>' : '—'}</div></div>`;
  }).join("");
  return `<div class="skill-help">Nazwy umiejętności są dopasowane do realiów Marvela. Najedź na nazwę, aby zobaczyć dokładnie, kiedy wykonujesz dany test, co możesz nim osiągnąć i jakie są jego ograniczenia.</div><div class="skill-grid">${header}${body}</div>`;
}

function attackList(character){
  if (!character.attacks?.length) return `<div class="note">Brak osobnych ataków.</div>`;
  return character.attacks.map(a => {
    const spell = canonicalSpell(a[0]);
    const name = spell?.name || translateGameText(a[0]);
    const attackBonus = String(a[1] || "").match(/(?:premia do trafienia\s*:\s*)?([+-]\d+)/i)?.[1];
    const attackModifier = attackBonus === undefined ? null : Number(attackBonus);
    const damageDice = String(a[2] || "").match(/\d+[dk]\d+(?:\s*[+-]\s*\d+)?/i)?.[0]?.replace(/k/i,"d");
    const attackRoll = attackModifier === null ? "" : `<button data-roll="1d20${attackModifier >= 0 ? "+" : ""}${attackModifier}" data-roll-label="${escapeAttr(name)}: rzut ataku">Rzut ataku</button>`;
    const damageRoll = damageDice ? `<button data-roll="${damageDice}" data-roll-label="${escapeAttr(name)}: obrażenia">Obrażenia</button>` : "";
    return `<article class="attack"><div class="attack-name"><strong>${name}</strong><small>${translateGameText(a[3])}</small></div><div class="attack-value"><span>Trafienie</span><b>${translateGameText(a[1])}</b></div><div class="attack-value"><span>Obrażenia</span><b>${translateGameText(a[2])}</b></div>${attackRoll || damageRoll ? `<div class="attack-rolls">${attackRoll}${damageRoll}</div>` : ""}</article>`;
  }).join("");
}

function spellList(character, rules){
  if (!character.spellsDetailed?.length) return `<div class="note">Brak osobnych mocy aktywnych.</div>`;
  return character.spellsDetailed.map(spell => {
    const canonical = canonicalSpell(spell.name);
    const name = spell.flavorName || canonical?.name || translateGameText(spell.name);
    const description = canonical?.description || translateGameText(spell.description);
    const ability = rules.spellAbility?.[character.cls];
    const attackBonus = ability ? mod(character.stats[ability]) + PB : null;
    const requiresAttack = /(spell attack|rzut ataku|atak mocą|ranged attack|melee attack)/i.test(description);
    const attackRoll = requiresAttack && attackBonus !== null ? rollButton(`1d20${attackBonus >= 0 ? "+" : ""}${attackBonus}`, `${name}: rzut ataku`, "Rzut ataku") : "";
    const effectRoll = rollButton(effectDiceExpression(description), `${name}: efekt`, "Rzut efektu");
    return `<div class="spell"><div><span class="tag level">${translateGameText(spell.levelLabel)}</span></div><strong>${translateGameText(name)}</strong><div class="desc">${translateGameText(description)}<div class="spell-rolls">${attackRoll}${effectRoll}</div></div></div>`;
  }).join("");
}

function resourceList(character){
  if (!character.resources?.length) return `<div class="note">Brak osobnej puli zasobów do śledzenia.</div>`;
  return `<div class="resource-grid">${character.resources.map((resource, index) => {
    const key = `${character.id}:resource:${index}`;
    const name = reskinOnlyName(resource.name);
    const current = resource.max !== null && resource.max !== undefined ? getCounter(key, resource.max) : null;
    const expression = effectDiceExpression(resource.description) || diceExpression(resource.unit);
    const counter = resource.max !== null && resource.max !== undefined
      ? `<div class="resource-controls"><button class="use-resource" data-counter-key="${key}" data-counter-label="${escapeAttr(name)}" data-max="${resource.max}" data-delta="-1" ${expression ? `data-roll="${expression}" data-roll-label="${escapeAttr(name)}"` : ""} ${current <= 0 ? "disabled" : ""}>${expression ? "Użyj i wybierz rzut" : "Użyj"}</button><div class="counter"><button data-counter-key="${key}" data-counter-label="${escapeAttr(name)}" data-max="${resource.max}" data-delta="-1" ${current <= 0 ? "disabled" : ""}>−</button><span class="value" id="${safeId(key)}">${current} / ${resource.max}${resource.unit ? ` ${translateGameText(resource.unit)}` : ""}</span><button data-counter-key="${key}" data-counter-label="${escapeAttr(name)}" data-max="${resource.max}" data-delta="1" ${current >= resource.max ? "disabled" : ""}>+</button></div></div>`
      : "";
    return `<div class="resource"><div class="resource-top"><h4>${name}</h4><span class="recharge">${translateGameText(resource.recharge || "")}</span></div><p>${translateGameText(resource.description || "")}</p>${counter}</div>`;
  }).join("")}</div>`;
}

function spellSlotList(character){
  if (!character.spellSlotsDetailed?.length) return `<div class="note">Ta postać nie korzysta z komórek mocy.</div>`;
  return `<div class="slot-grid">${character.spellSlotsDetailed.map(slot => {
    const key = `${character.id}:slot:${slot.level}`;
    const label = `Komórki mocy ${slot.level}. poziomu`;
    const current = getCounter(key, slot.max);
    return `<div class="slot"><strong>${label}</strong><small>${translateGameText(slot.recharge)}</small><button class="use-resource" data-counter-key="${key}" data-counter-label="${label}" data-max="${slot.max}" data-delta="-1" ${current <= 0 ? "disabled" : ""}>Użyj komórki</button><div class="counter"><button data-counter-key="${key}" data-counter-label="${label}" data-max="${slot.max}" data-delta="-1" ${current <= 0 ? "disabled" : ""}>−</button><span class="value" id="${safeId(key)}">${current} / ${slot.max}</span><button data-counter-key="${key}" data-counter-label="${label}" data-max="${slot.max}" data-delta="1" ${current >= slot.max ? "disabled" : ""}>+</button></div></div>`;
  }).join("")}</div>`;
}

function profRows(character, rules){
  const profs = rules.classProfs[character.cls] || ["—","—"];
  return [
    ["Pochodzenie", character.race],
    ["Klasa", `${className(character.cls)} 5`],
    ["Specjalizacja", subclassName(character.subclass)],
    ["Przeszłość", backgroundName(character.background)],
    ["Drużyna", character.team || "—"],
    ["Pancerze", profs[0]],
    ["Broń", profs[1]],
    ["Narzędzia", character.tools || rules.bgTools[character.background] || "—"],
    ["Języki", character.languages || "angielski"]
  ];
}

function backgroundCard(character, rules){
  const desc = rules.backgroundDesc?.[character.background];
  if (!desc) return "";
  return card("Przeszłość", `<div class="feature"><h4>${backgroundName(character.background)}</h4><p>${translateGameText(desc)}</p></div>`, true);
}

function historyList(characterId) {
  const history = getHistory(characterId);
  if (!history.length) return `<div class="note">Historia pojawi się po zużyciu zasobu, zmianie PW albo odpoczynku.</div>`;
  return `<ol class="history-list">${history.slice(0, 12).map(item => {
    const date = new Date(item.at);
    const time = Number.isNaN(date.getTime()) ? "" : date.toLocaleString("pl-PL", { day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" });
    return `<li><span class="history-dot ${item.kind || "change"}"></span><div><strong>${item.label}</strong><small>${item.detail || ""}</small></div><time>${time}</time></li>`;
  }).join("")}</ol>`;
}

function combatTracker(character, rules) {
  const maxHp = hp(character, rules);
  const currentHp = getValue(`${character.id}:hp`, maxHp, 0, maxHp);
  const temporaryHp = getValue(`${character.id}:temp-hp`, 0, 0, 999);
  return `<section class="combat-dashboard card full">
    <div class="health-block">
      <div class="health-title"><span>Punkty wytrzymałości</span><strong id="currentHpValue">${currentHp}</strong><b>/ ${maxHp}</b></div>
      <div class="health-bar"><i id="healthBar" style="width:${Math.round(currentHp / maxHp * 100)}%"></i></div>
      <div class="health-actions"><button data-hp-delta="-5">−5</button><button data-hp-delta="-1">−1</button><button data-hp-delta="1">+1</button><button data-hp-delta="5">+5</button></div>
    </div>
    <div class="temp-hp-block"><span>Tymczasowe PW</span><strong id="tempHpValue">${temporaryHp}</strong><div class="health-actions"><button data-temp-hp-delta="-1">−</button><button data-temp-hp-delta="1">+</button></div></div>
    <div class="combat-facts"><div><span>KP</span><strong>${character.ac}</strong></div><div><span>Inicjatywa</span><strong>${fmt(initiative(character))}</strong><button class="mini-roll" data-roll="1d20${initiative(character) >= 0 ? "+" : ""}${initiative(character)}" data-roll-label="${escapeAttr(character.name)}: inicjatywa">Rzuć</button></div><div><span>Szybkość</span><strong>${character.speed} stóp</strong></div></div>
  </section>`;
}

function setView(view) {
  activeView = view;
  document.querySelectorAll("[data-view-panel]").forEach(panel => { panel.hidden = panel.dataset.viewPanel !== view; });
  document.querySelectorAll("[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === view));
}

export function restCharacter(character, rules, type) {
  let restored = 0;
  character.resources?.forEach((resource, index) => {
    if (resource.max === null || resource.max === undefined) return;
    const recharge = String(resource.recharge || "").toLowerCase();
    if (type === "long" || recharge.includes("short") || recharge.includes("krót")) {
      const key = `${character.id}:resource:${index}`;
      if (getCounter(key, resource.max) !== resource.max) restored += 1;
      setCounter(key, resource.max, resource.max);
    }
  });
  character.spellSlotsDetailed?.forEach(slot => {
    const recharge = String(slot.recharge || "").toLowerCase();
    if (type === "long" || recharge.includes("short") || recharge.includes("krót")) {
      const key = `${character.id}:slot:${slot.level}`;
      if (getCounter(key, slot.max) !== slot.max) restored += 1;
      setCounter(key, slot.max, slot.max);
    }
  });
  if (type === "long") {
    setValue(`${character.id}:hp`, hp(character, rules), 0, hp(character, rules));
    setValue(`${character.id}:temp-hp`, 0, 0, 999);
  }
  const detail = type === "long"
    ? `Przywrócono pełne PW i odnowiono ${restored} pul(e) zasobów.`
    : restored ? `Odnowiono ${restored} pul(e) zasobów.` : "Wszystkie odpowiednie zasoby były pełne.";
  addHistory(character.id, { kind:"rest", label: type === "long" ? "Długi odpoczynek" : "Krótki odpoczynek", detail });
}

export function renderCharacter(character, rules, heroEl, contentEl){
  const maxHp = hp(character, rules);
  const currentHp = getValue(`${character.id}:hp`, maxHp, 0, maxHp);
  heroEl.innerHTML = `<div class="eyebrow">${character.group} • poziom 5 • 6500 PD</div><h2>${character.name}</h2><div class="real">${character.realName}</div><div class="chips"><span class="chip">Pochodzenie: ${character.race}</span><span class="chip">${className(character.cls)} 5</span><span class="chip">${subclassName(character.subclass)}</span>${character.team ? `<span class="chip">${character.team}</span>` : ""}<span class="chip">${alignmentName(character.alignment)}</span></div><div class="stats">${ABILITIES.map(a => `<button class="stat rollable-stat" data-roll="1d20${mod(character.stats[a]) >= 0 ? "+" : ""}${mod(character.stats[a])}" data-roll-label="${escapeAttr(character.name)}: ${rules.abilityPL[a]}"><span class="lab">${rules.abilityPL[a]}</span><span class="score">${character.stats[a]}</span><span class="mod">${fmt(mod(character.stats[a]))}</span></button>`).join("")}</div><div class="quick"><div class="q"><span>KP</span><strong>${character.ac}</strong></div><div class="q hp-summary"><span>PW</span><strong>${currentHp} / ${maxHp}</strong></div><div class="q"><span>Szybkość</span><strong>${character.speed} stóp</strong></div><div class="q"><span>Inicjatywa</span><strong>${fmt(initiative(character))}</strong></div><div class="q"><span>Biegłość</span><strong>+3</strong></div><div class="q"><span>Kości wytrzymałości</span><strong>5k${rules.hitdie[character.cls]}</strong></div></div>`;
  const saves = ABILITIES.map(a => {
    const bonus = saveBonus(character, a);
    return [rules.abilityPL[a], `${fmt(bonus)}${character.saveProfs.includes(a) ? " • biegłość" : ""}`, `1d20${bonus >= 0 ? "+" : ""}${bonus}`];
  });
  contentEl.innerHTML = `<div class="view-grid" data-view-panel="combat">
      ${combatTracker(character, rules)}
      ${card("Ataki", attackList(character), true)}
      ${card("Zasoby", resourceList(character), true)}
      ${card("Komórki mocy", spellSlotList(character), true)}
      ${card("Moce aktywne", spellList(character, rules), true)}
      ${card("Historia użycia", `<div id="resourceHistory">${historyList(character.id)}</div>`, true)}
    </div>
    <div class="view-grid" data-view-panel="abilities">
      ${card("Pochodzenie i cechy wrodzone", features(character.originFeatures), true)}
      ${card("Cechy bohatera", features(character.classFeaturesDetailed), true)}
      ${card("Specjalizacja", features(character.subclassFeaturesDetailed), true)}
      ${card("Atuty", featList(character))}
      ${card("Moce i wyposażenie", character.marvel?.length ? character.marvel.map(x => { const name = reskinOnlyName(x[0]); return `<div class="feature"><h4>${name} <span class="tag">zasada własna</span></h4><p>${translateGameText(x[1])}</p>${rollButton(effectDiceExpression(x[1]), name)}</div>`; }).join("") : `<div class="note">Brak dodatkowych zasad własnych.</div>`)}
    </div>
    <div class="view-grid" data-view-panel="sheet">
      ${card("Rzuty obronne", rollableRows(saves))}
      ${card("Wartości pasywne", rows([["Pasywna czujność",passive(character,"Perception",rules)],["Pasywna analiza",passive(character,"Investigation",rules)],["Pasywne profilowanie",passive(character,"Insight",rules)]]))}
      ${card("Umiejętności", skillTable(character,rules), true)}
      ${backgroundCard(character, rules)}
      ${card("Biegłości i informacje", rows(profRows(character,rules)), true)}
    </div>`;

  document.getElementById("gameTabs").querySelectorAll("[data-view]").forEach(button => button.onclick = () => setView(button.dataset.view));
  setView(activeView);

  const refreshHistory = () => { const target = document.getElementById("resourceHistory"); if (target) target.innerHTML = historyList(character.id); };

  contentEl.querySelectorAll("[data-hp-delta], [data-temp-hp-delta]").forEach(button => {
    button.addEventListener("click", () => {
      const isTemp = button.hasAttribute("data-temp-hp-delta");
      const delta = Number(isTemp ? button.dataset.tempHpDelta : button.dataset.hpDelta);
      const key = `${character.id}:${isTemp ? "temp-hp" : "hp"}`;
      const maximum = isTemp ? 999 : maxHp;
      const before = getValue(key, isTemp ? 0 : maxHp, 0, maximum);
      const next = setValue(key, before + delta, 0, maximum);
      if (before === next) return;
      addHistory(character.id, { kind: delta < 0 ? "spent" : "restored", label: isTemp ? "Tymczasowe PW" : "Punkty wytrzymałości", detail: `${before} → ${next}` });
      document.getElementById(isTemp ? "tempHpValue" : "currentHpValue").textContent = next;
      if (!isTemp) {
        document.getElementById("healthBar").style.width = `${Math.round(next / maxHp * 100)}%`;
        const summary = heroEl.querySelector(".hp-summary strong"); if (summary) summary.textContent = `${next} / ${maxHp}`;
      }
      refreshHistory();
    });
  });

  contentEl.querySelectorAll("[data-counter-key]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.counterKey;
      const max = Number(button.dataset.max);
      const delta = Number(button.dataset.delta);
      const before = getCounter(key,max);
      const next = setCounter(key, max, before + delta);
      if (before === next) return;
      const target = document.getElementById(safeId(key));
      const resource = character.resources?.find((_,i) => `${character.id}:resource:${i}` === key);
      target.textContent = `${next} / ${max}${resource?.unit ? ` ${translateGameText(resource.unit)}` : ""}`;
      contentEl.querySelectorAll(`[data-counter-key="${key}"]`).forEach(control => {
        const controlDelta = Number(control.dataset.delta);
        control.disabled = (controlDelta < 0 && next <= 0) || (controlDelta > 0 && next >= max);
      });
      addHistory(character.id, { kind: delta < 0 ? "spent" : "restored", label: button.dataset.counterLabel || "Zasób", detail: `${before} → ${next}` });
      refreshHistory();
    });
  });
}
