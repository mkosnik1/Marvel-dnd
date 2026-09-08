function labelResolution(value) {
  const text = String(value ?? "").trim();
  if (!text || text === "—") return "Rozstrzygnięcie: —";
  if (/\bST\b|\bDC\b/i.test(text)) return `Rzut obronny celu: ${text}`;
  if (/^[+-]\d/.test(text)) return `Premia do trafienia: ${text}`;
  return `Rozstrzygnięcie: ${text}`;
}

function withLabel(value, label) {
  const text = String(value ?? "").trim();
  if (!text) return `${label}: —`;
  if (text.toLowerCase().startsWith(label.toLowerCase())) return text;
  return `${label}: ${text}`;
}

export function addAttackLabels(character) {
  if (!character?.attacks) return character;
  character.attacks = character.attacks.map(attack => {
    if (!Array.isArray(attack)) return attack;
    return [
      attack[0],
      labelResolution(attack[1]),
      withLabel(attack[2], "Obrażenia / efekt"),
      withLabel(attack[3], "Zasięg / warunki")
    ];
  });
  return character;
}
