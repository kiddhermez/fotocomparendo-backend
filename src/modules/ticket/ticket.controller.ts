import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto } from './interfaces';

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

  @Get('comune/:comune')
  getTicketByComune(@Param('comune') comune: string) {
    return this.ticketService.getTicketByComune(comune);
  }

  @Post()
  createTicket(@Body() ticket: CreateTicketDto) {
    return this.ticketService.createTicket(ticket);
  }

  @Patch(':id')
  updateTicket(@Param('id') id: string, @Body() ticket: UpdateTicketDto) {
    return this.ticketService.updateTicket(id, ticket);
  }

  @Delete(':id')
  deleteTicket(@Param('id') id: string) {
    return this.ticketService.deleteTicket(id);
  }
}
