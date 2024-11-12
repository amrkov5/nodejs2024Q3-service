import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interface';
import { Favorites } from 'src/favorites/favorites.interface';
import { Track } from 'src/track/track.interface';
import { User } from 'src/user/user.interface';

export const userDb: Map<string, User> = new Map();

export const artistDb: Map<string, Artist> = new Map();

export const trackDb: Map<string, Track> = new Map();

export const albumDb: Map<string, Album> = new Map();

export const favoritesDb: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
