import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Comune } from './comune.entity';
import { Vehicle } from 'src/modules/vehicle/entities';

@Entity()
export class Ticket {
  @Column({ primary: true, generated: 'increment', width: 11, zerofill: true })
  id: number;

  @Column()
  date: Date;

  @Column()
  price: number;

  @Column()
  velocity: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @ManyToOne(() => Comune, (comune) => comune.tickets, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'comune' })
  comune: Comune;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.tickets, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  vehicle: Vehicle;
}
