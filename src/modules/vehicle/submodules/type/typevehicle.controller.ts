import { Controller, Get, Param } from '@nestjs/common';

import { TypeVehicleService } from './typevehicle.service';

@Controller('vehicle/type')
export class TypeVehicleController {
  constructor(private readonly typeVehicleService: TypeVehicleService) {}

  @Get()
  getTypes() {
    return this.typeVehicleService.getTypes();
  }
}
