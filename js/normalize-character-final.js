const CLEANUPS = [
  ["Long or krótki odpoczynek", "długi lub krótki odpoczynek"],
  ["Short or długi odpoczynek", "krótki lub długi odpoczynek"],
  ["Long/krótki odpoczynek", "długi/krótki odpoczynek"],
  ["Short/długi odpoczynek", "krótki/długi odpoczynek"],
  ["akcja dodatkowa / Telekinetic", "akcja dodatkowa, telekineza"],
  ["restrain / nuisance", "unieruchomienie / nękanie"],
  ["Metamagic", "Metamagia"],
  ["Metamagii", "Metamagii"],
  ["Dueling", "Walka jedną bronią"],
  ["Defense", "Obrona"],
  ["Archery", "Łucznictwo"],
  ["Two-Weapon Fighting", "Walka dwiema broniami"],
  ["Great Weapon Fighting", "Walka ciężką bronią"],
  ["Thrown Weapon Fighting", "Walka bronią miotaną"],
  ["Blind Fighting", "Walka na ślepo"],
  ["Interception", "Przechwycenie"],
  ["Protection", "Ochrona"],
  ["Feather Fall", "Łagodne opadanie"],
  ["Levitate", "Lewitacja"],
  ["Guiding Bolt", "Pocisk światła"],
  ["Burning Hands", "Płonące dłonie"],
  ["Scorching Ray", "Palące promienie"],
  ["Magic Missile", "Pociski energii"],
  ["Shield of Faith", "Tarcza wiary"],
  ["Shield", "Tarcza"],
  ["Jump", "Skok"],
  ["Enhance Ability", "Wzmocnienie możliwości"],
  ["Enlarge/Reduce", "Zwiększenie/Zmniejszenie"],
  ["Disguise Self", "Zmiana wyglądu"],
  ["Silent Image", "Cichy obraz"],
  ["Faerie Fire", "Świetlista aura"],
  ["Speak with Animals", "Rozmowa ze zwierzętami"],
  ["Speak with Plants", "Rozmowa z roślinami"],
  ["Spider Climb", "Chodzenie po ścianach"],
  ["Web", "Sieć obezwładniająca"],
  ["Shatter", "Roztrzaskanie"],
  ["Thunderwave", "Fala uderzeniowa"],
  ["Magic Item", "magiczny przedmiot"],
  ["magic item", "magiczny przedmiot"],
  ["Magic", "magia"],
  ["Cantrip", "Sztuczka"],
  ["cantrip", "sztuczka"],
  ["Feat", "Atut"],
  ["feat", "atut"],
  ["Tools", "narzędzia"],
  ["Tool", "narzędzie"],
  ["Proficiency", "Biegłość"],
  ["Medium", "Średni"],
  ["Large", "Duży"],
  ["Huge", "Ogromny"],
  ["Small", "Mały"],
  ["Tiny", "Malutki"],
  ["willing ally", "chętny sojusznik"],
  ["willing creature", "chętne stworzenie"],
  ["per turn", "na turę"],
  ["per round", "na rundę"],
  ["once per turn", "raz na turę"],
  ["once per round", "raz na rundę"],
  ["once", "raz"],
  ["uses", "użycia"],
  ["use", "użycie"],
  ["target", "cel"],
  ["targets", "cele"],
  ["ally", "sojusznik"],
  ["allies", "sojusznicy"],
  ["creature", "stworzenie"],
  ["creatures", "stworzenia"],
  ["range", "zasięg"],
  ["duration", "czas trwania"],
  ["minute", "minuta"],
  ["minutes", "minuty"],
  ["hour", "godzina"],
  ["hours", "godziny"]
];

function cleanup(value) {
  if (value === null || value === undefined) return value;
  let text = String(value);
  for (const [from, to] of CLEANUPS) text = text.split(from).join(to);
  return text.replace(/\s{2,}/g, " ").trim();
}

export function finalizeVisibleCharacter(character) {
  if (!character || typeof character !== "object") return character;

  if (Array.isArray(character.marvel)) {
    character.marvel = character.marvel.map(([name, description]) => [cleanup(name), cleanup(description)]);
  }

  if (Array.isArray(character.attacks)) {
    character.attacks = character.attacks.map(attack => attack.map(cleanup));
  }

  if (Array.isArray(character.resources)) {
    character.resources = character.resources.map(resource => ({
      ...resource,
      name: cleanup(resource.name),
      description: cleanup(resource.description || ""),
      recharge: cleanup(resource.recharge || ""),
      unit: cleanup(resource.unit || "")
    }));
  }

  if (Array.isArray(character.spellsDetailed)) {
    character.spellsDetailed = character.spellsDetailed.map(spell => ({
      ...spell,
      flavorName: spell.flavorName ? cleanup(spell.flavorName) : spell.flavorName
    }));
  }

  for (const key of ["tools", "languages", "fighting"]) {
    if (character[key]) character[key] = cleanup(character[key]);
  }

  return character;
}
