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
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Archetypes')
@Controller('archetype')
export class ArchetypeController {
  constructor(private readonly archetypeService: ArchetypeService) {}

  @ApiCreatedResponse({ description: 'Successfully created archetype' })
  @ApiInternalServerErrorResponse({ description: 'Error in the server.' })
  @Post()
  create(@Body() createArchetypeDto: CreateArchetypeDto) {
    return this.archetypeService.create(createArchetypeDto);
  }

  @ApiOkResponse({ description: 'Show all archetypes' })
  @ApiInternalServerErrorResponse({ description: 'Error in the server.' })
  @Get()
  findAll() {
    return this.archetypeService.findAll();
  }

  @ApiOkResponse({ description: 'Show the archetype' })
  @ApiNotFoundResponse({
    description: 'Could not find archetype with given id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archetypeService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: `Show the updated archetype`,
  })
  @ApiResponse({
    status: 404,
    description: `Could not find archetype with given id`,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArchetypeDto: UpdateArchetypeDto,
  ) {
    return this.archetypeService.update(+id, updateArchetypeDto);
  }

  @ApiOkResponse({ description: 'Successfully deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archetypeService.remove(+id);
  }
}
