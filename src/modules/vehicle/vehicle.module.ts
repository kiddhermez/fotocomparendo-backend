import { Module } from '@nestjs/common';

import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { ColorController } from './submodules/color/color.controller';
import { SoatController } from './submodules/soat/soat.controller';
import { TechnoController } from './submodules/techno/techno.controller';
import { TypeController } from './submodules/type/type.controller';
import { ColorService } from './submodules/color/color.service';
import { SoatService } from './submodules/soat/soat.service';
import { TechnoService } from './submodules/techno/techno.service';
import { TypeService } from './submodules/type/type.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    VehicleController,
    TechnoController,
    SoatController,
    ColorController,
    TypeController,
  ],
  providers: [
    VehicleService,
    TechnoService,
    SoatService,
    ColorService,
    TypeService,
  ],
})
export class VehicleModule {}
