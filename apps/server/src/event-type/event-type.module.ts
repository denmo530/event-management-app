import { Module } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';

@Module({
  controllers: [EventTypeController],
  providers: [PrismaService, EventTypeService],
})
export class EventTypeModule {}
