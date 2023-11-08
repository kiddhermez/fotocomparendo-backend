import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Techno } from './entities/techno.entity';
import { Repository } from 'typeorm';
import { DataDto } from '../data.dto';

@Injectable()
export class TechnoService {
  constructor(
    @InjectRepository(Techno)
    private readonly technoRepository: Repository<Techno>,
  ) {}

  async getTechnos() {
    const technos = await this.technoRepository.find();
    let result: DataDto;

    if (!technos) {
      result = {
        state: 404,
        message: 'Technos not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Technos found',
      total: technos.length,
      data: technos,
    };
    return result;
  }

  async createTechno(accreditation: string) {
    const existTechno = await this.technoRepository.findOneBy({
      accreditation,
    });
    let result: DataDto;

    if (existTechno) {
      result = {
        state: 409,
        message: 'Techno already exists',
        data: [],
      };
      return result;
    }

    const newTechno = await this.technoRepository.save({ accreditation });
    result = {
      state: 201,
      message: 'Techno created',
      data: [newTechno],
    };
    return result;
  }

  async updateTechno(accreditation: string, techno: Techno) {
    const existTechno = await this.technoRepository.findOneBy({
      accreditation,
    });
    let result: DataDto;

    if (!existTechno) {
      result = {
        state: 404,
        message: 'Techno not found',
        data: [],
      };
      return result;
    }

    const existNewTechno = await this.technoRepository.findOneBy({
      accreditation: techno.accreditation ?? accreditation,
    });

    if (
      existNewTechno &&
      JSON.stringify(existTechno) !== JSON.stringify(existNewTechno)
    ) {
      result = {
        state: 409,
        message: 'Techno already exists',
        data: [],
      };
      return result;
    }

    await this.technoRepository.update(accreditation, techno);
    const updatedTechno = await this.technoRepository.findOneBy({
      accreditation,
    });
    result = {
      state: 200,
      message: 'Techno updated',
      data: [updatedTechno],
    };
    return result;
  }

  async deleteTechno(accreditation: string) {
    const techno = await this.technoRepository.findOneBy({
      accreditation,
    });
    let result: DataDto;

    if (!techno) {
      result = {
        state: 404,
        message: 'Techno not found',
        data: [],
      };
      return result;
    }

    await this.technoRepository.delete(techno);
    result = {
      state: 200,
      message: 'Techno deleted',
      data: [techno],
    };
    return result;
  }
}
