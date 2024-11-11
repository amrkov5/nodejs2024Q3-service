import { ApiProperty } from '@nestjs/swagger';
import { Album, AlbumClass } from 'src/album/album.interface';
import { Artist, ArtistClass } from 'src/artist/artist.interface';
import { Track, TrackClass } from 'src/track/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoritesResponseClass {
  @ApiProperty({ type: [ArtistClass] })
  artists: Artist[];

  @ApiProperty({ type: [AlbumClass] })
  albums: Album[];

  @ApiProperty({ type: [TrackClass] })
  tracks: Track[];
}
