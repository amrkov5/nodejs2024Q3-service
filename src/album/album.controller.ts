import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
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
import { CustomLogger } from 'src/logger/logger.service';
import createLogMessage from 'src/service/createLogMessage';
import { Request } from 'express';

@ApiTags('Album instance')
@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly logger: CustomLogger,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Change track data' })
  @ApiResponse({
    status: 200,
    description: 'Albums returned successfully.',
    type: [AlbumClass],
  })
  async getAlbums(@Req() request: Request): Promise<Album[]> {
    const resp = await this.albumService.getAlbums();
    if (resp) {
      this.logger.log(createLogMessage(request, 'album', '200'));
    }
    return resp;
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
  async getAlbumById(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<Album> {
    const resp = this.albumService.getAlbumById(id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'album', '200'));
    }
    return resp;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 201,
    description: 'Album created successfully.',
    type: AlbumClass,
  })
  @ApiResponse({ status: 400, description: 'Body is invalid.' })
  async createAlbum(
    @Req() request: Request,
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    const resp = await this.albumService.createAlbum(createAlbumDto);
    if (resp) {
      this.logger.log(createLogMessage(request, 'album', '201'));
    }
    return resp;
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
  async changeAlbum(
    @Req() request: Request,
    @Body() createAlbumDto: CreateAlbumDto,
    @Param('id') id: string,
  ): Promise<Album> {
    const resp = await this.albumService.updateAlbum(createAlbumDto, id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'album', '200'));
    }
    return resp;
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
  async deleteUser(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<void> {
    await this.albumService.deleteAlbum(id);
    this.logger.log(createLogMessage(request, 'album', '204'));
    return;
  }
}
