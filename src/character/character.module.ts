import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { CharacterAbilities } from './entities/character-abilities.entity';

import { RaceModule } from '../race/race.module';
import { BackgroundModule } from '../background/background.module';

import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AbilitiesModule } from './abilities/abilities.module';
import { ArchetypeModule } from './class/archetype/archetype.module';
import { ClassModule } from './class/class.module';
import { EquipmentModule } from './equipment/equipment.module';
import { TalentModule } from './talent/talent.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, JwtService],
  imports: [
    TypeOrmModule.forFeature([Character, CharacterAbilities]),
    AbilitiesModule,
    EquipmentModule,
    TalentModule,
    ClassModule,
    RaceModule,
    BackgroundModule,
    ArchetypeModule,
    AuthModule,
  ],
  exports: [CharacterService],
})
export class CharacterModule {}
