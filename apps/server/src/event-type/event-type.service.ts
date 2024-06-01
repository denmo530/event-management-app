import { EventType } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EventTypeRepository } from './event-type.repository';
import { CreateEventTypeDto, UpdateEventTypeDto } from './dto/event-type.dto';
import { validate } from 'class-validator';

@Injectable()
export class EventTypeService {
  constructor(private readonly eventTypeRepository: EventTypeRepository) {}

  async create(dto: CreateEventTypeDto): Promise<EventType> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }
    return this.eventTypeRepository.create(dto);
  }

  async findMany(): Promise<EventType[]> {
    return this.eventTypeRepository.findMany();
  }

  async findOne(
    eventId: string,
    eventTypeId: string,
  ): Promise<EventType | null> {
    return this.eventTypeRepository.findOne(eventId, eventTypeId);
  }

  async update(dto: UpdateEventTypeDto): Promise<EventType> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }

    return this.eventTypeRepository.update(dto.eventId, dto.eventTypeId, {
      eventId: dto.newEventId,
      eventTypeId: dto.newEventTypeId,
    });
  }

  async delete(eventId: string, eventTypeId: string): Promise<EventType> {
    return this.eventTypeRepository.delete(eventId, eventTypeId);
  }
}
