"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const VisitRouter = express_1.default.Router();
VisitRouter.get(constants_1.routes.visits.get, [middlewares_1.AuthMiddleware.bearerFriendly], controllers_1.VisitController.get);
VisitRouter.post(constants_1.routes.visits.create, middlewares_1.AuthMiddleware.bearerFriendly, controllers_1.VisitController.create);
VisitRouter.get(constants_1.routes.visits.list, [middlewares_1.AuthMiddleware.bearerFriendly], controllers_1.VisitController.list);
exports.default = VisitRouter;
