import { Archetype } from 'src/archetype/entities/archetype.entity';
import { Class } from 'src/class/entities/class.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Trait {
  @PrimaryGeneratedColumn()
  IdTrait: number;

  @Column('text')
  descTrait: string;

  @Column('int')
  level: number;

  @ManyToOne(() => Class, (clas) => clas.trait, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdClass' })
  class: Class;

  @ManyToOne(() => Archetype, (archetype) => archetype.trait, {
    nullable: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdArchetype' })
  archetype: Archetype;
}