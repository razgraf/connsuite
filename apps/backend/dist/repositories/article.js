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
const connsuite_guards_1 = __importDefault(require("@razgraf/connsuite-guards"));
const mongodb_1 = require("mongodb");
const typegoose_1 = require("@typegoose/typegoose");
const base_1 = __importDefault(require("./base"));
const category_1 = __importDefault(require("./category"));
const skill_1 = __importDefault(require("./skill"));
const image_1 = __importDefault(require("./image"));
const user_1 = __importDefault(require("./user"));
const errors_1 = require("../errors");
const models_1 = require("../models");
class ArticleRepository extends base_1.default {
    static getInstance() {
        return ArticleRepository.instance || (ArticleRepository.instance = new ArticleRepository());
    }
    getById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return (models_1.ArticleModel.findById(id, this._projectByOptions(options)).populate(this._populateByOptions(options)) || []);
            return models_1.ArticleModel.findById(id, this._projectByOptions(options));
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                throw new errors_1.ParamsError.Missing("No payload provided.");
            if (!lodash_1.default.get(payload, "userId"))
                throw new errors_1.ParamsError.Missing("No creator provided. Missing user id.");
            if (!lodash_1.default.get(payload, "type"))
                throw new errors_1.ParamsError.Missing("Missing Type");
            if (payload.type === models_1.ArticleType.Internal) {
                yield this._internalGuards(payload, "create");
                return this._createInternal(payload);
            }
            else if (payload.type === models_1.ArticleType.External) {
                yield this._externalGuards(payload, "create");
                return this._createExternal(payload);
            }
            else
                throw new errors_1.ParamsError.Invalid("Article type not supported.");
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.default.isNil(payload))
                throw new errors_1.ParamsError.Missing("No payload provided.");
            if (!lodash_1.default.get(payload, "userId"))
                throw new errors_1.ParamsError.Missing("No creator provided. Missing user id.");
            if (!lodash_1.default.get(payload, "type"))
                throw new errors_1.ParamsError.Missing("Missing Type");
            const holder = yield this.getByFilters({ _id: id, user: payload.userId }, { populate: true });
            if (!holder)
                throw new errors_1.ArticleError.NotFound("Unknown article or access not granted.");
            payload.type = holder.type;
            holder.userId = payload.userId;
            if (payload.type === models_1.ArticleType.Internal) {
                yield this._internalGuards(payload, "update");
                return this._updateInternal(holder, payload);
            }
            else if (payload.type === models_1.ArticleType.External) {
                yield this._externalGuards(payload, "update");
                return this._updateExternal(holder, payload);
            }
            throw new errors_1.ParamsError.Invalid("Article type not supported.");
        });
    }
    /**
     *
     * @param {string} id - the id of the soon to be removed article
     * Use this iteration of remove() only by admin demand. For user demands, use @method removeFromUser() as it checks for ownership
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.ArticleModel.findByIdAndRemove(id);
        });
    }
    list(filters, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return (models_1.ArticleModel.find(filters, this._projectByOptions(options), this._formatByOptions(options)).populate(this._populateByOptions(options)) || []);
            return models_1.ArticleModel.find(filters, this._projectByOptions(options || {}), this._formatByOptions(options)) || [];
        });
    }
    /**
     *
     *
     * Specific Public Methods
     *
     *
     */
    removeFromUser(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield this.getByFilters({ _id: articleId, user: userId }, { populate: true });
                if (!article)
                    throw new Error("Unknown article");
                this._removeImages(article);
                this._removeUserBond(articleId, userId);
                this._removeSkills(articleId);
                this._removeCategories(articleId);
                yield this.remove(articleId);
            }
            catch (error) {
                console.error(error);
                throw new errors_1.ArticleError.NotFound("Couldn't find network to remove or access is forbidden for this user-network pair.");
            }
        });
    }
    getByFilters(filters, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options && options.populate)
                return (models_1.ArticleModel.findOne(filters, this._projectByOptions(options)).populate(this._populateByOptions(options)) || []);
            return models_1.ArticleModel.findOne(filters, this._projectByOptions(options));
        });
    }
    bindImage(articleId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.ArticleModel.findByIdAndUpdate(articleId, payload);
        });
    }
    addSkill(articleId, skillId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.ArticleModel.findByIdAndUpdate(articleId, { $push: { skills: new mongodb_1.ObjectId(skillId) } }, { upsert: true });
        });
    }
    removeSkill(articleId, skillId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.ArticleModel.findByIdAndUpdate(articleId, { $pull: { skills: new mongodb_1.ObjectId(skillId) } });
        });
    }
    addCategory(articleId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.ArticleModel.findByIdAndUpdate(articleId, { $push: { categories: new mongodb_1.ObjectId(categoryId) } }, { upsert: true });
        });
    }
    removeCategory(articleId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield models_1.ArticleModel.findByIdAndUpdate(articleId, { $pull: { categories: new mongodb_1.ObjectId(categoryId) } });
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods
     *
     *
     */
    _bind(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.getInstance().addArticle(articleId, userId);
        });
    }
    _removeUserBond(articleId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.getInstance().removeArticle(articleId, userId);
        });
    }
    _populateByOptions(options) {
        const population = [];
        if (lodash_1.default.isNil(options) || !lodash_1.default.get(options, "populate"))
            return population;
        if (!options.hideUser)
            population.push({ path: "user", model: "User" });
        if (!options.hideImages)
            population.push({ path: "cover", model: "Image" }, { path: "thumbnail", model: "Image" });
        if (!options.hideSkills)
            population.push({ path: "skills", model: "Skill" });
        if (!options.hideCategories)
            population.push({ path: "categories", model: "Category" });
        return population;
    }
    _projectByOptions(options) {
        const projection = {};
        if (lodash_1.default.isNil(options))
            return projection;
        if (options.hideContent)
            projection.content = false;
        return projection;
    }
    _formatByOptions(options) {
        const format = { sort: { createdAt: -1 } };
        if (lodash_1.default.isNil(options))
            return format;
        if (!lodash_1.default.isNil(options.limit)) {
            const limit = lodash_1.default.attempt(() => lodash_1.default.toNumber(options.limit));
            if (!lodash_1.default.isError(limit))
                format.limit = limit;
        }
        if (!lodash_1.default.isNil(options.offset)) {
            const offset = lodash_1.default.attempt(() => lodash_1.default.toNumber(options.offset));
            if (!lodash_1.default.isError(offset))
                format.offset = offset;
        }
        return format;
    }
    _generateImages(source, article) {
        return __awaiter(this, void 0, void 0, function* () {
            const specimen = {
                parent: models_1.ImageParent.Article,
                purpose: models_1.ImagePurpose.Cover,
                article,
                type: source.mimetype,
            };
            yield image_1.default.getInstance().save(source, specimen);
            yield image_1.default.getInstance().save(source, Object.assign(Object.assign({}, specimen), { purpose: models_1.ImagePurpose.Thumbnail }));
        });
    }
    _bindSkills(source, article) {
        return __awaiter(this, void 0, void 0, function* () {
            /**  Clear the existing list of skills */
            yield skill_1.default.getInstance().removeAllWithArticle(String(article._id));
            /**  Format the input */
            const list = lodash_1.default.isString(source) ? lodash_1.default.attempt(() => JSON.parse(source)) : source;
            if (lodash_1.default.isError(list) || list.length === 0)
                return;
            const existing = list
                .filter((item) => !lodash_1.default.isNil(item._id))
                .map((item) => new mongodb_1.ObjectId(item._id));
            yield models_1.ArticleModel.findByIdAndUpdate(article._id, { skills: existing });
            const proposed = list.filter((item) => (!lodash_1.default.has(item, "_id") || lodash_1.default.isNil(item._id)) && !lodash_1.default.isNil(item.title));
            proposed.forEach((skill) => {
                try {
                    skill_1.default.getInstance().create({
                        title: skill.title,
                        userId: article.userId,
                        articleId: article._id,
                    });
                }
                catch (e) {
                    console.error(e);
                }
            });
        });
    }
    _bindCategories(source, article) {
        return __awaiter(this, void 0, void 0, function* () {
            /**  Clear the existing list of categories */
            yield category_1.default.getInstance().removeAllWithArticle(String(article._id));
            /**  Format the input */
            const list = lodash_1.default.isString(source) ? lodash_1.default.attempt(() => JSON.parse(source)) : source;
            if (lodash_1.default.isError(list) || list.length === 0)
                return;
            const existing = list
                .filter((item) => !lodash_1.default.isNil(item._id))
                .map((item) => new mongodb_1.ObjectId(item._id));
            yield models_1.ArticleModel.findByIdAndUpdate(article._id, { categories: existing });
            const proposed = list.filter((item) => (!lodash_1.default.has(item, "_id") || lodash_1.default.isNil(item._id)) && !lodash_1.default.isNil(item.title));
            proposed.forEach((category) => {
                try {
                    category_1.default.getInstance().create({
                        title: category.title,
                        userId: article.userId,
                        articleId: article._id,
                    });
                }
                catch (e) {
                    console.error(e);
                }
            });
        });
    }
    _generateSummary(content) {
        if (content)
            return "ConnSuite Article";
        return "ConnSuite Article"; // TODO
    }
    _removeImages(article) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (article.type === models_1.ArticleType.Internal) {
                    if (!lodash_1.default.isNil(article.cover) && typegoose_1.isDocument(article.cover)) {
                        yield image_1.default.getInstance().remove(article.cover._id);
                        image_1.default.getInstance().unlink(article.cover);
                    }
                    if (!lodash_1.default.isNil(article.thumbnail) && typegoose_1.isDocument(article.thumbnail)) {
                        yield image_1.default.getInstance().remove(article.thumbnail._id);
                        image_1.default.getInstance().unlink(article.thumbnail);
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    /**
     *
     * @param {Article} article
     * Remove any custom skills that were created for this article
     */
    _removeSkills(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield skill_1.default.getInstance().removeAllWithArticle(articleId);
        });
    }
    /**
     *
     * @param {Article} article
     * Remove any custom categories that were created for this article
     */
    _removeCategories(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield category_1.default.getInstance().removeAllWithArticle(articleId);
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods: Update
     *
     *
     */
    _updateInternal(holder, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield models_1.ArticleModel.findByIdAndUpdate(holder._id, {
                title: payload.title,
                content: payload.content,
                summary: this._generateSummary(payload.content),
                skills: [],
                categories: [],
            });
            yield this._bindSkills(payload.skills, holder);
            yield this._bindCategories(payload.categories, holder);
            if (!lodash_1.default.isNil(payload.cover)) {
                yield this._removeImages(holder);
                yield this._generateImages(payload.cover, holder);
            }
            return article;
        });
    }
    _updateExternal(holder, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield models_1.ArticleModel.findByIdAndUpdate(holder._id, {
                title: payload.title,
                url: payload.url,
                skills: [],
            });
            yield this._bindSkills(payload.skills, holder);
            yield this._bindCategories(payload.categories, holder);
            if (!lodash_1.default.isNil(payload.cover)) {
                yield this._removeImages(holder);
                yield this._generateImages(payload.cover, holder);
            }
            return article;
        });
    }
    /**
     *
     *
     * Specific Private - Utility Methods: Create & Create/Update Guards
     *
     *
     */
    _createInternal(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const specimen = {
                type: models_1.ArticleType.Internal,
                title: payload.title,
                user: new mongodb_1.ObjectId(payload.userId),
                content: payload.content,
                summary: this._generateSummary(payload.content),
                skills: [],
                categories: [],
            };
            const article = yield models_1.ArticleModel.create(specimen);
            if (!article)
                throw new errors_1.ArticleError.Failed("Article couldn't be created.");
            article.userId = String(article.user);
            this._bind(String(article._id), article.userId);
            yield this._generateImages(payload.cover, article);
            yield this._bindSkills(payload.skills, article);
            yield this._bindCategories(payload.categories, article);
            return article;
        });
    }
    _createExternal(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const specimen = {
                type: models_1.ArticleType.External,
                title: payload.title,
                url: payload.url,
                user: new mongodb_1.ObjectId(payload.userId),
                skills: [],
                categories: [],
            };
            const article = yield models_1.ArticleModel.create(specimen);
            if (!article)
                throw new errors_1.ArticleError.Failed("Article couldn't be created.");
            article.userId = String(article.user);
            this._bind(String(article._id), article.userId);
            yield this._generateImages(payload.cover, article);
            yield this._bindSkills(payload.skills, article);
            yield this._bindCategories(payload.categories, article);
            return article;
        });
    }
    _internalGuards(payload, type = "create") {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "create" || (type === "update" && !lodash_1.default.isNil(payload.cover))) {
                if (!lodash_1.default.get(payload, "cover"))
                    throw new errors_1.ParamsError.Missing("Missing cover or wrong cover size & type.");
                const coverGuard = connsuite_guards_1.default.isArticleCoverAcceptable(lodash_1.default.get(payload, "cover"), true, { vendor: "multer" });
                if (coverGuard !== true)
                    throw new errors_1.ParamsError.Invalid(coverGuard);
            }
            if (!lodash_1.default.get(payload, "title"))
                throw new errors_1.ParamsError.Missing("Missing Title");
            const titleGuard = connsuite_guards_1.default.isArticleTitleAcceptable(payload.title, true);
            if (titleGuard !== true)
                throw new errors_1.ParamsError.Invalid(titleGuard);
            if (!lodash_1.default.get(payload, "skills"))
                throw new errors_1.ParamsError.Missing("Missing Skills");
            const skillsGuard = connsuite_guards_1.default.isArticleSkillListAcceptable(payload.skills, true, true);
            if (skillsGuard !== true)
                throw new errors_1.ParamsError.Invalid(skillsGuard);
            if (!lodash_1.default.get(payload, "categories"))
                throw new errors_1.ParamsError.Missing("Missing Categories");
            const categoriesGuard = connsuite_guards_1.default.isArticleCategoryListAcceptable(payload.categories, true, true);
            if (categoriesGuard !== true)
                throw new errors_1.ParamsError.Invalid(categoriesGuard);
            if (!lodash_1.default.get(payload, "content"))
                throw new errors_1.ParamsError.Missing("Missing Content");
            const contentGuard = connsuite_guards_1.default.isArticleContentAcceptable(payload.content, true, true);
            if (contentGuard !== true)
                throw new errors_1.ParamsError.Invalid(contentGuard);
        });
    }
    _externalGuards(payload, type = "create") {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "create" || (type === "update" && !lodash_1.default.isNil(payload.cover))) {
                if (!lodash_1.default.get(payload, "cover"))
                    throw new errors_1.ParamsError.Missing("Missing cover or wrong cover size & type.");
                const coverGuard = connsuite_guards_1.default.isArticleCoverAcceptable(lodash_1.default.get(payload, "cover"), true, { vendor: "multer" });
                if (coverGuard !== true)
                    throw new errors_1.ParamsError.Invalid(coverGuard);
            }
            if (!lodash_1.default.get(payload, "title"))
                throw new errors_1.ParamsError.Missing("Missing Title");
            const titleGuard = connsuite_guards_1.default.isArticleTitleAcceptable(payload.title, true);
            if (titleGuard !== true)
                throw new errors_1.ParamsError.Invalid(titleGuard);
            if (!lodash_1.default.get(payload, "url"))
                throw new errors_1.ParamsError.Missing("Missing Url");
            const urlGuard = connsuite_guards_1.default.isArticleUrlAcceptable(payload.url, true);
            if (urlGuard !== true)
                throw new errors_1.ParamsError.Invalid(urlGuard);
            if (!lodash_1.default.get(payload, "skills"))
                throw new errors_1.ParamsError.Missing("Missing Skills");
            const skillsGuard = connsuite_guards_1.default.isArticleSkillListAcceptable(payload.skills, true, true);
            if (skillsGuard !== true)
                throw new errors_1.ParamsError.Invalid(skillsGuard);
            if (!lodash_1.default.get(payload, "categories"))
                throw new errors_1.ParamsError.Missing("Missing Categories");
            const categoriesGuard = connsuite_guards_1.default.isArticleCategoryListAcceptable(payload.categories, true, true);
            if (categoriesGuard !== true)
                throw new errors_1.ParamsError.Invalid(categoriesGuard);
        });
    }
}
exports.default = ArticleRepository;
