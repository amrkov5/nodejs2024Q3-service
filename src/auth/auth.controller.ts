import { CustomLogger } from 'src/logger/logger.service';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import createLogMessage from 'src/service/createLogMessage';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: CustomLogger,
  ) {}

  @Post('signup')
  async signupUser(
    @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ) {
    this.logger.verbose('Start creating user...');
    const registeredUser = await this.authService.signup(createUserDto);
    if (registeredUser) {
      this.logger.log(createLogMessage(request, 'user', '201'));
    }
    this.logger.verbose('Finished');
    console.log(registeredUser)
    return registeredUser;
  }
}
