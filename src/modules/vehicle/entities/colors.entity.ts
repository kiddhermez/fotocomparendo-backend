import { Column, Entity, OneToMany } from 'typeorm';
import { Vehicle } from './';

@Entity()
export class Color {
  @Column({ primary: true, zerofill: true, type: 'int', width: 2 })
  id: number;

  @Column()
  color: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.color)
  vehicles: Vehicle[];
}
