import { IsObject, IsString, Length } from 'class-validator';
import { Vehicle } from 'src/modules/vehicle/entities';

export class CreateTechnoDto {
  @IsString()
  @Length(15, 15)
  accreditation: string;

  @IsString()
  Expedition: Date;

  @IsObject()
  vehicle: Vehicle;
}
