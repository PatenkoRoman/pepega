import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const env = {
  PORT: Number(process.env.PORT) || 8080,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
};
