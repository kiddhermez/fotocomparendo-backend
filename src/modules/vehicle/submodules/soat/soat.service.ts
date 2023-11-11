import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/modules/database/database.service';
import { CreateSoatDto, Soat, UpdateSoatDto } from '../../interfaces';
import {
  notFound,
  isFound,
  isConflict,
  isCreated,
  isUpdated,
  isDeleted,
} from 'src/outStates';
import { useCreateSoat, useUpdateSoat } from './useSoat';

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

  async createSoat(soat: CreateSoatDto) {
    const soatExists = await this.db.queryGet(
      'SELECT * FROM soat WHERE nro_poliza = ?',
      [soat.nro_poliza],
    );

    if (soatExists) {
      return isConflict<Soat>('Soat');
    }

    const newSoat = useCreateSoat(soat);
    await this.db.query('INSERT INTO soat SET ?', [newSoat]);
    return isCreated<Soat>('Soat');
  }

  async updateSoat(id: string, soat: UpdateSoatDto) {
    const soatExists = await this.db.queryGet(
      'SELECT * FROM soat WHERE nro_poliza = ?',
      [id],
    );

    if (!soatExists) {
      return notFound<Soat>('Soat');
    }

    const newSoatExists = await this.db.queryGet(
      'SELECT * FROM soat WHERE nro_poliza = ?',
      [soat.nro_poliza ?? id],
    );

    if (newSoatExists && newSoatExists[0].nro_poliza !== id) {
      return isConflict<Soat>('Soat');
    }

    const updatedSoat = useUpdateSoat(soat);

    await this.db.query('UPDATE soat SET ? WHERE nro_poliza = ?', [
      updatedSoat,
      id,
    ]);
    return isUpdated<Soat>('Soat');
  }

  async deleteSoat(id: string) {
    const soatExists = await this.db.queryGet(
      'SELECT * FROM soat WHERE nro_poliza = ?',
      [id],
    );

    if (!soatExists) {
      return notFound<Soat>('Soat');
    }

    await this.db.query('DELETE FROM soat WHERE nro_poliza = ?', [id]);
    return isDeleted<Soat>('Soat');
  }
}
