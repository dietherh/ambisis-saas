// src/organization/organization.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationDTO } from "@ambisis/types";


@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrganizationDto) {
    return this.prisma.organization.create({ data });
  }

  async findAll(userOrgId: string): Promise<OrganizationDTO[]> {
    return this.prisma.organization.findMany({
      where: { organizationId: userOrgId },
      include: { licenses: true },
    });
  }

  async findOne(id: string, userOrgId: string): Promise<OrganizationDTO> {
    const company = await this.prisma.organization.findUnique({ where: { id } });
    if (!company || company.organizationId !== userOrgId) {
      throw new ForbiddenException('Access denied');
    }
    return company;
  }


}