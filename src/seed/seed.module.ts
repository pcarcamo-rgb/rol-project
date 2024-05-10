import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BackgroundModule } from '../background/background.module';
import { RaceModule } from '../race/race.module';
import { AbilitiesModule } from '../abilities/abilities.module';
import { CharacterModule } from '../character/character.module';
import { TagsModule } from '../tags/tags.module';
import { EquipmentModule } from '../equipment/equipment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from '../equipment/entities/equipment.entity';
import { ClassModule } from '../class/class.module';
import { ArchetypeModule } from '../archetype/archetype.module';
import { TraitModule } from '../trait/trait.module';
import { SpellModule } from '../spell/spell.module';
import { TalentModule } from '../talent/talent.module';
import { AuthModule } from '../auth/auth.module';

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
