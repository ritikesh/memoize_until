class NullObject {}

const nullInstance = new NullObject();

// tslint:disable-next-line:max-classes-per-file
class Store {
  private store: object;

  constructor(private moment: () => number) {
    this.store = {};
    this.extend('default');
  }

  public fetch(key: string, cb: () => any): any {
    let value = this.get(key);
    if (value === undefined) {
      this.clearAll(key);
      value = this.set(key, cb());
    }
    return this.unsetNull(value);
  }

  public extend(key: string): void {
    if (!this.store[key]) {
      this.clearAll(key);
    }
  }

  private get(key: string): any {
    const moment = this.moment();
    return this.store[key][moment];
  }

  private set(key: string, value: any): any {
    const moment = this.moment();
    return (this.store[key][moment] = this.setNull(value));
  }

  private clearAll(key: string): void {
    this.store[key] = {};
  }

  private setNull(value: any): any {
    if (value === undefined || value === null) {
      return nullInstance;
    }
    return value;
  }

  private unsetNull(value: any): any {
    if (value instanceof NullObject) {
      return undefined;
    }
    return value;
  }
}

const MemoizeMinute = new Store(() => new Date().getMinutes());
const MemoizeHour = new Store(() => new Date().getHours());
const MemoizeDay = new Store(() => new Date().getDate());
const MemoizeWeek = new Store(() => new Date().getDay());

const Map = {
  day: MemoizeDay,
  hour: MemoizeHour,
  min: MemoizeMinute,
  week: MemoizeWeek,
};
const MemoizeUntil = {
  extend(kind: string, key: string) {
    Map[kind].extend(key);
  },

  init(keyset: object) {
    for (const kind of Object.keys(keyset)) {
      for (const key of Object.keys(keyset[kind])) {
        this.extend(kind, key);
      }
    }
  },

  fetch(kind: string, key: string, cb: () => any) {
    return Map[kind].fetch(key, cb);
  },
};

export { MemoizeUntil };
