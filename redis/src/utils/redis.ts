import redis from 'redis';
import { env } from '../config/env';

const client = redis.createClient({
  port: 6379,
  host: env.REDIS_HOST,
});

client.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`could not establish a connection with redis. ${err}`);
});
// eslint-disable-next-line no-unused-vars
client.on('connect', (err) => {
  // eslint-disable-next-line no-console
  console.log('connected to redis successfully');
});

export default client;
