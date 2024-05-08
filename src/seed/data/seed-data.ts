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

interface SeedTalent {
  nameTalent: string;
  descTalent: string;
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

interface SeedTrait {
  nameTrait: string;
  descTrait: string;
  level: number;
  IdClass?: number;
  IdArchetype?: number;
}

interface SeedBackground {
  backgroundName: string;
  background: string;
}

interface SeedSpell {
  nameSpell: string;
  typeSpell: string;
  castTime: 'action' | 'reaction' | 'additional action';
  componentSpell?: string;
  range: number;
  savingThrow?:
    | 'strength'
    | 'dexterity'
    | 'constitution'
    | 'intelligence'
    | 'wisdom'
    | 'charisma';
  dmgSpell?: string;
  descSpell: string;
  atHigherLevels: string;
  idClass: number;
  levelSpell: number;
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
  class: number;
  talents: number[];
}

interface SeedArchetype {
  descArchetype: string;
  nameArchetype: string;
  IdClass: number;
}

interface SeedClass {
  descClass: string;
  lifeDice: number;
}

export const talentData: SeedTalent[] = [
  {
    nameTalent: 'lucky',
    descTalent: 'You can make another roll on any ability check.',
  },
  {
    nameTalent: 'Punga',
    descTalent:
      'You have the power of punga, you are unstoppable in melee. All attacks you make within 5 feet are critical.',
  },
  {
    nameTalent: 'Fuckin Noob',
    descTalent:
      'You are a fucking noob, you have disadvantage in all your actions',
  },
];

export const spellData: SeedSpell[] = [
  {
    nameSpell: 'Fire Bolt',
    levelSpell: 1,
    atHigherLevels: 'In level 5 2d10',
    castTime: 'action',
    descSpell: 'A fire but Bolt',
    idClass: 1,
    range: 300,
    typeSpell: 'evocation',
    dmgSpell: '2d10',
  },
  {
    nameSpell: 'Guidence',
    atHigherLevels: 'Nothing',
    levelSpell: 2,
    castTime: 'action',
    descSpell: 'God Guide You',
    idClass: 3,
    range: 1,
    typeSpell: 'miracle',
  },
];

export const traitData: SeedTrait[] = [
  {
    nameTrait: 'Double Attack',
    descTrait: 'When you attack, you attack twice',
    level: 5,
    IdClass: 2,
  },
  {
    nameTrait: 'Spell Casting',
    descTrait: 'SMITE!',
    level: 2,
    IdClass: 3,
    IdArchetype: 3,
  },
  {
    nameTrait: 'Super Blast',
    descTrait: 'Blast but Super',
    level: 3,
    IdClass: 1,
  },
];

export const classData: SeedClass[] = [
  {
    descClass: 'Warlock',
    lifeDice: 8,
  },
  {
    descClass: 'Barbarian',
    lifeDice: 12,
  },
  {
    descClass: 'Paladin',
    lifeDice: 10,
  },
];
export const archetypeData: SeedArchetype[] = [
  {
    nameArchetype: 'Totemic',
    descArchetype: 'Totemic Barbarian',
    IdClass: 2,
  },
  {
    nameArchetype: 'Time Warlock',
    descArchetype: 'The TIME',
    IdClass: 1,
  },
  {
    nameArchetype: 'Vengance',
    descArchetype: 'VENGANCEEEEEE',
    IdClass: 3,
  },
];

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
    class: 1,
    talents: [2],
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
    class: 2,
    talents: [1, 3],
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
    class: 3,
    talents: [3],
  },
];
