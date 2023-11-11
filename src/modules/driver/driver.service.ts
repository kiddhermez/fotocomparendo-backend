import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { Driver } from './interfaces/driver';
import { CreateDriverDto, UpdateDriverDto } from './interfaces';
import {
  isConflict,
  isCreated,
  isDeleted,
  isFound,
  isUpdated,
  notFound,
} from '../outStates';

@Injectable()
export class DriverService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Driver>,
  ) {}

  async getDrivers() {
    const drivers = await this.db.queryGet(`SELECT * FROM conductor`);

    if (!drivers) {
      return notFound<Driver>('Driver');
    }

    return isFound<Driver>({
      data: drivers,
      length: drivers.length,
      name: 'Drivers',
    });
  }

  async getDriverById(id: string) {
    const driver = await this.db.queryGet('CALL BuscarConductorCC(?)', [id]);
    const data = Object.values(driver[0]);

    if (data.length === 0) {
      return notFound<Driver>('Driver');
    }

    return isFound<Driver>({
      data: data,
      length: data.length,
      name: 'Driver',
    });
  }

  async getDriverByPlate(plate_letter: string, plate_number: string) {
    const driver = await this.db.queryGet('CALL BuscarConductorPL(?,?)', [
      plate_letter,
      plate_number,
    ]);
    const data = Object.values(driver[0]);

    if (data.length === 0) {
      return notFound<Driver>('Driver');
    }

    return isFound<Driver>({
      data: data,
      length: data.length,
      name: 'Driver',
    });
  }

  async createDriver(driver: CreateDriverDto) {
    const driverExists = await this.db.queryGet('CALL BuscarConductorCC(?)', [
      driver.cedula,
    ]);

    if (Object.values(driverExists[0]).length > 0) {
      return notFound<Driver>('Driver');
    }

    await this.db.query('INSERT INTO conductor SET ?', [driver]);

    return isCreated<Driver>('Driver');
  }

  async updateDriver(id: string, driver: UpdateDriverDto) {
    const driverExists = await this.getDriverById(id);

    if (driverExists.state === 404) {
      return driverExists;
    }

    const driverAlreadyExists = await this.getDriverById(driver.cedula ?? id);

    if (
      driverAlreadyExists.state === 200 &&
      JSON.stringify(driverAlreadyExists) !== JSON.stringify(driverExists)
    ) {
      return isConflict<Driver>('Driver');
    }

    await this.db.query('UPDATE conductor SET ? WHERE cedula = ?', [
      driver,
      id,
    ]);

    return isUpdated<Driver>('Driver');
  }

  async deleteDriver(id: string) {
    const driverExists = await this.getDriverById(id);

    if (driverExists.state === 404) {
      return driverExists;
    }

    await this.db.query('DELETE FROM conductor WHERE cedula = ?', [id]);

    return isDeleted<Driver>('Driver');
  }
}
