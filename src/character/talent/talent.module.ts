import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talent } from './entities/talent.entity';

@Module({
  controllers: [TalentController],
  providers: [TalentService],
  imports: [TypeOrmModule.forFeature([Talent])],
  exports: [TalentService],
})
export class TalentModule {}
