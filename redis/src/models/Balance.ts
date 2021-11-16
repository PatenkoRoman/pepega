export default class Balance {
  public balance: number;

  constructor(id: string, delta: number, balance: number) {
    this.balance = balance || 0;
  }

  static getId(id: string) {
    return `balance-${id}`;
  }
}
