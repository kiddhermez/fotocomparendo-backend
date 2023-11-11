import { Inject, Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { CreateTicketDto, Ticket, UpdateTicketDto } from './interfaces';
import {
  notFound,
  isFound,
  isCreated,
  isUpdated,
  isDeleted,
} from '../outStates/index';
import { useCreateTicket, useDeleteTicket } from './useTicket';
import { comunesList } from './data/comunesList';

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

  async getTicketByComune(comune: string) {
    const tickets = await this.db.queryGet(
      `SELECT * FROM ${comunesList[comune]}`,
    );

    if (!tickets) {
      return notFound<Ticket>('Ticket');
    }

    return isFound<Ticket>({
      data: tickets,
      length: tickets.length,
      name: 'Tickets',
    });
  }

  async createTicket(ticket: CreateTicketDto) {
    const { total } = await this.getTickets();

    const newTicket = useCreateTicket(ticket, total);

    await this.db.query('INSERT INTO infraccion SET ?', [newTicket]);

    return isCreated<Ticket>('Ticket');
  }

  async updateTicket(id: string, ticket: UpdateTicketDto) {
    const ticketExists = await this.db.queryGet(
      'SELECT * FROM infraccion WHERE cod_infraccion = ?',
      [id],
    );

    if (!ticketExists) {
      return notFound<Ticket>('Ticket');
    }

    ticket.letra = ticket.letra?.toUpperCase() ?? ticketExists[0].letra;
    await this.db.query('UPDATE infraccion SET ? WHERE cod_infraccion = ?', [
      ticket,
      id,
    ]);

    return isUpdated<Ticket>('Ticket');
  }

  async deleteTicket(id: string) {
    const ticketExists = await this.db.queryGet(
      'SELECT * FROM infraccion WHERE cod_infraccion = ?',
      [id],
    );

    if (!ticketExists) {
      return notFound<Ticket>('Ticket');
    }

    await this.db.query('DELETE FROM infraccion WHERE cod_infraccion = ?', [
      id,
    ]);

    const tickets = await this.getTickets();

    await useDeleteTicket(Number(id), tickets.total, this.db);

    return isDeleted<Ticket>('Ticket');
  }
}
