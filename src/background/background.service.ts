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
import { Ideal } from './entities/ideal.entity';
import { Link } from './entities/link.entity';
import { Defect } from './entities/defect.entity';
import { Peculiarity } from './entities/peculiarity.entity';
import { AbilitiesService } from 'src/character/abilities/abilities.service';
import { Ability } from 'src/character/abilities/entities/ability.entity';

@Injectable()
export class BackgroundService {
  constructor(
    @InjectRepository(Background)
    private readonly backgroundRepository: Repository<Background>,

    @InjectRepository(Ideal)
    private readonly idealRepository: Repository<Ideal>,

    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,

    @InjectRepository(Defect)
    private readonly defectRepository: Repository<Defect>,

    @InjectRepository(Peculiarity)
    private readonly peculiarityRepository: Repository<Peculiarity>,

    private readonly abilityService: AbilitiesService,
  ) {}

  async create(createBackgroundDto: CreateBackgroundDto) {
    try {
      const {
        ideals,
        links,
        defects,
        peculiarities,
        abilities,
        ...restBackground
      } = createBackgroundDto;

      const newAbilities: Ability[] = [];
      if (abilities) {
        for (const ability of abilities) {
          const foundAbility: Ability =
            await this.abilityService.findOne(ability);
          newAbilities.push(foundAbility);
        }
      }
      const newBackground = this.backgroundRepository.create({
        ability: newAbilities,
        ...restBackground,
      });
      const background = await this.backgroundRepository.save(newBackground);

      ideals.forEach(async (ideal) => {
        const newIdeal = this.idealRepository.create({
          descIdeal: ideal,
          background,
        });

        await this.idealRepository.save(newIdeal);
      });

      links.forEach(async (link) => {
        const newLink = this.linkRepository.create({
          descLink: link,
          background,
        });

        await this.linkRepository.save(newLink);
      });

      defects.forEach(async (defect) => {
        const newDefect = this.defectRepository.create({
          descDefect: defect,
          background,
        });
        await this.defectRepository.save(newDefect);
      });

      peculiarities.forEach(async (peculiarity) => {
        const newPeculiarity = this.peculiarityRepository.create({
          descPeculiarity: peculiarity,
          background,
        });

        await this.peculiarityRepository.save(newPeculiarity);
      });

      return background;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findAll() {
    return await this.backgroundRepository.find({
      select: {
        IdBackground: true,
        backgroundDesc: true,
        backgroundName: true,
      },
    });
  }

  async findOne(id: number) {
    const foundBackground = await this.backgroundRepository.findOne({
      where: {
        IdBackground: id,
      },
      relations: {
        ability: true,
        defect: true,
        ideal: true,
        link: true,
        peculiarity: true,
      },
    });

    if (!foundBackground)
      throw new NotFoundException(`Background with id ${id} not found.`);

    return foundBackground;
  }

  async update(id: number, updateBackgroundDto: UpdateBackgroundDto) {
    const {
      backgroundName,
      backgroundDesc,
      background,
      ideals,
      peculiarities,
      links,
      defects,
      //abilities,
    } = updateBackgroundDto;

    const backgroundToUpdate = await this.findOne(id);

    backgroundToUpdate.backgroundName = backgroundName;
    backgroundToUpdate.backgroundDesc = backgroundDesc;
    backgroundToUpdate.background = background;

    if (ideals) {
      backgroundToUpdate.ideal = await Promise.all(
        ideals.map((ideal) =>
          this.idealRepository.create({
            background: backgroundToUpdate,
            descIdeal: ideal,
          }),
        ),
      );
    }

    if (peculiarities) {
      backgroundToUpdate.peculiarity = await Promise.all(
        peculiarities.map((peculiarity) =>
          this.peculiarityRepository.create({
            background: backgroundToUpdate,
            descPeculiarity: peculiarity,
          }),
        ),
      );
    }

    if (links) {
      backgroundToUpdate.link = await Promise.all(
        links.map((link) =>
          this.linkRepository.create({
            background: backgroundToUpdate,
            descLink: link,
          }),
        ),
      );
    }

    if (defects) {
      backgroundToUpdate.defect = await Promise.all(
        defects.map((defect) =>
          this.defectRepository.create({
            background: backgroundToUpdate,
            descDefect: defect,
          }),
        ),
      );
    }

    return this.backgroundRepository.save(backgroundToUpdate);
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
