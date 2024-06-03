import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from '@prisma/client';
import { CreateTypeDto, UpdateTypeDto } from './dto/type.dto';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  async findAll(): Promise<Type[]> {
    return this.typeService.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Type | null> {
    return this.typeService.findOne(id);
  }

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return this.typeService.create(createTypeDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTypeDto: UpdateTypeDto,
  ): Promise<Type> {
    return this.typeService.update(id, updateTypeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Type> {
    return this.typeService.delete(id);
  }
}
