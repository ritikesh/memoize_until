"use strict";
var _this = this;
exports.__esModule = true;
var NullObject = /** @class */ (function () {
    function NullObject() {
    }
    return NullObject;
}());
var Store = /** @class */ (function () {
    function Store(_moment) {
        this._moment = _moment;
        this._store = {};
        this._null = new NullObject();
        this.extend('default');
    }
    Store.prototype.fetch = function (key, cb) {
        var value = this.get(key);
        if (value === undefined) {
            this.clearAll(key);
            value = this.set(key, cb());
        }
        return this.unsetNull(value);
    };
    Store.prototype.extend = function (key) {
        if (!this._store[key]) {
            this.clearAll(key);
        }
    };
    Store.prototype.get = function (key) {
        var moment = this._moment();
        return this._store[key][moment];
    };
    Store.prototype.set = function (key, value) {
        var moment = this._moment();
        return this._store[key][moment] = this.setNull(value);
    };
    Store.prototype.clearAll = function (key) {
        this._store[key] = {};
    };
    Store.prototype.setNull = function (value) {
        if (value === undefined || value === null || value === NaN) {
            return this._null;
        }
        return value;
    };
    Store.prototype.unsetNull = function (value) {
        if (value instanceof NullObject) {
            return undefined;
        }
        return value;
    };
    return Store;
}());
var MemoizeMinute = new Store(function () { return (new Date()).getMinutes(); });
var MemoizeHour = new Store(function () { return (new Date()).getHours(); });
var MemoizeDay = new Store(function () { return (new Date()).getDate(); });
var MemoizeWeek = new Store(function () { return (new Date()).getDay(); });
var Map = {
    min: MemoizeMinute,
    hour: MemoizeHour,
    day: MemoizeDay,
    week: MemoizeWeek
};
var MemoizeUntil = {
    init: function (keyset) {
        for (var kind in keyset) {
            for (var key in keyset[kind]) {
                _this.extend(kind, key);
            }
        }
    },
    extend: function (kind, key) {
        Map[kind].extend(key);
    },
    fetch: function (kind, key, cb) {
        return Map[kind].fetch(key, cb);
    }
};
exports.MemoizeUntil = MemoizeUntil;
