import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechnoService } from './techno.service';
import { TechnoController } from './techno.controller';
import { Techno } from './entities/techno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Techno])],
  controllers: [TechnoController],
  providers: [TechnoService],
})
export class TechnoModule {}
