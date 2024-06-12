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
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserRoleGuard } from '../auth/guards/user-role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ValidRoles } from '../interfaces/validRoles.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../common/get-user/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Characters')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    return this.characterService.create(user, createCharacterDto);
  }

  @Get()
  @Auth(ValidRoles.ADMIN)
  findAll() {
    return this.characterService.findAll();
  }

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
