import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/character/create-character.dto';
import { UpdateCharacterDto } from './dto/character/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { CharacterAbilities } from './entities/character-abilities.entity';
import { AbilitiesService } from 'src/abilities/abilities.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Talent } from 'src/talent/entities/talent.entity';
import { TalentService } from 'src/talent/talent.service';
import { ClassService } from 'src/class/class.service';
import { RaceService } from 'src/race/race.service';
import { BackgroundService } from 'src/background/background.service';
import { ArchetypeService } from 'src/archetype/archetype.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(CharacterAbilities)
    private readonly charAbilities: Repository<CharacterAbilities>,

    private readonly equipmentService: EquipmentService,
    private readonly abilityService: AbilitiesService,
    private readonly talentService: TalentService,
    private readonly classSerive: ClassService,
    private readonly raceService: RaceService,
    private readonly backgroundService: BackgroundService,
    private readonly archetypeService: ArchetypeService,
  ) {}

  async create(user: User, createCharacterDto: CreateCharacterDto) {
    try {
      let foundTalents: Talent[] = [];
      if (createCharacterDto.talents) {
        foundTalents = await Promise.all(
          createCharacterDto.talents.map((talentId) =>
            this.talentService.findOne(talentId),
          ),
        );
      }

      // Obtener instancias de equipamiento si existen
      let foundEquipments: Equipment[] = [];
      if (createCharacterDto.equipment) {
        foundEquipments = await Promise.all(
          createCharacterDto.equipment.map((equipmentId) =>
            this.equipmentService.findOne(equipmentId),
          ),
        );
      }

      // Obtener instancias de raza y fondo
      const foundRace = await this.raceService.findOne(createCharacterDto.race);
      const foundBackground = await this.backgroundService.findOne(
        createCharacterDto.background,
      );
      const foundClass = await this.classSerive.findOne(
        createCharacterDto.idClass,
        true,
      );

      const foundArchetype = createCharacterDto.idArchetype
        ? await this.archetypeService.findOne(
            createCharacterDto.idArchetype,
            true,
          )
        : null;

      // Crear la instancia de personaje
      const character = this.characterRepository.create({
        ...createCharacterDto,
        talent: foundTalents,
        equipment: foundEquipments,
        race: foundRace,
        background: foundBackground,
        class: foundClass,
        archetype: foundArchetype,
        user,
      });

      // Asignar la clase

      await this.characterRepository.save(character);

      const insertCharAbilities = [];

      for (const abilityId of createCharacterDto.competencySkills) {
        const searchAbility = await this.abilityService.findOne(abilityId);
        if (searchAbility) {
          const charAbility = new CharacterAbilities();
          charAbility.character = character;
          charAbility.ability = searchAbility;
          insertCharAbilities.push(this.charAbilities.create(charAbility));
        }
      }

      const abilities = await this.charAbilities.save(insertCharAbilities);

      abilities.forEach((ability) => {
        delete ability.character;
      });

      return { character, abilities };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async getAllinfo(id: number) {
    const character = await this.characterRepository.findOne({
      where: {
        idCharacter: id,
      },
      relations: {
        abilities: true,
        background: true,
        class: true,
        equipment: true,
        talent: true,
        archetype: true,
        race: true,
      },
    });
    if (!character)
      throw new NotFoundException(`Character with id ${id} not found.`);

    return character;
  }

  async findAll() {
    try {
      return await this.characterRepository.find({
        relations: {
          abilities: true,
          background: true,
          race: true,
          class: true,
          archetype: true,
          equipment: true,
        },
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: number) {
    const character = await this.characterRepository.findOne({
      where: {
        idCharacter: id,
      },
      relations: {
        abilities: true,
        background: true,
        race: true,
        class: true,
        archetype: true,
        equipment: true,
      },
    });
    if (!character)
      throw new NotFoundException(`Character with id ${id} not found.`);

    return character;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.findOne(id);

    const {
      equipment,
      competencySkills,
      talents,
      idArchetype,
      ...restToUpdate
    } = updateCharacterDto;

    console.log(restToUpdate);
    if (equipment) {
      const foundEquipment: Equipment[] = [];
      for (const equip of equipment) {
        foundEquipment.push(await this.equipmentService.findOne(+equip));
      }
      Object.assign(character, updateCharacterDto);
      character.equipment = foundEquipment;
    }

    if (idArchetype) {
      const foundArchetype = await this.archetypeService.findOne(idArchetype);

      if (!(foundArchetype.class.IdClass === character.class.IdClass)) {
        throw new BadRequestException(`Archetype not correct for the class.`);
      }
      character.archetype = foundArchetype;
    }

    if (talents) {
      const foundTalents: Talent[] = [];

      for (const talent of talents) {
        foundTalents.push(await this.talentService.findOne(+talent));
      }
      Object.assign(character, updateCharacterDto);
      character.talent = foundTalents;
    }

    if (competencySkills) {
      console.log(competencySkills);
      const insertCharAbilities = [];
      for (const abilityId of competencySkills) {
        const searchAbility = await this.abilityService.findOne(abilityId);
        if (searchAbility) {
          const charAbility = new CharacterAbilities();
          charAbility.character = character;
          charAbility.ability = searchAbility;
          insertCharAbilities.push(this.charAbilities.create(charAbility));
        }
        await this.charAbilities.delete({ character: character });
        await this.charAbilities.save(insertCharAbilities);
      }
    }
    Object.assign(character, restToUpdate);
    return await this.characterRepository.save(character);
  }

  async remove(id: number) {
    try {
      await this.characterRepository.delete(id);
      return 'Deleted Success.';
    } catch (error) {
      console.log(error);
    }
  }

  handleExceptions(error: any): never {
    console.log(error);
    throw new InternalServerErrorException('Unexpected Error, check console.');
  }
}
