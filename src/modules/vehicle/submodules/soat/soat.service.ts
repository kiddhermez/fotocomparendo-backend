import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/modules/database/database.service';
import { Soat } from '../../interfaces';
import { notFound, isFound } from 'src/outStates';

@Injectable()
export class SoatService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Soat>,
  ) {}

  async getSoats() {
    const soats = await this.db.queryGet(`SELECT * FROM soat`);

    if (!soats) {
      return notFound<Soat>('Soat');
    }

    return isFound<Soat>({
      data: soats,
      length: soats.length,
      name: 'Soats',
    });
  }
}
