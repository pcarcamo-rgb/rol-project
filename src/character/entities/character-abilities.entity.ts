import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { Ability } from 'src/abilities/entities/ability.entity';

@Entity()
export class CharacterAbilities {
  @PrimaryGeneratedColumn()
  idCharacterAbility: number;

  @ManyToOne(() => Character, (character) => character.abilities, {
    onDelete: 'CASCADE',
  })
  character: Character;

  @ManyToOne(() => Ability, (ability) => ability.characterAbilities)
  ability: Ability;
}