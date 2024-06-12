import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AbilitiesService } from './abilities.service';
import { CreateAbilityDto } from './dto/create-ability.dto';
import { UpdateAbilityDto } from './dto/update-ability.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/is-public.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/interfaces/validRoles.enum';

@ApiTags('Abilities')
@Controller('abilities')
export class AbilitiesController {
  constructor(private readonly abilitiesService: AbilitiesService) {}

  @Auth(ValidRoles.ADMIN)
  @Post()
  create(@Body() createAbilityDto: CreateAbilityDto) {
    return this.abilitiesService.create(createAbilityDto);
  }

  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Show all abilities',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findAll() {
    return this.abilitiesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Show ability parameter id',
  })
  @ApiResponse({
    status: 404,
    description: 'Could not find ability with parameter id',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findOne(@Param('id') id: string) {
    return this.abilitiesService.findOne(+id);
  }

  @Auth(ValidRoles.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbilityDto: UpdateAbilityDto) {
    return this.abilitiesService.update(+id, updateAbilityDto);
  }

  @Auth(ValidRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abilitiesService.remove(+id);
  }
}
