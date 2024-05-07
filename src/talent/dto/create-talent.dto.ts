import { IsString, MinLength } from 'class-validator';

export class CreateTalentDto {
  @IsString()
  @MinLength(1)
  nameTalent: string;

  @IsString()
  @MinLength(1)
  descTalent: string;
}
