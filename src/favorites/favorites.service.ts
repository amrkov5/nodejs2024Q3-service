import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albumDb, artistDb, favoritesDb, trackDb } from 'src/db/db';
import { isUUID } from 'class-validator';
import { FavoritesResponse } from './favorites.interface';
import { Album } from 'src/album/album.interface';
import { Track } from 'src/track/track.interface';
import { Artist } from 'src/artist/artist.interface';

@Injectable()
export class FavoritesService {
  enrichFavorites(instance: 'album'): Album[];
  enrichFavorites(instance: 'track'): Track[];
  enrichFavorites(instance: 'artist'): Artist[];
  enrichFavorites(instance: string) {
    switch (instance) {
      case 'album':
        return favoritesDb.albums
          .map((album) => albumDb.get(album))
          .filter((el) => el);
      case 'track':
        return favoritesDb.tracks
          .map((track) => trackDb.get(track))
          .filter((el) => el);
      case 'artist':
        return favoritesDb.artists
          .map((artist) => artistDb.get(artist))
          .filter((el) => el);
    }
  }

  getFavorites(): FavoritesResponse {
    const albums = this.enrichFavorites('album');
    const tracks = this.enrichFavorites('track');
    const artists = this.enrichFavorites('artist');
    return { artists, tracks, albums };
  }

  addToFavorites(instance: string, id: string) {
    let db: Map<string, Album> | Map<string, Track> | Map<string, Artist>;
    const instanceInFavs = `${instance}s`;
    switch (instance) {
      case 'album':
        db = albumDb;
        break;
      case 'track':
        db = trackDb;
        break;
      case 'artist':
        db = artistDb;
        break;
      default:
        throw new NotFoundException(`Cannot POST /favs/${instance}/${id}`);
    }
    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Please enter valid ${instance} ID`);
    }

    if (!db.has(id)) {
      throw new UnprocessableEntityException(
        `${instance} ID hasn't been found`,
      );
    }

    favoritesDb[instanceInFavs].push(id);

    return this.getFavorites();
  }

  deleteFromFavorites(instance: string, id: string) {
    const instanceInFavs = `${instance}s`;
    if (!['album', 'track', 'artist'].includes(instance)) {
      throw new NotFoundException(`Cannot DELETE /favs/${instance}/${id}`);
    }

    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Please enter valid ${instance} ID`);
    }

    if (!favoritesDb[instanceInFavs].includes(id)) {
      throw new NotFoundException(`${instance} ID hasn't been found`);
    }

    const idsIndexesToDelete: number[] = favoritesDb[instanceInFavs]
      .map((el: string, index: number) => {
        console.log('index', index);
        console.log('element', el);
        console.log('id', id);
        console.log(el === id);
        if (el === id) {
          return index;
        }
        return;
      })
      .filter((i: number) => i);
    console.log(idsIndexesToDelete);
    idsIndexesToDelete.reverse().forEach((i) => {
      favoritesDb[instanceInFavs].splice(i, 1);
    });

    console.log(this.getFavorites());

    return this.getFavorites();
  }
}
