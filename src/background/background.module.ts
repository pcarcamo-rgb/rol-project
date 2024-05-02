import { Module } from '@nestjs/common';
import { BackgroundService } from './background.service';
import { BackgroundController } from './background.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Background } from './entities/background.entity';

@Module({
  controllers: [BackgroundController],
  providers: [BackgroundService],
  imports: [TypeOrmModule.forFeature([Background])],
  exports: [BackgroundService],
})
export class BackgroundModule {}
