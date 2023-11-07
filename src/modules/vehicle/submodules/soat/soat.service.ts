import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Soat } from '../../entities';

@Injectable()
export class SoatService {
  constructor(
    @InjectRepository(Soat)
    private readonly soatRepository: Repository<Soat>,
  ) {}
}
