import { Column, Entity, ManyToOne } from 'typeorm';
import { License } from './license.entity';

@Entity()
export class Category {
  @Column({ primary: true, width: 2, zerofill: true })
  code: number;

  @Column()
  class: string;

  @ManyToOne(() => License, (license) => license.categories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  license: License;
}
