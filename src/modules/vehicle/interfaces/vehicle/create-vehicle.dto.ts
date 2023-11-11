import { IsObject, IsString, Length } from 'class-validator';
import { Soat } from '../soat/soat';
import { Techno } from '../techno/techno';

export class CreateVehicleDto {
  @IsString()
  @Length(3, 3)
  numero: string;

  @IsString()
  @Length(3, 3)
  letra: string;

  @IsString()
  @Length(1, 10)
  linea: string;

  @IsString()
  @Length(1, 25)
  marca: string;

  @IsString()
  @Length(8, 10)
  cedula: string;

  @IsObject()
  soat: Soat;

  @IsObject()
  tecnomecanica: Techno;

  @IsString()
  @Length(2, 2)
  codigo: string;

  @IsString()
  @Length(2, 2)
  id_color: string;
}
