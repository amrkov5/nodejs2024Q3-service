import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/logger/logger.service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService, PrismaService, CustomLogger],
})
export class TrackModule {}
