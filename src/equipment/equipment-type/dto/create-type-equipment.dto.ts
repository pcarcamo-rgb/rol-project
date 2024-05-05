import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTypeEquipmentDto {
  @IsString()
  @MinLength(1)
  descTypeEquipment: string;

  @IsBoolean()
  @IsOptional()
  isArmor?: boolean;

  @IsBoolean()
  @IsOptional()
  isWeapon?: boolean;
}
