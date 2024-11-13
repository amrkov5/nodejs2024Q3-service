import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { albumDb, trackDb } from 'src/db/db';
import { isUUID } from 'class-validator';
import { Album } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  getAlbums(): Album[] {
    return [...albumDb.values()];
  }

  getAlbumById(id: string): Album {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid album ID.');
    }
    const foundAlbum = albumDb.get(id);
    if (!foundAlbum) {
      throw new NotFoundException("Album with specified ID hasn't been found.");
    }
    return foundAlbum;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    // const isAlbumAlreadyAdded = [...albumDb.values()].filter((album) => {
    //   const { id, ...albumWithoutId } = album;
    //   const objToCheck = {
    //     artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
    //     ...createAlbumDto,
    //   };
    //   if (JSON.stringify(albumWithoutId) === JSON.stringify(objToCheck)) {
    //     return album;
    //   }
    // });
    // if (isAlbumAlreadyAdded.length !== 0) {
    //   throw new BadRequestException('Album has already been added.');
    // }

    // if (
    //   createAlbumDto.artistId &&
    //   ![...artistDb.values()].find(
    //     (artist) => artist.id === createAlbumDto.artistId,
    //   )
    // ) {
    //   throw new BadRequestException(
    //     'Artist not found. Please add artist first.',
    //   );
    // }

    const createdAlbum = {
      id: crypto.randomUUID(),
      artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
      ...createAlbumDto,
    };

    albumDb.set(createdAlbum.id, createdAlbum);

    return createdAlbum;
  }

  updateAlbum(createAlbumDto: CreateAlbumDto, id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid Album ID.');
    }
    const foundAlbum = albumDb.get(id);
    if (!foundAlbum) {
      throw new NotFoundException("Album with specified ID hasn't been found.");
    }

    // if (
    //   createAlbumDto.artistId &&
    //   ![...artistDb.values()].find(
    //     (artist) => artist.id === createAlbumDto.artistId,
    //   )
    // ) {
    //   throw new BadRequestException(
    //     'Artist not found. Please add artist first.',
    //   );
    // }

    foundAlbum.name = createAlbumDto.name;
    foundAlbum.artistId = createAlbumDto.artistId;
    foundAlbum.year = createAlbumDto.year;

    return foundAlbum;
  }

  deleteAlbum(id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid album ID.');
    }
    const foundAlbum = albumDb.get(id);
    if (!foundAlbum) {
      throw new NotFoundException("Album with specified ID hasn't been found.");
    }

    [...trackDb.values()].forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    albumDb.delete(id);
    return;
  }
}
