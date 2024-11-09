import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Login should contain at least one character' })
  login: string;

  @IsDefined()
  password: string;
}
