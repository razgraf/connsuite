"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const NetworkRouter = express_1.default.Router();
// NetworkRouter.get(routes.admin.root, [AuthMiddleware.bearerFriendly], NetworkController.admin);
NetworkRouter.get(constants_1.routes.network.listExternal, controllers_1.NetworkController.listExternal);
NetworkRouter.get(constants_1.routes.network.get, [middlewares_1.AuthMiddleware.bearerFriendly], controllers_1.NetworkController.get);
NetworkRouter.get(constants_1.routes.network.list, [middlewares_1.AuthMiddleware.bearerFriendly], controllers_1.NetworkController.list);
NetworkRouter.post(constants_1.routes.network.create, [middlewares_1.AuthMiddleware.bearer, middlewares_1.UploadMiddleware.upload.single("icon")], controllers_1.NetworkController.create);
NetworkRouter.patch(constants_1.routes.network.update, [middlewares_1.AuthMiddleware.bearer, middlewares_1.UploadMiddleware.upload.single("icon")], controllers_1.NetworkController.update);
NetworkRouter.delete(constants_1.routes.network.remove, [middlewares_1.AuthMiddleware.bearer], controllers_1.NetworkController.remove);
exports.default = NetworkRouter;
