import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AbilitiesService } from 'src/abilities/abilities.service';
import { BackgroundService } from 'src/background/background.service';
import { CharacterService } from 'src/character/character.service';
import { RaceService } from 'src/race/race.service';
import {
  abilitiesData,
  archetypeData,
  backgroundData,
  charactersData,
  classData,
  equipmentData,
  racesData,
  spellData,
  talentData,
  traitData,
  typeEquipmentData,
} from './data/seed-data';

import { TagsService } from 'src/tags/tags.service';
import { TypeEquipmentService } from 'src/equipment/equipment-type/type-equipment.service';
import { tagsData } from './data/seed-data';

import { Tags } from 'src/tags/entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { ClassService } from 'src/class/class.service';
import { ArchetypeService } from 'src/archetype/archetype.service';
import { TraitService } from 'src/trait/trait.service';
import { SpellService } from 'src/spell/spell.service';
import { TalentService } from 'src/talent/talent.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly raceService: RaceService,
    private readonly abilityService: AbilitiesService,
    private readonly characterService: CharacterService,
    private readonly tagsService: TagsService,
    private readonly typeEquipmentService: TypeEquipmentService,
    private readonly classService: ClassService,
    private readonly archetypeService: ArchetypeService,
    private readonly traitService: TraitService,
    private readonly spellService: SpellService,
    private readonly talenService: TalentService,

    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async execute() {
    try {
      await this.insertBackgrounds();
      await this.insertRaces();
      await this.insertAbilities();
      await this.insertTags();
      await this.insertTypeEquipment();
      await this.insertEquipment();
      await this.insertClasses();
      await this.insertArchetypes();
      await this.insertTraits();
      await this.insertSpells();
      await this.insertTalents();

      await this.insertCharacters();
      return 'Seed Executed.';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error in Seed, check logs');
    }
  }

  private async insertSpells() {
    for (const spell of spellData) {
      await this.spellService.create(spell);
    }
  }

  private async insertTalents() {
    for (const talent of talentData) {
      await this.talenService.create(talent);
    }
  }
  private async insertTraits() {
    for (const trait of traitData) {
      await this.traitService.create(trait);
    }
  }

  private async insertTags() {
    for (const tag of tagsData) {
      await this.tagsService.create({ descTagEquipment: tag.descTagEquipment });
    }
  }

  private async insertClasses() {
    for (const clas of classData) {
      await this.classService.create(clas);
    }
  }
  private async insertArchetypes() {
    for (const archetype of archetypeData) {
      await this.archetypeService.create(archetype);
    }
  }

  private async insertTypeEquipment() {
    for (const typeEquipment of typeEquipmentData) {
      await this.typeEquipmentService.createType(typeEquipment);
    }
  }

  private async insertEquipment() {
    const equipments = equipmentData;
    const insertPromises = [];

    for (const equipment of equipments) {
      const foundTypeEquipment = await this.typeEquipmentService.findOneType(
        equipment.typeEquipment,
      );
      const tagsFound: Tags[] = [];
      for (const tag of equipment.tags) {
        tagsFound.push(await this.tagsService.findOne(tag));
      }
      insertPromises.push(
        this.equipmentRepository.create({
          ...equipment,
          typeEquipment: foundTypeEquipment,
          tags: tagsFound,
        }),
      );
    }
    await this.equipmentRepository.save(insertPromises);
  }
  private async insertBackgrounds() {
    for (const background of backgroundData) {
      await this.backgroundService.create({
        backgroundName: background.backgroundName,
        background: background.background,
      });
    }
  }

  private async insertRaces() {
    for (const race of racesData) {
      await this.raceService.create({ race: race.race });
    }
  }

  private async insertAbilities() {
    for (const ability of abilitiesData) {
      await this.abilityService.create(ability);
    }
  }

  private async insertCharacters() {
    const insertPromises = charactersData.map(async (character) => {
      const createCharacterDto = {
        name: character.name,
        level: character.level,
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma,
        proficiencyBonus: character.proficiencyBonus,
        background: character.background,
        race: character.race,
        competencySkills: character.competencySkills,
        equipment: character.equipment,
        idClass: character.class,
        talents: character.talents,
      };

      return this.characterService.create(createCharacterDto);
    });

    await Promise.all(insertPromises);
  }
}
