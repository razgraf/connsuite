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
class ArticleController extends base_1.default {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = lodash_1.default.get(req, "params.id");
                if (!id)
                    throw new errors_1.ParamsError.Missing("Missing article identifier.");
                const populate = !lodash_1.default.has(req, "query.minimal");
                const options = {
                    populate,
                    hideUser: true,
                };
                const article = utils_1.isShortId(id)
                    ? yield repositories_1.ArticleRepository.getInstance().getByFilters({ shortId: String(id) }, options)
                    : yield repositories_1.ArticleRepository.getInstance().getById(id, options);
                if (!article)
                    throw new errors_1.ArticleError.NotFound("The identifier doesn't match any article.");
                const user = (yield repositories_1.UserRepository.getInstance().getById(String(article.user), {
                    populate: true,
                }));
                if (!user)
                    throw new errors_1.ArticleError.NotFound("The owner is not available.");
                res.status(constants_1.HTTP_CODE.OK);
                res.json({
                    message: "Found",
                    article: Object.assign(Object.assign({}, models_1.toArticleDTO(article, {
                        categories: true,
                        skills: true,
                        images: true,
                        content: true,
                        user: true,
                    })), { user: models_1.toUserDTO(user, { usernames: true, images: true }) }),
                    isSelf: utils_1.isSelf(article, res),
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
                body.userId = res.locals.identity.user;
                body.cover = file;
                const holder = (yield repositories_1.ArticleRepository.getInstance().create(body)) || {};
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
                const articleId = lodash_1.default.get(req, "params.id");
                if (!articleId)
                    throw new errors_1.ParamsError.Missing("Missing article identifier.");
                const { body, file } = req;
                body.userId = res.locals.identity.user;
                body.cover = file;
                const holder = (yield repositories_1.ArticleRepository.getInstance().update(articleId, body)) || {};
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
                const articleId = lodash_1.default.get(req, "params.id");
                const userId = res.locals.identity.user;
                if (!articleId)
                    throw new errors_1.ParamsError.Missing("Missing article identifier.");
                yield repositories_1.ArticleRepository.getInstance().removeFromUser(articleId, userId);
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
                const articles = yield repositories_1.ArticleRepository.getInstance().list({ user: new mongodb_1.ObjectId(userId) }, {
                    populate: true,
                    hideUser: true,
                    hideContent: true,
                    limit: lodash_1.default.get(query, "limit"),
                    offset: lodash_1.default.get(query, "offset"),
                });
                if (lodash_1.default.isNil(articles))
                    throw new errors_1.ArticleError.NotFound("Issue when searching articles for this individual.");
                res.status(constants_1.HTTP_CODE.OK);
                res.json({ message: "Found", articles: articles.map(network => models_1.toArticleDTO(network)) });
            }
            catch (e) {
                res.status(e.code || constants_1.HTTP_CODE.BAD_REQUEST);
                res.json({ message: e.message });
            }
        });
    }
}
exports.default = ArticleController;
