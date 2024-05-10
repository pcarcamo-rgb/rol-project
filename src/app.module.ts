import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from './character/character.module';
import { BackgroundModule } from './background/background.module';
import { RaceModule } from './race/race.module';
import { AbilitiesModule } from './abilities/abilities.module';
import { SeedModule } from './seed/seed.module';
import { EquipmentModule } from './equipment/equipment.module';
import { TagsModule } from './tags/tags.module';
import { ClassModule } from './class/class.module';
import { TraitModule } from './trait/trait.module';
import { ArchetypeModule } from './archetype/archetype.module';
import { SpellModule } from './spell/spell.module';
import { TalentModule } from './talent/talent.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

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
    }),
    CharacterModule,
    BackgroundModule,
    RaceModule,
    AbilitiesModule,
    SeedModule,
    EquipmentModule,
    TagsModule,
    ClassModule,
    TraitModule,
    ArchetypeModule,
    SpellModule,
    TalentModule,
    AuthModule,
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
