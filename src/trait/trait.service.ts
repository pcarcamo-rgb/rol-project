import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trait } from './entities/trait.entity';
import { Repository } from 'typeorm';
import { ClassService } from 'src/class/class.service';
import { ArchetypeService } from 'src/archetype/archetype.service';
import { Archetype } from 'src/archetype/entities/archetype.entity';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class TraitService {
  constructor(
    @InjectRepository(Trait)
    private readonly traitRepository: Repository<Trait>,

    private readonly classService: ClassService,
    private readonly archetypeService: ArchetypeService,
  ) {}

  async create(createTraitDto: CreateTraitDto) {
    const { IdClass, IdArchetype, ...trait } = createTraitDto;

    // Verificar si IdClass está presente y válido
    const classPromise = IdClass
      ? this.classService.findOne(+IdClass, true)
      : Promise.resolve(null);
    const clas: Class = await classPromise;

    // Verificar si IdArchetype está presente y válido
    const archetypePromise = IdArchetype
      ? this.archetypeService.findOne(+IdArchetype, true)
      : Promise.resolve(null);
    const archetype: Archetype = await archetypePromise;

    const newTrait = this.traitRepository.create({
      class: clas,
      archetype,
      ...trait,
    });

    return await this.traitRepository.save(newTrait);
  }

  async findAll() {
    return await this.traitRepository.find();
  }

  async findOne(id: number, isOnlyTrait?: boolean) {
    if (isOnlyTrait) {
      const archetype = await this.traitRepository.findOneBy({ IdTrait: id });
      if (!archetype)
        throw new NotFoundException(`Trait with id ${id} not found.`);

      return archetype;
    }
    const archetype = await this.traitRepository.findOne({
      where: {
        IdTrait: id,
      },
      relations: {
        class: true,
        archetype: true,
      },
    });

    if (!archetype)
      throw new NotFoundException(`Trait with id ${id} not found.`);

    return archetype;
  }

  async update(id: number, updateTraitDto: UpdateTraitDto) {
    const trait = await this.findOne(id, true);

    Object.assign(trait, updateTraitDto);
    return await this.traitRepository.save(trait);
  }

  async remove(id: number) {
    try {
      await this.traitRepository.delete(id);
      return 'Delete Sucess.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
