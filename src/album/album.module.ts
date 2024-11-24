import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/logger/logger.service';

@Module({
  imports: [],
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService, CustomLogger],
})
export class AlbumModule {}
