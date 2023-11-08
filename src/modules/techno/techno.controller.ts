import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TechnoService } from './techno.service';
import { Techno } from './entities/techno.entity';

@Controller('/vehicle/techno')
export class TechnoController {
  constructor(private readonly technoService: TechnoService) {}

  @Get()
  getTechnos() {
    return this.technoService.getTechnos();
  }

  @Post()
  createTechno(accreditation: string) {
    return this.technoService.createTechno(accreditation);
  }

  @Patch()
  updateTechno(accreditation: string, techno: Techno) {
    return this.technoService.updateTechno(accreditation, techno);
  }

  @Delete()
  deleteTechno(accreditation: string) {
    return this.technoService.deleteTechno(accreditation);
  }
}
