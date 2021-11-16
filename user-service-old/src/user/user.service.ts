import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from './interfaces/user.interface';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto';
import UserRepository from './user.repository';

// TODO: change it to config.ts file
const SECRET = 'secret';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDTO): Promise<User> {
    const SALT_WORK_FACTOR = 10;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    return this.userRepository.create({ ...user, password: hash });
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  updateById(id: string, data: UpdateUserDTO): Promise<User> {
    return this.userRepository.updateById(id, data);
  }

  async login(data: LoginUserDTO): Promise<any> {
    const user = await this.userRepository.findWithPassword(data.email);
    const compare = await bcrypt.compare(data.password, user.password);
    if (compare) {
      return {
        id: user.id,
        email: user.email,
        login: user.login,
        jwt: UserService.generateJWT(user),
      };
    }
    throw new UnauthorizedException('Wrong credentials');
  }

  private static generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const dataToHash = {
      id: user.id,
      login: user.login,
      email: user.email,
      exp: exp.getTime() / 1000,
    };
    return jwt.sign(dataToHash, SECRET);
  }
}
