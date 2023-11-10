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
} from 'src/outStates';

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

  // Get driver by id
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

  // Get driver by plate
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

  // Create new driver
  async createDriver(driver: CreateDriverDto) {
    const driverExists = await this.db.queryGet('CALL BuscarConductorCC(?)', [
      driver.cedula,
    ]);

    if (Object.values(driverExists[0]).length > 0) {
      return notFound<Driver>('Driver');
    }

    await this.db.query(
      'INSERT INTO conductor (cedula,nombre1,nombre2,apellido1,apellido2,fecha_nacimiento) VALUES (?,?,?,?,?,?)',
      [
        driver.cedula,
        driver.nombre1,
        driver.nombre2,
        driver.apellido1,
        driver.apellido2,
        driver.fecha_nacimiento,
      ],
    );

    return isCreated<Driver>('Driver');
  }

  // Update driver
  async updateDriver(id: string, driver: UpdateDriverDto) {
    // Check if driver exists
    const driverExists = await this.getDriverById(id);

    if (driverExists.state === 404) {
      return driverExists;
    }

    // Check if new driver already exists
    const driverAlreadyExists = await this.getDriverById(driver.cedula ?? id);

    if (
      driverAlreadyExists.state === 200 &&
      JSON.stringify(driverAlreadyExists) !== JSON.stringify(driverExists)
    ) {
      return isConflict<Driver>('Driver');
    }

    // Update driver in database
    const { data: oldDriver } = driverExists;
    await this.db.query(
      'UPDATE conductor SET cedula = ?, nombre1 = ?, nombre2 = ?, apellido1 = ?, apellido2 = ?, fecha_nacimiento = ? WHERE cedula = ?',
      [
        driver.cedula ?? id,
        driver.nombre1 ?? oldDriver[0].nombre1,
        driver.nombre2 ?? oldDriver[0].nombre2,
        driver.apellido1 ?? oldDriver[0].apellido1,
        driver.apellido2 ?? oldDriver[0].apellido2,
        driver.fecha_nacimiento ?? oldDriver[0].fecha_nacimiento,
        id,
      ],
    );

    return isUpdated<Driver>('Driver');
  }

  // Delete driver
  async deleteDriver(id: string) {
    const driverExists = await this.getDriverById(id);

    if (driverExists.state === 404) {
      return driverExists;
    }

    await this.db.query('DELETE FROM conductor WHERE cedula = ?', [id]);

    return isDeleted<Driver>('Driver');
  }
}
