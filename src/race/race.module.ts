import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';

@Module({
  controllers: [RaceController],
  providers: [RaceService],
  imports: [TypeOrmModule.forFeature([Race])],
  exports: [RaceService],
})
export class RaceModule {}
