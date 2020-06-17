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
const article_1 = __importDefault(require("./article"));
const errors_1 = require("../errors");
const models_1 = require("../models");
class CategoryRepository extends base_1.default {
    static getInstance() {
        return CategoryRepository.instance || (CategoryRepository.instance = new CategoryRepository());
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.CategoryModel.findOne({ _id: id });
        });
    }
    create(payload, options = { admin: false }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                throw new errors_1.ParamsError.Missing("No payload provided.");
            if (!lodash_1.default.get(payload, "userId"))
                throw new errors_1.ParamsError.Missing("No creator provided. Missing user id.");
            if (!lodash_1.default.get(payload, "articleId"))
                throw new errors_1.ParamsError.Missing("No purpose provided. Missing article id.");
            if (!lodash_1.default.get(payload, "title"))
                throw new errors_1.ParamsError.Missing("Missing title.");
            const holder = {
                title: payload.title,
                user: new mongodb_1.ObjectId(payload.userId),
                article: new mongodb_1.ObjectId(payload.articleId),
                isDefault: options && options.admin ? payload.isDefault || false : false,
            };
            const category = (yield models_1.CategoryModel.create(holder));
            if (!category)
                throw new errors_1.CategoryError.Failed("Category couldn't be created.");
            yield this._bindToArticle(category);
            return category;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.CategoryModel.findByIdAndUpdate(id, payload, { new: true });
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.CategoryModel.findOneAndRemove({ _id: id, isDefault: false });
        });
    }
    list(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield models_1.CategoryModel.find(filters)) || [];
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    updateByUser(categoryId, userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.CategoryModel.findOneAndUpdate({ _id: categoryId, _user: userId }, payload);
        });
    }
    removeAllWithArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.CategoryModel.deleteMany({ article: new mongodb_1.ObjectId(articleId), isDefault: false });
        });
    }
    removeSafelyFromArticle(categoryId, articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = (yield this.getByFilters({ _id: categoryId, user: userId, article: articleId }));
                if (!category)
                    throw new Error("Unknown category or unauthorized");
                yield this._removeArticleBond(category);
                yield this.remove(categoryId);
            }
            catch (error) {
                console.error(error);
                throw new errors_1.CategoryError.NotFound("Couldn't find a category to remove or access is forbidden for this user-network pair.");
            }
        });
    }
    getByFilters(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.CategoryModel.findOne(filters);
        });
    }
    listDistinctByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = yield models_1.ArticleModel.find({ user: new mongodb_1.ObjectId(userId) }).distinct("categories");
            if (lodash_1.default.isNil(ids) || !ids.length)
                return [];
            return models_1.CategoryModel.find({ _id: { $in: ids } });
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _removeArticleBond(category) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.default.isNil(category.article)) {
                article_1.default.getInstance().removeCategory(String(category.article), String(category._id));
            }
        });
    }
    _bindToArticle(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield article_1.default.getInstance().addCategory(String(category.article), String(category._id));
        });
    }
}
exports.default = CategoryRepository;
