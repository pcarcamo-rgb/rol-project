import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateTypeEquipmentDto } from './dto/update-type-equipment.dto';
import { CreateTypeEquipmentDto } from './dto/create-type-equipment.dto';
import { TypeEquipmentService } from './type-equipment.service';

@Controller('equipment-type')
export class EquipmentTypeController {
  constructor(private readonly typeEquipmentService: TypeEquipmentService) {}
  //TYPE OF EQUIPMENT
  @Get('')
  findAllTypesEquipment() {
    return this.typeEquipmentService.findAllType();
  }

  @Get(':id')
  findOneTypeEquipment(@Param('id') id: string): any {
    return this.typeEquipmentService.findOneType(+id);
  }

  @Post('')
  createTypeEquipment(@Body() createTypeEquipment: CreateTypeEquipmentDto) {
    return this.typeEquipmentService.createType(createTypeEquipment);
  }

  @Patch(':id')
  updateTypeEquipment(
    @Param('id') id: string,
    @Body() updateTypeEquipment: UpdateTypeEquipmentDto,
  ) {
    return this.typeEquipmentService.updateType(+id, updateTypeEquipment);
  }

  @Delete(':id')
  deleteTypeEquipment(@Param('id') id: string) {
    return this.typeEquipmentService.removeType(+id);
  }
}
