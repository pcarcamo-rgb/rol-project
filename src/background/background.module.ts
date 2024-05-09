import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Background } from './entities/background.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BackgroundController],
  providers: [BackgroundService, JwtService],
  imports: [TypeOrmModule.forFeature([Background]), AuthModule],
  exports: [BackgroundService],
})
export class BackgroundModule {}
