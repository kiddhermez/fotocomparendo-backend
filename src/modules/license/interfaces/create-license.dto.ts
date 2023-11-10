import { IsDateString, IsString, Length } from 'class-validator';

export class CreateLicenseDto {
  @IsString()
  @Length(15, 15)
  nro_lic: string;

  @IsDateString()
  fecha_expedicion: Date;

  @IsDateString()
  fecha_vencimiento: Date;

  @IsString()
  @Length(8, 10)
  cedula: string;

  @IsString()
  @Length(2, 2)
  cod_categoria: string;
}
