import { Equipment } from '../../equipment/entities/equipment.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  IdTagEquipment: number;

  @Column('varchar', { unique: true })
  descTagEquipment: string;

  @ManyToMany(() => Equipment, (equipment) => equipment.tags)
  equipment: Equipment[];
}
