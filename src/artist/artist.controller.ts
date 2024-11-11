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

@ApiTags('Artist instance')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'All artists returned successfully.',
    type: [ArtistClass],
  })
  getArtists(): Artist[] {
    return this.artistService.getArtists();
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
  getArtistById(@Param('id') id: string): Artist {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: 200,
    description: 'Artist created successfully.',
    type: ArtistClass,
  })
  @ApiResponse({ status: 400, description: 'Body is invalid.' })
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
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
  changeArtist(
    @Body() createArtistDto: CreateArtistDto,
    @Param('id') id: string,
  ) {
    return this.artistService.updateArtist(createArtistDto, id);
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
  deleteUser(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
