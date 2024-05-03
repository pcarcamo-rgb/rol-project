interface SeedAbility {
  abilityDesc: string;
}

interface SeedBackground {
  backgroundName: string;
  background: string;
}

interface SeedRace {
  race: string;
}
interface Character {
  name: string;
  level: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencyBonus: number;
  background: number;
  race: number;
  competencySkills: number[]; // Habilidades representadas por números del 1 al 10
}

export const abilitiesData: SeedAbility[] = [
  { abilityDesc: 'Acrobatics' },
  { abilityDesc: 'Animal Handling' },
  { abilityDesc: 'Arcana' },
  { abilityDesc: 'Athletics' },
  { abilityDesc: 'Deception' },
  { abilityDesc: 'History' },
  { abilityDesc: 'Insight' },
  { abilityDesc: 'Intimidation' },
  { abilityDesc: 'Investigation' },
  { abilityDesc: 'Medicine' },
  { abilityDesc: 'Nature' },
  { abilityDesc: 'Perception' },
  { abilityDesc: 'Performance' },
  { abilityDesc: 'Persuasion' },
  { abilityDesc: 'Religion' },
  { abilityDesc: 'Sleight of Hand' },
  { abilityDesc: 'Stealth' },
  { abilityDesc: 'Survival' },
];

export const backgroundData: SeedBackground[] = [
  {
    backgroundName: 'Soldier',
    background:
      'A former soldier who possesses military training and discipline.',
  },
  {
    backgroundName: 'Noble',
    background:
      'Born into wealth and privilege, a noble often holds power and influence.',
  },
  {
    backgroundName: 'Outlander',
    background:
      'Hailing from the wilderness, an outlander is skilled in survival and self-sufficiency.',
  },
];
export const racesData: SeedRace[] = [
  { race: 'Human' },
  { race: 'Elf' },
  { race: 'Dwarf' },
  { race: 'Halfling' },
  { race: 'Half-Orc' },
  { race: 'Tiefling' },
];

export const charactersData: Character[] = [
  {
    name: 'Aldric',
    level: 3,
    strength: 12,
    dexterity: 14,
    constitution: 10,
    intelligence: 10,
    wisdom: 13,
    charisma: 15,
    proficiencyBonus: 2,
    background: 1, // Soldier
    race: 1, // Human
    competencySkills: [1, 4, 7, 9],
  },
  {
    name: 'Lirelle',
    level: 5,
    strength: 8,
    dexterity: 16,
    constitution: 12,
    intelligence: 14,
    wisdom: 10,
    charisma: 13,
    proficiencyBonus: 3,
    background: 2, // Noble
    race: 2, // Elf
    competencySkills: [3, 5, 8, 10],
  },
  {
    name: 'Thorin',
    level: 2,
    strength: 16,
    dexterity: 10,
    constitution: 14,
    intelligence: 8,
    wisdom: 12,
    charisma: 10,
    proficiencyBonus: 2,
    background: 3, // Soldier
    race: 3, // Dwarf
    competencySkills: [2, 6, 7, 9],
  },
];
