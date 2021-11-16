import fastify from 'fastify';
import pino from 'pino';

import { env } from './config/env';
import { getConsumer } from './utils/kafka';
import AccountService from './services/account';

// const server = fastify({
//   logger: pino({
//     prettyPrint: true,
//   }),
// });
const server = fastify();

server.register(require('./routes/user'), { prefix: 'user' });
server.register(require('./routes/account'), { prefix: 'account' });

// some times throw 'KafkaJSError: The producer is disconnected' error
async function listener() {
  const consumer = await getConsumer();
  await consumer.run({
    eachMessage: async ({ message }) => {
      const { timestamp } = message;
      const key = message.key.toString();
      const value = JSON.parse(message.value?.toString() || '{}'); // TODO: convert in event payload object

      await AccountService.balanceChanged(key, { ...value, timestamp });
    },
  });
}

listener();

const address = '0.0.0.0';
server.listen(env.PORT, address, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${addr}`);
});
