import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';
import { License } from './entities/license.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './submodules/category/category.controller';
import { CategoryService } from './submodules/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([License, Category])],
  controllers: [LicenseController, CategoryController],
  providers: [LicenseService, CategoryService],
})
export class LicenseModule {}
