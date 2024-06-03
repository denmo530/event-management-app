import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { Type } from '@prisma/client';

@Injectable()
export class TypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Type[]> {
    return this.prismaService.type.findMany();
  }

  async findOne(id: string): Promise<Type | null> {
    return this.prismaService.type.findUnique({ where: { id } });
  }

  async create(data: any): Promise<Type> {
    return this.prismaService.type.create({ data });
  }

  async update(id: string, data: any): Promise<Type> {
    return this.prismaService.type.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Type> {
    return this.prismaService.type.delete({ where: { id } });
  }
}
