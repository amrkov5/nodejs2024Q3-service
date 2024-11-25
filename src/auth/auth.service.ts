import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';
import { isUUID } from 'class-validator';
config();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  validate(token: string) {
    return this.jwtService.verify(token);
  }

  createAccessToken(payload) {
    return this.jwtService.sign(payload);
  }

  createRefreshToken(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }

  async signup(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.CRYPT_SALT),
    );

    const createdUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: hashedPassword,
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
      ...createdUser,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
    };
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: createUserDto.login },
    });

    if (!user) {
      throw new ForbiddenException('Login or password is incorrect');
    }

    if (await bcrypt.compare(createUserDto.password, user.password)) {
      const accessToken = this.createAccessToken({
        userId: user.id,
        login: user.login,
      });
      const refreshToken = this.createRefreshToken({
        userId: user.id,
        login: user.login,
      });

      const foundTokens = await this.prisma.auth.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (foundTokens) {
        await this.prisma.auth.update({
          where: {
            userId: user.id,
          },
          data: {
            accessToken,
            refreshToken,
          },
        });
      } else {
        await this.prisma.auth.create({
          data: {
            userId: user.id,
            accessToken,
            refreshToken,
          },
        });
      }

      const returnedUser = {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
        accessToken,
        refreshToken,
      };

      return returnedUser;
    } else {
      throw new ForbiddenException('Login or password is incorrect');
    }
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid user ID');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User with specified ID hasn't been found");
    }
    if (await bcrypt.compare(updatePasswordDto.oldPassword, user.password)) {
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
    } else {
      throw new ForbiddenException("The passwords don't match");
    }
  }

  async refresh(body: any) {
    if (!body.refreshToken || typeof body.refreshToken !== 'string') {
      throw new UnauthorizedException('Please provide refresh token');
    }

    try {
      await this.jwtService.verify(body.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });
    } catch (err) {
      throw new ForbiddenException('Refresh token is invalid', err.message);
    }

    const userTokens = await this.prisma.auth.findFirst({
      where: { refreshToken: body.refreshToken },
    });

    if (!userTokens) {
      throw new NotFoundException(
        "User with specified refresh token hasn't been found",
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userTokens.userId },
    });

    if (!user) {
      throw new NotFoundException("User with specified ID hasn't been found");
    }

    const updatedAccessToken = this.createAccessToken({
      userId: user.id,
      login: user.login,
    });
    const updatedRefreshToken = this.createRefreshToken({
      userId: user.id,
      login: user.login,
    });

    const updatedTokens = await this.prisma.auth.update({
      where: { userId: user.id },
      data: {
        accessToken: updatedAccessToken,
        refreshToken: updatedRefreshToken,
      },
    });

    return updatedTokens;
  }
}
