export default class AccountEvent {
  public id: string;

  public delta: number;

  public timestamp: number;

  constructor(id: string, delta: number, timestamp: number) {
    this.id = id;
    this.delta = delta;
    this.timestamp = timestamp;
  }

  static getId(id: string) {
    return `account-${id}`;
  }
}
