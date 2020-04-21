import express from "express";
import { routes } from "../constants";
import { NetworkController } from "../controllers";

const NetworkRouter = express.Router();

NetworkRouter.get(routes.network.get, NetworkController.get);
NetworkRouter.post(routes.network.create, NetworkController.create);
NetworkRouter.patch(routes.network.update, NetworkController.update);
NetworkRouter.patch(routes.network.remove, NetworkController.remove);
NetworkRouter.get(routes.network.list, NetworkController.list);

export default NetworkRouter;
