import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Artist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtists(): Promise<Artist[]> {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async getArtistById(id: string): Promise<Artist> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid artist ID');
    }
    const foundArtist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!foundArtist) {
      throw new NotFoundException("Artist with specified ID hasn't been found");
    }
    return foundArtist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const createdArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return createdArtist;
  }

  async updateArtist(
    createArtistDto: CreateArtistDto,
    id: string,
  ): Promise<Artist> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid artist ID');
    }
    const foundArtist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!foundArtist) {
      throw new NotFoundException("Artist with specified ID hasn't been found");
    }

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: createArtistDto,
    });

    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid artist ID');
    }
    const foundArtist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!foundArtist) {
      throw new NotFoundException("Artist with specified ID hasn't been found");
    }

    // [...albumDb.values()].forEach((album) => {
    //   if (album.artistId === id) {
    //     album.artistId = null;
    //   }
    // });

    // [...trackDb.values()].forEach((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });

    await this.prisma.artist.delete({
      where: {
        id,
      },
    });

    return;
  }
}
