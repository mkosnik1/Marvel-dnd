import { canonicalFeatureDescription, canonicalSpell } from "./mechanics-pl.js";

function mod(score) {
  return Math.floor((Number(score || 10) - 10) / 2);
}

function technicalName(name) {
  return String(name || "").split(" / ")[0].trim();
}

function spellTechnicalName(name) {
  return technicalName(name)
    .replace(/ z Fey Touched$/i, "")
    .replace(/ z Telepathic$/i, "")
    .trim();
}

function resourceDescription(character, resource) {
  const rawName = String(resource.name || "");
  const technical = technicalName(rawName);
  const lower = technical.toLowerCase();
  const pb = 3;

  if (lower === "sorcery points") {
    return "Masz 5 punktów magii. Wydajesz je na techniki Metamagii albo zamianę energii na komórki mocy. Jako akcję dodatkową możesz zużyć komórkę mocy i odzyskać tyle punktów magii, ile wynosił jej poziom, maksymalnie do limitu 5. Możesz też jako akcję dodatkową wydać 2 punkty na komórkę 1. poziomu, 3 punkty na komórkę 2. poziomu albo 5 punktów na komórkę 3. poziomu. Wszystkie punkty wracają po długim odpoczynku.";
  }

  if (lower === "ki") {
    const dc = 8 + pb + mod(character.stats?.WIS);
    return `Masz 5 punktów skupienia i odzyskujesz wszystkie po krótkim lub długim odpoczynku. Za 1 punkt po wykonaniu Akcji Ataku możesz jako akcję dodatkową wykonać dwa ataki bez broni. Za 1 punkt możesz jako akcję dodatkową wykonać Unik. Za 1 punkt możesz jako akcję dodatkową wykonać Sprint albo Odskok; w tej turze podwajasz też dystans skoków. Po trafieniu przeciwnika atakiem wręcz możesz wydać 1 punkt, aby zmusić go do rzutu obronnego na Kondycję ST ${dc}; przy porażce jest ogłuszony do końca twojej następnej tury.`;
  }

  if (lower === "rage") {
    return "Jako akcję dodatkową wchodzisz w bojowy szał na maksymalnie 1 minutę. W tym czasie masz przewagę w testach i rzutach obronnych na Siłę, dodajesz +2 do obrażeń ataków wręcz wykorzystujących Siłę oraz masz odporność na obrażenia obuchowe, kłute i cięte. Szał kończy się wcześniej, jeśli stracisz przytomność albo jeśli twoja tura skończy się, a od końca poprzedniej tury nie zaatakowałeś wrogiego stworzenia i nie otrzymałeś obrażeń. Masz 3 użycia i odzyskujesz je po długim odpoczynku.";
  }

  if (lower === "second wind") {
    return canonicalFeatureDescription("Second Wind", resource.description || "");
  }

  if (lower === "action surge") {
    return canonicalFeatureDescription("Action Surge", resource.description || "");
  }

  if (lower === "superiority dice") {
    return canonicalFeatureDescription("Combat Superiority", resource.description || "");
  }

  if (lower === "lay on hands") {
    return "Masz pulę 25 punktów leczenia. Jako akcję dotykasz stworzenia i wydajesz dowolną liczbę punktów z puli, przywracając tyle samo PW. Zamiast leczenia możesz wydać 5 punktów, aby zakończyć jedną chorobę albo jedną truciznę działającą na cel. Cała pula odnawia się po długim odpoczynku.";
  }

  if (lower === "divine sense") {
    return "Jako akcję do końca swojej następnej tury wyczuwasz obecność istot niebiańskich, piekielnych i nieumarłych w promieniu 60 stóp, o ile nie znajdują się za całkowitą osłoną. Poznajesz ich położenie i rodzaj. Masz 3 użycia i odzyskujesz je po długim odpoczynku.";
  }

  if (lower === "channel divinity") {
    return "Masz 1 wspólne użycie specjalnych opcji swojej przysięgi. Każda opcja dokładnie opisuje, jakiej akcji wymaga i jaki daje efekt. Zużyte użycie odzyskujesz po krótkim lub długim odpoczynku.";
  }

  if (lower === "pact magic") {
    return "Masz 2 komórki mocy 3. poziomu. Każde użycie mocy wymagającej komórki zużywa jedną z nich. Wszystkie zużyte komórki odzyskujesz po krótkim lub długim odpoczynku.";
  }

  if (lower === "metamagic") {
    return "Metamagia pozwala modyfikować używane moce poprzez wydawanie punktów z Rezerwy mocy. Dostępne techniki są wskazane na karcie postaci. Koszt każdej techniki odejmujesz z tej samej puli 5 punktów magii; nie jest to osobny licznik.";
  }

  const spellName = spellTechnicalName(rawName);
  const spell = canonicalSpell(spellName);
  if (spell) {
    const freeUse = Number(resource.max) === 1 && /long rest/i.test(String(resource.recharge || ""));
    const prefix = freeUse
      ? `Masz jedno darmowe użycie mocy „${spell.name}” i odzyskujesz je po długim odpoczynku. Darmowe użycie nie zużywa komórki mocy. `
      : "";
    return `${prefix}${spell.description}`.trim();
  }

  return resource.description || "";
}

export function enrichResourceDetails(character) {
  if (!character?.resources) return character;
  character.resources = character.resources.map(resource => ({
    ...resource,
    description: resourceDescription(character, resource)
  }));
  return character;
}
