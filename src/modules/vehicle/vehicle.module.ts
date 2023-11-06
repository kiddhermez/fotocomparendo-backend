import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleController } from './vehicle.controller';
import { TypeVehicleController } from './typevehicle.controller';
import { TypeVehicleService } from './typevehicle.service';
import { Color, TypeVehicle, Vehicle } from './entities';
import { VehicleService } from './vehicle.service';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, TypeVehicle, Color])],
  controllers: [VehicleController, TypeVehicleController, ColorController],
  providers: [VehicleService, TypeVehicleService, ColorService],
})
export class VehicleModule {}
