import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: "The old user's password",
    type: String,
    example: 'testUser',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Please enter the old password' })
  oldPassword: string;

  @ApiProperty({
    description: "The new user's password",
    type: String,
    example: 'testUser',
  })
  @IsDefined()
  @IsString()
  newPassword: string;
}
