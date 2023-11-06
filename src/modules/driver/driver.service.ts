import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Driver } from './entities/driver.entity';
import { CreateDriverDto, UpdateDriverDto } from './dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getDrivers() {
    return await this.driverRepository.find({
      relations: ['vehicles'],
    });
  }

  async getDriver(id: string) {
    const driver = await this.driverRepository.findOneBy({ id });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return driver;
  }

  async createDriver(driver: CreateDriverDto) {
    const existingDriver = await this.driverRepository.findOne({
      where: { id: driver.id },
    });

    if (existingDriver) {
      throw new HttpException({ error: 'Driver already exists' }, 400);
    }

    return await this.driverRepository.save(driver);
  }

  async updateDriver(id: string, driver: UpdateDriverDto) {
    const user = await this.getDriver(id);

    const existingDriver =
      driver.id &&
      driver.id !== id &&
      (await this.driverRepository.findOne({
        where: { id: driver.id },
      }));

    if (existingDriver) {
      throw new HttpException({ error: 'Driver already exists' }, 400);
    }

    const newDriver = { ...user, ...driver };
    await this.driverRepository.update(id, driver);

    return newDriver;
  }

  async deleteDriver(id: string) {
    const driver = await this.getDriver(id);

    this.driverRepository.remove(driver);

    return driver;
  }
}
