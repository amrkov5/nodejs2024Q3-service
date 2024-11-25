import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnedUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { isUUID } from 'class-validator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

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

  // async createUser(createUserDto: CreateUserDto): Promise<ReturnedUser> {
  //   const newUser = {
  //     login: createUserDto.login,
  //     password: createUserDto.password,
  //   };

  //   const createdUser = await this.prisma.user.create({
  //     data: newUser,
  //     select: {
  //       id: true,
  //       login: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       version: true,
  //     },
  //   });

  //   return {
  //     ...createdUser,
  //     createdAt: createdUser.createdAt.getTime(),
  //     updatedAt: createdUser.updatedAt.getTime(),
  //   };
  // }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    id: string,
  ): Promise<ReturnedUser> {
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

    if (foundUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('The old password is not correct');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: { increment: 1 },
        updatedAt: new Date(),
      },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });

    return {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
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
