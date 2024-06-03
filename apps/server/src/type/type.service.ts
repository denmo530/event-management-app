import { Injectable } from '@nestjs/common';
import { TypeRepository } from './type.repository';
import { CreateTypeDto, UpdateTypeDto } from './dto/type.dto';
import { Type } from '@prisma/client';

@Injectable()
export class TypeService {
  constructor(private readonly typeRepository: TypeRepository) {}

  async findMany(): Promise<Type[]> {
    return this.typeRepository.findMany();
  }

  async findOne(id: string): Promise<Type | null> {
    return this.typeRepository.findOne(id);
  }

  async create(dto: CreateTypeDto): Promise<Type> {
    return this.typeRepository.create(dto);
  }

  async update(id: string, dto: UpdateTypeDto): Promise<Type> {
    return this.typeRepository.update(id, dto);
  }

  async delete(id: string): Promise<Type> {
    return this.typeRepository.delete(id);
  }
}
