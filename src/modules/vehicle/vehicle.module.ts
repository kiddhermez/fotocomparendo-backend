import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeVehicleService, TypeVehicleController } from './submodules/type/';
import { Color, Soat, TypeVehicle, Vehicle } from './entities';
import { ColorController, ColorService } from './submodules/color/';
import { SoatController, SoatService } from './submodules/soat';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, TypeVehicle, Color, Soat])],
  controllers: [
    VehicleController,
    TypeVehicleController,
    ColorController,
    SoatController,
  ],
  providers: [VehicleService, TypeVehicleService, ColorService, SoatService],
})
export class VehicleModule {}
