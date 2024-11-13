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
import { Album, AlbumClass } from './album.interface';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Album instance')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Change track data' })
  @ApiResponse({
    status: 200,
    description: 'Albums returned successfully.',
    type: [AlbumClass],
  })
  getAlbums(): Album[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Album ID' })
  @ApiResponse({
    status: 200,
    description: 'Album found and returned successfully.',
    type: AlbumClass,
  })
  @ApiResponse({ status: 400, description: 'Album ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  getAlbumById(@Param('id') id: string): Album {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 200,
    description: 'Album created successfully.',
    type: AlbumClass,
  })
  @ApiResponse({ status: 400, description: 'Body is invalid.' })
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change album data' })
  @ApiParam({ name: 'id', type: String, description: 'Track ID' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 200,
    description: 'Album changed successfully.',
    type: AlbumClass,
  })
  @ApiResponse({ status: 400, description: 'Album ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  changeAlbum(@Body() createAlbumDto: CreateAlbumDto, @Param('id') id: string) {
    return this.albumService.updateAlbum(createAlbumDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', type: String, description: 'Track ID' })
  @ApiResponse({
    status: 204,
    description: 'Album deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Album ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
