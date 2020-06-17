"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.code = null;
        this.isPrivate = false;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.BaseError = BaseError;
