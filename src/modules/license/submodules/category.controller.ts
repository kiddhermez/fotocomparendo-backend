import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('license/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return await this.categoryService.getCategories();
  }
}
