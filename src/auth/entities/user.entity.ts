import { Role } from 'src/auth/entities/role.entity';
import { Character } from 'src/character/entities/character.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column('varchar', {
    unique: true,
  })
  username: string;

  @Column('varchar', {
    select: false,
  })
  password: string;

  @ManyToMany(() => Role, (rol) => rol.user)
  @JoinTable({
    name: 'user_rol',
    joinColumn: {
      name: 'idUser',
    },
    inverseJoinColumn: {
      name: 'idRol',
    },
  })
  roles: Role[];

  @OneToMany(() => Character, (character) => character.user)
  character: Character[];
}
