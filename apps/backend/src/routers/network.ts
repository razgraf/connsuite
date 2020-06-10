import express from "express";
import { routes } from "../constants";
import { NetworkController } from "../controllers";
import { AuthMiddleware, UploadMiddleware } from "../middlewares";

const NetworkRouter = express.Router();

// NetworkRouter.get(routes.admin.root, [AuthMiddleware.bearerFriendly], NetworkController.admin);

NetworkRouter.get(routes.network.listExternal, NetworkController.listExternal);
NetworkRouter.get(routes.network.get, [AuthMiddleware.bearerFriendly], NetworkController.get);
NetworkRouter.get(routes.network.list, [AuthMiddleware.bearerFriendly], NetworkController.list);

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
NetworkRouter.delete(routes.network.remove, [AuthMiddleware.bearer], NetworkController.remove);

export default NetworkRouter;
