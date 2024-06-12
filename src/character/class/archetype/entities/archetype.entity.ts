import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from '../../entities/class.entity';
import { Character } from 'src/character/entities/character.entity';
import { Trait } from 'src/trait/entities/trait.entity';

@Entity()
export class Archetype {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn()
  IdArchetype: number;

  @ApiProperty({
    example: 'Rune Warrior',
    description: 'The name of the archetype',
  })
  @Column('varchar', { unique: true })
  nameArchetype: string;

  @ApiProperty({
    example: 'Warrior who uses runes to fight evil',
  })
  @Column('varchar')
  descArchetype: string;

  @ApiProperty({
    type: () => Class,
    example: 1,
    description: 'The ID of the class to which the archetype belongs',
  })
  @ManyToOne(() => Class, (clas) => clas.IdClass)
  @JoinColumn({ name: 'IdClass' })
  class: Class;

  @ApiProperty()
  @OneToMany(() => Character, (character) => character.archetype)
  character: Character;

  @ApiProperty()
  @OneToMany(() => Trait, (trait) => trait.archetype)
  trait: Trait[];
}
