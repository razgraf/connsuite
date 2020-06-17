"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const AuthRouter = express_1.default.Router();
AuthRouter.post(constants_1.routes.auth.google, controllers_1.AuthController.google);
AuthRouter.post(constants_1.routes.auth.classic.login, controllers_1.AuthController.login);
AuthRouter.post(constants_1.routes.auth.classic.register, controllers_1.AuthController.register);
AuthRouter.post(constants_1.routes.auth.logout, middlewares_1.AuthMiddleware.bearer, controllers_1.AuthController.logout);
AuthRouter.get(constants_1.routes.auth.status, middlewares_1.AuthMiddleware.bearer, controllers_1.AuthController.status);
exports.default = AuthRouter;
