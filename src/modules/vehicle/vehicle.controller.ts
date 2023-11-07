import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  getVehicles() {
    return this.vehicleService.getVehicles();
  }

  @Get('plate/:plate_letter/:plate_number')
  getVehicle(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
  ) {
    return this.vehicleService.getVehicle(plate_letter, plate_number);
  }

  @Post()
  createVehicle(@Body() vehicle: CreateVehicleDto) {
    return this.vehicleService.createVehicle(vehicle);
  }

  @Patch('plate/:plate_letter/:plate_number')
  updateVehicle(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
    @Body() vehicle: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(
      plate_letter,
      plate_number,
      vehicle,
    );
  }

  @Delete('plate/:plate_letter/:plate_number')
  deleteVehicle(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
  ) {
    return this.vehicleService.deleteVehicle(plate_letter, plate_number);
  }
}
