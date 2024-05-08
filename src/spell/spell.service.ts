import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Spell } from './entities/spell.entity';
import { ClassService } from 'src/class/class.service';
import { Repository } from 'typeorm';

@Injectable()
export class SpellService {
  constructor(
    @InjectRepository(Spell)
    private readonly spellRepository: Repository<Spell>,

    private readonly classService: ClassService,
  ) {}

  async create(createSpellDto: CreateSpellDto) {
    const { idClass, ...spell } = createSpellDto;

    const classSpell = await this.classService.findOne(+idClass, true);

    const newSpell = this.spellRepository.create({ ...spell, classSpell });
    try {
      return await this.spellRepository.save(newSpell);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.spellRepository.find();
  }

  async findOne(id: number) {
    const spell = await this.spellRepository.findOneBy({ idSpeel: id });
    if (!spell) throw new NotFoundException(`Spell with id ${id} not found.`);

    return spell;
  }

  async update(id: number, updateSpellDto: UpdateSpellDto) {
    const spell = await this.findOne(id);

    Object.assign(spell, updateSpellDto);

    return await this.spellRepository.save(spell);
  }

  async remove(id: number) {
    const { affected } = await this.spellRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Spell with id ${id} not found.`);
    }
    return 'Delete Success.';
  }
}
