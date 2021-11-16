import AccountEvent from './Account';

class AccountEvents {
  get events(): AccountEvent[] {
    return this._events;
  }

  set events(value: AccountEvent[]) {
    this._events = value;
  }

  private _events: AccountEvent[] = [];
}
