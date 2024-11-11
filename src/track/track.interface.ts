import { ApiProperty } from '@nestjs/swagger';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class TrackClass {
  @ApiProperty({
    description: 'ID of the track',
    type: String,
    format: 'uuid',
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the track',
    type: String,
    example: 'testTrack',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the artist',
    type: String,
    format: 'uuid',
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album',
    type: String,
    format: 'uuid',
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    type: Number,
    example: 356,
  })
  duration: number;
}
