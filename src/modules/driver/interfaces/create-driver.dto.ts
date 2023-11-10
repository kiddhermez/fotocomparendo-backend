import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @Length(8, 10)
  cedula: string;

  @IsString()
  @Length(1, 20)
  nombre1: string;

  @IsString()
  @Length(0, 20)
  @IsOptional()
  nombre2: string;

  @IsString()
  @Length(1, 20)
  apellido1: string;

  @IsString()
  @Length(0, 20)
  @IsOptional()
  apellido2: string;

  @IsDateString()
  fecha_nacimiento: Date;
}
