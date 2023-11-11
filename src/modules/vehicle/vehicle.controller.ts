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
import { CreateVehicleDto, UpdateVehicleDto } from './interfaces';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  getVehicles() {
    return this.vehicleService.getVehicles();
  }

  @Get('driver/:id')
  getVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(id);
  }

  @Get('plate/:plate_letter/:plate_number')
  getVehicleByPlate(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
  ) {
    return this.vehicleService.getVehicleByPlate(
      plate_letter.toUpperCase(),
      plate_number,
    );
  }

  @Post()
  createVehicle(@Body() vehicle: CreateVehicleDto) {
    return this.vehicleService.createVehicle(vehicle);
  }

  @Patch(':plate_letter/:plate_number')
  updateVehicle(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
    @Body() vehicle: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(
      plate_letter.toUpperCase(),
      plate_number,
      vehicle,
    );
  }

  @Delete(':plate_letter/:plate_number')
  deleteVehicle(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
  ) {
    return this.vehicleService.deleteVehicle(
      plate_letter.toUpperCase(),
      plate_number,
    );
  }
}
