import { CharacterAbilities } from 'src/character/entities/character-abilities.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ability {
  @PrimaryGeneratedColumn()
  idAbility: number;

  @Column('text')
  abilityDesc: string;

  @Column('text')
  caracteristic: string;

  @OneToMany(
    () => CharacterAbilities,
    (characterAbility) => characterAbility.ability,
  )
  characterAbilities: CharacterAbilities[];
}
