import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEquipment } from './entities/equipment-type.entity';
import { Equipment } from './entities/equipment.entity';
import { TagsModule } from 'src/tags/tags.module';
import { TypeEquipmentService } from './equipment-type/type-equipment.service';
import { EquipmentTypeController } from './equipment-type/equipment-type.controller';
import { Tags } from 'src/tags/entities/tag.entity';

@Module({
  controllers: [EquipmentController, EquipmentTypeController],
  providers: [EquipmentService, TypeEquipmentService],
  imports: [
    TypeOrmModule.forFeature([TypeEquipment, Equipment, Tags]),
    TagsModule,
  ],
})
export class EquipmentModule {}
