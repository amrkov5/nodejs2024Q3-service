import { Module } from '@nestjs/common';
import { ArtistService } from './author.service';
import { ArtistController } from './author.controller';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
