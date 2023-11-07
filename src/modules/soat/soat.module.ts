import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SoatController } from './soat.controller';
import { SoatService } from './soat.service';
import { Soat } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Soat])],
  controllers: [SoatController],
  providers: [SoatService],
})
export class SoatModule {}
