import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRaceDto {
  @IsString()
  @MinLength(1)
  race: string;

  @IsString()
  @MinLength(1)
  descRace: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  trait: number[];
}
