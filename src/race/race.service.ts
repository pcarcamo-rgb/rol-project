import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';
import { Repository } from 'typeorm';
import { TraitService } from 'src/trait/trait.service';
import { Trait } from 'src/trait/entities/trait.entity';

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
    private readonly traitService: TraitService,
  ) {}

  async create(createRaceDto: CreateRaceDto) {
    try {
      const traits: Trait[] = [];

      if (createRaceDto.trait) {
        for (const trait of createRaceDto.trait) {
          const founTrait: Trait = await this.traitService.findOne(trait);

          traits.push(founTrait);
        }
      }

      const newRace: Race = this.raceRepository.create({
        ...createRaceDto,
        trait: traits,
      });
      const race = await this.raceRepository.save(newRace);
      return race;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const races = await this.raceRepository.find({
        relations: {
          trait: true,
        },
      });
      return races;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const race = await this.raceRepository.findOne({
      where: {
        idRace: id,
      },
      relations: {
        trait: true,
      },
    });

    if (!race) throw new NotFoundException(`Race with id ${id} not found.`);
    return race;
  }

  async update(id: number, updateRaceDto: UpdateRaceDto) {
    const race = await this.findOne(id);

    Object.assign(race, updateRaceDto);

    return await this.raceRepository.save(race);
  }

  async remove(id: number) {
    const { affected } = await this.raceRepository.delete(id);
    if (affected === 0)
      throw new NotFoundException(`Race with id ${id} not exist.`);
    return 'Delete Success.';
  }
}
