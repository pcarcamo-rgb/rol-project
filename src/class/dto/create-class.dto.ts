import { IsString, MinLength } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @MinLength(1)
  descClass: string;
}
