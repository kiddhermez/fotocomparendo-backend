import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

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
}
