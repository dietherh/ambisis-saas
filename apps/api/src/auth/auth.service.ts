import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return null;

    return user;
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) return null;

    const payload = {
      sub: user.id,
      email: user.email,
      organizationId: user.organizationId,
      role: user.role,
    };

    const access_token = await this.jwt.signAsync(payload);

    return { access_token };
  }
}