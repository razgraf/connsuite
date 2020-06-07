import express from "express";
import { routes } from "../constants";
import { VisitController } from "../controllers";

const VisitRouter = express.Router();

VisitRouter.get(routes.visits.get, VisitController.get);
VisitRouter.post(routes.visits.create, VisitController.create);
VisitRouter.get(routes.visits.list, VisitController.list);

export default VisitRouter;
