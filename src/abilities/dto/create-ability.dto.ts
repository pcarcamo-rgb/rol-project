import { IsString, MinLength } from 'class-validator';

export class CreateAbilityDto {
  @IsString()
  @MinLength(3)
  abilityDesc: string;
}
