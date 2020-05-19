import express from "express";
import { routes } from "../constants";
import { NetworkController } from "../controllers";
import { AuthMiddleware, UploadMiddleware } from "../middlewares";

const NetworkRouter = express.Router();

NetworkRouter.get(routes.admin.root, NetworkController.admin);

NetworkRouter.get(routes.network.get, NetworkController.get);
NetworkRouter.post(
  routes.network.create,
  [AuthMiddleware.bearer, UploadMiddleware.upload.single("icon")],
  NetworkController.create,
);
NetworkRouter.patch(
  routes.network.update,
  [AuthMiddleware.bearer, UploadMiddleware.upload.single("icon")],
  NetworkController.update,
);
NetworkRouter.delete(routes.network.remove, AuthMiddleware.bearer, NetworkController.remove);
NetworkRouter.get(routes.network.list, NetworkController.list);

export default NetworkRouter;
