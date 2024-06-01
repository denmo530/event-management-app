import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  externalId: string; // This is the ID from Clerk

  @IsString()
  @IsOptional()
  name?: string; // Name might be optional

  @IsEmail()
  email: string;

  @IsArray()
  @IsOptional()
  orgIds?: string[]; // Array of organization IDs, if any
}
