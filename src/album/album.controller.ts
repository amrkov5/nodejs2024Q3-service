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
  constructor(private readonly AlbumService: AlbumService) {}

  @Get()
  getAlbums(): Album[] {
    return this.AlbumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string): Album {
    return this.AlbumService.getAlbumById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.AlbumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  changeAlbum(@Body() createAlbumDto: CreateAlbumDto, @Param('id') id: string) {
    return this.AlbumService.updateAlbum(createAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.AlbumService.deleteAlbum(id);
  }
}
