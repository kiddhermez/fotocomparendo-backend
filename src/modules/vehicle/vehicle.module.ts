import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeVehicleService, TypeVehicleController } from './submodules/type/';
import { Color, TypeVehicle, Vehicle } from './entities';
import { ColorController, ColorService } from './submodules/color/';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, TypeVehicle, Color])],
  controllers: [VehicleController, TypeVehicleController, ColorController],
  providers: [VehicleService, TypeVehicleService, ColorService],
})
export class VehicleModule {}
