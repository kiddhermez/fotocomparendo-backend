import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { TypeVehicle, Color, Soat } from './';

@Entity()
export class Vehicle {
  @Column({ primary: true, length: 3 })
  plate_number: string;

  @Column({ primary: true, length: 3 })
  plate_letter: string;

  @Column()
  line: string;

  @Column()
  company: string;

  @ManyToOne(() => Color, (color) => color.vehicles, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'color' })
  color: Color;

  @ManyToOne(() => TypeVehicle, (type) => type.vehicles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'type' })
  type: TypeVehicle;

  @OneToOne(() => Soat, (soat) => soat.vehicle, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'soat' })
  soat: Soat;

  @ManyToOne(() => Driver, (driver) => driver.vehicles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'driver' })
  driver: Driver;
}
