import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateTypeDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description?: string;
}
