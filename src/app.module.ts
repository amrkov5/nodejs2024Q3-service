import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './author/author.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
