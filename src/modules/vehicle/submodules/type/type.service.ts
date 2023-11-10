import { Inject, Injectable, Type } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { notFound, isFound } from 'src/outStates';

@Injectable()
export class TypeService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Type>,
  ) {}

  async getTypes() {
    const types = await this.db.queryGet('SELECT * FROM tipo_vehiculo');

    if (!types) {
      return notFound<Type>('Type');
    }

    return isFound<Type>({
      data: types,
      length: types.length,
      name: 'Types',
    });
  }
}
