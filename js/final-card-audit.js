const REPLACEMENTS = [
  ["psychicznez", "psychicz"], ["krazntracji", "koncentracji"], ["krazntracja", "koncentracja"],
  ["Disprzewaga", "utrudnienie"], ["magiaz", "magicz"], ["komórka mocyu", "komórki mocy"], ["komórka mocyów", "komórek mocy"], ["komórka mocya", "komórki mocy"],
  ["Rękawica uderzeniowas", "Rękawice uderzeniowe"], ["Heavy Weapons Platform", "Ciężka platforma uzbrojenia"],
  ["Force Fields", "Pola siłowe"], ["Force Pulse", "Impuls siłowy"], ["Psychic Wave", "Fala psychiczna"], ["Psychic Burst", "Wybuch psychiczny"],
  ["Psychic Blade", "Ostrze psychiczne"], ["Psychic Focus", "Skupienie psychiczne"], ["Psychic Shield", "Tarcza psychiczna"],
  ["Improvised Weapon", "Broń improwizowana"], ["Improvised Throw", "Improwizowany rzut"], ["Tasha's Mind Whip", "Bicz umysłu"], ["Target Lock", "Namierzanie celu"],
  ["Force Ballista", "Działo kinetyczne"], ["Nova Force", "Energia Nova"], ["Nova Punch", "Cios energii Nova"], ["Solar Gem Beam", "Promień klejnotu słonecznego"],
  ["Cybernetic Arm", "Cybernetyczne ramię"], ["Gamma Form", "Forma Gamma"], ["Master of Magnetism", "Mistrz magnetyzmu"], ["Elastic Body", "Elastyczne ciało"],
  ["Helmet HUD", "Interfejs hełmu"], ["Squirrel Friends", "Wiewiórczy sojusznicy"], ["Omega Telepath", "Telepata klasy Omega"],
  ["Penance Stare", "Spojrzenie pokuty"], ["Hellcycle", "Piekielny motocykl"], ["Nova Burst", "Eksplozja supernowej"],
  ["Power Absorption", "Absorpcja mocy"], ["Density Control", "Kontrola gęstości"], ["Favored by the Gods", "Łaska bogów"],
  ["Jet Boots", "Buty odrzutowe"], ["Dimensional Punch", "Cios wymiarowy"], ["Star Portal", "Portal gwiezdny"], ["Big Freaking Gun", "Wielka armata"],
  ["I Am Groot", "Jestem Groot"], ["Blessing of the Raven Queen", "Dar Królowej Kruków"], ["Knowledge from a Past Life", "Wspomnienie poprzedniego życia"],
  ["Relentless Endurance", "Nieustępliwość"], ["Fey Touched", "Dotknięcie magii"], ["Enhanced Arcane Focus", "Wzmocnione skupienie mocy"],
  ["Enhanced Defense", "Wzmocniona obrona"], ["Mind Sharpener", "Stabilizator koncentracji"], ["Fireball", "Kula ognia"], ["Invisibility", "Niewidzialność"],
  ["Unarmed Strike", "Atak bez broni"], ["Unarmed strike", "atak bez broni"], ["Athletics Checks", "testy Atletyki"], ["Athletics", "Atletyka"],
  ["Perception", "Percepcja"], ["Investigation", "Śledztwo"], ["Stealth", "Skradanie się"], ["Mądrość Save", "rzut obronny na Mądrość"],
  ["Inteligencja Save", "rzut obronny na Inteligencję"], ["Zręczność Save", "rzut obronny na Zręczność"], ["Kondycja Save", "rzut obronny na Kondycję"],
  ["Siła Save", "rzut obronny na Siłę"], ["checks", "testy"], ["check", "test"], ["Help", "Pomoc"], ["monk broń", "broń mnicha"],
  ["Quickened Spell", "Przyspieszona moc"], ["Distant Spell", "Dalekosiężna moc"], ["Subtle Spell", "Dyskretna moc"], ["Heightened Spell", "Utrudniona obrona"],
  ["Empowered Spell", "Wzmocnione obrażenia"], ["Transmuted Spell", "Przekształcona moc"], ["Twinned Spell", "Bliźniacza moc"], ["Careful Spell", "Ostrożna moc"],
  ["Spell Sniper", "Snajper mocy"], ["Extra Attack", "Dodatkowy atak"]
];

function clean(value) {
  if (value === null || value === undefined) return value;
  let text = String(value);
  for (const [from, to] of REPLACEMENTS) text = text.split(from).join(to);
  return text
    .replace(/(\d+) lb\b/g, "$1 funtów")
    .replace(/\bprzewaga na\b/g, "przewagę w")
    .replace(/\bMasz przewaga\b/g, "Masz przewagę")
    .replace(/\bma przewaga\b/g, "ma przewagę")
    .replace(/\bSiła testy\b/g, "testy Siły")
    .replace(/\bKondycja testy\b/g, "testy Kondycji")
    .replace(/\bdodatkowy obrażenia\b/g, "dodatkowe obrażenia")
    .replace(/\b1 punkty\b/g, "1 punkt")
    .replace(/\s{2,}/g, " ").trim();
}

const POWER_OVERRIDES = {
  "cap:0": ["Tarcza z vibranium", "Magiczna broń +1. Jako tarcza daje +2 do KP. Jako broń zadaje 1k8 obrażeń obuchowych, można nią rzucić na 30/60 stóp i po rzucie wraca do ręki. Liczy się jako magiczna broń."],
  "cap:1": ["Fizjologia superżołnierza", "Ataki bez broni zadają 1k6 + modyfikator Siły obrażeń obuchowych. Masz przewagę w testach Atletyki dotyczących długotrwałego biegu, pływania, skoków i wspinaczki."],
  "domino:1": ["Niemożliwy strzał", "Raz na krótki odpoczynek przy jednym ataku dystansowym ignorujesz połowiczną osłonę i osłonę trzech czwartych oraz nie otrzymujesz utrudnienia za daleki zasięg."],
  "emmafrost:1": ["Telepata klasy Omega", "Raz na krótki odpoczynek, gdy cel zda rzut obronny na Mądrość przeciw twojej mocy zauroczenia albo mocy zadającej obrażenia psychiczne, rzucasz 1k6 i odejmujesz wynik od jego rzutu. Jeśli nowy wynik spadnie poniżej twojego ST mocy, rzut staje się porażką."],
  "ghostrider:0": ["Spojrzenie pokuty", "Raz na długi odpoczynek jako akcję wybierasz stworzenie do 30 stóp, które może cię zobaczyć. Cel wykonuje rzut obronny na Mądrość przeciw twojemu ST mocy. Przy porażce otrzymuje 4k6 obrażeń psychicznych i jest przerażony tobą do końca twojej następnej tury."],
  "humantorch:1": ["Eksplozja supernowej", "Raz na długi odpoczynek jako akcję wybierasz punkt do 150 stóp. Stworzenia w promieniu 20 stóp wykonują rzut obronny na Zręczność przeciw twojemu ST mocy; przy porażce otrzymują 8k6 obrażeń od ognia, przy sukcesie połowę."],
  "invisiblewoman:0": ["Pola siłowe", "Gdy zostaniesz trafiona atakiem, możesz użyć Reakcji, aby otrzymać +5 do KP do początku swojej następnej tury, także przeciw atakowi wywołującemu Reakcję. Jako akcję dodatkową możesz też wybrać stworzenie do 30 stóp; po nieudanym rzucie obronnym na Siłę ST 14 przesuwasz je o 5 stóp do siebie albo od siebie."],
  "jeangrey:1": ["Tarcza psychiczna", "Raz na krótki odpoczynek, gdy ty albo sojusznik do 30 stóp otrzymuje obrażenia psychiczne, możesz użyć Reakcji i zmniejszyć te obrażenia o 1k10+3."],
  "magneto:0": ["Mistrz magnetyzmu", "Astralną dłonią albo Telekinetą możesz poruszać niepilnowanymi metalowymi przedmiotami do 100 funtów. Raz na długi odpoczynek możesz bez komórki mocy użyć Lewitacji; niechętny cel wykonuje rzut obronny na Kondycję, a efekt wymaga koncentracji i trwa do 10 minut."],
  "mrfantastic:0": ["Elastyczne ciało", "Możesz przeciskać się przez otwory szerokie na 1 cal, jeśli mieści się też ekwipunek. Masz przewagę w testach rozpoczęcia pochwycenia i uwalniania się z niego. Raz na turę możesz zwiększyć zasięg jednego ataku wręcz o 5 stóp."],
  "nova:1": ["Interfejs hełmu", "Raz na długi odpoczynek przed testem Śledztwa albo Percepcji dotyczącym pola walki, zagrożeń lub taktycznej analizy możesz wykonać ten test z przewagą."],
  "photon:1": ["Przesunięcie widmowe", "Raz na krótki odpoczynek, gdy otrzymujesz obrażenia promieniste albo od elektryczności, możesz użyć Reakcji i zyskać odporność na ten typ obrażeń przeciw jednemu źródłu."],
  "polaris:0": ["Kontrola magnetyzmu", "Na 30 stóp możesz poruszać niepilnowanymi metalowymi przedmiotami do 100 funtów. Raz na długi odpoczynek jako akcję możesz unieść siebie, stworzenie albo przedmiot do 20 stóp na maksymalnie 10 minut. Niechętny cel wykonuje rzut obronny na Kondycję ST 14; efekt wymaga koncentracji."],
  "rocket:0": ["Wielka armata", "Raz na długi odpoczynek jako akcję wybierasz punkt do 120 stóp. Stworzenia w promieniu 10 stóp wykonują rzut obronny na Zręczność przeciw twojemu ST mocy. Przy porażce otrzymują 4k6 obrażeń od ognia, przy sukcesie połowę."],
  "roguex:0": ["Absorpcja mocy", "Raz na krótki odpoczynek po trafieniu humanoida atakiem bez broni możesz zmusić go do rzutu obronnego na Kondycję ST 14. Przy porażce do końca twojej następnej tury ma utrudnienie w testach Siły i Kondycji, a ty otrzymujesz 1k8 tymczasowych PW."],
  "shehulk:0": ["Forma Gamma", "Jako akcję dodatkową wchodzisz w Formę Gamma na maksymalnie 1 minutę. Masz 3 użycia na długi odpoczynek. W formie masz przewagę w testach i rzutach obronnych na Siłę, +2 do obrażeń ataków wręcz opartych na Sile oraz odporność na obrażenia obuchowe, kłute i cięte."],
  "squirrelgirl:0": ["Wiewiórczy sojusznicy", "Raz na długi odpoczynek jako akcję przywołujesz pomocne wiewiórki na 1 minutę. Raz w każdej turze możesz uzyskać przewagę w jednym teście Percepcji związanym z otoczeniem albo zapewnić jednemu sojusznikowi Pomoc przy ataku lub teście, jeśli wiewiórki mogą fizycznie wesprzeć czynność."],
  "vision:1": ["Promień klejnotu słonecznego", "Jako akcję wykonujesz dystansowy atak mocą z premią +6 na cel do 120 stóp. Trafienie zadaje 2k10 obrażeń promienistych."],
  "warmachine:0": ["Ciężka platforma uzbrojenia", "W trybie Strażnika Rękawice uderzeniowe mają +6 do trafienia i zadają 1k8+3 obrażeń od grzmotu; trafiony cel ma utrudnienie w atakach przeciw wszystkim poza tobą do początku twojej następnej tury. W trybie Infiltratora Działo elektryczne ma +6, zadaje 1k6+3 obrażeń od elektryczności, a raz na turę jedno trafienie zadaje dodatkowe 1k6."],
  "wintersoldier:0": ["Cybernetyczne ramię", "Atak bez broni metalowym ramieniem zadaje 1k6 + modyfikator Siły obrażeń obuchowych i jest traktowany jak magiczny. Masz przewagę w testach Atletyki wykonywanych, aby pochwycić stworzenie albo utrzymać pochwycenie."]
};

const HARDNESS = "Gdy otrzymujesz obrażenia, możesz użyć Reakcji, aby zmniejszyć je o 1k12+3. Redukujesz obrażenia tylko z jednego źródła. Masz 3 użycia i odzyskujesz je po długim odpoczynku.";
const TELEPORT = "Jako akcję dodatkową teleportujesz się na wolne pole, które widzisz, w odległości do 30 stóp. Po teleportacji zyskujesz odporność na wszystkie obrażenia do początku swojej następnej tury. Masz 3 użycia i odzyskujesz je po długim odpoczynku.";
const RECOVERY = "Raz dziennie po zakończeniu krótkiego odpoczynku odzyskujesz zużyte komórki mocy o łącznym poziomie najwyżej 3.";

function resourceOverride(character, resource, index) {
  const key = `${character.id}:${index}`;
  if (resource.name === "Ekstremalna twardość") return [resource.name, HARDNESS];
  if (resource.name === "pole ochronne") return ["Pole ochronne", "Jako akcję dodatkową uruchamiasz pole ochronne i otrzymujesz 5 tymczasowych PW. Masz 3 użycia i odzyskujesz je po długim odpoczynku."];
  if (resource.name === "precyzyjne trafienie") return ["Precyzyjne trafienie", "Raz na turę, gdy trafisz atakiem wykorzystującym Zręczność lub bronią dystansową, zadajesz dodatkowe 3k6 obrażeń, jeśli masz przewagę w rzucie ataku albo jeśli inny przeciwnik celu stoi do 5 stóp od niego i nie masz utrudnienia."];
  if (resource.name === "Teleportacja bojowa" || resource.name === "Dyski teleportacyjne") return [resource.name, TELEPORT];
  if (resource.name === "Pamięć ciała") return [resource.name, "Gdy wykonujesz test umiejętności i widzisz wynik, możesz dodać do niego 1k6, zanim prowadzący określi rezultat. Masz 3 użycia i odzyskujesz je po długim odpoczynku."];
  if (resource.name === "szczęście") return ["Szczęście", "Masz 3 punkty szczęścia. Przy własnym rzucie ataku, teście cechy lub rzucie obronnym możesz wydać punkt, rzucić dodatkową k20 i wybrać wynik. Możesz też użyć punktu przeciw atakowi przeciwnika. Punkty wracają po długim odpoczynku."];
  if (resource.name === "regeneracja energii") return ["Regeneracja energii", RECOVERY];
  if (resource.name === "Czynnik regeneracyjny") return [resource.name, "Gdy obrażenia obniżyłyby cię do 0 PW, ale nie zabiły od razu, możesz zamiast tego pozostać na 1 PW. Masz 1 użycie i odzyskujesz je po długim odpoczynku."];
  if (resource.name === "moduł uzbrojenia") return ["Moduł uzbrojenia", "Jako akcję tworzysz moduł uzbrojenia do 5 stóp od siebie. Ma KP 18 i 25 PW i działa do 1 godziny. Jako akcję dodatkową aktywujesz działo kinetyczne: atak mocą na cel do 120 stóp zadaje 2k8 obrażeń od energii i odpycha cel o 5 stóp. Pierwszy moduł po długim odpoczynku jest darmowy, kolejny wymaga komórki mocy."];
  if (resource.name === "mistyczna osłona") return ["Mistyczna osłona", "Osłona ma maksymalnie 14 PW i przyjmuje obrażenia przed tobą. Gdy użyjesz mocy ochronnej 1. poziomu lub wyższego, odzyskuje PW równe dwukrotności poziomu tej mocy, maksymalnie do 14."];
  if (resource.name === "Darkchylde") return [resource.name, "Jako akcję dodatkową wybierasz cel do 30 stóp. Przez 1 minutę dodajesz +3 do obrażeń przeciw niemu, trafienia na naturalnym 19–20 są krytyczne, a jeśli cel umrze, odzyskujesz 8 PW. Jedno użycie wraca po krótkim lub długim odpoczynku."];
  if (key === "americachavez:1") return ["Wzmocniony skok", "Raz na długi odpoczynek jako akcję potrajasz dystans skoku na 1 minutę. Efekt nie wymaga koncentracji."];
  if (key === "americachavez:2") return ["Krótki portal — moc wrodzona", "Raz na długi odpoczynek jako akcję dodatkową teleportujesz się na wolne pole do 30 stóp, które widzisz. To osobny licznik od teleportacji z atutu Dotknięcie magii."];
  if (key === "americachavez:3") return ["Krótki portal — Dotknięcie magii", "Raz na długi odpoczynek jako akcję dodatkową teleportujesz się na wolne pole do 30 stóp, które widzisz. To osobny licznik od wrodzonej teleportacji."];
  if (key === "americachavez:5") return ["Portal gwiezdny", "Raz na długi odpoczynek, gdy teleportujesz się o maksymalnie 30 stóp jako akcję dodatkową, możesz zabrać jednego chętnego sojusznika stojącego do 5 stóp. Oboje pojawiacie się na wolnych polach w zasięgu 30 stóp, które widzisz."];
  if (key === "americachavez:6") return ["Cios wymiarowy", "Raz na krótki odpoczynek po trafieniu atakiem bez broni dodajesz 2k6 obrażeń od energii."];
  if (key === "emmafrost:4") return ["Telepatyczne przełamanie", POWER_OVERRIDES["emmafrost:1"][1]];
  if (key === "rocket:3") return ["Wielka armata", POWER_OVERRIDES["rocket:0"][1]];
  if (key === "roguex:2") return ["Absorpcja mocy", POWER_OVERRIDES["roguex:0"][1]];
  if (key === "squirrelgirl:3") return ["Wiewiórczy sojusznicy", POWER_OVERRIDES["squirrelgirl:0"][1]];
  if (key === "strange:0") return ["Odzyskanie koncentracji", RECOVERY];
  if (key === "strange:4") return ["Peleryna Lewitacji", "Raz na długi odpoczynek jako akcję dodatkową zyskujesz szybkość lotu 30 stóp na 10 minut bez koncentracji."];
  if (key === "ironman:2") return ["Lot repulsorowy", "Jako akcję dodatkową zyskujesz szybkość lotu 30 stóp na 10 minut bez koncentracji. Masz 2 użycia na długi odpoczynek."];
  if (key === "vision:2") return ["Kontrola gęstości", "Raz na krótki odpoczynek po trafieniu możesz użyć Reakcji i zyskać odporność na wszystkie obrażenia z tego ataku. Dodatkowo 3 razy na długi odpoczynek możesz przejść przez przestrzeń zajmowaną przez stworzenie bez dodatkowego kosztu ruchu."];
  if (key === "vision:3") return ["Łaska bogów", "Raz na krótki lub długi odpoczynek, gdy nie zdasz rzutu ataku albo rzutu obronnego, rzucasz 2k4 i dodajesz wynik do rzutu. Jeśli osiągniesz wymagany wynik, rzut staje się sukcesem."];
  if (key === "groot:2") return ["Jestem Groot", "Podczas swojej tury zasięg ataków wręcz zwiększa się o 5 stóp. Raz na długi odpoczynek jako akcję możesz powiększyć się na 1 minutę bez koncentracji: zwiększasz rozmiar o kategorię, masz przewagę w testach i rzutach obronnych na Siłę, a ataki zadają dodatkowe 1k4 obrażeń."];
  return null;
}

function cleanFeatures(items) {
  return (items || []).map(item => ({ ...item, name: clean(item.name), description: clean(item.description) }));
}

export function finalCardAudit(character) {
  if (!character || typeof character !== "object") return character;
  if (Array.isArray(character.marvel)) character.marvel = character.marvel.map((entry, index) => {
    const value = POWER_OVERRIDES[`${character.id}:${index}`] || entry;
    return [clean(value[0]), clean(value[1])];
  });
  if (Array.isArray(character.resources)) {
    character.resources = character.resources.map((resource, index) => {
      const override = resourceOverride(character, resource, index);
      return { ...resource, name: clean(override?.[0] ?? resource.name), description: clean(override?.[1] ?? resource.description ?? ""), recharge: clean(resource.recharge || ""), unit: clean(resource.unit || "") };
    });
    if (character.id === "americachavez") character.resources = character.resources.filter(resource => resource.name !== "Dotknięcie magii");
    const rageNames = { hulk: "Wściekłość Hulka", shehulk: "Forma Gamma", thing: "Niewzruszona siła", venom: "Szał symbionta", wolverine: "Szał berserkera" };
    if (rageNames[character.id]) {
      let seen = false;
      character.resources = character.resources.filter(resource => {
        const sameRage = (resource.description || "").includes("bojowy szał na maksymalnie 1 minutę");
        if (!sameRage) return true;
        if (seen) return false;
        seen = true;
        resource.name = rageNames[character.id];
        return true;
      });
    }
  }
  if (Array.isArray(character.attacks)) character.attacks = character.attacks.map(attack => attack.map(clean));
  if (Array.isArray(character.spellsDetailed)) character.spellsDetailed = character.spellsDetailed.map(spell => ({ ...spell, flavorName: spell.flavorName ? clean(spell.flavorName) : spell.flavorName, levelLabel: clean(spell.levelLabel) }));
  if (character.skillAliases) character.skillAliases = Object.fromEntries(Object.entries(character.skillAliases).map(([key, value]) => [key, clean(value)]));
  character.originFeatures = cleanFeatures(character.originFeatures);
  character.classFeaturesDetailed = cleanFeatures(character.classFeaturesDetailed);
  character.subclassFeaturesDetailed = cleanFeatures(character.subclassFeaturesDetailed);
  for (const key of ["race", "group", "team", "fighting", "tools", "languages"]) if (character[key]) character[key] = clean(character[key]);
  return character;
}
