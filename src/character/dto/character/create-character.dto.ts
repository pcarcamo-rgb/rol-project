import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Background } from 'src/background/entities/background.entity';
import { Race } from 'src/race/entities/race.entity';

export class CreateCharacterDto {
  @IsNumber()
  @Min(1)
  background: Background;

  @IsNumber()
  @Min(1)
  race: Race;

  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsOptional()
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
}
