import { Module } from '@nestjs/common';
import { TraitService } from './trait.service';
import { TraitController } from './trait.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trait } from './entities/trait.entity';

@Module({
  controllers: [TraitController],
  providers: [TraitService],
  imports: [TypeOrmModule.forFeature([Trait])],
})
export class TraitModule {}
