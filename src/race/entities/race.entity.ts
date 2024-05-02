import { Character } from 'src/character/entities/character.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Race {
  @PrimaryGeneratedColumn()
  idRace: number;

  @Column('text')
  race: string;

  @OneToMany(() => Character, (character) => character.race)
  character: Character;
}
