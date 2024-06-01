import { EventType } from './../../../../node_modules/.pnpm/@prisma+client@5.14.0_prisma@5.14.0/node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common';
import { EventTypeRepository } from './event-type.repository';
import { CreateEventTypeDto, UpdateEventTypeDto } from './dto/event-type.dto';

@Injectable()
export class EventTypeService {
  constructor(private readonly eventTypeRepository: EventTypeRepository) {}

  create(dto: CreateEventTypeDto): Promise<EventType> {
    return this.eventTypeRepository.create(dto);
  }

  findMany(): Promise<EventType[]> {
    return this.eventTypeRepository.findMany();
  }

  findOne(eventId: string, eventTypeId: string): Promise<EventType | null> {
    return this.eventTypeRepository.findOne(eventId, eventTypeId);
  }

  update(dto: UpdateEventTypeDto): Promise<EventType> {
    return this.eventTypeRepository.update(dto.eventId, dto.eventTypeId, {
      eventId: dto.newEventId,
      eventTypeId: dto.newEventTypeId,
    });
  }

  delete(eventId: string, eventTypeId: string): Promise<EventType> {
    return this.eventTypeRepository.delete(eventId, eventTypeId);
  }
}
