import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeRepository } from './type.repository';
import { PrismaService } from '@server/prisma/prisma.service';

@Module({
  providers: [TypeService, TypeRepository, PrismaService],
  controllers: [TypeController],
})
export class TypeModule {}
