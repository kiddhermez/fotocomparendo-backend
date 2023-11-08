import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Vehicle } from './entities';
import { Repository } from 'typeorm';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';
import { DataDto } from '../data.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async getVehicles() {
    const vehicles = await this.vehicleRepository.find({
      relations: ['type', 'color'],
    });
    let result: DataDto;

    if (!vehicles) {
      result = {
        state: 404,
        message: 'Vehicles not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Vehicles found',
      total: vehicles.length,
      data: vehicles,
    };
    return result;
  }

  async getVehicle(driver: string) {
    const vehicle = await this.vehicleRepository.find({
      where: {
        driver: { id: driver },
      },
      relations: ['type', 'color'],
    });

    let result: DataDto;

    if (!vehicle) {
      result = {
        state: 404,
        message: 'Vehicle not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Vehicle found',
      data: vehicle,
    };
    return result;
  }

  async createVehicle(vehicle: CreateVehicleDto) {
    const existingVehicle = await this.vehicleRepository.findOneBy({
      plate_letter: vehicle.plate_letter,
      plate_number: vehicle.plate_number,
    });

    let result: DataDto;

    if (existingVehicle) {
      result = {
        state: 409,
        message: 'Vehicle already exists',
        data: [],
      };
      return result;
    }

    vehicle.plate_letter = vehicle.plate_letter.toUpperCase();
    await this.vehicleRepository.save(vehicle as Vehicle);
    const newVehicle = await this.vehicleRepository.findOne({
      where: {
        plate_letter: vehicle.plate_letter,
        plate_number: vehicle.plate_number,
      },
      relations: ['type', 'color', 'driver'],
    });

    result = {
      state: 201,
      message: 'Vehicle created',
      data: [newVehicle],
    };
    return result;
  }

  async updateVehicle(
    plate_letter: string,
    plate_number: string,
    vehicle: UpdateVehicleDto,
  ) {
    const existVehicle = await this.vehicleRepository.findOneBy({
      plate_letter,
      plate_number,
    });

    let result: DataDto;

    if (!existVehicle) {
      result = {
        state: 404,
        message: 'Vehicle not found',
        data: [],
      };
      return result;
    }

    const existNewVehicle = await this.vehicleRepository.findOneBy({
      plate_letter: vehicle.plate_letter ?? plate_letter,
      plate_number: vehicle.plate_number ?? plate_number,
    });

    if (
      existNewVehicle &&
      JSON.stringify(existVehicle) !== JSON.stringify(existNewVehicle)
    ) {
      result = {
        state: 409,
        message: 'Vehicle already exists',
        data: [],
      };
      return result;
    }

    vehicle.plate_letter = vehicle.plate_letter?.toUpperCase();
    await this.vehicleRepository.update(
      { plate_letter, plate_number },
      vehicle as Vehicle,
    );

    const updatedVehicle = await this.vehicleRepository.findOne({
      where: {
        plate_letter: vehicle.plate_letter ?? plate_letter,
        plate_number: vehicle.plate_number ?? plate_number,
      },
      relations: ['type', 'color', 'driver'],
    });

    result = {
      state: 200,
      message: 'Vehicle updated',
      data: [updatedVehicle],
    };
    return result;
  }

  async deleteVehicle(plate_letter: string, plate_number: string) {
    const vehicle = await this.vehicleRepository.findOneBy({
      plate_letter,
      plate_number,
    });

    let result: DataDto;

    if (!vehicle) {
      result = {
        state: 404,
        message: 'Vehicle not found',
        data: [],
      };
      return result;
    }

    await this.vehicleRepository.delete(vehicle);
    result = {
      state: 200,
      message: 'Vehicle deleted',
      data: [vehicle],
    };
    return result;
  }
}
