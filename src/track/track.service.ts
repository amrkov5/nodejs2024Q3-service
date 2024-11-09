import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { trackDb } from 'src/db/db';
import { isUUID } from 'class-validator';
import { Track } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  getTracks(): Track[] {
    return [...trackDb.values()];
  }

  getTrackById(id: string): Track {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid track ID.');
    }
    const foundTrack = trackDb.get(id);
    if (!foundTrack) {
      throw new NotFoundException("Track with specified ID hasn't been found.");
    }
    return foundTrack;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    // const isTrackAlreadyAdded = [...trackDb.values()].map(
    //   (track) => track === createTrackDto,
    // );
    // if (isTrackAlreadyAdded.length !== 0) {
    //   throw new BadRequestException('Track has already been added.');
    // }

    // if (
    //   ![...artistDb.values()].find(
    //     (artist) => artist.id === createTrackDto.artistId,
    //   )
    // ) {
    //   throw new BadRequestException(
    //     'Artist not found. Please add artist first.',
    //   );
    // }

    // if (
    //   ![...albumDb.values()].find(
    //     (album) => album.id === createTrackDto.albumId,
    //   )
    // ) {
    //   throw new BadRequestException(
    //     'Album not found. Please add artist first.',
    //   );
    // }

    const createdTrack = {
      id: crypto.randomUUID(),
      ...createTrackDto,
    };

    trackDb.set(createdTrack.id, createdTrack);

    return createdTrack;
  }

  updateTrack(createTrackDto: CreateTrackDto, id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid Track ID.');
    }
    const foundTrack = trackDb.get(id);
    if (!foundTrack) {
      throw new NotFoundException("Track with specified ID hasn't been found.");
    }

    // if (
    //   ![...artistDb.values()].find(
    //     (artist) => artist.id === createTrackDto.artistId,
    //   )
    // ) {
    //   throw new BadRequestException(
    //     'Artist not found. Please add artist first.',
    //   );
    // }

    foundTrack.name = createTrackDto.name;
    foundTrack.albumId = createTrackDto.albumId;
    foundTrack.artistId = createTrackDto.artistId;
    foundTrack.duration = createTrackDto.duration;

    return foundTrack;
  }

  deleteTrack(id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid track ID.');
    }
    const foundTrack = trackDb.get(id);
    if (!foundTrack) {
      throw new NotFoundException("Track with specified ID hasn't been found.");
    }

    trackDb.delete(id);
    return;
  }
}
