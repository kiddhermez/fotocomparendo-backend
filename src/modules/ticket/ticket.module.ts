import { Module } from '@nestjs/common';

import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { DatabaseModule } from '../database/database.module';
import { ComuneController } from './submodules/comune.controller';
import { ComuneService } from './submodules/comune.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketController, ComuneController],
  providers: [TicketService, ComuneService],
})
export class TicketModule {}
