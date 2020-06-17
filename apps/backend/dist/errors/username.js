"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failed = void 0;
const atom_1 = require("./atom");
const constants_1 = require("../constants");
class Failed extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "UsernameFailed";
        this.code = constants_1.HTTP_CODE.BAD_REQUEST;
    }
}
exports.Failed = Failed;
