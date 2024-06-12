import { Character } from '../../character/entities/character.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ideal } from './ideal.entity';
import { Peculiarity } from './peculiarity.entity';
import { Link } from './link.entity';
import { Defect } from './defect.entity';
import { Ability } from 'src/character/abilities/entities/ability.entity';

@Entity()
export class Background {
  @PrimaryGeneratedColumn()
  IdBackground: number;

  @Column('varchar', { unique: true })
  backgroundName: string;

  @Column('varchar', {
    length: 1000,
  })
  backgroundDesc: string;

  @Column('varchar', {
    length: 3000,
  })
  background: string;

  @ManyToOne(() => Ideal, (ideal) => ideal.background)
  ideal: Ideal[];

  @ManyToOne(() => Peculiarity, (pecualiarity) => pecualiarity.background)
  peculiarity: Peculiarity[];

  @ManyToOne(() => Link, (link) => link.background)
  link: Link[];

  @ManyToOne(() => Defect, (defect) => defect.background)
  defect: Defect[];

  @ManyToMany(() => Ability, (ability) => ability.background)
  @JoinTable({
    name: 'background_abilities',
    joinColumn: { name: 'idBackground' },
    inverseJoinColumn: { name: 'idAbility' },
  })
  ability: Ability[];

  @OneToMany(() => Character, (character) => character.background)
  character: Character;
}
