import client from '../utils/redis';

const { promisify } = require('util');

export async function getRecord<T>(key: string):Promise<T> {
  const record = await promisify(client.get).bind(client)(key);
  try {
    return JSON.parse(record);
  } catch (e) {
    return record;
  }
}

export async function createRecord<T>(key: string, record: T):Promise<T> {
  return promisify(client.set).bind(client)(key, JSON.stringify(record));
}

export async function createList<T>(key: string, record: T):Promise<T> {
  return promisify(client.rpush).bind(client)(key, JSON.stringify(record));
}

export async function getList<T>(key: string, start = 0, stop = -1):Promise<T[]> {
  const records = await promisify(client.lrange).bind(client)(key, start, stop);
  try {
    return records.map((record: string) => JSON.parse(record));
  } catch (e) {
    return records;
  }
}

export async function incrby<T>(key: string, value: number):Promise<T> {
  return promisify(client.incrby).bind(client)(key, value);
}
