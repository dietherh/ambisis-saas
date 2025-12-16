import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';
import { CreateCompanySchema, UpdateCompanySchema } from "@ambisis/types";

@Controller("companies")
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(@Req() req) {
    return this.companiesService.findAll(
      req.user.organizationId,
      req.user.role
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req) {
    return this.companiesService.findOne(id, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  create(@Body(new ZodValidationPipe(CreateCompanySchema)) body, @Req() req) {
    return this.companiesService.create(body, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(UpdateCompanySchema)) body,
    @Req() req
  ) {
    return this.companiesService.update(id, body, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  delete(@Param("id") id: string, @Req() req) {
    return this.companiesService.delete(id, req.user.organizationId);
  }
}