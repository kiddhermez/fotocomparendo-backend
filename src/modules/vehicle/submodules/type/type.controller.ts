import { Controller, Get } from '@nestjs/common';
import { TypeService } from './type.service';

@Controller('vehicle/type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getTypes() {
    return this.typeService.getTypes();
  }
}
