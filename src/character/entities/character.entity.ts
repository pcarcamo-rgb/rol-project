import { Background } from 'src/background/entities/background.entity';
import { Race } from 'src/race/entities/race.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterAbilities } from './character-abilities.entity';

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

  @Column('int', {
    default: 2,
  })
  proficiencyBonus: number;

  @OneToMany(
    () => CharacterAbilities,
    (characterAbility) => characterAbility.character,
  )
  abilities: CharacterAbilities[];
}
