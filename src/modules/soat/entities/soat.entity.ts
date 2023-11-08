import { Vehicle } from 'src/modules/vehicle/entities';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Soat {
  @Column({ primary: true, length: 17 })
  policy: string;

  @Column()
  vigency: Date;

  @Column({ type: 'int' })
  price: number;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.soat, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  vehicle: Vehicle;
}
