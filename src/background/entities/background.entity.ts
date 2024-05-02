import { Character } from 'src/character/entities/character.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'background' })
export class Background {
  @PrimaryGeneratedColumn()
  IdBackground: number;

  @Column('text')
  backgroundName: string;

  @Column('text')
  background: string;

  @OneToMany(() => Character, (character) => character.background)
  character: Character;
}
