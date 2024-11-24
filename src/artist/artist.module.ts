import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/logger/logger.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService, CustomLogger],
})
export class ArtistModule {}
