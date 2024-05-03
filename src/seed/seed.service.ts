import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AbilitiesService } from 'src/abilities/abilities.service';
import { BackgroundService } from 'src/background/background.service';
import { CharacterService } from 'src/character/character.service';
import { RaceService } from 'src/race/race.service';
import {
  abilitiesData,
  backgroundData,
  charactersData,
  racesData,
} from './data/seed-data';
import { Background } from 'src/background/entities/background.entity';
import { Race } from 'src/race/entities/race.entity';

interface CreateCharacterDto {
  name: string;
  level: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencyBonus: number;
  background: Background; // Cambia el tipo de background y race a sus respectivas entidades
  race: Race;
  competencySkills: number[];
}

@Injectable()
export class SeedService {
  constructor(
    private readonly backgroundService: BackgroundService,
    private readonly raceService: RaceService,
    private readonly abilityService: AbilitiesService,
    private readonly characterService: CharacterService,
  ) {}

  async execute() {
    try {
      await this.insertBackgrounds();
      await this.insertRaces();
      await this.insertAbilities();
      await this.insertCharacters();
      return 'Seed Executed.';
    } catch (error) {
      throw new InternalServerErrorException('Error in Seed, check logs');
    }
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
      const background = await this.backgroundService.findOne(
        character.background,
      );
      const race = await this.raceService.findOne(character.race);

      const createCharacterDto: CreateCharacterDto = {
        name: character.name,
        level: character.level,
        strength: character.strength,
        dexterity: character.dexterity,
        constitution: character.constitution,
        intelligence: character.intelligence,
        wisdom: character.wisdom,
        charisma: character.charisma,
        proficiencyBonus: character.proficiencyBonus,
        background: background,
        race: race,
        competencySkills: character.competencySkills,
      };

      return this.characterService.create(createCharacterDto);
    });

    await Promise.all(insertPromises);
  }
}
