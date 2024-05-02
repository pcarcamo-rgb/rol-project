import { IsString, MinLength } from 'class-validator';

export class CreateRaceDto {
  @IsString()
  @MinLength(1)
  race: string;
}
