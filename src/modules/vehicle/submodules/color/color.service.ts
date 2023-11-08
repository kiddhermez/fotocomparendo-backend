import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Color } from '../../entities';
import { DataDto } from 'src/modules/data.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async getColors() {
    const colors = await this.colorRepository.find();
    let result: DataDto;

    if (!colors) {
      result = {
        state: 404,
        message: 'Colors not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Colors found',
      total: colors.length,
      data: colors,
    };
    return result;
  }
}
