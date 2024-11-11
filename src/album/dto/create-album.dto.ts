import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The name of the album',
    type: String,
    example: 'testAlbum',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Album name should contain at least one character' })
  name: string;

  @ApiProperty({
    description: 'The ID of the artist',
    type: String,
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  @IsOptional()
  @IsString({ message: 'The artistId must be a string' })
  artistId: string | null;

  @ApiProperty({
    description: 'Album year',
    type: Number,
    example: 1998,
  })
  @IsDefined()
  @IsNumber()
  @IsNotEmpty({ message: 'Please add album year' })
  year: number;
}
