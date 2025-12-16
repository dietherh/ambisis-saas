import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDashboard(@Req() req) {
    const { organizationId } = req.user;
    return this.dashboardService.getSummary(organizationId);
  }
}