import {
  IsDefined,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Login should contain at least one character' })
  login: string;

  @IsDefined()
  password: string;
}
