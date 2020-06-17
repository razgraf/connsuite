"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const UserRouter = express_1.default.Router();
UserRouter.get(constants_1.routes.user.get, [middlewares_1.AuthMiddleware.bearerFriendly], controllers_1.UserController.get);
UserRouter.patch(constants_1.routes.user.update, [middlewares_1.AuthMiddleware.bearer, middlewares_1.UploadMiddleware.upload.single("picture")], controllers_1.UserController.update);
UserRouter.get(constants_1.routes.user.listSkillsAndCategories, controllers_1.UserController.listSkillsAndCategories);
exports.default = UserRouter;
