import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { OutDto } from '../out.dto';

@Injectable()
export class DriverService {
  constructor(@Inject(DatabaseService) private readonly db: DatabaseService) {}

  async getDrivers() {
    const drivers = await this.db.query(`SELECT * FROM driver`);
    let result: OutDto;
    if (!drivers) {
      result = {
        state: 404,
        message: 'Drivers not found',
        data: [],
      };
    } else {
      result = {
        state: 200,
        message: 'Drivers found',
        total: drivers.rowCount,
        data: drivers.rows,
      };
    }
    return result;
  }
}
