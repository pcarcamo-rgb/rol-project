import { ApiProperty } from '@nestjs/swagger';
import { Background } from 'src/background/entities/background.entity';
import { CharacterAbilities } from 'src/character/entities/character-abilities.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ability {
  @ApiProperty({ description: 'Id Ability' })
  @PrimaryGeneratedColumn()
  idAbility: number;

  @ApiProperty({
    description: 'Name for the ability.',
    example: 'Atletism',
    uniqueItems: true,
  })
  @Column('varchar', { unique: true })
  abilityDesc: string;

  @ApiProperty({
    description: 'Characteristic associated with the ability.',
    example: 'strength',
  })
  @Column('varchar')
  caracteristic: string;

  @ManyToMany(() => Background, (background) => background.ability)
  background: Background[];

  @ApiProperty({ type: () => [CharacterAbilities] })
  @OneToMany(
    () => CharacterAbilities,
    (characterAbility) => characterAbility.ability,
  )
  characterAbilities: CharacterAbilities[];
}
