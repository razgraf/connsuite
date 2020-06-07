import express from "express";
import { routes } from "../constants";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const UserRouter = express.Router();

UserRouter.get(routes.user.get, [AuthMiddleware.bearerFriendly], UserController.get);
UserRouter.patch(routes.user.update, [AuthMiddleware.bearer], UserController.update);
// UserRouter.get(routes.user.list, UserController.list);

UserRouter.get(routes.user.listSkillsAndCategories, UserController.listSkillsAndCategories);

export default UserRouter;
