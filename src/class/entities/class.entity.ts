import { Archetype } from '../../archetype/entities/archetype.entity';
import { Character } from '../../character/entities/character.entity';
import { Spell } from '../../spell/entities/spell.entity';
import { Trait } from '../../trait/entities/trait.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  IdClass: number;

  @Column({ type: 'varchar', unique: true })
  descClass: string;

  @Column('boolean', {
    default: false,
  })
  isSpellCaster: boolean;

  @Column('int')
  lifeDice: number;

  @OneToMany(() => Archetype, (archetype) => archetype.class, {
    cascade: true,
  })
  archetype: Archetype[];

  @OneToMany(() => Trait, (trait) => trait.class)
  trait: Trait[];

  @OneToMany(() => Character, (character) => character.class)
  characters: Character[];

  @OneToMany(() => Spell, (spell) => spell.classSpell)
  spells: Spell[];
}
