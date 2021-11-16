import { Module } from '@nestjs/common';
import JwtStrategy from '../jwt.strategy';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import { usersProviders } from './user.provider';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, ...usersProviders],
})
export default class UserModule {}
