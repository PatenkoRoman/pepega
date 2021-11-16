import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserRepository } from './interfaces/user.interface';
import { CreateUserDTO, UpdateUserDTO } from './dto';

@Injectable()
export default class UserRepositoryImpl implements UserRepository {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDTO): Promise<User> {
    try {
      // eslint-disable-next-line new-cap
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        throw new BadRequestException('User with this email already exists.');
      }
      throw err;
    }
  }

  findById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }, { password: 0 }).exec();
  }

  findWithPassword(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  findByParams(params: any): Promise<User> {
    return this.userModel.findOne({ params }, { password: 0 }).exec();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 }).exec();
  }

  updateById(id: string, data: UpdateUserDTO): Promise<User> {
    return this.userModel
      .findOneAndUpdate(
        { _id: id },
        { $set: data },
        { fields: { password: 0 }, new: true },
      )
      .exec();
  }

  deleteById(id: string): Promise<any> {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
