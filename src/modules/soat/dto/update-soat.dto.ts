import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Vehicle } from 'src/modules/vehicle/entities';

export class UpdateSoatDto {
  @IsString()
  @Length(17, 17)
  @IsOptional()
  policy: string;

  @IsString()
  @IsOptional()
  vigency: Date;

  @IsNumber()
  @Length(1, 7)
  @IsOptional()
  price: number;

  @IsObject()
  @IsOptional()
  vehicle: Partial<Vehicle>;
}
