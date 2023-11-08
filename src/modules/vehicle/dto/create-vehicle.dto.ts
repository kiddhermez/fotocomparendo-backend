import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Color, TypeVehicle } from '../entities';
import { Soat } from 'src/modules/soat/entities/soat.entity';
import { Driver } from 'src/modules/driver/entities/driver.entity';

export class CreateVehicleDto {
  @IsString()
  @Length(3, 3)
  plate_number: string;

  @IsString()
  @Length(3, 3)
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

  @IsObject()
  @IsOptional()
  soat: Partial<Soat>;
}
