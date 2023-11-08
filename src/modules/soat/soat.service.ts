import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Soat } from './entities/soat.entity';
import { DataDto } from '../data.dto';

@Injectable()
export class SoatService {
  constructor(
    @InjectRepository(Soat)
    private readonly soatRepository: Repository<Soat>,
  ) {}

  async getSoats() {
    const soats = await this.soatRepository.find();
    let result: DataDto;

    if (!soats) {
      result = {
        state: 404,
        message: 'Soats not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Soats found',
      total: soats.length,
      data: soats,
    };
    return result;
  }

  async getSoat(id: string) {
    const soat = await this.soatRepository.find({
      where: { vehicle: { driver: { id: id } } },
      relations: ['vehicle'],
    });

    let result: DataDto;

    if (!soat) {
      result = {
        state: 404,
        message: 'Soat not found',
        data: [],
      };
      return result;
    }

    return soat;
  }

  async createSoat(soat: Soat) {
    const existSoat = this.soatRepository.findOneBy({
      policy: soat.policy,
    });

    let result: DataDto;

    if (existSoat) {
      result = {
        state: 409,
        message: 'Soat already exists',
        data: [],
      };
      return result;
    }

    const newSoat = await this.soatRepository.save(soat);

    result = {
      state: 201,
      message: 'Soat created',
      data: [newSoat],
    };
    return result;
  }

  async updateSoat(policy: string, soat: Soat) {
    const existSoat = await this.soatRepository.findOneBy({ policy: policy });
    let result: DataDto;

    if (!existSoat) {
      result = {
        state: 404,
        message: 'Soat not found',
        data: [],
      };
      return result;
    }

    const existNewSoat = await this.soatRepository.findOneBy({
      policy: soat.policy ?? policy,
    });

    if (
      existNewSoat &&
      JSON.stringify(existSoat) !== JSON.stringify(existNewSoat)
    ) {
      result = {
        state: 409,
        message: 'Soat already exists',
        data: [],
      };
      return result;
    }

    await this.soatRepository.update(policy, soat);
    const newSoat = await this.soatRepository.findOneBy({
      policy: soat.policy ?? policy,
    });

    result = {
      state: 200,
      message: 'Soat updated',
      data: [newSoat],
    };
    return result;
  }

  async deleteSoat(id: string) {
    const soat = await this.soatRepository.findOneBy({
      policy: id,
    });

    let result: DataDto;

    if (!soat) {
      result = {
        state: 404,
        message: 'Soat not found',
        data: [],
      };
      return result;
    }

    await this.soatRepository.delete(soat);

    result = {
      state: 200,
      message: 'Soat deleted',
      data: [soat],
    };
    return result;
  }
}
