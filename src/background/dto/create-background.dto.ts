import { IsArray, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateBackgroundDto {
  @IsString()
  @MinLength(1)
  backgroundName: string;

  @IsString()
  @MinLength(1)
  backgroundDesc: string;

  @IsString()
  @MinLength(1)
  background: string;

  @IsString()
  @IsArray()
  @MinLength(1)
  peculiarities: string[];

  @IsString()
  @IsArray()
  @MinLength(1)
  ideals: string[];

  @IsString()
  @IsArray()
  @MinLength(1)
  links: string[];

  @IsString()
  @IsArray()
  @MinLength(1)
  defects: string[];

  @IsNumber()
  @IsArray()
  @Min(1)
  abilities: number[];
}
