import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Background } from './background.entity';

@Entity()
export class Peculiarity {
  @PrimaryGeneratedColumn()
  idPeculiarity: number;

  @ManyToOne(() => Background, (background) => background.peculiarity)
  background: Background;

  @Column('varchar', {
    length: 3000,
  })
  descPeculiarity: string;
}
