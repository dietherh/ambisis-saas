import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(organizationId: string) {
    return this.prisma.notification.findMany({
      where: { organizationId },
      include: { license: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string, organizationId: string) {
    return this.prisma.notification.updateMany({
      where: { id, organizationId },
      data: { read: true },
    });
  }

  async create(organizationId: string, licenseId: string, message: string) {
    return this.prisma.notification.create({
      data: { organizationId, licenseId, message },
    });
  }
}