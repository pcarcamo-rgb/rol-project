import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Background } from './background.entity';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  idLink: number;

  @ManyToOne(() => Background, (background) => background.link)
  background: Background;

  @Column('varchar', {
    length: 3000,
  })
  descLink: string;
}
