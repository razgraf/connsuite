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
const mongodb_1 = require("mongodb");
const base_1 = __importDefault(require("./base"));
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const models_1 = require("../models");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
class NetworkController extends base_1.default {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = lodash_1.default.get(req, "params.id");
                if (!id)
                    throw new errors_1.ParamsError.Missing("Missing network identifier.");
                const populate = !lodash_1.default.has(req, "query.minimal");
                const network = utils_1.isShortId(id)
                    ? yield repositories_1.NetworkRepository.getInstance().getByFilters({ shortId: String(id) }, { populate })
                    : yield repositories_1.NetworkRepository.getInstance().getById(id, { populate });
                if (!network)
                    throw new errors_1.NetworkError.NotFound("The identifier doesn't match any network.");
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Found",
                    network: models_1.toNetworkDTO(network),
                    isSelf: utils_1.isSelf({ user: { _id: network.user } }, res),
                });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body, file } = req;
                body.user = res.locals.identity.user;
                body.icon = file;
                const holder = (yield repositories_1.NetworkRepository.getInstance().create(body)) || {};
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Created", _id: holder._id });
            }
            catch (e) {
                console.error(e);
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const networkId = lodash_1.default.get(req, "params.id");
                if (!networkId)
                    throw new errors_1.ParamsError.Missing("Missing network identifier.");
                const { body, file } = req;
                body.user = res.locals.identity.user;
                body.icon = file;
                const holder = (yield repositories_1.NetworkRepository.getInstance().update(networkId, body)) || {};
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Updated", _id: holder._id });
            }
            catch (e) {
                console.error(e);
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const networkId = lodash_1.default.get(req, "params.id");
                const userId = res.locals.identity.user;
                if (!networkId)
                    throw new errors_1.ParamsError.Missing("Missing network identifier.");
                yield repositories_1.NetworkRepository.getInstance().removeFromUser(networkId, userId);
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Removed" });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    /** Any user can list another user's networks */
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req;
                if (lodash_1.default.isNil(query))
                    throw new errors_1.ParamsError.Missing("Insuficient listing payload.");
                const userId = yield repositories_1.UserRepository.getInstance().interpretIdentifierToId(query);
                if (lodash_1.default.isNil(userId))
                    throw new errors_1.AuthError.UserNotFound("Missing user based on given auth details.");
                const networks = yield repositories_1.NetworkRepository.getInstance().list({ user: new mongodb_1.ObjectId(userId) }, {
                    populate: true,
                    limit: lodash_1.default.get(query, "limit"),
                    offset: lodash_1.default.get(query, "offset"),
                });
                if (lodash_1.default.isNil(networks))
                    throw new errors_1.NetworkError.NotFound("Issue when searching networks for this individual.");
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Found", networks: networks.map(network => models_1.toNetworkDTO(network)) });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static listExternal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Supported external networks.",
                    networks: Object.values(constants_1.networks).map(item => models_1.toNetworkDTO(Object.assign(Object.assign({}, item), { externalId: String(item._id) }))),
                });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
    static admin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const seedSkills: () => void = () => {
                //   const skills: string[] = ["React", "Node", "Next.js", "Php", "MongoDb", "MySQL", "Javascript", "React Native"];
                //   skills.forEach(title => SkillModel.create({ title, isDefault: true }));
                // };
                // seedSkills();
                // const seedCategories: () => void = () => {
                //   const categories: string[] = [
                //     "Design",
                //     "Development",
                //     "Marketing",
                //     "Business",
                //     "Social Media",
                //     "Sales",
                //     "Engineering",
                //     "Economics",
                //   ];
                //   categories.forEach(title => CategoryModel.create({ title, isDefault: true }));
                // };
                // seedCategories();
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Doing admin stuff" });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
}
exports.default = NetworkController;
