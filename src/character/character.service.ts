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

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(CharacterAbilities)
    private readonly charAbilities: Repository<CharacterAbilities>,

    private readonly equipmentService: EquipmentService,
    private readonly abilityService: AbilitiesService,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const { competencySkills, ...characterToCreate } = createCharacterDto;
      const character = this.characterRepository.create(characterToCreate);
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
    const character = await this.characterRepository
      .createQueryBuilder('character')
      .leftJoinAndSelect('character.abilities', 'abilities')
      .leftJoinAndSelect('abilities.ability', 'ability')
      .leftJoinAndSelect('character.background', 'background')
      .leftJoinAndSelect('character.race', 'race')
      .where('character.idCharacter = :id', { id })
      .getOne();

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

    const { equipment, competencySkills } = updateCharacterDto;

    if (equipment) {
      const foundEquipment: Equipment[] = [];
      for (const equip of equipment) {
        foundEquipment.push(await this.equipmentService.findOne(+equip));
      }
      Object.assign(character, updateCharacterDto);
      character.equipment = foundEquipment;
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
