import { Class } from 'src/character/class/entities/class.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Spell {
  @PrimaryGeneratedColumn()
  idSpeel: number;

  @ManyToOne(() => Class, (clas) => clas.spells)
  @JoinColumn({ name: 'idClass' })
  classSpell: Class;

  @Column('varchar', {
    unique: true,
  })
  nameSpell: string;

  @Column('varchar', {})
  typeSpell: string;

  @Column('int')
  levelSpell: number;

  @Column('varchar')
  castTime: 'action' | 'reaction' | 'additional action';

  @Column('varchar', {
    nullable: true,
  })
  componentsSpell?: string;

  @Column('int')
  range: number;

  @Column('varchar', {
    nullable: true,
  })
  savingTrhow:
    | 'strength'
    | 'dexterity'
    | 'constitution'
    | 'intelligence'
    | 'wisdom'
    | 'charisma';

  @Column('varchar', {
    nullable: true,
  })
  dmgSpell?: string;

  @Column('varchar', {
    length: 800,
  })
  descSpell: string;

  @Column('varchar', {
    length: 800,
  })
  atHigherLevels: string;
}
