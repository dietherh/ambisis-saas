import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyDTO } from "@ambisis/types";

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  findAll(organizationId: string, role: string): Promise<CompanyDTO[]> {
    return this.prisma.company.findMany({
      where: { organizationId },
      select: role === 'admin'
        ? { id: true, name: true, document: true }
        : { id: true, name: true } // operador vê só isso
    });
  }

  findOne(id: string, organizationId: string): Promise<CompanyDTO> {
    return this.prisma.company.findFirst({
      where: { id, organizationId },
    });
  }

  create(dto: CreateCompanyDto, organizationId: string) {
    return this.prisma.company.create({
      data: {
        ...dto,
        organizationId,
      },
    });
  }

  update(id: string, dto: UpdateCompanyDto, organizationId: string) {
    return this.prisma.company.updateMany({
      where: { id, organizationId },
      data: dto,
    });
  }

  delete(id: string, organizationId: string) {
    return this.prisma.company.deleteMany({
      where: { id, organizationId },
    });
  }
}