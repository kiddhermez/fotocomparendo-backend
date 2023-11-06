import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Color } from './entities';
import { colors } from './data/colors';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {
    colorRepository.save(colors);
  }

  async getColors() {
    return await this.colorRepository.find();
  }

  async getColor(id: number) {
    const color = await this.colorRepository.findOneBy({ id });

    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return color;
  }
}
