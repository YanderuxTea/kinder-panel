import { Body, Controller, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/register-user.dto.js';
import { FirstStepDto } from './dto/first-step-reset.dto.js';
import { SecondStepDto } from './dto/second-step-reset.dto.js';
import { ThirdStepDto } from './dto/third-step-reset.dto.js';
import { AuthenticateUser } from './dto/authenticate-user.dto.js';
import { VerifyToken } from './dto/verify-token.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
  @Post('authenticate')
  authUser(@Ip() ip: string, @Body() dto: AuthenticateUser) {
    return this.authService.authenticateUser(dto, ip);
  }
  @Post('first-step')
  firstStep(@Ip() ip: string, @Body() dto: FirstStepDto) {
    return this.authService.firstStep(dto, ip);
  }
  @Post('second-step')
  secondStep(@Body() dto: SecondStepDto, @Ip() ip: string) {
    return this.authService.secondStep(dto, ip);
  }
  @Post('third-step')
  thirdStep(@Body() dto: ThirdStepDto, @Ip() ip: string) {
    return this.authService.thirdStep(dto, ip);
  }
  @Post('verify-token')
  verifyToken(@Body() dto: VerifyToken) {
    return this.authService.verifyToken(dto);
  }
  @Post('logout')
  logoutUser(@Body() dto: VerifyToken) {
    return this.authService.logoutUser(dto);
  }
}
