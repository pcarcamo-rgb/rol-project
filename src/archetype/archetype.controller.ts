import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArchetypeService } from './archetype.service';
import { CreateArchetypeDto } from './dto/create-archetype.dto';
import { UpdateArchetypeDto } from './dto/update-archetype.dto';

@Controller('archetype')
export class ArchetypeController {
  constructor(private readonly archetypeService: ArchetypeService) {}

  @Post()
  create(@Body() createArchetypeDto: CreateArchetypeDto) {
    return this.archetypeService.create(createArchetypeDto);
  }

  @Get()
  findAll() {
    return this.archetypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archetypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArchetypeDto: UpdateArchetypeDto,
  ) {
    return this.archetypeService.update(+id, updateArchetypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archetypeService.remove(+id);
  }
}
