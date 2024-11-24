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
import { TrackService } from './track.service';
import { Track, TrackClass } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
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

@ApiTags('Track instance')
@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly logger: CustomLogger,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Track returned successfully.',
    type: [TrackClass],
  })
  async getTracks(@Req() request: Request): Promise<Track[]> {
    const resp = await this.trackService.getTracks();
    if (resp) {
      this.logger.log(createLogMessage(request, 'track', '200'));
    }
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Track ID' })
  @ApiResponse({
    status: 200,
    description: 'Track found and returned successfully.',
    type: TrackClass,
  })
  @ApiResponse({ status: 400, description: 'Track ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  async getTrackById(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<Track> {
    const resp = await this.trackService.getTrackById(id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'track', '200'));
    }
    return resp;
  }

  @Post()
  @ApiOperation({ summary: 'Add a new track to the library' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    description: 'Track created successfully.',
    type: TrackClass,
  })
  @ApiResponse({ status: 400, description: 'Body is invalid.' })
  async createTrack(
    @Req() request: Request,
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    const resp = await this.trackService.createTrack(createTrackDto);
    if (resp) {
      this.logger.log(createLogMessage(request, 'track', '201'));
    }
    return resp;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change track data' })
  @ApiParam({ name: 'id', type: String, description: 'Track ID' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 200,
    description: 'Track changed successfully.',
    type: TrackClass,
  })
  @ApiResponse({ status: 400, description: 'Track ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  async changeTrack(
    @Req() request: Request,
    @Body() createTrackDto: CreateTrackDto,
    @Param('id') id: string,
  ): Promise<Track> {
    const resp = await this.trackService.updateTrack(createTrackDto, id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'track', '200'));
    }
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track from the library' })
  @ApiParam({ name: 'id', type: String, description: 'Track ID' })
  @ApiResponse({
    status: 204,
    description: 'Track deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Track ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  @HttpCode(204)
  async deleteUser(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<void> {
    await this.trackService.deleteTrack(id);
    this.logger.log(createLogMessage(request, 'track', '204'));
    return;
  }
}
