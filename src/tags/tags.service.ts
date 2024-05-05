import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagRepository: Repository<Tags>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const newTag = this.tagRepository.create(createTagDto);

      await this.tagRepository.save(newTag);
      return newTag;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  findOne(id: number) {
    const tag = this.tagRepository.findOneBy({ IdTagEquipment: id });
    if (!tag) throw new NotFoundException(`Tag with id ${id} not found.`);
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tagToUpdated = await this.findOne(id);

    Object.assign(tagToUpdated, updateTagDto);

    return await this.tagRepository.save(tagToUpdated);
  }

  async remove(id: number) {
    try {
      await this.tagRepository.delete(id);
      return 'Delete Success.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
