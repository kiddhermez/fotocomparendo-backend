import { Column, Entity, OneToMany } from 'typeorm';
import { Vehicle } from './';

@Entity()
export class TypeVehicle {
  @Column({ primary: true, zerofill: true, type: 'int', width: 3 })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.type)
  vehicles: Vehicle[];
}
