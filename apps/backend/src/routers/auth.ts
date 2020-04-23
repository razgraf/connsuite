import express from "express";
import { routes } from "../constants";
import { passport } from "../vendors";
import { AuthController } from "../controllers";

const AuthRouter = express.Router();

/** Route to the Google Consent page */
AuthRouter.get(
  routes.auth.google.root,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

/** Route to the aftermath of the Google Consent | Will contain the data token for Passport.js to digest */
AuthRouter.get(routes.auth.google.redirect, passport.authenticate("google", { session: false }), AuthController.google);

AuthRouter.get(routes.auth.logout, AuthController.logout);
AuthRouter.get(routes.auth.status, AuthController.status);

export default AuthRouter;
