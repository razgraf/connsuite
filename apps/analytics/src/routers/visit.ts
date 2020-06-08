import express from "express";
import { routes } from "../constants";
import { VisitController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const VisitRouter = express.Router();

VisitRouter.get(routes.visits.get, [AuthMiddleware.bearerFriendly], VisitController.get);
VisitRouter.post(routes.visits.create, AuthMiddleware.bearerFriendly, VisitController.create);
VisitRouter.get(routes.visits.list, [AuthMiddleware.bearerFriendly], VisitController.list);

export default VisitRouter;
