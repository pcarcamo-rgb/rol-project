import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateArchetypeDto {
  @IsString()
  @MinLength(1)
  descArchetype: string;

  @IsString()
  @MinLength(1)
  nameArchetype: string;

  @IsNumber()
  @Min(1)
  IdClass: number;
}
