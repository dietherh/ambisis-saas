// src/organization/organization.controller.ts
import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() dto: CreateOrganizationDto) {
    return this.organizationService.create(dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.organizationService.findAll(req.user.organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.organizationService.findOne(id, req.user.organizationId);
  }


}