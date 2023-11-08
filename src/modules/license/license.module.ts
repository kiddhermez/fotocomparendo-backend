import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';
import { License } from './entities/license.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([License, Category])],
  controllers: [LicenseController],
  providers: [LicenseService],
})
export class LicenseModule {}
