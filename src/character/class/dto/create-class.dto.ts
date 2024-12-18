import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClassDto {
  @IsString()
  @MinLength(1)
  descClass: string;

  @IsNumber()
  lifeDice: number;

  @IsBoolean()
  @IsOptional()
  isSpellCaster?: boolean;
}
