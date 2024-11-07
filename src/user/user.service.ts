import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { userDb } from 'src/db/userDb';
import { ReturnedUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { isUUID } from 'class-validator';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  getUsers(): ReturnedUser[] {
    return userDb.map(({ password, ...user }) => user);
  }

  getUserById(id: string): ReturnedUser {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid user ID');
    }
    const foundUser = userDb.find((user) => user.id === id);
    if (!foundUser) {
      throw new NotFoundException("User with specified ID hasn't been found");
    }
    const { password, ...returnedUser } = foundUser;
    return returnedUser;
  }

  createUser(createUserDto: CreateUserDto): ReturnedUser {
    const isUserAlreadyRegistered = userDb.find(
      (user) => user.login === createUserDto.login,
    );
    if (isUserAlreadyRegistered) {
      throw new BadRequestException('User has already been registered');
    }

    const createdUser = {
      id: crypto.randomUUID(),
      login: createUserDto.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    userDb.push({ ...createdUser, password: createUserDto.password });

    return createdUser;
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto, id: string) {
    if (!isUUID(id, 4)) {
      throw new BadRequestException('Please enter valid user ID');
    }
    const foundUser = userDb.find((user) => user.id === id);
    if (!foundUser) {
      throw new NotFoundException("User with specified ID hasn't been found");
    }

    if (foundUser.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('The old password is not correct');
    }

    foundUser.password = updatePasswordDto.newPassword;
    foundUser.updatedAt = Date.now();

    const { password, ...returnedUser } = foundUser;
    return returnedUser;
  }
}
