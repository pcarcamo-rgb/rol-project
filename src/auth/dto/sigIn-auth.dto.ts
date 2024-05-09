import {
  IsArray,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class SigInDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsArray()
  roles: number[];
}
