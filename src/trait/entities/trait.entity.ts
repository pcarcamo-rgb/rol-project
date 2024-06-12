import { Archetype } from 'src/character/class/archetype/entities/archetype.entity';
import { Class } from 'src/character/class/entities/class.entity';
import { Race } from 'src/race/entities/race.entity';

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

  @Column('varchar', { unique: true })
  nameTrait: string;

  @Column('varchar')
  descTrait: string;

  @Column('int')
  level: number;

  @ManyToOne(() => Class, (clas) => clas.trait, {
    cascade: true,
    onUpdate: 'CASCADE',
    nullable: true,
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

  @ManyToOne(() => Race, (race) => race.trait, {
    nullable: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdRace' })
  race: Race;
}
