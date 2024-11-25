import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'The name of the track',
    type: String,
    example: 'testTrack',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty({ message: 'Track name should contain at least one character' })
  name: string;

  @ApiProperty({
    description: 'ID of the artist',
    type: String,
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  @IsOptional()
  @IsString({ message: 'The artistId must be a string' })
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album',
    type: String,
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  @IsOptional()
  @IsString({ message: 'The albumId must be a string' })
  albumId: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    type: Number,
    example: 356,
  })
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'Please add track duration' })
  duration: number;
}
