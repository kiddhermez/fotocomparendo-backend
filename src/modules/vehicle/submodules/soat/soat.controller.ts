import { Controller, Get } from '@nestjs/common';

import { SoatService } from './soat.service';

@Controller('vehicle/soat')
export class SoatController {
  constructor(private readonly soatService: SoatService) {}

  @Get()
  getSoats() {
    return this.soatService.getSoats();
  }
}
