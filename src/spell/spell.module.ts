import { Module } from '@nestjs/common';
import { SpellService } from './spell.service';
import { SpellController } from './spell.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spell } from './entities/spell.entity';
import { ClassModule } from 'src/class/class.module';

@Module({
  controllers: [SpellController],
  providers: [SpellService],
  imports: [TypeOrmModule.forFeature([Spell]), ClassModule],
})
export class SpellModule {}