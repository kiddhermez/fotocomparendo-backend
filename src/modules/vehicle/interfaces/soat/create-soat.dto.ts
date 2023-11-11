import {
  IsDateString,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateSoatDto {
  @IsString()
  @Length(17, 17)
  nro_poliza: string;

  @IsNumber()
  @Max(99999999999)
  @Min(100000)
  costo: number;

  @IsDateString()
  fecha_vigencia: Date;
}
