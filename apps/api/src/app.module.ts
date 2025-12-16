import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { OrganizationModule } from "./organization/organization.module";
import { AuthModule } from "./auth/auth.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { CompaniesModule } from "./companies/companies.module";
import { LicensesModule } from "./licenses/licenses.module";
import { UsersModule } from "./users/users.module";
import { AuditModule } from "./audit/audit.module";
import { AuditService } from "./audit/audit.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuditInterceptor } from "./audit/audit.interceptor";
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TasksModule,
    OrganizationModule,
    AuthModule,
    DashboardModule,
    CompaniesModule,
    LicensesModule,
    UsersModule,
    AuditModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuditService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
