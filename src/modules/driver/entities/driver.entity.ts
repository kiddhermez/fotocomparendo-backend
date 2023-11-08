import { License } from 'src/modules/license/entities/license.entity';
import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Driver {
  @Column({ primary: true, length: 10 })
  id: string;

  @Column()
  first_name: string;

  @Column({ default: '' })
  first_name2: string;

  @Column()
  last_name: string;

  @Column({ default: '' })
  last_name2: string;

  @Column()
  born_date: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
  vehicles: Vehicle[];

  @OneToMany(() => License, (license) => license.driver)
  licenses: License[];
}
