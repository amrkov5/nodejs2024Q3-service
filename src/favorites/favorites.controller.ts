import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  FavoritesResponse,
  FavoritesResponseClass,
} from './favorites.interface';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites instance')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get favorites' })
  @ApiResponse({
    status: 200,
    description: 'Favorites returned successfully.',
    type: FavoritesResponseClass,
  })
  getFavorites(): FavoritesResponse {
    return this.favoritesService.getFavorites();
  }

  @Post(':instance/:id')
  @ApiOperation({ summary: 'Add track/artist/album to favorites' })
  @ApiParam({ name: 'id', type: String, description: 'ID' })
  @ApiParam({
    name: 'instance',
    type: String,
    description: 'Type of entity to add to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Entity added to favorites successfully.',
    type: FavoritesResponseClass,
  })
  @ApiResponse({ status: 400, description: 'Entity ID is invalid.' })
  @ApiResponse({ status: 422, description: 'Entity to add was not found.' })
  addToFavorites(@Param('instance') instance: string, @Param('id') id: string) {
    return this.favoritesService.addToFavorites(instance, id);
  }

  @Delete(':instance/:id')
  @ApiOperation({ summary: 'Remove track/artist/album from favorites' })
  @ApiParam({ name: 'id', type: String, description: 'Entity ID' })
  @ApiParam({
    name: 'instance',
    type: String,
    description: 'Type of entity to remove from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Entity removed from favorites successfully.',
  })
  @ApiResponse({ status: 400, description: 'Entity ID is invalid.' })
  @ApiResponse({ status: 404, description: 'Entity is not in favorites.' })
  @HttpCode(204)
  deleteFromFavorites(
    @Param('instance') instance: string,
    @Param('id') id: string,
  ) {
    return this.favoritesService.deleteFromFavorites(instance, id);
  }
}
