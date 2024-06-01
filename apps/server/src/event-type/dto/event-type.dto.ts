import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventTypeDto {
  @IsNotEmpty({ message: 'Event ID is required' })
  @IsString({ message: 'Event ID must be a string' })
  eventId: string;

  @IsNotEmpty({ message: 'Event Type ID is required' })
  @IsString({ message: 'Event Type ID must be a string' })
  eventTypeId: string;
}

export class UpdateEventTypeDto {
  @IsString({ message: 'Event ID must be a string' })
  eventId: string;

  @IsString({ message: 'Event Type ID must be a string' })
  eventTypeId: string;

  @IsString({ message: 'New Event ID must be a string' })
  newEventId?: string;

  @IsString({ message: 'New Event Type ID must be a string' })
  newEventTypeId?: string;
}
