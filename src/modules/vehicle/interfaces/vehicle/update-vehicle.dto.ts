import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @Length(3, 3)
  @IsOptional()
  numero: string;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  letra: string;

  @IsString()
  @Length(1, 10)
  @IsOptional()
  linea: string;

  @IsString()
  @Length(1, 25)
  @IsOptional()
  marca: string;

  @IsString()
  @Length(8, 10)
  @IsOptional()
  cedula: string;

  @IsString()
  @Length(2, 2)
  @IsOptional()
  codigo: string;

  @IsString()
  @Length(2, 2)
  @IsOptional()
  id_color: string;
}
