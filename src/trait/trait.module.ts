import { Module } from '@nestjs/common';
import { TraitService } from './trait.service';
import { TraitController } from './trait.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trait } from './entities/trait.entity';
import { ClassModule } from 'src/class/class.module';
import { ArchetypeModule } from 'src/archetype/archetype.module';

@Module({
  controllers: [TraitController],
  providers: [TraitService],
  imports: [TypeOrmModule.forFeature([Trait]), ClassModule, ArchetypeModule],
})
export class TraitModule {}
