import { IsObject, IsOptional, IsString, Length } from 'class-validator';
import { Vehicle } from 'src/modules/vehicle/entities';
export class UpdateTechnoDto {
  @IsString()
  @Length(15, 15)
  @IsOptional()
  accreditation: string;

  @IsString()
  @IsOptional()
  Expedition: Date;

  @IsObject()
  @IsOptional()
  vehicle: Vehicle;
}
