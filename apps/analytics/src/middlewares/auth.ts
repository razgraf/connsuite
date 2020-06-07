import _ from "lodash";
import fetch from "node-fetch";
import { atoms, HTTP_CODE } from "../constants";
import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors";

class AuthMiddleware {
  public static async bearer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorization = _.get(req, "headers.authorization");
      if (!authorization) throw new AuthError.InvalidToken("Bearer Missing");

      const token = authorization?.split(" ")[1] || "";
      if (!token) throw new AuthError.InvalidToken("Bearer Malformed");

      const headers = {
        "Content-Type": "application/json",
        Authorization: authorization,
      };

      const response = await fetch(`${atoms.dependency.backend}`, {
        method: "GET",
        headers,
      });

      if (response.status !== HTTP_CODE.OK) throw new AuthError.Forbidden("Access not authorized");

      const identity = await response.json();

      if (!res.locals) res.locals = {};
      res.locals.identity = {
        user: _.get(identity, "user._id"),
      };

      next();
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
      return;
    }
  }

  public static async bearerFriendly(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.bearer(req, res, next);
      return;
    } catch (e) {
      res.locals.identity = null;
      next();
      return;
    }
  }
}

export default AuthMiddleware;
