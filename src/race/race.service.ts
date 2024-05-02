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

@Injectable()
export class RaceService {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
  ) {}

  async create(createRaceDto: CreateRaceDto) {
    try {
      const newRace = this.raceRepository.create(createRaceDto);
      const race = await this.raceRepository.save(newRace);
      return race;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const races = await this.raceRepository.find();
      return races;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const race = await this.raceRepository.findOneBy({ idRace: id });

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
