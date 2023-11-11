import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { Category } from '../interfaces';
import { OutDto } from 'src/modules/out.dto';
import { isFound, notFound } from '../../outStates';

@Injectable()
export class CategoryService {
  private result: OutDto<Category>;

  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Category>,
  ) {}

  async getCategories() {
    const categories = await this.db.queryGet('SELECT * FROM ctg_licencia');

    if (!categories) {
      return notFound<Category>('Category');
    }

    return isFound<Category>({
      data: categories,
      length: categories.length,
      name: 'Categories',
    });
  }
}
