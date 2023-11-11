import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { CreateTechnoDto, Techno, UpdateTechnoDto } from '../../interfaces';
import {
  notFound,
  isFound,
  isConflict,
  isCreated,
  isUpdated,
  isDeleted,
} from 'src/outStates';
import { useCreateTechno, useUpdateTechno } from './useTechno';

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

  async createTechno(techno: CreateTechnoDto) {
    const technoExists = await this.db.queryGet(
      'SELECT * FROM tecno_mecanica WHERE nro_acreditacion = ?',
      [techno.nro_acreditacion],
    );

    if (technoExists) {
      return isConflict<Techno>('Tecnomecanica');
    }

    const newTechno = useCreateTechno(techno);
    await this.db.query('INSERT INTO tecno_mecanica SET ?', [newTechno]);
    return isCreated<Techno>('Tecnomecanica');
  }

  async updateTechno(id: string, techno: UpdateTechnoDto) {
    const technoExists = await this.db.query(
      'SELECT * FROM tecno_mecanica WHERE nro_acreditacion = ?',
      [id],
    );

    if (!technoExists) {
      return notFound<Techno>('Tecnomecanica');
    }

    const newTechnoExists = await this.db.queryGet(
      'SELECT * FROM tecno_mecanica WHERE nro_acreditacion = ?',
      [techno.nro_acreditacion ?? id],
    );

    if (newTechnoExists && newTechnoExists[0].nro_acreditacion !== id) {
      return isConflict('Tecnomecanica');
    }

    const updatedSoat = useUpdateTechno(techno);

    await this.db.query(
      'UPDATE tecno_mecanica SET ? WHERE nro_acreditacion = ?',
      [updatedSoat, id],
    );
    return isUpdated<Techno>('Tecnomecanica');
  }

  async deleteTechno(id: string) {
    const technoExists = await this.db.queryGet(
      'SELECT * FROM tecno_mecanica WHERE nro_acreditacion = ?',
      [id],
    );

    if (!technoExists) {
      return notFound<Techno>('Tecnomecanica');
    }

    await this.db.query(
      'DELETE FROM tecno_mecanica WHERE nro_acreditacion = ?',
      [id],
    );
    return isDeleted<Techno>('Tecnomecanica');
  }
}
