import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeVehicle } from '../../entities';
import { DataDto } from 'src/modules/data.dto';

@Injectable()
export class TypeVehicleService {
  constructor(
    @InjectRepository(TypeVehicle)
    private readonly typeVehicleRepository: Repository<TypeVehicle>,
  ) {}

  async getTypes() {
    const types = await this.typeVehicleRepository.find();
    let result: DataDto;

    if (!types) {
      result = {
        state: 404,
        message: 'Types not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Types found',
      total: types.length,
      data: types,
    };
    return result;
  }
}
