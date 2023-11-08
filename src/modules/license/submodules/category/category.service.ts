import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from '../../entities/category.entity';
import { DataDto } from 'src/modules/data.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories() {
    const categories = await this.categoryRepository.find();
    let result: DataDto;

    if (!categories) {
      result = {
        state: 404,
        message: 'Categories not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Categories found',
      total: categories.length,
      data: categories,
    };

    return result;
  }
}
