import express from "express";
import { routes } from "../constants";
import { AuthController } from "../controllers";

const AuthRouter = express.Router();

AuthRouter.get(routes.auth.google.root, AuthController.google);

AuthRouter.get(routes.auth.logout, AuthController.logout);
AuthRouter.get(routes.auth.status, AuthController.status);

export default AuthRouter;
