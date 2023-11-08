import { Column, Entity, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Comune {
  @Column({ primary: true, width: 2, zerofill: true })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Ticket, (ticket) => ticket.comune)
  tickets: Ticket[];
}
