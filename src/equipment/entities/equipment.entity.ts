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
import { Character } from 'src/character/entities/character.entity';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  IdEquipment: number;

  @Column('varchar', { unique: true })
  nameEquipment: string;

  @Column('varchar')
  descEquipment: string;

  @Column('varchar', {
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

  @ManyToMany(() => Tags, (tag) => tag.equipment)
  @JoinTable({
    name: 'equipment_tag',
    joinColumn: { name: 'IdEquipment' },
    inverseJoinColumn: { name: 'IdTag' },
  })
  tags: Tags[];

  @ManyToMany(() => Character, (character) => character.equipment)
  character: Character[];

  @Column('varchar', {
    nullable: true,
  })
  typeOfDamage: string;

  @Column('int')
  price: number;
}
