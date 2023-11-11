import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { notFound, isFound } from '../../outStates';
import { Comune } from '../interfaces/comune';

@Injectable()
export class ComuneService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Comune>,
  ) {}

  async getComunes() {
    const comunes = await this.db.queryGet('SELECT * FROM comuna');

    if (!comunes) {
      return notFound<Comune>('Comune');
    }

    return isFound<Comune>({
      data: comunes,
      length: comunes.length,
      name: 'Comunes',
    });
  }
}
