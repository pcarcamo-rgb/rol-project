import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAbilityDto } from './dto/create-ability.dto';
import { UpdateAbilityDto } from './dto/update-ability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ability } from './entities/ability.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AbilitiesService {
  constructor(
    @InjectRepository(Ability)
    private readonly abilityRepository: Repository<Ability>,
  ) {}

  async create(createAbilityDto: CreateAbilityDto) {
    const newAbility = this.abilityRepository.create(createAbilityDto);

    await this.abilityRepository.save(newAbility);

    return newAbility;
  }

  async findAll() {
    return await this.abilityRepository.find();
  }

  async findOne(id: number) {
    const ability = await this.abilityRepository.findOneBy({ idAbility: id });

    if (!ability)
      throw new NotFoundException(`Ability with id ${id} not found.`);

    return ability;
  }

  async update(id: number, updateAbilityDto: UpdateAbilityDto) {
    const abilityToUpdated = await this.findOne(id);

    Object.assign(abilityToUpdated, updateAbilityDto);

    return await this.abilityRepository.save(abilityToUpdated);
  }

  async remove(id: number) {
    try {
      await this.abilityRepository.delete(id);
      return 'Delete Success.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
