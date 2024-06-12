import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { SigInDto } from './dto/sigIn-auth.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolRepository: Repository<Role>,

    private jwtService: JwtService,
  ) {}
  async login(logInDto: LogInDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: logInDto.username,
      },
      relations: {
        roles: false,
      },
      select: {
        username: true,
        password: true,
        idUser: true,
      },
    });
    if (!user) throw new UnauthorizedException(`Invalid username`);

    if (!bcrypt.compareSync(logInDto.password, user.password))
      throw new UnauthorizedException(`Credentials not valid.`);

    delete user.password;
    delete user.roles;

    const payload = { sub: user.idUser, username: user.username };

    return { user, acces_token: await this.jwtService.signAsync(payload) };
  }

  async sigIn(sigInDto: SigInDto) {
    const foundRoles: Role[] = [];

    for (const rol of sigInDto.roles) {
      const foundRol = await this.rolRepository.findOne({
        where: { idRol: rol },
      });
      if (!foundRol)
        throw new NotFoundException(`Rol with id "${rol}" not found.`);
      foundRoles.push(foundRol);
    }

    const newUser = this.userRepository.create({
      ...sigInDto,
      roles: foundRoles,
      password: bcrypt.hashSync(sigInDto.password, 10),
    });

    try {
      await this.userRepository.save(newUser);

      delete newUser.password;
      return newUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Username already exists.');
      } else {
        console.log(error);
        throw error;
      }
    }
  }

  async findUser(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: {
        roles: true,
      },
    });

    return user;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ idUser: id });
    return user;
  }

  async createRol(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create(createRolDto);

    return await this.rolRepository.save(rol);
  }
}
