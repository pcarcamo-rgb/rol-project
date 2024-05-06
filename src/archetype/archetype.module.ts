import { Module } from '@nestjs/common';
import { ArchetypeService } from './archetype.service';
import { ArchetypeController } from './archetype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archetype } from './entities/archetype.entity';
import { ClassModule } from 'src/class/class.module';

@Module({
  controllers: [ArchetypeController],
  providers: [ArchetypeService],
  imports: [TypeOrmModule.forFeature([Archetype]), ClassModule],
  exports: [ArchetypeService],
})
export class ArchetypeModule {}
