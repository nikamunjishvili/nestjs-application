import { Controller, Post, Body, HttpStatus, HttpCode, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto.';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags, ApiResponse,ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthGuard } from './guard/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user created successfully',
  })
  @ApiBadRequestResponse({status: HttpStatus.BAD_REQUEST, description: "Bad Request"})
  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // @UseGuards(AuthGuard)
  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
