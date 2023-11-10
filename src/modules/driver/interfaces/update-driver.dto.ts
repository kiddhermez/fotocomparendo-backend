import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDriverDto {
  @IsString()
  @Length(8, 10)
  @IsOptional()
  cedula: string;

  @IsString()
  @Length(1, 20)
  @IsOptional()
  nombre1: string;

  @IsString()
  @Length(0, 20)
  @IsOptional()
  nombre2: string;

  @IsString()
  @Length(1, 20)
  @IsOptional()
  apellido1: string;

  @IsString()
  @Length(0, 20)
  @IsOptional()
  apellido2: string;

  @IsDateString()
  @IsOptional()
  fecha_nacimiento: Date;
}
