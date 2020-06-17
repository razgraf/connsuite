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
const randomstring_1 = __importDefault(require("randomstring"));
const base_1 = __importDefault(require("./base"));
const errors_1 = require("../errors");
const models_1 = require("../models");
const constants_1 = require("../constants");
class UsersafeRepository extends base_1.default {
    static getInstance() {
        return UsersafeRepository.instance || (UsersafeRepository.instance = new UsersafeRepository());
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.UsersafeModel.findOne({ _id: id });
        });
    }
    create(user, agent = constants_1.defaults.agent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(user))
                throw new errors_1.UsersafeError.Failed();
            const usersafe = yield models_1.UsersafeModel.create({
                agent,
                user,
                safe: randomstring_1.default.generate(),
            });
            if (!usersafe)
                throw new errors_1.UsersafeError.Failed();
            return usersafe;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UsersafeModel.findByIdAndUpdate(id, payload || {}, { new: true });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UsersafeModel.findByIdAndRemove(id);
        });
    }
    list(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UsersafeModel.find(filters) || [];
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    getByUserAndSafe(usersafe) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UsersafeModel.findOne({ user: usersafe.user, safe: usersafe.safe });
        });
    }
    listByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list({ user }) || [];
        });
    }
    removeByUserAndSafe(usersafe) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UsersafeModel.findOneAndDelete({
                user: usersafe.user,
                safe: usersafe.safe,
            });
        });
    }
}
exports.default = UsersafeRepository;
