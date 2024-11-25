import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnedUser } from './user.interface';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<ReturnedUser[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...user }) => {
      return {
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    });
  }

  async getUserById(id: string): Promise<ReturnedUser> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid user ID');
    }
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!foundUser) {
      throw new NotFoundException("User with specified ID hasn't been found");
    }
    const { password, ...returnedUser } = foundUser;
    return {
      ...returnedUser,
      createdAt: returnedUser.createdAt.getTime(),
      updatedAt: returnedUser.updatedAt.getTime(),
    };
  }

  async deleteUser(id: string): Promise<void> {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid user ID');
    }
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!foundUser) {
      throw new NotFoundException("User with specified ID hasn't been found");
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return;
  }
}
