import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Vehicle } from './entities';
import { Repository } from 'typeorm';
import { CreateVehicleDto, UpdateVehicleDto } from './dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async getVehicles() {
    return await this.vehicleRepository.find({
      relations: ['type', 'driver', 'color'],
    });
  }

  async getVehicle(plate_letter: string, plate_number: string) {
    const vehicle = await this.vehicleRepository.find({
      relations: ['type', 'driver', 'color'],
      where: {
        plate_letter,
        plate_number,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async createVehicle(vehicle: CreateVehicleDto) {
    const existingVehicle = await this.vehicleRepository.findOne({
      where: {
        plate_letter: vehicle.plate_letter,
        plate_number: vehicle.plate_number,
      },
    });

    if (existingVehicle) {
      throw new HttpException(
        {
          error: 'Vehicle already exists',
        },
        400,
      );
    }

    vehicle.plate_letter = vehicle.plate_letter.toUpperCase();
    return await this.vehicleRepository.save(vehicle as Vehicle);
  }

  async updateVehicle(
    plate_letter: string,
    plate_number: string,
    vehicle: UpdateVehicleDto,
  ) {
    const isVehicle = this.getVehicle(plate_letter, plate_number);

    const existingVehicle =
      (vehicle.plate_number || vehicle.plate_letter) &&
      (vehicle.plate_number !== plate_number ||
        vehicle.plate_letter !== plate_letter) &&
      (await this.vehicleRepository.findOne({
        where: {
          plate_letter: vehicle.plate_letter,
          plate_number: vehicle.plate_number,
        },
      }));

    if (existingVehicle) {
      throw new HttpException(
        {
          error: 'Vehicle already exists',
        },
        400,
      );
    }

    vehicle.plate_letter = vehicle.plate_letter?.toUpperCase();
    const newVehicle = { ...isVehicle, ...vehicle };
    await this.vehicleRepository.update(
      { plate_letter, plate_number },
      vehicle as Vehicle,
    );

    return newVehicle;
  }

  async deleteVehicle(plate_letter: string, plate_number: string) {
    const vehicle = await this.getVehicle(plate_letter, plate_number);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    await this.vehicleRepository.delete(vehicle[0]);

    return vehicle;
  }
}
