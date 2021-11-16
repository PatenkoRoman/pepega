import { Static } from '@sinclair/typebox';
import { RequestGenericInterface } from 'fastify';
import { User, UserType } from '../../types/user';

export const CreateUserOptions = {
  schema: {
    body: User,
    response: {
      200: User,
    },
  },
};

export interface ICreateUser extends RequestGenericInterface {
  Body: Static<typeof User>;
  Response: UserType;
}
