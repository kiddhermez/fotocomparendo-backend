import {
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  @Max(99999999999)
  @Min(100000)
  costo_inf: number;

  @IsString()
  @Length(1, 3)
  velocidad: string;

  @IsLongitude()
  longitud: number;

  @IsLatitude()
  latitud: number;

  @IsDateString()
  fecha: Date;

  @IsString()
  @Length(3, 3)
  numero: string;

  @IsString()
  @Length(3, 3)
  letra: string;

  @IsString()
  @Length(3, 3)
  id_comuna: string;
}
