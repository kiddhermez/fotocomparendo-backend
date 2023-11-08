import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Driver } from './entities/driver.entity';
import { CreateDriverDto, UpdateDriverDto } from './dto';
import { DataDto } from '../data.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getDrivers() {
    const drivers = await this.driverRepository.find({
      relations: [
        'vehicles',
        'vehicles.type',
        'vehicles.color',
        'vehicles.soat',
      ],
    });
    let result: DataDto;

    if (!drivers) {
      result = {
        state: 404,
        message: 'Drivers not found',
        data: [],
      };

      return result;
    }

    result = {
      state: 200,
      message: `Drivers found`,
      total: drivers.length,
      data: drivers,
    };
    return result;
  }

  async getDriver(id: string) {
    const driver = await this.driverRepository.findOneBy({ id });
    let result: DataDto;

    if (!driver) {
      result = {
        state: 404,
        message: 'Driver not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: `Driver found`,
      data: [driver],
    };
    return result;
  }

  async createDriver(driver: CreateDriverDto) {
    const existingDriver = await this.driverRepository.findOneBy({
      id: driver.id,
    });

    let result: DataDto;

    if (existingDriver) {
      result = {
        state: 409,
        message: 'Driver already exists',
        data: [],
      };

      return result;
    }

    const newDriver = await this.driverRepository.save(driver);
    result = {
      state: 201,
      message: 'Driver created',
      data: [newDriver],
    };

    return result;
  }

  async updateDriver(id: string, driver: UpdateDriverDto) {
    let result: DataDto;

    const existDriver = await this.driverRepository.findOneBy({
      id,
    });
    if (!existDriver) {
      result = {
        state: 404,
        message: 'Driver not found',
        data: [],
      };

      return result;
    }

    const existNewDriver = await this.driverRepository.findOneBy({
      id: driver.id ?? id,
    });
    if (
      existNewDriver &&
      JSON.stringify(existDriver) !== JSON.stringify(existNewDriver)
    ) {
      result = {
        state: 409,
        message: 'Driver already exists',
        data: [],
      };

      return result;
    }

    await this.driverRepository.update(id, driver);
    result = {
      state: 200,
      message: 'Driver updated',
      data: [{ ...existDriver, ...driver }],
    };
    return result;
  }

  async deleteDriver(id: string) {
    const driver = await this.driverRepository.findOneBy({ id });
    let result: DataDto;

    if (!driver) {
      result = {
        state: 404,
        message: 'Driver not found',
        data: [],
      };

      return result;
    }

    this.driverRepository.remove(driver);
    result = {
      state: 200,
      message: 'Driver deleted',
      data: [driver],
    };

    return result;
  }
}
