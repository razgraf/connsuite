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
const vendors_1 = require("../vendors");
class AuthMiddleware {
    static bearer(req, res, next, isFriendly = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorization = lodash_1.default.get(req, "headers.authorization");
                if (!authorization)
                    throw new errors_1.AuthError.InvalidToken("Bearer Missing");
                const token = (authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1]) || "";
                if (!token || !token.length)
                    throw new errors_1.AuthError.InvalidToken("Bearer Malformed");
                const identity = yield vendors_1.connsuite.getAuthorizedIdentity(lodash_1.default.get(req, "headers.authorization"), true);
                if (lodash_1.default.isNil(identity))
                    throw new errors_1.AuthError.Forbidden("Access not authorized");
                if (lodash_1.default.get(identity, "elite") !== true)
                    throw new errors_1.AuthError.Locked("Access is locked due to missing user priviledges. Higher tier required.");
                if (!res.locals)
                    res.locals = {};
                res.locals.identity = {
                    user: lodash_1.default.get(identity, "user._id"),
                };
                if (!isFriendly)
                    next();
                return;
            }
            catch (e) {
                if (!isFriendly) {
                    res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                    res.json({ message: e.message });
                }
            }
        });
    }
    static bearerFriendly(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield AuthMiddleware.bearer(req, res, next, true);
            }
            catch (e) {
                console.error(e);
                res.locals.identity = null;
            }
            finally {
                next();
            }
        });
    }
}
exports.default = AuthMiddleware;
