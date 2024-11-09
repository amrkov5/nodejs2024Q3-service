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

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string): Track {
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  changeTrack(@Body() createTrackDto: CreateTrackDto, @Param('id') id: string) {
    return this.trackService.updateTrack(createTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
