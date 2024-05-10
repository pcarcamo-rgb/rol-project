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

@Controller('background')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @Auth(ValidRoles.ADMIN)
  @Post()
  create(
    @Body() createBackgroundDto: CreateBackgroundDto,
  ): Promise<
    import('c:/rol/src/background/entities/background.entity').Background
  > {
    return this.backgroundService.create(createBackgroundDto);
  }

  @Get()
  findAll() {
    return this.backgroundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backgroundService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBackgroundDto: UpdateBackgroundDto,
  ) {
    return this.backgroundService.update(+id, updateBackgroundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.backgroundService.remove(+id);
  }
}
