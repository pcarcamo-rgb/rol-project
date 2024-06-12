import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talent } from './entities/talent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TalentService {
  constructor(
    @InjectRepository(Talent)
    private readonly talentRepository: Repository<Talent>,
  ) {}
  async create(createTalentDto: CreateTalentDto) {
    const talent = this.talentRepository.create(createTalentDto);

    return await this.talentRepository.save(talent);
  }

  async findAll() {
    return await this.talentRepository.find();
  }

  async findOne(id: number) {
    const talent = await this.talentRepository.findOneBy({ idTalent: id });

    if (!talent) throw new NotFoundException(`Talent with id ${id} not found.`);

    return talent;
  }

  async update(id: number, updateTalentDto: UpdateTalentDto) {
    const talent = await this.findOne(id);

    Object.assign(talent, updateTalentDto);

    return await this.talentRepository.save(talent);
  }

  async remove(id: number) {
    const { affected } = await this.talentRepository.delete(id);

    if (affected === 0)
      throw new NotFoundException(`Talent with id ${id} not found.`);

    return 'Delete Success.';
  }
}
