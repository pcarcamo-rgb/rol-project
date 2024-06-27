import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from './character/character.module';
import { BackgroundModule } from './background/background.module';
import { RaceModule } from './race/race.module';

import { TraitModule } from './trait/trait.module';

import { SpellModule } from './spell/spell.module';

import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AbilitiesModule } from './character/abilities/abilities.module';
import { ArchetypeModule } from './character/class/archetype/archetype.module';
import { ClassModule } from './character/class/class.module';
import { EquipmentModule } from './character/equipment/equipment.module';
import { TagsModule } from './character/equipment/tags/tags.module';
import { TalentModule } from './character/talent/talent.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      //dropSchema: true,
    }),
    CharacterModule,
    BackgroundModule,
    RaceModule,
    AbilitiesModule,
    EquipmentModule,
    TagsModule,
    ClassModule,
    TraitModule,
    ArchetypeModule,
    SpellModule,
    TalentModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
