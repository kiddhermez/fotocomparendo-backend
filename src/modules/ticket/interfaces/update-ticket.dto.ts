import {
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateTicketDto {
  @IsNumber()
  @Max(99999999999)
  @Min(100000)
  @IsOptional()
  costo_inf: number;

  @IsString()
  @Length(1, 3)
  @IsOptional()
  velocidad: string;

  @IsLongitude()
  @IsOptional()
  longitud: number;

  @IsLatitude()
  @IsOptional()
  latitud: number;

  @IsDateString()
  @IsOptional()
  fecha: Date;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  numero: string;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  letra: string;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  id_comuna: string;
}
