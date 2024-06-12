import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from '../auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed Data')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Public()
  @Get()
  executeSeed() {
    return this.seedService.execute();
  }
}
