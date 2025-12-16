import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserSchema, UpdateUserSchema } from "@ambisis/types";
import { ZodValidationPipe } from "../common/zod-validation.pipe";


@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles("admin")
  @Get()
  findAll(@Req() req) {
    return this.usersService.findAll(req.user.organizationId);
  }

  @Roles("admin")
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req) {
    return this.usersService.findOne(id, req.user.organizationId);
  }

  @Roles("admin")
  @Post()
  create(@Body(new ZodValidationPipe(CreateUserSchema)) body, @Req() req) {
    return this.usersService.create(body, req.user.organizationId);
  }

  @Roles("admin")
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema)) body,
    @Req() req
  ) {
    return this.usersService.update(id, body, req.user.organizationId);
  }

  @Roles("admin")
  @Delete(":id")
  delete(@Param("id") id: string, @Req() req) {
    return this.usersService.delete(id, req.user.organizationId);
  }
}