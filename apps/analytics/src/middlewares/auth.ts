import _ from "lodash";
import { HTTP_CODE } from "../constants";
import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors";
import { connsuite } from "../vendors";

class AuthMiddleware {
  public static async bearer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorization = _.get(req, "headers.authorization");
      if (!authorization) throw new AuthError.InvalidToken("Bearer Missing");

      const token = authorization?.split(" ")[1] || "";
      if (!token || !token.length) throw new AuthError.InvalidToken("Bearer Malformed");

      const identity = await connsuite.getAuthorizedIdentity(_.get(req, "headers.authorization"), true);
      if (_.isNil(identity)) throw new AuthError.Forbidden("Access not authorized");

      if (_.get(identity, "elite") !== true)
        throw new AuthError.Locked("Access is locked due to missing user priviledges. Higher tier required.");

      if (!res.locals) res.locals = {};
      res.locals.identity = {
        user: _.get(identity, "user._id"),
      };

      next();
    } catch (e) {
      console.error(e);
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
      return;
    }
  }

  public static async bearerFriendly(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AuthMiddleware.bearer(req, res, next);
      return;
    } catch (e) {
      console.error(e);
      res.locals.identity = null;
      next();
      return;
    }
  }
}

export default AuthMiddleware;
