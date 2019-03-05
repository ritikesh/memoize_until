class NullObject {
}

class Store {
    private _store: object;
    private _null: NullObject;
    
    constructor(private _moment: () => number) { 
        this._store = {};
        this._null = new NullObject();
        this.extend('default');
    }

    fetch(key: string, cb: () => any) : any {
        let value = this.get(key);
        if (value === undefined) {
            this.clearAll(key);
            value = this.set(key, cb());
        }
        return this.unsetNull(value);
    }

    extend(key: string) : void {
        if(!this._store[key]) {
            this.clearAll(key);
        }
    }

    private get(key: string) : any {
        const moment = this._moment();
        return this._store[key][moment];
    }

    private set(key: string, value: any) : any {
        const moment = this._moment();
        return this._store[key][moment] = this.setNull(value);
    }

    private clearAll(key: string) : void {
        this._store[key] = {}
    }

    private setNull(value: any): any {
        if (value === undefined || value === null || value === NaN) {
            return this._null;
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

const MemoizeMinute = new Store(() => { return (new Date()).getMinutes(); });
const MemoizeHour = new Store(() => { return (new Date()).getHours(); });
const MemoizeDay = new Store(() => { return (new Date()).getDate(); });
const MemoizeWeek = new Store(() => { return (new Date()).getDay(); });


const Map = {
    min: MemoizeMinute,
    hour: MemoizeHour,
    day: MemoizeDay,
    week: MemoizeWeek
}
const MemoizeUntil = {
    init: (keyset: object) => {
        for(let kind in keyset ) {
            for(let key in keyset[kind]) {
                this.extend(kind, key);
            }
        }
    },
    extend: (kind: string, key: string) => {
        Map[kind].extend(key);
    },
    fetch: (kind: string, key: string, cb: () => any) => {
        return Map[kind].fetch(key, cb);
    }
}

export { MemoizeUntil };