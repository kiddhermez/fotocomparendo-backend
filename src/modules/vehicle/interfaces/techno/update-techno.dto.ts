import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTechnoDto {
  @IsString()
  @Length(15, 15)
  @IsOptional()
  nro_acreditacion: string;

  @IsDateString()
  @IsOptional()
  fecha_expedicion: Date;
}
