import User from '../models/User';
import { UserType } from '../types/user';
import { getRecord } from '../repository/redis';

const getUser = async (id: string): Promise<User | null> => {
  return User.getUser(id);
};

const createUser = async (user: UserType) => {
  const { id, name, email } = user;
  return new User({ id, name, email }).save();
};

export default {
  getUser,
  createUser,
};
