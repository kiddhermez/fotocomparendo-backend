import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OutDto } from '../out.dto';
import { Driver } from './interfaces/driver';
import { CreateDriverDto, UpdateDriverDto } from './interfaces';

@Injectable()
export class DriverService {
  private result: OutDto<Driver>;

  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Driver>,
  ) {}

  // Get all drivers
  async getDrivers() {
    const drivers = await this.db.queryGet(`SELECT * FROM conductor`);

    if (!drivers) {
      this.result = {
        state: 404,
        message: 'Drivers not found',
        data: [],
      };
      return this.result;
    }

    this.result = {
      state: 200,
      message: 'Drivers found',
      total: drivers.length,
      data: drivers,
    };
    return this.result;
  }

  // Get driver by id
  async getDriverById(id: string) {
    const driver = await this.db.queryGet('CALL BuscarConductorCC(?)', [id]);
    const data = Object.values(driver[0]);

    if (data.length === 0) {
      this.result = {
        state: 404,
        message: 'Driver not found',
        data: [],
      };
      return this.result;
    }

    this.result = {
      state: 200,
      message: 'Driver found',
      total: data.length,
      data: data,
    };
    return this.result;
  }

  // Get driver by plate
  async getDriverByPlate(plate_letter: string, plate_number: string) {
    const driver = await this.db.queryGet('CALL BuscarConductorPL(?,?)', [
      plate_letter,
      plate_number,
    ]);
    const data = Object.values(driver[0]);

    if (data.length === 0) {
      this.result = {
        state: 404,
        message: 'Driver not found',
        data: [],
      };
      return this.result;
    }

    this.result = {
      state: 200,
      message: 'Driver found',
      total: data.length,
      data: data,
    };
    return this.result;
  }

  // Create new driver
  async createDriver(driver: CreateDriverDto) {
    const driverExists = await this.db.queryGet('CALL BuscarConductorCC(?)', [
      driver.cedula,
    ]);

    if (Object.values(driverExists[0]).length > 0) {
      this.result = {
        state: 409,
        message: 'Driver already exists',
        data: [],
      };
      return this.result;
    }

    await this.db.queryAdd(
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

    const newDriver = await this.db.queryGet('CALL BuscarConductorCC(?)', [
      driver.cedula,
    ]);

    const data = Object.values(newDriver[0]);

    this.result = {
      state: 201,
      message: 'Driver created',
      total: data.length,
      data: data,
    };
    return this.result;
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
      this.result = {
        state: 409,
        message: 'Driver already exists',
        data: [],
      };
      return this.result;
    }

    // Update driver in database
    const { data: oldDriver } = driverExists;
    await this.db.queryAdd(
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

    this.result = await this.getDriverById(driver.cedula ?? id);
    this.result.message = 'Driver updated';
    return this.result;
  }

  // Delete driver
  async deleteDriver(id: string) {
    const driverExists = await this.getDriverById(id);

    if (driverExists.state === 404) {
      return driverExists;
    }

    await this.db.queryAdd('DELETE FROM conductor WHERE cedula = ?', [id]);

    this.result = {
      state: 200,
      message: 'Driver deleted',
      data: driverExists.data,
    };

    return this.result;
  }
}
