import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto';
import { User } from './interfaces/user.interface';
import UserService from './user.service';

@Controller()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/:id')
  updateById(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.updateById(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('user')
  @ApiOperation({ summary: 'Create user' })
  create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Post('user/login')
  @ApiOperation({ summary: 'login' })
  login(@Body() data: LoginUserDTO) {
    return this.userService.login(data);
  }
}
