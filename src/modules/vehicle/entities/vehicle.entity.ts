import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TypeVehicle } from './';
import { Color } from './colors.entity';

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

  @ManyToOne(() => Driver, (driver) => driver.vehicles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'driver' })
  driver: Driver;

  @ManyToOne(() => TypeVehicle, (type) => type.vehicles, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'type' })
  type: TypeVehicle;
}
