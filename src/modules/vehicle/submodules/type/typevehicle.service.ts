import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeVehicle } from '../../entities';

@Injectable()
export class TypeVehicleService {
  constructor(
    @InjectRepository(TypeVehicle)
    private readonly typeVehicleRepository: Repository<TypeVehicle>,
  ) {}

  async getTypes() {
    return await this.typeVehicleRepository.find();
  }

  async getType(id: number) {
    const type = await this.typeVehicleRepository.findOneBy({ id });

    if (!type) {
      throw new NotFoundException('Type not found');
    }

    return type;
  }
}
