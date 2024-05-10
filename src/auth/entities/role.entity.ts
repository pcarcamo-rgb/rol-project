import { User } from '../../auth/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column('varchar', {
    unique: true,
  })
  descRol: string;

  @ManyToMany(() => User, (user) => user.roles)
  user: User[];
}
