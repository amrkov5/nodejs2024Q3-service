import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Album } from './album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany();
    return albums
  }

  async getAlbumById(id: string): Promise<Album> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid album ID.');
    }
    const foundAlbum = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!foundAlbum) {
      throw new NotFoundException("Album with specified ID hasn't been found.");
    }
    return foundAlbum;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const createdAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });

    return createdAlbum;
  }

  async updateAlbum(
    createAlbumDto: CreateAlbumDto,
    id: string,
  ): Promise<Album> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid Album ID.');
    }
    const foundAlbum = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!foundAlbum) {
      throw new NotFoundException("Album with specified ID hasn't been found.");
    }

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: createAlbumDto,
    });

    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid album ID.');
    }
    const foundAlbum = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!foundAlbum) {
      throw new NotFoundException("Album with specified ID hasn't been found.");
    }

    await this.prisma.album.delete({
      where: {
        id,
      },
    });

    return;
  }
}
