import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Archetype } from 'src/archetype/entities/archetype.entity';
import { Class } from 'src/class/entities/class.entity';

export class CreateTraitDto {
  @IsString()
  @MinLength(1)
  nameTrait: string;

  @IsString()
  @MinLength(1)
  descTrait: string;

  @IsNumber()
  @Min(1)
  level: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  IdClass?: Class;

  @IsNumber()
  @Min(1)
  IdArchetype: Archetype;
}
