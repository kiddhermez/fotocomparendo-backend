import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateSoatDto {
  @IsString()
  @Length(17, 17)
  @IsOptional()
  nro_poliza: string;

  @IsNumber()
  @Max(99999999999)
  @Min(100000)
  @IsOptional()
  costo: number;

  @IsDateString()
  @IsOptional()
  fecha_vigencia: Date;
}
