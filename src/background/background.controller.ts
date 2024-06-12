import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BackgroundService } from './background.service';
import { CreateBackgroundDto } from './dto/create-background.dto';
import { UpdateBackgroundDto } from './dto/update-background.dto';
import { ValidRoles } from '../interfaces/validRoles.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { Background } from './entities/background.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Backgrounds')
@Controller('background')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @Auth(ValidRoles.ADMIN)
  @Post()
  create(
    @Body() createBackgroundDto: CreateBackgroundDto,
  ): Promise<Background> {
    return this.backgroundService.create(createBackgroundDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.backgroundService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backgroundService.findOne(+id);
  }

  @Auth(ValidRoles.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBackgroundDto: UpdateBackgroundDto,
  ) {
    return this.backgroundService.update(+id, updateBackgroundDto);
  }

  @Auth(ValidRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backgroundService.remove(+id);
  }
}
