import { IsDateString, IsString, Length } from 'class-validator';

export class CreateTechnoDto {
  @IsString()
  @Length(15, 15)
  nro_acreditacion: string;

  @IsDateString()
  fecha_expedicion: Date;
}
