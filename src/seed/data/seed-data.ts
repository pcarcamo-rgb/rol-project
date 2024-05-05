interface SeedAbility {
  abilityDesc: string;
  caracteristic: string;
}

interface SeedTags {
  descTagEquipment: string;
}

interface SeedEquipmentType {
  descTypeEquipment: string;
  isArmor?: boolean;
  isWeapon?: boolean;
}

interface SeedEquipment {
  nameEquipment: string;
  descEquipment: string;
  damageEquipment?: string;
  armorEquipment?: number;
  typeEquipment: number;
  tags: number[];
  typeOfDamage?: string;
  price: number;
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
  competencySkills: number[];
  equipment: number[];
}

export const tagsData: SeedTags[] = [
  {
    descTagEquipment: 'Two Hands',
  },
  {
    descTagEquipment: 'One Hand',
  },
  {
    descTagEquipment: 'Equipped',
  },
  {
    descTagEquipment: 'Arcane Focus',
  },
  {
    descTagEquipment: 'Special',
  },
];

export const typeEquipmentData: SeedEquipmentType[] = [
  {
    descTypeEquipment: 'Sword',
    isWeapon: true,
  },
  {
    descTypeEquipment: 'Spear',
    isWeapon: true,
  },
  {
    descTypeEquipment: 'Armor',
    isArmor: true,
  },
  {
    descTypeEquipment: 'Shield',
    isArmor: true,
  },
];

export const equipmentData: SeedEquipment[] = [
  {
    nameEquipment: 'Huchigatana',
    descEquipment: 'Legendary Katana',
    price: 20000,
    tags: [1, 2, 3],
    typeEquipment: 1,
    typeOfDamage: 'Slash',
    damageEquipment: '2d6',
  },
  {
    nameEquipment: 'Shard Armor',
    descEquipment: 'Legendary Armor',
    price: 1000000,
    tags: [3],
    typeEquipment: 3,
    armorEquipment: 18,
  },
  {
    nameEquipment: 'Shard Sword',
    descEquipment: 'Syl, sword of Kaladin Storm Blessed',
    price: 10,
    tags: [2],
    typeEquipment: 1,
    typeOfDamage: 'Piercing',
    damageEquipment: '1d10',
  },
  {
    nameEquipment: 'Shard Shield',
    descEquipment: 'Shield that attempts to copy the qualities of Shard armor',
    price: 3,
    tags: [3, 2],
    typeEquipment: 4,
    armorEquipment: 3,
  },
];

export const abilitiesData: SeedAbility[] = [
  { abilityDesc: 'Acrobatics', caracteristic: 'dexterity' },
  { abilityDesc: 'Animal Handling', caracteristic: 'wisdom' },
  { abilityDesc: 'Arcana', caracteristic: 'intelligence' },
  { abilityDesc: 'Athletics', caracteristic: 'strength' },
  { abilityDesc: 'Deception', caracteristic: 'charisma' },
  { abilityDesc: 'History', caracteristic: 'intelligence' },
  { abilityDesc: 'Insight', caracteristic: 'wisdom' },
  { abilityDesc: 'Intimidation', caracteristic: 'charisma' },
  { abilityDesc: 'Investigation', caracteristic: 'intelligence' },
  { abilityDesc: 'Medicine', caracteristic: 'wisdom' },
  { abilityDesc: 'Nature', caracteristic: 'intelligence' },
  { abilityDesc: 'Perception', caracteristic: 'wisdom' },
  { abilityDesc: 'Performance', caracteristic: 'charisma' },
  { abilityDesc: 'Persuasion', caracteristic: 'charisma' },
  { abilityDesc: 'Religion', caracteristic: 'intelligence' },
  { abilityDesc: 'Sleight of Hand', caracteristic: 'dexterity' },
  { abilityDesc: 'Stealth', caracteristic: 'dexterity' },
  { abilityDesc: 'Survival', caracteristic: 'wisdom' },
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
    equipment: [1],
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
    equipment: [2, 1],
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
    equipment: [1, 2, 3],
  },
];
