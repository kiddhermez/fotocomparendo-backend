import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Driver } from 'typeorm';
import { Color, TypeVehicle } from '../entities';

export class UpdateVehicleDto {
  @IsString()
  @MaxLength(3)
  @MinLength(3)
  @IsOptional()
  plate_number: string;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  @IsOptional()
  plate_letter: string;

  @IsString()
  @IsOptional()
  line: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsObject()
  @IsOptional()
  color: Partial<Color>;

  @IsObject()
  @IsOptional()
  type: Partial<TypeVehicle>;

  @IsObject()
  @IsOptional()
  driver: Partial<Driver>;
}
