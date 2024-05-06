import { Class } from 'src/class/entities/class.entity';
import { Trait } from 'src/trait/entities/trait.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Archetype {
  @PrimaryGeneratedColumn()
  IdArchetype: number;

  @Column('text')
  descArchetype: string;

  @ManyToOne(() => Class, (clas) => clas.IdClass)
  @JoinColumn({ name: 'IdClass' })
  class: Class;

  @OneToMany(() => Trait, (trait) => trait.archetype)
  trait: Trait[];
}
