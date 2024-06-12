import { IsEnum, IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Caracteristics } from 'src/interfaces/caracteristics.enum';

export class CreateAbilityDto {
  @ApiProperty({ description: 'Name of the new skill', uniqueItems: true })
  @IsString()
  @MinLength(3)
  abilityDesc: string;

  @ApiProperty({
    description:
      'It can only be: strength | dexterity | constitution | wisdom | intelligence | charisma ',
  })
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
