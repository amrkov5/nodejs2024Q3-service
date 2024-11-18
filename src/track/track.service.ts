import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Track } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getTracks(): Promise<Track[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async getTrackById(id: string): Promise<Track> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid track ID.');
    }
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });
    if (!foundTrack) {
      throw new NotFoundException("Track with specified ID hasn't been found.");
    }
    return foundTrack;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const createdTrack = await this.prisma.track.create({
      data: createTrackDto,
    });

    return createdTrack;
  }

  async updateTrack(
    createTrackDto: CreateTrackDto,
    id: string,
  ): Promise<Track> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid Track ID.');
    }
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });
    if (!foundTrack) {
      throw new NotFoundException("Track with specified ID hasn't been found.");
    }

    const updatedUser = await this.prisma.track.update({
      where: { id },
      data: createTrackDto,
    });

    return updatedUser;
  }

  async deleteTrack(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid track ID.');
    }
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });
    if (!foundTrack) {
      throw new NotFoundException("Track with specified ID hasn't been found.");
    }

    await this.prisma.track.delete({ where: { id } });

    return;
  }
}
