"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const article_1 = __importDefault(require("./article"));
const auth_1 = __importDefault(require("./auth"));
const category_1 = __importDefault(require("./category"));
const network_1 = __importDefault(require("./network"));
const skill_1 = __importDefault(require("./skill"));
const user_1 = __importDefault(require("./user"));
exports.default = [
    { root: constants_1.routes.article.root, router: article_1.default },
    { root: constants_1.routes.auth.root, router: auth_1.default },
    { root: constants_1.routes.category.root, router: category_1.default },
    { root: constants_1.routes.network.root, router: network_1.default },
    { root: constants_1.routes.skill.root, router: skill_1.default },
    { root: constants_1.routes.user.root, router: user_1.default },
];
