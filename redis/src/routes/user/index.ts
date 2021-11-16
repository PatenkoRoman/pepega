import { FastifyInstance } from 'fastify';
import { IGetUser, GetUserOptions } from './getUser';
import { ICreateUser, CreateUserOptions } from './createUser';
import { createUser, getUser } from '../../controllers/user';

const routes = async (fastify: FastifyInstance) => {
  fastify.get<IGetUser>('/:id', GetUserOptions, getUser);
  fastify.post<ICreateUser>('/', CreateUserOptions, createUser);
};

module.exports = routes;
