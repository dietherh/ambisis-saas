import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);

    if (!token) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    return req.user; // payload do JWT
  }

}