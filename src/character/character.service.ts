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

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const character = this.characterRepository.create(createCharacterDto);
      return await this.characterRepository.save(character);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async getAllinfo(id: number) {
    const character = await this.characterRepository.find({
      relations: {
        background: true,
        race: true,
      },
      where: {
        idCharacter: id,
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

    Object.assign(character, updateCharacterDto);

    return await this.characterRepository.save(character);
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
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
