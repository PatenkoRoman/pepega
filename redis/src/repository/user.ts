import { getRecord } from './redis';
import { UserType } from '../types/user';
import User from '../models/User';

// eslint-disable-next-line import/prefer-default-export
export const getUser = async (id: string) => {
  const user = await getRecord<UserType>(User.getId(id));
  if (!user) {
    throw new Error('No user');
  }
  return new User(user);
};
