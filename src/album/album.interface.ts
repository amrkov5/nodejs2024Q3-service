import { ApiProperty } from '@nestjs/swagger';

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class AlbumClass {
  @ApiProperty({
    description: 'Album ID',
    type: String,
    format: 'uuid',
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the album',
    type: String,
    example: 'testAlbum',
  })
  name: string;

  @ApiProperty({
    description: 'Album year',
    type: Number,
    example: 1998,
  })
  year: number;

  @ApiProperty({
    description: 'The ID of the artist',
    type: String,
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  artistId: string | null;
}
