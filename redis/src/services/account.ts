import { v4 as uuid } from 'uuid';
import { getUser } from '../repository/user';
import { getConsumer, getProducer, kafka } from '../utils/kafka';
import {
  createList, getList, getRecord, incrby,
} from '../repository/redis';
import AccountEvent from '../models/Account';
import { UserType } from '../types/user';
import User from '../models/User';

const balanceChange = async (id: string, delta: number) => {
  // const user = await getUser(id);
  try {
    await incrby(`balance-${id}`, delta);
    const p = await getProducer();
    await p.send({
      topic: 'balance-changed',
      messages: [{
        key: id,
        value: JSON.stringify({ id: uuid(), delta }),
      }],
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    // rollback
    throw e;
  }
};

const balanceChanged = async (id: string, value: any) => {
  await createList(AccountEvent.getId(id), value);
};

const getAccountEventsRedis = async (id: string, timestamp?: number) => {
  const events = await getList<AccountEvent>(AccountEvent.getId(id));
  let isSorted = true;
  events.forEach((event, index) => {
    if (events[index - 1] && events[index - 1].timestamp > events[index].timestamp) {
      isSorted = false;
    }
  });
  if (timestamp) {
    return events.filter((el: AccountEvent) => el.timestamp <= timestamp);
  }
  console.log(isSorted);
  return events;
};

// need to filter by key
// recreating consumer each time takes a lot of time
const getAccountEventsKafka = async (id: string, res: any) => {
  const consumer = kafka.consumer({ groupId: 'balance-changed-events-reader' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'balance-changed', fromBeginning: true });
  const list = [] as any;
  await consumer.run({
    eachBatchAutoResolve: false,
    eachBatch: async ({
      batch, heartbeat, isRunning, isStale,
    }) => {
      if (!batch.messages.length) {
        res.status(204);
        await consumer.stop();
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const message of batch.messages) {
        if (!isRunning() || isStale()) break;
        const { key, timestamp, value } = message;
        if (value && key.toString() === id) {
          list.push({ ...JSON.parse(value.toString()), timestamp });
        }
        // eslint-disable-next-line no-await-in-loop
        await heartbeat();
      }
      res.send(list).status(200);
      // await consumer.stop();
    },
  });
};

const recalculateAccount = async (id: string) => {
  const user = await User.getUser(id);

  const events = await getList<AccountEvent>(AccountEvent.getId(id));
  const recalculated = events.reduce((acc, event: AccountEvent) => acc + event.delta, 0);

  return {
    stored: user?.balance,
    recalculated,
  };
};

export default {
  balanceChange,
  balanceChanged,
  getAccountEventsRedis,
  getAccountEventsKafka,
  recalculateAccount,
};
