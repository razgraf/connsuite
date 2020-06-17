"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const ArticleRouter = express_1.default.Router();
ArticleRouter.get(constants_1.routes.article.get, [middlewares_1.AuthMiddleware.bearerFriendly], controllers_1.ArticleController.get);
ArticleRouter.post(constants_1.routes.article.create, [middlewares_1.AuthMiddleware.bearer, middlewares_1.UploadMiddleware.upload.single("cover")], controllers_1.ArticleController.create);
ArticleRouter.patch(constants_1.routes.article.update, [middlewares_1.AuthMiddleware.bearer, middlewares_1.UploadMiddleware.upload.single("cover")], controllers_1.ArticleController.update);
ArticleRouter.delete(constants_1.routes.article.remove, middlewares_1.AuthMiddleware.bearer, controllers_1.ArticleController.remove);
ArticleRouter.get(constants_1.routes.article.list, [middlewares_1.AuthMiddleware.bearerFriendly], controllers_1.ArticleController.list);
exports.default = ArticleRouter;
