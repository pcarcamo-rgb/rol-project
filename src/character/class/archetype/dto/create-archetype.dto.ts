import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateArchetypeDto {
  @ApiProperty({ description: 'Description for the archetype' })
  @IsString()
  @MinLength(1)
  descArchetype: string;

  @ApiProperty({ description: 'Archetype Name' })
  @IsString()
  @MinLength(1)
  nameArchetype: string;

  @ApiProperty({
    description: 'Id of the class to which the archetype belongs',
  })
  @IsNumber()
  @Min(1)
  IdClass: number;
}
