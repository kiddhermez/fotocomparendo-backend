import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @MaxLength(3)
  @MinLength(3)
  plate_number: string;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  plate_letter: string;

  @IsString()
  line: string;

  @IsString()
  company: string;

  @IsNumber()
  @Max(999)
  @Min(1)
  color_id: number;

  @IsNumber()
  @Max(999)
  @Min(1)
  type_id: number;

  @MaxLength(10)
  @MinLength(8)
  @IsString()
  driver_id: string;
}
