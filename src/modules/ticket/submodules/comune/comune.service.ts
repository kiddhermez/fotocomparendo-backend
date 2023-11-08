import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comune } from '../../entities/comune.entity';
import { Repository } from 'typeorm';
import { DataDto } from 'src/modules/data.dto';

@Injectable()
export class ComuneService {
  constructor(
    @InjectRepository(Comune)
    private readonly comuneRepository: Repository<Comune>,
  ) {}

  async getComunes() {
    const comunes = await this.comuneRepository.find();
    let result: DataDto;

    if (!comunes) {
      result = {
        state: 404,
        message: 'Comunes not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Comunes found',
      total: comunes.length,
      data: comunes,
    };
    return comunes;
  }
}
