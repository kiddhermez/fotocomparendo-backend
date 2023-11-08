/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  getTickets() {
    return this.ticketService.getTickets();
  }

  @Get('/driver/:id')
  getTicket(id: string) {
    return this.ticketService.getTicket(id);
  }
}
