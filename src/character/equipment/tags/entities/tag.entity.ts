import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Equipment } from '../../entities/equipment.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  IdTagEquipment: number;

  @Column('varchar', { unique: true })
  descTagEquipment: string;

  @ManyToMany(() => Equipment, (equipment) => equipment.tags)
  equipment: Equipment[];
}
