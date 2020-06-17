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
const cryptr_1 = __importDefault(require("cryptr"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersafe_1 = __importDefault(require("./usersafe"));
const base_1 = require("./base");
const errors_1 = require("../errors");
const constants_1 = require("../constants");
class TokenRepository extends base_1.ManagerRepository {
    static getInstance() {
        return TokenRepository.instance || (TokenRepository.instance = new TokenRepository());
    }
    generateToken(user, agent = constants_1.defaults.agent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(user) || lodash_1.default.isNil(user._id))
                throw new errors_1.AuthError.InvalidToken("User");
            const usersafe = yield usersafe_1.default.getInstance().create(user, agent);
            const encrypted = yield this._encryptToken(String(user._id), usersafe.safe);
            return encrypted;
        });
    }
    decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decrypted = yield this._decryptToken(token);
            try {
                const payload = jsonwebtoken_1.default.decode(decrypted);
                return payload;
            }
            catch (e) {
                console.error(e);
            }
            return null;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decrypted = yield this._decryptToken(token);
            try {
                const payload = jsonwebtoken_1.default.verify(decrypted, process.env.CONN_BACK_JWT_SECRET || "");
                if (lodash_1.default.isNil(payload) || !lodash_1.default.get(payload, "userId") || !lodash_1.default.get(payload, "safe"))
                    throw new errors_1.AuthError.InvalidToken("Missing correct payload");
                return payload;
            }
            catch (e) {
                if (e)
                    throw new errors_1.AuthError.InvalidToken(e.message);
            }
            return null;
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _encryptToken(userId, safe) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(process.env.CONN_BACK_JWT_SECRET) || lodash_1.default.isNil(process.env.CONN_BACK_ENCRYPTION_SECRET))
                throw new errors_1.AuthError.InvalidToken();
            const payload = { userId, safe };
            const engine = new cryptr_1.default(process.env.CONN_BACK_ENCRYPTION_SECRET);
            const data = jsonwebtoken_1.default.sign(payload, process.env.CONN_BACK_JWT_SECRET);
            const encrypted = engine.encrypt(data);
            return encrypted;
        });
    }
    _decryptToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(process.env.CONN_BACK_JWT_SECRET) || lodash_1.default.isNil(process.env.CONN_BACK_ENCRYPTION_SECRET))
                throw new errors_1.AuthError.InvalidToken();
            const engine = new cryptr_1.default(process.env.CONN_BACK_ENCRYPTION_SECRET);
            const decrypted = engine.decrypt(token);
            return decrypted;
        });
    }
}
exports.default = TokenRepository;
