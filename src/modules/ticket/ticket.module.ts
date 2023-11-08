import { Module } from '@nestjs/common';

import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { ComuneController } from './submodules/comune/comune.controller';
import { ComuneService } from './submodules/comune/comune.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Comune } from './entities/comune.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Comune])],
  controllers: [TicketController, ComuneController],
  providers: [TicketService, ComuneService],
})
export class TicketModule {}
