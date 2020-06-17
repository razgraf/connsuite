"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
class AuthMiddleware {
    static bearer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const header = lodash_1.default.get(req, "headers.authorization");
                if (!header)
                    throw new errors_1.AuthError.InvalidToken("Bearer Missing");
                const token = (header === null || header === void 0 ? void 0 : header.split(" ")[1]) || "";
                if (!token || !token.length)
                    throw new errors_1.AuthError.InvalidToken("Bearer Malformed");
                const usersafe = yield repositories_1.AuthRepository.getInstance().validate(token);
                if (!res.locals)
                    res.locals = {};
                res.locals.identity = usersafe;
                next();
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
                return;
            }
        });
    }
    static bearerFriendly(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const header = lodash_1.default.get(req, "headers.authorization");
                if (!header)
                    throw new errors_1.AuthError.InvalidToken("Bearer Missing");
                const token = (header === null || header === void 0 ? void 0 : header.split(" ")[1]) || "";
                if (!token)
                    throw new errors_1.AuthError.InvalidToken("Bearer Malformed");
                const usersafe = yield repositories_1.AuthRepository.getInstance().validate(token);
                if (!res.locals)
                    res.locals = {};
                res.locals.identity = usersafe;
            }
            catch (e) {
                res.locals.identity = null;
            }
            next();
            return;
        });
    }
}
exports.default = AuthMiddleware;
