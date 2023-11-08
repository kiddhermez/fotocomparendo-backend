import { IsObject, IsOptional, IsString, Length } from 'class-validator';
import { Color, TypeVehicle } from '../entities';
import { Soat } from 'src/modules/soat/entities/soat.entity';
import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Techno } from 'src/modules/techno/entities/techno.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

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

  @IsObject()
  @IsOptional()
  techno: Partial<Techno>;

  @IsObject()
  @IsOptional()
  tickets: Partial<Ticket>[];
}
