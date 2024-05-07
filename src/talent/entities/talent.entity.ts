import { Character } from 'src/character/entities/character.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Talent {
  @PrimaryGeneratedColumn()
  idTalent: number;

  @ManyToMany(() => Character, (character) => character.talents)
  character: Character;

  @Column('varchar', {
    unique: true,
  })
  nameTalent: string;

  @Column('varchar', {
    length: 1000,
  })
  descTalent: string;
}
