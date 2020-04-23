import passport from "passport";
// import JWTStrategy from "passport-jwt";
import GoogleStrategy from "passport-google-oauth20";
import { routes } from "../constants";
import { AuthRepository } from "../repositories";

passport.use(
  new GoogleStrategy.Strategy(
    {
      callbackURL: routes.auth.root + routes.auth.google.redirect,
      clientID: process.env.CONN_BACK_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.CONN_BACK_GOOGLE_CLIENT_SECRET || "",
    },
    AuthRepository.getInstance().googleCallback,
  ),
);

export default passport;
