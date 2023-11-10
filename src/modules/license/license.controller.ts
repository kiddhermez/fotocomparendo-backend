import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LicenseService } from './license.service';
import { CreateLicenseDto, UpdateLicenseDto } from './interfaces';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get()
  getLicenses() {
    return this.licenseService.getLicenses();
  }

  @Get('driver/:id')
  getLicenseById(@Param('id') id: string) {
    return this.licenseService.getLicenseById(id);
  }

  @Get('plate/:plate_letter/:plate_number')
  getLicenseByPlate(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
  ) {
    return this.licenseService.getLicenseByPlate(
      plate_letter.toUpperCase(),
      plate_number,
    );
  }

  @Post()
  createLicense(@Body() license: CreateLicenseDto) {
    return this.licenseService.createLicense(license);
  }

  @Patch(':id')
  updateLicense(@Param('id') id: string, @Body() license: UpdateLicenseDto) {
    return this.licenseService.updateLicense(id, license);
  }

  @Delete(':id')
  deleteLicense(@Param('id') id: string) {
    return this.licenseService.deleteLicense(id);
  }
}
