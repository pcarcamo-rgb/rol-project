import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBackgroundDto } from './dto/create-background.dto';
import { UpdateBackgroundDto } from './dto/update-background.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Background } from './entities/background.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BackgroundService {
  constructor(
    @InjectRepository(Background)
    private readonly backgroundRepository: Repository<Background>,
  ) {}

  async create(createBackgroundDto: CreateBackgroundDto) {
    try {
      const newBackground =
        this.backgroundRepository.create(createBackgroundDto);
      const background = await this.backgroundRepository.save(newBackground);

      return background;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findAll() {
    return await this.backgroundRepository.find();
  }

  async findOne(id: number) {
    const foundBackground = await this.backgroundRepository.findOneBy({
      IdBackground: id,
    });

    if (!foundBackground)
      throw new NotFoundException(`Background with id ${id} not found.`);

    return foundBackground;
  }

  async update(id: number, updateBackgroundDto: UpdateBackgroundDto) {
    const background = await this.findOne(id);

    Object.assign(background, updateBackgroundDto);

    return await this.backgroundRepository.save(background);
  }

  async remove(id: number) {
    try {
      await this.backgroundRepository.delete(id);
      return 'Delete Success.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
