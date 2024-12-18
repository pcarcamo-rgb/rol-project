import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { In, Repository } from 'typeorm';

import { TypeEquipmentService } from './equipment-type/type-equipment.service';
import { Tags } from './tags/entities/tag.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,

    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,

    private readonly typeEquipmentService: TypeEquipmentService,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      const { IDtags, ...equipment } = createEquipmentDto;

      const defTags = await this.tagsRepository.findBy({
        IdTagEquipment: In(IDtags),
      });

      const typeEquipFound = await this.typeEquipmentService.findOneType(
        equipment.typeEquipment,
      );

      const newEquipment = this.equipmentRepository.create({
        ...equipment,
        tags: defTags,
        typeEquipment: typeEquipFound,
      });

      return await this.equipmentRepository.save(newEquipment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findAll() {
    return await this.equipmentRepository.find({
      relations: {
        tags: true,
        typeEquipment: true,
      },
    });
  }

  async findOne(id: number) {
    const equipment = this.equipmentRepository.findOne({
      where: { IdEquipment: id },
      relations: {
        tags: true,
        typeEquipment: true,
      },
    });
    if (!equipment)
      throw new NotFoundException(`Equipment with id ${id} not found.`);
    return equipment;
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipmentToUpdate = await this.findOne(id);

    const { IDtags, ...equipment } = updateEquipmentDto;

    if (IDtags) {
      const defTags = await this.tagsRepository.findBy({
        IdTagEquipment: In(IDtags),
      });
      Object.assign(equipmentToUpdate, { tags: defTags, ...equipment });
    } else {
      Object.assign(equipmentToUpdate, updateEquipmentDto);
    }

    return await this.equipmentRepository.save(equipmentToUpdate);
  }

  async remove(id: number) {
    try {
      await this.equipmentRepository.delete(id);
      return 'Delete Success.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
