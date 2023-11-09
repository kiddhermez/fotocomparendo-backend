import { DriverModule } from './modules/driver/driver.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
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
