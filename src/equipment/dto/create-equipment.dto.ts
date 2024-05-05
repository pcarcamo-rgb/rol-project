import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Tags } from 'src/tags/entities/tag.entity';
import { TypeEquipment } from '../entities/equipment-type.entity';

export class CreateEquipmentDto {
  @IsString()
  @MinLength(1)
  nameEquipment: string;

  @IsString()
  @MinLength(1)
  descEquipment: string;

  @IsString()
  @IsOptional()
  damageEquipment?: string;

  @IsNumber()
  @IsOptional()
  armorEquipment: number;

  @IsNumber()
  typeEquipment: TypeEquipment;

  @IsArray()
  tags: Tags[];

  @IsString()
  typeOfDamage: string;

  @IsNumber()
  @Min(0)
  price: number;
}
