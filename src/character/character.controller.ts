import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/character/create-character.dto';
import { UpdateCharacterDto } from './dto/character/update-character.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ValidRoles } from 'src/interfaces/validRoles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Roles(ValidRoles.ADMIN)
  @UseGuards(AuthGuard, UserRoleGuard)
  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Auth(ValidRoles.USER)
  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Auth(ValidRoles.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(+id);
  }

  @Get('Info/:id')
  getInfo(@Param('id') id: string) {
    return this.characterService.getAllinfo(+id);
  }

  @Auth(ValidRoles.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(+id, updateCharacterDto);
  }

  @Roles(ValidRoles.ADMIN)
  @UseGuards(AuthGuard, UserRoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
