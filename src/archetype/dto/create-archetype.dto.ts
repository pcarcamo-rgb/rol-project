import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { Class } from 'src/class/entities/class.entity';

export class CreateArchetypeDto {
  @IsString()
  @MinLength(1)
  descArchetype: string;

  @IsNumber()
  @Min(1)
  IdClass: Class;
}
