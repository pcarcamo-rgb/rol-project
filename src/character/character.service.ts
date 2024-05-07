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
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const { competencySkills, ...characterToCreate } = createCharacterDto;

      const character = this.characterRepository.create(characterToCreate);

      character.class = await this.classSerive.findOne(
        createCharacterDto.IdClass,
        true,
      );
      if (createCharacterDto.talents) {
        const foundTalents: Talent[] = [];

        for (const talent of createCharacterDto.talents) {
          foundTalents.push(await this.talentService.findOne(+talent));
        }
        character.talents = foundTalents;
      }

      await this.characterRepository.save(character);

      const insertCharAbilities = [];

      for (const abilityId of competencySkills) {
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
        talents: true,
      },
    });
    if (!character)
      throw new NotFoundException(`Character with id ${id} not found.`);

    return character;
  }

  async findAll() {
    try {
      return await this.characterRepository.find();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: number) {
    const character = await this.characterRepository.findOneBy({
      idCharacter: id,
    });
    if (!character)
      throw new NotFoundException(`Character with id ${id} not found.`);

    return character;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.findOne(id);

    const { equipment, competencySkills, talents } = updateCharacterDto;

    if (equipment) {
      const foundEquipment: Equipment[] = [];
      for (const equip of equipment) {
        foundEquipment.push(await this.equipmentService.findOne(+equip));
      }
      Object.assign(character, updateCharacterDto);
      character.equipment = foundEquipment;
    }

    if (talents) {
      const foundTalents: Talent[] = [];

      for (const talent of talents) {
        foundTalents.push(await this.talentService.findOne(+talent));
      }
      Object.assign(character, updateCharacterDto);
      character.talents = foundTalents;
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
    if (error.errno === 1452)
      if (error.sqlMessage.toLowerCase().includes('idbackground'))
        throw new BadRequestException(`Background id Not Exist.`);
    if (error.sqlMessage.toLowerCase().includes('idrace'))
      throw new BadRequestException(`Race id Not Exist.`);
    console.log(error);
    throw new InternalServerErrorException('Unexpected Error, check console.');
  }
}
