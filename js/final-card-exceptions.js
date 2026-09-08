const WILD_SHAPE = "Jako akcję możesz przyjąć postać bestii o stopniu wyzwania najwyżej 1/2 bez szybkości lotu. Masz 2 użycia i odzyskujesz je po krótkim lub długim odpoczynku. Forma trwa do 2 godzin; możesz zakończyć ją wcześniej jako akcję dodatkową. Przyjmujesz fizyczne statystyki bestii, zachowujesz Inteligencję, Mądrość i Charyzmę, a po spadku formy do 0 PW wracasz do własnej postaci.";

const BLESS = "Raz na długi odpoczynek jako akcję wybierasz do 3 stworzeń w zasięgu 30 stóp. Przez maksymalnie 1 minutę, przy koncentracji, każde z nich dodaje 1k4 do swoich rzutów ataku i rzutów obronnych.";

const BLADE_SCAN = "Jako akcję wybierasz widoczne stworzenie do 60 stóp i poznajesz jego odporności, niewrażliwości oraz podatności na obrażenia. Masz 2 użycia i odzyskujesz je po długim odpoczynku.";
const BLADE_MARK = "Jako akcję dodatkową wybierasz widoczne stworzenie do 60 stóp. Pierwszy raz w każdej swojej turze, gdy trafisz je bronią, zadajesz dodatkowe 1k6 obrażeń. Oznaczenie trwa do odpoczynku albo do wybrania innego celu.";
const BLADE_BITE = "Po trafieniu specjalnym ugryzieniem możesz zużyć 1 z 3 użyć. Wybierz: odzyskujesz PW równe obrażeniom kłutym zadanym ugryzieniem albo otrzymujesz premię równą tym obrażeniom do następnego testu cechy lub rzutu ataku. Użycia wracają po długim odpoczynku.";

function patchResource(character, resource, index) {
  const key = `${character.id}:${index}`;
  if (key === "americachavez:4" || key === "blink:4") return { ...resource, name: "Błogosławieństwo", description: BLESS };
  if (key === "blade:0") return { ...resource, name: "Analiza celu", description: BLADE_SCAN };
  if (key === "blade:1") return { ...resource, name: "Oznaczenie celu", description: BLADE_MARK };
  if (key === "blade:2") return { ...resource, name: "Instynkt drapieżcy", description: BLADE_BITE };
  if ((character.id === "groot" || character.id === "squirrelgirl") && resource.name === "alternatywna forma") return { ...resource, name: "Alternatywna forma", description: WILD_SHAPE };
  if (character.id === "loki" && resource.name === "stałe ulepszenia") return { ...resource, name: "Stałe ulepszenia mocy", description: "Znasz trzy stałe ulepszenia: Wzmocniony pocisk energii dodaje modyfikator Charyzmy do obrażeń każdego trafienia Pociskiem energii; Maska wielu twarzy pozwala używać Zmiany wyglądu bez wydawania komórki mocy; Trwałe iluzje pozwalają używać Cichego obrazu bez wydawania komórki mocy." };
  if (character.id === "rocket" && resource.name === "wykorzystanie słabego punktu") return { ...resource, name: "Wykorzystanie słabego punktu", description: "Raz na turę, gdy zadasz obrażenia stworzeniu większemu od siebie atakiem albo mocą, możesz dodać +3 obrażenia. Masz 3 użycia i odzyskujesz je po długim odpoczynku." };
  if (key === "photon:4") return { ...resource, name: "Przesunięcie widmowe", description: "Raz na krótki odpoczynek, gdy otrzymujesz obrażenia promieniste albo od elektryczności, możesz użyć Reakcji i zyskać odporność na ten typ obrażeń przeciw temu jednemu źródłu." };
  return resource;
}

export function resolveFinalCardExceptions(character) {
  if (!character || typeof character !== "object") return character;
  if (Array.isArray(character.resources)) character.resources = character.resources.map((resource, index) => patchResource(character, resource, index));
  return character;
}
