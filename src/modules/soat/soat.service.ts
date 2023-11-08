import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Soat } from './entities/soat.entity';

@Injectable()
export class SoatService {
  constructor(
    @InjectRepository(Soat)
    private readonly soatRepository: Repository<Soat>,
  ) {}

  async getSoats() {
    return await this.soatRepository.find();
  }

  async getSoat(id: string) {
    const soat = await this.soatRepository.findOneBy({
      vehicle: { driver: { id: id } },
    });

    if (!soat) {
      throw new NotFoundException('Soat not found');
    }

    return soat;
  }

  async createSoat(soat: Soat) {
    const existSoat = this.soatRepository.findOneBy({
      policy: soat.policy,
    });

    if (existSoat) {
      throw new HttpException('Soat already exists', 400);
    }

    return await this.soatRepository.save(soat);
  }

  async updateSoat(id: string, soat: Soat) {
    const existSoat = await this.soatRepository.findOneBy({ policy: id });

    if (!existSoat) {
      throw new NotFoundException('Soat not found');
    }

    const existNewSoat =
      soat.policy !== id &&
      (await this.soatRepository.findOneBy({
        policy: soat.policy,
      }));

    if (existNewSoat) {
      throw new HttpException('Soat already exists', 400);
    }

    return await this.soatRepository.update(id, soat);
  }
}
