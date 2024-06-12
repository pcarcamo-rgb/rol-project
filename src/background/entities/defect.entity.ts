import { Background } from 'src/background/entities/background.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Defect {
  @PrimaryGeneratedColumn()
  idDefect: number;

  @ManyToOne(() => Background, (background) => background.defect)
  background: Background;

  @Column('varchar', {
    length: 1000,
  })
  descDefect: string;
}
