import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArchetypeDto } from './dto/create-archetype.dto';
import { UpdateArchetypeDto } from './dto/update-archetype.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Archetype } from './entities/archetype.entity';
import { Repository } from 'typeorm';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class ArchetypeService {
  constructor(
    @InjectRepository(Archetype)
    private readonly archetypeRepository: Repository<Archetype>,
    private readonly classService: ClassService,
  ) {}
  async create(createArchetypeDto: CreateArchetypeDto) {
    const { IdClass, ...archetype } = createArchetypeDto;

    const clas: Class = await this.classService.findOne(IdClass, true);

    const newArchetype = this.archetypeRepository.create({
      class: clas,
      ...archetype,
    });

    return await this.archetypeRepository.save(newArchetype);
  }

  async findAll() {
    return await this.archetypeRepository.find();
  }

  async findOne(id: number, isOnlyArchetype?: boolean) {
    if (isOnlyArchetype) {
      const archetype = await this.archetypeRepository.findOneBy({
        IdArchetype: id,
      });
      if (!archetype)
        throw new NotFoundException(`Archetype with id ${id} not found.`);
      return archetype;
    }
    const archetype = await this.archetypeRepository.findOne({
      where: {
        IdArchetype: id,
      },
      relations: {
        trait: true,
      },
    });

    if (!archetype)
      throw new NotFoundException(`Archetype with id ${id} not found.`);
    return archetype;
  }

  async update(id: number, updateArchetypeDto: UpdateArchetypeDto) {
    const archetype = await this.findOne(id, true);
    Object.assign(archetype, updateArchetypeDto);

    return await this.archetypeRepository.save(archetype);
  }

  async remove(id: number) {
    try {
      await this.archetypeRepository.delete(id);
      return 'Delete Sucess.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
