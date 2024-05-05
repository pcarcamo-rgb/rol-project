import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeEquipment } from './equipment-type.entity';
import { Tags } from 'src/tags/entities/tag.entity';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  IdEquipment: number;

  @Column('text')
  nameEquipment: string;

  @Column('text')
  descEquipment: string;

  @Column('text', {
    nullable: true,
  })
  damageEquipment: string;

  @Column('int', {
    nullable: true,
  })
  armorEquipment: number;

  @ManyToOne(() => TypeEquipment, (typeEquipment) => typeEquipment.equipment)
  @JoinColumn({ name: 'idTypeEquipment' })
  typeEquipment: TypeEquipment;

  @ManyToMany(() => Tags, (tag) => tag.equipment, { cascade: true })
  @JoinTable()
  tags: Tags[];

  @Column('text', {
    nullable: true,
  })
  typeOfDamage: string;

  @Column('int')
  price: number;
}
