import { IsString, MinLength } from 'class-validator';

export class CreateBackgroundDto {
  @IsString()
  @MinLength(1)
  backgroundName: string;

  @IsString()
  @MinLength(1)
  background: string;
}
