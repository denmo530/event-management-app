import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { CreateEventTypeDto, UpdateEventTypeDto } from './dto/event-type.dto';
import { EventType } from '@prisma/client';

@Controller('event-types')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post()
  async create(@Body() dto: CreateEventTypeDto): Promise<EventType> {
    return this.eventTypeService.create(dto);
  }

  @Get()
  async findAll(): Promise<EventType[]> {
    return this.eventTypeService.findMany();
  }

  @Get(':eventId/:eventTypeId')
  async findOne(
    @Param('eventId') eventId: string,
    @Param('eventTypeId') eventTypeId: string,
  ): Promise<EventType | null> {
    return this.eventTypeService.findOne(eventId, eventTypeId);
  }

  @Put(':eventId/:eventTypeId')
  async update(
    @Param('eventId') eventId: string,
    @Param('eventTypeId') eventTypeId: string,
    @Body() dto: UpdateEventTypeDto,
  ): Promise<EventType> {
    return this.eventTypeService.update(dto);
  }

  @Delete(':eventId/:eventTypeId')
  async delete(
    @Param('eventId') eventId: string,
    @Param('eventTypeId') eventTypeId: string,
  ): Promise<EventType> {
    return this.eventTypeService.delete(eventId, eventTypeId);
  }
}
