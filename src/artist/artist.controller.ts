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
import { Artist, ArtistClass } from './artist.interface';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
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

@ApiTags('Artist instance')
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly logger: CustomLogger,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'All artists returned successfully.',
    type: [ArtistClass],
  })
  async getArtists(@Req() request: Request): Promise<Artist[]> {
    const resp = await this.artistService.getArtists();
    if (resp) {
      this.logger.log(createLogMessage(request, 'artist', '200'));
    }
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Artist ID' })
  @ApiResponse({
    status: 200,
    description: 'Artist found and returned successfully.',
    type: ArtistClass,
  })
  @ApiResponse({ status: 400, description: 'Artist ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async getArtistById(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<Artist> {
    const resp = await this.artistService.getArtistById(id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'artist', '200'));
    }
    return resp;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: 201,
    description: 'Artist created successfully.',
    type: ArtistClass,
  })
  @ApiResponse({ status: 400, description: 'Body is invalid.' })
  async createArtist(
    @Req() request: Request,
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    const resp = await this.artistService.createArtist(createArtistDto);
    if (resp) {
      this.logger.log(createLogMessage(request, 'artist', '201'));
    }
    return resp;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change artist data' })
  @ApiParam({ name: 'id', type: String, description: 'Artist ID' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: 200,
    description: 'Artist changed successfully.',
    type: ArtistClass,
  })
  @ApiResponse({ status: 400, description: 'Artist ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  async changeArtist(
    @Req() request: Request,
    @Body() createArtistDto: CreateArtistDto,
    @Param('id') id: string,
  ): Promise<Artist> {
    const resp = await this.artistService.updateArtist(createArtistDto, id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'artist', '200'));
    }
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', type: String, description: 'Artist ID' })
  @ApiResponse({
    status: 200,
    description: 'Artist deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  @HttpCode(204)
  async deleteUser(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<void> {
    await this.artistService.deleteArtist(id);
    this.logger.log(createLogMessage(request, 'artist', '204'));
    return;
  }
}
