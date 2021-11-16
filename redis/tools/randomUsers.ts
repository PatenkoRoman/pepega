import http, { IncomingMessage } from 'http';
import { users } from './users';
// import { v4 as uuid } from 'uuid';

const q = (user: any) => {
  const data = new TextEncoder().encode(JSON.stringify(user));
  const options = {
    hostname: '127.0.0.1',
    port: 8080,
    path: '/user',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };
  const req = http.request(options, (res: IncomingMessage) => {
    console.log(`statusCode: ${res.statusCode}`);
  });

  req.on('error', (error: Error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

const run = async () => {
  await Promise.all(users.map((user) => q(user)));
};

run();
