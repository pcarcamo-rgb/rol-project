import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  IdTagEquipment: number;

  @Column('text')
  descTagEquipment: string;

  @ManyToMany(() => Equipment, (equipment) => equipment.tags)
  equipment: Equipment[];
}
