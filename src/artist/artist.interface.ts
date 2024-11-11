import { ApiProperty } from '@nestjs/swagger';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class ArtistClass {
  @ApiProperty({
    description: 'The ID of the artist',
    type: String,
    example: '506da2d4-2f9d-4e45-bf22-d654c17f0008',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the artist',
    type: String,
    example: 'testArtist',
  })
  name: string;

  @ApiProperty({
    description: 'Does the artist have Grammy',
    type: Boolean,
    example: true,
  })
  grammy: boolean;
}
