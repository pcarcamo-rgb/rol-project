import { Injectable } from '@nestjs/common';
import { CreateArchetypeDto } from './dto/create-archetype.dto';
import { UpdateArchetypeDto } from './dto/update-archetype.dto';

@Injectable()
export class ArchetypeService {
  create(createArchetypeDto: CreateArchetypeDto) {
    return 'This action adds a new archetype';
  }

  findAll() {
    return `This action returns all archetype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archetype`;
  }

  update(id: number, updateArchetypeDto: UpdateArchetypeDto) {
    return `This action updates a #${id} archetype`;
  }

  remove(id: number) {
    return `This action removes a #${id} archetype`;
  }
}
