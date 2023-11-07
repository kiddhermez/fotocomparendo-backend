import { Controller, Get, Param } from '@nestjs/common';

import { ColorService } from './color.service';

@Controller('vehicle/color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  getColors() {
    return this.colorService.getColors();
  }

  @Get(':id')
  getColor(@Param('id') id: number) {
    return this.colorService.getColor(id);
  }
}
