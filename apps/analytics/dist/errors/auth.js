"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingVendorResponse = exports.Locked = exports.Forbidden = exports.InvalidToken = exports.UserNotFound = exports.Failed = void 0;
const atom_1 = require("./atom");
const constants_1 = require("../constants");
class Failed extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "AuthFailed";
        this.code = constants_1.HTTP_CODE.BAD_REQUEST;
    }
}
exports.Failed = Failed;
class UserNotFound extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "AuthUserNotFound";
        this.code = constants_1.HTTP_CODE.NOT_FOUND;
    }
}
exports.UserNotFound = UserNotFound;
class InvalidToken extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "AuthInvalidToken";
        this.code = constants_1.HTTP_CODE.FORBIDDEN;
    }
}
exports.InvalidToken = InvalidToken;
class Forbidden extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "AuthForbidden";
        this.code = constants_1.HTTP_CODE.FORBIDDEN;
    }
}
exports.Forbidden = Forbidden;
class Locked extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "AuthLocked";
        this.code = constants_1.HTTP_CODE.LOCKED;
    }
}
exports.Locked = Locked;
/** Edge case */
class MissingVendorResponse extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "AuthMissingVendorResponse";
        this.code = constants_1.HTTP_CODE.UNPROCESSABLE_ENTITY;
    }
}
exports.MissingVendorResponse = MissingVendorResponse;
