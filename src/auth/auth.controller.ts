import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LogInDto } from './dto/log-in.dto';
import { SigInDto } from './dto/sigIn-auth.dto';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LogInDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() sigInDto: SigInDto) {
    return this.authService.sigIn(sigInDto);
  }

  @Post('rol')
  create(@Body() creaRolDto: CreateRolDto) {
    return this.authService.createRol(creaRolDto);
  }
}
