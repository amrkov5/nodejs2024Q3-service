import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Please enter the old password' })
  oldPassword: string;

  @IsDefined()
  @IsString()
  newPassword: string;
}
