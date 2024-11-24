import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
config();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

    const { id, login } = createdUser;
    const accessToken = this.createAccessToken({ userId: id, login });
    const refreshToken = this.createRefreshToken({ userId: id, login });

    return {
      ...createdUser,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
      accessToken,
      refreshToken,
    };
  }
}
