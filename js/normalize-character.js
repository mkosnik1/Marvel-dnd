const PHRASES = [
  ["Sorcery Points", "punkty magii"],
  ["Sorcery Point", "punkt magii"],
  ["Superiority Dice", "kości manewrów"],
  ["Superiority Die", "kość manewru"],
  ["Temporary Hit Points", "tymczasowe punkty wytrzymałości"],
  ["Temporary HP", "tymczasowe PW"],
  ["Hit Points", "punkty wytrzymałości"],
  ["Spell Save DC", "ST rzutu obronnego przeciw mocy"],
  ["Maneuver Save DC", "ST rzutu obronnego przeciw manewrowi"],
  ["Save DC", "ST rzutu obronnego"],
  ["Spell Attack", "premia do ataku mocą"],
  ["Attack Action", "Akcja Ataku"],
  ["Bonus Action", "akcja dodatkowa"],
  ["Opportunity Attacks", "ataki okazyjne"],
  ["Opportunity Attack", "atak okazyjny"],
  ["Long Rest", "długi odpoczynek"],
  ["Short Rest", "krótki odpoczynek"],
  ["Long or Short Rest", "długi lub krótki odpoczynek"],
  ["Short or Long Rest", "krótki lub długi odpoczynek"],
  ["Long/Short Rest", "długi/krótki odpoczynek"],
  ["Short/Long Rest", "krótki/długi odpoczynek"],
  ["saving throws", "rzuty obronne"],
  ["saving throw", "rzut obronny"],
  ["attack rolls", "rzuty ataku"],
  ["attack roll", "rzut ataku"],
  ["damage rolls", "rzuty obrażeń"],
  ["damage roll", "rzut obrażeń"],
  ["ability checks", "testy cech"],
  ["ability check", "test cechy"],
  ["spell slots", "komórki mocy"],
  ["spell slot", "komórka mocy"],
  ["Flying Speed", "szybkość lotu"],
  ["walking speed", "szybkość poruszania się"],
  ["unarmed strikes", "ataki bez broni"],
  ["Unarmed Strikes", "Ataki bez broni"],
  ["Unarmed Strike", "Atak bez broni"],
  ["unarmed strike", "atak bez broni"],
  ["martial weapons", "broń wojskowa"],
  ["simple weapons", "broń prosta"],
  ["Magic weapon", "Magiczna broń"],
  ["magic weapon", "magiczna broń"],
  ["half plate", "półpłytowy pancerz"],
  ["medium armor", "średni pancerz"],
  ["heavy armor", "ciężki pancerz"],
  ["light armor", "lekki pancerz"],
  ["difficult terrain", "trudny teren"],
  ["critical hit", "trafienie krytyczne"],
  ["critical hits", "trafienia krytyczne"],
  ["spellcasting focus", "skupienie mocy"],
  ["spellcasting", "używanie mocy"],
  ["Pact Weapon", "związana broń"],
  ["Pact Magic", "magia źródła"],
  ["Eldritch Invocations", "stałe ulepszenia mocy"],
  ["Eldritch Invocation", "stałe ulepszenie mocy"],
  ["Ability Score Improvement", "rozwój cech"],
  ["Fighting Style", "styl walki"],
  ["Second Wind", "Zryw adrenaliny"],
  ["Action Surge", "Eksplozja tempa"],
  ["Flurry of Blows", "Grad Ciosów"],
  ["Patient Defense", "Cierpliwa Obrona"],
  ["Step of the Wind", "Krok Wiatru"],
  ["Stunning Strike", "Ogłuszające Uderzenie"],
  ["Sneak Attack", "Precyzyjne Uderzenie"],
  ["Cunning Action", "Szybkie Działanie"],
  ["Uncanny Dodge", "Instynktowny Unik"],
  ["Arcane Recovery", "Odzyskanie koncentracji"],
  ["Arcane Ward", "Mistyczna osłona"],
  ["Divine Smite", "Potężne uderzenie"],
  ["Lay on Hands", "Uzdrawiający dotyk"],
  ["Wild Shape", "Przemiana"],
  ["Hunter's Mark", "Piętno łowcy"],
  ["Misty Step", "Krótki portal"],
  ["Thunder Step", "Wielki portal"],
  ["Counterspell", "Przerwanie mocy"],
  ["Dispel Magic", "Rozproszenie magii"],
  ["Detect Magic", "Wyczucie magii"],
  ["Detect Thoughts", "Wykrycie myśli"],
  ["Mage Hand", "Astralna dłoń"],
  ["Fire Bolt", "Pocisk ognia"],
  ["Ray of Frost", "Promień mrozu"],
  ["Eldritch Blast", "Pocisk energii"],
  ["Lightning Launcher", "Działo elektryczne"],
  ["Thunder Gauntlet", "Rękawica uderzeniowa"],
  ["Repulsor Flight", "Lot repulsorowy"],
  ["Vibranium Shield", "Tarcza z vibranium"],
  ["Cloak of Levitation", "Peleryna Lewitacji"],
  ["Soulsword", "Miecz Duszy"],
  ["Tinker's Tools", "narzędzia majsterkowicza"],
  ["Smith's Tools", "narzędzia kowala"],
  ["Thieves' Tools", "narzędzia złodziejskie"],
  ["Cartographer's Tools", "narzędzia kartografa"],
  ["Disguise Kit", "zestaw do charakteryzacji"],
  ["Forgery Kit", "zestaw fałszerski"],
  ["Herbalism Kit", "zestaw zielarski"],
  ["Playing Cards", "karty do gry"],
  ["Gaming Set", "zestaw do gry"],
  ["Vehicles (land)", "pojazdy lądowe"],
  ["Vehicles (air)", "pojazdy powietrzne"],
  ["Musical Instrument", "instrument muzyczny"],
  ["Proficiency Bonus", "premia z biegłości"],
  ["proficiency bonus", "premia z biegłości"],
  ["proficiencies", "biegłości"],
  ["proficiency", "biegłość"],
  ["Advantage", "przewaga"],
  ["advantage", "przewaga"],
  ["Disadvantage", "utrudnienie"],
  ["disadvantage", "utrudnienie"],
  ["Concentration", "koncentracja"],
  ["concentration", "koncentracja"],
  ["Reaction", "Reakcja"],
  ["Action", "Akcja"],
  ["Dash", "Sprint"],
  ["Disengage", "Odskok"],
  ["Dodge", "Unik"],
  ["Hide", "Ukrycie"],
  ["Grapple", "Pochwycenie"],
  ["Shove", "Odepchnięcie"],
  ["Charmed", "zauroczony"],
  ["Frightened", "przerażony"],
  ["Paralyzed", "sparaliżowany"],
  ["Incapacitated", "obezwładniony"],
  ["Restrained", "unieruchomiony"],
  ["Grappled", "pochwycony"],
  ["Stunned", "ogłuszony"],
  ["Prone", "powalony"],
  ["Poisoned", "zatruty"],
  ["Unconscious", "nieprzytomny"],
  ["Resistance", "odporność"],
  ["resistance", "odporność"],
  ["vulnerability", "podatność"],
  ["immunity", "niewrażliwość"],
  ["bludgeoning", "obuchowe"],
  ["piercing", "kłute"],
  ["slashing", "cięte"],
  ["necrotic", "nekrotyczne"],
  ["radiant", "promieniste"],
  ["psychic", "psychiczne"],
  ["thunder", "od grzmotu"],
  ["lightning", "od elektryczności"],
  ["fire", "od ognia"],
  ["cold", "od zimna"],
  ["acid", "od kwasu"],
  ["poison", "od trucizny"],
  ["force", "od energii"],
  ["melee", "wręcz"],
  ["ranged", "dystansowy"],
  ["thrown", "rzut"],
  ["willing", "chętny"],
  ["target", "cel"],
  ["rounds", "rundy"],
  ["round", "runda"],
  ["turn", "tura"],
  ["Rage", "Szał"],
  ["Ki Points", "punkty skupienia"],
  ["Ki", "punkty skupienia"],
  ["damage", "obrażenia"],
  ["attacks", "ataki"],
  ["attack", "atak"],
  ["weapons", "bronie"],
  ["weapon", "broń"],
  ["spells", "moce"],
  ["Spell", "Moc"],
  ["spell", "moc"],
  ["Speed", "Szybkość"],
  ["speed", "szybkość"],
  ["English", "angielski"],
  ["STR", "Siła"],
  ["DEX", "Zręczność"],
  ["CON", "Kondycja"],
  ["INT", "Inteligencja"],
  ["WIS", "Mądrość"],
  ["CHA", "Charyzma"],
  ["AC", "KP"],
  ["HP", "PW"],
  ["DC", "ST"],
  ["ft", "stóp"]
];

function replacePhrase(text, from, to) {
  return text.split(from).join(to);
}

export function polishVisibleText(value) {
  if (value === null || value === undefined) return value;
  let text = String(value);
  for (const [from, to] of PHRASES) text = replacePhrase(text, from, to);
  text = text.replace(/\b(\d*)d(\d+)\b/g, (_, count, faces) => `${count || ""}k${faces}`);
  text = text.replace(/\s{2,}/g, " ").trim();
  return text;
}

export function keepReskinName(value) {
  const text = String(value || "");
  if (!text.includes(" / ")) return polishVisibleText(text);
  const parts = text.split(" / ").map(part => part.trim()).filter(Boolean);
  return polishVisibleText(parts[parts.length - 1]);
}

export function normalizeCharacter(character) {
  if (!character || typeof character !== "object") return character;

  if (Array.isArray(character.marvel)) {
    character.marvel = character.marvel.map(([name, description]) => [
      keepReskinName(name),
      polishVisibleText(description)
    ]);
  }

  if (Array.isArray(character.attacks)) {
    character.attacks = character.attacks.map(attack => attack.map((value, index) => {
      if (index === 0) return keepReskinName(value);
      return polishVisibleText(value);
    }));
  }

  if (Array.isArray(character.resources)) {
    character.resources = character.resources.map(resource => ({
      ...resource,
      name: keepReskinName(resource.name),
      description: polishVisibleText(resource.description || ""),
      recharge: polishVisibleText(resource.recharge || ""),
      unit: polishVisibleText(resource.unit || "")
    }));
  }

  if (Array.isArray(character.spellsDetailed)) {
    character.spellsDetailed = character.spellsDetailed.map(spell => ({
      ...spell,
      flavorName: spell.flavorName ? keepReskinName(spell.flavorName) : spell.flavorName
    }));
  }

  for (const key of ["tools", "languages", "fighting"]) {
    if (character[key]) character[key] = polishVisibleText(character[key]);
  }

  return character;
}
