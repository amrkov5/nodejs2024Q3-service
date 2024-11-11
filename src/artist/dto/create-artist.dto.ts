import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The name of the artist',
    type: String,
    example: 'testArtist',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Artist name should contain at least one character' })
  name: string;

  @ApiProperty({
    description: 'Does the artist have Grammy',
    type: Boolean,
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
