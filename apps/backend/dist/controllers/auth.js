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
const base_1 = require("./base");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const models_1 = require("../models");
const utils_1 = require("../utils");
const errors_1 = require("../errors");
class AuthController extends base_1.ManagerController {
    static google(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                body.agent = utils_1.getUserAgent(req);
                const { user, token } = yield repositories_1.AuthRepository.getInstance().google(body);
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Authenthicated and Authorized",
                    user: models_1.toUserDTO(user, { usernames: true, images: true }),
                    token,
                });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                body.agent = utils_1.getUserAgent(req);
                const { user, token } = yield repositories_1.AuthRepository.getInstance().login(body);
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Authenthicated and Authorized",
                    user: models_1.toUserDTO(user, { usernames: true, images: true }),
                    token,
                });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                body.agent = utils_1.getUserAgent(req);
                const { user, token } = yield repositories_1.AuthRepository.getInstance().register(body);
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Created, Authenthicated and Authorized",
                    user: models_1.toUserDTO(user, { usernames: true, images: true }),
                    token,
                });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield repositories_1.AuthRepository.getInstance().logout(res.locals);
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Disconnected" });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static status(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield repositories_1.UserRepository.getInstance().getById(res.locals.identity.user, { populate: true });
                if (!user)
                    throw new errors_1.AuthError.UserNotFound("Error when searching for user.");
                const { query } = req;
                const elite = lodash_1.default.get(query, "tier")
                    ? lodash_1.default.attempt(() => {
                        if (!lodash_1.default.get(user, "tier"))
                            return false;
                        const uTier = lodash_1.default.toNumber(lodash_1.default.get(user, "tier"));
                        const qTier = lodash_1.default.toNumber(lodash_1.default.get(query, "tier"));
                        if (lodash_1.default.isNaN(uTier) || lodash_1.default.isNaN(qTier))
                            return false;
                        return qTier <= uTier;
                    })
                    : undefined;
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Validated", user: models_1.toUserDTO(user, { usernames: true, images: true }), elite });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
}
exports.default = AuthController;
