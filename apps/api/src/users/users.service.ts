import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDTO } from "@ambisis/types";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(organizationId: string): Promise<UserDTO[]> {
    return this.prisma.user.findMany({
      where: { organizationId },
      select: { id: true, email: true, role: true },
    });
  }

  findOne(id: string, organizationId: string): Promise<UserDTO> {
    return this.prisma.user.findFirst({
      where: { id, organizationId },
      select: { id: true, email: true, role: true },
    });
  }

  async create(dto: CreateUserDto, organizationId: string) {
    const hashed = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        role: dto.role,
        organizationId,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto, organizationId: string) {
    const data: any = { ...dto };

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.updateMany({
      where: { id, organizationId },
      data,
    });
  }

  delete(id: string, organizationId: string) {
    return this.prisma.user.deleteMany({
      where: { id, organizationId },
    });
  }
}