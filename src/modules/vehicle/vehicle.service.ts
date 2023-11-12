import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { CreateVehicleDto, UpdateVehicleDto, Vehicle } from './interfaces';
import {
  isConflict,
  isCreated,
  isDeleted,
  isFound,
  isUpdated,
  notFound,
} from '../outStates';
import { VehicleDto, useCreateVehicle, useVehicle } from './useVehicle';
import { SoatService } from './submodules/soat/soat.service';
import { TechnoService } from './submodules/techno/techno.service';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Vehicle>,
    @Inject(SoatService) private readonly soatService: SoatService,
    @Inject(TechnoService) private readonly technoService: TechnoService,
  ) {}

  async getVehicles() {
    const vehicles = await this.db.queryGet(
      `SELECT CONCAT(vehiculo.letra, "-", vehiculo.numero) AS placa,
      linea, marca, id_color, codigo, nro_poliza, nro_acreditacion, cedula
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

  async createVehicle(vehicle: CreateVehicleDto) {
    const vehicleExists = await this.db.queryGet(
      'SELECT * FROM vehiculo WHERE numero = ? AND letra = ?',
      [vehicle.numero, vehicle.letra.toUpperCase()],
    );

    if (vehicleExists) {
      return isConflict<Vehicle>('Vehicle');
    }

    const { newSoat, newTechno, newVehicle } = useCreateVehicle(vehicle);

    const createSoat = await this.soatService.createSoat(newSoat);

    if (createSoat.state !== 201) {
      return createSoat;
    }

    const createTechno = await this.technoService.createTechno(newTechno);

    if (createTechno.state !== 201) {
      this.soatService.deleteSoat(newSoat.nro_poliza);
      return createTechno;
    }

    vehicle.letra = vehicle.letra.toUpperCase();
    await this.db.query('INSERT INTO vehiculo SET ?', [newVehicle]);
    return isCreated<Vehicle>('Vehicle');
  }

  async updateVehicle(
    plate_letter: string,
    plate_number: string,
    vehicle: UpdateVehicleDto,
  ) {
    const vehicleExists = await this.db.queryGet(
      'SELECT * FROM vehiculo WHERE numero = ? AND letra = ?',
      [plate_number, plate_letter],
    );

    if (!vehicleExists) {
      return notFound<Vehicle>('Vehicle');
    }

    const newVehicleExists = await this.db.queryGet(
      'SELECT * FROM vehiculo WHERE numero = ? AND letra = ?',
      [
        vehicle.numero ?? plate_number,
        vehicle.letra?.toUpperCase() ?? plate_letter,
      ],
    );

    if (
      newVehicleExists &&
      (newVehicleExists[0].numero !== plate_number ||
        newVehicleExists[0].letra.toUpperCase() !== plate_letter)
    ) {
      return isConflict<Vehicle>('Vehicle');
    }

    vehicle.letra = vehicle.letra?.toUpperCase() ?? plate_letter;

    await this.db.query(
      'UPDATE vehiculo SET ? WHERE numero = ? AND letra = ?',
      [vehicle, plate_number, plate_letter],
    );
    return isUpdated<Vehicle>('Vehicle');
  }

  async deleteVehicle(plate_letter: string, plate_number: string) {
    const vehicleExists = await this.db.queryGet(
      'SELECT * FROM vehiculo WHERE numero = ? AND letra = ?',
      [plate_number, plate_letter],
    );

    if (!vehicleExists) {
      return notFound<Vehicle>('Vehicle');
    }

    const soatId = vehicleExists[0].nro_poliza;
    const technoId = vehicleExists[0].nro_acreditacion;

    await this.db.query('DELETE FROM vehiculo WHERE numero = ? AND letra = ?', [
      plate_number,
      plate_letter,
    ]);

    await this.soatService.deleteSoat(soatId);
    await this.technoService.deleteTechno(technoId);

    return isDeleted<Vehicle>('Vehicle');
  }
}
