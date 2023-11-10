import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { LicenseModule } from './modules/license/license.module';
import { DriverModule } from './modules/driver/driver.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    VehicleModule,
    TicketModule,
    LicenseModule,
    DriverModule,
    DatabaseModule,
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
