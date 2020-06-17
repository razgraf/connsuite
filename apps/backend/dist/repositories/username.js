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
const base_1 = __importDefault(require("./base"));
const user_1 = __importDefault(require("./user"));
const errors_1 = require("../errors");
const models_1 = require("../models");
class UsernameRepository extends base_1.default {
    static getInstance() {
        return UsernameRepository.instance || (UsernameRepository.instance = new UsernameRepository());
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.UsernameModel.findOne({ _id: id });
        });
    }
    create(payload, options = { alter: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload) || !lodash_1.default.get(payload, "user"))
                throw new errors_1.ParamsError.Missing(JSON.stringify(payload));
            const username = yield this._create(payload, options);
            yield this._bind(username);
            return username;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UsernameModel.findByIdAndUpdate(id, payload, { new: true });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.UsernameModel.findByIdAndRemove(id);
        });
    }
    list(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield models_1.UsernameModel.find(filters)) || [];
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    getByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.UsernameModel.findOne({ value });
        });
    }
    listByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield models_1.UsernameModel.find({ user })) || [];
        });
    }
    generateFromName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(name))
                return null;
            const [first, last] = [lodash_1.default.get(name, "first"), lodash_1.default.get(name, "last")];
            if (lodash_1.default.isNil(first) || lodash_1.default.isNil(last))
                return null;
            const username = first.toLowerCase() + last.toLowerCase();
            return username && username.length > 0 ? username : null;
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _create(payload, options = { alter: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = payload;
            let counter = 0;
            let isUnique = lodash_1.default.isNil(yield this.getByValue(value));
            if (!options.alter && !isUnique)
                throw new errors_1.ParamsError.Conflict(value);
            if (!isUnique)
                do {
                    counter += 1;
                    if (counter === 500)
                        throw new errors_1.UsernameError.Failed("Please contact support.");
                    isUnique = lodash_1.default.isNil(yield this.getByValue(value + String(counter)));
                } while (!isUnique);
            const username = yield models_1.UsernameModel.create(Object.assign(Object.assign({}, payload), { value: counter === 0 ? value : value + String(counter) }));
            if (!username)
                throw new errors_1.UsernameError.Failed("Username couldn't be created.");
            return username;
        });
    }
    _bind(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.getInstance().addUsername(String(username.user), String(username._id));
        });
    }
}
exports.default = UsernameRepository;
