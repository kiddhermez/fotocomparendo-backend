import { LicenseModule } from './modules/license/license.module';
import { TechnoModule } from './modules/techno/techno.module';
import { SoatModule } from './modules/soat/soat.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from './modules/database/database.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DriverModule } from './modules/driver/driver.module';

@Module({
  imports: [
    LicenseModule,
    TechnoModule,
    SoatModule,
    DatabaseModule,
    VehicleModule,
    DriverModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  static PORT: number;
  constructor(private readonly ConfigService: ConfigService) {
    AppModule.PORT = this.ConfigService.get('PORT');
  }
}
