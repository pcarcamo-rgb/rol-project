import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BackgroundModule } from '../background/background.module';
import { RaceModule } from '../race/race.module';

import { CharacterModule } from '../character/character.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TraitModule } from '../trait/trait.module';
import { SpellModule } from '../spell/spell.module';

import { AuthModule } from '../auth/auth.module';
import { AbilitiesModule } from 'src/character/abilities/abilities.module';
import { ArchetypeModule } from 'src/character/class/archetype/archetype.module';
import { ClassModule } from 'src/character/class/class.module';
import { Equipment } from 'src/character/equipment/entities/equipment.entity';
import { EquipmentModule } from 'src/character/equipment/equipment.module';
import { TagsModule } from 'src/character/equipment/tags/tags.module';
import { TalentModule } from 'src/character/talent/talent.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    BackgroundModule,
    RaceModule,
    AbilitiesModule,
    CharacterModule,
    TagsModule,
    EquipmentModule,
    TypeOrmModule.forFeature([Equipment]),
    ClassModule,
    ArchetypeModule,
    TraitModule,
    SpellModule,
    TalentModule,
    AuthModule,
  ],
})
export class SeedModule {}
