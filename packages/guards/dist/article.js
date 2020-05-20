"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.policy = void 0;
/* eslint-disable @typescript-eslint/camelcase */ /* -- validator {require_protocol} -- */
const lodash_1 = __importDefault(require("lodash"));
const validator_1 = __importDefault(require("validator"));
const atoms_1 = require("./atoms");
exports.policy = {
    root: "Articles must be valid",
    title: {
        root: `Titles must contain between ${atoms_1.limits.MIN_ARTICLE_TITLE_LENGTH} and ${atoms_1.limits.MAX_ARTICLE_TITLE_LENGTH} characters.`,
        1: `Please use between ${atoms_1.limits.MIN_ARTICLE_TITLE_LENGTH} and ${atoms_1.limits.MAX_ARTICLE_TITLE_LENGTH} characters for the title.`,
    },
    cover: {
        root: `Covers must be images (${atoms_1.limits.ALLOWED_ARTICLE_COVER_FORMAT.join(", ")}) and must have a maximum size of ${atoms_1.limits.MAX_ARTICLE_COVER_SIZE / (1024 * 1024)} MB.`,
        1: `Please use files that are images: (${atoms_1.limits.ALLOWED_ARTICLE_COVER_FORMAT.join(", ")}).`,
        2: `Please use files smaller than ${atoms_1.limits.MAX_ARTICLE_COVER_SIZE / (1024 * 1024)} MB.`,
        3: "Please add a file with a valid name.",
    },
    url: {
        root: "Websites and URLs have to contain http:// or https:// and be valid",
        1: "Please add http:// or https:// before your website or url.",
        2: "Please add a valid website or url.",
    },
    skills: {
        root: "You have to use valid skills for your article",
        1: `You can have at most ${atoms_1.limits.MAX_ARTICLE_SKILLS_COUNT} skills per article.`,
        2: `Custom skills should have between ${atoms_1.limits.MIN_ARTICLE_SKILLS_TITLE_LENGTH} and ${atoms_1.limits.MAX_ARTICLE_SKILLS_TITLE_LENGTH} characters`,
    },
    categories: {
        root: "You have to use valid categories for your article",
        1: `You should have between ${atoms_1.limits.MIN_ARTICLE_CATEGORIES_COUNT} and ${atoms_1.limits.MAX_ARTICLE_CATEGORIES_COUNT} categories per article.`,
        2: `Custom categories should have between ${atoms_1.limits.MIN_ARTICLE_CATEGORIES_TITLE_LENGTH} and ${atoms_1.limits.MAX_ARTICLE_CATEGORIES_TITLE_LENGTH} characters`,
    },
    content: {
        root: "You must use valid content for your articles",
        1: `You should have at least one section in your article.`,
    },
};
function isArticleTitleAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    const [min, max] = [
        atoms_1.limits.MIN_ARTICLE_TITLE_LENGTH,
        atoms_1.limits.MAX_ARTICLE_TITLE_LENGTH,
    ];
    if (lodash_1.default.isNil(value) ||
        lodash_1.default.isEmpty(value) ||
        (!lodash_1.default.isString(value) && !lodash_1.default.isNumber(value)))
        return withPolicy ? exports.policy.title[1] : false;
    return value.length >= min && value.length <= max
        ? true
        : withPolicy
            ? exports.policy.title[1]
            : false;
}
function isArticleCoverAcceptable(value, withPolicy = atoms_1.WITH_POLICY, options) {
    if (options && options.vendor === "multer") {
        /** Server Side */
        const name = lodash_1.default.get(value, "originalname");
        const type = lodash_1.default.attempt(() => lodash_1.default.toString(value.mimetype).split("/").pop());
        const size = lodash_1.default.toNumber(lodash_1.default.get(value, "size"));
        if (lodash_1.default.isNil(name) || lodash_1.default.isEmpty(name) || !lodash_1.default.isString(name))
            return withPolicy ? exports.policy.cover[3] : false;
        if (lodash_1.default.isError(type) ||
            !atoms_1.limits.ALLOWED_ARTICLE_COVER_FORMAT.includes(type || ""))
            return withPolicy ? exports.policy.cover[1] : false;
        if (lodash_1.default.isError(size) || size <= 0 || size > atoms_1.limits.MAX_ARTICLE_COVER_SIZE)
            return withPolicy ? exports.policy.cover[2] : false;
        return true;
    }
    else {
        /** Client Side */
        const name = lodash_1.default.get(value, "name");
        const type = lodash_1.default.attempt(() => lodash_1.default.get(value, "type").split("/").pop());
        const size = lodash_1.default.toNumber(lodash_1.default.get(value, "size"));
        if (lodash_1.default.isNil(name) || lodash_1.default.isEmpty(name) || !lodash_1.default.isString(name))
            return withPolicy ? exports.policy.cover[3] : false;
        if (lodash_1.default.isError(type) ||
            !atoms_1.limits.ALLOWED_ARTICLE_COVER_FORMAT.includes(type || ""))
            return withPolicy ? exports.policy.cover[1] : false;
        if (lodash_1.default.isError(size) || size <= 0 || size > atoms_1.limits.MAX_ARTICLE_COVER_SIZE)
            return withPolicy ? exports.policy.cover[2] : false;
        return true;
    }
}
function isArticleUrlAcceptable(value, withPolicy = atoms_1.WITH_POLICY) {
    if (lodash_1.default.isNil(value) || lodash_1.default.isEmpty(value) || !lodash_1.default.isString(value))
        return withPolicy ? exports.policy.url[2] : false;
    if (!(value.startsWith("https://") || value.startsWith("http://")))
        return withPolicy ? exports.policy.url[1] : false;
    return validator_1.default.isURL(value, { require_protocol: true })
        ? true
        : withPolicy
            ? exports.policy.url[2]
            : false;
}
function isArticleContentAcceptable(value, withPolicy = atoms_1.WITH_POLICY, isStringified = false) {
    const sections = isStringified && !lodash_1.default.isNil(value)
        ? lodash_1.default.attempt(() => JSON.parse(value))
        : value;
    if (lodash_1.default.isNil(sections) ||
        !lodash_1.default.isArray(sections) ||
        sections.length < atoms_1.limits.MIN_ARTICLE_SECTION_COUNT)
        return withPolicy ? exports.policy.content[1] : false;
    return true;
}
function isArticleSkillListAcceptable(value, withPolicy = atoms_1.WITH_POLICY, isStringified = false) {
    const list = isStringified && !lodash_1.default.isNil(value)
        ? lodash_1.default.attempt(() => JSON.parse(value))
        : value;
    if (lodash_1.default.isNil(list) || !lodash_1.default.isArray(list))
        return withPolicy ? exports.policy.skills.root : false;
    if (list.length > atoms_1.limits.MAX_ARTICLE_SKILLS_COUNT)
        return withPolicy ? exports.policy.skills[1] : false;
    const [min, max] = [
        atoms_1.limits.MIN_ARTICLE_SKILLS_TITLE_LENGTH,
        atoms_1.limits.MAX_ARTICLE_SKILLS_TITLE_LENGTH,
    ];
    for (let i = 0; i < list.length; i += 1) {
        const skill = list[i];
        if (!lodash_1.default.has(skill, "_id") && !lodash_1.default.has(skill, "title"))
            return withPolicy ? exports.policy.skills[2] : false;
        if (lodash_1.default.has(skill, "_id") && !lodash_1.default.get(skill, "_id"))
            return withPolicy ? exports.policy.skills[2] : false;
        if (lodash_1.default.has(skill, "title")) {
            const length = lodash_1.default.toString(lodash_1.default.get(skill, "title")).length;
            if (length < min || length > max)
                return withPolicy ? exports.policy.skills[2] : false;
        }
    }
    return true;
}
function isArticleCategoryListAcceptable(value, withPolicy = atoms_1.WITH_POLICY, isStringified = false) {
    const list = isStringified && !lodash_1.default.isNil(value)
        ? lodash_1.default.attempt(() => JSON.parse(value))
        : value;
    if (lodash_1.default.isNil(list) || !lodash_1.default.isArray(list))
        return withPolicy ? exports.policy.categories.root : false;
    if (atoms_1.limits.MIN_ARTICLE_CATEGORIES_COUNT > list.length ||
        list.length > atoms_1.limits.MAX_ARTICLE_CATEGORIES_COUNT)
        return withPolicy ? exports.policy.categories[1] : false;
    const [min, max] = [
        atoms_1.limits.MIN_ARTICLE_CATEGORIES_TITLE_LENGTH,
        atoms_1.limits.MAX_ARTICLE_CATEGORIES_TITLE_LENGTH,
    ];
    for (let i = 0; i < list.length; i += 1) {
        const category = list[i];
        if (!lodash_1.default.has(category, "_id") && !lodash_1.default.has(category, "title"))
            return withPolicy ? exports.policy.categories[2] : false;
        if (lodash_1.default.has(category, "_id") && !lodash_1.default.get(category, "_id"))
            return withPolicy ? exports.policy.categories[2] : false;
        if (lodash_1.default.has(category, "title")) {
            const length = lodash_1.default.toString(lodash_1.default.get(category, "title")).length;
            if (length < min || length > max)
                return withPolicy ? exports.policy.categories[2] : false;
        }
    }
    return true;
}
exports.default = {
    isArticleTitleAcceptable,
    isArticleCoverAcceptable,
    isArticleUrlAcceptable,
    isArticleContentAcceptable,
    isArticleSkillListAcceptable,
    isArticleCategoryListAcceptable,
};
