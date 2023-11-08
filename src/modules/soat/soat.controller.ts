import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { SoatService } from './soat.service';
import { Soat } from './entities/soat.entity';

@Controller('vehicle/soat')
export class SoatController {
  constructor(private readonly soatService: SoatService) {}

  @Get()
  getSoats() {
    return this.soatService.getSoats();
  }

  @Get('/driver/:id')
  getSoat(id: string) {
    return this.soatService.getSoat(id);
  }

  @Post()
  createSoat(soat: Soat) {
    return this.soatService.createSoat(soat);
  }

  @Patch()
  updateSoat(id: string, soat: Soat) {
    return this.soatService.updateSoat(id, soat);
  }

  @Delete()
  deleteSoat(id: string) {
    return this.soatService.deleteSoat(id);
  }
}
