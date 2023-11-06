import {
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Color, TypeVehicle } from '../entities';
import { DeepPartial, Driver } from 'typeorm';

export class CreateVehicleDto {
  @IsString()
  @Length(3)
  plate_number: string;

  @IsString()
  @Length(3)
  plate_letter: string;

  @IsString()
  line: string;

  @IsString()
  company: string;

  @IsObject()
  color: Partial<Color>;

  @IsObject()
  type: Partial<TypeVehicle>;

  @IsObject()
  driver: Partial<Driver>;
}
