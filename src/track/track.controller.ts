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
import { TrackService } from './track.service';
import { Track } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Track instance')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Track returned successfully.',
  })
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Track ID' })
  @ApiResponse({
    status: 200,
    description: 'Track found and returned successfully.',
  })
  @ApiResponse({ status: 400, description: 'Track ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  getTrackById(@Param('id') id: string): Track {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new track to the library' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    description: 'Track created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Body is invalid.' })
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change track data' })
  @ApiParam({ name: 'id', type: String, description: 'Track ID' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 200,
    description: 'Track changed successfully.',
  })
  @ApiResponse({ status: 400, description: 'Track ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Track not found.' })
  changeTrack(@Body() createTrackDto: CreateTrackDto, @Param('id') id: string) {
    return this.trackService.updateTrack(createTrackDto, id);
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
  deleteUser(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
