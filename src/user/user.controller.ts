import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReturnedUser, ReturnedUserClass } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomLogger } from 'src/logger/logger.service';
import { Request, Response } from 'express';
import createLogMessage from 'src/service/createLogMessage';

@ApiTags('User instance')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: CustomLogger,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users returned successfully.',
    type: [ReturnedUserClass],
  })
  async getUsers(@Req() request: Request): Promise<ReturnedUser[]> {
    this.logger.verbose('Start getting all users...');
    const resp = await this.userService.getUsers();
    if (resp) {
      this.logger.log(createLogMessage(request, 'user', '200'));
    }
    this.logger.verbose('Finished');
    return resp;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found and returned successfully.',
    type: ReturnedUserClass,
  })
  @ApiResponse({ status: 400, description: 'ID is invalid.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<ReturnedUser> {
    this.logger.verbose('Start getting users by ID...');
    const resp = await this.userService.getUserById(id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'user', '200'));
    }
    this.logger.verbose('Finished');
    return resp;
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: ReturnedUserClass,
  })
  @ApiResponse({
    status: 400,
    description: 'Body is invalid.',
  })
  async createUser(
    @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnedUser> {
    this.logger.verbose('Start creating user...');
    const resp = await this.userService.createUser(createUserDto);
    if (resp) {
      this.logger.log(createLogMessage(request, 'user', '201'));
    }
    this.logger.verbose('Finished');
    return resp;
  }

  @Put(':id')
  @ApiOperation({ summary: "Update user's password" })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully.',
    type: ReturnedUserClass,
  })
  @ApiResponse({
    status: 400,
    description: 'Body is invalid.',
  })
  @ApiResponse({ status: 403, description: 'The old password is wrong.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async changePassword(
    @Req() request: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ): Promise<ReturnedUser> {
    this.logger.verbose('Start updating user...');
    const resp = await this.userService.updatePassword(updatePasswordDto, id);
    if (resp) {
      this.logger.log(createLogMessage(request, 'user', '200'));
    }
    this.logger.verbose('Finished');
    return resp;
  }

  @Delete(':id')
  @ApiOperation({ summary: "Update user's password" })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 204,
    description: 'The user was deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID is invalid.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @HttpCode(204)
  async deleteUser(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<void> {
    this.logger.verbose('Start deleting user...');
    await this.userService.deleteUser(id);
    this.logger.log(createLogMessage(request, 'user', '204'));
    this.logger.verbose('Finished');
    return;
  }
}
