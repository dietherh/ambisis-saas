import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateLicenseSchema, UpdateLicenseSchema } from "@ambisis/types";
import { ZodValidationPipe } from "../common/zod-validation.pipe";

@Controller("licenses")
@UseGuards(JwtAuthGuard)
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Get()
  findAll(@Req() req) {
    return this.licensesService.findAll(req.user.organizationId);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req) {
    return this.licensesService.findOne(id, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  create(@Body(new ZodValidationPipe(CreateLicenseSchema)) body, @Req() req) {
    return this.licensesService.create(body, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(UpdateLicenseSchema)) body,
    @Req() req
  ) {
    return this.licensesService.update(id, body, req.user.organizationId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  delete(@Param("id") id: string, @Req() req) {
    return this.licensesService.delete(id, req.user.organizationId);
  }
}