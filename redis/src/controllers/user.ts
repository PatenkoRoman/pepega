import { FastifyReply, FastifyRequest } from 'fastify';
import { IGetUser } from '../routes/user/getUser';
import { ICreateUser } from '../routes/user/createUser';
import UserService from '../services/user';
import User from '../models/User';

export const getUser = async (
  req: FastifyRequest<IGetUser>,
  res: FastifyReply,
): Promise<User | null> => {
  const { id } = req.params;
  const user = await UserService.getUser(id);
  if (!user) {
    res.code(204).send();
    return null;
  }
  return user;
};

export const createUser = async (req: FastifyRequest<ICreateUser>): Promise<User> => {
  const { id, name, email } = req.body;
  return UserService.createUser({ id, name, email });
};
