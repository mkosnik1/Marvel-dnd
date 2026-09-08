const SKILL_PL = {
  Acrobatics: "Akrobatyka",
  "Animal Handling": "Opieka nad zwierzętami",
  Arcana: "Wiedza tajemna",
  Athletics: "Atletyka",
  Deception: "Oszustwo",
  History: "Historia",
  Insight: "Intuicja",
  Intimidation: "Zastraszanie",
  Investigation: "Śledztwo",
  Medicine: "Medycyna",
  Nature: "Przyroda",
  Perception: "Percepcja",
  Performance: "Występy",
  Persuasion: "Perswazja",
  Religion: "Religia",
  "Sleight of Hand": "Zwinne dłonie",
  Stealth: "Skradanie się",
  Survival: "Sztuka przetrwania"
};

function dualName(skill, alias) {
  const base = SKILL_PL[skill] || skill;
  const reskin = String(alias || "").trim();
  if (!reskin || reskin === base) return base;
  if (reskin.includes(" / ")) return reskin;
  return `${base} / ${reskin}`;
}

export function addDualSkillNamesToCharacter(character) {
  if (!character?.skillAliases) return character;
  character.skillAliases = Object.fromEntries(
    Object.entries(character.skillAliases).map(([skill, alias]) => [skill, dualName(skill, alias)])
  );
  return character;
}

export function addDualSkillNamesToRules(rules) {
  if (!rules?.skillAliasDefault) return rules;
  rules.skillAliasDefault = Object.fromEntries(
    Object.entries(rules.skillAliasDefault).map(([skill, alias]) => [skill, dualName(skill, alias)])
  );
  return rules;
}
