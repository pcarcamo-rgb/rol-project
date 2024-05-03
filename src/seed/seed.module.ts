import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BackgroundModule } from 'src/background/background.module';
import { RaceModule } from 'src/race/race.module';
import { AbilitiesModule } from 'src/abilities/abilities.module';
import { CharacterModule } from 'src/character/character.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [BackgroundModule, RaceModule, AbilitiesModule, CharacterModule],
})
export class SeedModule {}
