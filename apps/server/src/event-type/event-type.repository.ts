import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { EventType } from '@prisma/client';

@Injectable()
export class EventTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: {
    eventId: string;
    eventTypeId: string;
  }): Promise<EventType> {
    return this.prismaService.eventType.create({ data });
  }

  async findMany(): Promise<EventType[]> {
    return this.prismaService.eventType.findMany();
  }

  async findOne(
    eventId: string,
    eventTypeId: string,
  ): Promise<EventType | null> {
    return this.prismaService.eventType.findUnique({
      where: {
        eventId_eventTypeId: {
          eventId: eventId,
          eventTypeId: eventTypeId,
        },
      },
    });
  }

  async update(
    eventId: string,
    eventTypeId: string,
    data: {
      eventId?: string;
      eventTypeId?: string;
    },
  ): Promise<EventType> {
    return this.prismaService.eventType.update({
      where: {
        eventId_eventTypeId: {
          eventId: eventId,
          eventTypeId: eventTypeId,
        },
      },
      data,
    });
  }

  async delete(eventId: string, eventTypeId: string): Promise<EventType> {
    return this.prismaService.eventType.delete({
      where: {
        eventId_eventTypeId: {
          eventId: eventId,
          eventTypeId: eventTypeId,
        },
      },
    });
  }
}
