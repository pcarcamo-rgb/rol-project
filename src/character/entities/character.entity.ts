import { Background } from 'src/background/entities/background.entity';
import { Race } from 'src/race/entities/race.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  idCharacter: number;

  @ManyToOne(() => Background)
  @JoinColumn({ name: 'idBackground' })
  background: Background;

  @ManyToOne(() => Race)
  @JoinColumn({ name: 'idRace' })
  race: Race;

  @Column('text')
  name: string;

  @Column('int', {
    default: 1,
  })
  level: number;

  @Column('int', {
    default: 10,
  })
  strength: number;

  @Column('int', {
    default: 10,
  })
  dexterity: number;

  @Column('int', {
    default: 10,
  })
  constitution: number;

  @Column('int', {
    default: 10,
  })
  intelligence: number;

  @Column('int', {
    default: 10,
  })
  wisdom: number;

  @Column('int', {
    default: 10,
  })
  charisma: number;
}
