import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { SoatService } from './soat.service';
import { CreateSoatDto, UpdateSoatDto } from '../../interfaces';

@Controller('soat')
export class SoatController {
  constructor(private readonly soatService: SoatService) {}

  @Get()
  getSoats() {
    return this.soatService.getSoats();
  }

  @Post()
  createSoat(@Body() soat: CreateSoatDto) {
    return this.soatService.createSoat(soat);
  }

  @Patch(':id')
  updateSoat(@Param('id') id: string, @Body() soat: UpdateSoatDto) {
    return this.soatService.updateSoat(id, soat);
  }

  @Delete(':id')
  deleteSoat(@Param('id') id: string) {
    return this.soatService.deleteSoat(id);
  }
}
