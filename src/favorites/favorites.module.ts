import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/logger/logger.service';

@Module({
  imports: [],
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, CustomLogger],
})
export class FavoritesModule {}
