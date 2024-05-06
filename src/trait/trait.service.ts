import { Injectable } from '@nestjs/common';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';

@Injectable()
export class TraitService {
  create(createTraitDto: CreateTraitDto) {
    return 'This action adds a new trait';
  }

  findAll() {
    return `This action returns all trait`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trait`;
  }

  update(id: number, updateTraitDto: UpdateTraitDto) {
    return `This action updates a #${id} trait`;
  }

  remove(id: number) {
    return `This action removes a #${id} trait`;
  }
}
