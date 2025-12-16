import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(organizationId: string) {
    const companies = await this.prisma.company.count({
      where: { organizationId },
    });

    const licenses = await this.prisma.license.count({
      where: { organizationId },
    });

    const users = await this.prisma.user.count({
      where: { organizationId },
    });

    const expiringLicenses = await this.prisma.license.count({
      where: {
        organizationId,
        expiresAt: {
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // próximos 7 dias
        },
      },
    });

    return {
      companies,
      licenses,
      users,
      expiringLicenses,
    };
  }
}