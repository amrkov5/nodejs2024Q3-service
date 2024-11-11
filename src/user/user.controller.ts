import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReturnedUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User instance')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users returned successfully.',
  })
  getUsers(): ReturnedUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found and returned successfully.',
  })
  @ApiResponse({ status: 400, description: 'ID is invalid.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserById(@Param('id') id: string): ReturnedUser {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Body is invalid.',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update user's password" })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Body is invalid.',
  })
  @ApiResponse({ status: 403, description: 'The old password is wrong.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.userService.updatePassword(updatePasswordDto, id);
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
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
