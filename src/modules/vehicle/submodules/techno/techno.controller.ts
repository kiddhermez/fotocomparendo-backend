import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TechnoService } from './techno.service';
import { CreateTechnoDto, UpdateTechnoDto } from '../../interfaces';

@Controller('vehicle/techno')
export class TechnoController {
  constructor(private readonly technoService: TechnoService) {}

  @Get()
  getTechnos() {
    return this.technoService.getTechnos();
  }

  @Post()
  createTechno(@Body() techno: CreateTechnoDto) {
    return this.technoService.createTechno(techno);
  }

  @Patch('id/:id')
  updateTechno(@Param('id') id: string, @Body() techno: UpdateTechnoDto) {
    return this.technoService.updateTechno(id, techno);
  }

  @Delete('id/:id')
  deleteTechno(@Param('id') id: string) {
    return this.technoService.deleteTechno(id);
  }
}
