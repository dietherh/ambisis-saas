import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log({
    organizationId,
    userId,
    action,
    entity,
    entityId,
    before,
    after,
  }: {
    organizationId: string;
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    before?: any;
    after?: any;
  }) {
    return this.prisma.auditLog.create({
      data: {
        organizationId,
        userId,
        action,
        entity,
        entityId,
        before,
        after,
      },
    });
  }

  findAll(organizationId: string) {
    return this.prisma.auditLog.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });
  }
}