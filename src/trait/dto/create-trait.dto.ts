import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTraitDto {
  @IsString()
  @MinLength(1)
  nameTrait: string;

  @IsString()
  @MinLength(1)
  descTrait: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  IdClass?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  IdArchetype?: number;
}
