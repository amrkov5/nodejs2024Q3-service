import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { artistDb } from 'src/db/db';
import { isUUID } from 'class-validator';
import { Artist } from './author.interface';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  getArtists(): Artist[] {
    return [...artistDb.values()];
  }

  getArtistById(id: string): Artist {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid artist ID');
    }
    const foundArtist = artistDb.get(id);
    if (!foundArtist) {
      throw new NotFoundException("Artist with specified ID hasn't been found");
    }
    return foundArtist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const isArtistAlreadyAdded = [...artistDb.values()].map(
      (artist) => artist.name === createArtistDto.name,
    );
    if (isArtistAlreadyAdded.length !== 0) {
      throw new BadRequestException('Artist has already been added');
    }

    const createdArtist = {
      id: crypto.randomUUID(),
      ...createArtistDto,
    };

    artistDb.set(createdArtist.id, createdArtist);

    return createdArtist;
  }

  updateArtist(createArtistDto: CreateArtistDto, id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid artist ID');
    }
    const foundArtist = artistDb.get(id);
    if (!foundArtist) {
      throw new NotFoundException("Artist with specified ID hasn't been found");
    }

    foundArtist.name = createArtistDto.name;

    foundArtist.grammy = createArtistDto.grammy;

    return foundArtist;
  }

  deleteArtist(id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid artist ID');
    }
    const foundArtist = artistDb.get(id);
    if (!foundArtist) {
      throw new NotFoundException("Artist with specified ID hasn't been found");
    }

    artistDb.delete(id);
    return 'Artist has been deleted';
  }
}
