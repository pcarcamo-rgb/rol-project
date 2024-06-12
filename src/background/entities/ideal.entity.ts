import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Background } from './background.entity';

@Entity()
export class Ideal {
  @PrimaryGeneratedColumn()
  idIdeal: number;

  @ManyToOne(() => Background, (background) => background.ideal)
  background: Background;

  @Column('varchar', {
    length: 1000,
  })
  descIdeal: string;
}
