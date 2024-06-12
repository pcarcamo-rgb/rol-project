import { Module } from '@nestjs/common';
import { AbilitiesService } from './abilities.service';
import { AbilitiesController } from './abilities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ability } from './entities/ability.entity';

@Module({
  controllers: [AbilitiesController],
  providers: [AbilitiesService],
  imports: [TypeOrmModule.forFeature([Ability])],
  exports: [AbilitiesService],
})
export class AbilitiesModule {}
