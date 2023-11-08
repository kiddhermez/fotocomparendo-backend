import { Vehicle } from 'src/modules/vehicle/entities';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Techno {
  @Column({ primary: true, length: 15 })
  accreditation: string;

  @Column()
  Expedition: Date;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.techno, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  vehicle: Vehicle;
}
