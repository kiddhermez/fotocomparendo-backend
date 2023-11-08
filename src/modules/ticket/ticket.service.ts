import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { DataDto } from '../data.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async getTickets() {
    const tickets = await this.ticketRepository.find({ relations: ['comune'] });
    let result: DataDto;

    if (!tickets) {
      result = {
        state: 404,
        message: 'Tickets not found',
        data: [],
      };
      return result;
    }

    result = {
      state: 200,
      message: 'Tickets found',
      total: tickets.length,
      data: tickets,
    };
    return result;
  }

  async getTicket(id: number) {}
}
