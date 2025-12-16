import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseDTO } from "@ambisis/types";

@Injectable()
export class LicensesService {
  constructor(private prisma: PrismaService) {}

  async findAll(organizationId: string): Promise<LicenseDTO[]> {
    return this.prisma.license.findMany({
      where: { organizationId },
      include: { company: true },
    });
  }

  async findOne(id: string, organizationId: string): Promise<LicenseDTO> {
    return this.prisma.license.findFirst({
      where: { id, organizationId },
      include: { company: true },
    });
  }

  async create(dto: CreateLicenseDto, organizationId: string) {
    // valida se a empresa pertence à organização
    const company = await this.prisma.company.findFirst({
      where: { id: dto.companyId, organizationId },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.prisma.license.create({
      data: {
        ...dto,
        organizationId,
      },
    });
  }

  async update(id: string, dto: UpdateLicenseDto, organizationId: string) {
    return this.prisma.license.updateMany({
      where: { id, organizationId },
      data: dto,
    });
  }

  async delete(id: string, organizationId: string) {
    return this.prisma.license.deleteMany({
      where: { id, organizationId },
    });
  }
}