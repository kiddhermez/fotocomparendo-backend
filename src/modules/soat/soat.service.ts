import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Soat } from './entities';

@Injectable()
export class SoatService {
    constructor(private readonly soatRepository: Repository<Soat>) {}

    
}
