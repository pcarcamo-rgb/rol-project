import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

import { Background } from 'src/background/entities/background.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Race } from 'src/race/entities/race.entity';
import { Talent } from 'src/talent/entities/talent.entity';

export class CreateCharacterDto {
  @IsNumber()
  @Min(1)
  background: Background;

  @IsNumber()
  @Min(1)
  IdClass: number;

  @IsNumber()
  @Min(1)
  race: Race;

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
  equipment?: Equipment[];

  @IsArray()
  @IsOptional()
  talents?: Talent[];
}
