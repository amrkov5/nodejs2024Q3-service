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
import { Album } from './album.interface';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-Album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums(): Album[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string): Album {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  changeAlbum(@Body() createAlbumDto: CreateAlbumDto, @Param('id') id: string) {
    return this.albumService.updateAlbum(createAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
