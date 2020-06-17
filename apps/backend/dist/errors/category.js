"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.Failed = void 0;
const atom_1 = require("./atom");
const constants_1 = require("../constants");
class Failed extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "CategoryFailed";
        this.code = constants_1.HTTP_CODE.BAD_REQUEST;
    }
}
exports.Failed = Failed;
class NotFound extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "CategoryNotFound";
        this.code = constants_1.HTTP_CODE.NOT_FOUND;
    }
}
exports.NotFound = NotFound;
