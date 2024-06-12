import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TraitService } from './trait.service';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Traits')
@Controller('trait')
export class TraitController {
  constructor(private readonly traitService: TraitService) {}

  @Post()
  create(@Body() createTraitDto: CreateTraitDto) {
    return this.traitService.create(createTraitDto);
  }

  @Get()
  findAll() {
    return this.traitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTraitDto: UpdateTraitDto) {
    return this.traitService.update(+id, updateTraitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.traitService.remove(+id);
  }
}
