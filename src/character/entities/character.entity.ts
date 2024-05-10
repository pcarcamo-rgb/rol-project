import { Background } from 'src/background/entities/background.entity';
import { Race } from 'src/race/entities/race.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterAbilities } from './character-abilities.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Class } from 'src/class/entities/class.entity';
import { Talent } from 'src/talent/entities/talent.entity';
import { Archetype } from 'src/archetype/entities/archetype.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  idCharacter: number;

  @Column('varchar')
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
    {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  abilities: CharacterAbilities[];

  @ManyToMany(() => Equipment, (equipment) => equipment.character, {
    cascade: true,
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'character_equipment',
    joinColumn: { name: 'IdCharacter' },
    inverseJoinColumn: { name: 'IdEquipment' },
  })
  equipment: Equipment[];

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'IdClass' })
  class: Class;

  @ManyToOne(() => Archetype, (archetype) => archetype.character, {
    nullable: true,
  })
  @JoinColumn({ name: 'idArchetype' })
  archetype: Archetype;

  @ManyToMany(() => Talent, (talent) => talent.character, {
    cascade: true,
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'character_talent',
    joinColumn: { name: 'IdCharacter' },
    inverseJoinColumn: { name: 'IdTalent' },
  })
  talent: Talent[];

  @ManyToOne(() => Background)
  @JoinColumn({ name: 'idBackground' })
  background: Background;

  @ManyToOne(() => Race)
  @JoinColumn({ name: 'idRace' })
  race: Race;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'idUser' })
  user: User;
}
