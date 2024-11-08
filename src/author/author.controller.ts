import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Artist } from './author.interface';
import { ArtistService } from './author.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string): Artist {
    return this.artistService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  changeArtist(
    @Body() createArtistDto: CreateArtistDto,
    @Param('id') id: string,
  ) {
    return this.artistService.updateArtist(createArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
