import { Controller, Get } from '@nestjs/common';
import { ComuneService } from './comune.service';

@Controller('ticket/comune')
export class ComuneController {
  constructor(private readonly comuneService: ComuneService) {}

  @Get()
  getComunes() {
    return this.comuneService.getComunes();
  }
}
