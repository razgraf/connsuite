import _ from "lodash";
import { HTTP_CODE } from "../constants";
import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors";
import { AuthRepository } from "../repositories";
import { Usersafe } from "../models";

class AuthMiddleware {
  public static async bearer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const header = _.get(req, "headers.authorization");
      if (!header) throw new AuthError.InvalidToken("Bearer Missing");
      const token = header?.split(" ")[1] || "";
      if (!token) throw new AuthError.InvalidToken("Bearer Malformed");

      const usersafe: Usersafe = await AuthRepository.getInstance().validate(token);
      if (!res.locals) res.locals = {};
      res.locals.identity = usersafe;
      next();
    } catch (e) {
      res.status(e.code || HTTP_CODE.BAD_REQUEST);
      res.json({ message: e.message });
      return;
    }
  }
}

export default AuthMiddleware;
