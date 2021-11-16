import { RequestGenericInterface } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { User, UserType } from '../../types/user';

export const GetUserParams = Type.Object({
  id: Type.String(),
});

export const GetUserOptions = {
  schema: {
    params: GetUserParams,
    response: {
      200: User,
      204: {
        description: 'No such user',
        type: 'null',
      },
    },
  },
};

export interface IGetUser extends RequestGenericInterface {
  Params: Static<typeof GetUserParams>;
  Response: UserType;
}
