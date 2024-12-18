import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpellService } from './spell.service';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Spells')
@Controller('spell')
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @Post()
  create(@Body() createSpellDto: CreateSpellDto) {
    return this.spellService.create(createSpellDto);
  }

  @Get()
  findAll() {
    return this.spellService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spellService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpellDto: UpdateSpellDto) {
    return this.spellService.update(+id, updateSpellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spellService.remove(+id);
  }
}
