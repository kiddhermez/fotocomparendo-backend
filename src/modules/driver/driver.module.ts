import { Module } from '@nestjs/common';

import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
