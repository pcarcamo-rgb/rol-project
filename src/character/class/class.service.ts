import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    try {
      const newClass = this.classRepository.create(createClassDto);

      const saveClass = await this.classRepository.save(newClass);

      return saveClass;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.classRepository.find({
      relations: {
        archetype: true,
      },
    });
  }

  async findOne(id: number, isOnlyClass?: boolean) {
    if (isOnlyClass) {
      const clas = await this.classRepository.findOneBy({ IdClass: id });
      if (!clas) throw new NotFoundException(`Class with id ${id} not found.`);
      return clas;
    }

    const clas = await this.classRepository.findOne({
      where: { IdClass: id },
      relations: {
        trait: true,
        archetype: true,
      },
    });

    if (!clas) throw new NotFoundException(`Class with id ${id} not found.`);
    return clas;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    const foundClass = await this.findOne(id, true);

    Object.assign(foundClass, updateClassDto);

    await this.classRepository.save(foundClass);

    return foundClass;
  }

  async remove(id: number) {
    try {
      const { affected } = await this.classRepository.delete(id);
      if (affected === 0) {
        throw new NotFoundException(`Class with id ${id} not found.`);
      }
      return 'Delete Success.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
