import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { CreateLicenseDto, License, UpdateLicenseDto } from './interfaces';
import { LicenceDto, useLicense } from './hooks/useLicense';
import {
  isConflict,
  isCreated,
  isDeleted,
  isFound,
  isUpdated,
  notFound,
} from '../outStates';

@Injectable()
export class LicenseService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<License>,
  ) {}

  async getLicenses() {
    const licenses = await this.db.queryGet('SELECT * FROM licencia');

    if (!licenses) {
      return notFound<License>('License');
    }

    return isFound<License>({
      data: licenses,
      length: licenses.length,
      name: 'Licenses',
    });
  }

  async getLicenseById(id: string) {
    const license = await this.db.queryCall<LicenceDto>(
      'CALL BuscarLicenciaCC(?)',
      [id],
    );

    if (license.length === 0) {
      return notFound<License>('License');
    }

    const { formatedData, length } = useLicense(license);

    return isFound<License>({
      data: formatedData,
      length: length,
      name: 'License',
    });
  }

  async getLicenseByPlate(plate_letter: string, plate_number: string) {
    const license = await this.db.queryCall<LicenceDto>(
      'CALL BuscarLicenciaPL(?,?)',
      [plate_letter, plate_number],
    );

    if (license.length === 0) {
      return notFound<License>('License');
    }

    const { formatedData, length } = useLicense(license);

    return isFound<License>({
      data: formatedData,
      length: length,
      name: 'License',
    });
  }

  async createLicense(license: CreateLicenseDto) {
    const licenseExists = await this.db.queryGet(
      'SELECT * FROM licencia WHERE nro_lic = ?',
      [license.nro_lic],
    );

    if (licenseExists) {
      return isConflict<License>('License');
    }

    await this.db.query('INSERT INTO licencia SET ?', [license]);
    return isCreated<License>('License');
  }

  async updateLicense(id: string, license: UpdateLicenseDto) {
    const licenseExists = await this.db.queryGet(
      'SELECT * FROM licencia WHERE nro_lic = ?',
      [id],
    );

    if (!licenseExists) {
      return notFound<License>('License');
    }

    const licenseAlreadyExists = await this.db.queryGet(
      'SELECT * FROM licencia WHERE nro_lic = ?',
      [license.nro_lic ?? id],
    );

    if (licenseAlreadyExists && licenseAlreadyExists[0].nro_lic !== id) {
      return isConflict<License>('License');
    }

    await this.db.query('UPDATE licencia SET ? WHERE nro_lic = ?', [
      license,
      id,
    ]);

    return isUpdated<License>('License');
  }

  async deleteLicense(id: string) {
    const licenseExists = await this.db.queryGet(
      'SELECT * FROM licencia WHERE nro_lic = ?',
      [id],
    );

    if (!licenseExists) {
      return notFound<License>('License');
    }

    await this.db.query('DELETE FROM licencia WHERE nro_lic = ?', [id]);
    return isDeleted<License>('License');
  }
}
