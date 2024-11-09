import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(): FavoritesResponse {
    return this.favoritesService.getFavorites();
  }

  @Post(':instance/:id')
  addToFavorites(@Param('instance') instance: string, @Param('id') id: string) {
    return this.favoritesService.addToFavorites(instance, id);
  }

  @Delete(':instance/:id')
  @HttpCode(204)
  deleteFromFavorites(
    @Param('instance') instance: string,
    @Param('id') id: string,
  ) {
    return this.favoritesService.deleteFromFavorites(instance, id);
  }
}
