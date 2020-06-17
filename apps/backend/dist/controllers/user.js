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
const errors_1 = require("../errors");
class UserController extends base_1.ManagerController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, params } = req;
                const identifier = lodash_1.default.get(params, "id");
                if (!identifier)
                    throw new errors_1.ParamsError.Missing("Missing user identifier.");
                const userId = yield repositories_1.UserRepository.getInstance().interpretIdOrUsernameToId(identifier);
                if (lodash_1.default.isNil(userId))
                    throw new errors_1.AuthError.UserNotFound("Missing user based on given auth details.");
                const user = yield repositories_1.UserRepository.getInstance().getById(userId, { populate: true });
                if (lodash_1.default.isNil(user))
                    throw new errors_1.AuthError.UserNotFound("Missing user.");
                const result = {
                    message: "Found",
                    userId,
                    isSelf: lodash_1.default.toString(lodash_1.default.get(res, "locals.identity.user")) === lodash_1.default.toString(userId),
                    user: models_1.toUserDTO(user, { usernames: true, images: true }),
                };
                if (!lodash_1.default.isNil(query)) {
                    if (lodash_1.default.has(query, "skills")) {
                        const skills = yield repositories_1.SkillRepository.getInstance().listDistinctByUserId(userId);
                        result.skills = skills ? skills.map(skill => models_1.toSkillDTO(skill)) : [];
                    }
                    if (lodash_1.default.has(query, "categories")) {
                        const categories = yield repositories_1.CategoryRepository.getInstance().listDistinctByUserId(userId);
                        result.categories = categories ? categories.map(category => models_1.toCategoryDTO(category)) : [];
                    }
                }
                res.status(constants_1.HTTP_CODE.OK);
                res.json(result);
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = lodash_1.default.get(res, "locals.identity.user");
                if (!userId)
                    throw new errors_1.ParamsError.Missing("Missing user identifier.");
                const { body, file } = req;
                body.userId = res.locals.identity.user;
                body.picture = file;
                const holder = (yield repositories_1.UserRepository.getInstance().update(userId, body)) || {};
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Updated", _id: holder._id, user: models_1.toUserDTO(holder) });
            }
            catch (e) {
                console.error(e);
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static listSkillsAndCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const identifier = lodash_1.default.get(req, "params.id");
                if (!identifier)
                    throw new errors_1.ParamsError.Missing("Missing user identifier.");
                const userId = yield repositories_1.UserRepository.getInstance().interpretIdOrUsernameToId(identifier);
                if (lodash_1.default.isNil(userId))
                    throw new errors_1.AuthError.UserNotFound("Missing user based on given auth details.");
                const skills = yield repositories_1.SkillRepository.getInstance().listDistinctByUserId(userId);
                const categories = yield repositories_1.CategoryRepository.getInstance().listDistinctByUserId(userId);
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Found",
                    userId,
                    categories: categories.map(category => models_1.toCategoryDTO(category)),
                    skills: skills.map(skill => models_1.toSkillDTO(skill)),
                });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
}
exports.default = UserController;
