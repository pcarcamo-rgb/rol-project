import { IsPositive, MinLength } from 'class-validator';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSpellDto {
  @IsNumber()
  @Min(1)
  idClass: number;

  @IsString()
  @MinLength(1)
  nameSpell: string;

  @IsString()
  @MinLength(1)
  typeSpell: string;

  @IsNumber()
  @IsPositive()
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
