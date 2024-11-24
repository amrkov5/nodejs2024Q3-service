import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomLogger } from 'src/logger/logger.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, CustomLogger],
})
export class UserModule {}
