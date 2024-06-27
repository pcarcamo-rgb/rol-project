import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

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

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  peculiarities: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  ideals: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  links: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  defects: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  @IsOptional()
  abilities?: number[];
}
