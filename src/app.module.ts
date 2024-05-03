import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from './character/character.module';
import { BackgroundModule } from './background/background.module';
import { RaceModule } from './race/race.module';
import { AbilitiesModule } from './abilities/abilities.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
