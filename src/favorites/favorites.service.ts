import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { FavoritesResponse } from './favorites.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(): Promise<FavoritesResponse> {
    let favorites = await this.prisma.favorites.findMany();

    const trackIds = favorites
      .filter((el) => el.type === 'track')
      .map((el) => el.favId);
    const albumIds = favorites
      .filter((el) => el.type === 'album')
      .map((el) => el.favId);
    const artistIds = favorites
      .filter((el) => el.type === 'artist')
      .map((el) => el.favId);
    const tracksToReturn = await this.prisma.track.findMany({
      where: {
        id: { in: trackIds },
      },
    });
    const albumsToReturn = await this.prisma.album.findMany({
      where: {
        id: { in: albumIds },
      },
    });
    const artistsToReturn = await this.prisma.artist.findMany({
      where: {
        id: { in: artistIds },
      },
    });

    return {
      tracks: tracksToReturn,
      albums: albumsToReturn,
      artists: artistsToReturn,
    };
  }

  async addToFavorites(
    instance: string,
    id: string,
  ): Promise<FavoritesResponse> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Please enter valid ${instance} ID`);
    }

    let foundEntity;

    switch (instance) {
      case 'artist':
        foundEntity = await this.prisma.artist.findUnique({ where: { id } });
        break;
      case 'album':
        foundEntity = await this.prisma.album.findUnique({ where: { id } });
        break;
      case 'track':
        foundEntity = await this.prisma.track.findUnique({ where: { id } });
        break;
      default:
        throw new NotFoundException(`Cannot POST /favs/${instance}/${id}`);
    }

    if (!foundEntity) {
      throw new UnprocessableEntityException(
        `${instance} ID hasn't been found`,
      );
    }

    await this.prisma.favorites.create({
      data: {
        type: instance,
        favId: id,
      },
    });

    // switch (instance) {
    //   case 'artist':
    //     await this.prisma.favorites.create({
    //       data: {
    //         type: instance,
    //         artistId: id,
    //       },
    //     });
    //     break;
    //   case 'album':
    //     await this.prisma.favorites.create({
    //       data: {
    //         type: instance,
    //         albumId: id,
    //       },
    //     });
    //     break;
    //   case 'track':
    //     await this.prisma.favorites.create({
    //       data: {
    //         type: instance,
    //         trackId: id,
    //       },
    //     });
    //     break;
    // }

    return this.getFavorites();
  }

  async deleteFromFavorites(instance: string, id: string): Promise<void> {
    if (!['album', 'track', 'artist'].includes(instance)) {
      throw new NotFoundException(`Cannot DELETE /favs/${instance}/${id}`);
    }

    if (!isUUID(id, 4)) {
      throw new BadRequestException(`Please enter valid ${instance} ID`);
    }

    const foundedRecord = await this.prisma.favorites.findMany({
      where: {
        favId: id,
      },
    });
    if (foundedRecord.length === 0) {
      throw new NotFoundException(`${instance} ID hasn't been found`);
    }

    // const idsIndexesToDelete: number[] = favoritesDb[instanceInFavs]
    //   .map((el: string, index: number) => {
    //     if (el === id) {
    //       return index;
    //     }
    //     return;
    //   })
    //   .filter((i: number) => i);
    // idsIndexesToDelete.reverse().forEach((i) => {
    //   favoritesDb[instanceInFavs].splice(i, 1);
    // });

    // switch (instance) {
    //   case 'artist':
    //     await this.prisma.favorites.deleteMany({ where: { artistId: id } });
    //     break;
    //   case 'album':
    //     await this.prisma.favorites.deleteMany({ where: { albumId: id } });
    //     break;
    //   case 'track':
    //     await this.prisma.favorites.deleteMany({ where: { trackId: id } });
    //     break;
    // }

    await this.prisma.favorites.deleteMany({ where: { favId: id } });

    return;
  }
}
