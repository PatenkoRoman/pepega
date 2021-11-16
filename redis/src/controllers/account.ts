import { FastifyReply, FastifyRequest } from 'fastify';
import { IAccountEvents, IBalanceChange, IRecalculateAccount } from '../routes/account';
import AccountService from '../services/account';

export const changeBalance = async (
  req: FastifyRequest<IBalanceChange>,
  res: FastifyReply,
) => {
  const { id } = req.params;
  const { delta } = req.body;

  await AccountService.balanceChange(id, delta);
  res.send().status(204);
};

// should be able to accept date and show account balance for this date
export const recalculateAccount = async (
  req: FastifyRequest<IRecalculateAccount>,
) => {
  const { id } = req.params;

  return AccountService.recalculateAccount(id);
};

export const getAccountEvents = (
  req: FastifyRequest<IAccountEvents>,
) => {
  const { id } = req.params;
  const { timestamp } = req.query;

  return AccountService.getAccountEventsRedis(id, timestamp);
};
