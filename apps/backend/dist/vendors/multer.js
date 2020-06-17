"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const lodash_1 = __importDefault(require("lodash"));
const connsuite_guards_1 = require("@razgraf/connsuite-guards");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const filter = (req, file, cb) => {
    const type = lodash_1.default.attempt(() => lodash_1.default.toString(file.mimetype).split("/").pop());
    if (!lodash_1.default.isError(type) && type && connsuite_guards_1.limits.ALLOWED_FILE_FORMAT.includes(type)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.upload = multer_1.default({
    storage,
    limits: {
        fileSize: connsuite_guards_1.limits.MAX_FILE_SIZE,
    },
    fileFilter: filter,
});
exports.default = {
    upload: exports.upload,
};
