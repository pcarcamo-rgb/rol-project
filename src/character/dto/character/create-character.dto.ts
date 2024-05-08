import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCharacterDto {
  @IsNumber()
  @Min(1)
  background: number;

  @IsNumber()
  @Min(1)
  idClass: number;

  @IsNumber()
  @Min(1)
  race: number;

  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @Min(1)
  level: number;

  @IsNumber()
  @Min(1)
  strength: number;

  @IsNumber()
  @Min(1)
  dexterity: number;

  @IsNumber()
  @Min(1)
  constitution: number;

  @IsNumber()
  @Min(1)
  intelligence: number;

  @IsNumber()
  @Min(1)
  wisdom: number;

  @IsNumber()
  @Min(1)
  charisma: number;

  @Type(() => Number)
  @IsArray()
  competencySkills: number[];

  @IsArray()
  @IsOptional()
  equipment?: number[];

  @IsArray()
  @IsOptional()
  talents?: number[];
}
