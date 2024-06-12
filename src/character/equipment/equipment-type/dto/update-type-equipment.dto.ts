import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeEquipmentDto } from './create-type-equipment.dto';

export class UpdateTypeEquipmentDto extends PartialType(
  CreateTypeEquipmentDto,
) {}
