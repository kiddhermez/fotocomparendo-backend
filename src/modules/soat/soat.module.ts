/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SoatController } from './soat.controller';
import { SoatService } from './soat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soat } from './entities/soat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Soat])],
  controllers: [SoatController],
  providers: [SoatService],
})
export class SoatModule {}
