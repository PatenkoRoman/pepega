import http, { IncomingMessage } from 'http';
import { users } from './users';

const status = {};
const getRandomIntInclusive = (min: number, max: number) => Math
  .floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const q = async () => {
  const data = new TextEncoder()
    .encode(JSON.stringify({ delta: getRandomIntInclusive(100, 1000) }));
  const options = {
    hostname: '127.0.0.1',
    port: 8080,
    path: `/account/${users[getRandomIntInclusive(0, users.length - 1)].id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };
  const req = http.request(options, (res: IncomingMessage) => {
    // @ts-ignore
    // eslint-disable-next-line no-plusplus
    status[res.statusCode] = status[res.statusCode] !== undefined ? status[res.statusCode] + 1 : 0;
  });

  req.on('error', (error: Error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

const run = async () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10000; i++) {
    // eslint-disable-next-line no-await-in-loop
    await q();
  }
};

run().then(() => setTimeout(() => console.log(status), 10000));
