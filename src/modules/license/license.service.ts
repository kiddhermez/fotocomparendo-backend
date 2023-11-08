import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { License } from './entities/license.entity';
import { DataDto } from '../data.dto';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {}

  async getLicenses() {
    const licenses = await this.licenseRepository.find({
      relations: ['categories'],
    });
    let result: DataDto;

    if (!licenses) {
      result = {
        state: 404,
        message: 'Licenses not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Licenses found',
      total: licenses.length,
      data: licenses,
    };
    return result;
  }

  async getLicense(id: string) {
    const license = await this.licenseRepository.find({
      where: { driver: { id: id } },
      relations: ['categories'],
    });
    let result: DataDto;

    if (!license) {
      result = {
        state: 404,
        message: 'License not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Licenses found',
      data: license,
      total: license.length,
    };
    return result;
  }
}
