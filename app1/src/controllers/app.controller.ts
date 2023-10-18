// app1/controllers/app.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { App1Service } from '../services/app.service'; // Make sure this path is correct
import { App1Entity } from '../entities/app.entity';

@Controller('app1')
export class App1Controller {
  constructor(private readonly app1Service: App1Service) {}

  @Post()
  async create(@Body() data: Partial<App1Entity>): Promise<App1Entity> {
    return this.app1Service.create(data);
  }

  @Get()
  async findAll(): Promise<App1Entity[]> {
    return this.app1Service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<App1Entity> {
    return this.app1Service.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<App1Entity>): Promise<App1Entity> {
    return this.app1Service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.app1Service.delete(id);
  }
}
