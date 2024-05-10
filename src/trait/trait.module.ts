import { Module } from '@nestjs/common';
import { TraitService } from './trait.service';
import { TraitController } from './trait.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trait } from './entities/trait.entity';
import { ClassModule } from '../class/class.module';
import { ArchetypeModule } from '../archetype/archetype.module';

@Module({
  controllers: [TraitController],
  providers: [TraitService],
  imports: [TypeOrmModule.forFeature([Trait]), ClassModule, ArchetypeModule],
  exports: [TraitService],
})
export class TraitModule {}
