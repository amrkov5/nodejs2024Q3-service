import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Artist name should contain at least one character' })
  name: string;

  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
