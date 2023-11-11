import { DatabaseService } from '../database/database.service';
import { CreateTicketDto, Ticket } from './interfaces';

export function useCreateTicket(ticket: CreateTicketDto, length: number) {
  ticket.letra = ticket.letra.toUpperCase();
  return {
    ...ticket,
    cod_infraccion: `${length + 1}`.padStart(8, '0'),
  };
}

export async function useDeleteTicket(
  id: number,
  length: number,
  db: DatabaseService<Ticket>,
) {
  for (let i = id; i <= length; i += 1) {
    await db.query(
      'UPDATE infraccion SET cod_infraccion = ? WHERE cod_infraccion = ?',
      [`${i}`.padStart(8, '0'), `${i + 1}`.padStart(8, '0')],
    );
  }
}
