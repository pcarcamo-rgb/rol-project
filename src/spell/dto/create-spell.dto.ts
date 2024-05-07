import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Class } from 'src/class/entities/class.entity';

export class CreateSpellDto {
  @IsNumber()
  @Min(1)
  idClass: Class;

  @IsString()
  @MinLength(1)
  nameSpell: string;

  @IsNumber()
  @Min(1)
  levelSpell: number;

  @IsString()
  castTime: 'action' | 'reaction' | 'additional action';

  @IsString()
  @MinLength(1)
  @IsOptional()
  componentsSpell?: string;

  @IsNumber()
  @Min(1)
  range: number;

  @IsString()
  @IsOptional()
  savingThrow?:
    | 'strength'
    | 'dexterity'
    | 'constitution'
    | 'intelligence'
    | 'wisdom'
    | 'charisma';

  @IsString()
  @IsOptional()
  dmgSpell?: string;

  @IsString()
  @MinLength(1)
  descSpell: string;

  @IsString()
  @MinLength(1)
  atHigherLevels: string;
}
