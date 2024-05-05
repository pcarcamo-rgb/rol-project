import { IsEnum, IsString, MinLength } from 'class-validator';
import { Caracteristics } from 'src/interfaces/caracteristics.enum';

export class CreateAbilityDto {
  @IsString()
  @MinLength(3)
  abilityDesc: string;

  @IsEnum(
    { Caracteristics },
    {
      message: () => {
        const abilitiesAllowed = Object.values(Caracteristics);
        return `Carateristic must be one of this: ${abilitiesAllowed}`;
      },
    },
  )
  caracteristic: string;
}
