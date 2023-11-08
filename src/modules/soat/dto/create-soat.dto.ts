import { IsNumber, IsObject, IsString, Length } from 'class-validator';
import { Vehicle } from 'src/modules/vehicle/entities';

export class CreateSoatDto {
  @IsString()
  @Length(17, 17)
  policy: string;

  @IsString()
  vigency: Date;

  @IsNumber()
  @Length(1, 7)
  price: number;

  @IsObject()
  vehicle: Partial<Vehicle>;
}
