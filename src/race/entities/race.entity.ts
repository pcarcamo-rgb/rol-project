import { Trait } from 'src/trait/entities/trait.entity';
import { Character } from '../../character/entities/character.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Race {
  @PrimaryGeneratedColumn()
  idRace: number;

  @Column('varchar', { unique: true })
  race: string;

  @Column('varchar')
  descRace: string;

  @OneToMany(() => Character, (character) => character.race)
  character: Character;

  @OneToMany(() => Trait, (trait) => trait.race)
  trait: Trait[];
}
