import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

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
  typeEquipment: number;

  @IsArray()
  IDtags: number[];

  @IsString()
  @IsOptional()
  typeOfDamage?: string;

  @IsNumber()
  @Min(0)
  price: number;
}
