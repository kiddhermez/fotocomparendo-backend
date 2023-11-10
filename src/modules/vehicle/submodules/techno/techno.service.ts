import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { Techno } from '../../interfaces';
import { notFound, isFound } from 'src/outStates';

@Injectable()
export class TechnoService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Techno>,
  ) {}

  async getTechnos() {
    const technos = await this.db.queryGet(`SELECT * FROM tecno_mecanica`);

    if (!technos) {
      return notFound<Techno>('Techno');
    }

    return isFound<Techno>({
      data: technos,
      length: technos.length,
      name: 'Technos',
    });
  }
}
