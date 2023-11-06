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
import { CreateDriverDto, UpdateDriverDto } from './dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  getDrivers() {
    return this.driverService.getDrivers();
  }

  @Get(':id')
  getDriver(@Param('id') id: string) {
    return this.driverService.getDriver(id);
  }

  @Post()
  createDriver(@Body() driver: CreateDriverDto) {
    return this.driverService.createDriver(driver);
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
