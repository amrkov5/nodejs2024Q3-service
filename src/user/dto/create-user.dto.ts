import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The login of the user',
    type: String,
    example: 'testUser',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Login should contain at least one character' })
  login: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'password123',
  })
  @IsDefined()
  password: string;
}
