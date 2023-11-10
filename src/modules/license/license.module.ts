import { Module } from '@nestjs/common';

import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { DatabaseModule } from '../database/database.module';
import { CategoryController } from './submodules/category.controller';
import { CategoryService } from './submodules/category.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LicenseController, CategoryController],
  providers: [LicenseService, CategoryService],
})
export class LicenseModule {}
