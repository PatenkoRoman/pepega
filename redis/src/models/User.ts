import { createRecord, getRecord } from '../repository/redis';
import { UserType } from '../types/user';
import Balance from './Balance';

export default class User {
  id: string;

  name: string | undefined;

  email: string | undefined;

  balance: number | undefined;

  constructor(user:UserType) {
    const {
      id, name, email,
    } = user;
    this.id = id;
    this.name = name;
    this.email = email;
  }

  async save() {
    await createRecord<UserType>(User.getId(this.id), this);
    return this;
  }

  static getId(id: string) {
    return `user-${id}`;
  }

  static async getUser(id: string) {
    const user = await getRecord<UserType>(User.getId(id));
    const balance = await getRecord<number>(Balance.getId(id));
    if (!user) {
      return null;
    }
    return { ...user, balance } as User;
  }
}
