import express from "express";
import { routes } from "../constants";
import { AuthController } from "../controllers";

const AuthRouter = express.Router();

AuthRouter.post(routes.auth.google, AuthController.google);
AuthRouter.post(routes.auth.classic.login, AuthController.login);
AuthRouter.post(routes.auth.classic.register, AuthController.register);

AuthRouter.get(routes.auth.logout, AuthController.logout);
AuthRouter.get(routes.auth.status, AuthController.status);

export default AuthRouter;
