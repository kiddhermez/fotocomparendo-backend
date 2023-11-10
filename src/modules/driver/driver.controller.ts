/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto, UpdateDriverDto } from './interfaces';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  getDrivers() {
    return this.driverService.getDrivers();
  }

  @Get('id/:id')
  getDriver(@Param('id') id: string) {
    return this.driverService.getDriverById(id);
  }

  @Get('plate/:plate_letter/:plate_number')
  getDriverByPlate(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
  ) {
    return this.driverService.getDriverByPlate(
      plate_letter.toUpperCase(),
      plate_number,
    );
  }

  @Post()
  createDriver(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.createDriver(createDriverDto);
  }

  @Patch(':id')
  updateDriver(@Param('id') id: string, @Body() driver: UpdateDriverDto) {
    return this.driverService.updateDriver(id, driver);
  }

  @Delete(':id')
  deleteDriver(@Param('id') id: string) {
    return this.driverService.deleteDriver(id);
  }
}
