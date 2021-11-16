import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { changeBalance, getAccountEvents, recalculateAccount } from '../../controllers/account';

const params = { id: Type.String() };
const body = { delta: Type.Number() };
const query = { timestamp: Type.Optional(Type.Number()) };

export interface IBalanceChange {
  Params: Static<typeof params>;
  Body: Static<typeof body>;
}

const BalanceChangeOptions = {
  schema: {
    params,
    body,
  },
};

export interface IAccountEvents {
  Params: Static<typeof params>;
  Querystring: Static<typeof query>;
}

const AccountEventsOptions = {
  schema: {
    params,
    querystring: query,
  },
};
const RecalculateAccountOptions = {
  schema: {
    params,
  },
};

export interface IRecalculateAccount {
  Params: Static<typeof params>;
}

const routes = async (fastify: FastifyInstance) => {
  fastify.post<IBalanceChange>('/:id', BalanceChangeOptions, changeBalance);
  fastify.get<IAccountEvents>('/events/:id', AccountEventsOptions, getAccountEvents);
  fastify.get<IRecalculateAccount>('/recalculate/:id', RecalculateAccountOptions, recalculateAccount);
};

module.exports = routes;
