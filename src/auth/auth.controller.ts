import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LogInDto } from './dto/log-in.dto';
import { SigInDto } from './dto/sigIn-auth.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { Public } from './decorators/is-public.decorator';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from '../interfaces/validRoles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  register(@Body() sigInDto: SigInDto) {
    return this.authService.sigIn(sigInDto);
  }

  @Auth(ValidRoles.ADMIN, ValidRoles.ADMINISTRATOR)
  @Post('rol')
  create(@Body() creaRolDto: CreateRolDto) {
    return this.authService.createRol(creaRolDto);
  }
}
