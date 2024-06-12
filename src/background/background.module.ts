import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Background } from './entities/background.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { Defect } from './entities/defect.entity';
import { Ideal } from './entities/ideal.entity';
import { Link } from './entities/link.entity';
import { Peculiarity } from './entities/peculiarity.entity';
import { AbilitiesModule } from 'src/character/abilities/abilities.module';

@Module({
  controllers: [BackgroundController],
  providers: [BackgroundService, JwtService],
  imports: [
    TypeOrmModule.forFeature([Background, Defect, Ideal, Link, Peculiarity]),
    AuthModule,
    AbilitiesModule,
  ],
  exports: [BackgroundService],
})
export class BackgroundModule {}
