import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { Ticket } from './interfaces';
import { notFound, isFound } from 'src/outStates';

@Injectable()
export class TicketService {
  constructor(
    @Inject(DatabaseService) private readonly db: DatabaseService<Ticket>,
  ) {}

  async getTickets() {
    const tickets = await this.db.queryGet('SELECT * FROM infraccion');

    if (!tickets) {
      return notFound<Ticket>('Ticket');
    }

    return isFound<Ticket>({
      data: tickets,
      length: tickets.length,
      name: 'Tickets',
    });
  }

  async getTicketById(id: string) {
    const ticket = await this.db.queryCall<Ticket>(
      'CALL BuscarInfraccionCC(?)',
      [id],
    );

    if (ticket.length === 0) {
      return notFound<Ticket>('Ticket');
    }

    return isFound<Ticket>({
      data: ticket,
      length: ticket.length,
      name: 'Ticket',
    });
  }

  async getTicketByPlate(plate_letter: string, plate_number: string) {
    const ticket = await this.db.queryCall<Ticket>(
      'CALL BuscarInfraccionPL(?,?)',
      [plate_letter, plate_number],
    );

    if (ticket.length === 0) {
      return notFound<Ticket>('Ticket');
    }

    return isFound<Ticket>({
      data: ticket,
      length: ticket.length,
      name: 'Ticket',
    });
  }
}
