import { Module } from '@nestjs/common';
import { ArchetypeService } from './archetype.service';
import { ArchetypeController } from './archetype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archetype } from './entities/archetype.entity';

@Module({
  controllers: [ArchetypeController],
  providers: [ArchetypeService],
  imports: [TypeOrmModule.forFeature([Archetype])],
})
export class ArchetypeModule {}
