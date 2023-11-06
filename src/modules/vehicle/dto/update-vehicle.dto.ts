import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @MaxLength(3)
  @MinLength(3)
  @IsOptional()
  plate_number: string;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  @IsOptional()
  plate_letter: string;

  @IsString()
  @IsOptional()
  line: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsNumber()
  @Max(99)
  @Min(1)
  @IsOptional()
  color_id: number;

  @IsNumber()
  @Max(999)
  @Min(1)
  @IsOptional()
  type_id: number;

  @MaxLength(10)
  @MinLength(8)
  @IsString()
  @IsOptional()
  driver_id: string;
}
