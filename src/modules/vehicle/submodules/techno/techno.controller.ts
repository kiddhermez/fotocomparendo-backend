import { Controller, Get } from '@nestjs/common';
import { TechnoService } from './techno.service';

@Controller('vehicle/techno')
export class TechnoController {
  constructor(private readonly technoService: TechnoService) {}

  @Get()
  getTechnos() {
    return this.technoService.getTechnos();
  }
}
