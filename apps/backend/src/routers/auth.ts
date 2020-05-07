import express from "express";
import { routes } from "../constants";
import { AuthController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const AuthRouter = express.Router();

AuthRouter.post(routes.auth.google, AuthController.google);
AuthRouter.post(routes.auth.classic.login, AuthController.login);
AuthRouter.post(routes.auth.classic.register, AuthController.register);

AuthRouter.post(routes.auth.logout, AuthMiddleware.bearer, AuthController.logout);
AuthRouter.get(routes.auth.status, AuthMiddleware.bearer, AuthController.status);

export default AuthRouter;
