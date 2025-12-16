import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private auditService: AuditService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditMeta = this.reflector.get('audit', context.getHandler());
    if (!auditMeta) return next.handle();

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const before = request.body?.beforeState;

    return next.handle().pipe(
      tap(async (result) => {
        await this.auditService.log({
          organizationId: user.organizationId,
          userId: user.id,
          action: auditMeta.action,
          entity: auditMeta.entity,
          entityId: result?.id,
          before,
          after: result,
        });
      }),
    );
  }
}