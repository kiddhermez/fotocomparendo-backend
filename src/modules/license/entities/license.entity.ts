import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class License {
  @Column({ primary: true, length: 15 })
  Code: string;

  @Column()
  Expedition: Date;

  @Column()
  Expire: Date;

  @ManyToOne(() => Driver, (driver) => driver.licenses, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'Driver' })
  driver: Driver;

  @OneToMany(() => Category, (category) => category.license)
  categories: Category[];
}
