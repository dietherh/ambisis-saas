import { SetMetadata } from '@nestjs/common';

export const AuditAction = (action: string, entity: string) =>
  SetMetadata('audit', { action, entity });