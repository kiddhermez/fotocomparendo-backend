import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { Vehicle } from './interfaces';
import { isFound, notFound } from 'src/outStates';
import { VehicleDto, useVehicle } from './hooks/useVehicle';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Vehicle>,
  ) {}

  async getVehicles() {
    const vehicles = await this.db.queryGet(
      `SELECT CONCAT(vehiculo.letra, "-", vehiculo.numero) AS placa,
      linea, marca, id_color, codigo, nro_poliza, nro_acreditacion
      FROM vehiculo`,
    );

    if (!vehicles) {
      return notFound<Vehicle>('Vehicle');
    }

    return isFound<Vehicle>({
      data: vehicles,
      length: vehicles.length,
      name: 'Vehicles',
    });
  }

  async getVehicleById(id: string) {
    const vehicle = await this.db.queryCall<VehicleDto>(
      'CALL BuscarVehiculoCC(?)',
      [id],
    );

    if (vehicle.length === 0) {
      return notFound<Vehicle>('Vehicle');
    }

    const { formatedData, length } = useVehicle(vehicle);

    return isFound<Vehicle>({
      data: formatedData,
      length: length,
      name: 'Vehicle',
    });
  }

  async getVehicleByPlate(plate_letter: string, plate_number: string) {
    const vehicle = await this.db.queryCall<VehicleDto>(
      'CALL BuscarVehiculoPL(?,?)',
      [plate_letter, plate_number],
    );

    if (vehicle.length === 0) {
      return notFound<Vehicle>('Vehicle');
    }

    const { formatedData, length } = useVehicle(vehicle);

    return isFound<Vehicle>({
      data: formatedData,
      length: length,
      name: 'Vehicle',
    });
  }
}
