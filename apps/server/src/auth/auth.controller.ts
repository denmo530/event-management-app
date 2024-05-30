import { RefreshJwtGuard } from './guards/refresh.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '@server/user/dto/user.dto';
import { UserService } from '@server/user/user.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async createRegisterUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.loginWithCredentials(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req: any) {
    return await this.authService.refreshToken(req.user);
  }
}
