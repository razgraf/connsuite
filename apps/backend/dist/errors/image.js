"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeType = void 0;
const atom_1 = require("./atom");
const constants_1 = require("../constants");
class MimeType extends atom_1.BaseError {
    constructor(message) {
        super(message);
        this.name = "ImageMimeTypeError";
        this.code = constants_1.HTTP_CODE.BAD_REQUEST;
    }
}
exports.MimeType = MimeType;
