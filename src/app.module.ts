import { DatabaseModule } from './modules/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DriverModule } from './modules/driver/driver.module';

@Module({
  imports: [
    DatabaseModule,
    VehicleModule,
    DriverModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  static APP_PORT: number;
  constructor(private readonly ConfigService: ConfigService) {
    AppModule.APP_PORT = this.ConfigService.get('APP_PORT');
  }
}
