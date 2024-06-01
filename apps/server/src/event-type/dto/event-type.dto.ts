import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventTypeDto {
  @IsNotEmpty()
  @IsString()
  eventId: string;

  @IsNotEmpty()
  @IsString()
  eventTypeId: string;
}

export class UpdateEventTypeDto {
  @IsString()
  eventId: string;

  @IsString()
  eventTypeId: string;

  @IsString()
  newEventId?: string;

  @IsString()
  newEventTypeId?: string;
}
