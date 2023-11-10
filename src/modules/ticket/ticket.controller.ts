import { Controller, Get, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  getTickets() {
    return this.ticketService.getTickets();
  }

  @Get('driver/:id')
  getTicketById(@Param('id') id: string) {
    return this.ticketService.getTicketById(id);
  }

  @Get('plate/:plate_letter/:plate_number')
  getTicketByPlate(
    @Param('plate_letter') plate_letter: string,
    @Param('plate_number') plate_number: string,
  ) {
    return this.ticketService.getTicketByPlate(
      plate_letter.toUpperCase(),
      plate_number,
    );
  }
}
