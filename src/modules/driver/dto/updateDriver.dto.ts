import {
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateDriverDto {
  @MaxLength(10)
  @MinLength(8)
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  first_name2: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  last_name2: string;

  @IsDateString()
  @IsOptional()
  born_date: string;
}
