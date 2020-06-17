"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invalid = exports.Conflict = exports.Missing = void 0;
const atom_1 = require("./atom");
const constants_1 = require("../constants");
class Missing extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "ParamsMissing";
        this.code = constants_1.HTTP_CODE.BAD_REQUEST;
    }
}
exports.Missing = Missing;
class Conflict extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "ParamsConflict";
        this.code = constants_1.HTTP_CODE.CONFLICT;
    }
}
exports.Conflict = Conflict;
class Invalid extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "ParamsInvalid";
        this.code = constants_1.HTTP_CODE.BAD_REQUEST;
    }
}
exports.Invalid = Invalid;
