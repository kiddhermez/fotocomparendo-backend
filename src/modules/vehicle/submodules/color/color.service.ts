import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/modules/database/database.service';
import { Color } from '../../interfaces';
import { isFound, notFound } from 'src/outStates';

@Injectable()
export class ColorService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Color>,
  ) {}

  async getColors() {
    const colors = await this.db.queryGet(`SELECT * FROM color`);

    if (!colors) {
      return notFound<Color>('Color');
    }

    return isFound<Color>({
      data: colors,
      length: colors.length,
      name: 'Colors',
    });
  }
}
