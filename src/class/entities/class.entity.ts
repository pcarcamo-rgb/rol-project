import { Archetype } from 'src/archetype/entities/archetype.entity';
import { Trait } from 'src/trait/entities/trait.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  IdClass: number;

  @Column('text')
  descClass: string;

  @OneToMany(() => Archetype, (archetype) => archetype.class, {
    cascade: true,
  })
  archetype: Archetype[];

  @OneToMany(() => Trait, (trait) => trait.class)
  trait: Trait[];
}
