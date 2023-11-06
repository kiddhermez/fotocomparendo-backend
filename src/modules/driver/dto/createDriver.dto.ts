import {
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @MaxLength(10)
  @MinLength(8)
  readonly id: string;

  @IsString()
  first_name: string;

  @IsString()
  @IsOptional()
  first_name2: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsOptional()
  last_name2: string;

  @IsDateString()
  born_date: string;
}
