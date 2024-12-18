import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEquipment } from './entities/equipment-type.entity';
import { Equipment } from './entities/equipment.entity';

import { TypeEquipmentService } from './equipment-type/type-equipment.service';
import { EquipmentTypeController } from './equipment-type/equipment-type.controller';
import { Tags } from './tags/entities/tag.entity';
import { TagsModule } from './tags/tags.module';

@Module({
  controllers: [EquipmentController, EquipmentTypeController],
  providers: [EquipmentService, TypeEquipmentService],
  imports: [
    TypeOrmModule.forFeature([TypeEquipment, Equipment, Tags]),
    TagsModule,
  ],
  exports: [EquipmentService, TypeEquipmentService],
})
export class EquipmentModule {}
