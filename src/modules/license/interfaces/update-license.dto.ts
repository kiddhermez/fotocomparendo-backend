import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateLicenseDto {
  @IsString()
  @Length(15, 15)
  @IsOptional()
  nro_lic: string;

  @IsDateString()
  @IsOptional()
  fecha_expedicion: Date;

  @IsDateString()
  @IsOptional()
  fecha_vencimiento: Date;

  @IsString()
  @Length(8, 10)
  @IsOptional()
  cedula: string;

  @IsString()
  @Length(2, 2)
  @IsOptional() 
  cod_categoria: string;
}
