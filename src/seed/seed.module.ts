import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BackgroundModule } from 'src/background/background.module';
import { RaceModule } from 'src/race/race.module';
import { AbilitiesModule } from 'src/abilities/abilities.module';
import { CharacterModule } from 'src/character/character.module';
import { TagsModule } from 'src/tags/tags.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { ClassModule } from 'src/class/class.module';
import { ArchetypeModule } from 'src/archetype/archetype.module';
import { TraitModule } from 'src/trait/trait.module';
import { SpellModule } from 'src/spell/spell.module';
import { TalentModule } from 'src/talent/talent.module';
import { AuthModule } from 'src/auth/auth.module';

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
