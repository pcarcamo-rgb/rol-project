import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Equipment } from './equipment.entity';

@Entity()
export class TypeEquipment {
  @PrimaryGeneratedColumn()
  IdTypeEquipment: number;

  @Column('text')
  descTypeEquipment: string;

  @OneToMany(() => Equipment, (equipment) => equipment.typeEquipment)
  equipment: Equipment[];

  @Column('boolean', {
    nullable: true,
    default: false,
  })
  isArmor: boolean;

  @Column('boolean', {
    nullable: true,
    default: false,
  })
  isWeapon: boolean;
}
