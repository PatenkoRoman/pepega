import { Document } from 'mongoose';
import { UpdateUserDTO } from '../dto';

export interface User extends Document {
  id: string;
  email: string;
  login: string;
  password: string;
}

export interface UserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  updateById(id: string, data: UpdateUserDTO): Promise<User>;
  deleteById(id: string): Promise<void>;
}
