import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTypeEquipmentDto } from './dto/create-type-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEquipment } from '../entities/equipment-type.entity';
import { Repository } from 'typeorm';
import { UpdateTypeEquipmentDto } from './dto/update-type-equipment.dto';

@Injectable()
export class TypeEquipmentService {
  constructor(
    @InjectRepository(TypeEquipment)
    private readonly typeEquipmentRepository: Repository<TypeEquipment>,
  ) {}

  async createType(createTypeEquipmentDto: CreateTypeEquipmentDto) {
    const newTypeEquipment = this.typeEquipmentRepository.create(
      createTypeEquipmentDto,
    );

    return await this.typeEquipmentRepository.save(newTypeEquipment);
  }

  async findAllType() {
    return await this.typeEquipmentRepository.find();
  }

  async findOneType(id: number) {
    const typeEquipment = await this.typeEquipmentRepository.findOneBy({
      IdTypeEquipment: id,
    });
    if (!typeEquipment)
      throw new NotFoundException(`TypeEquipment with id ${id} not found.`);

    return typeEquipment;
  }

  async updateType(id: number, updateTypeEquipmentDto: UpdateTypeEquipmentDto) {
    const typeToUpdate = await this.findOneType(id);

    Object.assign(typeToUpdate, updateTypeEquipmentDto);

    return await this.typeEquipmentRepository.save(typeToUpdate);
  }

  async removeType(id: number) {
    try {
      await this.typeEquipmentRepository.delete(id);
      return 'Delete Success.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
